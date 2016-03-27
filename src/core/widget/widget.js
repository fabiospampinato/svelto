
/* =========================================================================
 * Svelto - Core - Widget
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/breakpoint/breakpoint.js
 * @require core/breakpoints/breakpoints.js
 * @require core/factory/factory.js
 * @require core/keyboard/keyboard.js
 * @require core/pointer/pointer.js
 * @require core/route/route.js
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Templates, Factory, Pointer, Keyboard, Breakpoints, Breakpoint ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'widget', // The name of widget, it will be used for the the jQuery pluing `$.fn[name]` and for triggering widget events `name + ':' + event`
    plugin: false, // A boolean that defines wheter the Widget is also a jQuery plugin or not
    selector: false, // The selector used to select the website in the DOM, used for `Svelto.Widgetize`
    templates: { // Object containing lodash template strings
      base: false // It will be used as the constructor if no element is provided
    },
    options: {
      characters: {}, // Used to store some characters needed by the widget
      regexes: {}, // Contains the used regexes
      errors: {}, // It contains all the errors that a widget can trigger
      messages: {}, // Messages that the widget somewhere outputs, maybe with a `$.toast`, maybe just logs it
      attributes: {}, // Attributes used by the widget
      datas: {}, // CSS data-* names
      classes: { // CSS classes to attach inside the widget
        disabled: 'disabled', // Attached to disabled widgets
        hidden: 'hidden' // Used to hide an element
      },
      selectors: { // Selectors to use inside the widget
        layout: '.layout, body' // `body` is used as a fallback
      },
      animations: {}, // Object storing all the milliseconds required for each animation to occur
      breakpoints: { // Actions to be executed at specifc breakpoints, every key/val pair should be in the form of `breakpoint-name`: `action`, where `breakpoint-name` is a key of `Breakpoints` and `action` in a defined method (e.g. `xsmall`: `close`). In addition to this every pair must be specified under one of the following keys: `up`, `down`, `only`, mimicking the respective SCSS mixins
        up: {},
        down: {},
        only: {}
      },
      keyboard: true, // Enable or disable the use of the keyboard, basically disables keystrokes and other keyboard-based interaction
      keystrokes: {},  // Easy way to automatically bind keystrokes to specific methods calls. For example: `{ 'ctrl + o': 'open', Keyaboard.keys.UP: 'up' }`
      callbacks: {} // Callbacks to trigger on specific events
    }
  };

  /* WIDGET */

  class Widget {

    /* CONSTRUCTION */

    constructor ( options, element ) {

      /* ATTACH CONFIG */

      _.extend ( this, this._getConfig ( options, element ) );

      /* CACHE TEMPLATES */

      this.templatesNamespace = _.upperFirst ( this.name );

      if ( !( this.templatesNamespace in Templates ) ) {

        Templates[this.templatesNamespace] = {};

        let options = { //TODO: Maybe export them
          imports: {
            Templates: Templates,
            self: Templates[this.templatesNamespace]
          },
          variable: 'o'
        };

        for ( let template in this.templates ) {

          if ( this.templates.hasOwnProperty ( template ) && this.templates[template] ) {

            Templates[this.templatesNamespace][template] = _.template ( this.templates[template], options );

          }

        }

      }

      /* ELEMENT */

      this.$element = $( element ||  ( this.templates.base ? this._template ( 'base', this.options ) : undefined ) );
      this.element = this.$element[0];

      /* LAYOUT */

      this.$layout = this.$element.length ? this.$element.parent ().closest ( this.options.selectors.layout ) : $(this.options.selectors.layout).first ();
      this.$layout = this.$layout.length ? this.$layout : $(this.options.selectors.layout).first ();
      this.layout = this.$layout[0];

      /* WINDOW */

      this.$window = $(window);
      this.window = this.$window[0];

      /* DOCUMENT */

      this.$document = $(document);
      this.document = this.$document[0];

      /* HTML */

      this.$html = $(document.documentElement);
      this.html = this.$html[0];

      /* BODY */

      this.$body = $(document.body);
      this.body = this.$body[0];

      /* BINDINGS */

      this.$bindings = $();

      /* ATTACH INSTANCE */

      if ( this.element ) {

        $.data ( this.element, `instance.${this.name}`, this );

      }

      /* SET GUID / GUC */

      this.guid = $.guid++;
      this.guc = this.name + '-' + this.guid;

      /* EVENT NAMESPACE */

      this.eventNamespace = `.swns-${this.guid}`;

      /* CALLBACKS */

      this._variables ();
      this._init ();
      this._events ();

      /* BREAKPOINT */

      this.___breakpoint (); // It must be inited before calling `__breakpoint`, since that when `__breakpoint` gets called it may want to reset it (not inited yet) and init it again (with a result of double binding)
      this.__breakpoint ();

      /* REMOVE */

      this.___remove ();

    }

    _getConfig ( options, element ) {

      /* VARIABLES */

      let configs = [];

      /* PROTOTYPE CHAIN */

      let prototype = Object.getPrototypeOf ( this );

      while ( prototype ) {

        if ( prototype.constructor.config ) {

          configs.push ( prototype.constructor.config );

        }

        prototype = Object.getPrototypeOf ( prototype );

      }

      configs.push ( {} ); // So that we merge them to a new object

      configs.reverse ();

      /* DATA OPTIONS */

      if ( element ) {

        let $element = $(element),
            name = _.last ( configs ).name.toLowerCase (),
            dataOptions = $element.data ( 'options' ),
            dataNameOptions = $element.data ( name + '-options' );

        if ( dataOptions ) {

          configs.push ({ options: dataOptions });

        }

        if ( dataNameOptions ) {

          configs.push ({ options: dataNameOptions });

        }

      }

      /* OPTIONS */

      if ( _.isPlainObject ( options ) ) {

        configs.push ({ options: options });

      }

      /* CREATE OPTIONS */

      let createOptions = this._createOptions ();

      if ( _.isPlainObject ( createOptions ) ) {

        configs.push ({ options: createOptions });

      }

      /* RETURN */

      return _.merge ( ...configs );

    }

    _createOptions () {} // Used to pass extra options

    /* DESTROY */

    destroy () {

      this._reset ();

      this._destroy ();

      if ( this.element ) {

        this.$element.removeData ( `instance.${this.name}` );

      }

    }

    _destroy () {} // Clean the stuff, remove possible memory leaks

    /* SPECIAL */

    static widgetize ( $ele, config ) { // Called for widgetizing an element

      $ele[config.name]();

    }

    static ready () {} // Called when the DOM is `ready`, perhaps the widget needs to perform some operations, like `Toast` do for instance

    _variables () {} // Init your variables inside this function
    _init () {} // Perform the init stuff inside this function
    _events () {} // Bind the event handlers inside this function

    _reset () { //TODO: Maybe remove or rename it, I don't like it but I currently need its functionality

      this.$bindings.off ( this.eventNamespace );

    }

    /* WIDGET */

    widget () {

      return this.$element;

    }

    /* INSTANCE */

    instance () {

      return this;

    }

    /* OPTIONS */

    // We cannot have a `options` alias to `option`, since `options` is already defined in the config

    option ( key, value ) {

      if ( !key ) {

        return _.cloneDeep ( this.options );

      } else if ( _.isString ( key ) ) {

        if ( _.isUndefined ( value ) ) {

          return _.cloneDeep ( _.get ( this.options, key ) );

        } else {

          this._setOption ( key, value );

        }

      } else if ( _.isPlainObject ( key ) ) {

        for ( let prop in key ) {

          if ( key.hasOwnProperty ( prop ) ) {

            this._setOption ( key, value );

          }

        }

      }

    }

    _setOption ( key, value ) {

      _.set ( this.options, key, value );

    }

    /* ENABLED */

    enable () {

      this.$element.removeClass ( this.options.classes.disabled );

    }

    isEnabled () {

      return !this.isDisabled ();

    }

    /* DISABLED */

    disable () {

      this.$element.addClass ( this.options.classes.disabled );

    }

    isDisabled () {

      return this.$element.hasClass ( this.options.classes.disabled );

    }

    /* EVENTS */

    //TODO: Add support for custom data

    _on ( suppressDisabledCheck, $element, events, selector, handler, _onlyOne ) {

      /* NORMALIZATION */

      if ( !_.isBoolean ( suppressDisabledCheck ) ) {

        _onlyOne = handler;
        handler = selector;
        selector = events;
        events = $element;
        $element = suppressDisabledCheck;
        suppressDisabledCheck = false;

      }

      if ( !( $element instanceof $ ) ) {

        _onlyOne = handler;
        handler = selector;
        selector = events;
        events = $element;
        $element = this.$element;

      }

      if ( !_.isString ( selector ) ) {

        _onlyOne = handler;
        handler = selector;
        selector = false;

      }

      /* BINDINGS */

      this.$bindings = this.$bindings.add ( $element );

      /* PROXY */

      let handlerProxy = ( ...args ) => {

        if ( !suppressDisabledCheck && this.$element.hasClass ( this.options.classes.disabled ) ) return;

        return handler.apply ( this, args );

      };

      /* PROXY GUID */

      handlerProxy.guid = handler.guid = ( handler.guid || $.guid++ );

      /* EVENTS NAMESPACING */

      events = events.split ( /\s+/ ).map ( event => event + this.eventNamespace ).join ( ' ' );

      /* TRIGGERING */

      $element[_onlyOne ? 'one' : 'on'] ( events, selector, handlerProxy );

    }

    _one ( ...args ) {

      return this._on ( ...args, true );

    }

    _onHover ( $element, args ) {

      /* NORMALIZATION */

      if ( !args ) {

        args = $element;
        $element = this.$element;

      }

      /* BINDINGS */

      this.$bindings = this.$bindings.add ( $element );

      /* BINDING */

      this._on ( $element, Pointer.enter, () => this._on ( ...args ) );
      this._on ( $element, Pointer.leave, () => this._off ( ...args ) );

    }

    //TODO: Maybe add a _offHover, is it needed?

    _off ( $element, events, handler ) {

      /* NORMALIZATION */

      if ( !handler && !($element instanceof $) ) {

        handler = events;
        events = $element;
        $element = this.$element;

      }

      /* EVENTS NAMESPACING */

      events = events.split ( /\s+/ ).map ( event => event + this.eventNamespace ).join ( ' ' );

      /* REMOVING HANDLER */

      $element.off ( events, handler );

    }

    _trigger ( type, event, data ) {

      /* NORMALIZATION */

      if ( !data ) {

        if ( event instanceof $.Event ) {

          data = {};

        } else {

          data = event || {};
          event = undefined;

        }

      }

      /* EVENT */

      event = $.Event ( event );
      event.type = ( this.name + ':' + type ).toLowerCase ();
      event.target = this.element;

      let originalEvent = event.originalEvent;

      if ( originalEvent ) {

        for ( let prop in originalEvent ) {

          if ( originalEvent.hasOwnProperty ( prop ) ) {

            if ( !(prop in event) ) {

              event[prop] = originalEvent[prop];

            }

          }

        }

      }

      /* TRIGGERING */

      this.$element.trigger ( event, data );

      return !( this.options.callbacks[type].apply ( this.element, [event].concat ( data ) ) === false || event.isDefaultPrevented () );

    }

    /* ROUTE */

    ___route () {

      this._on ( true, this.$window, 'route', this.__route );

    }

    /* BREAKPOINT */

    ___breakpoint () {

      this._on ( true, this.$window, 'breakpoint:change', this.__breakpoint );

    }

    __breakpoint () {

      let width = Breakpoints.widths[Breakpoint.current];

      /* UP */

      for ( let breakpoint in this.options.breakpoints.up ) {

        if ( this.options.breakpoints.up.hasOwnProperty ( breakpoint ) ) {

          if ( width >= Breakpoints.widths[breakpoint] ) {

            this[this.options.breakpoints.up[breakpoint]]();

          }

        }

      }

      /* DOWN */

      for ( let breakpoint in this.options.breakpoints.down ) {

        if ( this.options.breakpoints.down.hasOwnProperty ( breakpoint ) ) {

          if ( width <= Breakpoints.widths[breakpoint] ) {

            this[this.options.breakpoints.down[breakpoint]]();

          }

        }

      }

      /* ONLY */

      for ( let breakpoint in this.options.breakpoints.only ) {

        if ( this.options.breakpoints.only.hasOwnProperty ( breakpoint ) ) {

          if ( width === Breakpoints.widths[breakpoint] ) {

            this[this.options.breakpoints.only[breakpoint]]();

          }

        }

      }

    }

    /* KEYDOWN */

    ___keydown () {

      this._on ( this.$document, 'keydown', this.__keydown );

    }

    __keydown ( event ) {

      if ( !this.options.keyboard ) return;

      for ( let keystrokes in this.options.keystrokes ) {

        if ( this.options.keystrokes.hasOwnProperty ( keystrokes ) ) {

          for ( let keystroke of keystrokes.split ( ',' ) ) {

            if ( Keyboard.keystroke.match ( event, keystroke ) ) {

              this[this.options.keystrokes[keystrokes]]();

              event.preventDefault ();
              event.stopImmediatePropagation ();

              return;

            }

          }

        }

      }

    }

    /* REMOVE */

    ___remove () {

      if ( this.element ) {

        this._on ( true, 'remove', this.__remove );

      }

    }

    __remove ( event ) {

      if ( !event || event.target === this.element ) {

        this.destroy ();

      }

    }

    /* DELAYING */

    _delay ( fn, delay ) {

      return setTimeout ( () => fn.apply ( this ), delay || 0 );

    }

    /* DEFER */

    _defer ( fn ) {

      return this._delay ( fn );

    }

    /* FRAME */

    _frame ( fn ) {

      return requestAnimationFrame ( fn.bind ( this ) );

    }

    /* THROW */

    _throw ( msg ) {

      throw new Error ( msg );

    }

    /* THROTTLING */

    _throttle ( fn, wait, options ) {

      let throttled = _.throttle ( fn, wait, options );

      throttled.guid = fn.guid = ( fn.guid || $.guid++ );

      return throttled;

    }

    /* DEBOUNCING */

    _debounce ( fn, wait, options ) {

      let debounced = _.debounce ( fn, wait, options );

      debounced.guid = fn.guid = ( fn.guid || $.guid++ );

      return debounced;

    }

    /* TEMPLATE */

    _template ( name, options = {} ) {

      return Templates[this.templatesNamespace][name] ( options );

    }

    /* INSERTION */

    before ( ...content ) {

      this.$element.before ( ...content );

    }

    insertBefore ( target ) {

      this.$element.insertBefore ( target );

    }

    after ( ...content ) {

      this.$element.after ( ...content );

    }

    insertAfter ( target ) {

      this.$element.insertAfter ( target );

    }

    prependTo ( target ) {

      this.$element.prependTo ( target );

    }

    appendTo ( target ) {

      this.$element.appendTo ( target );

    }

  }

  /* FACTORY */

  Factory.init ( Widget, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Templates, Svelto.Factory, Svelto.Pointer, Svelto.Keyboard, Svelto.Breakpoints, Svelto.Breakpoint ));

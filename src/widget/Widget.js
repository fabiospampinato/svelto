
/* =========================================================================
 * Svelto - Widget
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../tmpl/tmpl.js
 * @requires ../pointer/pointer.js
 * @requires ../factory/factory.js
 * @requires ../breakpoints/breakpoints.js
 * @requires ../breakpoints/breakpoint.js
 * @requires ../keyboard/keyboard.js
 * ========================================================================= */

//TODO: Add support for remove, right know it doesn't get triggered on `.remove ()` but only on `.trigger ( 'remove' )`, but maybe there's no way of doing it...

(function ( $, _, Svelto, Widgets, Factory, Pointer, Keyboard, Breakpoints, Breakpoint ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'widget', //INFO: The name of widget, it will be used for the the jQuery pluing `$.fn[name]` and for triggering widget events `name + ':' + event`
    plugin: false, //INFO: A boolean that defines wheter the Widget is also a jQuery plugin or not
    selector: false, //INFO: The selector used to select the website in the DOM, used for `Svelto.Widgetize`
    templates: {
      base: false //INFO: It will be used as the constructor if no element is provided
    },
    options: {
      characters: {}, //INFO: Used to store some characters needed by the widget
      regexes: {}, //INFO: Contains the used regexes
      errors: { //INFO: It contains all the errors that a widget can trigger
        uninitializable: 'This widget can\'t be initialized, no element or base template have been provided' //INFO: Triggered when the widget is not initializable
      },
      messages: {}, //INFO: Messages that the widget somewhere outputs, maybe with a `$.noty`, maybe just logs it
      attributes: {}, //INFO: Attributes used by the widget
      datas: {}, //INFO: CSS data-* names
      classes: { //INFO: CSS classes to attach inside the widget
        disabled: 'disabled', //INFO: Attached to disabled widgets
        hidden: 'hidden' //INFO: Used to hide an element
      },
      selectors: { //INFO: Selectors to use inside the widget
        layout: '.layout, body' //FIXME: Just use `.layout`, but we need to add it in the CSS before
      },
      animations: {}, //INFO: Object storing all the milliseconds required for each animation to occur
      breakpoints: {}, //INFO: Actions to be executed at specifc breakpoints, every key/val pair should be in the form of `breakpoint-name`: `action`, where `breakpoint-name` is defined under `Breakpoints` and `action` in a defined method (e.g. `xsmall`: `close`). In addition to this every pair must be specified under one of the following keys: `up`, `down`, `range`, mimicking the respective SCSS mixins
      keyboard: true, //INFO: Enable or disable the use of the keyboard, basically disables keystrokes and other keyboard-based interaction
      keystrokes: {},  //INFO: Easy way to automatically bind keystrokes to specific methods calls. For example: `{ 'ctrl + o': 'open', Keyaboard.keys.UP: 'up' }`
      callbacks: {} //INFO: Callbacks to trigger on specific events
    }
  };

  /* WIDGET */

  class Widget {

    /* CONSTRUCTION */

    constructor ( options, element ) {

      /* ATTACH CONFIG */

      _.extend ( this, this._getConfig ( options, element ) );

      /* CHECK IF INITIALIZABLE */

      if ( !element && !this.templates.base ) {

        this._throw ( this.errors.uninitializable );

      }

      /* CACHE TEMPLATES */

      if ( !$.tmpl.cached[this.name] ) {

        for ( let tmpl in this.templates ) {

          if ( this.templates.hasOwnProperty ( tmpl ) && this.templates[tmpl] ) {

            let tmplName = this.name + '.' + tmpl;

            if ( !(tmplName in $.tmpl.cache) ) {

              $.tmpl.cache[tmplName] = $.tmpl ( this.templates[tmpl] );

            }

          }

        }

        $.tmpl.cached[this.name] = true;

      }

      /* ELEMENT */

      this.$element = $( element || this._tmpl ( 'base', this.options ) );
      this.element = this.$element[0];

      /* LAYOUT */

      this.$layout = this.$element.parent ().closest ( this.options.selectors.layout );
      this.layout = this.$layout[0];

      /* BINDINGS */

      this.$bindings = $empty;

      /* ATTACH INSTANCE */

      $.data ( this.element, 'instance.' + this.name, this );

      /* SET GUID / GUC */

      this.guid = $.guid++;
      this.guc = this.name + this.guid;

      /* EVENT NAMESPACE */

      this.eventNamespace = '.swns' + this.guid;

      /* CALLBACKS */

      this._variables ();
      this._init ();
      this._events ();

      /* BREAKPOINT */

      this.___breakpoint (); //INFO: It must be inited before calling `__breakpoint`, since that when `__breakpoint` gets called it may want to reset it (not inited yet) and init it again (with a result of double binding)
      this.__breakpoint ();

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

      configs.push ( {} ); //INFO: So that we merge them to a new object

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

    _createOptions () {} //INFO: Used to pass extra options

    /* DESTRUCTION */

    destroy () {

      this._reset ();

      this._destroy ();

      this.$element.removeData ( 'instance.' + this.name );

    }

    _destroy () {} //INFO: Clean the stuff, remove possible memory leaks

    /* SPECIAL */

    static ready () {} //INFO: Called when the DOM is `ready`, perhaps the widget needs to perform some operations, like `Noty` do for instance
    static widgetize ( $widget, name ) { //INFO: Instanciate the $widget

      $widget[name]();

    }

    _variables () {} //INFO: Init your variables inside this function
    _init () {} //INFO: Perform the init stuff inside this function
    _events () {} //INFO: Bind the event handlers inside this function

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

    //INFO: We cannot have a `options` alias to `option`, since `options` is already defined in the config

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

    _on ( suppressDisabledCheck, $element, events, selector, handler, _onlyOne ) {

      //TODO: Add support for custom data

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

        if ( !suppressDisabledCheck && this.$element.hasClass ( this.options.classes.disabled ) ) return; //FIXME: Is keeping a reference to `suppressDisabledCheck` wasted leak? Even if so tiny

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

      //FIXME: If we remove the target we are still attaching and removing those events though (just performing the functions calls actually, probably)

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

    //TODO: Add a _offHover (Is it needed?)

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

      this._on ( true, $window, 'route', this.__route );

    }

    /* BREAKPOINT */

    ___breakpoint () {

      this._on ( $window, 'breakpoint:change', this.__breakpoint ); //TODO: Should we use `suppressDisabledCheck`? I'm not sure...

    }

    __breakpoint () {

      let current = Breakpoints[Breakpoint.current];

      /* UP */

      for ( let breakpoint in this.options.breakpoints.up ) {

        if ( this.options.breakpoints.up.hasOwnProperty ( breakpoint ) ) {

          if ( current >= Breakpoints[breakpoint] ) {

            this[this.options.breakpoints.up[breakpoint]]();

          }

        }

      }

      /* DOWN */

      for ( let breakpoint in this.options.breakpoints.down ) {

        if ( this.options.breakpoints.down.hasOwnProperty ( breakpoint ) ) {

          if ( current < Breakpoints[breakpoint] ) {

            this[this.options.breakpoints.down[breakpoint]]();

          }

        }

      }

      /* RANGE */

      for ( let breakpoint in this.options.breakpoints.range ) {

        if ( this.options.breakpoints.range.hasOwnProperty ( breakpoint ) ) {

          if ( current === Breakpoints[breakpoint] ) {

            this[this.options.breakpoints.range[breakpoint]]();

          }

        }

      }

    }

    /* KEYDOWN */

    ___keydown () {

      this._on ( $document, 'keydown', this.__keydown );

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

    _tmpl ( name, options = {} ) {

      let tmplName = this.name + '.' + name;

      return $.tmpl ( tmplName, options );

    }

    /* INSERTION */

    insertBefore ( selector ) {

      this.$element.insertBefore ( selector );

    }

    insertAfter ( selector ) {

      this.$element.insertAfter ( selector );

    }

    prependTo ( selector ) {

      this.$element.prependTo ( selector );

    }

    appendTo ( selector ) {

      this.$element.appendTo ( selector );

    }

  }

  /* FACTORY */

  Factory.init ( Widget, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Keyboard, Svelto.Breakpoints, Svelto.Breakpoint ));

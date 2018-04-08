
// @require ./helpers.js
// @require core/breakpoint/breakpoint.js
// @require core/breakpoints/breakpoints.js
// @require core/factory/factory.js
// @require core/keyboard/keyboard.js
// @require core/layout/helpers.js
// @require core/pointer/pointer.js
// @require core/route/route.js
// @require core/svelto/svelto.js

(function ( $, _, Svelto, Instances, Templates, Widgets, Factory, Pointer, Keyboard, Breakpoints, Breakpoint ) {

  /* CONFIG */

  let config = {
    name: 'widget', // The name of widget, it will be used for the the jQuery pluing `$.fn[name]` and for triggering widget events `name + ':' + event`
    plugin: false, // A boolean that defines wheter the Widget is also a jQuery plugin or not
    selector: false, // The selector used to select the website in the DOM, used for `Svelto.Widgetize`
    ready: false, // If ready `Widgetize` will be triggered right away, without waiting for `Readify.isReady ()`
    templates: { // Object containing lodash template strings
      base: false // It will be used as the constructor if no element is provided
    },
    options: {
      characters: {}, // Used to store some characters needed by the widget
      regexes: {}, // Contains the used regexes
      messages: { // Messages that the widget somewhere outputs, maybe with a `$.toast`, maybe just logs it
        error: 'An error occurred, please try again later'
      },
      attributes: {}, // Attributes used by the widget
      datas: {}, // CSS data-* names
      classes: { // CSS classes to attach inside the widget
        disabled: 'disabled', // Attached to disabled widgets
        hidden: 'hidden' // Used to hide an element
      },
      selectors: {}, // Selectors to use inside the widget
      animations: {}, // Object storing all the milliseconds required for each animation to occur
      breakpoints: { // Actions to be executed at specifc breakpoints, every key/val pair should be in the form of `breakpoint-name`: `action`, where `breakpoint-name` is a key of `Breakpoints` and `action` in a defined method (e.g. `xsmall`: `close`). In addition to this every pair must be specified under one of the following keys: `up`, `down`, `only`, mimicking the respective SCSS mixins
        up: false,
        down: false,
        only: false
      },
      keyboard: true, // Enable or disable the use of the keyboard, basically disables keystrokes and other keyboard-based interaction
      keystrokes: {}, // Easy way to automatically bind keystrokes to specific methods calls. For example: `{ 'ctrl + o': 'open', Keyaboard.keys.UP: 'up' }`. You can also pass variables to the method. For example: `{ 'ctrl + o': ['open', true], Keyaboard.keys.UP: ['open', array ( 1, 2 )] }`
      callbacks: {} // Callbacks to trigger on specific events
    }
  };

  /* WIDGET */

  class Widget {

    /* WIDGETIZE */

    static widgetize ( ele, Widget ) { // Called for widgetizing an element

      $.widget.get ( ele, Widget );

    }

    /* READY */

    static ready ( done ) { // Called when the DOM is `ready`

      done ();

    }

    static isReady () {

      return !!this._ready;

    }

    static whenReady ( callback ) {

      let isReady = this.isReady || this.__proto__.isReady || Widget.isReady; //IE10 support -- static property

      if ( isReady.bind ( this )() ) {

        return callback ();

      } else {

        this._readyQueue.push ( callback );

      }

    }

    static _initReady () {

      this._ready = !!this.config.ready;
      this._readyQueue = [];

    }

    static _setReady () {

      this._ready = true;

      this._readyQueue.forEach ( callback => callback () );

      this._readyQueue = [];

    }

    /* CONSTRUCTION */

    constructor ( options, element ) {

      /* ATTACH CONFIG */

      options = _.isObject ( options ) ? options : undefined;

      _.extend ( this, this._getConfig ( options, element ) );

      /* INSTANCES */

      Instances[this.Name].push ( this );

      /* CACHE TEMPLATES */

      if ( !( this.Name in Templates ) ) {

        Templates[this.Name] = {};

        let options = { //TODO: Maybe export them
          imports: {
            Svelto,
            Templates,
            self: Templates[this.Name]
          }
        };

        for ( let template in this.templates ) {

          const source = this.templates[template];

          if ( !this.templates.hasOwnProperty ( template ) || !source ) continue;

          Templates[this.Name][template] = _.isFunction ( source ) ? source : _.template ( source, options );

        }

      }

      /* ELEMENT */

      this.$element = $( element ||  ( this.templates.base ? this._template ( 'base', this.options ) : undefined ) );
      this.element = this.$element[0];

      /* LAYOUT */

      this.$layout = $.getLayoutOf ( this.$element );
      this.layout = this.$layout[0];

      /* BINDINGS */

      this.$bindings = $.$empty;

      /* ATTACH INSTANCE */

      if ( this.element ) {

        $.widget.set ( this.element, this );

      }

      /* SET GUID / GUC */

      this.guid = $.guid++;
      this.guc = this.name + '-' + this.guid;

      /* EVENT NAMESPACE */

      this.eventNamespace = `.swns-${this.guid}`;

      /* LOCKS */

      this._locks = {};
      this._lockQueues = {};

      /* CALLBACKS */

      if ( this._make ()      === false ) return this.destroy ();
      if ( this._variables () === false ) return this.destroy ();
      if ( this._init ()      === false ) return this.destroy ();
      if ( this._events ()    === false ) return this.destroy ();

      /* BREAKPOINT */

      let {up, down, only} = this.options.breakpoints;

      if ( up || down || only ) {

        this.___breakpoint (); // It must be inited before calling `__breakpoint`, since that when `__breakpoint` gets called it may want to reset it (not inited yet) and init it again (with a result of double binding)
        this.__breakpoint ();

      }

      /* REMOVE */

      this.___remove ();

    }

    _getConfig ( options, element ) {

      /* VARIABLES */

      let config = this._getConfigInherited (),
          configs = [config];

      /* DATA OPTIONS */

      if ( element ) {

        let dataOptions = element.getAttribute ( 'data-options' );

        if ( dataOptions ) {

          configs.push ({ options: JSON.parse ( dataOptions ) });

        }

        let dataNameOptions = element.getAttribute ( `data-${config.name}-options` );

        if ( dataNameOptions ) {

          configs.push ({ options: JSON.parse ( dataNameOptions ) });

        }

      }

      /* OPTIONS */

      if ( options ) {

        configs.push ({ options });

      }

      /* CREATE OPTIONS */

      let createOptions = this._createOptions ();

      if ( createOptions ) {

        configs.push ({ options: createOptions });

      }

      /* RETURN */

      return configs.length > 1 ? _.merge ( {}, ...configs ) : _.cloneDeep ( config );

    }

    _getConfigInherited () {

      /* BASE */

      let prototype = Object.getPrototypeOf ( this ),
          constructor = prototype.constructor,
          config = constructor.config;

      if ( config._inherited ) return config;

      /* CONFIGS */

      let configs = [config];

      /* INHERITANCE CHAIN CHAIN */

      prototype = Object.getPrototypeOf ( prototype );

      while ( prototype ) {

        if ( !prototype.constructor.config ) break;

        configs.push ( prototype.constructor.config );

        prototype = Object.getPrototypeOf ( prototype );

      }

      configs.push ( {} ); // So that we merge them into a new object

      configs.reverse ();

      /* RETURN */

      config = _.merge ( ...configs );

      config._inherited = true;

      constructor.config = config;

      return config;

    }

    _createOptions () {} // Used to pass extra options

    /* DESTROY */

    destroy () {

      this._reset ();

      this._destroy ();

      _.pull ( Instances[this.Name], this );

      if ( this.element ) {

        $.widget.remove ( this.element, this );

      }

    }

    _destroy () {} // Clean the stuff, remove possible memory leaks

    /* SPECIAL */

    _make () {} // Creates the widget, if necessary
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

    option ( selector, value ) {

      if ( !selector ) {

        return _.cloneDeep ( this.options );

      } else if ( _.isString ( selector ) ) {

        if ( _.isUndefined ( value ) ) {

          return _.cloneDeep ( _.get ( this.options, selector ) );

        } else {

          this._setOption ( selector, value );

        }

      } else if ( _.isPlainObject ( selector ) ) {

        for ( let prop in selector ) {

          if ( !selector.hasOwnProperty ( prop ) ) continue;

          this._setOption ( selector, value );

        }

      }

    }

    _setOption ( selector, value ) {

      _.set ( this.options, selector, value );

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

    /* LOCKING */

    lock ( namespace ) {

      this._locks[namespace] = true;

    }

    unlock ( namespace ) {

      delete this._locks[namespace];

      if ( this._lockQueues[namespace] ) {

        this._lockQueues[namespace].forEach ( callback => callback () );

        delete this._lockQueues[namespace];

      }

    }

    isLocked ( namespace ) {

      return !!this._locks[namespace];

    }

    whenUnlocked ( namespace, callback ) {

      if ( !callback ) {

        callback = namespace;
        namespace = undefined;

      }

      if ( !this.isLocked ( namespace ) ) {

        callback ();

      } else {

        if ( !this._lockQueues[namespace] ) this._lockQueues[namespace] = [];

        this._lockQueues[namespace].push ( callback );

      }

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

      events = $.eventNamespacer ( events, this.eventNamespace );

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

      events = $.eventNamespacer ( events, this.eventNamespace );

      /* REMOVING HANDLER */

      $element.off ( events, handler );

    }

    _trigger ( type, event, data ) {

      /* NORMALIZATION */

      if ( !data ) {

        if ( $.isEvent ( event ) ) {

          data = {};

        } else {

          data = event || {};
          event = undefined;

        }

      }

      /* EVENT */

      const name = ( this.name + ':' + type ).toLowerCase ();

      event = $.makeEvent ( name, event );

      /* TRIGGERING */

      this.$element.trigger ( event, data );

      return !( this.options.callbacks[type].apply ( this.element, [event].concat ( data ) ) === false || event.isDefaultPrevented () );

    }

    /* ROUTE */

    ___route () {

      this._on ( true, $.$window, 'route', this.__route );

    }

    /* BREAKPOINT */

    ___breakpoint () {

      this._on ( true, $.$window, 'breakpoint:change', this.__breakpoint );

    }

    __breakpoint () {

      let width = Breakpoints.widths[Breakpoint.current];

      /* UP */

      if ( this.options.breakpoints.up ) {

        for ( let breakpoint in this.options.breakpoints.up ) {

          if ( !this.options.breakpoints.up.hasOwnProperty ( breakpoint ) ) continue;

          if ( width >= Breakpoints.widths[breakpoint] ) {

            this[this.options.breakpoints.up[breakpoint]]();

          }

        }

      }

      /* DOWN */

      if ( this.options.breakpoints.down ) {

        for ( let breakpoint in this.options.breakpoints.down ) {

          if ( !this.options.breakpoints.down.hasOwnProperty ( breakpoint ) ) continue;

          if ( width <= Breakpoints.widths[breakpoint] ) {

            this[this.options.breakpoints.down[breakpoint]]();

          }

        }

      }

      /* ONLY */

      if ( this.options.breakpoints.only ) {

        for ( let breakpoint in this.options.breakpoints.only ) {

          if ( !this.options.breakpoints.only.hasOwnProperty ( breakpoint ) ) continue;

          if ( width === Breakpoints.widths[breakpoint] ) {

            this[this.options.breakpoints.only[breakpoint]]();

          }

        }

      }

    }

    /* KEYDOWN */

    ___keydown () {

      this._on ( $.$document, 'keydown', this.__keydown );

    }

    __keydown ( event ) {

      if ( !this.options.keyboard ) return;

      for ( let keystrokes in this.options.keystrokes ) {

        if ( !this.options.keystrokes.hasOwnProperty ( keystrokes ) ) continue;

        let keystrokesParts = keystrokes.split ( ',' );

        for ( let i = 0, l = keystrokesParts.length; i < l; i++ ) {

          let keystroke = keystrokesParts[i];

          if ( !Keyboard.keystroke.match ( event, keystroke ) ) continue;

          let toCall = this.options.keystrokes[keystrokes],
              method = _.isArray ( toCall ) ? toCall[0] : toCall,
              args   = _.isArray ( toCall ) ? _.castArray ( toCall[1] ) : [];

          if ( this[method].apply ( this, args ) !== null ) {

            event.preventDefault ();
            event.stopImmediatePropagation ();

          }

          return;

        }

      }

    }

    /* REMOVE */

    ___remove () {

      if ( this.element ) {

        this._one ( true, 'remove', this.__remove );

      }

    }

    __remove ( event ) { //FIXME: This gets triggered twice, I don't know why

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

    /* FRAMES */

    _frames ( fn ) {

      let framed = _.frames ( fn );

      framed.guid = fn.guid = ( fn.guid || $.guid++ );

      return framed;

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

      return Templates[this.Name][name] ( options );

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

  Factory.make ( Widget, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Instances, Svelto.Templates, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Keyboard, Svelto.Breakpoints, Svelto.Breakpoint ));

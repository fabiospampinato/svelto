
/* =========================================================================
 * Svelto - Widget
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../tmpl/tmpl.js
 * ========================================================================= */

//TODO: Add support for element-level options via `data-nameLowerCase-options`
//TODO: Add support for remove, right know it doesn't get triggered on `.remove ()` but only on `.trigger ( 'remove' )`

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'widget', //INFO: The name of widget, it will be used for the the jquery pluing `$.fn[name]` and for triggering widget events `name + ':' + event`
    disabled: false, //INFO: Determines if the widget is enabled or disabled
    templates: {
      base: false //INFO: It will be used as the constructor if no element is provided
    },
    options: {
      errors: { //INFO: It contains all the errors that a widget can trigger
        uninitializable: 'WidgetUninitializable' //INFO: Triggered when the widget is not initializable
      },
      datas: {}, //INFO: CSS data-* names
      classes: { //INFO: CSS classes to attach inside the widget
        disabled: 'disabled' //INFO: Attached to disabled widgets
      },
      selectors: {}, //INFO: Selectors to use inside the widget
      animations: {}, //INFO: Object storing all the milliseconds required for each animation to occur
      callbacks: {} //INFO: Callbacks to trigger on specific events
    }
  };

  /* WIDGET */

  class Widget {

    constructor ( options, element ) {

      /* ATTACH CONFIG */

      _.extend ( this, this._getConfig ( options ) );

      /* CHECK IF INITIALIZABLE */

      if ( !element && !this.templates.base ) {

        throw this.errors.uninitializable;

      }

      /* INIT ELEMENT */

      this.$element = $(element || this._tmpl ( 'base', this.options ) );
      this.element = this.$element[0];

      /* ATTACH INSTANCE */

      $.data ( this.element, 'instance.' + this.name, this );

      /* SET GUID */

      this.guid = $.guid++;

      /* SET DISABLED */

      this.disabled = this.$element.hasClass ( this.options.classes.disabled );

      /* CALLBACKS */

      this._variables ();
      this._init ();
      this._events ();

    }

    _getConfig ( options ) {

      /* VARIABLES */

      let configs = [],
          prototype = Object.getPrototypeOf ( this );

      /* PROTOTYPE CHAIN */

      while ( prototype ) {

        if ( prototype.constructor.config ) {

          configs.push ( prototype.constructor.config );

        }

        prototype = Object.getPrototypeOf ( prototype );

      }

      /* CONFIG */

      configs.push ( {} );

      configs.reverse ();

      if ( options ) {

        configs.push ({ options: options });

      }

      let createOptions = this._createOptions ();

      if ( createOptions ) {

        configs.push ({ options: createOptions });

      }

      return _.merge ( ...configs );

    }

    destroy () {

      this._destroy ();

      $.removeData ( this.element, 'instance.' + this.name );

      return this;

    }

    /* SPECIAL */

    _createOptions () {} //INFO: Used to pass extra options

    _widgetize () {} //INFO: Gets a parent node, from it find and initialize all the widgets

    _variables () {} //INFO: Init your variables inside this function
    _init () {} //INFO: Perform the init stuff inside this function
    _events () {} //INFO: Bind the event handlers inside this function

    _destroy () {} //INFO: Clean the stuff, remove possible memory leaks

    /* WIDGET */

    widget () {

      return this.$element;

    }

    /* INSTANCE */

    instance () {

      return this;

    }

    /* OPTIONS */

    option ( key, value ) {

      if ( !key ) { //INFO: Returns a clone of the options object

        return _.cloneDeep ( this.options );

      }

      if ( _.isString ( key ) ) { //INFO: Handle nested keys, for example: 'foo.bar' => { foo: { bar: '' } }

        let options = {},
            parts = key.split ( '.' );

        key = parts.shift ();

        if ( parts.length ) {

          let currentOption = options[key] = _.extend ( {}, this.options[key] );

          for ( let part of parts ) {

            currentOption[part] = currentOption[part] || {};
            currentOption = currentOption[part];

          }

          key = parts.pop ();

          if ( arguments.length === 1 ) {

            return _.isUndefined ( currentOption[key] ) ? null : currentOption[key];

          }

          currentOption[key] = value;

        } else { //INFO: Handle single level property

          if ( arguments.length === 1 ) {

            return _.isUndefined ( this.options[key] ) ? null : this.options[key];

          }

          options[key] = value;

        }

      } else if ( _.isPlainObject ( key ) ) { //INFO: Set multiple properties

        this._setOptions ( key );

      }

      return this;

    }

    _setOptions ( options ) {

      for ( let key in options ) {

        this._setOption ( key, options[key] );

      }

      return this;

    }

    _setOption ( key, value ) {

      this.options[key] = value;

      return this;

    }

    /* ENABLED */

    enable () {

      if ( this.disabled ) {

        this.disabled = false;

        this.$element.removeClass ( this.options.classes.disabled );

      }

      return this;

    }

    isEnabled () {

      return !this.disabled;

    }

    /* DISABLED */

    disable () {

      if ( !this.disabled ) {

        this.disabled = true;

        this.$element.addClass ( this.options.classes.disabled );

      }

      return this;

    }

    isDisabled () {

      return this.disabled;

    }

    /* EVENTS */

    _on ( suppressDisabledCheck, $element, events, selector, handler, onlyOne ) {

      //TODO: Add support for custom data

      /* NORMALIZING PARAMETERS */

      if ( !_.isBoolean ( suppressDisabledCheck ) ) {

        onlyOne = handler;
        handler = selector;
        selector = events;
        events = $element;
        $element = suppressDisabledCheck;
        suppressDisabledCheck = false;

      }

      if ( !( $element instanceof $ ) ) {

        onlyOne = handler;
        handler = selector;
        selector = events;
        events = $element;
        $element = this.$element;

      }

      if ( !_.isString ( selector ) ) {

        onlyOne = handler;
        handler = selector;
        selector = false;

      }

      /* PROXY */

      let handlerProxy = ( ...args ) => {

        if ( !suppressDisabledCheck && this.disabled ) return;

        return handler.apply ( this, args );

      };

      /* PROXY GUID */

      handlerProxy.guid = handler.guid = ( handler.guid || $.guid++ );

      /* TRIGGERING */

      $element[onlyOne ? 'one' : 'on'] ( events, selector, handlerProxy );

      return this;

    }

    _one ( ...args ) { //FIXME: Does it work?

      return this._on ( ...args, true );

    }

    _onHover ( $element, args ) {

      //FIXME: If we remove the target we are still attaching and removing thos events thoug (just performing the functions calls actually, probably)

      if ( !args ) {

        args = $element;
        $element = this.$element;

      }

      this._on ( $element, Pointer.enter, () => this._on ( ...args ) );
      this._on ( $element, Pointer.enter, () => this._off ( ...args ) );

      return this;

    }

    _off ( $element, events, handler ) {

      /* NORMALIZING PARAMETERS */

      if ( !handler ) {

        handler = events;
        events = $element;
        $element = this.$element;

      }

      /* REMOVING HANDLER */

      $element.off ( events, handler );

      return this;

    }

    _trigger ( events, data = {} ) {

      let name = this.name.toLowerCase ();

      events = events.split ( ' ' );

      for ( let event of events ) {

        this.$element.trigger ( name + ':' + event, data );

        this.options.callbacks[event].call ( this.element, data );

      }

      return this;

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

      return $.frame ( () => fn () );

    }

    /* DEBOUNCING */

    _debounce ( fn, wait, options ) { //TODO: Test it, expecially regarding the `this` variable

      let debounced = _.debounce ( fn, wait, options );

      debounced.guid = fn.guid = ( fn.guid || $.guid++ );

      return debounced;

    }

    /* THROTTLING */

    _throttle ( fn, wait, options ) { //TODO: Test it, expecially regarding the `this` variable

      let throttled = _.throttle ( fn, wait, options );

      throttled.guid = fn.guid = ( fn.guid || $.guid++ );

      return throttled;

    }

    /* TEMPLATE */

    _tmpl ( name, options = {} ) {

      return $.tmpl ( this.name.toLowerCase () + '.' + name, options );

    }

    /* INSERTION */

    insertBefore ( selector ) {

      this.$element.insertBefore ( selector );

      return this;

    }

    insertAfter ( selector ) {

      this.$element.insertAfter ( selector );

      return this;

    }

    prependTo ( selector ) {

      this.$element.prependTo ( selector );

      return this;

    }

    appendTo ( selector ) {

      this.$element.appendTo ( selector );

      return this;

    }

  }

  /* BINDING */

  Svelto.Widget = Widget;
  Svelto.Widget.config = config;

}( jQuery, _, window, document ));

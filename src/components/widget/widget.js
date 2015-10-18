
/* =========================================================================
 * Svelto - Widget v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../tmpl/tmpl.js
 * ========================================================================= */

//TODO: Add support for _trigger -> preventDefault //TODO: Check if it works right now
//TODO: Add support for element-level options via `data-name-options`

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* WIDGET */

  $.Widget = function () {};

  $.Widget._childConstructors = []; //TODO: Remove if not necessary

  /* PROTOTYPE */

  $.Widget.prototype = {

    /* NAMES */

    namespace: false,
    name: 'widget',
    fullName: 'widget', //INFO: `namespace.name`

    /* HTML */

    html: '<div>', //INFO: It will be used as a constructor if no element or base template is provided

    /* TEMPLATES */

    templates: {
      base: false //INFO: It will be used as the constructor if no element is provided
    },

    /* OPTIONS */

    options: {
      errors: {}, //INFO: It contains all the errors that a widget can trigger
      datas: {}, //INFO: CSS data-* names
      classes: {}, //INFO: CSS classes to attach inside the widget
      selectors: {}, //INFO: Selectors to use inside the widget
      animations: {}, //INFO: Object storing all the milliseconds required for each animation to occur
      callbacks: {}, //INFO: Callbacks to trigger on specific events
      disabled: false //INFO: Determines if the widget is enabled or disabled
    },

    /* WIDGET METHODS */

    _create: function ( options, element ) {

      // CHECK IF INITIALIZABLE

      if ( !element && !this.templates.base && !this.html ) {

        throw 'WidgetUninitializable';

      }

      // MERGE OPTIONS

      this.options = _.merge ( {}, this.options, this._createOptions (), options );

      // INIT ELEMENT

      this.$element = $(element || ( this.templates.base ? this._tmpl ( 'base', this.options ) : this.html ) );
      this.element = this.$element[0];

      // SET GUID

      this.guid = $.guid++;

      // SET DISABLED

      this.options.disabled = this.options.disabled || this.$element.hasClass ( 'disabled' );

      // SAVE WIDGET INSTANCE

      $.data ( this.element, this.fullName, this );

      // ON $ELEMENT REMOVE -> WIDGET DESTROY

      this._on ( true, 'remove', function ( event ) {

        if ( event.target === this.element ) {

          this.destroy ( event );

        }

      });

      // CALLBACKS

      this._variables ();

      this._init ();

      this._events ();

    },

    _createOptions: _.noop, //INFO: Returns an options object that will be used for the current widget instance, generated during widget instantiation

    _variables: _.noop, //INFO: Init your variables inside this function
    _init: _.noop, //INFO: Perform the init stuff inside this function
    _events: _.noop, //INFO: Bind the event handlers inside this function

    destroy: function () {

      this._destroy ();

      $.removeData ( this.element, this.fullName );

    },

    _destroy: _.noop,

    widget: function () {

      return this.$element;

    },

    /* OPTIONS METHODS */

    option: function ( key, value ) {

      if ( arguments.length === 0 ) { //INFO: Returns a clone of the options object

        return _.cloneDeep ( this.options );

      }

      if ( _.isString ( key ) ) { //INFO: Handle nested keys, for example: 'foo.bar' => { foo: { bar: '' } }

        var options = {},
            parts = key.split ( '.' );

        key = parts.shift ();

        if ( parts.length ) {

          var curOption = options[key] = _.extend ( {}, this.options[key] );

          for ( var i = 0; i < parts.length - 1; i++ ) {

            curOption[parts[i]] = curOption[parts[i]] || {};
            curOption = curOption[parts[i]];

          }

          key = parts.pop ();

          if ( arguments.length === 1 ) {

            return _.isUndefined ( curOption[key] ) ? null : curOption[key];

          }

          curOption[key] = value;

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

    },

    _setOptions: function ( options ) {

      for ( var key in options ) {

        this._setOption ( key, options[key] );

      }

      return this;

    },

    _setOption: function ( key, value ) {

      this.options[key] = value;

      if ( key === 'disabled' ) {

        this.$element.toggleClass ( 'disabled', !!value );

      }

      return this;

    },

    /* ENABLED */

    enable: function () {

      return this._setOptions ({ disabled: false });

    },

    isEnabled: function () {

      return !this.options.disabled;

    },

    /* DISABLED */

    disable: function () {

      return this._setOptions ({ disabled: true });

    },

    isDisabled: function () {

      return this.options.disabled;

    },

    /* EVENTS */

    _on: function ( suppressDisabledCheck, $element, events, selector, handler, onlyOne ) {

      //TODO: Add support for custom data

      // SAVE A REFERENCE TO THIS

      var instance = this;

      // NORMALIZING OPTIONS

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

      // SUPPORT FOR STRING HANDLERS REFERRING TO A SELF METHOD

      handler = _.isString ( handler ) ? this[handler] : handler;

      // PROXY

      function handlerProxy () {

        if ( !suppressDisabledCheck && instance.options.disabled ) return;

        var args = _.slice ( arguments );

        args.push ( this );

        return handler.apply ( instance, args );

      }

      // PROXY GUID

      handlerProxy.guid = handler.guid = ( handler.guid || handlerProxy.guid || $.guid++ );

      // TRIGGERING

      if ( selector ) { // DELEGATED

        $element[onlyOne ? 'one' : 'on'] ( events, selector, handlerProxy );

      } else { // NORMAL

        $element[onlyOne ? 'one' : 'on'] ( events, handlerProxy );

      }

      return this;

    },

    _one: function () {

      var args = arguments;

      Array.prototype.push.call ( args, true );

      this._on.apply ( this, args );

    },

    _onHover: function ( $element, args ) {

      //FIXME: If we remove the target we are still attaching and removing thos events thoug (just performing the functions calls actually, probably)

      if ( !args ) {

        args = $element;
        $element = this.$element;

      }

      this._on ( $element, Pointer.enter, function () {

        this._on.apply ( this, args );

      });

      this._on ( $element, Pointer.leave, function () {

        this._off.apply ( this, args );

      });

    },

    _off: function ( $element, events, handler ) {

      // NORMALIZING OPTIONS

      if ( !handler ) {

        handler = events;
        events = $element;
        $element = this.$element;

      }

      // SUPPORT FOR STRING HANDLERS REFERRING TO A SELF METHOD

      handler = _.isString ( handler ) ? this[handler] : handler;

      // REMOVING HANDLER

      $element.off ( events, handler );

      return this;

    },

    _trigger: function ( events, data ) {

      data = data || {};

      events = events.split ( ' ' );

      for ( var ei = 0, el = events.length; ei < el; ei++ ) {

        this.$element.trigger ( this.name + ':' + events[ei], data );

        if ( _.isFunction ( this.options.callbacks[events[ei]] ) ) {

          this.options.callbacks[events[ei]].call ( this.element, data );

        }

      }

      return this;

    },

    /* DELAYING */

    _delay: function ( fn, delay ) {

      var instance = this;

      return setTimeout ( function () {

        fn.apply ( instance );

      }, delay || 0 );

    },

    /* DEFER */

    _defer: function ( fn ) {

      return this._delay ( fn );

    },

    /* FRAME */

    _frame: function ( fn ) {

      var instance = this;

      return $.frame ( function () {

        fn.apply ( instance );

      });

    },

    /* DEBOUNCING */

    _debounce: function ( fn, wait, options ) { //TODO: Test it, expecially regarding the `this` variable

      return _.debounce ( fn, wait, options );

    },

    /* THROTTLING */

    _throttle: function ( fn, wait, options ) { //TODO: Test it, expecially regarding the `this` variable

      return _.throttle ( fn, wait, options );

    },

    /* TEMPLATE */

    _tmpl: function ( name, options ) {

      return $.tmpl ( this.fullName + '.' + name, options || {} );

    },

    /* INSERTION */

    insertBefore: function ( selector ) {

      this.$element.insertBefore ( selector );

      return this;

    },

    insertAfter: function ( selector ) {

      this.$element.insertAfter ( selector );

      return this;

    },

    prependTo: function ( selector ) {

      this.$element.prependTo ( selector );

      return this;

    },

    appendTo: function ( selector ) {

      this.$element.appendTo ( selector );

      return this;

    }

  };

}( jQuery, _, window, document ));

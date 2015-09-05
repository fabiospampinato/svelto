
/* =========================================================================
 * Svelto - @FILE-NAME-UPPERCASED v0.1.0
  *
 * http://getsvelto.com/@FILE-NAME
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../tmpl/tmpl.js
 * ========================================================================= */

//TODO: Add support for _trigger -> preventDefault

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* BASE WIDGET */

    $.Widget = function ( /* options, element */ ) {};

    $.Widget._childConstructors = [];

    $.Widget.prototype = {

        /* VARIABLES */

        widgetOriginalName: 'widget',
        widgetName: 'widget',
        widgetFullName: 'widget',

        defaultElement: false,
        templates: {}, //INFO: The `base` template will be used as the constructor

        /* OPTIONS */

        options: {
            callbacks: {}
        },

        /* WIDGET FUNCTIONS */

        _createWidget: function ( options, element ) {

            // VARIABLES

            this.initializationType = element
                                          ? 'element'
                                          : this.defaultElement
                                              ? 'html'
                                              : this.templates.base
                                                  ? 'template'
                                                  : 'none';

            /* EXTEND OPTIONS */

            this.options = _.merge ( {}, this.options, this._getCreateOptions (), options );

            if ( this.initializationType === 'element' ) {

                _.merge ( this.options, $(element).data ( this.widgetName ) );

            }

            // INIT ELEMENT

            element = $( element || this.defaultElement || ( this.templates.base ? this._tmpl ( 'base', this.options ) : false ) || this ).get ( 0 );

            this.element = element;
            this.$element = $(element);

            this.guid = _.uniqueId ();

            // DISABLED

            this.options.disabled = ( options && options.disabled ) ? options.disabled : this.$element.hasClass ( this.widgetName + '-disabled' );

            // SAVING INSTANCE

            $.data ( this.element, this.widgetFullName, this );

            // ON $ELEMENT REMOVE -> WIDGET DESTROY

            this._on ( true, this.$element, 'remove', function ( event ) {

                if ( event.target === this.element ) {

                    this.destroy ();

                }

            });

            /* CALLBACKS */

            this._create ();

            this._trigger ( 'create', this._getCreateEventData () );

            this._variables ();

            this._init ();

            this._events ();

        },

        _getCreateOptions: _.noop,
        _getCreateEventData: _.noop,
        _create: _.noop,
        _variables: _.noop,
        _init: _.noop,
        _events: _.noop,

        destroy: function () {

            this._destroy ();

            $.removeData ( this.element, this.widgetFullName );

        },

        _destroy: _.noop,

        widget: function () {

            return this.$element;

        },

        /* OPTIONS FUNCTIONS */

        option: function ( key, value ) {

            if ( arguments.length === 0 ) {

                return _.cloneDeep ( this.options );

            }

            var options = key,
                parts,
                curOption,
                i;

            if ( typeof key === 'string' ) {

                // handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }

                options = {};
                parts = key.split ( '.' );
                key = parts.shift ();

                if ( parts.length ) {

                    curOption = options[key] = _.extend ( {}, this.options[key] );

                    for ( i = 0; i < parts.length - 1; i++ ) {

                        curOption[parts[i]] = curOption[parts[i]] || {};
                        curOption = curOption[parts[i]];

                    }

                    key = parts.pop ();

                    if ( arguments.length === 1 ) {

                        return curOption[key] === undefined ? null : curOption[key];

                    }

                    curOption[key] = value;

                } else {

                    if ( arguments.length === 1 ) {

                        return this.options[key] === undefined ? null : this.options[key];

                    }

                    options[key] = value;

                }

            }

            this._setOptions ( options );

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

                this.$element.toggleClass ( this.widgetName + '-disabled', !!value );

            }

            return this;

        },

        /* ENABLING / DISABLING */

        enable: function () {

            return this._setOptions ({ disabled: false });

        },

        disable: function () {

            return this._setOptions ({ disabled: true });

        },

        /* EVENTS */

        _on: function ( suppressDisabledCheck, $element, events, selector, handler ) {

            //TODO: Add support for custom data

            var instance = this;

            if ( typeof suppressDisabledCheck !== 'boolean' ) {

                handler = selector;
                selector = events;
                events = $element;
                $element = suppressDisabledCheck;
                suppressDisabledCheck = false;

            }

            if ( !( $element instanceof $ ) ) {

                handler = selector;
                selector = events;
                events = $element;
                $element = this.$element;

            }

            if ( selector && !handler ) {

                handler = selector;
                selector = false;

            }

            handler = _.isString ( handler ) ? this[handler] : handler;

            function handlerProxy () {

                if ( !suppressDisabledCheck && ( instance.options.disabled || instance.$element.hasClass ( instance.widgetName + '-disabled' ) ) ) return;

                var args = _.slice ( arguments );

                args.push ( this );

                return handler.apply ( instance, args );

            }

            handlerProxy.guid = handler.guid = ( handler.guid || handlerProxy.guid || $.guid++ );

            if ( selector ) {

                $element.on ( events, selector, handlerProxy );

            } else {

                $element.on ( events, handlerProxy );

            }

        },

        _off: function ( $element, events, handler ) {

            if ( !handler ) {

                handler = events;
                events = $element;
                $element = this.$element;

            }

            handler = _.isString ( handler ) ? this[handler] : handler;

            $element.off ( events, handler );

        },

        _trigger: function ( events, data ) {

            data = data || {};

            events = events.split ( ' ' );

            for ( var ei = 0, el = events.length; ei < el; ei++ ) {

                this.$element.trigger ( this.widgetName + ':' + events[ei], data );

                if ( typeof this.options.callbacks[events[ei]] === 'function' ) {

                    this.options.callbacks[events[ei]].call ( this.element, data );

                }

            }

        },

        /* DELAYING */

        _delay: function ( handler, delay ) {

            var instance = this;

            return setTimeout ( function () {

                handler.apply ( instance, arguments );

            }, delay || 0 );

        },

        /* TEMPLATE */

        _tmpl: function ( name, options ) {

            return $.tmpl ( this.widgetOriginalName + '.' + name, options );

        },

        /* MANIPULATION */

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


/* WIDGET */

;(function ( $, window, document, undefined ) {

    $.widget = function ( /* options, element */ ) {};

    $.widget._childConstructors = [];

    $.widget.prototype = {

        /* VARIABLES */

        defaultElement: '<div>',

        /* WIDGET PROPS */

        widget: {
            name: 'widget',
            fullName: 'widget'
        },

        /* OPTIONS */

        options: {
            disabled: false, //TODO: init/set it dinamically on instantiation
            callback: {}
        },

        /* WIDGET FUNCTIONS */

        _createWidget: function ( options, element ) {
            // VARIABLES

            element = $( element || this.defaultElement || this )[0];

            this.element = element;
            this.$element = $(element);

            this.uuid = _.uniqueId ();

            // IF THERE'S AN ELEMENT OR A DEFAULT ELEMENT

            if ( element !== this ) {

                // SAVING INSTANCE

                $.data ( this.element, this.widget.fullName, this );

                // ON $ELEMENT REMOVE -> WIDGET DESTROY

                this._on ( true, this.$element, 'remove', function ( event ) {

                    if ( event.target === this.element ) {

                        this.destroy ();

                    }

                });

            }

            //TODO: not setting this.document and this.window

            /* EXTEND OPTIONS */

            _.extend ( this.options, options ); //TODO: maybe do this.options = ..., but why?

            /* CALLBACKS */

            this._create ();

            this._trigger ( 'create' );

            this._init ();

        },

        _create: $.noop,
        _init: $.noop,
        _ready: $.noop,

        destroy: function () {

            this._destroy ();

            $.data ( this.element, this.widget.fullName, null ); //TODO: remove it, not set it to null

        },

        _destroy: $.noop,

        widget: function () {

            return this.$element;

        },

        /* OPTIONS FUNCTIONS */

        option: function ( key, value ) {

            if ( arguments.length === 0 ) {

                return _.extend ( {}, this.options );

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

                this.$element.toggleClass ( this.widget.fullName + '-disabled', !!value );

            }

            return this;

        },

        /* ENABLING / DISABLING */

        enable: function () {

            return this._setOptions ( { disabled: false } );

        },

        disable: function () {

            return this._setOptions ( { disabled: true } );

        },

        /* EVENTS */

        _on: function ( suppressDisabledCheck, $element, events, handler ) {

            //TODO: add support for handlers as functions, not just for string name of a method

            var instance = this;

            if ( typeof suppressDisabledCheck !== 'boolean' ) {

                handler = events;
                events = $element;
                $element = suppressDisabledCheck;
                suppressDisabledCheck = false;

            }

            if ( !handler ) {

                handler = events;
                events = $element;
                $element = this.$element;

            }

            if ( suppressDisabledCheck ) {

                var handlerProxy = (function ( handler ) {

                    return function () {

                        if ( instance.options.disabled ) return;

                        return handler.apply ( instance, arguments );

                    };

                }( this[handler] ));

            } else {

                var handlerProxy = (function ( handler ) {

                    return function () {

                        return handler.apply ( instance, arguments );

                    };

                }( this[handler] ));

            }

            var new_handler = '_proxy_' + ( suppressDisabledCheck ? 'check_' : '' ) + handler;

            this[new_handler] = handlerProxy;

            $element.on ( events, this[new_handler] );

        },

        _off: function ( $element, events, handler ) {

            //TODO: add support for handlers as functions, not just for string name of a method

            if ( !handler ) {

                handler = events;
                events = $element;
                $element = this.$element;

            }

            if ( this['_proxy_' + handler] ) {

                $element.off ( events, this['_proxy_' + handler] );

            }

            if ( this['_proxy_check_' + handler] ) {

                $element.off ( events, this['_proxy_check_' + handler] );

            }

        },

        _trigger: function ( events ) {

            this.$element.trigger ( events );

            events = events.split ( ' ' );

            for ( var ei = 0, el = events.length; ei < el; ei++ ) {

                if ( typeof this.options.callback[events[ei]] === 'function' ) {

                    this.options.callback[events[ei]].apply ( this.element );

                }

            }

        },

        /* DELAYING / DEFERRING */

        _delay: function ( handler, delay ) {

            var instance = this;

            return setTimeout ( function () {

                handler.apply ( instance, arguments );

            }, delay || 0 );

        },

        _defer: function ( handler, delay ) {

            var instance = this;

            return setTimeout ( function () {

                document.documentElement.offsetHeight; //INFO: Requesting the `offsetHeight` property triggers a reflow. Necessary, so that the deferred callback will be executed in another cycle

                handler.apply ( instance, arguments );

            }, delay || 0 );

        }

    };

}( lQuery, window, document ));


/* WIDGET FACTORY */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* WIDGET FACTORY */

    $.widget = function ( name, base, prototype ) {

        /* VARIABLES */

        var fullName,
            existingConstructor,
            constructor,
            basePrototype,
            proxiedPrototype = {},
            nameParts = name.split ( '.' ),
            namespace = nameParts.length > 1 ? nameParts[0] : false;

        name = nameParts.length > 1 ? nameParts[1] : nameParts[0];
        fullName = namespace ? namespace + '-' + name : name;

        /* NO BASE */

        if ( !prototype ) {

            prototype = base;
            base = $.Widget;

        }

        /* NAMESPACE */

        if ( namespace ) {

            $[namespace] = $[namespace] || {};

        }

        /* CONSTRUCTOR */

        existingConstructor = namespace ? $[namespace][name] : $[name];

        constructor = function ( options, element ) {

            if ( !this._createWidget ) {

                return new constructor ( options, element );

            }

            if ( arguments.length ) {

                this._createWidget ( options, element );

            }

        }

        if ( namespace ) {

            $[namespace][name] = constructor;

        } else {

            $[name] = constructor;

        }

        /* EXTENDING CONSTRUCTOR IN ORDER TO CARRY OVER STATIC PROPERTIES */

        _.extend ( constructor, existingConstructor, {
            _proto: _.extend ( {}, prototype ),
            _childConstructors: []
        });

        /* BASE PROTOTYPE */

        basePrototype = new base ();

        basePrototype.options = _.extend ( {}, basePrototype.options );

        /* PROXIED PROTOTYPE */

        for ( var prop in prototype ) {

            if ( typeof prototype[prop] !== 'function' ) {

                proxiedPrototype[prop] = prototype[prop];
                continue;

            }

            proxiedPrototype[prop] = (function ( prop ) {

                var _super = function () {
                        return base.prototype[prop].apply ( this, arguments );
                    },
                    _superApply = function ( args ) {
                        return base.prototype[prop].apply ( this, args );
                    };

                return function () {

                    var __super = this._super,
                        __superApply = this._superApply,
                        returnValue;

                    this._super = _super;
                    this._superApply = _superApply;

                    returnValue = prototype[prop].apply ( this, arguments );

                    this._super = __super;
                    this._superApply = __superApply;

                    return returnValue;

                };

            })( prop );

        }

        /* CONSTRUCTOR PROTOTYPE */

        constructor.prototype = _.extend ( basePrototype, proxiedPrototype, {
            constructor: constructor,
            templateConstructor: ( prototype.defaultTemplate ? $.tmpl ( prototype.defaultTemplate ) : $.noop ),
            namespace: namespace,
            widgetName: name,
            widgetFullName: fullName
        });

        /* UPDATE PROTOTYPE CHAIN */

        if ( existingConstructor ) {

            for ( var i = 0, l = existingConstructor._childConstructors.length; i < l; i++ ) {

                var childPrototype = existingConstructor._childConstructors[i].prototype;

                $.widget ( ( childPrototype.namespace ? childPrototype.namespace + '.' + childPrototype.widgetName : childPrototype.widgetName ), constructor, existingConstructor._childConstructors[i]._proto );

            }

            delete existingConstructor._childConstructors;

        } else {

            base._childConstructors.push ( constructor );

        }

        /* CONSTRUCT */

        $.widget.bridge ( name, constructor );

        /* RETURN */

        return constructor;

    };

    $.widget.bridge = function ( name, object ) {

        /* VARIABLES */

        var fullName = object.prototype.widgetFullName || name;

        /* PLUGIN */

        $.fn[name] = function ( options ) {

            if ( this.length === 0 && !object.prototype.defaultElement && !object.prototype.defaultTemplate ) return; //INFO: nothing to work on

            var isMethodCall = ( typeof options === 'string' ),
                args = Array.prototype.slice.call ( arguments, 1 ),
                returnValue = this;

            if ( isMethodCall ) {

                /* METHOD CALL */

                this.each ( function () {

                    /* VARIABLES */

                    var methodValue,
                        instance = $.data ( this, fullName );

                    /* GETTING INSTANCE */

                    if ( options === "instance" ) {

                        returnValue = instance;

                        return false;

                    }

                    /* CHECKING VALID CALL */

                    if ( !instance ) return; //INFO: No instance found

                    if ( !(typeof instance[options] === 'function') || options.charAt ( 0 ) === '_' ) return; //INFO: Private method

                    /* CALLING */

                    methodValue = instance[options].apply ( instance, args );

                    if ( methodValue !== instance && methodValue !== undefined ) {

                        returnValue = methodValue;

                        return false;

                    }

                });

            } else {

                /* SUPPORT FOR PASSING MULTIPLE OPTIONS OBJECTS */

                if ( args.length ) {

                    options = _.extend.apply ( null, [options].concat ( args ) );

                }

                /* INSTANCIATING */

                this.each ( function () {

                    /* GET INSTANCE */

                    var instance = $.data ( this, fullName );

                    if ( instance ) {

                        /* INIT */

                        instance.option ( options || {} );

                        instance._init ();

                    } else {

                        /* INSTANCIATING */

                        $.data ( this, fullName, new object ( options, this ) );

                    }

                });

            }

            return returnValue;

        };

    };

}( lQuery, window, document ));

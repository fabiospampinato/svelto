
/* FACTORY */

;(function ( $, window, document, undefined ) {

    $.factory = function ( name, base, prototype ) {

        /* VARIABLES */

        var fullName,
            existingConstructor,
            constructor,
            basePrototype,
            proxiedPrototype = {},
            namespace = name.split ( '.' )[0];

        name = name.split ( '.' )[1];
        fullName = namespace + '-' + name;

        /* NO BASE */

        if ( !prototype ) {

            prototype = base;
            base = $.widget;

        }

        /* NAMESPACE */

        $[namespace] = $[namespace] || {};

        /* CONSTRUCTOR */

        existingConstructor = $[namespace][name];

        constructor = $[namespace][name] = function ( options, element ) {

            if ( !this._createWidget ) {

                return new constructor ( options, element );

            }

            if ( arguments.length ) {

                this._createWidget ( options, element );

            }

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

            if ( !(typeof prototype[prop] === 'function') ) {

                proxiedPrototype[prop] = prototype[prop];
                continue;

            }

            proxiedPrototype[prop] = (function () {

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

                    returnValue = value.apply ( this, arguments );

                    this._super = __super;
                    this._superApply = __superApply;

                    return returnValue;

                };

            })();

        }

        /* CONSTRUCTOR PROTOTYPE */

        constructor.prototype = _.extend ( basePrototype, proxiedPrototype, {
            constructor: constructor,
            namespace: namespace,
            widget: {
                name: name,
                fullName: fullName
            }
        });

        /* UPDATE PROTOTYPE CHAIN */

        if ( existingConstructor ) {

            for ( var i = 0, l = existingConstructor._childConstructors.length; i < l; i++ ) {

                var childPrototype = existingConstructor._childConstructors[i].prototype;

                $.factory ( childPrototype.namespace + '.' + childPrototype.widget.name, constructor, existingConstructor._childConstructors[i]._proto );

            }

            delete existingConstructor._childConstructors;

        } else {

            base._childConstructors.push ( constructor );

        }

        /* CONSTRUCT */

        $.factory.bridge ( name, constructor );

        /* READY */

        if ( constructor.prototype._ready ) {

            $(constructor.prototype._ready);

        }

        /* RETURN */

        return constructor;

    };

    $.factory.bridge = function ( name, object ) {

        /* VARIABLES */

        var fullName = object.prototype.widget.fullName || name;

        /* PLUGIN */

        $.fn[name] = function ( options ) {

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

                        if ( instance._init ) {

                            instance._init ();

                        }

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

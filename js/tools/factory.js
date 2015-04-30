
/*
 * Project: Plugin factory
 * Description: A common boilerplate for lQuery plugins
 * Features: Ability to override global options, getters and setters for local options.
 *           Support for public and private methods (prefixed by `_`).
 *           Easily expose public methods.
 *           Avoid multiple instantation.
 *           Support for chainable plugin: if we call an API we will return the collection by default, but if we get the instance and call it's method directly they are chainable.
 * Special methods: `init`: called after creating a new instance
 *                  `instance`: return the instance of the plugin, it can also be chainable and it supports calls on private methods
 *                  `destroy`: called for resetting the wrapped elements, also deletes the instance reference from `$.data`
 *                  'call': called every time the plugin is invoked, except when the special `ready` or `destroy` functions are invoked, before the actual method called
 *                  `ready`: called when the dom is ready
 *                  `option`: no need to implement it on your own, it provide getter and setter for all plugins
 *                  `hook`: overridable function that triggers a callback, if is defined in the options
 * Special events: `onInit`: called after `init`
 *                 `onDestroy`: called after `destroy`
 *                 `onCall`: called after `call`
 * Author: Fabio Spampinato - spampinabio@gmail.com
 * License: //TODO
 * Usage: $.factory ( name, function ); // The function will be called every time the plugin is called, it behaves like a shorthand for a plugin with the onlu `call` method specified
 *        $.factory ( name, prototype ); // prototype.init will be called during instantiation
 *        $.factory ( name, options, function ); // same as up but faster, basically with options added //FIXME: write it better
 *        $.factory ( name, options, prototype ); // prototype.init will be called during instantiation
 */

//TODO: maybe add a defer method

;(function ( $, window, document, undefined ) {

    $.factory = function ( name, options, prototype ) {

        if ( typeof options === 'object' ) {

            if ( typeof prototype === 'function' ) {

                prototype = {
                    call: prototype
                };

            } else if ( typeof prototype !== 'object' ) {

                prototype = options;

                options = prototype.options || {};

            }

        } else if ( typeof options === 'function' ) {

            prototype = {
                call: options
            };

            options = {};

        } else {

            return;

        }

        if ( typeof prototype.hook !== 'function' ) {

            prototype.hook = function ( name ) {

                if ( typeof this.options[name] === 'function' ) {

                    this.options[name].apply ( this, Array.prototype.slice.call ( arguments, 1 ) );

                }

            };

        }

        var Plugin = function ( node, options ) {

            this.node = node;

            this.$node = $(node); //TODO: optimize

            this.metaoptions = this.$node.data ( name + '-options' );

            this.options = $.extend ( {}, $.fn[name].options, options, this.metaoptions );

            this.defaults = $.fn[name].options;

            this.uuid = _.uniqueId ();

            return this;

        };

        Plugin.prototype = prototype;

        $.fn[name] = function ( options ) {

            var instance,
                return_val,
                temp;

            for ( var i = 0, l = this.length; i < l; i++ ) {

                instance = $.data ( this.nodes[i], 'instance-' + name );

                if ( instance === undefined ) {

                    instance = new Plugin ( this.nodes[i], options ); //FIXME: Make it more portable

                    $.data ( this.nodes[i], 'instance-' + name, instance );

                    if ( typeof instance.init === 'function' ) {

                        instance.init ();

                    }

                    if ( typeof instance.options.onInit === 'function' ) {

                        instance.options.onInit.apply ( instance );

                    }

                }

                if ( instance instanceof Plugin ) {

                    if ( options === 'instance' ) {

                        return instance;

                    } else if ( options === 'destroy' ) {

                        $.data ( this.nodes[i], 'instance-' + name, null ); //FIXME: Make it more portable //TODO: remove instance if null is passed

                        if ( typeof instance.destroy === 'function' ) {

                            instance.destroy ();

                        }

                        if ( typeof instance.options.onDestroy === 'function' ) {

                            instance.options.onDestroy.apply ( instance );

                        }

                    } else if ( options === 'option' ) { //TODO: support for multi level options

                        if ( typeof arguments[1] === 'string' ) {

                            if ( arguments[2] !== undefined ) {

                                instance.options[arguments[1]] = arguments[2];

                            } else {

                                return instance.options[arguments[1]];

                            }

                        }

                    } else if ( typeof instance[options] === 'function' && options[0] !== '_' && options !== 'init' && option !== 'call' && options !== 'ready' && options !== 'hook' ) {

                        if ( typeof instance.call === 'function' ) {

                            instance.call.apply ( instance, arguments );

                        }

                        if ( typeof instance.options.onCall === 'function' ) {

                            instance.options.onCall.apply ( instance, arguments );

                        }

                        temp = instance[options].apply ( instance, Array.prototype.slice.call ( arguments, 1 ) );

                        if ( return_val === undefined ) return_val = temp;

                    } else if ( typeof instance.call === 'function' ) {

                        temp = instance.call.apply ( instance, arguments ); //FIXME: I think we should escape the first value, since it should be the function name

                        if ( return_val === undefined ) return_val = temp;

                        if ( typeof instance.options.onCall === 'function' ) {

                            instance.options.onCall.apply ( instance, arguments ); //FIXME: I think we should escape the first value, since it should be the function name

                        }

                    }

                }

            }

            return ( return_val === undefined ) ? this : return_val;

        };

        $.fn[name].options = options;

        if ( typeof prototype.ready === 'function' ) {

            $.ready ( prototype.ready );

        }

    };

}( lQuery, window, document ));

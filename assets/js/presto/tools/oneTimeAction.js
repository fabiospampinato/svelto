
/* ONE TIME ACTION */

//INFO: the pipe character (|) is forbidden inside a name, cookie's ttl is 1 year

//TODO: add support for other cookie settable parameters

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* ONE TIME ACTION */

    $.oneTimeAction = function ( custom_options, action ) {

        // OPTIONS

        var options = {
            container: 'ota', //INFO: the cookie name that holds the actions, a namespace for related actions basically
            expiry: Infinity, //INFO: the expire time of the container
            name: false, //INFO: the action name
            action: false //INFO: the action to execute
        };

        if ( _.isString ( custom_options ) ) {

            options.name = custom_options;

            if ( _.isFunction ( action ) ) {

                options.action = action;

            }

        } else if ( _.isPlainObject ( custom_options ) ) {

            options = _.merge ( options, custom_options );

        }

        // ONE TIME ACTION

        if ( options.name ) {

            var action = new Action ( options.container, options.name );

            if ( options.action && !action.get () ) {

                options.action ();

                action.set ();

            }

            return action;

        } else if ( options.container ) {

            return new Container ( options.container, options.expiry );

        }

    };

    /* CONTAINER OBJ */

    var Container = function ( name, expiry ) {

        this.name = name;
        this.expiry = expiry;

        this.actionsStr = $.cookie.get ( this.name ) || '';
        this.actions = this.actionsStr.length > 0 ? this.actionsStr.split ( '|' ) : [];

    };

    Container.prototype = {

        get: function ( action ) {

            return _.contains ( this.actions, action );

        },

        set: function ( action ) {

            if ( !this.get ( action ) ) {

                this.actions.push ( action );

                this.update ();

            }

        },

        update: function () {

            this.actionsStr = this.actions.join ( '|' );

            $.cookie.set ( this.name, this.actionsStr, this.expiry );

        },

        reset: function ( action ) {

            if ( action ) {

                _.pull ( this.actions, action );

                this.update ();

            } else {

                $.cookie.remove ( this.name );

            }

        }

    };

    /* ACTION OBJ */

    var Action = function ( container, name, action ) {

        this.container = new Container ( container );
        this.name = name;

    };

    Action.prototype = {

        get: function () {

            return this.container.get ( this.name );

        },

        set: function () {

            this.container.set ( this.name );

        },

        reset: function () {

            this.container.reset ( this.name );

        }

    };

}( jQuery, _, window, document ));

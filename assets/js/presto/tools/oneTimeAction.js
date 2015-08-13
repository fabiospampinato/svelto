
/* ONE TIME ACTION */

//INFO: the pipe character (|) is forbidden as a name, cookie's ttl is 1 year

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* ONE TIME ACTION */

    $.oneTimeAction = function ( custom_options, action ) {

        // OPTIONS

        var options = {
            container: 'ota', // the cookie name that holds the actions
            name: false, // the action name
            action: false
        };

        if ( _.isString ( custom_options ) ) {

            options.name = custom_options;

            if ( _.isFunction ( action ) ) {

                options.action = action;

            }

        } else if ( _.isPlainObject ( custom_options ) ) {

            $.extend ( options, custom_options );

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

            return new Container ( options.container );

        }

    };

    /* CONTAINER OBJ */

    var Container = function ( name ) {

        this.name = name;

        this.actionsStr = $.cookie.read ( this.name ) || '';
        this.actions = this.actionsStr.split ( '|' );

    };

    Container.prototype = {

        get: function ( action ) {

            return ( this.actions.indexOf ( action ) !== -1 );

        },

        set: function ( action ) {

            if ( !this.get ( action ) ) {

                this.actions.push ( action );

                this.update ();

            }

        },

        update: function () {

            this.actionsStr = this.actions.join ( '|' );

            $.cookie.write ( this.name, this.actionsStr, 31536000 ); // 1 year

        },

        reset: function ( action ) {

            if ( action ) {

                _.pull ( this.actions, action );

                this.update ();

            } else {

                $.cookie.destroy ( this.name );

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

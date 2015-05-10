
/* ONE TIME ACTION */

//INFO: the pipe character (|) is forbidden as a name
//TODO: split the code into a Container OBJ and an Action OBJ

;(function ( $, window, document, undefined ) {

    'use strict';

    /* ONE TIME ACTION */

    $.oneTimeAction = function ( custom_options, action ) {

        // OPTIONS

        var options = {
            container: 'ota', // the cookie name that holds the actions
            mode: 'action', // get - set - reset - [action]
            name: '', // the action name
            action: $.noop
        };

        if ( _.isString ( custom_options ) ) {

            options.name = custom_options;

            if ( _.isString ( action ) ) {

                options.mode = action;

            } else if ( _.isFunction ( action ) ) {

                options.action = action;

            }

        } else if ( _.isPlainObject ( custom_options ) ) {

            $.extend ( options, custom_options );

        }

        // ONE TIME ACTION

        var action = new Action ( options.container, options.name, options.action );

        switch ( options.mode ) {

            case 'get':
                return action.get ();

            case 'set':
                action.set ();
                break;

            case 'reset':
                action.reset ();
                break;

            case 'action':

                if ( !action.get () ) {

                    action.execute ();

                    action.set ();

                }

        }

    };

    /* ACTION OBJ */

    var Action = function ( container, name, action ) {

        this.container = container;
        this.name = name;
        this.action = action;

        this.actionsStr = $.cookie.read ( this.container ) || '';
        this.actions = this.actionsStr.split ( '|' );

        console.log(name);
        console.log(!!name);

        this.hasName = !!this.name;

        this.isExecuted = this.hasName ? ( this.actions.indexOf ( this.name ) !== -1 ) : false;

    };

    Action.prototype = {

        get: function () {

            return this.isExecuted;

        },

        set: function () {

            if ( !this.isExecuted && this.hasName ) {

                this.actions.push ( this.name );
                this.actionsStr = this.actions.join ( '|' );

                $.cookie.write ( this.container, this.actionsStr, 31536000 ); // 1 year

            }

        },

        reset: function () {

            if ( this.hasName ) {

                if ( this.isExecuted ) {

                    _.pull ( this.actions, this.name );

                    this.actionsStr = this.actions.join ( '|' );

                    $.cookie.write ( this.container, this.actionsStr, 31536000 ); // 1 year

                }

            } else {

                $.cookie.destroy ( this.container );

            }

        },

        execute: function () {

            this.action ();

        }

    };

}( lQuery, window, document ));

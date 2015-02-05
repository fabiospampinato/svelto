
/* ONE TIME ACTION */

var one_time_action = function ( method, option, action ) {

    if ( method === 'cookie' ) {

        var actions_str = cookie.read ( 'ota' ),
            actions = actions_str ? actions_str.split ( '|' ) : [];

        if ( !_( actions ).contains ( option ) ) {

            actions.push ( option );
            actions_str = actions.join ( '|' );

            cookie.write ( 'ota', actions_str, 31536000 ); // 1 year

            action ();

        }

    } else if ( method === 'url' ) {

        $.ajax ({
            type: 'GET',
            url: option,
            success: function ( res ) {
                if ( res == '1' ) {
                    action ();
                }
            }
        });

    }

};

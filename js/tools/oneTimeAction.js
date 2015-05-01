
/* ONE TIME ACTION */

;(function ( $, window, document, undefined ) {

    $.oneTimeAction = function ( method, option, action ) {

        if ( method === 'cookie' ) { // option -> action id

            var actions_str = $.cookie.read ( 'ota' ),
                actions = actions_str ? actions_str.split ( '|' ) : [];

            if ( actions.indexOf ( option ) === -1 ) { // If not already done

                actions.push ( option );
                actions_str = actions.join ( '|' );

                $.cookie.write ( 'ota', actions_str, 31536000 ); // 1 year

                action ();

            }

        } else if ( method === 'url' ) { // option -> url

            $.ajax ({
                url: option,
                success: function ( res ) {
                    if ( res === 1 || res === '1' ) { //FIXME: doesn't it return only strings??? //TODO: maybe we should just check if the return valus is truthy
                        action ();
                    }
                }
            });

        } else if ( method === 'reset' ) {

            $.cookie.destroy ( 'ota' );

        }

    };

}( lQuery, window, document ));

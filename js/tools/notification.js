
 /* NOTIFICATION */

;(function ( $, window, document, undefined ) {

    $.notification = function ( custom_options, both ) {

        // OPTIONS

        var options = {
            title: false,
            body: false,
            img: false
        };

        $.extend ( options, custom_options );

        // NOTIFICATION

        if ( window.Notification ) {

            if ( Notification.permission !== 'denied' ) {

                Notification.requestPermission ( function ( status ) {

                    if ( status === 'granted' ) {

                        var notification = new Notification ( options.title, { body: options.body, icon: options.img } );

                        if ( both ) {

                            $.noty ( options );

                        }

                    } else {

                        $.noty ( options );

                    }

                });

            } else {

                $.noty ( options );

            }

        } else {

            $.noty ( options );

        }

    };

}( lQuery, window, document ));

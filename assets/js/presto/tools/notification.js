
 /* NOTIFICATION */

//INFO: If the tab has a focus and we can use the native notifications than we'll send a native notification, otherwise we will fallback to a noty

;(function ( $, window, document, undefined ) {

    'use strict';

    /* NOTIFICATION */

    $.notification = function ( custom_options ) {

        // OPTIONS

        var options = {
            title: false,
            body: false,
            img: false
        };

        $.extend ( options, custom_options );

        // NOTIFICATION

        if ( !document.hasFocus () && window.Notification && Notification.permission !== 'denied' ) {

            Notification.requestPermission ( function ( status ) {

                if ( status === 'granted' ) {

                    var notification = new Notification ( options.title, { body: options.body, icon: options.img } );

                } else {

                    $.noty ( options );

                }

            });

        } else {

            $.noty ( options );

        }

    };

}( lQuery, window, document ));


/* =========================================================================
 * Svelto - Notification v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../noty/noty.js
 * ========================================================================= */

//INFO: If the tab hasn't the focus and we can use the native notifications than we'll send a native notification, otherwise we will fallback to a noty

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* NOTIFICATION */

    $.notification = function ( custom_options ) {

        // OPTIONS

        var options = _.merge ({
            title: false,
            body: false,
            img: false
        }, custom_options );

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

}( jQuery, _, window, document ));

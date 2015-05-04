
/* COOKIE */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* COOKIE */

    $.cookie = {

        destroy: function ( name ) {

            this.write ( name, '', - 86400 * 365, '/' );

        },

        read: function ( name ) {

            var expression = new RegExp ( '(^|; )' + encodeURIComponent ( name ) + '=(.*?)($|;)' ),
                matches = document.cookie.match ( expression );

            return matches ? decodeURIComponent ( matches[2] ) : null;

        },

        write: function ( name, value, expire, path, domain, secure ) {

            var date = new Date ();

            if ( expire && typeof expire === 'number' ) {

                date.setTime ( date.getTime () + expire * 1000 );

            } else {

                expire = null;

            }

            document.cookie =
              encodeURIComponent ( name ) + '=' + encodeURIComponent ( value ) +
              ( expire ? '; expires=' + date.toGMTString () : '' ) +
              '; path=' + ( path ? path : '/' ) +
              ( domain ? '; domain=' + domain : '' ) +
              ( secure ? '; secure' : '' );

            return document.cookie;

        }

    };

}( lQuery, window, document ));

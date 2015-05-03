
/* LOADING */

;(function ( $, window, document, undefined ) {

    'use strict';

    $.fn.loading = function ( activate ) {

        if ( activate ) {

            return this.addClass ( 'loading' ).defer ( function () {

                this.addClass ( 'loading_active' );

            });

        } else {

            return this.removeClass ( 'loading_active' ).defer ( function () {

                this.removeClass ( 'loading' );

            }, 200 );

        }

    };

}( lQuery, window, document ));

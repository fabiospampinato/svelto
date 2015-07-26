
/* LOADING */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* LOADING */

    $.fn.loading = function ( force ) {

        if ( _.isUndefined ( force ) ) {

            force = !this.hasClass ( 'loading' );

        }

        if ( force ) {

            this.addClass ( 'loading' );

            $.reflow ();

            this.addClass ( 'loading-active' );

        } else {

            this.removeClass ( 'loading-active' );

            setTimeout ( (function () {

                //TODO: do we need a reflow here? If we don't why?

                this.removeClass ( 'loading' );

            }).bind ( this ), 200 );

        }

        return this;

    };

}( lQuery, window, document ));


/* LOADING */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* LOADING */

    $.fn.loading = function ( activate ) {

        if ( activate ) {

            this.addClass ( 'loading' );

            $.reflow ();

            this.addClass ( 'loading-active' );

        } else {

            var $this = this;

            this.removeClass ( 'loading-active' );

            setTimeout ( function () {

                //TODO: do we need a reflow here? If we don't why?

                $this.removeClass ( 'loading' );

            }, 200 );

        }

        return this;

    };

}( lQuery, window, document ));

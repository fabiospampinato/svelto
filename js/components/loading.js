
/* LOADING */

;(function ( $, window, document, undefined ) {

    $.factory ( 'loading', function ( activate ) {

        if ( activate ) {

            this.$node.addClass ( 'loading' ).defer ( function () {

                this.addClass ( 'loading_active' );

            });

        } else {

            this.$node.removeClass ( 'loading_active' ).defer ( function () {

                this.removeClass ( 'loading' );

            }, 200 );

        }

    });

}( lQuery, window, document ));

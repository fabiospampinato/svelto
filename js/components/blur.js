
/* BLUR */

;(function ( $, window, document, undefined ) {

    $.factory ( 'blur', function ( activate ) {

        return this.toggleClass ( 'blur', activate );

    });

}( lQuery, window, document ));

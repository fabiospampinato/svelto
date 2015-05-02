
/* BLUR */

;(function ( $, window, document, undefined ) {

    $.fn.blur = function ( activate ) {

        return this.toggleClass ( 'blur', activate );

    };

}( lQuery, window, document ));

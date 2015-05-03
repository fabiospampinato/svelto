
/* BLUR */

;(function ( $, window, document, undefined ) {

    'use strict';

    $.fn.blur = function ( activate ) {

        return this.toggleClass ( 'blur', activate );

    };

}( lQuery, window, document ));


/* BLURRED */

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* BLUR */

    $.fn.blurred = function ( force ) {

        return this.toggleClass ( 'blurred', force );

    };

}( jQuery, _, window, document ));

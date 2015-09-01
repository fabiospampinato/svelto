
/* BINARY TREE .each() */

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* BINARY TREE .each () */

    $.fn.btEach = function ( callback, startIndex ) {

        return _.btEach ( this, callback, startIndex );

    };

}( jQuery, _, window, document ));

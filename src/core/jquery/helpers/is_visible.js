
// @require ../init.js

(function ( $ ) {

  'use strict';

  /* IS VISIBLE */

  $.isVisible = function ( ele ) {

    return !!( ele.offsetWidth || ele.offsetHeight || ele.getClientRects ().length );

  };

  $.fn.isVisible = function () {

    return $.isVisible ( this[0] );

  };

}( window.__svelto_jquery ));


// @require ../init.js

(function ( $ ) {

  /* HAS ATTRIBUTE */

  $.fn.hasAttribute = function ( attr ) {

    return !!this[0] && this[0].hasAttribute ( attr );

  };

}( window.$ ));


// @require ../init.js

(function ( $ ) {

  /* HAS ATTRIBUTE */

  $.fn.hasAttribute = function ( attr ) {

    return this.length && this[0].hasAttribute ( attr );

  };

}( window.$ ));

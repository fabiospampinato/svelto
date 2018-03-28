
// @require ../init.js

(function ( $ ) {

  'use strict';

  /* HAS ATTRIBUTE */

  $.fn.hasAttribute = function ( attr ) {

    return this.length && this[0].hasAttribute ( attr );

  };

}( window.__svelto_jquery ));

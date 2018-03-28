
// @require ../init.js

(function ( $ ) {

  /* ITERATOR */

  $.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

}( window.__svelto_jquery ));

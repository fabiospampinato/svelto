
// @require ../init.js

(function ( $ ) {

  'use strict';

  /* ITERATOR */

  $.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

}( window.__svelto_jquery ));

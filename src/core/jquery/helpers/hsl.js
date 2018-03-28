
// @require ../init.js

// It only currently works for setting

(function ( $ ) {

  'use strict';

  /* HSL */

  $.fn.hsl = function ( h, s, l ) {

    this[0].style.backgroundColor = `hsl(${h},${s}%,${l}%)`;

    return this;

  };

}( window.__svelto_jquery ));

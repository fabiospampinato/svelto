
// @require ../init.js

(function ( $ ) {

  /* VARIABLES */

  let html = document.documentElement;

  /* IS ATTACHED */

  $.isAttached = function ( ele ) {

    return ele === html || $.contains ( html, ele );

  };

  $.fn.isAttached = function () {

    return $.isAttached ( this[0] );

  };

}( window.$ ));

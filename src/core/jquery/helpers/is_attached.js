
// @require ../init.js
// @require ./elements.js

(function ( $ ) {

  /* IS ATTACHED */

  $.isAttached = function ( ele ) {

    return !!ele && ( ele === $.html || $.contains ( $.html, ele ) );

  };

  $.fn.isAttached = function () {

    return $.isAttached ( this[0] );

  };

}( window.$ ));

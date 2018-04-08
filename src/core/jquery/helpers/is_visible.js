
// @require ../init.js

(function ( $ ) {

  /* IS VISIBLE */

  $.isVisible = function ( ele ) {

    return !!ele && !!( ele.offsetWidth || ele.offsetHeight || ele.getClientRects ().length );

  };

  $.fn.isVisible = function () {

    return $.isVisible ( this[0] );

  };

}( window.$ ));


// @require ../init.js
// @require ./get_rect.js

(function ( $ ) {

  /* IS VISIBLE */

  $.isVisible = function ( ele, inViewport ) {

    if ( !ele || !( ele.offsetWidth || ele.offsetHeight || ele.getClientRects ().length ) ) return false;

    if ( inViewport ) {

      const rect1 = $.getRect ( ele ),
            rect2 = $.getWindowRect ();

      return !( rect2.left > rect1.right || rect2.right < rect1.left || rect2.top > rect1.bottom || rect2.bottom < rect1.top );

    }

    return true;

  };

  $.fn.isVisible = function ( inViewport ) {

    return $.isVisible ( this[0], inViewport );

  };

}( window.$ ));

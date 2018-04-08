
// @require ../init.js
// @require ./z_index.js

//TODO: Use it
//TODO: Write it in a more dynamic way, detecting what the highest `z-index` actually is

(function ( $ ) {

  /* TOP INDEX */

  let topIndex = 1000000000;

  $.fn.topIndex = function () {

    return this.zIndex ( topIndex++ );

  };

}( window.$ ));

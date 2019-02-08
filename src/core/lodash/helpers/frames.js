
// @require ../init.js
// @require core/shims/shims/requestAnimationFrame.js

(function ( _ ) {

  /* FRAMES */

  _.frames = function ( fn ) {

    let wait, timeout, args;

    function fnProxy () {
      fn.apply ( undefined, args );
    }

    function rafProxy () {
      wait = false;
      clearTimeout ( timeout );
      timeout = setTimeout ( fnProxy, 50 );
      fnProxy ();
    }

    function framed () {
      if ( wait ) return;
      wait = true;
      args = arguments;
      requestAnimationFrame ( rafProxy );
    }

    return framed;

  };

}( window._ ));

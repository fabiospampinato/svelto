
(function () {

  /* REQUEST ANIMATION FRAME */

  if ( window.requestAnimationFrame ) return;

  window.requestAnimationFrame = function ( callback ) {
    return setTimeout ( callback, 16 );
  };

  window.cancelAnimationFrame = function ( handle ) {
    return clearTimeout ( handle );
  };

}());

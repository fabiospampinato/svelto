
/* =========================================================================
 * Svelto - Core - Shims - Shims (requestAnimationFrame)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

(function () {

  'use strict';

  /* REQUEST ANIMATION FRAME */

  if ( window.requestAnimationFrame ) return;

  window.requestAnimationFrame = function ( callback ) {
    return setTimeout ( callback, 16 );
  };

  window.cancelAnimationFrame = function ( handle ) {
    return clearTimeout ( handle );
  };

}());

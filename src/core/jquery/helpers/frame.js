
/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Frame)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( $ ) {

  'use strict';

  /* FRAME */

  $.frame = function ( callback ) {

    return requestAnimationFrame ( callback );

  };

}( jQuery ));

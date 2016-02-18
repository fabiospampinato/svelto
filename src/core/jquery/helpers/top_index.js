
/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Top index)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./z_index.js
 * ========================================================================= */

//TODO: [MAYBE] Rename it

(function ( $ ) {

  'use strict';

  /* TOP INDEX */

  $.fn.topIndex = function () {

    let topIndex = 1000000000;

    return function () {

      return this.zIndex ( ++topIndex );

    };

  };

}( jQuery ));

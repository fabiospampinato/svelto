
/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Has attribute)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( $ ) {

  'use strict';

  /* HAS ATTRIBUTE */

  $.fn.hasAttribute = function ( attr ) {

    return this.length && this[0].hasAttribute ( attr );

  };

}( jQuery ));


/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Is attached)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( $ ) {

  'use strict';

  /* IS ATTACHED */

  $.fn.isAttached = function () {

    return $.contains ( document.documentElement, this[0] );

  };

}( jQuery ));

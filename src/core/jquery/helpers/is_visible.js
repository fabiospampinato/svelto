
/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Is visible)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( $ ) {

  'use strict';

  /* IS VISIBLE */

  $.isVisible = function ( ele ) {

    return !!( ele.offsetWidth || ele.offsetHeight || ele.getClientRects ().length );

  };

  $.fn.isVisible = function () {

    return $.isVisible ( this[0] );

  };

}( window.__svelto_jquery ));

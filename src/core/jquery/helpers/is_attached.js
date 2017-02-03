
/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Is attached)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( $ ) {

  'use strict';

  /* VARIABLES */

  let html = document.documentElement;

  /* IS ATTACHED */

  $.isAttached = function ( ele ) {

    return ele === html || $.contains ( html, ele );

  };

  $.fn.isAttached = function () {

    return $.isAttached ( this[0] );

  };

}( jQuery ));

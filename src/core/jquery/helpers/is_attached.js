
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

    let html = document.documentElement;

    return ( this[0] === html ) || $.contains ( html, this[0] );

  };

}( jQuery ));

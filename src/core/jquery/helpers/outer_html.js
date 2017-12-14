
/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Outer HTML)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( $ ) {

  'use strict';

  /* OUTER HTML */

  $.fn.outerHTML = function ( replacement ) {

    let html = '';

    for ( let i = 0, l = this.length; i < l; i++ ) {

      if ( replacement ) {

        this[i].outerHTML = replacement;

      } else {

        html += this[i].outerHTML;

      }

    }

    return html || this;

  };

}( window.__svelto_jquery ));

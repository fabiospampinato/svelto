
/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Unique AJAX)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( $ ) {

  'use strict';

  /* UNIQUE AJAX */

  $.uniqueAjax = function ( id, ...args ) {

    if ( id in $.uniqueAjax.requests ) return $.uniqueAjax.requests[id];

    return $.uniqueAjax.requests[id] = $.ajax ( ...args );

  };

  $.uniqueAjax.requests = {};

}( jQuery ));

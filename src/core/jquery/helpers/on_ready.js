
/* =========================================================================
 * Svelto - Core - jQuery - Helpers (On Ready)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( $ ) {

  'use strict';

  /* ON READY */

  $.onReady = function ( callback ) { //TODO: Remove after migrating to cash or zepto
    if ( document.readyState !== 'loading' ) return callback ();
    return document.addEventListener ( 'DOMContentLoaded', callback );
  }

}( jQuery ));


/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Event namespacer)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( $ ) {

  'use strict';

  /* EVENT NAMESPACER */

  $.eventNamespacer = function ( events, namespace ) {

    return events.split ( /\s+/ ).map ( event => event + namespace ).join ( ' ' );

  };

}( jQuery ));

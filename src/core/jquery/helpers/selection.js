
/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Selection)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

//SOURCE: jQuery UI

(function ( $ ) {

  'use strict';

  /* SELECTION */

  $.fn.disableSelection = (function () {

    let event = ( 'onselectstart' in document.createElement ( 'div' ) ) ? 'selectstart' : 'mousedown';

    return function () {

      return this.on ( event + '.svelto-disable-selection', event => event.preventDefault () );

    };

  })();

  $.fn.enableSelection = function () {

    return this.off ( '.svelto-disable-selection' );

  };

}( jQuery ));


/* =========================================================================
 * Svelto - Core - Modernizr - Tests (Local Storage)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( Modernizr ) {

  'use strict';

  /* LOCAL STORAGE */

  function supportsLocalStorage () {

    const test = 'modernizr';

    try {

      localStorage.setItem ( test, test );
      localStorage.removeItem ( test );

      return true;

    } catch ( e ) {

      return false;

    }

  }

  Modernizr.addTest ( 'localstorage', supportsLocalStorage );

}( window.__svelto_modernizr ));

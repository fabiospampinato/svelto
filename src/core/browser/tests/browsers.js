
/* =========================================================================
 * Svelto - Core - Browser - Tests (Browsers)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../browser.js
 * ========================================================================= */

(function ( Modernizr, Browser ) {

  'use strict';

  /* BROWSERS */

  for ( let browser of Browser.support.browsers ) {

    Modernizr.addTest ( browser, Browser.is[browser] );

  }

}( Svelto.Modernizr, Svelto.Browser ));

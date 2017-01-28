
/* =========================================================================
 * Svelto - Core - Browser - Tests (OSs)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../browser.js
 * @require core/modernizr/modernizr.js
 * ========================================================================= */

(function ( Modernizr, Browser ) {

  'use strict';

  /* OSS */

  for ( let os of Browser.support.oss ) {

    Modernizr.addTest ( os, Browser.is[os] );

  }

}( Svelto.Modernizr, Svelto.Browser ));


/* =========================================================================
 * Svelto - Core - Browser - Tests (Devices)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../browser.js
 * ========================================================================= */

(function ( Modernizr, Browser ) {

  'use strict';

  /* DEVICES */

  for ( let device of Browser.support.devices ) {

    Modernizr.addTest ( device, Browser.is[device] );

  }

}( Svelto.Modernizr, Svelto.Browser ));

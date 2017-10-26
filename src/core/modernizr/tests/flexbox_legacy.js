
/* =========================================================================
 * Svelto - Core - Modernizr - Tests (Flexbox Legacy)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( Modernizr ) {

  'use strict';

  /* FLEXBOX LEGACY */

  Modernizr.addTest ( 'flexbox-legacy', Modernizr.testAllProps ( 'boxDirection', 'reverse' ) );

}( window.__svelto_modernizr ));

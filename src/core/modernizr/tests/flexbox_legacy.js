
// @require ../init.js

(function ( Modernizr ) {

  'use strict';

  /* FLEXBOX LEGACY */

  Modernizr.addTest ( 'flexbox-legacy', Modernizr.testAllProps ( 'boxDirection', 'reverse' ) );

}( window.__svelto_modernizr ));


// @require ../browser.js

(function ( Modernizr, Browser ) {

  'use strict';

  /* DEVICES */

  for ( let device of Browser.support.devices ) {

    Modernizr.addTest ( device, Browser.is[device] );

  }

}( Svelto.Modernizr, Svelto.Browser ));

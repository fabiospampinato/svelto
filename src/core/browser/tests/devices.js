
// @require ../browser.js

(function ( Modernizr, Browser ) {

  /* DEVICES */

  for ( let device of Browser.support.devices ) {

    Modernizr.addTest ( device, Browser.is[device] );

  }

}( Svelto.Modernizr, Svelto.Browser ));


// @require ../browser.js

(function ( Modernizr, Browser ) {

  /* DEVICES */

  Browser.support.devices.forEach ( device => {

    Modernizr.addTest ( device, Browser.is[device] );

  });

}( Svelto.Modernizr, Svelto.Browser ));

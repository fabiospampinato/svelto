
// @require ../browser.js

(function ( Modernizr, Browser ) {

  /* BROWSERS */

  Browser.support.browsers.forEach ( browser => {

    Modernizr.addTest ( browser, Browser.is[browser] );

  });

}( Svelto.Modernizr, Svelto.Browser ));

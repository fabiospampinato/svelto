
// @require ../browser.js

(function ( Modernizr, Browser ) {

  /* BROWSERS */

  for ( let browser of Browser.support.browsers ) {

    Modernizr.addTest ( browser, Browser.is[browser] );

  }

}( Svelto.Modernizr, Svelto.Browser ));

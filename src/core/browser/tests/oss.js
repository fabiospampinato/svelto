
// @require ../browser.js

(function ( Modernizr, Browser ) {

  /* OSS */

  Browser.support.oss.forEach ( os => {

    Modernizr.addTest ( os, Browser.is[os] );

  });

}( Svelto.Modernizr, Svelto.Browser ));

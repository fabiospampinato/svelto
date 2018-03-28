
// @require ../browser.js

(function ( Modernizr, Browser ) {

  'use strict';

  /* OSS */

  for ( let os of Browser.support.oss ) {

    Modernizr.addTest ( os, Browser.is[os] );

  }

}( Svelto.Modernizr, Svelto.Browser ));

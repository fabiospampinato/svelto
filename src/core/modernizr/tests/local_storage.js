
// @require ../init.js

(function ( Modernizr ) {

  /* LOCAL STORAGE */

  function supportsLocalStorage () {

    const test = 'modernizr';

    try {

      localStorage.setItem ( test, test );
      localStorage.removeItem ( test );

      return true;

    } catch ( e ) {

      return false;

    }

  }

  Modernizr.addTest ( 'localstorage', supportsLocalStorage );

}( window.__svelto_modernizr ));


// @require ../init.js

(function ( _ ) {

  /* WAIT */

  _.wait = function ( ms ) {

    return new Promise ( resolve => setTimeout ( resolve, ms ) );

  };

}( window.__svelto_lodash ));

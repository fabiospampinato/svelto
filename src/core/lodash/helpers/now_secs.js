
// @require ../init.js

(function ( _ ) {

  /* NOW SECS */

  _.nowSecs = function () {

    return Math.floor ( _.now () / 1000 );

  };

}( window.__svelto_lodash ));

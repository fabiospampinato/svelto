
// @require ../init.js

(function ( _ ) {

  /* MOVE */

  _.move = function ( arr, from, to ) {

    arr.splice ( to, 0, arr.splice ( from, 1 )[0] );

  };

}( window._ ));


// @require ../init.js

(function ( _ ) {

  /* IS EQUAL JSON */ // Tiny, not very robust (comparing objects depends on the order of their keys), alternative to `isEqual`

  _.isEqualJSON = function ( a, b ) {

    return a === b || JSON.stringify ( a ) === JSON.stringify ( b );

  };

}( window.__svelto_lodash ));


// @require ../init.js

(function ( _ ) {

  /* FLATTEN */ // Much smaller than lodash's implementation

  _.flatten = _.flattenDepth = function ( arr, depth = 1 ) {

    return arr.reduce ( ( a, v ) => a.concat ( depth > 1 && _.isArray ( v ) ? _.flatten ( v, depth - 1 ) : v ), [] );

  };

}( window._ ));

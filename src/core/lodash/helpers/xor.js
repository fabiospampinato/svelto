
// @require ../init.js

(function ( _ ) {

  /* XOR */ // Much smaller than lodash's implementation

  _.xor = function ( ...arrays ) {

    return arrays.reduce ( ( acc, arr ) => _.difference ( acc, arr ).concat ( _.difference ( arr, acc ) ), [] );

  };

}( window._ ));

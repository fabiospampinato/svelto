
// @require ../init.js

(function ( _ ) {

  /* UNIQ */ // Much smaller than lodash's implementation

  _.uniq = _.uniqBy = function ( arr, iteratee = _.identity ) {

    const values = arr.map ( iteratee );

    return arr.filter ( ( entry, i ) => values.indexOf ( values[i] ) === i );

  };

}( window.__svelto_lodash ));

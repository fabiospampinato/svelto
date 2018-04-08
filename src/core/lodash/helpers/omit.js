
// @require ../init.js

(function ( _ ) {

  /* OMIT */ // Much smaller than lodash's implementation

  _.omit = function ( obj, keys ) {

    return Object.keys ( obj )
             .filter ( key => !keys.includes ( key ) )
             .reduce ( ( acc, key ) => ( ( acc[key] = obj[key] ), acc ), {} );

  };

}( window._ ));

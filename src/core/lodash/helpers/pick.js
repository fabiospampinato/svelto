
// @require ../init.js

(function ( _ ) {

  /* PICK */ // Much smaller than lodash's implementation

  _.pick = function ( obj, keys ) {

    return keys.reduce ( ( acc, curr ) => ( curr in obj && ( acc[curr] = obj[curr] ), acc ), {} );

  };

}( window._ ));

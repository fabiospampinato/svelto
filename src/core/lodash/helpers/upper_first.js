
// @require ../init.js

(function ( _ ) {

  /* UPPER FIRST */ // Much smaller than lodash's implementation

  _.upperFirst = function ( str ) {

    return str ? `${str[0].toUpperCase ()}${str.substring ( 1 )}` : str;

  };

}( window._ ));

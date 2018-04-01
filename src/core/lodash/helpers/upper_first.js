
// @require ../init.js

(function ( _ ) {

  /* UPPER FIRST */ // Much smaller than lodash's implementation

  _.upperFirst = function ( str ) {

    if ( !str ) return str;

    return `${str[0].toUpperCase ()}${str.substring ( 1 )}`;

  };

}( window.__svelto_lodash ));

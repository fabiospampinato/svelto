
// @require ../init.js

(function ( _ ) {

  /* DIFFERENCE */ // Much smaller than lodash's implementation

  _.difference = function ( array, ...others ) {

    return array.filter ( val => !others.some ( other => other.includes ( val ) ) );

  };

}( window.__svelto_lodash ));


// @require ../init.js

(function ( _ ) {

  /* CSS 2 DOM */ // Simpler alternative to `camelCase`

  _.CSS2DOM = function ( name ) {

    return name.replace ( /([a-z])-([a-z])/g, ( str, m1, m2 ) => m1 + m2.toUpperCase () ).replace ( /^-/, '' );

  };

}( window.__svelto_lodash ));

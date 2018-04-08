
// @require ../init.js
// @require ./template_minify.js

(function ( _ ) {

  /* TEMPLATE */

  const _prev = _.template;

  _.template = function ( str, options ) {

    return _prev.call ( _, _.templateMinify ( str ), options );

  };

}( window._ ));

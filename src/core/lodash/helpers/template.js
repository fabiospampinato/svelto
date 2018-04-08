
// @require ../init.js
// @require ./template_minify.js

(function ( _ ) {

  /* TEMPLATE */

  const _template = _.template;

  _.template = function ( str, options ) {

    return _template.call ( _, _.templateMinify ( str ), options );

  };

}( window._ ));

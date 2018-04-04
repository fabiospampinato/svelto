
// @require ../init.js

(function ( _ ) {

  /* TEMPLATE */

  const _prev = _.template;

  _.template = function ( str, options ) {

    const minified = str.trim ().replace ( />\n\s*</gm, '><' ); // Minifying templates during development, it should be disabled on production

    return _prev.call ( _, minified, options );

  };

}( window.__svelto_lodash ));

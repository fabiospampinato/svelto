
// @require ../init.js

(function ( _ ) {

  /* TEMPLATE MINIFY */ // Simple minification, useful for discarding useless text nodes

  _.templateMinify = function ( template ) {

    return template.trim ().replace ( />\n\s*</gm, '><' );

  };

}( window._ ));

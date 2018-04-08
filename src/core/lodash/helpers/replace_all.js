
// @require ../init.js

(function ( _ ) {

  /* REPLACE ALL */

  _.replaceAll = function ( string, pattern, replacement ) {

    let escaped = pattern.replace ( /[.*+?^${}()|[\]\\]/g, '\\$&' );

    return string.replace ( new RegExp ( escaped, 'g' ), replacement );

  };

}( window._ ));

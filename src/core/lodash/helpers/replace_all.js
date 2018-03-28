
// @require ../init.js

(function ( _ ) {

  'use strict';

  /* REPLACE ALL */

  _.mixin ({

    replaceAll ( string, pattern, replacement ) {

      let escaped = pattern.replace ( /[.*+?^${}()|[\]\\]/g, '\\$&' );

      return string.replace ( new RegExp ( escaped, 'g' ), replacement );

    }

  });

}( window.__svelto_lodash ));

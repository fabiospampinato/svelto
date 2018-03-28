
// @require ../init.js

(function ( _ ) {

  /* MKIZE */

  _.mixin ({

     mkize ( number, decimals = 0 ) {

      let bases = [1000000000, 1000000, 1000],
          suffixes = ['B', 'M', 'K'];

      for ( let i = 0, l = bases.length; i < l; i++ ) {

        if ( number >= bases[i] ) {

          return Number ( ( number / bases[i] ).toFixed ( decimals ) ) + suffixes[i];

        }

      }

      return number;

    }

  });

}( window.__svelto_lodash ));

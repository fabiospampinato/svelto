
/* =========================================================================
 * Svelto - Core - lodash - Helpers (MKize)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( _ ) {

  'use strict';

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

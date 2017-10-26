
/* =========================================================================
 * Svelto - Core - lodash - Helpers (Move)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( _ ) {

  'use strict';

  /* MOVE */

  _.mixin ({

     move ( arr, from, to ) {

       arr.splice ( to, 0, arr.splice ( from, 1 )[0] );

     }

  });

}( window.__svelto_lodash ));


// @require ../init.js

(function ( _ ) {

  'use strict';

  /* MOVE */

  _.mixin ({

     move ( arr, from, to ) {

       arr.splice ( to, 0, arr.splice ( from, 1 )[0] );

     }

  });

}( window.__svelto_lodash ));

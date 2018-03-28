
// @require ../init.js

(function ( _ ) {

  /* WAIT */

  _.mixin ({

    wait ( ms ) {

      return new Promise ( resolve => setTimeout ( resolve, ms ) );

    }

  });

}( window.__svelto_lodash ));

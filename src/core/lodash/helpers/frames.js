
// @require ../init.js
// @require core/shims/shims/requestAnimationFrame.js

(function ( _ ) {

  'use strict';

  /* FRAMES */

  _.mixin ({

    frames ( fn ) {

      let wait, args;

      function proxy () {
        wait = false;
        fn.apply ( undefined, args );
      }

      function framed () {
        if ( wait ) return;
        wait = true;
        args = arguments;
        requestAnimationFrame ( proxy );
      }

      return framed;

    }

  });

}( window.__svelto_lodash ));

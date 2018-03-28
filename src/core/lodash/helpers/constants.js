
// @require ../init.js

(function ( _ ) {

  /* CONSTANTS */

  _.mixin ({

    true: _.constant ( true ),

    false: _.constant ( false ),

    undefined: _.constant (),

    null: _.constant ( null )

  });

}( window.__svelto_lodash ));

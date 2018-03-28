
// @require ../init.js

(function ( _ ) {

  'use strict';

  /* CONSTANTS */

  _.mixin ({

    true: _.constant ( true ),

    false: _.constant ( false ),

    undefined: _.constant (),

    null: _.constant ( null )

  });

}( window.__svelto_lodash ));

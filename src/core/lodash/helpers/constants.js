
/* =========================================================================
 * Svelto - Core - lodash - Helpers (Constants)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

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

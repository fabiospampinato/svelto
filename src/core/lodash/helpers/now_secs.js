
/* =========================================================================
 * Svelto - Core - lodash - Helpers (Now secs)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( _ ) {

  'use strict';

  /* NOW SECS */

  _.mixin ({

    nowSecs () {

      return Math.floor ( _.now () / 1000 );

    }

  });

}( window.__svelto_lodash ));

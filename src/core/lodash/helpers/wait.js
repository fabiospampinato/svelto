
/* =========================================================================
 * Svelto - Core - lodash - Helpers (Wait)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( _ ) {

  'use strict';

  /* WAIT */

  _.mixin ({

    wait ( ms ) {

      return new Promise ( resolve => setTimeout ( resolve, ms ) );

    }

  });

}( window.__svelto_lodash ));

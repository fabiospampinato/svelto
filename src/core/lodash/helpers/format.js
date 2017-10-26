
/* =========================================================================
 * Svelto - Core - lodash - Helpers (Format)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( _ ) {

  'use strict';

  /* FORMAT */

  _.mixin ({

    format ( msg, ...args ) {

      for ( let i = 1, l = args.length; i <= l; i++ ) {

        msg = msg.replace ( `$${i}`, args[i - 1] );

      }

      return msg;

    }

  });

}( window.__svelto_lodash ));

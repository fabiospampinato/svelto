
/* =========================================================================
 * Svelto - Core - lodash - Helpers (Format)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

(function ( _ ) {

  'use strict';

  /* FORMAT */

  _.mixin ({

    format ( msg, ...args ) {

      for ( let i = 0, l = args.length; i < l; i++ ) {

        msg = msg.replace ( '$' + ( i + 1 ), args[i] );

      }

      return msg;

    }

  });

}( lodash ));

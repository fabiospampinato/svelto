
/* =========================================================================
 * Svelto - lodash - Helpers - Now secs
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

(function ( _ ) {

  'use strict';

  /* NOW SECS */

  _.mixin ({

    nowSecs () {

      return Math.floor ( _.now () / 1000 );

    }

  });

}( lodash ));

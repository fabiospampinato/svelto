
/* =========================================================================
 * Svelto - Core - lodash - Helpers (Replace all)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( _ ) {

  'use strict';

  /* REPLACE ALL */

  _.mixin ({

    replaceAll ( string, pattern, replacement ) {

      let escaped = pattern.replace ( /[.*+?^${}()|[\]\\]/g, '\\$&' );

      return string.replace ( new RegExp ( escaped, 'g' ), replacement );

    }

  });

}( lodash ));

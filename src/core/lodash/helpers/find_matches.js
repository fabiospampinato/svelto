
/* =========================================================================
 * Svelto - Core - lodash - Helpers (Find matches)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( _ ) {

  'use strict';

  /* FIND MATCHES */

  _.mixin ({

    findMatches ( str, regex ) {

      let matches = [],
          match;

      while ( match = regex.exec ( str ) ) {

        matches.push ( match );

      }

      return matches;

    }

  });

}( window.__svelto_lodash ));


// @require ../init.js

(function ( _ ) {

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

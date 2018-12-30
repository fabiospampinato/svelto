
// @require core/svelto/svelto.js

//URL: https://github.com/bevacqua/fuzzysearch

(function ( $, _, Svelto ) {

  /* FUZZY */

  let Fuzzy = {

    match ( str, search, isCaseSensitive = true ) {

      const searchLength = search.length,
            strLength = str.length;

      if ( searchLength > strLength ) return false;

      if ( !isCaseSensitive ) {

        str = str.toLowerCase ();
        search = search.toLowerCase ();

      }

      if ( searchLength === strLength ) return search === str;

      outer: for ( let i = 0, j = 0; i < searchLength; i++) {

        const searchChar = search.charCodeAt ( i );

        while ( j < strLength ) {

          if ( str.charCodeAt ( j++ ) === searchChar ) continue outer;

        }

        return false;

      }

      return true;

    }

  };

  /* EXPORT */

  Svelto.Fuzzy = Fuzzy;

}( Svelto.$, Svelto._, Svelto ));

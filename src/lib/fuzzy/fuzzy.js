
/* =========================================================================
 * Svelto - Lib - Fuzzy
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* FUZZY */

  let Fuzzy = {

    match ( str, search, isCaseSensitive = true ) {

      if ( !isCaseSensitive ) {

        str = str.toLowerCase ();
        search = search.toLowerCase ();

      }

      let currentIndex = -1,
          str_i,
          str_l = str.length;

      for ( let search_i = 0, search_l = search.length; search_i < search_l; search_i++ ) {

        for ( str_i = currentIndex + 1; str_i < str_l; str_i++ ) {

          if ( str[str_i] === search[search_i] ) {

            currentIndex = str_i;
            str_i = str_l + 1;

          }

        }

        if ( str_i === str_l ) {

          return false;

        }

      }

      return true;

    }

  };

  /* EXPORT */

  Svelto.Fuzzy = Fuzzy;

}( Svelto.$, Svelto._, Svelto ));

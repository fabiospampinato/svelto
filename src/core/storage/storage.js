
/* =========================================================================
 * Svelto - Core - Storage
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* STORAGE */

  let Storage = {
    key: localStorage.key.bind ( localStorage ),
    get ( key ) {
      return JSON.parse ( localStorage.getItem ( key ) );
    },
    set ( key, value ) {
      try {
        localStorage.setItem ( key, JSON.stringify ( value ) );
      } catch ( e ) {}
    },
    remove: localStorage.removeItem.bind ( localStorage ),
    clear: localStorage.clear.bind ( localStorage )
  };

  /* EXPORT */

  Svelto.Storage = Storage;

}( Svelto.$, Svelto._, Svelto ));

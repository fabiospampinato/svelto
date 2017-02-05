
/* =========================================================================
 * Svelto - Core - Storage
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

// TTL is expressed in seconds

(function ( $, _, Svelto ) {

  'use strict';

  /* STORAGE */

  let Storage = {
    key: localStorage.key.bind ( localStorage ),
    remove: localStorage.removeItem.bind ( localStorage ),
    clear: localStorage.clear.bind ( localStorage ),
    get ( key ) {

      let val = localStorage.getItem ( key ),
          obj = _.attempt ( JSON.parse, val );

      if ( _.isPlainObject ( obj ) ) {

        if ( 'exp' in obj && obj.exp < _.nowSecs () ) {

          Storage.remove ( key );
          return null;

        }

        return 'val' in obj ? obj.val : obj;

      }

      return val;

    },
    set ( key, val, ttl ) {

      let obj = {val};

      if ( ttl ) obj.exp = _.nowSecs () + ttl;

      try {

        localStorage.setItem ( key, JSON.stringify ( obj ) );

      } catch ( e ) {}

    }
  };

  /* EXPORT */

  Svelto.Storage = Storage;

}( Svelto.$, Svelto._, Svelto ));

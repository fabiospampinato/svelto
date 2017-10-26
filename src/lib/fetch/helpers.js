
/* =========================================================================
 * Svelto - Lib - Fetch (Helpers)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./fetch.js
 * ========================================================================= */

(function ( $, _, Svelto, fetch ) {

  'use strict';

  /* HELPERS */

  fetch.getValue = async function ( res, key ) {

    if ( !res ) return;

    try {

      let json = await res.json ();

      return key ? json[key] : json;

    } catch ( e ) {}

  };

}( Svelto.$, Svelto._, Svelto, Svelto.fetch ));

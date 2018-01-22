
/* =========================================================================
 * Svelto - Core - Debug
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @priority 1000000
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* DEBUG */

  if ( !Svelto.DEVELOPMENT ) return;

  window.log = console.log.bind ( console );

  const timeMarks = {};
  window.time = function ( mark = '?' ) {
    if ( !timeMarks[mark] ) {
      timeMarks[mark] = true;
      console.time ( mark );
    } else {
      console.timeEnd ( mark );
      delete timeMarks[mark];
    }
  }

  window.hash = function ( str ) {
    let hash = 0;
    if ( !str.length ) return hash;
    for ( let i = 0, l = str.length; i < l; i++ ) {
      let char = str.charCodeAt ( i );
      hash = ( ( hash << 5 ) - hash ) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  };

}( Svelto.$, Svelto._, Svelto ));

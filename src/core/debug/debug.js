
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

}( Svelto.$, Svelto._, Svelto ));

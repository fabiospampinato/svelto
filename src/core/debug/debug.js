
/* =========================================================================
 * Svelto - Core - Debug
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* DEBUG */

  if ( !Svelto.DEVELOPMENT ) return;

  window.log = console.log.bind ( console );

}( Svelto.$, Svelto._, Svelto ));

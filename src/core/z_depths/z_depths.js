
/* =========================================================================
 * Svelto - Core - Z-Depths
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* Z-DEPTHS */

  let ZDepths = {};

  for ( let i = 0, l = 24; i <= l; i++ ) {

    ZDepths[i] = `z-depth-${i}`;

  }

  /* EXPORT */

  Svelto.ZDepths = ZDepths;

}( Svelto.$, Svelto._, Svelto ));

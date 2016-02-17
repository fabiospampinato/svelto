
/* =========================================================================
 * Svelto - Animations
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* ANIMATIONS */

  let Animations = {
    xslow: 900,
    slow: 500,
    normal: 350,
    fast: 150,
    xfast: 75
  };

  /* EXPORT */

  Svelto.Animations = Animations;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Core - Breakpoints
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* BREAKPOINTS */

  let Breakpoints = {
    xsmall: 'xs',
    small: 'sm',
    medium: 'md',
    large: 'lg',
    xlarge: 'xl',
    widths: {
      xsmall: 0,
      small: 512,
      medium: 768,
      large: 1024,
      xlarge: 1216
    }
  };

  /* EXPORT */

  Svelto.Breakpoints = Breakpoints;

}( Svelto.$, Svelto._, Svelto ));

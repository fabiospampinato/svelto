
/* =========================================================================
 * Svelto - Core - Colors
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* COLORS */

  let Colors = {
    primary: 'primary',
    secondary: 'secondary',
    tertiary: 'tertiary',
    quaternary: 'quaternary',

    black: 'black',
    blue: 'blue',
    brown: 'brown',
    gray: 'gray',
    green: 'green',
    olive: 'olive',
    orange: 'orange',
    pink: 'pink',
    purple: 'purple',
    red: 'red',
    teal: 'teal',
    violet: 'violet',
    white: 'white',
    yellow: 'yellow',

    error: 'error',
    success: 'success',
    warning: 'warning',

    base: 'base',
    inherit: 'inherit',
    transparent: 'transparent'
  };

  /* EXPORT */

  Svelto.Colors = Colors;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Lib - Emoji - Test
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/modernizr/modernizr.js
 * ========================================================================= */

(function ( Modernizr ) {

  'use strict';

  /* EMOJI */

  Modernizr.addTest ( 'emoji', function () {

    let canvas = document.createElement ( 'canvas' );

    if ( !canvas.getContext ) return false;

    let ctx = canvas.getContext ( '2d' );

    if ( !ctx || typeof ctx.fillText !== 'function' ) return false;

    ctx.textBaseline = 'top';
    ctx.font = '32px Arial';
    ctx.fillText ( '\ud83d\ude03', 0, 0 );

    return ctx.getImageData ( 16, 16, 1, 1 ).data[0] !== 0;

  });

}( Svelto.Modernizr ));


// @require core/modernizr/modernizr.js

(function ( Modernizr ) {

  'use strict';

  /* EMOJI */

  function supportsEmoji () {

    let canvas = document.createElement ( 'canvas' );

    if ( !canvas.getContext ) return false;

    let ctx = canvas.getContext ( '2d' );

    if ( !ctx || typeof ctx.fillText !== 'function' ) return false;

    ctx.textBaseline = 'top';
    ctx.font = '32px Arial';
    ctx.fillText ( '\ud83d\ude03', 0, 0 );

    return ctx.getImageData ( 16, 16, 1, 1 ).data[0] !== 0;

  }

  Modernizr.addTest ( 'emoji', supportsEmoji () );

}( window.__svelto_modernizr ));

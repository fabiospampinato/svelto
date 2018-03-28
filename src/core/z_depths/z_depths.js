
// @require core/svelto/svelto.js

(function ( $, _, Svelto ) {

  /* Z-DEPTHS */

  let ZDepths = {};

  for ( let i = 0, l = 24; i <= l; i++ ) {

    ZDepths[i] = `z-depth-${i}`;

  }

  /* EXPORT */

  Svelto.ZDepths = ZDepths;

}( Svelto.$, Svelto._, Svelto ));

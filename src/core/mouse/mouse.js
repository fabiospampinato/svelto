
// @require core/svelto/svelto.js

(function ( $, _, Svelto ) {

  /* MOUSE */

  let Mouse = {
    buttons: {
      LEFT: 0,
      MIDDLE: 1,
      RIGHT: 2
    },
    hasButton ( event, button, orNone = false ) {

      if ( 'originalEvent' in event ) {

        return Mouse.hasButton ( event.originalEvent, button, orNone );

      }

      return ( orNone && !('button' in event) ) || event.button === button;

    }
  };

  /* EXPORT */

  Svelto.Mouse = Mouse;

}( Svelto.$, Svelto._, Svelto ));

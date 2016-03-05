
/* =========================================================================
 * Svelto - Core - Mouse
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* MOUSE */

  let Mouse = {
    buttons: {
      LEFT: 0,
      MIDDLE: 1,
      RIGHT: 2
    },
    hasButton ( event, button, orNone = true ) {

      if ( 'originalEvent' in event ) {

        return Mouse.hasButton ( event.originalEvent, button, orNone );

      }

      return ( orNone && !('button' in event) ) || event.button === button;

    }
  };

  /* EXPORT */

  Svelto.Mouse = Mouse;

}( Svelto.$, Svelto._, Svelto ));

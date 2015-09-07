
/* =========================================================================
 * Svelto - UI v0.2.0
 * http://getsvelto.com/@FILE-NAME
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* UI */

  $.ui = {
    keyCode: {
      BACKSPACE: 8,
      COMMA: 188,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      LEFT: 37,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      PERIOD: 190,
      RIGHT: 39,
      SPACE: 32,
      TAB: 9,
      UP: 38
    },
    mouseButton: {
      LEFT: 0,
      MIDDLE: 1,
      RIGHT: 2
    }
  };

  /* ANIMATION */

  $.ui.animation = {
    slow: 500,
    normal: 350,
    fast: 150
  };

}( jQuery, _, window, document ));

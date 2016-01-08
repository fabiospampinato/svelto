
/* =========================================================================
 * Svelto - Overlay (Toggler)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires overlay.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'overlayToggler',
    selector: '.overlay-toggler',
    options: {
      widget: Svelto.Overlay
    }
  };

  /* OVERLAY TOGGLER */

  class OverlayToggler extends Svelto.Toggler {}

  /* BINDING */

  Svelto.OverlayToggler = OverlayToggler;
  Svelto.OverlayToggler.config = config;

  /* FACTORY */

  $.factory ( Svelto.OverlayToggler );

}( Svelto.$, Svelto._, window, document ));

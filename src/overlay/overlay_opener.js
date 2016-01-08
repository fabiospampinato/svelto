
/* =========================================================================
 * Svelto - Overlay (Opener)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires overlay.js
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'overlayOpener',
    selector: '.overlay-opener',
    options: {
      widget: Svelto.Overlay
    }
  };

  /* OVERLAY OPENER */

  class OverlayOpener extends Svelto.Opener {}

  /* BINDING */

  Svelto.OverlayOpener = OverlayOpener;
  Svelto.OverlayOpener.config = config;

  /* FACTORY */

  $.factory ( Svelto.OverlayOpener );

}( Svelto.$, Svelto._, window, document ));

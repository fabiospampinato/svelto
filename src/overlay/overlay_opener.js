
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
    plugin: true,
    selector: '.overlay-opener',
    options: {
      widget: Svelto.Overlay
    }
  };

  /* OVERLAY OPENER */

  class OverlayOpener extends Svelto.Opener {}

  /* FACTORY */

  $.factory ( OverlayOpener, config, Svelto );

}( Svelto.$, Svelto._, window, document ));

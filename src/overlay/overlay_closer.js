
/* =========================================================================
 * Svelto - Overlay (Closer)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires overlay.js
 * @requires ../closer/closer.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'overlayCloser',
    selector: '.overlay-closer',
    options: {
      widget: Svelto.Overlay
    }
  };

  /* OVERLAY CLOSER */

  class OverlayCloser extends Svelto.Closer {}

  /* BINDING */

  Svelto.OverlayCloser = OverlayCloser;
  Svelto.OverlayCloser.config = config;

  /* FACTORY */

  $.factory ( Svelto.OverlayCloser );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Overlay (Opener)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires overlay.js
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'overlayOpener',
    plugin: true,
    selector: '.overlay-opener',
    options: {
      widget: Widgets.Overlay
    }
  };

  /* OVERLAY OPENER */

  class OverlayOpener extends Widgets.Opener {}

  /* FACTORY */

  Factory.init ( OverlayOpener, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

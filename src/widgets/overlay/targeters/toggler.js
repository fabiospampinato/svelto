
/* =========================================================================
 * Svelto - Widgets - Overlay - Targeters - Toggler
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../overlay.js
 * @require widgets/targeter/toggler/toggler.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'overlayToggler',
    plugin: true,
    selector: '.overlay-toggler',
    options: {
      widget: Widgets.Overlay
    }
  };

  /* OVERLAY TOGGLER */

  class OverlayToggler extends Widgets.Toggler {}

  /* FACTORY */

  Factory.make ( OverlayToggler, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));

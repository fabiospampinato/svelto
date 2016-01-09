
/* =========================================================================
 * Svelto - Flippable (Flipper)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires flippable.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'flippableFlipper',
    plugin: true,
    selector: '.flippable-flipper, .flippable .flipper',
    options: {
      widget: Svelto.Flippable,
      methods: {
        toggle: 'flip',
        open: 'front',
        close: 'back'
      }
    }
  };

  /* FLIPPABLE FLIPPER */

  class FlippableFlipper extends Svelto.Toggler {}

  /* FACTORY */

  $.factory ( FlippableFlipper, config, Svelto );

}( Svelto.$, Svelto._, window, document ));

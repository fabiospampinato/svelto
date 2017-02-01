
/* =========================================================================
 * Svelto - Widgets - Flippable - Targeters - Flipper
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../flippable.js
 * @require widgets/targeter/toggler/toggler.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'flippableFlipper',
    plugin: true,
    selector: '.flippable-flipper',
    options: {
      widget: Widgets.Flippable,
      methods: {
        toggle: 'flip',
        open: 'front',
        close: 'back'
      }
    }
  };

  /* FLIPPABLE FLIPPER */

  class FlippableFlipper extends Widgets.Toggler {}

  /* FACTORY */

  Factory.make ( FlippableFlipper, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

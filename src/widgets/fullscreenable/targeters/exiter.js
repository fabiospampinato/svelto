
/* =========================================================================
 * Svelto - Widgets - Fullscreenable - Targeters - Exiter
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../fullscreenable.js
 * @require widgets/targeter/closer/closer.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'fullscreenableExiter',
    plugin: true,
    selector: '.fullscreenable-exiter, .fullscreen-exiter',
    options: {
      widget: Widgets.Fullscreenable,
      $fallback: $.$html,
      methods: {
        isOpen: 'isFullscreen',
        close: 'exit'
      }
    }
  };

  /* FULLSCREENABLE EXITER */

  class FullscreenableExiter extends Widgets.Closer {}

  /* FACTORY */

  Factory.make ( FullscreenableExiter, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

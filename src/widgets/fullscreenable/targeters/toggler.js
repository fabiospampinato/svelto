
/* =========================================================================
 * Svelto - Widgets - Fullscreenable - Targeters - Toggler
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../fullscreenable.js
 * @require widgets/targeter/toggler/toggler.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'fullscreenableToggler',
    plugin: true,
    selector: '.fullscreenable-toggler, .fullscreen-toggler',
    options: {
      widget: Widgets.Fullscreenable,
      $fallback: Svelto.$html
    }
  };

  /* FULLSCREENABLE TOGGLER */

  class FullscreenableToggler extends Widgets.Toggler {}

  /* FACTORY */

  Factory.make ( FullscreenableToggler, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

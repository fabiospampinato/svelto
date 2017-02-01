
/* =========================================================================
 * Svelto - Widgets - Zoomable - Targeters - Toggler
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../zoomable.js
 * @require widgets/targeter/toggler/toggler.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'zoomableToggler',
    plugin: true,
    selector: '.zoomable-toggler',
    options: {
      widget: Widgets.Zoomable
    }
  };

  /* ZOOMABLE TOGGLER */

  class ZoomableToggler extends Widgets.Toggler {}

  /* FACTORY */

  Factory.make ( ZoomableToggler, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

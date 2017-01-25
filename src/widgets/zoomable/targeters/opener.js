
/* =========================================================================
 * Svelto - Widgets - Zoomable - Targeters - Opener
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../zoomable.js
 * @require widgets/targeter/opener/opener.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'zoomableOpener',
    plugin: true,
    selector: '.zoomable-opener',
    options: {
      widget: Widgets.Zoomable
    }
  };

  /* ZOOMABLE OPENER */

  class ZoomableOpener extends Widgets.Opener {}

  /* FACTORY */

  Factory.init ( ZoomableOpener, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

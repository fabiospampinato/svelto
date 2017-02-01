
/* =========================================================================
 * Svelto - Widgets - Zoomable - Targeters - Closer
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../zoomable.js
 * @require widgets/targeter/closer/closer.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'zoomableCloser',
    plugin: true,
    selector: '.zoomable-closer',
    options: {
      widget: Widgets.Zoomable
    }
  };

  /* ZOOMABLE CLOSER */

  class ZoomableCloser extends Widgets.Closer {}

  /* FACTORY */

  Factory.make ( ZoomableCloser, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

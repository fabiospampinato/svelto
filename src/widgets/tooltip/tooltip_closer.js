
/* =========================================================================
 * Svelto - Tooltip (Closer)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./tooltip.js
 * @require widgets/closer/closer.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tooltipCloser',
    plugin: true,
    selector: '.tooltip-closer',
    options: {
      widget: Widgets.Tooltip
    }
  };

  /* TOOLTIP CLOSER */

  class TooltipCloser extends Widgets.Closer {}

  /* FACTORY */

  Factory.init ( TooltipCloser, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

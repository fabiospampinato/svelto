
/* =========================================================================
 * Svelto - Widgets - Tooltip - Targeters - Opener
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../tooltip.js
 * @require widgets/targeter/opener/opener.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tooltipOpener',
    plugin: true,
    selector: '.tooltip-opener',
    options: {
      widget: Widgets.Tooltip,
      hover: {
        active: true
      }
    }
  };

  /* TOOLTIP OPENER */

  class TooltipOpener extends Widgets.Opener {}

  /* FACTORY */

  Factory.init ( TooltipOpener, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

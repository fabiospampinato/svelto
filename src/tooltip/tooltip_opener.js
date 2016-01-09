
/* =========================================================================
 * Svelto - Tooltip (Opener)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires tooltip.js
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tooltipOpener',
    plugin: true,
    selector: '.tooltip-opener',
    options: {
      widget: Svelto.Tooltip,
      hover: {
        active: true
      }
    }
  };

  /* TOOLTIP OPENER */

  class TooltipOpener extends Svelto.Opener {}

  /* FACTORY */

  $.factory ( TooltipOpener, config, Svelto );

}( Svelto.$, Svelto._, window, document ));

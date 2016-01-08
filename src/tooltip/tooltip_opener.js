
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

  /* BINDING */

  Svelto.TooltipOpener = TooltipOpener;
  Svelto.TooltipOpener.config = config;

  /* FACTORY */

  $.factory ( Svelto.TooltipOpener );

}( Svelto.$, Svelto._, window, document ));

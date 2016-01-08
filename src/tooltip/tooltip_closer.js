
/* =========================================================================
 * Svelto - Tooltip (Closer)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires tooltip.js
 * @requires ../closer/closer.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tooltipCloser',
    selector: '.tooltip-closer, .tooltip .button',
    options: {
      widget: Svelto.Tooltip
    }
  };

  /* TOOLTIP CLOSER */

  class TooltipCloser extends Svelto.Closer {}

  /* BINDING */

  Svelto.TooltipCloser = TooltipCloser;
  Svelto.TooltipCloser.config = config;

  /* FACTORY */

  $.factory ( Svelto.TooltipCloser );

}( Svelto.$, Svelto._, window, document ));

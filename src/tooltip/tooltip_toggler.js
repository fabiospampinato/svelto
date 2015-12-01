
/* =========================================================================
 * Svelto - Tooltip (Toggler)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires tooltip.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tooltipToggler',
    selector: '.tooltip-toggler',
    options: {
      widget: Svelto.Tooltip
    }
  };

  /* TOOLTIP TOGGLER */

  class TooltipToggler extends Svelto.Toggler {}

  /* BINDING */

  Svelto.TooltipToggler = TooltipToggler;
  Svelto.TooltipToggler.config = config;

  /* FACTORY */

  $.factory ( Svelto.TooltipToggler );

}( Svelto.$, Svelto._, window, document ));
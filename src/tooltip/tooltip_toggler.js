
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
    plugin: true,
    selector: '.tooltip-toggler',
    options: {
      widget: Svelto.Tooltip,
      hover: {
        active: true
      }
    }
  };

  /* TOOLTIP TOGGLER */

  class TooltipToggler extends Svelto.Toggler {}

  /* FACTORY */

  $.factory ( TooltipToggler, config, Svelto );

}( Svelto.$, Svelto._, window, document ));


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
    plugin: true,
    selector: '.tooltip-closer, .tooltip .button',
    options: {
      widget: Svelto.Tooltip
    }
  };

  /* TOOLTIP CLOSER */

  class TooltipCloser extends Svelto.Closer {}

  /* FACTORY */

  $.factory ( TooltipCloser, config, Svelto );

}( Svelto.$, Svelto._, window, document ));

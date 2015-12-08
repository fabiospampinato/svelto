
/* =========================================================================
 * Svelto - Tooltip
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tooltip',
    selector: '.tooltip',
    options: {
      selectors: {
        closer: '.button, .tooltip-closer'
      }
    }
  };

  /* TOOLTIP */

  class Tooltip extends Svelto.Dropdown {}

  /* BINDING */

  Svelto.Tooltip = Tooltip;
  Svelto.Tooltip.config = config;

  /* FACTORY */

  $.factory ( Svelto.Tooltip );

}( Svelto.$, Svelto._, window, document ));

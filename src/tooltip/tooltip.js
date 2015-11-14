
/* =========================================================================
 * Svelto - Tooltip
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tooltip',
    options: {
      hover: {
        triggerable: true
      },
      datas: {
        element: 'tooltip'
      },
      selectors: {
        closer: '.button, .tooltip-closer',
        trigger: '.tooltip-trigger'
      }
    }
  };

  /* TOOLTIP */

  class Tooltip extends Svelto.Dropdown {

    /* SPECIAL */

    _widgetize ( $root ) {

      $root.find ( '.tooltip' ).tooltip ();
      $root.filter ( '.tooltip' ).tooltip ();

    }

  }

  /* BINDING */

  Svelto.Tooltip = Tooltip;
  Svelto.Tooltip.config = config;

  /* FACTORY */

  $.factory ( Svelto.Tooltip );

}( jQuery, _, window, document ));


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

  /* TOOLTIP */

  $.factory ( 'svelto.tooltip', $.svelto.dropdown, {

    /* OPTIONS */

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
    },

    /* SPECIAL */

    _widgetize ( $root ) {

      $root.find ( '.tooltip' ).tooltip ();

    }

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Tooltip
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../dropdown/dropdown.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tooltip',
    selector: '.tooltip'
  };

  /* TOOLTIP */

  class Tooltip extends Svelto.Dropdown {}

  /* FACTORY */

  $.factory ( Tooltip, config, Svelto );

}( Svelto.$, Svelto._, window, document ));

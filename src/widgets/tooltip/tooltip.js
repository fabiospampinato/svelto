
/* =========================================================================
 * Svelto - Tooltip
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require widgets/dropdown/dropdown.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tooltip',
    selector: '.tooltip'
  };

  /* TOOLTIP */

  class Tooltip extends Widgets.Dropdown {}

  /* FACTORY */

  Factory.init ( Tooltip, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Dropdown (Opener)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires dropdown.js
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'dropdownOpener',
    plugin: true,
    selector: '.dropdown-opener',
    options: {
      widget: Widgets.Dropdown
    }
  };

  /* DROPDOWN OPENER */

  class DropdownOpener extends Widgets.Opener {}

  /* FACTORY */

  Factory.init ( DropdownOpener, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

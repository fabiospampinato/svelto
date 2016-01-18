
/* =========================================================================
 * Svelto - Dropdown (Toggler)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires dropdown.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'dropdownToggler',
    plugin: true,
    selector: '.dropdown-toggler',
    options: {
      widget: Widgets.Dropdown
    }
  };

  /* DROPDOWN TOGGLER */

  class DropdownToggler extends Widgets.Toggler {}

  /* FACTORY */

  Factory.init ( DropdownToggler, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

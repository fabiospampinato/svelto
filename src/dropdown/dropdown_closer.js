
/* =========================================================================
 * Svelto - Dropdown (Closer)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires dropdown.js
 * @requires ../closer/closer.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'dropdownCloser',
    plugin: true,
    selector: '.dropdown-closer',
    options: {
      widget: Widgets.Dropdown
    }
  };

  /* DROPDOWN CLOSER */

  class DropdownCloser extends Widgets.Closer {}

  /* FACTORY */

  Factory.init ( DropdownCloser, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

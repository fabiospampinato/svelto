
/* =========================================================================
 * Svelto - Dropdown (Closer)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require dropdown.js
 * @require ../closer/closer.js
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

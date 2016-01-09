
/* =========================================================================
 * Svelto - Dropdown (Closer)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires dropdown.js
 * @requires ../closer/closer.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'dropdownCloser',
    plugin: true,
    selector: '.dropdown-closer',
    options: {
      widget: Svelto.Dropdown
    }
  };

  /* DROPDOWN CLOSER */

  class DropdownCloser extends Svelto.Closer {}

  /* FACTORY */

  $.factory ( DropdownCloser, config, Svelto );

}( Svelto.$, Svelto._, window, document ));

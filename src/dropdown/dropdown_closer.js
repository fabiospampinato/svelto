
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
    selector: '.dropdown-closer',
    options: {
      widget: Svelto.Dropdown
    }
  };

  /* DROPDOWN CLOSER */

  class DropdownCloser extends Svelto.Closer {}

  /* BINDING */

  Svelto.DropdownCloser = DropdownCloser;
  Svelto.DropdownCloser.config = config;

  /* FACTORY */

  $.factory ( Svelto.DropdownCloser );

}( Svelto.$, Svelto._, window, document ));

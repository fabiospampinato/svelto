
/* =========================================================================
 * Svelto - Dropdown (Opener)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires dropdown.js
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'dropdownOpener',
    selector: '.dropdown-opener',
    options: {
      widget: Svelto.Dropdown
    }
  };

  /* DROPDOWN OPENER */

  class DropdownOpener extends Svelto.Opener {}

  /* BINDING */

  Svelto.DropdownOpener = DropdownOpener;
  Svelto.DropdownOpener.config = config;

  /* FACTORY */

  $.factory ( Svelto.DropdownOpener );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Dropdown (Toggler)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires dropdown.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'dropdownToggler',
    plugin: true,
    selector: '.dropdown-toggler',
    options: {
      widget: Svelto.Dropdown
    }
  };

  /* DROPDOWN TOGGLER */

  class DropdownToggler extends Svelto.Toggler {}

  /* FACTORY */

  $.factory ( DropdownToggler, config, Svelto );

}( Svelto.$, Svelto._, window, document ));

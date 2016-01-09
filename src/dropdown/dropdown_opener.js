
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
    plugin: true,
    selector: '.dropdown-opener',
    options: {
      widget: Svelto.Dropdown
    }
  };

  /* DROPDOWN OPENER */

  class DropdownOpener extends Svelto.Opener {}

  /* FACTORY */

  $.factory ( DropdownOpener, config, Svelto );

}( Svelto.$, Svelto._, window, document ));

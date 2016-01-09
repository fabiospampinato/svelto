
/* =========================================================================
 * Svelto - Nabar (Opener)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires navbar.js
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'navbarOpener',
    plugin: true,
    selector: '.navbar-opener',
    options: {
      widget: Svelto.Navbar
    }
  };

  /* NAVBAR OPENER */

  class NavbarOpener extends Svelto.Opener {}

  /* FACTORY */

  $.factory ( NavbarOpener, config, Svelto );

}( Svelto.$, Svelto._, window, document ));

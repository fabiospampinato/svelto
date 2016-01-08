
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
    selector: '.navbar-opener',
    options: {
      widget: Svelto.Navbar
    }
  };

  /* NAVBAR OPENER */

  class NavbarOpener extends Svelto.Opener {}

  /* BINDING */

  Svelto.NavbarOpener = NavbarOpener;
  Svelto.NavbarOpener.config = config;

  /* FACTORY */

  $.factory ( Svelto.NavbarOpener );

}( Svelto.$, Svelto._, window, document ));

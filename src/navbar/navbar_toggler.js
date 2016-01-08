
/* =========================================================================
 * Svelto - Navbar (Toggler)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires navbar.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'navbarToggler',
    selector: '.navbar-toggler',
    options: {
      widget: Svelto.Navbar
    }
  };

  /* NAVBAR TOGGLER */

  class NavbarToggler extends Svelto.Toggler {}

  /* BINDING */

  Svelto.NavbarToggler = NavbarToggler;
  Svelto.NavbarToggler.config = config;

  /* FACTORY */

  $.factory ( Svelto.NavbarToggler );

}( Svelto.$, Svelto._, window, document ));

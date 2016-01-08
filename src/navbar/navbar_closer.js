
/* =========================================================================
 * Svelto - Navbar (Closer)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires navbar.js
 * @requires ../closer/closer.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'navbarCloser',
    selector: '.navbar-closer',
    options: {
      widget: Svelto.Navbar
    }
  };

  /* NAVBAR CLOSER */

  class NavbarCloser extends Svelto.Closer {}

  /* BINDING */

  Svelto.NavbarCloser = NavbarCloser;
  Svelto.NavbarCloser.config = config;

  /* FACTORY */

  $.factory ( Svelto.NavbarCloser );

}( Svelto.$, Svelto._, window, document ));

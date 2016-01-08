
/* =========================================================================
 * Svelto - Expander (Toggler)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires expander.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'expanderToggler',
    selector: '.expander-toggler',
    options: {
      widget: Svelto.Expander
    }
  };

  /* EXPANDER TOGGLER */

  class ExpanderToggler extends Svelto.Toggler {}

  /* BINDING */

  Svelto.ExpanderToggler = ExpanderToggler;
  Svelto.ExpanderToggler.config = config;

  /* FACTORY */

  $.factory ( Svelto.ExpanderToggler );

}( Svelto.$, Svelto._, window, document ));

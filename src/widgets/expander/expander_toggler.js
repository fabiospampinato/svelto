
/* =========================================================================
 * Svelto - Expander (Toggler)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./expander.js
 * @require widgets/toggler/toggler.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'expanderToggler',
    plugin: true,
    selector: '.expander-toggler',
    options: {
      widget: Widgets.Expander
    }
  };

  /* EXPANDER TOGGLER */

  class ExpanderToggler extends Widgets.Toggler {}

  /* FACTORY */

  Factory.init ( ExpanderToggler, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

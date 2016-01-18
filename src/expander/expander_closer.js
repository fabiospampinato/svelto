
/* =========================================================================
 * Svelto - Expander (Closer)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires expander.js
 * @requires ../closer/closer.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'expanderCloser',
    plugin: true,
    selector: '.expander-closer',
    options: {
      widget: Widgets.Expander
    }
  };

  /* EXPANDER CLOSER */

  class ExpanderCloser extends Widgets.Closer {}

  /* FACTORY */

  Factory.init ( ExpanderCloser, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

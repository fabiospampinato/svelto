
/* =========================================================================
 * Svelto - Widgets - Expander - Targeters - Closer
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../expander.js
 * @require widgets/targeter/closer/closer.js
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

  Factory.make ( ExpanderCloser, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

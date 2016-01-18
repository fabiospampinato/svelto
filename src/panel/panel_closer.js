
/* =========================================================================
 * Svelto - Panel (Closer)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires panel.js
 * @requires ../closer/closer.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'panelCloser',
    plugin: true,
    selector: '.panel-closer',
    options: {
      widget: Widgets.Panel
    }
  };

  /* PANEL CLOSER */

  class PanelCloser extends Widgets.Closer {}

  /* FACTORY */

  Factory.init ( PanelCloser, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

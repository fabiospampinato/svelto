
/* =========================================================================
 * Svelto - Nabar (Opener)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires panel.js
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'panelOpener',
    plugin: true,
    selector: '.panel-opener',
    options: {
      widget: Widgets.Panel
    }
  };

  /* PANEL OPENER */

  class PanelOpener extends Widgets.Opener {}

  /* FACTORY */

  Factory.init ( PanelOpener, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

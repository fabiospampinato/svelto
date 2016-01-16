
/* =========================================================================
 * Svelto - Nabar (Opener)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires panel.js
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'panelOpener',
    plugin: true,
    selector: '.panel-opener',
    options: {
      widget: Svelto.Panel
    }
  };

  /* PANEL OPENER */

  class PanelOpener extends Svelto.Opener {}

  /* FACTORY */

  $.factory ( PanelOpener, config, Svelto );

}( Svelto.$, Svelto._, window, document ));

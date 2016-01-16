
/* =========================================================================
 * Svelto - Panel (Closer)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires panel.js
 * @requires ../closer/closer.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'panelCloser',
    plugin: true,
    selector: '.panel-closer',
    options: {
      widget: Svelto.Panel
    }
  };

  /* PANEL CLOSER */

  class PanelCloser extends Svelto.Closer {}

  /* FACTORY */

  $.factory ( PanelCloser, config, Svelto );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Panel (Toggler)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires panel.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'panelToggler',
    plugin: true,
    selector: '.panel-toggler',
    options: {
      widget: Svelto.Panel
    }
  };

  /* PANEL TOGGLER */

  class PanelToggler extends Svelto.Toggler {}

  /* FACTORY */

  $.factory ( PanelToggler, config, Svelto );

}( Svelto.$, Svelto._, window, document ));

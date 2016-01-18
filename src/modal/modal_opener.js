
/* =========================================================================
 * Svelto - Modal (Opener)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires modal.js
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'modalOpener',
    plugin: true,
    selector: '.modal-opener',
    options: {
      widget: Widgets.Modal
    }
  };

  /* MODAL OPENER */

  class ModalOpener extends Widgets.Opener {}

  /* FACTORY */

  Factory.init ( ModalOpener, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

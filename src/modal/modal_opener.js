
/* =========================================================================
 * Svelto - Modal (Opener)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires modal.js
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'modalOpener',
    selector: '.modal-opener',
    options: {
      widget: Svelto.Modal
    }
  };

  /* MODAL OPENER */

  class ModalOpener extends Svelto.Opener {}

  /* BINDING */

  Svelto.ModalOpener = ModalOpener;
  Svelto.ModalOpener.config = config;

  /* FACTORY */

  $.factory ( Svelto.ModalOpener );

}( Svelto.$, Svelto._, window, document ));

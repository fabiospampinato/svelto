
/* =========================================================================
 * Svelto - Modal (Closer)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires modal.js
 * @requires ../closer/closer.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'modalCloser',
    selector: '.modal-closer',
    options: {
      widget: Svelto.Modal
    }
  };

  /* MODAL CLOSER */

  class ModalCloser extends Svelto.Closer {}

  /* BINDING */

  Svelto.ModalCloser = ModalCloser;
  Svelto.ModalCloser.config = config;

  /* FACTORY */

  $.factory ( Svelto.ModalCloser );

}( Svelto.$, Svelto._, window, document ));

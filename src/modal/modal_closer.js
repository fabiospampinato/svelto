
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
    plugin: true,
    selector: '.modal-closer',
    options: {
      widget: Svelto.Modal
    }
  };

  /* MODAL CLOSER */

  class ModalCloser extends Svelto.Closer {}

  /* FACTORY */

  $.factory ( ModalCloser, config, Svelto );

}( Svelto.$, Svelto._, window, document ));

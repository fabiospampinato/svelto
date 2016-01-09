
/* =========================================================================
 * Svelto - Modal (Toggler)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires modal.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'modalToggler',
    plugin: true,
    selector: '.modal-toggler',
    options: {
      widget: Svelto.Modal
    }
  };

  /* MODAL TOGGLER */

  class ModalToggler extends Svelto.Toggler {}

  /* FACTORY */

  $.factory ( ModalToggler, config, Svelto );
  
}( Svelto.$, Svelto._, window, document ));

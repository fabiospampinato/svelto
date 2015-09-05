
/* =========================================================================
 * Svelto - Flippable v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* FLIPPABLE */

  $.widget ( 'svelto.flippable', {

    /* OPTIONS */

    options: {
      selectors: {
        flipper: '.flipper'
      },
      callbacks: {
        font: _.noop,
        back: _.noop,
        flipped: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$flippable = this.$element;
      this.$front = this.$flippable.find ( '.flippable-front' );
      this.$back = this.$flippable.find ( '.flippable-back' );

      this.isFlipped = this.$flippable.hasClass ( 'flipped' );

    },

    _events: function () {

      this._on ( 'click', this.options.selectors.flipper, this.flip );

    },

    /* PUBLIC */

    flip: function () {

      this.isFlipped = !this.isFlipped;

      this.$flippable.toggleClass ( 'flipped', this.isFlipped );

      this._trigger ( this.isFlipped ? 'front' : 'back' );
      this._trigger ( 'flipped' );

    }

  });

  /* READY */

  $(function () {

    $('.flippable-wrp').flippable ();

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Flippable v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* FLIPPABLE */

  $.factory ( 'svelto.flippable', {

    /* OPTIONS */

    options: {
      classes: {
        flip: 'flipped'
      },
      selectors: {
        front: '.flippable-front',
        back: '.flippable-back',
        flipper: '.flippable-trigger'
      },
      callbacks: {
        font: _.noop,
        back: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$flippable = this.$element;
      this.$front = this.$flippable.find ( this.options.selectors.front );
      this.$back = this.$flippable.find ( this.options.selectors.back );
      this.$flippers = this.$flippable.find ( this.options.selectors.flipper );

      this.isFlipped = this.$flippable.hasClass ( this.options.classes.flip );

    },

    _events: function () {

      this._on ( this.$flippers, Pointer.tap, this.flip );

    },

    /* PUBLIC */

    flip: function ( force ) {

      if ( !_.isBoolean ( force ) ) {

        force = !this.isFlipped;

      }

      if ( force !== this.isFlipped ) {

        this.isFlipped = force;

        this.$flippable.toggleClass ( this.options.classes.flip, this.isFlipped );

        this._trigger ( this.isFlipped ? 'back' : 'front' );

      }

    },

    front: function () {

      this.flip ( false );

    },

    back: function () {

      this.flip ( true );

    }

  });

  /* READY */

  $(function () {

    $('.flippable').flippable ();

  });

}( jQuery, _, window, document ));

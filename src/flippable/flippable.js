
/* =========================================================================
 * Svelto - Flippable
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'flippable',
    selector: '.flippable',
    options: {
      classes: {
        flip: 'flipped' //TODO: Maybe rename to flip (Be aware that there's also an helper with the same name at the moment)
      },
      selectors: {
        flipper: '.flippable-trigger'
      },
      callbacks: {
        front () {},
        back () {}
      }
    }
  };

  /* FLIPPABLE */

  class Flippable extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$flippable = this.$element;
      this.$flippers = this.$flippable.find ( this.options.selectors.flipper );

      this.isFlipped = this.$flippable.hasClass ( this.options.classes.flip );

    }

    _events () {

      /* FLIPPER */

      this._on ( this.$flippers, Pointer.tap, this.flip );

    }

    /* PUBLIC */

    flip ( force ) {

      if ( !_.isBoolean ( force ) ) {

        force = !this.isFlipped;

      }

      if ( force !== this.isFlipped ) {

        this.isFlipped = force;

        this.$flippable.toggleClass ( this.options.classes.flip, this.isFlipped );

        this._trigger ( this.isFlipped ? 'back' : 'front' );

      }

    }

    front () {

      this.flip ( false );

    }

    back () {

      this.flip ( true );

    }

  }

  /* BINDING */

  Svelto.Flippable = Flippable;
  Svelto.Flippable.config = config;

  /* FACTORY */

  $.factory ( Svelto.Flippable );

}( Svelto.$, Svelto._, window, document ));

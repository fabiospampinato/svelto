
/* =========================================================================
 * Svelto - Flippable
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//FIXME: Right clicking on a `.flippable-trigger` flips it, it should just do nothing instead, probably a Pointer problem

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'flippable',
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
        front () {},
        back () {}
      }
    }
  };

  /* FLIPPABLE */

  class Flippable extends Svelto.Widget {

    /* SPECIAL */

    _widgetize ( $root ) {

      $root.find ( '.flippable' ).flippable ();
      $root.filter ( '.flippable' ).flippable ();

    }

    _variables () {

      this.$flippable = this.$element;
      this.$front = this.$flippable.find ( this.options.selectors.front );
      this.$back = this.$flippable.find ( this.options.selectors.back );
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

}( jQuery, _, window, document ));

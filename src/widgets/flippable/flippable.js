
/* =========================================================================
 * Svelto - Widgets - Flippable
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require widgets/autofocusable/autofocusable.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'flippable',
    plugin: true,
    selector: '.flippable',
    options: {
      classes: {
        flip: 'flipped'
      },
      selectors: {
        front: '.flippable-front',
        back: '.flippable-back'
      },
      callbacks: {
        front: _.noop,
        back: _.noop
      }
    }
  };

  /* FLIPPABLE */

  class Flippable extends Widgets.Autofocusable {

    /* SPECIAL */

    _variables () {

      this.$flippable = this.$element;
      this.$front = this.$flippable.find ( this.options.selectors.front );
      this.$back = this.$flippable.find ( this.options.selectors.back );

      this._isFlipped = this.$flippable.hasClass ( this.options.classes.flip );

    }

    /* API */

    isFlipped () {

      return this._isFlipped;

    }

    flip ( force = !this._isFlipped ) {

      if ( !!force !== this._isFlipped ) {

        this._isFlipped = force;

        this.$flippable.toggleClass ( this.options.classes.flip, this._isFlipped );

        this.autoblur ( this._isFlipped ? this.$front : this.$back );
        this.autofocus ( this._isFlipped ? this.$back : this.$front );

        this._trigger ( this._isFlipped ? 'back' : 'front' );

      }

    }

    front () {

      this.flip ( false );

    }

    back () {

      this.flip ( true );

    }

  }

  /* FACTORY */

  Factory.init ( Flippable, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

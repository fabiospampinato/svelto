
/* =========================================================================
 * Svelto - Flippable
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'flippable',
    plugin: true,
    selector: '.flippable',
    options: {
      classes: {
        flip: 'flipped' //TODO: Maybe rename to flip (Be aware that there's also an helper with the same name at the moment)
      },
      callbacks: {
        front: _.noop,
        back: _.noop
      }
    }
  };

  /* FLIPPABLE */

  class Flippable extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$flippable = this.$element;

      this.isFlipped = this.$flippable.hasClass ( this.options.classes.flip );

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

  /* FACTORY */

  $.factory ( Flippable, config, Svelto );

}( Svelto.$, Svelto._, window, document ));

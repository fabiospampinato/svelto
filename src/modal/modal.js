
/* =========================================================================
 * Svelto - Modal
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

//INFO: Since we are using a pseudo element as the background, in order to simplify the markup, only `.card` and `.card`-like elements can be effectively `.modal`

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'modal',
    selector: '.modal',
    options: {
      classes: {
        show: 'show',
        open: 'open'
      },
      animations: {
        open: Svelto.animation.normal,
        close: Svelto.animation.normal
      },
      callbacks: {
        open () {},
        close () {}
      }
    }
  };

  /* MODAL */

  class Modal extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.modal = this.element;
      this.$modal = this.$element;

      this._isOpen = this.$modal.hasClass ( this.options.classes.open );

    }

    _events () {

      /* TAP */

      this._on ( true, Pointer.tap, this.__tap );

    }

    /* TAP */

    __tap ( event ) {

      if ( event.target === this.modal ) {

        this.close ();

      }

    }

    /* KEYDOWN */

    __keydown ( event ) {

      if ( event.keyCode === Svelto.keyCode.ESCAPE ) {

        event.preventDefault ();
        event.stopImmediatePropagation ();

        this.close ();

      }

    }

    /* PUBLIC */

    isOpen () {

      return this._isOpen;

    }

    toggle ( force ) {

      if ( !_.isBoolean ( force ) ) {

        force = !this._isOpen;

      }

      if ( force !== this._isOpen ) {

        this[force ? 'open' : 'close']();

      }

    }

    open () {

      if ( !this._isOpen ) {

        this._isOpen = true;

        $body.unscrollable ();

        this._frame ( function () {

          this.$modal.addClass ( this.options.classes.show );

          this._frame ( function () {

            this.$modal.addClass ( this.options.classes.open );

            this._on ( true, $document, 'keydown', this.__keydown );

            this._trigger ( 'open' );

          });

        });

      }

    }

    close () {

      if ( this._isOpen ) {

        this._isOpen = false;

        this._frame ( function () {

          this.$modal.removeClass ( this.options.classes.open );

          this._delay ( function () {

            this.$modal.removeClass ( this.options.classes.show );

            $body.scrollable ();

            this._off ( $document, 'keydown', this.__keydown );

            this._trigger ( 'close' );

          }, this.options.animations.close );

        });

      }

    }

  }

  /* BINDING */

  Svelto.Modal = Modal;
  Svelto.Modal.config = config;

  /* FACTORY */

  $.factory ( Svelto.Modal );

}( Svelto.$, Svelto._, window, document ));

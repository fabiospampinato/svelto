
/* =========================================================================
 * Svelto - Modal
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//INFO: Since we check the `event.target` in order to detect a click on the background it will fail when using a `.container` as a modal, so effectively we are shrinking the supported groups of element to `card` and `card`-like

//TODO: Disable scrolling while the modal is open

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'modal',
    options: {
      attributes: {
        id: 'id'
      },
      datas: {
        element: 'modal'
      },
      classes: {
        open: 'open'
      },
      selectors: {
        trigger: '.modal-trigger',
        closer: '.modal-closer'
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

    _widgetize ( $root ) {

      $root.find ( '.modal' ).modal ();
      $root.filter ( '.modal' ).modal ();

    }

    _variables () {

      this.modal = this.element;
      this.$modal = this.$element;

      this.id = this.$modal.attr ( this.options.attributes.id );

      this.$triggers = $(this.options.selectors.trigger + '[data-' + this.options.datas.element + '="' + this.id + '"]');
      this.$closers = this.$modal.find ( this.options.selectors.closer );

      this._isOpen = this.$modal.hasClass ( this.options.classes.open );

    }

    _events () {

      /* TAP */

      this._on ( Pointer.tap, this.__tap );

      /* TRIGGER */

      this._on ( this.$triggers, Pointer.tap, this.open );
      /* CLOSER */

      this._on ( this.$closers, Pointer.tap, this.close );

    }

    /* PRIVATE */

    __tap ( event ) {

      if ( event.target === this.modal ) {

        this.close ();

      }

    }

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

        this._isOpen = force;

        this.$modal.toggleClass ( this.options.classes.open, this._isOpen );

        this[this._isOpen ? '_on' : '_off']( $document, 'keydown', this.__keydown );

        this._trigger ( this._isOpen ? 'open' : 'close' );

      }

    }

    open () {

      this.toggle ( true );

    }

    close () {

      this.toggle ( false );

    }

  }

  /* BINDING */

  Svelto.Modal = Modal;
  Svelto.Modal.config = config;

  /* FACTORY */

  $.factory ( Svelto.Modal );

}( Svelto.$, Svelto._, window, document ));

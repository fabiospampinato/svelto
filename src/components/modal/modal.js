
/* =========================================================================
 * Svelto - Modal v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Disable scrolling while the modal is open

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* MODAL */

  $.factory ( 'svelto.modal', {

    /* OPTIONS */

    options: {
      classes: {
        open: 'open'
      },
      selectors: {
        trigger: '.modal-trigger',
        closer: '.modal-closer',
        background: '.modal-background'
      },
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$modal = this.$element;

      this.id = this.$modal.attr ( 'id' );

      this.$triggers = $(this.options.selectors.trigger + '[data-modal="' + this.id + '"]');
      this.$closers = this.$modal.find ( this.options.selectors.closer );
      this.$background = this.$modal.next ( this.options.selectors.background );

      this._isOpen = this.$modal.hasClass ( this.options.classes.open );

    },

    _events: function () {

      /* TRIGGER */

      this._on ( this.$triggers, $.Pointer.tap, this.open );

      /* CLOSER & BACKGROUND */

      this._on ( this.$closers.add ( this.$background ), $.Pointer.tap, this.close );

    },

    /* PRIVATE */

    __keydown: function ( event ) {

      if ( event.keyCode === $.ui.keyCode.ESCAPE ) {

        event.stopImmediatePropagation ();

        this.close ();

      }

    },

    /* PUBLIC */

    isOpen: function () {

      return this._isOpen;

    },

    toggle: function ( force ) {

      if ( !_.isBoolean ( force ) ) {

        force = !this._isOpen;

      }

      if ( force !== this._isOpen ) {

        this._isOpen = force;

        this.$modal.toggleClass ( this.options.classes.open, this._isOpen );

        this[this._isOpen ? '_on' : '_off']( $document, 'keydown', this.__keydown );

        this._trigger ( this._isOpen ? 'open' : 'close' );

      }

    },

    open: function () {

      this.toggle ( true );

    },

    close: function () {

      this.toggle ( false );

    }

  });

  /* READY */

  $(function () {

    $('.modal').modal ();

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Expander v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* EXPANDER */

  $.factory ( 'svelto.expander', {

    /* OPTIONS */

    options: {
      classes: {
        open: 'open'
      },
      selectors: {
        expander: '.expander',
        toggler: '.expander-toggler'
      },
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$expander = this.$element;
      this.$togglers = this.$expander.find ( this.options.selectors.toggler );

      this._isOpen = this.$expander.hasClass ( this.options.classes.open );

    },

    _events: function () {

      /* TOGGLER */

      this._on ( this.$togglers, Pointer.tap, this.toggle );

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

        this.$expander.toggleClass ( this.options.classes.open, this._isOpen );

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

    $('.expander').expander ();

  });

}( jQuery, _, window, document ));

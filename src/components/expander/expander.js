
/* =========================================================================
 * Svelto - Expander
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

    _widgetize ( $root ) {

      $root.find ( '.expander' ).expander ();

    },

    _variables () {

      this.$expander = this.$element;
      this.$togglers = this.$expander.find ( this.options.selectors.toggler );

      this._isOpen = this.$expander.hasClass ( this.options.classes.open );

    },

    _events () {

      /* TOGGLER */

      this._on ( this.$togglers, Pointer.tap, this.toggle );

    },

    /* PUBLIC */

    isOpen () {

      return this._isOpen;

    },

    toggle ( force ) {

      if ( !_.isBoolean ( force ) ) {

        force = !this._isOpen;

      }

      if ( force !== this._isOpen ) {

        this._isOpen = force;

        this.$expander.toggleClass ( this.options.classes.open, this._isOpen );

        this._trigger ( this._isOpen ? 'open' : 'close' );

      }

    },

    open () {

      this.toggle ( true );

    },

    close () {

      this.toggle ( false );

    }

  });

}( jQuery, _, window, document ));

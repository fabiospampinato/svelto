
/* =========================================================================
 * Svelto - Navbar v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

//TODO: Add flick capabilities (show and hide on flick in the right direction and starting within the right zone)

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* NAVBAR */

  $.widget ( 'presto.navbar', {

    /* OPTIONS */

    options: {
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$navbar = this.$element;
      this.$wrp = this.$navbar.parent ();

      this.id = this.$navbar.attr ( 'id' );

      this.$closers = this.$wrp.find ( '.navbar-closer' );
      this.$triggers = $('.navbar-trigger[data-navbar="' + this.id + '"]');

      this.opened = this.$wrp.hasClass ( 'opened' );

    },

    _events: function () {

      /* CLOSER CLICK */

      this._on ( this.$closers, 'click', this.close );

      /* TRIGGER CLICK */

      this._on ( this.$triggers, 'click', this.open );

    },

    /* PUBLIC */

    toggle: function ( force ) {

      if ( _.isUndefined ( force ) ) {

        force = !this.opened;

      }

      if ( force !== this.opened ) {

        this.opened = force;

        this.$wrp.toggleClass ( 'opened', this.opened );

        this._trigger ( this.opened ? 'open' : 'close' );

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

    $('.navbar').navbar ();

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Overlay v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* OVERLAY */

  $.factory ( 'svelto.overlay', {

    /* OPTIONS */

    options: {
      hover: {
        triggerable: false,
        delays: {
          open: 750,
          close: 250
        }
      },
      classes: {
        open: 'open'
      },
      selectors: {
        trigger: '.overlay-trigger',
        closer: '.overlay-closer'
      },
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    },

    /* SPECIAL */

    _widgetize: function ( $root ) {

      $root.find ( '.overlay' ).overlay ();

    },

    _variables: function () {

      this.$overlay = this.$element;
      this.$overlayed = this.$overlay.parent ();

      this.$triggers = this.$overlayed.find ( this.options.selectors.trigger );
      this.$closers = this.$overlayed.find ( this.options.selectors.closer );

      this._isOpen = this.$overlay.hasClass ( this.options.classes.open );

    },

    _events: function () {

      /* TRIGGER */

      this._on ( this.$triggers, Pointer.tap, this.open );

      /* CLOSER */

      this._on ( this.$closers, Pointer.tap, this.close );

      /* HOVER */

      if ( this.options.hover.triggerable ) {

        this._on ( this.$overlayed, Pointer.enter, this.__hoverEnter );

      }

    },

    /* HOVER */

    __hoverEnter: function () {

      if ( !this._isOpen ) {

        this._isHoverOpen = false;

        this._hoverOpenTimeout = this._delay ( this.__hoverOpen, this.options.hover.delays.open );

        this._one ( this.$overlayed, Pointer.leave, this.__hoverLeave );

      }

    },

    __hoverOpen: function () {

      if ( !this._isOpen ) {

        this.open ();

        this._isHoverOpen = true;

        this._hoverOpenTimeout = false;

      }

    },

    __hoverLeave: function () {

      if ( this._hoverOpenTimeout ) {

        clearTimeout ( this._hoverOpenTimeout );

        this._hoverOpenTimeout = false;

      }

      if ( this._isHoverOpen ) {

        this._hoverCloseTimeout = this._delay ( this.__hoverClose, this.options.hover.delays.close );

      }

    },

    __hoverClose: function () {

      if ( this._isHoverOpen ) {

        this.close ();

        this._isHoverOpen = false;

        this._hoverCloseTimeout = false;

      }

    },

    /* API */

    isOpen: function () {

      return this._isOpen;

    },

    toggle: function ( force ) {

      if ( !_.isBoolean ( force ) ) {

        force = !this._isOpen;

      }

      if ( force !== this._isOpen ) {

        this._isOpen = force;

        this._frame ( function () {

          this.$overlay.toggleClass ( this.options.classes.open, this._isOpen );

          this._trigger ( this._isOpen ? 'open' : 'close' );

        });

      }

    },

    open: function () {

      this.toggle ( true );

    },

    close: function () {

      this.toggle ( false );

    }

  });

}( jQuery, _, window, document ));

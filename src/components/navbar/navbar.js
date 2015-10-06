
/* =========================================================================
 * Svelto - Navbar v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Replace flickable support with a smooth moving navbar, so operate on drag
//TODO: Support esc key to close it

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* NAVBAR */

  $.factory ( 'svelto.navbar', {

    /* OPTIONS */

    options: {
      flickableArea: 20, //INFO: Amount of pixels close to the viewport border where the flick should be considered intentional //FIXME: Should be consistend within different DPIs
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$navbar = this.$element;

      this.id = this.$navbar.attr ( 'id' );

      this.$closers = this.$navbar.find ( '.navbar-closer, + .navbar-background' );
      this.$triggers = $('.navbar-trigger[data-navbar="' + this.id + '"]');

      this.direction = this.$navbar.data ( 'direction' );
      this.isFlickable = this.$navbar.hasClass ( 'flickable' );
      this.opened = this.$navbar.hasClass ( 'opened' );

    },

    _events: function () {

      /* CLOSER TAP */

      this._on ( this.$closers, Pointer.tap, this.close );

      /* TRIGGER TAP */

      this._on ( this.$triggers, Pointer.tap, this.open );

      /* FLICK */

      if ( this.isFlickable ) {

        this._on ( $document, Pointer.flick, this._handler_flick );

      }

    },

    /* PRIVATE */

    _handler_flick: function ( event, data ) {

      if ( this.opened ) return;

      switch ( this.direction ) {

        case 'left':
        case 'right':
          if ( data.orientation === 'horizontal' ) {
            if ( this.direction === 'left' ) {
              if ( data.direction === 1 ) {
                if ( data.startXY.X <= this.options.flickableArea ) {
                  this.open ();
                }
              }
            } else if ( this.direction === 'right' ) {
              if ( data.direction === -1 ) {
                if ( $window.width () - data.startXY.X <= this.options.flickableArea ) {
                  this.open ();
                }
              }
            }
          }
          break;

        case 'top':
        case 'bottom':
          if ( data.orientation === 'vertical' ) {
            if ( this.direction === 'top' ) {
              if ( data.direction === -1 ) {
                if ( data.startXY.Y <= this.options.flickableArea ) {
                  this.open ();
                }
              }
            } else if ( this.direction === 'bottom' ) {
              if ( data.direction === 1 ) {
                if ( $window.height () - data.startXY.Y <= this.options.flickableArea ) {
                  this.open ();
                }
              }
            }
          }
          break;

      }

    },

    /* PUBLIC */

    toggle: function ( force ) {

      if ( _.isUndefined ( force ) ) {

        force = !this.opened;

      }

      if ( force !== this.opened ) {

        this.opened = force;

        this.$navbar.toggleClass ( 'opened', this.opened );

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

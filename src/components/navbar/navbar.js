
/* =========================================================================
 * Svelto - Navbar v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Replace flickable support with a smooth moving navbar, so operate on drag
//TODO: Disable scrolling while the navbar is open

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* NAVBAR */

  $.factory ( 'svelto.navbar', {

    /* OPTIONS */

    options: {
      flickableRange: 20, //INFO: Amount of pixels close to the viewport border where the flick should be considered intentional //FIXME: Should be consistend within different DPIs
      datas: {
        direction: 'direction'
      },
      classes: {
        open: 'open',
        flickable: 'flickable'
      },
      selectors: {
        closer: '.navbar-closer',
        trigger: '.navbar-trigger'
      },
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.navbar = this.element;
      this.$navbar = this.$element;

      this.id = this.$navbar.attr ( 'id' );

      this.$closers = this.$navbar.find ( this.options.selectors.closer );
      this.$triggers = $(this.options.selectors.trigger + '[data-navbar="' + this.id + '"]');

      this.direction = this.$navbar.data ( this.options.datas.direction );
      this._isOpen = this.$navbar.hasClass ( this.options.classes.open );
      this.isFlickable = this.$navbar.hasClass ( this.options.classes.flickable );

    },

    _events: function () {

      /* TAP */

      this._on ( Pointer.tap, this.__tap );

      /* TRIGGER */

      this._on ( this.$triggers, Pointer.tap, this.open );

      /* CLOSER */

      this._on ( this.$closers, Pointer.tap, this.close );

      /* KEYDOWN */

      this._onHover ( [$document, 'keydown', this.__keydown] );

      /* FLICK */

      if ( this.isFlickable ) {

        this._on ( $document, Pointer.flick, this.__flick );

      }

    },

    /* TAP */

    __tap: function ( event ) {

      if ( event.target === this.navbar ) {

        this.close ();

      }

    },

    /* KEYDOWN */

    __keydown: function ( event ) {

      switch ( event.keyCode ) {

        case $.ui.keyCode.ESCAPE:
          this.close ();
          break;

        default:
          return;

      }

      event.preventDefault ();
      event.stopImmediatePropagation ();

    },

    /* FLICK */

    __flick: function ( event, data ) {

      if ( this._isOpen ) return;

      switch ( this.direction ) {

        case 'left':
        case 'right':
          if ( data.orientation === 'horizontal' ) {
            if ( this.direction === 'left' ) {
              if ( data.direction === 1 ) {
                if ( data.startXY.X <= this.options.flickableRange ) {
                  this.open ();
                }
              }
            } else if ( this.direction === 'right' ) {
              if ( data.direction === -1 ) {
                if ( $window.width () - data.startXY.X <= this.options.flickableRange ) {
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
                if ( data.startXY.Y <= this.options.flickableRange ) {
                  this.open ();
                }
              }
            } else if ( this.direction === 'bottom' ) {
              if ( data.direction === 1 ) {
                if ( $window.height () - data.startXY.Y <= this.options.flickableRange ) {
                  this.open ();
                }
              }
            }
          }
          break;

      }

    },

    /* PUBLIC */

    isOpen: function () {

      return this._isOpen;

    },

    toggle: function ( force ) {

      if ( _.isUndefined ( force ) ) {

        force = !this._isOpen;

      }

      if ( force !== this._isOpen ) {

        this._isOpen = force;

        this.$navbar.toggleClass ( this.options.classes.open, this._isOpen );

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

    $('.navbar').navbar ();

  });

}( jQuery, _, window, document ));

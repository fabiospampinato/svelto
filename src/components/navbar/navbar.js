
/* =========================================================================
 * Svelto - Navbar
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Replace flickable support with a smooth moving navbar, so operate on drag
//TODO: Disable scrolling while the navbar is open
//TODO: Close with a flick

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'navbar',
    options: {
      flickableRange: 20, //INFO: Amount of pixels close to the viewport border where the flick should be considered intentional //FIXME: Should be consistend within different DPIs
      attributes: {
        id: 'id'
      },
      datas: {
        direction: 'direction',
        element: 'navbar'
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
        open () {},
        close () {}
      }
    }
  };

  /* NAVBAR */

  class Navbar extends Svelto.Widget {

    /* SPECIAL */

    _widgetize ( $root ) {

      $root.find ( '.navbar' ).navbar ();
      $root.filter ( '.navbar' ).navbar ();

    }

    _variables () {

      this.$navbar = this.$element;
      this.navbar = this.element;

      this.id = this.$navbar.attr ( this.options.attributes.id );

      this.$closers = this.$navbar.find ( this.options.selectors.closer );
      this.$triggers = $(this.options.selectors.trigger + '[data-' + this.options.datas.element + '="' + this.id + '"]');

      this.direction = this.$navbar.data ( this.options.datas.direction );
      this._isOpen = this.$navbar.hasClass ( this.options.classes.open );
      this.isFlickable = this.$navbar.hasClass ( this.options.classes.flickable );

    }

    _events () {

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

    }

    /* TAP */

    __tap ( event ) {

      if ( event.target === this.navbar ) {

        this.close ();

      }

    }

    /* KEYDOWN */

    __keydown ( event ) {

      switch ( event.keyCode ) {

        case $.ui.keyCode.ESCAPE:
          this.close ();
          break;

        default:
          return;

      }

      event.preventDefault ();
      event.stopImmediatePropagation ();

    }

    /* FLICK */

    __flick ( event, data ) {

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

    }

    /* PUBLIC */

    isOpen () {

      return this._isOpen;

    }

    toggle ( force ) {

      if ( _.isUndefined ( force ) ) {

        force = !this._isOpen;

      }

      if ( force !== this._isOpen ) {

        this._isOpen = force;

        this.$navbar.toggleClass ( this.options.classes.open, this._isOpen );

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

  Svelto.Navbar = Navbar;
  Svelto.Navbar.config = config;

  /* FACTORY */

  $.factory ( Svelto.Navbar );

}( jQuery, _, window, document ));

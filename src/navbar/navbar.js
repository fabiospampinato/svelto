
/* =========================================================================
 * Svelto - Navbar
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

//TODO: Replace flickable support with a smooth moving navbar, so operate on drag
//TODO: Close with a flick
//TODO: Add close with the ESC key

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'navbar',
    selector: '.navbar',
    options: {
      flickableRange: 20, //INFO: Amount of pixels close to the viewport border where the flick should be considered intentional
      datas: {
        direction: 'direction'
      },
      classes: {
        show: 'show',
        open: 'open',
        flickable: 'flickable'
      },
      selectors: {
        closer: '.navbar-closer'
      },
      animations: {
        open: Svelto.animation.normal,
        close: Svelto.animation.normal,
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

    _variables () {

      this.$navbar = this.$element;
      this.navbar = this.element;

      this.$closers = this.$navbar.find ( this.options.selectors.closer );

      this.direction = this.$navbar.data ( this.options.datas.direction );
      this._isOpen = this.$navbar.hasClass ( this.options.classes.open );
      this.isFlickable = this.$navbar.hasClass ( this.options.classes.flickable );

    }

    _events () {

      /* TAP */

      this._on ( Pointer.tap, this.__tap );

      /* CLOSER */

      this._on ( this.$closers, Pointer.tap, this.close );

      /* KEYDOWN */

      this._onHover ( [$document, 'keydown', this.__keydown] );

      /* FLICK */

      if ( this.isFlickable ) {

        $document.flickable ({
          callbacks: {
            flick: this.__flick.bind ( this )
          }
        });

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

        case Svelto.keyCode.ESCAPE:
          this.close ();
          break;

        default:
          return;

      }

      event.preventDefault ();
      event.stopImmediatePropagation ();

    }

    /* FLICK */

    __flick ( data ) {

      if ( this._isOpen ) return;

      switch ( this.direction ) {

        case 'left':
        case 'right':
          if ( data.orientation === 'horizontal' ) {
            if ( this.direction === 'left' ) {
              if ( data.direction === 'right' ) {
                if ( data.startXY.X <= this.options.flickableRange ) {
                  this.open ();
                }
              }
            } else if ( this.direction === 'right' ) {
              if ( data.direction === 'left' ) {
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
              if ( data.direction === 'bottom' ) {
                if ( data.startXY.Y <= this.options.flickableRange ) {
                  this.open ();
                }
              }
            } else if ( this.direction === 'bottom' ) {
              if ( data.direction === 'top' ) {
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

      if ( !_.isBoolean ( force ) ) {

        force = !this._isOpen;

      }

      if ( force !== this._isOpen ) {

        if ( force === true ) {

          this.$navbar.addClass ( this.options.classes.show );

        }

        this._frame ( function () {

          this._isOpen = force;

          this.$navbar.toggleClass ( this.options.classes.open, this._isOpen );

          if ( !this._isOpen ) {

            this._delay ( function () {

              this.$navbar.removeClass ( this.options.classes.show );

            }, this.options.animations.close );

          }

          $body[this._isOpen ? 'unscrollable' : 'scrollable']();

          this._trigger ( this._isOpen ? 'open' : 'close' );

        });

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

}( Svelto.$, Svelto._, window, document ));

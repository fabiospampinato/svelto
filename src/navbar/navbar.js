
/* =========================================================================
 * Svelto - Navbar
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

//INFO: Since we are using a pseudo element as the background, in order to simplify the markup, only `.card` and `.card`-like elements can be effectively `.navbar`

//TODO: Replace flickable support with a smooth moving navbar, so operate on drag
//TODO: Close with a flick (if not attached)
//TODO: Add close with the ESC key (if not attached)
//TODO: Maybe control the attaching process via js, so that we no longer have to put the navbar in any particular position also

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'navbar',
    plugin: true,
    selector: '.navbar',
    options: {
      flickableRange: 20, //INFO: Amount of pixels close to the viewport border where the flick should be considered intentional
      classes: {
        defaultDirection: 'left',
        directions: ['top', 'right', 'bottom', 'left'],
        show: 'show',
        open: 'open',
        flickable: 'flickable'
      },
      animations: {
        open: Svelto.animation.normal,
        close: Svelto.animation.normal,
      },
      keystrokes: {
        'esc': 'close'
      },
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    }
  };

  /* NAVBAR */

  class Navbar extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$navbar = this.$element;
      this.navbar = this.element;

      this.direction = this.options.classes.defaultDirection;

      for ( let direction of this.options.classes.directions ) {

        if ( this.$navbar.hasClass ( direction ) ) {

          this.direction = direction;
          break;

        }

      }

      this._isOpen = this.$navbar.hasClass ( this.options.classes.open );
      this.isFlickable = this.$navbar.hasClass ( this.options.classes.flickable );

    }

    _events () {

      /* TAP */

      this._on ( Pointer.tap, this.__tap );

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

        this[force ? 'open' : 'close']();

      }

    }

    open () {

      if ( !this._isOpen ) {

        this._isOpen = true;

        $body.unscrollable ();

        this._frame ( function () {

          this.$navbar.addClass ( this.options.classes.show );

          this._frame ( function () {

            this.$navbar.addClass ( this.options.classes.open );

            this._trigger ( 'open' );

          });

        });

      }

    }

    close () {

      if ( this._isOpen ) {

        this._isOpen = false;

        this._frame ( function () {

          this.$navbar.removeClass ( this.options.classes.open );

          this._delay ( function () {

            this.$navbar.removeClass ( this.options.classes.show );

            $body.scrollable ();

            this._trigger ( 'close' );

          }, this.options.animations.close );

        });

      }

    }

  }

  /* FACTORY */

  $.factory ( Navbar, config, Svelto );

}( Svelto.$, Svelto._, window, document ));

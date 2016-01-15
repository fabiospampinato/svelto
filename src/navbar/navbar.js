
/* =========================================================================
 * Svelto - Navbar
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

//INFO: Since we are using a pseudo element as the background, in order to simplify the markup, only `.card` and `.card`-like elements can be effectively `.navbar`

//TODO: Rename it to something like panel maybe
//TODO: Replace flickable support with a smooth moving navbar, so operate on drag

//TODO: Maybe control the attaching process via js, so that we no longer have to put the navbar in any particular position also

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'navbar',
    plugin: true,
    selector: '.navbar',
    options: {
      direction: 'left',
      flick: {
        active: false,
        treshold: 20 //INFO: Amount of pixels close to the window border where the flick should be considered intentional //TODO: Replace the window with the closest `.layout`
      },
      classes: {
        show: 'show',
        open: 'open',
        flickable: 'flickable',
        attached: 'attached'
      },
      animations: {
        open: Svelto.animation.normal,
        close: Svelto.animation.normal,
      },
      keystrokes: {
        'esc': '__esc'
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

    static widgetize ( $navbar ) {

      $navbar.navbar ( $navbar.hasClass ( Svelto.Navbar.config.options.classes.flickable ) ? { flick: { active: true } } : undefined );

    }

    _variables () {

      this.$navbar = this.$element;
      this.navbar = this.element;

      this.options.direction = _.getDirections ().find ( direction => this.$navbar.hasClass ( direction ) ) || this.options.direction;

      this._isOpen = this.$navbar.hasClass ( this.options.classes.open );
      this._isAttached = this.$navbar.hasClass ( this.options.classes.attached );

    }

    _events () {

      /* TAP */

      this._on ( Pointer.tap, this.__tap );

      /* KEYDOWN */

      this._onHover ( [$document, 'keydown', this.__keydown] );

      /* FLICK */

      if ( this.options.flick.active ) {

        $document.flickable ();

        this._on ( $document, 'flickable:flick', this.__documentFlick );

        this.$navbar.flickable ({
          callbacks: {
            flick: this.__navbarFlick.bind ( this )
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

    /* ESC */

    __esc () {

      if ( !this._isAttached ) {

        this.close ();

      }

    }

    /* FLICK */

    __documentFlick ( data ) {

      if ( !this._isOpen ) return;

      if ( data.direction !== _.getOppositeDirection ( this.options.direction ) ) return;

      switch ( this.direction ) {

        case 'left':
          if ( data.startXY.X <= this.options.flickableTreshold ) {
            this.open ();
          }
          break;

        case 'right':
          if ( $window.width () - data.startXY.X <= this.options.flickableTreshold ) {
            this.open ();
          }
          break;

        case 'top':
          if ( data.startXY.Y <= this.options.flickableTreshold ) {
            this.open ();
          }
          break;

        case 'bottom':
          if ( $window.height () - data.startXY.Y <= this.options.flickableTreshold ) {
            this.open ();
          }
          break;

      }

    }

    __navbarFlick ( data ) {

      if ( this._isOpen && !this._isAttached ) return;

      if ( data.direction !== this.options.direction ) return;

      this.close ();

    }

    /* ATTACHMENT */

    _isAttached () {

      return this._isAttached ();

    }

    _toggleAttachment ( force ) {

      if ( !_.isBoolean ( force ) ) {

        force = !this._isAttached;

      }

      if ( force !== this._isAttached ) {

        this._isAttached = force;

        this.$navbar.toggleClass ( this.options.classes.attached, this._isAttached );

        if ( this._isAttached !== this._isOpen ) {

          this.toggle ();

        }

      }

    }

    _attach () {

      this._toggleAttachment ( true );

    }

    _detach () {

      this._toggleAttachment ( false );

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

      if ( this._isOpen ) return;

      this._isOpen = true;

      $body.disableScroll ();

      this._frame ( function () {

        this.$navbar.addClass ( this.options.classes.show );

        this._frame ( function () {

          this.$navbar.addClass ( this.options.classes.open );

          this._trigger ( 'open' );

        });

      });

    }

    close () {

      if ( !this._isOpen ) return;

      this._isOpen = false;

      this._frame ( function () {

        this._detach ();
        
        this.$navbar.removeClass ( this.options.classes.open );

        this._delay ( function () {

          this.$navbar.removeClass ( this.options.classes.show );

          $body.enableScroll ();

          this._trigger ( 'close' );

        }, this.options.animations.close );

      });

    }

  }

  /* FACTORY */

  $.factory ( Navbar, config, Svelto );

}( Svelto.$, Svelto._, window, document ));

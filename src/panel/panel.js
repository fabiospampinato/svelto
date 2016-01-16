
/* =========================================================================
 * Svelto - Panel
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

//INFO: Since we are using a pseudo element as the background, in order to simplify the markup, only `.card` and `.card`-like elements can be effectively `.panel`

//TODO: Replace flickable support with a smooth moving panel, so operate on drag

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'panel',
    plugin: true,
    selector: '.panel',
    options: {
      direction: 'left',
      pin: false, //INFO: If is a valid key of `Svelto.breakpoints` it will get auto pinned/unpinned when we are above or below that breakpoint
      flick: {
        active: false,
        treshold: 20 //INFO: Amount of pixels close to the window border where the flick should be considered intentional
      },
      classes: {
        show: 'show',
        open: 'open',
        flickable: 'flickable', //INFO: As a side effect it will gain a `Svelto.Flickable` instance, therefor it will also trigger `flickable:flick` events, that are what we want
        pinned: 'pinned'
      },
      selectors: {
        layout: '.layout, body' //TODO: Just use `.layout`
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

  /* PANEL */

  class Panel extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$panel = this.$element;
      this.panel = this.element;

      this.$layout = this.$panel.closest ( this.options.selectors.layout );
      this.layoutPinnedClass = Svelto.Panel.config.name + '-' + this.options.classes.pinned + '-' + this.options.direction;

      this.options.direction = _.getDirections ().find ( direction => this.$panel.hasClass ( direction ) ) || this.options.direction;
      this.options.flick.active = this.$panel.hasClass ( this.options.classes.flickable );

      if ( this.options.pin ) {

        _.merge ( this.options.breakpoints, {
          up: {
            [this.options.pin]: 'pin',
          },
          down: {
            [this.options.pin]: 'unpin'
          }
        });

      }

      this._isOpen = this.$panel.hasClass ( this.options.classes.open );
      this._isPinned = this.$panel.hasClass ( this.options.classes.pinned );

    }

    _events () {

      /* TAP */

      this._on ( Pointer.tap, this.__tap );

      /* KEYDOWN */

      this._on ( $document, 'keydown', this.__keydown );

      /* FLICK */

      if ( this.options.flick.active ) {

        /* DOCUMENT */

        $document.flickable ();

        this._on ( $document, 'flickable:flick', this.__documentFlick );

        /* PANEL */

        this.$panel.flickable ({
          callbacks: {
            flick: this.__panelFlick.bind ( this )
          }
        });

      }

    }

    /* TAP */

    __tap ( event ) {

      if ( event.target === this.panel && !this._isPinned ) {

        this.close ();

      }

    }

    /* ESC */

    __esc () {

      if ( !this._isPinned ) {

        this.close ();

      }

    }

    /* FLICK */

    __documentFlick ( data ) {

      if ( this._isOpen ) return;

      if ( data.direction !== _.getOppositeDirection ( this.options.direction ) ) return;

      let layoutOffset = this.$layout.offset ();

      switch ( this.direction ) {

        case 'left':
          if ( data.startXY.X - layoutOffset.left > this.options.flickableTreshold ) return;
          break;

        case 'right':
          if ( this.$layout.outerWidth () + layoutOffset.left - data.startXY.X > this.options.flickableTreshold ) return;
          break;

        case 'top':
          if ( data.startXY.Y - layoutOffset.top > this.options.flickableTreshold ) return;
          break;

        case 'bottom':
          if ( this.$layout.outerHeight () + layoutOffset.top - data.startXY.Y > this.options.flickableTreshold ) return;
          break;

      }

      this.open ();

    }

    __panelFlick ( data ) {

      if ( !this._isOpen ) return;

      if ( data.direction !== this.options.direction ) return;

      this.close ();

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

      if ( !this._isPinned ) {

        this.$layout.disableScroll ();

      }

      this._frame ( function () {

        this.$panel.addClass ( this.options.classes.show );

        this._frame ( function () {

          this.$panel.addClass ( this.options.classes.open );

          this._trigger ( 'open' );

        });

      });

    }

    close () {

      if ( !this._isOpen ) return;

      this._isOpen = false;

      this._frame ( function () {

        this.unpin ();

        this.$panel.removeClass ( this.options.classes.open );

        this._delay ( function () {

          this.$panel.removeClass ( this.options.classes.show );

          this.$layout.enableScroll ();

          this._trigger ( 'close' );

        }, this.options.animations.close );

      });

    }


    /* PINNING */

    isPinned () {

      return this._isPinned;

    }

    togglePin ( force ) {

      if ( !_.isBoolean ( force ) ) {

        force = !this._isPinned;

      }

      if ( force !== this._isPinned ) {

        this[force ? 'pin' : 'unpin']();

      }

    }

    pin () {

      if ( this._isPinned ) return;

      this._isPinned = true;

      this.$panel.addClass ( this.options.classes.pinned );

      this.$layout.addClass ( this.layoutPinnedClass );

      if ( this._isOpen ) {

        this.$layout.enableScroll ();

      } else {

        this.open ();

      }

    }

    unpin () {

      if ( !this._isOpen || !this._isPinned ) return;

      this._isPinned = false;

      this.$panel.removeClass ( this.options.classes.pinned );

      this.$layout.removeClass ( this.layoutPinnedClass ).disableScroll ();

    }

  }

  /* FACTORY */

  $.factory ( Panel, config, Svelto );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Widgets - Panel
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/animations/animations.js
 * @require core/mouse/mouse.js
 * @require core/widget/widget.js
 * ========================================================================= */

//FIXME: Multiple open panels (read it multiple backdrops) are not well supported
//TODO: Replace flickable support with a smooth moving panel, so operate on drag

(function ( $, _, Svelto, Widgets, Factory, Pointer, Mouse, Animations ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'panel',
    plugin: true,
    selector: '.panel',
    options: {
      direction: 'left',
      type: 'default', // `default`, `slim` (officially supported) or any other implemented type
      pin: false, // If is a valid key of `Breakpoints` it will get auto pinned/unpinned when we are above or below that breakpoint
      flick: {
        open: false,
        close: true,
        treshold: 20 // Amount of pixels close to the window border where the opening flick gesture should be considered intentional
      },
      classes: {
        show: 'show',
        open: 'open',
        pinned: 'pinned',
        flickable: 'flickable', // As a side effect it will gain a `Svelto.Flickable` instance, therefor it will also trigger `flickable:flick` events, that are what we want
        backdrop: {
          show: 'panel-backdrop obscured-show obscured',
          open: 'obscured-open',
          pinned: 'panel-backdrop-pinned'
        },
        layout: {
          show: 'panel-layout'
        }
      },
      datas: {
        type: 'type'
      },
      animations: {
        open: Animations.normal,
        close: Animations.normal,
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

  class Panel extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$panel = this.$element;
      this.panel = this.element;

      this.$backdrop = this.$html;

      this.options.direction = _.getDirections ().find ( direction => this.$panel.hasClass ( direction ) ) || this.options.direction;
      this.options.flick.open = this.options.flick.open || this.$panel.hasClass ( this.options.classes.flickable );

      if ( this.options.pin ) {

        _.merge ( this.options.breakpoints, {
          up: {
            [this.options.pin]: '_autopin',
          },
          down: {
            [this.options.pin]: '_autounpin'
          }
        });

      }

      this._isOpen = this.$panel.hasClass ( this.options.classes.open );
      this._isPinned = this.$panel.hasClass ( this.options.classes.pinned );

      this.options.type = this.$panel.data ( this.options.datas.type ) || this.options.type;

      this.layoutPinnedClass = Widgets.Panel.config.name + '-' + this.options.type + '-' + this.options.classes.pinned + '-' + this.options.direction;

    }

    _events () {

      if ( this._isOpen ) {

        this.___breakpoint ();
        this.___tap ();
        this.___keydown ();
        this.___panelFlick ();
        this.___route ();

      } else {

        this.___layoutFlick ();
        this.___panelFlick ();

      }

    }

    /* TAP */

    ___tap () {

      this._on ( true, this.$html, Pointer.tap, this.__tap );

    }

    __tap ( event ) {

      if ( this._lock || this._isPinned || $(event.target).closest ( this.$panel ).length || !Mouse.hasButton ( event, Mouse.buttons.LEFT ) ) return;

      this.close ();

    }

    /* ESC */

    ___keydown () { //TODO: Listen to `keydown` only within the layout, so maybe just if the layout is hovered or focused (right?)

      this._on ( true, this.$document, 'keydown', this.__keydown );

    }

    __esc () {

      if ( !this._isPinned ) {

        this.close ();

      }

    }

    /* LAYOUT FLICK */

    ___layoutFlick () {

      if ( !this.options.flick.open ) return;

      this.$layout.flickable ();

      this._on ( this.$layout, 'flickable:flick', this.__layoutFlick );

    }

    __layoutFlick ( event, data ) {

      if ( this._isOpen ) return;

      if ( data.direction !== _.getOppositeDirection ( this.options.direction ) ) return;

      let layoutOffset = this.$layout.offset ();

      switch ( this.options.direction ) {

        case 'left':
          if ( data.startXY.X - layoutOffset.left > this.options.flick.treshold ) return;
          break;

        case 'right':
          if ( this.$layout.outerWidth () + layoutOffset.left - data.startXY.X > this.options.flick.treshold ) return;
          break;

        case 'top':
          if ( data.startXY.Y - layoutOffset.top > this.options.flick.treshold ) return;
          break;

        case 'bottom':
          if ( this.$layout.outerHeight () + layoutOffset.top - data.startXY.Y > this.options.flick.treshold ) return;
          break;

      }

      event.preventDefault ();
      event.stopImmediatePropagation ();

      this.open ();

    }

    /* PANEL FLICK */

    ___panelFlick () {

      if ( !this.options.flick.close ) return;

      this.$panel.flickable ();

      this._on ( true, 'flickable:flick', this.__panelFlick );

    }

    __panelFlick ( event, data ) {

      if ( !this._isOpen ) return;

      if ( data.direction !== this.options.direction ) return;

      event.preventDefault ();
      event.stopImmediatePropagation ();

      this.close ();

    }

    /* ROUTE */

    __route () {

      if ( this._isOpen && !$.contains ( this.layout, this.$panel[0] ) ) {

        this.$layout.enableScroll ();

      }

    }

    /* AUTO PINNING */

    _autopin () {

      if ( this._isPinned ) return;

      this._wasAutoOpened = !this._isOpen;

      this.pin ();

    }

    _autounpin () {

      if ( !this._isPinned ) return;

      this[this._wasAutoOpened ? 'close' : 'unpin']();

    }

    /* API */

    isOpen () {

      return this._isOpen;

    }

    toggle ( force = !this._isOpen ) {

      if ( !!force !== this._isOpen ) {

        this[force ? 'open' : 'close']();

      }

    }

    open () {

      if ( this._lock || this._isOpen ) return;

      this._lock = true;
      this._isOpen = true;

      if ( !this._isPinned ) {

        this.$layout.disableScroll ();

      }

      this._frame ( function () {

        this.$panel.addClass ( this.options.classes.show );
        this.$backdrop.addClass ( this.options.classes.backdrop.show );
        this.$layout.addClass ( this.options.classes.layout.show );

        this._frame ( function () {

          this.$panel.addClass ( this.options.classes.open );
          this.$backdrop.addClass ( this.options.classes.backdrop.open );

          this._lock = false;

          this._trigger ( 'open' );

        });

      });

      this._reset ();

      this.___breakpoint ();
      this.___tap ();
      this.___keydown ();
      this.___panelFlick ();
      this.___route ();

    }

    close () {

      if ( this._lock || !this._isOpen ) return;

      this.unpin ( true );

      this._lock = true;
      this._isOpen = false;

      this._frame ( function () {

        this.$panel.removeClass ( this.options.classes.open );
        this.$backdrop.removeClass ( this.options.classes.backdrop.open );

        this._delay ( function () {

          this.$panel.removeClass ( this.options.classes.show );
          this.$backdrop.removeClass ( this.options.classes.backdrop.show );
          this.$layout.removeClass ( this.options.classes.layout.show );

          this.$layout.enableScroll ();

          this._lock = false;

          this._trigger ( 'close' );

        }, this.options.animations.close );

      });

      this._reset ();

      this.___breakpoint ();
      this.___layoutFlick ();

    }

    /* PINNING */

    isPinned () {

      return this._isPinned;

    }

    togglePin ( force = !this._isPinned ) {

      if ( !!force !== this._isPinned ) {

        this[force ? 'pin' : 'unpin']();

      }

    }

    pin () {

      if ( this._isPinned ) return;

      this._isPinned = true;

      this.$panel.addClass ( this.options.classes.pinned );

      this.$layout.addClass ( this.layoutPinnedClass );

      this.$backdrop.addClass ( this.options.classes.backdrop.pinned );

      if ( this._isOpen ) {

        this.$layout.enableScroll ();

      } else {

        this.open ();

      }

    }

    unpin ( _closing ) {

      if ( !this._isOpen || !this._isPinned ) return;

      this._isPinned = false;

      this.$layout.removeClass ( this.layoutPinnedClass ).disableScroll ();

      this.$backdrop.removeClass ( this.options.classes.backdrop.pinned );

      this._delay ( function () {

        this.$panel.removeClass ( this.options.classes.pinned );

      }, _closing ? this.options.animations.close : 0 );

    }

  }

  /* FACTORY */

  Factory.init ( Panel, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Mouse, Svelto.Animations ));

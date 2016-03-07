
/* =========================================================================
 * Svelto - Widgets - Modal
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/animations/animations.js
 * @require core/mouse/mouse.js
 * @require core/widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer, Mouse, Animations ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'modal',
    plugin: true,
    selector: '.modal',
    options: {
      classes: {
        show: 'show',
        open: 'open',
        html: {
          show: 'modal-backdrop obscured-show obscured',
          open: 'obscured-open'
        }
      },
      animations: {
        open: Animations.normal,
        close: Animations.normal
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

  /* MODAL */

  class Modal extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.modal = this.element;
      this.$modal = this.$element;

      this._isOpen = this.$modal.hasClass ( this.options.classes.open );

    }

    _events () {

      if ( this._isOpen ) {

        this.___keydown ();
        this.___tap ();
        this.___route ();

      }

    }

    /* TAP */

    ___tap () {

      this._on ( true, this.$html, Pointer.tap, this.__tap );

    }

    __tap ( event ) {

      if ( this._lock || $(event.target).closest ( this.$modal ).length || !Mouse.hasButton ( event, Mouse.buttons.LEFT ) ) return;

      this.close ();

    }

    /* ROUTE */

    __route () {

      if ( this._isOpen && !$.contains ( this.layout, this.$modal[0] ) ) {

        this.close ();

      }

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

      this.$layout.disableScroll ();

      this._frame ( function () {

        this.$modal.addClass ( this.options.classes.show );
        this.$html.addClass ( this.options.classes.html.show );

        this._frame ( function () {

          this.$modal.addClass ( this.options.classes.open );
          this.$html.addClass ( this.options.classes.html.open );

          this._lock = false;

          this._trigger ( 'open' );

        });

      });

      this.___keydown ();
      this.___tap ();
      this.___route ();

    }

    close () {

      if ( this.lock || !this._isOpen ) return;

      this._lock = true;
      this._isOpen = false;

      this._frame ( function () {

        this.$modal.removeClass ( this.options.classes.open );
        this.$html.removeClass ( this.options.classes.html.open );

        this._delay ( function () {

          this.$modal.removeClass ( this.options.classes.show );
          this.$html.removeClass ( this.options.classes.html.show );

          this.$layout.enableScroll ();

          this._lock = false;

          this._trigger ( 'close' );

        }, this.options.animations.close );

      });

      this._reset ();

    }

  }

  /* FACTORY */

  Factory.init ( Modal, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Mouse, Svelto.Animations ));

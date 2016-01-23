
/* =========================================================================
 * Svelto - Modal
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * @requires ../animations/animations.js
 * ========================================================================= */

//INFO: Since we are using a pseudo element as the background, in order to simplify the markup, only `.card` and `.card`-like elements can be effectively `.modal`

(function ( $, _, Svelto, Widgets, Factory, Pointer, Animations ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'modal',
    plugin: true,
    selector: '.modal',
    options: {
      classes: {
        show: 'show',
        open: 'open'
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

      this._on ( true, Pointer.tap, this.__tap );

    }

    __tap ( event ) {

      if ( event.target === this.modal ) {

        this.close ();

      }

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

      if ( this._isOpen ) return;

      this._isOpen = true;

      this.$layout.disableScroll ();

      this._frame ( function () {

        this.$modal.addClass ( this.options.classes.show );

        this._frame ( function () {

          this.$modal.addClass ( this.options.classes.open );

          this.___keydown ();
          this.___tap ();
          this.___route ();

          this._trigger ( 'open' );

        });

      });

    }

    close () {

      if ( !this._isOpen ) return;

      this._isOpen = false;

      this._reset ();

      this._frame ( function () {

        this.$modal.removeClass ( this.options.classes.open );

        this._delay ( function () {

          this.$modal.removeClass ( this.options.classes.show );

          this.$layout.enableScroll ();

          this._trigger ( 'close' );

        }, this.options.animations.close );

      });

    }

  }

  /* FACTORY */

  Factory.init ( Modal, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Animations ));

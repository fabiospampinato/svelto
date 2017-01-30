
/* =========================================================================
 * Svelto - Widgets - Modal
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/animations/animations.js
 * @require widgets/autofocusable/autofocusable.js
 * ========================================================================= */

//FIXME: Multiple open modals (read it: multiple backdrops) are not well supported

(function ( $, _, Svelto, Widgets, Factory, Pointer, Animations ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'modal',
    plugin: true,
    selector: '.modal',
    options: {
      scroll: {
        disable: true // Disable scroll when the modal is open
      },
      classes: {
        show: 'show',
        open: 'open',
        backdrop: {
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
        beforeopen: _.noop,
        open: _.noop,
        beforeclose: _.noop,
        close: _.noop
      }
    }
  };

  /* MODAL */

  class Modal extends Widgets.Autofocusable {

    /* SPECIAL */

    _variables () {

      this.$modal = this.$element;
      this.modal = this.element;

      this.$backdrop = this.$html;

      this._isOpen = this.$modal.hasClass ( this.options.classes.open );

    }

    _events () {

      if ( this._isOpen ) {

        this.___keydown ();
        this.___tap ();
        this.___route ();

      }

    }

    _destroy () {

      this.close ();

    }

    /* TAP */

    ___tap () {

      this._on ( true, this.$html, Pointer.tap, this.__tap );

    }

    __tap ( event ) {

      if ( this._lock || !$(event.target).isAttached () || $(event.target).closest ( this.$modal ).length ) return;

      this.close ();

    }

    /* ROUTE */

    __route () {

      if ( this._isOpen && !this.$modal.isAttached () ) {

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

      this._trigger ( 'beforeopen' );

      if ( this.options.scroll.disable ) this.$layout.disableScroll ();

      this._frame ( function () {

        this.$modal.addClass ( this.options.classes.show );
        this.$backdrop.addClass ( this.options.classes.backdrop.show );

        this._frame ( function () {

          this.$modal.addClass ( this.options.classes.open );
          this.$backdrop.addClass ( this.options.classes.backdrop.open );

          this.autofocus ();

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

      this._trigger ( 'beforeclose' );

      this._frame ( function () {

        this.$modal.removeClass ( this.options.classes.open );
        this.$backdrop.removeClass ( this.options.classes.backdrop.open );

        this._delay ( function () {

          this.$modal.removeClass ( this.options.classes.show );
          this.$backdrop.removeClass ( this.options.classes.backdrop.show );

          this.autoblur ();

          if ( this.options.scroll.disable ) this.$layout.enableScroll ();

          this._lock = false;

          this._trigger ( 'close' );

        }, this.options.animations.close );

      });

      this._reset ();

    }

  }

  /* FACTORY */

  Factory.init ( Modal, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Animations ));


/* =========================================================================
 * Svelto - Overlay
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'overlay',
    plugin: true,
    selector: '.overlay',
    options: {
      classes: {
        show: 'show',
        open: 'open'
      },
      animations: {
        open: Svelto.animation.fast,
        close: Svelto.animation.fast
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

  /* OVERLAY */

  class Overlay extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$overlay = this.$element;

      this._isOpen = this.$overlay.hasClass ( this.options.classes.open );

    }

    _events () {

      /* KEYDOWN */

      this._onHover ( [$document, 'keydown', this.__keydown] );

    }

    /* API */

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

        this._frame ( function () {

          this.$overlay.addClass ( this.options.classes.show );

          this._frame ( function () {

            this.$overlay.addClass ( this.options.classes.open );

            this._trigger ( 'open' );

          });

        });

      }

    }

    close () {

      if ( this._isOpen ) {

        this._isOpen = false;

        this._frame ( function () {

          this.$overlay.removeClass ( this.options.classes.open );

          this._delay ( function () {

            this.$overlay.removeClass ( this.options.classes.show );

            this._trigger ( 'close' );

          }, this.options.animations.close );

        });

      }

    }

  }

  /* FACTORY */

  Factory.init ( Overlay, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

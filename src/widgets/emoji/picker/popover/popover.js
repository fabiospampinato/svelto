
/* =========================================================================
 * Svelto - Widgets - Emoji - Picker - Popover
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../picker.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, EmojiData ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'emojipickerPopover',
    templates: {
      base: '<div>'
    },
    options: {
      classes: {
        popover: 'popover'
      }
    }
  };

  /* EMOJIPICKER POPOVER */

  class EmojipickerPopover extends Widgets.Widget {

    /* CLOSE */

    ___close () {

      this._on ( true, 'popover:close', this.__close );

    }

    __close () {

      this.$element.detach ();

      this._reset ();

    }

    /* UTILITIES */

    _isEmpty () {

      return this.$element.is ( ':empty' );

    }

    /* API */

    open ( anchor ) {

      if ( this.isLocked () ) {

        if ( !this._isEmpty () ) {

          this.unlock ();

        } else {

          return this.open ( anchor );

        }

      } else {

        if ( this._isEmpty () ) {

          this.lock ();

          EmojiData.get ().then ( data => {

            Widgets.Emojipicker.config.options.data = data;

            this.$element = new Widgets.Emojipicker ().$element.addClass ( this.options.classes.popover );

            this.open ( anchor );

          });

          return;

        }

      }

      if ( !this.$element.isAttached () ) {

        this.$layout.append ( this.$element );

      }

      this.$element.popover ( 'open', anchor );

      this.___close ();

    }

  }

  /* FACTORY */

  Factory.make ( EmojipickerPopover, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.EmojiData ));

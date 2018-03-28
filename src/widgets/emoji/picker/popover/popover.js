
// @require ../picker.js

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
      },
      callbacks: {
        beforeopen: _.noop,
        open: _.noop,
        beforeclose: _.noop,
        close: _.noop
      }
    }
  };

  /* EMOJIPICKER POPOVER */

  class EmojipickerPopover extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this._initiated = false;

    }

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

    toggle ( anchor ) {

      if ( this.isLocked () ) {

        if ( !this._isEmpty () ) {

          this.unlock ();

        } else {

          return this.open ( anchor ); //FIXME: What is this for??? (it actually gets called, if an error gets thrown the first time)

        }

      } else {

        if ( this._isEmpty () ) {

          this.lock ();

          EmojiData.get ().then ( data => {

            Widgets.Emojipicker.config.options.data = data;

            this.$element = $.widget.new ( Widgets.Emojipicker ).$element.addClass ( this.options.classes.popover );

            this.toggle ( anchor );

          });

          return;

        }

      }

      if ( !this.$element.isAttached () ) {

        this.$layout.append ( this.$element );

      }

      if ( !this._initiated ) {

        this.$element.popover ({
          callbacks: {
            beforeopen: () => this._trigger ( 'beforeopen' ),
            open: () => this._trigger ( 'open' ),
            beforeclose: () => this._trigger ( 'beforeclose' ),
            close: () => this._trigger ( 'close' )
          }
        });

        this._initiated = true;

      }

      this.$element.popover ( 'toggle', undefined, anchor );

      this.___close ();

    }

  }

  /* FACTORY */

  Factory.make ( EmojipickerPopover, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.EmojiData ));

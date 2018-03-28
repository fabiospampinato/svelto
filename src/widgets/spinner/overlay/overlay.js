
// @require core/colors/colors.js
// @require widgets/overlay/overlay.js

(function ( $, _, Svelto, Widgets, Factory, Colors ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'spinnerOverlay',
    plugin: true,
    templates: {
      overlay: '<div class="overlay spinner-overlay <%= o.dimmer ? "dimmer" : "" %>">' +
                 '<% if ( o.labeled ) { %>' +
                   '<div class="spinner-label <%= o.colors.labeled %>">' +
                 '<% } %>' +
                   '<svg class="spinner <%= ( o.multicolor ? "multicolor" : ( o.labeled ? "" : o.unlabeled ) ) %>">' +
                     '<circle cx="1.625em" cy="1.625em" r="1.25em">' +
                   '</svg>' +
                 '<% if ( o.labeled ) { %>' +
                   '</div>' +
                 '<% } %>' +
               '</div>'
    },
    options: {
      labeled: true,
      dimmer: true,
      multicolor: false,
      colors: {
        labeled: Colors.white,
        unlabeled: Colors.secondary
      },
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    }
  };

  /* SPINNER OVERLAY */

  class SpinnerOverlay extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$overlayed = this.$element;
      this.$overlay = $(this._template ( 'overlay', this.options ));

      this.instance = this.$overlay.overlay ( 'instance' );

    }

    /* API */

    isOpen () {

      return this.instance.isOpen ();

    }

    toggle ( force = !this.isOpen () ) {

      if ( !!force !== this.isOpen () ) {

        this[force ? 'open' : 'close']();

      }

    }

    open () {

      if ( this.isLocked () || this.isOpen () ) return;

      this.$overlay.prependTo ( this.$overlayed );

      this.instance.open ();

      this._trigger ( 'open' );

    }

    close () {

      if ( this.isLocked () || !this.isOpen () ) return;

      this.lock ();

      this.instance.close ();

      this._delay ( function () {

        this.$overlay.detach ();

        this.unlock ();

        this._trigger ( 'close' );

      }, Widgets.Overlay.config.options.animations.close );

    }

  }

  /* FACTORY */

  Factory.make ( SpinnerOverlay, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Colors ));


/* =========================================================================
 * Svelto - Spinner Overlay
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../overlay/overlay.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'spinnerOverlay',
    plugin: true,
    templates: {
      overlay: '<div class="overlay spinner-overlay {%=(o.dimmer ? "dimmer" : "")%} {%=(o.blurrer ? "blurrer" : "")%}">' +
                 '{% if ( o.labeled ) { %}' +
                   '<div class="spinner-label {%=(o.multicolor ? "" : o.colors.labeled)%}">' +
                 '{% } %}' +
                   '<svg class="spinner {%=(o.multicolor ? "multicolor" : ( o.labeled ? "" : o.colors.unlabeled ))%}">' +
                     '<circle cx="1.625em" cy="1.625em" r="1.25em">' +
                   '</svg>' +
                 '{% if ( o.labeled ) { %}' +
                   '</div>' +
                 '{% } %}' +
               '</div>'
    },
    options: {
      labeled: true,
      dimmer: false,
      blurrer: false,
      multicolor: false,
      colors: {
        labeled: 'white',
        unlabeled: 'secondary'
      },
      callbacks: {
        open () {},
        close () {}
      }
    }
  };

  /* SPINNER OVERLAY */

  class SpinnerOverlay extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$overlayed = this.$element;
      this.$overlay = $(this._tmpl ( 'overlay', this.options ));

      this.instance = this.$overlay.overlay ( 'instance' );

    }

    /* API */

    isOpen () {

      return this.instance.isOpen ();

    }

    toggle ( force ) {

      if ( !_.isBoolean ( force ) ) {

        force = !this.isOpen ();

      }

      if ( force !== this.isOpen () ) {

        this[force ? 'open' : 'close']();

      }

    }

    open () {

      if ( !this.isOpen () ) {

        this.$overlay.prependTo ( this.$overlayed );

        this.instance.open ();

        this._trigger ( 'open' );

      }

    }

    close () {

      if ( this.isOpen () ) {

        this.instance.close ();

        this._delay ( function () {

          this.$overlay.detach ();

          this._trigger ( 'close' );

        }, Svelto.Overlay.config.options.animations.close );

      }

    }

  }

  /* FACTORY */

  $.factory ( SpinnerOverlay, config, Svelto );

}( Svelto.$, Svelto._, window, document ));

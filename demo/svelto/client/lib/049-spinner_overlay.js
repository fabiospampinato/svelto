
/* =========================================================================
 * Svelto - Spinner Overlay
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../overlay/overlay.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

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
                   '<svg class="spinner {%=(o.multicolor ? "multicolor" : ( o.labeled ? "" : o.unlabeled ))%}">' +
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
      this.$overlay = $(this._tmpl ( 'overlay', this.options ));

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

      if ( this._lock || this.isOpen () ) return;

      this.$overlay.prependTo ( this.$overlayed );

      this.instance.open ();

      this._trigger ( 'open' );

    }

    close () {

      if ( this._lock || !this.isOpen () ) return;

      this._lock = true;

      this.instance.close ();

      this._delay ( function () {

        this.$overlay.detach ();

        this._lock = false;

        this._trigger ( 'close' );

      }, Widgets.Overlay.config.options.animations.close );

    }

  }

  /* FACTORY */

  Factory.init ( SpinnerOverlay, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

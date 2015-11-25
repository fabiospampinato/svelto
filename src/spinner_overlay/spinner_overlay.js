
/* =========================================================================
 * Svelto - Spinner Overlay
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'spinnerOverlay',
    templates: {
      overlay: '<div class="overlay spinner-overlay {%=(o.dimmer ? "dimmer" : "")%} {%=(o.blurrer ? "blurrer" : "")%}">' +
                 '{% if ( o.labeled ) { %}' +
                   '<div class="spinner-label {%=(o.multicolor ? "" : o.colors.labeled)%}">' +
                 '{% } %}' +
                   '<svg class="spinner {%=(o.multicolor ? "multicolor" : ( o.labeled ? "" : o.colors.unlabeled ))%}">' +
                     '<circle cx="1.625em" cy="1.625em" r="1.25em" />' +
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
        //TODO: Add callbacks, mimic those from $.svelto.overlay
      }
    }
  };

  /* SPINNER OVERLAY */

  class SpinnerOverlay extends Svelto.Widget {

    /* SPECIAL */

    _widgetize ( $root ) {

      $root.find ( '.spinner-overlay' ).spinnerOverlay ();
      $root.filter ( '.spinner-overlay' ).spinnerOverlay ();

    }

    _variables () {

      this.$overlayed = this.$element;
      this.$overlay = $(this._tmpl ( 'overlay', this.options )).prependTo ( this.$overlayed );

      this.overlay = this.$overlay.overlay ( 'instance' );

    }

    /* API */

    isOpen () {

      return this.overlay.isOpen ();

    }

    toggle ( force ) {

      this.overlay.toggle ( force );

    }

    open () {

      this.overlay.open ();

    }

    close () {

      this.overlay.close ();

    }

  }

  /* BINDING */

  Svelto.SpinnerOverlay = SpinnerOverlay;
  Svelto.SpinnerOverlay.config = config;

  /* FACTORY */

  $.factory ( Svelto.SpinnerOverlay );

}( Svelto.$, Svelto._, window, document ));

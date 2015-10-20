
/* =========================================================================
 * Svelto - Spinner Overlay
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'spinnerOverlay',
    templates: {
      overlay: '<div class="overlay spinner-overlay {%=(o.dimmer ? "dimmer" : "")%} {%=(o.blurrer ? "blurrer" : "")%}">' +
                 '<div class="spinner-label {%=(o.multicolor ? "" : o.color)%}">' +
                   '<svg class="spinner {%=(o.multicolor ? "multicolor" : "")%}">' +
                     '<circle />' +
                   '</svg>' +
                 '</div>' +
               '</div>'
    },
    options: {
      dimmer: false,
      blurrer: false,
      multicolor: false,
      color: 'white',
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

}( jQuery, _, window, document ));

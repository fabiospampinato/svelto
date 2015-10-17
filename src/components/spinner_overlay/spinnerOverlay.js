
/* =========================================================================
 * Svelto - Spinner Overlay v0.4.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* SPINNER OVERLAY */

  $.factory ( 'svelto.spinnerOverlay', {

    /* TEMPLATES */

    templates: {
      overlay: '<div class="overlay spinner-overlay {%=(o.dimmer ? "dimmer" : "")%} {%=(o.blurrer ? "blurrer" : "")%}">' +
                 '<div class="spinner-label {%=(o.multicolor ? "" : o.color)%}">' +
                   '<svg class="spinner {%=(o.multicolor ? "multicolor" : "")%}">' +
                     '<circle />' +
                   '</svg>' +
                 '</div>' +
               '</div>'
    },

    /* OPTIONS */

    options: {
      dimmer: false,
      blurrer: false,
      multicolor: false,
      color: 'white',
      callbacks: {
        //TODO: Add callbacks, mimic those from $.svelto.overlay
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$overlayed = this.$element;
      this.$overlay = $(this._tmpl ( 'overlay', this.options )).prependTo ( this.$overlayed );

      this.overlay = this.$overlay.overlay ( 'instance' );

    },

    /* API */

    isOpen: function () {

      return this.overlay.isOpen ();

    },

    toggle: function ( force ) {

      this.overlay.toggle ( force );

    },

    open: function () {

      this.overlay.open ();

    },

    close: function () {

      this.overlay.close ();

    }

  });

}( jQuery, _, window, document ));

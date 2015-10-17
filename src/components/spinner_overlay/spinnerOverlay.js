
/* =========================================================================
 * Svelto - Spinner Overlay v0.3.0
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
      classes: {
        active: 'active'
      },
      callbacks: {
        show: _.noop,
        hide: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$overlayed = this.$element;
      this.$overlay = $(this._tmpl ( 'overlay', this.options ));

    },

    _init: function () {

      this.$overlayed.prepend ( this.$overlay );

    },

    /* API */

    isActive: function () {

      return this.$overlay.hasClass ( this.options.classes.active );

    },

    toggle: function ( force ) {

      if ( !_.isBoolean ( force ) ) {

        force = !this.isActive ();

      }

      this._frame ( function () {

        this.$overlay.toggleClass ( this.options.classes.active, force );

      });

    },

    show: function () {

      this.toggle ( true );

    },

    hide: function () {

      this.toggle ( false );

    }

  });

}( jQuery, _, window, document ));

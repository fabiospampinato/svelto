
/* =========================================================================
 * Svelto - Spinner Overlay v0.2.0
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
      overlay: '<div class="spinner-overlay {%=o.colors.overlay%}">' +
                 '<svg class="spinner {%=(o.multicolor ? "multicolor" : o.colors.spinner)%}">' +
                   '<circle />' +
                 '</svg>' +
               '</div>'
    },

    /* OPTIONS */

    options: {
      multicolor: false,
      colors: {
        overlay: 'inherit',
        spinner: 'secondary'
      },
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

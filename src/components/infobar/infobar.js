
/* =========================================================================
 * Svelto - Infobar
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Maybe add the ability to open it

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* INFOBAR */

  $.factory ( 'svelto.infobar', {

    /* OPTIONS */

    options: {
      selectors: {
        closer: '.infobar-closer'
      },
      callbacks: {
        close: _.noop
      }
    },

    /* SPECIAL */

    _widgetize ( $root ) {

      $root.find ( '.infobar' ).infobar ();

    },

    _variables () {

      this.$infobar = this.$element;
      this.$closers = this.$infobar.find ( this.options.selectors.closer );

    },

    _events () {

      /* CLOSER */

      this._on ( this.$closers, Pointer.tap, this.close );

    },

    /* PUBLIC */

    close () {

      this.$infobar.remove ();

      this._trigger ( 'close' );

    }

  });

}( jQuery, _, window, document ));


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

  /* CONFIG */

  let config = {
    name: 'infobar',
    options: {
      selectors: {
        closer: '.infobar-closer'
      },
      callbacks: {
        close () {}
      }
    }
  };

  /* INFOBAR */

  class Infobar extends Svelto.Widget {

    /* SPECIAL */

    _widgetize ( $root ) {

      $root.find ( '.infobar' ).infobar ();
      $root.filter ( '.infobar' ).infobar ();

    }

    _variables () {

      this.$infobar = this.$element;
      this.$closers = this.$infobar.find ( this.options.selectors.closer );

    }

    _events () {

      /* CLOSER */

      this._on ( this.$closers, Pointer.tap, this.close );

    }

    /* API */

    close () {

      this.$infobar.remove ();

      this._trigger ( 'close' );

    }

  }

  /* BINDING */

  Svelto.Infobar = Infobar;
  Svelto.Infobar.config = config;

  /* FACTORY */

  $.factory ( Svelto.Infobar );

}( jQuery, _, window, document ));

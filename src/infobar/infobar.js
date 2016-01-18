
/* =========================================================================
 * Svelto - Infobar
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

//TODO: Maybe add the ability to open it

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'infobar',
    plugin: true,
    selector: '.infobar',
    options: {
      callbacks: {
        close: _.noop
      }
    }
  };

  /* INFOBAR */

  class Infobar extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$infobar = this.$element;

    }

    /* API */

    close () {

      //INFO: Maybe just detach it, so that we can open it again

      this.$infobar.remove ();

      this._trigger ( 'close' );

    }

  }

  /* FACTORY */

  Factory.init ( Infobar, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

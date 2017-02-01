
/* =========================================================================
 * Svelto - Widgets - Autofocusable
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * @require lib/autofocus/autofocus.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Autofocus ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'autofocusable'
  };

  /* AUTOFOCUSABLE */

  class Autofocusable extends Widgets.Widget {

    /* API */

    autofocus ( $ele = this.$element ) {

      Autofocus.focus ( $ele );

    }

    autoblur ( $ele = this.$element ) {

      Autofocus.blur ( $ele );

    }

  }

  /* FACTORY */

  Factory.make ( Autofocusable, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Autofocus ));

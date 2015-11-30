
/* =========================================================================
 * Svelto - Toggler
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
    name: 'toggler',
    selector: undefined,
    options: {
      widget: false,
      datas: {
        target: 'target'
      }
    }
  };

  /* TOGGLER */

  class Toggler extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$toggler = this.$element;

      this.targetSelector = this.$toggler.data ( this.options.datas.target );

      this.$target = $(this.targetSelector);

      this.instance = this.$target[this.options.widget.config.name]( 'instance' );

    }

    _events () {

      /* TAP */

      this._on ( Pointer.tap, this.toggle );

    }

    /* PUBLIC */

    toggle ( force ) {

      return this.instance.toggle ( force );

    }

  }

  /* BINDING */

  Svelto.Toggler = Toggler;
  Svelto.Toggler.config = config;

  /* FACTORY */

  $.factory ( Svelto.Toggler );

}( Svelto.$, Svelto._, window, document ));

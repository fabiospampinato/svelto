
/* =========================================================================
 * Svelto - Widgets - Checkbox
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'checkbox',
    plugin: true,
    selector: '.checkbox',
    options: {
      selectors: {
        input: 'input[type="checkbox"]'
      }
    }
  };

  /* CHECKBOX */

  class Checkbox extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$checkbox = this.$element;

      this.$input = this.$checkbox.find ( this.options.selectors.input );
      this.input = this.$input[0];

      this.inputId = this.$input.attr ( 'id' );

    }

    _events () {

      this.___tap ();

    }

    /* TAP */

    ___tap () {

      this._on ( true, Pointer.tap, this.__tap );

    }

    __tap ( event ) {

      if ( event.target === this.input || $(event.target).is ( `label[for="${this.inputId}"]` ) ) return;

      this.$input.prop ( 'checked', !this.$input.prop ( 'checked' ) ).trigger ( 'change' );

    }

  }

  /* FACTORY */

  Factory.make ( Checkbox, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));

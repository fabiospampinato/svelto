
/* =========================================================================
 * Svelto - Widgets - Radio
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require widgets/checkbox/checkbox.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'radio',
    plugin: true,
    selector: '.radio',
    options: {
      selectors: {
        input: 'input[type="radio"]'
      }
    }
  };

  /* RADIO */

  class Radio extends Widgets.Checkbox {

    /* TAP */

    __tap ( event ) {

      if ( event.target === this.input || $(event.target).is ( `label[for="${this.inputId}"]` ) ) return;

      if ( this.$input.prop ( 'checked' ) ) return;

      this.$input.prop ( 'checked', true ).trigger ( 'change' );

    }

  }

  /* FACTORY */

  Factory.make ( Radio, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

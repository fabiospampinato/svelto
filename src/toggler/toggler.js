
/* =========================================================================
 * Svelto - Toggler
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'toggler',
    options: {
      methods: {
        toggle: 'toggle'
      }
    }
  };

  /* TOGGLER */

  class Toggler extends Widgets.Opener {

    /* TAP */

    __tap ( event ) {

      this._targetInstance[this.options.methods.toggle]( undefined, this.element, event );

    }

    /* PUBLIC */

    toggle ( force ) {

      return this._targetInstance[this.options.methods.toggle]( force, this.element );

    }

  }

  /* FACTORY */

  Factory.init ( Toggler, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

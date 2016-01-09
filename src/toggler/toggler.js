
/* =========================================================================
 * Svelto - Toggler
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

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

  class Toggler extends Svelto.Opener {

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

  $.factory ( Toggler, config, Svelto );

}( Svelto.$, Svelto._, window, document ));

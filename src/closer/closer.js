
/* =========================================================================
 * Svelto - Closer
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * @requires ../targeter/targeter.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'closer',
    selector: undefined,
    options: {
      methods: {
        isOpen: 'isOpen',
        close: 'close'
      }
    }
  };

  /* CLOSER */

  class Closer extends Svelto.Targeter {

    /* SPECIAL */

    _events () {

      /* TAP */

      this._on ( Pointer.tap, this.__tap );

    }

    /* TAP */

    __tap () {

      this.close ();

    }

    /* PUBLIC */

    isOpen () {

      return this._targetInstance[this.options.methods.isOpen]();

    }

    close () {

      return this._targetInstance[this.options.methods.close]( this.element );

    }

  }

  /* BINDING */

  Svelto.Closer = Closer;
  Svelto.Closer.config = config;

}( Svelto.$, Svelto._, window, document ));

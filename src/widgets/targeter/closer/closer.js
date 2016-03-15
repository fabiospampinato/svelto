
/* =========================================================================
 * Svelto - Widgets - Targeter - Closer
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../targeter.js
 * @require core/mouse/mouse.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer, Mouse ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'closer',
    options: {
      methods: {
        isOpen: 'isOpen',
        close: 'close'
      }
    }
  };

  /* CLOSER */

  class Closer extends Widgets.Targeter {

    /* SPECIAL */

    _events () {

      this.___targetRemove ();
      this.___tap ();

    }

    /* TAP */

    ___tap () {

      this._on ( Pointer.tap, this.__tap );

    }

    __tap ( event ) {

      this.close ( event );

    }

    /* API */

    isOpen () {

      return this._targetInstance[this.options.methods.isOpen]();

    }

    close ( event ) {

      return this._targetInstance[this.options.methods.close]( this.element, event );

    }

  }

  /* FACTORY */

  Factory.init ( Closer, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Mouse ));


// @require ../targeter.js

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

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

      super._events ();

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

      this._targetInstance.whenUnlocked ( () => this._targetInstance[this.options.methods.close]( this.element, event ) );

    }

  }

  /* FACTORY */

  Factory.make ( Closer, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));

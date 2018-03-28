
// @require ../opener/opener.js

(function ( $, _, Svelto, Widgets, Factory ) {

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

      this.toggle ( undefined, event );

    }

    /* API */

    toggle ( force, event ) {

      return this._targetInstance[this.options.methods.toggle]( force, this.element, event );

    }

  }

  /* FACTORY */

  Factory.make ( Toggler, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

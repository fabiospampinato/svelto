
/* =========================================================================
 * Svelto - Widgets - Targeter - Toggler
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../opener/opener.js
 * @require core/mouse/mouse.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Mouse ) {

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

      if ( !Mouse.hasButton ( event, Mouse.buttons.LEFT ) ) return;

      this.toggle ( undefined, event );

    }

    /* API */

    toggle ( force, event ) {

      return this._targetInstance[this.options.methods.toggle]( force, this.element, event );

    }

  }

  /* FACTORY */

  Factory.init ( Toggler, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Mouse ));

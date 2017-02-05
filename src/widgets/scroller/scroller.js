
/* =========================================================================
 * Svelto - Widgets - Scroller
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/animations/animations.js
 * @require core/pointer/pointer.js
 * @require widgets/targeter/opener/opener.js
 * ========================================================================= */

//TODO: Test with nested layouts
//TODO: Make it work with nested scrollable elements
// It only scrolls properly when the elements are not nested inside scrollable wrappers

(function ( $, _, Svelto, Widgets, Factory, Pointer, Animations ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'scroller',
    plugin: true,
    selector: '.scroller',
    options: {
      animations: {
        scroll: Animations.fast
      },
      callbacks: {
        scroll: _.noop
      }
    }
  };

  /* SCROLLER */

  class Scroller extends Widgets.Targeter {

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

      this.scroll ();

    }

    /* API */

    scroll () {

      let scrollTop = this.layout.scrollTop + $.getRect ( this.target ).top;

      this.$layout.animate ( { scrollTop }, this.options.animations.scroll );

      this._trigger ( 'scroll' );

    }

  }

  /* FACTORY */

  Factory.make ( Scroller, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Animations ));

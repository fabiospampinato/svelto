
// @priority 400
// @require core/widget/widget.js
// @require lib/autofocus/autofocus.js

(function ( $, _, Svelto, Widgets, Factory, Autofocus ) {

  /* CONFIG */

  let config = {
    name: 'autofocusable'
  };

  /* AUTOFOCUSABLE */

  class Autofocusable extends Widgets.Widget {

    /* API */

    autofocus () {

      Autofocus.focus ( this.$element );

    }

    autoblur () {

      Autofocus.blur ( this.$element );

    }

  }

  /* FACTORY */

  Factory.make ( Autofocusable, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Autofocus ));

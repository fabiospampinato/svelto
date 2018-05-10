
// @require core/widget/widget.js

(function ( $, _, Svelto, Factory ) {

  /* CONFIG */

  let config = {
    name: 'infobar',
    plugin: true,
    selector: '.infobar',
    options: {
      callbacks: {
        close: _.noop
      }
    }
  };

  /* INFOBAR */

  class Infobar extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$infobar = this.$element;

    }

    /* API */

    close () {

      this.$infobar.detach ();

      this._trigger ( 'close' );

    }

  }

  /* FACTORY */

  Factory.make ( Infobar, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Factory ));

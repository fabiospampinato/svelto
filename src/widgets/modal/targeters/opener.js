
// @require ../modal.js
// @require widgets/targeter/opener/opener.js

(function ( $, _, Svelto, Widgets, Factory ) {

  /* CONFIG */

  let config = {
    name: 'modalOpener',
    plugin: true,
    selector: '.modal-opener',
    options: {
      widget: Widgets.Modal
    }
  };

  /* MODAL OPENER */

  class ModalOpener extends Widgets.Opener {}

  /* FACTORY */

  Factory.make ( ModalOpener, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

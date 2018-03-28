
// @require ../modal.js
// @require widgets/targeter/closer/closer.js

(function ( $, _, Svelto, Widgets, Factory ) {

  /* CONFIG */

  let config = {
    name: 'modalCloser',
    plugin: true,
    selector: '.modal-closer',
    options: {
      widget: Widgets.Modal
    }
  };

  /* MODAL CLOSER */

  class ModalCloser extends Widgets.Closer {}

  /* FACTORY */

  Factory.make ( ModalCloser, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

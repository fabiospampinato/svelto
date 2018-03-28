
// @require ../panel.js
// @require widgets/targeter/toggler/toggler.js

(function ( $, _, Svelto, Widgets, Factory ) {

  /* CONFIG */

  let config = {
    name: 'panelToggler',
    plugin: true,
    selector: '.panel-toggler',
    options: {
      widget: Widgets.Panel
    }
  };

  /* PANEL TOGGLER */

  class PanelToggler extends Widgets.Toggler {}

  /* FACTORY */

  Factory.make ( PanelToggler, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

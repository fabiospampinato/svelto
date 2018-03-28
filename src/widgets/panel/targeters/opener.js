
// @require ../panel.js
// @require widgets/targeter/opener/opener.js

(function ( $, _, Svelto, Widgets, Factory ) {

  /* CONFIG */

  let config = {
    name: 'panelOpener',
    plugin: true,
    selector: '.panel-opener',
    options: {
      widget: Widgets.Panel
    }
  };

  /* PANEL OPENER */

  class PanelOpener extends Widgets.Opener {}

  /* FACTORY */

  Factory.make ( PanelOpener, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

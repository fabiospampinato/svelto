
// @require ../expander.js
// @require widgets/targeter/opener/opener.js

(function ( $, _, Svelto, Widgets, Factory ) {

  /* CONFIG */

  let config = {
    name: 'expanderOpener',
    plugin: true,
    selector: '.expander-opener',
    options: {
      widget: Widgets.Expander
    }
  };

  /* EXPANDER OPENER */

  class ExpanderOpener extends Widgets.Opener {}

  /* FACTORY */

  Factory.make ( ExpanderOpener, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

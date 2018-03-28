
// @require ../infobar.js
// @require widgets/targeter/closer/closer.js

(function ( $, _, Svelto, Widgets, Factory ) {

  /* CONFIG */

  let config = {
    name: 'infobarCloser',
    plugin: true,
    selector: '.infobar-closer',
    options: {
      widget: Widgets.Infobar
    }
  };

  /* INFOBAR CLOSER */

  class InfobarCloser extends Widgets.Closer {}

  /* FACTORY */

  Factory.make ( InfobarCloser, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

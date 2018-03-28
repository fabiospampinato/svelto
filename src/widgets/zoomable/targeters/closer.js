
// @require ../zoomable.js
// @require widgets/targeter/closer/closer.js

(function ( $, _, Svelto, Widgets, Factory ) {

  /* CONFIG */

  let config = {
    name: 'zoomableCloser',
    plugin: true,
    selector: '.zoomable-closer',
    options: {
      widget: Widgets.Zoomable
    }
  };

  /* ZOOMABLE CLOSER */

  class ZoomableCloser extends Widgets.Closer {}

  /* FACTORY */

  Factory.make ( ZoomableCloser, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

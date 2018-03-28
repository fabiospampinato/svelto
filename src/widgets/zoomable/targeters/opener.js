
// @require ../zoomable.js
// @require widgets/targeter/opener/opener.js

(function ( $, _, Svelto, Widgets, Factory ) {

  /* CONFIG */

  let config = {
    name: 'zoomableOpener',
    plugin: true,
    selector: '.zoomable-opener',
    options: {
      widget: Widgets.Zoomable
    }
  };

  /* ZOOMABLE OPENER */

  class ZoomableOpener extends Widgets.Opener {}

  /* FACTORY */

  Factory.make ( ZoomableOpener, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

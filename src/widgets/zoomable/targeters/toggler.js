
// @require ../zoomable.js
// @require widgets/targeter/toggler/toggler.js

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'zoomableToggler',
    plugin: true,
    selector: '.zoomable-toggler',
    options: {
      widget: Widgets.Zoomable
    }
  };

  /* ZOOMABLE TOGGLER */

  class ZoomableToggler extends Widgets.Toggler {}

  /* FACTORY */

  Factory.make ( ZoomableToggler, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

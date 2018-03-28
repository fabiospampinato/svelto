
// @require ../overlay.js
// @require widgets/targeter/opener/opener.js

(function ( $, _, Svelto, Widgets, Factory ) {

  /* CONFIG */

  let config = {
    name: 'overlayOpener',
    plugin: true,
    selector: '.overlay-opener',
    options: {
      widget: Widgets.Overlay
    }
  };

  /* OVERLAY OPENER */

  class OverlayOpener extends Widgets.Opener {}

  /* FACTORY */

  Factory.make ( OverlayOpener, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

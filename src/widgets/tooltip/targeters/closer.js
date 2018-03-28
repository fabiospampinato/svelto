
// @require ../tooltip.js
// @require widgets/targeter/closer/closer.js

(function ( $, _, Svelto, Widgets, Factory ) {

  /* CONFIG */

  let config = {
    name: 'tooltipCloser',
    plugin: true,
    selector: '.tooltip-closer',
    options: {
      widget: Widgets.Tooltip
    }
  };

  /* TOOLTIP CLOSER */

  class TooltipCloser extends Widgets.Closer {}

  /* FACTORY */

  Factory.make ( TooltipCloser, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

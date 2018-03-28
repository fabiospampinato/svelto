
// @require ../tooltip.js
// @require widgets/targeter/toggler/toggler.js

(function ( $, _, Svelto, Widgets, Factory ) {

  /* CONFIG */

  let config = {
    name: 'tooltipToggler',
    plugin: true,
    selector: '.tooltip-toggler',
    options: {
      widget: Widgets.Tooltip,
      hover: {
        active: true
      }
    }
  };

  /* TOOLTIP TOGGLER */

  class TooltipToggler extends Widgets.Toggler {}

  /* FACTORY */

  Factory.make ( TooltipToggler, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

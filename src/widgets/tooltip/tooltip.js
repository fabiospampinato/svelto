
// @require widgets/popover/popover.js

(function ( $, _, Svelto, Widgets, Factory ) {

  /* CONFIG */

  let config = {
    name: 'tooltip',
    plugin: true,
    selector: '.tooltip'
  };

  /* TOOLTIP */

  class Tooltip extends Widgets.Popover {}

  /* FACTORY */

  Factory.make ( Tooltip, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

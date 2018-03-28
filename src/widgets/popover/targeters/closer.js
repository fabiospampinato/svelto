
// @require ../popover.js
// @require widgets/targeter/closer/closer.js

(function ( $, _, Svelto, Widgets, Factory ) {

  /* CONFIG */

  let config = {
    name: 'popoverCloser',
    plugin: true,
    selector: '.popover-closer',
    options: {
      widget: Widgets.Popover
    }
  };

  /* POPOVER CLOSER */

  class PopoverCloser extends Widgets.Closer {}

  /* FACTORY */

  Factory.make ( PopoverCloser, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

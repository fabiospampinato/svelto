
// @require ../popover.js
// @require widgets/targeter/toggler/toggler.js

(function ( $, _, Svelto, Widgets, Factory ) {

  /* CONFIG */

  let config = {
    name: 'popoverToggler',
    plugin: true,
    selector: '.popover-toggler',
    options: {
      widget: Widgets.Popover
    }
  };

  /* POPOVER TOGGLER */

  class PopoverToggler extends Widgets.Toggler {}

  /* FACTORY */

  Factory.make ( PopoverToggler, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

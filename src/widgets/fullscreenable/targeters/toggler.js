
// @require ../fullscreenable.js
// @require widgets/targeter/toggler/toggler.js

(function ( $, _, Svelto, Widgets, Factory ) {

  /* CONFIG */

  let config = {
    name: 'fullscreenableToggler',
    plugin: true,
    selector: '.fullscreenable-toggler, .fullscreen-toggler',
    options: {
      widget: Widgets.Fullscreenable,
      $fallback: $.$html
    }
  };

  /* FULLSCREENABLE TOGGLER */

  class FullscreenableToggler extends Widgets.Toggler {}

  /* FACTORY */

  Factory.make ( FullscreenableToggler, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

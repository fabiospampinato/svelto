
// @require ./popover.js

(function ( $, _, Svelto, EmojipickerPopover ) {

  /* VARIABLES */

  let instance;

  /* HELPER */

  $.emojipickerPopover = function ( anchor ) {

    if ( !instance ) {

      instance = new EmojipickerPopover ();

    }

    instance.toggle ( anchor );

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.EmojipickerPopover ));


// @require ./popover.js

(function ( $, _, Svelto, RemotePopover ) {

  /* HELPER */

  $.remotePopover = function ( ajax, target ) {

    let positionate = {};

    if ( target instanceof $ ) {

      positionate.$anchor = target;

    } else if ( 'x' in target && 'y' in target ) {

      positionate.point = target;

    }

    new RemotePopover ({ ajax, positionate }).request ();

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.RemotePopover ));


// @require ./panel.js

(function ( $, _, Svelto, RemotePanel ) {

  /* HELPER */

  $.remotePanel = function ( ajax, direction, type ) {

    new RemotePanel ({ ajax, direction, type }).request ();

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.RemotePanel ));

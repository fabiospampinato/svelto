
// @require ./modal.js

(function ( $, _, Svelto, RemoteModal ) {

  /* HELPER */

  $.remoteModal = function ( ajax ) {

    new RemoteModal ({ ajax }).request ();

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.RemoteModal ));

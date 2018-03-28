
// @require ./modal.js

(function ( $, _, Svelto, RemoteModal ) {

  'use strict';

  /* HELPER */

  $.remoteModal = function ( ajax ) {

    new RemoteModal ({ ajax }).request ();

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.RemoteModal ));

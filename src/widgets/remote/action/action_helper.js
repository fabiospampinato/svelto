
// @require ./action.js

(function ( $, _, Svelto, RemoteAction ) {

  'use strict';

  /* HELPER */

  $.remoteAction = function ( ajax ) {

    new RemoteAction ({ ajax }).request ();

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.RemoteAction ));

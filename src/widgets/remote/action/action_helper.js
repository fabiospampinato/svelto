
/* =========================================================================
 * Svelto - Widgets - Remote - Action (Helper)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./action.js
 * ========================================================================= */

(function ( $, _, Svelto, RemoteAction ) {

  'use strict';

  /* HELPER */

  $.remoteAction = function ( ajax ) {

    new RemoteAction ({ ajax }).request ();

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.RemoteAction ));

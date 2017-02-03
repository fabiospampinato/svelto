
/* =========================================================================
 * Svelto - Widgets - Remote - Panel (Helper)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./panel.js
 * ========================================================================= */

(function ( $, _, Svelto, RemotePanel ) {

  'use strict';

  /* HELPER */

  $.remotePanel = function ( ajax, direction, type ) {

    new RemotePanel ({ ajax, direction, type }).request ();

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.RemotePanel ));

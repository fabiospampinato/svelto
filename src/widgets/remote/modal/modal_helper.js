
/* =========================================================================
 * Svelto - Widgets - Remote - Modal (Helper)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./modal.js
 * ========================================================================= */

(function ( $, _, Svelto, RemoteModal ) {

  'use strict';

  /* HELPER */

  $.remoteModal = function ( ajax ) {

    new RemoteModal ( { ajax: ajax } ).request ();

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.RemoteModal ));

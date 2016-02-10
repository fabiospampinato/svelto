
/* =========================================================================
 * Svelto - Remote - Modal (Helper)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require modal.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets ) {

  'use strict';

  /* HELPER */

  $.remoteModal = function ( ajax ) {

    new Widgets.RemoteModal ( { ajax: ajax } ).request ();

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets ));

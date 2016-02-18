
/* =========================================================================
 * Svelto - Widgets - Remote - Action (Helper)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./action.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets ) {

  'use strict';

  /* HELPER */

  $.remoteAction = function ( ajax ) {

    new Widgets.RemoteAction ( { ajax: ajax } ).request ();

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets ));

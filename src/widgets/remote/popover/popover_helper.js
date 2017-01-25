
/* =========================================================================
 * Svelto - Widgets - Remote - Popover (Helper)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./popover.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets ) {

  'use strict';

  /* HELPER */

  $.remotePopover = function ( ajax, target ) {

    let positionate = {};

    if ( target instanceof $ ) {

      positionate.$anchor = target;

    } else if ( 'x' in target && 'y' in target ) {

      positionate.point = target;

    }

    new Widgets.RemotePopover ( { ajax, positionate } ).request ();

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets ));

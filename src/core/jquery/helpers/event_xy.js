
/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Event XY)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( $ ) {

  'use strict';

  /* EVENT XY */

  $.eventXY = function ( event, X = 'pageX', Y = 'pageY' ) {

    if ( 'originalEvent' in event ) {

      return $.eventXY ( event.originalEvent, X, Y );

    } else if ( 'changedTouches' in event && event.changedTouches.length ) {

      return {
        x: event.changedTouches[0][X],
        y: event.changedTouches[0][Y]
      };

    } else if ( 'touches' in event && event.touches.length ) {

      return {
        x: event.touches[0][X],
        y: event.touches[0][Y]
      };

    } else if ( X in event ) {

      return {
        x: event[X],
        y: event[Y]
      };

    }

  };

}( jQuery ));

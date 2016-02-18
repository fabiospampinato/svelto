
/* =========================================================================
 * Svelto - jQuery - Helpers - Event XY
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

(function ( $ ) {

  'use strict';

  /* EVENT XY */

  $.eventXY = function ( event, X = 'pageX', Y = 'pageY' ) {

    if ( 'originalEvent' in event ) {

      return $.eventXY ( event.originalEvent );

    } else if ( 'changedTouches' in event && event.changedTouches.length ) {

      return {
        X: event.changedTouches[0][X],
        Y: event.changedTouches[0][Y]
      };

    } else if ( 'touches' in event && event.touches.length ) {

      return {
        X: event.touches[0][X],
        Y: event.touches[0][Y]
      };

    } else if ( X in event ) {

      return {
        X: event[X],
        Y: event[Y]
      };

    }

  };

}( jQuery ));

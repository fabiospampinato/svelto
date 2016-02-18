
/* =========================================================================
 * Svelto - lodash - Helpers - Direction
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

//TODO: Maybe move to lib

(function ( _ ) {

  'use strict';

  /* DIRECTION */

  _.mixin ({

    getDirections () {

      return ['top', 'bottom', 'left', 'right'];

    },

    getOppositeDirection ( direction ) {

      return {
        'top'   : 'bottom',
        'bottom': 'top',
        'left'  : 'right',
        'right' : 'left'
      }[direction];

    }

  });

}( lodash ));

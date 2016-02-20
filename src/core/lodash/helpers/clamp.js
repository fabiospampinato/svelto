
/* =========================================================================
 * Svelto - Core - lodash - Helpers (Clamp)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

//TODO: Write it better ($.positionate may rely on a buggy behaviour of this function)

(function ( _ ) {

  'use strict';

  /* CLAMP */

  _.mixin ({

    clamp ( value, minimum, maximum ) {

      if ( !_.isUndefined ( maximum ) ) {

        if ( value > maximum ) {

          value = maximum;

        }

      }

      if ( !_.isUndefined ( minimum ) ) {

        if ( value < minimum ) {

          value = minimum;

        }

      }

      return value;

    }

  });

}( lodash ));

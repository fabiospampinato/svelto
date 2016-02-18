
/* =========================================================================
 * Svelto - BT (BinaryTree) Each
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* BTEACH - LODASH */

  _.mixin ({

    btEach ( arr, callback, startIndex ) {

      let start = 0,
      end = arr.length - 1,
      center = _.isNumber ( startIndex ) ? startIndex : Math.ceil ( ( start + end ) / 2 ),
      direction;

      while ( start <= end ) {

        direction = callback.call ( arr[center], center, arr[center] );

        if ( direction < 0 ) {

          end = center - 1;

        } else if ( direction > 0 ) {

          start = center + 1;

        } else {

          return center;

        }

        center = Math.ceil ( ( start + end ) / 2 );

      }

      return -1;

    }

  });

  /* BTEACH - JQUERY */

  $.fn.btEach = function ( callback, startIndex ) {

    return _.btEach ( this, callback, startIndex );

  };

}( Svelto.$, Svelto._, Svelto ));

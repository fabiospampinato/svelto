
/* =========================================================================
 * Svelto - Touching
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../bteach/btEach.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* TOUCHING */

  $.fn.touching ( options ) {

    /* OPTIONS */

    options = _.merge ({
      startIndex : false, //INFO: Useful for speeding up the searching process if we may already guess the initial position...
      point: false, //INFO: Used for the punctual search
      //  {
      //    X: 0,
      //    Y: 0
      //  },
      binarySearch: true, //INFO: toggle the binary search when performing a punctual search
      $comparer: false, //INFO: Used for the overlapping search
      $not: false,
      onlyBest: false
    }, options );

    /* SEARCHABLE */

    var $searchable = options.$not ? this.not ( options.$not ) : this;

    /* COMPARER */

    if ( options.$comparer ) {

      var rect1 = options.$comparer.getRect (),
          nodes = [],
          areas = [];

      var result = false;

      for ( var i = 0, l = $searchable.length; i < l; i++ ) {

        var rect2 = $.getRect ( $searchable[i] ),
            area = $.getOverlappingArea ( rect1, rect2 );

        if ( area > 0 ) {

          nodes.push ( $searchable[i] );
          areas.push ( area );

        }

      }

      return options.onlyBest ? $(nodes[ areas.indexOf ( _.max ( areas ) )]) : $(nodes);

    }

    /* PUNCTUAL */

    if ( options.point ) {

      var $touched;

      if ( options.binarySearch ) {

        $searchable.btEach ( function () {

          var rect = $.getRect ( this );

          if ( options.point.Y >= rect.top ) {

            if ( options.point.Y <= rect.bottom ) {

              if ( options.point.X >= rect.left ) {

                if ( options.point.X <= rect.right ) {

                  $touched = $(this);

                  return false;

                } else {

                  return 1;

                }

              } else {

                return -1;

              }

            } else {

              return 1;

            }


          } else {

            return -1;

          }


        }, options.startIndex );

        return $touched || $empty;

      } else {

        for ( var i = 0, l = $searchable.length; i < l; i++ ) {

          var rect = $.getRect ( $searchable[i] );

          if ( options.point.Y >= rect.top && options.point.Y <= rect.bottom && options.point.X >= rect.left && options.point.X <= rect.right ) {

            $touched = $searchable.eq ( i );

            break;

          }

        }

        return $touched || $empty;

      }

    }

  };

}( jQuery, _, window, document ));

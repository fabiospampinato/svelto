
/* =========================================================================
 * Svelto - Touching
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../bteach/bteach.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* DEFAULT OPTIONS */

  let defaults = {
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
  };

  /* TOUCHING */

  $.fn.touching = function ( options ) {

    /* OPTIONS */

    options = _.extend ( {}, $.fn.touching.defaults, options );

    /* SEARCHABLE */

    let $searchable = options.$not ? this.not ( options.$not ) : this;

    /* COMPARER */

    if ( options.$comparer ) {

      let rect1 = options.$comparer.getRect (),
          nodes = [],
          areas = [];

      for ( let searchable of $searchable ) {

        let rect2 = $.getRect ( searchable ),
            area = $.getOverlappingArea ( rect1, rect2 );

        if ( area > 0 ) {

          nodes.push ( searchable );
          areas.push ( area );

        }

      }

      return options.onlyBest ? $(nodes[ areas.indexOf ( _.max ( areas ) ) ]) : $(nodes);

    }

    /* PUNCTUAL */

    if ( options.point ) {

      let $touched;

      if ( options.binarySearch ) {

        $searchable.btEach ( function () {

          let rect = $.getRect ( this );

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

        for ( let searchable of $searchable ) {

          let rect = $.getRect ( searchable );

          if ( options.point.Y >= rect.top && options.point.Y <= rect.bottom && options.point.X >= rect.left && options.point.X <= rect.right ) {

            $touched = $(searchable);

            break;

          }

        }

        return $touched || $empty;

      }

    }

  };

  /* BINDING */

  $.fn.touching.defaults = defaults;

}( Svelto.$, Svelto._, window, document ));

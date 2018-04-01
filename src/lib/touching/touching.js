
// @require core/svelto/svelto.js

(function ( $, _, Svelto ) {

  /* UTILITIES */

  let getOverlappingArea = function ( rect1, rect2 ) {

    let overlapX = Math.max ( 0, Math.min ( rect1.right, rect2.right ) - Math.max ( rect1.left, rect2.left ) ),
        overlapY = Math.max ( 0, Math.min ( rect1.bottom, rect2.bottom ) - Math.max ( rect1.top, rect2.top ) );

    return overlapX * overlapY;

  };

  /* DEFAULTS */

  let defaults = {
    point: false, // Used for the punctual search
    $comparer: false, // Used for the overlapping search
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
            area = getOverlappingArea ( rect1, rect2 );

        if ( area > 0 ) {

          nodes.push ( searchable );
          areas.push ( area );

        }

      }

      return nodes.length
               ? options.onlyBest
                 ? $(nodes[ areas.indexOf ( Math.max ( ...areas ) ) ])
                 : $(nodes)
               : false;

    }

    /* PUNCTUAL */

    if ( options.point ) {

      for ( let searchable of $searchable ) {

        let rect = $.getRect ( searchable );

        if ( options.point.y >= rect.top && options.point.y <= rect.bottom && options.point.x >= rect.left && options.point.x <= rect.right ) {

          return $(searchable);

        }

      }

    }

    /* DEFAULT */

    return false;

  };

  /* BINDING */

  $.fn.touching.defaults = defaults;

}( Svelto.$, Svelto._, Svelto ));

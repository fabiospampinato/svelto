
/* =========================================================================
 * Svelto - Positionate
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../transform/transform.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* VARIABLES */

  let $window = $(window);

  /* UTILITES */

  let isHorizontal = function ( direction ) {

    return direction === 'left' || direction === 'right';

  };

  let isVertical = function ( direction ) {

    return !isHorizontal ( direction );

  };

  /* DEFAULT OPTIONS */

  let defaults = {
    axis: false, //INFO: Set a preferred axis
    strict: false, //INFO: If enabled only use the setted axis/direction, even if it won't be the optimial choice
    $anchor: false, //INFO: Positionate next to an $anchor element
    $pointer: false, //INFO: The element who is pointing to the anchor
    point: false, //INFO: Positionate at coordinates, ex: { x: number, y: number }
    spacing: 0, //INFO: Extra space to leave around the positionable element
    direction: false, //INFO: Set a preferred direction, it has greater priority over the axis
    directions: { //INFO: How the directions should be prioritized when selecting the `x` axis, the `y` axis, or all of them
      x: ['right', 'left'],
      y: ['bottom', 'top'],
      all: ['bottom', 'right', 'left', 'top']
    },
    alignment: { //INFO: Set the alignment of the positionable relative to the anchor
      x: 'center', //INFO: `left`, center`, `right`
      y: 'center' //INFOL `top`, center`, `bottom`
    },
    callbacks: {
      change: _.noop
    }
  };

  /* POSITIONATE */

  $.fn.positionate = function ( options ) {

    /* NO ELEMENTS */

    if ( !this.length ) return this;

    /* OPTIONS */

    options = _.merge ( {}, $.fn.positionate.defaults, options );

    /* VARIABLES */

    let positionable = this[0],
        $positionable = $(positionable),
        positionableRect = $positionable.getRect (),
        windowWidth = $window.width (),
        windowHeight = $window.height (),
        directions = _.unique ( _.union ( options.direction ? [options.direction] : [], options.axis ? options.directions[options.axis] : [], !options.strict || !options.direction && !options.axis ? options.directions.all : [] ) ),
        anchorRect = options.$anchor ? options.$anchor.getRect () : { top: options.point.y, bottom: options.point.y, left: options.point.x, right: options.point.x, width: 0, height: 0 };

    /* SPACES */

    let spaces = directions.map ( direction => {

      switch ( direction ) {

        case 'top':
          return anchorRect.top;

        case 'bottom':
          return windowHeight - anchorRect.bottom;

        case 'left':
          return anchorRect.left;

        case 'right':
          return windowWidth - anchorRect.right;

      }

    });

    /* SPACES PRIORITIZATION */

    spaces.forEach ( ( space, index ) => {

      if ( space < 0 ) {

        let opposite = _.getOppositeDirection ( directions[index] ),
            oppositeIndex = directions.indexOf ( opposite );

        if ( oppositeIndex !== -1 ) {

          _.move ( directions, oppositeIndex, 0 );
          _.move ( spaces, oppositeIndex, 0 );

        }

      }

    });

    /* AREAS */

    let areas = directions.map ( ( direction, index ) => {

      switch ( direction ) {

        case 'top':
        case 'bottom':
          return Math.min ( positionableRect.height, spaces[index] ) * Math.min ( windowWidth, positionableRect.width );

        case 'left':
        case 'right':
          return Math.min ( positionableRect.width, spaces[index] ) * Math.min ( windowHeight, positionableRect.height );

      }

    });

    /* BEST DIRECTION */

    let bestIndex = areas.indexOf ( _.max ( areas ) ),
        bestDirection = directions[bestIndex],
        coordinates = {};

    /* TOP / LEFT */

    switch ( bestDirection ) {

      case 'top':
        coordinates.top = anchorRect.top - positionableRect.height - options.spacing;
        break;

      case 'bottom':
        coordinates.top = anchorRect.bottom + options.spacing;
        break;

      case 'left':
        coordinates.left = anchorRect.left - positionableRect.width - options.spacing;
        break;

      case 'right':
        coordinates.left = anchorRect.right + options.spacing;
        break;

    }

    switch ( bestDirection ) {

      case 'top':
      case 'bottom':
        switch ( options.alignment.x ) {
          case 'left':
            coordinates.left = anchorRect.left;
            break;
          case 'center':
            coordinates.left = anchorRect.left + ( anchorRect.width / 2 ) - ( positionableRect.width / 2 );
            break;
          case 'right':
            coordinates.left = anchorRect.right - positionableRect.width;
            break;
        }
        break;

      case 'left':
      case 'right':
        switch ( options.alignment.y ) {
          case 'top':
            coordinates.top = anchorRect.top;
            break;
          case 'center':
            coordinates.top = anchorRect.top + ( anchorRect.height / 2 ) - ( positionableRect.height / 2 );
            break;
          case 'bottom':
            coordinates.top = anchorRect.bottom - positionableRect.height;
            break;
        }
        break;

    }

    /* CONSTRAIN TO THE WINDOW */

    let oppositeSpace = spaces[bestIndex],
        isAnchorVisible = isVertical ( bestDirection ) ? oppositeSpace <= windowHeight : oppositeSpace <= windowWidth;

    if ( isAnchorVisible ) {

      coordinates.top = _.clamp ( coordinates.top, options.spacing, windowHeight - positionableRect.height - options.spacing );
      coordinates.left = _.clamp ( coordinates.left, options.spacing, windowWidth - positionableRect.width - options.spacing );

    }

    /* DATAS */

    let data = {
      positionable: positionable,
      coordinates: coordinates,
      direction: bestDirection
    };

    /* TRANSLATE */

    $positionable.translate ( coordinates.left, coordinates.top );

    /* CSS CLASS */

    let prevDirection = positionable._prevDirection;

    if ( prevDirection !== bestDirection ) {

      $positionable.removeClass ( 'positionate-' + prevDirection ).addClass ( 'positionate-' + bestDirection );

      positionable._prevDirection = bestDirection;

    }

    /* POINTER */

    if ( options.$anchor && options.$pointer ) {

      switch ( bestDirection ) {

        case 'top':
        case 'bottom':
          options.$pointer.translateX ( anchorRect.left - coordinates.left + ( anchorRect.width / 2 ) );
          break;

        case 'left':
        case 'right':
          options.$pointer.translateY ( anchorRect.top - coordinates.top + ( anchorRect.height / 2 ) );
          break;

      }

    }

    /* CALLBACK */

    options.callbacks.change ( data );

    /* RETURN */

    return this;

  };

  /* BINDING */

  $.fn.positionate.defaults = defaults;

}( Svelto.$, Svelto._, Svelto ));

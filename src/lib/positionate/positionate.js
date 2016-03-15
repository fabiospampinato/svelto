
/* =========================================================================
 * Svelto - Lib - Positionate
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * @require lib/embedded_css/embedded_css.js
 * @require lib/transform/transform.js
 * ========================================================================= */

//FIXME: If the positionable element is let than half of the anchor, and it must be pointed than the pointer may be not well positionated (expecially if we are not aligning to the center)

(function ( $, _, Svelto, EmbeddedCSS ) {

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

  /* DEFAULTS */

  let defaults = {
    axis: false, // Set a preferred axis
    strict: false, // If enabled only use the setted axis/direction, even if it won't be the optimial choice
    $anchor: false, // Positionate next to an $anchor element
    point: false, // Positionate at coordinates, ex: { x: number, y: number }
    pointer: false, // The element pointing to the anchor, can be: false -> no pointer, 'auto' -> pointer using the `pointing` decorator, $element -> element used as pointer
    spacing: 0, // Extra space to leave around the positionable element
    constrainer: { // Constrain the $positionable inside the $element
      $element: false, // If we want to keep the $positionable inside this $element
      center: false, // Set the constrain type, it will constrain the whole shape, or the center
      tolerance: { // The amount of pixel flexibility that a constrainer has
        x: 0,
        y: 0
      }
    },
    directions: { // How the directions should be prioritized when selecting the `x` axis, the `y` axis, or all of them
      x: ['right', 'left'],
      y: ['bottom', 'top'],
      all: ['bottom', 'right', 'left', 'top']
    },
    alignment: { // Set the alignment of the positionable relative to the anchor
      x: 'center', // `left`, center`, `right`
      y: 'center' // `top`, center`, `bottom`
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
        directions = _.uniq ( _.union ( options.direction ? [options.direction] : [], options.axis ? options.directions[options.axis] : [], !options.strict || !options.direction && !options.axis ? options.directions.all : [] ) ),
        anchorRect = options.$anchor ? options.$anchor.getRect () : { top: options.point.y, bottom: options.point.y, left: options.point.x, right: options.point.x, width: 0, height: 0 };

    /* ID */

    positionable._positionateGuid = positionable._positionateGuid || $.guid++;
    positionable._positionateGuc = `positionate-${positionable._positionateGuid}`;

    $positionable.addClass ( positionable._positionateGuc );

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

    /* CONSTRAIN */

    if ( options.$anchor ) {

      let oppositeSpace = spaces[bestIndex],
          isAnchorVisible = isVertical ( bestDirection ) ? oppositeSpace <= windowHeight : oppositeSpace <= windowWidth;

      if ( isAnchorVisible ) {

        coordinates.top = _.clamp ( coordinates.top, options.spacing, windowHeight - positionableRect.height - options.spacing );
        coordinates.left = _.clamp ( coordinates.left, options.spacing, windowWidth - positionableRect.width - options.spacing );

      }

    } else if ( options.constrainer.$element ) {

      let constrainerRect = options.constrainer.$element.getRect (),
          halfWidth = options.constrainer.center ? positionableRect.width / 2 : 0,
          halfHeight = options.constrainer.center ? positionableRect.height / 2 : 0;

      /* COORDINATES */

      coordinates.top = _.clamp ( coordinates.top, constrainerRect.top - halfHeight - options.constrainer.tolerance.y + options.spacing, constrainerRect.bottom - positionableRect.height + halfHeight + options.constrainer.tolerance.y - options.spacing );
      coordinates.left = _.clamp ( coordinates.left, constrainerRect.left - halfWidth - options.constrainer.tolerance.x + options.spacing, constrainerRect.right - positionableRect.width + halfWidth + options.constrainer.tolerance.x - options.spacing );

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

    let prevDirection = positionable._positionatePrevDirection;

    positionable._positionatePrevDirection = bestDirection;

    if ( prevDirection !== bestDirection ) {

      $positionable.removeClass ( `position-${prevDirection}` ).addClass ( `position-${bestDirection}` );

    }

    /* POINTER */

    let prevPointer = positionable._positionatePrevPointer;

    positionable._positionatePrevPointer = options.pointer;

    if ( prevPointer === 'auto' && ( options.pointer !== 'auto' || bestDirection !== prevDirection ) ) {

      let oppositeDirection = _.getOppositeDirection ( prevDirection );

      $positionable.removeClass ( `pointing-${oppositeDirection}` );

    }

    if ( options.pointer ) {

      if ( options.pointer === 'auto' ) {

        let oppositeDirection = _.getOppositeDirection ( bestDirection );

        $positionable.addClass ( `pointing-${oppositeDirection}` );

      }

      /* MOVING */

      switch ( bestDirection ) {

        case 'top':
        case 'bottom':
          let deltaX = _.clamp ( anchorRect.left - coordinates.left + ( anchorRect.width / 2 ), 0, positionableRect.width );
          if ( options.pointer instanceof $ ) {
            options.pointer.translate ( deltaX, 0 );
          } else if ( options.pointer === 'auto' ) {
            EmbeddedCSS.set ( `.${positionable._positionateGuc}:after`, `left:${deltaX}px;` ); //TODO: Maybe use `transform` instead, since it lead to improved performances
          }
          break;

        case 'left':
        case 'right':
          let deltaY = _.clamp ( positionableRect.height, anchorRect.top - coordinates.top + ( anchorRect.height / 2 ), 0, positionableRect.height );
          if ( options.pointer instanceof $ ) {
            options.pointer.translate ( 0, deltaY );
          } else if ( options.pointer === 'auto' ) {
            EmbeddedCSS.set ( `.${positionable._positionateGuc}:after`, `top:${deltaY}px;` ); //TODO: Maybe use `transform` instead, since it lead to improved performances
          }
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

}( Svelto.$, Svelto._, Svelto, Svelto.EmbeddedCSS ));

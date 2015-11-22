
/* =========================================================================
 * Svelto - Positionate
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../transform/transform.js
 * ========================================================================= */

//TODO: Add allignment, that is, if possibile don't center the dropdown but align it to one of the trigger edges
//FIXME: Big elements gets positionated badly, for example try some tooltips in a small viewport

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* UTILITES */

  let isHorizontal = function ( direction ) {

    return direction === 'left' || direction === 'right';

  };

  let isVertical = function ( direction ) {

    return !isHorizontal ( direction );

  };

  let getOpposite = function ( direction ) {

    let opposites = {
      'top'   : 'bottom',
      'bottom': 'top',
      'left'  : 'right',
      'right' : 'left'
    };

    return opposites[direction];

  };

  /* POSITIONATE */

  $.fn.positionate = function ( options ) {

    /* OPTIONS */

    options = _.merge ({
      direction: false, //INFO: Set a preferred direction, it has greater priority over the axis
      axis: false, //INFO: Set a preferred axis
      $anchor: false, //INFO: Positionate next to an $anchor element
      $pointer: false, //INFO: The element who is pointing to the anchor
      point: false, //INFO: Positioante at coordinates, ex: { x: number, y: number }
      spacing: 0, //INFO: Extra space to leave around the positionable element
      ranks: { //INFO: How the directions should be prioritized when selecting the `x` axis, the `y` axis, or all of them
        x: ['right', 'left'],
        y: ['bottom', 'top'],
        all: ['bottom', 'right', 'left', 'top']
      },
      callbacks: {
        change: _.noop
      }
    }, options );

    /* RESET */

    this.removeClass ( 'positionate-top positionate-bottom positionate-left positionate-right' );

    /* VARIABLES */

    let directions = _.unique ( _.union ( options.direction ? [options.direction] : [], options.axis ? options.ranks[options.axis] : [], options.ranks.all ) ),
        windowWidth = $window.width (),
        windowHeight = $window.height (),
        positionableRect = this.getRect (),
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

        let opposite = getOpposite ( directions[index] ),
            oppositeIndex = directions.indexOf ( opposite );

        _.move ( directions, oppositeIndex, 0 );
        _.move ( spaces, oppositeIndex, 0 );

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
        coordinates;

    /* TOP / LEFT */

    switch ( bestDirection ) {

      case 'top':
      case 'bottom':
        coordinates = {
          top: ( bestDirection === 'top' ) ? anchorRect.top - positionableRect.height - options.spacing : anchorRect.bottom + options.spacing,
          left: anchorRect.left + ( anchorRect.width / 2 ) - ( positionableRect.width / 2 )
        };
        break;

      case 'left':
      case 'right':
        coordinates = {
          top: anchorRect.top + ( anchorRect.height / 2 ) - ( positionableRect.height / 2 ),
          left: ( bestDirection === 'left' ) ? anchorRect.left - positionableRect.width - options.spacing : anchorRect.right + options.spacing
        };

    }

    /* CONSTRAIN TO THE WINDOW */

    if ( options.$anchor ) {

      let oppositeSpace = spaces[bestIndex],
          isAnchorVisible = isVertical ( bestDirection ) ? oppositeSpace <= windowHeight : oppositeSpace <= windowWidth;

      if ( isAnchorVisible ) {

        coordinates.top = _.clamp ( options.spacing, coordinates.top, windowHeight - positionableRect.height - options.spacing );
        coordinates.left = _.clamp ( options.spacing, coordinates.left, windowWidth - positionableRect.width - options.spacing );

      }

    }

    /* DATAS */

    let datas = {
      coordinates: coordinates,
      direction: bestDirection,
      oppositeDirection: getOpposite ( bestDirection )
    };

    /* POINTER TOP / LEFT */

    let $pointer,
        translateType,
        translateValue;

    if ( options.$anchor && options.$pointer ) {

      $pointer = _.isFunction ( options.$pointer ) ? options.$pointer ( datas ) : options.$pointer;

      if ( $pointer instanceof $ ) {

        switch ( bestDirection ) {

          case 'top':
          case 'bottom':
            translateType = 'translateX',
            translateValue = anchorRect.left - coordinates.left + ( anchorRect.width / 2 );
            break;

          case 'left':
          case 'right':
            translateType = 'translateY',
            translateValue = anchorRect.top - coordinates.top + ( anchorRect.height / 2 );
            break;

        }

      }

    }

    /* SETTING */

    this.translate ( coordinates.left, coordinates.top );

    this.addClass ( 'positionate-' + bestDirection );

    if ( options.$anchor && options.$pointer && $pointer instanceof $ ) {

      $pointer[translateType] ( translateValue );

    }

    /* CALLBACK */

    options.callbacks.change ( datas );

    return this;

  };

}( Svelto.$, Svelto._, window, document ));

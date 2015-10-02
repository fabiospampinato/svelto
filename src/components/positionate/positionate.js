
/* =========================================================================
 * Svelto - Positionate v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../transform/transform.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* UTILITES */

  var isHorizontal = function ( direction ) {

    return direction === 'left' || direction === 'right';

  };

  var isVertical = function ( direction ) {

    return !isHorizontal ( direction );

  };

  var getOpposite = function ( direction ) {

    var opposites = {
      'top': 'bottom',
      'bottom': 'top',
      'left': 'right',
      'right': 'left'
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

    var directions = _.unique ( _.union ( options.direction ? [options.direction] : [], options.axis ? options.ranks[options.axis] : [], options.ranks.all ) ),
        windowWidth = $window.width (),
        windowHeight = $window.height (),
        htmlScrollTop = $html.scrollTop (),
        htmlScrollLeft = $html.scrollLeft (),
        positionableOffset = this.offset (),
        positionableWidth = this.outerWidth (),
        positionableHeight = this.outerHeight (),
        anchorOffset = options.$anchor ? options.$anchor.offset () : { top: options.point.y, left: options.point.x },
        anchorWidth = options.$anchor ? options.$anchor.outerWidth () : 0,
        anchorHeight = options.$anchor ? options.$anchor.outerHeight () : 0;

    /* SPACES */

    var spaces = directions.map ( function ( direction ) {

      switch ( direction ) {

        case 'top':
          return anchorOffset.top - htmlScrollTop;

        case 'bottom':
          return windowHeight - anchorOffset.top - anchorHeight + htmlScrollTop;

        case 'left':
          return anchorOffset.left - htmlScrollLeft;

        case 'right':
          return windowWidth - anchorOffset.left - anchorWidth + htmlScrollLeft;

      }

    });

    /* SPACES PRIORITIZATION */

    spaces.forEach ( function ( space, index ) {

      if ( space < 0 ) {

        var opposite = getOpposite ( directions[index] ),
            oppositeIndex = directions.indexOf ( opposite );

        _.move ( directions, oppositeIndex, 0 );
        _.move ( spaces, oppositeIndex, 0 );

      }

    });

    /* AREAS */

    var areas = directions.map ( function ( direction, index ) {

      switch ( direction ) {

        case 'top':
        case 'bottom':
          return Math.min ( positionableHeight, spaces[index] ) * Math.min ( windowWidth, positionableWidth );

        case 'left':
        case 'right':
          return Math.min ( positionableWidth, spaces[index] ) * Math.min ( windowHeight, positionableHeight );

      }

    });

    /* BEST DIRECTION */

    var bestIndex = areas.indexOf ( _.max ( areas ) ),
        bestDirection = directions[bestIndex];

    /* TOP / LEFT */

    switch ( bestDirection ) {

      case 'top':
      case 'bottom':
        var coordinates = {
          top: ( bestDirection === 'top' ) ? anchorOffset.top - positionableHeight : anchorOffset.top + anchorHeight,
          left: anchorOffset.left + ( anchorWidth / 2 ) - ( positionableWidth / 2 )
        };
        break;

      case 'left':
      case 'right':
        var coordinates = {
          top: anchorOffset.top + ( anchorHeight / 2 ) - ( positionableHeight / 2 ),
          left: ( bestDirection === 'left' ) ? anchorOffset.left - positionableWidth : anchorOffset.left + anchorWidth
        };

    }

    /* CONSTRAIN TO THE WINDOW */

    if ( options.$anchor ) {

      var oppositeSpace = spaces[bestIndex],
          isAnchorVisible = isVertical ( bestDirection ) ? oppositeSpace <= windowHeight : oppositeSpace <= windowWidth;

      if ( isAnchorVisible ) {

        coordinates.top = _.clamp ( 0, coordinates.top, windowHeight - positionableHeight );
        coordinates.left = _.clamp ( 0, coordinates.left, windowWidth - positionableWidth );

      }

    }

    /* DATAS */

    var datas = {
      coordinates: coordinates,
      direction: bestDirection
    };

    /* POINTER TOP / LEFT */

    if ( options.$anchor && options.$pointer ) {

      var $pointer = _.isFunction ( options.$pointer ) ? options.$pointer ( datas ) : options.$pointer;

      if ( $pointer instanceof $ ) {

        var pointerPosition = $pointer.position ();

        switch ( bestDirection ) {

          case 'top':
          case 'bottom':
            var pointerWidth = $pointer.width (),
                translateType = 'translateX',
                translateValue = $pointer.translateX () + ( ( anchorOffset.left + ( anchorWidth / 2 ) - htmlScrollLeft ) - ( coordinates.left + pointerPosition.left + ( pointerWidth / 2 ) ) );
            break;

          case 'left':
          case 'right':
            var pointerHeight = $pointer.height (),
                translateType = 'translateY',
                translateValue = $pointer.translateY () + ( ( anchorOffset.top + ( anchorHeight / 2 ) - htmlScrollTop ) - ( coordinates.top + pointerPosition.top + ( pointerHeight / 2 ) ) );
            break;

        }

      }

    }

    /* SETTING */

    this.translate2d ( coordinates.left, coordinates.top );

    this.addClass ( 'positionate-' + bestDirection );

    if ( options.$anchor && options.$pointer && $pointer instanceof $ ) {

      $pointer[translateType] ( translateValue );

    }

    /* CALLBACK */

    options.callbacks.change ( datas );

    return this;

  };

}( jQuery, _, window, document ));

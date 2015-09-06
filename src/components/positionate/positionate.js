
/* =========================================================================
 * Svelto - Positionate v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

//FIXME: if the anchor is half overflowing the viewport at the left, but still if there's space at the bottom the positionable gets positionated at the bottom, instead of the right: maybe create a new normalized area map, that gives more importance to this thing
//TODO: add support for a $pointer ( that can also be a function )

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* POSITIONATE */

  $.fn.positionate = function ( custom_options ) {

    // OPTIONS

    var options = _.merge ({
      direction: false, //INFO: Set a preferred direction
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
        positionated: _.noop
      }
    }, custom_options );

    // RESETTING

    this.removeClass ( 'positionate-top positionate-bottom positionate-left positionate-right' );

    // VARIABLES

    var directions = _.unique ( _.union ( options.direction ? [options.direction] : [], options.axis ? options.ranks[options.axis] : [], options.ranks.all ) ),
      window_width = $window.width (),
      window_height = $window.height (),
      html_scrollTop = $html.scrollTop (),
      html_scrollLeft = $html.scrollLeft (),
      positionable_offset = this.offset (),
      positionable_width = this.outerWidth (),
      positionable_height = this.outerHeight (),
      anchor_offset = options.$anchor ? options.$anchor.offset () : { top: options.point.y, left: options.point.x },
      anchor_width = options.$anchor ? options.$anchor.outerWidth () : 0,
      anchor_height = options.$anchor ? options.$anchor.outerHeight () : 0;

    // SPACES

    var spaces = _.map ( directions, function ( direction ) {

      switch ( direction ) {

        case 'top':
          return anchor_offset.top - html_scrollTop;

        case 'bottom':
          return window_height - anchor_offset.top - anchor_height + html_scrollTop;

        case 'left':
          return anchor_offset.left - html_scrollLeft;

        case 'right':
          return window_width - anchor_offset.left - anchor_width + html_scrollLeft;

      }

    });

    // AREAS

    var areas = _.map ( directions, function ( direction, index ) {

      switch ( direction ) {

        case 'top':
        case 'bottom':
          return Math.min ( positionable_height, spaces[index] ) * Math.min ( window_width, positionable_width );

        case 'left':
        case 'right':
          return Math.min ( positionable_width, spaces[index] ) * Math.min ( window_height, positionable_height );

      }

    });

    // CHOOSING A DIRECTION

    var chosen_direction = directions[areas.indexOf ( _.max ( areas ) )];

    // GETTING TOP AND LEFT

    switch ( chosen_direction ) {

      case 'top':
      case 'bottom':
        var coordinates = {
          left: anchor_offset.left + ( anchor_width / 2 ) - ( positionable_width / 2 ),
          top: ( chosen_direction === 'top' ) ? anchor_offset.top - positionable_height : anchor_offset.top + anchor_height
        };
        break;

      case 'left':
      case 'right':
        var coordinates = {
          top: anchor_offset.top + ( anchor_height / 2 ) - ( positionable_height / 2 ),
          left: ( chosen_direction === 'left' ) ? anchor_offset.left - positionable_width : anchor_offset.left + anchor_width
        };

    }

    // CONSTRAIN TO THE WINDOW

    //TODO: add a viewport check here, we should positionate it to the viewport if the element is outside of it

    coordinates.top = _.clamp ( 0, coordinates.top, window_height - positionable_height );
    coordinates.left = _.clamp ( 0, coordinates.left, window_width - positionable_width );

    // DATAS

    var datas = {
      coordinates: coordinates,
      direction: chosen_direction
    };

    // SETTING TOP AND LEFT

    this.css ( 'transform', 'translate3d(' + coordinates.left + 'px,' + coordinates.top + 'px,0)' );

    this.addClass ( 'positionate-' + chosen_direction );

    // SETTING THE POINTER

    if ( options.$anchor && options.$pointer ) {

      var $pointer = _.isFunction ( options.$pointer ) ? options.$pointer ( datas ) : options.$pointer;

      if ( $pointer instanceof $ ) {

        var transform_str = $pointer.css ( 'transform' ),
          matrix =  ( transform_str !== 'none' ) ? transform_str.match ( /[0-9., -]+/ )[0].split ( ', ' ) : [0, 0, 0, 0, 0, 0],
          pointer_position = $pointer.position ();

        switch ( chosen_direction ) {

          case 'top':
          case 'bottom':
            var pointer_width = $pointer.width (),
              translateX = parseInt ( matrix[4], 10 ) + ( ( anchor_offset.left + ( anchor_width / 2 ) - html_scrollLeft ) - ( coordinates.left + pointer_position.left + ( pointer_width / 2 ) ) ),
              translateY = parseInt ( matrix[5], 10 );
            break;

          case 'left':
          case 'right':
            var pointer_height = $pointer.height (),
              translateX = parseInt ( matrix[4], 10 ),
              translateY = parseInt ( matrix[5], 10 ) + ( ( anchor_offset.top + ( anchor_height / 2 ) - html_scrollTop ) - ( coordinates.top + pointer_position.top + ( pointer_height / 2 ) ) );
            break;

        }

        $pointer.css ( 'transform', 'translate3d(' + translateX + 'px,' + translateY + 'px,0)' );

      }

    }

    // CALLBACK

    options.callbacks.positionated ( datas );

    return this;

  };

}( jQuery, _, window, document ));

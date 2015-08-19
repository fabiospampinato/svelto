
/* POSITIONATE */

//FIXME: if the anchor is half overflowing the viewport at the left, but still if there's space at the bottom the positionable gets positionated at the bottom, instead of the right: maybe create a new normalized area map, that gives more importance to this thing

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* POSITIONATE */

    $.fn.positionate = function ( custom_options ) {

        // OPTIONS

        var options = {
            direction: false, //INFO: Set a preferred direction
            axis: false, //INFO: Set a preferred axis
            $anchor: false, //INFO: Positionate next to an $anchor element
            point: false, //INFO: Positioante at coordinates, ex: { x: number, y: number }
            ranks: { //INFO: How the directions should be prioritized when selecting the `x` axis, the `y` axis, or all of them
                x: ['right', 'left'],
                y: ['bottom', 'top'],
                all: ['bottom', 'right', 'left', 'top']
            },
            callbacks: {
                positionated: $.noop
            }
        };

        $.extend ( options, custom_options );

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

        // SETTING TOP AND LEFT

        this.css ( 'transform', 'translate3d(' + coordinates.left + 'px,' + coordinates.top + 'px,0)' );

        this.addClass ( 'positionate-' + chosen_direction );

        // CALLBACK

        options.callbacks.positionated ( coordinates );

    };

}( jQuery, _, window, document ));

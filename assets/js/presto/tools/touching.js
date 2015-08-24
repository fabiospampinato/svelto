
/* TOUCHING */

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* UTILITIES */

    var get_coordinates = function ( $ele ) {

        var offset = $ele.offset ();

        return {
            X1: offset.left,
            X2: offset.left + $ele.width (),
            Y1: offset.top,
            Y2: offset.top + $ele.height ()
        };

    };

    var get_overlapping_area = function ( c1, c2 ) {

        var x_overlap = Math.max ( 0, Math.min ( c1.X2, c2.X2 ) - Math.max ( c1.X1, c2.X1 ) ),
            y_overlap = Math.max ( 0, Math.min ( c1.Y2, c2.Y2 ) - Math.max ( c1.Y1, c2.Y1 ) );

        return x_overlap * y_overlap;

    };

    /* TOUCHING */

    $.fn.touching = function ( custom_options ) {

        /* OPTIONS */

        var options = _.merge ({
            startIndex : false, //INFO: Useful for speeding up the searching process if we may already guess the initial position...
            point: false, //INFO: Used for the punctual search
            binarySearch: true, //INFO: toggle the binary search when performing a punctual search
            //  {
            //      X: 0,
            //      Y: 0
            //  },
            $comparer: false, //INFO: Used for the overlapping search
            $not: false,
            select: 'all'
        }, custom_options );

        /* SEARCHABLE */

        var $searchable = options.$not ? this.not ( options.$not ) : this;

        /* COMPARER */

        if ( options.$comparer ) {

            var c1 = get_coordinates ( options.$comparer ),
                nodes = [],
                areas = [];

            var result = false;

            $searchable.each ( function () {

                var c2 = get_coordinates ( $(this) ),
                    area = get_overlapping_area ( c1, c2 );

                if ( area > 0 ) {

                    nodes.push ( this );
                    areas.push ( area );

                }

            });

            switch ( options.select ) {

                case 'all':
                    return $(nodes);

                case 'most':
                    return $(nodes[ areas.indexOf ( _.max ( areas ) )]);

                default:
                    return $empty;

            }

        }

        /* PUNCTUAL */

        if ( options.point ) {

            var $touched;

            if ( options.binarySearch ) {

                $searchable.btEach ( function () {

                    var $node = $(this),
                        c = get_coordinates ( $node );

                    if ( options.point.Y >= c.Y1 ) {

                        if ( options.point.Y <= c.Y2 ) {

                            if ( options.point.X >= c.X1 ) {

                                if ( options.point.X <= c.X2 ) {

                                    $touched = $node;

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

                $searchable.each ( function () {

                    var $node = $(this),
                        c = get_coordinates ( $node );

                    if ( options.point.Y >= c.Y1 && options.point.Y <= c.Y2 && options.point.X >= c.X1 && options.point.X <= c.X2 ) {

                        $touched = $node;

                        return false;

                    }

                });

                return $touched || $empty;

            }

        }

    };

}( jQuery, _, window, document ));

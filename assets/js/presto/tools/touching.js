
/* TOUCHING */

//TODO: add support for linear search, non binary, or maybe a balanced left then right then left again search, so that if we guess wrong but we are close we still won't spend too much time

;(function ( $, window, document, undefined ) {

    'use strict';

    /* UTILITIES */

    var get_coordinates = function ( $ele ) {

        var offset = $ele.offset ();

        return {
            X1: offset.left,
            X2: offset.left + offset.width,
            Y1: offset.top,
            Y2: offset.top + offset.height
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

        var options = {
            start_index : false, //INFO: Useful for speeding up the searching process if we may already guess the initial position...
            point: false, //INFO: Used for the punctual search
            //  {
            //      X: 0,
            //      Y: 0
            //  },
            $comparer: false, //INFO: Used for the overlapping search
            $not: false,
            select: 'all'
        };

        $.extend ( options, custom_options );

        /* SEARCHABLE */

        var $searchable = options.$not ? this.not ( options.$not ) : this;

        console.log("searchable: ",$searchable.nodes);

        /* COMPARER */

        if ( options.$comparer ) {

            var c1 = get_coordinates ( options.$comparer ),
                matches = [],
                areas = [];

            for ( var i = 0, l = $searchable.length; i < l; i++ ) {

                var $ele = $searchable.eq ( i );

                var c2 = get_coordinates ( $ele ),
                    overlap_area = get_overlapping_area ( c1, c2 );

                if ( overlap_area > 0 ) {

                    matches.push ( $ele.get ( 0 ) );
                    areas.push ( overlap_area );

                }

            }

            return $( options.select === 'all' ? $(matches) : ( options.select === 'most' && matches.length > 0 ? $( matches[ areas.indexOf ( _.max ( areas ) ) ] ) : $() ) );

        }

        /* PUNCTUAL */

        if ( options.point ) {

            var $touched = false;

            $searchable.btEach ( function () {

                var $ele = $(this),
                    c = get_coordinates ( $ele );

                if ( options.point.Y >= c.Y1 ) {

                    if ( options.point.Y <= c.Y2 ) {

                        if ( options.point.X >= c.X1 ) {

                            if ( options.point.X <= c.X2 ) {

                                $touched = $ele;

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

            }, options.start_index );

            return $touched ? $touched : $();

        }

    };

}( lQuery, window, document ));

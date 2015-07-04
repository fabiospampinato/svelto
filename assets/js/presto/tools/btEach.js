
/* BINARY TREE .each() */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* BINARY TREE .each () */

    $.fn.btEach = function ( callback, start_index ) {

        var start = 0,
            end = this.length - 1,
            center = 0,
            iterations = 0,
            result = false;

        while ( start <= end ) {

            center = ( iterations === 0 && typeof start_index === 'number' ) ? start_index : Math.ceil ( ( start + end ) / 2 );

            result = callback.call ( this.get ( center ), center, this.get ( center ) );

            iterations += 1;

            if ( result < 0 ) {

                end = center - 1;

            } else if ( result > 0 ) {

                start = center + 1;

            } else {

                return center;

            }

        }

        return false;

    };

}( lQuery, window, document ));


/* BINARY TREE .each() */

$.fn.bt_each = function ( callback, start_center ) {

    var start = 0,
        end = this.size () - 1,
        center = 0,
        iterations = 0,
        result = false;

    while ( start <= end ) {

        center = ( iterations === 0 && typeof start_center === 'number' ) ? start_center : Math.ceil ( ( start + end ) / 2 );

        result = callback.call ( this.get ( center ), this.get ( center ), center );

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

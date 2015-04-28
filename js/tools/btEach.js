
/* BINARY TREE .each() */

;(function ( $, window, document, undefined ) {

    $.factory ( 'btEach', function ( callback, start_center ) {

        var start = 0,
            end = this.length - 1,
            center = 0,
            iterations = 0,
            result = false;

        while ( start <= end ) {

            center = ( iterations === 0 && typeof start_center === 'number' ) ? start_center : Math.ceil ( ( start + end ) / 2 );

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

    });

}( lQuery, window, document ));

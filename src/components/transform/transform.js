
/* TRANSFORM UTILITIES */

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* MATRIX */

    $.fn.matrix = function ( values ) {

      if ( values ) {

        this.css ( 'transform', 'matrix(' + values.join ( ',' ) + ')' );

        return this;

      } else {

        var transformStr = this.css ( 'transform' );

        return ( transformStr && transformStr !== 'none' ) ? transformStr.match ( /[0-9., -]+/ )[0].split ( ', ' ).map ( function ( value ) { return parseFloat ( value, 10 ); } ) : [1, 0, 0, 1, 0, 0];

      }

    };

    /* TRANSFORMATIONS */

    var transformations = ['scaleX', 'skewY', 'skewX', 'scaleY', 'translateX', 'translateY']; //FIXME: Their index is also the corresponsing index when applying `transform: matrix()`

    for ( var i = 0, l = transformations.length; i < l; i++ ) {

      $.fn[transformations[i]] = (function ( index ) {

         return function ( value ) {

           if ( !_.isUndefined ( value ) ) {

             var matrix = this.matrix ();

             matrix[index] = value;

             return this.matrix ( matrix );

           } else {

             return this.matrix ()[index];

           }

         };

       })( i );

    }

}( jQuery, _, window, document ));


/* TRANSFORM UTILITIES */

//FIXME: Do we need to support -webkit- prefixing?

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* MATRIX */

  $.fn.matrix = function ( values ) {

    if ( values ) {

      this.css ( 'transform', 'matrix(' + values.join ( ',' ) + ')' );

      return this;

    } else {

      let transformStr = this.css ( 'transform' );

      return ( transformStr && transformStr !== 'none' ) ? transformStr.match ( /[0-9., e-]+/ )[0].split ( ', ' ).map ( value => parseFloat ( value ) ) : [1, 0, 0, 1, 0, 0];

    }

  };

  /* TRANSFORMATIONS */

  let transformations = ['scaleX', 'skewY', 'skewX', 'scaleY', 'translateX', 'translateY']; //INFO: Their index is also the corresponsing index when applying `transform: matrix()`

  for ( let i = 0, l = transformations.length; i < l; i++ ) {

    $.fn[transformations[i]] = (function ( index ) {

       return function ( value ) {

         let matrix = this.matrix ();

         if ( !_.isUndefined ( value ) ) {

           matrix[index] = value;

           return this.matrix ( matrix );

         } else {

           return matrix[index];

         }

       };

     })( i );

  }

  /* TRANSLATE */

  $.fn.translate = function ( X, Y ) {

    let matrix = this.matrix ();

    if ( !_.isUndefined ( X ) && !_.isUndefined ( Y ) ) {

      matrix[4] = X;
      matrix[5] = Y;

      return this.matrix ( matrix );

    } else {

      return {
        X: matrix[4],
        Y: matrix[5]
      };

    }

  };

}( jQuery, _, window, document ));

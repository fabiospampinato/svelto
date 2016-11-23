
/* =========================================================================
 * Svelto - Lib - Transform
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

/* TRANSFORM UTILITIES */

(function ( $, _, Modernizr, Svelto ) {

  'use strict';

  /* MATRIX */

  let property = Modernizr.prefixedCSS ( 'transform' );

  $.fn.matrix = function ( values ) {

    if ( values ) {

      values = values.map ( val => Number ( val ).toFixed ( 20 ) ).join ( ',' );

      this.css ( property, `matrix(${values})` );

      return this;

    } else {

      let transformStr = this.css ( property );

      return ( transformStr && transformStr !== 'none' ) ? transformStr.match ( /[0-9., e-]+/ )[0].split ( ', ' ).map ( value => parseFloat ( value ) ) : [1, 0, 0, 1, 0, 0];

    }

  };

  /* TRANSFORMATIONS */

  let transformations = ['scaleX', 'skewY', 'skewX', 'scaleY', 'translateX', 'translateY']; // Their index is also the corresponsing index when applying `transform: matrix()`

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

  /* 2D TRANSFORMATIONS */

  let transformations2D = ['scale', 'skew', 'translate'],
      indexes2D = [[0, 3], [1, 2], [4, 5]];

  for ( let i = 0, l = transformations2D.length; i < l; i++ ) {

    $.fn[transformations2D[i]] = (function ( index ) {

      return function ( X, Y = X ) {

        let matrix = this.matrix (),
            indexes = indexes2D[index];

        if ( !_.isUndefined ( X ) && !_.isUndefined ( Y ) ) {

          matrix[indexes[0]] = X;
          matrix[indexes[1]] = Y;

          return this.matrix ( matrix );

        } else {

          return [matrix[indexes[0]], matrix[indexes[1]]];

        }

      }

    })( i );

  }

}( Svelto.$, Svelto._, Svelto.Modernizr, Svelto ));

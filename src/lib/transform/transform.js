
/* =========================================================================
 * Svelto - Lib - Transform
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

/* TRANSFORM UTILITIES */

(function ( $, _, Modernizr, Svelto ) {

  'use strict';

  /* MATRIX */

  let property = _.camelCase ( Modernizr.prefixedCSS ( 'transform' ) ),
      precision = 3; // Or sometimes we may get weird values like `2.4492935982947064e-16` on Safari

  $.fn.matrix = function ( values ) { //TODO: Add not jquery-wrapped version fo this maybe

    if ( values ) {

      values = values.map ( val => parseFloat ( parseFloat ( val ).toFixed ( precision ) ) ).join ( ',' );

      this[0].style[property] = `matrix(${values})`;

      return this;

    } else {

      let transformStr = getComputedStyle ( this[0], null )[property];

      return ( transformStr && transformStr !== 'none' ) ? transformStr.match ( /[0-9., e-]+/ )[0].split ( ', ' ).map ( value => parseFloat ( parseFloat ( value ).toFixed ( precision ) ) ) : [1, 0, 0, 1, 0, 0];

    }

  };

  /* TRANSFORMATIONS */

  let transformations = ['scaleX', 'skewY', 'skewX', 'scaleY', 'translateX', 'translateY']; // Their index is also the corresponsing index when applying `transform: matrix()`

  for ( let i = 0, l = transformations.length; i < l; i++ ) {

    $.fn[transformations[i]] = (function ( index ) { //TODO: Add not jquery-wrapped version fo this maybe

       return function ( value ) { //TODO: Maybe add an optional `_matrix` argument, so that we can batch reads and writes

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
      indexes2D = [[0, 3], [2, 1], [4, 5]];

  for ( let i = 0, l = transformations2D.length; i < l; i++ ) {

    $.fn[transformations2D[i]] = (function ( index ) { //TODO: Add not jquery-wrapped version fo this maybe

      return function ( X, Y = X ) { //TODO: Maybe add an optional `_matrix` argument, so that we can batch reads and writes

        let matrix = this.matrix (),
            indexes = indexes2D[index];

        if ( !_.isUndefined ( X ) && !_.isUndefined ( Y ) ) {

          matrix[indexes[0]] = X;
          matrix[indexes[1]] = Y;

          return this.matrix ( matrix );

        } else {

          return {
            x: matrix[indexes[0]],
            y: matrix[indexes[1]]
          };

        }

      }

    })( i );

  }

}( Svelto.$, Svelto._, Svelto.Modernizr, Svelto ));

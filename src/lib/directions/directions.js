
// @require core/svelto/svelto.js

(function ( $, _, Svelto ) {

  'use strict';

  /* DIRECTIONS */

  let Directions = {

    get () {

      return ['top', 'bottom', 'left', 'right'];

    },

    getOpposite ( direction ) {

      return {
        'top': 'bottom',
        'bottom': 'top',
        'left': 'right',
        'right': 'left'
      }[direction];

    }

  };

  /* EXPORT */

  Svelto.Directions = Directions;

}( Svelto.$, Svelto._, Svelto ));

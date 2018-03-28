
// @require core/svelto/svelto.js

(function ( $, _, Svelto ) {

  'use strict';

  /* OBSCURED */

  $.fn.obscured = function ( force ) {

    return this.toggleClass ( 'obscured', force );

  };

}( Svelto.$, Svelto._, Svelto ));

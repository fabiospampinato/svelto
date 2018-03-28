
// @require core/svelto/svelto.js

(function ( $, _, Svelto ) {

  /* BLURRED */

  $.fn.blurred = function ( force ) {

    return this.toggleClass ( 'blurred', force );

  };

}( Svelto.$, Svelto._, Svelto ));

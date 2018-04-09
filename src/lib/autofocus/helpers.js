
// @require ./autofocus.js

(function ( $, _, Svelto, Autofocus ) {

  /* AUTOFOCUS */

  $.fn.autofocus = function () {

    Autofocus.focus ( this );

    return this;

  };

  /* BLUR */

  $.fn.autoblur = function () {

    Autofocus.blur ( this );

    return this;

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Autofocus ));

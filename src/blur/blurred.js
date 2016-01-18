
/* =========================================================================
 * Svelto - Blurred
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* BLURRED */

  $.fn.blurred = function ( force ) {

    return this.toggleClass ( 'blurred', force );

  };

}( Svelto.$, Svelto._, Svelto ));

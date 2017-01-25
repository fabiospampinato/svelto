
/* =========================================================================
 * Svelto - Decorators - Obscured
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* OBSCURED */

  $.fn.obscured = function ( force ) {

    return this.toggleClass ( 'obscured', force );

  };

}( Svelto.$, Svelto._, Svelto ));

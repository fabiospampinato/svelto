
/* =========================================================================
 * Svelto - Widgets - Toast (Helper)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./toast.js
 * ========================================================================= */

(function ( $, _, Svelto, Toast ) {

  'use strict';

  /* HELPER */

  $.toast = function ( options = {} ) {

    /* OPTIONS */

    options = _.isPlainObject ( options ) ? options : { body: String ( options ) };

    /* TYPE */

    if ( options.buttons ) {

      options.type = 'action';

    }

    /* TOAST */

    return new Toast ( options );

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.Toast ));

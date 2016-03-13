
/* =========================================================================
 * Svelto - Widgets - Toast (Helper)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./toast.js
 * ========================================================================= */

//FIXME: Better handling of types, for instance numbers, booleans, null and undefined should print their string representation

(function ( $, _, Svelto, Widgets ) {

  'use strict';

  /* HELPER */

  $.toast = function ( options = {} ) {

    /* OPTIONS */

    options = _.isString ( options ) ? { body: options } : options;

    /* TYPE */

    if ( options.buttons ) {

      options.type = 'action';

    }

    /* TOAST */

    return new Widgets.Toast ( options );

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets ));
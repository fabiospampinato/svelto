
/* =========================================================================
 * Svelto - Noty (Helper)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./noty.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets ) {

  'use strict';

  /* HELPER */

  $.noty = function ( options = {} ) {

    /* OPTIONS */

    options = _.isString ( options ) ? { body: options } : options;

    /* TYPE */

    if ( options.buttons ) {

      options.type = 'action';

    }

    /* NOTY */

    return new Widgets.Noty ( options );

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets ));

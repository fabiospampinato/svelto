
/* =========================================================================
 * Svelto - Widgets - Progressbar (Helper)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./progressbar.js
 * ========================================================================= */

(function ( $, _, Svelto, Progressbar ) {

  'use strict';

  /* HELPER */

  $.progressbar = function ( options ) {

    options = _.isNumber ( options ) ? { value: options } : options;

    return new Progressbar ( options );

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.Progressbar ));

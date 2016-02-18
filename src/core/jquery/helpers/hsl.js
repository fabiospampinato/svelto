
/* =========================================================================
 * Svelto - Core - jQuery - Helpers (HSL)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

//FIXME: I'm not sure if this plugin should exists

// It only works for setting

(function ( $ ) {

  'use strict';

  /* HSL */

  $.fn.hsl = function ( h, s, l ) {

    return this.css ( 'background-color', 'hsl(' + h + ',' + s + '%,' + l + '%)' );

  };

}( jQuery ));

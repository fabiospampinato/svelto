
/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Is focused)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( $ ) {

  'use strict';

  /* IS FOCUSED */

  $.isFocused = function ( ele ) {

    return ele === document.activeElement && ( !document.hasFocus || document.hasFocus () ) && !!( ele.type || ele.href || ~ele.tabIndex );

  };

  $.fn.isFocused = function () {

    return $.isFocused ( this[0] );

  };

}( jQuery ));

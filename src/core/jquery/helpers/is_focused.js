
// @require ../init.js

(function ( $ ) {

  /* IS FOCUSED */

  $.isFocused = function ( ele ) {

    return ele === document.activeElement && ( !document.hasFocus || document.hasFocus () ) && !!( ele.type || ele.href || ~ele.tabIndex );

  };

  $.fn.isFocused = function () {

    return $.isFocused ( this[0] );

  };

}( window.__svelto_jquery ));

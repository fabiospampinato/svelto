
// @require ../init.js

//SOURCE: jQuery UI

(function ( $ ) {

  /* SELECTION */

  $.fn.disableSelection = (function () {

    let event = ( 'onselectstart' in document.createElement ( 'div' ) ) ? 'selectstart' : 'mousedown';

    return function () {

      return this.on ( event + '.svelto-disable-selection', event => event.preventDefault () );

    };

  })();

  $.fn.enableSelection = function () {

    return this.off ( '.svelto-disable-selection' );

  };

}( window.__svelto_jquery ));


// @require ../init.js

//SOURCE: jQuery UI

(function ( $ ) {

  /* SELECTION */

  const preventer = event => event.preventDefault ();

  $.fn.disableSelection = function () {

    return this.on ( 'selectstart', preventer );

  };

  $.fn.enableSelection = function () {

    return this.off ( 'selectstart', preventer );

  };

}( window.$ ));

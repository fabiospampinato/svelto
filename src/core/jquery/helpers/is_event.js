
// @require ../init.js

(function ( $ ) {

  /* IS EVENT */ // Checks if a variable is an event

  $.isEvent = function ( x ) {

    return typeof x === 'object' && ( ( window.Event && x instanceof window.Event ) || ( window.CustomEvent && x instanceof window.CustomEvent ) || ( $.Event && x instanceof $.Event ) );

  };

}( window.$ ));

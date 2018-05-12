
// @require ../init.js

(function ( $ ) {

  /* IS DEFAULT PREVENTED */ // In order to support non-jQuery DOM libraries like cash

  $.isDefaultPrevented = function ( event ) {

    return ( 'isDefaultPrevented' in event ) ? event.isDefaultPrevented : event.defaultPrevented;

  };

}( window.$ ));


// @require ../init.js
// @require core/lodash/lodash.js

(function ( $, _ ) {

  /* UTILTIES */

  function parseEventName( fullName ) {
    const parts = fullName.split ( '.' );
    return [parts[0], parts.slice ( 1 ).join ( '.' )]; // [name, namespaces]
  }

  /* MAKE EVENT */ // Creates an event by name

  $.makeEvent = function ( fullName, originalEvent ) {

    let [name, namespaces] = parseEventName ( fullName ),
        event;

    if ( $.Event ) {

      event = new $.Event ( originalEvent || name );
      event.type = name;

    } else {

      event = document.createEvent ( 'HTMLEvents' );
      event.initEvent ( name, true, false );
      event.originalEvent = originalEvent;

    }

    event.namespace = namespaces;

    return event;

  };

}( window.$, window._ ));

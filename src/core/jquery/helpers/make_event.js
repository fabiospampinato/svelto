
// @require ../init.js

(function ( $ ) {

  /* UTILITIES */

  const returnTrue = () => true,
        returnFalse = () => false;

  /* MAKE EVENT */ // Creates an event by name

  $.makeEvent = function ( name, originalEvent ) {

    let event;

    if ( $.Event ) {

      event = new $.Event ( originalEvent || name );
      event.type = name;

    } else { // Adding jQuery-like methods

      event = document.createEvent ( 'HTMLEvents' );
      event.initEvent ( name, true, false );

      event.isDefaultPrevented = function () {
        return this.defaultPrevented;
      };

      event.isPropagationStopped = returnFalse;
      const stopPropagation = event.stopPropagation;
      event.stopPropagation = function () {
        event.isPropagationStopped = returnTrue;
        return stopPropagation.call ( this );
      };

      event.isImmediatePropagationStopped = returnFalse;
      const stopImmediatePropagation = event.stopImmediatePropagation;
      event.stopImmediatePropagation = function () {
        event.isPropagationStopped = returnTrue;
        event.isImmediatePropagationStopped = returnTrue;
        return stopImmediatePropagation.call ( this );
      };

      event.originalEvent = originalEvent;

    }

    return event;

  };

}( window.$ ));

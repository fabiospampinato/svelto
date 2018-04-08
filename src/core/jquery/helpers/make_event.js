
// @require ../init.js
// @require core/lodash/lodash.js

(function ( $, _ ) {

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

      event.isPropagationStopped = _.false;
      const stopPropagation = event.stopPropagation;
      event.stopPropagation = function () {
        event.isPropagationStopped = _.true;
        return stopPropagation.call ( this );
      };

      event.isImmediatePropagationStopped = _.false;
      const stopImmediatePropagation = event.stopImmediatePropagation;
      event.stopImmediatePropagation = function () {
        event.isPropagationStopped = _.true;
        event.isImmediatePropagationStopped = _.true;
        return stopImmediatePropagation.call ( this );
      };

      event.originalEvent = originalEvent;

    }

    return event;

  };

}( window.$, window._ ));

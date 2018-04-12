
// @require ../init.js

(function ( $ ) {

  /* EVENT NAMESPACER */

  const eventsSeparatorRe = /[,\s]+/g;

  $.eventNamespacer = function ( events, namespace ) {

    return events.split ( eventsSeparatorRe ).map ( event => `${event}${namespace}` ).join ( ' ' );

  };

}( window.$ ));

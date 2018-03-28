
// @require ../init.js

(function ( $ ) {

  'use strict';

  /* ON READY */

  $.onReady = function ( callback ) { //TODO: Remove after migrating to cash or zepto
    if ( document.readyState !== 'loading' ) return callback ();
    return document.addEventListener ( 'DOMContentLoaded', callback );
  }

}( window.__svelto_jquery ));

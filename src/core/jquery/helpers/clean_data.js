
// @require ../init.js

// Monkey patching the internal `$.cleanData` method so that we can properly destroy widgets instances when their relative elements are removed
//SOURCE: jQuery UI's Widget

(function ( $ ) {

  /* CLEAN DATA */

  const _cleanData = $.cleanData;

  $.cleanData = function ( eles ) {

    for ( let i = 0, ele; ( ele = eles[i] ) !== undefined; i++ ) {

			let events = $._data ( ele, 'events' );

			if ( events && events.remove ) {

				$(ele).triggerHandler ( 'remove' );

			}

    }

    _cleanData ( eles );

	};

}( window.__svelto_jquery ));

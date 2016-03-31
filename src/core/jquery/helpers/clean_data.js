
/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Clean data)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

// Monkey patching the internal `$.cleanData` method so that we can properly destroy widgets instances when their relative elements are removed
//SOURCE: jQuery UI's Widget

(function ( $ ) {

  'use strict';

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

}( jQuery ));

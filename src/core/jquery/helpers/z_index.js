
/* =========================================================================
 * Svelto - jQuery - Helpers - Z Index
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/lodash/lodash.js
 * ========================================================================= */

//SOURCE: jQuery UI

(function ( $, _ ) {

  'use strict';

  /* Z INDEX */

	$.fn.zIndex = function ( val ) {

    if ( !_.isUndefined ( val ) ) {

      return this.css ( 'zIndex', val );

    }

		if ( !this.length ) return 0;

		let $elem = this.eq ( 0 ),
        position,
        value;

		while ( $elem.length && $elem[0] !== document ) {

			// Ignore z-index if position is set to a value where z-index is ignored by the browser
			// This makes behavior of this function consistent across browsers
			// WebKit always returns auto if the element is positioned

      position = $elem.css ( 'position' );

      if ( ['absolute', 'relative', 'fixed'].includes ( position ) ) {

				// IE returns 0 when zIndex is not specified
				// other browsers return a string
				// we ignore the case of nested elements with an explicit value of 0
				// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>

				value = parseInt ( $elem.css ( 'zIndex' ), 10 );

				if ( !_.isNaN ( value ) && value !== 0 ) {

					return value;

				}

			}

			$elem = $elem.parent ();

		}

    return 0;

	};

}( jQuery, lodash ));

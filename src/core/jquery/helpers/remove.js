
// @require ../init.js

// Triggering a `remove` event, so that we can properly destroy widgets instances when their relative elements are removed

(function ( $ ) {

  /* REMOVE */

  const _remove = $.fn.remove;

  $.fn.remove = function () {

    this.trigger ( 'remove' );

    _remove.call ( this );

	};

}( window.__svelto_jquery ));

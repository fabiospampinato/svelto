
/* =========================================================================
 * Svelto - jQuery (Extras) v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../browser/browser.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* JQUERY EXTRA */

  $.reflow = function () {

    document.documentElement.offsetHeight; //INFO: Requesting the `offsetHeight` property triggers a reflow. Necessary, so that the deferred callback will be executed in another cycle

  };

  $.eventXY = function ( event ) {

    if ( event.isPointerEvent ) { //INFO: Has been created using the `Pointer` abstraction

      event = event.originalEvent;

    }

    if ( $.browser.is.touchDevice && event.originalEvent.touches ) {

      event = event.originalEvent.changedTouches ? event.originalEvent.changedTouches[0] : event.originalEvent.touches[0];

    }

    return {
      X: event.pageX,
      Y: event.pageY
    };

  };

  $.frame = function ( callback ) {

    return requestAnimationFrame ( callback );

  };

  $.hasCtrlOrCmd = function ( event ) {

    return ( !$.browser.is.mac && event.ctrlKey ) || ( $.browser.is.mac && event.metaKey );

  };

  $.fn.getRect = function () {

    return this.length > 0 ? this[0].getBoundingClientRect () : undefined;

  };

  /* COMMON OBJECTS */

  $(function () {

    window.$window = $(window);
    window.$document = $(document);
    window.$html = $(document.documentElement);
    window.$body = $(document.body);
    window.$empty = $();

  });

}( jQuery, _, window, document ));

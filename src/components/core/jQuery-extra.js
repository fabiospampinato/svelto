
/* JQUERY EXTRA */

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

        if ( $.browser.hasTouch && event.originalEvent.touches ) {

            event = event.originalEvent.changedTouches ? event.originalEvent.changedTouches[0] : event.originalEvent.touches[0];

        }

        return {
            X: event.pageX,
            Y: event.pageY
        };

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

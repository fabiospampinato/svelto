
/* JQUERY EXTRA */

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* JQUERY EXTRA */

    $.reflow = function () {

        document.documentElement.offsetHeight; //INFO: Requesting the `offsetHeight` property triggers a reflow. Necessary, so that the deferred callback will be executed in another cycle

    };

    $.eventXY = function ( event ) {

        var coordinates = {
            X : 0,
            Y : 0
        };

        if ( !_.isUndefined ( event.originalEvent ) ) {

            event = event.originalEvent;

        }

        if ( !_.isUndefined ( event.touches ) && !_.isUndefined ( event.touches[0] ) ) {

            coordinates.X = event.touches[0].pageX;
            coordinates.Y = event.touches[0].pageY;

        } else if ( !_.isUndefined ( event.changedTouches ) && !_.isUndefined ( event.changedTouches[0] ) ) {

            coordinates.X = event.changedTouches[0].pageX;
            coordinates.Y = event.changedTouches[0].pageY;

        } else if ( !_.isUndefined ( event.pageX ) ) {

            coordinates.X = event.pageX;
            coordinates.Y = event.pageY;

        }

        return coordinates;

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

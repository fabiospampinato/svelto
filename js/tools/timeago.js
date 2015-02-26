
/* TIMEAGO */

$.fn.timeago = function () {

    return this.each ( function ( node ) {

        var $ele = $(node),
            timestamp = $ele.data ( 'timestamp' );

        var update = function ( wait ) {

            setTimeout ( function () {

                var timeago = get_time_ago ( timestamp );

                $ele.html ( timeago.str );

                update ( timeago.next );

            }, wait * 1000 );

        };

        update ( 0 );

    });

};

/* READY */

$.dom_ready ( function () {

    $('[data-timestamp]').timeago ();

});

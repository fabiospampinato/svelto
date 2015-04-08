
/* TIMEAGO */


;(function ( $, window, document, undefined ) {

    /* PLUGIN */

    $.factory ( 'timeago', {

        onUpdate: $.noop

    }, {

        /* SPECIAL */

        init: function () {

            this.timestamp = this.$node.data ( 'timestamp' );

            this._update_loop ( 0 );

        },

        ready: function () {

            $('[data-timestamp]').timeago ();

        },

        /* PRIVATE */

        _update_loop: function ( wait ) {

            setTimeout ( function () {

                var timeago = get_time_ago ( this.timestamp );

                this.$node.html ( timeago.str );

                this.hook ( 'onUpdate' );

                this._update_loop ( timeago.next );

            }, wait * 1000 );

        },

        /* PUBLIC */

        update: function () {

            var timeago = get_time_ago ( this.timestamp );

            this.$node.html ( timeago.str );

            this.hook ( 'onUpdate' );

        }

    });

}( lQuery, window, document ));


/* TIMEAGO */


;(function ( $, window, document, undefined ) {

    /* PLUGIN */

    $.factory ( 'timeAgo', {

        onUpdate: $.noop

    }, {

        /* SPECIAL */

        init: function () {

            this.timestamp = this.$node.data ( 'timestamp' );

            this._update_loop ( 0 );

        },

        ready: function () {

            $('[data-timestamp]').timeAgo ();

        },

        /* PRIVATE */

        _update_loop: function ( wait ) {

            var instance = this;

            setTimeout ( function () {

                var timeago = _.timeAgo ( instance.timestamp );

                instance.$node.html ( timeago.str );

                instance.hook ( 'onUpdate' );

                instance._update_loop ( timeago.next );

            }, wait * 1000 );

        },

        /* PUBLIC */

        update: function () {

            var timeago = _.timeAgo ( this.timestamp );

            this.$node.html ( timeago.str );

            this.hook ( 'onUpdate' );

        }

    });

}( lQuery, window, document ));

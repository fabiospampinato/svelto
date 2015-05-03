
/* TIMEAGO */


;(function ( $, window, document, undefined ) {

    'use strict';

    $.factory ( 'presto.timeAgo', {

        /* OPTIONS */

        options: {
            onUpdate: $.noop
        },

        /* SPECIAL */

        _ready: function () {

            $('[data-timestamp]').timeAgo ();

        },

        _create: function () {

            this.timestamp = this.$element.data ( 'timestamp' );

            this._update_loop ( 0 );

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

            this.$element.html ( timeago.str );

            this.hook ( 'onUpdate' );

        }

    });

}( lQuery, window, document ));

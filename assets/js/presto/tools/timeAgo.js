
/* TIME AGO */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* TIME AGO */

    $.widget ( 'presto.timeAgo', {

        /* OPTIONS */

        options: {
            timestamp: false,
            callbacks: {
                update: $.noop
            }
        },

        /* SPECIAL */

        _create: function () {

            this.options.timestamp = this.$element.data ( 'timestamp' ) || this.options.timestamp;

            this._update_loop ( 0 );

        },

        /* PRIVATE */

        _update_loop: function ( wait ) {

            var instance = this;

            setTimeout ( function () {

                instance._update_loop ( instance.update ().next );

            }, wait * 1000 );

        },

        /* PUBLIC */

        update: function () {

            var timeAgo = _.timeAgo ( this.options.timestamp );

            this.$element.html ( timeAgo.str );

            this._trigger ( 'update' );

            return timeAgo;

        }

    });

    /* READY */

    $(function () {

        $('[data-timestamp]').timeAgo ();

    });

}( lQuery, window, document ));

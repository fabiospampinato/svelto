
/* INFOBAR */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* INFOBAR */

    $.widget ( 'presto.infobar', {

        /* OPTIONS */

        options: {
            delay: {
                close: 150
            },
            callbacks: {
                close: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$infobar = this.$element;
            this.$closers = this.$infobar.find ( '.infobar-closer' );

        },

        _events: function () {

            this._on ( this.$closers, 'click', this.close );

        },

        /* PUBLIC */

        close: function () {

            this.$infobar.addClass ( 'remove' );

            this._delay ( function () {

                this.$infobar.remove ();

                this._trigger ( 'close' );

            }, this.options.delay.close );

        }

    });

    /* READY */

    $(function () {

        $('.infobar-wrp').infobar ();

    });

}( lQuery, window, document ));

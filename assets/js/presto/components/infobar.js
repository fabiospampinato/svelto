
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

            this.$closers = this.$element.find ( '.infobar-closer' );

        },

        _events: function () {

            this._on ( this.$closers, 'click', this.close );

        },

        /* PUBLIC */

        close: function () {

            this.$element.addClass ( 'remove' );

            this._delay ( function () {

                this.$element.remove ();

                this._trigger ( 'close' );

            }, this.options.delay.close );

        }

    });

    /* READY */

    $(function () {

        $('.infobar-wrp').infobar ();

    });

}( lQuery, window, document ));

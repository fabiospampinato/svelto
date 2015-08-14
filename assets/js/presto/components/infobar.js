
/* INFOBAR */

//TODO: maybe add the ability to open it
//TODO: maybe just hiding it on close is enough, do we gain a performance benefit this way?

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* INFOBAR */

    $.widget ( 'presto.infobar', {

        /* OPTIONS */

        options: {
            selectors: {
                closer: '.infobar-closer'
            },
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

        },

        _events: function () {

            this._on ( 'click', this.options.selectors.closer, this.close );

        },

        /* PUBLIC */

        close: function () {

            this.$infobar.addClass ( 'remove' ).slideUp ( this.options.delay.close ); //FIXME: the animation is too expensive

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

}( jQuery, _, window, document ));

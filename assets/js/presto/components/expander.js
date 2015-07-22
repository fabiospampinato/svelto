
/* EXPANDER */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* EXPANDER */

    $.widget ( 'presto.expander', {

        /* OPTIONS */

        options: {
            callbacks: {
                open: $.noop,
                close: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$expander = this.$element;
            this.$togglers = this.$expander.find ( '.expander-toggler' );

            this.opened = this.$expander.hasClass ( 'opened' );

        },

        // _init: function () {

        //     if ( !this.opened ) this.close ( true ); //INFO: If is opened the CSS takes care of everything

        // },

        _events: function () {

            this._on ( this.$togglers, 'click', this.toggle );

        },

        /* PUBLIC */

        toggle: function () {

            this[this.opened ? 'close' : 'open']();

        },

        open: function () {

            if ( !this.opened ) {

                this.opened = true;

                this.$expander.addClass ( 'opened' );

                this._trigger ( 'open' );

            }

        },

        close: function () {

            if ( this.opened ) {

                this.opened = false;

                this.$expander.removeClass ( 'opened' );

                this._trigger ( 'close' );

            }

        }

    });

    /* READY */

    $(function () {

        $('.expander').expander ();

    });

}( lQuery, window, document ));

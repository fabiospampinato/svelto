
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
            this.$header = this.$expander.children ( '.header' );
            this.$content = this.$expander.children ( '.content' );

            this.opened = this.$expander.hasClass ( 'opened' );

        },

        _init: function () {

            if ( !this.opened ) this.close ( true );

        },

        _events: function () {

            this._on ( this.$header, 'click', this.toggle );

        },

        /* PUBLIC */

        toggle: function () {

            this[this.opened ? 'close' : 'open']();

        },

        open: function ( force ) {

            if ( !this.opened || force ) {

                this.opened = true;

                this.$expander.addClass ( 'opened' );

                this._trigger ( 'open' );

            }

        },

        close: function ( force ) {

            if ( this.opened || force ) {

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


/* NAVBAR */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* NAVBAR */

    $.widget ( 'presto.navbar', {

        /* OPTIONS */

        options: {
            callbacks: {
                open: $.noop,
                close: $.noop
            }
        },

        /* SPECIAL */

        _create: function () {

            this.id = this.$element.attr ( 'id' );
            this.$wrp = this.$element.parent ();
            this.$closers = this.$wrp.find ( '.navbar-closer' );

            this.opened = this.$wrp.hasClass ( 'opened' );

            this.$triggers = $('.navbar-trigger[data-navbar="' + this.id + '"]');

            this._bind_closer_click ();
            this._bind_trigger_click ();

        },

        /* CLOSER CLICK */

        _bind_closer_click: function () {

            this._on ( this.$closers, 'click', this.close );

        },

        /* TRIGGER CLICK */

        _bind_trigger_click: function () {

            this._on ( this.$triggers, 'click', this.open );

        },

        /* PUBLIC */

        toggle: function ( force ) {

            if ( _.isUndefined ( force ) ) {

                this.opened = !this.opened;

            } else {

                if ( this.opened === force ) return;

                this.opened = force;

            }

            this.$wrp.toggleClass ( 'opened', this.opened );

            this._trigger ( this.opened ? 'open' : 'close' );

        },

        open: function () {

            this.toggle ( true );

        },

        close: function () {

            this.toggle ( false );

        }

    });

    /* READY */

    $(function () {

        $('.navbar').navbar ();

    });

}( lQuery, window, document ));

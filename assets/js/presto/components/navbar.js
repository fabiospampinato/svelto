
/* NAVBAR */

//TODO: make it work better with attachables: se è già aperta non fare niente al background

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* NAVBAR */

    $.widget ( 'presto.navbar', {

        /* OPTIONS */

        options: {
            callbacks: {
                open: _.noop,
                close: _.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$navbar = this.$element;
            this.id = this.$navbar.attr ( 'id' );
            this.$wrp = this.$navbar.parent ();
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

}( jQuery, _, window, document ));


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

        _create: function () {

            this.$header = this.$element.children ( '.header' );
            this.$content = this.$element.children ( '.content' );

            this.opened = this.$element.hasClass ( 'opened' );

            if ( !this.opened ) this.close ();

            this._bind_click ();

        },

        /* PRIVATE */

        _bind_click: function () {

            this._on ( this.$header, 'click', this.toggle );

        },

        /* PUBLIC */

        toggle: function () {

            this.opened = !this.opened;

            this[this.opened ? 'open' : 'close']();

        },

        open: function () {

            this.$element.addClass ( 'opened' );
            this.$content.toggleHeight ( true );

            this._trigger ( 'open' );

        },

        close: function () {

            this.$element.removeClass ( 'opened' );
            this.$content.toggleHeight ( false );

            this._trigger ( 'close' );

        }

    });

    /* READY */

    $(function () {

        $('.expander').expander ();

    });

}( lQuery, window, document ));

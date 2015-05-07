
/* EXPANDER */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* EXPANDER */

    $.widget ( 'presto.expander', {

        /* SPECIAL */

        _create: function () {

            this.$header = this.$element.children ( '.header' );
            this.$content_wrp = this.$element.children ( '.content' );
            this.opened = this.$element.hasClass ( 'active' );

            this._bind_click ();

        },

        /* PRIVATE */

        _bind_click: function () {

            this.$header.on ( 'click', this._handler_click );

        },

        _handler_click: function ( event ) {

            if ( this.$element.hasClass ( 'inactive' ) ) return;

            this.opened = !this.opened;

            var opened;

            this.$element.defer ( function () {

                this.toggleClass ( 'active', opened );

            });

            this.$header.defer ( function () {

                this.toggleClass ( 'active', opened );

            });

            this.$content_wrp.toggleHeight ( this.opened );

        }

    });

    /* READY */

    $(function () {

        $('.expander').expander ();

    });

}( lQuery, window, document ));

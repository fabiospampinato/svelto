
/* EXPANDER */

;(function ( $, window, document, undefined ) {

    $.factory ( 'expander', {

        /* SPECIAL */

        init: function () {

            this.$header = this.$node.children ( '.header' );
            this.$content_wrp = this.$node.children ( '.content' );
            this.opened = this.$node.hasClass ( 'active' );

            this._bind_click ();

        },

        ready: function () {

            $('.expander').expander ();

        },

        /* PRIVATE */

        _bind_click: function () {

            this.$header.on ( 'click', this._handler_click );

        },

        _handler_click: function ( event ) {

            if ( this.$node.hasClass ( 'inactive' ) ) return;

            this.opened = !this.opened;

            var opened;

            this.$node.defer ( function () {

                this.toggleClass ( 'active', opened );

            });

            this.$header.defer ( function () {

                this.toggleClass ( 'active', opened );

            });

            this.$content_wrp.toggleHeight ( this.opened );

        }

    });

}( lQuery, window, document ));

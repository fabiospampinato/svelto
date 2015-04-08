
/* ACCORDION */

;(function ( $, window, document, undefined ) {

    $.factory ( 'accordion', {

        /* SPECIAL */

        init: function () {

            this.$accordions = this.$node.find ( '.accordion' );

            for ( var i = 0, l = this.$accordions.length; i < l; i++ ) {

                this._init_accordion ( this.$accordions.nodes[i] );

            }

        },

        ready: function () {

            $('.accordions_wrp').accordion ();

        },

        /* ACCORDION */

        _init_accordion: function ( node ) {

            var $accordion = $(node),
                $header = $accordion.find ( '.header' ),
                $other_accordions = this.$accordions.not ( $accordion ),
                $other_headers = $other_accordions.find ( '.header' ).not ( $header );

            $header.on ( 'click', function () {

                if ( $accordion.hasClass ( 'inactive' ) ) return;

                var is_active = $accordion.hasClass ( 'active' );

                $accordion.toggleClass ( 'active', !is_active );
                $header.toggleClass ( 'active', !is_active );

                $other_accordions.removeClass ( 'active' );
                $other_headers.removeClass ( 'active' );

            });

        }

    });

}( lQuery, window, document ));

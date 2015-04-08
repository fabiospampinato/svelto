
/* PROGRESS BAR */

;(function ( $, window, document, undefined ) {

    $.factory ( 'progress_bar', {

        /* SPECIAL */

        init: function () {

            this.$highlighted = this.$nodes.find ( '.highlighted' ),
            this.$label = this.$highlighted.find ( '.label' ),
            this.data_percentage = this.$nodes.data ( 'percentage' );

        },

        call: function ( percentage ) {

            if ( this.$nodes.hasClass ( 'fixed' ) ) return;

            if ( this.data_percentage !== null || typeof percentage !== 'undefined' ) {

                var percentage_nr = ( percentage === 'default' || typeof percentage === 'undefined' ) ? this.data_percentage / this.$highlighted.length : percentage / this.$highlighted.length;

                this.$highlighted.css ( 'min-width', percentage_nr + '%' );

                this.$label.html ( percentage_nr + '%' );

            }

        },

        ready: function () {

            $('.progress_bar').progress_bar ();

        }

    });

}( lQuery, window, document ));

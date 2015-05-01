
/* PROGRESS BAR */

//TODO: add support for specific widths for each section

;(function ( $, window, document, undefined ) {

    $.factory ( 'progressBar', {

        /* SPECIAL */

        init: function () {

            this.$highlighted = this.$node.find ( '.highlighted' ),
            this.$label = this.$highlighted.find ( '.label' ),
            this.data_percentage = this.$node.data ( 'percentage' );

        },

        call: function ( percentage ) {

            if ( this.$node.hasClass ( 'fixed' ) ) return;

            if ( this.data_percentage !== undefined || percentage !== undefined ) {

                var percentage_nr = ( percentage === undefined ) ? this.data_percentage / this.$highlighted.length : percentage / this.$highlighted.length;

                this.$highlighted.css ( 'min-width', percentage_nr + '%' );

                this.$label.html ( percentage_nr + '%' );

            }

        },

        ready: function () {

            $('.progressBar').progressBar ();

        }

    });

}( lQuery, window, document ));

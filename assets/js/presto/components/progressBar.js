
/* PROGRESS BAR */

//TODO: add support for specific widths for each section

;(function ( $, window, document, undefined ) {

    'use strict';

    /* PROGRESS BAR */

    $.widget ( 'presto.progressBar', {

        /* SPECIAL */

        _create: function () {

            this.$highlighted = this.$element.find ( '.highlighted' ),
            this.$label = this.$highlighted.find ( '.label' ),
            this.data_percentage = this.$element.data ( 'percentage' );

        },

        _init: function ( percentage ) { //FIXME

            if ( this.$element.hasClass ( 'fixed' ) ) return;

            if ( this.data_percentage !== undefined || percentage !== undefined ) {

                var percentage_nr = ( percentage === undefined ) ? this.data_percentage / this.$highlighted.length : percentage / this.$highlighted.length;

                this.$highlighted.css ( 'min-width', percentage_nr + '%' );

                this.$label.html ( percentage_nr + '%' );

            }

        }

    });

    /* READY */

    $(function () {

        $('.progressBar').progressBar ();

    });

}( lQuery, window, document ));

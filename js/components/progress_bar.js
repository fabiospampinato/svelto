
/* PROGRESS BAR */

$.fn.progress_bar = function ( percentage ) {

    return this.each ( function ( node ) {

        var $progress_bar = $(node),
            $highlighted = $progress_bar.find ( '.highlighted' ),
            $label = $highlighted.find ( '.label' ),
            data_percentage = $progress_bar.data ( 'percentage' );

        if ( $progress_bar.hasClass ( 'fixed' ) ) return;

        if ( data_percentage !== null || typeof percentage !== 'undefined' ) {

            var percentage_nr = ( percentage === 'default' || typeof percentage === 'undefined' ) ? data_percentage / $highlighted.size () : percentage / $highlighted.size ();

            $highlighted.css ( 'min-width', percentage_nr + '%' );
            $label.html ( percentage_nr + '%' );

        }

    });

};

/* READY */

$.dom_ready ( function () {

    $('.progress_bar').progress_bar ();

});

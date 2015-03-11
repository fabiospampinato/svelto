
/* EXPANDER */

$.fn.expander = function () {

    return this.each ( function ( node ) {

        var $expander = $(node),
            $header = $expander.children ( '.header' ),
            $content_wrp = $expander.children ( '.content_wrp' ),
            opened = $expander.hasClass ( 'active' );

        $header.on ( 'click', function () {

            if ( $expander.hasClass ( 'inactive' ) ) return;

            opened = !opened;

            $.defer ( function () {

                $expander.toggleClass ( 'active', opened );
                $header.toggleClass ( 'active', opened );

            });

            $content_wrp.toggleHeight ( opened );

        });

    });

};

/* READY */

$.dom_ready ( function () {

    $('.expander').expander ();

});

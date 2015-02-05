
/* EXPANDER */

$.fn.expander = function () {

    return this.each ( function ( node ) {

        var $expander = $(node),
            $header = $expander.children ( '.header' ),
            $content = $expander.children ( '.content' ),
            opened = $expander.hasClass ( 'active' );

        $header.on ( 'click', function () {

            if ( $expander.hasClass ( 'inactive' ) ) return;

            opened = !opened;

            $expander.toggleClass ( 'active', opened );
            $header.toggleClass ( 'active', opened );

        });

    });

};

/* READY */

$.dom_ready ( function () {

    $('.expander').expander ();

});

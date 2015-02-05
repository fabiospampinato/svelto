
/* ACCORDION */

$.fn.accordion = function () {

    return this.each ( function ( node ) {

        var $wrp = $(node),
            $accordions = $wrp.find ( '.accordion' );

        $accordions.each ( function ( node ) {

            var $accordion = $(node),
                $header = $accordion.find ( '.header' ),
                $other_accordions = $accordions.not ( $accordion ),
                $other_headers = $other_accordions.find ( '.header' ).not ( $header );

            $header.on ( 'click', function () {

                if ( $accordion.hasClass ( 'inactive' ) ) return;

                var is_active = $accordion.hasClass ( 'active' );

                $accordion.toggleClass ( 'active', !is_active );
                $header.toggleClass ( 'active', !is_active );

                $other_accordions.removeClass ( 'active' );
                $other_headers.removeClass ( 'active' );

            });

        });

    });

};

/* READY */

$.dom_ready ( function () {

    $('.accordions_wrp').accordion ();

});

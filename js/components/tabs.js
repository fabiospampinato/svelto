
/* TABS */

$.fn.tabs = function () {

    return this.each ( function ( node ) {

        var $wrp = $(node),
            $tabs = $wrp.find ( '.tab' ),
            $contabs = $wrp.find ( '.contab' );

        $tabs.each ( function ( node ) {

            var $tab = $(node),
                $contab = $contabs.eq ( $tabs.index ( $tab ) ),
                to_bottom = $contab.hasClass ( 'to_bottom' ),
                $top_section = $contab.find ( '.top_section' ),
                $main_section = ( $top_section.size () !== 0 ) ? $top_section : $contab;

            $tab.on ( 'click', function () {

                if ( $tab.hasClass ( 'inactive' ) || $tab.hasClass ( 'active' ) ) return;

                $tabs.removeClass ( 'active highlight' );
                $contabs.removeClass ( 'active' );

                $tab.addClass ( 'active highlight' );
                $contab.addClass ( 'active' );

                if ( to_bottom ) {

                    $main_section.scrollBottom ( 0 );

                }

            });

        });

    });

};

/* READY */

$.dom_ready ( function () {

    $('.tabs_wrp').tabs ();

});

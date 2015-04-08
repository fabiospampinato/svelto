
/* TABS */

;(function ( $, window, document, undefined ) {

    $.factory ( 'tabs', {

        init: function () {

            $tabs = this.$node.find ( '.tab' ),
            $contabs = this.$node.find ( '.contab' );

            $tabs.each ( function () {

                var $tab = $(this),
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

        },

        ready: function () {

            $('.tabs_wrp').tabs ();

        }

    });

}( lQuery, window, document ));

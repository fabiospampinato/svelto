
/* SIDEBAR */

var $sidebar_btn = false;

var sidebar_init_events = function () {

    $sidebar_btn = $('#sidebar_toggler');

    $sidebar_btn.on ( 'click', function () {

        if ( $html.hasClass ( 'menu_open' ) ) {

            menu_toggle ( false );

        }

        var opened = $html.hasClass ( 'sidebar_open' );

        sidebar_toggle ( !opened );

    });

};

var sidebar_toggle = function ( open ) {

    $html.toggleClass ( 'sidebar_open', open );
    $sidebar_btn.toggleClass ( 'active', open );

};

/* READY */

$.ready ( function () {

    sidebar_init_events ();

});

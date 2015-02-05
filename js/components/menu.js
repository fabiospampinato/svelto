
/* MENU */

var $menu_btn = false;
var $hamburger = false;

var menu_init_events = function () {

    $menu_btn = $('#menu_btn');
    $hamburger = $menu_btn.find ( '.layer' );

    $menu_btn.on ( 'click', function () {

        if ( $html.hasClass ( 'sidebar_open' ) ) {

            sidebar_toggle ( false );

        }

        var opened = $html.hasClass ( 'menu_open' );

        menu_toggle ( !opened );

    });

};

var menu_toggle = function ( open ) {

    $html.toggleClass ( 'menu_open', open );
    $menu_btn.toggleClass ( 'active', open );

    $hamburger.toggleClass ( 'from_arrow', !open );
    $hamburger.toggleClass ( 'to_arrow', open );

};

/* READY */

$.dom_ready ( function () {

    menu_init_events ();

});

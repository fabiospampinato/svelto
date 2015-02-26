
/* MODALS */

$.fn.modals = function () {

    return this.each ( function ( node ) {

        var $modal_btn = $(node),
            modal_id = $modal_btn.data ( 'modal' ),
            $modal = $('#' + modal_id),
            $closing = $modal.find ( '.closing' );

        var open = function () {

            $modal.addClass ( 'show' );

            $.defer ( function () {

                $modal.addClass ( 'active' );

            });

            $document.on ( 'keydown', esc_keydown_handler );

        };

        var close = function () {

            $modal.removeClass ( 'active' );

            $.defer ( function () {

                $modal.removeClass ( 'show' );

            }, 200 );

            $document.off ( 'keydown', esc_keydown_handler );

        };

        var esc_keydown_handler = function ( event ) {

            if ( event.keyCode === 27 ) { // esc

                close ();

            }

        };

        $modal_btn.on ( 'click', open );

        $closing.on ( 'click', close );

    });

};

/* READY */

$.dom_ready ( function () {

    $('.modal_trigger').modals ();

});

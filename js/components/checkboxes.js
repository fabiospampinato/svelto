
/* CHECKBOXES */

$.fn.checkbox = function () {

    return this.each ( function ( node ) {

        var $btn = $(node),
            $input = $btn.find ( 'input' );

        var toggle = function () {

            if ( $btn.hasClass ( 'inactive' ) ) return;

            var active = $input.checked ();

            $input.checked ( !active ).trigger ( 'change' );

        };

        var update = function () {

            var active = $input.checked ();

            $btn.toggleClass ( 'selected', active );

        };

        var init = function () {

            if ( $input.checked () ) {

                $btn.addClass ( 'selected' );

            } else if ( $btn.hasClass ( 'selected' ) ) {

                $input.checked ( true ).trigger ( 'change' );

            }

        };

        $btn.on ( 'click', function ( event ) {

            if ( event.target !== $input.get ( 0 ) ) toggle ();

        });

        $input.on ( 'change', update );

        init ();

    });

};

$.dom_ready ( function () {

    $('.checkbox').checkbox ();

});

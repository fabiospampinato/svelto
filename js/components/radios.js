
/* RADIOS */

$.fn.radio = function () {

    return this.each ( function ( node ) {

        var $btn = $(node),
            $input = $btn.find ( 'input' ),
            name = $input.attr ( 'name' ),
            $form = $btn.parent ( 'form' ),
            $radios = $form.find ( 'input[name="' + name + '"]' ),
            $btns = $radios.parent ( '.radio' );

        var select = function () {

            if ( $btn.hasClass ( 'inactive' ) ) return;

            $input.checked ( true ).trigger ( 'change' );

        };

        var update = function () {

            var active = $input.checked ();

            if ( active ) {

                $btns.removeClass ( 'selected' );

                $btn.addClass ( 'selected' );

            }

        };

        var init = function () {

            if ( $input.checked () ) {

                $btn.addClass ( 'selected' );

            } else if ( $btn.hasClass ( 'selected' ) ) {

                $input.checked ( true ).trigger ( 'change' );

            }

        };

        $btn.on ( 'click', select );

        $input.on ( 'change', update );

        init ();

    });

};

/* READY */

$.dom_ready ( function () {

    $('.radio').radio ();

});

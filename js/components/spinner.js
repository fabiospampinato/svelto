
/* SPINNER */

$.fn.spinner = function () {

    return this.each ( function ( node ) {

        // Functions

        var round_value = function ( value ) {

            return Number(value).toFixed(decimals);

        };

        var set_value = function ( value ) {

            value = round_value ( value );

            $input.val ( value ).trigger ( 'change' );
            $label.html ( value );

            $decrease_btn.toggleClass ( 'inactive', value === min );
            $increase_btn.toggleClass ( 'inactive', value === max );

        };

        var navigate = function ( modifier ) {

            var possible_new_value = current_value + modifier;

            if ( possible_new_value >= min && possible_new_value <= max ) {

                current_value = possible_new_value;

                set_value ( current_value );

            }

        };

        // Variables

        var $spinner = $(node),
            $input = $spinner.find ( 'input' ),
            $label = $spinner.find ( '.label' ),
            $decrease_btn = $spinner.find ( '.decrease' ),
            $increase_btn = $spinner.find ( '.increase' ),

            min = $spinner.data ( 'min' ),
            max = $spinner.data ( 'max' ),
            start = $spinner.data ( 'start' ) || $input.val () || 0,
            step = $spinner.data ( 'step' ) || 1,
            decimals = $spinner.data ( 'decimals' ) || 0,

            current_value = start;

        // Init

        set_value ( current_value );

        // Change event

        $input.on ( 'change', function () {

            var input_val = Number($input.val ());

            if ( input_val === current_value ) return;

            current_value = input_val;

            set_value ( current_value );

        });

        // Left / Right arrows events

        var doc_keydown_handler = function ( event ) {

            if ( event.keyCode === 37 ) { // left arrow

                navigate ( -step );

            } else if ( event.keyCode === 39 ) { // right arrow

                navigate ( step );

            }

        };

        $spinner.on ( 'mouseenter', function () {

            if ( $spinner.hasClass ( 'inactive' ) ) return;

            $document.on ( 'keydown', doc_keydown_handler );

        }).on ( 'mouseleave', function () {

            $document.off ( 'keydown', doc_keydown_handler );

        });

        // Navigation events

        $decrease_btn.on ( 'click', function () {

            if ( $spinner.hasClass ( 'inactive' ) ) return;

            navigate ( -step );

        });

        $increase_btn.on ( 'click', function () {

            if ( $spinner.hasClass ( 'inactive' ) ) return;

            navigate ( step );

        });

    });

};

/* READY */

$.dom_ready ( function () {

    $('.spinner').spinner ();

});

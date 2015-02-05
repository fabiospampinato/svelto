
/* SWITCHER */

$.fn.switcher = function ( options ) {

    return this.each ( function ( node ) {

        // Variables

        var $switcher = $(node),
            $bar = $switcher.find ( '.bar' ),
            $handler = $switcher.find ( '.handler' ),
            $icon = $switcher.find ( '.icon' ),
            $input = $switcher.find ( 'input' ),

            current_value = $input.checked (),
            dragging = false;

        // Options

        var options = _.merge ({
            theme: {
                on: $switcher.data ( 'theme-on' ) || 'secondary',
                off: $switcher.data ( 'theme-off' ) || 'gray'
            },
            icons: {
                on: $switcher.data ( 'icon-on' ) || false,
                off: $switcher.data ( 'icon-off' ) || false
            }
        }, options );

        // Functions

        var set_value = function ( value ) {

            $handler.css ( 'left', value ? '100%' : 0 );

            var inactive = $switcher.hasClass ( 'inactive' );

            $bar.toggleClass ( options.theme.on, value && !inactive );
            $handler.toggleClass ( options.theme.on, value && !inactive );

            $bar.toggleClass ( options.theme.off, !value );
            $handler.toggleClass ( options.theme.off, !value );

            if ( options.icons.on ) {

                $icon.toggleClass ( options.icons.on, value );

            }

            if ( options.icons.off ) {

                $icon.toggleClass ( options.icons.off, !value );

            }

            $input.checked ( value ).trigger ( 'change' );

        };

        var toggle = function () {

            current_value = !current_value;
            set_value ( current_value );

        };

        // Init

        set_value ( current_value );

        // Change event

        $input.on ( 'change', function () {

            var possible_new_value = $input.checked ();

            if ( possible_new_value == current_value ) return;

            current_value = possible_new_value;

            set_value ( current_value );

        });

        // Left / Right arrows events

        var doc_keydown_handler = function ( event ) {

            if ( event.keyCode == 37 ) { // left arrow

                if ( current_value !== false ) {

                    current_value = false;

                    set_value ( current_value );

                }

            } else if ( event.keyCode == 39 ) { // right arrow

                if ( current_value !== true ) {

                    current_value = true;

                    set_value ( current_value );

                }

            }

        };

        $switcher.on ( 'mouseenter', function () {

            if ( $switcher.hasClass ( 'inactive' ) ) return;

            $document.on ( 'keydown', doc_keydown_handler );

        }).on ( 'mouseleave', function () {

            $document.off ( 'keydown', doc_keydown_handler );

        });

        // Navigation events

        var click_handler = function () {

            if ( dragging || $switcher.hasClass ( 'inactive' ) ) return;

            toggle ();

        };

        $switcher.on ( 'click', click_handler );

        // Drag event

        var start_pos,
            bar_width,
            start_percentage;

        var drag_start_handler = function ( event ) {

            if ( $switcher.hasClass ( 'inactive' ) ) return;

            start_percentage = current_value ? 100 : 0;

            start_pos = get_event_pageXY ( event );
            bar_width = $bar.width ();

            $html.addClass ( 'dragging' );
            $switcher.addClass ( 'dragging' );

            $document.on ( 'mousemove touchmove', drag_move_handler );
            $document.on ( 'mouseup touchend', drag_end_handler );

        };

        var drag_move_handler = function ( event ) {

            dragging = true;

            var move_pos = get_event_pageXY ( event ),
                distance = move_pos.pageX - start_pos.pageX,
                abs_distance = Math.max ( -bar_width, Math.min ( Math.abs ( distance ), bar_width ) ),
                percentage = abs_distance * 100 / bar_width,
                possible_new_percentage = ( distance >= 0 ) ? start_percentage + percentage : start_percentage - percentage;

            $handler.css ( 'left', Math.max ( 0, Math.min ( 100, possible_new_percentage ) ) + '%' );

        };

        var drag_end_handler = function ( event ) {

            var end_pos = get_event_pageXY ( event ),
                bar_off = $bar.offset (),
                handler_off = $handler.offset ();

            current_value = ( handler_off.left + ( handler_off.width / 2 ) >= bar_off.left + ( bar_off.width / 2 ) );

            $html.removeClass ( 'dragging' );
            $switcher.removeClass ( 'dragging' );

            $document.off ( 'mousemove touchmove', drag_move_handler );
            $document.off ( 'mouseup touchend', drag_end_handler );

            set_value ( current_value );

            $.defer ( function () {

                dragging = false;

            });

        };

        $handler.on ( 'mousedown touchstart', drag_start_handler );

    });

};

/* READY */

$.dom_ready ( function () {

    $('.switcher').switcher ();

});


/* SLIDER */

$.fn.slider = function () {

    return this.each ( function ( node ) {

        // Functions

        var round_value = function ( value ) {

            return Number(value).toFixed(decimals);

        };

        var round_distance = function ( distance ) {

            var mod = distance % required_step_width,
                extra_step;

            if ( mod > 0 ) {

                extra_step = ( mod >= required_step_width / 2 ) ? 1 : 0;

                distance = ( Math.floor ( distance / required_step_width ) + extra_step ) * required_step_width;

            } else if ( mod < 0 ) {

                extra_step = ( mod <= - ( required_step_width / 2 ) ) ? -1 : 0;

                distance = ( Math.ceil ( distance / required_step_width ) + extra_step ) * required_step_width;

            }

            return distance;

        };

        var set_value = function ( value ) {

            value = round_value ( value );

            var width = ( ( value - min ) * 100 / ( max - min ) ) + '%';

            $handler.css ( 'left', width );
            $highlighted.css ( 'width', width );

            $input.val ( value ).trigger ( 'change' );
            $label.html ( value );

        };

        var navigate = function ( modifier ) {

            var possible_new_value = current_value + modifier;

            if ( possible_new_value >= min && possible_new_value <= max ) {

                current_value = possible_new_value;

                set_value ( current_value );

            }

        };

        var navigate_move = function ( distance ) {

            distance = round_distance ( distance );

            if ( distance != 0 ) {

                var possible_new_value = current_value + ( distance / one_step_width );

                possible_new_value = Math.max ( min, Math.min ( max, possible_new_value ) );

                if ( current_value != possible_new_value ) {

                    current_value = possible_new_value;

                    set_value ( current_value );

                    return distance;

                }

            }

            return false;

        };

        // Variables

        var $wrp = $(node),
            $slider = $wrp.find ( '.slider' ),
            $min_btn = $slider.find ( '.min' ),
            $max_btn = $slider.find ( '.max' ),
            $input = $slider.find ( 'input' ),
            $unhighlighted = $slider.find ( '.unhighlighted' ),
            $highlighted = $slider.find ( '.highlighted' ),
            $handler = $slider.find ( '.handler' ),
            $label = $handler.find ( '.label' ),

            min = $slider.data ( 'min' ),
            max = $slider.data ( 'max' ),
            start = $slider.data ( 'start' ) || $input.val () || 0,
            step = $slider.data ( 'step' ) || 1,
            decimals = $slider.data ( 'decimals' ) || 0,

            unhighlighted_width = $unhighlighted.width (),
            one_step_width = unhighlighted_width / ( max - min ),
            required_step_width = step * one_step_width,
            handler_width = $handler.width (),
            current_value = start;

        // Init

        set_value ( current_value );

        // Change event

        $input.on ( 'change', function () {

            var input_val = Number($input.val ());

            if ( input_val == current_value ) return;

            current_value = input_val;

            set_value ( current_value );

        });

        // Resize event

        $window.on ( 'resize', function () {

            unhighlighted_width = $unhighlighted.width ();
            one_step_width = unhighlighted_width / ( max - min );
            required_step_width = step * one_step_width;

        });

        // Left / Right arrows events

        var doc_keydown_handler = function ( event ) {

            if ( event.keyCode == 37 ) { // left arrow

                navigate ( -step );

            } else if ( event.keyCode == 39 ) { // right arrow

                navigate ( step );

            }

        };

        $slider.on ( 'mouseenter', function () {

            if ( $wrp.hasClass ( 'inactive' ) ) return;

            $document.on ( 'keydown', doc_keydown_handler );

        }).on ( 'mouseleave', function () {

            $document.off ( 'keydown', doc_keydown_handler );

        });

        // Navigation events

        $min_btn.on ( 'click', function () {

            if ( $wrp.hasClass ( 'inactive' ) ) return;

            navigate ( -step );

        });

        $max_btn.on ( 'click', function () {

            if ( $wrp.hasClass ( 'inactive' ) ) return;

            navigate ( step );

        });

        // Drag event

        var start_pos,
            current_move;

        var drag_start_handler = function ( event ) {

            if ( $wrp.hasClass ( 'inactive' ) ) return;

            start_pos = get_event_pageXY ( event );
            current_move = 0;

            $html.addClass ( 'dragging' );
            $slider.addClass ( 'dragging' );

            $document.on ( 'mousemove touchmove', drag_move_handler );
            $document.on ( 'mouseup touchend', drag_end_handler );

        };

        var drag_move_handler = function ( event ) {

            var end_pos = get_event_pageXY ( event ),
                full_move = end_pos.pageX - start_pos.pageX,
                delta_move = full_move - current_move;

            if ( Math.abs ( delta_move ) >= 1 ) {

                moved = navigate_move ( delta_move );

                if ( moved != false && Math.abs ( delta_move ) >= 1 ) {

                    current_move += moved;

                }

            }

        };

        var drag_end_handler = function ( event ) {

            $html.removeClass ( 'dragging' );
            $slider.removeClass ( 'dragging' );

            $document.off ( 'mousemove touchmove', drag_move_handler );
            $document.off ( 'mouseup touchend', drag_end_handler );

        };

        $handler.on ( 'mousedown touchstart', drag_start_handler );

        // Click event

        var bar_click_handler = function ( event ) {

            if ( $wrp.hasClass ( 'inactive' ) ) return;

            if ( $(event.target).parents ().contains ( $handler ) ) return;

            var click_pos = get_event_pageXY ( event ),
                distance = click_pos.pageX - ( $highlighted.offset ().left + $highlighted.width() );

            navigate_move ( distance );

        };

        $unhighlighted.on ( 'click', bar_click_handler );

    });

};

/* READY */

$.dom_ready ( function () {

    $('.slider_wrp').slider ();

});

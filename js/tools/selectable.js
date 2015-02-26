
/* SELECTABLE */

//TODO: add noty for actions AND/OR right click for action



//FIXME: make it workable with sorting (update after sorting since we may)

$.fn.selectable = function ( options ) {

    options = _.merge ({
        selector: 'tbody tr',
        not_selector: '.empty',
        selected_class: 'selected'
    }, options );

    return this.each ( function ( node ) {

        /* FUNCTION */

        var clear_selection = function () {

            if ( document.selection ) {

                document.selection.empty ();

            } else if ( window.getSelection ) {

                window.getSelection ().removeAllRanges ();

            }

        };

        var reset_vars = function () {

            $prev_row = false;
            $prev_shifted = false;
            $prev_dragged = false;

        };

        var get_rows = function () {

            return $table.find ( options.selector ).not ( options.not_selector );

        };

        /* VARIABLES */

        var $table = $(node),
            $rows = get_rows (),

            $prev_row = false,
            $prev_shifted = false,
            $prev_dragged = false;

        /* CHANGE / SORT */

        $table.on ( 'change sort', function () {

            $rows = get_rows ();

        });

        // CTRL + A / CTRL + SHIFT + A / CTRL + I

        var keydown_handler = function ( event ) {

            if ( event.ctrlKey ) { // CTRL

                if ( event.keyCode === 65 ) { // A

                    event.preventDefault ();

                    reset_vars ();

                    $rows.toggleClass ( options.selected_class, !event.shiftKey ); // SHIFT or not

                } else if ( event.keyCode === 73 ) { // I

                    event.preventDefault ();

                    reset_vars ();

                    $rows.toggleClass ( options.selected_class );

                }

            }

        };

        $table.on ( 'mouseenter', function () {

            $document.on ( 'keydown', keydown_handler );

        }).on ( 'mouseleave', function () {

            $document.off ( 'keydown', keydown_handler );

        });

        // CLICK / CTRL + CLICK / SHIFT + CLICK / CTRL + CLICK -> DRAG

        var $start_row;

        var mousedown_handler = function ( event ) {

            if ( event.button !== 0 ) return;

            $start_row = $(this);

            $document.on ( 'mousemove', mousemove_handler );

            $start_row.on ( 'mouseup', mouseup_handler );

        };

        var mousemove_handler = function ( event ) { // DRAG

            if ( !event.ctrlKey ) return;

            $document.off ( 'mousemove', mousemove_handler );

            $start_row.off ( 'mouseup', mouseup_handler );

            reset_vars ();

            $prev_row = $start_row;

            $start_row.toggleClass ( options.selected_class );

            $html.addClass ( 'dragging' );

            $rows.on ( 'mouseenter', drag_mouseenter_handler );

            $document.on ( 'mouseup', drag_mouseup_handler );

        };

        var drag_mouseenter_handler = function () { // DRAG HOVER

            var $end_row = $(this);

            var start_index = $rows.index ( $start_row ),
                end_index = $rows.index ( $end_row ),
                min_index = Math.min ( start_index, end_index ),
                max_index = Math.max ( start_index, end_index );

            if ( min_index === start_index ) { // down

                min_index += 1;
                max_index += 1;

            }

            var $new_dragged = $rows.slice ( min_index, max_index );

            if ( $prev_dragged ) {

                $new_dragged.not ( $prev_dragged ).toggleClass ( options.selected_class );

                $prev_dragged.not ( $new_dragged ).toggleClass ( options.selected_class );

            } else {

                $new_dragged.toggleClass ( options.selected_class );

            }

            $prev_dragged = $new_dragged;

        };

        var drag_mouseup_handler = function () { // DRAG END

            $rows.off ( 'mouseenter', drag_mouseenter_handler );

            $document.off ( 'mouseup', drag_mouseup_handler );

            $prev_dragged = false;

            $html.removeClass ( 'dragging' );

        };

        var mouseup_handler = function ( event ) { // CLICK

            $document.off ( 'mousemove', mousemove_handler );

            $start_row.off ( 'mouseup', mouseup_handler );

            if ( event.shiftKey ) {

                var start_index = $rows.index ( $prev_row ),
                    end_index = $prev_row ? $rows.index ( $start_row ) : 0,
                    min_index = Math.min ( start_index, end_index ),
                    max_index = Math.max ( start_index, end_index );

                if ( min_index === start_index ) { // down

                    min_index += 1;
                    max_index += 1;

                }

                var $new_shifted = $rows.slice ( min_index, max_index );

                if ( $prev_shifted ) {

                    $new_shifted.not ( $prev_shifted ).toggleClass ( options.selected_class );

                    $prev_shifted.not ( $new_shifted ).toggleClass ( options.selected_class );

                } else {

                    $new_shifted.toggleClass ( options.selected_class );

                }

                $prev_shifted = $new_shifted;

            } else if ( event.ctrlKey ) {

                $start_row.toggleClass ( options.selected_class );

                reset_vars ();

                $prev_row = $start_row;

            } else {

                $rows.removeClass ( options.selected_class );

                $start_row.addClass ( options.selected_class );

                reset_vars ();

                $prev_row = $start_row;

            }

        };

        $rows.on ( 'mousedown', mousedown_handler );

        // Clear selection

        $table.on ( 'mousedown mouseup', function () {

            $.defer ( clear_selection );

        });

    });

};

/* READY */

$.dom_ready ( function () {

    $('table.selectable').selectable ();

});


/* SELECTABLE */

//TODO: add noty for actions AND/OR right click for action
//FIXME: make it workable with sorting (update after sorting since we may)

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* PRIVATE */

    var clear_selection = function () {

        if ( document.selection ) {

            document.selection.empty ();

        } else if ( window.getSelection ) {

            window.getSelection ().removeAllRanges ();

        }

    };

    /* SELECTABLE */

    $.widget ( 'presto.selectable', {

        /* OPTIONS */

        options: {
            selector: 'tbody tr',
            not_selector: '.empty',
            selected_class: 'selected',
            callbacks: {
                //TODO
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$rows = this._get_rows ();

            this.$start_row = false;
            this.$end_row = false;

        },

        _init: function () {

            this._reset_prevs ();

        },

        _events: function () {

            /* KEYS */

            this._on ( 'mouseenter', function () {

                this._on ( $document, 'keydown', this._handler_keys );

            });

            this._on ( 'mouseleave', function () {

                $document.off ( 'keydown', this._handler_keys );

            });

            /* MOUSE */

            this._on ( this.$rows, 'mousedown', this._handler_mousedown );

            /* OTHERS */

            //FIXME: support tableHelper and sortable

            this._on ( 'change sort', this._handler_change_sort );

            this._on ( 'mousedown mouseup', this._handler_clear_selection );

        },

        /* CTRL + A / CTRL + SHIFT + A / CTRL + I */

        _handler_keys: function ( event ) {

            if ( ( $.browser.isMac && event.metaKey ) || ( !$.browser.isMac && event.ctrlKey ) ) { //INFO: COMMAND or CTRL, is we are on Mac or not

                if ( event.keyCode === 65 ) { //INFO: A

                    event.preventDefault (); //FIXME

                    this._reset_prevs ();

                    this.$rows.toggleClass ( this.options.selected_class, !event.shiftKey ); //INFO: SHIFT or not //FIXME: only works if the last character pushed is the `A`, but is it an unwanted behaviour?

                } else if ( event.keyCode === 73 ) { //INFO: I

                    event.preventDefault ();

                    this._reset_prevs ();

                    this.$rows.toggleClass ( this.options.selected_class );

                }

            }

        },

        /* CLICK / CTRL + CLICK / SHIFT + CLICK / CTRL + CLICK -> DRAG */

        _handler_mousedown: function ( event ) {

            if ( event.button !== 0 ) return; //INFO: Left click

            this.$start_row = $(event.currentTarget);

            this._on ( $document, 'mousemove', this._handler_mousemove );

            this._on ( this.$start_row, 'mouseup', this._handler_mouseup );

        },

        _handler_mousemove: function ( event ) { // DRAG

            //FIXME

            if ( ( $.browser.isMac && !event.metaKey ) || ( !$.browser.isMac && !event.ctrlKey ) ) return;

            $document.off ( 'mousemove', this._handler_mousemove );

            this.$start_row.off ( 'mouseup', this._handler_mouseup );

            this._reset_prevs ();

            this.$prev_row = this.$start_row;

            this.$start_row.toggleClass ( this.options.selected_class );

            $html.addClass ( 'dragging' );

            this._on ( this.$rows, 'mouseenter', this._handler_drag_mouseenter );

            this._on ( $document, 'mouseup', this._handler_drag_mouseup );

        },

        _handler_drag_mouseenter: function ( event ) { // DRAG HOVER

            this.$end_row = $(event.currentTarget);

            var start_index = this.$rows.index ( this.$start_row ),
                end_index = this.$rows.index ( this.$end_row ),
                min_index = Math.min ( start_index, end_index ),
                max_index = Math.max ( start_index, end_index );

            if ( min_index === start_index ) { // down

                min_index += 1;
                max_index += 1;

            }

            var $new_dragged = this.$rows.slice ( min_index, max_index );

            if ( this.$prev_dragged ) {

                $new_dragged.not ( this.$prev_dragged ).toggleClass ( this.options.selected_class );

                this.$prev_dragged.not ( $new_dragged ).toggleClass ( this.options.selected_class );

            } else {

                $new_dragged.toggleClass ( this.options.selected_class );

            }

            this.$prev_dragged = $new_dragged;

        },

        _handler_drag_mouseup: function () { // DRAG END

            this.$rows.off ( 'mouseenter', this._handler_drag_mouseenter );

            $document.off ( 'mouseup', this._handler_drag_mouseup );

            this.$prev_dragged = false;

            $html.removeClass ( 'dragging' );

        },

        _handler_mouseup: function ( event ) { // CLICK

            $document.off ( 'mousemove', this._handler_mousemove );

            this.$start_row.off ( 'mouseup', this._handler_mouseup );

            if ( event.shiftKey ) {

                var start_index = this.$rows.index ( this.$prev_row ),
                    end_index = this.$prev_row ? this.$rows.index ( this.$start_row ) : 0,
                    min_index = Math.min ( start_index, end_index ),
                    max_index = Math.max ( start_index, end_index );

                if ( min_index === start_index ) { // down

                    min_index += 1;
                    max_index += 1;

                }

                var $new_shifted = this.$rows.slice ( min_index, max_index );

                if ( this.$prev_shifted ) {

                    $new_shifted.not ( this.$prev_shifted ).toggleClass ( this.options.selected_class );

                    this.$prev_shifted.not ( $new_shifted ).toggleClass ( this.options.selected_class );

                } else {

                    $new_shifted.toggleClass ( this.options.selected_class );

                }

                this.$prev_shifted = $new_shifted;

            } else if ( ( $.browser.isMac && event.metaKey ) || ( !$.browser.isMac && event.ctrlKey ) ) {

                this.$start_row.toggleClass ( this.options.selected_class );

                this._reset_prevs ();

                this.$prev_row = this.$start_row;

            } else {

                this.$rows.removeClass ( this.options.selected_class );

                this.$start_row.addClass ( this.options.selected_class );

                this._reset_prevs ();

                this.$prev_row = this.$start_row;

            }

        },

        /* OTHER EVENTS */

        _handler_change_sort: function () {

            this.$rows = this._get_rows ();

        },

        _handler_clear_selection: function () {

            $.reflow ();

            clear_selection ();

        },

        /* PRIVATE */

        _reset_prevs: function () {

            this.$prev_row = false;
            this.$prev_shifted = false;
            this.$prev_dragged = false;

        },

        _get_rows: function () {

            var $found = this.$element.find ( this.options.selector );

            return this.options.not_selector ? $found.not ( this.options.not_selector ) : $found;

        }

    });

    /* READY */

    $(function () {

        $('table.selectable').selectable ();

    });

}( jQuery, _, window, document ));

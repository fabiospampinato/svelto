
/* =========================================================================
 * Svelto - Selectable v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

//TODO: add dropdown for actions AND/OR right click for action
//FIXME: make it workable with sorting (update after sorting since we may)
//TODO: make it work with checkboxes
//FIXME: select multiple with shift, then just click inside the selection, the clicked element doesn't get selected

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
            selector: 'tbody tr:not(.empty)',
            selected_class: 'selected',
            callbacks: {
                select: _.noop
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

            this._on ( 'mouseenter', this._handler_keys_in );

            this._on ( 'mouseleave', this._handler_keys_out );

            /* MOUSE */

            this._on ( 'mousedown', this.options.selector, this._handler_mousedown );

            /* OTHERS */

            //FIXME: add support tableHelper and sortable

            this._on ( 'change sort', this._handler_change );

            this._on ( 'mousedown mouseup', this._handler_clear_selection );

        },

        /* CTRL + A / CTRL + SHIFT + A / CTRL + I */

        _handler_keys_in: function () {

            this._on ( $document, 'keydown', this._handler_keys_keydown );

        },

        _handler_keys_out: function () {

            this._off ( $document, 'keydown', this._handler_keys_keydown );

        },

        _handler_keys_keydown: function ( event ) {

            if ( ( $.browser.isMac && event.metaKey ) || ( !$.browser.isMac && event.ctrlKey ) ) { //INFO: COMMAND or CTRL, is we are on Mac or not

                if ( event.keyCode === 65 ) { //INFO: A

                    event.preventDefault ();

                    this._reset_prevs ();

                    this.$rows.toggleClass ( this.options.selected_class, !event.shiftKey ); //INFO: SHIFT or not //FIXME: only works if the last character pushed is the `A`, but is it an unwanted behaviour?

                    this._trigger ( 'select' );

                } else if ( event.keyCode === 73 ) { //INFO: I

                    event.preventDefault ();

                    this._reset_prevs ();

                    this.$rows.toggleClass ( this.options.selected_class );

                    this._trigger ( 'select' );

                }

            }

        },

        /* CLICK / CTRL + CLICK / SHIFT + CLICK / CTRL + CLICK -> DRAG */

        _handler_mousedown: function ( event ) {

            if ( event.button !== 0 ) return; //INFO: Only the left click is enabled

            this.$start_row = $(event.currentTarget);

            this._on ( $document, 'mousemove', this._handler_mousemove );

            this._on ( 'mouseup', this.options.selector, this._handler_mouseup );

        },

        _handler_mousemove: function ( event ) { // DRAG

            if ( ( $.browser.isMac && !event.metaKey ) || ( !$.browser.isMac && !event.ctrlKey ) ) return;

            this._off ( $document, 'mousemove', this._handler_mousemove );

            this._off ( 'mouseup', this._handler_mouseup );

            this._reset_prevs ();

            this.$prev_row = this.$start_row;

            this.$start_row.toggleClass ( this.options.selected_class );

            $html.addClass ( 'dragging' );

            this._on ( 'mouseenter', this.options.selector, this._handler_drag_mouseenter );

            this._on ( $document, 'mouseup', this._handler_drag_mouseup );

            this._trigger ( 'select' );

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

            this._trigger ( 'select' );

        },

        _handler_drag_mouseup: function () { // DRAG END

            this._off ( 'mouseenter', this._handler_drag_mouseenter );

            this._off ( $document, 'mouseup', this._handler_drag_mouseup );

            this.$prev_dragged = false;

            $html.removeClass ( 'dragging' );

        },

        _handler_mouseup: function ( event ) { // CLICK

            this._off ( $document, 'mousemove', this._handler_mousemove );

            this._off ( 'mouseup', this._handler_mouseup );

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

            } else if ( ( $.browser.isMac && event.metaKey ) || ( !$.browser.isMac && event.ctrlKey ) || $.browser.isMobile ) { //TODO: On mobile we behave like if the `ctrl` key is always pressed, so that we can support selecting multiple rows even there //FIXME: Is this the wanted behavious?

                this.$start_row.toggleClass ( this.options.selected_class );

                this._reset_prevs ();

                this.$prev_row = this.$start_row;

            } else {

                this.$rows.not ( this.$start_row ).removeClass ( this.options.selected_class );

                this.$start_row.toggleClass ( this.options.selected_class );

                this._reset_prevs ();

                this.$prev_row = this.$start_row;

            }

            this._trigger ( 'select' );

        },

        /* OTHER EVENTS */

        _handler_change: function () {

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

            return this.$element.find ( this.options.selector );

        }

    });

    /* READY */

    $(function () {

        $('table.selectable').selectable ();

    });

}( jQuery, _, window, document ));

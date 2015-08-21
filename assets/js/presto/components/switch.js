
/* SWITCH */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* SWITCH */

    $.widget ( 'presto.switch', {

        /* OPTIONS */

        options: {
            colors: {
                on: 'secondary',
                off: 'gray'
            },
            callbacks: {
                checked: $.noop,
                unchecked: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$switch = this.$element;
            this.$input = this.$switch.find ( 'input' );
            this.$bar = this.$switch.find ( '.switch-bar' );
            this.$handler = this.$switch.find ( '.switch-handler' );
            this.$icon = this.$handler.find ( '.icon' );

            this.checked = this.$input.prop ( 'checked' );
            this.dragging = false;

            this.bar_width = false,
            this.start_percentage = false;

        },

        _init: function () {

            this._set_check ( this.checked, true );

        },

        _events: function () {

            /* CHANGE */

            this._on ( true, this.$input, 'change', this._handler_change );

            /* KEYS */

            this._on ( 'mouseenter', this._handler_keys_in );
            this._on ( 'mouseleave', this._handler_keys_out );

            /* CLICK */

            this._on ( this.$bar, 'click', this._handler_click );

            /* DRAG */

            // this.$handler.draggable ({
            //     start: this._handler_drag_start,
            //     move: this._handler_drag_move,
            //     end: this._handler_drag_end,
            //     context: this
            // });

        },

        /* CHANGE */

        _handler_change: function () {

            var new_checked = this.$input.prop ( 'checked' );

            if ( this.checked !== new_checked ) {

                this.checked = new_checked;

                this._set_check ( this.checked, true );

            }

        },

        /* KEYS */

        _handler_keys_in: function () {

            this._on ( $document, 'keydown', this._handler_keys_keydown );

        },

        _handler_keys_out: function () {

            this._off ( $document, 'keydown', this._handler_keys_keydown );

        },

        _handler_keys_keydown: function ( event ) {

            if ( event.keyCode === $.ui.keyCode.LEFT ) {

                this.uncheck ();

            } else if ( event.keyCode === $.ui.keyCode.RIGHT ) {

                this.check ();

            } else if ( event.keyCode === $.ui.keyCode.SPACE ) {

                this.toggle ();

            }

        },

        /* CLICK */

        _handler_click: function () {

            if ( this.dragging ) {

                this.dragging = false;
                return;

            }

            this.toggle ();

        },

        /* DRAG */

        _handler_drag_start: function () {

            this.start_percentage = this.checked ? 100 : 0;

            this.bar_width = this.$bar.width ();

        },

        _handler_drag_move: function ( event, trigger, XYs ) {

            this.dragging = true;

            var abs_distance = Math.max ( - this.bar_width, Math.min ( Math.abs ( XYs.delta.X ), this.bar_width ) ),
                percentage = abs_distance * 100 / this.bar_width;

            this.drag_percentage = ( XYs.delta.X >= 0 ) ? this.start_percentage + percentage : this.start_percentage - percentage;

            this.$handler.css ( 'left', _.clamp ( 0, this.drag_percentage, 100 ) + '%' );

        },

        _handler_drag_end: function () {

            if ( this.dragging ) {

                this.checked = ( this.drag_percentage >= 50 ) ? true : false;

                this._set_check ( this.checked, true );

            }

        },

        _set_check: function ( checked, force ) {

            if ( checked !== this.$input.prop ( 'checked' ) || force ) {

                this.$switch.toggleClass ( 'checked', checked );

                this.$handler.css ( 'left', checked ? '100%' : 0 );

                this.$bar.toggleClass ( this.options.colors.on, checked );
                this.$handler.toggleClass ( this.options.colors.on, checked );

                this.$bar.toggleClass ( this.options.colors.off, !checked );
                this.$handler.toggleClass ( this.options.colors.off, !checked );

                this.$input.prop ( 'checked', checked ).trigger ( 'change' );

                this._trigger ( checked ? 'checked' : 'unchecked' );

            }

        },

        /* PUBLIC */

        check: function () {

            this._set_check ( true );

        },

        uncheck: function () {

            this._set_check ( false );

        },

        toggle: function () {

            this.checked = !this.checked;
            this._set_check ( this.checked );

        }

    });

    /* READY */

    $(function () {

        $('.switch').each ( function () {

            var $switch = $(this),
                options = {
                    colors: {
                        on: $switch.data ( 'color-on' ) || 'secondary',
                        off: $switch.data ( 'color-off' ) || 'gray'
                    }
                };

            $switch.switch ( options );

        });

    });

}( jQuery, _, window, document ));

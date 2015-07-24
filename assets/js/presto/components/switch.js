
/* SWITCH */

//TODO: add support for spacebar, tipo uno ha il form e fa tab tab spacebar e ha fatto tutto senza usare il mouse

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
            icons: {
                on: false,
                off: false
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
            this.$icon = this.$switch.find ( '.icon' );

            this.checked = this.$input.prop ( 'checked' );
            this.dragging = false;

            this.bar_width = false,
            this.start_percentage = false;

        },

        _init: function () {

            this._set_check ( this.checked, true );

        },

        _events: function () {

            this._on ( true, this.$input, 'change', this._handler_change );

            this._on ( 'mouseenter', this._handler_arrows_in );
            this._on ( 'mouseleave', this._handler_arrows_out );

            this._on ( 'click', this._handler_click );

            this.$handler.draggable ({
                start: this._handler_drag_start,
                move: this._handler_drag_move,
                end: this._handler_drag_end,
                context: this
            });

        },

        /* CHANGE */

        _handler_change: function () {

            this.checked = this.$input.prop ( 'checked' );

            if ( this.checked !== this.$switch.hasClass ( 'checked' ) ) {

                this._set_check ( this.checked, true );

            }

        },

        /* LEFT / RIGHT ARROWS */

        _handler_arrows_in: function () {

            this._on ( $document, 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_out: function () {

            this._off ( $document, 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_keydown: function ( event ) {

            if ( event.keyCode === $.ui.keyCode.LEFT ) {

                if ( this.checked !== false ) {

                    this.checked = false;

                    this._set_check ( this.checked );

                }

            } else if ( event.keyCode === $.ui.keyCode.RIGHT ) {

                if ( this.checked !== true ) {

                    this.checked = true;

                    this._set_check ( this.checked );

                }

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

            this.$handler.css ( 'left', Math.max ( 0, Math.min ( 100, this.drag_percentage ) ) + '%' );

        },

        _handler_drag_end: function () {

            if ( this.dragging ) {

                this.checked = ( this.drag_percentage > 50 ) ? true : false;

                this._set_check ( this.checked, true );

            }

        },

        _set_check: function ( checked, force ) {

            if ( checked !== this.$input.prop ( 'checked' ) || force ) {

                this.$switch.toggleClass ( 'checked', checked );

                this.$handler.css ( 'left', checked ? '100%' : 0 );

                var inactive = this.$switch.hasClass ( 'inactive' );

                this.$bar.toggleClass ( this.options.colors.on, checked && !inactive );
                this.$handler.toggleClass ( this.options.colors.on, checked && !inactive );

                this.$bar.toggleClass ( this.options.colors.off, !checked );
                this.$handler.toggleClass ( this.options.colors.off, !checked );

                if ( this.options.icons.on ) {

                    this.$icon.toggleClass ( 'icon-' + this.options.icons.on, checked );

                }

                if ( this.options.icons.off ) {

                    this.$icon.toggleClass ( 'icon-' + this.options.icons.off, !checked );

                }

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
                    },
                    icons: {
                        on: $switch.data ( 'icon-on' ) || false,
                        off: $switch.data ( 'icon-off' ) || false
                    }
                };

            $switch.switch ( options );

        });

    });

}( lQuery, window, document ));

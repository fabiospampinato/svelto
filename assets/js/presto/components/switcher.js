
/* SWITCHER */

//TODO: add support for spacebar, tipo uno ha il form e fa tab tab spacebar e ha fatto tutto senza usare il mouse

;(function ( $, window, document, undefined ) {

    'use strict';

    /* SWITCHER */

    $.widget ( 'presto.switcher', {

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

        _create: function () {

            this.$input = this.$element.find ( 'input' );
            this.$bar = this.$element.find ( '.bar' );
            this.$handler = this.$element.find ( '.handler' );
            this.$icon = this.$element.find ( '.icon' );

            this.checked = this.$input.prop ( 'checked' );
            this.dragging = false;

            this.start_pos = false,
            this.bar_width = false,
            this.start_percentage = false;

            this._set_check ( this.checked, true );

            this._bind_change ();
            this._bind_arrows ();
            this._bind_drag ();
            this._bind_click ();

        },

        /* CHANGE */

        _bind_change: function () {

            this._on ( true, this.$input, 'change', this._handler_change );

        },

        _handler_change: function () {

            this.checked = this.$input.prop ( 'checked' );

            this._set_check ( this.checked );

        },

        /* LEFT / RIGHT ARROWS */

        _bind_arrows: function () {

            this._on ( 'mouseenter', this._handler_arrows_in );
            this._on ( 'mouseleave', this._handler_arrows_out );

        },

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

        _bind_click: function () {

            this._on ( 'click', this._handler_click );

        },

        _handler_click: function () {

            if ( this.dragging ) {

                this.dragging = false;
                return;

            }

            this.toggle ();

        },

        /* DRAG */

        _bind_drag: function () {

            this._on ( this.$handler, 'mousedown touchstart', this._handler_drag_start );

        },

        _handler_drag_start: function ( event ) {

            this.start_percentage = this.checked ? 100 : 0;

            this.start_pos = $.eventXY ( event );
            this.bar_width = this.$bar.width ();

            $html.addClass ( 'dragging' );
            this.$element.addClass ( 'dragging' );

            this._on ( $document, 'mousemove touchmove', this._handler_drag_move );
            this._on ( $document, 'mouseup touchend', this._handler_drag_end );

        },

        _handler_drag_move: function ( event ) {

            this.dragging = true;

            var move_pos = $.eventXY ( event ),
                distance = move_pos.X - this.start_pos.X,
                abs_distance = Math.max ( - this.bar_width, Math.min ( Math.abs ( distance ), this.bar_width ) ),
                percentage = abs_distance * 100 / this.bar_width;

            this.drag_percentage = ( distance >= 0 ) ? this.start_percentage + percentage : this.start_percentage - percentage;

            this.$handler.css ( 'left', Math.max ( 0, Math.min ( 100, this.drag_percentage ) ) + '%' );

        },

        _handler_drag_end: function ( event ) {

            $html.removeClass ( 'dragging' );
            this.$element.removeClass ( 'dragging' );

            this._off ( $document, 'mousemove touchmove', this._handler_drag_move );
            this._off ( $document, 'mouseup touchend', this._handler_drag_end );

            if ( this.dragging ) {

                this.checked = ( this.drag_percentage > 50 ) ? true : false;

                this._set_check ( this.checked, true );

            }

        },

        _set_check: function ( checked, force ) {

            if ( checked !== this.$input.prop ( 'checked' ) || force ) {

                this.$handler.css ( 'left', checked ? '100%' : 0 );

                var inactive = this.$element.hasClass ( 'inactive' );

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

        $('.switcher').each ( function () {

            var $switcher = $(this),
                options = {
                    colors: {
                        on: $switcher.data ( 'color-on' ) || 'secondary',
                        off: $switcher.data ( 'color-off' ) || 'gray'
                    },
                    icons: {
                        on: $switcher.data ( 'icon-on' ) || false,
                        off: $switcher.data ( 'icon-off' ) || false
                    }
                };

            $switcher.switcher ( options );

        });

    });

}( lQuery, window, document ));


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
                checked: _.noop,
                unchecked: _.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$switch = this.$element;
            this.$input = this.$switch.find ( 'input' );
            this.$bar_wrp = this.$switch.find ( '.switch-bar-wrp' );
            this.$bar = this.$switch.find ( '.switch-bar' );
            this.$handler = this.$switch.find ( '.switch-handler' );
            this.$icon = this.$handler.find ( '.icon' );

            this.checked = this.$input.prop ( 'checked' );
            this.dragging = false;

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

            this.$handler.draggable ({
                axis: 'x',
                constrainer: {
                    $element: this.$bar_wrp
                },
                callbacks: {
                    end: this._handler_drag_end.bind ( this )
                }
            });

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

        _handler_drag_end: function ( data ) {

            if ( data.dragged ) {

                this.dragging = true;

                var checked = ( this.$handler.offset ().left - this.$bar_wrp.offset ().left + ( this.$handler.width () / 2 ) ) >= ( this.$bar_wrp.width () / 2 );

                this.checked = ( checked ) ? true : false;

                this._set_check ( this.checked, true );

            }

        },

        _set_check: function ( checked, force ) {

            if ( checked !== this.$input.prop ( 'checked' ) || force ) {

                this.$switch.toggleClass ( 'checked', checked );

                this.$handler.css ( 'transform', 'translate3d(' + ( checked ? '1.73333em' : '0' ) + ',0,0)' );

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

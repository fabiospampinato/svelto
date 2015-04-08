
/* SWITCHER */

;(function ( $, window, document, undefined ) {

    $.factory ( 'switcher', {

        theme: {
            on: 'secondary',
            off: 'gray'
        },
        icons: {
            on: false,
            off: false
        }

    }, {

        /* SPECIAL */

        init: function () {

            this.$bar = this.$node.find ( '.bar' );
            this.$handler = this.$node.find ( '.handler' );
            this.$icon = this.$node.find ( '.icon' );
            this.$input = this.$node.find ( 'input' );

            this.current_value = this.$input.prop ( 'checked' );
            this.dragging = false;

            this.start_pos = false,
            this.bar_width = false,
            this.start_percentage = false;

            this.set_value ( this.current_value );

            this._bind_change ();
            this._bind_arrows ();
            this._bind_click ();
            this._bind_drag ();

        },

        ready: function () {

            $('.switcher').switcher ();

        },

        /* CHANGE */

        _bind_change: function () {

            this.$input.on ( 'change', this._handler_change );

        },

        _handler_change: function () {

            var possible_new_value = this.$input.prop ( 'checked' );

            if ( possible_new_value === this.current_value ) return;

            this.current_value = possible_new_value;

            this.set_value ( this.current_value );

        },

        /* LEFT / RIGHT ARROWS */

        _bind_arrows: function () {

            this.$node.hover ( this._handler_arrows_in, this._handler_arrows_out );

        },

        _handler_arrows_in: function () {

            if ( this.$node.hasClass ( 'inactive' ) ) return;

            $document.on ( 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_out: function () {

            $document.off ( 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_keydown: function ( event ) {

            if ( event.keyCode === 37 ) { // left arrow

                if ( this.current_value !== false ) {

                    this.current_value = false;

                    this.set_value ( this.current_value );

                }

            } else if ( event.keyCode === 39 ) { // right arrow

                if ( this.current_value !== true ) {

                    this.current_value = true;

                    this.set_value ( this.current_value );

                }

            }

        },

        /* CLICK */

        _bind_click: function () {

            this.$node.on ( 'click', this._handler_click );

        },

        _handler_click: function () {

            if ( this.dragging || this.$node.hasClass ( 'inactive' ) ) return;

            this.toggle ();

        },

        /* DRAG */

        _bind_drag: function () {

            this.$handler.on ( 'mousedown touchstart', this._handler_drag_start );

        },

        _handler_drag_start: function ( event ) {

            if ( this.$node.hasClass ( 'inactive' ) ) return;

            this.start_percentage = this.current_value ? 100 : 0;

            this.start_pos = get_event_pageXY ( event );
            this.bar_width = this.$bar.width ();

            $html.addClass ( 'dragging' );
            this.$node.addClass ( 'dragging' );

            $document.on ( 'mousemove touchmove', this._handler_drag_move );
            $document.on ( 'mouseup touchend', this._handler_drag_end );

        },

        _handler_drag_move: function ( event ) {

            this.dragging = true;

            var move_pos = get_event_pageXY ( event ),
                distance = move_pos.pageX - this.start_pos.pageX,
                abs_distance = Math.max ( - this.bar_width, Math.min ( Math.abs ( distance ), this.bar_width ) ),
                percentage = abs_distance * 100 / this.bar_width,
                possible_new_percentage = ( distance >= 0 ) ? this.start_percentage + percentage : this.start_percentage - percentage;

            this.$handler.css ( 'left', Math.max ( 0, Math.min ( 100, possible_new_percentage ) ) + '%' );

        },

        _handler_drag_end: function ( event ) {

            var bar_off = this.$bar.offset (),
                handler_off = this.$handler.offset ();

            this.current_value = ( handler_off.left + ( handler_off.width / 2 ) >= bar_off.left + ( bar_off.width / 2 ) );

            $html.removeClass ( 'dragging' );
            this.$node.removeClass ( 'dragging' );

            $document.off ( 'mousemove touchmove', this._handler_drag_move );
            $document.off ( 'mouseup touchend', this._handler_drag_end );

            this.set_value ( this.current_value );

            this.dragging = false; //FIXME: It should be wrapped in a defer function, but how can we set the this value then???

        },

        /* PUBLIC */

        set_value: function ( value ) {

            this.$handler.css ( 'left', value ? '100%' : 0 );

            var inactive = this.$switcher.hasClass ( 'inactive' );

            this.$bar.toggleClass ( this.options.theme.on, value && !inactive );
            this.$handler.toggleClass ( this.options.theme.on, value && !inactive );

            this.$bar.toggleClass ( this.options.theme.off, !value );
            this.$handler.toggleClass ( this.options.theme.off, !value );

            if ( this.options.icons.on ) {

                this.$icon.toggleClass ( this.options.icons.on, value );

            }

            if ( this.options.icons.off ) {

                this.$icon.toggleClass ( this.options.icons.off, !value );

            }

            this.$input.prop ( 'checked', value ).trigger ( 'change' );

        },

        toggle: function () {

            this.current_value = !this.current_value;
            this.set_value ( this.current_value );

        }

    });

}( lQuery, window, document ));

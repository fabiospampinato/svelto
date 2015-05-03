
/* SLIDER */

;(function ( $, window, document, undefined ) {

    'use strict';

    $.factory ( 'presto.slider', {

        /* SPECIAL */

        _ready: function () {

            $('.slider_wrp').slider ();

        },

        _create: function () {

            this.$slider = this.$element.find ( '.slider' );
            this.$min_btn = this.$slider.find ( '.min' );
            this.$max_btn = this.$slider.find ( '.max' );
            this.$input = this.$slider.find ( 'input' );
            this.$unhighlighted = this.$slider.find ( '.unhighlighted' );
            this.$highlighted = this.$slider.find ( '.highlighted' );
            this.$handler = this.$slider.find ( '.handler' );
            this.$label = this.$handler.find ( '.label' );

            this.min = this.$slider.data ( 'min' );
            this.max = this.$slider.data ( 'max' );
            this.start = this.$slider.data ( 'start' ) || this.$input.val () || 0;
            this.step = this.$slider.data ( 'step' ) || 1;
            this.decimals = this.$slider.data ( 'decimals' ) || 0;

            this.unhighlighted_width = this.$unhighlighted.width ();
            this.one_step_width = this.unhighlighted_width / ( this.max - this.min );
            this.required_step_width = this.step * this.one_step_width;
            this.current_value = this.start;

            this.start_pos = false;
            this.current_move = false;

            this.set_value ( this.current_value );

            this._bind_change ();
            this._bind_resize ();
            this._bind_arrows ();
            this._bind_min_max_click ();
            this._bind_drag ();
            this._bind_click ();

        },

        /* PRIVATE */

        _round_value: function ( value ) {

            return Number(value).toFixed ( this.decimals );

        },

        _round_distance: function ( distance ) {

            var mod = distance % this.required_step_width,
                extra_step;

            if ( mod > 0 ) {

                extra_step = ( mod >= this.required_step_width / 2 ) ? 1 : 0;

                distance = ( Math.floor ( distance / this.required_step_width ) + extra_step ) * this.required_step_width;

            } else if ( mod < 0 ) {

                extra_step = ( mod <= - ( this.required_step_width / 2 ) ) ? -1 : 0;

                distance = ( Math.ceil ( distance / this.required_step_width ) + extra_step ) * this.required_step_width;

            }

            return distance;

        },

        /* CHANGE */

        _bind_change: function () {

            this.$input.on ( 'change', this._handler_change );

        },

        _handler_change: function ( event ) {

            var input_val = Number(this.$input.val ());

            if ( input_val === this.current_value ) return;

            this.current_value = input_val;

            this.set_value ( this.current_value );

        },

        /* RESIZE */

        _bind_resize: function () {

            $window.on ( 'resize', this._handler_resize );

        },

        _handler_resize: function ( event ) {

            this.unhighlighted_width = this.$unhighlighted.width ();
            this.one_step_width = this.unhighlighted_width / ( this.max - this.min );
            this.required_step_width = this.step * this.one_step_width;

        },

        /* LEFT / RIGHT ARROWS */

        _bind_arrows: function () {

            this.$slider.hover ( this._handler_arrows_in, this._handler_arrows_out );

        },

        _handler_arrows_in: function ( event ) {

            if ( this.hasClass ( 'inactive' ) ) return;

            $document.on ( 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_out: function ( event ) {

            $document.off ( 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_keydown: function ( event ) {

            if ( event.keyCode === 37 ) { // left arrow

                this.navigate ( - this.step );

            } else if ( event.keyCode === 39 ) { // right arrow

                this.navigate ( this.step );

            }

        },

        /* MIN / MAX CLICK */

        _bind_min_click: function () {

            this.$min_btn.on ( 'click', this._handler_min_click );

        },

        _handler_min_click: function ( event ) {

            if ( this.$element.hasClass ( 'inactive' ) ) return;

            this.navigate ( - this.step );

        },

        _bind_max_click: function () {

            this.$max_btn.on ( 'click', this._handler_max_click );

        },

        _handler_max_click: function () {

            if ( this.$element.hasClass ( 'inactive' ) ) return;

            this.navigate ( this.step );


        },

        /* DRAG */

        _bind_drag: function () {

            this.$handler.on ( 'mousedown touchstart', this._handler_drag_start );

        },

        _handler_drag_start: function ( event ) {

            if ( this.$element.hasClass ( 'inactive' ) ) return;

            this.start_pos = get_event_pageXY ( event );
            this.current_move = 0;

            $html.addClass ( 'dragging' );
            this.$slider.addClass ( 'dragging' );

            $document.on ( 'mousemove touchmove', this._handler_drag_move );
            $document.on ( 'mouseup touchend', this._handler_drag_end );

        },

        _handler_drag_move: function ( event ) {

            var end_pos = get_event_pageXY ( event ),
                full_move = end_pos.pageX - this.start_pos.pageX,
                delta_move = full_move - this.current_move;

            if ( Math.abs ( delta_move ) >= 1 ) {

                var moved = this.navigate_move ( delta_move );

                if ( moved !== false && Math.abs ( delta_move ) >= 1 ) {

                    this.current_move += moved;

                }

            }

        },

        _handler_drag_end: function ( event ) {

            $html.removeClass ( 'dragging' );
            this.$slider.removeClass ( 'dragging' );

            $document.off ( 'mousemove touchmove', this._handler_drag_move );
            $document.off ( 'mouseup touchend', this._handler_drag_end );

        },

        /* CLICK */

        _bind_click: function () {

            this.$unhighlighted.on ( 'click', this._handler_click );

        },

        _handler_click: function ( event ) {

            if ( this.$element.hasClass ( 'inactive' ) ) return;

            if ( $(event.target).parents ().index ( this.$handler ) !== -1 ) return;

            var click_pos = get_event_pageXY ( event ),
                distance = click_pos.pageX - ( this.$highlighted.offset ().left + this.$highlighted.width () );

            this.navigate_move ( distance );

        },

        /* PUBLIC */

        set_value: function ( value ) {

            value = this._round_value ( value );

            var width = ( ( value - this.min ) * 100 / ( this.max - this.min ) ) + '%';

            this.$handler.css ( 'left', width );
            this.$highlighted.css ( 'width', width );

            this.$input.val ( value ).trigger ( 'change' );
            this.$label.html ( value );

        },

        navigate: function ( modifier ) {

            var possible_new_value = this.current_value + modifier;

            if ( possible_new_value >= this.min && possible_new_value <= this.max ) {

                this.current_value = possible_new_value;

                this.set_value ( this.current_value );

            }

        },

        navigate_move: function ( distance ) {

            distance = this._round_distance ( distance );

            if ( distance !== 0 ) {

                var possible_new_value = this.current_value + ( distance / this.one_step_width );

                possible_new_value = Math.max ( this.min, Math.min ( this.max, possible_new_value ) );

                if ( this.current_value !== possible_new_value ) {

                    this.current_value = possible_new_value;

                    this.set_value ( this.current_value );

                    return distance;

                }

            }

            return false;

        }

    });

}( lQuery, window, document ));

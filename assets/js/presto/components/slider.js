
/* SLIDER */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* SLIDER */

    $.widget ( 'presto.slider', {

        /* OPTIONS */

        options: {
            min: 0,
            max: 100,
            value: 0,
            step: 1,
            decimals: 0,
            callbacks: {
                increased: $.noop,
                decrease: $.noop
            }
        },

        /* SPECIAL */

        _create: function () {

            this.$slider = this.$element.find ( '.slider' );
            this.$min_btn = this.$slider.find ( '.min' );
            this.$max_btn = this.$slider.find ( '.max' );
            this.$input = this.$slider.find ( 'input' );
            this.$unhighlighted = this.$slider.find ( '.unhighlighted' );
            this.$highlighted = this.$slider.find ( '.highlighted' );
            this.$handler = this.$slider.find ( '.handler' );
            this.$label = this.$handler.find ( '.slider-label' );

            this.unhighlighted_width = this.$unhighlighted.width ();
            this.one_step_width = this.unhighlighted_width / ( this.options.max - this.options.min );
            this.required_step_width = this.options.step * this.one_step_width;

            this.start_pos = false;
            this.current_move = false;

            this.set_value ( this.options.value, true );

            this._bind_change ();
            this._bind_resize ();
            this._bind_arrows ();
            this._bind_min_click ();
            this._bind_max_click ();
            this._bind_drag ();
            this._bind_click ();

        },

        /* PRIVATE */

        _round_value: function ( value ) {

            return Number(Number(value).toFixed ( this.options.decimals ));

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

            this._on ( true, this.$input, 'change', this._handler_change );

        },

        _handler_change: function () {

            this.set_value ( this.$input.val () );

        },

        /* RESIZE */

        _bind_resize: function () {

            this._on ( $window, 'resize', this._handler_resize );

        },

        _handler_resize: function ( event ) {

            this.unhighlighted_width = this.$unhighlighted.width ();
            this.one_step_width = this.unhighlighted_width / ( this.options.max - this.options.min );
            this.required_step_width = this.options.step * this.one_step_width;

        },

        /* LEFT / RIGHT ARROWS */

        _bind_arrows: function () {

            this._on ( this.$slider, 'mouseenter', this._handler_arrows_in );
            this._on ( this.$slider, 'mouseleave', this._handler_arrows_out );

        },

        _handler_arrows_in: function () {

            this._on ( $document, 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_out: function () {

            this._off ( $document, 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_keydown: function ( event ) {

            if ( event.keyCode === $.ui.keyCode.LEFT || event.keyCode === $.ui.keyCode.DOWN ) {

                this.decrease ();

            } else if ( event.keyCode === $.ui.keyCode.RIGHT || event.keyCode === $.ui.keyCode.UP ) {

                this.increase ();

            }

        },

        /* MIN / MAX CLICK */

        _bind_min_click: function () {

            this._on ( this.$min_btn, 'click', this.decrease );

        },

        _bind_max_click: function () {

            this._on ( this.$max_btn, 'click', this.increase );

        },

        /* DRAG */

        _bind_drag: function () {

            this._on ( this.$handler, 'mousedown touchstart', this._handler_drag_start );

        },

        _handler_drag_start: function ( event ) {

            this.start_pos = $.eventXY ( event );
            this.current_move = 0;

            $html.addClass ( 'dragging' );
            this.$slider.addClass ( 'dragging' );

            this._on ( $document, 'mousemove touchmove', this._handler_drag_move );
            this._on ( $document, 'mouseup touchend', this._handler_drag_end );

        },

        _handler_drag_move: function ( event ) {

            var end_pos = $.eventXY ( event ),
                full_move = end_pos.X - this.start_pos.X,
                delta_move = full_move - this.current_move;

            if ( Math.abs ( delta_move ) >= 1 ) {

                var moved = this.navigate_distance ( delta_move );

                if ( moved !== false && Math.abs ( delta_move ) >= 1 ) {

                    this.current_move += moved;

                }

            }

        },

        _handler_drag_end: function ( event ) {

            $html.removeClass ( 'dragging' );
            this.$slider.removeClass ( 'dragging' );

            this._off ( $document, 'mousemove touchmove', this._handler_drag_move );
            this._off ( $document, 'mouseup touchend', this._handler_drag_end );

        },

        /* CLICK */

        _bind_click: function () {

            this._on ( this.$unhighlighted, 'click', this._handler_click );

        },

        _handler_click: function ( event ) {

            if ( event.target === this.$handler.get ( 0 ) ) return; //INFO: Maybe we are dragging, shouldn't be handled as a click on the unhighlited bar

            var click_pos = $.eventXY ( event ),
                distance = click_pos.X - ( this.$highlighted.offset ().left + this.$highlighted.width () );

            this.navigate_distance ( distance );

        },

        /* PUBLIC */

        set_value: function ( value, force ) {

            value = this._round_value ( value );

            if ( value >= this.options.min && value <= this.options.max && ( value !== this.options.value || force ) ) {

                this.options.value = value;

                var width = ( ( value - this.options.min ) * 100 / ( this.options.max - this.options.min ) ) + '%';

                this.$handler.css ( 'left', width );
                this.$highlighted.css ( 'width', width );

                this.$input.val ( value ).trigger ( 'change' );
                this.$label.html ( value );

                this._trigger ( value > this.options.value ? 'increase' : 'decrease' );

            }

        },

        increase: function () {

            this.navigate ( this.options.step );

        },

        decrease: function () {

            this.navigate ( - this.options.step );

        },

        navigate: function ( modifier ) {

            var new_value = this.options.value + modifier;

            this.set_value ( new_value );

        },

        navigate_distance: function ( distance ) {

            distance = this._round_distance ( distance );

            if ( distance !== 0 ) {

                var new_value = this.options.value + ( distance / this.one_step_width );

                new_value = Math.max ( this.options.min, Math.min ( this.options.max, new_value ) );

                this.set_value ( new_value );

                return distance; //FIXME: Should we check if the values as changed before?

            }

            return false;

        }

    });

    /* READY */

    $(function () {

        $('.slider_wrp').each ( function () {

            var $slider_wrp = $(this),
                $input = $slider_wrp.find ( 'input' ),
                $min = $slider_wrp.find ( '.min' ),
                $max = $slider_wrp.find ( '.max' ),
                options = {
                    min: Number($min.data ( 'min' ) || 0),
                    max: Number($max.data ( 'max' ) || 100),
                    value: Number($input.val () || 0),
                    step: Number($slider_wrp.data ( 'step' ) || 1),
                    decimals: Number($slider_wrp.data ( 'decimals' ) || 0)
                };

            $slider_wrp.slider ( options );

        });

    });

}( lQuery, window, document ));


/* SLIDER */

;(function ( $, _, window, document, undefined ) {

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
                decreased: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$slider = this.$element;
            this.$min = this.$slider.find ( '.slider-min' );
            this.$max = this.$slider.find ( '.slider-max' );
            this.$input = this.$slider.find ( 'input' );
            this.$bar_wrp = this.$slider.find ( '.slider-bar-wrp' );
            this.$unhighlighted = this.$slider.find ( '.slider-unhighlighted' );
            this.$highlighted = this.$slider.find ( '.slider-highlighted' );
            this.$handler_wrp = this.$slider.find ( '.slider-handler-wrp' );
            this.$label = this.$handler_wrp.find ( '.slider-label' );

            this.steps_nr = ( ( this.options.max - this.options.min ) / this.options.step );

            this._update_variables ();

        },

        _init: function () {

            // this._update_positions (); //FIXME

        },

        _events: function () {

            /* INPUT CHANGE */

            this._on ( true, this.$input, 'change', this._handler_change );

            /* WINDOW RESIZE */

            this._on ( $window, 'resize', this._handler_resize );

            /* ARROWS */

            this._on ( this.$slider, 'mouseenter', this._handler_arrows_in );
            this._on ( this.$slider, 'mouseleave', this._handler_arrows_out );

            /* MIN / MAX BUTTONS */

            this._on ( this.$min, 'click', this.decrease );
            this._on ( this.$max, 'click', this.increase );

            /* DRAG */

            this.$handler_wrp.draggable ({
                draggable: this._draggable.bind ( this ),
                axis: 'x',
                constrainer: {
                    $element: this.$bar_wrp,
                    axis: 'x'
                },
                modifiers: {
                    x: this.modifier_x.bind ( this ),
                    y: _.true //FIXME: should deep extend, I shouldn't be required to add it here
                },
                callbacks: {
                    beforestart: this._handler_drag_beforestart.bind ( this ),
                    move: this._handler_drag_move.bind ( this ),
                    end: this._handler_drag_end.bind ( this )
                }
            });

            /* CLICK */

            this._on ( this.$unhighlighted, 'click', this._handler_click );

        },

        /* PRIVATE */

        _round_value: function ( value ) {

            return Number(Number(value).toFixed ( this.options.decimals ));

        },

        _update_positions: function () {

            var percentage = ( ( this.options.value - this.options.min ) / this.options.step ) * 100 / this.steps_nr;

            this.$handler_wrp.css ({
                left: percentage + '%',
                transform: 'none'
            });

            this.$highlighted.css ({
                right: ( 100 - percentage ) + '%',
                transform: 'none'
            });

        },

        _update_variables: function () {

            this.unhighlighted_width = this.$unhighlighted.width ();
            this.unhighlighted_offset = this.$unhighlighted.offset ();
            this.step_width = this.unhighlighted_width / this.steps_nr;

        },

        /* CHANGE */

        _handler_change: function () {

            this.set ( this.$input.val () );

        },

        /* RESIZE */

        _handler_resize: function () {

            this._update_variables ();

        },

        /* LEFT / RIGHT ARROWS */

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

        /* DRAG */

        _draggable: function () {

            return !this.options.disabled;

        },

        modifier_x: function ( distance ) {

            var left = distance % this.step_width;

            if ( left >= this.step_width / 2 ) {

                return distance - left + this.step_width;

            } else {

                return distance - left;

            }

        },

        _handler_drag_beforestart: function () {

            var translateX = parseFloat ( this.$handler_wrp.css ( 'left' ), 10 );

            this.$handler_wrp.css ({
                left: 0,
                transform: 'translate3d(' + translateX + 'px,0,0)'
            });

            this.$highlighted.css ({
                right: '100%',
                transform: 'translate3d(' + translateX + 'px,0,0)'
            });

        },

        _handler_drag_move: function ( data ) {

            this.$highlighted.css ( 'transform', 'translate3d(' + data.updatable_x + 'px,0,0)' );

            this.$label.html ( this._round_value ( this.options.min + ( data.updatable_x / this.step_width * this.options.step ) ) );

        },

        _handler_drag_end: function ( data ) {

            var transform_str = this.$handler_wrp.css ( 'transform' ),
                matrix =  ( transform_str !== 'none' ) ? transform_str.match ( /[0-9., -]+/ )[0].split ( ', ' ) : [0, 0, 0, 0, 0, 0];

            var setted = this.set ( this.options.min + ( parseFloat ( matrix[4], 10 ) / this.step_width * this.options.step ) );

            if ( !setted ) {

                this._update_positions ();

            }

        },

        /* CLICK */

        _handler_click: function ( event ) {

            if ( event.target === this.$handler_wrp.get ( 0 ) ) return; //INFO: shouldn't work if we click on the handler //INFO: Maybe we are dragging, shouldn't be handled as a click on the unhighlited bar

            var click_pos = $.eventXY ( event ),
                distance = this.modifier_x ( click_pos.X - this.unhighlighted_offset.left );

            this.set ( this.options.min + ( distance / this.step_width * this.options.step ) );

        },

        /* PUBLIC */

        get: function () {

            return this.options.value;

        },

        set: function ( value ) {

            value = _.clamp ( this.options.min, this._round_value ( value ), this.options.max );

            if ( value !== this.options.value ) {

                var callback = ( value > this.options.value ) ? 'increased' : 'decreased';

                this.options.value = value;

                this._update_positions ();

                this.$input.val ( value ).trigger ( 'change' );

                this._trigger ( callback );

                return true;

            } else {

                return false;

            }

        },

        increase: function () {

            return this.set ( this.options.value + this.options.step );

        },

        decrease: function () {

            return this.set ( this.options.value - this.options.step );

        }

    });

    /* READY */

    $(function () {

        $('.slider').each ( function () {

            var $slider = $(this),
                options = {
                    min: Number($slider.find ( '.slider-min' ).data ( 'min' ) || 0),
                    max: Number($slider.find ( '.slider-max' ).data ( 'max' ) || 100),
                    value: Number($slider.find ( 'input' ).val () || 0),
                    step: Number($slider.data ( 'step' ) || 1),
                    decimals: Number($slider.data ( 'decimals' ) || 0)
                };

            $slider.slider ( options );

        });

    });

}( jQuery, _, window, document ));

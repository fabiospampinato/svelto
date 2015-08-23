
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

            this.unhighlighted_width = this.$unhighlighted.width ();
            this.one_step_width = this.unhighlighted_width / ( this.options.max - this.options.min );
            this.required_step_width = this.options.step * this.one_step_width;

            this.dragging = false;

        },

        _init: function () {

            this.set ( this.options.value, true );

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
                axis: 'x',
                $constrainer: this.$bar_wrp,
                constrainer_axis: 'x',
                updaters: {
                    x: this._updatable.bind ( this ),
                    y: _.true //FIXME: should deep extend, I shouldn't be required to add it here
                },
                callbacks: {
                    beforestart: this._handler_drag_beforestart.bind ( this ),
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

        /* CHANGE */

        _handler_change: function () {

            this.set ( this.$input.val () );

        },

        /* RESIZE */

        _handler_resize: function ( event ) {

            this.unhighlighted_width = this.$unhighlighted.width ();
            this.one_step_width = this.unhighlighted_width / ( this.options.max - this.options.min );
            this.required_step_width = this.options.step * this.one_step_width;

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

        _updatable: function ( distance ) {

            return Math.ceil ( distance / this.one_step_width ) * this.one_step_width;

        },

        _handler_drag_beforestart: function () {

            this.$handler_wrp.css ({
                left: 0,
                transform: 'translateX(' + parseFloat ( this.$handler_wrp.css ( 'left' ), 10 ) + 'px)'
            });

        },

        _handler_drag_end: function ( data ) {

            var transform_str = this.$handler_wrp.css ( 'transform' ),
                matrix =  ( transform_str !== 'none' ) ? transform_str.match ( /[0-9., -]+/ )[0].split ( ', ' ) : [0, 0, 0, 0, 0, 0];

            this.set ( Math.ceil ( parseFloat ( matrix[4], 10 ) / this.one_step_width ) * this.options.step, true );


        },

        /* CLICK */

        _handler_click: function ( event ) {

            if ( event.target === this.$handler_wrp.get ( 0 ) ) return; //INFO: shouldn't work if we click on the handler //INFO: Maybe we are dragging, shouldn't be handled as a click on the unhighlited bar

            var click_pos = $.eventXY ( event ),
                distance = click_pos.X - ( this.$highlighted.offset ().left + this.$highlighted.width () );

            this.navigate_distance ( distance );

        },

        /* PUBLIC */

        get: function () {

            return this.options.value;

        },

        set: function ( value, force ) {

            return;

            value = _.clamp ( this.options.min, this._round_value ( value ), this.options.max );

            if ( value !== this.options.value || force ) {

                var width = ( ( value - this.options.min ) * 100 / ( this.options.max - this.options.min ) ) + '%';

                this.$handler_wrp.css ({
                    transform: 'none',
                    left: width
                });

                this.$highlighted.css ( 'width', width );

                var callback = ( value > this.options.value ) ? 'increased' : 'decreased';

                this.options.value = value;

                this.$input.val ( value ).trigger ( 'change' );

                this.$label.html ( value );

                this._trigger ( callback );


            }

        },

        increase: function () {

            this.set ( this.options.value + this.options.step );

        },

        decrease: function () {

            this.set ( this.options.value - this.options.step );

        }

    });

    /* READY */

    $(function () {

        $('.slider').each ( function () {

            var $slider = $(this),
                $input = $slider.find ( 'input' ),
                $min = $slider.find ( '.slider-min' ),
                $max = $slider.find ( '.slider-max' ),
                options = {
                    min: Number($min.data ( 'min' ) || 0),
                    max: Number($max.data ( 'max' ) || 100),
                    value: Number($input.val () || 0),
                    step: Number($slider.data ( 'step' ) || 1),
                    decimals: Number($slider.data ( 'decimals' ) || 0)
                };

            $slider.slider ( options );

        });

    });

}( jQuery, _, window, document ));

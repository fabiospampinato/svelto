
/* SPINNER */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* SPINNER */

    $.widget ( 'presto.spinner', {

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

        _variables: function () {

            this.$spinner = this.$element;
            this.$input = this.$spinner.find ( 'input' );
            this.$label = this.$spinner.find ( '.button-center' );
            this.$decrease_btn = this.$spinner.find ( '.decrease' );
            this.$increase_btn = this.$spinner.find ( '.increase' );

        },

        _events: function () {

            this._on ( true, this.$input, 'change', this._handler_change );

            this._on ( 'mouseenter', this._handler_arrows_in );
            this._on ( 'mouseleave', this._handler_arrows_out );

            this._on ( this.$decrease_btn, 'click', this.decrease );

            this._on ( this.$increase_btn, 'click', this.increase );

        },

        /* PRIVATE */

        _round_value: function ( value ) {

            return Number(Number(value).toFixed ( this.options.decimals ));

        },

        /* CHANGE */

        _handler_change: function () {

            this.set_value ( this.$input.val () );

        },

        /* LEFT / RIGHT ARROWS */

        _handler_arrows_in: function ( event ) {

            this._on ( $document, 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_out: function ( event ) {

            this._off ( $document, 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_keydown: function ( event ) {

            if ( event.keyCode === $.ui.keyCode.LEFT || event.keyCode === $.ui.keyCode.DOWN ) {

                this.decrease ();

            } else if ( event.keyCode === $.ui.keyCode.RIGHT || event.keyCode === $.ui.keyCode.UP ) {

                this.increase ();

            }

        },

        /* PUBLIC */

        set_value: function ( value ) {

            value = this._round_value ( value );

            if ( value >= this.options.min && value <= this.options.max && value !== this.options.value ) {

                this.options.value = value;

                this.$input.val ( value ).trigger ( 'change' );
                this.$label.html ( value );

                this.$decrease_btn.toggleClass ( 'inactive', value === this.options.min );
                this.$increase_btn.toggleClass ( 'inactive', value === this.options.max );

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

        }

    });

    /* READY */

    $(function () {

        $('.spinner').each ( function () {

            var $spinner = $(this),
                $input = $spinner.find ( 'input' ),
                options = {
                    min: Number($spinner.data ( 'min' ) || 0),
                    max: Number($spinner.data ( 'max' ) || 100),
                    value: Number($input.val () || 0),
                    step: Number($spinner.data ( 'step' ) || 1),
                    decimals: Number($spinner.data ( 'decimals' ) || 0)
                };

            $spinner.spinner ( options );

        });

    });

}( lQuery, window, document ));


/* COLORPICKER */

//TODO: add support for alpha channel
//TODO: add a $bgs variable where we update the background
//TODO: add drag on the wrps, not on the handlers... so that we can also drag if we are not hovering the handler, or even if we are
//TODO: Add an input inside, so that it works also without an external input

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* COLORPICKER */

    $.widget ( 'presto.colorpicker', {

        /* OPTIONS */

        options: {
            default_color: '#ff0000',
            live: true,
            callbacks: {
                change: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$colorpicker = this.$element;
            this.$sb_wrp = this.$colorpicker.find ( '.colorpicker-saturation-brightness-wrp' );
            this.$handler_sb = this.$sb_wrp.find ( '.colorpicker-handler' );
            this.$hue_wrp = this.$colorpicker.find ( '.colorpicker-hue-wrp' );
            this.$handler_hue = this.$hue_wrp.find ( '.colorpicker-handler' );

            this.id = this.$colorpicker.attr ( 'id' );
            this.$inputs = $('input[name="' + this.id + '"]');

            this.color = new HexColor ();
            this.hex = '';

            this.sb_wrp_offset = this.$sb_wrp.offset ();
            this.sb_wrp_width = this.$sb_wrp.width ();
            this.sb_wrp_height = this.$sb_wrp.height ();

            this.hue_wrp_offset = this.$hue_wrp.offset ();
            this.hue_wrp_height = this.$hue_wrp.height ();

        },

        _init: function () {

            if ( !this.set ( this.$inputs.val () ) ) {

                this.color = new HexColor ( this.options.default_color );

                this._update_sb ();
                this._update_hue ();

            }

        },

        _events: function () {

            /* INPUTS */

            this._on ( this.$inputs, 'keydown', this._handler_input_keydown );

            /* SB WRP */

            this._on ( this.$sb_wrp, 'mouseenter', this._handler_sb_wrp_arrows_in );
            this._on ( this.$sb_wrp, 'mouseleave', this._handler_sb_wrp_arrows_out );

            this._on ( this.$sb_wrp, 'click', this._handler_sb_wrp_click );

            /* SB HANDLER */

            this.$handler_sb.draggable ({
                start: this._handler_sb_drag_start,
                move: this._handler_sb_drag_move,
                end: this._handler_sb_drag_end,
                context: this
            });

            /* HUE WRP */

            this._on ( this.$hue_wrp, 'mouseenter', this._handler_hue_wrp_arrows_in );
            this._on ( this.$hue_wrp, 'mouseleave', this._handler_hue_wrp_arrows_out );

            this._on ( this.$hue_wrp, 'click', this._handler_hue_wrp_click );

            /* HUE HANDLER */

            this.$handler_hue.draggable ({
                start: this._handler_hue_drag_start,
                move: this._handler_hue_drag_move,
                end: this._handler_hue_drag_end,
                context: this
            });

        },

        /* SB WRP */

        _handler_sb_wrp_arrows_in: function () {

            this._on ( $document, 'keydown', this._handler_sb_wrp_arrows_keydown );

        },

        _handler_sb_wrp_arrows_out: function () {

            this._off ( $document, 'keydown', this._handler_sb_wrp_arrows_keydown );

        },

        _handler_sb_wrp_arrows_keydown: function () {

            switch ( event.keyCode ) {

                case $.ui.keyCode.UP:
                    this.color.hsv.v = Math.min ( 100, this.color.hsv.v + 1 );
                    break;

                case $.ui.keyCode.RIGHT:
                    this.color.hsv.s = Math.min ( 100, this.color.hsv.s + 1 );
                    break;

                case $.ui.keyCode.DOWN:
                    this.color.hsv.v = Math.max ( 0, this.color.hsv.v - 1 );
                    break;

                case $.ui.keyCode.LEFT:
                    this.color.hsv.s = Math.max ( 0, this.color.hsv.s - 1 );
                    break;

                default:
                    return;

            }

            this._update_sb ();
            this._update_input ();

        },

        _handler_sb_wrp_click: function ( event ) {

            if ( event.target === this.$handler_sb.get ( 0 ) ) return; //INFO: If we click on the handler it shouldn't count

            this.color.hsv.s = event.offsetX * 100 / this.sb_wrp_width;
            this.color.hsv.v = 100 - ( event.offsetY * 100 / this.sb_wrp_height );

            this._update_sb ();
            this._update_input ();

        },

        /* HANDLER SB */

        _handler_sb_drag_start: function () {

            this.handler_sb_start_position = this.$handler_sb.position ();

        },

        _handler_sb_drag_move: function ( event, target, XYs ) {

            this.isDragging = true;

            this.color.hsv.s =  _.clamp ( 0, this.handler_sb_start_position.left + XYs.delta.X, this.sb_wrp_width ) * 100 / this.sb_wrp_width;
            this.color.hsv.v =  100 - ( _.clamp ( 0, this.handler_sb_start_position.top + XYs.delta.Y, this.sb_wrp_height ) * 100 / this.sb_wrp_height );

            this._update_sb ();

            if ( this.options.live ) {

                this._update_input ();

            }

        },

        _handler_sb_drag_end: function () {

            if ( this.isDragging ) {

                this.isDragging = false;

                if ( !this.options.live ) {

                    this._update_input ();

                }

            }

        },

        /* HUE WRP */

        _handler_hue_wrp_arrows_in: function () {

            this._on ( $document, 'keydown', this._handler_hue_wrp_arrows_keydown );

        },

        _handler_hue_wrp_arrows_out: function () {

            this._off ( $document, 'keydown', this._handler_hue_wrp_arrows_keydown );

        },

        _handler_hue_wrp_arrows_keydown: function () {

            switch ( event.keyCode ) {

                case $.ui.keyCode.UP:
                    this.color.hsv.h = Math.min ( 359, this.color.hsv.h + 1 );
                    break;

                case $.ui.keyCode.DOWN:
                    this.color.hsv.h = Math.max ( 0, this.color.hsv.h - 1 );
                    break;

                default:
                    return;

            }

            this._update_hue ();
            this._update_input ();

        },

        _handler_hue_wrp_click: function ( event ) {

            if ( event.target === this.$handler_hue.get ( 0 ) ) return; //INFO: If we click on the handler it shouldn't count

            this.color.hsv.h = 360 - ( event.offsetY * 360 / this.hue_wrp_height );

            this._update_hue ();
            this._update_input ();

        },

        /* HANDLER HUE */

        _handler_hue_drag_start: function () {

            this.handler_hue_start_position = this.$handler_hue.position ();

        },

        _handler_hue_drag_move: function ( event, target, XYs ) {

            this.isDragging = true;

            this.color.hsv.h = 359 - Math.min ( 359, ( Math.max ( 0, Math.min ( this.hue_wrp_height, ( this.handler_hue_start_position.top + XYs.delta.Y ) ) ) * 360 / this.hue_wrp_height ) );

            this._update_hue ();

            if ( this.options.live ) {

                this._update_input ();

            }

        },

        _handler_hue_drag_end: function () {

            if ( this.isDragging ) {

                this.isDragging = false;

                if ( !this.options.live ) {

                    this._update_input ();

                }

            }

        },

        /* INPUT */

        _handler_input_keydown: function ( event ) {

            if ( event.keyCode === $.ui.keyCode.ENTER ) {

                if ( !this.set ( this.$inputs.val () ) ) {

                    this.$inputs.val ( this.hex );

                }

            }

        },

        /* OTHERS */

        _update_input: function () {

            this.hex = this.color.getHexStr ();

            this.$inputs.val ( this.hex ).css ( 'background-color', this.hex ).trigger ( 'change' );

            this._trigger ( 'change' );

        },

        _update_sb: function () {

            var hsl = ColorHelper.hsv2hsl ( this.color.hsv );

            this.$handler_sb.css ({
                transform: 'translate3d(' + ( this.sb_wrp_width / 100 * this.color.hsv.s ) + 'px,' + ( this.sb_wrp_height / 100 * ( 100 - this.color.hsv.v ) ) + 'px,0)',
                'background-color': 'hsl(' + hsl.h + ',' + hsl.s + '%,' + hsl.l + '%)'
            });

        },

        _update_hue: function () {

            var hsl = ColorHelper.hsv2hsl ( this.color.hsv );

            this.$handler_hue.css ({
                transform: 'translate3d(0,' + ( this.hue_wrp_height / 100 * ( 100 - ( this.color.hsv.h / 360 * 100 ) ) ) + 'px,0)',
                'background-color': 'hsl(' + this.color.hsv.h + ',100%,50%)'
            });

            this.$handler_sb.css ( 'background-color', 'hsl(' + hsl.h + ',' + hsl.s + '%,' + hsl.l + '%)' );

            this.$sb_wrp.css ( 'background-color', 'hsl(' + this.color.hsv.h + ',100%,50%)' );

        },

        _update: function () {

            this._update_sb ();
            this._update_hue ();
            this._update_input ();

        },

        /* PUBLIC */

        get: function () {

            return this.color.getHexStr ();

        },

        set: function ( value ) {

            var new_color = new HexColor ( value );

            if ( new_color.isValid && !_.isEqual ( new_color.hsv, this.color.hsv ) ) {

                this.color = new_color;

                this._update ();

            }

            return new_color.isValid;

        }

    });

    /* READY */

    $(function () {

        $('.colorpicker').colorpicker ();

    });

}( jQuery, _, window, document ));

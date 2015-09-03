
/* =========================================================================
 * Svelto - @FILE-NAME-UPPERCASED v0.1.0
  *
 * http://getsvelto.com/@FILE-NAME
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../hex_color/hexColor.js
 * @requires ../color_helper/colorHelper.js
 * ========================================================================= */

//TODO: add support for alpha channel
//TODO: add a $bgs variable where we update the background
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
                change: _.noop
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

            this._update_variables ();

            this.sb_wrp_size = this.$sb_wrp.width ();

            this.hue_wrp_height = this.sb_wrp_size;

        },

        _init: function () {

            if ( !this.set ( this.$inputs.val () ) ) {

                this.color = new HexColor ( this.options.default_color );

                this._update_sb ();
                this._update_hue ();

            }

        },

        _events: function () {

            /* WINDOW RESIZE */

            this._on ( $window, 'resize', this._handler_resize );

            /* INPUTS */

            this._on ( this.$inputs, 'keydown', this._handler_input_keydown );

            /* SB ARROWS */

            this._on ( this.$sb_wrp, 'mouseenter', this._handler_sb_wrp_arrows_in );
            this._on ( this.$sb_wrp, 'mouseleave', this._handler_sb_wrp_arrows_out );

            /* SB DRAG */

            this._on ( this.$sb_wrp, $.Pointer.dragmove, this._handler_sb_drag_move );
            this._on ( this.$sb_wrp, $.Pointer.dragend, this._handler_sb_drag_end );

            /* HUE ARROWS */

            this._on ( this.$hue_wrp, 'mouseenter', this._handler_hue_wrp_arrows_in );
            this._on ( this.$hue_wrp, 'mouseleave', this._handler_hue_wrp_arrows_out );

            /* HUE DRAG */

            this._on ( this.$hue_wrp, $.Pointer.dragmove, this._handler_hue_drag_move );
            this._on ( this.$hue_wrp, $.Pointer.dragend, this._handler_hue_drag_end );

        },

        /* PRIVATE */

        _update_variables: function () {

            this.sb_wrp_offset = this.$sb_wrp.offset ();
            this.hue_wrp_offset = this.$hue_wrp.offset ();

        },

        /* WINDOW RESIZE */

        _handler_resize: function () {

            this._update_variables ();

        },

        /* SB ARROWS */

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

        /* SB DRAG */

        _sb_drag_set: function ( XY, update ) {

            this.color.hsv.s =  _.clamp ( 0, XY.X - this.sb_wrp_offset.left, this.sb_wrp_size ) * 100 / this.sb_wrp_size;
            this.color.hsv.v =  100 - ( _.clamp ( 0, XY.Y - this.sb_wrp_offset.top, this.sb_wrp_size ) * 100 / this.sb_wrp_size );

            this._update_sb ();

            if ( update ) {

                this._update_input ();

            }

        },

        _handler_sb_drag_move: function ( event, data ) {

            this._sb_drag_set ( data.moveXY, this.options.live );

        },

        _handler_sb_drag_end: function ( event, data ) {

            this._sb_drag_set ( data.endXY, true );

        },

        /* HUE ARROWS */

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

        /* HUE DRAG */

        _hue_drag_set: function ( XY, update ) {

            this.color.hsv.h = 359 - ( _.clamp ( 0, XY.Y - this.hue_wrp_offset.top, this.hue_wrp_height ) * 359 / this.hue_wrp_height );

            this._update_hue ();

            if ( update ) {

                this._update_input ();

            }

        },

        _handler_hue_drag_move: function ( event, data ) {

            this._hue_drag_set ( data.moveXY, this.options.live );

        },

        _handler_hue_drag_end: function ( event, data ) {

            this._hue_drag_set ( data.endXY, true );

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
                'background-color': 'hsl(' + hsl.h + ',' + hsl.s + '%,' + hsl.l + '%)',
                transform: 'translate3d(' + ( this.sb_wrp_size / 100 * this.color.hsv.s ) + 'px,' + ( this.sb_wrp_size / 100 * ( 100 - this.color.hsv.v ) ) + 'px,0)'
            });

        },

        _update_hue: function () {

            var hsl = ColorHelper.hsv2hsl ( this.color.hsv );

            this.$handler_hue.css ({
                'background-color': 'hsl(' + this.color.hsv.h + ',100%,50%)',
                transform: 'translate3d(0,' + ( this.hue_wrp_height / 100 * ( 100 - ( this.color.hsv.h / 360 * 100 ) ) ) + 'px,0)'
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

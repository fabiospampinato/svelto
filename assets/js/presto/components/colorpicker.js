
/* COLORPICKER */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* COLORPICKER */

    $.widget ( 'presto.colorpicker', {

        /* OPTIONS */

        options: {
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

            this.rgb = {
                r: 255,
                g: 0,
                b: 0
            };
            this.hsl = this._rgb2hsl ( this.rgb );
            this.hex = this._rgb2hex ( this.rgb );

            this.sb_wrp_offset = this.$sb_wrp.offset ();
            this.hue_wrp_offset = this.$hue_wrp.offset ();

        },

        _init: function () {

            //TODO: set it from the input, not vice-versa since in that case with one would be the default value

        },

        _events: function () {

            this._on ( this.$sb_wrp, 'mouseenter', this._handler_sb_wrp_arrows_in );
            this._on ( this.$sb_wrp, 'mouseleave', this._handler_sb_wrp_arrows_out );

            this._on ( this.$sb_wrp, 'click', this._handler_sb_wrp_click );

            this.$handler_sb.draggable ({
                start: this._handler_sb_drag_start,
                move: this._handler_sb_drag_move,
                context: this
            });

            this._on ( this.$hue_wrp, 'mouseenter', this._handler_hue_wrp_arrows_in );
            this._on ( this.$hue_wrp, 'mouseleave', this._handler_hue_wrp_arrows_out );

            this._on ( this.$hue_wrp, 'click', this._handler_hue_wrp_click );

            this.$handler_hue.draggable ({
                start: this._handler_hue_drag_start,
                move: this._handler_hue_drag_move,
                context: this
            });

        },

        /* OTHERS */

        _sanitize_hex: function ( hex ) {

            //TODO

        },

        _is_valid_hex: function ( hex ) {

            //TODO

        },

        /* CONVERTERS */

        _dec2hex: function ( dec ) {

            var hex = dec.toString ( 16 );

            return ( hex.length === 1 ? '0' + hex : hex );

        },

        _hex2rgb: function ( hex ) {

            return {
                r: this._hex2dec ( hex.r ),
                g: this._hex2dec ( hex.g ),
                b: this._hex2dec ( hex.b )
            };

        },

        _rgb2hsl: function ( rgb ) {

            var r = rgb.r / 255,
                g = rgb.g / 255,
                b = rgb.b / 255,
                min = Math.min ( r, g, b ),
                max = Math.min ( r, g, b ),
                diff = max - min,
                hsl = {
                    h: 0,
                    s: 0,
                    l: ( min + max ) / 2
                };

            if ( diff > 0 ) {

                hsl.s = ( hsl.l < 0.5 ? diff / ( max + min ) : diff / ( 2 - max - min ) ) * 100;

                hsl.h = ( r === max ? ( g - b ) / diff : ( g === max ? 2 + ( b - r ) / diff : 4 + ( r - g ) / diff ) * 60 ) * 360;

            }

            hsl.l *= 100;

            return hsl;

        },

        _hsl2rgb: function ( hsl ) {

            var h = hsl.h / 360,
                s = hsl.s / 100,
                l = hsl.l / 100;

            if ( s === 0 ) {

                return {
                    r: Math.round ( l * 255 ),
                    g: Math.round ( l * 255 ),
                    b: Math.round ( l * 255 )
                };

            }

            h /= 360;

            var temp1 = ( l < 0.5 ? l * ( 1 + s ) : l + s - l * s ),
                temp2 = 2 * l - temp1,
                rgb = {
                    r: ( h + 1 / 3 ) % 1,
                    g: h,
                    b: ( h + 2 / 3 ) % 1
                };

            for ( var color in rgb ) {

                rgb[color] = Math.round ( ( rgb[color] < 1 / 6 ? temp2 + ( temp1 - temp2 ) * 6 * rgb[color] : ( rgb[color] < 1 / 2 ? temp1 : rgb[color] < 2 / 3 ? temp2 + ( temp1 - temp2 ) * 6 * ( 2 / 3 - rgb[color] ) : temp2 ) ) * 255 );

            }

            return rgb;

        },

        _rgb2hex: function ( rgb ) {

            return {
                r: this._dec2hex ( rgb.r ),
                g: this._dec2hex ( rgb.g ),
                b: this._dec2hex ( rgb.b )
            };

        },

        _hex2dec: function ( hex ) {

            return parseInt ( hex, 16 );

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
                    this.hsl.l = Math.max ( 0, this.hsl.l - 1 );
                    break;

                case $.ui.keyCode.RIGHT:
                    this.hsl.s = Math.min ( 100, this.hsl.s + 1 );
                    break;

                case $.ui.keyCode.DOWN:
                    this.hsl.l = Math.min ( 100, this.hsl.l + 1 );
                    break;

                case $.ui.keyCode.LEFT:
                    this.hsl.s = Math.max ( 0, this.hsl.s - 1 );
                    break;

                default:
                    return;

            }

            this._update ();

        },

        _handler_sb_wrp_click: function () {

            //TODO

        },

        /* HANDLER SB */

        _handler_sb_drag_start: function () {

            this.handler_sb_start_position = this.$handler_sb.position ();

        },

        _handler_sb_drag_move: function ( event, target, XYs ) {

            var top = Math.max ( 0, Math.min ( this.sb_wrp_offset.height, this.handler_sb_start_position.top + XYs.delta.Y ) ),
                left = Math.max ( 0, Math.min ( this.sb_wrp_offset.width, this.handler_sb_start_position.left + XYs.delta.X ) );

            this.$handler_sb.css ({
                top: top,
                left: left
            });

            this.hsl.s = Math.round ( left * 100 / this.sb_wrp_offset.width );
            this.hsl.l = Math.round ( top * 100 / this.sb_wrp_offset.height );

            if ( this.options.live ) {

                this._update ();

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
                    this.hsl.h = Math.max ( 0, this.hsl.h - 1 );
                    break;

                case $.ui.keyCode.DOWN:
                    this.hsl.h = Math.min ( 360, this.hsl.h + 1 );
                    break;

                default:
                    return;

            }

            this._update ();

        },

        _handler_hue_wrp_click: function () {

            //TODO

        },

        /* HANDLER HUE */

        _handler_hue_drag_start: function () {

            this.handler_hue_start_position = this.$handler_hue.position ();

        },

        _handler_hue_drag_move: function ( event, target, XYs ) {

            var top = Math.max ( 0, Math.min ( this.hue_wrp_offset.height, this.handler_hue_start_position.top + XYs.delta.Y ) );

            this.$handler_hue.css ({
                top: top,
            });

            this.hsl.h = Math.round ( top * 360 / this.hue_wrp_offset.height );

            this.$sb_wrp.css ( 'background-color', 'hsl(' + this.hsl.h + ',100%,50%)' );

            if ( this.options.live ) {

                this._update ();

            }

        },

        /* INPUT */

        _handler_input_change: function () {

            //TODO

        },

        /* OTHERS */

        _update: function () {

            this.rgb = this._hsl2rgb ( this.hsl );

            this.hex = this._rgb2hex ( this.rgb );

            var hex_full = '#' + ( this.hex.r + this.hex.g + this.hex.b );

            console.log("-----------------------------------");
            console.log("this.hsl: ", this.hsl);
            console.log("this.rgb: ", this.rgb);
            console.log("this.hex: ", this.hex);
            console.log("hex_full: ", hex_full);

            this.$inputs.val ( hex_full ).css ( 'background-color', hex_full ).trigger ( 'change' );

            this._trigger ( 'change' );

        },

        /* PUBLIC */

        set: function () {

            //TODO

        }

    });

    /* READY */

    $(function () {

        $('.colorpicker').colorpicker ();

    });

}( lQuery, window, document ));

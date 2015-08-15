
/* COLORPICKER */

//TODO: add support for alpha channel
//TODO: add a $bgs variable where we update the background
//TODO: add drag on the wrps, not on the handlers... so that we can also drag if we are not hovering the handler, or even if we are
//FIXME: if we input a bad hex color through the input then revert back to default
//TODO: Add an input inside, so that it works also without an external input

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* COLOR UTILITIES */

    var ColorUtilities = {

        /* COLOR SPACES CONVERTERS */

        hex2rgb: function ( hex ) {

            return {
                r: this.hex2dec ( hex.r ),
                g: this.hex2dec ( hex.g ),
                b: this.hex2dec ( hex.b )
            };

        },

        hex2hsv: function ( hex ) {

            return this.rgb2hsv ( this.hex2rgb ( hex ) );

        },

        rgb2hex: function ( rgb ) {

            return {
                r: this.dec2hex ( rgb.r ),
                g: this.dec2hex ( rgb.g ),
                b: this.dec2hex ( rgb.b )
            };

        },

        rgb2hsv: function ( rgb ) {

            var r = rgb.r / 255,
                g = rgb.g / 255,
                b = rgb.b / 255,
                h, s,
                v = Math.max ( r, g, b ),
                diff = v - Math.min ( r, g, b ),
                diffc = function ( c ) {
                    return ( v - c ) / 6 / diff + 1 / 2;
                };

            if ( diff === 0 ) {

                h = s = 0;

            } else {

                s = diff / v;

                var rr = diffc ( r ),
                    gg = diffc ( g ),
                    bb = diffc ( b );

                if ( r === v ) {

                    h = bb - gg;

                } else if ( g === v ) {

                    h = ( 1 / 3 ) + rr - bb;

                } else if ( b === v ) {

                    h = ( 2 / 3 ) + gg - rr;

                }

                if ( h < 0 ) {

                    h += 1;

                } else if ( h > 1 ) {

                    h -= 1;
                }

            }

            return {
                h: h * 360, //FIXME: removed Math.round, test if is ok
                s: s * 100, //FIXME: removed Math.round, test if is ok
                v: v * 100 //FIXME: removed Math.round, test if is ok
            };

        },

        hsv2hex: function ( hsv ) {

            return this.rgb2hex ( this.hsv2rgb ( hsv ) );

        },

        hsv2rgb: function ( hsv ) {

            var r, g, b,
                h = hsv.h,
                s = hsv.s,
                v = hsv.v;

            s /= 100;
            v /= 100;

            if ( s === 0 ) {

                r = g = b = v;

            } else {

                var i, f, p, q, t;

                h /= 60;
                i = Math.floor ( h );
                f = h - i;
                p = v * ( 1 - s );
                q = v * ( 1 - s * f );
                t = v * ( 1 - s * ( 1 - f ) );

                switch ( i ) {

                    case 0:
                        r = v;
                        g = t;
                        b = p;
                        break;

                    case 1:
                        r = q;
                        g = v;
                        b = p;
                        break;

                    case 2:
                        r = p;
                        g = v;
                        b = t;
                        break;

                    case 3:
                        r = p;
                        g = q;
                        b = v;
                        break;

                    case 4:
                        r = t;
                        g = p;
                        b = v;
                        break;

                    default:
                        r = v;
                        g = p;
                        b = q;

                }

            }

            return {
                r: Math.round ( r * 255 ),
                g: Math.round ( g * 255 ),
                b: Math.round ( b * 255 )
            };

        },

        hsv2hsl: function ( hsv ) {

            var s = hsv.s / 100,
                v = hsv.v / 100,
                tempL = ( 2 - s ) * v,
                tempS = s * v;

            return {
                h: hsv.h,
                s: ( tempS / ( ( tempL <= 1 ) ? tempL : 2 - tempL ) ) * 100,
                l: ( tempL / 2 ) * 100
            };

        },

        hsl2hsv: function ( hsl ) {

            var l = hsl.l / 100 * 2,
                s = ( hsl.s / 100 ) * ( l <= 1 ? l : 2 - l );

            return {
                h: hsl.h,
                s: ( 2 * s ) / ( l + s ) * 100,
                v: ( l + s ) / 2 * 100
            };

        },

        /* SCALE CONVERTERS */

        dec2hex: function ( dec ) {

            var hex = dec.toString ( 16 );

            return ( hex.length === 1 ? '0' + hex : hex );

        },

        hex2dec: function ( hex ) {

            return parseInt ( hex, 16 );

        }

    };

    /* COLOR */

    var Color = function ( value ) {

        if ( _.isString ( value ) ) {

            value = value.replace ( '#', '' );

             if ( /^([0-9a-f]{3}){1,2}$/i.test ( value ) ) { //INFO: full 6-chars color

                this.hsv = ColorUtilities.hex2hsv ({
                    r: value[0] + value[1],
                    g: value[2] + value[3],
                    b: value[4] + value[5]
                });

            } else if ( /^[0-9a-f]{3}$/i.test ( value ) ) { //INFO: shorthand 3-chars color

                this.hsv = ColorUtilities.hex2hsv ({
                    r: value[0] + value[0],
                    g: value[1] + value[1],
                    b: value[2] + value[2]
                });

            } else {

                return this;

            }

            this.isValid = true;

        }

    };

    /* COLOR PROTOTYPE */

    Color.prototype = {

        isValid: false,

        hsv: {
            h: 0,
            s: 0,
            v: 0
        },

        getHexStr: function () {

            var hex = ColorUtilities.hsv2hex ( this.hsv );

            return '#' + hex.r + hex.g + hex.b;

        }

    };

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

            this.color = new Color ();
            this.hex = '';

            this.sb_wrp_offset = this.$sb_wrp.offset ();
            this.hue_wrp_offset = this.$hue_wrp.offset ();

        },

        _init: function () {

            if ( !this.set ( this.$inputs.val () ) ) {

                this.color = new Color ( '#ff0000' );

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

            if ( event.target === this.$handler_sb.get ( 0 ) ) return;

            this.color.hsv.s = event.offsetX * 100 / this.sb_wrp_offset.width;
            this.color.hsv.v = 100 - ( event.offsetY * 100 / this.sb_wrp_offset.height );

            this._update_sb ();
            this._update_input ();

        },

        /* HANDLER SB */

        _handler_sb_drag_start: function () {

            this.handler_sb_start_position = this.$handler_sb.position ();

        },

        _handler_sb_drag_move: function ( event, target, XYs ) {

            this.isDragging = true;

            this.color.hsv.s = Math.max ( 0, Math.min ( this.sb_wrp_offset.width, ( this.handler_sb_start_position.left + XYs.delta.X ) ) ) * 100 / this.sb_wrp_offset.width;
            this.color.hsv.v = 100 - ( Math.max ( 0, Math.min ( this.sb_wrp_offset.height, ( this.handler_sb_start_position.top + XYs.delta.Y ) ) ) * 100 / this.sb_wrp_offset.height );

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

            if ( event.target === this.$handler_hue.get ( 0 ) ) return;

            this.color.hsv.h = 360 - ( event.offsetY * 360 / this.hue_wrp_offset.height );

            this._update_hue ();
            this._update_input ();

        },

        /* HANDLER HUE */

        _handler_hue_drag_start: function () {

            this.handler_hue_start_position = this.$handler_hue.position ();

        },

        _handler_hue_drag_move: function ( event, target, XYs ) {

            this.isDragging = true;

            this.color.hsv.h = 359 - Math.min ( 359, ( Math.max ( 0, Math.min ( this.hue_wrp_offset.height, ( this.handler_hue_start_position.top + XYs.delta.Y ) ) ) * 360 / this.hue_wrp_offset.height ) );

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

                this.set ( this.$inputs.val () );

            }

        },

        /* OTHERS */

        _update_input: function () {

            this.hex = this.color.getHexStr ();

            this.$inputs.val ( this.hex ).css ( 'background-color', this.hex ).trigger ( 'change' );

            this._trigger ( 'change' );

        },

        _update_sb: function () {

            var hsl = ColorUtilities.hsv2hsl ( this.color.hsv );

            this.$handler_sb.css ({
                transform: 'translate3d(' + ( this.sb_wrp_offset.width / 100 * this.color.hsv.s ) + 'px,' + ( this.sb_wrp_offset.height / 100 * ( 100 - this.color.hsv.v ) ) + 'px,0)',
                'background-color': 'hsl(' + hsl.h + ',' + hsl.s + '%,' + hsl.l + '%)'
            });

        },

        _update_hue: function () {

            var hsl = ColorUtilities.hsv2hsl ( this.color.hsv );

            this.$handler_hue.css ({
                transform: 'translate3d(0,' + ( this.hue_wrp_offset.height / 100 * ( 100 - ( this.color.hsv.h / 360 * 100 ) ) ) + 'px,0)',
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

            var new_color = new Color ( value );

            if ( new_color.isValid && ( new_color.hsv.h !== this.color.hsv.h || new_color.hsv.s !== this.color.hsv.s || new_color.hsv.v !== this.color.hsv.v ) ) {

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

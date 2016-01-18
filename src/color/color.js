
/* =========================================================================
 * Svelto - Color
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

//TODO: Add support for the alpha channel
//TODO: Maybe add better support for hex color provided as string, basically Color.hex2hsl should also accept an hex color in string format

(function ( $, _, Svelto ) {

  'use strict';

  /* COLOR */

  let Color = class {

    constructor ( color, colorspace ) {

      this.set ( color, colorspace );

    }

    /* ----- API ----- */

    /* SET */

    set ( color, colorspace ) {

      if ( colorspace ) {

        switch ( colorspace.toLowerCase () ) {

          case 'hex':
            return this.setHex ( color );

          case 'rgb':
            return this.setRgb ( color );

          case 'hsv':
            return this.setHsv ( color );

          case 'hsl':
            return this.setHsl ( color );

        }

      }

      if ( _.isPlainObject ( color ) ) {

        if ( 'r' in color && 'g' in color && 'b' in color ) {

          if ( Number ( color.r ) > 99 || Number ( color.g ) > 99 || Number ( color.b ) > 99 ) {

            return this.setRgb ( color );

          } else {

            return this.setHex ( color );

          }

        } else if ( 'h' in color && 's' in color ) {

          if ( 'l' in color ) {

            return this.setHsl ( color );

          } else if ( 'v' in color ) {

            return this.setHsv ( color );

          }

        }

      } else if ( _.isString ( color ) ) {

        color = _.trim ( color, '#' );

        if ( /^[0-9a-f]{6}$/i.test ( color ) ) { //INFO: Full 6-chars hex color notation

          return this.setHex ({
            r: color[0] + color[1],
            g: color[2] + color[3],
            b: color[4] + color[5]
          });

        } else if ( /^[0-9a-f]{3}$/i.test ( color ) ) { //INFO: Shorthand 3-chars hex color notation

          return this.setHex ({
            r: color[0].repeat ( 2 ),
            g: color[1].repeat ( 2 ),
            b: color[2].repeat ( 2 )
          });

        }

      }

      throw new Error ( 'Invalid color' );

    }

    setHex ( color ) {

      this.hex = _.cloneDeep ( color );

    }

    setRgb ( color ) {

      this.hex = Color.rgb2hex ( color );

    }

    setHsv ( color ) {

      this.hex = Color.hsv2hex ( color );

    }

    setHsl ( color ) {

      this.hex = Color.hsl2hex ( color );

    }

    /* GET */

    getHex () {

      return this.hex;

    }

    getRgb () {

      return Color.hex2rgb ( this.hex );

    }

    getHsv () {

      return Color.hex2hsv ( this.hex );

    }

    getHsl () {

      return Color.hex2hsl ( this.hex );

    }

    /* ----- STATICS ----- */

    /* HEX */

    static hex2rgb ( hex ) {

      return {
        r: Color.hex2dec ( hex.r ),
        g: Color.hex2dec ( hex.g ),
        b: Color.hex2dec ( hex.b )
      };

    }

    static hex2hsv ( hex ) {

      return Color.rgb2hsv ( Color.hex2rgb ( hex ) );

    }

    static hex2hsl ( hex ) {

      return Color.hsv2hsl ( Color.hex2hsv ( hex ) );

    }

    /* RGB */

    static rgb2hex ( rgb ) {

      return {
        r: Color.dec2hex ( rgb.r ),
        g: Color.dec2hex ( rgb.g ),
        b: Color.dec2hex ( rgb.b )
      };

    }

    static rgb2hsv ( rgb ) {

      let r = rgb.r / 255,
          g = rgb.g / 255,
          b = rgb.b / 255,
          h,
          s,
          v = Math.max ( r, g, b ),
          diff = v - Math.min ( r, g, b ),
          diffc = function ( c ) {
            return ( v - c ) / 6 / diff + 1 / 2;
          };

      if ( diff === 0 ) {

        h = s = 0;

      } else {

        s = diff / v;

        let rr = diffc ( r ),
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
        h: h * 360,
        s: s * 100,
        v: v * 100
      };

    }

    static rgb2hsl ( rgb ) {

      return Color.hsv2hsl ( Color.rgb2hsv ( rgb ) );

    }

    /* HSV */

    static hsv2hex ( hsv ) {

      return Color.rgb2hex ( Color.hsv2rgb ( hsv ) );

    }

    static hsv2rgb ( hsv ) {

      let r,
          g,
          b,
          h = hsv.h,
          s = hsv.s,
          v = hsv.v;

      s /= 100;
      v /= 100;

      if ( s === 0 ) {

        r = g = b = v;

      } else {

        let i, f, p, q, t;

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

    }

    static hsv2hsl ( hsv ) {

      let s = hsv.s / 100,
          v = hsv.v / 100,
          tempL = ( 2 - s ) * v,
          tempS = s * v;

      return {
        h: hsv.h,
        s: ( tempS !== 0 ) ? ( tempS / ( ( tempL <= 1 ) ? tempL : 2 - tempL ) ) * 100 : 0,
        l: ( tempL / 2 ) * 100
      };

    }

    /* HSL */

    static hsl2hex ( hsl ) {

      return Color.hsv2hex ( Color.hsl2hsv ( hsl ) );

    }

    static hsl2rgb ( hsl ) {

      return Color.hsv2rgb ( Color.hsl2hsv ( hsl ) );

    }

    static hsl2hsv ( hsl ) {

      let l = hsl.l / 100 * 2,
          s = ( hsl.s / 100 ) * ( l <= 1 ? l : 2 - l );

      return {
        h: hsl.h,
        s: ( l + s !== 0 ) ? ( 2 * s ) / ( l + s ) * 100 : 0,
        v: ( l + s ) / 2 * 100
      };

    }

    /* DECIMAL / HEX */

    static dec2hex ( dec ) {

      return _.padLeft ( parseInt ( dec, 10 ).toString ( 16 ), 2, '0' );

    }

    static hex2dec ( hex ) {

      return parseInt ( hex, 16 );

    }

  };

  /* EXPORT */

  Svelto.Color = Color;

}( Svelto.$, Svelto._, Svelto ));

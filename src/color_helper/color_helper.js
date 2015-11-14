
/* =========================================================================
 * Svelto - Color Helper
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

(function ( _, window, document, undefined ) {

  'use strict';

  /* COLOR HELPER */

  window.ColorHelper = class {

    /* COLOR SPACES CONVERTERS */

    static hex2rgb ( hex ) {

      return {
        r: ColorHelper.hex2dec ( hex.r ),
        g: ColorHelper.hex2dec ( hex.g ),
        b: ColorHelper.hex2dec ( hex.b )
      };

    }

    static hex2hsv ( hex ) {

      return ColorHelper.rgb2hsv ( ColorHelper.hex2rgb ( hex ) );

    }

    static rgb2hex ( rgb ) {

      return {
        r: ColorHelper.dec2hex ( rgb.r ),
        g: ColorHelper.dec2hex ( rgb.g ),
        b: ColorHelper.dec2hex ( rgb.b )
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
        h: h * 360, //FIXME: removed Math.round, test if is ok
        s: s * 100, //FIXME: removed Math.round, test if is ok
        v: v * 100 //FIXME: removed Math.round, test if is ok
      };

    }

    static hsv2hex ( hsv ) {

      return ColorHelper.rgb2hex ( ColorHelper.hsv2rgb ( hsv ) );

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
        s: ( tempS / ( ( tempL <= 1 ) ? tempL : 2 - tempL ) ) * 100,
        l: ( tempL / 2 ) * 100
      };

    }

    static hsl2hsv ( hsl ) {

      let l = hsl.l / 100 * 2,
          s = ( hsl.s / 100 ) * ( l <= 1 ? l : 2 - l );

      return {
        h: hsl.h,
        s: ( 2 * s ) / ( l + s ) * 100,
        v: ( l + s ) / 2 * 100
      };

    }

    /* SCALE CONVERTERS */

    static dec2hex ( dec ) {

      return _.padLeft ( dec.toString ( 16 ), 2, '0' );

    }

    static hex2dec ( hex ) {

      return parseInt ( hex, 16 );

    }

  };

}( _, window, document ));

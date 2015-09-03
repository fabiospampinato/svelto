
/* =========================================================================
 * Svelto - @FILE-NAME-UPPERCASED v0.1.0
  *
 * http://getsvelto.com/@FILE-NAME
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

//INFO: x: nothing, it's here just for compatibility,
//      t: current time,
//      b: start value,
//      c: end value,
//      d: duration

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* EASING */

    $.easing = {
        def: 'easeOutQuad',
        swing: function ( x, t, b, c, d ) {
            return $.easing[$.easing.def]( x, t, b, c, d );
        },
        linear: function ( x, t, b, c, d ) {
            return ( c - b ) / d * t + b;
        },
        easeInQuad: function ( x, t, b, c, d ) {
            return c * ( t /= d ) * t + b;
        },
        easeOutQuad: function ( x, t, b, c, d ) {
            return -c * ( t /= d ) * ( t - 2 ) + b;
        },
        easeInOutQuad: function ( x, t, b, c, d ) {
            if ( ( t /= d / 2 ) < 1 ) return c / 2 * t * t + b;
            return -c / 2 * ( ( --t ) * ( t - 2 ) - 1 ) + b;
        },
        easeInCubic: function ( x, t, b, c, d ) {
            return c * ( t /= d ) * t * t + b;
        },
        easeOutCubic: function ( x, t, b, c, d ) {
            return c * ( ( t = t / d - 1 ) * t * t + 1 ) + b;
        },
        easeInOutCubic: function ( x, t, b, c, d ) {
            if ( ( t /= d / 2 ) < 1 ) return c / 2 * t * t * t + b;
            return c / 2 * ( ( t -= 2 ) * t * t + 2 ) + b;
        },
        easeInQuart: function ( x, t, b, c, d ) {
            return c * ( t /= d ) * t * t * t + b;
        },
        easeOutQuart: function ( x, t, b, c, d ) {
            return -c * ( ( t = t / d - 1 ) * t * t * t - 1 ) + b;
        },
        easeInOutQuart: function ( x, t, b, c, d ) {
            if ( ( t /= d / 2 ) < 1 ) return c / 2 * t * t * t * t + b;
            return -c / 2 * ( ( t -= 2 ) * t * t * t - 2 ) + b;
        },
        easeInQuint: function ( x, t, b, c, d ) {
            return c * ( t /= d ) * t * t * t * t + b;
        },
        easeOutQuint: function ( x, t, b, c, d ) {
            return c * ( ( t = t / d - 1 ) * t * t * t * t + 1 ) + b;
        },
        easeInOutQuint: function ( x, t, b, c, d ) {
            if ( ( t /= d / 2 ) < 1 ) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ( ( t -= 2 ) * t * t * t * t + 2 ) + b;
        },
        easeInSine: function ( x, t, b, c, d ) {
            return -c * Math.cos ( t / d * ( Math.PI / 2 ) ) + c + b;
        },
        easeOutSine: function ( x, t, b, c, d ) {
            return c * Math.sin ( t / d * ( Math.PI / 2 ) ) + b;
        },
        easeInOutSine: function ( x, t, b, c, d ) {
            return -c / 2 * ( Math.cos ( Math.PI * t / d ) - 1 ) + b;
        },
        easeInExpo: function ( x, t, b, c, d ) {
            return ( t == 0 ) ? b : c * Math.pow ( 2, 10 * ( t / d - 1 ) ) + b;
        },
        easeOutExpo: function ( x, t, b, c, d ) {
            return ( t == d ) ? b + c : c * ( -Math.pow ( 2, -10 * t / d ) + 1) + b;
        },
        easeInOutExpo: function ( x, t, b, c, d ) {
            if ( t == 0) return b;
            if ( t == d) return b + c;
            if ( ( t /= d / 2 ) < 1) return c / 2 * Math.pow ( 2, 10 * ( t - 1 ) ) + b;
            return c / 2 * ( -Math.pow ( 2, -10 * --t ) + 2 ) + b;
        }
    };

}( jQuery, _, window, document ));

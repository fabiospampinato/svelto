
/* =========================================================================
 * Svelto - Hex Color
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../color_helper/colorHelper.js
 * ========================================================================= */

//TODO: Add support for alpha

(function ( _, window, document, undefined ) {

  'use strict';

  /* HEX COLOR */

  window.HexColor = class {

    constructor ( color ) {

      if ( _.isString ( color ) ) {

        color = color.replace ( '#', '' );

         if ( /^[0-9a-f]{6}$/i.test ( color ) ) { //INFO: Full 6-chars color notation

           this.import6chars ( color );

        } else if ( /^[0-9a-f]{3}$/i.test ( color ) ) { //INFO: Shorthand 3-chars color notation

          this.import3chars ( color );

        }

      }

    }

    import6chars ( color ) {

      this.hsv = ColorHelper.hex2hsv ({
        r: color[0] + color[1],
        g: color[2] + color[3],
        b: color[4] + color[5]
      });

    }

    import3chars ( color ) {

      this.hsv = ColorHelper.hex2hsv ({
        r: color[0].repeat ( 2 ),
        g: color[1].repeat ( 2 ),
        b: color[2].repeat ( 2 )
      });

    }

    getHexStr () {

      var hex = ColorHelper.hsv2hex ( this.hsv );

      return '#' + hex.r + hex.g + hex.b;

    }

    isValid () {

      return !!this.hsv;

    }

  };

}( _, window, document ));

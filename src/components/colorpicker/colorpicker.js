
/* =========================================================================
 * Svelto - Colorpicker v0.3.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * @requires ../hex_color/hexColor.js
 * @requires ../color_helper/colorHelper.js
 * ========================================================================= */

//TODO: Add support for alpha channel
//TODO: Add a $bgs variable where we update the background

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* COLORPICKER */

  $.factory ( 'svelto.colorpicker', {

    /* OPTIONS */

    options: {
      defaultColor: '#ff0000',
      live: false,
      selectors: {
        sb: {
          wrp: '.colorpicker-saturation-brightness-wrp',
          handler: '.colorpicker-handler'
        },
        hue: {
          wrp: '.colorpicker-hue-wrp',
          handler: '.colorpicker-handler'
        },
        input: 'input'
      },
      callbacks: {
        change: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$colorpicker = this.$element;
      this.$sbWrp = this.$colorpicker.find ( this.options.selectors.sb.wrp );
      this.$sbHandler = this.$sbWrp.find ( this.options.selectors.sb.handler );
      this.$hueWrp = this.$colorpicker.find ( this.options.selectors.hue.wrp );
      this.$hueHandler = this.$hueWrp.find ( this.options.selectors.hue.handler );

      this.$input = this.$colorpicker.find ( this.options.selectors.input );

      this.sbWrpOffset = this.$sbWrp.offset ();
      this.sbWrpSize = this.$sbWrp.width ();

      this.hueWrpOffset = this.$hueWrp.offset ();
      this.hueWrpHeight = this.sbWrpSize;

      this.color = new HexColor ();
      this.hex = '';

    },

    _init: function () {

      if ( !this.set ( this.$input.val () ) ) {

        this.color = new HexColor ( this.options.defaultColor );

        this._updateSb ();
        this._updateHue ();

      }

    },

    _events: function () {

      /* SB KEYDOWN */

      this._onHover ( $document, 'keydown', this.__sbKeydown );

      /* SB DRAG */

      this.$sbHandler.draggable ({
        draggable: this.isEnabled.bind ( this ),
        $proxy: this.$sbWrp,
        constrainer: {
          $element: this.$sbWrp,
          constrainCenter: true
        },
        callbacks: {
          move: this.__sbDragMove.bind ( this ),
          end: this.__sbDragEnd.bind ( this )
        }
      });

      /* HUE KEYDOWN */

      this._onHover ( $document, 'keydown', this.__hueKeydown );

      /* HUE DRAG */

      this.$hueHandler.draggable ({
        draggable: this.isEnabled.bind ( this ),
        axis: 'y',
        $proxy: this.$hueWrp,
        constrainer: {
          $element: this.$hueWrp
        },
        callbacks: {
          move: this.__hueDragMove.bind ( this ),
          end: this.__hueDragEnd.bind ( this )
        }
      });

    },

    /* SB ARROWS */

    __sbKeydown: function () {

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

      this._updateSb ();
      this._updateInput ();

    },

    /* SB DRAG */

    _sbDragSet: function ( XY, update ) {

      this.color.hsv.s =  _.clamp ( 0, XY.X, this.sbWrpSize ) * 100 / this.sbWrpSize;
      this.color.hsv.v =  100 - ( _.clamp ( 0, XY.Y, this.sbWrpSize ) * 100 / this.sbWrpSize );

      this._updateSb ();

      if ( update ) {

        this._updateInput ();

      }

    },

    __sbDragMove: function ( data ) {

      this._sbDragSet ( data.moveXY, this.options.live );

    },

    __sbDragEnd: function ( data ) {

      this._sbDragSet ( data.endXY, true );

    },

    /* HUE ARROWS */

    __hueKeydown: function () {

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

      this._updateHue ();
      this._updateInput ();

    },

    /* HUE DRAG */

    _hueDragSet: function ( XY, update ) {

      this.color.hsv.h = 359 - ( _.clamp ( 0, XY.Y, this.hueWrpHeight ) * 359 / this.hueWrpHeight );

      this._updateHue ();

      if ( update ) {

        this._updateInput ();

      }

    },

    __hueDragMove: function ( data ) {

      this._hueDragSet ( data.moveXY, this.options.live );

    },

    __hueDragEnd: function ( data ) {

      this._hueDragSet ( data.endXY, true );

    },

    /* UPDATE */

    _updateSb: function () {

      var hsl = ColorHelper.hsv2hsl ( this.color.hsv ),
          translateX = this.sbWrpSize / 100 * this.color.hsv.s,
          translateY = this.sbWrpSize / 100 * ( 100 - this.color.hsv.v );

      this.$sbHandler.hsl ( hsl.h, hsl.s, hsl.l ).translate ( translateX, translateY );

    },

    _updateHue: function () {

      var hsl = ColorHelper.hsv2hsl ( this.color.hsv ),
          translateY = this.hueWrpHeight / 100 * ( 100 - ( this.color.hsv.h / 360 * 100 ) );

      this.$hueHandler.hsl ( this.color.hsv.h, 100, 50 ).translateY ( translateY );
      this.$sbHandler.hsl ( hsl.h, hsl.s, hsl.l );
      this.$sbWrp.hsl ( this.color.hsv.h, 100, 50 );

    },

    _updateInput: function () {

      this.hex = this.color.getHexStr ();

      this.$input.val ( this.hex ).trigger ( 'change' );

      this._trigger ( 'change', { color: this.hex } );

    },

    _update: function () {

      this._updateSb ();
      this._updateHue ();
      this._updateInput ();

    },

    /* PUBLIC */

    get: function () {

      return this.color.getHexStr ();

    },

    set: function ( color ) {

      var newColor = new HexColor ( color );

      if ( newColor.isValid && !_.isEqual ( newColor.hsv, this.color.hsv ) ) {

        this.color = newColor;

        this._update ();

      }

      return newColor.isValid;

    }

  });

  /* READY */

  $(function () {

    $('.colorpicker').colorpicker ();

  });

}( jQuery, _, window, document ));

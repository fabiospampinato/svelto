
/* =========================================================================
 * Svelto - Colorpicker
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

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'colorpicker',
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
    }
  };

  /* COLORPICKER */

  class Colorpicker extends Svelto.Widget {

    /* SPECIAL */

    _widgetize ( $root ) {

      $root.find ( '.colorpicker' ).colorpicker ();
      $root.filter ( '.colorpicker' ).colorpicker ();

    }

    _variables () {

      this.$colorpicker = this.$element;
      this.$sbWrp = this.$colorpicker.find ( this.options.selectors.sb.wrp );
      this.$sbHandler = this.$sbWrp.find ( this.options.selectors.sb.handler );
      this.$hueWrp = this.$colorpicker.find ( this.options.selectors.hue.wrp );
      this.$hueHandler = this.$hueWrp.find ( this.options.selectors.hue.handler );

      this.$input = this.$colorpicker.find ( this.options.selectors.input );

      this.sbWrpSize = this.$sbWrp.width ();

      this.hueWrpHeight = this.sbWrpSize;

      this.color = new HexColor ();
      this.hex = '';

    }

    _init () {

      if ( !this.set ( this.$input.val () ) ) {

        this.color = new HexColor ( this.options.defaultColor );

        this._updateSb ();
        this._updateHue ();

      }

    }

    _events () {

      /* CHANGE */

      this._on ( this.$input, 'change', this.__change );

      /* SB KEYDOWN */

      this._onHover ( this.$sbWrp, [$document, 'keydown', this.__sbKeydown] );

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

      this._onHover ( this.$hueWrp, [$document, 'keydown', this.__hueKeydown] );

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

    }

    /* CHANGE */

    __change () {

      this.set ( this.$input.val () );

    }

    /* SB ARROWS */

    __sbKeydown ( event ) {

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

      event.preventDefault ();
      event.stopImmediatePropagation ();

      this._updateSb ();
      this._updateInput ();

    }

    /* SB DRAG */

    _sbDragSet ( XY, update ) {

      this.color.hsv.s =  _.clamp ( 0, XY.X, this.sbWrpSize ) * 100 / this.sbWrpSize;
      this.color.hsv.v =  100 - ( _.clamp ( 0, XY.Y, this.sbWrpSize ) * 100 / this.sbWrpSize );

      this._updateSb ();

      if ( update ) {

        this._updateInput ();

      }

    }

    __sbDragMove ( data ) {

      this._sbDragSet ( data.moveXY, this.options.live );

    }

    __sbDragEnd ( data ) {

      this._sbDragSet ( data.endXY, true );

    }

    /* HUE ARROWS */

    __hueKeydown ( event ) {

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

      event.preventDefault ();
      event.stopImmediatePropagation ();

      this._updateHue ();
      this._updateInput ();

    }

    /* HUE DRAG */

    _hueDragSet ( XY, update ) {

      this.color.hsv.h = 359 - ( _.clamp ( 0, XY.Y, this.hueWrpHeight ) * 359 / this.hueWrpHeight );

      this._updateHue ();

      if ( update ) {

        this._updateInput ();

      }

    }

    __hueDragMove ( data ) {

      this._hueDragSet ( data.moveXY, this.options.live );

    }

    __hueDragEnd ( data ) {

      this._hueDragSet ( data.endXY, true );

    }

    /* UPDATE */

    _updateSb () {

      let hsl = ColorHelper.hsv2hsl ( this.color.hsv ),
          translateX = this.sbWrpSize / 100 * this.color.hsv.s,
          translateY = this.sbWrpSize / 100 * ( 100 - this.color.hsv.v );

      this.$sbHandler.hsl ( hsl.h, hsl.s, hsl.l ).translate ( translateX, translateY );

    }

    _updateHue () {

      let hsl = ColorHelper.hsv2hsl ( this.color.hsv ),
          translateY = this.hueWrpHeight / 100 * ( 100 - ( this.color.hsv.h / 360 * 100 ) );

      this.$hueHandler.hsl ( this.color.hsv.h, 100, 50 ).translateY ( translateY );
      this.$sbHandler.hsl ( hsl.h, hsl.s, hsl.l );
      this.$sbWrp.hsl ( this.color.hsv.h, 100, 50 );

    }

    _updateInput () {

      this.hex = this.color.getHexStr ();

      this.$input.val ( this.hex ).trigger ( 'change' );

      this._trigger ( 'change', { color: this.hex } );

    }

    _update () {

      this._updateSb ();
      this._updateHue ();
      this._updateInput ();

    }

    /* PUBLIC */

    get () {

      return this.color.getHexStr ();

    }

    set ( color ) {

      let newColor = new HexColor ( color );

      if ( newColor.isValid () && !_.isEqual ( newColor.hsv, this.color.hsv ) ) {

        this.color = newColor;

        this._update ();

      }

      return newColor.isValid ();

    }

  }

  /* BINDING */

  Svelto.Colorpicker = Colorpicker;
  Svelto.Colorpicker.config = config;

  /* FACTORY */

  $.factory ( Svelto.Colorpicker );

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Colorpicker
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * @requires ../color/color.js
 * ========================================================================= */

//TODO: Add support for alpha channel, by adding an opacity slider at the bottom of the sbWrp, it should be optional

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'colorpicker',
    plugin: true,
    selector: '.colorpicker',
    options: {
      defaultColor: '#ff0000', //INFO: It can be anything supported by the `Svelto.Color` obj
      live: false,
      selectors: {
        sb: {
          wrp: '.colorpicker-sb',
          handler: '.colorpicker-handler'
        },
        hue: {
          wrp: '.colorpicker-hue',
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

    _variables () {

      this.$colorpicker = this.$element;
      this.$sbWrp = this.$colorpicker.find ( this.options.selectors.sb.wrp );
      this.$sbHandler = this.$sbWrp.find ( this.options.selectors.sb.handler );
      this.$hueWrp = this.$colorpicker.find ( this.options.selectors.hue.wrp );
      this.$hueHandler = this.$hueWrp.find ( this.options.selectors.hue.handler );

      this.$input = this.$colorpicker.find ( this.options.selectors.input );

      this.sbWrpSize = this.$sbWrp.width ();

      this.hueWrpHeight = this.sbWrpSize;

      this.hsv = false;

    }

    _init () {

      if ( !this.set ( this.$input.val () ) ) {

        this.set ( this.options.defaultColor );

      }

    }

    _events () {

      /* CHANGE */

      this._on ( true, this.$input, 'change', this.__change );

      /* SB KEYDOWN */

      this._onHover ( this.$sbWrp, [$document, 'keydown', this.__sbKeydown] );

      /* SB DRAG */

      this.$sbHandler.draggable ({
        draggable: this.isEnabled.bind ( this ),
        proxy: {
          $element: this.$sbWrp
        },
        constrainer: {
          $element: this.$sbWrp,
          center: true
        },
        callbacks: {
          move: this._throttle ( this.__sbDragMove.bind ( this ), 100 ),
          end: this.__sbDragEnd.bind ( this )
        }
      });

      /* HUE KEYDOWN */

      this._onHover ( this.$hueWrp, [$document, 'keydown', this.__hueKeydown] );

      /* HUE DRAG */

      this.$hueHandler.draggable ({
        draggable: this.isEnabled.bind ( this ),
        axis: 'y',
        proxy: {
          $element: this.$hueWrp
        },
        constrainer: {
          $element: this.$hueWrp
        },
        callbacks: {
          move: this._throttle ( this.__hueDragMove.bind ( this ), 50 ),
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

        case Svelto.keyCode.UP:
          this.hsv.v = Math.min ( 100, this.hsv.v + 1 );
          break;

        case Svelto.keyCode.RIGHT:
          this.hsv.s = Math.min ( 100, this.hsv.s + 1 );
          break;

        case Svelto.keyCode.DOWN:
          this.hsv.v = Math.max ( 0, this.hsv.v - 1 );
          break;

        case Svelto.keyCode.LEFT:
          this.hsv.s = Math.max ( 0, this.hsv.s - 1 );
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

      this.hsv.s =  _.clamp ( 0, XY.X, this.sbWrpSize ) * 100 / this.sbWrpSize;
      this.hsv.v =  100 - ( _.clamp ( 0, XY.Y, this.sbWrpSize ) * 100 / this.sbWrpSize );

      this._updateSb ();

      if ( update ) {

        this._updateInput ();

      }

    }

    __sbDragMove ( event, data ) {

      this._sbDragSet ( data.dragXY, this.options.live );

    }

    __sbDragEnd ( event, data ) {

      this._sbDragSet ( data.dragXY, true );

    }

    /* HUE ARROWS */

    __hueKeydown ( event ) {

      switch ( event.keyCode ) {

        case Svelto.keyCode.UP:
          this.hsv.h = Math.min ( 359, this.hsv.h + 1 );
          break;

        case Svelto.keyCode.DOWN:
          this.hsv.h = Math.max ( 0, this.hsv.h - 1 );
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

      this.hsv.h = 359 - ( _.clamp ( 0, XY.Y, this.hueWrpHeight ) * 359 / this.hueWrpHeight );

      this._updateHue ();

      if ( update ) {

        this._updateInput ();

      }

    }

    __hueDragMove ( event, data ) {

      this._hueDragSet ( data.dragXY, this.options.live );

    }

    __hueDragEnd ( event, data ) {

      this._hueDragSet ( data.dragXY, true );

    }

    /* UPDATE */

    _updateSb () {

      let hsl = Svelto.Color.hsv2hsl ( this.hsv ),
          translateX = this.sbWrpSize / 100 * this.hsv.s,
          translateY = this.sbWrpSize / 100 * ( 100 - this.hsv.v );

      this.$sbHandler.hsl ( hsl.h, hsl.s, hsl.l ).translate ( translateX, translateY );

    }

    _updateHue () {

      let hsl = Svelto.Color.hsv2hsl ( this.hsv ),
          translateY = this.hueWrpHeight / 100 * ( 100 - ( this.hsv.h / 360 * 100 ) );

      this.$hueHandler.hsl ( this.hsv.h, 100, 50 ).translateY ( translateY );
      this.$sbHandler.hsl ( hsl.h, hsl.s, hsl.l );
      this.$sbWrp.hsl ( this.hsv.h, 100, 50 );

    }

    _updateInput () {

      let hexStr = this._getHexStr ();

      this.$input.val ( hexStr ).trigger ( 'change' );

      this._trigger ( 'change' );

    }

    _update () {

      this._updateSb ();
      this._updateHue ();
      this._updateInput ();

    }

    /* OTHERS */

    _getHexStr () {

      let hex = Svelto.Color.hsv2hex ( this.hsv );

      return '#' + hex.r + hex.g + hex.b;

    }

    /* PUBLIC */

    get () {

      return this._getHexStr ();

    }

    set ( color ) {

      color = _.attempt ( () => new Svelto.Color ( color ) );

      if ( !_.isError ( color ) ) {

        let hsv = color.getHsv ();

        if ( !_.isEqual ( this.hsv, hsv ) ) {

          this.hsv = hsv;

          this._update ();

          return true;

        }

      }

      return false;

    }

  }

  /* FACTORY */

  $.factory ( Colorpicker, config, Svelto );

}( Svelto.$, Svelto._, window, document ));

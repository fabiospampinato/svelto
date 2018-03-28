
// @require core/widget/widget.js
// @require lib/color/color.js
// @require lib/transform/transform.js
// @require widgets/draggable/draggable.js

//FIXME: Add support of it working without a `startColor`
//TODO: Add support for not setting a starting color, in some cases it might be needed not to set a color by default
//TODO: Add support for alpha channel, by adding an opacity slider at the bottom of the sbWrp, it should be optional

(function ( $, _, Svelto, Widgets, Factory, Color, Keyboard ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'colorpicker',
    plugin: true,
    selector: '.colorpicker',
    options: {
      exporters: {
        hex ( color ) {
          let hex = color.getHex ();
          return '#' + hex.r + hex.g + hex.b;
        }
      },
      startColor: '#ff0000', // It can be anything supported by the `Color` obj
      format: {
        type: 'hex', // One of the formats implemented in the exporters
        data: undefined // Passed to the called the exporter
      },
      live: false, // Whether it will update the input also on `Draggable.move` or just on `Draggable.end`
      selectors: {
        sb: {
          wrp: '.colorpicker-sb',
          handler: '.colorpicker-sb .colorpicker-handler'
        },
        hue: {
          wrp: '.colorpicker-hue',
          handler: '.colorpicker-hue .colorpicker-handler'
        },
        input: 'input'
      },
      callbacks: {
        change: _.noop
      }
    }
  };

  /* COLORPICKER */

  class Colorpicker extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$colorpicker = this.$element;
      this.$sbWrp = this.$colorpicker.find ( this.options.selectors.sb.wrp );
      this.$sbHandler = this.$colorpicker.find ( this.options.selectors.sb.handler );
      this.$hueWrp = this.$colorpicker.find ( this.options.selectors.hue.wrp );
      this.$hueHandler = this.$colorpicker.find ( this.options.selectors.hue.handler );

      this.$input = this.$colorpicker.find ( this.options.selectors.input );

      this.sbWrpSize = this.$sbWrp.width ();

      this.hueWrpHeight = this.sbWrpSize;

      this.hsv = false;

    }

    _init () {

      this.set ( this.$input.val () );

      if ( !this.hsv ) {

        this.set ( this.options.startColor );

      }

    }

    _events () {

      this.___change ();

      this.___sbKeydown ();
      this.___sbDrag ();

      this.___hueKeydown ();
      this.___hueDrag ();

    }

    _destroy () {

      /* DRAG */

      this.$sbHandler.draggable ( 'destroy' );
      this.$hueHandler.draggable ( 'destroy' );

    }

    /* CHANGE */

    ___change () {

      this._on ( true, this.$input, 'change', this.__change );

    }

    __change () {

      this.set ( this.$input.val () );

    }

    /* SB ARROWS */

    ___sbKeydown () {

      this._onHover ( this.$sbWrp, [$.$document, 'keydown', this.__sbKeydown] );

    }

    __sbKeydown ( event ) {

      switch ( event.keyCode ) {

        case Keyboard.keys.UP:
          this.hsv.v = Math.min ( 100, this.hsv.v + 1 );
          break;

        case Keyboard.keys.RIGHT:
          this.hsv.s = Math.min ( 100, this.hsv.s + 1 );
          break;

        case Keyboard.keys.DOWN:
          this.hsv.v = Math.max ( 0, this.hsv.v - 1 );
          break;

        case Keyboard.keys.LEFT:
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

    ___sbDrag () {

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
          start: this.__sbDragStart.bind ( this ),
          move: this._frames ( this.__sbDragMove.bind ( this ) ),
          end: this.__sbDragEnd.bind ( this )
        }
      });

    }

    _sbDragSet ( XY, update ) {

      this.hsv.s =  _.clamp ( XY.x, 0, this.sbWrpSize ) * 100 / this.sbWrpSize;
      this.hsv.v =  100 - ( _.clamp ( XY.y, 0, this.sbWrpSize ) * 100 / this.sbWrpSize );

      this._updateSb ( false );

      if ( update ) {

        this._updateInput ();

      }

    }

    __sbDragStart () {

      this._sbDragging = true;

    }

    __sbDragMove ( event, data ) {

      if ( !this._sbDragging ) return;

      this._sbDragSet ( data.dragXY, this.options.live );

    }

    __sbDragEnd ( event, data ) {

      this._sbDragging = false;

      this._sbDragSet ( data.dragXY, true );

    }

    /* HUE ARROWS */

    ___hueKeydown () {

      this._onHover ( this.$hueWrp, [$.$document, 'keydown', this.__hueKeydown] );

    }

    __hueKeydown ( event ) {

      switch ( event.keyCode ) {

        case Keyboard.keys.UP:
          this.hsv.h = Math.min ( 359, this.hsv.h + 1 );
          break;

        case Keyboard.keys.DOWN:
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

    ___hueDrag () {

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
          start: this.__hueDragStart.bind ( this ),
          move: this._frames ( this.__hueDragMove.bind ( this ) ),
          end: this.__hueDragEnd.bind ( this )
        }
      });

    }

    _hueDragSet ( XY, update ) {

      this.hsv.h = 359 - ( _.clamp ( XY.y, 0, this.hueWrpHeight ) * 359 / this.hueWrpHeight );

      this._updateHue ( false );

      if ( update ) {

        this._updateInput ();

      }

    }

    __hueDragStart () {

      this._hueDragging = true;

    }


    __hueDragMove ( event, data ) {

      if ( !this._hueDragging ) return;

      this._hueDragSet ( data.dragXY, this.options.live );

    }

    __hueDragEnd ( event, data ) {

      this._hueDragging = false;

      this._hueDragSet ( data.dragXY, true );

    }

    /* UPDATE */

    _updateSb ( _translate = true ) {

      /* HSL */

      let hsl = Color.hsv2hsl ( this.hsv );

      this.$sbHandler.hsl ( hsl.h, hsl.s, hsl.l );

      /* TRANSLATE */

      if ( _translate ) {

        let translateX = this.sbWrpSize / 100 * this.hsv.s,
            translateY = this.sbWrpSize / 100 * ( 100 - this.hsv.v );

        this.$sbHandler.translate ( translateX, translateY );

      }

    }

    _updateHue ( _translate = true ) {

      /* HSL */

      let hsl = Color.hsv2hsl ( this.hsv );

      this.$hueHandler.hsl ( this.hsv.h, 100, 50 );
      this.$sbHandler.hsl ( hsl.h, hsl.s, hsl.l );
      this.$sbWrp.hsl ( this.hsv.h, 100, 50 );

      /* TRANSLATE */

      if ( _translate ) {

        let translateY = this.hueWrpHeight / 100 * ( 100 - ( this.hsv.h / 360 * 100 ) );

        this.$hueHandler.translateY ( translateY );

      }

    }

    _updateInput () {

      this.$input.val ( this._export () ).trigger ( 'change' );

      this._trigger ( 'change' );

    }

    _update () {

      this._updateSb ();
      this._updateHue ();
      this._updateInput ();

    }

    /* EXPORT */

    _export () {

      return this.options.exporters[this.options.format.type] ( new Color ( this.hsv, 'hsv' ), this.options.format.data );

    }

    /* API */

    get () {

      return this._export ();

    }

    set ( color ) {

      color = _.attempt ( () => new Color ( color ) );

      if ( _.isError ( color ) ) return;

      let hsv = color.getHsv ();

      if ( _.isEqual ( this.hsv, hsv ) ) return;

      this.hsv = hsv;

      this._update ();

    }

  }

  /* FACTORY */

  Factory.make ( Colorpicker, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Color, Svelto.Keyboard ));

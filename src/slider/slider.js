
/* =========================================================================
 * Svelto - Slider
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * @requires ../draggable/draggable.js
 * @requires ../transform/transform.js
 * ========================================================================= */

//TODO: Add vertical slider
//TODO: Make it work without the window resize bind, before we where transforming the transform to a left

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'slider',
    selector: '.slider',
    options: {
      min: 0,
      max: 100,
      value: 0,
      step: 1,
      decimals: 0,
      live: false,
      datas: {
        min: 'min',
        max: 'max',
        step: 'step',
        decimals: 'decimals'
      },
      selectors: {
        input: 'input',
        min: '.slider-min',
        max: '.slider-max',
        bar: '.slider-bar',
        unhighlight: '.slider-unhighlight',
        highlight: '.slider-highlight',
        handlerWrp: '.slider-handler-wrp',
        label: '.slider-label'
      },
      callbacks: {
        change () {}
      }
    }
  };

  /* SLIDER */

  class Slider extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$slider = this.$element;
      this.$input = this.$slider.find ( this.options.selectors.input );
      this.$min = this.$slider.find ( this.options.selectors.min );
      this.$max = this.$slider.find ( this.options.selectors.max );
      this.$bar = this.$slider.find ( this.options.selectors.bar );
      this.$unhighlight = this.$slider.find ( this.options.selectors.unhighlight );
      this.$highlight = this.$slider.find ( this.options.selectors.highlight );
      this.$handlerWrp = this.$slider.find ( this.options.selectors.handlerWrp );
      this.$label = this.$handlerWrp.find ( this.options.selectors.label );

    }

    _init () {

      /* CONFIG */

      this.options.min = Number ( this.$min.data ( this.options.datas.min ) ) || this.options.min;
      this.options.max = Number ( this.$max.data ( this.options.datas.max ) ) || this.options.max;
      this.options.value = Number ( this.$input.val () ) || this.options.value;
      this.options.step = Number ( this.$slider.data ( this.options.datas.step ) ) || this.options.step;
      this.options.decimals = Number ( this.$slider.data ( this.options.datas.decimals ) ) || this.options.decimals;

      /* STEPS NR */

      this.stepsNr = ( this.options.max - this.options.min ) / this.options.step;

      /* UPDATE */

      this._updateVariables ();
      this._updatePositions ();

    }

    _events () {

      /* INPUT CHANGE */

      this._on ( true, this.$input, 'change', this.__change );

      /* WINDOW RESIZE */

      this._on ( true, $window, 'resize', this._throttle ( this.__resize, 250 ) );

      /* KEYDOWN */

      this._onHover ( [$document, 'keydown', this.__keydown] );

      /* MIN / MAX BUTTONS */

      this._on ( this.$min, Pointer.tap, this.decrease );
      this._on ( this.$max, Pointer.tap, this.increase );

      /* DRAG */

      this.$handlerWrp.draggable ({
        draggable: this.isEnabled.bind ( this ),
        axis: 'x',
        $proxy: this.$bar,
        constrainer: {
          $element: this.$bar,
          constrainCenter: true
        },
        modifiers: {
          x: this._dragModifierX.bind ( this )
        },
        callbacks: {
          move: this.__dragMove.bind ( this ), //TODO: Maybe throttle it after we do the layers analysis
          end: this.__dragEnd.bind ( this )
        }
      });

    }

    /* PRIVATE */

    _roundValue ( value ) {

      return Number ( Number ( value ).toFixed ( this.options.decimals ) );

    }

    /* UPDATE */

    _updateVariables () {

      this.unhighlightWidth = this.$unhighlight.width ();

      this.stepWidth = this.unhighlightWidth / this.stepsNr;

    }

    _updatePositions () {

      let percentage = ( this.options.value - this.options.min ) / this.options.step * 100 / this.stepsNr,
          translateX = this.unhighlightWidth / 100 * percentage;

      this.$handlerWrp.translateX ( translateX );

      this.$highlight.translateX ( translateX );

    }

    _updateLabel ( value ) {

      this.$label.html ( value || this.options.value );

    }

    _updateInput () {

      this.$input.val ( this.options.value ).trigger ( 'change' );

    }

    _update () {

      this._updatePositions ();
      this._updateLabel ();
      this._updateInput ();

    }

    /* CHANGE */

    __change () {

      this.set ( this.$input.val () );

    }

    /* RESIZE */

    __resize () {

      this._updateVariables ();
      this._updatePositions ();

    }

    /* LEFT / RIGHT ARROWS */

    __keydown ( event ) {

      switch ( event.keyCode ) {

        case Svelto.keyCode.LEFT:
        case Svelto.keyCode.DOWN:
          this.decrease ();
          break;

        case Svelto.keyCode.RIGHT:
        case Svelto.keyCode.UP:
          this.increase ();
          break;

        default:
          return;

      }

      event.preventDefault ();
      event.stopImmediatePropagation ();

    }

    /* DRAG */

    _dragModifierX ( distance ) {

      return _.roundCloser ( distance, this.stepWidth );

    }

    __dragMove ( data ) {

      if ( this.options.live ) {

        this.set ( this.options.min + ( data.moveXY.X / this.stepWidth * this.options.step ) );

      } else {

        this.$highlight.translateX ( data.moveXY.X );

        this._updateLabel ( this._roundValue ( this.options.min + ( data.moveXY.X / this.stepWidth * this.options.step ) ) );

      }

    }

    __dragEnd ( data ) {

      this.set ( this.options.min + ( data.endXY.X / this.stepWidth * this.options.step ) );

    }

    /* API */

    get () {

      return this.options.value;

    }

    set ( value ) {

      value = this._roundValue ( value );

      if ( !_.isNaN ( value ) ) {

        value = _.clamp ( this.options.min, value, this.options.max );

        if ( value !== this.options.value ) {

          this.options.value = value;

          this._update ();

          this._trigger ( 'change' );

        }

      }

    }

    increase () {

      this.set ( this.options.value + this.options.step );

    }

    decrease () {

      this.set ( this.options.value - this.options.step );

    }

  }

  /* BINDING */

  Svelto.Slider = Slider;
  Svelto.Slider.config = config;

  /* FACTORY */

  $.factory ( Svelto.Slider );

}( Svelto.$, Svelto._, window, document ));

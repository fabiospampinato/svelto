
/* =========================================================================
 * Svelto - Slider
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../draggable/draggable.js
 * @requires ../transform/transform.js
 * ========================================================================= */

//TODO: Add vertical slider
//TODO: Make it work without the window resize bind, before we where transforming the transform to a left

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'slider',
    plugin: true,
    selector: '.slider',
    options: {
      min: 0,
      max: 100,
      value: 0,
      step: 1, // Only multiples of `step` are valid values
      decimals: 0, // Trunc the value to this amount of decimal numbers
      live: false, // Wether it will update the input also on `Draggable.move` or just on `Draggable.end`
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
        label: '.slider-handler-wrp .slider-label'
      },
      keystrokes: {
        'left, down': 'decrease',
        'right, up': 'increase'
      },
      callbacks: {
        change: _.noop
      }
    }
  };

  /* SLIDER */

  class Slider extends Widgets.Widget {

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
      this.$label = this.$slider.find ( this.options.selectors.label );

    }

    _init () {

      /* VARIABLES */

      let value = this.$input.val ();

      /* OPTIONS */

      this.options.min = Number ( this.$min.data ( this.options.datas.min ) || this.options.min );
      this.options.max = Number ( this.$max.data ( this.options.datas.max ) || this.options.max );
      this.options.value = this._sanitizeValue ( value || this.options.value );
      this.options.step = Number ( this.$slider.data ( this.options.datas.step ) || this.options.step );
      this.options.decimals = Number ( this.$slider.data ( this.options.datas.decimals ) || this.options.decimals );

      /* STEPS NR */

      this.stepsNr = ( this.options.max - this.options.min ) / this.options.step;

      /* UPDATE */

      this._updateVariables ();

      if ( Number ( value ) !== this.options.value ) {

        this._update ();

      } else {

        this._updatePositions ();
        this._updateLabel ();

      }

    }

    _events () {

      this.___change ();
      this.___resize ();
      this.___keydown ();
      this.___minTap ();
      this.___maxTap ();
      this.___drag ();

    }

    /* PRIVATE */

    _sanitizeValue ( value ) {

      return _.clamp ( Number ( Number ( value ).toFixed ( this.options.decimals ) ), this.options.min, this.options.max );

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

    _updateLabel ( value = this.options.value ) {

      this.$label.text ( value );

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

    ___change () {

      this._on ( true, this.$input, 'change', this.__change );

    }

    __change () {

      this.set ( this.$input.val () );

    }

    /* RESIZE */

    ___resize () {

      this._on ( true, this.$window, 'resize', this._debounce ( this.__resize, 100 ) ); //FIXME: It should handle a generic parent `resize`-like event, not just on `this.$window`

    }

    __resize () {

      this._updateVariables ();
      this._updatePositions ();

    }

    /* KEYDOWN */

    ___keydown () {

      this._onHover ( [$document, 'keydown', this.__keydown] );

    }

    /* MIN TAP */

    ___minTap () {

      this._on ( this.$min, Pointer.tap, this.decrease );

    }

    /* MAX TAP */

    ___maxTap () {

      this._on ( this.$max, Pointer.tap, this.increase );

    }

    /* DRAG */

    ___drag () {

      this.$handlerWrp.draggable ({
        draggable: this.isEnabled.bind ( this ),
        axis: 'x',
        proxy: {
          $element: this.$bar
        },
        constrainer: {
          $element: this.$bar,
          center: true
        },
        modifiers: {
          x: this._dragModifierX.bind ( this )
        },
        callbacks: {
          move: this.__dragMove.bind ( this ),
          end: this.__dragEnd.bind ( this )
        }
      });

    }

    _dragModifierX ( distance ) {

      return _.roundCloser ( distance, this.stepWidth );

    }

    __dragMove ( event, data ) {

      if ( this.options.live ) {

        this.set ( this.options.min + ( data.dragXY.X / this.stepWidth * this.options.step ) );

      } else {

        this.$highlight.translateX ( data.dragXY.X );

        this._updateLabel ( this._sanitizeValue ( this.options.min + ( data.dragXY.X / this.stepWidth * this.options.step ) ) );

      }

    }

    __dragEnd ( event, data ) {

      this.set ( this.options.min + ( data.dragXY.X / this.stepWidth * this.options.step ) );

    }

    /* API */

    get () {

      return this.options.value;

    }

    set ( value ) {

      value = this._sanitizeValue ( value );

      if ( _.isNaN ( value ) || value === this.options.value ) return;

      this.options.value = value;

      this._update ();

      this._trigger ( 'change' );

    }

    increase () {

      this.set ( this.options.value + this.options.step );

    }

    decrease () {

      this.set ( this.options.value - this.options.step );

    }

  }

  /* FACTORY */

  Factory.init ( Slider, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));

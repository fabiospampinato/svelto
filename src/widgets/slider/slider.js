
// @require lib/transform/transform.js
// @require widgets/draggable/draggable.js

//TODO: Add vertical slider

(function ( $, _, Svelto, Widgets, Factory ) {

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
      live: false, // Whether it will update the input also on `Draggable.move` or just on `Draggable.end`
      datas: {
        min: 'min',
        max: 'max',
        step: 'step',
        decimals: 'decimals'
      },
      selectors: {
        input: 'input',
        bar: '.slider-bar',
        highlight: '.slider-highlight',
        handler: '.slider-handler',
        label: '.slider-handler .slider-label'
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
      this.$bar = this.$slider.find ( this.options.selectors.bar );
      this.$highlight = this.$slider.find ( this.options.selectors.highlight );
      this.$handler = this.$slider.find ( this.options.selectors.handler );
      this.$label = this.$slider.find ( this.options.selectors.label );

    }

    _init () {

      /* VARIABLES */

      let value = this.$input.val ();

      /* OPTIONS */

      this.options.min = Number ( this.$slider.data ( this.options.datas.min ) || this.options.min );
      this.options.max = Number ( this.$slider.data ( this.options.datas.max ) || this.options.max );
      this.options.value = this._sanitizeValue ( value || this.options.value );
      this.options.step = Number ( this.$slider.data ( this.options.datas.step ) || this.options.step );
      this.options.decimals = Number ( this.$slider.data ( this.options.datas.decimals ) || this.options.decimals );

      /* STEPS NR */

      this.stepsNr = ( this.options.max - this.options.min ) / this.options.step;

      /* UPDATE */

      if ( Number ( value ) !== this.options.value ) {

        this._update ();

      } else {

        this._updatePositions ();
        this._updateLabel ();

      }

    }

    _events () {

      this.___change ();
      this.___keydown ();
      this.___drag ();

    }

    /* PRIVATE */

    _sanitizeValue ( value ) {

      return _.clamp ( Number ( Number ( value ).toFixed ( this.options.decimals ) ), this.options.min, this.options.max );

    }

    /* UPDATE */

    _updateVariables () {

      this.barWidth = this.$bar.width ();

      this.stepWidth = this.barWidth / this.stepsNr;

    }

    _updatePositions ( value = this.options.value ) {

      let percentage = ( value - this.options.min ) / this.options.step * 100 / this.stepsNr;

      this.$handler.css ( 'left', percentage + '%' );
      this.$highlight.css ( 'right', ( 100 - percentage ) + '%' );

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

    /* KEYDOWN */

    ___keydown () {

      this._onHover ( [$.$document, 'keydown', this.__keydown] );

    }

    /* DRAG */

    ___drag () {

      this.$handler.draggable ({
        draggable: this.isEnabled.bind ( this ),
        axis: 'x',
        proxy: {
          $element: this.$slider,
          noMotion: this.__dragNoMotion.bind ( this )
        },
        modifiers: {
          x: this.__dragModifierX.bind ( this )
        },
        callbacks: {
          start: this.__dragStart.bind ( this ),
          move: this.__dragMove.bind ( this ),
          end: this.__dragEnd.bind ( this )
        }
      });

    }

    __dragNoMotion () {

      return !this._dragDistance;

    }

    _dragValue () {

      return this._sanitizeValue ( this.options.value + ( this._dragDistance / this.stepWidth * this.options.step ) );

    }

    __dragModifierX ( distance ) {

      this._dragDistance = this._dragProxyDistance + _.roundCloser ( distance, this.stepWidth );

      if ( this._dragIsProxyed && !this._dragProxyDistance ) {

        this._dragProxyDistance = this._dragDistance;

      }

      return false;

    }

    __dragStart ( event, data ) {

      this._dragIsProxyed = data.isProxyed;
      this._dragProxyDistance = 0;
      this._dragDistance = 0;

      this._updateVariables ();

    }

    __dragMove () {

      let value = this._dragValue ();

      if ( this.options.live ) {

        this.set ( value );

      } else {

        this._updateLabel ( value );
        this._updatePositions ( value );

      }

    }

    __dragEnd () {

      this.set ( this._dragValue () );

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

  Factory.make ( Slider, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

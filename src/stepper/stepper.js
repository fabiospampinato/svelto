
/* =========================================================================
 * Svelto - Stepper
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'stepper',
    selector: '.stepper',
    options: {
      min: 0,
      max: 100,
      value: 0,
      step: 1,
      datas: {
        min: 'min',
        max: 'max',
        step: 'step'
      },
      selectors: {
        decreaser: '.stepper-decreaser',
        input: 'input',
        increaser: '.stepper-increaser'
      },
      keystrokes: {
        'left, down': 'decrease',
        'right, up': 'increase'
      },
      callbacks: {
        change () {},
        increase () {},
        decrease () {}
      }
    }
  };

  /* STEPPER */

  class Stepper extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$stepper = this.$element;
      this.$input = this.$stepper.find ( this.options.selectors.input );
      this.$decreaser = this.$stepper.find ( this.options.selectors.decreaser );
      this.$increaser = this.$stepper.find ( this.options.selectors.increaser );

      this._prevValue = false;

    }

    _init () {

      /* CONFIG */

      this.options.min = Number ( this.$stepper.data ( this.options.datas.min ) || this.options.min );
      this.options.max = Number ( this.$stepper.data ( this.options.datas.max ) || this.options.max );
      this.options.step = Number ( this.$stepper.data ( this.options.datas.step ) || this.options.step );
      this.options.value = this._sanitizeValue ( Number ( this.$input.val () ) || this.options.value );

      /* UPDATE */

      this._updateButtons ();

    }

    _events () {

      /* INPUT / CHANGE */

      this._on ( true, this.$input, 'input change', this.__inputChange );

      /* KEYDOWN */

      this._onHover ( [$document, 'keydown', this.__keydown] );

      /* INCREASE */

      this._on ( this.$decreaser, Pointer.tap, this.decrease );

      /* DECREASE */

      this._on ( this.$increaser, Pointer.tap, this.increase );

    }

    /* PRIVATE */

    _sanitizeValue ( value ) {

      value = Number ( value );

      value = _.isNaN ( value ) ? 0 : _.roundCloser ( value, this.options.step );

      return _.clamp ( this.options.min, value, this.options.max );

    }

    /* UPDATE */

    _updateInput () {

      this.$input.val ( this.options.value ).trigger ( 'change' );

    }

    _updateButtons () {

      let isMin = ( this.options.value === this.options.min ),
          isMax = ( this.options.value === this.options.max );

      if ( isMin || this._prevValue === this.options.min ) {

        this.$decreaser.toggleClass ( 'disabled', isMin );

      } else if ( isMax || this._prevValue === this.options.max ) {

        this.$increaser.toggleClass ( 'disabled', isMax );

      }

    }

    _update () {

      this._updateInput ();
      this._updateButtons ();

    }

    /* CHANGE */

    __inputChange () {

      this.set ( this.$input.val () );

    }

    /* PUBLIC */

    get () {

      return this.options.value;

    }

    set ( value ) {

      value = Number ( value );

      if ( !_.isNaN ( value ) ) {

        value = this._sanitizeValue ( value );

        if ( value !== this.options.value ) {

          this._prevValue = this.options.value;

          this.options.value = value;

          this._update ();

          this._trigger ( 'change' );

          this._trigger ( ( this.options.value > this._prevValue ) ? 'increase' : 'decrease' );

          return;

        }

      }

      /* RESETTING IF WE ALTERED THE INPUT VALUE */

      if ( this.$input.val () !== String ( this.options.value ) ) {

        this._updateInput ();

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

  Svelto.Stepper = Stepper;
  Svelto.Stepper.config = config;

  /* FACTORY */

  $.factory ( Svelto.Stepper );

}( Svelto.$, Svelto._, window, document ));

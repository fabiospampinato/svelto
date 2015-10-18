
/* =========================================================================
 * Svelto - Stepper
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* STEPPER */

  $.factory ( 'svelto.stepper', {

    /* OPTIONS */

    options: {
      min: 0,
      max: 100,
      value: 0,
      step: 1,
      selectors: {
        decreaser: '.stepper-decreaser',
        input: 'input',
        increaser: '.stepper-increaser'
      },
      callbacks: {
        change: _.noop,
        increase: _.noop,
        decrease: _.noop
      }
    },

    /* SPECIAL */

    _widgetize: function ( $root ) {

      $root.find ( '.stepper' ).each ( function () {

        var $stepper = $(this);

        $stepper.stepper ({
          min: Number($stepper.data ( 'min' ) || 0),
          max: Number($stepper.data ( 'max' ) || 100),
          value: Number($stepper.find ( '.stepper-input' ).val () || 0),
          step: Number($stepper.data ( 'step' ) || 1)
        });

      });

    },

    _variables: function () {

      this.$stepper = this.$element;
      this.$decreaser = this.$stepper.find ( this.options.selectors.decreaser );
      this.$input = this.$stepper.find ( this.options.selectors.input );
      this.$increaser = this.$stepper.find ( this.options.selectors.increaser );

      this.options.value = this._sanitizeValue ( this.options.value );

    },

    _init: function () {

      this._updateButtons ();

    },

    _events: function () {

      /* INPUT / CHANGE */

      this._on ( true, this.$input, 'input change', this.__inputChange );

      /* KEYDOWN */

      this._onHover ( [$document, 'keydown', this.__keydown] );

      /* INCREASE */

      this._on ( this.$decreaser, Pointer.tap, this.decrease );

      /* DECREASE */

      this._on ( this.$increaser, Pointer.tap, this.increase );

    },

    /* PRIVATE */

    _sanitizeValue: function ( value ) {

      var nr = Number ( value );

      value = ( _.isNaN ( nr ) ? 0 : nr );

      var remaining = ( value % this.options.step );

      value = value - remaining + ( remaining >= this.options.step / 2 ? this.options.step : 0 );

      return _.clamp ( this.options.min, value, this.options.max );

    },

    /* UPDATE */

    _updateInput: function () {

      this.$input.val ( this.options.value ).trigger ( 'change' );

    },

    _updateButtons: function ( previous ) {

      var isMin = ( this.options.value === this.options.min ),
          isMax = ( this.options.value === this.options.max );

      if ( previous === this.options.min || isMin ) {

        this.$decreaser.toggleClass ( 'disabled', isMin );

      } else if ( previous === this.options.max || isMax ) {

        this.$increaser.toggleClass ( 'disabled', isMax );

      }

    },

    _update: function ( previous ) {

      this._updateInput ();
      this._updateButtons ( previous );

    },

    /* CHANGE */

    __inputChange: function () {

      this.set ( this.$input.val () );

    },

    /* LEFT / RIGHT ARROWS */

    __keydown: function ( event ) {

      switch ( event.keyCode ) {

        case $.ui.keyCode.UP:
          this.increase ();
          break;

        case $.ui.keyCode.DOWN:
          this.decrease ();
          break;

        default:
          break;

      }

      event.preventDefault ();
      event.stopImmediatePropagation ();

    },

    /* PUBLIC */

    get: function () {

      return this.options.value;

    },

    set: function ( value ) {

      value = Number ( value );

      if ( !_.isNaN ( value ) ) {

        value = this._sanitizeValue ( value );

        if ( value !== this.options.value ) {

          var data = {
            previous: this.options.value,
            value: value
          };

          this.options.value = value;

          this._update ( data.previous );

          this._trigger ( 'change', data );

          this._trigger ( ( data.previous < data.value ) ? 'increase' : 'decrease', data );

          return;

        }

      }

      /* RESETTING IF WE ALTERED THE INPUT VALUE */

      if ( this.$input.val () !== String ( this.options.value ) ) {

        this._updateInput ();

      }

    },

    increase: function () {

      this.set ( this.options.value + this.options.step );

    },

    decrease: function () {

      this.set ( this.options.value - this.options.step );

    }

  });

}( jQuery, _, window, document ));

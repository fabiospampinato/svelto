
/* =========================================================================
 * Svelto - Stepper v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* STEPPER */

  $.widget ( 'presto.stepper', {

    /* OPTIONS */

    options: {
      min: 0,
      max: 100,
      value: 0,
      step: 1,
      decimals: 0,
      callbacks: {
        increase: _.noop,
        decrease: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$stepper = this.$element;
      this.$input = this.$stepper.find ( 'input' );
      this.$decreaser = this.$stepper.find ( '.stepper-decreaser' );
      this.$increaser = this.$stepper.find ( '.stepper-increaser' );

    },

    _events: function () {

      /* INPUT / CHANGE */

      this._on ( true, this.$input, 'input change', this._handler_input_change );

      /* ARROWS */

      this._on ( 'mouseenter', this._handler_arrows_in );
      this._on ( 'mouseleave', this._handler_arrows_out );

      /* INCREASE / DECREASE */

      this._on ( this.$decreaser, 'click', this.decrease );

      this._on ( this.$increaser, 'click', this.increase );

    },

    /* PRIVATE */

    _round_value: function ( value ) {

      return Number(Number(value).toFixed ( this.options.decimals ));

    },

    /* CHANGE */

    _handler_input_change: function () {

      this.set_value ( this.$input.val () );

    },

    /* LEFT / RIGHT ARROWS */

    _handler_arrows_in: function ( event ) {

      this._on ( $document, 'keydown', this._handler_arrows_keydown );

    },

    _handler_arrows_out: function ( event ) {

      this._off ( $document, 'keydown', this._handler_arrows_keydown );

    },

    _handler_arrows_keydown: function ( event ) {

      if ( event.keyCode === $.ui.keyCode.LEFT || event.keyCode === $.ui.keyCode.DOWN ) {

        this.decrease ();

      } else if ( event.keyCode === $.ui.keyCode.RIGHT || event.keyCode === $.ui.keyCode.UP ) {

        this.increase ();

      }

    },

    /* PUBLIC */

    set_value: function ( value ) {

      value = this._round_value ( value );

      if ( value !== this.options.value || this.$input.val ().length === 0 ) {

        var clamped = _.clamp ( this.options.min, value, this.options.max );

        this.options.value = clamped;

        this.$input.val ( clamped ).trigger ( 'change' );

        this.$decreaser.toggleClass ( 'disabled', clamped === this.options.min );
        this.$increaser.toggleClass ( 'disabled', clamped === this.options.max );

        this._trigger ( clamped > this.options.value ? 'increase' : 'decrease' );

      }

    },

    increase: function () {

      this.navigate ( this.options.step );

    },

    decrease: function () {

      this.navigate ( - this.options.step );

    },

    navigate: function ( modifier ) {

      var new_value = this.options.value + modifier;

      this.set_value ( new_value );

    }

  });

  /* READY */

  $(function () {

    $('.stepper').each ( function () {

      var $stepper = $(this),
        $input = $stepper.find ( 'input' ),
        options = {
          min: Number($stepper.data ( 'min' ) || 0),
          max: Number($stepper.data ( 'max' ) || 100),
          value: Number($input.val () || 0),
          step: Number($stepper.data ( 'step' ) || 1),
          decimals: Number($stepper.data ( 'decimals' ) || 0)
        };

      $stepper.stepper ( options );

    });

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Widgets - Numbox
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'numbox',
    plugin: true,
    selector: '.numbox',
    options: {
      min: 0,
      max: 100,
      value: 0,
      step: 1, // Only multiples of `step` are valid values
      datas: {
        min: 'min',
        max: 'max',
        step: 'step'
      },
      selectors: {
        decreaser: '.numbox-decreaser',
        increaser: '.numbox-increaser',
        input: 'input'
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

  /* NUMBOX */

  class Numbox extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$numbox = this.$element;
      this.$input = this.$numbox.find ( this.options.selectors.input );
      this.$decreaser = this.$numbox.find ( this.options.selectors.decreaser );
      this.$increaser = this.$numbox.find ( this.options.selectors.increaser );

      this._prevValue = false;

    }

    _init () {

      /* VARIABLES */

      let value = this.$input.val ();

      /* OPTIONS */

      this.options.min = Number ( this.$numbox.data ( this.options.datas.min ) || this.options.min );
      this.options.max = Number ( this.$numbox.data ( this.options.datas.max ) || this.options.max );
      this.options.step = Number ( this.$numbox.data ( this.options.datas.step ) || this.options.step );
      this.options.value = this._sanitizeValue ( value || this.options.value );

      /* UPDATE */

      if ( Number ( value ) !== this.options.value ) {

        this._update ();

      } else {

        this._updateButtons ();

      }

    }

    _events () {

      this.___inputChange ();

      this.___keydown ();

      this.___increaser ();
      this.___decreaser ();

    }

    /* PRIVATE */

    _sanitizeValue ( value ) {

      value = Number ( value );

      value = _.isNaN ( value ) ? 0 : _.roundCloser ( value, this.options.step );

      return _.clamp ( value, this.options.min, this.options.max );

    }

    /* INPUT / CHANGE */

    ___inputChange () {

      this._on ( true, this.$input, 'input change', this.__inputChange );

    }

    __inputChange () {

      this.set ( this.$input.val () );

    }

    /* KEYDOWN */

    ___keydown () {

      this._onHover ( [$.$document, 'keydown', this.__keydown] );

    }

    /* INCREASER */

    ___increaser () {

      this._on ( this.$decreaser, Pointer.tap, this.decrease );

    }

    /* DECREASER */

    ___decreaser () {

      this._on ( this.$increaser, Pointer.tap, this.increase );

    }

    /* UPDATE */

    _updateInput () {

      this.$input.val ( this.options.value ).trigger ( 'change' );

    }

    _updateButtons () {

      let isMin = ( this.options.value === this.options.min ),
          isMax = ( this.options.value === this.options.max );

      this.$decreaser.toggleClass ( this.options.classes.disabled, isMin );
      this.$increaser.toggleClass ( this.options.classes.disabled, isMax );

    }

    _update () {

      this._updateInput ();
      this._updateButtons ();

    }

    /* API */

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

  /* FACTORY */

  Factory.make ( Numbox, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));

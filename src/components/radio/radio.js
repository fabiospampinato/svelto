
/* =========================================================================
 * Svelto - Radio
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'radio',
    options: {
      attributes: {
        name: 'name'
      },
      classes: {
        checked: 'checked'
      },
      selectors: {
        input: 'input',
        form: 'form'
      },
      callbacks: {
        change () {},
        check () {},
        uncheck () {}
      }
    }
  };

  /* RADIO */

  class Radio extends Svelto.Widget {

    /* SPECIAL */

    _widgetize ( $root ) {

      $root.find ( '.radio' ).radio ();
      $root.filter ( '.radio' ).radio ();

    }

    _variables () {

      this.$radio = this.$element;
      this.$input = this.$radio.find ( this.options.selectors.input );

      this.name = this.$input.attr ( this.options.attributes.name );

      this.isMultiple = this.name.endsWith ( ']' );

      this.$container = this.$radio.parents ( this.options.selectors.form ).first ();

      if ( this.$container.length === 0 ) {

        this.$container = $document;

      }

      this.$otherRadios = this.$container.find ( this.name ? 'input[type="radio"][name="' + this.name + '"]' : 'input[type="radio"]' ).parent ( '.radio' ).not ( this.$radio );

    }

    _init () { //FIXME: is it necessary to include it? Maybe we should fix mistakes with the markup...

      var isChecked = this.get (),
          hasClass = this.$radio.hasClass ( this.options.classes.checked );

      if ( isChecked !== hasClass ) {

        this.$radio.toggleClass ( this.options.classes.checked, isChecked );

      }

    }

    _events () {

      /* CHANGE */

      this._on ( true, this.$input, 'change', this.__change );

      /* TAP */

      this._on ( Pointer.tap, this.check );

    }

    /* CHANGE */

    __change () {

      var isChecked = this.get ();

      if ( isChecked ) {

        this.$otherRadios.removeClass ( this.options.classes.checked );

      }

      this.$radio.toggleClass ( this.options.classes.checked, isChecked );

      this._trigger ( 'change', { checked: isChecked } );
      this._trigger ( isChecked ? 'check' : 'uncheck' );

    }

    /* PUBLIC */

    get () {

      return this.$input.prop ( 'checked' );

    }

    check () {

      var isChecked = this.get ();

      if ( !isChecked ) {

        this.$input.prop ( 'checked', true ).trigger ( 'change' );

        this._trigger ( 'change', { checked: true } );
        this._trigger ( 'check' );

      }

    }

  }

  /* BINDING */

  Svelto.Radio = Radio;
  Svelto.Radio.config = config;

  /* FACTORY */

  $.factory ( Svelto.Radio );

}( jQuery, _, window, document ));

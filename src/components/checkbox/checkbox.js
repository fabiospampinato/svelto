
/* =========================================================================
 * Svelto - Checkbox
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
    name: 'checkbox',
    options: {
      classes: {
        checked: 'checked'
      },
      selectors: {
        input: 'input'
      },
      callbacks: {
        change () {},
        check () {},
        uncheck () {}
      }
    }
  };

  /* CHECKBOX */

  class Checkbox extends Svelto.Widget {

    /* SPECIAL */

    _widgetize ( $root ) {

      $root.find ( '.checkbox' ).checkbox ();
      $root.filter ( '.checkbox' ).checkbox ();

    }

    _variables () {

      this.$checkbox = this.$element;
      this.$input = this.$checkbox.find ( this.options.selectors.input );

    }

    _init () { //FIXME: is it necessary to include it? Maybe we should fix mistakes with the markup...

      let isChecked = this.get (),
          hasClass = this.$checkbox.hasClass ( this.options.classes.checked );

      if ( isChecked !== hasClass ) {

        this.$checkbox.toggleClass ( this.options.classes.checked, isChecked );

      }

    }

    _events () {

      /* CHANGE */

      this._on ( true, 'change', this.__change );

      /* TAP */

      this._on ( Pointer.tap, _.wrap ( undefined, this.toggle ) );

    }

    /* CHANGE */

    __change () {

      var isChecked = this.get ();

      this.$checkbox.toggleClass ( this.options.classes.checked, isChecked );

      this._trigger ( 'change', { checked: isChecked } );
      this._trigger ( isChecked ? 'check' : 'uncheck' );

    }

    /* PUBLIC */

    get () { //FIXME: maybe this should return the value, and a isChecked equivalent should do this job

      return this.$input.prop ( 'checked' );

    }

    toggle ( force ) {

      var isChecked = this.get ();

      if ( _.isUndefined ( force ) ) {

        force = !isChecked;

      }

      if ( force !== isChecked ) {

        this.$input.prop ( 'checked', force ).trigger ( 'change' );

        this._trigger ( 'change', { checked: force } );
        this._trigger ( force ? 'check' : 'uncheck' ); //FIXME: is triggered twice per toggle

      }

    }

    check () {

      this.toggle ( true );

    }

    uncheck () {

      this.toggle ( false );

    }

  }

  /* BINDING */

  Svelto.Checkbox = Checkbox;
  Svelto.Checkbox.config = config;

  /* FACTORY */

  $.factory ( Svelto.Checkbox );

}( jQuery, _, window, document ));

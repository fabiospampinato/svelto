
/* =========================================================================
 * Svelto - Checkbox v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CHECKBOX */

  $.factory ( 'svelto.checkbox', {

    /* OPTIONS */

    options: {
      callbacks: {
        change: _.noop,
        check: _.noop,
        uncheck: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$checkbox = this.$element;
      this.$input = this.$checkbox.find ( 'input' );

    },

    _init: function () { //FIXME: is it necessary to include it? Maybe we should fix mistakes with the markup...

      var isChecked = this.get (),
          hasClass = this.$checkbox.hasClass ( 'checked' );

      if ( isChecked !== hasClass ) {

        this.$checkbox.toggleclass ( 'checked', isChecked );

      }

    },

    _events: function () {

      /* CHANGE */

      this._on ( true, 'change', this.__change );

      /* TAP */

      this._on ( Pointer.tap, _.wrap ( undefined, this.toggle ) );

    },

    /* CHANGE */

    __change: function () {

      var isChecked = this.get ();

      this.$checkbox.toggleClass ( 'checked', isChecked );

      this._trigger ( 'change', { checked: isChecked } );
      this._trigger ( isChecked ? 'check' : 'uncheck' );

    },

    /* PUBLIC */

    get: function () { //FIXME: maybe this should return the value, and a isChecked equivalent should do this job

      return this.$input.prop ( 'checked' );

    },

    toggle: function ( force ) {

      var isChecked = this.get ();

      if ( _.isUndefined ( force ) ) {

        force = !isChecked;

      }

      if ( force !== isChecked ) {

        this.$input.prop ( 'checked', force ).trigger ( 'change' );

        this._trigger ( 'change', { checked: force } );
        this._trigger ( force ? 'check' : 'uncheck' ); //FIXME: is triggered twice per toggle

      }

    },

    check: function () {

      this.toggle ( true );

    },

    uncheck: function () {

      this.toggle ( false );

    }

  });

  /* READY */

  $(function () {

    $('.checkbox').checkbox ();

  });

}( jQuery, _, window, document ));

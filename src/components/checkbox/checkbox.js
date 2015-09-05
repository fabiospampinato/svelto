
/* =========================================================================
 * Svelto - Checkbox v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CHECKBOX */

  $.widget ( 'presto.checkbox', {

    /* OPTIONS */

    options: {
      callbacks: {
        checked: _.noop,
        unchecked: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$checkbox = this.$element;
      this.$input = this.$checkbox.find ( 'input' );

    },

    _init: function () { //FIXME: is it necessary to include it? Maybe we should fix mistakes with the markup...

      var hasClass = this.$checkbox.hasClass ( 'checked' );

      if ( this.get () ) {

        if ( !hasClass ) {

          this.$checkbox.addClass ( 'checked' );

        }

      } else if ( hasClass ) {

        this.$checkbox.removeClass ( 'checked' );

      }

    },

    _events: function () {

      this._on ( 'click', function () {

        this.toggle ();

      });

      this._on ( true, 'change', this._handler_change );

    },

    /* CHANGE */

    _handler_change: function () {

      var isChecked = this.get ();

      this.$checkbox.toggleClass ( 'checked', isChecked );

      this._trigger ( isChecked ? 'checked' : 'unchecked' );

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

        this._trigger ( force ? 'checked' : 'unchecked' ); //FIXME: is triggered twice per toggle

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

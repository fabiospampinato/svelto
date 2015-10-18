
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

  /* RADIO */

  $.factory ( 'svelto.radio', {

    /* OPTIONS */

    options: {
      callbacks: {
        change: _.noop,
        check: _.noop,
        uncheck: _.noop
      }
    },

    /* SPECIAL */

    _widgetize ( $root ) {

      $root.find ( '.radio' ).radio ();

    },

    _variables () {

      this.$radio = this.$element;
      this.$input = this.$radio.find ( 'input' );

      this.name = this.$input.attr ( 'name' );

      this.$container = this.$radio.parents ( 'form' ).first ();

      if ( this.$container.length === 0 ) {

        this.$container = $document;

      }

      this.$otherRadios = this.$container.find ( this.name ? 'input[type="radio"][name="' + this.name + '"]' : 'input[type="radio"]' ).parent ( '.radio' ).not ( this.$radio );

    },

    _init () { //FIXME: is it necessary to include it? Maybe we should fix mistakes with the markup...

      var isChecked = this. get (),
          hasClass = this.$radio.hasClass ( 'checked' );

      if ( isChecked !== hasClass ) {

        this.$radio.toggleClass ( 'checked', isChecked );

      }

    },

    _events () {

      /* CHANGE */

      this._on ( true, this.$input, 'change', this.__change );

      /* CLICK */

      this._on ( 'click', this.check );

    },

    /* CHANGE */

    __change () {

      var isChecked = this.get ();

      if ( isChecked ) {

        this.$otherRadios.removeClass ( 'checked' );

      }

      this.$radio.toggleClass ( 'checked', isChecked );

      this._trigger ( 'change', { checked: isChecked } );
      this._trigger ( isChecked ? 'check' : 'uncheck' );

    },

    /* PUBLIC */

    get () {

      return this.$input.prop ( 'checked' );

    },

    check () {

      var isChecked = this.get ();

      if ( !isChecked ) {

        this.$input.prop ( 'checked', true ).trigger ( 'change' );

        this._trigger ( 'change', { checked: true } );
        this._trigger ( 'check' );

      }

    }

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Autogrow (Input)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//INFO: Only works with `box-sizing: border-box`
//FIXME: Does it work with `.large` inputs?
//FIXME: Add an extra pixel, or the text cursor won't be displayed

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'autogrowInput',
    options: {
      minWidth: 0,
      callbacks: {
        update () {}
      }
    }
  };

  /* AUTOGROW INPUT */

  class AutogrowInput extends Svelto.Widget {

    /* SPECIAL */

    _widgetize ( $root ) {

      $root.find ( 'input.autogrow, .input-wrp.autogrow input' ).autogrowInput ();
      $root.filter ( 'input.autogrow, .input-wrp.autogrow input' ).autogrowInput ();

    }

    _variables () {

      this.$input = this.$element;

    }

    _init () {

      this._update ();

    }

    _events () {

      /* INPUT / CHANGE */

      this._on ( 'input change', this._update );

    }

    /* PRIVATE */

    _getNeededWidth () {

      //FIXME: Isn't it better to just detach it, or to leave it in the DOM?

      let $span = $( '<span>' + this.$input.val () + '</span>' );

      $span.css ({
        font: this.$input.css ( 'font' ),
        position: 'absolute',
        opacity: 0
      });

      $span.appendTo ( $body );

      let width = $span.width ();

      $span.remove ();

      return width;

    }

    _update () {

      let neededWidth = this._getNeededWidth ( this.$input );

      this.$input.width ( Math.max ( neededWidth, this.options.minWidth ) );

      this._trigger ( 'update' );

    }

  }

  /* BINDING */

  Svelto.AutogrowInput = AutogrowInput;
  Svelto.AutogrowInput.config = config;

  /* FACTORY */

  $.factory ( Svelto.AutogrowInput );

}( jQuery, _, window, document ));

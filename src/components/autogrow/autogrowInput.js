
/* =========================================================================
 * Svelto - Autogrow (Input) v0.1.0
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

  /* AUTOGROW INPUT */

  $.factory ( 'svelto.autogrowInput', {

    /* OPTIONS */

    options: {
      minWidth: 0,
      callbacks: {
        update: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$input = this.$element;

    },

    _init: function () {

      this.update ();

    },

    _events: function () {

      /* INPUT / CHANGE */

      this._on ( 'input change', this.update );

    },

    /* PRIVATE */

    _getNeededWidth: function () {

      //FIXME: Isn't it better to just detach it, or to leave it in the DOM?

      var $span = $( '<span>' + this.$input.val () + '</span>' );

      $span.css ({
        font: this.$input.css ( 'font' ),
        position: 'absolute',
        opacity: 0
      });

      $span.appendTo ( $body );

      var width = $span.width ();

      $span.remove ();

      return width;

    },

    /* PUBLIC */

    update: function () {

      var neededWidth = this._getNeededWidth ( this.$input );

      this.$input.width ( Math.max ( neededWidth, this.options.minWidth ) );

      this._trigger ( 'update' );

    }

  });

  /* READY */

  $(function () {

    $('input.autogrow, .input-wrp.autogrow input').autogrowInput ();

  });

}( jQuery, _, window, document ));

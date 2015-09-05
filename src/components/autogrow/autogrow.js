
/* =========================================================================
 * Svelto - Autogrow v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

//INFO: Only works with `box-sizing: border-box`

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* AUTOGROW */

  $.widget ( 'svelto.autogrow', {

    /* OPTIONS */

    options: {
      minimum_width: 0,
      minimum_height: 0,
      callbacks: {
        update: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$growable = this.$element;

      this.isInput = this.$growable.is ( 'input' );
      this.isTextarea = this.$growable.is ( 'textarea' );

    },

    _init: function () {

      this.update ();

    },

    _events: function () {

      this._on ( 'input change', this.update );

    },

    /* INPUT */

    _update_input_width: function () {

      var needed_width = this._get_input_needed_width ( this.$growable );

      this.$growable.width ( Math.max ( needed_width, this.options.minimum_width ) );

    },

    _get_input_needed_width: function () {

      var $span = $( '<span>' + this.$growable.val () + '</span>' );

      $span.css ({
        font: this.$growable.css ( 'font' ),
        position: 'absolute',
        opacity: 0
      });

      $span.appendTo ( $body );

      var width = $span.width ();

      $span.remove ();

      return width;

    },

    /* TEXTAREA */

    _update_textarea_height: function () {

      var needed_height = this.$growable.height ( 1 ).get ( 0 ).scrollHeight - parseFloat ( this.$growable.css ( 'padding-top' ) ) - parseFloat ( this.$growable.css ( 'padding-bottom' ) );

      this.$growable.height ( Math.max ( needed_height, this.options.minimum_height ) );

    },

    /* PUBLIC */

    update: function () {

      if ( this.isInput ) {

        this._update_input_width ();

        this._trigger ( 'update' );

      } else if ( this.isTextarea ) {

        this._update_textarea_height ();

        this._trigger ( 'update' );

      }

    }

  });

  /* READY */

  $(function () {

    $('input.autogrow, textarea.autogrow, .input-wrp.autogrow input, .textarea-wrp.autogrow textarea').autogrow ();

  });

}( jQuery, _, window, document ));

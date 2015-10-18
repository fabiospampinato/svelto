
/* =========================================================================
 * Svelto - Autogrow (Textarea)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//INFO: Only works with `box-sizing: border-box`
//FIXME: Does it work with `.large` textareas?
//TODO: Make it the same height as a normal input at minimum, for beautiness

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* AUTOGROW */

  $.factory ( 'svelto.autogrowTextarea', {

    /* OPTIONS */

    options: {
      minHeight: 0,
      callbacks: {
        update: _.noop
      }
    },

    /* SPECIAL */

    _widgetize ( $root ) {

      $root.find ( 'textarea.autogrow, .textarea-wrp.autogrow textarea' ).autogrowTextarea ();

    },

    _variables () {

      this.$textarea = this.$element;

    },

    _init () {

      this.update ();

    },

    _events () {

      /* INPUT / CHANGE */

      this._on ( 'input change', this.update );

    },

    /* PUBLIC */

    update () {

      var neededHeight = this.$textarea.height ( 1 )[0].scrollHeight - parseFloat ( this.$textarea.css ( 'padding-top' ) ) - parseFloat ( this.$textarea.css ( 'padding-bottom' ) );

      this.$textarea.height ( Math.max ( neededHeight, this.options.minHeight ) );

      this._trigger ( 'update' );

    }

  });

}( jQuery, _, window, document ));

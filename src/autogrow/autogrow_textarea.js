
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

  /* CONFIG */

  let config = {
    name: 'autogrowTextarea',
    options: {
      minHeight: 0,
      callbacks: {
        update () {}
      }
    }
  };

  /* AUTOGROW TEXTAREA */

  class AutogrowTextarea extends Svelto.Widget {

    /* SPECIAL */

    _widgetize ( $root ) {

      $root.find ( 'textarea.autogrow, .textarea-wrp.autogrow textarea' ).autogrowTextarea ();
      $root.filter ( 'textarea.autogrow, .textarea-wrp.autogrow textarea' ).autogrowTextarea ();

    }

    _variables () {

      this.$textarea = this.$element;

    }

    _init () {

      this._update ();

    }

    _events () {

      /* INPUT / CHANGE */

      this._on ( 'input change', this._update );

    }

    /* PRIVATE */

    _update () {

      var neededHeight = this.$textarea.height ( 1 )[0].scrollHeight - parseFloat ( this.$textarea.css ( 'padding-top' ) ) - parseFloat ( this.$textarea.css ( 'padding-bottom' ) );

      this.$textarea.height ( Math.max ( neededHeight, this.options.minHeight ) );

      this._trigger ( 'update' );

    }

  }

  /* BINDING */

  Svelto.AutogrowTextarea = AutogrowTextarea;
  Svelto.AutogrowTextarea.config = config;

  /* FACTORY */

  $.factory ( Svelto.AutogrowTextarea );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Autogrow - Textarea
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../../factory/factory.js
 * ========================================================================= */

//INFO: It supports only `box-sizing: border-box` textareas

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'autogrowTextarea',
    selector: 'textarea.autogrow',
    callbacks: {
      update () {}
    }
  };

  /* AUTOGROW TEXTAREA */

  class AutogrowTextarea extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$textarea = this.$element;

    }

    _init () {

      this._update ();

    }

    _events () {

      /* INPUT / CHANGE */

      this._on ( true, 'input change', this._update );

    }

    /* PRIVATE */

    _getNeededHeight () {

      //TODO: Do it with canvas, if possible, improve the performance in general

      return this.$textarea.height ( 0 )[0].scrollHeight - parseFloat ( this.$textarea.css ( 'padding-top' ) ) - parseFloat ( this.$textarea.css ( 'padding-bottom' ) );

    }

    _update () {

      this.$textarea.height ( this._getNeededHeight () );

      this._tigger ( 'update' );

    }

  }

  /* BINDING */

  Svelto.AutogrowTextarea = AutogrowTextarea;
  Svelto.AutogrowTextarea.config = config;

  /* FACTORY */

  $.factory ( Svelto.AutogrowTextarea );

}( Svelto.$, Svelto._, window, document ));

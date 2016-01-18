
/* =========================================================================
 * Svelto - Autogrow - Textarea
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../../widget/widget.js
 * ========================================================================= */

//INFO: It supports only `box-sizing: border-box` textareas

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'autogrowTextarea',
    plugin: true,
    selector: 'textarea.autogrow',
    options: {
      callbacks: {
        update: _.noop
      }
    }
  };

  /* AUTOGROW TEXTAREA */

  class AutogrowTextarea extends Widgets.Widget {

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

      this._trigger ( 'update' );

    }

  }

  /* FACTORY */

  Factory.init ( AutogrowTextarea, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

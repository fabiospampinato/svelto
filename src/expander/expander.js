
/* =========================================================================
 * Svelto - Expander
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'expander',
    plugin: true,
    selector: '.expander',
    options: {
      classes: {
        open: 'open'
      },
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    }
  };

  /* EXPANDER */

  class Expander extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$expander = this.$element;

      this._isOpen = this.$expander.hasClass ( this.options.classes.open );

    }

    /* API */

    isOpen () {

      return this._isOpen;

    }

    toggle ( force ) {

      if ( !_.isBoolean ( force ) ) {

        force = !this._isOpen;

      }

      if ( force !== this._isOpen ) {

        this._isOpen = force;

        this.$expander.toggleClass ( this.options.classes.open, this._isOpen );

        this._trigger ( this._isOpen ? 'open' : 'close' );

      }

    }

    open () {

      this.toggle ( true );

    }

    close () {

      this.toggle ( false );

    }

  }

  /* FACTORY */

  $.factory ( Expander, config, Svelto );

}( Svelto.$, Svelto._, window, document ));

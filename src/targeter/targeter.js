
/* =========================================================================
 * Svelto - Targeter
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
    name: 'targeter',
    options: {
      widget: false, //INFO: The target's widget class
      datas: {
        target: 'target'
      }
    }
  };

  /* TARGETER */

  class Targeter extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this._targetSelector = this.$element.data ( this.options.datas.target );

      this.$target = this._targetSelector ? $(this._targetSelector) : this.$element.closest ( this.options.widget.config.selector );

      this._targetInstance = this.$target[this.options.widget.config.name]( 'instance' );

    }

  }

  /* FACTORY */

  $.factory ( Targeter, config, Svelto );

}( Svelto.$, Svelto._, window, document ));

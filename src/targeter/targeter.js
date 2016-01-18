
/* =========================================================================
 * Svelto - Targeter
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

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

  class Targeter extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this._targetSelector = this.$element.data ( this.options.datas.target );

      this.$target = this._targetSelector ? $(this._targetSelector) : this.$element.closest ( this.options.widget.config.selector );

      this._targetInstance = this.$target[this.options.widget.config.name]( 'instance' );

    }

  }

  /* FACTORY */

  Factory.init ( Targeter, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

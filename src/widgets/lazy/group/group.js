
/* =========================================================================
 * Svelto - Widgets - Lazy - Group
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @priority 650
 * @require core/widget/widget.js
 * @require ../worker.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, LazyWorker ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'lazyGroup',
    plugin: true,
    selector: '.lazy-group',
    options: {
      datas: {
        group: 'group'
      }
    }
  };

  /* LAZY GROUP */

  class Lazy extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.group = this.$element.data ( this.options.datas.group );

      this.__scroll = _.frames ( this.process.bind ( this ) );

    }

    _events () {

      this._on ( true, 'scroll', this.__scroll );

    }

    /* API */

    process () {

      if ( !LazyWorker.process ( undefined, this.group ) ) return;

      this._reset ();

    }

  }

  /* FACTORY */

  Factory.make ( Lazy, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.LazyWorker ));

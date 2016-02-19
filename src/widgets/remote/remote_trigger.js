
/* =========================================================================
 * Svelto - Widgets - Remote (Trigger)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remoteTrigger',
    options: {
      widget: false, // The `Remote` widget class to call
      ajax: {}, // Using as `new widget ( ajax )`
      attributes: {
        href: 'href' // In order to better support `a` elements (the `method` data has higher priority)
      },
      datas: {
        url: 'url',
        data: 'data',
        method: 'method'
      }
    }
  };

  /* REMOTE TRIGGER */

  class RemoteTrigger extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$trigger = this.$element;

      /* OPTIONS */

      this.options.ajax.url = this.$trigger.data ( this.options.datas.url ) || this.$trigger.attr ( this.options.attributes.href ) || this.options.ajax.url;
      this.options.ajax.data = this.$trigger.data ( this.options.datas.data ) || this.options.ajax.data;
      this.options.ajax.method = this.$trigger.data ( this.options.datas.method ) || this.options.ajax.method;

    }

    _events () {

      this.___tap ();

    }

    /* TAP */

    ___tap () {

      this._on ( Pointer.tap, this.trigger );

    }

    /* API */

    trigger () {

      new this.options.widget ( { ajax: this.options.ajax } ).request ();

    }

  }

  /* FACTORY */

  Factory.init ( RemoteTrigger, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));

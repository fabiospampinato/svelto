
// @require core/widget/widget.js

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  /* CONFIG */

  let config = {
    name: 'remoteTrigger',
    options: {
      widget: false, // The `Remote` widget class to call
      ajax: { // Using as `new widget ( ajax )`
        cache: false,
        method: 'get'
      },
      attributes: {
        href: 'href' // In order to better support `a` elements (the data value has higher priority)
      },
      datas: {
        url: 'url',
        body: 'body',
        method: 'method'
      },
      callbacks: {
        beforetrigger: _.noop,
        trigger: _.noop
      }
    }
  };

  /* REMOTE TRIGGER */

  class RemoteTrigger extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$trigger = this.$element;
      // this.trigger = this.element; //FIXME: It clashes with the `trigger` method

    }

    _init () {

      this.options.ajax.url = this.$trigger.data ( this.options.datas.url ) || this.$trigger.attr ( this.options.attributes.href ) || this.options.ajax.url;
      this.options.ajax.body = this.$trigger.data ( this.options.datas.body ) || this.options.ajax.body;
      this.options.ajax.method = this.$trigger.data ( this.options.datas.method ) || this.options.ajax.method;

    }

    _events () {

      this.___tap ();

    }

    /* OPTIONS */

    _getOptions () {

      return {
        ajax: this.options.ajax,
        storage: {
          enabled: _.get ( this.options.widget.config, 'storage.enabled' ) || _.get ( Widgets.RemoteWidget.config, 'storage.enabled' ) || $.widget.is ( this.element, Widgets.Storable, true ) //FIXME: We should merge the configs at factory time instead, but it's quite expensive
        }
      };

    }

    /* TAP */

    ___tap () {

      this._on ( Pointer.tap, this.trigger );

    }

    /* API */

    trigger () {

      this._trigger ( 'beforetrigger' );

      new this.options.widget ( this._getOptions () ).request ();

      this._trigger ( 'trigger' );

    }

  }

  /* FACTORY */

  Factory.make ( RemoteTrigger, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));


// @priority 700
// @require ../lazy.js

//TODO: Add <picture/> support

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'lazyImage',
    plugin: true,
    selector: 'img.lazy',
    options: {
      datas: {
        src: 'src',
        srcset: 'srcset',
        sizes: 'sizes'
      },
      attrsFetchers: { // Get values for attributes attributes
        src: _.noop,
        srcset: _.noop,
        sizes ()  {
          return `${this.element.offsetWidth}px`;
        }
      }
    }
  };

  /* LAZY IMAGE */

  class LazyImage extends Widgets.Lazy {

    /* PRIVATE */

    _getAttrValue ( attr ) {

      const attrValue = this.element.getAttribute ( attr ),
            dataAttr = `data-${this.options.datas[attr]}`,
            dataValue = this.element.getAttribute ( dataAttr ),
            hasDataValue = !_.isNull ( dataValue );

      if ( !hasDataValue && !_.isNull ( attrValue ) ) return; //TODO: Is this actually the right thing to do? Ignoring fetchers?

      return hasDataValue ? dataValue : this.options.attrsFetchers[attr].call ( this );

    }

    /* API */

    load () {

      const attrs = ['sizes', 'srcset', 'src'];

      attrs.forEach ( attr => {

        const value = this._getAttrValue ( attr );

        if ( _.isUndefined ( value ) ) return;

        this.element.setAttribute ( attr, value );

      });

      super.load ();

    }

  }

  /* FACTORY */

  Factory.make ( LazyImage, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

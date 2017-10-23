
/* =========================================================================
 * Svelto - Widgets - Lazy - Image
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @priority 700
 * @require ../lazy.js
 * ========================================================================= */

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
      }
    }
  };

  /* LAZY IMAGE */

  class LazyImage extends Widgets.Lazy {

    /* API */

    load () {

      let attrs = ['src', 'srcset', 'sizes'],
          datas = attrs.map ( attr => this.$element.data ( this.options.datas[attr] ) );

      datas.forEach ( ( data, index ) => data && this.$element.attr ( attrs[index], data ) );

      super.load ();

    }

  }

  /* FACTORY */

  Factory.make ( LazyImage, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

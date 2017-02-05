
/* =========================================================================
 * Svelto - Widgets - Storable
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * @require lib/storage/storage.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Storage ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'storable',
    selector: '.storable'
  };

  /* STORABLE */

  class Storable extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.storageNamespace = `swns.${this.name}`;

    }

    /* STORAGE */

    _storageGet ( key ) {

      return Storage.get ( `${this.storageNamespace}.${key}` );

    }

    _storageSet ( key, value, ttl ) {

      Storage.set ( `${this.storageNamespace}.${key}`, value, ttl );

    }

    _storageRemove ( key ) {

      Storage.remove ( `${this.storageNamespace}.${key}` );

    }

  }

  /* FACTORY */

  Factory.make ( Storable, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Storage ));

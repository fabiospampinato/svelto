
/* =========================================================================
 * Svelto - Infobar (Closer)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires infobar.js
 * @requires ../closer/closer.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'infobarCloser',
    plugin: true,
    selector: '.infobar-closer',
    options: {
      widget: Svelto.Infobar
    }
  };

  /* INFOBAR CLOSER */

  class InfobarCloser extends Svelto.Closer {}

  /* FACTORY */

  $.factory ( InfobarCloser, config, Svelto );

}( Svelto.$, Svelto._, window, document ));

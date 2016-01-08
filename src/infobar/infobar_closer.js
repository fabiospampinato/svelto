
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
    selector: '.infobar-closer',
    options: {
      widget: Svelto.Infobar
    }
  };

  /* INFOBAR CLOSER */

  class InfobarCloser extends Svelto.Closer {}

  /* BINDING */

  Svelto.InfobarCloser = InfobarCloser;
  Svelto.InfobarCloser.config = config;

  /* FACTORY */

  $.factory ( Svelto.InfobarCloser );

}( Svelto.$, Svelto._, window, document ));

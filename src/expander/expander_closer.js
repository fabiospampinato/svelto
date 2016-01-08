
/* =========================================================================
 * Svelto - Expander (Closer)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires expander.js
 * @requires ../closer/closer.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'expanderCloser',
    selector: '.expander-closer',
    options: {
      widget: Svelto.Expander
    }
  };

  /* EXPANDER CLOSER */

  class ExpanderCloser extends Svelto.Closer {}

  /* BINDING */

  Svelto.ExpanderCloser = ExpanderCloser;
  Svelto.ExpanderCloser.config = config;

  /* FACTORY */

  $.factory ( Svelto.ExpanderCloser );

}( Svelto.$, Svelto._, window, document ));

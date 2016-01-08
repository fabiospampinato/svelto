
/* =========================================================================
 * Svelto - Expander (Opener)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires expander.js
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'expanderOpener',
    selector: '.expander-opener',
    options: {
      widget: Svelto.Expander
    }
  };

  /* EXPANDER OPENER */

  class ExpanderOpener extends Svelto.Opener {}

  /* BINDING */

  Svelto.ExpanderOpener = ExpanderOpener;
  Svelto.ExpanderOpener.config = config;

  /* FACTORY */

  $.factory ( Svelto.ExpanderOpener );

}( Svelto.$, Svelto._, window, document ));

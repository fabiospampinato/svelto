
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
    plugin: true,
    selector: '.expander-opener',
    options: {
      widget: Svelto.Expander
    }
  };

  /* EXPANDER OPENER */

  class ExpanderOpener extends Svelto.Opener {}

  /* FACTORY */

  $.factory ( ExpanderOpener, config, Svelto );

}( Svelto.$, Svelto._, window, document ));

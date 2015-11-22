
/* =========================================================================
 * Svelto - Boilerplate
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'boilerplate',
    templates: {
      base: false
    },
    options: {
      characters: {},
      regexes: {},
      errors: {},
      attributes: {},
      datas: {},
      classes: {},
      selectors: {},
      animations: {},
      callbacks: {}
    }
  };

  /* BOILERPLATE */

  class Boilerplate extends Svelto.Widget {

    /* SPECIAL */

    _widgetize ( $root ) {

    }

    _variables () {

    }

    _events () {

    }

    _destroy () {

    }

    /* PRIVATE */

    /* API */

  }

  /* BINDING */

  Svelto.Boilerplate = Boilerplate;
  Svelto.Boilerplate.config = config;

  /* FACTORY */

  $.factory ( Svelto.Boilerplate );

}( Svelto.$, Svelto._, window, document ));

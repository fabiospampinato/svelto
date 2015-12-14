
/* =========================================================================
 * Svelto - Boilerplate
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'boilerplate',
    selector: undefined,
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

    _variables () {

    }

    _init () {

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


/* =========================================================================
 * Svelto - Boilerplate
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'boilerplate',
    plugin: false,
    selector: false,
    templates: {
      base: false
    },
    options: {
      characters: {},
      regexes: {},
      errors: {},
      messages: {},
      attributes: {},
      datas: {},
      classes: {},
      selectors: {},
      animations: {},
      keystrokes: {},
      callbacks: {}
    }
  };

  /* BOILERPLATE */

  class Boilerplate extends Svelto.Widget {

    /* SPECIAL */

    static widgetize () {

    }

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

  /* FACTORY */

  $.factory ( Boilerplate, config, Svelto );

}( Svelto.$, Svelto._, window, document ));

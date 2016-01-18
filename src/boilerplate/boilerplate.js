
/* =========================================================================
 * Svelto - Boilerplate
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

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

  class Boilerplate extends Widgets.Widget {

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

  Factory.init ( Boilerplate, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

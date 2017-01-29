
/* =========================================================================
 * Svelto - Widgets - Boilerplate
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
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
      breakpoints: {},
      keyboard: true,
      keystrokes: {},
      callbacks: {}
    }
  };

  /* BOILERPLATE */

  class Boilerplate extends Widgets.Widget {

    /* WIDGETIZE */

    static widgetize () {

    }

    static ready () {

    }

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

    // Prefixed with `_`

    /* API */

  }

  /* FACTORY */

  Factory.init ( Boilerplate, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

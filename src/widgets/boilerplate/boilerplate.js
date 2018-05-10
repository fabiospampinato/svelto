
// @require core/widget/widget.js

(function ( $, _, Svelto, Factory ) {

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

  class Boilerplate extends Svelto.Widget {

    /* WIDGETIZE */

    static widgetize ( ele, Widget ) {}

    /* READY */

    static ready ( done ) {}

    /* SPECIAL */

    _create () {}

    _variables () {}

    _init () {}

    _events () {}

    _destroy () {}

    /* PRIVATE */

    // Prefixed with `_`

    /* API */

  }

  /* FACTORY */

  Factory.make ( Boilerplate, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Factory ));

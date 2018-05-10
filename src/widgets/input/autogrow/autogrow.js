
// @require core/browser/browser.js
// @require core/widget/widget.js

// It supports only `box-sizing: border-box` inputs

(function ( $, _, Svelto, Factory, Browser ) {

  /* CONFIG */

  let config = {
    name: 'inputAutogrow',
    plugin: true,
    selector: 'input.autogrow',
    options: {
      minWidth: 1, // So that the cursor will get displayed even when empty
      callbacks: {
        change: _.noop
      }
    }
  };

  /* INPUT AUTOGROW */

  class InputAutogrow extends Svelto.Widget {

    /* WIDGETIZE */

    static widgetize ( ele, Widget ) {

      /* SKIP IE/EDGE */

      //FIXME: input.scrollWidth is not supported by them, find another reliable way of implementing it

      if ( Browser.is.ie || Browser.is.edge ) return;

      /* WIDGETIZE */

      $.widget.get ( ele, Widget );

    }

    /* SPECIAL */

    _variables () {

      this.$input = this.$element;

      this.$tempInput = $('<input>').css ({
                          'position': 'fixed',
                          'visibility': 'hidden',
                          'padding': 0,
                          'min-width': 0,
                          'width': 0
                        });

    }

    _init () {

      this._update ();

    }

    _events () {

      this.___inputChange ();

    }

    /* PRIVATE */

    _getNeededWidth () {

      this.$tempInput.css ( 'font', this.$input.css ( 'font' ) ).val ( this.$input.val () ).appendTo ( this.$layout );

      let width = this.$tempInput[0].scrollWidth;

      this.$tempInput.detach ();

      return Math.max ( this.options.minWidth, width );

    }

    /* INPUT / CHANGE */

    ___inputChange () {

      this._on ( true, 'input change', this._update );

    }

    /* UPDATE */

    _update () {

      let width = this._getNeededWidth ();

      if ( width === this._prevWidth ) return;

      this._prevWidth = width;

      this.$input.width ( width );

      this._trigger ( 'change' );

    }

  }

  /* FACTORY */

  Factory.make ( InputAutogrow, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Factory, Svelto.Browser ));

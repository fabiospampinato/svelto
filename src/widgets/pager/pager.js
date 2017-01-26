
/* =========================================================================
 * Svelto - Widgets - Pager
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
    name: 'pager',
    plugin: true,
    selector: '.pager',
    options: {
      selectors: {
        previous: '.previous',
        next: '.next',
        focusable: 'input, textarea, select, option, [contenteditable]'
      },
      keystrokes: {
        'left': 'previous',
        'right': 'next'
      }
    }
  };

  /* PAGER */

  class Pager extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$pager = this.$element;
      this.$previous = this.$pager.find ( this.options.selectors.previous );
      this.$next = this.$pager.find ( this.options.selectors.next );

    }

    _events () {

      this.___keydown ();

    }

    /* UTILITIES */

    _clickElement ( $ele ) {

      $ele[0].click (); // jQuery won't work

    }

    /* KEYDOWN */

    __keydown ( event ) {

      //FIXME: Don't do anything if a scroll happens

      if ( $(document.activeElement).is ( this.options.selectors.focusable ) ) return;

      this._defer ( () => {

        if ( event.isPropagationStopped () ) return; // Probably another widget was listening for the same event, and it should take priority over this

        super.__keydown ( event );

      });

    }

    /* API */

    previous () {

      this._clickElement ( this.$previous );

    }

    next () {

      this._clickElement ( this.$next );

    }

  }

  /* FACTORY */

  Factory.init ( Pager, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

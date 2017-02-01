
/* =========================================================================
 * Svelto - Widgets - Textarea - Sender
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
    name: 'textareaSender',
    plugin: true,
    selector: 'form textarea',
    options: {
      selectors: {
        form: 'form'
      },
      keystrokes: {
        'ctmd + enter': 'send'
      }
    }
  };

  /* TEXTAREA SENDER */

  class TextareaSender extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$textarea = this.$element;
      this.$form = this.$textarea.closest ( this.options.selectors.form );

    }

    _events () {

      this.___keydown ();

    }

    /* SEND */

    send () {

      if ( !$(document.activeElement).is ( this.$textarea ) ) return;

      this.$form.submit ();

    }

  }

  /* FACTORY */

  Factory.make ( TextareaSender, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

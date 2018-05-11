
// @require core/widget/widget.js

(function ( $, _, Svelto, Factory ) {

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

  class TextareaSender extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$textarea = this.$element;

      this.$form = this.$textarea.closest ( this.options.selectors.form );

    }

    _events () {

      this.___keydown ();

    }

    /* KEYDOWN */

    ___keydown ( $target ) {

      this._on ( this.$textarea, 'keydown', this.__keydown );

    }

    /* SEND */

    send () {

      const $submit = this.$form.find ( '[type="submit"]' );

      if ( $submit.length ) {

        $submit[0].click ();

      } else {

        this.$form[0].submit ();

      }

    }

  }

  /* FACTORY */

  Factory.make ( TextareaSender, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Factory ));

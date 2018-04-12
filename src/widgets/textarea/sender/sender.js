
// @require core/widget/widget.js

(function ( $, _, Svelto, Widgets, Factory ) {

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
      this.textarea = this.element;

      this.$form = this.$textarea.closest ( this.options.selectors.form );
      this.form = this.$form[0];

    }

    _events () {

      this.___keydown ();

    }

    /* SEND */

    send () {

      if ( !$.isFocused ( this.textarea ) ) return;

      this.form.submit ();

    }

  }

  /* FACTORY */

  Factory.make ( TextareaSender, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


// @require core/animations/animations.js
// @require widgets/autofocusable/autofocusable.js

(function ( $, _, Svelto, Widgets, Factory, Animations ) {

  /* CONFIG */

  let config = {
    name: 'expander',
    plugin: true,
    selector: '.expander',
    options: {
      classes: {
        open: 'open'
      },
      selectors: {
        content: '.expander-content' //TODO: Maybe rename it to `.expander-block`
      },
      animations: {
        open: Animations.normal,
        close: Animations.normal
      },
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    }
  };

  /* EXPANDER */

  class Expander extends Widgets.Autofocusable {

    /* SPECIAL */

    _variables () {

      this.$expander = this.$element;
      this.$content = this.$expander.find ( this.options.selectors.content );

      this._isOpen = this.$expander.hasClass ( this.options.classes.open );

    }

    /* API */

    isOpen () {

      return this._isOpen;

    }

    toggle ( force = !this._isOpen ) {

      if ( !!force !== this._isOpen ) {

        this._isOpen = !!force;

        this.$expander.toggleClass ( this.options.classes.open, this._isOpen );

        this._isOpen ? this.autofocus () : this.autoblur ();

        this._trigger ( this._isOpen ? 'open' : 'close' );

      }

    }

    open () {

      this.toggle ( true );

    }

    close () {

      this.toggle ( false );

    }

  }

  /* FACTORY */

  Factory.make ( Expander, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Animations ));

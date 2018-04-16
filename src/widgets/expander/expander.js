
// @require core/animations/animations.js
// @require lib/slide/slide.js
// @require widgets/autofocusable/autofocusable.js

//FIXME: Broken horizontal sliding animation

(function ( $, _, Svelto, Widgets, Factory, Animations ) {

  /* CONFIG */

  let config = {
    name: 'expander',
    plugin: true,
    selector: '.expander',
    options: {
      classes: {
        horizontal: 'horizontal',
        open: 'open',
        opening: 'opening',
        closing: 'closing'
      },
      selectors: {
        content: '.expander-content' //TODO: Maybe rename it to `.expander-block`
      },
      animations: {
        open: Animations.fast,
        close: Animations.fast
      },
      callbacks: {
        beforeopen: _.noop,
        open: _.noop,
        beforeclose: _.noop,
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
      this._isHorizontal = this.$expander.hasClass ( this.options.classes.horizontal );

    }

    /* API */

    isOpen () {

      return this._isOpen;

    }

    toggle ( force = !this._isOpen ) {

      if ( !!force === this._isOpen ) return;

      if ( this.isLocked () ) return this.whenUnlocked ( () => this.toggle ( force ) );

      this.lock ();

      this._isOpen = !!force;

      this._trigger ( this._isOpen ? 'beforeopen' : 'beforeclose' );

      this.$content.slideToggle ({
        duration: this._isOpen ? this.options.animations.open : this.options.animations.close,
        axis: this._isHorizontal ? 'x' : 'y',
        callbacks: {
          start: () => {

            this.$expander.addClass ( this._isOpen ? this.options.classes.opening : this.options.classes.closing );

          },
          end: () => {

            this.$expander.removeClass ( this._isOpen ? this.options.classes.opening : this.options.classes.closing ).toggleClass ( this.options.classes.open, this._isOpen );

            this._isOpen ? this.autofocus () : this.autoblur ();

            this.unlock ();

            this._trigger ( this._isOpen ? 'open' : 'close' );

          }
        }
      }, force );

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

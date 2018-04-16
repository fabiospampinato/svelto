
// @require widgets/expander/expander.js

//TODO: Add better support for changing `options.multiple` at runtime. `multiple: true` -> opening multiple, -> `multiple: false` -> multiple still opened

(function ( $, _, Svelto, Widgets, Factory ) {

  /* CONFIG */

  let config = {
    name: 'accordion',
    plugin: true,
    selector: '.accordion',
    options: {
      multiple: false, // Wheter to allow multiple expanders open or not
      selectors: {
        expander: Widgets.Expander.config.selector
      },
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    }
  };

  /* ACCORDION */

  class Accordion extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$accordion = this.$element;
      this.$expanders = this.$accordion.children ( this.options.selectors.expander );

      this.instances = this.$expanders.get ().map ( expander => $(expander).expander ( 'instance' ) );

    }

    _events () {

      this.___beforeopen ();
      this.___open ();
      this.___close ();

    }

    /* EXPANDER BEFOREOPEN */

    ___beforeopen () {

      this._on ( true, this.$expanders, 'expander:beforeopen', this.__beforeopen );

    }

    __beforeopen ( event ) { // Close others

      if ( this.options.multiple ) return;

      this.instances.forEach ( instance => instance.element !== event.currentTarget ? instance.close () : false );

    }

    /* EXPANDER OPEN */

    ___open () {

      this._on ( true, this.$expanders, 'expander:open', this.__open );

    }

    __open ( event ) {

      this._trigger ( 'open', { index: this.$expanders.index ( event.currentTarget ) } );

    }

    /* EXPANDER CLOSE */

    ___close () {

      this._on ( true, this.$expanders, 'expander:close', this.__close );

    }

    __close ( event ) {

      this._trigger ( 'close', { index: this.$expanders.index ( event.currentTarget ) } );

    }

    /* API OVERRIDES */

    enable () {

      super.enable ();

      this.instances.forEach ( instance => instance.enable () );

    }

    disable () {

      this.instances.forEach ( instance => instance.disable () );

    }

    /* API */

    isOpen ( index ) {

      return this.instances[index].isOpen ();

    }

    toggle ( index, force ) {

      this.instances[index].toggle ( force );

    }

    open ( index ) {

      this.toggle ( index, true );

    }

    close ( index ) {

      this.toggle ( index, false );

    }

  }

  /* FACTORY */

  Factory.make ( Accordion, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

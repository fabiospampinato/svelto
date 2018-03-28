
// @require core/widget/widget.js

(function ( $, _, Svelto, Widgets, Factory ) {

  /* CONFIG */

  let config = {
    name: 'inputFileNames',
    plugin: true,
    selector: '.input-file-names',
    options: {
      placeholder: 'Select a file...',
      callbacks: {
        change: _.noop
      }
    }
  };

  /* INPUT FILE NAMES */

  class InputFileNames extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$names = this.$element;

      this.$input = this.$names.closest ( 'label' ).find ( 'input[type="file"]' );
      this.input = this.$input[0];

    }

    _init () {

      this.options.placeholder = this.$names.text () || this.options.placeholder;

      this._update ();

    }

    _events () {

      this.___change ();

    }

    /* PRIVATE */

    _getNames () {

      let names = [];

      for ( let i = 0, l = this.input.files.length; i < l; i++ ) {

        names.push ( this.input.files[i].name );

      }

      return names;

    }

    _getText () {

      let names = this._getNames ();

      return names.length ? names.join ( ', ' ) : this.options.placeholder;

    }

    /* CHANGE */

    ___change () {

      this._on ( true, this.$input, 'change', this._update );

    }

    /* UPDATE */

    _update () {

      let previous = this.$names.text (),
          current = this._getText ();

      if ( previous === current ) return;

      this.$names.text ( current );

      this._trigger ( 'change' );

    }

  }

  /* FACTORY */

  Factory.make ( InputFileNames, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

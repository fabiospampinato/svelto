
// @require core/widget/widget.js

(function ( $, _, Svelto, Widgets, Factory ) {

  /* CONFIG */

  let config = {
    name: 'targeter',
    options: {
      widget: false, // The target's widget class
      target: false, // Selector used to select the target
      $fallback: false, // Fallback jQuery element
      datas: {
        target: 'target'
      }
    }
  };

  /* TARGETER */

  class Targeter extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this._targetSelector = this.options.target || ( this.options.widget ? this.$element.data ( `${this.options.widget.config.name.toLowerCase ()}-${this.options.datas.target}` ) : false ) || this.$element.data ( this.options.datas.target );

      this.$target = this._targetSelector
                       ? $(this._targetSelector)
                       : this.options.widget
                         ? this.$element.closest ( this.options.widget.config.selector )
                         : this.options.$fallback;

      if ( !this.$target.length ) return false;

      this.target = this.$target[0];

      if ( this.options.widget ) this._targetInstance = this.$target[this.options.widget.config.name]( 'instance' );

    }

    _events () {

      this.___targetRemove ();

    }

    /* TARGET REMOVE */

    ___targetRemove () {

      this._on ( true, this.$target, 'remove', this.__targetRemove );

    }

    __targetRemove ( event ) {

      this.__remove ( event );

    }

  }

  /* FACTORY */

  Factory.make ( Targeter, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

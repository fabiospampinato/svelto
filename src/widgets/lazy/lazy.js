
// @require core/widget/widget.js
// @require ./worker.js

(function ( $, _, Svelto, Widgets, Factory, LazyWorker ) {

  /* CONFIG */

  let config = {
    name: 'lazy',
    options: {
      datas: {
        group: 'group'
      },
      callbacks: {
        load: _.noop
      }
    }
  };

  /* LAZY */

  class Lazy extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.group = this.$element.data ( this.options.datas.group );

    }

    _init () {

      LazyWorker.add ( this, this.$element, this.group );

    }

    /* API */

    load () {

      this._trigger ( 'load' );

      this.destroy ();

    }

  }

  /* FACTORY */

  Factory.make ( Lazy, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.LazyWorker ));

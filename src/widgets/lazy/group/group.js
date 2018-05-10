
// @priority 650
// @require core/widget/widget.js
// @require ../worker.js

(function ( $, _, Svelto, Factory, LazyWorker ) {

  /* CONFIG */

  let config = {
    name: 'lazyGroup',
    plugin: true,
    selector: '.lazy-group',
    options: {
      datas: {
        group: 'group'
      }
    }
  };

  /* LAZY GROUP */

  class Lazy extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.group = this.$element.data ( this.options.datas.group );

      this.__scroll = _.frames ( this.process.bind ( this ) );

    }

    _events () {

      this._on ( true, 'scroll', this.__scroll );

    }

    /* API */

    process () {

      if ( !LazyWorker.process ( undefined, this.group ) ) return;

      this._reset ();

    }

  }

  /* FACTORY */

  Factory.make ( Lazy, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Factory, Svelto.LazyWorker ));

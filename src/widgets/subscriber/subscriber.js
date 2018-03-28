
// @priority 100
// @require widgets/remote/reaction/reaction.js

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  /* CONFIG */

  let config = {
    name: 'subscriber',
    plugin: true,
    selector: '.subscriber',
    options: {
      counter: 0,
      datas: {
        counter: 'counter'
      },
      selectors: {
        toggle: '.toggle',
        counter: '.counter'
      }
    }
  };

  /* SUBSCRIBER */

  class Subscriber extends Widgets.RemoteReaction {

    /* SPECIAL */

    _variables () {

      super._variables ();

      this.$toggle = this.$reaction.find ( this.options.selectors.toggle );
      this.$counter = this.$reaction.find ( this.options.selectors.counter );

    }

    _init () {

      this.options.counter = Number ( this.$counter.data ( this.options.datas.counter ) ) || this.options.counter;

      super._init ();

    }

    _events () {

      this.___toggle ();

    }

    /* UPDATE */

    _update () {

      super._update ();

      this.$counter.attr ( `data-${this.options.datas.counter}`, this.options.counter );

    }

    /* TOGGLE */

    ___toggle () {

      this._on ( this.$toggle, Pointer.tap, this.__toggle );

    }

    __toggle () {

      this.toggle ();

    }

    /* REQUEST CALLBACKS */

    _success ( resj ) {

      this.options.counter = resj.counter;

      super._success ( resj );

    }

    /* API */

    get () {

      return _.pick ( this.options, ['counter', 'state'] );

    }

    toggle ( force = !this.options.state ) {

      if ( !!force !== this.options.state ) {

        this.set ( !!force );

      }

    }

    subscribe () {

      return this.set ( true );

    }

    unsubscribe () {

      return this.set ( false );

    }

  }

  /* FACTORY */

  Factory.make ( Subscriber, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));

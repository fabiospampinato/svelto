
// @require core/svelto/svelto.js

//TODO: Maybe rename it, `Readify` doesn't sound right
//FIXME: We actually `require` Widget, but requiring it creates a circular dependency...

(function ( $, _, Svelto ) {

  /* READIFY */

  class Readify {

    constructor () {

      this.queue = [];
      this._isReady = !!window.__svelto_readify_ready;

    }

    /* METHODS */

    get () {

      return this.queue;

    }

    add ( fn, ready = false ) {

      if ( ready || this._isReady ) {

        this.worker ( fn );

      } else {

        this.queue.push ( fn );

      }

    }

    remove ( fn ) {

      _.pull ( this.queue, fn );

    }

    isReady () {

      return this._isReady;

    }

    ready () {

      if ( this._isReady ) return;

      this._isReady = true;

      this.queue.forEach ( this.worker.bind ( this ) );

      this.queue = [];

    }

    worker ( fn ) {

      if ( $.isWidget ( fn ) ) {

        let Widget = fn,
            ready = Widget.ready || Widget.__proto__.ready || Svelto.Widget.ready, //IE10 support -- static property
            setReady = Widget._setReady || Widget.__proto__._setReady || Svelto.Widget._setReady; //IE10 support -- static property

        ready.call ( Widget, setReady.bind ( Widget ) );

      } else {

        fn ();

      }

    }

  }

  /* EXPORT */

  Svelto.Readify = new Readify ();

  /* READY */

  if ( !Svelto.Readify.isReady () ) {

    $( Svelto.Readify.ready.bind ( Svelto.Readify ) );

  }

}( Svelto.$, Svelto._, Svelto ));

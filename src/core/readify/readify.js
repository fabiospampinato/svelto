
/* =========================================================================
 * Svelto - Core - Readify
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

//FIXME: We actually `require` Widget, but requiring it creates a circular dependency...

(function ( $, _, Svelto, Widgets ) {

  'use strict';

  /* READIFY */

  class Readify {

    constructor () {

      this.queue = [];

    }

    /* METHODS */

    get () {

      return this.queue;

    }

    add ( fn ) {

      if ( this._isReady ) {

        this.worker ( fn );

      } else {

        this.queue.push ( fn );

      }

    }

    remove ( fn ) {

      _.pull ( this.queue, fn );

    }

    ready () {

      this._isReady = true;

      this.queue.forEach ( this.worker.bind ( this ) );

      this.queue = [];

    }

    worker ( fn ) {

      if ( 'config' in fn ) { //FIXME: Not really future proof

        let Widget = fn,
            ready = Widget.ready || Widget.__proto__.ready || Widgets.Widget.ready, //IE10 support -- static property
            initReady = Widget._initReady || Widget.__proto__._initReady || Widgets.Widget._initReady, //IE10 support -- static property
            setReady = Widget._setReady || Widget.__proto__._setReady || Widgets.Widget._setReady; //IE10 support -- static property

        initReady.bind ( Widget )();

        ready.bind ( Widget )( setReady.bind ( Widget ) );

      } else {

        fn ();

      }

    }

  }

  /* EXPORT */

  Svelto.Readify = new Readify ();

  /* READY */

  $(Svelto.Readify.ready.bind ( Svelto.Readify ));

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets ));


/* =========================================================================
 * Svelto - Core - Readify
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

//TODO: Maybe make it a little more general, adding support for pure functions as well
//FIXME: We actually `require` Widget, but requiring it creates a circular dependency...

(function ( $, _, Svelto, Widgets ) {

  'use strict';

  /* READIFY */

  class Readify {

    constructor () {

      this.widgets = [];

    }

    get () {

      return this.widgets;

    }

    add ( Widget ) {

      this.widgets.push ( Widget );

    }

    remove ( Widget ) {

      _.pull ( this.widgets, Widget );

    }

    do () {

      for ( let Widget of this.widgets ) {

        let ready = Widget.ready || Widget.__proto__.ready || Widgets.Widget.ready, //IE10 support -- static property
            initReady = Widget._initReady || Widget.__proto__._initReady || Widgets.Widget._initReady, //IE10 support -- static property
            setReady = Widget._setReady || Widget.__proto__._setReady || Widgets.Widget._setReady; //IE10 support -- static property

        initReady.bind ( Widget )();

        ready.bind ( Widget )( setReady.bind ( Widget ) );

      }

    }

  }

  /* EXPORT */

  Svelto.Readify = new Readify ();

  /* READY */

  $(Svelto.Readify.do.bind ( Svelto.Readify ));

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets ));

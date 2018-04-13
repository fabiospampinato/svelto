
// @require core/svelto/svelto.js

(function ( $, _, Svelto, Widgets ) {

  /* TOASTS */

  class Toasts {

    constructor () {

      this.reset ();

      this.___visibility ();

    }

    /* GENERAL */

    get () {

      return this.toasts;

    }

    set ( toasts ) {

      this.toasts = toasts;

    }

    reset () {

      this.set ( [] );

    }

    add ( toast ) {

      if ( this.toasts.includes ( toast ) ) return;

      this.toasts.push ( toast );

    }

    remove ( toast ) {

      _.pull ( this.toasts, toast );

    }

    /* HOVERING */

    isHovering () {

      return !!this.hovering;

    }

    setHovering ( hovering ) {

      this.hovering = hovering;

    }

    /* VISIBILITY */

    ___visibility () {

      $.$document.on ( 'visibilitychange', this.__visibility.bind ( this ) );

    }

    __visibility () {

      if ( this.isHovering () ) return;

      if ( document.hidden ) {

        this.pause ();

      } else {

        this.resume ();

      }

    }

    /* API MAPPING */

    _callMethod ( method ) {

      for ( let i = this.toasts.length - 1; i >= 0; i-- ) { // The array might get mutated in the process

        this.toasts[i][method]();

      }

    }

    open () {

      this._callMethod ( 'open' );

    }

    close () {

      this._callMethod ( 'close' );

    }

    pause () {

      this._callMethod ( 'pause' );

    }

    resume () {

      this._callMethod ( 'resume' );

    }

  };

  /* EXPORT */

  Widgets.Toasts = new Toasts ();

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets ));

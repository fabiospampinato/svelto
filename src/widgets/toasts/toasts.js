
/* =========================================================================
 * Svelto - Widgets - Toasts
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

//TODO: Add a page to the demo

(function ( $, _, Svelto, Widgets ) {

  'use strict';

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

        this.pauseAll ();

      } else {

        this.resumeAll ();

      }

    }

    /* PAUSE */

    pause ( toast ) {

      toast.timer.pause ();

    }

    pauseAll () {

      this.toasts.forEach ( this.pause );

    }

    /* RESUME */

    resume ( toast ) {

      toast.timer.remaining ( Math.max ( toast.options.ttlMinimumRemaining, toast.timer.remaining () ) ).play ();

    }

    resumeAll () {

      this.toasts.forEach ( this.resume );

    }

  };

  /* EXPORT */

  Widgets.Toasts = new Toasts ();

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets ));

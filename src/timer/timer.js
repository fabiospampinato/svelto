
/* =========================================================================
 * Svelto - Timer
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * Fork of http://jchavannes.com/jquery-timer - Jason Chavannes
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* TIMER */

  window.Timer = class {

    constructor ( ...args ) {

      this.set ( ...args );

    }

    set ( fn, time, autostart ) {

      this.init = true;
      this.action = fn;

      if ( !isNaN ( time ) ) {

        this.intervalTime = time;

      }

      if ( autostart && !this.isActive ) {

        this.isActive = true;
        this.setTimer ();

      }

      return this;

    }

    once ( time ) {

      if ( isNaN ( time ) ) {

        time = 0;

      }

      setTimeout ( () => this.action (), time );

      return this;

    }

    play ( reset ) {

      if ( !this.isActive ) {

        if ( reset ) {

          this.setTimer ();

        } else {

          this.setTimer ( this.remainingTime );

        }

        this.isActive = true;

      }

      return this;

    }

    pause () {

      if ( this.isActive ) {

        this.isActive = false;
        this.remainingTime -= ( new Date() - this.last );
        this.clearTimer ();

      }

      return this;

    }

    stop () {

      this.isActive = false;
      this.remainingTime = this.intervalTime;
      this.clearTimer ();

      return this;

    }

    toggle ( reset ) {

      if ( this.isActive ) {

        this.pause ();

      } else if ( reset ) {

        this.play ( true );

      } else {

        this.play ();

      }

      return this;

    }

    reset () {

      this.isActive = false;
      this.play ( true );

      return this;

    }

    clearTimer () {

      clearTimeout ( this.timeoutObject );

    }

    setTimer ( time ) {

      if ( isNaN ( time ) ) {

        time = this.intervalTime;

      }

      this.remainingTime = time;
      this.last = new Date ();
      this.clearTimer ();

      this.timeoutObject = setTimeout ( () => this.go (), time );

    }

    go () {

      if ( this.isActive ) {

        this.action ();
        this.setTimer ();

      }

    }

    remaining ( value ) {

      if ( _.isUndefined ( value ) ) {

        return this.remainingTime;

      }

      this.remainingTime = value;

      return this;

    }

  };

}( jQuery, _, window, document ));

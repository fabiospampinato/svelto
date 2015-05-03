
 /* TIMER - http://jchavannes.com/jquery-timer */

;(function ( $, window, document, undefined ) {

    'use strict';

    $.timer = function ( func, time, autostart ) {

        return new Timer ( func, time, autostart );

    };

    /* TIMER OBJ */

    var Timer = function ( func, time, autostart ) {

        return this.set ( func, time, autostart );

    };

    Timer.prototype = {

        set: function ( func, time, autostart ) {

            this.init = true;
            this.action = func;

            if ( !isNaN ( time ) ) this.intervalTime = time;

            if ( autostart && !this.isActive ) {

                this.isActive = true;
                this.setTimer ();

            }

            return this;

        },

        once: function ( time ) {

            var timer = this;

            if ( isNaN ( time ) ) time = 0;

            setTimeout ( function () {

                timer.action ();

            }, time );

            return this;

        },

        play: function ( reset ) {

            if ( !this.isActive ) {

                if ( reset ) this.setTimer ();
                else this.setTimer ( this.remaining_time );

                this.isActive = true;

            }

            return this;

        },

        pause: function () {

            if ( this.isActive ) {

                this.isActive = false;
                this.remaining_time -= new Date() - this.last;
                this.clearTimer ();

            }

            return this;

        },

        stop: function () {

            this.isActive = false;
            this.remaining_time = this.intervalTime;
            this.clearTimer ();

            return this;

        },

        toggle: function ( reset ) {

            if ( this.isActive ) this.pause ();
            else if ( reset ) this.play ( true );
            else this.play ();

            return this;

        },

        reset: function () {

            this.isActive = false;
            this.play ( true );

            return this;

        },

        clearTimer: function () {

            clearTimeout ( this.timeoutObject );

        },

        setTimer: function ( time ) {

            var timer = this;

            if ( isNaN ( time ) ) time = this.intervalTime;

            this.remaining_time = time;
            this.last = new Date ();
            this.clearTimer ();

            this.timeoutObject = setTimeout ( function () {

                timer.go ()

            }, time );

        },

        go: function () {

            if ( this.isActive ) {

                this.action ();
                this.setTimer ();

            }

        },

        remaining: function ( value ) {

            if ( _.isUndefined ( value ) ) return this.remaining_time;

            this.remaining_time = value;

            return this;

        }

    };

}( lQuery, window, document ));

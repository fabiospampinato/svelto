
 /* TIMER - http://jchavannes.com/jquery-timer */

;(function ( $, window, document, undefined ) {

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

            window.setTimeout ( function () {

                timer.action ();

            }, time );

            return this;

        },

        play: function ( reset ) {

            if ( !this.isActive ) {

                if ( reset ) this.setTimer ();
                else this.setTimer ( this.remaining );

                this.isActive = true;

            }

            return this;

        },

        pause: function () {

            if ( this.isActive ) {

                this.isActive = false;
                this.remaining -= new Date() - this.last;
                this.clearTimer ();

            }

            return this;

        },

        stop: function () {

            this.isActive = false;
            this.remaining = this.intervalTime;
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

            window.clearTimeout ( this.timeoutObject );

        },

        setTimer: function ( time ) {

            var timer = this;

            if ( isNaN ( time ) ) time = this.intervalTime;

            this.remaining = time;
            this.last = new Date();
            this.clearTimer();

            this.timeoutObject = window.setTimeout ( function () {

                timer.go ();

            }, time );

        },

        go: function () {

            if ( this.isActive ) {

                this.action ();
                this.setTimer ();

            }

        }

    };

}( lQuery, window, document ));

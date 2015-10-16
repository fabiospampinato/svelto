
/* =========================================================================
 * Svelto - Pointer v0.3.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../browser/browser.js
 * ========================================================================= */

//FIXME: Right now how can we bind an event handler on just tap? (when doubletap doesn't happen later) (basically a click, maybe (what about a dblclick?))
//FIXME: Does it handle devices where you can use both a touch event or a mouse event such when using a mouse connected to an android device? (//TODO Test it!)

//INFO: Proposed draft: http://www.w3.org/TR/pointerevents/

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* OPTIONS */

  window.Pointer = {
    options: {
      events: {
        prefix: 'pointer'
      },
      press: {
        duration: 300
      },
      dbltap: {
        interval: 300
      },
      flick: {
        duration: 150,
        threshold: 5
      }
    }
  };

  /* EVENTS */

  var events = {
    tap: Pointer.options.events.prefix + 'tap',
    dbltap: Pointer.options.events.prefix + 'dbltap',
    press: Pointer.options.events.prefix + 'press',
    flick: Pointer.options.events.prefix + 'flick',
    down: $.browser.is.touchDevice ? 'touchstart' : 'mousedown',
    move: $.browser.is.touchDevice ? 'touchmove' : 'mousemove',
    up: $.browser.is.touchDevice ? 'touchend' : 'mouseup',
    cancel: $.browser.is.touchDevice ? 'touchcancel' : 'mouseleave',
    over: 'mouseover',
    enter: 'mouseenter',
    out: 'mouseout',
    leave: 'mouseleave'
  };

  /* EVENTS METHODS */

  _.each ( events, function ( alias, name ) {

    Pointer[name] = alias;

    $.fn[name] = function ( fn ) {

      return fn ? this.on ( alias, fn ) : this.trigger ( alias );

    };

  });

  /* POINTER LOGIC */

  (function () { //TODO: Maybe remove this

    /* VARIABLES */

    var $document = $(document),
        target,
        $target,
        startEvent,
        startTimestamp,
        downTimestamp,
        prevTapTimestamp = 0,
        motion,
        pressTimeout;

    /* EVENT CREATOR */

    var createEvent = function ( name, originalEvent ) {

      var event = $.Event ( name );

      event.originalEvent = originalEvent;
      event.isPointerEvent = true;

      return event;

    };

    /* HANDLERS */

    var downHandler = function ( event ) {

      target = event.target;
      $target = $(target);

      startEvent = event;
      startTimestamp = event.timeStamp || Date.now ();

      motion = false;

      pressTimeout = setTimeout ( pressHandler, Pointer.options.press.duration );

      $target.one ( Pointer.move, moveHandler );
      $target.one ( Pointer.up, upHandler );
      $target.one ( Pointer.cancel, cancelHandler );

    };

    var pressHandler = function () { //FIXME: it doesn't get called if we do event.preventDefault () with dragstart

      $target.trigger ( createEvent ( Pointer.press, startEvent ) );

      pressTimeout = false;

    };

    var moveHandler = function () {

      if ( pressTimeout ) {

        clearTimeout ( pressTimeout );
        pressTimeout = false;

      }

      motion = true;

    };

    var upHandler = function ( event ) {

      if ( pressTimeout ) {

        clearTimeout ( pressTimeout );

      }

      downTimestamp = event.timeStamp || Date.now ();

      if ( motion && ( downTimestamp - startTimestamp <= Pointer.options.flick.duration ) ) {

        var startXY = $.eventXY ( startEvent ),
            endXY = $.eventXY ( event ),
            deltaXY = {
              X: endXY.X - startXY.X,
              Y: endXY.Y - startXY.Y
            },
            absDeltaXY = {
              X: Math.abs ( deltaXY.X ),
              Y: Math.abs ( deltaXY.Y )
            };

        if ( absDeltaXY.X >= Pointer.options.flick.threshold || absDeltaXY.Y >= Pointer.options.flick.threshold ) {

          if ( absDeltaXY.X > absDeltaXY.Y ) {

            var orientation = 'horizontal',
                direction = ( deltaXY.X > 0 ) ? 1 : -1;

          } else {

            var orientation = 'vertical',
                direction = ( deltaXY.Y > 0 ) ? 1 : -1;

          }

          $target.trigger ( createEvent ( Pointer.flick, event ), {
            orientation: orientation,
            direction: direction,
            startXY: startXY,
            endXY: endXY
          });

        }

      }

      if ( !$.browser.is.touchDevice || !motion ) {

        $target.trigger ( createEvent ( Pointer.tap, event ) );

        if ( downTimestamp - prevTapTimestamp <= Pointer.options.dbltap.interval ) {

          $target.trigger ( createEvent ( Pointer.dbltap, event ) );

        }

        prevTapTimestamp = downTimestamp;

      }

      if ( !motion ) {

        $target.off ( Pointer.move, moveHandler );

      }

      $target.off ( Pointer.cancel, cancelHandler );

    };

    var cancelHandler = function () {

      if ( pressTimeout ) {

        clearTimeout ( pressTimeout );

      }

      if ( !motion ) {

        $target.off ( Pointer.move, moveHandler );

      }

      $target.off ( Pointer.up, upHandler );

    };

    /* BIND */

    $document.on ( Pointer.down, downHandler );

  })();

}( jQuery, _, window, document ));

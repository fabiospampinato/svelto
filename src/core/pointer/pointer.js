
// @require core/browser/browser.js
// @require core/mouse/mouse.js
// @require core/svelto/svelto.js

// Basically it exists other than to provide the convinient `Pointer` global also for removing the 300ms delay on click by providing the `tap` event

(function ( $, _, Svelto, Browser, Mouse ) {

  /* VARIABLES */

  let prefix = 'spointer';

  /* POINTER */

  let Pointer = {

    /* OPTIONS */

    options: {
      events: {
        prefix,
        emulated: {
          tune: true, // Whether to fine-tune the timeout or not
          tuned: false, // Whether the timeout has been tuned or not
          timeout: 2500, // Milliseconds to wait for an emulated event
          min: 500, // Minimum fine-tuned timeout
          multiplier: 2.5 // The detected timeout will be multiplied by this
        }
      },
      tap: {
        threshold: 6 // Over this distance threshold the touch event won't be considered a tap
      },
      dbltap: {
        interval: 300 // 2 taps within this interval will trigger a dbltap event
      },
    },

    /* EVENTS */

    tap: `${prefix}tap`,
    dbltap: `${prefix}dbltap`,
    click: 'click',
    dblclick: 'dblclick',
    down: Browser.is.touchDevice ? 'touchstart mousedown' : 'mousedown',
    move: Browser.is.touchDevice ? 'touchmove mousemove' : 'mousemove',
    up: Browser.is.touchDevice ? 'touchend mouseup' : 'mouseup',
    cancel: Browser.is.touchDevice ? 'touchcancel mouseleave' : 'mouseleave',
    over: 'mouseover',
    enter: 'mouseenter',
    out: 'mouseout',
    leave: 'mouseleave',

    /* METHODS */

    isDeviceEvent ( event, device ) {
      return _.startsWith ( event.type, device.toLowerCase () );
    },
    isPointerEvent ( event ) {
      return Pointer.isDeviceEvent ( event, Pointer.options.events.prefix );
    },
    isMouseEvent ( event ) {
      return Pointer.isDeviceEvent ( event, 'mouse' );
    },
    isTouchEvent ( event ) {
      return Pointer.isDeviceEvent ( event, 'touch' );
    }

  };

  /* EVENTS METHODS */

  ['tap', 'dbltap'].forEach ( name => {

    $.fn[name] = function ( data, fn ) {

      return arguments.length ? this.on ( Pointer[name], null, data, fn ) : this.triggger ( name );

    };

  });

  /* ----- POINTER LOGIC ----- */

  /* VARIABLES */

  let canTouch = Browser.is.touchDevice,
      isTouch,
      delta = 0,
      skipping,
      scrolled,
      timeoutId,
      downEvent,
      emulatedTimeoutTimestamp,
      prevTapTimestamp = 0,
      dbltapTriggerable = true;

  /* EVENT CREATOR */

  function createEvent ( name, originalEvent ) {

    let event = $.Event ( name );

    event.originalEvent = originalEvent;

    return event;

  }

  /* HANDLERS */

  function downHandler ( event ) {

    if ( canTouch ) {

      isTouch = Pointer.isTouchEvent ( event );

      if ( isTouch ) {

        if ( !emulatedTimeoutTimestamp && Pointer.options.events.emulated.tune ) emulatedTimeoutTimestamp = Date.now ();

        scrolled = false;

        window.onscroll = scrollHandler;

        delta++;

      } else if ( delta > 0 ) {

        if ( emulatedTimeoutTimestamp && !Pointer.options.events.emulated.tuned && Pointer.options.events.emulated.tune ) {

          Pointer.options.events.emulated.timeout = Math.ceil ( Math.max ( Pointer.options.events.emulated.min, ( Date.now () - emulatedTimeoutTimestamp ) * Pointer.options.events.emulated.multiplier ) );

          Pointer.options.events.emulated.tuned = true;

        }

        skipping = true;

        delta--;

        return;

      }

      skipping = false;

    }

    downEvent = event;

  }

  function upHandler ( event ) {

    if ( skipping ) return;
    if ( !downEvent ) return;

    reset ();

    if ( isTouch && scrolled ) return;
    if ( !isTouch && !Mouse.hasButton ( event, Mouse.buttons.LEFT, true ) ) return;
    if ( downEvent.target !== event.target ) return;

    if ( isTouch ) {

      let downXY = $.eventXY ( downEvent ),
          upXY = $.eventXY ( event ),
          threshold = Pointer.options.tap.threshold;

      if ( Math.abs ( downXY.x - upXY.x ) > threshold || Math.abs ( downXY.y - upXY.y ) > threshold ) return;

    }

    let tapTimestamp = event.timeStamp || Date.now (),
        $target = $(downEvent.target);

    $target.trigger ( createEvent ( Pointer.tap, event ) );

    if ( tapTimestamp - prevTapTimestamp <= Pointer.options.dbltap.interval ) {

      if ( dbltapTriggerable ) {

        $target.trigger ( createEvent ( Pointer.dbltap, event ) );

        dbltapTriggerable = false;

      }

    } else {

      dbltapTriggerable = true;

    }

    prevTapTimestamp = tapTimestamp;

  }

  function scrollHandler () {

    scrolled = true;

    window.onscroll = null;

  }

  /* RESET */

  function reset () {

    setTimeout ( resetEvents, 0 );

    if ( isTouch ) {

      if ( !scrolled ) window.onscroll = null;

      if ( timeoutId ) clearTimeout ( timeoutId );

      timeoutId = setTimeout ( resetDelta, Pointer.options.events.emulated.timeout );

    }

  }

  function resetEvents () {

    downEvent = undefined;

  }

  function resetDelta () {

    delta = 0;

    timeoutId = false;

  }

  /* INIT */

  $.$document.on ( Pointer.down, downHandler );
  $.$document.on ( Pointer.up, upHandler );
  $.$document.on ( Pointer.cancel, reset );

  /* EXPORT */

  Svelto.Pointer = Pointer;

}( Svelto.$, Svelto._, Svelto, Svelto.Browser, Svelto.Mouse ));

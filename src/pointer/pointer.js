
/* =========================================================================
 * Svelto - Pointer
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../browser/browser.js
 * ========================================================================= */

//FIXME: Right now how can we bind an event handler on just tap? (when doubletap doesn't happen later) (basically a click, maybe (what about a dblclick?))
//FIXME: Does it handle devices where you can use both a touch event or a mouse event such when using a mouse connected to an android device? //TODO Test it!

//INFO: Proposed draft: http://www.w3.org/TR/pointerevents/

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

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
    }
  };

  /* EVENTS */

  let events = {
    tap: Pointer.options.events.prefix + 'tap',
    dbltap: Pointer.options.events.prefix + 'dbltap',
    press: Pointer.options.events.prefix + 'press',
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

  for ( let name in events ) {

    Pointer[name] = events[name];

    $.fn[name] = function ( fn ) {

      return fn ? this.on ( events[name], fn ) : this.trigger ( events[name] );

    };

  }

  /* POINTER LOGIC */

  /* VARIABLES */

  let $document = $(document),
      target,
      $target,
      startEvent,
      prevTapTimestamp = 0,
      motion,
      pressTimeout;

  /* EVENT CREATOR */

  let createEvent = function ( name, originalEvent ) {

    let event = $.Event ( name );

    event.originalEvent = originalEvent;

    return event;

  };

  /* HANDLERS */

  let downHandler = function ( event ) {

    target = event.target;
    $target = $(target);

    startEvent = event;

    motion = false;

    pressTimeout = setTimeout ( pressHandler, Pointer.options.press.duration );

    $target.one ( Pointer.move, moveHandler );
    $target.one ( Pointer.up, upHandler );
    $target.one ( Pointer.cancel, cancelHandler );

  };

  let pressHandler = function () {

    $target.trigger ( createEvent ( Pointer.press, startEvent ) );

    pressTimeout = false;

  };

  let moveHandler = function ( event ) {

    if ( pressTimeout ) {

      clearTimeout ( pressTimeout );
      pressTimeout = false;

    }

    motion = true;

  };

  let upHandler = function ( event ) {

    if ( pressTimeout ) {

      clearTimeout ( pressTimeout );

    }

    let endTimestamp = event.timeStamp || Date.now ();

    if ( !$.browser.is.touchDevice || !motion ) {

      $target.trigger ( createEvent ( Pointer.tap, event ) );

      if ( endTimestamp - prevTapTimestamp <= Pointer.options.dbltap.interval ) {

        $target.trigger ( createEvent ( Pointer.dbltap, event ) );

      }

      prevTapTimestamp = endTimestamp;

    }

    if ( !motion ) {

      $target.off ( Pointer.move, moveHandler );

    }

    $target.off ( Pointer.cancel, cancelHandler );

  };

  let cancelHandler = function () {

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

}( Svelto.$, Svelto._, window, document ));

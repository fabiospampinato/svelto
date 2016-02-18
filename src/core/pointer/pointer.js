
/* =========================================================================
 * Svelto - Pointer
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/browser/browser.js
 * @require core/svelto/svelto.js
 * ========================================================================= */

// Basically it exists other than to provide the convinient `Pointer` global also for removing the 300ms delay on click by providing the `tap` event

(function ( $, _, Svelto, Browser ) {

  'use strict';

  /* POINTER */

  let Pointer = {
    options: {
      events: {
        prefix: 'spointer'
      },
      dbltap: {
        interval: 300 // 2 taps within this interval will trigger a dbltap event
      },
    }
  };

  /* EVENTS */

  let events = {
    tap: Pointer.options.events.prefix + 'tap',
    dbltap: Pointer.options.events.prefix + 'dbltap',
    click: 'click',
    dblclick: 'dblclick',
    down: Browser.is.touchDevice ? 'touchstart' : 'mousedown',
    move: Browser.is.touchDevice ? 'touchmove' : 'mousemove',
    up: Browser.is.touchDevice ? 'touchend' : 'mouseup',
    cancel: Browser.is.touchDevice ? 'touchcancel' : 'mouseleave',
    over: 'mouseover',
    enter: 'mouseenter',
    out: 'mouseout',
    leave: 'mouseleave'
  };

  /* EVENTS METHODS */

  for ( let name in events ) {

    if ( events.hasOwnProperty ( name ) ) {

      Pointer[name] = events[name];

      if ( !( name in $.fn ) ) {

        $.fn[name] = function ( fn ) {

          return fn ? this.on ( Pointer[name], fn ) : this.trigger ( Pointer[name] );

        };

      }

    }

  }

  /* ----- POINTER LOGIC ----- */

  /* VARIABLES */

  let target,
      $target,
      prevTapTimestamp = 0,
      motion;

  /* EVENT CREATOR */

  function createEvent ( name, originalEvent ) {

    let event = $.Event ( name );

    event.originalEvent = originalEvent;

    return event;

  }

  /* HANDLERS */

  function downHandler ( event ) {

    target = event.target;
    $target = $(target);

    motion = false;

    $target.one ( Pointer.move, moveHandler );
    $target.one ( Pointer.up, upHandler );
    $target.one ( Pointer.cancel, cancelHandler );

  }

  function moveHandler () {

    motion = true;

  }

  function upHandler ( event ) {

    if ( !Browser.is.touchDevice || !motion ) {

      let tapTimestamp = event.timeStamp || Date.now ();

      $target.trigger ( createEvent ( Pointer.tap, event ) );

      if ( tapTimestamp - prevTapTimestamp <= Pointer.options.dbltap.interval ) {

        $target.trigger ( createEvent ( Pointer.dbltap, event ) );

      }

      prevTapTimestamp = tapTimestamp;

    }

    if ( !motion ) {

      $target.off ( Pointer.move, moveHandler );

    }

    $target.off ( Pointer.cancel, cancelHandler );

  }

  function cancelHandler () {

    if ( !motion ) {

      $target.off ( Pointer.move, moveHandler );

    }

    $target.off ( Pointer.up, upHandler );

  }

  /* BIND */

  $(document).on ( Pointer.down, downHandler );

  /* EXPORT */

  Svelto.Pointer = Pointer;

}( Svelto.$, Svelto._, Svelto, Svelto.Browser ));

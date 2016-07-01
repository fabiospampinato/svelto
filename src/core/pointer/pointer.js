
/* =========================================================================
 * Svelto - Core - Pointer
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/browser/browser.js
 * @require core/mouse/mouse.js
 * @require core/svelto/svelto.js
 * ========================================================================= */

// Basically it exists other than to provide the convinient `Pointer` global also for removing the 300ms delay on click by providing the `tap` event

(function ( $, _, Svelto, Browser, Mouse ) {

  'use strict';

  /* VARIABLES */

  let prefix = 'spointer';

  /* POINTER */

  let Pointer = {
    /* OPTIONS */
    options: {
      events: {
        prefix: prefix
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

  let $document = $(document),
      namespace = `._${Pointer.options.events.prefix}`,
      down = $.eventNamespacer ( Pointer.down, namespace ),
      move = $.eventNamespacer ( Pointer.move, namespace ),
      up = $.eventNamespacer ( Pointer.up, namespace ),
      cancel = $.eventNamespacer ( Pointer.cancel, namespace ),
      target,
      prevTapTimestamp = 0,
      dbltapTriggerable = true,
      motion;

  /* EVENT CREATOR */

  function createEvent ( name, originalEvent ) {

    let event = $.Event ( name );

    event.originalEvent = originalEvent;

    return event;

  }

  /* HANDLERS */

  function downHandler ( event ) {

    $document.off ( namespace );

    target = event.target;

    motion = false;

    $document.one ( move, moveHandler );
    $document.one ( up, upHandler );
    $document.one ( cancel, reset );

  }

  function moveHandler () {

    motion = true;

  }

  function upHandler ( event ) {

    if ( target === event.target && ( !motion || !Pointer.isTouchEvent ( event ) ) && Mouse.hasButton ( event, Mouse.buttons.LEFT, true ) ) {

      let tapTimestamp = event.timeStamp || Date.now (),
          $target = $(target);

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

    reset ();

  }

  /* STATUS */

  function init () {

    setTimeout ( function () { // So that we'll listen to it after a possible `mousedown` event, occurring after a `touchstart` event, gets triggered

      $document.one ( down, downHandler );

    }, 0 );

  }

  function reset () {

    $document.off ( namespace );

    init ();

  }

  /* INIT */

  init ();

  /* EXPORT */

  Svelto.Pointer = Pointer;

}( Svelto.$, Svelto._, Svelto, Svelto.Browser, Svelto.Mouse ));

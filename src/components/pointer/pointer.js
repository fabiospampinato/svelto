
/* =========================================================================
 * Svelto - Pointer v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../browser/browser.js
 * ========================================================================= */

//FIXME: Right now how can we bind an event handler on just tap? (when doubletap doesn't happen later) (basically a click, maybe (what about a dblclick?))

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* SETTINGS */

  window.Pointer = {
    pressDuration: 300,
    doubleTapInterval: 300,
    flickDuration: 150,
    motionThreshold: 5
  };

  /* EVENTS METHODS */

  var eventsNames = ['tap', 'dbltap', 'press', 'dragstart', 'dragmove', 'dragend', 'flick'],
      eventsPrefix = 'pointer';

  _.each ( eventsNames, function ( name ) {

    var fullName = eventsPrefix + name;

    Pointer[name] = fullName;

    $.fn[name] = function ( fn ) {

      return fn ? this.on ( fullName, fn ) : this.trigger ( fullName );

    };

  });

  /* VARIABLES */

  var startEvents = $.browser.is.touchDevice ? 'touchstart' : 'mousedown',
      moveEvents = $.browser.is.touchDevice ? 'touchmove' : 'mousemove',
      endEvents = $.browser.is.touchDevice ? 'touchend touchcancel' : 'mouseup mouseleave',
      $html = $(document.documentElement),
      startXY,
      moveXY,
      deltaXY,
      endXY,
      target,
      $target,
      startTimestamp,
      endTimestamp,
      prevTapTimestamp = 0,
      motion,
      orientation,
      direction,
      pressTimeout;

  /* HANDLERS */

  var createEvent = function ( name, originalEvent ) {

    var event = $.Event ( name );

    event.originalEvent = originalEvent;
    event.isPointerEvent = true;

    return event;

  };

  var startHandler = function ( event ) {

    startXY = $.eventXY ( event );

    target = event.target;
    $target = $(target);

    startTimestamp = event.timeStamp || _.now ();

    motion = false;

    pressTimeout = setTimeout ( _.wrap ( event, pressHandler ), Pointer.pressDuration );

    $target.trigger ( createEvent ( Pointer.dragstart, event ), {
      startXY: startXY
    });

    $html.on ( moveEvents, moveHandler );
    $html.on ( endEvents, endHandler );

  };

  var pressHandler = function ( event ) { //FIXME: it doesn't get called if we do event.preventDefault () with dragstart

    $target.trigger ( createEvent ( Pointer.press, event ) );

  };

  var moveHandler = function ( event ) {

    clearTimeout ( pressTimeout );

    moveXY = $.eventXY ( event );

    deltaXY = {
      X: moveXY.X - startXY.X,
      Y: moveXY.Y - startXY.Y
    };

    if ( Math.abs ( deltaXY.X ) > Pointer.motionThreshold || Math.abs ( deltaXY.Y ) > Pointer.motionThreshold ) {

      motion = true;

      $target.trigger ( createEvent ( Pointer.dragmove, event ), {
        startXY: startXY,
        moveXY: moveXY,
        deltaXY: deltaXY
      });

    }

  };

  var endHandler = function ( event ) {

    clearTimeout ( pressTimeout );

    endXY = $.eventXY ( event );
    deltaXY = {
      X: endXY.X - startXY.X,
      Y: endXY.Y - startXY.Y
    };

    if ( target === event.target && ( event.type === 'touchend' || ( event.type === 'mouseup' && event.button === 0 ) ) ) {

      endTimestamp = event.timeStamp || _.now ();

      if ( !$.browser.is.touchDevice || !motion ) {

        $target.trigger ( createEvent ( Pointer.tap, event ) );

        if ( endTimestamp - prevTapTimestamp <= Pointer.doubleTapInterval ) {

          $target.trigger ( createEvent ( Pointer.dbltap, event ) );

        }

        prevTapTimestamp = endTimestamp;

      }

      if ( motion && ( endTimestamp - startTimestamp <= Pointer.flickDuration ) ) {

        if ( Math.abs ( deltaXY.X ) > Math.abs ( deltaXY.Y ) ) {

          orientation = 'horizontal';
          direction = ( deltaXY.X > 0 ) ? 1 : -1;

        } else {

          orientation = 'vertical';
          direction = ( deltaXY.Y > 0 ) ? 1 : -1;

        }

        $target.trigger ( createEvent ( Pointer.flick, event ), {
          startXY: startXY,
          endXY: endXY,
          deltaXY: deltaXY,
          orientation: orientation,
          direction: direction
        });

      }

    }

    $html.off ( moveEvents, moveHandler );
    $html.off ( endEvents, endHandler );

    $target.trigger ( createEvent ( Pointer.dragend, event ), {
      startXY: startXY,
      endXY: endXY,
      deltaXY: deltaXY
    });

  };

  /* BIND */

  $html.on ( startEvents, startHandler );

}( jQuery, _, window, document ));

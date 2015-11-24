
/* =========================================================================
 * Svelto - jQuery (Extras)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../browser/browser.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* ITERATOR */

  $.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

  /* HELPERS */

  $.eventXY = function ( event ) {

    if ( 'originalEvent' in event ) {

      return $.eventXY ( event.originalEvent );

    } else if ( 'changedTouches' in event && event.changedTouches.length > 0 ) {

      return {
        X: event.changedTouches[0].pageX,
        Y: event.changedTouches[0].pageY
      };

    } else if ( 'touches' in event && event.touches.length > 0 ) {

      return {
        X: event.touches[0].pageX,
        Y: event.touches[0].pageY
      };

    } else if ( 'pageX' in event ) {

      return {
        X: event.pageX,
        Y: event.pageY
      };

    } else {

      throw 'UngettableEventXY'; //FIXME: Maybe remove this if everything is working fine and cannot go wrong

    }

  };

  $.frame = function ( callback ) {

    return requestAnimationFrame ( callback );

  };

  $.hasCtrlOrCmd = function ( event ) {

    return ( !$.browser.is.mac && event.ctrlKey ) || ( $.browser.is.mac && event.metaKey );

  };

  $.getRect = function ( node ) {

    return node.getBoundingClientRect ();

  };

  $.fn.getRect = function () {

    return this.length > 0 ? this[0].getBoundingClientRect () : undefined;

  };

  $.getOverlappingArea = function ( rect1, rect2 ) {

    let overlapX = Math.max ( 0, Math.min ( rect1.right, rect2.right ) - Math.max ( rect1.left, rect2.left ) ),
        overlapY = Math.max ( 0, Math.min ( rect1.bottom, rect2.bottom ) - Math.max ( rect1.top, rect2.top ) );

    return overlapX * overlapY;

  };

  $.fn.hsl = function ( h, s, l ) {

    //INFO: It only works for setting
    //FIXME: I'm not sure if this plugin should exists

    return this.css ( 'background-color', 'hsl(' + h + ',' + s + '%,' + l + '%)' );

  };

  $.fn.onHover = function ( ...args ) {

    //FIXME: If we remove the target we are still attaching and removing thos events thoug (just performing the functions calls actually, probably)

    this.on ( Pointer.enter, () => this.on ( ...args ) );
    this.on ( Pointer.leave, () => this.off ( ...args ) );

  };

  /* READY */

  $(function () {

    /* COMMON OBJECTS */

    window.$window = $(window);
    window.$document = $(document);
    window.$html = $(document.documentElement);
    window.$head = $(document.head);
    window.$body = $(document.body);
    window.$empty = $();

    /* PUSHSTATE EVENT */

    (function ( history ) {

      let pushState = history.pushState;

      history.pushState = function ( state ) {

        if ( _.isFunction ( history.onpushstate ) ) {

          history.onpushstate ( { state: state } );

        }

        $window.trigger ( 'pushstate' );

        return pushState.apply ( history, arguments );

      };

    })( window.history );

    /* ROUTE EVENT */

    (function () {

      let previous = window.location.href.split ( '#' )[0];

      $window.on ( 'popstate pushstate', function () {

        _.defer ( function () { //INFO: We need the `window.location.href` updated before

          let current = window.location.href.split ( '#' )[0];

          if ( current !== previous ) {

            previous = current;

            $window.trigger ( 'route', { url: current } );

          }

        });

      });

    })();

  });

}( Svelto.$, Svelto._, window, document ));

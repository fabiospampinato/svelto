
/* =========================================================================
 * Svelto - jQuery (Extras)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../browser/browser.js
 * ========================================================================= */

//TODO: Write it better

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* ITERATOR */

  $.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

  /* HELPERS */

  $.eventXY = function ( event, X = 'pageX', Y = 'pageY' ) {

    if ( 'originalEvent' in event ) {

      return $.eventXY ( event.originalEvent );

    } else if ( 'changedTouches' in event && event.changedTouches.length > 0 ) {

      return {
        X: event.changedTouches[0][X],
        Y: event.changedTouches[0][Y]
      };

    } else if ( 'touches' in event && event.touches.length > 0 ) {

      return {
        X: event.touches[0][X],
        Y: event.touches[0][Y]
      };

    } else if ( X in event ) {

      return {
        X: event[X],
        Y: event[Y]
      };

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

    //FIXME: Does it handle `Pointer.cancel` properly?
    //FIXME: If we remove the target we are still attaching and removing thos events though (just performing the functions calls actually, probably)

    this.on ( Pointer.enter, () => this.on ( ...args ) );
    this.on ( Pointer.leave, () => this.off ( ...args ) );

  };

  $.fn.toggleScroll = function ( force ) {

    //TODO: Preserve the scrollbars if possible, when disabling

    return this.toggleClass ( 'overflow-hidden', force );

  };

  $.fn.disableScroll = function () {

    return this.toggleScroll ( false );

  };

  $.fn.enableScroll = function () {

    return this.toggleScroll ( true );

  };

	$.fn.disableSelection = (function () { //INFO: Taken from jQuery UI

    let event = ( 'onselectstart' in document.createElement ( 'div' ) ) ? 'selectstart' : Pointer.down;

    return function () {

    	return this.on ( event + '.svelto-disable-selection', event => event.preventDefault () );

    };

	})();

	$.fn.enableSelection = function () { //INFO: Taken from jQuery UI

		return this.off ( '.svelto-disable-selection' );

	};

	$.fn.zIndex = function ( val ) { //INFO: Taken from jQuery UI

    if ( !_.isUndefined ( val ) ) {

      return this.css ( 'zIndex', val );

    }

		if ( this.length ) {

			let $elem = this.eq ( 0 ),
          position,
          value;

			while ( $elem.length && $elem[0] !== document ) {

				// Ignore z-index if position is set to a value where z-index is ignored by the browser
				// This makes behavior of this function consistent across browsers
				// WebKit always returns auto if the element is positioned

        position = $elem.css ( 'position' );

        if ( ['absolute', 'relative', 'fixed'].includes ( position ) ) {

					// IE returns 0 when zIndex is not specified
					// other browsers return a string
					// we ignore the case of nested elements with an explicit value of 0
					// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>

					value = parseInt ( $elem.css ( 'zIndex' ), 10 );

					if ( !isNaN ( value ) && value !== 0 ) {

						return value;

					}

				}

				$elem = $elem.parent ();

			}

		}

		return 0;

	};

  $.fn.topIndex = function () { //TODO: [MAYBE] Rename it

    let topIndex = 1000000000;

    return function () {

      return this.zIndex ( ++topIndex );

    };

  };

  const specialKeystrokesKeys = ['ctrl', 'cmd', 'meta', 'alt', 'shift'];

  $.matchKeystroke = function ( event, keystroke ) {

    //INFO: It only supports ctrl/cmd/meta/alt/shift/char/Svelto.keyCode[charName] //FIXME
    //INFO: ctrl/cmd/meta are treated as the same key, they are intended as `ctrl` if we are not using a Mac, or as `cmd` if we are instead

    let keys = keystroke.split ( '+' ).map ( key => key.trim ().toLowerCase () );

    if ( ( keys.includes ( 'ctrl' ) || keys.includes ( 'cmd' ) || keys.includes ( 'meta') ) !== $.hasCtrlOrCmd ( event ) ) return false;
    if ( keys.includes ( 'alt' ) !== event.altKey ) return false;
    if ( keys.includes ( 'shift' ) !== event.shiftKey ) return false;

    for ( let key of keys ) {

      if ( !specialKeystrokesKeys.includes ( key ) ) {

        if ( !( event.keyCode === Svelto.keyCode[key.toUpperCase ()] || String.fromCharCode ( event.keyCode ).toLowerCase () === key ) ) return false;

      }

    }

    return true;

  };

  //TODO: Not working but needed
  // $.fn.scrollBottom = function ( value ) {
  //
  //   if ( !this.length ) return null;
  //
  //   let height = this.innerHeight (),
  //       scrollHeight = this[0].scrollHeight || height;
  //
  //   return _.isUndefined ( value ) ? scrollHeight - height - this.scrollTop () : this.scrollTop ( scrollHeight - height - value);
  //
  // };
  //
  // $.fn.scrollRight = function ( value ) {
  //
  //   if ( !this.length ) return null;
  //
  //   let width = this.innerWidth (),
  //       scrollWidth = this[0].scrollWidth || width;
  //
  //   return _.isUndefined ( value ) ? scrollWidth - width - this.scrollLeft () : this.scrollLeft ( scrollWidth - width - value);
  //
  // };

  $.fn.scrollParent = function ( includeHidden ) { //INFO: Take from jQuery UI, optimized for performance

    let position = this.css ( 'position' );

    if ( position === 'fixed' ) return $document;

    let excludeStaticParent = ( position === 'absolute' ),
        overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;

    for ( let parent of this.parents () ) {

      let $parent = $(parent);

      if ( excludeStaticParent && $parent.css ( 'position' ) === 'static' ) continue;

      if ( overflowRegex.test ( $parent.css ( 'overflow' ) + $parent.css ( 'overflow-y' ) + $parent.css ( 'overflow-x' ) ) ) {

        return $parent;

      }

    }

    return $document;

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

            $window.trigger ( 'route' );

          }

        });

      });

    })();

  });

}( Svelto.$, Svelto._, window, document ));

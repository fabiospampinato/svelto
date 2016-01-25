
/* =========================================================================
 * Svelto - Svelto
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

(function () {

  'use strict';

  /* SVELTO */

  let Svelto = {
    VERSION: '0.3.0-beta3',
    $: ( jQuery && 'jquery' in jQuery() ) ? jQuery : ( ( $ && 'jquery' in $() ) ? $ : false ), // Checking the presence of the `jquery` property in order to distinguish it from `Zepto` and other `jQuery`-like libraries
    _: ( lodash && Number ( lodash.VERSION[0] ) === 3 ) ? lodash : ( ( _ && 'VERSION' in _ && Number ( _.VERSION[0] ) === 3 ) ? _ : false ), // Checking the version also in order to distinguish it from `underscore`
    Widgets: {} // Namespace for the Svelto's widgets' classes
  };

  /* ERRORS */

  if ( !Svelto.$ ) {

    throw new Error ( 'Svelto depends upon jQuery, dependency not found' );

  }

  if ( !Svelto._ ) {

    throw new Error ( 'Svelto depends upon lodash, dependency not found' );

  }

  /* EXPORT */

  window.Svelto = Svelto;

}());


/* =========================================================================
 * Svelto - Animations
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* ANIMATIONS */

  Svelto.Animations = {
    xslow: 900,
    slow: 500,
    normal: 350,
    fast: 150,
    xfast: 75
  };

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Breakpoints
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* BREAKPOINTS */

  Svelto.Breakpoints = {
    xsmall: 0,
    small: 512,
    medium: 768,
    large: 1024,
    xlarge: 1216
  };

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Colors
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* COLORS */

  let Colors = {
    primary: '#1565c0',
    secondary: '#ef6c00',
    tertiary: '#6a1b9a',
    quaternary: '#2e7d32',

    white: '#ffffff',
    gray: '#e0e0e0',
    black: '#212121',
    yellow: '#fabf40',
    olive: '#cddc39',
    green: '#4caf50',
    blue: '#2196f3',
    violet: '#673ab7',
    orange: '#ff9800',
    purple: '#9c27b0',
    red: '#f44336',
    pink: '#e91e63',
    teal: '#009688',
    brown: '#795548',

    error: '#f44336',
    warning: '#fabf40',
    success: '#4caf50',

    transparent: 'rgba(0, 0, 0, 0)',
    base: '#eceff1'
  };

  /* EXPORT */

  Svelto.Colors = Colors;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Lodash (Extras)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

//TODO: Write it better

(function ( _ ) {

  'use strict';

  /* LODASH EXTRA */

  _.mixin ({

    nowSecs () {

      return Math.floor ( _.now () / 1000 );

    },

    timeAgo ( timestamp ) { // Timestamp is required in seconds

      let elapsed = _.nowSecs () - timestamp,
          justNow = 5;

      let names = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second'],
          times = [31536000, 2592000, 604800, 86400, 3600, 60, 1];

      if ( elapsed < justNow ) {

        return {
          str: 'Just now',
          next: justNow - elapsed
        };

      } else {

        for ( let i = 0, l = times.length; i < l; i++ ) {

          let name = names[i],
              secs = times[i],
              number = Math.floor ( elapsed / secs );

          if ( number >= 1 ) {

            return {
              str: number + ' ' + name + ( number > 1 ? 's' : '' ) + ' ago',
              next: secs - ( elapsed - ( number * secs ) )
            };

          }

        }

      }

    },

    fuzzyMatch ( str, search, isCaseSensitive ) {

      if ( isCaseSensitive !== false ) {

        str = str.toLowerCase ();
        search = search.toLowerCase ();

      }

      let currentIndex = -1,
          str_i,
          str_l = str.length;

      for ( let search_i = 0, search_l = search.length; search_i < search_l; search_i++ ) {

        for ( str_i = currentIndex + 1; str_i < str_l; str_i++ ) {

          if ( str[str_i] === search[search_i] ) {

            currentIndex = str_i;
            str_i = str_l + 1;

          }

        }

        if ( str_i === str_l ) {

          return false;

        }

      }

      return true;

    },

    clamp ( value, minimum, maximum ) {

      if ( !_.isUndefined ( maximum ) ) {

        if ( value > maximum ) {

          value = maximum;

        }

      }

      if ( !_.isUndefined ( minimum ) ) {

        if ( value < minimum ) {

          value = minimum;

        }

      }

      return value;

    },

    btEach ( arr, callback, startIndex ) {

      let start = 0,
          end = arr.length - 1,
          center = _.isNumber ( startIndex ) ? startIndex : Math.ceil ( ( start + end ) / 2 ),
          direction;

      while ( start <= end ) {

        direction = callback.call ( arr[center], center, arr[center] );

        if ( direction < 0 ) {

          end = center - 1;

        } else if ( direction > 0 ) {

          start = center + 1;

        } else {

          return center;

        }

        center = Math.ceil ( ( start + end ) / 2 );

      }

      return -1;

    },


     move ( arr, from, to ) {

       arr.splice ( to, 0, arr.splice ( from, 1 )[0] );

     },

     mkize ( number ) {

      //TODO: Add support for a `precision` extra argument

    	if ( number >= 1000000 ) {

    		return Math.floor ( number / 1000000 ) + 'M';

    	} else if ( number >= 1000 ) {

    		return Math.floor ( number / 1000 ) + 'K';

    	} else {

    		return number;

    	}

    },

    roundCloser ( number, step ) {

      if ( _.isUndefined ( step ) ) {

        step = 1;

      }

      let left = ( number % step ),
          halfStep = step / 2;

      return number - left + ( left >= halfStep ? step : 0 );

    },

    format ( msg, ...args ) {

      for ( let i = 0, l = args.length; i < l; i++ ) {

        msg = msg.replace ( '$' + ( i + 1 ), args[i] );

      }

      return msg;

    },

    getDirections () {

      return ['top', 'bottom', 'left', 'right'];

    },

    getOppositeDirection ( direction ) {

      return {
        'top'   : 'bottom',
        'bottom': 'top',
        'left'  : 'right',
        'right' : 'left'
      }[direction];

    },

    true: _.constant ( true ),

    false: _.constant ( false )

  });

}( Svelto._ ));


/* =========================================================================
 * Svelto - Browser
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* VARIABLES */

  let userAgent  = navigator.userAgent ? navigator.userAgent.toLowerCase () : '',
      vendor     = navigator.vendor ? navigator.vendor.toLowerCase () : '', // Fixes an IE10 bug, `navigator.vendor` it's `undefined` there
      appVersion = navigator.appVersion ? navigator.appVersion.toLowerCase () : '';

  /* CHECKS */

  let isIpod          = /ipod/i.test ( userAgent ),
      isIphone        = !isIpod && /iphone/i.test ( userAgent ),
      isIpad          = /ipad/i.test ( userAgent ),
      isAndroid       = /android/i.test ( userAgent ),
      isAndroidPhone  = isAndroid && /mobile/i.test ( userAgent ),
      isAndroidTablet = isAndroid && !isAndroidPhone,
      isBlackberry    = /blackberry/i.test ( userAgent ) || /BB10/i.test ( userAgent ),
      isWindows       = /win/i.test ( appVersion ),
      isWindowsPhone  = isWindows && /phone/i.test ( userAgent ),
      isWindowsTablet = isWindows && !isWindowsPhone && /touch/i.test ( userAgent ),
      isMobile        = isIphone || isIpod || isAndroidPhone || isBlackberry || isWindowsPhone,
      isTablet        = isIpad || isAndroidTablet || isWindowsTablet;

  /* BROWSER */

  let Browser = {
    is: {
      chrome: /chrome|chromium/i.test ( userAgent ) && /google inc/.test ( vendor ),
      firefox: /firefox/i.test ( userAgent ),
      edge: /(edge)\/((\d+)?[\w\.]+)/i.test ( userAgent ),
      ie: /msie/i.test ( userAgent ) || 'ActiveXObject' in window, /* IE || EDGE */
      opera:  /^Opera\//i.test ( userAgent ) || /\x20OPR\//i.test ( userAgent ), /* Opera <= 12 || Opera >= 15 */
      safari: /safari/i.test ( userAgent ) && /apple computer/i.test ( vendor ),
      yandex: /(yabrowser)\/([\w\.]+)/i.test ( userAgent ),
      iphone: isIphone,
      ipad: isIpad,
      ipod: isIpod,
      ios: isIphone || isIpad || isIpod,
      android: isAndroid,
      androidPhone: isAndroidPhone,
      androidTablet: isAndroidTablet,
      blackberry: isBlackberry,
      linux: /linux/i.test ( appVersion ),
      mac: !( isIphone || isIpad || isIpod ) && /mac/i.test ( appVersion ),
      windows: isWindows,
      windowsPhone: isWindowsPhone,
      windowsTablet: isWindowsTablet,
      mobile: isMobile,
      tablet: isTablet,
      desktop: !isMobile && !isTablet,
      online: () => navigator.onLine,
      offline: () => !navigator.onLine,
      touchDevice: 'ontouchstart' in window || ( 'DocumentTouch' in window && document instanceof window.DocumentTouch )
    }
  };

  /* EXPORT */

  Svelto.Browser = Browser;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - jQuery (Extras)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../browser/browser.js
 * ========================================================================= */

//TODO: Write it better

(function ( $, _, Svelto, Browser, Pointer ) {

  'use strict';

  /* ITERATOR */

  $.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

  /* HELPERS */

  $.eventXY = function ( event, X = 'pageX', Y = 'pageY' ) {

    if ( 'originalEvent' in event ) {

      return $.eventXY ( event.originalEvent );

    } else if ( 'changedTouches' in event && event.changedTouches.length ) {

      return {
        X: event.changedTouches[0][X],
        Y: event.changedTouches[0][Y]
      };

    } else if ( 'touches' in event && event.touches.length ) {

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

    return ( !Browser.is.mac && event.ctrlKey ) || ( Browser.is.mac && event.metaKey );

  };

  $.getRect = function ( node ) {

    return node.getBoundingClientRect ();

  };

  $.fn.getRect = function () {

    return this.length ? this[0].getBoundingClientRect () : undefined;

  };

  $.fn.hsl = function ( h, s, l ) {

    // It only works for setting
    //FIXME: I'm not sure if this plugin should exists

    return this.css ( 'background-color', 'hsl(' + h + ',' + s + '%,' + l + '%)' );

  };

  $.fn.toggleScroll = function ( force ) {

    //TODO: Preserve the scrollbars if possible, when disabling

    return this.toggleClass ( 'overflow-hidden', !force );

  };

  $.fn.disableScroll = function () {

    return this.toggleScroll ( false );

  };

  $.fn.enableScroll = function () {

    return this.toggleScroll ( true );

  };

	$.fn.disableSelection = (function () { // Taken from jQuery UI

    let event = ( 'onselectstart' in document.createElement ( 'div' ) ) ? 'selectstart' : Pointer.down;

    return function () {

    	return this.on ( event + '.svelto-disable-selection', event => event.preventDefault () );

    };

	})();

	$.fn.enableSelection = function () { // Taken from jQuery UI

		return this.off ( '.svelto-disable-selection' );

	};

	$.fn.zIndex = function ( val ) { // Taken from jQuery UI

    if ( !_.isUndefined ( val ) ) {

      return this.css ( 'zIndex', val );

    }

		if ( !this.length ) return 0;

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

				if ( !_.isNaN ( value ) && value !== 0 ) {

					return value;

				}

			}

			$elem = $elem.parent ();

		}

    return 0;

	};

  $.fn.topIndex = function () { //TODO: [MAYBE] Rename it

    let topIndex = 1000000000;

    return function () {

      return this.zIndex ( ++topIndex );

    };

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

  $.fn.scrollParent = function ( includeHidden ) { // Take from jQuery UI, optimized for performance

    let position = this.css ( 'position' );

    if ( position === 'fixed' ) return $(document);

    let excludeStaticParent = ( position === 'absolute' ),
        overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;

    for ( let parent of this.parents () ) {

      let $parent = $(parent);

      if ( excludeStaticParent && $parent.css ( 'position' ) === 'static' ) continue;

      if ( overflowRegex.test ( $parent.css ( 'overflow' ) + $parent.css ( 'overflow-y' ) + $parent.css ( 'overflow-x' ) ) ) {

        return $parent;

      }

    }

    return $(document);

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Browser, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Core
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * @requires ../animations/animations.js
 * @requires ../breakpoints/breakpoints.js
 * @requires ../colors/colors.js
 * @requires ../extras/lodash-extra.js
 * @requires ../extras/jQuery-extra.js
 * ========================================================================= */


/* =========================================================================
 * Svelto - Tmpl
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * Fork of https://github.com/blueimp/JavaScript-Templates - Sebastian Tschan
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

/***************************
 *      Documentation      *
 ***************************
 *
 * Interpolation
 *
 * - Basic
 * <h3>{%=o.title%}</h3>
 *
 * - Unescaped
 * <h3>{%#o.user_id%}</h3>
 *
 * - Result of function call
 * <a href="{%=encodeURI(o.url)%}">Website</a>
 *
 * - Nested properties
 * <strong>{%=o.author.name%}</strong>
 *
 * Evaluation
 *
 * - Print
 * <span>Year: {% var d=new Date(); print(d.getFullYear()); %}</span>
 *
 * - Print unescaped
 * <span>{% print("Fast &amp; powerful", true); %}</span>
 *
 * - Include another template
 * <div>
 *   {% include('tmpl-link', {name: "Website", url: "https://example.org"}); %}
 * </div>
 *
 * - If else condition
 * {% if (o.author.url) { %}
 *   <a href="{%=encodeURI(o.author.url)%}">{%=o.author.name%}</a>
 * {% } else { %}
 *   <em>No author url.</em>
 * {% } %}
 *
 * - For loop
 * <ul>
 *   {% for (var i=0; i<o.features.length; i++) { %}
 *     <li>{%=o.features[i]%}</li>
 *   {% } %}
 * </ul>
 *
 ***************************/

(function ( $, _, Svelto ) {

  'use strict';

  /* TMPL */

  let tmpl = function ( str, data ) {

    let f = !/[^\w\-\.:]/.test ( str )
              ? tmpl.cache[str] = tmpl.cache[str] || tmpl ( document.getElementById ( str ).innerHTML )
              : new Function ( tmpl.arg + ',tmpl', "var _e=_.escape" + tmpl.helper + ",_s='" + str.replace ( tmpl.regexp, tmpl.func ) + "';return _s;" );

    return data
             ? f ( data, tmpl )
             : data => f ( data, tmpl );

  };

  tmpl.cache = {}; // Store the cached templates
  tmpl.cached = {}; // Store pairs like: `noty: true`, so that we know that we already cached `noty`'s templates

  tmpl.regexp = /([\s'\\])(?!(?:[^{]|\{(?!%))*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(\{%)|(%\})/g;

  tmpl.func = function ( s, p1, p2, p3, p4, p5 ) {

    if ( p1 ) { // whitespace, quote and backspace in HTML context

      return {
        '\n': '\\n',
        '\r': '\\r',
        '\t': '\\t',
        ' ' : ' '
      }[p1] || '\\' + p1;

    }

    if ( p2 ) { // interpolation: {%=prop%}, or unescaped: {%#prop%}

      if ( p2 === '=' ) {

        return "'+_e(" + p3 + ")+'";

      }

      return "'+(" + p3 + "==null?'':" + p3 + ")+'";

    }

    if ( p4 ) { // evaluation start tag: {%

      return "';";

    }

    if ( p5 ) { // evaluation end tag: %}

      return "_s+='";

    }

  };

  tmpl.arg = 'o';

  tmpl.helper = ",print=function(s,e){_s+=e?(s==null?'':s):_e(s);},include=function(s,d){_s+=tmpl(s,d);}";

  /* UTILITY */

  $.tmpl = tmpl;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Pointer
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../browser/browser.js
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


/* =========================================================================
 * Svelto - Widgetize
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* WIDGETIZE */

  class Widgetize {

    constructor () {

      this.widgetizers = {};

    }

    add ( selector, widgetizer, data ) {

      if ( !(selector in this.widgetizers) ) {

        this.widgetizers[selector] = [];

      }

      this.widgetizers[selector].push ( [widgetizer, data] );

    }

    get () {

      return this.widgetizers;

    }

    remove ( selector, widgetizer ) {

      if ( selector in this.widgetizers ) {

        for ( let i = 0, l = this.widgetizers[selector].length; i < l; i++ ) {

          if ( this.widgetizers[selector][i][0] === widgetizer ) {

            this.widgetizers[selector].splice ( i, 1 );

          }

        }

        if ( !this.widgetizers[selector].length ) {

          delete this.widgetizers[selector];

        }

      }

    }

    on ( $roots ) {

      for ( let selector in this.widgetizers ) {

        if ( this.widgetizers.hasOwnProperty ( selector ) ) {

          let widgetizers = this.widgetizers[selector];

          this.worker ( widgetizers, $roots.filter ( selector ) );
          this.worker ( widgetizers, $roots.find ( selector ) );

        }

      }

    }

    worker ( widgetizers, $widgets ) {

      for ( let widget of $widgets ) {

        for ( let [widgetizer, data] of widgetizers ) {

          widgetizer ( $(widget), data );

        }

      }

    }

  }

  /* EXPORT */

  Svelto.Widgetize = new Widgetize ();

  /* JQUERY PLUGIN */

  $.fn.widgetize = function () {

    Svelto.Widgetize.on ( this );

    return this;

  };

  /* READY */

  $(function () {

    $(document.body).widgetize ();

  });

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Factory
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../widgetize/widgetize.js
 *=========================================================================*/

(function ( $, _, Svelto, Widgetize ) {

  'use strict';

  /* FACTORY */

  let Factory = {

    /* VARIABLES */

    initializers: ['configure', 'namespace', 'ready', 'widgetize', 'plugin'], // `Factory` methods, in order, to call when initing a `Widget`

    /* METHODS */

    init ( Widget, config, namespace ) {

      for ( let initializer of this.initializers ) {

        this[initializer]( Widget, config, namespace );

      }

    },

    instance ( Widget, options, element ) {

      let name = Widget.config.name;

      return $.data ( element, 'instance.' + name ) || new Widget ( options, element );

    },

    widgetizer ( $widget, name ) {

      $widget[name]();

    },

    /* WORKERS */

    configure ( Widget, config = {} ) {

      Widget.config = config;

    },

    namespace ( Widget, config, namespace ) {

      if ( _.isObject ( namespace ) ) {

        //TODO: Gets class name instead, does it get modified for instance when the code gets minified?

        let name = _.capitalize ( Widget.config.name );

        namespace[name] = Widget;

      }

    },

    ready ( Widget ) {

      $(Widget.ready);

    },

    widgetize ( Widget ) {

      if ( Widget.config.plugin && _.isString ( Widget.config.selector ) ) {

        Widgetize.add ( Widget.config.selector, this.widgetizer, Widget.config.name );

      }

    },

    plugin ( Widget ) {

      if ( !Widget.config.plugin ) return;

      /* NAME */

      let name = Widget.config.name;

      /* JQUERY PLUGIN */

      $.fn[name] = function ( options, ...args ) {

        let isMethodCall = ( _.isString ( options ) && options.charAt ( 0 ) !== '_' ); // Methods starting with '_' are private

        for ( let element of this ) {

          let instance = Factory.instance ( Widget, options, element );

          if ( isMethodCall && _.isFunction ( instance[options] ) ) {

            let returnValue = instance[options]( ...args );

            if ( !_.isUndefined ( returnValue ) ) {

              return returnValue;

            }

          }

        }

        return this;

      };

    }

  };

  /* EXPORT */

  Svelto.Factory = Factory;

}( Svelto.$, Svelto._, Svelto, Svelto.Widgetize ));


/* =========================================================================
 * Svelto - Breakpoint
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * @requires breakpoints.js
 * ========================================================================= */

(function ( $, _, Svelto, Breakpoints ) {

  'use strict';

  /* VARIABLES */

  let $window = $(window);

  /* BREAKPOINT */

  let Breakpoint = {

    /* VARIABLES */

    throttle: 150, // The amount of milliseconds used to throttle the `$window.on ( 'resize' )` handler
    previous: undefined, // Previous breakpoint
    current: undefined, // Current breakpoint

    /* RESIZE */

    __resize () {

      let current = this.get ();

      if ( current !== this.current ) {

        this.previous = this.current;
        this.current = current;

        $window.trigger ( 'breakpoint:change' );

      }

    },

    /* API */

    get () {

      let intervals = _.sortBy ( _.values ( Breakpoints ) ),
          width = $window.width ();

      for ( let i = 0, l = intervals.length; i < l; i++ ) {

        if ( width >= intervals[i] && ( i === l - 1 || width < intervals[i+1] ) ) {

          return _.findKey ( Breakpoints, interval => interval === intervals[i] );

        }

      }

    }

  };

  /* READY */

  $(function () {

    Breakpoint.current = Breakpoint.get ();

    $window.on ( 'resize', _.throttle ( Breakpoint.__resize.bind ( Breakpoint ), Breakpoint.throttle ) );

  });

  /* EXPORT */

  Svelto.Breakpoint = Breakpoint;

}( Svelto.$, Svelto._, Svelto, Svelto.Breakpoints ));


/* =========================================================================
 * Svelto - Keyboard
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* KEYBOARD */

  let Keyboard = {
    keys: {
      BACKSPACE: 8,
      COMMA: 188,
      DEL: 46,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESC: 27,
      ESCAPE: 27,
      HOME: 36,
      LEFT: 37,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      PERIOD: 190,
      RIGHT: 39,
      SPACE: 32,
      SPACEBAR: 32,
      TAB: 9,
      UP: 38
    },
    keystroke: {
      match ( event, keystroke ) {

        // It only supports ctrl/cmd/meta/alt/shift/char/Keyboard.keys[charName] //FIXME
        // ctrl/cmd/meta are treated as the same key, they are intended as `ctrl` if we are not using a Mac, or as `cmd` if we are instead using it

        let specialKeys = ['ctrl', 'cmd', 'meta', 'alt', 'shift'],
            keys = keystroke.split ( '+' ).map ( key => key.trim ().toLowerCase () );

        if ( ( keys.includes ( 'ctrl' ) || keys.includes ( 'cmd' ) || keys.includes ( 'meta') ) !== $.hasCtrlOrCmd ( event ) ) return false;
        if ( keys.includes ( 'alt' ) !== event.altKey ) return false;
        if ( keys.includes ( 'shift' ) !== event.shiftKey ) return false;

        for ( let key of keys ) {

          if ( !specialKeys.includes ( key ) ) {

            if ( !( event.keyCode === Keyboard.keys[key.toUpperCase ()] || String.fromCharCode ( event.keyCode ).toLowerCase () === key ) ) return false;

          }

        }

        return true;

      }
    }
  };

  /* EXPORT */

  Svelto.Keyboard = Keyboard;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Widget
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../tmpl/tmpl.js
 * @requires ../pointer/pointer.js
 * @requires ../factory/factory.js
 * @requires ../breakpoints/breakpoints.js
 * @requires ../breakpoints/breakpoint.js
 * @requires ../keyboard/keyboard.js
 * ========================================================================= */

//TODO: Add support for remove, right know it doesn't get triggered on `.remove ()` but only on `.trigger ( 'remove' )`, but maybe there's no way of doing it...

(function ( $, _, Svelto, Widgets, Factory, Pointer, Keyboard, Breakpoints, Breakpoint ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'widget', // The name of widget, it will be used for the the jQuery pluing `$.fn[name]` and for triggering widget events `name + ':' + event`
    plugin: false, // A boolean that defines wheter the Widget is also a jQuery plugin or not
    selector: false, // The selector used to select the website in the DOM, used for `Svelto.Widgetize`
    templates: {
      base: false // It will be used as the constructor if no element is provided
    },
    options: {
      characters: {}, // Used to store some characters needed by the widget
      regexes: {}, // Contains the used regexes
      errors: { // It contains all the errors that a widget can trigger
        uninitializable: 'This widget can\'t be initialized, no element or base template have been provided' // Triggered when the widget is not initializable
      },
      messages: {}, // Messages that the widget somewhere outputs, maybe with a `$.noty`, maybe just logs it
      attributes: {}, // Attributes used by the widget
      datas: {}, // CSS data-* names
      classes: { // CSS classes to attach inside the widget
        disabled: 'disabled', // Attached to disabled widgets
        hidden: 'hidden' // Used to hide an element
      },
      selectors: { // Selectors to use inside the widget
        layout: '.layout, body' //FIXME: Just use `.layout`, but we need to add it in the CSS before
      },
      animations: {}, // Object storing all the milliseconds required for each animation to occur
      breakpoints: {}, // Actions to be executed at specifc breakpoints, every key/val pair should be in the form of `breakpoint-name`: `action`, where `breakpoint-name` is defined under `Breakpoints` and `action` in a defined method (e.g. `xsmall`: `close`). In addition to this every pair must be specified under one of the following keys: `up`, `down`, `range`, mimicking the respective SCSS mixins
      keyboard: true, // Enable or disable the use of the keyboard, basically disables keystrokes and other keyboard-based interaction
      keystrokes: {},  // Easy way to automatically bind keystrokes to specific methods calls. For example: `{ 'ctrl + o': 'open', Keyaboard.keys.UP: 'up' }`
      callbacks: {} // Callbacks to trigger on specific events
    }
  };

  /* WIDGET */

  class Widget {

    /* CONSTRUCTION */

    constructor ( options, element ) {

      /* ATTACH CONFIG */

      _.extend ( this, this._getConfig ( options, element ) );

      /* CHECK IF INITIALIZABLE */

      if ( !element && !this.templates.base ) {

        this._throw ( this.errors.uninitializable );

      }

      /* CACHE TEMPLATES */

      if ( !$.tmpl.cached[this.name] ) {

        for ( let tmpl in this.templates ) {

          if ( this.templates.hasOwnProperty ( tmpl ) && this.templates[tmpl] ) {

            let tmplName = this.name + '.' + tmpl;

            if ( !(tmplName in $.tmpl.cache) ) {

              $.tmpl.cache[tmplName] = $.tmpl ( this.templates[tmpl] );

            }

          }

        }

        $.tmpl.cached[this.name] = true;

      }

      /* ELEMENT */

      this.$element = $( element || this._tmpl ( 'base', this.options ) );
      this.element = this.$element[0];

      /* LAYOUT */

      this.$layout = this.$element.parent ().closest ( this.options.selectors.layout );
      this.layout = this.$layout[0];

      /* WINDOW */

      this.$window = $(window);
      this.window = this.$window[0];

      /* DOCUMENT */

      this.$document = $(document);
      this.document = this.$document[0];

      /* BINDINGS */

      this.$bindings = $();

      /* ATTACH INSTANCE */

      $.data ( this.element, 'instance.' + this.name, this );

      /* SET GUID / GUC */

      this.guid = $.guid++;
      this.guc = this.name + this.guid;

      /* EVENT NAMESPACE */

      this.eventNamespace = '.swns' + this.guid;

      /* CALLBACKS */

      this._variables ();
      this._init ();
      this._events ();

      /* BREAKPOINT */

      this.___breakpoint (); // It must be inited before calling `__breakpoint`, since that when `__breakpoint` gets called it may want to reset it (not inited yet) and init it again (with a result of double binding)
      this.__breakpoint ();

    }

    _getConfig ( options, element ) {

      /* VARIABLES */

      let configs = [];

      /* PROTOTYPE CHAIN */

      let prototype = Object.getPrototypeOf ( this );

      while ( prototype ) {

        if ( prototype.constructor.config ) {

          configs.push ( prototype.constructor.config );

        }

        prototype = Object.getPrototypeOf ( prototype );

      }

      configs.push ( {} ); // So that we merge them to a new object

      configs.reverse ();

      /* DATA OPTIONS */

      if ( element ) {

        let $element = $(element),
            name = _.last ( configs ).name.toLowerCase (),
            dataOptions = $element.data ( 'options' ),
            dataNameOptions = $element.data ( name + '-options' );

        if ( dataOptions ) {

          configs.push ({ options: dataOptions });

        }

        if ( dataNameOptions ) {

          configs.push ({ options: dataNameOptions });

        }

      }

      /* OPTIONS */

      if ( _.isPlainObject ( options ) ) {

        configs.push ({ options: options });

      }

      /* CREATE OPTIONS */

      let createOptions = this._createOptions ();

      if ( _.isPlainObject ( createOptions ) ) {

        configs.push ({ options: createOptions });

      }

      /* RETURN */

      return _.merge ( ...configs );

    }

    _createOptions () {} // Used to pass extra options

    /* DESTRUCTION */

    destroy () {

      this._reset ();

      this._destroy ();

      this.$element.removeData ( 'instance.' + this.name );

    }

    _destroy () {} // Clean the stuff, remove possible memory leaks

    /* SPECIAL */

    static ready () {} // Called when the DOM is `ready`, perhaps the widget needs to perform some operations, like `Noty` do for instance

    _variables () {} // Init your variables inside this function
    _init () {} // Perform the init stuff inside this function
    _events () {} // Bind the event handlers inside this function

    _reset () { //TODO: Maybe remove or rename it, I don't like it but I currently need its functionality

      this.$bindings.off ( this.eventNamespace );

    }

    /* WIDGET */

    widget () {

      return this.$element;

    }

    /* INSTANCE */

    instance () {

      return this;

    }

    /* OPTIONS */

    // We cannot have a `options` alias to `option`, since `options` is already defined in the config

    option ( key, value ) {

      if ( !key ) {

        return _.cloneDeep ( this.options );

      } else if ( _.isString ( key ) ) {

        if ( _.isUndefined ( value ) ) {

          return _.cloneDeep ( _.get ( this.options, key ) );

        } else {

          this._setOption ( key, value );

        }

      } else if ( _.isPlainObject ( key ) ) {

        for ( let prop in key ) {

          if ( key.hasOwnProperty ( prop ) ) {

            this._setOption ( key, value );

          }

        }

      }

    }

    _setOption ( key, value ) {

      _.set ( this.options, key, value );

    }

    /* ENABLED */

    enable () {

      this.$element.removeClass ( this.options.classes.disabled );

    }

    isEnabled () {

      return !this.isDisabled ();

    }

    /* DISABLED */

    disable () {

      this.$element.addClass ( this.options.classes.disabled );

    }

    isDisabled () {

      return this.$element.hasClass ( this.options.classes.disabled );

    }

    /* EVENTS */

    _on ( suppressDisabledCheck, $element, events, selector, handler, _onlyOne ) {

      //TODO: Add support for custom data

      /* NORMALIZATION */

      if ( !_.isBoolean ( suppressDisabledCheck ) ) {

        _onlyOne = handler;
        handler = selector;
        selector = events;
        events = $element;
        $element = suppressDisabledCheck;
        suppressDisabledCheck = false;

      }

      if ( !( $element instanceof $ ) ) {

        _onlyOne = handler;
        handler = selector;
        selector = events;
        events = $element;
        $element = this.$element;

      }

      if ( !_.isString ( selector ) ) {

        _onlyOne = handler;
        handler = selector;
        selector = false;

      }

      /* BINDINGS */

      this.$bindings = this.$bindings.add ( $element );

      /* PROXY */

      let handlerProxy = ( ...args ) => {

        if ( !suppressDisabledCheck && this.$element.hasClass ( this.options.classes.disabled ) ) return; //FIXME: Is keeping a reference to `suppressDisabledCheck` wasted leak? Even if so tiny

        return handler.apply ( this, args );

      };

      /* PROXY GUID */

      handlerProxy.guid = handler.guid = ( handler.guid || $.guid++ );

      /* EVENTS NAMESPACING */

      events = events.split ( /\s+/ ).map ( event => event + this.eventNamespace ).join ( ' ' );

      /* TRIGGERING */

      $element[_onlyOne ? 'one' : 'on'] ( events, selector, handlerProxy );

    }

    _one ( ...args ) {

      return this._on ( ...args, true );

    }

    _onHover ( $element, args ) {

      //FIXME: If we remove the target we are still attaching and removing those events though (just performing the functions calls actually, probably)

      /* NORMALIZATION */

      if ( !args ) {

        args = $element;
        $element = this.$element;

      }

      /* BINDINGS */

      this.$bindings = this.$bindings.add ( $element );

      /* BINDING */

      this._on ( $element, Pointer.enter, () => this._on ( ...args ) );
      this._on ( $element, Pointer.leave, () => this._off ( ...args ) );

    }

    //TODO: Add a _offHover (Is it needed?)

    _off ( $element, events, handler ) {

      /* NORMALIZATION */

      if ( !handler && !($element instanceof $) ) {

        handler = events;
        events = $element;
        $element = this.$element;

      }

      /* EVENTS NAMESPACING */

      events = events.split ( /\s+/ ).map ( event => event + this.eventNamespace ).join ( ' ' );

      /* REMOVING HANDLER */

      $element.off ( events, handler );

    }

    _trigger ( type, event, data ) {

      /* NORMALIZATION */

      if ( !data ) {

        if ( event instanceof $.Event ) {

          data = {};

        } else {

          data = event || {};
          event = undefined;

        }

      }

      /* EVENT */

      event = $.Event ( event );
      event.type = ( this.name + ':' + type ).toLowerCase ();
      event.target = this.element;

      let originalEvent = event.originalEvent;

      if ( originalEvent ) {

        for ( let prop in originalEvent ) {

          if ( originalEvent.hasOwnProperty ( prop ) ) {

            if ( !(prop in event) ) {

              event[prop] = originalEvent[prop];

            }

          }

        }

      }

      /* TRIGGERING */

      this.$element.trigger ( event, data );

      return !( this.options.callbacks[type].apply ( this.element, [event].concat ( data ) ) === false || event.isDefaultPrevented () );

    }

    /* ROUTE */

    ___route () {

      this._on ( true, this.$window, 'route', this.__route );

    }

    /* BREAKPOINT */

    ___breakpoint () {

      this._on ( this.$window, 'breakpoint:change', this.__breakpoint ); //TODO: Should we use `suppressDisabledCheck`? I'm not sure...

    }

    __breakpoint () {

      let current = Breakpoints[Breakpoint.current];

      /* UP */

      for ( let breakpoint in this.options.breakpoints.up ) {

        if ( this.options.breakpoints.up.hasOwnProperty ( breakpoint ) ) {

          if ( current >= Breakpoints[breakpoint] ) {

            this[this.options.breakpoints.up[breakpoint]]();

          }

        }

      }

      /* DOWN */

      for ( let breakpoint in this.options.breakpoints.down ) {

        if ( this.options.breakpoints.down.hasOwnProperty ( breakpoint ) ) {

          if ( current < Breakpoints[breakpoint] ) {

            this[this.options.breakpoints.down[breakpoint]]();

          }

        }

      }

      /* RANGE */

      for ( let breakpoint in this.options.breakpoints.range ) {

        if ( this.options.breakpoints.range.hasOwnProperty ( breakpoint ) ) {

          if ( current === Breakpoints[breakpoint] ) {

            this[this.options.breakpoints.range[breakpoint]]();

          }

        }

      }

    }

    /* KEYDOWN */

    ___keydown () {

      this._on ( this.$document, 'keydown', this.__keydown );

    }

    __keydown ( event ) {

      if ( !this.options.keyboard ) return;

      for ( let keystrokes in this.options.keystrokes ) {

        if ( this.options.keystrokes.hasOwnProperty ( keystrokes ) ) {

          for ( let keystroke of keystrokes.split ( ',' ) ) {

            if ( Keyboard.keystroke.match ( event, keystroke ) ) {

              this[this.options.keystrokes[keystrokes]]();

              event.preventDefault ();
              event.stopImmediatePropagation ();

              return;

            }

          }

        }

      }

    }

    /* DELAYING */

    _delay ( fn, delay ) {

      return setTimeout ( () => fn.apply ( this ), delay || 0 );

    }

    /* DEFER */

    _defer ( fn ) {

      return this._delay ( fn );

    }

    /* FRAME */

    _frame ( fn ) {

      return requestAnimationFrame ( fn.bind ( this ) );

    }

    /* THROW */

    _throw ( msg ) {

      throw new Error ( msg );

    }

    /* THROTTLING */

    _throttle ( fn, wait, options ) {

      let throttled = _.throttle ( fn, wait, options );

      throttled.guid = fn.guid = ( fn.guid || $.guid++ );

      return throttled;

    }

    /* DEBOUNCING */

    _debounce ( fn, wait, options ) {

      let debounced = _.debounce ( fn, wait, options );

      debounced.guid = fn.guid = ( fn.guid || $.guid++ );

      return debounced;

    }

    /* TEMPLATE */

    _tmpl ( name, options = {} ) {

      let tmplName = this.name + '.' + name;

      return $.tmpl ( tmplName, options );

    }

    /* INSERTION */

    insertBefore ( selector ) {

      this.$element.insertBefore ( selector );

    }

    insertAfter ( selector ) {

      this.$element.insertAfter ( selector );

    }

    prependTo ( selector ) {

      this.$element.prependTo ( selector );

    }

    appendTo ( selector ) {

      this.$element.appendTo ( selector );

    }

  }

  /* FACTORY */

  Factory.init ( Widget, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Keyboard, Svelto.Breakpoints, Svelto.Breakpoint ));


/* =========================================================================
 * Svelto - Expander
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * @requires ../animations/animations.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Animations ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'expander',
    plugin: true,
    selector: '.expander',
    options: {
      classes: {
        open: 'open'
      },
      selectors: {
        content: '.expander-content' //TODO: Maybe rename it to `.expander-block`
      },
      animations: {
        open: Animations.normal,
        close: Animations.normal
      },
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    }
  };

  /* EXPANDER */

  class Expander extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$expander = this.$element;
      this.$content = this.$expander.find ( this.options.selectors.content );

      this._isOpen = this.$expander.hasClass ( this.options.classes.open );

    }

    /* API */

    isOpen () {

      return this._isOpen;

    }

    toggle ( force = !this._isOpen ) {

      if ( !!force !== this._isOpen ) {

        this._isOpen = !!force;

        this.$expander.toggleClass ( this.options.classes.open, this._isOpen );

        this._trigger ( this._isOpen ? 'open' : 'close' );

      }

    }

    open () {

      this.toggle ( true );

    }

    close () {

      this.toggle ( false );

    }

  }

  /* FACTORY */

  Factory.init ( Expander, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Animations ));


/* =========================================================================
 * Svelto - Accordion
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../expander/expander.js
 * ========================================================================= */

//TODO: Add better support for changing `options.multiple` at runtime. `multiple: true` -> opening multiple, -> `multiple: false` -> multiple still opened

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'accordion',
    plugin: true,
    selector: '.accordion',
    options: {
      multiple: false, // Wheter to allow multiple expanders open or not
      selectors: {
        expander: Widgets.Expander.config.selector
      },
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    }
  };

  /* ACCORDION */

  class Accordion extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$accordion = this.$element;
      this.$expanders = this.$accordion.children ( this.options.selectors.expander );

      this.instances = this.$expanders.get ().map ( expander => $(expander).expander ( 'instance' ) );

    }

    _events () {

      this.___open ();
      this.___close ();

    }

    /* EXPANDER OPEN */

    ___open () {

      this._on ( true, this.$expanders, 'expander:open', this.__open );

    }

    __open ( event ) {

      this._trigger ( 'open', { index: this.$expanders.index ( event.target) } );

      this.__multiple ( event.target );

    }

    /* EXPANDER CLOSE */

    ___close () {

      this._on ( true, this.$expanders, 'expander:close', this.__close );

    }

    __close ( event ) {

      this._trigger ( 'close', { index: this.$expanders.index ( event.target) } );

    }

    /* MULTIPLE */

    __multiple ( expander ) {

      if ( this.options.multiple ) return;

      this.instances.forEach ( instance => instance.element !== expander ? instance.close () : false );

    }

    /* API OVERRIDES */

    enable () {

      super.enable ();

      _.invoke ( this.instances, 'enable' );

    }

    disable () {

      _.invoke ( this.instances, 'disable' );

    }

    /* API */

    isOpen ( index ) {

      return this.instances[index].isOpen ();

    }

    toggle ( index, force ) {

      this.instances[index].toggle ( force );

    }

    open ( index ) {

      this.toggle ( index, true );

    }

    close ( index ) {

      this.toggle ( index, false );

    }

  }

  /* FACTORY */

  Factory.init ( Accordion, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Autogrow - Input
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../../widget/widget.js
 * ========================================================================= */

// It supports only `box-sizing: border-box` inputs

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'autogrowInput',
    plugin: true,
    selector: 'input.autogrow',
    options: {
      callbacks: {
        change: _.noop
      }
    }
  };

  /* AUTOGROW INPUT */

  class AutogrowInput extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$input = this.$element;

      this.ctx = document.createElement ( 'canvas' ).getContext ( '2d' );

    }

    _init () {

      this._update ();

    }

    _events () {

      this.___inputChange ();

    }

    /* PRIVATE */

    _getNeededWidth () {

      this.ctx.font = this.$input.css ( 'font' );

      return this.ctx.measureText ( this.$input.val () ).width;

    }

    /* INPUT / CHANGE */

    ___inputChange () {

      this._on ( true, 'input change', this._update );

    }

    /* UPDATE */

    _update () {

      let width = this._getNeededWidth ();

      if ( width === this._prevWidth ) return;

      this._prevWidth = width;

      this.$input.width ( width );

      this._trigger ( 'change' );

    }

  }

  /* FACTORY */

  Factory.init ( AutogrowInput, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Autogrow - Textarea
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../../widget/widget.js
 * ========================================================================= */

// It supports only `box-sizing: border-box` textareas

//TODO: Measure the needed height using canvas, if possible, it would make it super fast

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'autogrowTextarea',
    plugin: true,
    selector: 'textarea.autogrow',
    options: {
      callbacks: {
        change: _.noop
      }
    }
  };

  /* AUTOGROW TEXTAREA */

  class AutogrowTextarea extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$textarea = this.$element;

      this.$tempTextarea = $('<textarea>').css ({
                              'position': 'fixed',
                              'visibility': 'hidden',
                              'padding': 0,
                              'min-height': 0,
                              'height': 0
                            });

    }

    _init () {

      this._update ();

    }

    _events () {

      this.___inputChange ();

    }

    /* PRIVATE */

    _getNeededHeight () {

      this.$tempTextarea.css ( 'font', this.$textarea.css ( 'font' ) ).val ( this.$textarea.val () ).appendTo ( this.$layout );

      let height = this.$tempTextarea[0].scrollHeight;

      this.$tempTextarea.detach ();

      return height;

    }

    /* INPUT / CHANGE */

    ___inputChange () {

      this._on ( true, 'input change', this._update );

    }

    /* UPDATE */

    _update () {

      let height = this._getNeededHeight ();

      if ( height === this._prevHeight ) return;

      this.$textarea.height ( height );

      this._prevHeight = height;

      this._trigger ( 'change' );

    }

  }

  /* FACTORY */

  Factory.init ( AutogrowTextarea, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Blurred
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

//TODO: Maybe rename it

(function ( $, _, Svelto ) {

  'use strict';

  /* BLURRED */

  $.fn.blurred = function ( force ) {

    return this.toggleClass ( 'blurred', force );

  };

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Boilerplate
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'boilerplate',
    plugin: false,
    selector: false,
    templates: {
      base: false
    },
    options: {
      characters: {},
      regexes: {},
      errors: {},
      messages: {},
      attributes: {},
      datas: {},
      classes: {},
      selectors: {},
      animations: {},
      breakpoints: {},
      keyboard: true,
      keystrokes: {},
      callbacks: {}
    }
  };

  /* BOILERPLATE */

  class Boilerplate extends Widgets.Widget {

    /* SPECIAL */

    static widgetize () {

    }

    _variables () {

    }

    _init () {

    }

    _events () {

    }

    _destroy () {

    }

    /* PRIVATE */

    /* API */

  }

  /* FACTORY */

  Factory.init ( Boilerplate, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - BT (BinaryTree) Each
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* BINARY TREE .each () */

  $.fn.btEach = function ( callback, startIndex ) {

    return _.btEach ( this, callback, startIndex );

  };

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Timer
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * Fork of http://jchavannes.com/jquery-timer - Jason Chavannes
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* TIMER */

  let Timer = class {

    constructor ( ...args ) {

      this.set ( ...args );

    }

    set ( callback, time, autostart ) {

      this.init = true;
      this.action = callback;

      if ( !isNaN ( time ) ) {

        this.intervalTime = time;

      }

      if ( autostart && !this.isActive ) {

        this.isActive = true;
        this.setTimer ();

      }

      return this;

    }

    once ( time ) {

      if ( isNaN ( time ) ) {

        time = 0;

      }

      setTimeout ( () => this.action (), time );

      return this;

    }

    play ( reset ) {

      if ( !this.isActive ) {

        if ( reset ) {

          this.setTimer ();

        } else {

          this.setTimer ( this.remainingTime );

        }

        this.isActive = true;

      }

      return this;

    }

    pause () {

      if ( this.isActive ) {

        this.isActive = false;
        this.remainingTime -= Date.now () - this.last;
        this.clearTimer ();

      }

      return this;

    }

    stop () {

      this.isActive = false;
      this.remainingTime = this.intervalTime;
      this.clearTimer ();

      return this;

    }

    toggle ( reset ) {

      if ( this.isActive ) {

        this.pause ();

      } else if ( reset ) {

        this.play ( true );

      } else {

        this.play ();

      }

      return this;

    }

    reset () {

      this.isActive = false;

      this.play ( true );

      return this;

    }

    clearTimer () {

      clearTimeout ( this.timeoutObject );

    }

    setTimer ( time ) {

      if ( isNaN ( time ) ) {

        time = this.intervalTime;

      }

      this.remainingTime = time;
      this.last = Date.now ();
      this.clearTimer ();

      this.timeoutObject = setTimeout ( () => this.go (), time );

    }

    go () {

      if ( this.isActive ) {

        this.action ();
        this.setTimer ();

      }

    }


    remaining ( value ) {

      if ( _.isUndefined ( value ) ) {

        return this.remainingTime;

      }

      this.remainingTime = value;

      return this;

    }

  };

  /* EXPORT */

  Svelto.Timer = Timer;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Carousel
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * @requires ../timer/timer.js
 * @requires ../animations/animations.js
 * ========================================================================= */

//TODO: Add slides drag support
//TODO: Add `wrap` option

(function ( $, _, Svelto, Widgets, Factory, Pointer, Timer, Animations ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'carousel',
    plugin: true,
    selector: '.carousel',
    options: {
      startIndex: 0,
      cycle: false, // If the carousel should auto-cycle or not
      interval: 5000, // Interval between auto-cycling slides
      intervalMinimumRemaining: 1000, // Auto-cycling will be stopped on hover and started again on leave, with a remaining time of `Math.min ( what the remaining time was, this option )`;
      classes: {
        previous: 'previous',
        current: 'current'
      },
      selectors: {
        previous: '.carousel-previous',
        next: '.carousel-next',
        indicator: '.carousel-indicator',
        itemsWrp: '.carousel-items',
        item: '.carousel-items > *'
      },
      animations: {
        cycle: Animations.normal
      },
      keystrokes: {
        'left, up': 'previous',
        'right, down, space': 'next'
      },
      callbacks: {
        change: _.noop
      }
    },
  };

  /* CAROUSEL */

  class Carousel extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$carousel = this.$element;
      this.$previous = this.$carousel.find ( this.options.selectors.previous );
      this.$next = this.$carousel.find ( this.options.selectors.next );
      this.$indicators = this.$carousel.find ( this.options.selectors.indicator );
      this.$itemsWrp = this.$carousel.find ( this.options.selectors.itemsWrp );
      this.$items = this.$carousel.find ( this.options.selectors.item );

      this.maxIndex = this.$items.length - 1;

      this._previous = false;
      this._current = false;

      this.timer = new Timer ( this.next.bind ( this ), this.options.interval, false );

    }

    _init () {

      let $current = this.$items.filter ( '.' + this.options.classes.current ).first ();

      if ( $current.length ) {

        this._current = this._getItemObj ( this.$items.index ( $current ) );

      } else {

        this.set ( this.options.startIndex );

      }

    }

    _events () {

      this.___previousTap ();
      this.___nextTap ();
      this.___indicatorTap ();

      this.___keydown ();
      this.___cycle ();

    }

    _destroy () {

      this.timer.stop ();

    }

    /* PRIVATE */

    _sanitizeIndex ( index ) {

      index = Number ( index );

      return _.isNaN ( index ) ? NaN : _.clamp ( index, 0, this.maxIndex );

    }

    /* PREVIOUS TAP */

    ___previousTap () {

      this._on ( this.$previous, Pointer.tap, this.previous );

    }

    /* NEXT TAP */

    ___nextTap () {

      this._on ( this.$next, Pointer.tap, this.next );

    }

    /* INDICATOR TAP */

    ___indicatorTap () {

      this._on ( this.$indicators, Pointer.tap, this.__indicatorTap );

    }

    __indicatorTap ( event ) {

      this.set ( this.$indicators.index ( event.currentTarget ) );

    }

    /* KEYDOWN */

    ___keydown () {

      this._onHover ( [this.$document, 'keydown', this.__keydown] );

    }

    /* CYCLE */

    ___cycle () {

      this._on ( true, this.$itemsWrp, Pointer.enter, this.__cycleEnter );
      this._on ( true, this.$itemsWrp, Pointer.leave, this.__cycleLeave );

    }

    __cycleEnter () {

      if ( this.options.cycle ) {

        this.timer.pause ();

      }

    }

    __cycleLeave () {

      if ( this.options.cycle ) {

        this.timer.remaining ( Math.max ( this.options.intervalMinimumRemaining, this.timer.remaining () ) );

        this.timer.play ();

      }

    }

    /* ITEM OBJ */

    _getItemObj ( index ) {

      return {
        index: index,
        $item: this.$items.eq ( index ),
        $indicator: this.$indicators.eq ( index )
      };

    }

    /* INDEX */

    _getPrevIndex ( index ) {

      return ( index > 0 ) ? index - 1 : this.maxIndex;

    }

    _getNextIndex ( index ) {

      return ( index < this.maxIndex ) ? index + 1 : 0;

    }

    /* API OVERRIDES */

    enable () {

      super.enable ();

      if ( this.options.cycle || this._wasCycling ) {

        this.play ();

      }

    }

    disable () {

      super.disable ();

      this._wasCycling = this.options.cycle;

      if ( this.options.cycle ) {

        this.stop ();

      }

    }

    /* API */

    get () {

      return this._current.index;

    }

    set ( index ) {

      index = this._sanitizeIndex ( index );

      if ( this._lock || _.isNaN ( index ) || ( this._current && index === this._current.index ) ) return;

      this._lock = true;

      if ( this._current ) {

        this._current.$item.removeClass ( this.options.classes.current ).addClass ( this.options.classes.previous );
        this._current.$indicator.removeClass ( this.options.classes.current );

        this._previous = this._current;

      }

      this._current = this._getItemObj ( index );
      this._current.$item.addClass ( this.options.classes.current );
      this._current.$indicator.addClass ( this.options.classes.current );

      if ( this.options.cycle ) {

        this.timer.stop ();

      }

      this._delay ( function () {

        if ( this._previous ) {

          this._previous.$item.removeClass ( this.options.classes.previous );

        }

        if ( this.options.cycle ) {

          this.timer.play ();

        }

        this._lock = false;

        this._trigger ( 'change' );

      }, this.options.animations.cycle );

    }

    previous () {

      this.set ( this._getPrevIndex ( this._current.index ) );

    }

    next () {

      this.set ( this._getNextIndex ( this._current.index ) );

    }

    /* API TIMER */

    play () {

      this.options.cycle = true;
      this.timer.remaining ( Math.max ( this.options.intervalMinimumRemaining, this.timer.remaining () ) );
      this.timer.play ();

    }

    pause () {

      this.options.cycle = false;
      this.timer.pause ();

    }

    stop () {

      this.options.cycle = false;
      this.timer.stop ();

    }

    reset () {

      this.options.cycle = true;
      this.timer.reset ();

    }

  }

  /* FACTORY */

  Factory.init ( Carousel, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Timer, Svelto.Animations ));


/* =========================================================================
 * Svelto - Targeter
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'targeter',
    options: {
      widget: false, // The target's widget class
      target: false, // Selector used to select the target
      datas: {
        target: 'target'
      }
    }
  };

  /* TARGETER */

  class Targeter extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this._targetSelector = this.options.target || this.$element.data ( this.options.datas.target );

      this.$target = this._targetSelector ? $(this._targetSelector) : this.$element.closest ( this.options.widget.config.selector );

      this._targetInstance = this.$target[this.options.widget.config.name]( 'instance' );

    }

  }

  /* FACTORY */

  Factory.init ( Targeter, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Closer
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * @requires ../targeter/targeter.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'closer',
    options: {
      methods: {
        isOpen: 'isOpen',
        close: 'close'
      }
    }
  };

  /* CLOSER */

  class Closer extends Widgets.Targeter {

    /* SPECIAL */

    _events () {

      this.___tap ();

    }

    /* TAP */

    ___tap () {

      this._on ( Pointer.tap, this.__tap );

    }

    __tap ( event ) {

      this.close ( event );

    }

    /* API */

    isOpen () {

      return this._targetInstance[this.options.methods.isOpen]();

    }

    close ( event ) {

      return this._targetInstance[this.options.methods.close]( this.element, event );

    }

  }

  /* FACTORY */

  Factory.init ( Closer, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Color
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

//TODO: Add support for the alpha channel
//TODO: Maybe add better support for hex color provided as string, basically Color.hex2hsl should also accept an hex color in string format

(function ( $, _, Svelto ) {

  'use strict';

  /* COLOR */

  let Color = class {

    constructor ( color, colorspace ) {

      this.set ( color, colorspace );

    }

    /* ----- API ----- */

    /* SET */

    set ( color, colorspace ) {

      if ( colorspace ) {

        switch ( colorspace.toLowerCase () ) {

          case 'hex':
            return this.setHex ( color );

          case 'rgb':
            return this.setRgb ( color );

          case 'hsv':
            return this.setHsv ( color );

          case 'hsl':
            return this.setHsl ( color );

        }

      }

      if ( _.isPlainObject ( color ) ) {

        if ( 'r' in color && 'g' in color && 'b' in color ) {

          if ( Number ( color.r ) > 99 || Number ( color.g ) > 99 || Number ( color.b ) > 99 ) {

            return this.setRgb ( color );

          } else {

            return this.setHex ( color );

          }

        } else if ( 'h' in color && 's' in color ) {

          if ( 'l' in color ) {

            return this.setHsl ( color );

          } else if ( 'v' in color ) {

            return this.setHsv ( color );

          }

        }

      } else if ( _.isString ( color ) ) {

        color = _.trim ( color, '#' );

        if ( /^[0-9a-f]{6}$/i.test ( color ) ) { // Full 6-chars hex color notation

          return this.setHex ({
            r: color[0] + color[1],
            g: color[2] + color[3],
            b: color[4] + color[5]
          });

        } else if ( /^[0-9a-f]{3}$/i.test ( color ) ) { // Shorthand 3-chars hex color notation

          return this.setHex ({
            r: color[0].repeat ( 2 ),
            g: color[1].repeat ( 2 ),
            b: color[2].repeat ( 2 )
          });

        }

      }

      throw new Error ( 'Invalid color' );

    }

    setHex ( color ) {

      this.hex = _.cloneDeep ( color );

    }

    setRgb ( color ) {

      this.hex = Color.rgb2hex ( color );

    }

    setHsv ( color ) {

      this.hex = Color.hsv2hex ( color );

    }

    setHsl ( color ) {

      this.hex = Color.hsl2hex ( color );

    }

    /* GET */

    getHex () {

      return this.hex;

    }

    getRgb () {

      return Color.hex2rgb ( this.hex );

    }

    getHsv () {

      return Color.hex2hsv ( this.hex );

    }

    getHsl () {

      return Color.hex2hsl ( this.hex );

    }

    /* ----- STATICS ----- */

    /* HEX */

    static hex2rgb ( hex ) {

      return {
        r: Color.hex2dec ( hex.r ),
        g: Color.hex2dec ( hex.g ),
        b: Color.hex2dec ( hex.b )
      };

    }

    static hex2hsv ( hex ) {

      return Color.rgb2hsv ( Color.hex2rgb ( hex ) );

    }

    static hex2hsl ( hex ) {

      return Color.hsv2hsl ( Color.hex2hsv ( hex ) );

    }

    /* RGB */

    static rgb2hex ( rgb ) {

      return {
        r: Color.dec2hex ( rgb.r ),
        g: Color.dec2hex ( rgb.g ),
        b: Color.dec2hex ( rgb.b )
      };

    }

    static rgb2hsv ( rgb ) {

      let r = rgb.r / 255,
          g = rgb.g / 255,
          b = rgb.b / 255,
          h,
          s,
          v = Math.max ( r, g, b ),
          diff = v - Math.min ( r, g, b ),
          diffc = function ( c ) {
            return ( v - c ) / 6 / diff + 1 / 2;
          };

      if ( diff === 0 ) {

        h = s = 0;

      } else {

        s = diff / v;

        let rr = diffc ( r ),
            gg = diffc ( g ),
            bb = diffc ( b );

        if ( r === v ) {

          h = bb - gg;

        } else if ( g === v ) {

          h = ( 1 / 3 ) + rr - bb;

        } else if ( b === v ) {

          h = ( 2 / 3 ) + gg - rr;

        }

        if ( h < 0 ) {

          h += 1;

        } else if ( h > 1 ) {

          h -= 1;
        }

      }

      return {
        h: h * 360,
        s: s * 100,
        v: v * 100
      };

    }

    static rgb2hsl ( rgb ) {

      return Color.hsv2hsl ( Color.rgb2hsv ( rgb ) );

    }

    /* HSV */

    static hsv2hex ( hsv ) {

      return Color.rgb2hex ( Color.hsv2rgb ( hsv ) );

    }

    static hsv2rgb ( hsv ) {

      let r,
          g,
          b,
          h = hsv.h,
          s = hsv.s,
          v = hsv.v;

      s /= 100;
      v /= 100;

      if ( s === 0 ) {

        r = g = b = v;

      } else {

        let i, f, p, q, t;

        h /= 60;
        i = Math.floor ( h );
        f = h - i;
        p = v * ( 1 - s );
        q = v * ( 1 - s * f );
        t = v * ( 1 - s * ( 1 - f ) );

        switch ( i ) {

          case 0:
            r = v;
            g = t;
            b = p;
            break;

          case 1:
            r = q;
            g = v;
            b = p;
            break;

          case 2:
            r = p;
            g = v;
            b = t;
            break;

          case 3:
            r = p;
            g = q;
            b = v;
            break;

          case 4:
            r = t;
            g = p;
            b = v;
            break;

          default:
            r = v;
            g = p;
            b = q;

        }

      }

      return {
        r: Math.round ( r * 255 ),
        g: Math.round ( g * 255 ),
        b: Math.round ( b * 255 )
      };

    }

    static hsv2hsl ( hsv ) {

      let s = hsv.s / 100,
          v = hsv.v / 100,
          tempL = ( 2 - s ) * v,
          tempS = s * v;

      return {
        h: hsv.h,
        s: ( tempS !== 0 ) ? ( tempS / ( ( tempL <= 1 ) ? tempL : 2 - tempL ) ) * 100 : 0,
        l: ( tempL / 2 ) * 100
      };

    }

    /* HSL */

    static hsl2hex ( hsl ) {

      return Color.hsv2hex ( Color.hsl2hsv ( hsl ) );

    }

    static hsl2rgb ( hsl ) {

      return Color.hsv2rgb ( Color.hsl2hsv ( hsl ) );

    }

    static hsl2hsv ( hsl ) {

      let l = hsl.l / 100 * 2,
          s = ( hsl.s / 100 ) * ( l <= 1 ? l : 2 - l );

      return {
        h: hsl.h,
        s: ( l + s !== 0 ) ? ( 2 * s ) / ( l + s ) * 100 : 0,
        v: ( l + s ) / 2 * 100
      };

    }

    /* DECIMAL / HEX */

    static dec2hex ( dec ) {

      return _.padLeft ( parseInt ( dec, 10 ).toString ( 16 ), 2, '0' );

    }

    static hex2dec ( hex ) {

      return parseInt ( hex, 16 );

    }

  };

  /* EXPORT */

  Svelto.Color = Color;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Colorpicker
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * @requires ../color/color.js
 * ========================================================================= */

//TODO: Add support for alpha channel, by adding an opacity slider at the bottom of the sbWrp, it should be optional

(function ( $, _, Svelto, Widgets, Factory, Color, Keyboard ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'colorpicker',
    plugin: true,
    selector: '.colorpicker',
    options: {
      exporters: {
        hex ( color ) {
          let hex = color.getHex ();
          return '#' + hex.r + hex.g + hex.b;
        }
      },
      startColor: '#ff0000', // It can be anything supported by the `Color` obj
      format: {
        type: 'hex', // One of the formats implemented in the exporters
        data: undefined // Passed to the called the exporter
      },
      live: false, // Wether it will update the input also on `Draggable.move` or just on `Draggable.end`
      selectors: {
        sb: {
          wrp: '.colorpicker-sb',
          handler: '.colorpicker-sb .colorpicker-handler'
        },
        hue: {
          wrp: '.colorpicker-hue',
          handler: '.colorpicker-hue .colorpicker-handler'
        },
        input: 'input'
      },
      callbacks: {
        change: _.noop
      }
    }
  };

  /* COLORPICKER */

  class Colorpicker extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$colorpicker = this.$element;
      this.$sbWrp = this.$colorpicker.find ( this.options.selectors.sb.wrp );
      this.$sbHandler = this.$colorpicker.find ( this.options.selectors.sb.handler );
      this.$hueWrp = this.$colorpicker.find ( this.options.selectors.hue.wrp );
      this.$hueHandler = this.$colorpicker.find ( this.options.selectors.hue.handler );

      this.$input = this.$colorpicker.find ( this.options.selectors.input );

      this.sbWrpSize = this.$sbWrp.width ();

      this.hueWrpHeight = this.sbWrpSize;

      this.hsv = false;

    }

    _init () {

      this.set ( this.$input.val () );

      if ( !this.hsv ) {

        this.set ( this.options.startColor );

      }

    }

    _events () {

      this.___change ();

      this.___sbKeydown ();
      this.___sbDrag ();

      this.___hueKeydown ();
      this.___hueDrag ();

    }

    _destroy () {

      /* DRAG */

      this.$sbHandler.draggable ( 'destroy' );
      this.$hueHandler.draggable ( 'destroy' );

    }

    /* CHANGE */

    ___change () {

      this._on ( true, this.$input, 'change', this.__change );

    }

    __change () {

      this.set ( this.$input.val () );

    }

    /* SB ARROWS */

    ___sbKeydown () {

      this._onHover ( this.$sbWrp, [this.$document, 'keydown', this.__sbKeydown] );

    }

    __sbKeydown ( event ) {

      switch ( event.keyCode ) {

        case Keyboard.keys.UP:
          this.hsv.v = Math.min ( 100, this.hsv.v + 1 );
          break;

        case Keyboard.keys.RIGHT:
          this.hsv.s = Math.min ( 100, this.hsv.s + 1 );
          break;

        case Keyboard.keys.DOWN:
          this.hsv.v = Math.max ( 0, this.hsv.v - 1 );
          break;

        case Keyboard.keys.LEFT:
          this.hsv.s = Math.max ( 0, this.hsv.s - 1 );
          break;

        default:
          return;

      }

      event.preventDefault ();
      event.stopImmediatePropagation ();

      this._updateSb ();
      this._updateInput ();

    }

    /* SB DRAG */

    ___sbDrag () {

      this.$sbHandler.draggable ({
        draggable: this.isEnabled.bind ( this ),
        proxy: {
          $element: this.$sbWrp
        },
        constrainer: {
          $element: this.$sbWrp,
          center: true
        },
        callbacks: {
          move: this._throttle ( this.__sbDragMove.bind ( this ), 100 ),
          end: this.__sbDragEnd.bind ( this )
        }
      });

    }

    _sbDragSet ( XY, update ) {

      this.hsv.s =  _.clamp ( XY.X, 0, this.sbWrpSize ) * 100 / this.sbWrpSize;
      this.hsv.v =  100 - ( _.clamp ( XY.Y, 0, this.sbWrpSize ) * 100 / this.sbWrpSize );

      this._updateSb ();

      if ( update ) {

        this._updateInput ();

      }

    }

    __sbDragMove ( event, data ) {

      this._sbDragSet ( data.dragXY, this.options.live );

    }

    __sbDragEnd ( event, data ) {

      this._sbDragSet ( data.dragXY, true );

    }

    /* HUE ARROWS */

    ___hueKeydown () {

      this._onHover ( this.$hueWrp, [this.$document, 'keydown', this.__hueKeydown] );

    }

    __hueKeydown ( event ) {

      switch ( event.keyCode ) {

        case Keyboard.keys.UP:
          this.hsv.h = Math.min ( 359, this.hsv.h + 1 );
          break;

        case Keyboard.keys.DOWN:
          this.hsv.h = Math.max ( 0, this.hsv.h - 1 );
          break;

        default:
          return;

      }

      event.preventDefault ();
      event.stopImmediatePropagation ();

      this._updateHue ();
      this._updateInput ();

    }

    /* HUE DRAG */

    ___hueDrag () {

      this.$hueHandler.draggable ({
        draggable: this.isEnabled.bind ( this ),
        axis: 'y',
        proxy: {
          $element: this.$hueWrp
        },
        constrainer: {
          $element: this.$hueWrp
        },
        callbacks: {
          move: this._throttle ( this.__hueDragMove.bind ( this ), 50 ),
          end: this.__hueDragEnd.bind ( this )
        }
      });

    }

    _hueDragSet ( XY, update ) {

      this.hsv.h = 359 - ( _.clamp ( XY.Y, 0, this.hueWrpHeight ) * 359 / this.hueWrpHeight );

      this._updateHue ();

      if ( update ) {

        this._updateInput ();

      }

    }

    __hueDragMove ( event, data ) {

      this._hueDragSet ( data.dragXY, this.options.live );

    }

    __hueDragEnd ( event, data ) {

      this._hueDragSet ( data.dragXY, true );

    }

    /* UPDATE */

    _updateSb () {

      let hsl = Color.hsv2hsl ( this.hsv ),
          translateX = this.sbWrpSize / 100 * this.hsv.s,
          translateY = this.sbWrpSize / 100 * ( 100 - this.hsv.v );

      this.$sbHandler.hsl ( hsl.h, hsl.s, hsl.l ).translate ( translateX, translateY );

    }

    _updateHue () {

      let hsl = Color.hsv2hsl ( this.hsv ),
          translateY = this.hueWrpHeight / 100 * ( 100 - ( this.hsv.h / 360 * 100 ) );

      this.$hueHandler.hsl ( this.hsv.h, 100, 50 ).translateY ( translateY );
      this.$sbHandler.hsl ( hsl.h, hsl.s, hsl.l );
      this.$sbWrp.hsl ( this.hsv.h, 100, 50 );

    }

    _updateInput () {

      this.$input.val ( this._export () ).trigger ( 'change' );

      this._trigger ( 'change' );

    }

    _update () {

      this._updateSb ();
      this._updateHue ();
      this._updateInput ();

    }

    /* EXPORT */

    _export () {

      return this.options.exporters[this.options.format.type] ( new Color ( this.hsv, 'hsv' ), this.options.format.data );

    }

    /* API */

    get () {

      return this._export ();

    }

    set ( color ) {

      color = _.attempt ( () => new Color ( color ) );

      if ( _.isError ( color ) ) return;

      let hsv = color.getHsv ();

      if ( _.isEqual ( this.hsv, hsv ) ) return;

      this.hsv = hsv;

      this._update ();

    }

  }

  /* FACTORY */

  Factory.init ( Colorpicker, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Color, Svelto.Keyboard ));


/* =========================================================================
 * Svelto - Cookie
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * Fork of https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie - Mozilla
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

/* COOKIE */

(function ( $, _, Svelto ) {

  'use strict';

  /* COOKIE */

  let Cookie = {

    /* VARIABLES */

    encoder: encodeURIComponent,
    decoder: decodeURIComponent,

    /* API */

    get ( key ) {

      if ( !key ) return null;

      return this.decoder ( document.cookie.replace ( new RegExp ( '(?:(?:^|.*;)\\s*' + this.encoder ( key ).replace ( /[\-\.\+\*]/g, '\\$&' ) + '\\s*\\=\\s*([^;]*).*$)|^.*$' ), '$1' ) ) || null;

    },

    set ( key, value, end, path, domain, secure ) {

      if ( !key || /^(?:expires|max\-age|path|domain|secure)$/i.test ( key ) ) return false;

      let expires = '';

      if ( end ) {

        switch ( end.constructor ) {

          case Number:
            expires = ( end === Infinity ) ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + end;
            break;

          case String:
            expires = '; expires=' + end;
            break;

          case Date:
            expires = '; expires=' + end.toUTCString ();
            break;

        }

      }

      document.cookie = this.encoder ( key ) + '=' + this.encoder ( value ) + expires + ( domain ? '; domain=' + domain : '' ) + ( path ? '; path=' + path : '' ) + ( secure ? '; secure' : '' );

      return true;

    },

    remove ( key, path, domain ) {

      if ( !this.has ( key ) ) return false;

      document.cookie = this.encoder ( key ) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + ( domain ? '; domain=' + domain : '' ) + ( path ? '; path=' + path : '' );

      return true;

    },

    has ( key ) {

      if ( !key ) return false;

      return ( new RegExp ( '(?:^|;\\s*)' + this.encoder ( key ).replace ( /[\-\.\+\*]/g, '\\$&' ) + '\\s*\\=' ) ).test ( document.cookie );

    },

    keys () {

      let keys = document.cookie.replace ( /((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '' ).split ( /\s*(?:\=[^;]*)?;\s*/ );

      return _.map ( keys, this.decoder );

    }

  };

  /* EXPORT */

  Svelto.Cookie = Cookie;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Datepicker
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

// When using using an incomplete-information format (those where not all the info are exported, like YYYYMMDD) the behaviour when used in combination with, for instance, `formSync` would be broken: at GTM+5 it may be the day 10, but at UTC may actually be day 9, and when syncing we won't get the right date synced between both datepickers
// Accordion to ISO-8601 the first day of the week is Monday

//FIXME: When using the arrows the prev day still remains hovered even if it's not below the cursor (chrome) //TODO: Make a SO question, maybe we can workaround it

(function ( $, _, Svelto, Widgets, Factory, Pointer, Mouse ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'datepicker',
    plugin: true,
    selector: '.datepicker',
    options: {
      exporters: {
        YYYYMMDD ( date, data ) {
          return [_.padLeft ( date.getUTCFullYear (), 4, 0 ), _.padLeft ( parseInt ( date.getUTCMonth (), 10 ) + 1, 2, 0 ), _.padLeft ( date.getUTCDate (), 2, 0 )].join ( data.separator );
        },
        UNIXTIMESTAMP ( date ) {
          return Math.floor ( date.getTime () / 1000 );
        },
        ISO ( date ) {
          return date.toISOString ();
        },
        UTC ( date ) {
          return date.toUTCString ();
        }
      },
      importers: {
        YYYYMMDD ( date, data ) {
          let segments = date.split ( data.separator );
          return new Date ( Date.UTC ( parseInt ( segments[0], 10 ), parseInt ( segments[1], 10 ) - 1, parseInt ( segments[2], 10 ) ) );
        },
        UNIXTIMESTAMP ( date ) {
          return new Date ( ( _.isString ( date ) && date.length ) ? date * 1000 : NaN );
        },
        ISO ( date ) {
          return new Date ( date );
        },
        UTC ( date ) {
          return new Date ( date );
        }
      },
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      firstDayOfWeek: 0, // Corresponding to the index in this array: `['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']`, setted to 0 since that to ISO-8601 the first day of the week is Monday
      date: {
        min: false, // Minimum selectable date
        max: false, // Maximum selectable date
        today: false, // Today date
        current: false, // Current date visible in the datepicker (basically the month we are viewing)
        selected: false // The selcted date
      },
      format: {
        type: 'UNIXTIMESTAMP', // One of the formats implemented in the exporters
        data: { // Passed to the called importer and exporter
          separator: '/'
        }
      },
      classes: {
        today: 'datepicker-day-today',
        selected: 'datepicker-day-selected',
        clamped: 'datepicker-day-clamped'
      },
      selectors: {
        navigation: {
          previous: '.datepicker-navigation .previous',
          next: '.datepicker-navigation .next',
          today: '.datepicker-navigation .today'
        },
        day: {
          previous: '.datepicker-days .previous',
          current: '.datepicker-days :not(.previous):not(.next)',
          next: '.datepicker-days .next',
          today: '.datepicker-day-today',
          selected: '.datepicker-day-selected',
          clamped: '.datepicker-day-clamped'
        },
        title: '.datepicker-title',
        input: 'input'
      },
      keystrokes: {
        'up, left': 'previousMonth',
        'right, down': 'nextMonth'
      },
      callbacks: {
        change: _.noop
      }
    }
  };

  /* DATEPICKER */

  class Datepicker extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$datepicker = this.$element;
      this.$input = this.$datepicker.find ( this.options.selectors.input );

      this.$navigationPrev = this.$datepicker.find ( this.options.selectors.navigation.previous );
      this.$navigationNext = this.$datepicker.find ( this.options.selectors.navigation.next );
      this.$navigationToday = this.$datepicker.find ( this.options.selectors.navigation.today );
      this.$navigationTitle = this.$datepicker.find ( this.options.selectors.title );

      this.$daysPrev = this.$datepicker.find ( this.options.selectors.day.previous );
      this.$daysCurrent = this.$datepicker.find ( this.options.selectors.day.current );
      this.$daysNext = this.$datepicker.find ( this.options.selectors.day.next );
      this.$daysAll = this.$daysPrev.add ( this.$daysCurrent ).add ( this.$daysNext );

      this.$daySelected = this.$daysAll.filter ( this.options.selectors.day.selected );
      this.$dayToday = this.$daysAll.filter ( this.options.selectors.day.today );

    }

    _init () {

      /* RESETTING HIGHLIGHT */

      this._unhighlightSelected ();
      this._unhighlightToday ();

      /* TODAY */

      if ( !(this.options.date.today instanceof Date) ) {

        this.options.date.today = new Date ();

      }

      /* INITIAL VALUE */

      this.set ( this.$input.val () );

      /* CURRENT */

      this.options.date.current = this._clampDate ( this.options.date.current || this.options.date.selected || this.options.date.today );

      /* REFRESH */

      this._refresh ();

    }

    _events () {

      this.___change ();
      this.___keydown ();
      this.___navigation ();
      this.___dayTap ();

    }

    /* PRIVATE */

    _cloneDate ( date ) {

      return new Date ( date.getTime () );

    }

    _clampDate ( date ) {

      return new Date ( _.clamp ( date.getTime (), this.options.date.min ? this.options.date.min.getTime () : undefined, this.options.date.max ? this.options.date.max.getTime () : undefined ) );

    }

    /* CHANGE */

    ___change () {

      this._on ( true, this.$input, 'change', this.__change );

    }

    __change ( event, data ) {

      if ( data && data._datepickerId === this.guid ) return;

      this.set ( this.$input.val () );

    }

    /* KEYDOWN */

    ___keydown () {

      this._onHover ( [this.$document, 'keydown', this.__keydown] );

    }

    /* NAVIGATION */

    ___navigation () {

      this._on ( this.$navigationPrev, Pointer.tap, this.previousMonth );
      this._on ( this.$navigationNext, Pointer.tap, this.nextMonth );
      this._on ( this.$navigationToday, Pointer.tap, this.navigateToToday );

    }

    /* DAY TAP */

    ___dayTap () {

      this._on ( Pointer.tap, this.options.selectors.day.current, this.__dayTap );

    }

    __dayTap ( event ) {

      if ( event.button && event.button !== Mouse.buttons.LEFT ) return;

      let $day = $(event.currentTarget);

      if ( $day.is ( this.options.selectors.day.selected ) || $day.is ( this.options.selectors.day.clamped ) ) return;

      let day = parseInt ( $day.text (), 10 ),
          date = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth (), day, 12 );

      this.set ( date );

    }

    /* BUILD */

    _buildCalendar () {

      /* NUMBERS */

      let prevMonthDays = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth (), 0 ).getDate (),
          currentMonthDays = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth () + 1, 0 ).getDate (),
          initialDayOfWeek = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth (), 1 ).getDay ();

      initialDayOfWeek = ( initialDayOfWeek === 0 ) ? 6 : initialDayOfWeek - 1; // Normalizing to 0 -> Monday
      initialDayOfWeek -= ( this.options.firstDayOfWeek % 7 ); // Offsetting according to the provided setting
      initialDayOfWeek = ( initialDayOfWeek < 0 ) ? 7 + initialDayOfWeek : initialDayOfWeek; // Moving to the other side in case of negative offsetting

      /* PREV */

      let exceedingDays = 31 - prevMonthDays,
          neededDays = initialDayOfWeek,
          leftDays = 9 - exceedingDays - neededDays;

      this.$daysPrev.slice ( 0, leftDays ).addClass ( this.options.classes.hidden );
      this.$daysPrev.slice ( leftDays, leftDays + neededDays ).removeClass ( this.options.classes.hidden );
      this.$daysPrev.slice ( leftDays + neededDays ).addClass ( this.options.classes.hidden );

      /* CURRENT */

      this.$daysCurrent.slice ( 28, currentMonthDays ).removeClass ( this.options.classes.hidden );
      this.$daysCurrent.slice ( currentMonthDays ).addClass ( this.options.classes.hidden );

      /* CURRENT CLAMPED */

      this.$daysCurrent.removeClass ( this.options.classes.clamped );

      if ( this.options.date.min && this.options.date.current.getFullYear () === this.options.date.min.getFullYear () && this.options.date.current.getMonth () === this.options.date.min.getMonth () ) {

        this.$daysCurrent.slice ( 0, this.options.date.min.getDate () - 1 ).addClass ( this.options.classes.clamped );

      }

      if ( this.options.date.max && this.options.date.current.getFullYear () === this.options.date.max.getFullYear () && this.options.date.current.getMonth () === this.options.date.max.getMonth () ) {

        this.$daysCurrent.slice ( this.options.date.max.getDate () ).addClass ( this.options.classes.clamped );

      }

      /* NEXT */

      neededDays = ( ( currentMonthDays + initialDayOfWeek ) % 7 );
      neededDays = ( neededDays === 0 ) ? 0 : 7 - neededDays;

      this.$daysNext.slice ( 0, neededDays ).removeClass ( this.options.classes.hidden );
      this.$daysNext.slice ( neededDays ).addClass ( this.options.classes.hidden );

    }

    /* HIGHLIGHT */

    _highlightDay ( day, cssClass ) {

      if ( day instanceof Date ) {

        let deltaMonths = ( day.getFullYear () * 12 + day.getMonth () ) - ( this.options.date.current.getFullYear () * 12 + this.options.date.current.getMonth () );

        switch ( deltaMonths ) {

          case -1:
            return this.$daysPrev.eq ( day.getDate () - 23 ).addClass ( cssClass );

          case 0:
            return this.$daysCurrent.eq ( day.getDate () - 1 ).addClass ( cssClass );

          case 1:
            return this.$daysNext.eq ( day.getDate () - 1 ).addClass ( cssClass );

        }

      }

      return false;

    }

    _unhighlightSelected () {

      if ( !this.$daySelected.length ) return;

      this.$daySelected.removeClass ( this.options.classes.selected );

    }

    _highlightSelected () {

      if ( this.options.date.selected ) {

        this.$daySelected = this._highlightDay ( this.options.date.selected, this.options.classes.selected );

      }

    }

    _unhighlightToday () {

      if ( !this.$dayToday.length ) return;

      this.$dayToday.removeClass ( this.options.classes.today );

    }

    _highlightToday () {

      if ( this.options.date.today ) {

        this.$dayToday = this._highlightDay ( this.options.date.today, this.options.classes.today );

      }

    }

    /* UPDATE */

    _updateNavigation () {

      /* PREVIOUS */

      if ( this.options.date.min && this.$navigationPrev.length ) {

        let lastDayPrevMonth = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth (), 0 );

        this.$navigationPrev.toggleClass ( this.options.classes.disabled, lastDayPrevMonth.getTime () < this.options.date.min.getTime () );

      }

      /* NEXT */

      if ( this.options.date.max && this.$navigationNext.length ) {

        let firstDayNextMonth = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth () + 1, 1 );

        this.$navigationNext.toggleClass ( this.options.classes.disabled, firstDayNextMonth.getTime () > this.options.date.max.getTime () );

      }

      /* TODAY */

      if ( this.$navigationToday.length ) {

        this.$navigationToday.toggleClass ( this.options.classes.disabled, this.options.date.current.getFullYear () === this.options.date.today.getFullYear () && this.options.date.current.getMonth () === this.options.date.today.getMonth () );

      }

    }

    _updateTitle () {

      this.$navigationTitle.text ( this.options.months[this.options.date.current.getMonth ()] + ' ' + this.options.date.current.getFullYear () );

    }

    _updateInput () {

      if ( this.options.date.selected ) {

        this.$input.val ( this._export ( this.options.date.selected ) ).trigger ( 'change', { _datepickerId: this.guid } );

      }

    }

    /* EXPORT */

    _export ( date )  {

      return this.options.exporters[this.options.format.type] ( date, this.options.format.data );

    }

    /* IMPORT */

    _import ( date )  {

      return this.options.importers[this.options.format.type] ( date, this.options.format.data );

    }

    _refresh () {

      this._unhighlightSelected ();
      this._unhighlightToday ();

      this._buildCalendar ();

      this._updateNavigation ();

      this._highlightSelected ();
      this._highlightToday ();

      this._updateTitle ();

    }

    /* API */

    get ( formatted ) {

      return this.options.date.selected ? ( formatted ? this._export ( this.options.date.selected ) : this._cloneDate ( this.options.date.selected ) ) : false;

    }

    set ( date ) {

      date = ( date instanceof Date ) ? date : this._import ( date );

      if ( _.isNaN ( date.valueOf () ) ) return;

      date = this._clampDate ( date );

      if ( this.options.date.selected && date.getTime () === this.options.date.selected.getTime () ) return;

      if ( this.options.date.selected ) {

        this._unhighlightSelected ();

      }

      this.options.date.selected = date;

      if ( this.options.date.current ) {

        if ( this.options.date.selected.getFullYear () === this.options.date.current.getFullYear () && this.options.date.selected.getMonth () === this.options.date.current.getMonth () ) {

          this._highlightSelected ();

        } else {

          this.options.date.current = this._cloneDate ( this.options.date.selected );

          this._refresh ();

        }

      }

      this._updateInput ();

      this._trigger ( 'change' );

    }

    navigateToToday () {

      if ( this.options.date.current.getFullYear () !== this.options.date.today.getFullYear () || this.options.date.current.getMonth () !== this.options.date.today.getMonth () ) {

        this.options.date.current = this._clampDate ( this.options.date.today );

        this._refresh ();

      }

    }

    navigateMonth ( modifier ) {

      if ( _.isNaN ( modifier ) ) return;

      this.options.date.current.setMonth ( this.options.date.current.getMonth () + modifier );

      this.options.date.current = this._clampDate ( this.options.date.current );

      this._refresh ();

    }

    previousMonth () {

      this.navigateMonth ( -1 );

    }

    nextMonth () {

      this.navigateMonth ( 1 );

    }

  }

  /* FACTORY */

  Factory.init ( Datepicker, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Mouse ));


/* =========================================================================
 * Svelto - Draggable
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

//TODO: Animate `revert`
//TODO: Maybe return less datas to triggered events and callbacks

//FIXME: Reposition the draggable properly when autoscrolling inside a container (not document/html)
//FIXME: On iOS, if the draggable is too close to the left edge of the screen dragging it will cause a `scroll to go back` event/animation on safari

(function ( $, _, Svelto, Widgets, Factory, Browser, Pointer, Mouse ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'draggable',
    plugin: true,
    selector: '.draggable',
    options: {
      draggable: _.true, // Checks if we can drag it or not
      threshold: Browser.is.touchDevice ? 5 : 0, // Minimum moving treshold for triggering a drag
      onlyHandlers: false, // Only an handler can drag it around
      revert: false, // On dragend take it back to the starting position
      axis: false, // Limit the movements to this axis
      $helper: false, // An element to drag around instead of the draggable, can be `false` (in case the draggable will be dragged), a jQuery object or a function yiedling a jQuery object
      proxy: {
        $element: false, // Drag the element also when we are triggering a drag from this element
        noMotion: true // If enabled even if there's no motion the proxied draggable will get positionated to the dragend point event (e.g. just a tap)
      },
      constrainer: { // Constrain the drag inside the $element
        $element: false, // If we want to keep the draggable inside this $element
        center: false, // Set the constrain type, it will constrain the whole shape, or the center
        tolerance: { // The amount of pixel flexibility that a constrainer has
          x: 0,
          y: 0
        }
      },
      modifiers: { // It can modify the setted X and Y transforms values
        x: _.true,
        y: _.true
      },
      scroll: { // Autoscroll the window when near the border
        active: false, // Active it or not
        speed: 20, // The amount of autoscroll
        sensitivity: 50 // How close it should be to tbe borders
      },
      classes: {
        dragging: 'dragging'
      },
      selectors: {
        handler: '.draggable-handler'
      },
      callbacks: {
        start: _.noop,
        move: _.noop,
        end: _.noop
      }
    }
  };

  /* DRAGGABLE */

  class Draggable extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.draggable = this.element;
      this.$draggable = this.$element;

      this.$handlers = this.options.onlyHandlers ? this.$draggable.find ( this.options.selectors.handler ) : this.$draggable;

    }

    _events () {

      this.___down ();
      this.___proxy ();

    }

    /* DOWN */

    ___down () {

      this._on ( this.$handlers, Pointer.down, this.__down );

    }

    /* PROXY */

    ___proxy () {

      if ( this.options.proxy.$element ) {

        this._on ( this.options.proxy.$element, Pointer.down, this.__down );

      }

    }

    /* ACTIONS */

    _centerToPoint ( point, suppressClasses ) {

      let movableOffset = this.$movable.offset (),
          deltaXY = {
            X: point.X - ( movableOffset.left + ( this.$movable.outerWidth () / 2 ) ),
            Y: point.Y - ( movableOffset.top + ( this.$movable.outerHeight () / 2 ) )
          };

      return this._actionMove ( deltaXY, suppressClasses );

    }

    _actionMove ( deltaXY, suppressClasses ) {

      /* BASE */

      let baseXY = {
        X: this.proxyXY ? this.proxyXY.X : this.initialXY.X,
        Y: this.proxyXY ? this.proxyXY.Y : this.initialXY.Y
      };

      /* INIT */

      if ( !this.inited ) {

        this.inited = true;

        /* CLAMPING VALUES */

        if ( this.options.constrainer.$element ) {

          let constrainerOffset = this.options.constrainer.$element.offset (),
              movableOffset = this.$movable.offset ();

          if ( this.options.axis !== 'y' ) {

            let halfWidth = this.options.constrainer.center ? this.$movable.outerWidth () / 2 : 0;

            this.translateX_min = constrainerOffset.left - ( movableOffset.left - baseXY.X ) - halfWidth;
            this.translateX_max = constrainerOffset.left + this.options.constrainer.$element.outerWidth () - ( ( movableOffset.left - baseXY.X ) + this.$movable.outerWidth () ) + halfWidth;

          }

          if ( this.options.axis !== 'x' ) {

            let halfHeight = this.options.constrainer.center ? this.$movable.outerHeight () / 2 : 0;

            this.translateY_min = constrainerOffset.top - ( movableOffset.top - baseXY.Y ) - halfHeight;
            this.translateY_max = constrainerOffset.top + this.options.constrainer.$element.outerHeight () - ( ( movableOffset.top - baseXY.Y ) + this.$movable.outerHeight () ) + halfHeight;

          }

        }

        /* CLASSES */

        if ( !suppressClasses ) {

          this._addClasses ();

        }

      }

      /* CLAMPING */

      let translateX = baseXY.X,
          translateY = baseXY.Y;

      if ( this.options.axis !== 'y' ) {

        translateX += deltaXY.X;

        if ( this.options.constrainer.$element ) {

          translateX = _.clamp ( translateX, this.translateX_min - this.options.constrainer.tolerance.x, this.translateX_max + this.options.constrainer.tolerance.x );

        }

      }

      if ( this.options.axis !== 'x' ) {

        translateY += deltaXY.Y;

        if ( this.options.constrainer.$element ) {

          translateY = _.clamp ( translateY, this.translateY_min - this.options.constrainer.tolerance.y, this.translateY_max + this.options.constrainer.tolerance.y );

        }

      }

      /* MODIFYING */

      let modifiedXY = {
            X: this.options.modifiers.x ( translateX ),
            Y: this.options.modifiers.y ( translateY )
          };

      if ( modifiedXY.X === false && modifiedXY.Y === false ) { // Aborted

        return baseXY;

      } else {

        /* SETTING */

        let endXY = {
          X: _.isBoolean ( modifiedXY.X ) ? ( modifiedXY.X ? translateX : baseXY.X ) : modifiedXY.X,
          Y: _.isBoolean ( modifiedXY.Y ) ? ( modifiedXY.Y ? translateY : baseXY.Y ) : modifiedXY.Y
        };

        this.$movable.translate ( endXY.X, endXY.Y );

        /* MOTION */

        this.motion = true;

        /* RETURNING */

        return endXY;

      }

    }

    /* CLASSES */

    _toggleClasses ( force ) {

      this.$layout.toggleClass ( this.options.classes.dragging, force );
      this.$movable.toggleClass ( this.options.classes.dragging, force );

    }

    _addClasses () {

      this._toggleClasses ( true );

    }

    _removeClasses () {

      this._toggleClasses ( false );

    }

    /* HELPER */

    _getHelper () {

      return _.isFunction ( this.options.$helper )
               ? this.options.$helper ()
               : this.options.$helper instanceof $ && this.options.$helper.length
                 ? this.options.$helper
                 : false;

    }

    _initHelper () {

      this.$helper.appendTo ( this.$layout );

    }

    _destroyHelper () {

      this.$helper.remove ();

    }

    /* AUTOSCROLL */

    _autoscroll ( pointXY ) {

      if ( !this.options.scroll.active ) return;

      if ( !this.scrollInited ) {

        this.$scrollParent = this.$movable.scrollParent ();
        this.scrollParent = this.$scrollParent[0];

        this.scrollParentIsDocument = ( this.scrollParent === document || this.scrollParent.tagName === 'HTML' );

        this.scrollInited = true;

      }

      // Logic taken from jQuery UI

  		if ( this.scrollParentIsDocument ) {

  			if ( this.options.axis !== 'x' ) {

          let scrollTop = this.$document.scrollTop ();

  				if ( pointXY.Y - scrollTop <= this.options.scroll.sensitivity ) {

          	this.$document.scrollTop ( scrollTop - this.options.scroll.speed );

          } else if ( this.$window.height () - ( pointXY.Y - scrollTop ) <= this.options.scroll.sensitivity ) {

          	this.$document.scrollTop ( scrollTop + this.options.scroll.speed );

          }

  			}

  			if ( this.options.axis !== 'y' ) {

          let scrollLeft = this.$document.scrollLeft ();

  				if ( pointXY.X - scrollLeft <= this.options.scroll.sensitivity ) {

          	this.$document.scrollLeft ( scrollLeft - this.options.scroll.speed );

          } else if ( this.$window.width () - ( pointXY.X - scrollLeft ) <= this.options.scroll.sensitivity ) {

          	this.$document.scrollLeft ( scrollLeft + this.options.scroll.speed );

          }

  			}

  		} else {

        let parentOffset = this.$scrollParent.offset ();

  			if ( this.options.axis !== 'x' ) {

  				if ( ( parentOffset.top + this.scrollParent.offsetHeight ) - pointXY.Y <= this.options.scroll.sensitivity ) {

  					this.scrollParent.scrollTop += this.options.scroll.speed;

  				} else if ( pointXY.Y - parentOffset.top <= this.options.scroll.sensitivity ) {

  					this.scrollParent.scrollTop -= this.options.scroll.speed;

  				}

  			}

  			if ( this.options.axis !== 'y' ) {

  				if ( ( parentOffset.left + this.scrollParent.offsetWidth ) - pointXY.X <= this.options.scroll.sensitivity ) {

  					this.scrollParent.scrollLeft += this.options.scroll.speed;

  				} else if ( pointXY.X - parentOffset.left <= this.options.scroll.sensitivity ) {

  					this.scrollParent.scrollLeft -= this.options.scroll.speed;

  				}

  			}

  		}

    }

    /* HANDLERS */

    __down ( event ) {

      if ( this.options.draggable () ) {

        event.preventDefault ();
        event.stopImmediatePropagation ();

        this.inited = false;
        this.motion = false;
        this.scrollInited = false;

        this.$helper = this._getHelper ();
        this.helper = this.$helper ? this.$helper[0] : false;

        this.$movable = ( this.$helper || this.$draggable );

        this.startEvent = event;
        this.startXY = $.eventXY ( event );

        if ( this.$helper ) {

          this._initHelper ();
          this.initialXY = this.$movable.translate ();
          this.initialXY = this._centerToPoint ( this.startXY );

        } else {

          this.initialXY = this.$movable.translate ();

        }

        this.isProxyed = ( this.options.proxy.$element && event.currentTarget === this.options.proxy.$element[0] );

        this.proxyXY = false;

        this._trigger ( 'start', { draggable: this.draggable, helper: this.helper, initialXY: this.initialXY, startEvent: this.startEvent, startXY: this.startXY } );

        this._on ( true, this.$document, Pointer.move, this.__move );
        this._one ( true, this.$document, Pointer.up, this.__up );
        this._one ( true, this.$document, Pointer.cancel, this.__cancel );

      }

    }

    __move ( event ) {

      let moveXY = $.eventXY ( event ),
          deltaXY = {
            X: moveXY.X - this.startXY.X,
            Y: moveXY.Y - this.startXY.Y
          },
          absDeltaXY = {
            X: Math.abs ( deltaXY.X ),
            Y: Math.abs ( deltaXY.Y )
          },
          dragXY;

      if ( absDeltaXY.X < this.options.threshold && absDeltaXY.Y < this.options.threshold ) return;

      if ( !this.inited && this.isProxyed ) {

        this._centerToPoint ( moveXY );

        this.proxyXY = this.$movable.translate ();

        dragXY = this.proxyXY;

      } else {

        let deltaXY = {
              X: moveXY.X - this.startXY.X,
              Y: moveXY.Y - this.startXY.Y
            };

        dragXY = this._actionMove ( deltaXY );

      }

      this._autoscroll ( moveXY );

      this._trigger ( 'move', { draggable: this.draggable, helper: this.helper, initialXY: this.initialXY, startEvent: this.startEvent, startXY: this.startXY, moveEvent: event, moveXY: moveXY, dragXY: dragXY } );

    }

    __up ( event ) {

      let endXY = $.eventXY ( event ),
          dragXY = this.initialXY;

      if ( this.inited ) {

        this._removeClasses ();

      }

      if ( this.$helper ) {

        this._destroyHelper ();

      }

      if ( this.motion ) {

        if ( this.options.revert ) {

          this.$movable.translate ( this.initialXY.X, this.initialXY.Y );

        } else {

          dragXY = this.$movable.translate ();

        }

      } else if ( this.isProxyed ) {

        if ( this.options.proxy.noMotion && ( !event.button || event.button === Mouse.buttons.LEFT ) ) {

          dragXY = this._centerToPoint ( endXY, true );

        }

      }

      this._off ( this.$document, Pointer.move, this.__move );
      this._off ( this.$document, Pointer.cancel, this.__cancel );

      this._trigger ( 'end', { draggable: this.draggable, helper: this.helper, initialXY: this.initialXY, startEvent: this.startEvent, startXY: this.startXY, endEvent: event, endXY: endXY, dragXY: dragXY, motion: this.motion } );

    }

    __cancel ( event ) {

      let endXY = $.eventXY ( event ),
          dragXY = this.$movable.translate ();

      if ( this.inited ) {

        this._removeClasses ();

      }

      if ( this.$helper ) {

        this._destroyHelper ();

      }

      if ( this.motion ) {

        if ( this.options.revert ) {

          this.$movable.translate ( this.initialXY.X, this.initialXY.Y );

          dragXY = this.initialXY;

        }

      }

      this._off ( this.$document, Pointer.move, this.__move );
      this._off ( this.$document, Pointer.up, this.__up );

      this._trigger ( 'end', { draggable: this.draggable, helper: this.helper, initialXY: this.initialXY, startEvent: this.startEvent, startXY: this.startXY, endEvent: event, endXY: endXY, dragXY: dragXY, motion: this.motion } );

    }

  }

  /* FACTORY */

  Factory.init ( Draggable, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Browser, Svelto.Pointer, Svelto.Mouse ));


/* =========================================================================
 * Svelto - Transform (Utilties)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

/* TRANSFORM UTILITIES */

(function ( $, _, Svelto ) {

  'use strict';

  /* MATRIX */

  let property = ( 'webkitTransform' in document.documentElement.style ) ? '-webkit-transform' : 'transform';

  $.fn.matrix = function ( values ) {

    if ( values ) {

      this.css ( property, 'matrix(' + values.join ( ',' ) + ')' );

      return this;

    } else {

      let transformStr = this.css ( property );

      return ( transformStr && transformStr !== 'none' ) ? transformStr.match ( /[0-9., e-]+/ )[0].split ( ', ' ).map ( value => parseFloat ( value ) ) : [1, 0, 0, 1, 0, 0];

    }

  };

  /* TRANSFORMATIONS */

  let transformations = ['scaleX', 'skewY', 'skewX', 'scaleY', 'translateX', 'translateY']; // Their index is also the corresponsing index when applying `transform: matrix()`

  for ( let i = 0, l = transformations.length; i < l; i++ ) {

    $.fn[transformations[i]] = (function ( index ) {

       return function ( value ) {

         let matrix = this.matrix ();

         if ( !_.isUndefined ( value ) ) {

           matrix[index] = value;

           return this.matrix ( matrix );

         } else {

           return matrix[index];

         }

       };

     })( i );

  }

  /* TRANSLATE */

  $.fn.translate = function ( X, Y ) {

    let matrix = this.matrix ();

    if ( !_.isUndefined ( X ) && !_.isUndefined ( Y ) ) {

      matrix[4] = X;
      matrix[5] = Y;

      return this.matrix ( matrix );

    } else {

      return {
        X: matrix[4],
        Y: matrix[5]
      };

    }

  };

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Positionate
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../transform/transform.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* VARIABLES */

  let $window = $(window);

  /* UTILITES */

  let isHorizontal = function ( direction ) {

    return direction === 'left' || direction === 'right';

  };

  let isVertical = function ( direction ) {

    return !isHorizontal ( direction );

  };

  /* DEFAULT OPTIONS */

  let defaults = {
    axis: false, // Set a preferred axis
    strict: false, // If enabled only use the setted axis/direction, even if it won't be the optimial choice
    $anchor: false, // Positionate next to an $anchor element
    $pointer: false, // The element who is pointing to the anchor
    point: false, // Positionate at coordinates, ex: { x: number, y: number }
    spacing: 0, // Extra space to leave around the positionable element
    direction: false, // Set a preferred direction, it has greater priority over the axis
    directions: { // How the directions should be prioritized when selecting the `x` axis, the `y` axis, or all of them
      x: ['right', 'left'],
      y: ['bottom', 'top'],
      all: ['bottom', 'right', 'left', 'top']
    },
    alignment: { // Set the alignment of the positionable relative to the anchor
      x: 'center', // `left`, center`, `right`
      y: 'center' // `top`, center`, `bottom`
    },
    callbacks: {
      change: _.noop
    }
  };

  /* POSITIONATE */

  $.fn.positionate = function ( options ) {

    /* NO ELEMENTS */

    if ( !this.length ) return this;

    /* OPTIONS */

    options = _.merge ( {}, $.fn.positionate.defaults, options );

    /* VARIABLES */

    let positionable = this[0],
        $positionable = $(positionable),
        positionableRect = $positionable.getRect (),
        windowWidth = $window.width (),
        windowHeight = $window.height (),
        directions = _.unique ( _.union ( options.direction ? [options.direction] : [], options.axis ? options.directions[options.axis] : [], !options.strict || !options.direction && !options.axis ? options.directions.all : [] ) ),
        anchorRect = options.$anchor ? options.$anchor.getRect () : { top: options.point.y, bottom: options.point.y, left: options.point.x, right: options.point.x, width: 0, height: 0 };

    /* SPACES */

    let spaces = directions.map ( direction => {

      switch ( direction ) {

        case 'top':
          return anchorRect.top;

        case 'bottom':
          return windowHeight - anchorRect.bottom;

        case 'left':
          return anchorRect.left;

        case 'right':
          return windowWidth - anchorRect.right;

      }

    });

    /* SPACES PRIORITIZATION */

    spaces.forEach ( ( space, index ) => {

      if ( space < 0 ) {

        let opposite = _.getOppositeDirection ( directions[index] ),
            oppositeIndex = directions.indexOf ( opposite );

        if ( oppositeIndex !== -1 ) {

          _.move ( directions, oppositeIndex, 0 );
          _.move ( spaces, oppositeIndex, 0 );

        }

      }

    });

    /* AREAS */

    let areas = directions.map ( ( direction, index ) => {

      switch ( direction ) {

        case 'top':
        case 'bottom':
          return Math.min ( positionableRect.height, spaces[index] ) * Math.min ( windowWidth, positionableRect.width );

        case 'left':
        case 'right':
          return Math.min ( positionableRect.width, spaces[index] ) * Math.min ( windowHeight, positionableRect.height );

      }

    });

    /* BEST DIRECTION */

    let bestIndex = areas.indexOf ( _.max ( areas ) ),
        bestDirection = directions[bestIndex],
        coordinates = {};

    /* TOP / LEFT */

    switch ( bestDirection ) {

      case 'top':
        coordinates.top = anchorRect.top - positionableRect.height - options.spacing;
        break;

      case 'bottom':
        coordinates.top = anchorRect.bottom + options.spacing;
        break;

      case 'left':
        coordinates.left = anchorRect.left - positionableRect.width - options.spacing;
        break;

      case 'right':
        coordinates.left = anchorRect.right + options.spacing;
        break;

    }

    switch ( bestDirection ) {

      case 'top':
      case 'bottom':
        switch ( options.alignment.x ) {
          case 'left':
            coordinates.left = anchorRect.left;
            break;
          case 'center':
            coordinates.left = anchorRect.left + ( anchorRect.width / 2 ) - ( positionableRect.width / 2 );
            break;
          case 'right':
            coordinates.left = anchorRect.right - positionableRect.width;
            break;
        }
        break;

      case 'left':
      case 'right':
        switch ( options.alignment.y ) {
          case 'top':
            coordinates.top = anchorRect.top;
            break;
          case 'center':
            coordinates.top = anchorRect.top + ( anchorRect.height / 2 ) - ( positionableRect.height / 2 );
            break;
          case 'bottom':
            coordinates.top = anchorRect.bottom - positionableRect.height;
            break;
        }
        break;

    }

    /* CONSTRAIN TO THE WINDOW */

    let oppositeSpace = spaces[bestIndex],
        isAnchorVisible = isVertical ( bestDirection ) ? oppositeSpace <= windowHeight : oppositeSpace <= windowWidth;

    if ( isAnchorVisible ) {

      coordinates.top = _.clamp ( coordinates.top, options.spacing, windowHeight - positionableRect.height - options.spacing );
      coordinates.left = _.clamp ( coordinates.left, options.spacing, windowWidth - positionableRect.width - options.spacing );

    }

    /* DATAS */

    let data = {
      positionable: positionable,
      coordinates: coordinates,
      direction: bestDirection
    };

    /* TRANSLATE */

    $positionable.translate ( coordinates.left, coordinates.top );

    /* CSS CLASS */

    let prevDirection = positionable._prevDirection;

    if ( prevDirection !== bestDirection ) {

      $positionable.removeClass ( 'positionate-' + prevDirection ).addClass ( 'positionate-' + bestDirection );

      positionable._prevDirection = bestDirection;

    }

    /* POINTER */

    if ( options.$anchor && options.$pointer ) {

      switch ( bestDirection ) {

        case 'top':
        case 'bottom':
          options.$pointer.translateX ( anchorRect.left - coordinates.left + ( anchorRect.width / 2 ) );
          break;

        case 'left':
        case 'right':
          options.$pointer.translateY ( anchorRect.top - coordinates.top + ( anchorRect.height / 2 ) );
          break;

      }

    }

    /* CALLBACK */

    options.callbacks.change ( data );

    /* RETURN */

    return this;

  };

  /* BINDING */

  $.fn.positionate.defaults = defaults;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Embedded CSS
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

/* EMBEDDED CSS */

(function ( $, _, Svelto ) {

  'use strict';

  /* EMBEDDED CSS */

  class EmbeddedCSS {

    constructor () {

      this.$stylesheet = $('<style class="svelto-embedded svelto-embedded-' + ( $.guid++ ) + '">');
      this.tree = {};

    }

    /* PRIVATE */

    _cssfy () {

      let css = '';

      for ( let selector in this.tree ) {

        if ( this.tree.hasOwnProperty ( selector ) ) {

          css += selector + '{';

          if ( _.isPlainObject ( this.tree[selector] ) ) {

            for ( let property in this.tree[selector] ) {

              if ( this.tree[selector].hasOwnProperty ( property ) ) {

                css += property + ':' + this.tree[selector][property] + ';';

              }

            }

          } else if ( _.isString ( this.tree[selector] ) ) {

            css += this.tree[selector] + ';';

          }

          css += '}';

        }

      }

      return css;

    }

    _refresh () {

      this.$stylesheet.text ( this._cssfy () );

    }

    /* API */

    get ( selector ) {

      return this.tree[selector];

    }

    set ( selector, property, value ) {

      if ( property === false ) {

        return this.remove ( selector );

      }

      if ( _.isPlainObject ( property ) ) {

        this.tree[selector] = _.extend ( _.isPlainObject ( this.tree[selector] ) ? this.tree[selector] : {}, property );

      } else if ( _.isString ( property ) ) {

        if ( !value ) {

          this.tree[selector] = property;

        } else {

          return this.set ( selector, { property, value } );

        }

      }

      this._refresh ();

    }

    remove ( selector ) {

      if ( selector in this.tree ) {

        delete this.tree[selector];

        this._refresh ();

      }

    }

    clear () {

      if ( _.size ( this.tree ) ) {

        this.tree = {};

        this._refresh ();

      }

    }

    attach () {

      this.$stylesheet.appendTo ( $(document.head) );

    }

    detach () {

      this.$stylesheet.remove ();

    }

  }

  /* EXPORT */

  Svelto.EmbeddedCSS = new EmbeddedCSS ();

  /* READY */

  $(function () {

    Svelto.EmbeddedCSS.attach ();

  });

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Dropdown
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * @requires ../positionate/positionate.js
 * @requires ../embedded_css/embedded_css.js
 * ========================================================================= */

//TODO: Add support for opening the dropdown relative to a point

(function ( $, _, Svelto, Widgets, Factory, Pointer, EmbeddedCSS, Animations ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'dropdown',
    plugin: true,
    selector: '.dropdown',
    options: {
      positionate: {}, // Extending `$.positionate` options
      spacing: {
        attached: 0,
        noTip: 7,
        normal: 14
      },
      classes: {
        anchorDirection: 'dropdown-anchor-$2',
        noTip: 'no-tip',
        attached: 'attached',
        moving: 'moving',
        show: 'show',
        open: 'open'
      },
      animations: {
        open: Animations.fast,
        close: Animations.fast
      },
      callbacks: {
        beforeopen: _.noop,
        open: _.noop,
        close: _.noop
      }
    }
  };

  /* DROPDOWN */

  class Dropdown extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$dropdown = this.$element;

      this.$dropdown.addClass ( this.guc );

      this.hasTip = !this.$dropdown.hasClass ( this.options.classes.noTip );
      this.isAttached = this.$dropdown.hasClass ( this.options.classes.attached );

      this._isOpen = false;

    }

    _events () {

      if ( this._isOpen ) {

        this.___resize ();
        this.___parentsScroll ();
        this.___layoutTap ();

      }

    }

    _destroy () {

      this.close ();

    }

    /* PARENTS SCROLL */

    ___parentsScroll () {

      let $parents = this.$dropdown.parents ().add ( this.$anchor.parents () ).add ( this.$window );

      this._on ( true, $parents, 'scroll', this._throttle ( this._positionate, 100 ) );

    }

    /* RESIZE */

    ___resize () {

      this._on ( true, this.$window, 'resize', this._throttle ( this._positionate, 100 ) ); //FIXME: It should handle a generic parent `resize`-like event, not just on `this.$window`

    }

    /* LAYOUT TAP */

    ___layoutTap () {

      this._on ( true, this.$layout, Pointer.tap, this.__layoutTap );

    }

    __layoutTap ( event ) {

      if ( event === this._openEvent || this.$dropdown.touching ({ point: $.eventXY ( event )} ).length ) return;

      this.close ();

    }

    /* POSITIONATE */

    _positionate () {

      /* VARIABLES */

      let noTip = this.$anchor.hasClass ( this.options.classes.noTip ) || !this.hasTip || this.isAttached,
          spacing = this.isAttached ? this.options.spacing.attached : ( noTip ? this.options.spacing.noTip : this.options.spacing.normal );

      this.$mockTip = noTip ? false : $('<div>');

      /* POSITIONATE */

      this.$dropdown.positionate ( _.extend ({
        $anchor: this.$anchor,
        $pointer: this.$mockTip,
        spacing: spacing,
        callbacks: {
          change: this.__positionChange.bind ( this )
        }
      }, this.options.positionate ));

    }

    _toggleAnchorDirectonClass ( direction, force ) {

      this.$anchor.toggleClass ( _.format ( this.options.classes.anchorDirection, direction ), force );

    }

    __positionChange ( data ) {

      /* ANCHOR CLASS */

      if ( this._prevDirection !== data.direction ) {

        if ( this._prevDirection ) {

          this._toggleAnchorDirectonClass ( this._prevDirection, false );

        }

        this._toggleAnchorDirectonClass ( data.direction, true );

        this._prevDirection = data.direction;

      }

      /* PSEUDO ELEMENT TIP */

      if ( this.$mockTip ) {

        EmbeddedCSS.set ( '.' + this.guc + ':before', this.$mockTip.attr ( 'style' ).slice ( 0, -1 ) + ' rotate(45deg)' ); //FIXME: Too hacky, expecially that `rotate(45deg)`

      }

    }

    /* API */

    isOpen () {

      return this._isOpen;

    }

    toggle ( force, anchor, event ) {

      if ( !_.isBoolean ( force ) ) {

        force = anchor && ( !this.$anchor || this.$anchor && this.$anchor[0] !== anchor ) ? true : ( this.$prevAnchor || this.$anchor ? !this._isOpen : false );

      }

      this[force ? 'open' : 'close']( anchor, event );

    }

    open ( anchor, event ) {

      /* RESTORING ANCHOR */

      if ( !anchor && this.$prevAnchor ) {

        anchor = this.$prevAnchor[0];

      }

      /* CHECKING */

      if ( this._lock || !anchor || ( this._isOpen && this.$anchor && anchor === this.$anchor[0] ) ) return;

      /* VARIABLES */

      this._lock = true;
      this._isOpen = true;

      this._openEvent = event;
      this._wasMoving = false;

      /* PREVIOUS ANCHOR */

      if ( this.$anchor ) {

        this._toggleAnchorDirectonClass ( this._prevDirection, false );
        this._prevDirection = false;

        this.$prevAnchor = this.$anchor;

        if ( this._isOpen ) {

          this._wasMoving = true;

          this.$dropdown.addClass ( this.options.classes.moving );

        }

      }

      /* ANCHOR */

      this.$anchor = $(anchor);

      /* BEFORE OPENING */

      this._trigger ( 'beforeopen' );

      /* OPENING */

      this._frame ( function () {

        this.$dropdown.addClass ( 'show' );

        this._positionate ();

        this._frame ( function () {

          this.$dropdown.addClass ( this.options.classes.open );

          this._lock = false;

          this._trigger ( 'open' );

        });

      });

      /* EVENTS */

      this._reset ();

      this.___layoutTap ();
      this.___resize ();
      this.___parentsScroll ();

    }

    close () {

      if ( this._lock || !this._isOpen ) return;

      /* VARIABLES */

      this._lock = true;
      this._isOpen = false;

      /* ANCHOR */

      this._toggleAnchorDirectonClass ( this._prevDirection, false );
      this._prevDirection = false;

      this.$prevAnchor = this.$anchor;
      this.$anchor = false;

      /* CLOSING */

      this._frame ( function () {

        this.$dropdown.removeClass ( this.options.classes.open  );

        if ( this._wasMoving ) {

          this.$dropdown.removeClass ( this.options.classes.moving );

        }

        this._delay ( function () {

          this.$dropdown.removeClass ( this.options.classes.show );

          this._lock = false;

          this._trigger ( 'close' );

        }, this.options.animations.close );

      });

      /* RESETTING */

      this._reset ();

    }

  }

  /* FACTORY */

  Factory.init ( Dropdown, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.EmbeddedCSS, Svelto.Animations ));


/* =========================================================================
 * Svelto - Dropdown (Closer)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires dropdown.js
 * @requires ../closer/closer.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'dropdownCloser',
    plugin: true,
    selector: '.dropdown-closer',
    options: {
      widget: Widgets.Dropdown
    }
  };

  /* DROPDOWN CLOSER */

  class DropdownCloser extends Widgets.Closer {}

  /* FACTORY */

  Factory.init ( DropdownCloser, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Opener
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../closer/closer.js
 * @requires ../browser/browser.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Browser, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'opener',
    options: {
      hover: {
        active: false,
        delays: {
          open: 750,
          close: 250
        }
      },
      methods: {
        open: 'open'
      }
    }
  };

  /* OPENER */

  class Opener extends Widgets.Closer {

    /* SPECIAL */

    _events () {

      this.___tap ();
      this.___hover ();

    }

    /* TAP */

    ___tap () {

      this._on ( Pointer.tap, this.__tap );

    }

    __tap ( event ) {

      this.open ( event );

    }

    /* HOVER */

    ___hover () {

      if ( this.options.hover.active && !Browser.is.touchDevice ) {

        this._on ( Pointer.enter, this.__hoverEnter );

      }

    }

    __hoverEnter () {

      if ( !this.isOpen () ) {

        this._isHoverOpen = false;

        this._hoverOpenTimeout = this._delay ( this.__hoverOpen, this.options.hover.delays.open );

        this._one ( true, Pointer.leave, this.__hoverLeave );

      } else if ( this._isHoverOpen ) {

        if ( this._hoverCloseTimeout ) {

          clearTimeout ( this._hoverCloseTimeout );

          this._hoverCloseTimeout = false;

        }

        this._one ( true, Pointer.leave, this.__hoverLeave );

      }

    }

    __hoverOpen () {

      if ( !this.isOpen () ) {

        this.open ();

        this._isHoverOpen = true;

      }

      this._hoverOpenTimeout = false;

    }

    __hoverLeave  () {

      if ( this._hoverOpenTimeout ) {

        clearTimeout ( this._hoverOpenTimeout );

        this._hoverOpenTimeout = false;

      }

      if ( this.isOpen () && this._isHoverOpen ) {

        this._hoverCloseTimeout = this._delay ( this.__hoverClose, this.options.hover.delays.close );

        this._one ( true, this.$target, Pointer.enter, this.__hoverTargetEnter );

      }

    }

    __hoverClose () {

      if ( this.isOpen () && this._isHoverOpen ) {

        this.close ();

      }

      this._isHoverOpen = false;

      this._hoverCloseTimeout = false;

      this._off ( this.$target, Pointer.enter, this.__hoverTargetEnter );

    }

    __hoverTargetEnter () {

      if ( this._hoverCloseTimeout ) {

        clearTimeout ( this._hoverCloseTimeout );

        this._hoverCloseTimeout = false;

      }

      if ( this.isOpen () && this._isHoverOpen ) {

        this._one ( true, this.$target, Pointer.leave, this.__hoverTargetLeave );

      }

    }

    __hoverTargetLeave () {

      if ( this.isOpen () && this._isHoverOpen ) {

        this._hoverCloseTimeout = this._delay ( this.__hoverClose, this.options.hover.delays.close );

        this._one ( true, this.$target, Pointer.enter, this.__hoverTargetEnter );

      }

    }

    /* API */

    open ( event ) {

      return this._targetInstance[this.options.methods.open]( this.element, event );

    }

  }

  /* FACTORY */

  Factory.init ( Opener, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Browser, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Dropdown (Opener)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires dropdown.js
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'dropdownOpener',
    plugin: true,
    selector: '.dropdown-opener',
    options: {
      widget: Widgets.Dropdown
    }
  };

  /* DROPDOWN OPENER */

  class DropdownOpener extends Widgets.Opener {}

  /* FACTORY */

  Factory.init ( DropdownOpener, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Toggler
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'toggler',
    options: {
      methods: {
        toggle: 'toggle'
      }
    }
  };

  /* TOGGLER */

  class Toggler extends Widgets.Opener {

    /* TAP */

    __tap ( event ) {

      this.toggle ( undefined, event );

    }

    /* API */

    toggle ( force, event ) {

      return this._targetInstance[this.options.methods.toggle]( force, this.element, event );

    }

  }

  /* FACTORY */

  Factory.init ( Toggler, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Dropdown (Toggler)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires dropdown.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'dropdownToggler',
    plugin: true,
    selector: '.dropdown-toggler',
    options: {
      widget: Widgets.Dropdown
    }
  };

  /* DROPDOWN TOGGLER */

  class DropdownToggler extends Widgets.Toggler {}

  /* FACTORY */

  Factory.init ( DropdownToggler, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Touching
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../bteach/bteach.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* UTILITIES */

  let getOverlappingArea = function ( rect1, rect2 ) {

    let overlapX = Math.max ( 0, Math.min ( rect1.right, rect2.right ) - Math.max ( rect1.left, rect2.left ) ),
        overlapY = Math.max ( 0, Math.min ( rect1.bottom, rect2.bottom ) - Math.max ( rect1.top, rect2.top ) );

    return overlapX * overlapY;

  };

  /* DEFAULT OPTIONS */

  let defaults = {
    startIndex : false, // Useful for speeding up the searching process if we may already guess the initial position...
    point: false, // Used for the punctual search
    binarySearch: true, // toggle the binary search when performing a punctual search
    $comparer: false, // Used for the overlapping search
    $not: false,
    onlyBest: false
  };

  /* TOUCHING */

  $.fn.touching = function ( options ) {

    /* OPTIONS */

    options = _.extend ( {}, $.fn.touching.defaults, options );

    /* SEARCHABLE */

    let $searchable = options.$not ? this.not ( options.$not ) : this;

    /* COMPARER */

    if ( options.$comparer ) {

      let rect1 = options.$comparer.getRect (),
          nodes = [],
          areas = [];

      for ( let searchable of $searchable ) {

        let rect2 = $.getRect ( searchable ),
            area = getOverlappingArea ( rect1, rect2 );

        if ( area > 0 ) {

          nodes.push ( searchable );
          areas.push ( area );

        }

      }

      return options.onlyBest ? $(nodes[ areas.indexOf ( _.max ( areas ) ) ]) : $(nodes);

    }

    /* PUNCTUAL */

    if ( options.point ) {

      let $touched;

      if ( options.binarySearch ) {

        $searchable.btEach ( function () {

          let rect = $.getRect ( this );

          if ( options.point.Y >= rect.top ) {

            if ( options.point.Y <= rect.bottom ) {

              if ( options.point.X >= rect.left ) {

                if ( options.point.X <= rect.right ) {

                  $touched = $(this);

                  return false;

                } else {

                  return 1;

                }

              } else {

                return -1;

              }

            } else {

              return 1;

            }


          } else {

            return -1;

          }


        }, options.startIndex );

        return $touched || $();

      } else {

        for ( let searchable of $searchable ) {

          let rect = $.getRect ( searchable );

          if ( options.point.Y >= rect.top && options.point.Y <= rect.bottom && options.point.X >= rect.left && options.point.X <= rect.right ) {

            $touched = $(searchable);

            break;

          }

        }

        return $touched || $();

      }

    }

  };

  /* BINDING */

  $.fn.touching.defaults = defaults;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Droppable
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * @requires ../touching/touching.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'droppable',
    plugin: true,
    selector: '.droppable',
    options: {
      selector: '*', // Only Draggables matching this selector will be able to drop inside this Droppable
      classes: {
        target: undefined, // The class to attach to the Droppable if the Draggable can be dropped inside of it
        hover: undefined // The class to attach to the Droppable when hovered by a Draggable
      },
      callbacks: {
        enter: _.noop,
        leave: _.noop,
        drop: _.noop
      }
    }
  };

  /* DROPPABLE */

  class Droppable extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.droppable = this.element;
      this.$droppable = this.$element;

      this.__isCompatible = undefined;
      this._wasHovering = false;

    }

    _events () {

      this.___drag ();

    }

    /* PRIVATE */

    _isCompatible ( element ) {

      if ( _.isUndefined ( this.__isCompatible ) ) {

        this.__isCompatible = $(element).is ( this.options.selector );

        if ( this.__isCompatible ) {

          this.$droppable.addClass ( this.options.classes.target );

        }

      }

      return this.__isCompatible;

    }

    _isPointHovering ( pointXY ) {

      return !!this.$droppable.touching ({ point: pointXY }).length;

    }

    /* DRAG */

    ___drag () {

      this.___dragMove ();
      this.___dragEnd ();

    }

    /* DRAG MOVE */

    ___dragMove () {

      this._on ( this.$layout, 'draggable:move', this._throttle ( this.__dragMove, 100 ) );

    }

    __dragMove ( event, data ) {

      if ( this._isCompatible ( data.draggable ) ) {

        let isHovering = this._isPointHovering ( data.moveXY );

        if ( isHovering !== this._wasHovering ) {

          this.$droppable.toggleClass ( this.options.classes.hover, isHovering );

          this._trigger ( isHovering ? 'enter' : 'leave', { draggable: data.draggable, helper: data.helper, droppable: this.droppable } );

        }

        this._wasHovering = isHovering;

      }

    }

    /* DRAG END */

    ___dragEnd () {

      this._on ( this.$layout, 'draggable:end', this.__dragEnd );

    }

    __dragEnd ( event, data ) {

      if ( this._isCompatible ( data.draggable ) ) {

        this.$droppable.removeClass ( this.options.classes.target );

        if ( this._isPointHovering ( data.endXY ) ) {

          if ( this._wasHovering ) {

            this.$droppable.removeClass ( this.options.classes.hover );

          }

          this._trigger ( 'drop', { draggable: data.draggable, helper: data.helper, droppable: this.droppable } );

        }

      }

      this.__isCompatible = undefined;

    }

  }

  /* FACTORY */

  Factory.init ( Droppable, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Expander (Closer)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires expander.js
 * @requires ../closer/closer.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'expanderCloser',
    plugin: true,
    selector: '.expander-closer',
    options: {
      widget: Widgets.Expander
    }
  };

  /* EXPANDER CLOSER */

  class ExpanderCloser extends Widgets.Closer {}

  /* FACTORY */

  Factory.init ( ExpanderCloser, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Expander (Opener)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires expander.js
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'expanderOpener',
    plugin: true,
    selector: '.expander-opener',
    options: {
      widget: Widgets.Expander
    }
  };

  /* EXPANDER OPENER */

  class ExpanderOpener extends Widgets.Opener {}

  /* FACTORY */

  Factory.init ( ExpanderOpener, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Expander (Toggler)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires expander.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'expanderToggler',
    plugin: true,
    selector: '.expander-toggler',
    options: {
      widget: Widgets.Expander
    }
  };

  /* EXPANDER TOGGLER */

  class ExpanderToggler extends Widgets.Toggler {}

  /* FACTORY */

  Factory.init ( ExpanderToggler, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Flickable
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'flickable',
    plugin: true,
    selector: '.flickable',
    options: {
      duration: 150, // Maximum duration of the flick gesture
      threshold: 5, // Minimum moving treshold of the flick gesture
      callbacks: {
        flick: _.noop
      }
    }
  };

  /* FLICKABLE */

  class Flickable extends Widgets.Widget {

    /* SPECIAL */

    _events () {

      this.___down ();

    }

    /* DOWN */

    ___down () {

      this._on ( Pointer.down, this.__down );

    }

    __down ( event ) {

      this._startXY = $.eventXY ( event );
      this._startTimestamp = event.timeStamp || Date.now ();

      this._motion = false;

      this.___move ();
      this.___up ();
      this.___cancel ();

    }

    /* MOVE */

    ___move () {

      this._one ( true, this.$document, Pointer.move, this.__move );

    }

    __move () {

      this._motion = true;

    }

    /* UP */

    ___up () {

      this._one ( true, this.$document, Pointer.up, this.__up );

    }

    __up ( event ) {

      this._endTimestamp = event.timeStamp || Date.now ();

      if ( this._motion && ( this._endTimestamp - this._startTimestamp <= this.options.duration ) ) {

        let endXY = $.eventXY ( event ),
            deltaXY = {
              X: endXY.X - this._startXY.X,
              Y: endXY.Y - this._startXY.Y
            },
            absDeltaXY = {
              X: Math.abs ( deltaXY.X ),
              Y: Math.abs ( deltaXY.Y )
            };

        if ( absDeltaXY.X >= this.options.threshold || absDeltaXY.Y >= this.options.threshold ) {

          let orientation,
              direction;

          if ( absDeltaXY.X > absDeltaXY.Y ) {

            orientation = 'horizontal';
            direction = ( deltaXY.X > 0 ) ? 'right' : 'left';

          } else {

            orientation = 'vertical';
            direction = ( deltaXY.Y > 0 ) ? 'bottom' : 'top';

          }

          this._trigger ( 'flick', {
            orientation: orientation,
            direction: direction,
            startEvent: this._startEvent,
            startXY: this._startXY,
            endEvent: event,
            endXY: endXY
          });

        }

      }

      if ( !this._motion ) {

        this._off ( this.$document, Pointer.move, this.__move );

      }

      this._off ( this.$document, Pointer.cancel, this.__cancel );

    }

    /* CANCEL */

    ___cancel () {

      this._one ( true, this.$document, Pointer.cancel, this.__cancel );

    }

    __cancel () {

      if ( !this._motion ) {

        this._off ( this.$document, Pointer.move, this.__move );

      }

      this._off ( this.$document, Pointer.up, this.__up );

    }

  }

  /* FACTORY */

  Factory.init ( Flickable, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Flippable
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'flippable',
    plugin: true,
    selector: '.flippable',
    options: {
      classes: {
        flip: 'flipped' 
      },
      callbacks: {
        front: _.noop,
        back: _.noop
      }
    }
  };

  /* FLIPPABLE */

  class Flippable extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$flippable = this.$element;

      this._isFlipped = this.$flippable.hasClass ( this.options.classes.flip );

    }

    /* API */

    isFlipped () {

      return this._isFlipped;

    }

    flip ( force = !this._isFlipped ) {

      if ( !!force !== this._isFlipped ) {

        this._isFlipped = force;

        this.$flippable.toggleClass ( this.options.classes.flip, this._isFlipped );

        this._trigger ( this._isFlipped ? 'back' : 'front' );

      }

    }

    front () {

      this.flip ( false );

    }

    back () {

      this.flip ( true );

    }

  }

  /* FACTORY */

  Factory.init ( Flippable, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Flippable (Flipper)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires flippable.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'flippableFlipper',
    plugin: true,
    selector: '.flippable-flipper',
    options: {
      widget: Widgets.Flippable,
      methods: {
        toggle: 'flip',
        open: 'front',
        close: 'back'
      }
    }
  };

  /* FLIPPABLE FLIPPER */

  class FlippableFlipper extends Widgets.Toggler {}

  /* FACTORY */

  Factory.init ( FlippableFlipper, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Overlay
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * @requires ../animations/animations.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Animations ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'overlay',
    plugin: true,
    selector: '.overlay',
    options: {
      classes: {
        show: 'show',
        open: 'open'
      },
      animations: {
        open: Animations.fast,
        close: Animations.fast
      },
      keystrokes: {
        'esc': 'close'
      },
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    }
  };

  /* OVERLAY */

  class Overlay extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$overlay = this.$element;

      this._isOpen = this.$overlay.hasClass ( this.options.classes.open );

    }

    _events () {

      if ( this._isOpen ) {

        this.___keydown ();

      }

    }

    /* KEYDOWN */

    ___keydown () {

      this._onHover ( true, [this.$document, 'keydown', this.__keydown] ); //FIXME: Using _onHover in an undocumented way, the first value was supposed to be $element

    }

    /* API */

    isOpen () {

      return this._isOpen;

    }

    toggle ( force = !this._isOpen ) {

      if ( !!force !== this._isOpen ) {

        this[force ? 'open' : 'close']();

      }

    }

    open () {

      if ( this._lock || this._isOpen ) return;

      this._lock = true;
      this._isOpen = true;

      this._frame ( function () {

        this.$overlay.addClass ( this.options.classes.show );

        this._frame ( function () {

          this.$overlay.addClass ( this.options.classes.open );

          this._lock = false;

          this._trigger ( 'open' );

        });

      });

      this.___keydown ();

    }

    close () {

      if ( this._lock || !this._isOpen ) return;

      this._lock = true;
      this._isOpen = false;

      this._frame ( function () {

        this.$overlay.removeClass ( this.options.classes.open );

        this._delay ( function () {

          this.$overlay.removeClass ( this.options.classes.show );

          this._lock = false;

          this._trigger ( 'close' );

        }, this.options.animations.close );

      });

      this._reset ();

    }

  }

  /* FACTORY */

  Factory.init ( Overlay, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Animations ));


/* =========================================================================
 * Svelto - Spinner Overlay
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../overlay/overlay.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'spinnerOverlay',
    plugin: true,
    templates: {
      overlay: '<div class="overlay spinner-overlay {%=(o.dimmer ? "dimmer" : "")%} {%=(o.blurrer ? "blurrer" : "")%}">' +
                 '{% if ( o.labeled ) { %}' +
                   '<div class="spinner-label {%=(o.multicolor ? "" : o.colors.labeled)%}">' +
                 '{% } %}' +
                   '<svg class="spinner {%=(o.multicolor ? "multicolor" : ( o.labeled ? "" : o.unlabeled ))%}">' +
                     '<circle cx="1.625em" cy="1.625em" r="1.25em">' +
                   '</svg>' +
                 '{% if ( o.labeled ) { %}' +
                   '</div>' +
                 '{% } %}' +
               '</div>'
    },
    options: {
      labeled: true,
      dimmer: false,
      blurrer: false,
      multicolor: false,
      colors: {
        labeled: 'white',
        unlabeled: 'secondary'
      },
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    }
  };

  /* SPINNER OVERLAY */

  class SpinnerOverlay extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$overlayed = this.$element;
      this.$overlay = $(this._tmpl ( 'overlay', this.options ));

      this.instance = this.$overlay.overlay ( 'instance' );

    }

    /* API */

    isOpen () {

      return this.instance.isOpen ();

    }

    toggle ( force = !this.isOpen () ) {

      if ( !!force !== this.isOpen () ) {

        this[force ? 'open' : 'close']();

      }

    }

    open () {

      if ( this._lock || this.isOpen () ) return;

      this.$overlay.prependTo ( this.$overlayed );

      this.instance.open ();

      this._trigger ( 'open' );

    }

    close () {

      if ( this._lock || !this.isOpen () ) return;

      this._lock = true;

      this.instance.close ();

      this._delay ( function () {

        this.$overlay.detach ();

        this._lock = false;

        this._trigger ( 'close' );

      }, Widgets.Overlay.config.options.animations.close );

    }

  }

  /* FACTORY */

  Factory.init ( SpinnerOverlay, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Noty
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * @requires ../timer/timer.js
 * @requires ../animations/animations.js
 * ========================================================================= */

//TODO: Add better support for swipe to dismiss
//TODO: Clicking it from a iPod touch makes the click go through it (just on Chrome, not Safari)

(function ( $, _, Svelto, Widgets, Factory, Pointer, Timer, Animations ) {

  'use strict';

  /* VARIABLES */

  let openNotiesData = {};

  /* CONFIG */

  let config = {
    name: 'noty',
    plugin: true,
    selector: '.noty',
    templates: {
      base: '<div class="noty {%=o.type%} {%=(o.type !== "action" ? "actionable" : "")%} {%=o.color%} {%=o.css%}">' +
              '<div class="infobar">' +
                '{% if ( o.img ) { %}' +
                  '<img src="{%=o.img%}" class="noty-img infobar-left">' +
                '{% } %}' +
                '{% if ( o.title || o.body ) { %}' +
                  '<div class="infobar-center">' +
                    '{% if ( o.title ) { %}' +
                      '<p class="infobar-title">' +
                         '{%#o.title%}' +
                       '</p>' +
                    '{% } %}' +
                    '{% if ( o.body ) { %}' +
                      '{%#o.body%}' +
                    '{% } %}' +
                  '</div>' +
                '{% } %}' +
                '{% if ( o.buttons.length === 1 ) { %}' +
                  '<div class="infobar-right">' +
                    '{% include ( "noty.button", o.buttons[0] ); %}' +
                  '</div>' +
                '{% } %}' +
              '</div>' +
              '{% if ( o.buttons.length > 1 ) { %}' +
                '<div class="noty-buttons multiple centered">' +
                  '{% for ( var i = 0; i < o.buttons.length; i++ ) { %}' +
                    '{% include ( "noty.button", o.buttons[i] ); %}' +
                  '{% } %}' +
                '</div>' +
              '{% } %}' +
            '</div>',
      button: '<div class="button {%=(o.color || "white")%} {%=(o.size || "small")%} {%=(o.css || "")%}">' +
                '{%#(o.text || "")%}' +
              '</div>'
    },
    options: {
      anchor: { // Used for selecting the proper queue where this Noty should be attached
        x: 'left',
        y: 'bottom'
      },
      title: false,
      body: false,
      img: false,
      buttons: [],
      /*
             : [{
                color: 'white',
                size: 'small',
                css: '',
                text: '',
                onClick: _.noop // If it returns `false` the Noty won't be closed
             }],
      */
      type: 'alert',
      color: 'black',
      css: '',
      persistent: false, // Wether it should survive a change of page or not. Needed when used in frameworks like Meteor
      autoplay: true,
      ttl: 3500,
      ttlMinimumRemaining: 1000, // Auto-closing will be stopped on hover and started again on leave, with a remaining time of `Math.min ( what the remaining time was, this option )`;
      classes: {
        open: 'open'
      },
      selectors: {
        queues: '.noty-queues',
        queue: '.noty-queue',
        button: '.noty-buttons .button, .infobar-right .button'
      },
      animations: {
        open: Animations.normal,
        close: Animations.normal
      },
      keystrokes: {
        'esc': 'close'
      },
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    }
  };

  /* HELPER */

  $.noty = function ( options = {} ) {

    /* OPTIONS */

    options = _.isString ( options ) ? { body: options } : options;

    /* TYPE */

    if ( options.buttons ) {

      options.type = 'action';

    }

    /* NOTY */

    return new Noty ( options );

  };

  /* NOTY */

  class Noty extends Widgets.Widget {

    /* SPECIAL */

    static ready () {

      $('.layout, body').first ().append ( //TODO: Use just `.layout`
        '<div class="noty-queues top">' +
          '<div class="noty-queue expanded"></div>' +
          '<div class="noty-queues-row">' +
            '<div class="noty-queue left"></div>' +
            '<div class="noty-queue center"></div>' +
            '<div class="noty-queue right"></div>' +
          '</div>' +
        '</div>' +
        '<div class="noty-queues bottom">' +
          '<div class="noty-queues-row">' +
            '<div class="noty-queue left"></div>' +
            '<div class="noty-queue center"></div>' +
            '<div class="noty-queue right"></div>' +
          '</div>' +
          '<div class="noty-queue expanded"></div>' +
        '</div>'
      );

    }

    _variables () {

      this.$noty = this.$element;
      this.$buttons = this.$noty.find ( this.options.selectors.button );

      this.timer = false;
      this._openUrl = false;

      this._isOpen = this.$noty.hasClass ( this.options.classes.open );

    }

    _init () {

      if ( this._isOpen ) {

        this.___timer ();
        this.___tap ();
        this.___flick ();
        this.___buttonTap ();
        this.___hover ();
        this.___persistent ();
        this.___keydown ();
        this.___breakpoint ();

      } else if ( this.options.autoplay ) {

        this.open ();

      }

    }

    /* PRIVATE */

    _getUrl () {

      return window.location.href.split ( '#' )[0];

    }

    /* TIMER */

    ___timer () {

      if ( this.options.type !== 'action' && _.isNumber ( this.options.ttl ) && !_.isNaN ( this.options.ttl ) && this.options.ttl !== Infinity ) {

        if ( !this.timer ) {

          this.timer = new Timer ( this.close.bind ( this ), this.options.ttl, true );

        } else {

          this.timer.reset ();

        }

        openNotiesData[this.guid] = [this.timer, this.options.ttlMinimumRemaining];

      }

    }

    /* TAP */

    ___tap () {

      if ( this.options.type !== 'action' ) {

        this._on ( Pointer.tap, this.close );

      }

    }

    /* BUTTON TAP */

    ___buttonTap () {

      this._on ( this.$buttons, Pointer.tap, this.__buttonTap );

    }

    __buttonTap ( event, data ) {

      let $button = $(event.target),
          index = this.$buttons.index ( $button ),
          buttonObj = this.options.buttons[index];

      if ( buttonObj.onClick ) {

        if ( buttonObj.onClick.apply ( $button[0], [event, data] ) === false ) return;

      }

      this.close ();

    }

    /* HOVER */

    ___hover () {

      this.$noty.hover ( function () {

        _.forIn ( openNotiesData, data => data[0].pause () );

      }, function () {

        _.forIn ( openNotiesData, data => data[0].remaining ( Math.max ( data[1], data[0].remaining () ) ).play () );

      });

    }

    /* FLICK */

    ___flick () {

      if ( this.options.type !== 'action' ) {

        this.$noty.flickable ({
          callbacks: {
            flick: this.__flick.bind ( this )
          }
        });

      }

    }

    __flick ( event, data ) {

      if ( data.orientation === 'horizontal' ) {

        this.close ();

      }

    }

    /* PERSISTENT */

    ___persistent () {

      if ( !this.options.persistent ) {

        super.___route ();

      }

    }

    __route () {

      let currentUrl = this._getUrl ();

      if ( this._openUrl && this._openUrl !== currentUrl ) {

        this.close ();

      }

    }

    /* RESET */

    _reset () {

      /* EVENTS */

      this.$bindings.off ( this.eventNamespace );

      /* TIMER */

      delete openNotiesData[this.guid];

      /* FLICK */

      this.$noty.flickable ( 'destroy' );

    }

    /* API */

    isOpen () {

      return this._isOpen;

    }

    open () {

      if ( this._lock || this._isOpen ) return;

      this._lock = true;
      this._isOpen = true;

      this._frame ( function () {

        $(this.options.selectors.queues + '.' + this.options.anchor.y + ' ' + this.options.selectors.queue + '.' + this.options.anchor.x).append ( this.$noty );

        this._frame ( function () {

          this.$noty.addClass ( this.options.classes.open );

          this._lock = false;

          this._trigger ( 'open' );

        });

      });

      this.___timer ();
      this.___tap ();
      this.___flick ();
      this.___buttonTap ();
      this.___hover ();
      this.___persistent ();
      this.___keydown ();
      this.___breakpoint ();

      this._defer ( function () {

        this._openUrl = this._getUrl ();

      });

    }

    close () {

      if ( this._lock || !this._isOpen ) return;

      this._lock = true;
      this._isOpen = false;
      this._openUrl = false;

      this._frame ( function () {

        this.$noty.removeClass ( this.options.classes.open );

        this._delay ( function () {

          this.$noty.remove ();

          this._lock = false;

          this._trigger ( 'close' );

        }, this.options.animations.close );

      });

      this._reset ();

    }

  }

  /* FACTORY */

  Factory.init ( Noty, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Timer, Svelto.Animations ));


/* =========================================================================
 * Svelto - Regexes
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* REGEXES */

  let Regexes = {

    /* TYPE */

    alpha: /^[a-zA-Z]+$/,
    alphanumeric: /^[a-zA-Z0-9]+$/,
    hexadecimal: /^[a-fA-F0-9]+$/,
    integer: /^(?:-?(?:0|[1-9][0-9]*))$/,
    float: /^-?(?:(?:\d+)(?:\.\d*)?|(?:\.\d+)+)$/,

    /* THINGS */

    email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
    cc: /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
    ssn: /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/,
    ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
    url: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i

  };

  /* EXPORT */

  Svelto.Regexes = Regexes;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Validator
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * @requires ../regexes/regexes.js
 * ========================================================================= */

// `value` is supposed to be a string
// Strings will be trimmed inside some validators

(function ( $, _, Svelto, Regexes ) {

  'use strict';

  /* VALIDATOR */

  let Validator = {

    /* TYPE */

    alpha ( value ) {
      return !!value.match ( Regexes.alpha );
    },
    alphanumeric ( value ) {
      return !!value.match ( Regexes.alphanumeric );
    },
    hexadecimal ( value ) {
      return !!value.match ( Regexes.hexadecimal );
    },
    number ( value ) {
      return !!value.match ( Regexes.integer ) || !!value.match ( Regexes.float );
    },
    integer ( value ) {
      return !!value.match ( Regexes.integer );
    },
    float ( value ) {
      return !!value.match ( Regexes.float );
    },

    /* NUMBER */

    min ( value, min ) {
      return ( Number ( value ) >= Number ( min ) );
    },
    max ( value, max ) {
      return ( Number ( value ) <= Number ( max ) );
    },
    range ( value, min, max ) {
      value = Number ( value );
      return ( value >= Number ( min ) && value <= Number ( max ) );
    },

    /* LENGTH */

    minLength ( value, minLength ) {
      return ( value.trim ().length >= Number ( minLength ) );
    },
    maxLength ( value, maxLength ) {
      return ( value.trim ().length <= Number ( maxLength ) );
    },
    rangeLength ( value, minLength, maxLength ) {
      value = value.trim ();
      return ( value.length >= Number ( minLength ) && value.length <= Number ( maxLength ) );
    },
    exactLength ( value, length ) {
      return ( value.trim ().length === Number ( length ) );
    },

    /* THINGS */

    email ( value ) {
      return !!value.match ( Regexes.email );
    },
    cc ( value ) {
      return !!value.match ( Regexes.cc );
    },
    ssn ( value ) {
      return !!value.match ( Regexes.ssn );
    },
    ipv4 ( value ) {
      return !!value.match ( Regexes.ipv4 );
    },
    url ( value ) {
      return !!value.match ( Regexes.url );
    },

    /* OTHERS */

    empty ( value ) {
      return _.isEmpty ( value.trim () );
    },
    included ( value, values ) {
      value = value.toLowerCase ();
      values = values.map ( value => value.toLowerCase () );
      return _.includes ( values, value );
    }

  };

  /* EXPORT */

  Svelto.Validator = Validator;

}( Svelto.$, Svelto._, Svelto, Svelto.Regexes ));


/* =========================================================================
 * Svelto - formValidate
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * @requires ../validator/validator.js
 * @requires ../noty/noty.js
 * ========================================================================= */

//TODO: Add meta validators that accepts other validators as arguments, for example not[email], oppure not[matches[1,2,3]] oppure or[email,url] etc... maybe write it this way: or[matches(1-2-3)/matches(a-b-c)], or just use a smarter regex

(function ( $, _, Svelto, Widgets, Factory, Validator ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'formValidate',
    plugin: true,
    selector: 'form.validate',
    templates: {
      message: '<p class="form-validate-message {%=o.validity%}">' +
                 '{%=o.message%}' +
               '</p>',
      messages: '<ul class="form-validate-message {%=o.validity%}">' +
                  '{% for ( var i = 0, l = o.messages.length; i < l; i++ ) { %}' +
                    '<li>{%=o.messages[i]%}</li>' +
                  '{% } %}' +
                '</ul>'
    },
    options: {
      validators: { // If not found here it will use `Validator`'s validators
        required ( value ) {
          return !Validator.empty ( value );
        },
        values ( value, ...values ) {
          return Validator.included ( value, values );
        },
        field ( value, fieldName ) {
          let fieldValue = _.find ( this.elements, { name: fieldName } ).value;
          return ( value === fieldValue );
        },
        checked () {
          return this.element.$element.prop ( 'checked' );
        }
      },
      messages: {
        form: {
          invalid: 'The form contains some errors',
        },
        validators: {
          invalid: {
            general: 'This value is not valid',
            alpha: 'Only alphabetical characters are allowed',
            alphanumeric: 'Only alphanumeric characters are allowed',
            hexadecimal: 'Only hexadecimal characters are allowed',
            number: 'Only numbers are allowed',
            integer: 'Only integers numbers are allowed',
            float: 'Only floating point numbers are allowed',
            min: 'The number must be at least $2',
            max: 'The number must be at maximum $2',
            range: 'The number must be between $2 and $3',
            minLength: 'The lenght must be at least $2',
            maxLength: 'The lenght must be at maximum $2',
            rangeLength: 'The length must be between $2 and $3',
            exactLength: 'The length must be exactly $2',
            email: 'Enter a valid email address',
            cc: 'Enter a valid credit card number',
            ssn: 'Enter a valid Social Security Number',
            ipv4: 'Enter a valid IPv4 address',
            url: 'Enter a valid URL',
            required: 'This field is required',
            values: 'This value is not allowed',
            field: 'The two fields don\'t match',
            checked: 'This must be checked'
          }
        }
      },
      characters: {
        separators: {
          validations: '|',
          arguments: ','
        }
      },
      regexes: {
        validation: /^([^\[]+)(?:\[(.*)\])?$/
      },
      datas: {
        id: '_fveid',
        validations: 'validations',
        messages: {
          invalid: 'invalid',
          valid: 'valid'
        }
      },
      classes: {
        invalid: 'invalid',
        valid: 'valid'
      },
      selectors: {
        element: 'input:not([type="button"]), textarea, select',
        textfield: 'input:not([type="button"]):not([type="checkbox"]):not([type="radio"]), textarea',
        wrapper: '.checkbox, .colorpicker, .datepicker, .radio, .select-toggler, .slider, .switch'
      }
    }
  };

  /* FORM VALIDATE */

  class FormValidate extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$form = this.$element;
      this.$elements = this.$form.find ( this.options.selectors.element );
      this.$textfields = this.$elements.filter ( this.options.selectors.textfield );

      this.___elements ();

    }

    _events () {

      this.___change ();
      this.___focus ();
      this.___blur ();
      this.___submit ();

    }

    /* ELEMENTS */

    ___elements () {

      this.elements = {};

      for ( let element of this.$elements ) {

        let $element = $(element),
            $wrappers = $element.parents ( this.options.selectors.wrapper ),
            $wrapper = $wrappers.length ? $wrappers.first () : $element,
            id = $.guid++,
            validationsStr = $element.data ( this.options.datas.validations ),
            validations = false;

        if ( validationsStr ) {

          validations = {};

          let validationsArr = validationsStr.split ( this.options.characters.separators.validations );

          for ( let validationStr of validationsArr ) {

            let matches = validationStr.match ( this.options.regexes.validation );

            if ( !matches ) continue;

            let validationName = matches[1],
                validationArgs = matches[2] ? matches[2].split ( this.options.characters.separators.arguments ) : [],
                validator = this.options.validators[validationName] || Validator[validationName];

            if ( !validator ) continue;

            validations[validationName] = {
              args: validationArgs,
              validator: validator
            };

          }

          if ( _.isEmpty ( validations ) ) {

            validations = false;

          }

        }

        element[this.options.datas.id] = id;

        this.elements[id] = {
          id: id,
          $element: $element,
          $wrapper: $wrapper,
          $message: false,
          name: element.name,
          value: $element.val (),
          validations: validations,
          isDirty: false,
          isValid: undefined,
          messages: {
            invalid: $wrapper.data ( this.options.datas.messages.invalid ),
            valid: $wrapper.data ( this.options.datas.messages.valid )
          }
        };

      }

    }

    /* CHANGE */

    ___change () {

      this._on ( true, this.$elements, 'change', this.__change );

    }

    __change ( event ) {

      /* FORM */

      this._isValid = undefined;

      /* ELEMENT */

      let elementObj = this.elements[event.currentTarget[this.options.datas.id]];

      elementObj.isDirty = true;
      elementObj.isValid = undefined;

      this._validateWorker ( elementObj );

      /* OTHERS */

      for ( let id in this.elements ) {

        if ( this.elements.hasOwnProperty ( id ) ) {

          if ( id === elementObj.id ) continue;

          let otherElementObj = this.elements[id],
              isDepending = otherElementObj.validations && 'field' in otherElementObj.validations && otherElementObj.validations.field.args.indexOf ( elementObj.name ) !== -1,
              hasSameName = !_.isEmpty ( elementObj.name ) && otherElementObj.name === elementObj.name;

          if ( isDepending || hasSameName ) {

            otherElementObj.isValid = undefined;

            this._validateWorker ( otherElementObj );

          }

        }

      }

    }

    /* FOCUS */

    ___focus () {

      this._on ( this.$textfields, 'focus', this.__focus );

    }

    __focus ( event ) {

      let elementObj = this.elements[event.currentTarget[this.options.datas.id]];

      elementObj.isValid = undefined;

      this.__indeterminate ( elementObj );

    }

    /* BLUR */

    ___blur () {

      this._on ( this.$textfields, 'blur', this.__blur );

    }

    __blur ( event ) {

      let elementObj = this.elements[event.currentTarget[this.options.datas.id]];

      this._validateWorker ( elementObj );

    }

    /* SUBMIT */

    ___submit () {

      this._on ( true, 'submit', this.__submit );

    }

    __submit ( event ) {

      if ( !this.isValid () ) {

        event.preventDefault ();
        event.stopImmediatePropagation ();

        $.noty ( this.options.messages.form.invalid );

      }

    }

    /* VALIDATION */

    _validateWorker ( elementObj ) {

      if ( _.isUndefined ( elementObj.isValid ) ) {

        let result = this._validate ( elementObj ),
            isValid = ( result === true );

        elementObj.isValid = isValid;

        if ( isValid ) {

          this.__valid ( elementObj );

        } else {

          this.__invalid ( elementObj, result );

        }

      }

    }

    _validate ( elementObj ) {

      let errors = [],
          validations = elementObj.validations;

      if ( elementObj.isDirty ) {

        elementObj.value = elementObj.$element.val ();

        elementObj.isDirty = false;

      }

      if ( validations ) {

        for ( let name in validations ) {

          if ( validations.hasOwnProperty ( name ) ) {

            let validation = validations[name],
                isValid = validation.validator.apply ( { elements: this.elements, element: elementObj }, [elementObj.value].concat ( validation.args ) );

            if ( !isValid ) {

              let error = _.format ( this.options.messages.validators.invalid[name] || this.options.messages.validators.invalid.general, elementObj.value, ...validation.args );

              errors.push ( error );

            }

          }

        }

      }

      return _.isEmpty ( errors ) ? true : errors;

    }

    /* STATE */

    __indeterminate ( elementObj ) {

      elementObj.$wrapper.removeClass ( this.options.classes.invalid + ' ' + this.options.classes.valid );

      this._updateMessage ( elementObj, false );

    }

    __valid ( elementObj ) {

      elementObj.$wrapper.removeClass ( this.options.classes.invalid ).addClass ( this.options.classes.valid );

      this._updateMessage ( elementObj, elementObj.messages.valid );

    }

    __invalid ( elementObj, errors ) {

      elementObj.$wrapper.removeClass ( this.options.classes.valid ).addClass ( this.options.classes.invalid );

      this._updateMessage ( elementObj, elementObj.messages.invalid || errors );

    }

    /* ERRORS */

    _updateMessage ( elementObj, message ) {

      if ( elementObj.$message ) {

        elementObj.$message.remove ();

      }

      if ( message ) {

        let validity = elementObj.isValid ? this.options.classes.valid : this.options.classes.invalid,
            msgHtml = _.isString ( message )
                        ? this._tmpl ( 'message', { message: message, validity: validity } )
                        : message.length === 1
                          ? this._tmpl ( 'message', { message: message[0], validity: validity } )
                          : this._tmpl ( 'messages', { messages: message, validity: validity } );

        elementObj.$message = $(msgHtml);

        elementObj.$wrapper.after ( elementObj.$message );

      } else {

        elementObj.$message = false;

      }

    }

    /* API */

    isValid () {

      if ( _.isUndefined ( this._isValid ) ) {

        for ( let id in this.elements ) {

          if ( this.elements.hasOwnProperty ( id ) ) {

            let elementObj = this.elements[id];

            if ( _.isUndefined ( elementObj.isValid ) ) {

              this._validateWorker ( elementObj );

            }

            if ( !elementObj.isValid ) {

              this._isValid = false;

            }

          }

        }

        if ( _.isUndefined ( this._isValid ) ) {

          this._isValid = true;

        }

      }

      return this._isValid;

    }

  }

  /* FACTORY */

  Factory.init ( FormValidate, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Validator ));


/* =========================================================================
 * Svelto - Form Ajax
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../spinner_overlay/spinner_overlay.js
 * @requires ../noty/noty.js
 * @requires ../form_validate/form_validate.js
 * ========================================================================= */

//TODO: Add a way to abort it, maybe hovering the spinner a clickable X will be displayed and abort the request if tapped (or something more intuitive and easier to implement...)
//TODO: Test it with `input[type="file"]`

//FIXME: `formValidate` is listed as a requirement just because it need to be executed before `formAjax`

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'formAjax',
    plugin: true,
    selector: 'form.ajax',
    options: {
      spinnerOverlay: true, // Enable/disable the `spinnerOverlay`, if disabled one can use the triggered events in order to provide a different visual feedback to the user
      timeout: 31000, // 1 second more than the default value of PHP's `max_execution_time` setting
      messages: {
        error: 'An error occurred, please try again later',
        success: 'Done! A page refresh may be needed',
        refreshing: 'Done! Refreshing the page...',
        redirecting: 'Done! Redirecting...'
      },
      callbacks: {
        beforesend: _.noop,
        error: _.noop,
        success: _.noop,
        complete: _.noop
      }
    }
  };

  /* FORM AJAX */

  class FormAjax extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.form = this.element;
      this.$form = this.$element;

    }

    _events () {

      this.___submit ();

    }

    /* PRIVATE */

    ___submit () {

      this._on ( true, 'submit', this.__submit );

    }

    __submit ( event ) {

      event.preventDefault ();
      event.stopImmediatePropagation ();

      $.ajax ({

        cache: false,
        contentType: false,
        data: new FormData ( this.form ),
        processData: false,
        timeout: this.options.timeout,
        type: this.$form.attr ( 'method' ) || 'POST',
        url: this.$form.attr ( 'action' ),

        beforeSend: () => {

          if ( this.options.spinnerOverlay ) {

            this.$form.spinnerOverlay ( 'open' );

          }

          this._trigger ( 'beforesend' );

        },

        error: ( res ) => {

          let resj = _.attempt ( JSON.parse, res );

          if ( !_.isError ( resj ) ) {

            $.noty ( resj.msg || this.options.messages.error );

          } else {

            $.noty ( this.options.messages.error );

          }

          this._trigger ( 'error' );

        },

        success: ( res ) => {

          let resj = _.attempt ( JSON.parse, res );

          if ( !_.isError ( resj ) ) {

            if ( resj.refresh || resj.url === window.location.href || _.trim ( resj.url, '/' ) === _.trim ( window.location.pathname, '/' ) ) {

              $.noty ( resj.msg || this.options.messages.refreshing );

              location.reload ();

            } else if ( resj.url ) {

              // In order to redirect to another domain the protocol must be provided. For instance `http://www.domain.tld` will work while `www.domain.tld` won't

              $.noty ( resj.msg || this.options.messages.redirecting );

              location.assign ( resj.url );

            } else {

              $.noty ( resj.msg || this.options.messages.success );

            }

          } else {

            $.noty ( this.options.messages.success );

          }

          this._trigger ( 'success' );

        },

        complete: () => {

          if ( this.options.spinnerOverlay ) {

            this.$form.spinnerOverlay ( 'close' );

          }

          this._trigger ( 'complete' );

        }

      });

    }

  }

  /* FACTORY */

  Factory.init ( FormAjax, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Form Sync
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

//TODO: Maybe add the ability to trigger a sync when widgetizing a new form in the group, so that if we are appending a new one it gets synced (as a base or not, if not maybe we can get a data-target or the first of othe others in the group as a base)

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'formSync',
    plugin: true,
    selector: 'form[data-sync-group]',
    options: {
      live: false, // Basically it triggers the syncing also when the `input` event is fired
      attributes: {
        name: 'name'
      },
      datas: {
        group: 'sync-group'
      },
      selectors: {
        form: 'form',
        elements: 'input:not([type="button"]), textarea, select',
        checkable: '[type="radio"], [type="checkbox"]',
        radio: '[type="radio"]',
        checkbox: '[type="checkbox"]',
        textfield: 'input:not([type="button"]):not([type="checkbox"]):not([type="radio"]), textarea'
      }
    }
  };

  /* FORM SYNC */

  class FormSync extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$form = this.$element;
      this.$elements = this.$form.find ( this.options.selectors.elements );

      this.group = this.$form.data ( this.options.datas.group );

    }

    _events () {

      this.___change ();
      this.___input ();

    }

    /* CHANGE */

    ___change () {

      this._on ( true, this.$elements, 'change', this._debounce ( this.__sync, 100 ) );

    }

    /* INPUT */

    ___input () {

      if ( this.options.live ) {

        let $textfields = this.$elements.filter ( this.options.selectors.textfield );

        this._on ( true, $textfields, 'input', this._debounce ( this.__sync, 100 ) );

      }

    }

    /* SYNC */

    __sync ( event, data ) {

      if ( data && data._formSynced === this.group ) return;

      let $element = $(event.target),
          name = $element.attr ( this.options.attributes.name ),
          $otherElements = $(this.options.selectors.form + '[data-' + this.options.datas.group + '="' + this.group + '"]').not ( this.$form ).find ( '[' + this.options.attributes.name + '="' + name + '"]').not ( $element );

      if ( !$otherElements.length ) return;

      let value = $element.val (),
          checked = !!$element.prop ( 'checked' );

      for ( let otherElement of $otherElements ) {

        let $otherElement = $(otherElement),
            otherValue = $otherElement.val (),
            otherChecked = !!$otherElement.prop ( 'checked' );

        if ( value === otherValue && checked === otherChecked ) continue;

        if ( $element.is ( this.options.selectors.radio ) && ( value !== otherValue || checked === otherChecked ) ) continue;

        if ( $element.is ( this.options.selectors.checkable ) ) {

          $otherElement.prop ( 'checked', checked ).trigger ( 'change', { _formSynced: this.group } );

        } else {

          $otherElement.val ( value ).trigger ( 'change', { _formSynced: this.group } );

        }

      }

    }

  }

  /* FACTORY */

  Factory.init ( FormSync, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

(function () {
	'use strict';

	var keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;

	var fn = (function () {
		var val;
		var valLength;

		var fnMap = [
			[
				'requestFullscreen',
				'exitFullscreen',
				'fullscreenElement',
				'fullscreenEnabled',
				'fullscreenchange',
				'fullscreenerror'
			],
			// new WebKit
			[
				'webkitRequestFullscreen',
				'webkitExitFullscreen',
				'webkitFullscreenElement',
				'webkitFullscreenEnabled',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			// old WebKit (Safari 5.1)
			[
				'webkitRequestFullScreen',
				'webkitCancelFullScreen',
				'webkitCurrentFullScreenElement',
				'webkitCancelFullScreen',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			[
				'mozRequestFullScreen',
				'mozCancelFullScreen',
				'mozFullScreenElement',
				'mozFullScreenEnabled',
				'mozfullscreenchange',
				'mozfullscreenerror'
			],
			[
				'msRequestFullscreen',
				'msExitFullscreen',
				'msFullscreenElement',
				'msFullscreenEnabled',
				'MSFullscreenChange',
				'MSFullscreenError'
			]
		];

		var i = 0;
		var l = fnMap.length;
		var ret = {};

		for (; i < l; i++) {
			val = fnMap[i];
			if (val && val[1] in document) {
				for (i = 0, valLength = val.length; i < valLength; i++) {
					ret[fnMap[0][i]] = val[i];
				}
				return ret;
			}
		}

		return false;
	})();

	var screenfull = {
		request: function (elem) {
			var request = fn.requestFullscreen;

			elem = elem || document.documentElement;

			// Work around Safari 5.1 bug: reports support for
			// keyboard in fullscreen even though it doesn't.
			// Browser sniffing, since the alternative with
			// setTimeout is even worse.
			if (/5\.1[\.\d]* Safari/.test(navigator.userAgent)) {
				elem[request]();
			} else {
				elem[request](keyboardAllowed && Element.ALLOW_KEYBOARD_INPUT);
			}
		},
		exit: function () {
			document[fn.exitFullscreen]();
		},
		toggle: function (elem) {
			if (this.isFullscreen) {
				this.exit();
			} else {
				this.request(elem);
			}
		},
		raw: fn
	};

	if (!fn) {
    window.screenfull = false;
		return;
	}

	Object.defineProperties(screenfull, {
		isFullscreen: {
			get: function () {
				return !!document[fn.fullscreenElement];
			}
		},
		element: {
			enumerable: true,
			get: function () {
				return document[fn.fullscreenElement];
			}
		},
		enabled: {
			enumerable: true,
			get: function () {
				// Coerce to boolean in case of old WebKit
				return !!document[fn.fullscreenEnabled];
			}
		}
	});

	window.screenfull = screenfull;
})();


/* =========================================================================
 * Svelto - Helpers
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * @requires ../widgetize/widgetize.js
 * @requires ../pointer/pointer.js
 * @requires vendor/screenfull.js
 * ========================================================================= */

//TODO: Move to their own folders/files

(function ( $, _, Svelto, Widgets, Factory, Widgetize, Pointer, Animations ) {

  'use strict';

  /* SCROLL TO TOP */

  //TODO: Add a .scroll-to-target widget, with data-target and awareness of the attached stuff
  //FIXME: It doesn't work if the layout is body, it also need html in some browsers

  Widgetize.add ( '.scroll-to-top', function ( $scroller ) {

    let $layout = $scroller.parent ().closest ( '.layout, body' ); //TODO: Use just `.layout`

    $scroller.on ( Pointer.tap, function () {

      $layout.animate ( { scrollTop: 0 }, Animations.normal );

    });

  });

  /* FULLSCREEN */

  //TODO: Add the ability to trigger the fullscreen for a specific element
  //FIXME: It doesn't work in iOS's Safari and IE10
  //TODO: Rewrite a component for it

  Widgetize.add ( '.fullscreen-toggler', function ( $toggler ) {

    $toggler.on ( Pointer.tap, screenfull.toggle );

  });

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Widgetize, Svelto.Pointer, Svelto.Animations ));


/* =========================================================================
 * Svelto - Infobar
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

//TODO: Maybe add the ability to open it

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'infobar',
    plugin: true,
    selector: '.infobar',
    options: {
      callbacks: {
        close: _.noop
      }
    }
  };

  /* INFOBAR */

  class Infobar extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$infobar = this.$element;

    }

    /* API */

    close () {

      this.$infobar.detach ();

      this._trigger ( 'close' );

    }

  }

  /* FACTORY */

  Factory.init ( Infobar, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Infobar (Closer)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires infobar.js
 * @requires ../closer/closer.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'infobarCloser',
    plugin: true,
    selector: '.infobar-closer',
    options: {
      widget: Widgets.Infobar
    }
  };

  /* INFOBAR CLOSER */

  class InfobarCloser extends Widgets.Closer {}

  /* FACTORY */

  Factory.init ( InfobarCloser, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Modal
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * @requires ../animations/animations.js
 * ========================================================================= */

// Since we are using a pseudo element as the background, in order to simplify the markup, only `.card` and `.card`-like elements can be effectively `.modal`

(function ( $, _, Svelto, Widgets, Factory, Pointer, Animations ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'modal',
    plugin: true,
    selector: '.modal',
    options: {
      classes: {
        show: 'show',
        open: 'open'
      },
      animations: {
        open: Animations.normal,
        close: Animations.normal
      },
      keystrokes: {
        'esc': 'close'
      },
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    }
  };

  /* MODAL */

  class Modal extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.modal = this.element;
      this.$modal = this.$element;

      this._isOpen = this.$modal.hasClass ( this.options.classes.open );

    }

    _events () {

      if ( this._isOpen ) {

        this.___keydown ();
        this.___tap ();
        this.___route ();

      }

    }

    /* TAP */

    ___tap () {

      this._on ( true, Pointer.tap, this.__tap );

    }

    __tap ( event ) {

      if ( event.target === this.modal ) {

        this.close ();

      }

    }

    /* ROUTE */

    __route () {

      if ( this._isOpen && !$.contains ( this.layout, this.$modal[0] ) ) {

        this.close ();

      }

    }

    /* API */

    isOpen () {

      return this._isOpen;

    }

    toggle ( force = !this._isOpen ) {

      if ( !!force !== this._isOpen ) {

        this[force ? 'open' : 'close']();

      }

    }

    open () {

      if ( this._lock || this._isOpen ) return;

      this._lock = true;
      this._isOpen = true;

      this.$layout.disableScroll ();

      this._frame ( function () {

        this.$modal.addClass ( this.options.classes.show );

        this._frame ( function () {

          this.$modal.addClass ( this.options.classes.open );

          this._lock = false;

          this._trigger ( 'open' );

        });

      });

      this.___keydown ();
      this.___tap ();
      this.___route ();

    }

    close () {

      if ( this.lock || !this._isOpen ) return;

      this._lock = true;
      this._isOpen = false;

      this._frame ( function () {

        this.$modal.removeClass ( this.options.classes.open );

        this._delay ( function () {

          this.$modal.removeClass ( this.options.classes.show );

          this.$layout.enableScroll ();

          this._lock = false;

          this._trigger ( 'close' );

        }, this.options.animations.close );

      });

      this._reset ();

    }

  }

  /* FACTORY */

  Factory.init ( Modal, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Animations ));


/* =========================================================================
 * Svelto - Modal (Closer)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires modal.js
 * @requires ../closer/closer.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'modalCloser',
    plugin: true,
    selector: '.modal-closer',
    options: {
      widget: Widgets.Modal
    }
  };

  /* MODAL CLOSER */

  class ModalCloser extends Widgets.Closer {}

  /* FACTORY */

  Factory.init ( ModalCloser, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Modal (Opener)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires modal.js
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'modalOpener',
    plugin: true,
    selector: '.modal-opener',
    options: {
      widget: Widgets.Modal
    }
  };

  /* MODAL OPENER */

  class ModalOpener extends Widgets.Opener {}

  /* FACTORY */

  Factory.init ( ModalOpener, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Modal (Toggler)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires modal.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'modalToggler',
    plugin: true,
    selector: '.modal-toggler',
    options: {
      widget: Widgets.Modal
    }
  };

  /* MODAL TOGGLER */

  class ModalToggler extends Widgets.Toggler {}

  /* FACTORY */

  Factory.init ( ModalToggler, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Mouse
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* MOUSE */

  let Mouse = {
    buttons: {
      LEFT: 0,
      MIDDLE: 1,
      RIGHT: 2
    }
  };

  /* EXPORT */

  Svelto.Mouse = Mouse;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - N Times Action (Group)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../cookie/cookie.js
 * ========================================================================= */

(function ( $, _, Svelto, Cookie, NTA ) {

  'use strict';

  /* UTILITIES */

  let getExpiry = function ( expiry ) {

    if ( expiry ) {

      switch ( expiry.constructor ) {

        case Number:
          return ( expiry === Infinity ) ? false : _.nowSecs () + expiry;

        case String:
          return getExpiry ( new Date ( expiry ) );

        case Date:
          let timestamp = expiry.getTime ();
          return _.isNaN ( timestamp ) ? false : Math.floor ( timestamp / 1000 );

      }

    }

    return false;

  };

  /* CONFIG */

  let config = { //TODO: Export this object so that it gets customizable, maybe rename encoder to serializer
    encoder: JSON.stringify,
    decoder: JSON.parse
  };

  /* GROUP */

  class Group {

    constructor ( options ) {

      this.name = options.name;
      this.cookie = options.cookie;

      this.actions = config.decoder ( Cookie.get ( this.name ) || '{}' );

    }

    get ( action ) {

      let actionj = this.actions[action];

      if ( actionj ) {

        if ( actionj.x && actionj.x < _.nowSecs () ) {

          this.remove ( action );

        } else {

          return actionj.t;

        }

      }

      return 0;

    }

    set ( action, times, expiry ) {

      times = Number ( times );

      if ( _.isNaN ( times ) ) return;

      if ( action in this.actions ) {

        if ( times === 0 && !this.actions[action].x ) {

          return this.remove ( action );

        } else {

          this.actions[action].t = times;

        }

      } else {

        this.actions[action] = { t: times };

        expiry = getExpiry ( expiry );

        if ( expiry ) {

          this.actions[action].x = expiry;

        }

      }

      this.update ();

    }

    update () {

      Cookie.set ( this.name, config.encoder ( this.actions ), this.cookie.end, this.cookie.path, this.cookie.domain, this.cookie.secure );

    }

    remove ( action ) {

      if ( action ) {

        if ( _.size ( this.actions ) > 1 ) {

          delete this.actions[action];

          this.update ();

        } else {

          this.remove ();

        }

      } else {

        this.actions = {};

        Cookie.remove ( this.name, this.cookie.path, this.cookie.domain );

      }

    }

  }

  /* BINDING */

  NTA.Group = Group;

}( Svelto.$, Svelto._, Svelto, Svelto.Cookie, Svelto.NTA = {} ));


/* =========================================================================
 * Svelto - N Times Action (Action)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires NTA.Group.js
 * ========================================================================= */

(function ( $, _, Svelto, NTA ) {

  'use strict';

  /* ACTION */

  class Action {

    constructor ( options ) {

      this.group = new NTA.Group ({ name: options.group, cookie: options.cookie });
      this.name = options.name;
      this.expiry = options.expiry;

    }

    get () {

      return this.group.get ( this.name );

    }

    set ( times, expiry ) {

      this.group.set ( this.name, times, expiry || this.expiry );

    }

    remove () {

      this.group.remove ( this.name );

    }

  }

  /* BINDING */

  NTA.Action = Action;

}( Svelto.$, Svelto._, Svelto, Svelto.NTA ));


/* =========================================================================
 * Svelto - N Times Action
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires NTA.Action.js
 * ========================================================================= */

(function ( $, _, Svelto, NTA ) {

  'use strict';

  /* DEFAULT OPTIONS */

  let defaults = {
    group: 'nta', // The cookie name that holds the actions, a namespace for related actions basically
    action: false, // The action name
    times: Infinity, // The times an action can be executed
    expiry: false, // When a single action will expire and will then get removed from its group
    fn: false, // The function to execute
    cookie: { // Values that will get passed to `Cookie` when appropriate
      end: Infinity,
      path: undefined,
      domain: undefined,
      secure: undefined
    }
  };

  /* N TIMES ACTION */

  $.nTimesAction = function ( options ) {

    /* OPTIONS */

    options = _.merge ( {}, $.nTimesAction.defaults, options );

    /* N TIMES ACTION */

    if ( options.action ) {

      let action = new NTA.Action ({ group: options.group, name: options.action, expiry: options.expiry, cookie: options.cookie }),
          actionTimes = action.get ();

      /* EXECUTE */

      if ( options.fn && actionTimes < options.times ) {

        let returnValue = options.fn ( options.group, options.action, actionTimes + 1 );

        /* INCREMENT */

        if ( returnValue !== false ) {

          action.set ( actionTimes + 1 );

        }

      }

      return action;

    } else if ( options.group ) {

      return new NTA.Group ({ name: options.group, cookie: options.cookie });

    }

  };

  /* BINDING */

  $.nTimesAction.defaults = defaults;

}( Svelto.$, Svelto._, Svelto, Svelto.NTA ));


/* =========================================================================
 * Svelto - Notification
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../noty/noty.js
 * ========================================================================= */

// If the tab hasn't the focus and we can use the native notifications than we'll send a native notification, otherwise we will fallback to a noty

(function ( $, _, Svelto, Widgets ) {

  'use strict';

  /* DEFAULT OPTIONS */

  let defaults = {
    title: false,
    body: false,
    img: false,
    ttl: Widgets.Noty.config.options.ttl
  };

  /* NOTIFICATION */

  $.notification = function ( options ) {

    /* OPTIONS */

    options = _.extend ( {}, $.notification.defaults, options );

    /* NOTIFICATIONS */

    if ( !document.hasFocus () && window.Notification && Notification.permission !== 'denied' ) {

      Notification.requestPermission ( function ( status ) {

        if ( status === 'granted' ) {

          let notification = new Notification ( options.title, { body: options.body, icon: options.img } );

          if ( _.isNumber ( options.ttl ) && !_.isNaN ( options.ttl ) && options.ttl !== Infinity ) {

            setTimeout ( function () {

              notification.close ();

            }, options.ttl );

          }

        } else {

          $.noty ( options );

        }

      });

    } else {

      $.noty ( options );

    }

  };

  /* BINDING */

  $.notification.defaults = defaults;

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets ));


/* =========================================================================
 * Svelto - One Time Action
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../n_times_action/n_times_action.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* ONE TIME ACTION */

  $.oneTimeAction = function ( options ) {

    return $.nTimesAction ( _.extend ( { group: 'ota' }, options, { times: 1 } ) );

  };

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Overlay (Closer)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires overlay.js
 * @requires ../closer/closer.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'overlayCloser',
    plugin: true,
    selector: '.overlay-closer',
    options: {
      widget: Widgets.Overlay
    }
  };

  /* OVERLAY CLOSER */

  class OverlayCloser extends Widgets.Closer {}

  /* FACTORY */

  Factory.init ( OverlayCloser, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Overlay (Opener)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires overlay.js
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'overlayOpener',
    plugin: true,
    selector: '.overlay-opener',
    options: {
      widget: Widgets.Overlay
    }
  };

  /* OVERLAY OPENER */

  class OverlayOpener extends Widgets.Opener {}

  /* FACTORY */

  Factory.init ( OverlayOpener, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Overlay (Toggler)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires overlay.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'overlayToggler',
    plugin: true,
    selector: '.overlay-toggler',
    options: {
      widget: Widgets.Overlay
    }
  };

  /* OVERLAY TOGGLER */

  class OverlayToggler extends Widgets.Toggler {}

  /* FACTORY */

  Factory.init ( OverlayToggler, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Panel
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * @requires ../animations/animations.js
 * ========================================================================= */

// Since we are using a pseudo element as the background, in order to simplify the markup, only `.card` and `.card`-like elements can be effectively `.panel`

//TODO: Replace flickable support with a smooth moving panel, so operate on drag

(function ( $, _, Svelto, Widgets, Factory, Pointer, Animations ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'panel',
    plugin: true,
    selector: '.panel',
    options: {
      direction: 'left',
      pin: false, // If is a valid key of `Breakpoints` it will get auto pinned/unpinned when we are above or below that breakpoint
      flick: {
        open: false,
        close: true,
        treshold: 20 // Amount of pixels close to the window border where the opening flick gesture should be considered intentional
      },
      classes: {
        show: 'show',
        open: 'open',
        slim: 'slim',
        pinned: 'pinned',
        flickable: 'flickable' // As a side effect it will gain a `Svelto.Flickable` instance, therefor it will also trigger `flickable:flick` events, that are what we want
      },
      animations: {
        open: Animations.normal,
        close: Animations.normal,
      },
      keystrokes: {
        'esc': '__esc'
      },
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    }
  };

  /* PANEL */

  class Panel extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$panel = this.$element;
      this.panel = this.element;

      this.options.direction = _.getDirections ().find ( direction => this.$panel.hasClass ( direction ) ) || this.options.direction;
      this.options.flick.open = this.options.flick.open || this.$panel.hasClass ( this.options.classes.flickable );

      if ( this.options.pin ) {

        _.merge ( this.options.breakpoints, {
          up: {
            [this.options.pin]: '_autopin',
          },
          down: {
            [this.options.pin]: '_autounpin'
          }
        });

      }

      this._isOpen = this.$panel.hasClass ( this.options.classes.open );
      this._isPinned = this.$panel.hasClass ( this.options.classes.pinned );
      this._isSlim = this.$panel.hasClass ( this.options.classes.slim );

      this.layoutPinnedClass = Widgets.Panel.config.name + '-' + ( this._isSlim ? this.options.classes.slim + '-' : '' ) + this.options.classes.pinned + '-' + this.options.direction;

    }

    _events () {

      if ( this._isOpen ) {

        this.___breakpoint ();
        this.___tap ();
        this.___keydown ();
        this.___panelFlick ();
        this.___route ();

      } else {

        this.___layoutFlick ();
        this.___panelFlick ();

      }

    }

    /* TAP */

    ___tap () {

      this._on ( true, Pointer.tap, this.__tap );

    }

    __tap ( event ) {

      if ( event.target === this.panel && !this._isPinned ) {

        this.close ();

      }

    }

    /* ESC */

    ___keydown () { //TODO: Listen to `keydown` only within the layout, so maybe just if the layout is hovered or focused (right?)

      this._on ( true, this.$document, 'keydown', this.__keydown );

    }

    __esc () {

      if ( !this._isPinned ) {

        this.close ();

      }

    }

    /* LAYOUT FLICK */

    ___layoutFlick () {

      if ( !this.options.flick.open ) return;

      this.$layout.flickable ();

      this._on ( this.$layout, 'flickable:flick', this.__layoutFlick );

    }

    __layoutFlick ( event, data ) {

      if ( this._isOpen ) return;

      if ( data.direction !== _.getOppositeDirection ( this.options.direction ) ) return;

      let layoutOffset = this.$layout.offset ();

      switch ( this.options.direction ) {

        case 'left':
          if ( data.startXY.X - layoutOffset.left > this.options.flick.treshold ) return;
          break;

        case 'right':
          if ( this.$layout.outerWidth () + layoutOffset.left - data.startXY.X > this.options.flick.treshold ) return;
          break;

        case 'top':
          if ( data.startXY.Y - layoutOffset.top > this.options.flick.treshold ) return;
          break;

        case 'bottom':
          if ( this.$layout.outerHeight () + layoutOffset.top - data.startXY.Y > this.options.flick.treshold ) return;
          break;

      }

      event.preventDefault ();
      event.stopImmediatePropagation ();

      this.open ();

    }

    /* PANEL FLICK */

    ___panelFlick () {

      if ( !this.options.flick.close ) return;

      this.$panel.flickable ();

      this._on ( true, 'flickable:flick', this.__panelFlick );

    }

    __panelFlick ( event, data ) {

      if ( !this._isOpen ) return;

      if ( data.direction !== this.options.direction ) return;

      event.preventDefault ();
      event.stopImmediatePropagation ();

      this.close ();

    }

    /* ROUTE */

    __route () {

      if ( this._isOpen && !$.contains ( this.layout, this.$panel[0] ) ) {

        this.$layout.enableScroll ();

      }

    }

    /* RESET */

    _reset () {

      this.$bindings.off ( this.eventNamespace );

    }

    /* AUTO PINNING */

    _autopin () {

      if ( this._isPinned ) return;

      this._wasAutoOpened = !this._isOpen;

      this.pin ();

    }

    _autounpin () {

      if ( !this._isPinned ) return;

      this[this._wasAutoOpened ? 'close' : 'unpin']();

    }

    /* API */

    isOpen () {

      return this._isOpen;

    }

    toggle ( force = !this._isOpen ) {

      if ( !!force !== this._isOpen ) {

        this[force ? 'open' : 'close']();

      }

    }

    open () {

      if ( this._lock || this._isOpen ) return;

      this._lock = true;
      this._isOpen = true;

      if ( !this._isPinned ) {

        this.$layout.disableScroll ();

      }

      this._frame ( function () {

        this.$panel.addClass ( this.options.classes.show );

        this._frame ( function () {

          this.$panel.addClass ( this.options.classes.open );

          this._lock = false;

          this._trigger ( 'open' );

        });

      });

      this._reset ();

      this.___breakpoint ();
      this.___tap ();
      this.___keydown ();
      this.___panelFlick ();
      this.___route ();

    }

    close () {

      if ( this._lock || !this._isOpen ) return;

      this.unpin ( true );

      this._lock = true;
      this._isOpen = false;

      this._frame ( function () {

        this.$panel.removeClass ( this.options.classes.open );

        this._delay ( function () {

          this.$panel.removeClass ( this.options.classes.show );

          this.$layout.enableScroll ();

          this._lock = false;

          this._trigger ( 'close' );

        }, this.options.animations.close );

      });

      this._reset ();

      this.___breakpoint ();
      this.___layoutFlick ();

    }

    /* PINNING */

    isPinned () {

      return this._isPinned;

    }

    togglePin ( force = !this._isPinned ) {

      if ( !!force !== this._isPinned ) {

        this[force ? 'pin' : 'unpin']();

      }

    }

    pin () {

      if ( this._isPinned ) return;

      this._isPinned = true;

      this.$panel.addClass ( this.options.classes.pinned );

      this.$layout.addClass ( this.layoutPinnedClass );

      if ( this._isOpen ) {

        this.$layout.enableScroll ();

      } else {

        this.open ();

      }

    }

    unpin ( _closing ) {

      if ( !this._isOpen || !this._isPinned ) return;

      this._isPinned = false;

      this.$layout.removeClass ( this.layoutPinnedClass ).disableScroll ();

      this._delay ( function () {

        this.$panel.removeClass ( this.options.classes.pinned );

      }, _closing ? this.options.animations.close : 0 );

    }

  }

  /* FACTORY */

  Factory.init ( Panel, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Animations ));


/* =========================================================================
 * Svelto - Panel (Closer)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires panel.js
 * @requires ../closer/closer.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'panelCloser',
    plugin: true,
    selector: '.panel-closer',
    options: {
      widget: Widgets.Panel
    }
  };

  /* PANEL CLOSER */

  class PanelCloser extends Widgets.Closer {}

  /* FACTORY */

  Factory.init ( PanelCloser, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Panel (Opener)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires panel.js
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'panelOpener',
    plugin: true,
    selector: '.panel-opener',
    options: {
      widget: Widgets.Panel
    }
  };

  /* PANEL OPENER */

  class PanelOpener extends Widgets.Opener {}

  /* FACTORY */

  Factory.init ( PanelOpener, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Panel (Toggler)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires panel.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'panelToggler',
    plugin: true,
    selector: '.panel-toggler',
    options: {
      widget: Widgets.Panel
    }
  };

  /* PANEL TOGGLER */

  class PanelToggler extends Widgets.Toggler {}

  /* FACTORY */

  Factory.init ( PanelToggler, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript */
var _self = (typeof window !== 'undefined')
	? window   // if in browser
	: (
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
		? self // if in worker
		: {}   // if in node js
	);

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

var Prism = (function(){

// Private helper vars
var lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;

var _ = _self.Prism = {
	util: {
		encode: function (tokens) {
			if (tokens instanceof Token) {
				return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
			} else if (_.util.type(tokens) === 'Array') {
				return tokens.map(_.util.encode);
			} else {
				return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
			}
		},

		type: function (o) {
			return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
		},

		// Deep clone a language definition (e.g. to extend it)
		clone: function (o) {
			var type = _.util.type(o);

			switch (type) {
				case 'Object':
					var clone = {};

					for (var key in o) {
						if (o.hasOwnProperty(key)) {
							clone[key] = _.util.clone(o[key]);
						}
					}

					return clone;

				case 'Array':
					// Check for existence for IE8
					return o.map && o.map(function(v) { return _.util.clone(v); });
			}

			return o;
		}
	},

	languages: {
		extend: function (id, redef) {
			var lang = _.util.clone(_.languages[id]);

			for (var key in redef) {
				lang[key] = redef[key];
			}

			return lang;
		},

		/**
		 * Insert a token before another token in a language literal
		 * As this needs to recreate the object (we cannot actually insert before keys in object literals),
		 * we cannot just provide an object, we need anobject and a key.
		 * @param inside The key (or language id) of the parent
		 * @param before The key to insert before. If not provided, the function appends instead.
		 * @param insert Object with the key/value pairs to insert
		 * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
		 */
		insertBefore: function (inside, before, insert, root) {
			root = root || _.languages;
			var grammar = root[inside];

			if (arguments.length == 2) {
				insert = arguments[1];

				for (var newToken in insert) {
					if (insert.hasOwnProperty(newToken)) {
						grammar[newToken] = insert[newToken];
					}
				}

				return grammar;
			}

			var ret = {};

			for (var token in grammar) {

				if (grammar.hasOwnProperty(token)) {

					if (token == before) {

						for (var newToken in insert) {

							if (insert.hasOwnProperty(newToken)) {
								ret[newToken] = insert[newToken];
							}
						}
					}

					ret[token] = grammar[token];
				}
			}

			// Update references in other language definitions
			_.languages.DFS(_.languages, function(key, value) {
				if (value === root[inside] && key != inside) {
					this[key] = ret;
				}
			});

			return root[inside] = ret;
		},

		// Traverse a language definition with Depth First Search
		DFS: function(o, callback, type) {
			for (var i in o) {
				if (o.hasOwnProperty(i)) {
					callback.call(o, i, o[i], type || i);

					if (_.util.type(o[i]) === 'Object') {
						_.languages.DFS(o[i], callback);
					}
					else if (_.util.type(o[i]) === 'Array') {
						_.languages.DFS(o[i], callback, i);
					}
				}
			}
		}
	},
	plugins: {},

	highlightAll: function(async, callback) {
		var elements = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');

		for (var i=0, element; element = elements[i++];) {
			_.highlightElement(element, async === true, callback);
		}
	},

	highlightElement: function(element, async, callback) {
		// Find language
		var language, grammar, parent = element;

		while (parent && !lang.test(parent.className)) {
			parent = parent.parentNode;
		}

		if (parent) {
			language = (parent.className.match(lang) || [,''])[1];
			grammar = _.languages[language];
		}

		// Set language on the element, if not present
		element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

		// Set language on the parent, for styling
		parent = element.parentNode;

		if (/pre/i.test(parent.nodeName)) {
			parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
		}

		var code = element.textContent;

		var env = {
			element: element,
			language: language,
			grammar: grammar,
			code: code
		};

		if (!code || !grammar) {
			_.hooks.run('complete', env);
			return;
		}

		_.hooks.run('before-highlight', env);

		if (async && _self.Worker) {
			var worker = new Worker(_.filename);

			worker.onmessage = function(evt) {
				env.highlightedCode = Token.stringify(JSON.parse(evt.data), language);

				_.hooks.run('before-insert', env);

				env.element.innerHTML = env.highlightedCode;

				callback && callback.call(env.element);
				_.hooks.run('after-highlight', env);
				_.hooks.run('complete', env);
			};

			worker.postMessage(JSON.stringify({
				language: env.language,
				code: env.code,
				immediateClose: true
			}));
		}
		else {
			env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

			_.hooks.run('before-insert', env);

			env.element.innerHTML = env.highlightedCode;

			callback && callback.call(element);

			_.hooks.run('after-highlight', env);
			_.hooks.run('complete', env);
		}
	},

	highlight: function (text, grammar, language) {
		var tokens = _.tokenize(text, grammar);
		return Token.stringify(_.util.encode(tokens), language);
	},

	tokenize: function(text, grammar, language) {
		var Token = _.Token;

		var strarr = [text];

		var rest = grammar.rest;

		if (rest) {
			for (var token in rest) {
				grammar[token] = rest[token];
			}

			delete grammar.rest;
		}

		tokenloop: for (var token in grammar) {
			if(!grammar.hasOwnProperty(token) || !grammar[token]) {
				continue;
			}

			var patterns = grammar[token];
			patterns = (_.util.type(patterns) === "Array") ? patterns : [patterns];

			for (var j = 0; j < patterns.length; ++j) {
				var pattern = patterns[j],
					inside = pattern.inside,
					lookbehind = !!pattern.lookbehind,
					lookbehindLength = 0,
					alias = pattern.alias;

				pattern = pattern.pattern || pattern;

				for (var i=0; i<strarr.length; i++) { // Don’t cache length as it changes during the loop

					var str = strarr[i];

					if (strarr.length > text.length) {
						// Something went terribly wrong, ABORT, ABORT!
						break tokenloop;
					}

					if (str instanceof Token) {
						continue;
					}

					pattern.lastIndex = 0;

					var match = pattern.exec(str);

					if (match) {
						if(lookbehind) {
							lookbehindLength = match[1].length;
						}

						var from = match.index - 1 + lookbehindLength,
							match = match[0].slice(lookbehindLength),
							len = match.length,
							to = from + len,
							before = str.slice(0, from + 1),
							after = str.slice(to + 1);

						var args = [i, 1];

						if (before) {
							args.push(before);
						}

						var wrapped = new Token(token, inside? _.tokenize(match, inside) : match, alias);

						args.push(wrapped);

						if (after) {
							args.push(after);
						}

						Array.prototype.splice.apply(strarr, args);
					}
				}
			}
		}

		return strarr;
	},

	hooks: {
		all: {},

		add: function (name, callback) {
			var hooks = _.hooks.all;

			hooks[name] = hooks[name] || [];

			hooks[name].push(callback);
		},

		run: function (name, env) {
			var callbacks = _.hooks.all[name];

			if (!callbacks || !callbacks.length) {
				return;
			}

			for (var i=0, callback; callback = callbacks[i++];) {
				callback(env);
			}
		}
	}
};

var Token = _.Token = function(type, content, alias) {
	this.type = type;
	this.content = content;
	this.alias = alias;
};

Token.stringify = function(o, language, parent) {
	if (typeof o == 'string') {
		return o;
	}

	if (_.util.type(o) === 'Array') {
		return o.map(function(element) {
			return Token.stringify(element, language, o);
		}).join('');
	}

	var env = {
		type: o.type,
		content: Token.stringify(o.content, language, parent),
		tag: 'span',
		classes: ['token', o.type],
		attributes: {},
		language: language,
		parent: parent
	};

	if (env.type == 'comment') {
		env.attributes['spellcheck'] = 'true';
	}

	if (o.alias) {
		var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
		Array.prototype.push.apply(env.classes, aliases);
	}

	_.hooks.run('wrap', env);

	var attributes = '';

	for (var name in env.attributes) {
		attributes += (attributes ? ' ' : '') + name + '="' + (env.attributes[name] || '') + '"';
	}

	return '<' + env.tag + ' class="' + env.classes.join(' ') + '" ' + attributes + '>' + env.content + '</' + env.tag + '>';

};

if (!_self.document) {
	if (!_self.addEventListener) {
		// in Node.js
		return _self.Prism;
	}
 	// In worker
	_self.addEventListener('message', function(evt) {
		var message = JSON.parse(evt.data),
		    lang = message.language,
		    code = message.code,
			immediateClose = message.immediateClose;

		_self.postMessage(JSON.stringify(_.util.encode(_.tokenize(code, _.languages[lang]))));
		if (immediateClose) {
			_self.close();
		}
	}, false);

	return _self.Prism;
}

// Get current script and highlight
var script = document.getElementsByTagName('script');

script = script[script.length - 1];

if (script) {
	_.filename = script.src;

	if (document.addEventListener && !script.hasAttribute('data-manual')) {
		document.addEventListener('DOMContentLoaded', _.highlightAll);
	}
}

return _self.Prism;

})();

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof global !== 'undefined') {
	global.Prism = Prism;
}
;
Prism.languages.markup = {
	'comment': /<!--[\w\W]*?-->/,
	'prolog': /<\?[\w\W]+?\?>/,
	'doctype': /<!DOCTYPE[\w\W]+?>/,
	'cdata': /<!\[CDATA\[[\w\W]*?]]>/i,
	'tag': {
		pattern: /<\/?[^\s>\/=.]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/i,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'attr-value': {
				pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
				inside: {
					'punctuation': /[=>"']/
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': /&#?[\da-z]{1,8};/i
};

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function(env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Prism.languages.xml = Prism.languages.markup;
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;

Prism.languages.css = {
	'comment': /\/\*[\w\W]*?\*\//,
	'atrule': {
		pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
		inside: {
			'rule': /@[\w-]+/
			// See rest below
		}
	},
	'url': /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
	'selector': /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
	'string': /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
	'property': /(\b|\B)[\w-]+(?=\s*:)/i,
	'important': /\B!important\b/i,
	'function': /[-a-z0-9]+(?=\()/i,
	'punctuation': /[(){};:]/
};

Prism.languages.css['atrule'].inside.rest = Prism.util.clone(Prism.languages.css);

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'style': {
			pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/i,
			inside: {
				'tag': {
					pattern: /<style[\w\W]*?>|<\/style>/i,
					inside: Prism.languages.markup.tag.inside
				},
				rest: Prism.languages.css
			},
			alias: 'language-css'
		}
	});

	Prism.languages.insertBefore('inside', 'attr-value', {
		'style-attr': {
			pattern: /\s*style=("|').*?\1/i,
			inside: {
				'attr-name': {
					pattern: /^\s*style/i,
					inside: Prism.languages.markup.tag.inside
				},
				'punctuation': /^\s*=\s*['"]|['"]\s*$/,
				'attr-value': {
					pattern: /.+/i,
					inside: Prism.languages.css
				}
			},
			alias: 'language-css'
		}
	}, Prism.languages.markup.tag);
};
Prism.languages.clike = {
	'comment': [
		{
			pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
			lookbehind: true
		},
		{
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true
		}
	],
	'string': /("|')(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
	'class-name': {
		pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
		lookbehind: true,
		inside: {
			punctuation: /(\.|\\)/
		}
	},
	'keyword': /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	'boolean': /\b(true|false)\b/,
	'function': /[a-z0-9_]+(?=\()/i,
	'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
	'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
	'punctuation': /[{}[\];(),.:]/
};

Prism.languages.javascript = Prism.languages.extend('clike', {
	'keyword': /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/,
	'number': /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i
});

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
		lookbehind: true
	}
});

Prism.languages.insertBefore('javascript', 'class-name', {
	'template-string': {
		pattern: /`(?:\\`|\\?[^`])*`/,
		inside: {
			'interpolation': {
				pattern: /\$\{[^}]+\}/,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	}
});

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'script': {
			pattern: /<script[\w\W]*?>[\w\W]*?<\/script>/i,
			inside: {
				'tag': {
					pattern: /<script[\w\W]*?>|<\/script>/i,
					inside: Prism.languages.markup.tag.inside
				},
				rest: Prism.languages.javascript
			},
			alias: 'language-javascript'
		}
	});
}

Prism.languages.js = Prism.languages.javascript;


/* =========================================================================
* Svelto - Progressbar
* =========================================================================
* Copyright (c) 2015-2016 Fabio Spampinato
* Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
* =========================================================================
* @requires ../widget/widget.js
* ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'progressbar',
    plugin: true,
    selector: '.progressbar',
    templates: {
      base: '<div class="progressbar {%=(o.striped ? "striped" : "")%} {%=(o.indeterminate ? "indeterminate" : "")%} {%=(o.labeled ? "labeled" : "")%} {%=o.colors.off%} {%=o.size%} {%=o.css%}">' +
              '<div class="progressbar-highlight {%=o.colors.on%}"></div>' +
            '</div>'
    },
    options: {
      value: 0, // Percentage
      colors: { // Colors to use for the progressbar
        on: '', // Color of `.progressbar-highlight`
        off: '' // Color of `.progressbar`
      },
      striped: false, // Draw striped over it
      indeterminate: false, // Indeterminate state
      labeled: false, // Draw a label inside
      decimals: 0, // Amount of decimals to round the label value to
      size: '', // Size of the progressbar: '', 'compact', 'slim'
      css: '',
      datas: {
        value: 'value',
        decimals: 'decimals'
      },
      selectors: {
        highlight: '.progressbar-highlight'
      },
      callbacks: {
        change: _.noop,
        empty: _.noop,
        full: _.noop
      }
    }
  };

  /* HELPER */

  $.progressbar = function ( options ) {

    options = _.isNumber ( options ) ? { value: options } : options;

    return new Widgets.Progressbar ( options );

  };

  /* PROGRESSBAR */

  class Progressbar extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$progressbar = this.$element;
      this.$highlight = this.$progressbar.find ( this.options.selectors.highlight );

    }

    _init () {

      /* OPTIONS */

      this.options.value = this._sanitizeValue ( this.$progressbar.data ( this.options.datas.value ) || this.options.value );
      this.options.decimals = Number ( this.$progressbar.data ( this.options.datas.decimals ) || this.options.decimals );

      /* UPDATE */

      this._update ();

    }

    /* VALUE */

    _sanitizeValue ( value ) {

      let nr = Number ( value );

      return _.clamp ( _.isNaN ( nr ) ? 0 : nr, 0, 100 );

    }

    _roundValue ( value ) {

      return Number ( value.toFixed ( this.options.decimals ) );

    }

    /* UPDATE */

    _updateWidth () {

      this.$highlight.css ( 'min-width', this.options.value + '%' );

    }

    _updateLabel () {

      this.$highlight.attr ( 'data-' + this.options.datas.value, this._roundValue ( this.options.value ) + '%' );

    }

    _update () {

      this._updateWidth ();
      this._updateLabel ();

    }

    /* API */

    get () {

      return this.options.value;

    }

    set ( value ) {

      value = this._sanitizeValue ( value );

      if ( value === this.options.value ) return;

      this.options.value = value;

      this._update ();

      this._trigger ( 'change' );

      if ( this.options.value === 0 ) {

        this._trigger ( 'empty' );

      } else if ( this.options.value === 100 ) {

        this._trigger ( 'full' );

      }

    }

  }

  /* FACTORY */

  Factory.init ( Progressbar, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Rater
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../noty/noty.js
 * ========================================================================= */

//FIXME: Crappy, not working atm, maybe should get removed
//TODO: Support the use of the rater as an input, basically don't perform any ajax operation but instead update an input field

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'rater',
    plugin: true,
    selector: '.rater',
    templates: {
      base: '<div class="rater">' +
              '{% include ( "rater.stars", o ); %}' +
            '</div>',
      stars: '{% for ( var i = 1; i <= o.amount; i++ ) { %}' +
               '<div class="rater-star {%=( o.value >= i ? "active" : ( o.value >= i - 0.5 ? "half-active" : "" ) )%}"></div>' +
             '{% } %}'
    },
    options: {
      value: 0,
      amount: 5,
      url: false,
      rated: false,
      messages: {
        error: 'An error occurred, please try again later'
      },
      datas: {
        value: 'value',
        amount: 'amount',
        url: 'url'
      },
      classes: {
        rated: 'rated'
      },
      selectors: {
        star: '.rater-star'
      },
      callbacks: {
        change: _.noop
      }
    },
  };

  /* SELECT */

  class Rater extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$rater = this.$element;

      this.doingAjax = false;

    }

    _init () {

      this.options.value = Number ( this.$rater.data ( this.options.datas.value ) ) || this.options.value;
      this.options.amount = Number ( this.$rater.data ( this.options.datas.amount ) ) || this.options.amount;
      this.options.url = Number ( this.$rater.data ( this.options.datas.url ) ) || this.options.url;
      this.options.rated = this.$rater.hasClass ( this.options.classes.rated );

    }

    _events () {

      this.___tap ();

    }

    /* TAP */

    ___tap () {

      if ( !this.options.rated ) {

        /* TAP */

        this._on ( Pointer.tap, this.options.selectors.star, this.__tap );

      }

    }

    __tap ( event ) {

      if ( !this.options.rated && !this.doingAjax && this.options.url ) {

        let rating = this.$stars.index ( event.currentTarget ) + 1;

        $.ajax ({

          data: { rating: rating },
          type: 'POST',
          url: this.options.url,

          beforeSend: () => {

            this.doingAjax = true;

          },

          error: ( res ) => {

            let resj = _.attempt ( JSON.parse, res );

            $.noty ( _.isError ( resj ) || !( 'msg' in resj ) ? this.options.messages.error : resj.msg );

          },

          success: ( res ) => {

            //FIXME: Handle the case where the server requests succeeded but the user already rated or for whatever reason this rating is not processed

            let resj = _.attempt ( JSON.parse, res );

            if ( !_.isError ( resj ) ) {

              _.merge ( this.options, resj );

              this.$rater.html ( this._tmpl ( 'stars', this.options ) );

              this.options.rated = true;

              this._trigger ( 'change' );

            }

          },

          complete: () => {

            this.doingAjax = false;

          }

        });

      }

    }

    /* API */

    get () {

      return {
        value: this.options.value,
        amount: this.options.amount
      };

    }

  }

  /* FACTORY */

  Factory.init ( Rater, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Remote Modal
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../modal/modal.js
 * @requires ../noty/noty.js
 * ========================================================================= */

//FIXME: Not beautifully written

(function ( $, _, Svelto, Widgets, Animations ) {

  'use strict';

  /* UTILITIES */

  let destroyModal = function ( $modal ) {

    $modal.modal ( 'close' );

    setTimeout ( function () {

      $modal.remove ();

    }, Widgets.Modal.config.options.animations.close );

  };

  /* REMOTE MODAL */

  $.remoteModal = function ( url, data ) {

    /* DATA */

    if ( !data ) {

      data = _.isPlainObject ( url ) ? url : { url: url };

    } else {

      data.url = url;

    }

    /* TEMPORARY MODAL */

    /*
      <div class="modal remote-modal-placeholder card">
        <div class="card-block">
          <svg class="spinner">
            <circle cx="1.625em" cy="1.625em" r="1.25em">
          </svg>
        </div>
      </div>
    */

    let $tempModal = $('<div class="modal remote-modal-placeholder card"><div class="card-block"><svg class="spinner"><circle cx="1.625em" cy="1.625em" r="1.25em"></svg></div></div>');

    /* VARIABLES */

    let isAborted = false;

    /* AJAX */

    $.ajax ({

      cache: false,
      data: _.omit ( data, 'url' ),
      timeout: 31000, // 1 second more than the default value of PHP's `max_execution_time` setting
      type: _.size ( data ) > 1 ? 'POST' : 'GET',
      url: data.url,

      beforeSend () {

        $tempModal.appendTo ( $('.layout, body').first () ) //TODO: Use just `.layout`
                  .modal ({
                    callbacks: {
                      close () {
                        isAborted = true;
                        destroyModal ( $tempModal );
                      }
                    }
                  })
                  .modal ( 'open' );

      },

      error ( res ) {

        if ( isAborted ) return;

        let resj = _.attempt ( JSON.parse, res );

        $.noty ( _.isError ( resj ) || !( 'msg' in resj ) ? 'An error occurred, please try again later' : resj.msg );

        destroyModal ( $tempModal );

      },

      success ( res ) {

        if ( isAborted ) return;

        let resj = _.attempt ( JSON.parse, res );

        if ( _.isError ( resj ) || !( 'modal' in resj ) ) {

          this.error ( res );

        } else {

          let prevRect = $tempModal.getRect (),
              $remoteModal = $(resj.modal),
              attributes = Array.from ( $remoteModal.prop ( 'attributes' ) );

          for ( let attribute of attributes ) {

            if ( attribute.name !== 'class' ) {

              $tempModal.attr ( attribute.name, attribute.value );

            }

          }

          $tempModal.addClass ( $remoteModal.attr ( 'class' ) );

          $.frame ( function () {

            $tempModal.addClass ( 'loaded' );

            $tempModal.html ( $remoteModal.html () );

            let newRect = $tempModal.getRect ();

            $tempModal.css ({
              width: prevRect.width,
              height: prevRect.height
            });

            $.frame ( function () {

              $tempModal.addClass ( 'animating' );

              $tempModal.animate ({
                width: newRect.width,
                height: newRect.height
              }, Animations.normal, function () {

                $tempModal.css ({
                  width: '',
                  height: ''
                }).removeClass ( 'remote-modal-placeholder loaded animating' );

              });

              $tempModal.widgetize ();

            });

          });

        }

      }

    });

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Animations ));


/* =========================================================================
 * Svelto - Ripple
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * @requires ../browser/browser.js
 * @requires ../mouse/mouse.js
 * @requires ../animations/animations.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Browser, Pointer, Mouse, Animations ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'ripple',
    plugin: true,
    selector: '.ripple',
    templates: {
      circle: '<div class="ripple-circle"></div>'
    },
    options: {
      classes: {
        circle: {
          show: 'ripple-circle-show',
          hide: 'ripple-circle-hide'
        },
        centered: 'ripple-centered'
      },
      animations: {
        show: Animations.xslow,
        hide: Animations.xslow,
        overlap: Animations.xslow / 100 * 58 // Used for triggering the hide animation while still opening, for a better visual effect
      },
      callbacks: {
        show: _.noop,
        hide: _.noop
      }
    }
  };

  /* RIPPLE */

  class Ripple extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$ripple = this.$element;

      this.circles = [];

    }

    _events () {

      this.___downTap ();

    }

    /* DOWN / TAP */

    ___downTap () {

      // Touch devices triggers a `Pointer.down` event, but maybe they will just scroll the page, more appropriate to bind on `Pointer.tap`

      this._on ( Browser.is.touchDevice ? Pointer.tap : Pointer.down, this.__downTap );

    }

    __downTap ( event ) {

      if ( event.button && event.button !== Mouse.buttons.LEFT ) return;

      if ( this.$ripple.hasClass ( this.options.classes.centered ) ) {

        let offset = this.$ripple.offset ();

        this._show ({
          X: offset.left + ( this.$ripple.outerWidth () / 2 ),
          Y: offset.top + ( this.$ripple.outerHeight () / 2 )
        });

      } else {

        this._show ( $.eventXY ( event ) );

      }

      this._one ( true, this.$document, Pointer.up, this.__up );

    }

    /* UP */

    __up () {

      for ( let [$circle, timestamp] of this.circles ) {

        this._hide ( $circle, timestamp );

      }

      this.circles = [];

    }

    /* SHOW */

    _show ( point ) {

      let $circle = $(this._tmpl ( 'circle' ));

      /* SIZE */

      let offset = this.$ripple.offset (),
          insetX = point.X - offset.left,
          insetY = point.Y - offset.top,
          sideX = Math.max ( insetX, this.$ripple.outerWidth () - insetX ),
          sideY = Math.max ( insetY, this.$ripple.outerHeight () - insetY ),
          radius = Math.sqrt ( Math.pow ( sideX, 2 ) + Math.pow ( sideY, 2 ) ), // Basically the max the distances from the point to the corners
          diameter = radius * 2;

      /* ADDING */

      this.circles.push ( [$circle, _.now ()] );

      /* SHOW */

      this._frame ( function () {

        /* PREPEND */

        $circle.css ({
          width: diameter,
          height: diameter,
          top: insetY,
          left: insetX,
        }).prependTo ( this.$ripple );

        /* SHOW */

        this._frame ( function () {

          $circle.addClass ( this.options.classes.circle.show );

          this._trigger ( 'show' );

        });

      });

    }

    /* HIDE */

    _hide ( $circle, timestamp ) {

      let remaining = Math.max ( 0, this.options.animations.show - this.options.animations.overlap + timestamp - _.now () );

      this._delay ( function () {

        $circle.addClass ( this.options.classes.circle.hide );

        this._delay ( function () {

          $circle.remove ();

          this._trigger ( 'hide' );

        }, this.options.animations.hide );

      }, remaining );

    }

  }

  /* FACTORY */

  Factory.init ( Ripple, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Browser, Svelto.Pointer, Svelto.Mouse, Svelto.Animations ));


/* =========================================================================
 * Svelto - Route
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

/* PUSHSTATE */

(function ( $, _, Svelto, history ) {

  'use strict';

  $(function () {

    let $window = $(window),
        pushState = history.pushState;

    history.pushState = function ( state ) {

      if ( _.isFunction ( history.onpushstate ) ) {

        history.onpushstate ( { state: state } );

      }

      $window.trigger ( 'pushstate' );

      return pushState.apply ( history, arguments );

    };

  });

})( Svelto.$, Svelto._, Svelto, window.history );

/* ROUTE */

(function ( $, _, Svelto ) {

  'use strict';

  $(function () {

    let $window = $(window),
        previous = window.location.href.split ( '#' )[0];

    $window.on ( 'popstate pushstate', function () {

      _.defer ( function () { // We need the `window.location.href` to get updated before

        let current = window.location.href.split ( '#' )[0];

        if ( current !== previous ) {

          previous = current;

          $window.trigger ( 'route' );

        }

      });

    });

  });

})( Svelto.$, Svelto._, Svelto );


/* =========================================================================
 * Svelto - Select (Toggler)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../dropdown/dropdown.js
 * @requires ../browser/browser.js
 * ========================================================================= */

//TODO: Add support for selecting multiple options (with checkboxes maybe)
//TODO: Add an input field for searching through the options

(function ( $, _, Svelto, Widgets, Factory, Browser, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'selectToggler',
    plugin: true,
    selector: '.select-toggler',
    templates: {
      base: '<div class="dropdown select-dropdown card {%=o.size%} {%=o.color%} {%=o.css%} {%=o.guc%}">' +
              '<div class="card-block inherit">' +
                '{% for ( var i = 0, l = o.options.length; i < l; i++ ) { %}' +
                  '{% include ( "selectToggler." + ( o.options[i].value ? "option" : "optgroup" ), { opt: o.options[i], color: o.color } ); %}' +
                '{% } %}' +
              '</div>' +
            '</div>',
      optgroup: '<div class="divider">' +
                  '{%=o.opt.prop%}' +
                '</div>',
      option: '<div class="button {%=o.color%}" data-value="{%=o.opt.prop%}">' +
                '{%=o.opt.value%}' +
              '</div>'
    },
    options: {
      dropdown: {
        size: '',
        color: 'white',
        css: 'attached outlined'
      },
      classes: {
        selected: 'active',
        attached: 'attached'
      },
      datas: {
        value: 'value'
      },
      selectors: {
        select: 'select',
        option: 'option',
        label: '.select-label',
        valueholder: '.valueholder',
        button: '.button'
      },
      callbacks: {
        change: _.noop,
        open: _.noop,
        close: _.noop
      }
    }
  };

  /* SELECT TOGGLER */

  class SelectToggler extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$toggler = this.$element;
      this.$select = this.$toggler.find ( this.options.selectors.select );
      this.$options = this.$select.find ( this.options.selectors.option );
      this.$label = this.$toggler.find ( this.options.selectors.label );
      this.$valueholder = this.$toggler.find ( this.options.selectors.valueholder );

      if ( !this.$valueholder.length ) {

        this.$valueholder = this.$label;

      }

      this.selectOptions = [];

      this.$dropdown = false;

    }

    _init () {

      this._updateValueholder ();

      if ( !Browser.is.touchDevice ) {

        this.$select.addClass ( this.options.classes.hidden );

        this.___selectOptions ();
        this.___dropdown ();

      }

    }

    _events () {

      this.___change ();

    }

    /* CHANGE */

    ___change () {

      this._on ( true, this.$select, 'change', this.__change );

    }

    __change () {

      this._update ();

      this._trigger ( 'change' );

    }

    /* BUTTON TAP */

    ___buttonTap () {

      if ( !Browser.is.touchDevice ) {

        /* BUTTON TAP */

        this._on ( this.$dropdown, Pointer.tap, this.options.selectors.button, this.__buttonTap );

      }

    }

    __buttonTap ( event ) {

      this.$dropdown.dropdown ( 'close' );

      this.set ( $(event.currentTarget).data ( this.options.datas.value ) );

    }

    /* OPTIONS */

    ___selectOptions () { //FIXME: Add support for arbitrary number of optgroups nesting levels

      let previousOptgroup;

      for ( let option of this.$options ) {

        let $option = $(option),
            $parent = $option.parent ();

        if ( $parent.is ( 'optgroup' ) ) {

          let currentOptgroup = $parent.attr ( 'label' );

          if ( currentOptgroup !== previousOptgroup ) {

            previousOptgroup = currentOptgroup;

            this.selectOptions.push ({
              prop: currentOptgroup
            });

          }

        }

        this.selectOptions.push ({
          value: $option.text (),
          prop: $option.attr ( 'value' )
        });

      }

    }

    /* DROPDOWN */

    ___dropdown () {

      let html = this._tmpl ( 'base', _.extend ( { guc: this.guc, options: this.selectOptions }, this.options.dropdown ) );

      this.$dropdown = $(html).appendTo ( this.$layout );
      this.$buttons = this.$dropdown.find ( this.options.selectors.button );

      this.$dropdown.dropdown ({
        positionate: {
          axis: 'y',
          strict: true
        },
        callbacks: {
          beforeopen: this.__setDropdownWidth.bind ( this ),
          open: this.__dropdownOpen.bind ( this ),
          close: this.__dropdownClose.bind ( this )
        }
      });

      this.$toggler.attr ( 'data-' + Widgets.Targeter.config.options.datas.target, '.' + this.guc ).dropdownToggler ();

      this._updateDropdown ();

    }

    __setDropdownWidth () {

      if ( this.$dropdown.is ( '.' + this.options.classes.attached ) ) {

        this.$dropdown.css ( 'min-width', this.$toggler.outerWidth () );

      }

    }

    __dropdownOpen () {

      this.___buttonTap ();

      this._trigger ( 'open' );

    }

    __dropdownClose () {

      this._reset ();

      this.___change ();

      this._trigger ( 'close' );

    }

    /* UPDATE */

    _updateValueholder () {

      let $value = this.$select.val ();

      if ( $value.length ) {

        let $selectedOption = this.$options.filter ( '[value="' + $value + '"]' );

        this.$valueholder.text ( $selectedOption.text () );

      }

    }

    _updateDropdown () {

      this.$buttons.removeClass ( this.options.classes.selected );

      this.$buttons.filter ( '[data-' + this.options.datas.value + '="' + this.$select.val () + '"]' ).addClass ( this.options.classes.selected );

    }


    _update () {

      this._updateValueholder ();

      if ( !Browser.is.touchDevice ) {

        this._updateDropdown ();

      }

    }

    /* API */

    get () {

      return this.$select.val ();

    }

    set ( value ) {

      let $button = this.$buttons.filter ( '[data-' + this.options.datas.value + '="' + value + '"]' );

      if ( !$button.length ) return;

      this.$select.val ( value ).trigger ( 'change' );

    }

  }

  /* FACTORY */

  Factory.init ( SelectToggler, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Browser, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Selectable
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * @requires ../browser/browser.js
 * @requires ../mouse/mouse.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer, Browser, Mouse ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'selectable',
    plugin: true,
    selector: 'table.selectable',
    options: {
      moveThreshold: 5, // Threshold after with we start to consider the `Pointer.move` events (Dragging disabled on touch device)
      classes: {
        selected: 'selected'
      },
      selectors: {
        element: 'tbody tr:not(.empty)'
      },
      keystrokes: {
        'ctrl + a': 'all',
        'ctrl + shift + a': 'clear',
        'ctrl + i': 'invert'
      },
      callbacks: {
        change: _.noop
      }
    }
  };

  /* SELECTABLE */

  class Selectable extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$selectable = this.$element;
      this.$elements = this._getElements ();

    }

    _events () {

      this.___change ();
      this.___keydown ();
      this.___downTap ();

    }

    _destroy () {

      this.clear ();

    }

    /* CHANGE */

    ___change () {

      this._on ( true, 'change tablehelper:change sortable:sort', this.__change );

    }

    /* KEYDOWN */

    ___keydown () {

      if ( !Browser.is.touchDevice ) {

        this._onHover ( [this.$document, 'keydown', this.__keydown] );

      }

    }

    /* DOWN / TAP */

    ___downTap () {

      if ( Browser.is.touchDevice ) {

        this._on ( Pointer.tap, this.options.selectors.element, this.__tapTouch );

      } else {

        this._on ( Pointer.down, this.options.selectors.element, this.__down );

      }

    }

    /* TAP */ // Just for touch devices

    __tapTouch ( event ) {

      event.preventDefault ();

      $(event.currentTarget).toggleClass ( this.options.classes.selected );

    }

    /* CLICK / CTRL + CLICK / SHIFT + CLICK / CLICK -> DRAG */

    __down ( event ) {

      if ( event.button && event.button !== Mouse.buttons.LEFT ) return; // Only the left click is allowed

      event.preventDefault ();

      this.startEvent = event;
      this.$startElement = $(event.currentTarget);

      this._on ( true, this.$document, Pointer.move, this.__move );

      this._one ( true, this.$document, Pointer.up, this.__up );

      this._one ( true, this.$document, Pointer.cancel, this.__cancel );

    }

    __move ( event ) {

      event.preventDefault ();

      let startXY = $.eventXY ( this.startEvent ),
          endXY = $.eventXY ( event ),
          deltaXY = {
            X: endXY.X - startXY.X,
            Y: endXY.Y - startXY.Y
          },
          absDeltaXY = {
            X: Math.abs ( deltaXY.X ),
            Y: Math.abs ( deltaXY.Y )
          };

      if ( absDeltaXY.X >= this.options.moveThreshold || absDeltaXY.Y >= this.options.moveThreshold ) {

        this._off ( this.$document, Pointer.move, this.__move );

        this._off ( this.$document, Pointer.up, this.__up );

        this._off ( this.$document, Pointer.cancel, this.__cancel );

        this._resetPrev ();

        if ( !$.hasCtrlOrCmd ( event ) ) {

          this.$elements.removeClass ( this.options.classes.selected );

        }

        this.$startElement.toggleClass ( this.options.classes.selected );

        this._on ( true, Pointer.enter, this.options.selectors.element, this.__dragEnter );

        this._one ( true, this.$document, Pointer.up + ' ' + Pointer.cancel, this.__dragEnd );

        this._trigger ( 'change' );

      }

    }

    __dragEnter ( event ) {

      this._toggleGroup ( this.$startElement, $(event.currentTarget) );

      this._trigger ( 'change' );

    }

    __dragEnd () {

      this._off ( Pointer.enter, this.__dragEnter );

    }

    __up ( event ) {

      this._off ( this.$document, Pointer.move, this.__move );

      this._off ( this.$document, Pointer.cancel, this.__cancel );

      if ( event.shiftKey ) {

        this._toggleGroup ( this.$prevElement, this.$startElement );

      } else if ( $.hasCtrlOrCmd ( event ) ) {

        this.$startElement.toggleClass ( this.options.classes.selected );

        this._resetPrev ( this.$startElement );

      } else {

        let $selected = this.get (),
            $others = $selected.not ( this.$startElement );

        if ( $others.length  ) {

          $others.removeClass ( this.options.classes.selected );

          this.$startElement.addClass ( this.options.classes.selected );

        } else {

          this.$startElement.toggleClass ( this.options.classes.selected );

        }

        this._resetPrev ( this.$startElement );

      }

      this._trigger ( 'change' );

    }

    __cancel () {

      this._off ( this.$document, Pointer.move, this.__move );

      this._off ( this.$document, Pointer.up, this.__up );

    }

    /* OTHER EVENTS */

    __change () {

      this.$elements = this._getElements ();

      this._resetPrev ();

    }

    /* PRIVATE */

    _toggleGroup ( $start, $end ) {

      let startIndex = $start ? this.$elements.index ( $start ) : 0,
          endIndex = this.$elements.index ( $end ),
          minIndex = Math.min ( startIndex, endIndex ),
          maxIndex = Math.max ( startIndex, endIndex );

      if ( minIndex === startIndex ) { // Direction: down

        minIndex += 1;
        maxIndex += 1;

      }

      let $newGroup = this.$elements.slice ( minIndex, maxIndex );

      if ( this.$prevGroup ) {

        $newGroup.not ( this.$prevGroup ).toggleClass ( this.options.classes.selected );

        this.$prevGroup.not ( $newGroup ).toggleClass ( this.options.classes.selected );

      } else {

        $newGroup.toggleClass ( this.options.classes.selected );

      }

      this.$prevGroup = $newGroup;

    }

    _getElements () {

      return this.$element.find ( this.options.selectors.element );

    }

    _resetPrev ( $element = false, $group = false ) {

      this.$prevElement = $element;
      this.$prevGroup = $group;

    }

    /* API */

    get () {

      return this.$elements.filter ( '.' + this.options.classes.selected );

    }

    all () {

      this.$elements.addClass ( this.options.classes.selected );

      this._resetPrev ();

      this._trigger ( 'change' );

    }

    clear () {

      this.$elements.removeClass ( this.options.classes.selected );

      this._resetPrev ();

      this._trigger ( 'change' );

    }

    invert () {

      this.$elements.toggleClass ( this.options.classes.selected );

      this._resetPrev ();

      this._trigger ( 'change' );

    }

  }

  /* FACTORY */

  Factory.init ( Selectable, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Browser, Svelto.Mouse ));


/* =========================================================================
 * Svelto - Slider
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../draggable/draggable.js
 * @requires ../transform/transform.js
 * ========================================================================= */

//TODO: Add vertical slider
//TODO: Make it work without the window resize bind, before we where transforming the transform to a left

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'slider',
    plugin: true,
    selector: '.slider',
    options: {
      min: 0,
      max: 100,
      value: 0,
      step: 1, // Only multiples of `step` are valid values
      decimals: 0, // Trunc the value to this amount of decimal numbers
      live: false, // Wether it will update the input also on `Draggable.move` or just on `Draggable.end`
      datas: {
        min: 'min',
        max: 'max',
        step: 'step',
        decimals: 'decimals'
      },
      selectors: {
        input: 'input',
        min: '.slider-min',
        max: '.slider-max',
        bar: '.slider-bar',
        unhighlight: '.slider-unhighlight',
        highlight: '.slider-highlight',
        handlerWrp: '.slider-handler-wrp',
        label: '.slider-handler-wrp .slider-label'
      },
      keystrokes: {
        'left, down': 'decrease',
        'right, up': 'increase'
      },
      callbacks: {
        change: _.noop
      }
    }
  };

  /* SLIDER */

  class Slider extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$slider = this.$element;
      this.$input = this.$slider.find ( this.options.selectors.input );
      this.$min = this.$slider.find ( this.options.selectors.min );
      this.$max = this.$slider.find ( this.options.selectors.max );
      this.$bar = this.$slider.find ( this.options.selectors.bar );
      this.$unhighlight = this.$slider.find ( this.options.selectors.unhighlight );
      this.$highlight = this.$slider.find ( this.options.selectors.highlight );
      this.$handlerWrp = this.$slider.find ( this.options.selectors.handlerWrp );
      this.$label = this.$slider.find ( this.options.selectors.label );

    }

    _init () {

      /* VARIABLES */

      let value = this.$input.val ();

      /* OPTIONS */

      this.options.min = Number ( this.$min.data ( this.options.datas.min ) || this.options.min );
      this.options.max = Number ( this.$max.data ( this.options.datas.max ) || this.options.max );
      this.options.value = this._sanitizeValue ( value || this.options.value );
      this.options.step = Number ( this.$slider.data ( this.options.datas.step ) || this.options.step );
      this.options.decimals = Number ( this.$slider.data ( this.options.datas.decimals ) || this.options.decimals );

      /* STEPS NR */

      this.stepsNr = ( this.options.max - this.options.min ) / this.options.step;

      /* UPDATE */

      this._updateVariables ();

      if ( Number ( value ) !== this.options.value ) {

        this._update ();

      } else {

        this._updatePositions ();
        this._updateLabel ();

      }

    }

    _events () {

      this.___change ();
      this.___resize ();
      this.___keydown ();
      this.___minTap ();
      this.___maxTap ();
      this.___drag ();

    }

    /* PRIVATE */

    _sanitizeValue ( value ) {

      return _.clamp ( Number ( Number ( value ).toFixed ( this.options.decimals ) ), this.options.min, this.options.max );

    }

    /* UPDATE */

    _updateVariables () {

      this.unhighlightWidth = this.$unhighlight.width ();

      this.stepWidth = this.unhighlightWidth / this.stepsNr;

    }

    _updatePositions () {

      let percentage = ( this.options.value - this.options.min ) / this.options.step * 100 / this.stepsNr,
          translateX = this.unhighlightWidth / 100 * percentage;

      this.$handlerWrp.translateX ( translateX );

      this.$highlight.translateX ( translateX );

    }

    _updateLabel ( value = this.options.value ) {

      this.$label.text ( value );

    }

    _updateInput () {

      this.$input.val ( this.options.value ).trigger ( 'change' );

    }

    _update () {

      this._updatePositions ();
      this._updateLabel ();
      this._updateInput ();

    }

    /* CHANGE */

    ___change () {

      this._on ( true, this.$input, 'change', this.__change );

    }

    __change () {

      this.set ( this.$input.val () );

    }

    /* RESIZE */

    ___resize () {

      this._on ( true, this.$window, 'resize', this._debounce ( this.__resize, 100 ) ); //FIXME: It should handle a generic parent `resize`-like event, not just on `this.$window`

    }

    __resize () {

      this._updateVariables ();
      this._updatePositions ();

    }

    /* KEYDOWN */

    ___keydown () {

      this._onHover ( [$document, 'keydown', this.__keydown] );

    }

    /* MIN TAP */

    ___minTap () {

      this._on ( this.$min, Pointer.tap, this.decrease );

    }

    /* MAX TAP */

    ___maxTap () {

      this._on ( this.$max, Pointer.tap, this.increase );

    }

    /* DRAG */

    ___drag () {

      this.$handlerWrp.draggable ({
        draggable: this.isEnabled.bind ( this ),
        axis: 'x',
        proxy: {
          $element: this.$bar
        },
        constrainer: {
          $element: this.$bar,
          center: true
        },
        modifiers: {
          x: this._dragModifierX.bind ( this )
        },
        callbacks: {
          move: this.__dragMove.bind ( this ), //TODO: Maybe throttle it after we do the layers analysis
          end: this.__dragEnd.bind ( this )
        }
      });

    }

    _dragModifierX ( distance ) {

      return _.roundCloser ( distance, this.stepWidth );

    }

    __dragMove ( event, data ) {

      if ( this.options.live ) {

        this.set ( this.options.min + ( data.dragXY.X / this.stepWidth * this.options.step ) );

      } else {

        this.$highlight.translateX ( data.dragXY.X );

        this._updateLabel ( this._sanitizeValue ( this.options.min + ( data.dragXY.X / this.stepWidth * this.options.step ) ) );

      }

    }

    __dragEnd ( event, data ) {

      this.set ( this.options.min + ( data.dragXY.X / this.stepWidth * this.options.step ) );

    }

    /* API */

    get () {

      return this.options.value;

    }

    set ( value ) {

      value = this._sanitizeValue ( value );

      if ( _.isNaN ( value ) || value === this.options.value ) return;

      this.options.value = value;

      this._update ();

      this._trigger ( 'change' );

    }

    increase () {

      this.set ( this.options.value + this.options.step );

    }

    decrease () {

      this.set ( this.options.value - this.options.step );

    }

  }

  /* FACTORY */

  Factory.init ( Slider, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Sortable
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

//TODO: Better performance with tableHelper, just put the new addded row in the right position, performance boost
//TODO: Add support for sorting other things other than tables' rows

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'sortable',
    plugin: true,
    selector: 'table.sortable',
    options: {
      sorters: {
        int: function ( a, b ) {
          return parseInt ( a, 10 ) - parseInt ( b, 10 );
        },
        float: function ( a, b ) {
          return parseFloat ( a ) - parseFloat ( b );
        },
        string: function ( a, b ) {
          a = a.toLocaleLowerCase ();
          b = b.toLocaleLowerCase ();
          return a.localeCompare ( b );
        }
      },
      datas: {
        sorter: 'sort',
        value: 'sort-value'
      },
      classes: {
        sort: {
          asc: 'sort-asc',
          desc: 'sort-desc'
        }
      },
      selectors: {
        header: 'thead th',
        sortable: '[data-sort]',
        body: 'tbody',
        notEmptyRow: 'tr:not(.table-row-empty)',
        rowCell: 'td'
      },
      callbacks: {
        sort: _.noop
      }
    }
  };

  /* SORTABLE */

  class Sortable extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$table = this.$element;
      this.$headers = this.$table.find ( this.options.selectors.header );
      this.$sortables = this.$headers.filter ( this.options.selectors.sortable );
      this.$tbody = this.$table.find ( this.options.selectors.body );

      this.table = this.element;
      this.tbody = this.$tbody[0];

      this.sortData = {}; // Caching object for datas and references to rows
      this.isDirty = true;

      this.$currentSortable = false;
      this.currentIndex = false; // `$headers` index, not `$sortables` index
      this.currentDirection = false;

    }

    _init () {

      let $initial = this.$headers.filter ( '.' + this.options.classes.sort.asc + ', .' + this.options.classes.sort.desc ).first ();

      if ( $initial.length === 1 ) {

        this.sort ( this.$headers.index ( $initial ), ( $initial.hasClass ( this.options.classes.sort.asc ) ? 'asc' : 'desc' ) );

      }

    }

    _events () {

      this.___change ();
      this.___tap ();

    }

    /* CHANGE */

    ___change () {

      this._on ( true, 'change tablehelper:change', this.__change );

    }

    __change () {

      if ( this.currentIndex !== false ) {

        this.sortData = {};
        this.isDirty = true;

        this.sort ( this.currentIndex, this.currentDirection );

      }

    }

    /* TAP */

    ___tap () {

      this._on ( this.$sortables, Pointer.tap, this.__tap );

    }

    __tap ( event ) {

      let newIndex = this.$headers.index ( event.target ),
          newDirection = this.currentIndex === newIndex
                           ? this.currentDirection === 'asc'
                             ? 'desc'
                             : 'asc'
                           : 'asc';

      this.sort ( newIndex, newDirection );

    }

    /* SORT */

    sort ( index, direction ) {

      /* VALIDATE */

      let $sortable = this.$headers.eq ( index );

      if ( !$sortable.length ) return; // Bad index

      let sorterName = $sortable.data ( this.options.datas.sorter );

      if ( !sorterName ) return; // Unsortable column

      let sorter = this.options.sorters[sorterName];

      if ( !sorter ) return; // Unsupported sorter

      direction = ( direction && direction.toLowerCase () === 'desc' ) ? 'desc' : 'asc';

      /* CHECKING CACHED DATAS */

      if ( _.isUndefined ( this.sortData[index] ) || this.isDirty ) {

        /* VARIABLES */

        let $trs = this.$tbody.find ( this.options.selectors.notEmptyRow );

        this.sortData[index] = new Array ( $trs.length );

        /* POPULATE */

        for ( let i = 0, l = $trs.length; i < l; i++ ) {

          let $td = $trs.eq ( i ).find ( this.options.selectors.rowCell ).eq ( index ),
              value = $td.data ( this.options.datas.value ) || $td.text ();

          this.sortData[index][i] = [$trs[i], value];

        }

      }

      /* SORT */

      if ( index !== this.currentIndex || this.isDirty ) {

        this.sortData[index].sort ( function ( a, b ) {

          return sorter ( a[1], b[1] );

        });

      }

      /* REVERSING */

      let needReversing = false;

      if ( !this.isDirty && index === this.currentIndex && this.currentDirection !== false  ) {

        needReversing = ( direction !== this.currentDirection );

      } else {

        needReversing = ( direction === 'desc' );

      }

      if ( needReversing ) {

        this.sortData[index].reverse ();

      }

      /* REORDER */

      if ( index !== this.currentIndex || direction !== this.currentDirection || this.isDirty ) {

        this.table.removeChild ( this.tbody ); // Detach

        for ( let i = 0, l = this.sortData[index].length; i < l; i++ ) {

          this.tbody.appendChild ( this.sortData[index][i][0] ); // Reorder

        }

        this.table.appendChild ( this.tbody ); // Attach

      }

      /* STYLE */

      if ( index !== this.currentIndex || direction !== this.currentDirection ) {

        if ( this.$currentSortable ) {

          this.$currentSortable.removeClass ( this.options.classes.sort[this.currentDirection] );

        }

        $sortable.addClass ( this.options.classes.sort[direction] );

      }

      /* UPDATE */

      this.isDirty = false;

      this.$currentSortable = $sortable;
      this.currentIndex = index;
      this.currentDirection = direction;

      /* TRIGGER */

      this._trigger ( 'sort', {
        index: this.currentIndex,
        direction: this.currentDirection
      });

    }

  }

  /* FACTORY */

  Factory.init ( Sortable, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Stepper
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'stepper',
    plugin: true,
    selector: '.stepper',
    options: {
      min: 0,
      max: 100,
      value: 0,
      step: 1, // Only multiples of `step` are valid values
      datas: {
        min: 'min',
        max: 'max',
        step: 'step'
      },
      selectors: {
        decreaser: '.stepper-decreaser',
        increaser: '.stepper-increaser',
        input: 'input'
      },
      keystrokes: {
        'left, down': 'decrease',
        'right, up': 'increase'
      },
      callbacks: {
        change: _.noop
      }
    }
  };

  /* STEPPER */

  class Stepper extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$stepper = this.$element;
      this.$input = this.$stepper.find ( this.options.selectors.input );
      this.$decreaser = this.$stepper.find ( this.options.selectors.decreaser );
      this.$increaser = this.$stepper.find ( this.options.selectors.increaser );

      this._prevValue = false;

    }

    _init () {

      /* VARIABLES */

      let value = this.$input.val ();

      /* OPTIONS */

      this.options.min = Number ( this.$stepper.data ( this.options.datas.min ) || this.options.min );
      this.options.max = Number ( this.$stepper.data ( this.options.datas.max ) || this.options.max );
      this.options.step = Number ( this.$stepper.data ( this.options.datas.step ) || this.options.step );
      this.options.value = this._sanitizeValue ( value || this.options.value );

      /* UPDATE */

      if ( Number ( value ) !== this.options.value ) {

        this._update ();

      } else {

        this._updateButtons ();

      }

    }

    _events () {

      this.___inputChange ();

      this.___keydown ();

      this.___increaser ();
      this.___decreaser ();

    }

    /* PRIVATE */

    _sanitizeValue ( value ) {

      value = Number ( value );

      value = _.isNaN ( value ) ? 0 : _.roundCloser ( value, this.options.step );

      return _.clamp ( value, this.options.min, this.options.max );

    }

    /* INPUT / CHANGE */

    ___inputChange () {

      this._on ( true, this.$input, 'input change', this.__inputChange );

    }

    __inputChange () {

      this.set ( this.$input.val () );

    }

    /* KEYDOWN */

    ___keydown () {

      this._onHover ( [this.$document, 'keydown', this.__keydown] );

    }

    /* INCREASER */

    ___increaser () {

      this._on ( this.$decreaser, Pointer.tap, this.decrease );

    }

    /* DECREASER */

    ___decreaser () {

      this._on ( this.$increaser, Pointer.tap, this.increase );

    }

    /* UPDATE */

    _updateInput () {

      this.$input.val ( this.options.value ).trigger ( 'change' );

    }

    _updateButtons () {

      let isMin = ( this.options.value === this.options.min ),
          isMax = ( this.options.value === this.options.max );

      if ( isMin || this._prevValue === this.options.min ) {

        this.$decreaser.toggleClass ( this.options.classes.disabled, isMin );

      } else if ( isMax || this._prevValue === this.options.max ) {

        this.$increaser.toggleClass ( this.options.classes.disabled, isMax );

      }

    }

    _update () {

      this._updateInput ();
      this._updateButtons ();

    }

    /* API */

    get () {

      return this.options.value;

    }

    set ( value ) {

      value = Number ( value );

      if ( !_.isNaN ( value ) ) {

        value = this._sanitizeValue ( value );

        if ( value !== this.options.value ) {

          this._prevValue = this.options.value;

          this.options.value = value;

          this._update ();

          this._trigger ( 'change' );

          return;

        }

      }

      /* RESETTING IF WE ALTERED THE INPUT VALUE */

      if ( this.$input.val () !== String ( this.options.value ) ) {

        this._updateInput ();

      }

    }

    increase () {

      this.set ( this.options.value + this.options.step );

    }

    decrease () {

      this.set ( this.options.value - this.options.step );

    }

  }

  /* FACTORY */

  Factory.init ( Stepper, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Switch
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../draggable/draggable.js
 * @requires ../transform/transform.js
 * ========================================================================= */

//TODO: Add flick support

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'switch',
    plugin: true,
    selector: '.switch',
    options: {
      colors: {
        on: 'secondary',
        off: 'gray'
      },
      datas: {
        colors: {
          on: 'color-on',
          off: 'color-off'
        }
      },
      classes: {
        checked: 'checked'
      },
      selectors: {
        input: 'input',
        bar: '.switch-bar',
        handler: '.switch-handler'
      },
      keystrokes: {
        'left': 'uncheck',
        'right': 'check',
        'spacebar': 'toggle'
      },
      callbacks: {
        change: _.noop,
        check: _.noop,
        uncheck: _.noop
      }
    }
  };

  /* SWITCH */

  class Switch extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$switch = this.$element;
      this.$input = this.$switch.find ( this.options.selectors.input );
      this.$bar = this.$switch.find ( this.options.selectors.bar );
      this.$handler = this.$switch.find ( this.options.selectors.handler );

      this.isChecked = false;

      this.switchWidth = this.$switch.width ();
      this.handlerWidth = this.$handler.width ();

    }

    _init () {

      /* OPTIONS */

      this.options.colors.on = this.$switch.data ( this.options.datas.colors.on ) || this.options.colors.on;
      this.options.colors.off = this.$switch.data ( this.options.datas.colors.off ) || this.options.colors.off;

      /* CHECKED */

      if ( this.$input.prop ( 'checked' ) ) {

        this.check ();

      }

    }

    _events () {

      this.___change ();
      this.___keydown ();
      this.___drag ();

    }

    _destroy () {

      this.$handler.draggable ( 'destroy' );

    }

    /* CHANGE */

    ___change () {

      this._on ( true, this.$input, 'change', this.__change );

    }

    __change () {

      this.toggle ( this.$input.prop ( 'checked' ) );

    }

    /* KEYDOWN */

    ___keydown () {

      this._onHover ( [this.$document, 'keydown', this.__keydown] );

    }

    /* DRAG */

    ___drag () {

      this.$handler.draggable ({
        draggable: this.isEnabled.bind ( this ),
        axis: 'x',
        proxy: {
          $element: this.$switch,
          noMotion: false
        },
        constrainer: {
          $element: this.$switch
        },
        callbacks: {
          end: this.__dragEnd.bind ( this )
        }
      });

    }

    __dragEnd ( event, data ) {

      if ( data.motion ) {

        let isChecked = ( data.dragXY.X + ( this.handlerWidth / 2 ) ) >= ( this.switchWidth / 2 );

        this.toggle ( isChecked, true );

      } else {

        this.toggle ();

      }

    }

    /* UPDATE */

    _updatePosition () {

      this.$handler.translateX ( this.isChecked ? this.switchWidth - this.handlerWidth : 0 );

    }

    _updateColors () {

      this.$bar.toggleClass ( this.options.colors.on, this.isChecked );
      this.$bar.toggleClass ( this.options.colors.off, !this.isChecked );

      this.$handler.toggleClass ( this.options.colors.on, this.isChecked );
      this.$handler.toggleClass ( this.options.colors.off, !this.isChecked );

    }

    _updateInput () {

      this.$input.prop ( 'checked', this.isChecked ).trigger ( 'change' );

    }

    _update () {

      this._updatePosition ();
      this._updateColors ();
      this._updateInput ();

    }

    /* API */

    get () {

      return this.isChecked;

    }

    toggle ( force, _reset ) {

      if ( !_.isBoolean ( force ) ) {

        force = !this.isChecked;

      }

      if ( force !== this.isChecked ) {

        this.isChecked = force;

        this.$switch.toggleClass ( this.options.classes.checked, this.isChecked );

        this._update ();

        this._trigger ( 'change' );

        this._trigger ( this.isChecked ? 'check' : 'uncheck' );

      } else if ( _reset ) {

        this._updatePosition ();

      }

    }

    check () {

      this.toggle ( true );

    }

    uncheck () {

      this.toggle ( false );

    }

  }

  /* FACTORY */

  Factory.init ( Switch, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Table Helper
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tableHelper',
    plugin: true,
    selector: 'table.table',
    templates: {
      row: '<tr {%= ( o.id ? "class=" + o.id : "" ) %} >' +
             '{% for ( var i = 0, l = o.datas.length; i < l; i++ ) { %}' +
               '<td>' +
                 '{%=o.datas[i]%}' +
               '</td>' +
             '{% } %}' +
             '{% for ( var i = 0, l = o.missing; i < l; i++ ) { %}' +
               '<td></td>' +
             '{% } %}' +
           '</tr>'
    },
    options: {
      rowIdPrefix: 'srid',
      selectors: {
        header: 'thead',
        body: 'tbody',
        headerCell: 'th',
        rowCell: 'td',
        emptyRow: 'tr.table-row-empty',
        notEmptyRow: 'tr:not(.table-row-empty)'
      },
      callbacks: {
        change: _.noop,
        add: _.noop,
        update: _.noop,
        remove: _.noop,
        clear: _.noop
      }
    },
  };

  /* TABLE HELPER */

  class TableHelper extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$table = this.$element;
      this.$header = this.$table.find ( this.options.selectors.header );
      this.$body = this.$table.find ( this.options.selectors.body );
      this.$headerCells = this.$header.find ( this.options.selectors.headerCell );
      this.$emptyRow = this.$body.find ( this.options.selectors.emptyRow );

      this.columnsNr = this.$headerCells.length;

    }

    _init () {

      this._checkEmpty ();

    }

    /* PRIVATE */

    _checkEmpty () {

      let hasNonEmptyRows = !!this.$body.find ( this.options.selectors.notEmptyRow ).length;

      this.$emptyRow.toggleClass ( this.options.classes.hidden, hasNonEmptyRows );

    }

    _getRowId ( id ) {

      return this.options.rowIdPrefix + '_' + this.guid + '_' + id;

    }

    /* API */

    add ( id, ...datas ) {

      let rowId = id ? this._getRowId ( id ) : false;

      if ( datas.length ) {

        if ( rowId && $( '.' + rowId ).length === 1 ) return this;

        let chunks = _.chunk ( datas, this.columnsNr ),
            $rows = $();

        for ( let chunk of chunks ) {

          let rowHtml = this._tmpl ( 'row', { id: rowId, datas: chunk, missing: this.columnsNr - chunk.length } );

          $rows = $rows.add ( rowHtml );

        }

        this.$body.append ( $rows );

        this._checkEmpty ();

        this._trigger ( 'change' );

        this._trigger ( 'add', {
          $rows: $rows
        });

      }

    }

    update ( id, ...datas ) {

      let $row = $( '.' + this._getRowId ( id ) );

      if ( datas.length && $row.length === 1 ) {

        let $rowCells = $row.find ( this.options.selectors.rowCell );

        for ( let i = 0, l = datas.length; i < l; i++ ) {

          if ( _.isString ( datas[i] ) ) {

            $rowCells.eq ( i ).html ( datas[i] );

          }

        }

        this._trigger ( 'change' );

        this._trigger ( 'update', {
          $row: $row
        });

      }

    }

    remove ( id ) {

      let $row = $( '.' + this._getRowId ( id ) );

      if ( $row.length === 1 ) {

        $row.remove ();

        this._checkEmpty ();

        this._trigger ( 'change' );

        this._trigger ( 'remove', {
          $row: $row
        });

      }

    }

    clear () {

      let $rows = this.$body.find ( this.options.selectors.notEmptyRow );

      if ( $rows.length ) {

        $rows.remove ();

        this._checkEmpty ();

        this._trigger ( 'change' );

        this._trigger ( 'clear', {
          $rows: $rows
        });

      }

    }

  }

  /* FACTORY */

  Factory.init ( TableHelper, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Tabs
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

//TODO: Add again the super cool moving indicator
//TODO: Not well written, make it better
//TODO: Doesn't handle properly a change of the direction

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tabs',
    plugin: true,
    selector: '.tabs',
    options: {
      direction: 'top',
      highlight: true,
      classes: {
        active: {
          trigger: 'active',
          container: 'active'
        }
      },
      selectors: {
        triggers: '.tabs-triggers > *',
        containers: '.tabs-containers > *'
      },
      callbacks: {
        change: _.noop
      }
    }
  };

  /* TABS */

  class Tabs extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$tabs = this.$element;
      this.$triggers = this.$tabs.find ( this.options.selectors.triggers );
      this.$containers = this.$tabs.find ( this.options.selectors.containers );

      this.options.direction = _.getDirections ().find ( direction => this.$tabs.hasClass ( direction ) ) || this.options.direction;

      this.index = false;

    }

    _init () {

      let $active = this.$triggers.filter ( '.' + this.options.classes.active.trigger ).first (),
          index = this.$triggers.index ( $active );

      this.set ( index );

    }

    _events () {

      this.___tap ();

    }

    /* PRIVATE */

    _sanitizeIndex ( index ) {

      return _.clamp ( index, 0, this.$triggers.length );

    }

    /* TAP */

    ___tap () {

      this._on ( this.$triggers, Pointer.tap, this.__tap );

    }

    __tap ( event ) {

      let index = this.$triggers.index ( $(event.currentTarget) );

      this.set ( index );

    }

    /* SELECTION */

    _toggleSelection ( index, force ) {

      let $trigger = this.$triggers.eq ( index ),
          $container = this.$containers.eq ( index );

      $trigger.toggleClass ( this.options.classes.active.trigger, force );
      $container.toggleClass ( this.options.classes.active.container, force );

      if ( this.options.highlight ) {

        $trigger.toggleClass ( 'highlighted highlight-' + _.getOppositeDirection ( this.options.direction ), force );

      }

    }

    _select ( index ) {

      this._toggleSelection ( index, true );

    }

    _unselect ( index ) {

      this._toggleSelection ( index, false );

    }

    /* API */

    get () {

      return this.index;

    }

    set ( index ) {

      index = this._sanitizeIndex ( index );

      if ( index === this.index ) return;

      /* PREVIOUS */

      if ( _.isNumber ( this.index ) ) {

        this._unselect ( this.index );

      }

      /* NEW */

      this.index = index;

      this._select ( this.index );

      /* CALLBACKS */

      this._trigger ( 'change' );

    }

  }

  /* FACTORY */

  Factory.init ( Tabs, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Tagbox
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../noty/noty.js
 * @requires ../keyboard/keyboard.js
 * ========================================================================= */

//FIXME: Auto focus on the partial input doesn't work good on mobile
//FIXME: Destroy, reinit and add something like `aaaaaa`, it gets added at the beginning even if `options.sort` is setted to false

(function ( $, _, Svelto, Widgets, Factory, Pointer, Keyboard ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tagbox',
    plugin: true,
    selector: '.tagbox',
    templates: {
      tag: '<div class="label tagbox-tag {%=o.color%} {%=o.size%} {%=o.css%}" data-tag-value="{%=o.value%}">' +
             '<span>' +
               '{%=o.value%}' +
             '</span>' +
             '<div class="button gray compact rounded xxsmall tagbox-tag-remover">' +
               '<i class="icon">close</i>' +
             '</div>' +
           '</div>'
    },
    options: {
      init: '', // Initial value
      tags: [],
      tag: {
        minLength: 3,
        color: '',
        size: '',
        css: 'compact outlined'
      },
      characters: {
        forbid: true, // Forbid or not
        forbidden: [ '<', '>', ';', '`' ],
        separator: ',', // It will also become kind of a forbidden character, used for insertion
        inserters: [Keyboard.keys.ENTER, Keyboard.keys.TAB] // They are keyCodes
      },
      sort: false, // The tags will be outputted in alphanumeric-sort order
      escape: false, // Escape potential XSS characters
      deburr: false, // Replace non basic-latin characters
      messages: {
        tooShort: '`$1` is shorter than $2 characters',
        duplicate: '`$1` is a duplicate',
        forbidden: 'The character you entered is forbidden'
      },
      datas: {
        value: 'tag-value'
      },
      selectors: {
        input: 'input.hidden',
        partial: 'input.tagbox-partial, .tagbox-partial input',
        tags: '.tagbox-tags',
        tag: '.tagbox-tag',
        tagLabel: 'span',
        tagRemover: '.tagbox-tag-remover'
      },
      callbacks: {
        change: _.noop,
        add: _.noop,
        remove: _.noop,
        empty: _.noop
      }
    }
  };

  /* TAGBOX */

  class Tagbox extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$tagbox = this.$element;
      this.$tags = this.$tagbox.find ( this.options.selectors.tags );
      this.$input = this.$tagbox.find ( this.options.selectors.input );
      this.$partial = this.$tagbox.find ( this.options.selectors.partial );

    }

    _init ( suppressTriggers ) {

      /* OPTIONS */

      this.options.init = this.$input.val () || this.options.init;

      /* POPULATING */

      this.add ( this.options.init, suppressTriggers );

    }

    _events () {

      this.___partial ();

      this.___tapOnEmpty ();
      this.___tapOnTagRemover ();

    }

    /* PRIVATE */

    _sanitizeTag ( value ) {

      value = _.trim ( value );

      if ( this.options.escape ) {

        value = _.escape ( value );

      }

      if ( this.options.deburr ) {

        value = _.deburr ( value );

      }

      return value;

    }

    _getTagHtml ( value ) {

      return this._tmpl ( 'tag', _.extend ( { value: value }, this.options.tag ) );

    }

    _clearPartial () {

      this.$partial.val ( '' ).trigger ( 'change' );

    }

    /* UPDATE */

    _updateInput () {

      this.$input.val ( this.options.tags.join ( this.options.characters.separator ) ).trigger ( 'change' );

    }

    /* TAG */

    _add ( value ) {

      let valueTrimmed = _.trim ( value );

      value = this._sanitizeTag ( value );

      if ( valueTrimmed.length < this.options.tag.minLength ) {

        if ( valueTrimmed.length ) { // So it won't be triggered when the user presses enter and the $partial is empty

          $.noty ( _.format ( this.options.messages.tooShort, value, this.options.tag.minLength ) );

        }

      } else if ( _.contains ( this.options.tags, value ) ) {

        $.noty ( _.format ( this.options.messages.duplicate, value ) );

      } else {

        this.options.tags.push ( value );

        if ( this.options.sort ) {

          this.options.tags.sort ();

        }

        let tagHtml = this._getTagHtml ( value );

        if ( this.options.tags.length === 1 ) {

          this.$tags.prepend ( tagHtml );

        } else if ( !this.options.sort ) {

          this.$tagbox.find ( this.options.selectors.tag ).last ().after ( tagHtml );

        } else {

          let index = this.options.tags.indexOf ( value );

          if ( index === 0 ) {

            this.$tagbox.find ( this.options.selectors.tag ).first ().before ( tagHtml );

          } else {

            this.$tagbox.find ( this.options.selectors.tag ).eq ( index - 1 ).after ( tagHtml );

          }

        }

        return true;

      }

      return false;

    }

    _remove ( $tag, tag ) {

      $tag.remove ();

      _.pull ( this.options.tags, tag );

    }

    /* PARTIAL */

    ___partial () {

      this._on ( this.$partial, 'keypress keydown', this.__keypressKeydown ); // `keypress` is for printable characters, `keydown` for the others

      this._on ( this.$partial, 'paste', this.__paste );

    }

    /* KEYPRESS / KEYDOWN */

    __keypressKeydown ( event ) {

      let value = this.$partial.val ();

      if ( _.contains ( this.options.characters.inserters, event.keyCode ) || event.keyCode === this.options.characters.separator.charCodeAt ( 0 ) ) {

        let added = this.add ( value );

        if ( added ) {

          this._clearPartial ();

        }

        event.preventDefault ();
        event.stopImmediatePropagation ();

      } else if ( event.keyCode === Keyboard.keys.BACKSPACE ) {

        if ( !value.length && this.options.tags.length ) {

          let $tag = this.$tagbox.find ( this.options.selectors.tag ).last (),
              edit = !$.hasCtrlOrCmd ( event );

          this.remove ( $tag, edit );

          event.preventDefault ();
          event.stopImmediatePropagation ();

        }

      } else if ( this.options.characters.forbid && _.contains ( this.options.characters.forbidden, String.fromCharCode ( event.keyCode ) ) ) {

        $.noty ( this.options.messages.forbidden );

        event.preventDefault ();
        event.stopImmediatePropagation ();

      }

    }

    /* PASTE */

    __paste ( event ) {

        this.add ( event.originalEvent.clipboardData.getData ( 'text' ) );

        event.preventDefault ();
        event.stopImmediatePropagation ();

    }

    /* TAP ON TAG REMOVER */

    ___tapOnTagRemover () {

      this._on ( Pointer.tap, this.options.selectors.tagRemover, this.__tapOnTagRemover );

    }

    __tapOnTagRemover ( event ) {

      let $tag = $(event.currentTarget).closest ( this.options.selectors.tag );

      this.remove ( $tag );

    }

    /* TAP ON EMPTY */

    ___tapOnEmpty () {

      this._on ( Pointer.tap, this.__tapOnEmpty );

    }

    __tapOnEmpty ( event ) {

      if ( document.activeElement !== this.$partial[0] && !$(event.target).is ( this.options.selectors.partial + ',' + this.options.selectors.tagLabel ) ) {

        this.$partial.focus ();

      }

    }

    /* API */

    get () {

      return _.clone ( this.options.tags );

    }

    add ( tag, suppressTriggers ) { // The tag can be a string containing a single tag, multiple tags separated by `this.options.characters.separator`, or it can be an array (nested or not) of those strings

      if ( _.isArray ( tag ) ) {

        tag = _.flatten ( tag ).join ( this.options.characters.separator );

      }

      let tags = tag.split ( this.options.characters.separator ),
          adds = _.map ( tags, this._add, this );

      let added = !!_.compact ( adds ).length;

      if ( added ) {

        this._updateInput ();

        if ( !suppressTriggers ) {

          this._trigger ( 'change' );

          let addedTags = _.filter ( tags, ( tag, index ) => adds[index] );

          this._trigger ( 'add', addedTags );

        }

      }

      return added;

    }

    remove ( tag, edit, suppressTriggers ) { // The tag can be a string containing a single tag, multiple tags separated by `this.options.characters.separator`, or it can be an array (nested or not) of those strings. In addition it can also be the jQuery object of that tag.

      let $tags = [],
          tags = [];

      if ( tag instanceof $ ) {

        $tags = [tag];
        tags = [tag.data ( this.options.datas.value )];

      } else {

        if ( _.isArray ( tag ) ) {

          tag = _.flatten ( tag ).join ( this.options.characters.separator );

        }

        tag = tag.split ( this.options.characters.separator );

        for ( let i = 0, l = tag.length; i < l; i++ ) {

          let value = this._sanitizeTag ( tag[i] ),
              $tag = this.$tagbox.find ( this.options.selectors.tag + '[data-' + this.options.datas.value + '="' + value.replace ( /"/g, '\\"' ) + '"]' );

          if ( $tag.length === 1 ) {

            $tags.push ( $tag );
            tags.push ( value );

          }

        }

      }

      if ( tags.length ) {

        for ( let i = 0, l = tags.length; i < l; i++ ) {

          this._remove ( $tags[i], tags[i] );

        }

        this._updateInput ();

        if ( tags.length === 1 && edit === true ) {

          this.$partial.val ( tags[0] ).trigger ( 'change' );

        }

        if ( !suppressTriggers ) {

          this._trigger ( 'change' );

          this._trigger ( 'remove', tags );

          if ( !this.options.tags.length ) {

            this._trigger ( 'empty' );

          }

        }

      }

    }

    clear ( suppressTriggers ) {

      if ( this.options.tags.length ) {

        let previous = this.options.tags;

        this.options.tags = [];

        this.$tagbox.find ( this.options.selectors.tag ).remove ();

        this._clearPartial ();

        this._updateInput ();

        if ( !suppressTriggers ) {

          this._trigger ( 'change' );

          this._trigger ( 'remove', previous );

          this._trigger ( 'empty' );

        }

      }

    }

    reset () {

      let previous = this.options.tags;

      this.clear ( true );

      this._init ( true );

      if ( !_.isEqual ( previous, this.options.tags ) ) {

        this._trigger ( 'change' );

        let added = _.difference ( this.options.tags, previous );

        if ( added.length ) {

          this._trigger ( 'add', added );

        }

        let removed = _.difference ( previous, this.options.tags );

        if ( removed.length ) {

          this._trigger ( 'remove', removed );

        }

        if ( !this.options.tags.length ) {

          this._trigger ( 'empty' );

        }

      }

    }

  }

  /* FACTORY */

  Factory.init ( Tagbox, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Keyboard ));


/* =========================================================================
 * Svelto - Time Ago
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'timeAgo',
    plugin: true,
    selector: '.timeago, .time-ago',
    options: {
      timestamp: false, // UNIX timestamp
      title: false, // Update the title or the text?
      datas: {
        timestamp: 'timestamp'
      },
      callbacks: {
        change: _.noop
      }
    }
  };

  /* TIME AGO */

  class TimeAgo extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$timeAgoElement = this.$element;

    }

    _init () {

      if ( !this.options.timestamp ) {

        this.options.timestamp = this.$timeAgoElement.data ( this.options.datas.timestamp );

      }

      if ( this.isEnabled () ) {

        this._loop ();

      }

    }

    _destroy () {

      clearTimeout ( this.loopId );

    }

    /* LOOP */

    _loop ( seconds = 0 ) {

      this.loopId = this._delay ( function () {

        this._loop ( this._update ().next );

      }, seconds * 1000 );

    }

    /* UPDATE */

    _update () {

      let timeAgo = _.timeAgo ( this.options.timestamp );

      if ( this.options.title ) {

        this.$timeAgoElement.attr ( 'title', timeAgo.str );

      } else {

        this.$timeAgoElement.text ( timeAgo.str );

      }

      this._trigger ( 'change' );

      return timeAgo;

    }

    /* API OVERRIDES */

    enable () {

      super.enable ();

      this._loop ();

    }

    disable () {

      super.disable ();

      clearTimeout ( this.loopId );

    }

  }

  /* FACTORY */

  Factory.init ( TimeAgo, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Timer ));


/* =========================================================================
 * Svelto - Tooltip
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../dropdown/dropdown.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tooltip',
    selector: '.tooltip'
  };

  /* TOOLTIP */

  class Tooltip extends Widgets.Dropdown {}

  /* FACTORY */

  Factory.init ( Tooltip, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Tooltip (Closer)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires tooltip.js
 * @requires ../closer/closer.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tooltipCloser',
    plugin: true,
    selector: '.tooltip-closer',
    options: {
      widget: Widgets.Tooltip
    }
  };

  /* TOOLTIP CLOSER */

  class TooltipCloser extends Widgets.Closer {}

  /* FACTORY */

  Factory.init ( TooltipCloser, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Tooltip (Opener)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires tooltip.js
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tooltipOpener',
    plugin: true,
    selector: '.tooltip-opener',
    options: {
      widget: Widgets.Tooltip,
      hover: {
        active: true
      }
    }
  };

  /* TOOLTIP OPENER */

  class TooltipOpener extends Widgets.Opener {}

  /* FACTORY */

  Factory.init ( TooltipOpener, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Tooltip (Toggler)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires tooltip.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tooltipToggler',
    plugin: true,
    selector: '.tooltip-toggler',
    options: {
      widget: Widgets.Tooltip,
      hover: {
        active: true
      }
    }
  };

  /* TOOLTIP TOGGLER */

  class TooltipToggler extends Widgets.Toggler {}

  /* FACTORY */

  Factory.init ( TooltipToggler, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

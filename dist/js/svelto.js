
/* =========================================================================
 * Svelto - Svelto
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

//TODO: Remove the _ dependency, after all we use it only for a few functions (or create a slimmed down version of lodash to load only when needed)

(function ( window, document, undefined ) {

  'use strict';

  /* SVELTO */

  window.Svelto = {
    version: '0.2.0-beta.7',
    $: jQuery || Zepto || ( $ && ( 'jquery' in $() || 'zepto' in $ ) ? $ : false ),
    _: lodash || ( _ && 'VERSION' in _ && Number ( _.VERSION[0] ) >= 3 ? _ : false )
  };

  /* KEY CODE */

  Svelto.keyCode = {
    BACKSPACE: 8,
    COMMA: 188,
    DELETE: 46,
    DOWN: 40,
    END: 35,
    ENTER: 13,
    ESCAPE: 27,
    HOME: 36,
    LEFT: 37,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    PERIOD: 190,
    RIGHT: 39,
    SPACE: 32,
    TAB: 9,
    UP: 38
  };

  /* MOUSE BUTTON */

  Svelto.mouseButton = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
  };

  /* ANIMATION */

  Svelto.animation = {
    slow: 500,
    normal: 350,
    fast: 150
  };

  /* COLORS */

  Svelto.colors = {
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

  /* ERRORS */

  if ( !Svelto.$ ) {

    throw new Error ( 'Svelto depends upon jQuery, dependency unmet' );

  }

  if ( !Svelto._ ) {

    throw new Error ( 'Svelto depends upon lo-dash, dependency unmet' );

  }

}( window, document ));


/* =========================================================================
 * Svelto - Lo-dash (Extras)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

//TODO: Add something like a _.oppositeDirection ( direction )

(function ( _, window, document, undefined ) {

  'use strict';

  /* LODASH EXTRA */

  _.mixin ({

    nowSecs () {

      return Math.floor ( _.now () / 1000 );

    },

    timeAgo ( timestamp ) { //INFO: Timestamp is required in seconds

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

    clamp ( minimum, value, maximum ) {

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

    }

  });

}( Svelto._, window, document ));


/* =========================================================================
 * Svelto - Browser
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  let userAgent  = navigator.userAgent ? navigator.userAgent.toLowerCase () : '',
      vendor     = navigator.vendor ? navigator.vendor.toLowerCase () : '', //INFO: Fixes an IE10 bug, `navigator.vendor` it's `undefined` there
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

  $.browser = {
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

}( Svelto.$, Svelto._, window, document ));


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

  $.fn.unscrollable = function () {

    //TODO: Preserve the scrollbars if possible

    return this.addClass ( 'overflow-hidden' );

  };

  $.fn.scrollable = function () {

    return this.removeClass ( 'overflow-hidden' );

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


/* =========================================================================
 * Svelto - Core
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * @requires ../extras/lodash-extra.js
 * @requires ../extras/jQuery-extra.js
 * ========================================================================= */


/* =========================================================================
 * Svelto - Tmpl
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
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

(function ( $, _, window, document, undefined ) {

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

  tmpl.cache = {};

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

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Widget
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../tmpl/tmpl.js
 * ========================================================================= */

//TODO: Add support for remove, right know it doesn't get triggered on `.remove ()` but only on `.trigger ( 'remove' )`, but maybe there's no way of doing it...

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'widget', //INFO: The name of widget, it will be used for the the jquery pluing `$.fn[name]` and for triggering widget events `name + ':' + event`
    selector: undefined, //INFO: The selector used to select the website in the DOM, used for `Widgetize`
    templates: {
      base: false //INFO: It will be used as the constructor if no element is provided
    },
    options: {
      characters: {}, //INFO: Used to store some characters needed by the widget
      regexes: {}, //INFO: Contains the used regexes
      errors: { //INFO: It contains all the errors that a widget can trigger
        uninitializable: 'This widget can\'t be initialized, no element or base template have been provided' //INFO: Triggered when the widget is not initializable
      },
      messages: {}, //INFO: Messages that the widget somewhere outputs, maybe with a `$.noty`, maybe just logs it
      attributes: {}, //INFO: Attributes used by the widget
      datas: {}, //INFO: CSS data-* names
      classes: { //INFO: CSS classes to attach inside the widget
        disabled: 'disabled' //INFO: Attached to disabled widgets
      },
      selectors: {}, //INFO: Selectors to use inside the widget
      animations: {}, //INFO: Object storing all the milliseconds required for each animation to occur
      callbacks: {} //INFO: Callbacks to trigger on specific events
    }
  };

  /* WIDGET */

  class Widget {

    constructor ( options, element ) {

      /* ATTACH CONFIG */

      _.extend ( this, this._getConfig ( options, element ) );

      /* CHECK IF INITIALIZABLE */

      if ( !element && !this.templates.base ) {

        this._throw ( this.errors.uninitializable );

      }

      /* CACHE TEMPLATES */

      for ( let tmpl in this.templates ) {

        if ( this.templates[tmpl] ) {

          let tmplName = this.name + '.' + tmpl;

          if ( !(tmplName in $.tmpl.cache) ) {

            $.tmpl.cache[tmplName] = $.tmpl ( this.templates[tmpl] );

          }

        }

      }

      /* INIT ELEMENT */

      this.$element = $( element || this._tmpl ( 'base', this.options ) );
      this.element = this.$element[0];

      /* ATTACH INSTANCE */

      $.data ( this.element, 'instance.' + this.name, this );

      /* SET GUID */

      this.guid = $.guid++;

      /* CALLBACKS */

      this._variables ();
      this._init ();
      this._events ();

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

      configs.push ( {} ); //INFO: So that we merge them to a new object

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

      if ( options ) {

        configs.push ({ options: options });

      }

      /* CREATE OPTIONS */

      let createOptions = this._createOptions ();

      if ( createOptions ) {

        configs.push ({ options: createOptions });

      }

      /* RETURN */

      return _.merge ( ...configs );

    }

    destroy () {

      this._destroy ();

      $.removeData ( this.element, 'instance.' + this.name );

    }

    /* SPECIAL */

    _createOptions () {} //INFO: Used to pass extra options

    static widgetize ( $widget, name ) { //INFO: Add a widget instance to the $widget

      $widget[name]();

    }

    _variables () {} //INFO: Init your variables inside this function
    _init () {} //INFO: Perform the init stuff inside this function
    _events () {} //INFO: Bind the event handlers inside this function

    _destroy () {} //INFO: Clean the stuff, remove possible memory leaks

    /* WIDGET */

    widget () {

      return this.$element;

    }

    /* INSTANCE */

    instance () {

      return this;

    }

    /* OPTIONS */

    option ( key, value ) {

      if ( !key ) {

        return _.cloneDeep ( this.options );

      } else if ( _.isString ( key ) ) {

        if ( _.isUndefined ( value ) ) {

          return _.cloneDeep ( _.get ( this.options, key ) );

        } else {

          _.set ( this.options, key, value );

        }

      } else if ( _.isPlainObject ( key ) ) {

        for ( let prop in key ) {

          if ( key.hasOwnProperty ( prop ) ) {

            _.set ( this.options, prop, key[prop] );

          }

        }

      }

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

    _on ( suppressDisabledCheck, $element, events, selector, handler, onlyOne ) {

      //TODO: Add support for custom data

      /* NORMALIZING PARAMETERS */

      if ( !_.isBoolean ( suppressDisabledCheck ) ) {

        onlyOne = handler;
        handler = selector;
        selector = events;
        events = $element;
        $element = suppressDisabledCheck;
        suppressDisabledCheck = false;

      }

      if ( !( $element instanceof $ ) ) {

        onlyOne = handler;
        handler = selector;
        selector = events;
        events = $element;
        $element = this.$element;

      }

      if ( !_.isString ( selector ) ) {

        onlyOne = handler;
        handler = selector;
        selector = false;

      }

      /* PROXY */

      let handlerProxy = ( ...args ) => {

        if ( !suppressDisabledCheck && this.$element.hasClass ( this.options.classes.disabled ) ) return; //FIXME: Is keeping a reference to `suppressDisabledCheck` wasted leak? Even if so tiny

        return handler.apply ( this, args );

      };

      /* PROXY GUID */

      handlerProxy.guid = handler.guid = ( handler.guid || $.guid++ );

      /* EVENTS NAMESPACING */

      events = events.split ( /\s+/ ).map ( event => event + '.swns' + this.guid ).join ( ' ' );

      /* TRIGGERING */

      $element[onlyOne ? 'one' : 'on'] ( events, selector, handlerProxy );

    }

    _one ( ...args ) {

      return this._on ( ...args, true );

    }

    _onHover ( $element, args ) {

      //FIXME: If we remove the target we are still attaching and removing those events though (just performing the functions calls actually, probably)

      if ( !args ) {

        args = $element;
        $element = this.$element;

      }

      this._on ( $element, Pointer.enter, () => this._on ( ...args ) );
      this._on ( $element, Pointer.leave, () => this._off ( ...args ) );

    }

    //TODO: Add a _offHover (Is it needed?)

    _off ( $element, events, handler ) {

      /* NORMALIZING PARAMETERS */

      if ( !handler ) {

        handler = events;
        events = $element;
        $element = this.$element;

      }

      /* EVENTS NAMESPACING */

      events = events.split ( /\s+/ ).map ( event => event + '.swns' + this.guid ).join ( ' ' );

      /* REMOVING HANDLER */

      $element.off ( events, handler );

    }

    _trigger ( events, data = {} ) {

      let name = this.name.toLowerCase ();

      events = events.split ( ' ' );

      for ( let event of events ) {

        this.$element.trigger ( name + ':' + event, data );

        this.options.callbacks[event].call ( this.element, data );

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

  /* BINDING */

  Svelto.Widget = Widget;
  Svelto.Widget.config = config;

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Widgetize
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* WIDGETIZE */

  window.Widgetize = new class {

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

        if ( this.widgetizers[selector].length === 0 ) {

          delete this.widgetizers[selector];

        }

      }

    }

    on ( $roots ) {

      for ( let selector in this.widgetizers ) {

        if ( this.widgetizers.hasOwnProperty ( selector ) ) {

          this.trigger ( selector, $roots.filter ( selector ) );
          this.trigger ( selector, $roots.find ( selector ) );

        }

      }

    }

    trigger ( selector, $widgets ) {

      for ( let widget of $widgets ) {

        for ( let [widgetizer, data] of this.widgetizers[selector] ) {

          widgetizer ( $(widget), data );

        }

      }

    }

  };

  /* JQUERY PLUGIN */

  $.fn.widgetize = function () {

    Widgetize.on ( this );

    return this;

  };

  /* READY */

  $(function () {

    $body.widgetize ();

  });

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Pointer
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../browser/browser.js
 * ========================================================================= */

//INFO: Basically it exists other than to provide the convinient `Pointer` global also for removing the 300ms delay on click by providing the `tap` event

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  window.Pointer = {
    options: {
      events: {
        prefix: 'spointer'
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
    click: 'click',
    dblclick: 'dblclick',
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

  let $document = $(document),
      target,
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

    if ( !$.browser.is.touchDevice || !motion ) {

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

  $document.on ( Pointer.down, downHandler );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Factory
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../widget/widget.js
 * @requires ../widgetize/widgetize.js
 * @requires ../tmpl/tmpl.js
 * @requires ../pointer/pointer.js
 *=========================================================================*/

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* FACTORY */

  $.factory = function ( Widget ) {

    /* WIDGETIZE */

    $.factory.widgetize ( Widget );

    /* PLUGIN */

    $.factory.plugin ( Widget );

  };

  /* FACTORY WIDGETIZE */

  $.factory.widgetize = function ( Widget ) {

    if ( Widget.config.selector ) {

      Widgetize.add ( Widget.config.selector, Widget.widgetize, Widget.config.name );

    }

  };

  /* FACTORY PLUGIN */

  $.factory.plugin = function ( Widget ) {

    /* NAME */

    let name = Widget.config.name;

    /* JQUERY PLUGIN */

    $.fn[name] = function ( options, ...args ) {

      if ( _.isString ( options ) ) { //INFO: Calling a method

        if ( options.charAt ( 0 ) !== '_' ) { //INFO: Not a private method or property

          /* METHOD CALL */

          for ( let element of this ) {

            /* VARIABLES */

            let instance = $.factory.instance ( Widget, false, element );

            /* CHECKING VALID CALL */

            if ( !_.isFunction ( instance[options] ) ) continue; //INFO: Not a method

            /* CALLING */

            let returnValue = instance[options]( ...args );

            if ( !_.isUndefined ( returnValue ) ) {

              return returnValue;

            }

          }

        }

      } else {

        /* INSTANCE */

        for ( let element of this ) {

          $.factory.instance ( Widget, options, element );

        }

      }

      return this;

    };

  };

  /* FACTORY INSTANCE */

  $.factory.instance = function ( Widget, options, element ) {

    let name = Widget.config.name,
        instance = $.data ( element, 'instance.' + name );

    if ( !instance ) {

      instance = new Widget ( options, element );

    }

    return instance;

  };

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Expander
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'expander',
    selector: '.expander',
    options: {
      classes: {
        open: 'open'
      },
      selectors: {
        toggler: '.expander-toggler'
      },
      callbacks: {
        open () {},
        close () {}
      }
    }
  };

  /* EXPANDER */

  class Expander extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$expander = this.$element;
      this.$togglers = this.$expander.find ( this.options.selectors.toggler );

      this._isOpen = this.$expander.hasClass ( this.options.classes.open );

    }

    _events () {

      /* TOGGLER */

      this._on ( this.$togglers, Pointer.tap, this.toggle );

    }

    /* API */

    isOpen () {

      return this._isOpen;

    }

    toggle ( force ) {

      if ( !_.isBoolean ( force ) ) {

        force = !this._isOpen;

      }

      if ( force !== this._isOpen ) {

        this._isOpen = force;

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

  /* BINDING */

  Svelto.Expander = Expander;
  Svelto.Expander.config = config;

  /* FACTORY */

  $.factory ( Svelto.Expander );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Accordion
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../expander/expander.js
 * @requires ../factory/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'accordion',
    selector: '.accordion',
    options: {
      multiple: false, //INFO: Wheter to keep multiple expanders open or just one
      selectors: {
        expander: Svelto.Expander.config.selector
      },
      callbacks: {
        open () {},
        close () {}
      }
    }
  };

  /* ACCORDION */

  class Accordion extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$accordion = this.$element;
      this.$expanders = this.$accordion.children ( this.options.selectors.expander );

      this.instances = this.$expanders.get ().map ( expander => $(expander).expander ( 'instance' ) );

    }

    _events () {

      /* EXPANDER OPEN */

      this._on ( true, this.$expanders, 'expander:open', this.__open );

      /* EXPANDER CLOSE */

      this._on ( true, this.$expanders, 'expander:close', this.__close );

    }

    /* EXPANDER OPEN */

    __open ( event ) {

      this._trigger ( 'open', { index: this.$expanders.index ( event.target) } );

      /* SINGLE */

      if ( !this.options.multiple ) {

        /* CLOSE OTHERS */

        for ( let i = 0, l = this.$expanders.length; i < l; i++ ) {

          if ( this.$expanders[i] !== event.target ) {

            this.instances[i].close ();

          }

        }

      }

    }

    /* EXPANDER CLOSE */

    __close ( event ) {

      this._trigger ( 'close', { index: this.$expanders.index ( event.target) } );

    }

    /* API OVERRIDES */

    enable () {

      _.invoke ( this.instances, 'enable' );

    }

    disable () {

      _.invoke ( this.instances, 'disable' );

    }

    /* API */

    areOpen () {

      return _.invoke ( this.instances, 'isOpen' );

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

  /* BINDING */

  Svelto.Accordion = Accordion;
  Svelto.Accordion.config = config;

  /* FACTORY */

  $.factory ( Svelto.Accordion );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Autogrow - Input
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../../factory/factory.js
 * ========================================================================= */

//INFO: It supports only `box-sizing: border-box` inputs

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'autogrowInput',
    selector: 'input.autogrow',
    options: {
      callbacks: {
        update () {}
      }
    }
  };

  /* AUTOGROW INPUT */

  class AutogrowInput extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$input = this.$element;

      this.ctx = document.createElement ( 'canvas' ).getContext ( '2d' );

    }

    _init () {

      this._update ();

    }

    _events () {

      /* INPUT / CHANGE */

      this._on ( true, 'input change', this._update );

    }

    /* PRIVATE */

    _getNeededWidth () {

      this.ctx.font = this.$input.css ( 'font' );

      return this.ctx.measureText ( this.$input.val () ).width;

    }

    _update () {

      this.$input.width ( this._getNeededWidth () );

      this._trigger ( 'update' );

    }

  }

  /* BINDING */

  Svelto.AutogrowInput = AutogrowInput;
  Svelto.AutogrowInput.config = config;

  /* FACTORY */

  $.factory ( Svelto.AutogrowInput );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Autogrow - Textarea
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../../factory/factory.js
 * ========================================================================= */

//INFO: It supports only `box-sizing: border-box` textareas

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'autogrowTextarea',
    selector: 'textarea.autogrow',
    options: {
      callbacks: {
        update () {}
      }
    }
  };

  /* AUTOGROW TEXTAREA */

  class AutogrowTextarea extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$textarea = this.$element;

    }

    _init () {

      this._update ();

    }

    _events () {

      /* INPUT / CHANGE */

      this._on ( true, 'input change', this._update );

    }

    /* PRIVATE */

    _getNeededHeight () {

      //TODO: Do it with canvas, if possible, improve the performance in general

      return this.$textarea.height ( 0 )[0].scrollHeight - parseFloat ( this.$textarea.css ( 'padding-top' ) ) - parseFloat ( this.$textarea.css ( 'padding-bottom' ) );

    }

    _update () {

      this.$textarea.height ( this._getNeededHeight () );

      this._trigger ( 'update' );

    }

  }

  /* BINDING */

  Svelto.AutogrowTextarea = AutogrowTextarea;
  Svelto.AutogrowTextarea.config = config;

  /* FACTORY */

  $.factory ( Svelto.AutogrowTextarea );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Blurred
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* BLURRED */

  $.fn.blurred = function ( force ) {

    return this.toggleClass ( 'blurred', force );

  };

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Boilerplate
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'boilerplate',
    selector: undefined,
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
      callbacks: {}
    }
  };

  /* BOILERPLATE */

  class Boilerplate extends Svelto.Widget {

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

  /* BINDING */

  Svelto.Boilerplate = Boilerplate;
  Svelto.Boilerplate.config = config;

  /* FACTORY */

  $.factory ( Svelto.Boilerplate );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - BT (BinaryTree) Each
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* BINARY TREE .each () */

  $.fn.btEach = function ( callback, startIndex ) {

    return _.btEach ( this, callback, startIndex );

  };

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Carousel
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

//TODO: Add slides drag support

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'carousel',
    selector: '.carousel',
    options: {
      startIndex: 0,
      cycle: false,
      interval: 5000,
      intervalMinimumRemaining: 1000,
      classes: {
        prev: 'prev',
        current: 'current'
      },
      selectors: {
        prev: '.carousel-prev',
        next: '.carousel-next',
        indicator: '.carousel-indicator',
        itemsWrp: '.carousel-items',
        item: ' > *'
      },
      animations: {
        cycle: Svelto.animation.normal
      },
      callbacks: {
        change () {}
      }
    },
  };

  /* CAROUSEL */

  class Carousel extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$carousel = this.$element;
      this.$prev = this.$carousel.find ( this.options.selectors.prev );
      this.$next = this.$carousel.find ( this.options.selectors.next );
      this.$indicators = this.$carousel.find ( this.options.selectors.indicator );
      this.$itemsWrp = this.$carousel.find ( this.options.selectors.itemsWrp );
      this.$items = this.$itemsWrp.find ( this.options.selectors.item );

      this.maxIndex = this.$items.length - 1;

      this._previous = false;
      this._current = false;

      this.timer = new Timer ( this.next.bind ( this ), this.options.interval, false );

    }

    _init () {

      let $current = this.$items.filter ( '.' + this.options.classes.current ).first ();

      if ( $current.length > 0 ) {

        this._current = this._getItemObj ( this.$items.index ( $current ) );

      } else {

        this.set ( this.options.startIndex );

      }

    }

    _events () {

      /* PREV */

      this._on ( this.$prev, Pointer.tap, this.previous );

      /* NEXT */

      this._on ( this.$next, Pointer.tap, this.next );

      /* KEYDOWN */

      this._onHover ( [$document, 'keydown', this.__keydown] );

      /* INDICATOR TAP */

      this._on ( this.$indicators, Pointer.tap, this.__indicatorTap );

      /* CYCLE */

      this._on ( this.$itemsWrp, Pointer.enter, this.__cycleEnter );
      this._on ( this.$itemsWrp, Pointer.leave, this.__cycleLeave );

    }

    /* KEYDOWN */

    __keydown ( event ) {

      switch ( event.keyCode ) {

        case Svelto.keyCode.LEFT:
        case Svelto.keyCode.UP:
          this.previous ();
          break;

        case Svelto.keyCode.RIGHT:
        case Svelto.keyCode.DOWN:
        case Svelto.keyCode.SPACE:
          this.next ();
          break;

        default:
          return;

      }

      event.preventDefault ();
      event.stopImmediatePropagation ();

    }

    /* CYCLE */

    __cycleEnter () {

      if ( this.options.cycle ) {

        this.timer.pause ();

      }

    }

    __cycleLeave () {

      if ( this.options.cycle ) {

        this.timer.remaining ( Math.max ( this.options.intervalMinimumRemaining, this.timer.remaining () || 0 ) );

        this.timer.play ();

      }

    }

    /* INDICATOR TAP */

    __indicatorTap ( event ) {

      this.set ( this.$indicators.index ( event.currentTarget ) );

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

      if ( this.options.cycle || this._wasCycle ) {

        this.play ();

      }

    }

    disable () {

      super.disable ();

      this._wasCycle = this.options.cycle;

      if ( this.options.cycle ) {

        this.stop ();

      }

    }

    /* API */

    get () {

      return this._current.index;

    }

    set ( index ) {

      index = Number ( index );

      if ( !this._setting && !_.isNaN ( index ) && index >= 0 && index <= this.maxIndex && ( !this._current || index !== this._current.index ) ) {

        this._setting = true;

        if ( this._current ) {

          this._current.$item.removeClass ( this.options.classes.current ).addClass ( this.options.classes.prev );
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

          this._setting = false;

          if ( this._previous ) {

            this._previous.$item.removeClass ( this.options.classes.prev );

          }

          if ( this.options.cycle ) {

            this.timer.play ();

          }

        }, this.options.animations.cycle );

        this._trigger ( 'change' );

      }

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
      this.timer.remaining ( Math.max ( this.options.intervalMinimumRemaining, this.timer.remaining () || 0 ) );
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

  /* BINDING */

  Svelto.Carousel = Carousel;
  Svelto.Carousel.config = config;

  /* FACTORY */

  $.factory ( Svelto.Carousel );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Color
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

//TODO: Add support for the alpha channel
//TODO: Maybe add better support for hex color provided as string, basically Color.hex2hsl should also accept an hex color in string format

(function ( _, window, document, undefined ) {

  'use strict';

  /* COLOR */

  window.Color = class {

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

        if ( /^[0-9a-f]{6}$/i.test ( color ) ) { //INFO: Full 6-chars hex color notation

          return this.setHex ({
            r: color[0] + color[1],
            g: color[2] + color[3],
            b: color[4] + color[5]
          });

        } else if ( /^[0-9a-f]{3}$/i.test ( color ) ) { //INFO: Shorthand 3-chars hex color notation

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

}( Svelto._, window, document ));


/* =========================================================================
 * Svelto - Colorpicker
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * @requires ../color/color.js
 * ========================================================================= */

//TODO: Add support for alpha channel, by adding an opacity slider at the bottom of the sbWrp, it should be optional

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'colorpicker',
    selector: '.colorpicker',
    options: {
      defaultColor: '#ff0000', //INFO: It can be anything supported by the `Color` obj
      live: false,
      selectors: {
        sb: {
          wrp: '.colorpicker-sb',
          handler: '.colorpicker-handler'
        },
        hue: {
          wrp: '.colorpicker-hue',
          handler: '.colorpicker-handler'
        },
        input: 'input'
      },
      callbacks: {
        change () {}
      }
    }
  };

  /* COLORPICKER */

  class Colorpicker extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$colorpicker = this.$element;
      this.$sbWrp = this.$colorpicker.find ( this.options.selectors.sb.wrp );
      this.$sbHandler = this.$sbWrp.find ( this.options.selectors.sb.handler );
      this.$hueWrp = this.$colorpicker.find ( this.options.selectors.hue.wrp );
      this.$hueHandler = this.$hueWrp.find ( this.options.selectors.hue.handler );

      this.$input = this.$colorpicker.find ( this.options.selectors.input );

      this.sbWrpSize = this.$sbWrp.width ();

      this.hueWrpHeight = this.sbWrpSize;

      this.hsv = false;

    }

    _init () {

      if ( !this.set ( this.$input.val () ) ) {

        this.set ( this.options.defaultColor );

      }

    }

    _events () {

      /* CHANGE */

      this._on ( true, this.$input, 'change', this.__change );

      /* SB KEYDOWN */

      this._onHover ( this.$sbWrp, [$document, 'keydown', this.__sbKeydown] );

      /* SB DRAG */

      this.$sbHandler.draggable ({
        draggable: this.isEnabled.bind ( this ),
        $proxy: this.$sbWrp,
        constrainer: {
          $element: this.$sbWrp,
          constrainCenter: true
        },
        callbacks: {
          move: this._throttle ( this.__sbDragMove.bind ( this ), 100 ),
          end: this.__sbDragEnd.bind ( this )
        }
      });

      /* HUE KEYDOWN */

      this._onHover ( this.$hueWrp, [$document, 'keydown', this.__hueKeydown] );

      /* HUE DRAG */

      this.$hueHandler.draggable ({
        draggable: this.isEnabled.bind ( this ),
        axis: 'y',
        $proxy: this.$hueWrp,
        constrainer: {
          $element: this.$hueWrp
        },
        callbacks: {
          move: this._throttle ( this.__hueDragMove.bind ( this ), 50 ),
          end: this.__hueDragEnd.bind ( this )
        }
      });

    }

    /* CHANGE */

    __change () {

      this.set ( this.$input.val () );

    }

    /* SB ARROWS */

    __sbKeydown ( event ) {

      switch ( event.keyCode ) {

        case Svelto.keyCode.UP:
          this.hsv.v = Math.min ( 100, this.hsv.v + 1 );
          break;

        case Svelto.keyCode.RIGHT:
          this.hsv.s = Math.min ( 100, this.hsv.s + 1 );
          break;

        case Svelto.keyCode.DOWN:
          this.hsv.v = Math.max ( 0, this.hsv.v - 1 );
          break;

        case Svelto.keyCode.LEFT:
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

    _sbDragSet ( XY, update ) {

      this.hsv.s =  _.clamp ( 0, XY.X, this.sbWrpSize ) * 100 / this.sbWrpSize;
      this.hsv.v =  100 - ( _.clamp ( 0, XY.Y, this.sbWrpSize ) * 100 / this.sbWrpSize );

      this._updateSb ();

      if ( update ) {

        this._updateInput ();

      }

    }

    __sbDragMove ( data ) {

      this._sbDragSet ( data.moveXY, this.options.live );

    }

    __sbDragEnd ( data ) {

      this._sbDragSet ( data.endXY, true );

    }

    /* HUE ARROWS */

    __hueKeydown ( event ) {

      switch ( event.keyCode ) {

        case Svelto.keyCode.UP:
          this.hsv.h = Math.min ( 359, this.hsv.h + 1 );
          break;

        case Svelto.keyCode.DOWN:
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

    _hueDragSet ( XY, update ) {

      this.hsv.h = 359 - ( _.clamp ( 0, XY.Y, this.hueWrpHeight ) * 359 / this.hueWrpHeight );

      this._updateHue ();

      if ( update ) {

        this._updateInput ();

      }

    }

    __hueDragMove ( data ) {

      this._hueDragSet ( data.moveXY, this.options.live );

    }

    __hueDragEnd ( data ) {

      this._hueDragSet ( data.endXY, true );

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

      let hexStr = this._getHexStr ();

      this.$input.val ( hexStr ).trigger ( 'change' );

      this._trigger ( 'change', { color: hexStr } );

    }

    _update () {

      this._updateSb ();
      this._updateHue ();
      this._updateInput ();

    }

    /* OTHERS */

    _getHexStr () {

      let hex = Color.hsv2hex ( this.hsv );

      return '#' + hex.r + hex.g + hex.b;

    }

    /* PUBLIC */

    get () {

      return this._getHexStr ();

    }

    set ( color ) {

      color = _.attempt ( () => new Color ( color ) );

      if ( !_.isError ( color ) ) {

        let hsv = color.getHsv ();

        if ( !_.isEqual ( this.hsv, hsv ) ) {

          this.hsv = hsv;

          this._update ();

          return true;

        }

      }

      return false;

    }

  }

  /* BINDING */

  Svelto.Colorpicker = Colorpicker;
  Svelto.Colorpicker.config = config;

  /* FACTORY */

  $.factory ( Svelto.Colorpicker );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Cookie
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * Fork of https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie - Mozilla
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

/* COOKIE */

(function ( _, window, document, undefined ) {

  'use strict';

  /* UTILITIES */

  let config = {
    encoder: encodeURIComponent,
    decoder: decodeURIComponent
  };

  /* COOKIE */

  $.cookie = {

    get ( key ) {

      if ( !key ) return null;

      return config.decoder ( document.cookie.replace ( new RegExp ( '(?:(?:^|.*;)\\s*' + config.encoder ( key ).replace ( /[\-\.\+\*]/g, '\\$&' ) + '\\s*\\=\\s*([^;]*).*$)|^.*$' ), '$1' ) ) || null;

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

      document.cookie = config.encoder ( key ) + '=' + config.encoder ( value ) + expires + ( domain ? '; domain=' + domain : '' ) + ( path ? '; path=' + path : '' ) + ( secure ? '; secure' : '' );

      return true;

    },

    remove ( key, path, domain ) {

      if ( !this.has ( key ) ) return false;

      document.cookie = config.encoder ( key ) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + ( domain ? '; domain=' + domain : '' ) + ( path ? '; path=' + path : '' );

      return true;

    },

    has ( key ) {

      if ( !key ) return false;

      return ( new RegExp ( '(?:^|;\\s*)' + config.encoder ( key ).replace ( /[\-\.\+\*]/g, '\\$&' ) + '\\s*\\=' ) ).test ( document.cookie );

    },

    keys () {

      let keys = document.cookie.replace ( /((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '' ).split ( /\s*(?:\=[^;]*)?;\s*/ );

      return _.map ( keys, config.decoder );

    }

  };

}( Svelto._, window, document ));


/* =========================================================================
 * Svelto - Datepicker
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

//TODO: Add support for min and max date delimiter
//TODO: Add support for setting first day of the week

//FIXME: Deal with UTC time etc...
//FIXME: When using the arrows the prev day still remains hovered even if it's not below the cursor (chrome)

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'datepicker',
    selector: '.datepicker',
    options: {
      names: {
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      },
      date: {
        today: false,
        current: false,
        selected: null
      },
      format: {
        type: 'YYYYMMDD',
        separator: '/'
      },
      classes: {
        today: 'datepicker-day-today',
        selected: 'datepicker-day-selected'
      },
      selectors: {
        navigation: {
          prev: '.datepicker-navigation .previous',
          next: '.datepicker-navigation .next'
        },
        day: {
          prev: '.datepicker-days .previous',
          current: '.datepicker-days :not(.previous):not(.next)',
          next: '.datepicker-days .next'
        },
        title: '.datepicker-title',
        input: 'input'
      },
      callbacks: {
        change () {},
        refresh () {}
      }
    }
  };

  /* DATEPICKER */

  class Datepicker extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$datepicker = this.$element;
      this.$input = this.$datepicker.find ( this.options.selectors.input );

      this.$navigationPrev = this.$datepicker.find ( this.options.selectors.navigation.prev );
      this.$navigationTitle = this.$datepicker.find ( this.options.selectors.title );
      this.$navigationNext = this.$datepicker.find ( this.options.selectors.navigation.next );

      this.$daysPrev = this.$datepicker.find ( this.options.selectors.day.prev );
      this.$daysCurrent = this.$datepicker.find ( this.options.selectors.day.current );
      this.$daysNext = this.$datepicker.find ( this.options.selectors.day.next );
      this.$daysAll = this.$daysPrev.add ( this.$daysCurrent ).add ( this.$daysNext );

      if ( !(this.options.date.today instanceof Date) ) {

        this.options.date.today = new Date ();

      }

      if ( !(this.options.date.current instanceof Date) ) {

        this.options.date.current = new Date ();

      }

      this.$dayToday = false;
      this.$daySelected = false;

    }

    _init () {

      /* INITIAL VALUE */

      this.set ( this.$input.val () );

      if ( this.options.date.selected instanceof Date ) {

        this.options.date.current = new Date ( this.options.date.selected.getFullYear (), this.options.date.selected.getMonth (), this.options.date.selected.getDate () );

      }

      /* REFRESH */

      this._refresh ();

    }

    _events () {

      /* CHANGE */

      this._on ( this.$input, 'change', this.__change );

      /* KEYDOWN */

      this._onHover ( [$document, 'keydown', this.__keydown] );

      /* NAVIGATION PREV / NEXT */

      this._on ( this.$navigationPrev, Pointer.tap, this.__prevTap );
      this._on ( this.$navigationNext, Pointer.tap, this.__nextTap );

      /* DAY TAP */

      this._on ( Pointer.tap, this.options.selectors.day.current, this.__dayTap );

    }

    /* CHANGE */

    __change () {

      this.set ( this.$input.val () );

    }

    /* KEYDOWN */

    __keydown ( event ) {

      switch ( event.keyCode ) {

        case Svelto.keyCode.UP:
        case Svelto.keyCode.LEFT:
          this.prevMonth ();
          break;

        case Svelto.keyCode.RIGHT:
        case Svelto.keyCode.DOWN:
          this.nextMonth ();
          break;

        default:
          return;

      }

      event.preventDefault ();
      event.stopImmediatePropagation ();

    }

    /* NAVIGATION */

    __prevTap () {

      this.prevMonth ();

    }

    __nextTap () {

      this.nextMonth ();

    }

    /* SELECTION */

    __dayTap ( event ) {

      if ( event.button && event.button !== Svelto.mouseButton.LEFT ) return;

      let day = parseInt ( $(event.currentTarget).html (), 10 );

      this._unhighlightSelected ();

      this.options.date.selected = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth (), day );

      this._highlightSelected ();

      this._updateInput ();

    }

    /* OTHERS */

    _buildCalendar () {

      let prevMonthDays = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth (), 0 ).getDate (),
          currentMonthDays = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth () + 1, 0 ).getDate (),
          initialDayOfWeek = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth (), 1 ).getDay ();

      initialDayOfWeek = ( initialDayOfWeek === 0 ) ? 6 : initialDayOfWeek - 1; //INFO: We use `Monday` as the 0 index

      this.$daysAll.removeClass ( 'hidden' );

      /* PREV */

      let exceedingDays = 31 - prevMonthDays,
          neededDays = initialDayOfWeek,
          leftDays = 9 - exceedingDays - neededDays;

      this.$daysPrev.slice ( leftDays + neededDays, this.$daysPrev.length ).addClass ( 'hidden' );
      this.$daysPrev.slice ( 0, leftDays ).addClass ( 'hidden' );

      /* CURRENT */

      this.$daysCurrent.slice ( currentMonthDays, this.$daysCurrent.lenght ).addClass ( 'hidden' );

      /* NEXT */

      leftDays = ( ( currentMonthDays + initialDayOfWeek ) % 7 );

      this.$daysNext.slice ( ( leftDays === 0 ) ? 0 : 7 - leftDays ).addClass ( 'hidden' );

    }

    _highlightDay ( day, cssClass ) {

      if ( day && day.getFullYear () === this.options.date.current.getFullYear () ) {

        let deltaMonths = day.getMonth () - this.options.date.current.getMonth ();

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

      if ( this.$daySelected ) {

        this.$daySelected.removeClass ( this.options.classes.selected );

      }

    }

    _highlightSelected () {

      this.$daySelected = this._highlightDay ( this.options.date.selected, this.options.classes.selected );

    }

    _unhighlightToday () {

      if ( this.$dayToday ) {

        this.$dayToday.removeClass ( this.options.classes.today );

      }

    }

    _highlightToday () {

      this.$dayToday = this._highlightDay ( this.options.date.today, this.options.classes.today );

    }

    _updateTitle () {

      this.$navigationTitle.html ( this.options.names.months[this.options.date.current.getMonth ()] + ' ' + this.options.date.current.getFullYear () );

    }

    _updateInput () {

      if ( this.options.date.selected ) {

        this.$input.val ( this._exportDate ( this.options.date.selected ) ).change ();

      }

    }

    _exportDate ( date )  {

      switch ( this.options.format.type ) {

        case 'YYYYMMDD':
          return [date.getFullYear (), parseInt ( date.getMonth (), 10 ) + 1, date.getDate ()].join ( this.options.format.separator );

        default:
          return date.toUTCString ();

      }

    }

    _importDate ( date )  {

      if ( _.isString ( date ) ) {

        switch ( this.options.format.type ) {

          case 'YYYYMMDD':
            let segments = date.split ( this.options.format.separator );
            return new Date ( parseInt ( segments[0], 10 ), parseInt ( segments[1], 10 ) - 1, parseInt ( segments[2] ) );

          default:
            return new Date ( date );

        }

      } else {

        return new Date ( date );

      }

    }

    _refresh () {

      this._unhighlightSelected ();
      this._unhighlightToday ();
      this._buildCalendar ();
      this._highlightSelected ();
      this._highlightToday ();
      this._updateTitle ();

      this._trigger ( 'refresh', this.options.date );

    }

    /* API */

    get ( formatted ) {

      if ( formatted && this.options.date.selected ) {

        return this._exportDate ( this.options.date.selected );

      } else {

        return this.options.date.selected;

      }

    }

    set ( date ) {

      date = this._importDate ( date );

      if ( !_.isNaN ( date.valueOf () ) ) {

        if ( !this.options.date.selected || date.getTime () !== this.options.date.selected.getTime () ) {

          this.options.date.selected = date;

          if ( this.options.date.selected.getFullYear () === this.options.date.current.getFullYear () && this.options.date.selected.getMonth () === this.options.date.current.getMonth () ) {

            this._unhighlightSelected ();
            this._highlightSelected ();

          } else {

            this.options.date.current.setFullYear ( this.options.date.selected.getFullYear () );
            this.options.date.current.setMonth ( this.options.date.selected.getMonth () );

            this._refresh ();

          }

          this._updateInput ();

          this._trigger ( 'change', this.options.date );

        }

      }

    }

    navigateMonth ( modifier ) {

      if ( modifier ) {

        this.options.date.current.setMonth ( this.options.date.current.getMonth () + modifier );

        this._refresh ();

      }

    }

    prevMonth () {

      this.navigateMonth ( -1 );

    }

    nextMonth () {

      this.navigateMonth ( 1 );

    }

  }

  /* BINDING */

  Svelto.Datepicker = Datepicker;
  Svelto.Datepicker.config = config;

  /* FACTORY */

  $.factory ( Svelto.Datepicker );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Draggable
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */
 
//TODO: Add page autoscroll capabilities
//TODO: [MAYBE] Add support for handlers outside of the draggable element itself
//TODO: Add unhandlers
//TODO: Add support for ghost element, that will happear when dragging instead of the element itself, it should also work well with droppable

//FIXME: Don't trigger the move events if we are not doing it more than a threashold, but just on touch devices, there is very difficult to do an extremelly precise tap without moving the finger
//FIXME: Handler drag cancel, for example in firefox and IE dragging outside of the window
//FIXME: On iOS, if the draggable is too close to the left edge of the screen dragging it will cause a `scroll to go back` event/animation on safari

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  let isDragging = false;

  /* CONFIG */

  let config = {
    name: 'draggable',
    selector: '.draggable',
    options: {
      draggable: () => true, //INFO: Checks if we can drag it or not
      onlyHandlers: false, //INFO: Only an handler can drag it around
      revertable: false, //INFO: On dragend take it back to the starting position
      axis: false, //INFO: Limit the movements to this axis
      $proxy: false, //INFO: Drag the element also when we are triggering a drag from the `$proxy` element
      proxyWithoutMotion: true, //INFO: If enabled even if there's no motion the proxied draggable will get positionated to the dragend point event
      constrainer: { //INFO: Constrain the drag inside the $element
        $element: false, //INFO: If we want to keep the draggable inside this $element
        constrainCenter: false, //INFO: Set the constrain type, it will constrain the whole shape, or the center
        tollerance: { //INFO: The amount of pixel flexibility that a constrainer has
          x: 0,
          y: 0
        }
      },
      modifiers: { //INFO: It can modify the setted X and Y transforms values
        x: () => true,
        y: () => true
      },
      classes: {
        dragging: 'dragging'
      },
      selectors: {
        handler: '.draggable-handler'
      },
      callbacks: {
        start () {},
        move () {},
        end () {}
      }
    }
  };

  /* DRAGGABLE */

  class Draggable extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.draggable = this.element;
      this.$draggable = this.$element;

      this.$handlers = this.options.onlyHandlers ? this.$draggable.find ( this.options.selectors.handler ) : this.$draggable;

    }

    _events () {

      /* DOWN */

      this._on ( this.$handlers, Pointer.down, this.__down );

      /* PROXY */

      if ( this.options.$proxy ) {

        this._on ( this.options.$proxy, Pointer.down, this.__down );

      }

    }

    /* ACTIONS */

    _centerToPoint ( point, suppressClasses ) {

      let draggableOffset = this.$draggable.offset ();

      let deltaXY = {
        X: point.X - ( draggableOffset.left + ( this.$draggable.outerWidth () / 2 ) ),
        Y: point.Y - ( draggableOffset.top + ( this.$draggable.outerHeight () / 2 ) )
      };

      return this._actionMove ( deltaXY, suppressClasses );

    }

    _actionMove ( deltaXY, suppressClasses ) {

      let baseXY = {
        X: this.proxyXY ? this.proxyXY.X : this.initialXY.X,
        Y: this.proxyXY ? this.proxyXY.Y : this.initialXY.Y
      };

      if ( this.motion === false ) {

        this.motion = true;

        if ( this.options.constrainer.$element ) {

          let constrainerOffset = this.options.constrainer.$element.offset (),
              draggableOffset = this.$draggable.offset ();

          if ( this.options.axis !== 'y' ) {

            let halfWidth = this.options.constrainer.constrainCenter ? this.$draggable.outerWidth () / 2 : 0;

            this.translateX_min = constrainerOffset.left - ( draggableOffset.left - baseXY.X ) - halfWidth;
            this.translateX_max = constrainerOffset.left + this.options.constrainer.$element.outerWidth () - ( ( draggableOffset.left - baseXY.X ) + this.$draggable.outerWidth () ) + halfWidth;

          }

          if ( this.options.axis !== 'x' ) {

            let halfHeight = this.options.constrainer.constrainCenter ? this.$draggable.outerHeight () / 2 : 0;

            this.translateY_min = constrainerOffset.top - ( draggableOffset.top - baseXY.Y ) - halfHeight;
            this.translateY_max = constrainerOffset.top + this.options.constrainer.$element.outerHeight () - ( ( draggableOffset.top - baseXY.Y ) + this.$draggable.outerHeight () ) + halfHeight;

          }

        }

        if ( !suppressClasses ) {

          $html.addClass ( this.options.classes.dragging );
          this.$draggable.addClass ( this.options.classes.dragging );

        }

      }

      let translateX = baseXY.X,
          translateY = baseXY.Y;

      if ( this.options.axis !== 'y' ) {

        translateX += deltaXY.X;

        if ( this.options.constrainer.$element ) {

          translateX = _.clamp ( this.translateX_min - this.options.constrainer.tollerance.x, translateX, this.translateX_max + this.options.constrainer.tollerance.x );

        }

      }

      if ( this.options.axis !== 'x' ) {

        translateY += deltaXY.Y;

        if ( this.options.constrainer.$element ) {

          translateY = _.clamp ( this.translateY_min - this.options.constrainer.tollerance.y, translateY, this.translateY_max + this.options.constrainer.tollerance.y );

        }

      }

      let modifiedXY = {
            X: this.options.modifiers.x ( translateX ),
            Y: this.options.modifiers.y ( translateY )
          },
          endXY = {
            X: _.isBoolean ( modifiedXY.X ) ? ( modifiedXY.X ? translateX : baseXY.X ) : modifiedXY.X,
            Y: _.isBoolean ( modifiedXY.Y ) ? ( modifiedXY.Y ? translateY : baseXY.Y ) : modifiedXY.Y
          };

      this.$draggable.translate ( endXY.X, endXY.Y );

      return endXY;

    }

    /* HANDLERS */

    __down ( event ) {

      if ( !isDragging && this.options.draggable () ) {

        event.preventDefault ();

        isDragging = true;

        this.motion = false;

        this.startXY = $.eventXY ( event );
        this.initialXY = this.$draggable.translate ();

        this.isProxyed = ( this.options.$proxy && event.currentTarget === this.options.$proxy[0] );
        this.proxyXY = false;

        this._trigger ( 'start', { event: event, draggable: this.draggable, initialXY: this.initialXY } );

        this._on ( $document, Pointer.move, this.__move );
        this._on ( $document, Pointer.up, this.__up );
        this._on ( $document, Pointer.cancel, this.__cancel );

      }

    }

    __move ( event ) {

      if ( this.isProxyed && this.motion === false ) {

        let modifiedXY = this._centerToPoint ( this.startXY );

        this.proxyXY = this.$draggable.translate ();

      }

      let moveXY = $.eventXY ( event ),
          deltaXY = {
            X: moveXY.X - this.startXY.X,
            Y: moveXY.Y - this.startXY.Y
          };

      let modifiedXY = this._actionMove ( deltaXY );

      this._trigger ( 'move', { event: event, draggable: this.draggable, initialXY: this.initialXY, moveXY: modifiedXY } );

    }

    __up ( event ) {

      let modifiedXY = this.initialXY;

      if ( this.motion === true ) {

        $html.removeClass ( this.options.classes.dragging );
        this.$draggable.removeClass ( this.options.classes.dragging );

        /* REVERTABLE */

        if ( this.options.revertable ) {

          this.$draggable.translate ( this.initialXY.X, this.initialXY.Y ); //TODO: Animate it

        } else {

          modifiedXY = this.$draggable.translate ();

        }

      } else if ( this.isProxyed ) {

        if ( this.options.proxyWithoutMotion && ( !event.button || event.button === Svelto.mouseButton.LEFT ) ) {

          let endXY = $.eventXY ( event );

          modifiedXY = this._centerToPoint ( endXY, true );

        }

      }

      isDragging = false;

      this._off ( $document, Pointer.move, this.__move );
      this._off ( $document, Pointer.up, this.__up );
      this._off ( $document, Pointer.cancel, this.__cancel );

      this._trigger ( 'end', { event: event, draggable: this.draggable, initialXY: this.initialXY, endXY: modifiedXY, motion: this.motion } );

    }

    __cancel () {

      isDragging = false;

      this._off ( $document, Pointer.move, this.__move );
      this._off ( $document, Pointer.up, this.__up );
      this._off ( $document, Pointer.cancel, this.__cancel );

    }

  }

  /* BINDING */

  Svelto.Draggable = Draggable;
  Svelto.Draggable.config = config;

  /* FACTORY */

  $.factory ( Svelto.Draggable );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Transform (Utilties)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

/* TRANSFORM UTILITIES */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  let property = ( 'webkitTransform' in document.documentElement.style ) ? '-webkit-transform' : 'transform'; //FIXME: Does it work?

  /* MATRIX */

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

  let transformations = ['scaleX', 'skewY', 'skewX', 'scaleY', 'translateX', 'translateY']; //INFO: Their index is also the corresponsing index when applying `transform: matrix()`

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

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Positionate
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../transform/transform.js
 * ========================================================================= */

//FIXME: Big elements gets positionated badly, for example try some tooltips in a small viewport

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* UTILITES */

  let isHorizontal = function ( direction ) {

    return direction === 'left' || direction === 'right';

  };

  let isVertical = function ( direction ) {

    return !isHorizontal ( direction );

  };

  let getOpposite = function ( direction ) {

    let opposites = {
      'top'   : 'bottom',
      'bottom': 'top',
      'left'  : 'right',
      'right' : 'left'
    };

    return opposites[direction];

  };

  /* POSITIONATE */

  $.fn.positionate = function ( options ) {

    /* OPTIONS */

    options = _.merge ({
      direction: false, //INFO: Set a preferred direction, it has greater priority over the axis
      axis: false, //INFO: Set a preferred axis
      alignment: { //INFO: Set the alignment of the positionable relative to the anchor
        x: 'center', //INFO: `left, center, right`
        y: 'center' //INFOL `top, center, bottom`
      },
      strict: false, //INFO: If enabled only use the setted axis/direction, even if it won't be the optimial choice
      $anchor: false, //INFO: Positionate next to an $anchor element
      $pointer: false, //INFO: The element who is pointing to the anchor
      point: false, //INFO: Positioante at coordinates, ex: { x: number, y: number }
      spacing: 0, //INFO: Extra space to leave around the positionable element
      ranks: { //INFO: How the directions should be prioritized when selecting the `x` axis, the `y` axis, or all of them
        x: ['right', 'left'],
        y: ['bottom', 'top'],
        all: ['bottom', 'right', 'left', 'top']
      },
      callbacks: {
        change () {}
      }
    }, options );

    /* RESET */

    this.removeClass ( 'positionate-top positionate-bottom positionate-left positionate-right' );

    /* VARIABLES */

    let directions = _.unique ( _.union ( options.direction ? [options.direction] : [], options.axis ? options.ranks[options.axis] : [], !options.strict || !options.direction && !options.axis ? options.ranks.all : [] ) ),
        windowWidth = $window.width (),
        windowHeight = $window.height (),
        positionableRect = this.getRect (),
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

        let opposite = getOpposite ( directions[index] ),
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

      coordinates.top = _.clamp ( options.spacing, coordinates.top, windowHeight - positionableRect.height - options.spacing );
      coordinates.left = _.clamp ( options.spacing, coordinates.left, windowWidth - positionableRect.width - options.spacing );

    }

    /* DATAS */

    let data = {
      coordinates: coordinates,
      direction: bestDirection,
      oppositeDirection: getOpposite ( bestDirection )
    };

    /* POINTER TOP / LEFT */

    let translateType,
        translateValue;

    if ( options.$anchor && options.$pointer ) {

      switch ( bestDirection ) {

        case 'top':
        case 'bottom':
          translateType = 'translateX';
          translateValue = anchorRect.left - coordinates.left + ( anchorRect.width / 2 );
          break;

        case 'left':
        case 'right':
          translateType = 'translateY';
          translateValue = anchorRect.top - coordinates.top + ( anchorRect.height / 2 );
          break;

      }

    }

    /* SETTING */

    this.translate ( coordinates.left, coordinates.top );

    this.addClass ( 'positionate-' + bestDirection );

    if ( options.$anchor && options.$pointer ) {

      options.$pointer[translateType] ( translateValue );

    }

    /* CALLBACK */

    options.callbacks.change ( data );

    /* RETURN */

    return this;

  };

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
* Svelto - Pseudo CSS
* =========================================================================
* Copyright (c) 2015 Fabio Spampinato
* Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
* =========================================================================
* @requires ../svelto/svelto.js
* ========================================================================= */

/* PSEUDO CSS */

//TODO: Rename it, it's not limited to pseudo-elements, even if that it's pretty much the only use case
//TODO: Memory leaks here, for example when we remove an element it's pseudo styles are still being attached to the dynamically attached stylesheet

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  let $stylesheet,
      tree = {};

  /* UTILITIES */

  let cssfy = function ( tree ) {

    let css = '';

    for ( let selector in tree ) {

      css += selector + '{';

      if ( _.isString ( tree[selector] ) ) {

        css += tree[selector];

      } else {

        for ( let property in tree[selector] ) {

          css += property + ':' + tree[selector][property] + ';';

        }

      }

      css += '}';

    }

    return css;

  };

  let update = function () {

    $stylesheet.html ( cssfy ( tree ) );

  };

  /* PSEUDO CSS */

  $.pseudoCSS = function ( selector, property, value ) {

    if ( _.isString ( property ) ) {

      tree[selector] = property;

    } else {

      let rule = _.isUndefined ( value ) ? property : { property: value };

      tree[selector] = _.merge ( _.isString ( tree[selector] ) ? {} : tree[selector] || {}, rule );

    }

    update ();

  };

  /* READY */

  $(function () {

    $stylesheet = $('<style class="pseudo">').appendTo ( $head );

  });

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Dropdown
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * @requires ../positionate/positionate.js
 * @requires ../pseudo_css/pseudo_css.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'dropdown',
    selector: '.dropdown',
    options: {
      positionate: {}, //INFO: Overriding `$.positionate` options
      spacing: {
        attached: 0,
        noTip: 7,
        normal: 14
      },
      classes: {
        noTip: 'no-tip',
        attached: 'attached',
        moving: 'moving',
        show: 'show',
        open: 'open'
      },
      selectors: {
        closer: '.dropdown-closer'
      },
      animations: {
        open: Svelto.animation.fast,
        close: Svelto.animation.fast
      },
      callbacks: {
        beforeopen () {},
        open () {},
        close () {}
      }
    }
  };

  /* DROPDOWN */

  class Dropdown extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$dropdown = this.$element;
      this.$closers = this.$dropdown.find ( this.options.selectors.closer );

      this.$dropdownParents = this.$dropdown.parents ().add ( $window ); //INFO: We are adding `$window` so that the scroll/resize handlers work as expexted
      this.$togglerParents = $empty;

      this.guc = 'dropdown-' + this.guid;
      this.$dropdown.addClass ( this.guc );

      this.hasTip = !this.$dropdown.hasClass ( this.options.classes.noTip );
      this.isAttached = this.$dropdown.hasClass ( this.options.classes.attached );

      this._toggler = false;
      this._prevToggler = false;

      this._isOpen = false;

    }

    _events () {

      /* CLOSER */

      this._on ( this.$closers, Pointer.tap, this.close );

    }

    /* WINDOW RESIZE / SCROLL */

    _bindParentsResizeScroll () {

      this._on ( this.$dropdownParents.add ( this.$togglerParents ), 'resize scroll', this._repositionate );

    }

    _unbindParentsResizeScroll () {

      this._off ( this.$dropdownParents.add ( this.$togglerParents ), 'resize scroll', this._repositionate );

    }

    /* WINDOW TAP */

    _bindWindowTap () {

      this._on ( $window, Pointer.tap, this.__windowTap );

    }

    _unbindWindowTap () {

      this._off ( $window, Pointer.tap, this.__windowTap );

    }

    __windowTap ( event ) {

      if ( this._isOpen && event !== this._toggleEvent ) {

        if ( this.$dropdown.touching ({ point: $.eventXY ( event )} ).length === 0 ) {

          this.close ();

        }

      }

    }

    /* POSITIONATE */

    _positionate () {

      /* VARIABLES */

      let $toggler = this._toggler,
          noTip = $toggler.hasClass ( this.options.classes.noTip ) || !this.hasTip || this.isAttached,
          $pointer = noTip ? false : $('<div>');

      /* POSITIONATE */

      this.$dropdown.positionate ( _.extend ( {
        $anchor: $toggler,
        $pointer: $pointer,
        spacing:  this.isAttached ? this.options.spacing.attached : ( noTip ? this.options.spacing.noTip : this.options.spacing.normal ),
        callbacks: {
          change ( data ) {
            $toggler.removeClass ( 'dropdown-toggler-top dropdown-toggler-bottom dropdown-toggler-left dropdown-toggler-right' ).addClass ( 'dropdown-toggler-' + data.direction );
          }
        }
      }, this.options.positionate ));

      /* MOCK TIP */

      if ( !noTip ) {

        $.pseudoCSS ( '.' + this.guc + ':before', $pointer.attr ( 'style' ).slice ( 0, -1 ) + ' rotate(45deg);' ); //FIXME: Too hacky, expecially that `rotate(45deg)`

      }

    }

    _repositionate () {

      if ( this._isOpen ) {

        this._positionate ();

      }

    }

    /* PUBLIC */

    isOpen () {

      return this._isOpen;

    }

    toggle ( force, toggler, event ) {

      this._toggleEvent = event;

      if ( !_.isBoolean ( force ) ) {

        force = toggler && ( !this._toggler || this._toggler && this._toggler[0] !== toggler ) ? true : !this._isOpen;

      }

      this[force ? 'open' : 'close']( toggler );

    }

    open ( toggler ) {

      //FIXME: Add support for opening relative to a point

      if ( !toggler && this._prevToggler ) {

        toggler = this._prevToggler[0];

      }

      if ( !this._isOpen || ( toggler && toggler !== this._toggler[0] ) ) {

        if ( this._toggler ) {

          this._prevToggler = this._toggler;

          this._prevToggler.removeClass ( 'dropdown-toggler-top dropdown-toggler-bottom dropdown-toggler-left dropdown-toggler-right' );

          if ( this._isOpen ) {

            this.$dropdown.addClass ( this.options.classes.moving );

          }

        }

        let $toggler = $(toggler);

        this._toggler = $toggler;

        this._trigger ( 'beforeopen' );

        this.$dropdown.addClass ( 'show' );

        this._positionate ();

        this._frame ( function () {

          this.$dropdown.addClass ( this.options.classes.open );

        });

        if ( this._prevToggler !== this._toggler ) {

          if ( this._isOpen ) {

            this._unbindParentsResizeScroll ();

          }

          this.$togglerParents = $toggler.parents ();

          this._bindParentsResizeScroll ();

        }

        if ( !this._isOpen ) {

          this._delay ( this._bindWindowTap );

        }

        this._isOpen = true;

        this._trigger ( 'open' );

      }

    }

    close () {

      if ( this._isOpen ) {

        this._prevToggler = this._toggler;

        this._prevToggler.removeClass ( 'dropdown-toggler-top dropdown-toggler-bottom dropdown-toggler-left dropdown-toggler-right' );

        delete this._toggler;

        this._frame ( function () {

          this.$dropdown.removeClass ( this.options.classes.open + ' ' + this.options.classes.moving );

          this._delay ( function () {

            this.$dropdown.removeClass ( this.options.classes.show );

          }, this.options.animations.close );

        });

        this._unbindParentsResizeScroll ();

        this._unbindWindowTap ();

        this._isOpen = false;

        this._trigger ( 'close' );

      }

    }

  }

  /* BINDING */

  Svelto.Dropdown = Dropdown;
  Svelto.Dropdown.config = config;

  /* FACTORY */

  $.factory ( Svelto.Dropdown );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Toggler
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

//TODO: Remove the use of modal-closer etc, since it will work anyway with a .modal-toggler located inside of it
//TODO: Detect the widget in use, not add the extra property -> no need to extend it every time and no need for the extra .widget-toggler class
//TODO: Better general support, so that it could be use also by Flippable for example

//FIXME: Hover open, enter the dropdown and click it, it gets closed...

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'toggler',
    selector: undefined,
    options: {
      widget: false, //INFO: The widget class to toggle
      hover: {
        triggerable: false,
        delays: {
          open: 750,
          close: 250
        }
      },
      datas: {
        target: 'target'
      }
    }
  };

  /* TOGGLER */

  class Toggler extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.toggler = this.element;
      this.$toggler = this.$element;

      this.targetSelector = this.$toggler.data ( this.options.datas.target );

      this.$target = this.targetSelector ? $(this.targetSelector) : this.$toggler.closest ( this.options.widget.config.selector );

      this._instance = this.$target[this.options.widget.config.name]( 'instance' );

    }

    _events () {

      /* TAP */

      this._on ( Pointer.tap, function ( event ) {

        return this._instance.toggle ( undefined, this.toggler, event );

      });

      /* HOVER */

      if ( this.options.hover.triggerable ) {

        this._on ( Pointer.enter, this.__hoverEnter );

      }

    }

    /* HOVER */

    __hoverEnter () {

      if ( !this._instance.isOpen () ) {

        this._isHoverOpen = false;

        this._hoverOpenTimeout = this._delay ( this.__hoverOpen, this.options.hover.delays.open );

        this._one ( Pointer.leave, this.__hoverLeave );

      } else if ( this._isHoverOpen ) {

        if ( this._hoverCloseTimeout ) {

          clearTimeout ( this._hoverCloseTimeout );

          this._hoverCloseTimeout = false;

        }

        this._one ( Pointer.leave, this.__hoverLeave );

      }

    }

    __hoverOpen () {

      if ( !this._instance.isOpen () ) {

        this._instance.open ( this.toggler );

        this._isHoverOpen = true;

      }

      this._hoverOpenTimeout = false;

    }

    __hoverLeave  () {

      if ( this._hoverOpenTimeout ) {

        clearTimeout ( this._hoverOpenTimeout );

        this._hoverOpenTimeout = false;

      }

      if ( this._instance.isOpen () && this._isHoverOpen ) {

        this._hoverCloseTimeout = this._delay ( this.__hoverClose, this.options.hover.delays.close );

        this._one ( this.$target, Pointer.enter, this.__hoverTargetEnter );

      }

    }

    __hoverClose () {

      if ( this._instance.isOpen () && this._isHoverOpen ) {

        this._instance.close ( this.toggler );

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

      if ( this._instance.isOpen () && this._isHoverOpen ) {

        this._one ( this.$target, Pointer.leave, this.__hoverTargetLeave );

      }

    }

    __hoverTargetLeave () {

      if ( this._instance.isOpen () && this._isHoverOpen ) {

        this._hoverCloseTimeout = this._delay ( this.__hoverClose, this.options.hover.delays.close );

        this._one ( this.$target, Pointer.enter, this.__hoverTargetEnter );

      }

    }

    /* PUBLIC */

    toggle ( force ) {

      return this._instance.toggle ( force, this.toggler );

    }

  }

  /* BINDING */

  Svelto.Toggler = Toggler;
  Svelto.Toggler.config = config;

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Dropdown (Toggler)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires dropdown.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'dropdownToggler',
    selector: '.dropdown-toggler',
    options: {
      widget: Svelto.Dropdown
    }
  };

  /* DROPDOWN TOGGLER */

  class DropdownToggler extends Svelto.Toggler {}

  /* BINDING */

  Svelto.DropdownToggler = DropdownToggler;
  Svelto.DropdownToggler.config = config;

  /* FACTORY */

  $.factory ( Svelto.DropdownToggler );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Touching
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../bteach/bteach.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* TOUCHING */

  $.fn.touching = function ( options ) {

    /* OPTIONS */

    options = _.merge ({
      startIndex : false, //INFO: Useful for speeding up the searching process if we may already guess the initial position...
      point: false, //INFO: Used for the punctual search
      //  {
      //    X: 0,
      //    Y: 0
      //  },
      binarySearch: true, //INFO: toggle the binary search when performing a punctual search
      $comparer: false, //INFO: Used for the overlapping search
      $not: false,
      onlyBest: false
    }, options );

    /* SEARCHABLE */

    let $searchable = options.$not ? this.not ( options.$not ) : this;

    /* COMPARER */

    if ( options.$comparer ) {

      let rect1 = options.$comparer.getRect (),
          nodes = [],
          areas = [];

      let result = false;

      for ( let searchable of $searchable ) {

        let rect2 = $.getRect ( searchable ),
            area = $.getOverlappingArea ( rect1, rect2 );

        if ( area > 0 ) {

          nodes.push ( searchable );
          areas.push ( area );

        }

      }

      return options.onlyBest ? $(nodes[ areas.indexOf ( _.max ( areas ) )]) : $(nodes);

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

        return $touched || $empty;

      } else {

        for ( let searchable of $searchable ) {

          let rect = $.getRect ( searchable );

          if ( options.point.Y >= rect.top && options.point.Y <= rect.bottom && options.point.X >= rect.left && options.point.X <= rect.right ) {

            $touched = $(searchable);

            break;

          }

        }

        return $touched || $empty;

      }

    }

  };

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Droppable
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * @requires ../touching/touching.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'droppable',
    selector: '.droppable',
    options: {
      selector: '*',
      classes: {
        droppable: false, //INFO: The class to attach to the droppable if the draggable can be dropped inside of it
        hover: false //INFO: The class to attach to the droppable when hovered by a draggable
      },
      callbacks: {
        enter () {},
        leave () {},
        drop () {}
      }
    }
  };

  /* DROPPABLE */

  class Droppable extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.droppable = this.element;
      this.$droppable = this.$element;

      this.__isCompatible = undefined;
      this._wasHovering = false;

    }

    _events () {

      /* DRAG MOVE */

      this._on ( $document, 'draggable:move', this._throttle ( this.__dragMove, 100 ) );

      /* DRAG END */

      this._on ( $document, 'draggable:end', this.__dragEnd );

    }

    /* PRIVATE */

    _isCompatible ( element ) {

      if ( _.isUndefined ( this.__isCompatible ) ) {

        this.__isCompatible = $(element).is ( this.options.selector );

        if ( this.__isCompatible ) {

          this.$droppable.addClass ( this.options.classes.droppable );

        }

      }

      return this.__isCompatible;

    }

    _isHovering ( event, data ) {

      return ( this.$droppable.touching ({ point: $.eventXY ( data.event ) }).length > 0 );

    }

    /* DRAG MOVE */

    __dragMove ( event, data ) {

      if ( this._isCompatible ( data.draggable ) ) {

        let isHovering = this._isHovering ( event, data );

        if ( isHovering !== this._wasHovering ) {

          this.$droppable.toggleClass ( this.options.classes.hover, isHovering );

          this._trigger ( isHovering ? 'enter' : 'leave', { draggable: data.draggable, droppable: this.droppable } );

        }

        this._wasHovering = isHovering;

      }

    }

    /* DRAG END */

    __dragEnd ( event, data ) {

      if ( this._isCompatible ( data.draggable ) ) {

        this.$droppable.removeClass ( this.options.classes.droppable );

        if ( this._isHovering ( event, data ) ) {

          if ( this._wasHovering ) {

            this.$droppable.removeClass ( this.options.classes.hover );

          }

          this._trigger ( 'drop', { draggable: data.draggable, droppable: this.droppable } );

        }

      }

      this.__isCompatible = undefined;

    }

  }

  /* BINDING */

  Svelto.Droppable = Droppable;
  Svelto.Droppable.config = config;

  /* FACTORY */

  $.factory ( Svelto.Droppable );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Flickable
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'flickable',
    options: {
      duration: 150, //INFO: Maximum duration of the flick gesture
      threshold: 5, //INFO: Minimum moving treshold of the flick gesture
      callbacks: {
        flick () {}
      }
    }
  };

  /* FLICKABLE */

  class Flickable extends Svelto.Widget {

    /* SPECIAL */

    _events () {

      /* DOWN */

      this._on ( Pointer.down, this.__down );

    }

    /* HANDLERS */

    __down ( event ) {

      this._startXY = $.eventXY ( event );
      this._startTimestamp = event.timeStamp || Date.now ();

      this._motion = false;

      this._one ( true, $document, Pointer.move, this.__move );
      this._one ( true, $document, Pointer.up, this.__up );
      this._one ( true, $document, Pointer.cancel, this.__cancel );

    }

    __move () {

      this._motion = true;

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

        this._off ( $document, Pointer.move, this.__move );

      }

      this._off ( $document, Pointer.cancel, this.__cancel );

    }

    __cancel () {

      if ( !this._motion ) {

        this._off ( $document, Pointer.move, this.__move );

      }

      this._off ( $document, Pointer.up, this.__up );

    }

  }

  /* BINDING */

  Svelto.Flickable = Flickable;
  Svelto.Flickable.config = config;

  /* FACTORY */

  $.factory ( Svelto.Flickable );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Flippable
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'flippable',
    selector: '.flippable',
    options: {
      classes: {
        flip: 'flipped' //TODO: Maybe rename to flip (Be aware that there's also an helper with the same name at the moment)
      },
      selectors: {
        flipper: '.flippable-flipper'
      },
      callbacks: {
        front () {},
        back () {}
      }
    }
  };

  /* FLIPPABLE */

  class Flippable extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$flippable = this.$element;
      this.$flippers = this.$flippable.find ( this.options.selectors.flipper );

      this.isFlipped = this.$flippable.hasClass ( this.options.classes.flip );

    }

    _events () {

      /* FLIPPER */

      this._on ( this.$flippers, Pointer.tap, this.flip );

    }

    /* PUBLIC */

    flip ( force ) {

      if ( !_.isBoolean ( force ) ) {

        force = !this.isFlipped;

      }

      if ( force !== this.isFlipped ) {

        this.isFlipped = force;

        this.$flippable.toggleClass ( this.options.classes.flip, this.isFlipped );

        this._trigger ( this.isFlipped ? 'back' : 'front' );

      }

    }

    front () {

      this.flip ( false );

    }

    back () {

      this.flip ( true );

    }

  }

  /* BINDING */

  Svelto.Flippable = Flippable;
  Svelto.Flippable.config = config;

  /* FACTORY */

  $.factory ( Svelto.Flippable );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Spinner Overlay
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'spinnerOverlay',
    templates: {
      overlay: '<div class="overlay spinner-overlay {%=(o.dimmer ? "dimmer" : "")%} {%=(o.blurrer ? "blurrer" : "")%}">' +
                 '{% if ( o.labeled ) { %}' +
                   '<div class="spinner-label {%=(o.multicolor ? "" : o.colors.labeled)%}">' +
                 '{% } %}' +
                   '<svg class="spinner {%=(o.multicolor ? "multicolor" : ( o.labeled ? "" : o.colors.unlabeled ))%}">' +
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
        //TODO: Add callbacks, mimic those from $.svelto.overlay
      }
    }
  };

  /* SPINNER OVERLAY */

  class SpinnerOverlay extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$overlayed = this.$element;
      this.$overlay = $(this._tmpl ( 'overlay', this.options )).prependTo ( this.$overlayed );

      this.overlay = this.$overlay.overlay ( 'instance' );

    }

    /* API */

    isOpen () {

      return this.overlay.isOpen ();

    }

    toggle ( force ) {

      this.overlay.toggle ( force );

    }

    open () {

      this.overlay.open ();

    }

    close () {

      this.overlay.close ();

    }

  }

  /* BINDING */

  Svelto.SpinnerOverlay = SpinnerOverlay;
  Svelto.SpinnerOverlay.config = config;

  /* FACTORY */

  $.factory ( Svelto.SpinnerOverlay );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Noty
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

//TODO: Add better support for swipe to dismiss
//TODO: Clicking it from a iPod touch makes the click go through it (just on Chrome, not Safari)

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  let notiesTimers = [];

  /* CONFIG */

  let config = {
    name: 'noty',
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
      anchor: {
        y: 'bottom',
        x: 'left'
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
                onClick () {}
             }],
      */
      type: 'alert',
      color: 'black',
      css: '',
      persistent: false,
      ttl: 3500,
      autoplay: true,
      timerMinimumRemaining: 1000,
      classes: {
        open: 'open'
      },
      selectors: {
        button: '.noty-buttons .button, .infobar-right .button'
      },
      animations: {
        remove: Svelto.animation.normal
      },
      callbacks: {
        open () {},
        close () {}
      }
    }
  };

  /* HELPER */

  $.noty = function ( options ) {

    /* OPTIONS */

    options = _.isString ( options ) ? { body: options } : ( options || {} );

    if ( options.buttons ) {

      options.type = 'action';

    }

    /* NOTY */

    return new Svelto.Noty ( options );

  };

  /* NOTY */

  class Noty extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$noty = this.$element;
      this.$buttons = this.$noty.find ( this.options.selectors.button );

      this.timer = false;
      this._isOpen = false;
      this.neverOpened = true;

    }

    _init () {

      if ( this.options.autoplay ) {

        this.open ();

      }

    }

    /* PRIVATE */

    ___tap () {

      if ( this.options.type !== 'action' ) {

        this._on ( Pointer.tap, this.close );

      }

    }

    ___buttonTap () {

      _.each ( this.options.buttons, function ( button, index ) {

        this._on ( this.$buttons.eq ( index ), Pointer.tap, function ( event, data ) {

          if ( button.onClick ) {

            if ( button.onClick.apply ( this.$buttons[index], [event, data] ) === false ) return;

          }

          this.close ();

        });

      }, this );

    }

    ___timer () {

      if ( this.options.type !== 'action' && _.isNumber ( this.options.ttl ) && !_.isNaN ( this.options.ttl ) && this.options.ttl !== Infinity ) {

        this.timer = new Timer ( this.close.bind ( this ), this.options.ttl, true );

        notiesTimers.push ( this.timer );

      }

    }

    ___hover () {

      var instance = this;

      this.$noty.hover ( () => {

        notiesTimers.forEach ( timer => timer.pause () );

      }, () => {

        notiesTimers.forEach ( timer => {

          timer.remaining ( Math.max ( instance.options.timerMinimumRemaining, timer.remaining () || 0 ) );

          timer.play ();

        });

      });

    }

    ___flick () {

      if ( this.options.type !== 'action' ) {

        this.$noty.flickable ({
          callbacks: {
            flick: function ( data ) {
              if ( data.orientation === 'horizontal' ) {
                this.close ();
              }
            }.bind ( this )
          }
        });

      }

    }

    ___persistent () {

      if ( !this.options.persistent ) {

        this._on ( $window, 'route', function ( event, data ) { //FIXME: Going back it doesn't work

          if ( data.url !== this._openUrl ) {

            this.close ();

          }

        });

      }

    }

    __keydown ( event ) {

      if ( event.keyCode === Svelto.keyCode.ESCAPE ) {

        event.preventDefault ();
        event.stopImmediatePropagation ();

        this.close ();

      }

    }


    /* PUBLIC */

    isOpen () {

      return this._isOpen;

    }

    open () {

      if ( !this._isOpen ) {

        this._frame ( () => {

            $('.noty-queues.' + this.options.anchor.y + ' .noty-queue.' + this.options.anchor.x).append ( this.$noty );

            this._frame ( () => {

              this.$noty.addClass ( this.options.classes.open );

            });

        });

        this._defer ( function () {

          this._openUrl = window.location.href.split ( '#' )[0];

        });

        if ( this.neverOpened ) {

          this.___tap ();
          this.___flick ();
          this.___buttonTap ();
          this.___hover ();
          this.___persistent ();

          this.neverOpened = false;

        }

        this.___timer ();

        this._on ( $document, 'keydown', this.__keydown );

        this._isOpen = true;

        this._trigger ( 'open' );

      }

    }

    close () {

      if ( this._isOpen ) {

        this.$noty.removeClass ( this.options.classes.open );

        this._delay ( function () {

          this.$noty.detach ();

        }, this.options.animations.remove );

        if ( this.timer ) {

          _.pull ( notiesTimers, this.timer );

          this.timer.stop ();

        }

        this._off ( $document, 'keydown', this.__keydown );

        this._isOpen = false;

        this._trigger ( 'close' );

      }

    }

  }

  /* BINDING */

  Svelto.Noty = Noty;
  Svelto.Noty.config = config;

  /* FACTORY */

  $.factory ( Svelto.Noty );

  /* READY */

  $(function () {

    $body.append (
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

  });

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - RegExes
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* REGEXES */

  window.RegExes = {

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

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Validator
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * @requires ../regexes/regexes.js
 * ========================================================================= */

//INFO: `value` is supposed to be a string
//INFO: Strings will be trimmed inside some validators

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VALIDATOR */

  window.Validator = {

    /* TYPE */

    alpha ( value ) {
      return !!value.match ( RegExes.alpha );
    },
    alphanumeric ( value ) {
      return !!value.match ( RegExes.alphanumeric );
    },
    hexadecimal ( value ) {
      return !!value.match ( RegExes.hexadecimal );
    },
    number ( value ) {
      return !!value.match ( RegExes.integer ) || !!value.match ( RegExes.float );
    },
    integer ( value ) {
      return !!value.match ( RegExes.integer );
    },
    float ( value ) {
      return !!value.match ( RegExes.float );
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
      return !!value.match ( RegExes.email );
    },
    cc ( value ) {
      return !!value.match ( RegExes.cc );
    },
    ssn ( value ) {
      return !!value.match ( RegExes.ssn );
    },
    ipv4 ( value ) {
      return !!value.match ( RegExes.ipv4 );
    },
    url ( value ) {
      return !!value.match ( RegExes.url );
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

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - formValidate
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * @requires ../validator/validator.js
 * ========================================================================= */

//TODO: Add meta validators that accepts other validators as arguments, for example not[email], oppure not[matches[1,2,3]] oppure or[email,url] etc... maybe write it this way: or[matches(1-2-3)/matches(a-b-c)], or just use a smarter regex

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'formValidate',
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
      validators: {
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
            min: 'The number must be at least $1',
            max: 'The number must be at maximum $1',
            range: 'The number must be between $1 and $2',
            minLength: 'The lenght must be at least $1',
            maxLength: 'The lenght must be at maximum $1',
            rangeLength: 'The length must be between $1 and $2',
            exactLength: 'The length must be exactly $1',
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
        disabled: 'disabled',
        invalid: 'invalid',
        valid: 'valid'
      },
      selectors: {
        element: 'input, textarea, select',
        textfield: 'input:not([type="button"]):not([type="checkbox"]):not([type="radio"]), textarea',
        wrapper: '.checkbox, .radio, .select-toggler, .slider, .switch, .datepicker, .colorpicker'
      }
    }
  };

  /* FORM VALIDATE */

  class FormValidate extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$form = this.$element;
      this.$elements = this.$form.find ( this.options.selectors.element );
      this.$textfields = this.$elements.filter ( this.options.selectors.textfield );

      this.___elements ();

    }

    _events () {

      /* CHANGE */

      this._on ( this.$elements, 'change', this.__change );

      /* FOCUS */

      this._on ( this.$textfields, 'focus', this.__focus );

      /* BLUR */

      this._on ( this.$textfields, 'blur', this.__blur );

      /* SUBMIT */

      this._on ( 'submit', this.__submit );

    }

    /* ELEMENTS */

    ___elements () {

      this.elements = {};

      for ( let element of this.$elements ) {

        let $element = $(element),
            $wrappers = $element.parents ( this.options.selectors.wrapper ),
            $wrapper = ( $wrappers.length > 0 ) ? $wrappers.first () : $element,
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

    __focus ( event ) {

      let elementObj = this.elements[event.currentTarget[this.options.datas.id]];

      elementObj.isValid = undefined;

      this.__indeterminate ( elementObj );

    }

    /* BLUR */

    __blur ( event ) {

      let elementObj = this.elements[event.currentTarget[this.options.datas.id]];

      this._validateWorker ( elementObj );

    }

    /* SUBMIT */

    __submit ( event ) {

      if ( !this.isValid () ) {

        event.preventDefault ();
        event.stopImmediatePropagation ();

        $.noty ( this.messages.invalid );

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

              let error = this._parseValidationInvalidMsg ( this.options.messages.validators.invalid[name] || this.options.messages.validators.invalid.general, elementObj.value, ...validation.args );

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

    _parseValidationInvalidMsg ( msg, ...args ) {

      for ( let i = 0, l = args.length; i < l; i++ ) {

        msg = msg.replace ( '$' + i, args[i] );

      }

      return msg;

    }

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

  /* BINDING */

  Svelto.FormValidate = FormValidate;
  Svelto.FormValidate.config = config;

  /* FACTORY */

  $.factory ( Svelto.FormValidate );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Form Ajax
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
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

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'formAjax',
    selector: 'form.ajax',
    options: {
      spinnerOverlay: true,
      timeout: 31000, //INFO: 1 second more than the default value of PHP's `max_execution_time` setting
      messages: {
        error: 'An error occurred, please try again later',
        done: 'Done! A page refresh may be needed',
        refresh: 'Done! Refreshing the page...',
        redirect: 'Done! Redirecting...'
      },
      callbacks: {
        beforesend () {},
        error () {},
        success () {},
        complete () {}
      }
    }
  };

  /* FORM AJAX */

  class FormAjax extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.form = this.element;
      this.$form = this.$element;

    }

    _events () {

      /* SUBMIT */

      this._on ( true, 'submit', this.__submit );

    }

    /* PRIVATE */

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

              $.noty ( resj.msg || this.options.messages.refresh );

              location.reload ();

            } else if ( resj.url ) {

              //INFO: In order to redirect to another domain the protocol must be provided. For instance `http://www.domain.tld` will work while `www.domain.tld` won't

              $.noty ( resj.msg || this.options.messages.redirect );

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

  /* BINDING */

  Svelto.FormAjax = FormAjax;
  Svelto.FormAjax.config = config;

  /* FACTORY */

  $.factory ( Svelto.FormAjax );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Form Sync
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

//TODO: Maybe add the ability to trigger a sync when widgetizing a new form in the group, so that if we are appending a new one it gets synced (as a base or not, if not maybe we can get a data-target or the first of othe others in the group as a base)

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'formSync',
    selector: 'form[data-sync-group]',
    options: {
      live: false, //INFO: Basically it triggers the syncing also when the `input` event is fired
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

  class FormSync extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$form = this.$element;
      this.$elements = this.$form.find ( this.options.selectors.elements );

      this.group = this.$form.data ( this.options.datas.group );

    }

    _events () {

      /* CHANGE */

      this._on ( true, this.$elements, 'change', this._throttle ( this.__sync, 100 ) );

      /* INPUT */

      if ( this.options.live ) {

        let $textfields = this.$elements.filter ( this.options.selectors.textfield );

        this._on ( true, $textfields, 'input', this._throttle ( this.__sync, 100 ) );

      }

    }

    /* SYNC */

    __sync ( event, data ) {

      if ( data && data._form_synced ) return;

      let $element = $(event.target),
          name = $element.attr ( this.options.attributes.name ),
          $otherElements = $(this.options.selectors.form + '[data-' + this.options.datas.group + '="' + this.group + '"]').not ( this.$form ).find ( '[' + this.options.attributes.name + '="' + name + '"]').not ( $element );

      if ( $otherElements.length > 0 ) {

        let value = $element.val (),
            checked = !!$element.prop ( 'checked' );

        for ( let otherElement of $otherElements ) {

          let $otherElement = $(otherElement),
              otherValue = $otherElement.val (),
              otherChecked = !!$otherElement.prop ( 'checked' );

          if ( value === otherValue && checked === otherChecked ) continue;

          if ( $element.is ( this.options.selectors.radio ) && ( value !== otherValue || checked === otherChecked ) ) continue;

          if ( $element.is ( this.options.selectors.checkable ) ) {

            $otherElement.prop ( 'checked', checked ).trigger ( 'change', { _form_synced: true } );

          } else {

            $otherElement.val ( value ).trigger ( 'change', { _form_synced: true } );

          }

        }

      }

    }

  }

  /* BINDING */

  Svelto.FormSync = FormSync;
  Svelto.FormSync.config = config;

  /* FACTORY */

  $.factory ( Svelto.FormSync );

}( Svelto.$, Svelto._, window, document ));

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
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * @requires ../widgetize/widgetize.js
 * @requires ../pointer/pointer.js
 * @requires vendor/screenfull.js
 * ========================================================================= */

//TODO: Move to their own folders/files

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* SCROLL TO TOP */

  //TODO: Add a .scroll-to-target widget, with data-target and awareness of the attached stuff

  Widgetize.add ( '.scroll-to-top', function ( $scroller ) {

    $scroller.on ( Pointer.tap, () => {

      $body.add ( $html ).animate ( { scrollTop: 0 }, Svelto.animation.normal );

    });

  });

  /* FULLSCREEN */

  //TODO: Add the ability to trigger the fullscreen for a specific element
  //FIXME: It doesn't work in iOS's Safari and IE10
  //TODO: Rewrite a component for it

  Widgetize.add ( '.fullscreen-toggler', function ( $toggler ) {

    $toggler.on ( Pointer.tap, screenfull.toggle );

  });

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Infobar
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

//TODO: Maybe add the ability to open it

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'infobar',
    selector: '.infobar',
    options: {
      selectors: {
        closer: '.infobar-closer'
      },
      callbacks: {
        close () {}
      }
    }
  };

  /* INFOBAR */

  class Infobar extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$infobar = this.$element;
      this.$closers = this.$infobar.find ( this.options.selectors.closer );

    }

    _events () {

      /* CLOSER */

      this._on ( this.$closers, Pointer.tap, this.close );

    }

    /* API */

    close () {

      //INFO: Maybe just detach it, so that we can open it again

      this.$infobar.remove ();

      this._trigger ( 'close' );

    }

  }

  /* BINDING */

  Svelto.Infobar = Infobar;
  Svelto.Infobar.config = config;

  /* FACTORY */

  $.factory ( Svelto.Infobar );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Modal
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

//INFO: Since we are using a pseudo element as the background, in order to simplify the markup, only `.card` and `.card`-like elements can be effectively `.modal`

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'modal',
    selector: '.modal',
    options: {
      classes: {
        show: 'show',
        open: 'open'
      },
      animations: {
        open: Svelto.animation.normal,
        close: Svelto.animation.normal
      },
      callbacks: {
        open () {},
        close () {}
      }
    }
  };

  /* MODAL */

  class Modal extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.modal = this.element;
      this.$modal = this.$element;

      this._isOpen = this.$modal.hasClass ( this.options.classes.open );

    }

    _events () {

      /* TAP */

      this._on ( true, Pointer.tap, this.__tap );

    }

    /* TAP */

    __tap ( event ) {

      if ( event.target === this.modal ) {

        this.close ();

      }

    }

    /* KEYDOWN */

    __keydown ( event ) {

      if ( event.keyCode === Svelto.keyCode.ESCAPE ) {

        event.preventDefault ();
        event.stopImmediatePropagation ();

        this.close ();

      }

    }

    /* PUBLIC */

    isOpen () {

      return this._isOpen;

    }

    toggle ( force ) {

      if ( !_.isBoolean ( force ) ) {

        force = !this._isOpen;

      }

      if ( force !== this._isOpen ) {

        this[force ? 'open' : 'close']();

      }

    }

    open () {

      if ( !this._isOpen ) {

        this._isOpen = true;

        $body.unscrollable ();

        this._frame ( function () {

          this.$modal.addClass ( this.options.classes.show );

          this._frame ( function () {

            this.$modal.addClass ( this.options.classes.open );

            this._on ( true, $document, 'keydown', this.__keydown );

            this._trigger ( 'open' );

          });

        });

      }

    }

    close () {

      if ( this._isOpen ) {

        this._isOpen = false;

        this._frame ( function () {

          this.$modal.removeClass ( this.options.classes.open );

          this._delay ( function () {

            this.$modal.removeClass ( this.options.classes.show );

            $body.scrollable ();

            this._off ( $document, 'keydown', this.__keydown );

            this._trigger ( 'close' );

          }, this.options.animations.close );

        });

      }

    }

  }

  /* BINDING */

  Svelto.Modal = Modal;
  Svelto.Modal.config = config;

  /* FACTORY */

  $.factory ( Svelto.Modal );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Modal (Toggler)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires modal.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'modalToggler',
    selector: '.modal-toggler, .modal-closer',
    options: {
      widget: Svelto.Modal
    }
  };

  /* MODAL TOGGLER */

  class ModalToggler extends Svelto.Toggler {}

  /* BINDING */

  Svelto.ModalToggler = ModalToggler;
  Svelto.ModalToggler.config = config;

  /* FACTORY */

  $.factory ( Svelto.ModalToggler );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - N Times Action (Group)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../cookie/cookie.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* TOOLS */

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

  let config = {
    encoder: JSON.stringify,
    decoder: JSON.parse
  };

  /* GROUP */

  class Group {

    constructor ( options ) {

      this.name = options.name;
      this.cookie = options.cookie;

      this.actions = config.decoder ( $.cookie.get ( this.name ) || '{}' );

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

      if ( !_.isNaN ( times ) ) {

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

    }

    update () {

      $.cookie.set ( this.name, config.encoder ( this.actions ), this.cookie.end, this.cookie.path, this.cookie.domain, this.cookie.secure );

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

        $.cookie.remove ( this.name, this.cookie.path, this.cookie.domain );

      }

    }

  }

  /* BINDING */

  Svelto.NTA = {};
  Svelto.NTA.Group = Group;

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - N Times Action (Action)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires NTA.Group.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* ACTION */

  class Action {

    constructor ( options ) {

      this.group = new Svelto.NTA.Group ({ name: options.group, cookie: options.cookie });
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

  Svelto.NTA.Action = Action;

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - N Times Action
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires NTA.Action.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* N TIMES ACTION */

  $.nTimesAction = function ( options ) {

    /* OPTIONS */

    options = _.merge ({
      group: 'nta', //INFO: The cookie name that holds the actions, a namespace for related actions basically
      action: false, //INFO: The action name
      times: Infinity, //INFO: The times an action can be executed
      expiry: false, //INFO: When a single action will expire and will then get removed from its group
      fn: false, //INFO: The function to execute
      cookie: { //INFO: Values that will get passed to `$.cookie` when appropriate
        end: Infinity,
        path: undefined,
        domain: undefined,
        secure: undefined
      }
    }, options );

    /* N TIMES ACTION */

    if ( options.action ) {

      let action = new Svelto.NTA.Action ({ group: options.group, name: options.action, expiry: options.expiry, cookie: options.cookie }),
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

      return new Svelto.NTA.Group ({ name: options.group, cookie: options.cookie });

    }

  };

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Navbar
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

//INFO: Since we are using a pseudo element as the background, in order to simplify the markup, only `.card` and `.card`-like elements can be effectively `.navbar`

//TODO: Replace flickable support with a smooth moving navbar, so operate on drag
//TODO: Close with a flick (if not attached)
//TODO: Add close with the ESC key (if not attached)
//TODO: Maybe control the attaching process via js, so that we no longer have to put the navbar in any particular position also

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'navbar',
    selector: '.navbar',
    options: {
      flickableRange: 20, //INFO: Amount of pixels close to the viewport border where the flick should be considered intentional
      classes: {
        defaultDirection: 'left',
        directions: ['top', 'right', 'bottom', 'left'],
        show: 'show',
        open: 'open',
        flickable: 'flickable'
      },
      animations: {
        open: Svelto.animation.normal,
        close: Svelto.animation.normal,
      },
      callbacks: {
        open () {},
        close () {}
      }
    }
  };

  /* NAVBAR */

  class Navbar extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$navbar = this.$element;
      this.navbar = this.element;

      this.direction = this.options.classes.defaultDirection;

      for ( let direction of this.options.classes.directions ) {

        if ( this.$navbar.hasClass ( direction ) ) {

          this.direction = direction;
          break;

        }

      }

      this._isOpen = this.$navbar.hasClass ( this.options.classes.open );
      this.isFlickable = this.$navbar.hasClass ( this.options.classes.flickable );

    }

    _events () {

      /* TAP */

      this._on ( Pointer.tap, this.__tap );

      /* KEYDOWN */

      this._onHover ( [$document, 'keydown', this.__keydown] );

      /* FLICK */

      if ( this.isFlickable ) {

        $document.flickable ({
          callbacks: {
            flick: this.__flick.bind ( this )
          }
        });

      }

    }

    /* TAP */

    __tap ( event ) {

      if ( event.target === this.navbar ) {

        this.close ();

      }

    }

    /* KEYDOWN */

    __keydown ( event ) {

      if ( event.keyCode === Svelto.keyCode.ESCAPE ) {

        event.preventDefault ();
        event.stopImmediatePropagation ();

        this.close ();

      }

    }

    /* FLICK */

    __flick ( data ) {

      if ( this._isOpen ) return;

      switch ( this.direction ) {

        case 'left':
        case 'right':
          if ( data.orientation === 'horizontal' ) {
            if ( this.direction === 'left' ) {
              if ( data.direction === 'right' ) {
                if ( data.startXY.X <= this.options.flickableRange ) {
                  this.open ();
                }
              }
            } else if ( this.direction === 'right' ) {
              if ( data.direction === 'left' ) {
                if ( $window.width () - data.startXY.X <= this.options.flickableRange ) {
                  this.open ();
                }
              }
            }
          }
          break;

        case 'top':
        case 'bottom':
          if ( data.orientation === 'vertical' ) {
            if ( this.direction === 'top' ) {
              if ( data.direction === 'bottom' ) {
                if ( data.startXY.Y <= this.options.flickableRange ) {
                  this.open ();
                }
              }
            } else if ( this.direction === 'bottom' ) {
              if ( data.direction === 'top' ) {
                if ( $window.height () - data.startXY.Y <= this.options.flickableRange ) {
                  this.open ();
                }
              }
            }
          }
          break;

      }

    }

    /* PUBLIC */

    isOpen () {

      return this._isOpen;

    }

    toggle ( force ) {

      if ( !_.isBoolean ( force ) ) {

        force = !this._isOpen;

      }

      if ( force !== this._isOpen ) {

        this[force ? 'open' : 'close']();

      }

    }

    open () {

      if ( !this._isOpen ) {

        this._isOpen = true;

        $body.unscrollable ();

        this._frame ( function () {

          this.$navbar.addClass ( this.options.classes.show );

          this._frame ( function () {

            this.$navbar.addClass ( this.options.classes.open );

            this._trigger ( 'open' );

          });

        });

      }

    }

    close () {

      if ( this._isOpen ) {

        this._isOpen = false;

        this._frame ( function () {

          this.$navbar.removeClass ( this.options.classes.open );

          this._delay ( function () {

            this.$navbar.removeClass ( this.options.classes.show );

            $body.scrollable ();

            this._trigger ( 'close' );

          }, this.options.animations.close );

        });

      }

    }

  }

  /* BINDING */

  Svelto.Navbar = Navbar;
  Svelto.Navbar.config = config;

  /* FACTORY */

  $.factory ( Svelto.Navbar );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Navbar (Toggler)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires navbar.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'navbarToggler',
    selector: '.navbar-toggler, .navbar-closer',
    options: {
      widget: Svelto.Navbar
    }
  };

  /* NAVBAR TOGGLER */

  class NavbarToggler extends Svelto.Toggler {}

  /* BINDING */

  Svelto.NavbarToggler = NavbarToggler;
  Svelto.NavbarToggler.config = config;

  /* FACTORY */

  $.factory ( Svelto.NavbarToggler );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Notification
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../noty/noty.js
 * ========================================================================= */

//INFO: If the tab hasn't the focus and we can use the native notifications than we'll send a native notification, otherwise we will fallback to a noty

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* NOTIFICATION */

  $.notification = function ( options ) {

    /* OPTIONS */

    options = _.merge ({
      title: false,
      body: false,
      img: false,
      ttl: Svelto.Noty.config.options.ttl
    }, options );

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

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - One Time Action
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../n_times_action/n_times_action.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* ONE TIME ACTION */

  $.oneTimeAction = function ( options ) {

    return $.nTimesAction ( _.merge ( { group: 'ota' }, options, { times: 1 } ) );

  };

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Overlay
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'overlay',
    selector: '.overlay',
    options: {
      classes: {
        show: 'show',
        open: 'open'
      },
      animations: {
        open: Svelto.animation.fast,
        close: Svelto.animation.fast
      },
      callbacks: {
        open () {},
        close () {}
      }
    }
  };

  /* OVERLAY */

  class Overlay extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$overlay = this.$element;

      this._isOpen = this.$overlay.hasClass ( this.options.classes.open );

    }

    _events () {

      /* KEYDOWN */

      this._onHover ( [$document, 'keydown', this.__keydown] );

    }

    /* KEYDOWN */

    __keydown ( event ) {

      if ( event.keyCode === Svelto.keyCode.ESCAPE ) {

        event.preventDefault ();
        event.stopImmediatePropagation ();

        this.close ();

      }

    }

    /* API */

    isOpen () {

      return this._isOpen;

    }

    toggle ( force ) {

      if ( !_.isBoolean ( force ) ) {

        force = !this._isOpen;

      }

      if ( force !== this._isOpen ) {

        this[force ? 'open' : 'close']();

      }

    }

    open () {

      if ( !this._isOpen ) {

        this._isOpen = true;

        this._frame ( function () {

          this.$overlay.addClass ( this.options.classes.show );

          this._frame ( function () {

            this.$overlay.addClass ( this.options.classes.open );

            this._trigger ( 'open' );

          });

        });

      }

    }

    close () {

      if ( this._isOpen ) {

        this._isOpen = false;

        this._frame ( function () {

          this.$overlay.removeClass ( this.options.classes.open );

          this._delay ( function () {

            this.$overlay.removeClass ( this.options.classes.show );

            this._trigger ( 'close' );

          }, this.options.animations.close );

        });

      }

    }

  }

  /* BINDING */

  Svelto.Overlay = Overlay;
  Svelto.Overlay.config = config;

  /* FACTORY */

  $.factory ( Svelto.Overlay );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Overlay (Toggler)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires overlay.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'overlayToggler',
    selector: '.overlay-toggler, .overlay-closer',
    options: {
      widget: Svelto.Overlay
    }
  };

  /* OVERLAY TOGGLER */

  class OverlayToggler extends Svelto.Toggler {}

  /* BINDING */

  Svelto.OverlayToggler = OverlayToggler;
  Svelto.OverlayToggler.config = config;

  /* FACTORY */

  $.factory ( Svelto.OverlayToggler );

}( Svelto.$, Svelto._, window, document ));

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
* Copyright (c) 2015 Fabio Spampinato
* Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
* =========================================================================
* @requires ../factory/factory.js
* ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'progressbar',
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
      indeterminate: false, //Indeterminate state
      labeled: false, // Draw a label inside
      decimals: 0, // Amount of decimals to round the label value to
      size: '', // Size of the progressbar: '', 'compact', 'slim'
      css: '',
      datas: {
        value: 'value'
      },
      selectors: {
        highlight: '.progressbar-highlight'
      },
      callbacks: {
        change () {},
        empty () {},
        full () {}
      }
    }
  };

  /* HELPER */

  $.progressbar = function ( options ) {

    options = _.isNumber ( options ) ? { value: options } : options;

    return new Svelto.Progressbar ( options );

  };

  /* PROGRESSBAR */

  class Progressbar extends Svelto.Widget {

    /* SPECIAL */

    static widgetize ( $progressbar ) { //TODO: Just use the generic data-options maybe

      $progressbar.progressbar ({
        value: $progressbar.data ( 'value' ),
        decimals: $progressbar.data ( 'decimals ')
      });

    }

    _variables () {

      this.$progressbar = this.$element;
      this.$highlight = this.$progressbar.find ( this.options.selectors.highlight );

    }

    _init () {

      this.options.value = this._sanitizeValue ( this.options.value );

      this._update ();

    }

    /* PRIVATE */

    _sanitizeValue ( value ) {

      var nr = Number ( value );

      return _.clamp ( 0, ( _.isNaN ( nr ) ? 0 : nr ), 100 );

    }

    _roundValue ( value ) {

      return value.toFixed ( this.options.decimals );

    }

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

    /* PUBLIC */

    get () {

      return this.options.value;

    }

    set ( value ) {

      value = Number ( value );

      if ( !_.isNaN ( value ) ) {

        value = this._sanitizeValue ( value );

        if ( value !== this.options.value ) {

          var data = {
            previous: this.options.value,
            value: value
          };

          this.options.value = value;

          this._update ();

          this._trigger ( 'change', data );

          if ( this.options.value === 0 ) {

            this._trigger ( 'empty', data );

          } else if ( this.options.value === 100 ) {

            this._trigger ( 'full', data );

          }

        }

      }

    }

  }

  /* BINDING */

  Svelto.Progressbar = Progressbar;
  Svelto.Progressbar.config = config;

  /* FACTORY */

  $.factory ( Svelto.Progressbar );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Rater
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * @requires ../noty/noty.js
 * ========================================================================= */

//TODO: Support the use of the rater as an input, basically don't perform any ajax operation but instead update an input field

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'rater',
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
      selectors: {
        star: '.rater-star'
      },
      callbacks: {
        change () {}
      }
    },
  };

  /* SELECT */

  class Rater extends Svelto.Widget {

    /* SPECIAL */

    static widgetize ( $rater ) { //TODO: Just use the generic data-options maybe

      $rater.rater ({
        value: Number($rater.data ( 'value' ) || 0),
        amount: Number($rater.data ( 'amount' ) || 5),
        url: Number($rater.data ( 'url' ) || false)
      });

    }

    _variables () {

      this.$rater = this.$element;

      this.alreadyRated = false;
      this.doingAjax = false;

    }

    _events () {

      /* TAP */

      this._on ( Pointer.tap, this.options.selectors.star, this.__tap );

    }

    /* TAP */

    __tap ( event ) {

      if ( !this.alreadyRated && !this.doingAjax && this.options.url ) {

        var rating = this.$stars.index ( event.currentTarget ) + 1;

        $.ajax ({

          data: { rating: rating },
          type: 'POST',
          url: this.options.url,

          beforeSend () {

            self.doingAjax = true;

          },

          error ( res ) {

            res = _.attempt ( JSON.parse, res );

            $.noty ( _.isError ( res ) || !( 'msg' in res ) ? 'An error occurred, please try again later' : res.msg );

          },

          success: ( res ) => {

            //FIXME: Handle the case where the server requests succeeded but the user already rated or for whatever reason this rating is not processed

            res = _.attempt ( JSON.parse, res );

            if ( !_.isError ( res ) ) {

              _.merge ( this.options, res );

              this.$rater.html ( this._tmpl ( 'stars', this.options ) );

              this.alreadyRated = true;

              this._trigger ( 'change', {
                value: this.options.value,
                amount: this.options.amount
              });

            }

          },

          complete () {

            self.doingAjax = false;

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

  /* BINDING */

  Svelto.Rater = Rater;
  Svelto.Rater.config = config;

  /* FACTORY */

  $.factory ( Svelto.Rater );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Remote Modal
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../modal/modal.js
 * @requires ../noty/noty.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* REMOTE MODAL */

  //TODO: Animate the dimensions of the temp modal transitioning to the new modal

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

    let $tempModal = $('<div class="modal remote-modal-placeholder card"><div class="card-block"><svg class="spinner"><circle cx="1.625em" cy="1.625em" r="1.25em"></svg></div></div>').appendTo ( $body );

    /* VARIABLES */

    let isAborted = false;

    /* AJAX */

    $.ajax ({

      cache: false,
      data: _.omit ( data, 'url' ),
      type: _.size ( data ) > 1 ? 'POST' : 'GET',
      url: data.url,

      beforeSend () {

        $tempModal.modal ({
          callbacks: {
            close () {
              isAborted = true;
            }
          }
        }).modal ( 'open' );

      },

      error ( res ) {

        if ( isAborted ) return;

        res = _.attempt ( JSON.parse, res );

        $.noty ( _.isError ( res ) || !( 'msg' in res ) ? 'An error occurred, please try again later' : res.msg );

        $tempModal.modal ( 'remove' );

      },

      success ( res ) {

        if ( isAborted ) return;

        res = _.attempt ( JSON.parse, res );

        if ( _.isError ( res ) || !( 'modal' in res ) ) {

          $.noty ( 'An error occurred, please try again later' );

          $tempModal.modal ( 'remove' );

        } else {

          let $remoteModal = $(res.modal);

          $remoteModal.modal ({
            callbacks: {
              close: function () {
                setTimeout ( function () {
                  $remoteModal.remove ();
                }, Svelto.Modal.config.options.animations.close );
              }
            }
          });

          $remoteModal.addClass ( Svelto.Modal.config.options.classes.show ).addClass ( Svelto.Modal.config.options.classes.open ).modal ( 'open' ); //FIXME: This is hacky

          $tempModal.replaceWith ( $remoteModal );

        }

      }

    });

  };

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Ripple
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'ripple',
    selector: '.ripple',
    templates: {
      circle: '<div class="ripple-circle"></div>'
    },
    options: {
      classes: {
        circle: {
          show: 'ripple-circle-show',
          hide: 'ripple-circle-hide'
        }
      },
      animations: {
        show: 350,
        hide: 400
      },
      callbacks: {
        show () {},
        hide () {}
      }
    }
  };

  /* RIPPLE */

  class Ripple extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$ripple = this.$element;

      this.circles = [];

    }

    _events () {

      /* DOWN */

      this._on ( Pointer.down, this.__down );

      /* UP / CANCEL */

      this._on ( Pointer.up + ' ' + Pointer.cancel, this.__upCancel );

    }

    /* DOWN */

    __down ( event ) {

      if ( event.button && event.button !== Svelto.mouseButton.LEFT ) return;

      this._show ( $.eventXY ( event ) );

    }

    /* UP / CANCEL */

    __upCancel ( event ) {

      for ( let [$circle, before] of this.circles ) {

        this._hide ( $circle, before );

      }

      this.circles = [];

    }

    /* SHOW */

    _show ( point ) {

      let $circle = $(this._tmpl ( 'circle' )).prependTo ( this.$ripple ),
          offset = this.$ripple.offset (),
          now = _.now ();

      $circle.css ({
        top: point.Y - offset.top,
        left: point.X - offset.left
      }).addClass ( this.options.classes.circle.show );

      this.circles.push ( [$circle, now] );

      this._trigger ( 'show' );

    }

    /* HIDE */

    _hide ( $circle, before ) {

      let delay = Math.max ( 0, this.options.animations.show + before - _.now () );

      this._delay ( function () {

        $circle.addClass ( this.options.classes.circle.hide );

        this._delay ( function () {

          $circle.remove ();

          this._trigger ( 'hide' );

        }, this.options.animations.hide );

      }, delay );

    }

  }

  /* BINDING */

  Svelto.Ripple = Ripple;
  Svelto.Ripple.config = config;

  /* FACTORY */

  $.factory ( Svelto.Ripple );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Select (Toggler)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * @requires ../dropdown/dropdown.js
 * ========================================================================= */

//TODO: Add support for selecting multiple options (with checkboxes maybe)
//TODO: Add an input field for searching through the options
//FIXME: Doesn't work when the page is scrolled (check in the components/form)
//FIXME: It shouldn't select the first one if none of them is selected

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'selectToggler',
    selector: '.select-toggler',
    templates: {
      base: '<div class="dropdown select-dropdown attached card outlined {%=o.guc%}">' +
              '<div class="card-block">' +
                '{% for ( var i = 0, l = o.options.length; i < l; i++ ) { %}' +
                  '{% include ( "selectToggler." + ( o.options[i].value ? "option" : "optgroup" ), o.options[i] ); %}' +
                '{% } %}' +
              '</div>' +
            '</div>',
      optgroup: '<div class="divider">' +
                  '{%=o.prop%}' +
                '</div>',
      option: '<div class="button" data-value="{%=o.prop%}">' +
                '{%=o.value%}' +
              '</div>'
    },
    options: {
      classes: {
        selected: 'active'
      },
      selectors: {
        select: 'select',
        option: 'option',
        label: '.select-label',
        valueholder: '.valueholder',
        button: '.button'
      },
      callbacks: {
        open () {},
        close () {},
        change () {}
      }
    }
  };

  /* SELECT TOGGLER */

  class SelectToggler extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$toggler = this.$element;
      this.$select = this.$toggler.find ( this.options.selectors.select );
      this.$options = this.$select.find ( this.options.selectors.option );
      this.$label = this.$toggler.find ( this.options.selectors.label );
      this.$valueholder = this.$toggler.find ( this.options.selectors.valueholder );

      this.guc = 'select-dropdown-' + this.guid;

      if ( this.$valueholder.length === 0 ) {

        this.$valueholder = this.$label;

      }

      this.selectOptions = [];

      this.$dropdown = false;
      this.$buttons = false;

    }

    _init () {

      this._updateValueholder ();

      if ( !$.browser.is.touchDevice ) {

        this.$select.addClass ( 'hidden' );

        this.___selectOptions ();
        this.___dropdown ();

      }

    }

    _events () {

      /* CHANGE */

      this._on ( this.$select, 'change', this.__change );

      if ( !$.browser.is.touchDevice ) {

        /* BUTTON TAP */

        this._on ( this.$buttons, Pointer.tap, this.__tap );

      }

    }

    /* CHANGE */

    __change () {

      this._update ();

      this._trigger ( 'change' );

    }

    /* BUTTON TAP */

    __tap ( event ) {

      this.$select.val ( $(event.currentTarget).data ( 'value' ) ).trigger ( 'change' );

    }

    /* PRIVATE */

    ___selectOptions () { //FIXME: Add support for arbitrary number of optgroups levels

      let previousOptgroup,
          currentOptgroup;

      for ( let option of this.$options ) {

        let $option = $(option),
            $parent = $option.parent ();

        if ( $parent.is ( 'optgroup' ) ) {

          currentOptgroup = $parent.attr ( 'label' );

          if ( currentOptgroup !== previousOptgroup ) {

            previousOptgroup = currentOptgroup;

            this.selectOptions.push ({
              prop: currentOptgroup
            });

          }

        }

        this.selectOptions.push ({
          value: $option.html (),
          prop: $option.attr ( 'value' )
        });

      }

    }

    ___dropdown () {

      let html = this._tmpl ( 'base', { guc: this.guc, options: this.selectOptions } );

      this.$dropdown = $(html).appendTo ( $body );
      this.$buttons = this.$dropdown.find ( this.options.selectors.button );

      let self = this;

      this.$dropdown.dropdown ({
        positionate: {
          axis: 'y',
          strict: true
        },
        selectors: {
          closer: '.button'
        },
        callbacks: {
          beforeopen () {
            self._setDropdownWidth ();
          },
          open () {
            self._trigger ( 'open' );
          },
          close () {
            self._trigger ( 'close' );
          }
        }
      });

      this.$toggler.attr ( 'data-target', '.' + this.guc ).dropdownToggler ();

      this._updateDropdown ();

    }

    _setDropdownWidth () {

      this.$dropdown.css ( 'min-width', this.$toggler.outerWidth () );

    }

    /* UPDATE */

    _updateValueholder () {

      let $value = this.$select.val ();

      if ( $value.length > 0 ) {

        let $selectedOption = this.$options.filter ( '[value="' + $value + '"]' );

        this.$valueholder.html ( $selectedOption.html () );

      }

    }

    _updateDropdown () {

      this.$buttons.removeClass ( this.options.classes.selected );

      this.$buttons.filter ( '[data-value="' + this.$select.val () + '"]' ).addClass ( this.options.classes.selected );

    }


    _update () {

      this._updateValueholder ();

      if ( !$.browser.is.touchDevice ) {

        this._updateDropdown ();

      }

    }

    /* PUBLIC */

    get () {

      return this.$select.val ();

    }

    select ( value ) {

      this.$buttons.filter ( '[data-value="' + value + '"]' ).tap ();

    }

  }

  /* BINDING */

  Svelto.SelectToggler = SelectToggler;
  Svelto.SelectToggler.config = config;

  /* FACTORY */

  $.factory ( Svelto.SelectToggler );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Selectable
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

//TODO: Add dropdown for actions AND/OR right click for action (This is a good fit for a new component)
//FIXME: Add support for tableHelper and sortable
//TODO: Make it work with checkboxes (basically use checkboxes instead of the entire row)
//TODO: Store the current selected rows, it makes it faster than retrieving it at every change event

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'selectable',
    selector: 'table.selectable',
    options: {
      moveThreshold: 10,
      classes: {
        selected: 'selected'
      },
      selectors: {
        element: 'tbody tr:not(.empty)'
      },
      callbacks: {
        change () {}
      }
    }
  };

  /* SELECTABLE */

  class Selectable extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$selectable = this.$element;
      this.$elements = this._getElements ();

      this.$startElement = false;
      this.$endElement = false;

    }

    _events () {

      /* KEYDOWN */

      if ( !$.browser.is.touchDevice ) {

        this._onHover ( [$document, 'keydown', this.__keydown] );

      }

      /* POINTER */

      this._on ( Pointer.down, this.options.selectors.element, this.__down );

      /* OTHERS */

      this._on ( 'change sort', this.__change );

    }

    /* CTRL + A / CTRL + SHIFT + A / CTRL + I */

    __keydown ( event ) {

      if ( $.hasCtrlOrCmd ( event ) ) {

        switch ( event.keyCode ) {

          case 65: //INFO: `A`
            this.$elements.toggleClass ( this.options.classes.selected, !event.shiftKey ); //INFO: SHIFT or not //FIXME: It only works if the last character pushed is the `A`, but is it an unwanted behaviour?
            break;

          case 73: //INFO: `I`
            this.$elements.toggleClass ( this.options.classes.selected );
            break;

          default:
            return;

        }

        event.preventDefault ();
        event.stopImmediatePropagation ();

        this._resetPrev ();

        this._trigger ( 'change' );

      }

    }

    /* CLICK / CTRL + CLICK / SHIFT + CLICK / CLICK -> DRAG */

    __down ( event ) {

      if ( event.button && event.button !== Svelto.mouseButton.LEFT ) return; //INFO: Only the left click is allowed

      if ( !$.browser.is.touchDevice ) {

        event.preventDefault ();

      }

      this.startEvent = event;
      this.$startElement = $(event.currentTarget);

      this.motion = false;

      this._on ( $document, Pointer.move, this.__move );

      this._one ( Pointer.up, this.options.selectors.element, this.__up );

      this._one ( Pointer.cancel, this.options.selectors.element, this.__cancel );

    }

    __move ( event ) {

      this.motion = true;

      if ( !$.browser.is.touchDevice ) {

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

          this._off ( $document, Pointer.move, this.__move );

          if ( !$.hasCtrlOrCmd ( event ) ) {

            this.$elements.removeClass ( this.options.classes.selected );

          }

          this._off ( Pointer.up, this.__up );

          this._off ( Pointer.cancel, this.__cancel );

          this._resetPrev ();

          this.$prevElement = this.$startElement;

          this.$startElement.toggleClass ( this.options.classes.selected );

          this._on ( Pointer.enter, this.options.selectors.element, this.__dragEnter );

          this._one ( $document, Pointer.up, this.__dragEnd );
          this._one ( $document, Pointer.cancel, this.__dragEnd );

          this._trigger ( 'change' );

        }

      } else {

        this._off ( $document, Pointer.move, this.__move );

      }

    }

    __dragEnter ( event ) {

      this.$endElement = $(event.currentTarget);

      let startIndex = this.$elements.index ( this.$startElement ),
          endIndex = this.$elements.index ( this.$endElement ),
          minIndex = Math.min ( startIndex, endIndex ),
          maxIndex = Math.max ( startIndex, endIndex );

      if ( minIndex === startIndex ) { //INFO: Direction: down

        minIndex += 1;
        maxIndex += 1;

      }

      let $newDragged = this.$elements.slice ( minIndex, maxIndex );

      if ( this.$prevDragged ) {

        $newDragged.not ( this.$prevDragged ).toggleClass ( this.options.classes.selected );

        this.$prevDragged.not ( $newDragged ).toggleClass ( this.options.classes.selected );

      } else {

        $newDragged.toggleClass ( this.options.classes.selected );

      }

      this.$prevDragged = $newDragged;

      this._trigger ( 'change' );

    }

    __dragEnd () {

      if ( !$.browser.is.touchDevice ) {

        this._off ( $document, Pointer.move, this.__move );

        this._off ( Pointer.enter, this.__dragEnter );

        this._off ( Pointer.up, this.__dragEnd );
        this._off ( Pointer.cancel, this.__dragEnd );

      }

      this.$prevDragged = false;

    }

    __up ( event ) {

      this._off ( $document, Pointer.move, this.__move );

      this._off ( Pointer.cancel, this.__cancel );

      if ( !$.browser.is.touchDevice || !this.motion ) {

        if ( event.shiftKey ) {

          let startIndex = this.$elements.index ( this.$prevElement ),
              endIndex = this.$prevElement ? this.$elements.index ( this.$startElement ) : 0,
              minIndex = Math.min ( startIndex, endIndex ),
              maxIndex = Math.max ( startIndex, endIndex );

          if ( minIndex === startIndex ) { //INFO: Direction: down

            minIndex += 1;
            maxIndex += 1;

          }

          let $newShifted = this.$elements.slice ( minIndex, maxIndex );

          if ( this.$prevShifted ) {

            $newShifted.not ( this.$prevShifted ).toggleClass ( this.options.classes.selected );

            this.$prevShifted.not ( $newShifted ).toggleClass ( this.options.classes.selected );

          } else {

            $newShifted.toggleClass ( this.options.classes.selected );

          }

          this.$prevShifted = $newShifted;

        } else if ( $.hasCtrlOrCmd ( event ) || $.browser.is.touchDevice ) { //TODO: On mobile we behave like if the `ctrl`/`cmd` key is always pressed, so that we can support selecting multiple rows even there //FIXME: Is this the wanted behavious?

          this.$startElement.toggleClass ( this.options.classes.selected );

          this._resetPrev ();

          this.$prevElement = this.$startElement;

        } else {

          this.$elements.removeClass ( this.options.classes.selected );

          this._resetPrev ();

        }

        this._trigger ( 'change' );

      }

    }

    __cancel () {

      this._off ( $document, Pointer.move, this.__move );

      this._off ( Pointer.up, this.__up );

    }

    /* OTHER EVENTS */

    __change () {

      this.$elements = this._getElements ();

      this._resetPrev ();

    }

    /* PRIVATE */

    _resetPrev () {

      this.$prevElement = false;
      this.$prevShifted = false;
      this.$prevDragged = false;

    }

    _getElements () {

      return this.$element.find ( this.options.selectors.element );

    }

    /* API */

    get () {

      return this.$elements.filter ( '.' + this.options.selectors.selected );

    }

  }

  /* BINDING */

  Svelto.Selectable = Selectable;
  Svelto.Selectable.config = config;

  /* FACTORY */

  $.factory ( Svelto.Selectable );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Slider
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * @requires ../draggable/draggable.js
 * @requires ../transform/transform.js
 * ========================================================================= */

//TODO: Add vertical slider
//TODO: Make it work without the window resize bind, before we where transforming the transform to a left
//TODO: Add a live option

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'slider',
    selector: '.slider',
    options: {
      min: 0,
      max: 100,
      value: 0,
      step: 1,
      decimals: 0,
      live: false,
      selectors: {
        input: 'input',
        min: '.slider-min',
        max: '.slider-max',
        bar: '.slider-bar',
        unhighlight: '.slider-unhighlight',
        highlight: '.slider-highlight',
        handlerWrp: '.slider-handler-wrp',
        label: '.slider-label'
      },
      callbacks: {
        change () {}
      }
    }
  };

  /* SLIDER */

  class Slider extends Svelto.Widget {

    /* SPECIAL */

    static widgetize ( $slider ) { //TODO: Just use the generic data-options maybe

      $slider.slider ({
        min: Number($slider.find ( '.slider-min' ).data ( 'min' ) || 0),
        max: Number($slider.find ( '.slider-max' ).data ( 'max' ) || 100),
        value: Number($slider.find ( 'input' ).val () || 0),
        step: Number($slider.data ( 'step' ) || 1),
        decimals: Number($slider.data ( 'decimals' ) || 0)
      });

    }

    _variables () {

      this.$slider = this.$element;
      this.$input = this.$slider.find ( this.options.selectors.input );
      this.$min = this.$slider.find ( this.options.selectors.min );
      this.$max = this.$slider.find ( this.options.selectors.max );
      this.$bar = this.$slider.find ( this.options.selectors.bar );
      this.$unhighlight = this.$slider.find ( this.options.selectors.unhighlight );
      this.$highlight = this.$slider.find ( this.options.selectors.highlight );
      this.$handlerWrp = this.$slider.find ( this.options.selectors.handlerWrp );
      this.$label = this.$handlerWrp.find ( this.options.selectors.label );

      this.stepsNr = ( this.options.max - this.options.min ) / this.options.step;

      this._updateVariables ();

    }

    _init () {

      this._updatePositions ();

    }

    _events () {

      /* INPUT CHANGE */

      this._on ( true, this.$input, 'change', this.__change );

      /* WINDOW RESIZE */

      this._on ( true, $window, 'resize', this._throttle ( this.__resize, 250 ) );

      /* KEYDOWN */

      this._onHover ( [$document, 'keydown', this.__keydown] );

      /* MIN / MAX BUTTONS */

      this._on ( this.$min, Pointer.tap, this.decrease );
      this._on ( this.$max, Pointer.tap, this.increase );

      /* DRAG */

      this.$handlerWrp.draggable ({
        draggable: this.isEnabled.bind ( this ),
        axis: 'x',
        $proxy: this.$bar,
        constrainer: {
          $element: this.$bar,
          constrainCenter: true
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

    /* PRIVATE */

    _roundValue ( value ) {

      return Number ( Number ( value ).toFixed ( this.options.decimals ) );

    }

    _updateVariables () {

      this.unhighlightWidth = this.$unhighlight.width ();

      this.stepWidth = this.unhighlightWidth / this.stepsNr;

    }

    _updatePositions () {

      var percentage = ( this.options.value - this.options.min ) / this.options.step * 100 / this.stepsNr,
          translateX = this.unhighlightWidth / 100 * percentage;

      this.$handlerWrp.translateX ( translateX );

      this.$highlight.translateX ( translateX );

    }

    _updateLabel ( value ) {

      this.$label.html ( _.isUndefined ( value ) ? this.options.value : value );

    }

    _updateInput () {

      this.$input.val ( this.options.value ).trigger ( 'change' );

    }

    /* CHANGE */

    __change () {

      this.set ( this.$input.val () );

    }

    /* RESIZE */

    __resize () {

      this._updateVariables ();
      this._updatePositions ();

    }

    /* LEFT / RIGHT ARROWS */

    __keydown ( event ) {

      switch ( event.keyCode ) {

        case Svelto.keyCode.LEFT:
        case Svelto.keyCode.DOWN:
          this.decrease ();
          break;

        case Svelto.keyCode.RIGHT:
        case Svelto.keyCode.UP:
          this.increase ();
          break;

        default:
          return;

      }

      event.preventDefault ();
      event.stopImmediatePropagation ();

    }

    /* DRAG */

    _dragModifierX ( distance ) {

      return _.roundCloser ( distance, this.stepWidth );

    }

    __dragMove ( data ) {

      if ( this.options.live ) {

        this.set ( this.options.min + ( data.moveXY.X / this.stepWidth * this.options.step ) );

      } else {

        this.$highlight.translateX ( data.moveXY.X );

        this._updateLabel ( this._roundValue ( this.options.min + ( data.moveXY.X / this.stepWidth * this.options.step ) ) );

      }

    }

    __dragEnd ( data ) {

      this.set ( this.options.min + ( data.endXY.X / this.stepWidth * this.options.step ) );

    }

    /* API */

    get () {

      return this.options.value;

    }

    set ( value ) {

      value = _.clamp ( this.options.min, this._roundValue ( value ), this.options.max );

      if ( value !== this.options.value ) {

        var prevValue = this.options.value;

        this.options.value = value;

        this._updatePositions ();
        this._updateLabel ();
        this._updateInput ();

        this._trigger ( 'change', {
          previous: prevValue,
          value: this.options.value
        });

      }

    }

    increase () {

      this.set ( this.options.value + this.options.step );

    }

    decrease () {

      this.set ( this.options.value - this.options.step );

    }

  }

  /* BINDING */

  Svelto.Slider = Slider;
  Svelto.Slider.config = config;

  /* FACTORY */

  $.factory ( Svelto.Slider );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Sortable
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

//TODO: Add support for tableHelper, just put the new addded row in the right position, good performance gain here!
//TODO: Add support for sorting other things other than tables

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'sortable',
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
      sortValue: 'sort-value',
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
        sort () {}
      }
    }
  };

  /* SORTABLE */

  class Sortable extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$table = this.$element;
      this.$headers = this.$table.find ( this.options.selectors.header );
      this.$sortables = this.$headers.filter ( this.options.selectors.sortable );
      this.$tbody = this.$table.find ( this.options.selectors.body );

      this.table = this.element;
      this.tbody = this.$tbody[0];

      this.sortData = {}; //INFO: Caching object for datas and references to rows
      this.updated = false;

      this.$currentSortable = false;
      this.currentIndex = false; //INFO: `$headers` index, not `$sortables` index
      this.currentDirection = false;

    }

    _init () {

      var $initial = this.$headers.filter ( '.' + this.options.classes.sort.asc + ', .' + this.options.classes.sort.desc ).first ();

      if ( $initial.length === 1 ) {

        this.sort ( this.$headers.index ( $initial ), ( $initial.hasClass ( this.options.classes.sort.asc ) ? 'asc' : 'desc' ) );

      }

    }

    _events () {

      /* CHANGE */

      this._on ( true, 'change', this.__change ); //TODO: Update to support tableHelper

      /* TAP */

      this._on ( this.$sortables, Pointer.tap, this.__tap );

    }

    /* CHANGE */

    __change () {

      if ( this.currentIndex !== false ) {

        this.sortData = {};
        this.updated = false;

        this.sort ( this.currentIndex, this.currentDirection );

      }

    }

    /* CLICK */

    __tap ( event ) {

      var newIndex = this.$headers.index ( event.target ),
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

      var $sortable = this.$headers.eq ( index );

      if ( !$sortable.length ) return; //INFO: Bad index

      var sorterName = $sortable.data ( 'sort' );

      if ( !sorterName ) return; //INFO: Unsortable column

      var sorter = this.options.sorters[sorterName];

      if ( !sorter ) return; //INFO: Unsupported sorter

      direction = ( direction && direction.toLowerCase () === 'desc' ) ? 'desc' : 'asc';

      /* CHECKING CACHED DATAS */

      if ( _.isUndefined ( this.sortData[index] ) || !this.updated ) {

        /* VARIABLES */

        var $trs = this.$tbody.find ( this.options.selectors.notEmptyRow );

        this.sortData[index] = Array ( $trs.length );

        /* POPULATE */

        for ( var i = 0, l = $trs.length; i < l; i++ ) {

          var $td = $trs.eq ( i ).find ( this.options.selectors.rowCell ).eq ( index ),
              value = $td.data ( this.options.sortValue ) || $td.text ();

          this.sortData[index][i] = [$trs[i], value];

        }

      }

      /* SORT */

      if ( index !== this.currentIndex || !this.updated ) {

        this.sortData[index].sort ( function ( a, b ) {

          return sorter ( a[1], b[1] );

        });

      }

      /* REVERSING */

      if ( this.updated && index === this.currentIndex && this.currentDirection !== false  ) {

        var needReversing = ( direction !== this.currentDirection );

      } else {

        var needReversing = ( direction === 'desc' );

      }

      if ( needReversing ) {

        this.sortData[index].reverse ();

      }

      /* REORDER */

      if ( index !== this.currentIndex || direction !== this.currentDirection || !this.updated ) {

        this.table.removeChild ( this.tbody ); //INFO: Detach

        for ( var i = 0, l = this.sortData[index].length; i < l; i++ ) {

          this.tbody.appendChild ( this.sortData[index][i][0] ); //INFO: Reorder

        }

        this.table.appendChild ( this.tbody ); //INFO: Attach

      }

      /* STYLE */

      if ( index !== this.currentIndex || direction !== this.currentDirection ) {

        if ( this.$currentSortable ) {

          this.$currentSortable.removeClass ( this.options.classes.sort[this.currentDirection] );

        }

        $sortable.addClass ( this.options.classes.sort[direction] );

      }

      /* UPDATE */

      this.updated = true;

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

  /* BINDING */

  Svelto.Sortable = Sortable;
  Svelto.Sortable.config = config;

  /* FACTORY */

  $.factory ( Svelto.Sortable );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Stepper
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'stepper',
    selector: '.stepper',
    options: {
      min: 0,
      max: 100,
      value: 0,
      step: 1,
      selectors: {
        decreaser: '.stepper-decreaser',
        input: 'input',
        increaser: '.stepper-increaser'
      },
      callbacks: {
        change () {},
        increase () {},
        decrease () {}
      }
    }
  };

  /* STEPPER */

  class Stepper extends Svelto.Widget {

    /* SPECIAL */

    static widgetize ( $stepper ) { //TODO: Just use the generic data-options maybe

      $stepper.stepper ({
        min: Number($stepper.data ( 'min' ) || 0),
        max: Number($stepper.data ( 'max' ) || 100),
        value: Number($stepper.find ( '.stepper-input' ).val () || 0),
        step: Number($stepper.data ( 'step' ) || 1)
      });

    }

    _variables () {

      this.$stepper = this.$element;
      this.$decreaser = this.$stepper.find ( this.options.selectors.decreaser );
      this.$input = this.$stepper.find ( this.options.selectors.input );
      this.$increaser = this.$stepper.find ( this.options.selectors.increaser );

      this.options.value = this._sanitizeValue ( this.options.value );

    }

    _init () {

      this._updateButtons ();

    }

    _events () {

      /* INPUT / CHANGE */

      this._on ( true, this.$input, 'input change', this.__inputChange );

      /* KEYDOWN */

      this._onHover ( [$document, 'keydown', this.__keydown] );

      /* INCREASE */

      this._on ( this.$decreaser, Pointer.tap, this.decrease );

      /* DECREASE */

      this._on ( this.$increaser, Pointer.tap, this.increase );

    }

    /* PRIVATE */

    _sanitizeValue ( value ) {

      var nr = Number ( value );

      value = ( _.isNaN ( nr ) ? 0 : nr );

      var remaining = ( value % this.options.step );

      value = value - remaining + ( remaining >= this.options.step / 2 ? this.options.step : 0 );

      return _.clamp ( this.options.min, value, this.options.max );

    }

    /* UPDATE */

    _updateInput () {

      this.$input.val ( this.options.value ).trigger ( 'change' );

    }

    _updateButtons ( previous ) {

      var isMin = ( this.options.value === this.options.min ),
          isMax = ( this.options.value === this.options.max );

      if ( previous === this.options.min || isMin ) {

        this.$decreaser.toggleClass ( 'disabled', isMin );

      } else if ( previous === this.options.max || isMax ) {

        this.$increaser.toggleClass ( 'disabled', isMax );

      }

    }

    _update ( previous ) {

      this._updateInput ();
      this._updateButtons ( previous );

    }

    /* CHANGE */

    __inputChange () {

      this.set ( this.$input.val () );

    }

    /* LEFT / RIGHT ARROWS */

    __keydown ( event ) {

      switch ( event.keyCode ) {

        case Svelto.keyCode.UP:
          this.increase ();
          break;

        case Svelto.keyCode.DOWN:
          this.decrease ();
          break;

        default:
          break;

      }

      event.preventDefault ();
      event.stopImmediatePropagation ();

    }

    /* PUBLIC */

    get () {

      return this.options.value;

    }

    set ( value ) {

      value = Number ( value );

      if ( !_.isNaN ( value ) ) {

        value = this._sanitizeValue ( value );

        if ( value !== this.options.value ) {

          var data = {
            previous: this.options.value,
            value: value
          };

          this.options.value = value;

          this._update ( data.previous );

          this._trigger ( 'change', data );

          this._trigger ( ( data.previous < data.value ) ? 'increase' : 'decrease', data );

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

  /* BINDING */

  Svelto.Stepper = Stepper;
  Svelto.Stepper.config = config;

  /* FACTORY */

  $.factory ( Svelto.Stepper );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Switch
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * @requires ../draggable/draggable.js
 * @requires ../transform/transform.js
 * ========================================================================= */

//TODO: Add flick support

(function ( $, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'switch',
    selector: '.switch',
    options: {
      colors: {
        on: 'secondary',
        off: 'gray'
      },
      classes: {
        checked: 'checked'
      },
      selectors: {
        input: 'input',
        bar: '.switch-bar',
        handler: '.switch-handler'
      },
      callbacks: {
        change () {},
        check () {},
        uncheck () {}
      }
    }
  };

  /* SWITCH */

  class Switch extends Svelto.Widget {

    /* SPECIAL */

    static widgetize ( $switch ) { //TODO: Just use the generic data-options maybe

      $switch.switch ({
        colors: {
          on: $switch.data ( 'color-on' ) || 'secondary',
          off: $switch.data ( 'color-off' ) || 'gray'
        }
      });

    }

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

      if ( this.$input.prop ( 'checked' ) ) {

        this.check ();

      }

    }

    _events () {

      /* CHANGE */

      this._on ( true, this.$input, 'change', this.__change );

      /* KEYDOWN */

      this._onHover ( [$document, 'keydown', this.__keydown] );

      /* DRAG */

      this.$handler.draggable ({
        draggable: this.isEnabled.bind ( this ),
        axis: 'x',
        $proxy: this.$switch,
        proxyWithoutMotion: false,
        constrainer: {
          $element: this.$switch
        },
        callbacks: {
          end: this.__dragEnd.bind ( this )
        }
      });

    }

    /* CHANGE */

    __change () {

      this.toggle ( this.$input.prop ( 'checked' ) );

    }

    /* KEYS */

    __keydown ( event ) {

      switch ( event.keyCode ) {

        case Svelto.keyCode.LEFT:
          this.uncheck ();
          break;

        case Svelto.keyCode.RIGHT:
          this.check ();
          break;

        case Svelto.keyCode.SPACE:
          this.toggle ();
          break;

        default:
          return;

      }

      event.preventDefault ();
      event.stopImmediatePropagation ();

    }

    /* DRAG */

    __dragEnd ( data ) {

      if ( data.motion ) {

        var isChecked = ( data.endXY.X + ( this.handlerWidth / 2 ) ) >= ( this.switchWidth / 2 );

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

    /* API */

    get () {

      return this.isChecked;

    }

    toggle ( force, reset ) {

      if ( !_.isBoolean ( force ) ) {

        force = !this.isChecked;

      }

      if ( force !== this.isChecked ) {

        var prevChecked = this.isChecked;

        this.isChecked = force;

        this.$switch.toggleClass ( this.options.classes.checked, this.isChecked );

        this._updatePosition ();
        this._updateColors ();
        this._updateInput ();

        this._trigger ( 'change', {
          previous: prevChecked,
          checked: this.isChecked
        });

        this._trigger ( this.isChecked ? 'check' : 'uncheck' );

      } else if ( reset ) {

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

  /* BINDING */

  Svelto.Switch = Switch;
  Svelto.Switch.config = config;

  /* FACTORY */

  $.factory ( Svelto.Switch );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Table Helper
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tableHelper',
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
      rowIdPrefix: 'rid',
      selectors: {
        header: 'thead',
        body: 'tbody',
        headerCell: 'th',
        rowCell: 'td',
        emptyRow: 'tr.table-row-empty',
        notEmptyRow: 'tr:not(.table-row-empty)'
      },
      callbacks: {
        add () {},
        update () {},
        remove () {},
        clear () {}
      }
    },
  };

  /* TABLE HELPER */

  class TableHelper extends Svelto.Widget {

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

      var hasNonEmptyRows = this.$body.find ( this.options.selectors.notEmptyRow ).length > 0;

      this.$emptyRow.toggleClass ( 'hidden', hasNonEmptyRows );

    }

    _getRowId ( id ) {

      return this.options.rowIdPrefix + '_' + this.guid + '_' + id;

    }

    /* PUBLIC */

    add ( id ) { //INFO: id, datas...

      var datas = _.tail ( arguments ),
          rowId = id ? this._getRowId ( id ) : false;

      if ( datas.length > 0 ) {

        if ( rowId && $( '.' + rowId ).length === 1 ) return this;

        var chunks = _.chunk ( datas, this.columnsNr ),
            $rows = $empty;

        for ( var ci = 0, cl = chunks.length; ci < cl; ci++ ) {

          var chunk = chunks[ci],
              rowHtml = this._tmpl ( 'row', { id: rowId, datas: chunk, missing: this.columnsNr - chunk.length } );

          $rows = $rows.add ( rowHtml );

        }

        this.$body.append ( $rows );

        this._checkEmpty ();

        this.$table.trigger ( 'change' );

        this._trigger ( 'add', {
          $rows: $rows
        });

      }

      return this;

    }

    update ( id ) { //INFO: id, datas...

      var datas = _.tail ( arguments ),
          $row = $( '.' + this._getRowId ( id ) );

      if ( datas.length > 0 && $row.length === 1 ) {

        var $rowCells = $row.find ( this.options.selectors.rowCell );

        for ( var i = 0, l = datas.length; i < l; i++ ) {

          if ( _.isString ( datas[i] ) ) {

            $rowCells.eq ( i ).html ( datas[i] );

          }

        }

        this.$table.trigger ( 'change' );

        this._trigger ( 'update', {
          $row: $row
        });

      }

      return this;

    }

    remove ( id ) {

      var $row = $( '.' + this._getRowId ( id ) );

      if ( $row.length === 1 ) {

        $row.remove ();

        this._checkEmpty ();

        this.$table.trigger ( 'change' );

        this._trigger ( 'remove', {
          $row: $row
        });

      }

      return this;

    }

    clear () {

      var $rows = this.$body.find ( this.options.selectors.notEmptyRow );

      if ( $rows.length > 0 ) {

        $rows.remove ();

        this._checkEmpty ();

        this.$table.trigger ( 'change' );

        this._trigger ( 'clear', {
          $rows: $rows
        });

      }

      return this;

    }

  }

  /* BINDING */

  Svelto.TableHelper = TableHelper;
  Svelto.TableHelper.config = config;

  /* FACTORY */

  $.factory ( Svelto.TableHelper );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Tabs
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

//TODO: Add again the super cool moving indicator

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tabs',
    selector: '.tabs',
    options: {
      direction: undefined,
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
        set () {}
      }
    }
  };

  /* TABS */

  class Tabs extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$tabs = this.$element;
      this.$triggers = this.$tabs.find ( this.options.selectors.triggers );
      this.$containers = this.$tabs.find ( this.options.selectors.containers );

      this.options.direction = this.options.direction || ( this.$tabs.hasClass ( 'top' ) ? 'top' : ( this.$tabs.hasClass ( 'right' ) ? 'right' : ( this.$tabs.hasClass ( 'bottom' ) ? 'bottom' : ( this.$tabs.hasClass ( 'left' ) ? 'left' : 'top' ) ) ) );

      this.index = -1;

    }

    _init () {

      var $activeTrigger = this.$triggers.filter ( '.' + this.options.classes.active.trigger ).first ();

      $activeTrigger = ( $activeTrigger.length > 0 ) ? $activeTrigger : this.$triggers.first ();

      var newIndex = this.$triggers.index ( $activeTrigger );

      this.set ( newIndex );

    }

    _events () {

      /* TRIGGERS */

      this._on ( this.$triggers, Pointer.tap, this.__tap );

    }

    /* PRIVATE */

    __tap ( event ) {

      var newIndex = this.$triggers.index ( $(event.currentTarget) );

      this.set ( newIndex );

    }

    /* PUBLIC */

    get () {

      return this.index;

    }

    set ( index ) {

      if ( this.index !== index ) {

        /* PREVIOUS */

        var $prevTrigger = this.$triggers.eq ( this.index ),
            $prevContainer = this.$containers.eq ( this.index );

        $prevTrigger.removeClass ( this.options.classes.active.trigger );
        $prevContainer.removeClass ( this.options.classes.active.container );

        if ( this.options.highlight ) {

          $prevTrigger.removeClass ( 'highlighted highlight-bottom highlight-right' );

        }

        /* NEW */

        this.index = index;

        var $trigger = this.$triggers.eq ( this.index ),
            $container = this.$containers.eq ( this.index );

        $trigger.addClass ( this.options.classes.active.trigger );
        $container.addClass ( this.options.classes.active.container );

        if ( this.options.highlight ) {

          let highlightDirection;

          switch ( this.options.direction ) {

            case 'bottom':
              highlightDirection = 'top';
              break;

            case 'left':
              highlightDirection = 'right';
              break;

            case 'right':
              highlightDirection = 'left';
              break;

            case 'top':
            default:
              highlightDirection = 'bottom';
              break;

          }

          $trigger.addClass ( 'highlighted' + ( ' highlight-' + highlightDirection ) );

        }

        /* CALLBACKS */

        this._trigger ( 'set', {
          index: this.index
        });

      }

    }

  }

  /* BINDING */

  Svelto.Tabs = Tabs;
  Svelto.Tabs.config = config;

  /* FACTORY */

  $.factory ( Svelto.Tabs );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Tagbox
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * @requires ../noty/noty.js
 * ========================================================================= */

//FIXME: Do we handle the insertion of characters like `&` or `'` propertly?
//FIXME: Should we forbid characters or just escape them?
//FIXME: If we disable the escaping, does it break using characters like `"`? `It does, at leas when calling `remove`
//FIXME: Partial's text cursor is not visible whan it's empty
//FIXME: Auto focus on the partial input doesn't work good on mobile

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tagbox',
    selector: '.tagbox',
    templates: {
      tag: '<div class="label-tag tagbox-tag" data-tag-value="{%=o.value%}">' +
              '<div class="label {%=o.color%} {%=o.size%} {%=o.css%}">' +
                '<span>' +
                  '{%=o.value%}' +
                '</span>' +
                '<div class="button gray compact xxsmall tagbox-tag-remover">' +
                  '<i class="icon">close</i>' +
                '</div>' +
              '</div>' +
            '</div>'
    },
    options: {
      init: '',
      tags: [],
      tag: {
        minLength: 3,
        color: '',
        size: '',
        css: 'outlined'
      },
      characters: {
        forbidden: [ '<', '>', ';', '`' ],
        separator: ',', //INFO: It will also become kind of a forbidden character, used for insertion
        inserters: [Svelto.keyCode.ENTER, Svelto.keyCode.TAB] //INFO: They are keyCodes
      },
      sort: false, //INFO: The tags will be outputted in alphanumeric-sort order
      escape: true, //INFO: Escape potential XSS characters
      deburr: false, //INFO: Replace non basic-latin characters
      selectors: {
        input: 'input.hidden',
        partial: 'input.tagbox-partial, .tagbox-partial input',
        tags: '.tagbox-tags',
        tag: '.tagbox-tag',
        tagLabel: 'span',
        tagRemover: '.tagbox-tag-remover'
      },
      callbacks: {
        change () {},
        add () {},
        remove () {},
        empty () {}
      }
    }
  };

  /* TAGBOX */

  class Tagbox extends Svelto.Widget {

    /* SPECIAL */

    static widgetize ( $tagbox ) { //TODO: Just use the generic data-options maybe

      $tagbox.tagbox ({ init: $tagbox.find ( 'input' ).val () });

    }

    _variables () {

      this.$tagbox = this.$element;
      this.$tags = this.$tagbox.find ( this.options.selectors.tags );
      this.$input = this.$tagbox.find ( this.options.selectors.input );
      this.$partial = this.$tagbox.find ( this.options.selectors.partial );

    }

    _init ( suppressTriggers ) {

      this.add ( this.options.init, suppressTriggers );

    }

    _events () {

      /* PARTIAL */

      this._on ( this.$partial, 'keypress keydown', this.__keypressKeydown ); //INFO: `keypress` is for printable characters, `keydown` for the others

      this._on ( this.$partial, 'paste', this.__paste );

      /* TAP ON EMPTY */

      this._on ( Pointer.tap, this.__tapOnEmpty );

      /* TAP ON TAG REMOVER */

      this._on ( Pointer.tap, this.options.selectors.tagRemover, this.__tapOnTagRemover );

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

      return this._tmpl ( 'tag', _.merge ( { value: value }, this.options.tag ) );

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

      var valueTrimmed = _.trim ( value ),
          value = this._sanitizeTag ( value );

      if ( valueTrimmed.length < this.options.tag.minLength ) {

        if ( valueTrimmed.length > 0 ) { //INFO: So it won't be triggered when the user presses enter and the $partial is empty

          $.noty ( '`' + value + '` is shorter than ' + this.options.tag.minLength + ' characters' );

        }

      } else if ( _.contains ( this.options.tags, value ) ) {

        $.noty ( '`' + value + '` is a duplicate' );

      } else {

        this.options.tags.push ( value );

        if ( this.options.sort ) {

          this.options.tags.sort ();

        }

        var tagHtml = this._getTagHtml ( value );

        if ( this.options.tags.length === 1 ) {

          this.$tags.prepend ( tagHtml );

        } else if ( !this.options.sort ) {

          this.$tagbox.find ( this.options.selectors.tag ).last ().after ( tagHtml );

        } else {

          var index = this.options.tags.indexOf ( value );

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

    /* KEYPRESS / KEYDOWN */

    __keypressKeydown ( event ) {

      var value = this.$partial.val ();

      if ( _.contains ( this.options.characters.inserters, event.keyCode ) || event.keyCode === this.options.characters.separator.charCodeAt ( 0 ) ) {

        var added = this.add ( value );

        if ( added ) {

          this._clearPartial ();

        }

        event.preventDefault ();
        event.stopImmediatePropagation ();

      } else if ( event.keyCode === Svelto.keyCode.BACKSPACE ) {

        if ( value.length === 0 && this.options.tags.length > 0 ) {

          var $tag = this.$tagbox.find ( this.options.selectors.tag ).last (),
              edit = !$.hasCtrlOrCmd ( event );

          this.remove ( $tag, edit );

          event.preventDefault ();
          event.stopImmediatePropagation ();

        }

      } else if ( _.contains ( this.options.characters.forbidden, String.fromCharCode ( event.keyCode ) ) ) {

        $.noty ( 'The character you entered is forbidden' );

        event.preventDefault ();
        event.stopImmediatePropagation ();

      }

    }

    /* PASTE */

    __paste ( event ) {

        this.add ( event.originalEvent.clipboardData.getData ( 'text' ) );

        event.preventDefault ();

    }

    /* TAP ON CLOSE */

    __tapOnTagRemover ( event ) {

      var $tag = $(event.currentTarget).parents ( this.options.selectors.tag );

      this.remove ( $tag );

    }

    /* TAP ON EMPTY */

    __tapOnEmpty ( event ) {

      if ( document.activeElement !== this.$partial[0] && !$(event.target).is ( 'input, ' + this.options.selectors.tagLabel ) ) {

        this.$partial.focus ();

      }

    }

    /* PUBLIC */

    get () {

      return _.clone ( this.options.tags );

    }

    add ( tag, suppressTriggers ) { //INFO: The tag can be a string containing a single tag, multiple tags separated by `this.options.characters.separator`, or it can be an array (nested or not) of those strings

      if ( _.isArray ( tag ) ) {

        tag = _.flatten ( tag ).join ( this.options.characters.separator );

      }

      var previous = _.clone ( this.options.tag );

      var tags = tag.split ( this.options.characters.separator ),
          adds = _.map ( tags, this._add, this );

      var added = ( _.compact ( adds ).length > 0 );

      if ( added ) {

        this._updateInput ();

        if ( !suppressTriggers ) {

          this._trigger ( 'change', {
            previous: previous,
            tags: _.clone ( this.options.tags )
          })

          var addedTags = _.filter ( tags, function ( tag, index ) {
            return adds[index];
          });

          this._trigger ( 'add', addedTags );

        }

      }

      return added;

    }

    remove ( tag, edit, suppressTriggers ) { //INFO: The tag can be a string containing a single tag, multiple tags separated by `this.options.characters.separator`, or it can be an array (nested or not) of those strings. In addition it can also be the jQuery object of that tag.

      if ( tag instanceof $ ) {

        var $tags = [tag],
            tags = [tag.data ( 'tag-value' )];

      } else {

        var $tags = [],
            tags = [];

        if ( _.isArray ( tag ) ) {

          tag = _.flatten ( tag ).join ( this.options.characters.separator );

        }

        tag = tag.split ( this.options.characters.separator );

        for ( var i = 0, l = tag.length; i < l; i++ ) {

          var value = this._sanitizeTag ( tag[i] ),
              $tag = this.$tagbox.find ( this.options.selectors.tag + '[data-tag-value="' + value + '"]' );

          if ( $tag.length === 1 ) {

            $tags.push ( $tag );
            tags.push ( value );

          }

        }

      }

      if ( tags.length > 0 ) {

        var previous = _.clone ( this.options.tags );

        for ( var i = 0, l = tags.length; i < l; i++ ) {

          this._remove ( $tags[i], tags[i] );

        }

        this._updateInput ();

        if ( tags.length === 1 && edit === true ) {

          this.$partial.val ( tags[0] ).trigger ( 'change' );

        }

        if ( !suppressTriggers ) {

          this._trigger ( 'change', {
            previous: previous,
            tags: _.clone ( this.options.tags )
          })

          this._trigger ( 'remove', tags );

          if ( this.options.tags.length === 0 ) {

            this._trigger ( 'empty' );

          }

        }

      }

    }

    clear ( suppressTriggers ) {

      if ( this.options.tags.length > 0 ) {

        var data = {
          previous: _.clone ( this.options.tags ),
          tags: []
        };

        this.options.tags = [];

        this.$tagbox.find ( this.options.selectors.tag ).remove ();

        this._clearPartial ();

        this._updateInput ();

        if ( !suppressTriggers ) {

          this._trigger ( 'change', data );

          if ( data.previous.length > 0 ) {

            this._trigger ( 'remove', data.previous );

          }

          this._trigger ( 'empty' );

        }

      }

    }

    reset () {

      var previous = _.clone ( this.options.tags );

      this.clear ( true );

      this._init ( true );

      if ( !_.isEqual ( previous, this.options.tags ) ) {

        this._trigger ( 'change', {
          previous: previous,
          tags: _.clone ( this.options.tags )
        });

        var added = _.difference ( this.options.tags, previous );

        if ( added.length > 0 ) {

          this._trigger ( 'add', added );

        }

        var removed = _.difference ( previous, this.options.tags );

        if ( removed.length > 0 ) {

          this._trigger ( 'remove', removed );

        }

        if ( this.options.tags.length === 0 ) {

          this._trigger ( 'empty' );

        }

      }

    }

  }

  /* BINDING */

  Svelto.Tagbox = Tagbox;
  Svelto.Tagbox.config = config;

  /* FACTORY */

  $.factory ( Svelto.Tagbox );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Time Ago
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'timeAgo',
    selector: '[data-timestamp], [data-timestamp-title]',
    options: {
      timestamp: false,
      title: false,
      callbacks: {
        change () {}
      }
    }
  };

  /* TIME AGO */

  class TimeAgo extends Svelto.Widget {

    /* SPECIAL */

    static widgetize ( $element ) {

      $element.timeAgo ({ title: $element.is ( '[data-timestamp-title]' ) });

    }

    _variables () {

      this.$timeAgoElement = this.$element;

      if ( !this.options.timestamp ) {

        this.options.timestamp = this.$timeAgoElement.data ( this.options.title ? 'timestamp-title' : 'timestamp' );

      }

    }

    _init () {

      this._loop ( 0 );

    }

    /* PRIVATE */

    _loop ( wait ) {

      this._delay ( function () {

        this._loop ( this._update ().next );

      }, wait * 1000 );

    }

    _update () {

      let timeAgo = _.timeAgo ( this.options.timestamp );

      if ( this.options.title ) {

        this.$timeAgoElement.attr ( 'title', timeAgo.str );

      } else {

        this.$timeAgoElement.html ( timeAgo.str );

      }

      this._trigger ( 'change' );

      return timeAgo;

    }

  }

  /* BINDING */

  Svelto.TimeAgo = TimeAgo;
  Svelto.TimeAgo.config = config;

  /* FACTORY */

  $.factory ( Svelto.TimeAgo );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Timer
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * Fork of http://jchavannes.com/jquery-timer - Jason Chavannes
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function ( _, window, document, undefined ) {

  'use strict';

  /* TIMER */

  window.Timer = class {

    constructor ( ...args ) {

      this.set ( ...args );

    }

    set ( fn, time, autostart ) {

      this.init = true;
      this.action = fn;

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
        this.remainingTime -= ( new Date() - this.last );
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
      this.last = new Date ();
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

}( Svelto._, window, document ));


/* =========================================================================
 * Svelto - Tooltip
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tooltip',
    selector: '.tooltip',
    options: {
      selectors: {
        closer: '.button, .tooltip-closer'
      }
    }
  };

  /* TOOLTIP */

  class Tooltip extends Svelto.Dropdown {}

  /* BINDING */

  Svelto.Tooltip = Tooltip;
  Svelto.Tooltip.config = config;

  /* FACTORY */

  $.factory ( Svelto.Tooltip );

}( Svelto.$, Svelto._, window, document ));


/* =========================================================================
 * Svelto - Tooltip (Toggler)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires tooltip.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tooltipToggler',
    selector: '.tooltip-toggler',
    options: {
      widget: Svelto.Tooltip,
      hover: {
        triggerable: true
      }
    }
  };

  /* TOOLTIP TOGGLER */

  class TooltipToggler extends Svelto.Toggler {}

  /* BINDING */

  Svelto.TooltipToggler = TooltipToggler;
  Svelto.TooltipToggler.config = config;

  /* FACTORY */

  $.factory ( Svelto.TooltipToggler );

}( Svelto.$, Svelto._, window, document ));

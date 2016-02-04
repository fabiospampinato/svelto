'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* =========================================================================
 * Svelto - Svelto
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

(function () {

  'use strict';

  /* SVELTO */

  var Svelto = {
    VERSION: '0.4.0-beta2',
    $: jQuery && 'jquery' in jQuery() ? jQuery : $ && 'jquery' in $() ? $ : false, // Checking the presence of the `jquery` property in order to distinguish it from `Zepto` and other `jQuery`-like libraries
    _: lodash && Number(lodash.VERSION[0]) === 3 ? lodash : _ && 'VERSION' in _ && Number(_.VERSION[0]) === 3 ? _ : false, // Checking the version also in order to distinguish it from `underscore`
    Widgets: {} // Namespace for the Svelto's widgets' classes
  };

  /* ERRORS */

  if (!Svelto.$) {

    throw new Error('Svelto depends upon jQuery, dependency not found');
  }

  if (!Svelto._) {

    throw new Error('Svelto depends upon lodash, dependency not found');
  }

  /* EXPORT */

  window.Svelto = Svelto;
})();

/* =========================================================================
 * Svelto - Animations
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function ($, _, Svelto) {

  'use strict';

  /* ANIMATIONS */

  var Animations = {
    xslow: 900,
    slow: 500,
    normal: 350,
    fast: 150,
    xfast: 75
  };

  /* EXPORT */

  Svelto.Animations = Animations;
})(Svelto.$, Svelto._, Svelto);

/* =========================================================================
 * Svelto - Breakpoints
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function ($, _, Svelto) {

  'use strict';

  /* BREAKPOINTS */

  var Breakpoints = {
    xsmall: 0,
    small: 512,
    medium: 768,
    large: 1024,
    xlarge: 1216
  };

  /* EXPORT */

  Svelto.Breakpoints = Breakpoints;
})(Svelto.$, Svelto._, Svelto);

/* =========================================================================
 * Svelto - Colors
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function ($, _, Svelto) {

  'use strict';

  /* COLORS */

  var Colors = {
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
})(Svelto.$, Svelto._, Svelto);

/* =========================================================================
 * Svelto - Lodash (Extras)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

//TODO: Write it better

(function (_) {

  'use strict';

  /* LODASH EXTRA */

  _.mixin({
    nowSecs: function nowSecs() {

      return Math.floor(_.now() / 1000);
    },
    timeAgo: function timeAgo(timestamp) {
      // Timestamp is required in seconds

      var elapsed = _.nowSecs() - timestamp,
          justNow = 5;

      var names = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second'],
          times = [31536000, 2592000, 604800, 86400, 3600, 60, 1];

      if (elapsed < justNow) {

        return {
          str: 'Just now',
          next: justNow - elapsed
        };
      } else {

        for (var i = 0, l = times.length; i < l; i++) {

          var name = names[i],
              secs = times[i],
              number = Math.floor(elapsed / secs);

          if (number >= 1) {

            return {
              str: number + ' ' + name + (number > 1 ? 's' : '') + ' ago',
              next: secs - (elapsed - number * secs)
            };
          }
        }
      }
    },
    fuzzyMatch: function fuzzyMatch(str, search, isCaseSensitive) {

      if (isCaseSensitive !== false) {

        str = str.toLowerCase();
        search = search.toLowerCase();
      }

      var currentIndex = -1,
          str_i = undefined,
          str_l = str.length;

      for (var search_i = 0, search_l = search.length; search_i < search_l; search_i++) {

        for (str_i = currentIndex + 1; str_i < str_l; str_i++) {

          if (str[str_i] === search[search_i]) {

            currentIndex = str_i;
            str_i = str_l + 1;
          }
        }

        if (str_i === str_l) {

          return false;
        }
      }

      return true;
    },
    clamp: function clamp(value, minimum, maximum) {

      if (!_.isUndefined(maximum)) {

        if (value > maximum) {

          value = maximum;
        }
      }

      if (!_.isUndefined(minimum)) {

        if (value < minimum) {

          value = minimum;
        }
      }

      return value;
    },
    btEach: function btEach(arr, callback, startIndex) {

      var start = 0,
          end = arr.length - 1,
          center = _.isNumber(startIndex) ? startIndex : Math.ceil((start + end) / 2),
          direction = undefined;

      while (start <= end) {

        direction = callback.call(arr[center], center, arr[center]);

        if (direction < 0) {

          end = center - 1;
        } else if (direction > 0) {

          start = center + 1;
        } else {

          return center;
        }

        center = Math.ceil((start + end) / 2);
      }

      return -1;
    },
    move: function move(arr, from, to) {

      arr.splice(to, 0, arr.splice(from, 1)[0]);
    },
    mkize: function mkize(number) {
      var decimals = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

      var bases = [1000000000, 1000000, 1000],
          suffixes = ['B', 'M', 'K'];

      for (var i = 0, l = bases.length; i < l; i++) {

        if (number >= bases[i]) {

          return Number((number / bases[i]).toFixed(decimals)) + suffixes[i];
        }
      }

      return number;
    },
    roundCloser: function roundCloser(number, step) {

      if (_.isUndefined(step)) {

        step = 1;
      }

      var left = number % step,
          halfStep = step / 2;

      return number - left + (left >= halfStep ? step : 0);
    },
    format: function format(msg) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      for (var i = 0, l = args.length; i < l; i++) {

        msg = msg.replace('$' + (i + 1), args[i]);
      }

      return msg;
    },
    getDirections: function getDirections() {

      return ['top', 'bottom', 'left', 'right'];
    },
    getOppositeDirection: function getOppositeDirection(direction) {

      return {
        'top': 'bottom',
        'bottom': 'top',
        'left': 'right',
        'right': 'left'
      }[direction];
    },

    true: _.constant(true),

    false: _.constant(false)

  });
})(Svelto._);

/* =========================================================================
 * Svelto - Browser
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function ($, _, Svelto) {

  'use strict';

  /* VARIABLES */

  var userAgent = navigator.userAgent ? navigator.userAgent.toLowerCase() : '',
      vendor = navigator.vendor ? navigator.vendor.toLowerCase() : '',
      // Fixes an IE10 bug, `navigator.vendor` it's `undefined` there
  appVersion = navigator.appVersion ? navigator.appVersion.toLowerCase() : '';

  /* CHECKS */

  var isIpod = /ipod/i.test(userAgent),
      isIphone = !isIpod && /iphone/i.test(userAgent),
      isIpad = /ipad/i.test(userAgent),
      isAndroid = /android/i.test(userAgent),
      isAndroidPhone = isAndroid && /mobile/i.test(userAgent),
      isAndroidTablet = isAndroid && !isAndroidPhone,
      isBlackberry = /blackberry/i.test(userAgent) || /BB10/i.test(userAgent),
      isWindows = /win/i.test(appVersion),
      isWindowsPhone = isWindows && /phone/i.test(userAgent),
      isWindowsTablet = isWindows && !isWindowsPhone && /touch/i.test(userAgent),
      isMobile = isIphone || isIpod || isAndroidPhone || isBlackberry || isWindowsPhone,
      isTablet = isIpad || isAndroidTablet || isWindowsTablet;

  /* BROWSER */

  var Browser = {
    is: {
      chrome: /chrome|chromium/i.test(userAgent) && /google inc/.test(vendor),
      firefox: /firefox/i.test(userAgent),
      edge: /(edge)\/((\d+)?[\w\.]+)/i.test(userAgent),
      ie: /msie/i.test(userAgent) || 'ActiveXObject' in window, /* IE || EDGE */
      opera: /^Opera\//i.test(userAgent) || /\x20OPR\//i.test(userAgent), /* Opera <= 12 || Opera >= 15 */
      safari: /safari/i.test(userAgent) && /apple computer/i.test(vendor),
      yandex: /(yabrowser)\/([\w\.]+)/i.test(userAgent),
      iphone: isIphone,
      ipad: isIpad,
      ipod: isIpod,
      ios: isIphone || isIpad || isIpod,
      android: isAndroid,
      androidPhone: isAndroidPhone,
      androidTablet: isAndroidTablet,
      blackberry: isBlackberry,
      linux: /linux/i.test(appVersion),
      mac: !(isIphone || isIpad || isIpod) && /mac/i.test(appVersion),
      windows: isWindows,
      windowsPhone: isWindowsPhone,
      windowsTablet: isWindowsTablet,
      mobile: isMobile,
      tablet: isTablet,
      desktop: !isMobile && !isTablet,
      online: function online() {
        return navigator.onLine;
      },
      offline: function offline() {
        return !navigator.onLine;
      },
      touchDevice: 'ontouchstart' in window || 'DocumentTouch' in window && document instanceof window.DocumentTouch
    }
  };

  /* EXPORT */

  Svelto.Browser = Browser;
})(Svelto.$, Svelto._, Svelto);

/* =========================================================================
 * Svelto - jQuery (Extras)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../browser/browser.js
 * ========================================================================= */

//TODO: Write it better

(function ($, _, Svelto, Browser, Pointer) {

  'use strict';

  /* ITERATOR */

  $.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

  /* HELPERS */

  $.eventXY = function (event) {
    var X = arguments.length <= 1 || arguments[1] === undefined ? 'pageX' : arguments[1];
    var Y = arguments.length <= 2 || arguments[2] === undefined ? 'pageY' : arguments[2];

    if ('originalEvent' in event) {

      return $.eventXY(event.originalEvent);
    } else if ('changedTouches' in event && event.changedTouches.length) {

      return {
        X: event.changedTouches[0][X],
        Y: event.changedTouches[0][Y]
      };
    } else if ('touches' in event && event.touches.length) {

      return {
        X: event.touches[0][X],
        Y: event.touches[0][Y]
      };
    } else if (X in event) {

      return {
        X: event[X],
        Y: event[Y]
      };
    }
  };

  $.frame = function (callback) {

    return requestAnimationFrame(callback);
  };

  $.hasCtrlOrCmd = function (event) {

    return !Browser.is.mac && event.ctrlKey || Browser.is.mac && event.metaKey;
  };

  $.getRect = function (node) {

    return node.getBoundingClientRect();
  };

  $.fn.getRect = function () {

    return this.length ? this[0].getBoundingClientRect() : undefined;
  };

  $.fn.hsl = function (h, s, l) {

    // It only works for setting
    //FIXME: I'm not sure if this plugin should exists

    return this.css('background-color', 'hsl(' + h + ',' + s + '%,' + l + '%)');
  };

  $.fn.toggleScroll = function (force) {

    //TODO: Preserve the scrollbars if possible, when disabling

    return this.toggleClass('overflow-hidden', !force);
  };

  $.fn.disableScroll = function () {

    return this.toggleScroll(false);
  };

  $.fn.enableScroll = function () {

    return this.toggleScroll(true);
  };

  $.fn.disableSelection = function () {
    // Taken from jQuery UI

    var event = 'onselectstart' in document.createElement('div') ? 'selectstart' : Pointer.down;

    return function () {

      return this.on(event + '.svelto-disable-selection', function (event) {
        return event.preventDefault();
      });
    };
  }();

  $.fn.enableSelection = function () {
    // Taken from jQuery UI

    return this.off('.svelto-disable-selection');
  };

  $.fn.zIndex = function (val) {
    // Taken from jQuery UI

    if (!_.isUndefined(val)) {

      return this.css('zIndex', val);
    }

    if (!this.length) return 0;

    var $elem = this.eq(0),
        position = undefined,
        value = undefined;

    while ($elem.length && $elem[0] !== document) {

      // Ignore z-index if position is set to a value where z-index is ignored by the browser
      // This makes behavior of this function consistent across browsers
      // WebKit always returns auto if the element is positioned

      position = $elem.css('position');

      if (['absolute', 'relative', 'fixed'].includes(position)) {

        // IE returns 0 when zIndex is not specified
        // other browsers return a string
        // we ignore the case of nested elements with an explicit value of 0
        // <div style="z-index: -10;"><div style="z-index: 0;"></div></div>

        value = parseInt($elem.css('zIndex'), 10);

        if (!_.isNaN(value) && value !== 0) {

          return value;
        }
      }

      $elem = $elem.parent();
    }

    return 0;
  };

  $.fn.topIndex = function () {
    //TODO: [MAYBE] Rename it

    var topIndex = 1000000000;

    return function () {

      return this.zIndex(++topIndex);
    };
  };

  //TODO: Not working but probably needed, like for scrolling down a chat
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

  $.fn.scrollParent = function (includeHidden) {
    // Take from jQuery UI, optimized for performance

    var position = this.css('position');

    if (position === 'fixed') return $(document);

    var excludeStaticParent = position === 'absolute',
        overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.parents()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var parent = _step.value;

        var $parent = $(parent);

        if (excludeStaticParent && $parent.css('position') === 'static') continue;

        if (overflowRegex.test($parent.css('overflow') + $parent.css('overflow-y') + $parent.css('overflow-x'))) {

          return $parent;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return $(document);
  };
})(Svelto.$, Svelto._, Svelto, Svelto.Browser, Svelto.Pointer);

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

(function ($, _, Svelto) {

  'use strict';

  /* TMPL */

  var tmpl = function tmpl(str, data) {

    var f = !/[^\w\-\.:]/.test(str) ? tmpl.cache[str] = tmpl.cache[str] || tmpl(document.getElementById(str).innerHTML) : new Function(tmpl.arg + ',tmpl', "var _e=_.escape" + tmpl.helper + ",_s='" + str.replace(tmpl.regexp, tmpl.func) + "';return _s;");

    return data ? f(data, tmpl) : function (data) {
      return f(data, tmpl);
    };
  };

  tmpl.cache = {}; // Store the cached templates
  tmpl.cached = {}; // Store pairs like: `noty: true`, so that we know that we already cached `noty`'s templates

  tmpl.regexp = /([\s'\\])(?!(?:[^{]|\{(?!%))*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(\{%)|(%\})/g;

  tmpl.func = function (s, p1, p2, p3, p4, p5) {

    if (p1) {
      // whitespace, quote and backspace in HTML context

      return {
        '\n': '\\n',
        '\r': '\\r',
        '\t': '\\t',
        ' ': ' '
      }[p1] || '\\' + p1;
    }

    if (p2) {
      // interpolation: {%=prop%}, or unescaped: {%#prop%}

      if (p2 === '=') {

        return "'+_e(" + p3 + ")+'";
      }

      return "'+(" + p3 + "==null?'':" + p3 + ")+'";
    }

    if (p4) {
      // evaluation start tag: {%

      return "';";
    }

    if (p5) {
      // evaluation end tag: %}

      return "_s+='";
    }
  };

  tmpl.arg = 'o';

  tmpl.helper = ",print=function(s,e){_s+=e?(s==null?'':s):_e(s);},include=function(s,d){_s+=tmpl(s,d);}";

  /* UTILITY */

  $.tmpl = tmpl;
})(Svelto.$, Svelto._, Svelto);

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

(function ($, _, Svelto, Browser) {

  'use strict';

  /* POINTER */

  var Pointer = {
    options: {
      events: {
        prefix: 'spointer'
      },
      dbltap: {
        interval: 300 // 2 taps within this interval will trigger a dbltap event
      }
    }
  };

  /* EVENTS */

  var events = {
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

  var _loop = function _loop(name) {

    if (events.hasOwnProperty(name)) {

      Pointer[name] = events[name];

      if (!(name in $.fn)) {

        $.fn[name] = function (fn) {

          return fn ? this.on(Pointer[name], fn) : this.trigger(Pointer[name]);
        };
      }
    }
  };

  for (var name in events) {
    _loop(name);
  }

  /* ----- POINTER LOGIC ----- */

  /* VARIABLES */

  var target = undefined,
      $target = undefined,
      prevTapTimestamp = 0,
      motion = undefined;

  /* EVENT CREATOR */

  function createEvent(name, originalEvent) {

    var event = $.Event(name);

    event.originalEvent = originalEvent;

    return event;
  }

  /* HANDLERS */

  function downHandler(event) {

    target = event.target;
    $target = $(target);

    motion = false;

    $target.one(Pointer.move, moveHandler);
    $target.one(Pointer.up, upHandler);
    $target.one(Pointer.cancel, cancelHandler);
  }

  function moveHandler() {

    motion = true;
  }

  function upHandler(event) {

    if (!Browser.is.touchDevice || !motion) {

      var tapTimestamp = event.timeStamp || Date.now();

      $target.trigger(createEvent(Pointer.tap, event));

      if (tapTimestamp - prevTapTimestamp <= Pointer.options.dbltap.interval) {

        $target.trigger(createEvent(Pointer.dbltap, event));
      }

      prevTapTimestamp = tapTimestamp;
    }

    if (!motion) {

      $target.off(Pointer.move, moveHandler);
    }

    $target.off(Pointer.cancel, cancelHandler);
  }

  function cancelHandler() {

    if (!motion) {

      $target.off(Pointer.move, moveHandler);
    }

    $target.off(Pointer.up, upHandler);
  }

  /* BIND */

  $(document).on(Pointer.down, downHandler);

  /* EXPORT */

  Svelto.Pointer = Pointer;
})(Svelto.$, Svelto._, Svelto, Svelto.Browser);

/* =========================================================================
 * Svelto - Widgetize
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function ($, _, Svelto) {

  'use strict';

  /* WIDGETIZE */

  var Widgetize = function () {
    function Widgetize() {
      _classCallCheck(this, Widgetize);

      this.widgetizers = {};
    }

    _createClass(Widgetize, [{
      key: 'add',
      value: function add(selector, widgetizer, data) {

        if (!(selector in this.widgetizers)) {

          this.widgetizers[selector] = [];
        }

        this.widgetizers[selector].push([widgetizer, data]);
      }
    }, {
      key: 'get',
      value: function get() {

        return this.widgetizers;
      }
    }, {
      key: 'remove',
      value: function remove(selector, widgetizer) {

        if (selector in this.widgetizers) {

          for (var i = 0, l = this.widgetizers[selector].length; i < l; i++) {

            if (this.widgetizers[selector][i][0] === widgetizer) {

              this.widgetizers[selector].splice(i, 1);
            }
          }

          if (!this.widgetizers[selector].length) {

            delete this.widgetizers[selector];
          }
        }
      }
    }, {
      key: 'on',
      value: function on($roots) {

        for (var selector in this.widgetizers) {

          if (this.widgetizers.hasOwnProperty(selector)) {

            var widgetizers = this.widgetizers[selector];

            this.worker(widgetizers, $roots.filter(selector));
            this.worker(widgetizers, $roots.find(selector));
          }
        }
      }
    }, {
      key: 'worker',
      value: function worker(widgetizers, $widgets) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {

          for (var _iterator2 = $widgets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var widget = _step2.value;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {

              for (var _iterator3 = widgetizers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var _step3$value = _slicedToArray(_step3.value, 2);

                var widgetizer = _step3$value[0];
                var data = _step3$value[1];

                widgetizer($(widget), data);
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }]);

    return Widgetize;
  }();

  /* EXPORT */

  Svelto.Widgetize = new Widgetize();

  /* JQUERY PLUGIN */

  $.fn.widgetize = function () {

    Svelto.Widgetize.on(this);

    return this;
  };

  /* READY */

  $(function () {

    $(document.body).widgetize();
  });
})(Svelto.$, Svelto._, Svelto);

/* =========================================================================
 * Svelto - Factory
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../widgetize/widgetize.js
 *=========================================================================*/

(function ($, _, Svelto, Widgetize) {

  'use strict';

  /* FACTORY */

  var Factory = {

    /* VARIABLES */

    initializers: ['configure', 'namespace', 'ready', 'widgetize', 'plugin'], // `Factory` methods, in order, to call when initing a `Widget`

    /* METHODS */

    init: function init(Widget, config, namespace) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {

        for (var _iterator4 = this.initializers[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var initializer = _step4.value;

          this[initializer](Widget, config, namespace);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    },
    instance: function instance(Widget, options, element) {

      var name = Widget.config.name;

      return $.data(element, 'instance.' + name) || new Widget(options, element);
    },
    widgetizer: function widgetizer($widget, name) {

      $widget[name]();
    },

    /* WORKERS */

    configure: function configure(Widget) {
      var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      Widget.config = config;
    },
    namespace: function namespace(Widget, config, _namespace) {

      if (_.isObject(_namespace)) {

        var name = _.capitalize(Widget.config.name);

        _namespace[name] = Widget;
      }
    },
    ready: function ready(Widget) {

      $(Widget.ready);
    },
    widgetize: function widgetize(Widget) {

      if (Widget.config.plugin && _.isString(Widget.config.selector)) {

        Widgetize.add(Widget.config.selector, this.widgetizer, Widget.config.name);
      }
    },
    plugin: function plugin(Widget) {

      if (!Widget.config.plugin) return;

      /* NAME */

      var name = Widget.config.name;

      /* JQUERY PLUGIN */

      $.fn[name] = function (options) {

        var isMethodCall = _.isString(options) && options.charAt(0) !== '_'; // Methods starting with '_' are private

        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = this[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var element = _step5.value;

            var instance = Factory.instance(Widget, options, element);

            if (isMethodCall && _.isFunction(instance[options])) {

              var returnValue = instance[options].apply(instance, args);

              if (!_.isUndefined(returnValue)) {

                return returnValue;
              }
            }
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }

        return this;
      };
    }
  };

  /* EXPORT */

  Svelto.Factory = Factory;
})(Svelto.$, Svelto._, Svelto, Svelto.Widgetize);

/* =========================================================================
 * Svelto - Breakpoint
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * @requires breakpoints.js
 * ========================================================================= */

(function ($, _, Svelto, Breakpoints) {

  'use strict';

  /* VARIABLES */

  var $window = $(window);

  /* BREAKPOINT */

  var Breakpoint = {

    /* VARIABLES */

    throttle: 150, // The amount of milliseconds used to throttle the `$window.on ( 'resize' )` handler
    previous: undefined, // Previous breakpoint
    current: undefined, // Current breakpoint

    /* RESIZE */

    __resize: function __resize() {

      var current = this.get();

      if (current !== this.current) {

        this.previous = this.current;
        this.current = current;

        $window.trigger('breakpoint:change');
      }
    },

    /* API */

    get: function get() {

      var intervals = _.sortBy(_.values(Breakpoints)),
          width = $window.width();

      var _loop2 = function _loop2(i, l) {

        if (width >= intervals[i] && (i === l - 1 || width < intervals[i + 1])) {

          return {
            v: _.findKey(Breakpoints, function (interval) {
              return interval === intervals[i];
            })
          };
        }
      };

      for (var i = 0, l = intervals.length; i < l; i++) {
        var _ret2 = _loop2(i, l);

        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
      }
    }
  };

  /* READY */

  $(function () {

    Breakpoint.current = Breakpoint.get();

    $window.on('resize', _.throttle(Breakpoint.__resize.bind(Breakpoint), Breakpoint.throttle));
  });

  /* EXPORT */

  Svelto.Breakpoint = Breakpoint;
})(Svelto.$, Svelto._, Svelto, Svelto.Breakpoints);

/* =========================================================================
 * Svelto - Keyboard
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function ($, _, Svelto) {

  'use strict';

  /* KEYBOARD */

  var Keyboard = {
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
      match: function match(event, keystroke) {

        // It only supports ctrl/cmd/meta/alt/shift/char/Keyboard.keys[charName] //FIXME
        // ctrl/cmd/meta are treated as the same key, they are intended as `ctrl` if we are not using a Mac, or as `cmd` if we are instead using it

        var specialKeys = ['ctrl', 'cmd', 'meta', 'alt', 'shift'],
            keys = keystroke.split('+').map(function (key) {
          return key.trim().toLowerCase();
        });

        if ((keys.includes('ctrl') || keys.includes('cmd') || keys.includes('meta')) !== $.hasCtrlOrCmd(event)) return false;
        if (keys.includes('alt') !== event.altKey) return false;
        if (keys.includes('shift') !== event.shiftKey) return false;

        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = keys[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var key = _step6.value;

            if (!specialKeys.includes(key)) {

              if (!(event.keyCode === Keyboard.keys[key.toUpperCase()] || String.fromCharCode(event.keyCode).toLowerCase() === key)) return false;
            }
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }

        return true;
      }
    }
  };

  /* EXPORT */

  Svelto.Keyboard = Keyboard;
})(Svelto.$, Svelto._, Svelto);

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

(function ($, _, Svelto, Widgets, Factory, Pointer, Keyboard, Breakpoints, Breakpoint) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'widget', // The name of widget, it will be used for the the jQuery pluing `$.fn[name]` and for triggering widget events `name + ':' + event`
    plugin: false, // A boolean that defines wheter the Widget is also a jQuery plugin or not
    selector: false, // The selector used to select the website in the DOM, used for `Svelto.Widgetize`
    templates: {
      base: false // It will be used as the constructor if no element is provided
    },
    options: {
      characters: {}, // Used to store some characters needed by the widget
      regexes: {}, // Contains the used regexes
      errors: {}, // It contains all the errors that a widget can trigger
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
      keystrokes: {}, // Easy way to automatically bind keystrokes to specific methods calls. For example: `{ 'ctrl + o': 'open', Keyaboard.keys.UP: 'up' }`
      callbacks: {} // Callbacks to trigger on specific events
    }
  };

  /* WIDGET */

  var Widget = function () {

    /* CONSTRUCTION */

    function Widget(options, element) {
      _classCallCheck(this, Widget);

      /* ATTACH CONFIG */

      _.extend(this, this._getConfig(options, element));

      /* CACHE TEMPLATES */

      if (!$.tmpl.cached[this.name]) {

        for (var tmpl in this.templates) {

          if (this.templates.hasOwnProperty(tmpl) && this.templates[tmpl]) {

            var tmplName = this.name + '.' + tmpl;

            if (!(tmplName in $.tmpl.cache)) {

              $.tmpl.cache[tmplName] = $.tmpl(this.templates[tmpl]);
            }
          }
        }

        $.tmpl.cached[this.name] = true;
      }

      /* ELEMENT */

      this.$element = $(element || (this.templates.base ? this._tmpl('base', this.options) : undefined));
      this.element = this.$element[0];

      /* LAYOUT */

      this.$layout = this.$element.length ? this.$element.parent().closest(this.options.selectors.layout) : $(this.options.selectors.layout).first();
      this.$layout = this.$layout.length ? this.$layout : $(this.options.selectors.layout).first();
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

      if (this.element) {

        $.data(this.element, 'instance.' + this.name, this);
      }

      /* SET GUID / GUC */

      this.guid = $.guid++;
      this.guc = this.name + this.guid;

      /* EVENT NAMESPACE */

      this.eventNamespace = '.swns' + this.guid;

      /* CALLBACKS */

      this._variables();
      this._init();
      this._events();

      /* BREAKPOINT */

      this.___breakpoint(); // It must be inited before calling `__breakpoint`, since that when `__breakpoint` gets called it may want to reset it (not inited yet) and init it again (with a result of double binding)
      this.__breakpoint();
    }

    _createClass(Widget, [{
      key: '_getConfig',
      value: function _getConfig(options, element) {

        /* VARIABLES */

        var configs = [];

        /* PROTOTYPE CHAIN */

        var prototype = Object.getPrototypeOf(this);

        while (prototype) {

          if (prototype.constructor.config) {

            configs.push(prototype.constructor.config);
          }

          prototype = Object.getPrototypeOf(prototype);
        }

        configs.push({}); // So that we merge them to a new object

        configs.reverse();

        /* DATA OPTIONS */

        if (element) {

          var $element = $(element),
              name = _.last(configs).name.toLowerCase(),
              dataOptions = $element.data('options'),
              dataNameOptions = $element.data(name + '-options');

          if (dataOptions) {

            configs.push({ options: dataOptions });
          }

          if (dataNameOptions) {

            configs.push({ options: dataNameOptions });
          }
        }

        /* OPTIONS */

        if (_.isPlainObject(options)) {

          configs.push({ options: options });
        }

        /* CREATE OPTIONS */

        var createOptions = this._createOptions();

        if (_.isPlainObject(createOptions)) {

          configs.push({ options: createOptions });
        }

        /* RETURN */

        return _.merge.apply(_, configs);
      }
    }, {
      key: '_createOptions',
      value: function _createOptions() {} // Used to pass extra options

      /* DESTRUCTION */

    }, {
      key: 'destroy',
      value: function destroy() {

        this._reset();

        this._destroy();

        if (this.element) {

          this.$element.removeData('instance.' + this.name);
        }
      }
    }, {
      key: '_destroy',
      value: function _destroy() {} // Clean the stuff, remove possible memory leaks

      /* SPECIAL */

    }, {
      key: '_variables',
      // Called when the DOM is `ready`, perhaps the widget needs to perform some operations, like `Noty` do for instance

      value: function _variables() {} // Init your variables inside this function

    }, {
      key: '_init',
      value: function _init() {} // Perform the init stuff inside this function

    }, {
      key: '_events',
      value: function _events() {} // Bind the event handlers inside this function

    }, {
      key: '_reset',
      value: function _reset() {
        //TODO: Maybe remove or rename it, I don't like it but I currently need its functionality

        this.$bindings.off(this.eventNamespace);
      }

      /* WIDGET */

    }, {
      key: 'widget',
      value: function widget() {

        return this.$element;
      }

      /* INSTANCE */

    }, {
      key: 'instance',
      value: function instance() {

        return this;
      }

      /* OPTIONS */

      // We cannot have a `options` alias to `option`, since `options` is already defined in the config

    }, {
      key: 'option',
      value: function option(key, value) {

        if (!key) {

          return _.cloneDeep(this.options);
        } else if (_.isString(key)) {

          if (_.isUndefined(value)) {

            return _.cloneDeep(_.get(this.options, key));
          } else {

            this._setOption(key, value);
          }
        } else if (_.isPlainObject(key)) {

          for (var prop in key) {

            if (key.hasOwnProperty(prop)) {

              this._setOption(key, value);
            }
          }
        }
      }
    }, {
      key: '_setOption',
      value: function _setOption(key, value) {

        _.set(this.options, key, value);
      }

      /* ENABLED */

    }, {
      key: 'enable',
      value: function enable() {

        this.$element.removeClass(this.options.classes.disabled);
      }
    }, {
      key: 'isEnabled',
      value: function isEnabled() {

        return !this.isDisabled();
      }

      /* DISABLED */

    }, {
      key: 'disable',
      value: function disable() {

        this.$element.addClass(this.options.classes.disabled);
      }
    }, {
      key: 'isDisabled',
      value: function isDisabled() {

        return this.$element.hasClass(this.options.classes.disabled);
      }

      /* EVENTS */

    }, {
      key: '_on',
      value: function _on(suppressDisabledCheck, $element, events, selector, handler, _onlyOne) {
        var _this = this;

        //TODO: Add support for custom data

        /* NORMALIZATION */

        if (!_.isBoolean(suppressDisabledCheck)) {

          _onlyOne = handler;
          handler = selector;
          selector = events;
          events = $element;
          $element = suppressDisabledCheck;
          suppressDisabledCheck = false;
        }

        if (!($element instanceof $)) {

          _onlyOne = handler;
          handler = selector;
          selector = events;
          events = $element;
          $element = this.$element;
        }

        if (!_.isString(selector)) {

          _onlyOne = handler;
          handler = selector;
          selector = false;
        }

        /* BINDINGS */

        this.$bindings = this.$bindings.add($element);

        /* PROXY */

        var handlerProxy = function handlerProxy() {
          for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          if (!suppressDisabledCheck && _this.$element.hasClass(_this.options.classes.disabled)) return; //FIXME: Is keeping a reference to `suppressDisabledCheck` wasted leak? Even if so tiny

          return handler.apply(_this, args);
        };

        /* PROXY GUID */

        handlerProxy.guid = handler.guid = handler.guid || $.guid++;

        /* EVENTS NAMESPACING */

        events = events.split(/\s+/).map(function (event) {
          return event + _this.eventNamespace;
        }).join(' ');

        /* TRIGGERING */

        $element[_onlyOne ? 'one' : 'on'](events, selector, handlerProxy);
      }
    }, {
      key: '_one',
      value: function _one() {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        return this._on.apply(this, args.concat([true]));
      }
    }, {
      key: '_onHover',
      value: function _onHover($element, args) {
        var _this2 = this;

        //FIXME: If we remove the target we are still attaching and removing those events though (just performing the functions calls actually, probably)

        /* NORMALIZATION */

        if (!args) {

          args = $element;
          $element = this.$element;
        }

        /* BINDINGS */

        this.$bindings = this.$bindings.add($element);

        /* BINDING */

        this._on($element, Pointer.enter, function () {
          return _this2._on.apply(_this2, _toConsumableArray(args));
        });
        this._on($element, Pointer.leave, function () {
          return _this2._off.apply(_this2, _toConsumableArray(args));
        });
      }

      //TODO: Add a _offHover (Is it needed?)

    }, {
      key: '_off',
      value: function _off($element, events, handler) {
        var _this3 = this;

        /* NORMALIZATION */

        if (!handler && !($element instanceof $)) {

          handler = events;
          events = $element;
          $element = this.$element;
        }

        /* EVENTS NAMESPACING */

        events = events.split(/\s+/).map(function (event) {
          return event + _this3.eventNamespace;
        }).join(' ');

        /* REMOVING HANDLER */

        $element.off(events, handler);
      }
    }, {
      key: '_trigger',
      value: function _trigger(type, event, data) {

        /* NORMALIZATION */

        if (!data) {

          if (event instanceof $.Event) {

            data = {};
          } else {

            data = event || {};
            event = undefined;
          }
        }

        /* EVENT */

        event = $.Event(event);
        event.type = (this.name + ':' + type).toLowerCase();
        event.target = this.element;

        var originalEvent = event.originalEvent;

        if (originalEvent) {

          for (var prop in originalEvent) {

            if (originalEvent.hasOwnProperty(prop)) {

              if (!(prop in event)) {

                event[prop] = originalEvent[prop];
              }
            }
          }
        }

        /* TRIGGERING */

        this.$element.trigger(event, data);

        return !(this.options.callbacks[type].apply(this.element, [event].concat(data)) === false || event.isDefaultPrevented());
      }

      /* ROUTE */

    }, {
      key: '___route',
      value: function ___route() {

        this._on(true, this.$window, 'route', this.__route);
      }

      /* BREAKPOINT */

    }, {
      key: '___breakpoint',
      value: function ___breakpoint() {

        this._on(this.$window, 'breakpoint:change', this.__breakpoint);
      }
    }, {
      key: '__breakpoint',
      value: function __breakpoint() {

        var current = Breakpoints[Breakpoint.current];

        /* UP */

        for (var breakpoint in this.options.breakpoints.up) {

          if (this.options.breakpoints.up.hasOwnProperty(breakpoint)) {

            if (current >= Breakpoints[breakpoint]) {

              this[this.options.breakpoints.up[breakpoint]]();
            }
          }
        }

        /* DOWN */

        for (var breakpoint in this.options.breakpoints.down) {

          if (this.options.breakpoints.down.hasOwnProperty(breakpoint)) {

            if (current < Breakpoints[breakpoint]) {

              this[this.options.breakpoints.down[breakpoint]]();
            }
          }
        }

        /* RANGE */

        for (var breakpoint in this.options.breakpoints.range) {

          if (this.options.breakpoints.range.hasOwnProperty(breakpoint)) {

            if (current === Breakpoints[breakpoint]) {

              this[this.options.breakpoints.range[breakpoint]]();
            }
          }
        }
      }

      /* KEYDOWN */

    }, {
      key: '___keydown',
      value: function ___keydown() {

        this._on(this.$document, 'keydown', this.__keydown);
      }
    }, {
      key: '__keydown',
      value: function __keydown(event) {

        if (!this.options.keyboard) return;

        for (var keystrokes in this.options.keystrokes) {

          if (this.options.keystrokes.hasOwnProperty(keystrokes)) {
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {

              for (var _iterator7 = keystrokes.split(',')[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                var keystroke = _step7.value;

                if (Keyboard.keystroke.match(event, keystroke)) {

                  this[this.options.keystrokes[keystrokes]]();

                  event.preventDefault();
                  event.stopImmediatePropagation();

                  return;
                }
              }
            } catch (err) {
              _didIteratorError7 = true;
              _iteratorError7 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion7 && _iterator7.return) {
                  _iterator7.return();
                }
              } finally {
                if (_didIteratorError7) {
                  throw _iteratorError7;
                }
              }
            }
          }
        }
      }

      /* DELAYING */

    }, {
      key: '_delay',
      value: function _delay(fn, delay) {
        var _this4 = this;

        return setTimeout(function () {
          return fn.apply(_this4);
        }, delay || 0);
      }

      /* DEFER */

    }, {
      key: '_defer',
      value: function _defer(fn) {

        return this._delay(fn);
      }

      /* FRAME */

    }, {
      key: '_frame',
      value: function _frame(fn) {

        return requestAnimationFrame(fn.bind(this));
      }

      /* THROW */

    }, {
      key: '_throw',
      value: function _throw(msg) {

        throw new Error(msg);
      }

      /* THROTTLING */

    }, {
      key: '_throttle',
      value: function _throttle(fn, wait, options) {

        var throttled = _.throttle(fn, wait, options);

        throttled.guid = fn.guid = fn.guid || $.guid++;

        return throttled;
      }

      /* DEBOUNCING */

    }, {
      key: '_debounce',
      value: function _debounce(fn, wait, options) {

        var debounced = _.debounce(fn, wait, options);

        debounced.guid = fn.guid = fn.guid || $.guid++;

        return debounced;
      }

      /* TEMPLATE */

    }, {
      key: '_tmpl',
      value: function _tmpl(name) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var tmplName = this.name + '.' + name;

        return $.tmpl(tmplName, options);
      }

      /* INSERTION */

    }, {
      key: 'before',
      value: function before() {
        var _$element;

        (_$element = this.$element).before.apply(_$element, arguments);
      }
    }, {
      key: 'insertBefore',
      value: function insertBefore(target) {

        this.$element.insertBefore(target);
      }
    }, {
      key: 'after',
      value: function after() {
        var _$element2;

        (_$element2 = this.$element).after.apply(_$element2, arguments);
      }
    }, {
      key: 'insertAfter',
      value: function insertAfter(target) {

        this.$element.insertAfter(target);
      }
    }, {
      key: 'prependTo',
      value: function prependTo(target) {

        this.$element.prependTo(target);
      }
    }, {
      key: 'appendTo',
      value: function appendTo(target) {

        this.$element.appendTo(target);
      }
    }], [{
      key: 'ready',
      value: function ready() {}
    }]);

    return Widget;
  }();

  /* FACTORY */

  Factory.init(Widget, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Keyboard, Svelto.Breakpoints, Svelto.Breakpoint);

/* =========================================================================
 * Svelto - Expander
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * @requires ../animations/animations.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory, Animations) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var Expander = function (_Widgets$Widget) {
    _inherits(Expander, _Widgets$Widget);

    function Expander() {
      _classCallCheck(this, Expander);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Expander).apply(this, arguments));
    }

    _createClass(Expander, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$expander = this.$element;
        this.$content = this.$expander.find(this.options.selectors.content);

        this._isOpen = this.$expander.hasClass(this.options.classes.open);
      }

      /* API */

    }, {
      key: 'isOpen',
      value: function isOpen() {

        return this._isOpen;
      }
    }, {
      key: 'toggle',
      value: function toggle() {
        var force = arguments.length <= 0 || arguments[0] === undefined ? !this._isOpen : arguments[0];

        if (!!force !== this._isOpen) {

          this._isOpen = !!force;

          this.$expander.toggleClass(this.options.classes.open, this._isOpen);

          this._trigger(this._isOpen ? 'open' : 'close');
        }
      }
    }, {
      key: 'open',
      value: function open() {

        this.toggle(true);
      }
    }, {
      key: 'close',
      value: function close() {

        this.toggle(false);
      }
    }]);

    return Expander;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Expander, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Animations);

/* =========================================================================
 * Svelto - Accordion
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../expander/expander.js
 * ========================================================================= */

//TODO: Add better support for changing `options.multiple` at runtime. `multiple: true` -> opening multiple, -> `multiple: false` -> multiple still opened

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var Accordion = function (_Widgets$Widget2) {
    _inherits(Accordion, _Widgets$Widget2);

    function Accordion() {
      _classCallCheck(this, Accordion);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Accordion).apply(this, arguments));
    }

    _createClass(Accordion, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$accordion = this.$element;
        this.$expanders = this.$accordion.children(this.options.selectors.expander);

        this.instances = this.$expanders.get().map(function (expander) {
          return $(expander).expander('instance');
        });
      }
    }, {
      key: '_events',
      value: function _events() {

        this.___open();
        this.___close();
      }

      /* EXPANDER OPEN */

    }, {
      key: '___open',
      value: function ___open() {

        this._on(true, this.$expanders, 'expander:open', this.__open);
      }
    }, {
      key: '__open',
      value: function __open(event) {

        this._trigger('open', { index: this.$expanders.index(event.target) });

        this.__multiple(event.target);
      }

      /* EXPANDER CLOSE */

    }, {
      key: '___close',
      value: function ___close() {

        this._on(true, this.$expanders, 'expander:close', this.__close);
      }
    }, {
      key: '__close',
      value: function __close(event) {

        this._trigger('close', { index: this.$expanders.index(event.target) });
      }

      /* MULTIPLE */

    }, {
      key: '__multiple',
      value: function __multiple(expander) {

        if (this.options.multiple) return;

        this.instances.forEach(function (instance) {
          return instance.element !== expander ? instance.close() : false;
        });
      }

      /* API OVERRIDES */

    }, {
      key: 'enable',
      value: function enable() {

        _get(Object.getPrototypeOf(Accordion.prototype), 'enable', this).call(this);

        _.invoke(this.instances, 'enable');
      }
    }, {
      key: 'disable',
      value: function disable() {

        _.invoke(this.instances, 'disable');
      }

      /* API */

    }, {
      key: 'isOpen',
      value: function isOpen(index) {

        return this.instances[index].isOpen();
      }
    }, {
      key: 'toggle',
      value: function toggle(index, force) {

        this.instances[index].toggle(force);
      }
    }, {
      key: 'open',
      value: function open(index) {

        this.toggle(index, true);
      }
    }, {
      key: 'close',
      value: function close(index) {

        this.toggle(index, false);
      }
    }]);

    return Accordion;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Accordion, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Autogrow - Input
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../../widget/widget.js
 * ========================================================================= */

// It supports only `box-sizing: border-box` inputs

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var AutogrowInput = function (_Widgets$Widget3) {
    _inherits(AutogrowInput, _Widgets$Widget3);

    function AutogrowInput() {
      _classCallCheck(this, AutogrowInput);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(AutogrowInput).apply(this, arguments));
    }

    _createClass(AutogrowInput, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$input = this.$element;

        this.ctx = document.createElement('canvas').getContext('2d');
      }
    }, {
      key: '_init',
      value: function _init() {

        this._update();
      }
    }, {
      key: '_events',
      value: function _events() {

        this.___inputChange();
      }

      /* PRIVATE */

    }, {
      key: '_getNeededWidth',
      value: function _getNeededWidth() {

        this.ctx.font = this.$input.css('font');

        return this.ctx.measureText(this.$input.val()).width;
      }

      /* INPUT / CHANGE */

    }, {
      key: '___inputChange',
      value: function ___inputChange() {

        this._on(true, 'input change', this._update);
      }

      /* UPDATE */

    }, {
      key: '_update',
      value: function _update() {

        var width = this._getNeededWidth();

        if (width === this._prevWidth) return;

        this._prevWidth = width;

        this.$input.width(width);

        this._trigger('change');
      }
    }]);

    return AutogrowInput;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(AutogrowInput, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

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

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var AutogrowTextarea = function (_Widgets$Widget4) {
    _inherits(AutogrowTextarea, _Widgets$Widget4);

    function AutogrowTextarea() {
      _classCallCheck(this, AutogrowTextarea);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(AutogrowTextarea).apply(this, arguments));
    }

    _createClass(AutogrowTextarea, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$textarea = this.$element;

        this.$tempTextarea = $('<textarea>').css({
          'position': 'fixed',
          'visibility': 'hidden',
          'padding': 0,
          'min-height': 0,
          'height': 0
        });
      }
    }, {
      key: '_init',
      value: function _init() {

        this._update();
      }
    }, {
      key: '_events',
      value: function _events() {

        this.___inputChange();
      }

      /* PRIVATE */

    }, {
      key: '_getNeededHeight',
      value: function _getNeededHeight() {

        this.$tempTextarea.css('font', this.$textarea.css('font')).val(this.$textarea.val()).appendTo(this.$layout);

        var height = this.$tempTextarea[0].scrollHeight;

        this.$tempTextarea.detach();

        return height;
      }

      /* INPUT / CHANGE */

    }, {
      key: '___inputChange',
      value: function ___inputChange() {

        this._on(true, 'input change', this._update);
      }

      /* UPDATE */

    }, {
      key: '_update',
      value: function _update() {

        var height = this._getNeededHeight();

        if (height === this._prevHeight) return;

        this.$textarea.height(height);

        this._prevHeight = height;

        this._trigger('change');
      }
    }]);

    return AutogrowTextarea;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(AutogrowTextarea, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Blurred
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

//TODO: Maybe rename it

(function ($, _, Svelto) {

  'use strict';

  /* BLURRED */

  $.fn.blurred = function (force) {

    return this.toggleClass('blurred', force);
  };
})(Svelto.$, Svelto._, Svelto);

/* =========================================================================
 * Svelto - Boilerplate
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var Boilerplate = function (_Widgets$Widget5) {
    _inherits(Boilerplate, _Widgets$Widget5);

    function Boilerplate() {
      _classCallCheck(this, Boilerplate);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Boilerplate).apply(this, arguments));
    }

    _createClass(Boilerplate, [{
      key: '_variables',
      value: function _variables() {}
    }, {
      key: '_init',
      value: function _init() {}
    }, {
      key: '_events',
      value: function _events() {}
    }, {
      key: '_destroy',
      value: function _destroy() {}

      /* PRIVATE */

      /* API */

    }], [{
      key: 'widgetize',

      /* SPECIAL */

      value: function widgetize() {}
    }]);

    return Boilerplate;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Boilerplate, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - BT (BinaryTree) Each
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

(function ($, _, Svelto) {

  'use strict';

  /* BINARY TREE .each () */

  $.fn.btEach = function (callback, startIndex) {

    return _.btEach(this, callback, startIndex);
  };
})(Svelto.$, Svelto._, Svelto);

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

(function ($, _, Svelto) {

  'use strict';

  /* TIMER */

  var Timer = function () {
    function Timer() {
      _classCallCheck(this, Timer);

      this.set.apply(this, arguments);
    }

    _createClass(Timer, [{
      key: 'set',
      value: function set(callback, time, autostart) {

        this.init = true;
        this.action = callback;

        if (!isNaN(time)) {

          this.intervalTime = time;
        }

        if (autostart && !this.isActive) {

          this.isActive = true;
          this.setTimer();
        }

        return this;
      }
    }, {
      key: 'once',
      value: function once(time) {
        var _this10 = this;

        if (isNaN(time)) {

          time = 0;
        }

        setTimeout(function () {
          return _this10.action();
        }, time);

        return this;
      }
    }, {
      key: 'play',
      value: function play(reset) {

        if (!this.isActive) {

          if (reset) {

            this.setTimer();
          } else {

            this.setTimer(this.remainingTime);
          }

          this.isActive = true;
        }

        return this;
      }
    }, {
      key: 'pause',
      value: function pause() {

        if (this.isActive) {

          this.isActive = false;
          this.remainingTime -= Date.now() - this.last;
          this.clearTimer();
        }

        return this;
      }
    }, {
      key: 'stop',
      value: function stop() {

        this.isActive = false;
        this.remainingTime = this.intervalTime;
        this.clearTimer();

        return this;
      }
    }, {
      key: 'toggle',
      value: function toggle(reset) {

        if (this.isActive) {

          this.pause();
        } else if (reset) {

          this.play(true);
        } else {

          this.play();
        }

        return this;
      }
    }, {
      key: 'reset',
      value: function reset() {

        this.isActive = false;

        this.play(true);

        return this;
      }
    }, {
      key: 'clearTimer',
      value: function clearTimer() {

        clearTimeout(this.timeoutObject);
      }
    }, {
      key: 'setTimer',
      value: function setTimer(time) {
        var _this11 = this;

        if (isNaN(time)) {

          time = this.intervalTime;
        }

        this.remainingTime = time;
        this.last = Date.now();
        this.clearTimer();

        this.timeoutObject = setTimeout(function () {
          return _this11.go();
        }, time);
      }
    }, {
      key: 'go',
      value: function go() {

        if (this.isActive) {

          this.action();
          this.setTimer();
        }
      }
    }, {
      key: 'remaining',
      value: function remaining(value) {

        if (_.isUndefined(value)) {

          return this.remainingTime;
        }

        this.remainingTime = value;

        return this;
      }
    }]);

    return Timer;
  }();

  /* EXPORT */

  Svelto.Timer = Timer;
})(Svelto.$, Svelto._, Svelto);

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

(function ($, _, Svelto, Widgets, Factory, Pointer, Timer, Animations) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'carousel',
    plugin: true,
    selector: '.carousel',
    options: {
      startIndex: 0,
      wrap: true, // Wether we should connect the start with the end, so that when calling `previous` from the start we reach the end and vice versa
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
    }
  };

  /* CAROUSEL */

  var Carousel = function (_Widgets$Widget6) {
    _inherits(Carousel, _Widgets$Widget6);

    function Carousel() {
      _classCallCheck(this, Carousel);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Carousel).apply(this, arguments));
    }

    _createClass(Carousel, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$carousel = this.$element;
        this.$previous = this.$carousel.find(this.options.selectors.previous);
        this.$next = this.$carousel.find(this.options.selectors.next);
        this.$indicators = this.$carousel.find(this.options.selectors.indicator);
        this.$itemsWrp = this.$carousel.find(this.options.selectors.itemsWrp);
        this.$items = this.$carousel.find(this.options.selectors.item);

        this.maxIndex = this.$items.length - 1;

        this._previous = false;
        this._current = false;

        this.timer = new Timer(this.next.bind(this), this.options.interval, false);
      }
    }, {
      key: '_init',
      value: function _init() {

        var $current = this.$items.filter('.' + this.options.classes.current).first();

        if ($current.length) {

          this._current = this._getItemObj(this.$items.index($current));
        } else {

          this.set(this.options.startIndex);
        }
      }
    }, {
      key: '_events',
      value: function _events() {

        this.___previousTap();
        this.___nextTap();
        this.___indicatorTap();

        this.___keydown();
        this.___cycle();
      }
    }, {
      key: '_destroy',
      value: function _destroy() {

        this.timer.stop();
      }

      /* PRIVATE */

    }, {
      key: '_sanitizeIndex',
      value: function _sanitizeIndex(index) {

        index = Number(index);

        return _.isNaN(index) ? NaN : _.clamp(index, 0, this.maxIndex);
      }

      /* PREVIOUS TAP */

    }, {
      key: '___previousTap',
      value: function ___previousTap() {

        this._on(this.$previous, Pointer.tap, this.previous);
      }

      /* NEXT TAP */

    }, {
      key: '___nextTap',
      value: function ___nextTap() {

        this._on(this.$next, Pointer.tap, this.next);
      }

      /* INDICATOR TAP */

    }, {
      key: '___indicatorTap',
      value: function ___indicatorTap() {

        this._on(this.$indicators, Pointer.tap, this.__indicatorTap);
      }
    }, {
      key: '__indicatorTap',
      value: function __indicatorTap(event) {

        this.set(this.$indicators.index(event.currentTarget));
      }

      /* KEYDOWN */

    }, {
      key: '___keydown',
      value: function ___keydown() {

        this._onHover([this.$document, 'keydown', this.__keydown]);
      }

      /* CYCLE */

    }, {
      key: '___cycle',
      value: function ___cycle() {

        this._on(true, this.$itemsWrp, Pointer.enter, this.__cycleEnter);
        this._on(true, this.$itemsWrp, Pointer.leave, this.__cycleLeave);
      }
    }, {
      key: '__cycleEnter',
      value: function __cycleEnter() {

        if (this.options.cycle) {

          this.timer.pause();
        }
      }
    }, {
      key: '__cycleLeave',
      value: function __cycleLeave() {

        if (this.options.cycle) {

          this.timer.remaining(Math.max(this.options.intervalMinimumRemaining, this.timer.remaining()));

          this.timer.play();
        }
      }

      /* ITEM OBJ */

    }, {
      key: '_getItemObj',
      value: function _getItemObj(index) {

        return {
          index: index,
          $item: this.$items.eq(index),
          $indicator: this.$indicators.eq(index)
        };
      }

      /* INDEX */

    }, {
      key: '_getPrevIndex',
      value: function _getPrevIndex(index) {

        return index > 0 ? index - 1 : this.options.wrap ? this.maxIndex : 0;
      }
    }, {
      key: '_getNextIndex',
      value: function _getNextIndex(index) {

        return index < this.maxIndex ? index + 1 : this.options.wrap ? 0 : this.maxIndex;
      }

      /* UPDATE */

    }, {
      key: '_updatePreviousNext',
      value: function _updatePreviousNext() {

        this.$previous.toggleClass(this.options.classes.disabled, this._current.index === 0 && !this.options.wrap);
        this.$next.toggleClass(this.options.classes.disabled, this._current.index === this.maxIndex && !this.options.wrap);
      }

      /* API OVERRIDES */

    }, {
      key: 'enable',
      value: function enable() {

        _get(Object.getPrototypeOf(Carousel.prototype), 'enable', this).call(this);

        if (this.options.cycle || this._wasCycling) {

          this.play();
        }
      }
    }, {
      key: 'disable',
      value: function disable() {

        _get(Object.getPrototypeOf(Carousel.prototype), 'disable', this).call(this);

        this._wasCycling = this.options.cycle;

        if (this.options.cycle) {

          this.stop();
        }
      }

      /* API */

    }, {
      key: 'get',
      value: function get() {

        return this._current.index;
      }
    }, {
      key: 'set',
      value: function set(index) {

        index = this._sanitizeIndex(index);

        if (this._lock || _.isNaN(index) || this._current && index === this._current.index) return;

        this._lock = true;

        if (this._current) {

          this._current.$item.removeClass(this.options.classes.current).addClass(this.options.classes.previous);
          this._current.$indicator.removeClass(this.options.classes.current);

          this._previous = this._current;
        }

        this._current = this._getItemObj(index);
        this._current.$item.addClass(this.options.classes.current);
        this._current.$indicator.addClass(this.options.classes.current);

        this._updatePreviousNext();

        if (this.options.cycle) {

          this.timer.stop();
        }

        this._delay(function () {

          if (this._previous) {

            this._previous.$item.removeClass(this.options.classes.previous);
          }

          if (this.options.cycle) {

            this.timer.play();
          }

          this._lock = false;

          this._trigger('change');
        }, this.options.animations.cycle);
      }
    }, {
      key: 'previous',
      value: function previous() {

        this.set(this._getPrevIndex(this._current.index));
      }
    }, {
      key: 'next',
      value: function next() {

        this.set(this._getNextIndex(this._current.index));
      }

      /* API TIMER */

    }, {
      key: 'play',
      value: function play() {

        this.options.cycle = true;
        this.timer.remaining(Math.max(this.options.intervalMinimumRemaining, this.timer.remaining()));
        this.timer.play();
      }
    }, {
      key: 'pause',
      value: function pause() {

        this.options.cycle = false;
        this.timer.pause();
      }
    }, {
      key: 'stop',
      value: function stop() {

        this.options.cycle = false;
        this.timer.stop();
      }
    }, {
      key: 'reset',
      value: function reset() {

        this.options.cycle = true;
        this.timer.reset();
      }
    }]);

    return Carousel;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Carousel, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Timer, Svelto.Animations);

/* =========================================================================
 * Svelto - Targeter
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var Targeter = function (_Widgets$Widget7) {
    _inherits(Targeter, _Widgets$Widget7);

    function Targeter() {
      _classCallCheck(this, Targeter);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Targeter).apply(this, arguments));
    }

    _createClass(Targeter, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this._targetSelector = this.options.target || this.$element.data(this.options.datas.target);

        this.$target = this._targetSelector ? $(this._targetSelector) : this.$element.closest(this.options.widget.config.selector);

        this._targetInstance = this.$target[this.options.widget.config.name]('instance');
      }
    }]);

    return Targeter;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Targeter, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Closer
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * @requires ../targeter/targeter.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory, Pointer) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'closer',
    options: {
      methods: {
        isOpen: 'isOpen',
        close: 'close'
      }
    }
  };

  /* CLOSER */

  var Closer = function (_Widgets$Targeter) {
    _inherits(Closer, _Widgets$Targeter);

    function Closer() {
      _classCallCheck(this, Closer);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Closer).apply(this, arguments));
    }

    _createClass(Closer, [{
      key: '_events',

      /* SPECIAL */

      value: function _events() {

        this.___tap();
      }

      /* TAP */

    }, {
      key: '___tap',
      value: function ___tap() {

        this._on(Pointer.tap, this.__tap);
      }
    }, {
      key: '__tap',
      value: function __tap(event) {

        this.close(event);
      }

      /* API */

    }, {
      key: 'isOpen',
      value: function isOpen() {

        return this._targetInstance[this.options.methods.isOpen]();
      }
    }, {
      key: 'close',
      value: function close(event) {

        return this._targetInstance[this.options.methods.close](this.element, event);
      }
    }]);

    return Closer;
  }(Widgets.Targeter);

  /* FACTORY */

  Factory.init(Closer, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer);

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

(function ($, _, Svelto) {

  'use strict';

  /* COLOR */

  var Color = function () {
    function Color(color, colorspace) {
      _classCallCheck(this, Color);

      this.set(color, colorspace);
    }

    /* ----- API ----- */

    /* SET */

    _createClass(Color, [{
      key: 'set',
      value: function set(color, colorspace) {

        if (colorspace) {

          switch (colorspace.toLowerCase()) {

            case 'hex':
              return this.setHex(color);

            case 'rgb':
              return this.setRgb(color);

            case 'hsv':
              return this.setHsv(color);

            case 'hsl':
              return this.setHsl(color);

          }
        }

        if (_.isPlainObject(color)) {

          if ('r' in color && 'g' in color && 'b' in color) {

            if (Number(color.r) > 99 || Number(color.g) > 99 || Number(color.b) > 99) {

              return this.setRgb(color);
            } else {

              return this.setHex(color);
            }
          } else if ('h' in color && 's' in color) {

            if ('l' in color) {

              return this.setHsl(color);
            } else if ('v' in color) {

              return this.setHsv(color);
            }
          }
        } else if (_.isString(color)) {

          color = _.trim(color, '#');

          if (/^[0-9a-f]{6}$/i.test(color)) {
            // Full 6-chars hex color notation

            return this.setHex({
              r: color[0] + color[1],
              g: color[2] + color[3],
              b: color[4] + color[5]
            });
          } else if (/^[0-9a-f]{3}$/i.test(color)) {
            // Shorthand 3-chars hex color notation

            return this.setHex({
              r: color[0].repeat(2),
              g: color[1].repeat(2),
              b: color[2].repeat(2)
            });
          }
        }

        throw new Error('Invalid color');
      }
    }, {
      key: 'setHex',
      value: function setHex(color) {

        this.hex = _.cloneDeep(color);
      }
    }, {
      key: 'setRgb',
      value: function setRgb(color) {

        this.hex = Color.rgb2hex(color);
      }
    }, {
      key: 'setHsv',
      value: function setHsv(color) {

        this.hex = Color.hsv2hex(color);
      }
    }, {
      key: 'setHsl',
      value: function setHsl(color) {

        this.hex = Color.hsl2hex(color);
      }

      /* GET */

    }, {
      key: 'getHex',
      value: function getHex() {

        return this.hex;
      }
    }, {
      key: 'getRgb',
      value: function getRgb() {

        return Color.hex2rgb(this.hex);
      }
    }, {
      key: 'getHsv',
      value: function getHsv() {

        return Color.hex2hsv(this.hex);
      }
    }, {
      key: 'getHsl',
      value: function getHsl() {

        return Color.hex2hsl(this.hex);
      }

      /* ----- STATICS ----- */

      /* HEX */

    }], [{
      key: 'hex2rgb',
      value: function hex2rgb(hex) {

        return {
          r: Color.hex2dec(hex.r),
          g: Color.hex2dec(hex.g),
          b: Color.hex2dec(hex.b)
        };
      }
    }, {
      key: 'hex2hsv',
      value: function hex2hsv(hex) {

        return Color.rgb2hsv(Color.hex2rgb(hex));
      }
    }, {
      key: 'hex2hsl',
      value: function hex2hsl(hex) {

        return Color.hsv2hsl(Color.hex2hsv(hex));
      }

      /* RGB */

    }, {
      key: 'rgb2hex',
      value: function rgb2hex(rgb) {

        return {
          r: Color.dec2hex(rgb.r),
          g: Color.dec2hex(rgb.g),
          b: Color.dec2hex(rgb.b)
        };
      }
    }, {
      key: 'rgb2hsv',
      value: function rgb2hsv(rgb) {

        var r = rgb.r / 255,
            g = rgb.g / 255,
            b = rgb.b / 255,
            h = undefined,
            s = undefined,
            v = Math.max(r, g, b),
            diff = v - Math.min(r, g, b),
            diffc = function diffc(c) {
          return (v - c) / 6 / diff + 1 / 2;
        };

        if (diff === 0) {

          h = s = 0;
        } else {

          s = diff / v;

          var rr = diffc(r),
              gg = diffc(g),
              bb = diffc(b);

          if (r === v) {

            h = bb - gg;
          } else if (g === v) {

            h = 1 / 3 + rr - bb;
          } else if (b === v) {

            h = 2 / 3 + gg - rr;
          }

          if (h < 0) {

            h += 1;
          } else if (h > 1) {

            h -= 1;
          }
        }

        return {
          h: h * 360,
          s: s * 100,
          v: v * 100
        };
      }
    }, {
      key: 'rgb2hsl',
      value: function rgb2hsl(rgb) {

        return Color.hsv2hsl(Color.rgb2hsv(rgb));
      }

      /* HSV */

    }, {
      key: 'hsv2hex',
      value: function hsv2hex(hsv) {

        return Color.rgb2hex(Color.hsv2rgb(hsv));
      }
    }, {
      key: 'hsv2rgb',
      value: function hsv2rgb(hsv) {

        var r = undefined,
            g = undefined,
            b = undefined,
            h = hsv.h,
            s = hsv.s,
            v = hsv.v;

        s /= 100;
        v /= 100;

        if (s === 0) {

          r = g = b = v;
        } else {

          var i = undefined,
              f = undefined,
              p = undefined,
              q = undefined,
              t = undefined;

          h /= 60;
          i = Math.floor(h);
          f = h - i;
          p = v * (1 - s);
          q = v * (1 - s * f);
          t = v * (1 - s * (1 - f));

          switch (i) {

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
          r: Math.round(r * 255),
          g: Math.round(g * 255),
          b: Math.round(b * 255)
        };
      }
    }, {
      key: 'hsv2hsl',
      value: function hsv2hsl(hsv) {

        var s = hsv.s / 100,
            v = hsv.v / 100,
            tempL = (2 - s) * v,
            tempS = s * v;

        return {
          h: hsv.h,
          s: tempS !== 0 ? tempS / (tempL <= 1 ? tempL : 2 - tempL) * 100 : 0,
          l: tempL / 2 * 100
        };
      }

      /* HSL */

    }, {
      key: 'hsl2hex',
      value: function hsl2hex(hsl) {

        return Color.hsv2hex(Color.hsl2hsv(hsl));
      }
    }, {
      key: 'hsl2rgb',
      value: function hsl2rgb(hsl) {

        return Color.hsv2rgb(Color.hsl2hsv(hsl));
      }
    }, {
      key: 'hsl2hsv',
      value: function hsl2hsv(hsl) {

        var l = hsl.l / 100 * 2,
            s = hsl.s / 100 * (l <= 1 ? l : 2 - l);

        return {
          h: hsl.h,
          s: l + s !== 0 ? 2 * s / (l + s) * 100 : 0,
          v: (l + s) / 2 * 100
        };
      }

      /* DECIMAL / HEX */

    }, {
      key: 'dec2hex',
      value: function dec2hex(dec) {

        return _.padLeft(parseInt(dec, 10).toString(16), 2, '0');
      }
    }, {
      key: 'hex2dec',
      value: function hex2dec(hex) {

        return parseInt(hex, 16);
      }
    }]);

    return Color;
  }();

  /* EXPORT */

  Svelto.Color = Color;
})(Svelto.$, Svelto._, Svelto);

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

(function ($, _, Svelto, Widgets, Factory, Color, Keyboard) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'colorpicker',
    plugin: true,
    selector: '.colorpicker',
    options: {
      exporters: {
        hex: function hex(color) {
          var hex = color.getHex();
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

  var Colorpicker = function (_Widgets$Widget8) {
    _inherits(Colorpicker, _Widgets$Widget8);

    function Colorpicker() {
      _classCallCheck(this, Colorpicker);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Colorpicker).apply(this, arguments));
    }

    _createClass(Colorpicker, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$colorpicker = this.$element;
        this.$sbWrp = this.$colorpicker.find(this.options.selectors.sb.wrp);
        this.$sbHandler = this.$colorpicker.find(this.options.selectors.sb.handler);
        this.$hueWrp = this.$colorpicker.find(this.options.selectors.hue.wrp);
        this.$hueHandler = this.$colorpicker.find(this.options.selectors.hue.handler);

        this.$input = this.$colorpicker.find(this.options.selectors.input);

        this.sbWrpSize = this.$sbWrp.width();

        this.hueWrpHeight = this.sbWrpSize;

        this.hsv = false;
      }
    }, {
      key: '_init',
      value: function _init() {

        this.set(this.$input.val());

        if (!this.hsv) {

          this.set(this.options.startColor);
        }
      }
    }, {
      key: '_events',
      value: function _events() {

        this.___change();

        this.___sbKeydown();
        this.___sbDrag();

        this.___hueKeydown();
        this.___hueDrag();
      }
    }, {
      key: '_destroy',
      value: function _destroy() {

        /* DRAG */

        this.$sbHandler.draggable('destroy');
        this.$hueHandler.draggable('destroy');
      }

      /* CHANGE */

    }, {
      key: '___change',
      value: function ___change() {

        this._on(true, this.$input, 'change', this.__change);
      }
    }, {
      key: '__change',
      value: function __change() {

        this.set(this.$input.val());
      }

      /* SB ARROWS */

    }, {
      key: '___sbKeydown',
      value: function ___sbKeydown() {

        this._onHover(this.$sbWrp, [this.$document, 'keydown', this.__sbKeydown]);
      }
    }, {
      key: '__sbKeydown',
      value: function __sbKeydown(event) {

        switch (event.keyCode) {

          case Keyboard.keys.UP:
            this.hsv.v = Math.min(100, this.hsv.v + 1);
            break;

          case Keyboard.keys.RIGHT:
            this.hsv.s = Math.min(100, this.hsv.s + 1);
            break;

          case Keyboard.keys.DOWN:
            this.hsv.v = Math.max(0, this.hsv.v - 1);
            break;

          case Keyboard.keys.LEFT:
            this.hsv.s = Math.max(0, this.hsv.s - 1);
            break;

          default:
            return;

        }

        event.preventDefault();
        event.stopImmediatePropagation();

        this._updateSb();
        this._updateInput();
      }

      /* SB DRAG */

    }, {
      key: '___sbDrag',
      value: function ___sbDrag() {

        this.$sbHandler.draggable({
          draggable: this.isEnabled.bind(this),
          proxy: {
            $element: this.$sbWrp
          },
          constrainer: {
            $element: this.$sbWrp,
            center: true
          },
          callbacks: {
            move: this._throttle(this.__sbDragMove.bind(this), 100),
            end: this.__sbDragEnd.bind(this)
          }
        });
      }
    }, {
      key: '_sbDragSet',
      value: function _sbDragSet(XY, update) {

        this.hsv.s = _.clamp(XY.X, 0, this.sbWrpSize) * 100 / this.sbWrpSize;
        this.hsv.v = 100 - _.clamp(XY.Y, 0, this.sbWrpSize) * 100 / this.sbWrpSize;

        this._updateSb();

        if (update) {

          this._updateInput();
        }
      }
    }, {
      key: '__sbDragMove',
      value: function __sbDragMove(event, data) {

        this._sbDragSet(data.dragXY, this.options.live);
      }
    }, {
      key: '__sbDragEnd',
      value: function __sbDragEnd(event, data) {

        this._sbDragSet(data.dragXY, true);
      }

      /* HUE ARROWS */

    }, {
      key: '___hueKeydown',
      value: function ___hueKeydown() {

        this._onHover(this.$hueWrp, [this.$document, 'keydown', this.__hueKeydown]);
      }
    }, {
      key: '__hueKeydown',
      value: function __hueKeydown(event) {

        switch (event.keyCode) {

          case Keyboard.keys.UP:
            this.hsv.h = Math.min(359, this.hsv.h + 1);
            break;

          case Keyboard.keys.DOWN:
            this.hsv.h = Math.max(0, this.hsv.h - 1);
            break;

          default:
            return;

        }

        event.preventDefault();
        event.stopImmediatePropagation();

        this._updateHue();
        this._updateInput();
      }

      /* HUE DRAG */

    }, {
      key: '___hueDrag',
      value: function ___hueDrag() {

        this.$hueHandler.draggable({
          draggable: this.isEnabled.bind(this),
          axis: 'y',
          proxy: {
            $element: this.$hueWrp
          },
          constrainer: {
            $element: this.$hueWrp
          },
          callbacks: {
            move: this._throttle(this.__hueDragMove.bind(this), 50),
            end: this.__hueDragEnd.bind(this)
          }
        });
      }
    }, {
      key: '_hueDragSet',
      value: function _hueDragSet(XY, update) {

        this.hsv.h = 359 - _.clamp(XY.Y, 0, this.hueWrpHeight) * 359 / this.hueWrpHeight;

        this._updateHue();

        if (update) {

          this._updateInput();
        }
      }
    }, {
      key: '__hueDragMove',
      value: function __hueDragMove(event, data) {

        this._hueDragSet(data.dragXY, this.options.live);
      }
    }, {
      key: '__hueDragEnd',
      value: function __hueDragEnd(event, data) {

        this._hueDragSet(data.dragXY, true);
      }

      /* UPDATE */

    }, {
      key: '_updateSb',
      value: function _updateSb() {

        var hsl = Color.hsv2hsl(this.hsv),
            translateX = this.sbWrpSize / 100 * this.hsv.s,
            translateY = this.sbWrpSize / 100 * (100 - this.hsv.v);

        this.$sbHandler.hsl(hsl.h, hsl.s, hsl.l).translate(translateX, translateY);
      }
    }, {
      key: '_updateHue',
      value: function _updateHue() {

        var hsl = Color.hsv2hsl(this.hsv),
            translateY = this.hueWrpHeight / 100 * (100 - this.hsv.h / 360 * 100);

        this.$hueHandler.hsl(this.hsv.h, 100, 50).translateY(translateY);
        this.$sbHandler.hsl(hsl.h, hsl.s, hsl.l);
        this.$sbWrp.hsl(this.hsv.h, 100, 50);
      }
    }, {
      key: '_updateInput',
      value: function _updateInput() {

        this.$input.val(this._export()).trigger('change');

        this._trigger('change');
      }
    }, {
      key: '_update',
      value: function _update() {

        this._updateSb();
        this._updateHue();
        this._updateInput();
      }

      /* EXPORT */

    }, {
      key: '_export',
      value: function _export() {

        return this.options.exporters[this.options.format.type](new Color(this.hsv, 'hsv'), this.options.format.data);
      }

      /* API */

    }, {
      key: 'get',
      value: function get() {

        return this._export();
      }
    }, {
      key: 'set',
      value: function set(color) {

        color = _.attempt(function () {
          return new Color(color);
        });

        if (_.isError(color)) return;

        var hsv = color.getHsv();

        if (_.isEqual(this.hsv, hsv)) return;

        this.hsv = hsv;

        this._update();
      }
    }]);

    return Colorpicker;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Colorpicker, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Color, Svelto.Keyboard);

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

(function ($, _, Svelto) {

  'use strict';

  /* COOKIE */

  var Cookie = {

    /* VARIABLES */

    encoder: encodeURIComponent,
    decoder: decodeURIComponent,

    /* API */

    get: function get(key) {

      if (!key) return null;

      return this.decoder(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + this.encoder(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
    },
    set: function set(key, value, end, path, domain, secure) {

      if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) return false;

      var expires = '';

      if (end) {

        switch (end.constructor) {

          case Number:
            expires = end === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + end;
            break;

          case String:
            expires = '; expires=' + end;
            break;

          case Date:
            expires = '; expires=' + end.toUTCString();
            break;

        }
      }

      document.cookie = this.encoder(key) + '=' + this.encoder(value) + expires + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '') + (secure ? '; secure' : '');

      return true;
    },
    remove: function remove(key, path, domain) {

      if (!this.has(key)) return false;

      document.cookie = this.encoder(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '');

      return true;
    },
    has: function has(key) {

      if (!key) return false;

      return new RegExp('(?:^|;\\s*)' + this.encoder(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=').test(document.cookie);
    },
    keys: function keys() {

      var keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);

      return _.map(keys, this.decoder);
    }
  };

  /* EXPORT */

  Svelto.Cookie = Cookie;
})(Svelto.$, Svelto._, Svelto);

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

(function ($, _, Svelto, Widgets, Factory, Pointer, Mouse) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'datepicker',
    plugin: true,
    selector: '.datepicker',
    options: {
      exporters: {
        YYYYMMDD: function YYYYMMDD(date, data) {
          return [_.padLeft(date.getUTCFullYear(), 4, 0), _.padLeft(parseInt(date.getUTCMonth(), 10) + 1, 2, 0), _.padLeft(date.getUTCDate(), 2, 0)].join(data.separator);
        },
        UNIXTIMESTAMP: function UNIXTIMESTAMP(date) {
          return Math.floor(date.getTime() / 1000);
        },
        ISO: function ISO(date) {
          return date.toISOString();
        },
        UTC: function UTC(date) {
          return date.toUTCString();
        }
      },
      importers: {
        YYYYMMDD: function YYYYMMDD(date, data) {
          var segments = date.split(data.separator);
          return new Date(Date.UTC(parseInt(segments[0], 10), parseInt(segments[1], 10) - 1, parseInt(segments[2], 10)));
        },
        UNIXTIMESTAMP: function UNIXTIMESTAMP(date) {
          return new Date(_.isString(date) && date.length ? date * 1000 : NaN);
        },
        ISO: function ISO(date) {
          return new Date(date);
        },
        UTC: function UTC(date) {
          return new Date(date);
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

  var Datepicker = function (_Widgets$Widget9) {
    _inherits(Datepicker, _Widgets$Widget9);

    function Datepicker() {
      _classCallCheck(this, Datepicker);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Datepicker).apply(this, arguments));
    }

    _createClass(Datepicker, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$datepicker = this.$element;
        this.$input = this.$datepicker.find(this.options.selectors.input);

        this.$navigationPrev = this.$datepicker.find(this.options.selectors.navigation.previous);
        this.$navigationNext = this.$datepicker.find(this.options.selectors.navigation.next);
        this.$navigationToday = this.$datepicker.find(this.options.selectors.navigation.today);
        this.$navigationTitle = this.$datepicker.find(this.options.selectors.title);

        this.$daysPrev = this.$datepicker.find(this.options.selectors.day.previous);
        this.$daysCurrent = this.$datepicker.find(this.options.selectors.day.current);
        this.$daysNext = this.$datepicker.find(this.options.selectors.day.next);
        this.$daysAll = this.$daysPrev.add(this.$daysCurrent).add(this.$daysNext);

        this.$daySelected = this.$daysAll.filter(this.options.selectors.day.selected);
        this.$dayToday = this.$daysAll.filter(this.options.selectors.day.today);
      }
    }, {
      key: '_init',
      value: function _init() {

        /* RESETTING HIGHLIGHT */

        this._unhighlightSelected();
        this._unhighlightToday();

        /* TODAY */

        if (!(this.options.date.today instanceof Date)) {

          this.options.date.today = new Date();
        }

        /* INITIAL VALUE */

        this.set(this.$input.val());

        /* CURRENT */

        this.options.date.current = this._clampDate(this.options.date.current || this.options.date.selected || this.options.date.today);

        /* REFRESH */

        this._refresh();
      }
    }, {
      key: '_events',
      value: function _events() {

        this.___change();
        this.___keydown();
        this.___navigation();
        this.___dayTap();
      }

      /* PRIVATE */

    }, {
      key: '_cloneDate',
      value: function _cloneDate(date) {

        return new Date(date.getTime());
      }
    }, {
      key: '_clampDate',
      value: function _clampDate(date) {

        return new Date(_.clamp(date.getTime(), this.options.date.min ? this.options.date.min.getTime() : undefined, this.options.date.max ? this.options.date.max.getTime() : undefined));
      }

      /* CHANGE */

    }, {
      key: '___change',
      value: function ___change() {

        this._on(true, this.$input, 'change', this.__change);
      }
    }, {
      key: '__change',
      value: function __change(event, data) {

        if (data && data._datepickerId === this.guid) return;

        this.set(this.$input.val());
      }

      /* KEYDOWN */

    }, {
      key: '___keydown',
      value: function ___keydown() {

        this._onHover([this.$document, 'keydown', this.__keydown]);
      }

      /* NAVIGATION */

    }, {
      key: '___navigation',
      value: function ___navigation() {

        this._on(this.$navigationPrev, Pointer.tap, this.previousMonth);
        this._on(this.$navigationNext, Pointer.tap, this.nextMonth);
        this._on(this.$navigationToday, Pointer.tap, this.navigateToToday);
      }

      /* DAY TAP */

    }, {
      key: '___dayTap',
      value: function ___dayTap() {

        this._on(Pointer.tap, this.options.selectors.day.current, this.__dayTap);
      }
    }, {
      key: '__dayTap',
      value: function __dayTap(event) {

        if (!_.isUndefined(event.button) && event.button !== Mouse.buttons.LEFT) return;

        var $day = $(event.currentTarget);

        if ($day.is(this.options.selectors.day.selected) || $day.is(this.options.selectors.day.clamped)) return;

        var day = parseInt($day.text(), 10),
            date = new Date(this.options.date.current.getFullYear(), this.options.date.current.getMonth(), day, 12);

        this.set(date);
      }

      /* BUILD */

    }, {
      key: '_buildCalendar',
      value: function _buildCalendar() {

        /* NUMBERS */

        var prevMonthDays = new Date(this.options.date.current.getFullYear(), this.options.date.current.getMonth(), 0).getDate(),
            currentMonthDays = new Date(this.options.date.current.getFullYear(), this.options.date.current.getMonth() + 1, 0).getDate(),
            initialDayOfWeek = new Date(this.options.date.current.getFullYear(), this.options.date.current.getMonth(), 1).getDay();

        initialDayOfWeek = initialDayOfWeek === 0 ? 6 : initialDayOfWeek - 1; // Normalizing to 0 -> Monday
        initialDayOfWeek -= this.options.firstDayOfWeek % 7; // Offsetting according to the provided setting
        initialDayOfWeek = initialDayOfWeek < 0 ? 7 + initialDayOfWeek : initialDayOfWeek; // Moving to the other side in case of negative offsetting

        /* PREV */

        var exceedingDays = 31 - prevMonthDays,
            neededDays = initialDayOfWeek,
            leftDays = 9 - exceedingDays - neededDays;

        this.$daysPrev.slice(0, leftDays).addClass(this.options.classes.hidden);
        this.$daysPrev.slice(leftDays, leftDays + neededDays).removeClass(this.options.classes.hidden);
        this.$daysPrev.slice(leftDays + neededDays).addClass(this.options.classes.hidden);

        /* CURRENT */

        this.$daysCurrent.slice(28, currentMonthDays).removeClass(this.options.classes.hidden);
        this.$daysCurrent.slice(currentMonthDays).addClass(this.options.classes.hidden);

        /* CURRENT CLAMPED */

        this.$daysCurrent.removeClass(this.options.classes.clamped);

        if (this.options.date.min && this.options.date.current.getFullYear() === this.options.date.min.getFullYear() && this.options.date.current.getMonth() === this.options.date.min.getMonth()) {

          this.$daysCurrent.slice(0, this.options.date.min.getDate() - 1).addClass(this.options.classes.clamped);
        }

        if (this.options.date.max && this.options.date.current.getFullYear() === this.options.date.max.getFullYear() && this.options.date.current.getMonth() === this.options.date.max.getMonth()) {

          this.$daysCurrent.slice(this.options.date.max.getDate()).addClass(this.options.classes.clamped);
        }

        /* NEXT */

        neededDays = (currentMonthDays + initialDayOfWeek) % 7;
        neededDays = neededDays === 0 ? 0 : 7 - neededDays;

        this.$daysNext.slice(0, neededDays).removeClass(this.options.classes.hidden);
        this.$daysNext.slice(neededDays).addClass(this.options.classes.hidden);
      }

      /* HIGHLIGHT */

    }, {
      key: '_highlightDay',
      value: function _highlightDay(day, cssClass) {

        if (day instanceof Date) {

          var deltaMonths = day.getFullYear() * 12 + day.getMonth() - (this.options.date.current.getFullYear() * 12 + this.options.date.current.getMonth());

          switch (deltaMonths) {

            case -1:
              return this.$daysPrev.eq(day.getDate() - 23).addClass(cssClass);

            case 0:
              return this.$daysCurrent.eq(day.getDate() - 1).addClass(cssClass);

            case 1:
              return this.$daysNext.eq(day.getDate() - 1).addClass(cssClass);

          }
        }

        return false;
      }
    }, {
      key: '_unhighlightSelected',
      value: function _unhighlightSelected() {

        if (!this.$daySelected.length) return;

        this.$daySelected.removeClass(this.options.classes.selected);
      }
    }, {
      key: '_highlightSelected',
      value: function _highlightSelected() {

        if (this.options.date.selected) {

          this.$daySelected = this._highlightDay(this.options.date.selected, this.options.classes.selected);
        }
      }
    }, {
      key: '_unhighlightToday',
      value: function _unhighlightToday() {

        if (!this.$dayToday.length) return;

        this.$dayToday.removeClass(this.options.classes.today);
      }
    }, {
      key: '_highlightToday',
      value: function _highlightToday() {

        if (this.options.date.today) {

          this.$dayToday = this._highlightDay(this.options.date.today, this.options.classes.today);
        }
      }

      /* UPDATE */

    }, {
      key: '_updateNavigation',
      value: function _updateNavigation() {

        /* PREVIOUS */

        if (this.options.date.min && this.$navigationPrev.length) {

          var lastDayPrevMonth = new Date(this.options.date.current.getFullYear(), this.options.date.current.getMonth(), 0);

          this.$navigationPrev.toggleClass(this.options.classes.disabled, lastDayPrevMonth.getTime() < this.options.date.min.getTime());
        }

        /* NEXT */

        if (this.options.date.max && this.$navigationNext.length) {

          var firstDayNextMonth = new Date(this.options.date.current.getFullYear(), this.options.date.current.getMonth() + 1, 1);

          this.$navigationNext.toggleClass(this.options.classes.disabled, firstDayNextMonth.getTime() > this.options.date.max.getTime());
        }

        /* TODAY */

        if (this.$navigationToday.length) {

          this.$navigationToday.toggleClass(this.options.classes.disabled, this.options.date.current.getFullYear() === this.options.date.today.getFullYear() && this.options.date.current.getMonth() === this.options.date.today.getMonth());
        }
      }
    }, {
      key: '_updateTitle',
      value: function _updateTitle() {

        this.$navigationTitle.text(this.options.months[this.options.date.current.getMonth()] + ' ' + this.options.date.current.getFullYear());
      }
    }, {
      key: '_updateInput',
      value: function _updateInput() {

        if (this.options.date.selected) {

          this.$input.val(this._export(this.options.date.selected)).trigger('change', { _datepickerId: this.guid });
        }
      }

      /* EXPORT */

    }, {
      key: '_export',
      value: function _export(date) {

        return this.options.exporters[this.options.format.type](date, this.options.format.data);
      }

      /* IMPORT */

    }, {
      key: '_import',
      value: function _import(date) {

        return this.options.importers[this.options.format.type](date, this.options.format.data);
      }
    }, {
      key: '_refresh',
      value: function _refresh() {

        this._unhighlightSelected();
        this._unhighlightToday();

        this._buildCalendar();

        this._updateNavigation();

        this._highlightSelected();
        this._highlightToday();

        this._updateTitle();
      }

      /* API */

    }, {
      key: 'get',
      value: function get(formatted) {

        return this.options.date.selected ? formatted ? this._export(this.options.date.selected) : this._cloneDate(this.options.date.selected) : false;
      }
    }, {
      key: 'set',
      value: function set(date) {

        date = date instanceof Date ? date : this._import(date);

        if (_.isNaN(date.valueOf())) return;

        date = this._clampDate(date);

        if (this.options.date.selected && date.getTime() === this.options.date.selected.getTime()) return;

        if (this.options.date.selected) {

          this._unhighlightSelected();
        }

        this.options.date.selected = date;

        if (this.options.date.current) {

          if (this.options.date.selected.getFullYear() === this.options.date.current.getFullYear() && this.options.date.selected.getMonth() === this.options.date.current.getMonth()) {

            this._highlightSelected();
          } else {

            this.options.date.current = this._cloneDate(this.options.date.selected);

            this._refresh();
          }
        }

        this._updateInput();

        this._trigger('change');
      }
    }, {
      key: 'navigateToToday',
      value: function navigateToToday() {

        if (this.options.date.current.getFullYear() !== this.options.date.today.getFullYear() || this.options.date.current.getMonth() !== this.options.date.today.getMonth()) {

          this.options.date.current = this._clampDate(this.options.date.today);

          this._refresh();
        }
      }
    }, {
      key: 'navigateMonth',
      value: function navigateMonth(modifier) {

        if (_.isNaN(modifier)) return;

        this.options.date.current.setMonth(this.options.date.current.getMonth() + modifier);

        this.options.date.current = this._clampDate(this.options.date.current);

        this._refresh();
      }
    }, {
      key: 'previousMonth',
      value: function previousMonth() {

        this.navigateMonth(-1);
      }
    }, {
      key: 'nextMonth',
      value: function nextMonth() {

        this.navigateMonth(1);
      }
    }]);

    return Datepicker;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Datepicker, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Mouse);

/* =========================================================================
 * Svelto - Draggable
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

//TODO: Maybe return less datas to triggered events and callbacks

//FIXME: Reposition the draggable properly when autoscrolling inside a container (not document/html)
//FIXME: On iOS, if the draggable is too close to the left edge of the screen dragging it will cause a `scroll to go back` event/animation on safari

(function ($, _, Svelto, Widgets, Factory, Animations, Browser, Pointer, Mouse) {

  'use strict';

  /* CONFIG */

  var config = {
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
        dragging: 'draggable-dragging',
        layoutDragging: 'draggable-layout-dragging',
        reverting: 'draggable-reverting'
      },
      selectors: {
        handler: '.draggable-handler'
      },
      animations: {
        revert: Animations.fast
      },
      callbacks: {
        start: _.noop,
        move: _.noop,
        end: _.noop
      }
    }
  };

  /* DRAGGABLE */

  var Draggable = function (_Widgets$Widget10) {
    _inherits(Draggable, _Widgets$Widget10);

    function Draggable() {
      _classCallCheck(this, Draggable);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Draggable).apply(this, arguments));
    }

    _createClass(Draggable, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.draggable = this.element;
        this.$draggable = this.$element;

        this.$handlers = this.options.onlyHandlers ? this.$draggable.find(this.options.selectors.handler) : this.$draggable;
      }
    }, {
      key: '_events',
      value: function _events() {

        this.___down();
        this.___proxy();
      }

      /* DOWN */

    }, {
      key: '___down',
      value: function ___down() {

        this._on(this.$handlers, Pointer.down, this.__down);
      }

      /* PROXY */

    }, {
      key: '___proxy',
      value: function ___proxy() {

        if (this.options.proxy.$element) {

          this._on(this.options.proxy.$element, Pointer.down, this.__down);
        }
      }

      /* ACTIONS */

    }, {
      key: '_centerToPoint',
      value: function _centerToPoint(point, suppressClasses) {

        var movableOffset = this.$movable.offset(),
            deltaXY = {
          X: point.X - (movableOffset.left + this.$movable.outerWidth() / 2),
          Y: point.Y - (movableOffset.top + this.$movable.outerHeight() / 2)
        };

        return this._actionMove(deltaXY, suppressClasses);
      }
    }, {
      key: '_actionMove',
      value: function _actionMove(deltaXY, suppressClasses) {

        /* BASE */

        var baseXY = {
          X: this.proxyXY ? this.proxyXY.X : this.initialXY.X,
          Y: this.proxyXY ? this.proxyXY.Y : this.initialXY.Y
        };

        /* INIT */

        if (!this.inited) {

          this.inited = true;

          /* CLAMPING VALUES */

          if (this.options.constrainer.$element) {

            var constrainerOffset = this.options.constrainer.$element.offset(),
                movableOffset = this.$movable.offset();

            if (this.options.axis !== 'y') {

              var halfWidth = this.options.constrainer.center ? this.$movable.outerWidth() / 2 : 0;

              this.translateX_min = constrainerOffset.left - (movableOffset.left - baseXY.X) - halfWidth;
              this.translateX_max = constrainerOffset.left + this.options.constrainer.$element.outerWidth() - (movableOffset.left - baseXY.X + this.$movable.outerWidth()) + halfWidth;
            }

            if (this.options.axis !== 'x') {

              var halfHeight = this.options.constrainer.center ? this.$movable.outerHeight() / 2 : 0;

              this.translateY_min = constrainerOffset.top - (movableOffset.top - baseXY.Y) - halfHeight;
              this.translateY_max = constrainerOffset.top + this.options.constrainer.$element.outerHeight() - (movableOffset.top - baseXY.Y + this.$movable.outerHeight()) + halfHeight;
            }
          }

          /* CLASSES */

          if (!suppressClasses) {

            this._addClasses();
          }
        }

        /* CLAMPING */

        var translateX = baseXY.X,
            translateY = baseXY.Y;

        if (this.options.axis !== 'y') {

          translateX += deltaXY.X;

          if (this.options.constrainer.$element) {

            translateX = _.clamp(translateX, this.translateX_min - this.options.constrainer.tolerance.x, this.translateX_max + this.options.constrainer.tolerance.x);
          }
        }

        if (this.options.axis !== 'x') {

          translateY += deltaXY.Y;

          if (this.options.constrainer.$element) {

            translateY = _.clamp(translateY, this.translateY_min - this.options.constrainer.tolerance.y, this.translateY_max + this.options.constrainer.tolerance.y);
          }
        }

        /* MODIFYING */

        var modifiedXY = {
          X: this.options.modifiers.x(translateX),
          Y: this.options.modifiers.y(translateY)
        };

        if (modifiedXY.X === false && modifiedXY.Y === false) {
          // Aborted

          return baseXY;
        } else {

          /* SETTING */

          var endXY = {
            X: _.isBoolean(modifiedXY.X) ? modifiedXY.X ? translateX : baseXY.X : modifiedXY.X,
            Y: _.isBoolean(modifiedXY.Y) ? modifiedXY.Y ? translateY : baseXY.Y : modifiedXY.Y
          };

          this.$movable.translate(endXY.X, endXY.Y);

          /* MOTION */

          this.motion = true;

          /* RETURNING */

          return endXY;
        }
      }

      /* CLASSES */

    }, {
      key: '_toggleClasses',
      value: function _toggleClasses(force) {

        this.$layout.toggleClass(this.options.classes.layoutDragging, force);
        this.$movable.toggleClass(this.options.classes.dragging, force);
      }
    }, {
      key: '_addClasses',
      value: function _addClasses() {

        this._toggleClasses(true);
      }
    }, {
      key: '_removeClasses',
      value: function _removeClasses() {

        this._toggleClasses(false);
      }

      /* HELPER */

    }, {
      key: '_getHelper',
      value: function _getHelper() {

        return _.isFunction(this.options.$helper) ? this.options.$helper() : this.options.$helper instanceof $ && this.options.$helper.length ? this.options.$helper : false;
      }
    }, {
      key: '_initHelper',
      value: function _initHelper() {

        this.$helper.appendTo(this.$layout);
      }
    }, {
      key: '_destroyHelper',
      value: function _destroyHelper() {

        this.$helper.remove();
      }

      /* AUTOSCROLL */

    }, {
      key: '_autoscroll',
      value: function _autoscroll(pointXY) {

        if (!this.options.scroll.active) return;

        if (!this.scrollInited) {

          this.$scrollParent = this.$movable.scrollParent();
          this.scrollParent = this.$scrollParent[0];

          this.scrollParentIsDocument = this.scrollParent === document || this.scrollParent.tagName === 'HTML';

          this.scrollInited = true;
        }

        // Logic taken from jQuery UI

        if (this.scrollParentIsDocument) {

          if (this.options.axis !== 'x') {

            var scrollTop = this.$document.scrollTop();

            if (pointXY.Y - scrollTop <= this.options.scroll.sensitivity) {

              this.$document.scrollTop(scrollTop - this.options.scroll.speed);
            } else if (this.$window.height() - (pointXY.Y - scrollTop) <= this.options.scroll.sensitivity) {

              this.$document.scrollTop(scrollTop + this.options.scroll.speed);
            }
          }

          if (this.options.axis !== 'y') {

            var scrollLeft = this.$document.scrollLeft();

            if (pointXY.X - scrollLeft <= this.options.scroll.sensitivity) {

              this.$document.scrollLeft(scrollLeft - this.options.scroll.speed);
            } else if (this.$window.width() - (pointXY.X - scrollLeft) <= this.options.scroll.sensitivity) {

              this.$document.scrollLeft(scrollLeft + this.options.scroll.speed);
            }
          }
        } else {

          var parentOffset = this.$scrollParent.offset();

          if (this.options.axis !== 'x') {

            if (parentOffset.top + this.scrollParent.offsetHeight - pointXY.Y <= this.options.scroll.sensitivity) {

              this.scrollParent.scrollTop += this.options.scroll.speed;
            } else if (pointXY.Y - parentOffset.top <= this.options.scroll.sensitivity) {

              this.scrollParent.scrollTop -= this.options.scroll.speed;
            }
          }

          if (this.options.axis !== 'y') {

            if (parentOffset.left + this.scrollParent.offsetWidth - pointXY.X <= this.options.scroll.sensitivity) {

              this.scrollParent.scrollLeft += this.options.scroll.speed;
            } else if (pointXY.X - parentOffset.left <= this.options.scroll.sensitivity) {

              this.scrollParent.scrollLeft -= this.options.scroll.speed;
            }
          }
        }
      }

      /* REVERT */

    }, {
      key: '_revert',
      value: function _revert() {

        this._lock = true;

        this._frame(function () {

          this.$movable.addClass(this.options.classes.reverting);

          this._frame(function () {

            this.$movable.translate(this.initialXY.X, this.initialXY.Y);

            this._delay(function () {

              this.$movable.removeClass(this.options.classes.reverting);

              this._lock = false;
            }, this.options.animations.revert);
          });
        });
      }

      /* HANDLERS */

    }, {
      key: '__down',
      value: function __down(event) {

        if (this._lock || !this.options.draggable()) return;

        event.preventDefault();
        event.stopImmediatePropagation();

        this.inited = false;
        this.motion = false;
        this.scrollInited = false;

        this.$helper = this._getHelper();
        this.helper = this.$helper ? this.$helper[0] : false;

        this.$movable = this.$helper || this.$draggable;

        this.startEvent = event;
        this.startXY = $.eventXY(event);

        if (this.$helper) {

          this._initHelper();
          this.initialXY = this.$movable.translate();
          this.initialXY = this._centerToPoint(this.startXY);
        } else {

          this.initialXY = this.$movable.translate();
        }

        this.isProxyed = this.options.proxy.$element && event.currentTarget === this.options.proxy.$element[0];

        this.proxyXY = false;

        this._trigger('start', { draggable: this.draggable, helper: this.helper, initialXY: this.initialXY, startEvent: this.startEvent, startXY: this.startXY });

        this._on(true, this.$document, Pointer.move, this.__move);
        this._one(true, this.$document, Pointer.up, this.__up);
        this._one(true, this.$document, Pointer.cancel, this.__cancel);
      }
    }, {
      key: '__move',
      value: function __move(event) {

        var moveXY = $.eventXY(event),
            deltaXY = {
          X: moveXY.X - this.startXY.X,
          Y: moveXY.Y - this.startXY.Y
        },
            absDeltaXY = {
          X: Math.abs(deltaXY.X),
          Y: Math.abs(deltaXY.Y)
        },
            dragXY = undefined;

        if (absDeltaXY.X < this.options.threshold && absDeltaXY.Y < this.options.threshold) return;

        if (!this.inited && this.isProxyed) {

          this._centerToPoint(moveXY);

          this.proxyXY = this.$movable.translate();

          dragXY = this.proxyXY;
        } else {

          var _deltaXY = {
            X: moveXY.X - this.startXY.X,
            Y: moveXY.Y - this.startXY.Y
          };

          dragXY = this._actionMove(_deltaXY);
        }

        this._autoscroll(moveXY);

        this._trigger('move', { draggable: this.draggable, helper: this.helper, initialXY: this.initialXY, startEvent: this.startEvent, startXY: this.startXY, moveEvent: event, moveXY: moveXY, dragXY: dragXY });
      }
    }, {
      key: '__up',
      value: function __up(event) {

        var endXY = $.eventXY(event),
            dragXY = this.initialXY;

        if (this.inited) {

          this._removeClasses();
        }

        if (this.$helper) {

          this._destroyHelper();
        }

        if (this.motion) {

          if (this.options.revert) {

            this._revert();
          } else {

            dragXY = this.$movable.translate();
          }
        } else if (this.isProxyed) {

          if (this.options.proxy.noMotion && (_.isUndefined(event.button) || event.button === Mouse.buttons.LEFT)) {

            dragXY = this._centerToPoint(endXY, true);
          }
        }

        this._off(this.$document, Pointer.move, this.__move);
        this._off(this.$document, Pointer.cancel, this.__cancel);

        this._trigger('end', { draggable: this.draggable, helper: this.helper, initialXY: this.initialXY, startEvent: this.startEvent, startXY: this.startXY, endEvent: event, endXY: endXY, dragXY: dragXY, motion: this.motion });
      }
    }, {
      key: '__cancel',
      value: function __cancel(event) {

        var endXY = $.eventXY(event),
            dragXY = this.$movable.translate();

        if (this.inited) {

          this._removeClasses();
        }

        if (this.$helper) {

          this._destroyHelper();
        }

        if (this.motion) {

          if (this.options.revert) {

            this._revert();

            dragXY = this.initialXY;
          }
        }

        this._off(this.$document, Pointer.move, this.__move);
        this._off(this.$document, Pointer.up, this.__up);

        this._trigger('end', { draggable: this.draggable, helper: this.helper, initialXY: this.initialXY, startEvent: this.startEvent, startXY: this.startXY, endEvent: event, endXY: endXY, dragXY: dragXY, motion: this.motion });
      }
    }]);

    return Draggable;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Draggable, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Animations, Svelto.Browser, Svelto.Pointer, Svelto.Mouse);

/* =========================================================================
 * Svelto - Transform (Utilties)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

/* TRANSFORM UTILITIES */

(function ($, _, Svelto) {

  'use strict';

  /* MATRIX */

  var property = 'webkitTransform' in document.documentElement.style ? '-webkit-transform' : 'transform';

  $.fn.matrix = function (values) {

    if (values) {

      this.css(property, 'matrix(' + values.join(',') + ')');

      return this;
    } else {

      var transformStr = this.css(property);

      return transformStr && transformStr !== 'none' ? transformStr.match(/[0-9., e-]+/)[0].split(', ').map(function (value) {
        return parseFloat(value);
      }) : [1, 0, 0, 1, 0, 0];
    }
  };

  /* TRANSFORMATIONS */

  var transformations = ['scaleX', 'skewY', 'skewX', 'scaleY', 'translateX', 'translateY']; // Their index is also the corresponsing index when applying `transform: matrix()`

  for (var i = 0, l = transformations.length; i < l; i++) {

    $.fn[transformations[i]] = function (index) {

      return function (value) {

        var matrix = this.matrix();

        if (!_.isUndefined(value)) {

          matrix[index] = value;

          return this.matrix(matrix);
        } else {

          return matrix[index];
        }
      };
    }(i);
  }

  /* TRANSLATE */

  $.fn.translate = function (X, Y) {

    var matrix = this.matrix();

    if (!_.isUndefined(X) && !_.isUndefined(Y)) {

      matrix[4] = X;
      matrix[5] = Y;

      return this.matrix(matrix);
    } else {

      return {
        X: matrix[4],
        Y: matrix[5]
      };
    }
  };
})(Svelto.$, Svelto._, Svelto);

/* =========================================================================
 * Svelto - Positionate
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../transform/transform.js
 * ========================================================================= */

(function ($, _, Svelto) {

  'use strict';

  /* VARIABLES */

  var $window = $(window);

  /* UTILITES */

  var isHorizontal = function isHorizontal(direction) {

    return direction === 'left' || direction === 'right';
  };

  var isVertical = function isVertical(direction) {

    return !isHorizontal(direction);
  };

  /* DEFAULT OPTIONS */

  var defaults = {
    axis: false, // Set a preferred axis
    strict: false, // If enabled only use the setted axis/direction, even if it won't be the optimial choice
    $anchor: false, // Positionate next to an $anchor element
    $pointer: false, // The element who is ging to the anchor
    point: false, // Positionate at coordinates, ex: { x: number, y: number }
    spacing: 0, // Extra space to leave around the positionable element
    constrainer: { // Constrain the $positionable inside the $element
      $element: false, // If we want to keep the $positionable inside this $element
      center: false, // Set the constrain type, it will constrain the whole shape, or the center
      tolerance: { // The amount of pixel flexibility that a constrainer has
        x: 0,
        y: 0
      }
    },
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

  $.fn.positionate = function (options) {

    /* NO ELEMENTS */

    if (!this.length) return this;

    /* OPTIONS */

    options = _.merge({}, $.fn.positionate.defaults, options);

    /* VARIABLES */

    var positionable = this[0],
        $positionable = $(positionable),
        positionableRect = $positionable.getRect(),
        windowWidth = $window.width(),
        windowHeight = $window.height(),
        directions = _.unique(_.union(options.direction ? [options.direction] : [], options.axis ? options.directions[options.axis] : [], !options.strict || !options.direction && !options.axis ? options.directions.all : [])),
        anchorRect = options.$anchor ? options.$anchor.getRect() : { top: options.point.y, bottom: options.point.y, left: options.point.x, right: options.point.x, width: 0, height: 0 };

    /* SPACES */

    var spaces = directions.map(function (direction) {

      switch (direction) {

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

    spaces.forEach(function (space, index) {

      if (space < 0) {

        var opposite = _.getOppositeDirection(directions[index]),
            oppositeIndex = directions.indexOf(opposite);

        if (oppositeIndex !== -1) {

          _.move(directions, oppositeIndex, 0);
          _.move(spaces, oppositeIndex, 0);
        }
      }
    });

    /* AREAS */

    var areas = directions.map(function (direction, index) {

      switch (direction) {

        case 'top':
        case 'bottom':
          return Math.min(positionableRect.height, spaces[index]) * Math.min(windowWidth, positionableRect.width);

        case 'left':
        case 'right':
          return Math.min(positionableRect.width, spaces[index]) * Math.min(windowHeight, positionableRect.height);

      }
    });

    /* BEST DIRECTION */

    var bestIndex = areas.indexOf(_.max(areas)),
        bestDirection = directions[bestIndex],
        coordinates = {};

    /* TOP / LEFT */

    switch (bestDirection) {

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

    switch (bestDirection) {

      case 'top':
      case 'bottom':
        switch (options.alignment.x) {
          case 'left':
            coordinates.left = anchorRect.left;
            break;
          case 'center':
            coordinates.left = anchorRect.left + anchorRect.width / 2 - positionableRect.width / 2;
            break;
          case 'right':
            coordinates.left = anchorRect.right - positionableRect.width;
            break;
        }
        break;

      case 'left':
      case 'right':
        switch (options.alignment.y) {
          case 'top':
            coordinates.top = anchorRect.top;
            break;
          case 'center':
            coordinates.top = anchorRect.top + anchorRect.height / 2 - positionableRect.height / 2;
            break;
          case 'bottom':
            coordinates.top = anchorRect.bottom - positionableRect.height;
            break;
        }
        break;

    }

    /* CONSTRAIN */

    if (options.$anchor) {

      var oppositeSpace = spaces[bestIndex],
          isAnchorVisible = isVertical(bestDirection) ? oppositeSpace <= windowHeight : oppositeSpace <= windowWidth;

      if (isAnchorVisible) {

        coordinates.top = _.clamp(coordinates.top, options.spacing, windowHeight - positionableRect.height - options.spacing);
        coordinates.left = _.clamp(coordinates.left, options.spacing, windowWidth - positionableRect.width - options.spacing);
      }
    } else if (options.constrainer.$element) {

      var constrainerRect = options.constrainer.$element.getRect(),
          halfWidth = options.constrainer.center ? positionableRect.width / 2 : 0,
          halfHeight = options.constrainer.center ? positionableRect.height / 2 : 0;

      /* COORDINATES */

      coordinates.top = _.clamp(coordinates.top, constrainerRect.top - halfHeight - options.constrainer.tolerance.y + options.spacing, constrainerRect.bottom - positionableRect.height + halfHeight + options.constrainer.tolerance.y - options.spacing);
      coordinates.left = _.clamp(coordinates.left, constrainerRect.left - halfWidth - options.constrainer.tolerance.x + options.spacing, constrainerRect.right - positionableRect.width + halfWidth + options.constrainer.tolerance.x - options.spacing);
    }

    /* DATAS */

    var data = {
      positionable: positionable,
      coordinates: coordinates,
      direction: bestDirection
    };

    /* TRANSLATE */

    $positionable.translate(coordinates.left, coordinates.top);

    /* CSS CLASS */

    var prevDirection = positionable._prevDirection;

    if (prevDirection !== bestDirection) {

      $positionable.removeClass('positionate-' + prevDirection).addClass('positionate-' + bestDirection);

      positionable._prevDirection = bestDirection;
    }

    /* POINTER */

    if (options.$anchor && options.$pointer) {

      switch (bestDirection) {

        case 'top':
        case 'bottom':
          options.$pointer.translateX(anchorRect.left - coordinates.left + anchorRect.width / 2);
          break;

        case 'left':
        case 'right':
          options.$pointer.translateY(anchorRect.top - coordinates.top + anchorRect.height / 2);
          break;

      }
    }

    /* CALLBACK */

    options.callbacks.change(data);

    /* RETURN */

    return this;
  };

  /* BINDING */

  $.fn.positionate.defaults = defaults;
})(Svelto.$, Svelto._, Svelto);

/* =========================================================================
 * Svelto - Embedded CSS
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

/* EMBEDDED CSS */

(function ($, _, Svelto) {

  'use strict';

  /* EMBEDDED CSS */

  var EmbeddedCSS = function () {
    function EmbeddedCSS() {
      _classCallCheck(this, EmbeddedCSS);

      this.$stylesheet = $('<style class="svelto-embedded svelto-embedded-' + $.guid++ + '">');
      this.tree = {};
    }

    /* PRIVATE */

    _createClass(EmbeddedCSS, [{
      key: '_cssfy',
      value: function _cssfy() {

        var css = '';

        for (var selector in this.tree) {

          if (this.tree.hasOwnProperty(selector)) {

            css += selector + '{';

            if (_.isPlainObject(this.tree[selector])) {

              for (var property in this.tree[selector]) {

                if (this.tree[selector].hasOwnProperty(property)) {

                  css += property + ':' + this.tree[selector][property] + ';';
                }
              }
            } else if (_.isString(this.tree[selector])) {

              css += this.tree[selector] + ';';
            }

            css += '}';
          }
        }

        return css;
      }
    }, {
      key: '_refresh',
      value: function _refresh() {

        this.$stylesheet.text(this._cssfy());
      }

      /* API */

    }, {
      key: 'get',
      value: function get(selector) {

        return this.tree[selector];
      }
    }, {
      key: 'set',
      value: function set(selector, property, value) {

        if (property === false) {

          return this.remove(selector);
        }

        if (_.isPlainObject(property)) {

          this.tree[selector] = _.extend(_.isPlainObject(this.tree[selector]) ? this.tree[selector] : {}, property);
        } else if (_.isString(property)) {

          if (!value) {

            this.tree[selector] = property;
          } else {

            return this.set(selector, { property: property, value: value });
          }
        }

        this._refresh();
      }
    }, {
      key: 'remove',
      value: function remove(selector) {

        if (selector in this.tree) {

          delete this.tree[selector];

          this._refresh();
        }
      }
    }, {
      key: 'clear',
      value: function clear() {

        if (_.size(this.tree)) {

          this.tree = {};

          this._refresh();
        }
      }
    }, {
      key: 'attach',
      value: function attach() {

        this.$stylesheet.appendTo($(document.head));
      }
    }, {
      key: 'detach',
      value: function detach() {

        this.$stylesheet.remove();
      }
    }]);

    return EmbeddedCSS;
  }();

  /* EXPORT */

  Svelto.EmbeddedCSS = new EmbeddedCSS();

  /* READY */

  $(function () {

    Svelto.EmbeddedCSS.attach();
  });
})(Svelto.$, Svelto._, Svelto);

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

(function ($, _, Svelto, Widgets, Factory, Pointer, EmbeddedCSS, Animations) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var Dropdown = function (_Widgets$Widget11) {
    _inherits(Dropdown, _Widgets$Widget11);

    function Dropdown() {
      _classCallCheck(this, Dropdown);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Dropdown).apply(this, arguments));
    }

    _createClass(Dropdown, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$dropdown = this.$element;

        this.$dropdown.addClass(this.guc);

        this.hasTip = !this.$dropdown.hasClass(this.options.classes.noTip);
        this.isAttached = this.$dropdown.hasClass(this.options.classes.attached);

        this._isOpen = false;
      }
    }, {
      key: '_events',
      value: function _events() {

        if (this._isOpen) {

          this.___resize();
          this.___parentsScroll();
          this.___layoutTap();
        }
      }
    }, {
      key: '_destroy',
      value: function _destroy() {

        this.close();
      }

      /* PARENTS SCROLL */

    }, {
      key: '___parentsScroll',
      value: function ___parentsScroll() {

        var $parents = this.$dropdown.parents().add(this.$anchor ? this.$anchor.parents() : undefined).add(this.$window);

        this._on(true, $parents, 'scroll', this._throttle(this._positionate, 100));
      }

      /* RESIZE */

    }, {
      key: '___resize',
      value: function ___resize() {

        this._on(true, this.$window, 'resize', this._throttle(this._positionate, 100)); //FIXME: It should handle a generic parent `resize`-like event, not just on `this.$window`
      }

      /* LAYOUT TAP */

    }, {
      key: '___layoutTap',
      value: function ___layoutTap() {

        this._on(true, this.$layout, Pointer.tap, this.__layoutTap);
      }
    }, {
      key: '__layoutTap',
      value: function __layoutTap(event) {

        if (event === this._openEvent || this.$dropdown.touching({ point: $.eventXY(event) }).length) return;

        this.close();
      }

      /* POSITIONATE */

    }, {
      key: '_positionate',
      value: function _positionate() {

        /* VARIABLES */

        var noTip = this.$anchor && this.$anchor.hasClass(this.options.classes.noTip) || !this.hasTip || this.isAttached,
            spacing = this.isAttached ? this.options.spacing.attached : noTip ? this.options.spacing.noTip : this.options.spacing.normal;

        this.$mockTip = noTip ? false : $('<div>');

        /* POSITIONATE */

        this.$dropdown.positionate(_.extend({
          $anchor: this.$anchor,
          $pointer: this.$mockTip,
          spacing: spacing,
          callbacks: {
            change: this.__positionChange.bind(this)
          }
        }, this.options.positionate));
      }
    }, {
      key: '_toggleAnchorDirectonClass',
      value: function _toggleAnchorDirectonClass(direction, force) {

        if (!this.$anchor) return;

        this.$anchor.toggleClass(_.format(this.options.classes.anchorDirection, direction), force);
      }
    }, {
      key: '__positionChange',
      value: function __positionChange(data) {

        /* ANCHOR CLASS */

        if (this._prevDirection !== data.direction) {

          if (this._prevDirection) {

            this._toggleAnchorDirectonClass(this._prevDirection, false);
          }

          this._toggleAnchorDirectonClass(data.direction, true);

          this._prevDirection = data.direction;
        }

        /* PSEUDO ELEMENT TIP */

        if (this.$mockTip) {

          EmbeddedCSS.set('.' + this.guc + ':before', this.$mockTip.attr('style').slice(0, -1) + ' rotate(45deg)'); //FIXME: Too hacky, expecially that `rotate(45deg)`
        }
      }

      /* API */

    }, {
      key: 'isOpen',
      value: function isOpen() {

        return this._isOpen;
      }
    }, {
      key: 'toggle',
      value: function toggle(force, anchor, event) {

        if (!_.isBoolean(force)) {

          force = anchor && (!this.$anchor || this.$anchor && this.$anchor[0] !== anchor) ? true : this.$prevAnchor || this.$anchor || 'point' in this.options.positionate ? !this._isOpen : false;
        }

        this[force ? 'open' : 'close'](anchor, event);
      }
    }, {
      key: 'open',
      value: function open(anchor, event) {

        /* RESTORING ANCHOR */

        if (!anchor && this.$prevAnchor && !('point' in this.options.positionate)) {

          anchor = this.$prevAnchor[0];
        }

        /* CHECKING */

        if (this._lock || (!anchor || this._isOpen && this.$anchor && anchor === this.$anchor[0]) && !('point' in this.options.positionate)) return;

        /* VARIABLES */

        this._lock = true;
        this._isOpen = true;

        this._openEvent = event;
        this._wasMoving = false;

        /* PREVIOUS ANCHOR */

        if (this.$anchor) {

          this._toggleAnchorDirectonClass(this._prevDirection, false);
          this._prevDirection = false;

          this.$prevAnchor = this.$anchor;

          if (this._isOpen) {

            this._wasMoving = true;

            this.$dropdown.addClass(this.options.classes.moving);
          }
        }

        /* ANCHOR */

        this.$anchor = anchor ? $(anchor) : false;

        /* BEFORE OPENING */

        this._trigger('beforeopen');

        /* OPENING */

        this._frame(function () {

          this.$dropdown.addClass('show');

          this._positionate();

          this._frame(function () {

            this.$dropdown.addClass(this.options.classes.open);

            this._lock = false;

            this._trigger('open');
          });
        });

        /* EVENTS */

        this._reset();

        this.___layoutTap();
        this.___resize();
        this.___parentsScroll();
      }
    }, {
      key: 'close',
      value: function close() {

        if (this._lock || !this._isOpen) return;

        /* VARIABLES */

        this._lock = true;
        this._isOpen = false;

        /* ANCHOR */

        this._toggleAnchorDirectonClass(this._prevDirection, false);
        this._prevDirection = false;

        this.$prevAnchor = this.$anchor;
        this.$anchor = false;

        /* CLOSING */

        this._frame(function () {

          this.$dropdown.removeClass(this.options.classes.open);

          if (this._wasMoving) {

            this.$dropdown.removeClass(this.options.classes.moving);
          }

          this._delay(function () {

            this.$dropdown.removeClass(this.options.classes.show);

            this._lock = false;

            this._trigger('close');
          }, this.options.animations.close);
        });

        /* RESETTING */

        this._reset();
      }
    }]);

    return Dropdown;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Dropdown, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.EmbeddedCSS, Svelto.Animations);

/* =========================================================================
 * Svelto - Dropdown (Closer)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires dropdown.js
 * @requires ../closer/closer.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'dropdownCloser',
    plugin: true,
    selector: '.dropdown-closer',
    options: {
      widget: Widgets.Dropdown
    }
  };

  /* DROPDOWN CLOSER */

  var DropdownCloser = function (_Widgets$Closer) {
    _inherits(DropdownCloser, _Widgets$Closer);

    function DropdownCloser() {
      _classCallCheck(this, DropdownCloser);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(DropdownCloser).apply(this, arguments));
    }

    return DropdownCloser;
  }(Widgets.Closer);

  /* FACTORY */

  Factory.init(DropdownCloser, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Opener
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../closer/closer.js
 * @requires ../browser/browser.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory, Browser, Pointer) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var Opener = function (_Widgets$Closer2) {
    _inherits(Opener, _Widgets$Closer2);

    function Opener() {
      _classCallCheck(this, Opener);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Opener).apply(this, arguments));
    }

    _createClass(Opener, [{
      key: '_events',

      /* SPECIAL */

      value: function _events() {

        this.___tap();
        this.___hover();
      }

      /* TAP */

    }, {
      key: '___tap',
      value: function ___tap() {

        this._on(Pointer.tap, this.__tap);
      }
    }, {
      key: '__tap',
      value: function __tap(event) {

        this.open(event);
      }

      /* HOVER */

    }, {
      key: '___hover',
      value: function ___hover() {

        if (this.options.hover.active && !Browser.is.touchDevice) {

          this._on(Pointer.enter, this.__hoverEnter);
        }
      }
    }, {
      key: '__hoverEnter',
      value: function __hoverEnter() {

        if (!this.isOpen()) {

          this._isHoverOpen = false;

          this._hoverOpenTimeout = this._delay(this.__hoverOpen, this.options.hover.delays.open);

          this._one(true, Pointer.leave, this.__hoverLeave);
        } else if (this._isHoverOpen) {

          if (this._hoverCloseTimeout) {

            clearTimeout(this._hoverCloseTimeout);

            this._hoverCloseTimeout = false;
          }

          this._one(true, Pointer.leave, this.__hoverLeave);
        }
      }
    }, {
      key: '__hoverOpen',
      value: function __hoverOpen() {

        if (!this.isOpen()) {

          this.open();

          this._isHoverOpen = true;
        }

        this._hoverOpenTimeout = false;
      }
    }, {
      key: '__hoverLeave',
      value: function __hoverLeave() {

        if (this._hoverOpenTimeout) {

          clearTimeout(this._hoverOpenTimeout);

          this._hoverOpenTimeout = false;
        }

        if (this.isOpen() && this._isHoverOpen) {

          this._hoverCloseTimeout = this._delay(this.__hoverClose, this.options.hover.delays.close);

          this._one(true, this.$target, Pointer.enter, this.__hoverTargetEnter);
        }
      }
    }, {
      key: '__hoverClose',
      value: function __hoverClose() {

        if (this.isOpen() && this._isHoverOpen) {

          this.close();
        }

        this._isHoverOpen = false;

        this._hoverCloseTimeout = false;

        this._off(this.$target, Pointer.enter, this.__hoverTargetEnter);
      }
    }, {
      key: '__hoverTargetEnter',
      value: function __hoverTargetEnter() {

        if (this._hoverCloseTimeout) {

          clearTimeout(this._hoverCloseTimeout);

          this._hoverCloseTimeout = false;
        }

        if (this.isOpen() && this._isHoverOpen) {

          this._one(true, this.$target, Pointer.leave, this.__hoverTargetLeave);
        }
      }
    }, {
      key: '__hoverTargetLeave',
      value: function __hoverTargetLeave() {

        if (this.isOpen() && this._isHoverOpen) {

          this._hoverCloseTimeout = this._delay(this.__hoverClose, this.options.hover.delays.close);

          this._one(true, this.$target, Pointer.enter, this.__hoverTargetEnter);
        }
      }

      /* API */

    }, {
      key: 'open',
      value: function open(event) {

        return this._targetInstance[this.options.methods.open](this.element, event);
      }
    }]);

    return Opener;
  }(Widgets.Closer);

  /* FACTORY */

  Factory.init(Opener, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Browser, Svelto.Pointer);

/* =========================================================================
 * Svelto - Dropdown (Opener)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires dropdown.js
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'dropdownOpener',
    plugin: true,
    selector: '.dropdown-opener',
    options: {
      widget: Widgets.Dropdown
    }
  };

  /* DROPDOWN OPENER */

  var DropdownOpener = function (_Widgets$Opener) {
    _inherits(DropdownOpener, _Widgets$Opener);

    function DropdownOpener() {
      _classCallCheck(this, DropdownOpener);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(DropdownOpener).apply(this, arguments));
    }

    return DropdownOpener;
  }(Widgets.Opener);

  /* FACTORY */

  Factory.init(DropdownOpener, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Toggler
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'toggler',
    options: {
      methods: {
        toggle: 'toggle'
      }
    }
  };

  /* TOGGLER */

  var Toggler = function (_Widgets$Opener2) {
    _inherits(Toggler, _Widgets$Opener2);

    function Toggler() {
      _classCallCheck(this, Toggler);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Toggler).apply(this, arguments));
    }

    _createClass(Toggler, [{
      key: '__tap',

      /* TAP */

      value: function __tap(event) {

        this.toggle(undefined, event);
      }

      /* API */

    }, {
      key: 'toggle',
      value: function toggle(force, event) {

        return this._targetInstance[this.options.methods.toggle](force, this.element, event);
      }
    }]);

    return Toggler;
  }(Widgets.Opener);

  /* FACTORY */

  Factory.init(Toggler, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Dropdown (Toggler)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires dropdown.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'dropdownToggler',
    plugin: true,
    selector: '.dropdown-toggler',
    options: {
      widget: Widgets.Dropdown
    }
  };

  /* DROPDOWN TOGGLER */

  var DropdownToggler = function (_Widgets$Toggler) {
    _inherits(DropdownToggler, _Widgets$Toggler);

    function DropdownToggler() {
      _classCallCheck(this, DropdownToggler);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(DropdownToggler).apply(this, arguments));
    }

    return DropdownToggler;
  }(Widgets.Toggler);

  /* FACTORY */

  Factory.init(DropdownToggler, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Touching
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../bteach/bteach.js
 * ========================================================================= */

(function ($, _, Svelto) {

  'use strict';

  /* UTILITIES */

  var getOverlappingArea = function getOverlappingArea(rect1, rect2) {

    var overlapX = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left)),
        overlapY = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));

    return overlapX * overlapY;
  };

  /* DEFAULT OPTIONS */

  var defaults = {
    startIndex: false, // Useful for speeding up the searching process if we may already guess the initial position...
    point: false, // Used for the punctual search
    binarySearch: true, // toggle the binary search when performing a punctual search
    $comparer: false, // Used for the overlapping search
    $not: false,
    onlyBest: false
  };

  /* TOUCHING */

  $.fn.touching = function (options) {

    /* OPTIONS */

    options = _.extend({}, $.fn.touching.defaults, options);

    /* SEARCHABLE */

    var $searchable = options.$not ? this.not(options.$not) : this;

    /* COMPARER */

    if (options.$comparer) {

      var rect1 = options.$comparer.getRect(),
          nodes = [],
          areas = [];

      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = $searchable[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var searchable = _step8.value;

          var rect2 = $.getRect(searchable),
              area = getOverlappingArea(rect1, rect2);

          if (area > 0) {

            nodes.push(searchable);
            areas.push(area);
          }
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      return options.onlyBest ? $(nodes[areas.indexOf(_.max(areas))]) : $(nodes);
    }

    /* PUNCTUAL */

    if (options.point) {

      var $touched = undefined;

      if (options.binarySearch) {

        $searchable.btEach(function () {

          var rect = $.getRect(this);

          if (options.point.Y >= rect.top) {

            if (options.point.Y <= rect.bottom) {

              if (options.point.X >= rect.left) {

                if (options.point.X <= rect.right) {

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
        }, options.startIndex);

        return $touched || $();
      } else {
        var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {

          for (var _iterator9 = $searchable[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var searchable = _step9.value;

            var rect = $.getRect(searchable);

            if (options.point.Y >= rect.top && options.point.Y <= rect.bottom && options.point.X >= rect.left && options.point.X <= rect.right) {

              $touched = $(searchable);

              break;
            }
          }
        } catch (err) {
          _didIteratorError9 = true;
          _iteratorError9 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion9 && _iterator9.return) {
              _iterator9.return();
            }
          } finally {
            if (_didIteratorError9) {
              throw _iteratorError9;
            }
          }
        }

        return $touched || $();
      }
    }
  };

  /* BINDING */

  $.fn.touching.defaults = defaults;
})(Svelto.$, Svelto._, Svelto);

/* =========================================================================
 * Svelto - Droppable
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * @requires ../touching/touching.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var Droppable = function (_Widgets$Widget12) {
    _inherits(Droppable, _Widgets$Widget12);

    function Droppable() {
      _classCallCheck(this, Droppable);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Droppable).apply(this, arguments));
    }

    _createClass(Droppable, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.droppable = this.element;
        this.$droppable = this.$element;

        this.__isCompatible = undefined;
        this._wasHovering = false;
      }
    }, {
      key: '_events',
      value: function _events() {

        this.___drag();
      }

      /* PRIVATE */

    }, {
      key: '_isCompatible',
      value: function _isCompatible(element) {

        if (_.isUndefined(this.__isCompatible)) {

          this.__isCompatible = $(element).is(this.options.selector);

          if (this.__isCompatible) {

            this.$droppable.addClass(this.options.classes.target);
          }
        }

        return this.__isCompatible;
      }
    }, {
      key: '_isPointHovering',
      value: function _isPointHovering(pointXY) {

        return !!this.$droppable.touching({ point: pointXY }).length;
      }

      /* DRAG */

    }, {
      key: '___drag',
      value: function ___drag() {

        this.___dragMove();
        this.___dragEnd();
      }

      /* DRAG MOVE */

    }, {
      key: '___dragMove',
      value: function ___dragMove() {

        this._on(this.$layout, 'draggable:move', this._throttle(this.__dragMove, 100));
      }
    }, {
      key: '__dragMove',
      value: function __dragMove(event, data) {

        if (this._isCompatible(data.draggable)) {

          var isHovering = this._isPointHovering(data.moveXY);

          if (isHovering !== this._wasHovering) {

            this.$droppable.toggleClass(this.options.classes.hover, isHovering);

            this._trigger(isHovering ? 'enter' : 'leave', { draggable: data.draggable, helper: data.helper, droppable: this.droppable });
          }

          this._wasHovering = isHovering;
        }
      }

      /* DRAG END */

    }, {
      key: '___dragEnd',
      value: function ___dragEnd() {

        this._on(this.$layout, 'draggable:end', this.__dragEnd);
      }
    }, {
      key: '__dragEnd',
      value: function __dragEnd(event, data) {

        if (this._isCompatible(data.draggable)) {

          this.$droppable.removeClass(this.options.classes.target);

          if (this._isPointHovering(data.endXY)) {

            if (this._wasHovering) {

              this.$droppable.removeClass(this.options.classes.hover);
            }

            this._trigger('drop', { draggable: data.draggable, helper: data.helper, droppable: this.droppable });
          }
        }

        this.__isCompatible = undefined;
      }
    }]);

    return Droppable;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Droppable, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Expander (Closer)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires expander.js
 * @requires ../closer/closer.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'expanderCloser',
    plugin: true,
    selector: '.expander-closer',
    options: {
      widget: Widgets.Expander
    }
  };

  /* EXPANDER CLOSER */

  var ExpanderCloser = function (_Widgets$Closer3) {
    _inherits(ExpanderCloser, _Widgets$Closer3);

    function ExpanderCloser() {
      _classCallCheck(this, ExpanderCloser);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(ExpanderCloser).apply(this, arguments));
    }

    return ExpanderCloser;
  }(Widgets.Closer);

  /* FACTORY */

  Factory.init(ExpanderCloser, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Expander (Opener)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires expander.js
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'expanderOpener',
    plugin: true,
    selector: '.expander-opener',
    options: {
      widget: Widgets.Expander
    }
  };

  /* EXPANDER OPENER */

  var ExpanderOpener = function (_Widgets$Opener3) {
    _inherits(ExpanderOpener, _Widgets$Opener3);

    function ExpanderOpener() {
      _classCallCheck(this, ExpanderOpener);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(ExpanderOpener).apply(this, arguments));
    }

    return ExpanderOpener;
  }(Widgets.Opener);

  /* FACTORY */

  Factory.init(ExpanderOpener, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Expander (Toggler)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires expander.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'expanderToggler',
    plugin: true,
    selector: '.expander-toggler',
    options: {
      widget: Widgets.Expander
    }
  };

  /* EXPANDER TOGGLER */

  var ExpanderToggler = function (_Widgets$Toggler2) {
    _inherits(ExpanderToggler, _Widgets$Toggler2);

    function ExpanderToggler() {
      _classCallCheck(this, ExpanderToggler);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(ExpanderToggler).apply(this, arguments));
    }

    return ExpanderToggler;
  }(Widgets.Toggler);

  /* FACTORY */

  Factory.init(ExpanderToggler, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Flickable
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory, Pointer) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var Flickable = function (_Widgets$Widget13) {
    _inherits(Flickable, _Widgets$Widget13);

    function Flickable() {
      _classCallCheck(this, Flickable);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Flickable).apply(this, arguments));
    }

    _createClass(Flickable, [{
      key: '_events',

      /* SPECIAL */

      value: function _events() {

        this.___down();
      }

      /* DOWN */

    }, {
      key: '___down',
      value: function ___down() {

        this._on(Pointer.down, this.__down);
      }
    }, {
      key: '__down',
      value: function __down(event) {

        this._startXY = $.eventXY(event);
        this._startTimestamp = event.timeStamp || Date.now();

        this._motion = false;

        this.___move();
        this.___up();
        this.___cancel();
      }

      /* MOVE */

    }, {
      key: '___move',
      value: function ___move() {

        this._one(true, this.$document, Pointer.move, this.__move);
      }
    }, {
      key: '__move',
      value: function __move() {

        this._motion = true;
      }

      /* UP */

    }, {
      key: '___up',
      value: function ___up() {

        this._one(true, this.$document, Pointer.up, this.__up);
      }
    }, {
      key: '__up',
      value: function __up(event) {

        this._endTimestamp = event.timeStamp || Date.now();

        if (this._motion && this._endTimestamp - this._startTimestamp <= this.options.duration) {

          var endXY = $.eventXY(event),
              deltaXY = {
            X: endXY.X - this._startXY.X,
            Y: endXY.Y - this._startXY.Y
          },
              absDeltaXY = {
            X: Math.abs(deltaXY.X),
            Y: Math.abs(deltaXY.Y)
          };

          if (absDeltaXY.X >= this.options.threshold || absDeltaXY.Y >= this.options.threshold) {

            var orientation = undefined,
                direction = undefined;

            if (absDeltaXY.X > absDeltaXY.Y) {

              orientation = 'horizontal';
              direction = deltaXY.X > 0 ? 'right' : 'left';
            } else {

              orientation = 'vertical';
              direction = deltaXY.Y > 0 ? 'bottom' : 'top';
            }

            this._trigger('flick', {
              orientation: orientation,
              direction: direction,
              startEvent: this._startEvent,
              startXY: this._startXY,
              endEvent: event,
              endXY: endXY
            });
          }
        }

        if (!this._motion) {

          this._off(this.$document, Pointer.move, this.__move);
        }

        this._off(this.$document, Pointer.cancel, this.__cancel);
      }

      /* CANCEL */

    }, {
      key: '___cancel',
      value: function ___cancel() {

        this._one(true, this.$document, Pointer.cancel, this.__cancel);
      }
    }, {
      key: '__cancel',
      value: function __cancel() {

        if (!this._motion) {

          this._off(this.$document, Pointer.move, this.__move);
        }

        this._off(this.$document, Pointer.up, this.__up);
      }
    }]);

    return Flickable;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Flickable, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer);

/* =========================================================================
 * Svelto - Flippable
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var Flippable = function (_Widgets$Widget14) {
    _inherits(Flippable, _Widgets$Widget14);

    function Flippable() {
      _classCallCheck(this, Flippable);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Flippable).apply(this, arguments));
    }

    _createClass(Flippable, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$flippable = this.$element;

        this._isFlipped = this.$flippable.hasClass(this.options.classes.flip);
      }

      /* API */

    }, {
      key: 'isFlipped',
      value: function isFlipped() {

        return this._isFlipped;
      }
    }, {
      key: 'flip',
      value: function flip() {
        var force = arguments.length <= 0 || arguments[0] === undefined ? !this._isFlipped : arguments[0];

        if (!!force !== this._isFlipped) {

          this._isFlipped = force;

          this.$flippable.toggleClass(this.options.classes.flip, this._isFlipped);

          this._trigger(this._isFlipped ? 'back' : 'front');
        }
      }
    }, {
      key: 'front',
      value: function front() {

        this.flip(false);
      }
    }, {
      key: 'back',
      value: function back() {

        this.flip(true);
      }
    }]);

    return Flippable;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Flippable, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Flippable (Flipper)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires flippable.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var FlippableFlipper = function (_Widgets$Toggler3) {
    _inherits(FlippableFlipper, _Widgets$Toggler3);

    function FlippableFlipper() {
      _classCallCheck(this, FlippableFlipper);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(FlippableFlipper).apply(this, arguments));
    }

    return FlippableFlipper;
  }(Widgets.Toggler);

  /* FACTORY */

  Factory.init(FlippableFlipper, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Overlay
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * @requires ../animations/animations.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory, Animations) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var Overlay = function (_Widgets$Widget15) {
    _inherits(Overlay, _Widgets$Widget15);

    function Overlay() {
      _classCallCheck(this, Overlay);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Overlay).apply(this, arguments));
    }

    _createClass(Overlay, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$overlay = this.$element;

        this._isOpen = this.$overlay.hasClass(this.options.classes.open);
      }
    }, {
      key: '_events',
      value: function _events() {

        if (this._isOpen) {

          this.___keydown();
        }
      }

      /* KEYDOWN */

    }, {
      key: '___keydown',
      value: function ___keydown() {

        this._onHover(true, [this.$document, 'keydown', this.__keydown]); //FIXME: Using _onHover in an undocumented way, the first value was supposed to be $element
      }

      /* API */

    }, {
      key: 'isOpen',
      value: function isOpen() {

        return this._isOpen;
      }
    }, {
      key: 'toggle',
      value: function toggle() {
        var force = arguments.length <= 0 || arguments[0] === undefined ? !this._isOpen : arguments[0];

        if (!!force !== this._isOpen) {

          this[force ? 'open' : 'close']();
        }
      }
    }, {
      key: 'open',
      value: function open() {

        if (this._lock || this._isOpen) return;

        this._lock = true;
        this._isOpen = true;

        this._frame(function () {

          this.$overlay.addClass(this.options.classes.show);

          this._frame(function () {

            this.$overlay.addClass(this.options.classes.open);

            this._lock = false;

            this._trigger('open');
          });
        });

        this.___keydown();
      }
    }, {
      key: 'close',
      value: function close() {

        if (this._lock || !this._isOpen) return;

        this._lock = true;
        this._isOpen = false;

        this._frame(function () {

          this.$overlay.removeClass(this.options.classes.open);

          this._delay(function () {

            this.$overlay.removeClass(this.options.classes.show);

            this._lock = false;

            this._trigger('close');
          }, this.options.animations.close);
        });

        this._reset();
      }
    }]);

    return Overlay;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Overlay, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Animations);

/* =========================================================================
 * Svelto - Spinner Overlay
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../overlay/overlay.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'spinnerOverlay',
    plugin: true,
    templates: {
      overlay: '<div class="overlay spinner-overlay {%=(o.dimmer ? "dimmer" : "")%} {%=(o.blurrer ? "blurrer" : "")%}">' + '{% if ( o.labeled ) { %}' + '<div class="spinner-label {%=(o.multicolor ? "" : o.colors.labeled)%}">' + '{% } %}' + '<svg class="spinner {%=(o.multicolor ? "multicolor" : ( o.labeled ? "" : o.unlabeled ))%}">' + '<circle cx="1.625em" cy="1.625em" r="1.25em">' + '</svg>' + '{% if ( o.labeled ) { %}' + '</div>' + '{% } %}' + '</div>'
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

  var SpinnerOverlay = function (_Widgets$Widget16) {
    _inherits(SpinnerOverlay, _Widgets$Widget16);

    function SpinnerOverlay() {
      _classCallCheck(this, SpinnerOverlay);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(SpinnerOverlay).apply(this, arguments));
    }

    _createClass(SpinnerOverlay, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$overlayed = this.$element;
        this.$overlay = $(this._tmpl('overlay', this.options));

        this.instance = this.$overlay.overlay('instance');
      }

      /* API */

    }, {
      key: 'isOpen',
      value: function isOpen() {

        return this.instance.isOpen();
      }
    }, {
      key: 'toggle',
      value: function toggle() {
        var force = arguments.length <= 0 || arguments[0] === undefined ? !this.isOpen() : arguments[0];

        if (!!force !== this.isOpen()) {

          this[force ? 'open' : 'close']();
        }
      }
    }, {
      key: 'open',
      value: function open() {

        if (this._lock || this.isOpen()) return;

        this.$overlay.prependTo(this.$overlayed);

        this.instance.open();

        this._trigger('open');
      }
    }, {
      key: 'close',
      value: function close() {

        if (this._lock || !this.isOpen()) return;

        this._lock = true;

        this.instance.close();

        this._delay(function () {

          this.$overlay.detach();

          this._lock = false;

          this._trigger('close');
        }, Widgets.Overlay.config.options.animations.close);
      }
    }]);

    return SpinnerOverlay;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(SpinnerOverlay, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

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

(function ($, _, Svelto, Widgets, Factory, Pointer, Timer, Animations) {

  'use strict';

  /* VARIABLES */

  var openNotiesData = {};

  /* CONFIG */

  var config = {
    name: 'noty',
    plugin: true,
    selector: '.noty',
    templates: {
      base: '<div class="noty {%=o.type%} {%=(o.type !== "action" ? "actionable" : "")%} {%=o.color%} {%=o.css%}">' + '<div class="infobar">' + '{% if ( o.img ) { %}' + '<img src="{%=o.img%}" class="noty-img infobar-left">' + '{% } %}' + '{% if ( o.title || o.body ) { %}' + '<div class="infobar-center">' + '{% if ( o.title ) { %}' + '<p class="infobar-title">' + '{%#o.title%}' + '</p>' + '{% } %}' + '{% if ( o.body ) { %}' + '{%#o.body%}' + '{% } %}' + '</div>' + '{% } %}' + '{% if ( o.buttons.length === 1 ) { %}' + '<div class="infobar-right">' + '{% include ( "noty.button", o.buttons[0] ); %}' + '</div>' + '{% } %}' + '</div>' + '{% if ( o.buttons.length > 1 ) { %}' + '<div class="noty-buttons multiple centered">' + '{% for ( var i = 0; i < o.buttons.length; i++ ) { %}' + '{% include ( "noty.button", o.buttons[i] ); %}' + '{% } %}' + '</div>' + '{% } %}' + '</div>',
      button: '<div class="button {%=(o.color || "white")%} {%=(o.size || "small")%} {%=(o.css || "")%}">' + '{%#(o.text || "")%}' + '</div>'
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

  /* NOTY */

  var Noty = function (_Widgets$Widget17) {
    _inherits(Noty, _Widgets$Widget17);

    function Noty() {
      _classCallCheck(this, Noty);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Noty).apply(this, arguments));
    }

    _createClass(Noty, [{
      key: '_variables',
      value: function _variables() {

        this.$noty = this.$element;
        this.$buttons = this.$noty.find(this.options.selectors.button);

        this.timer = false;
        this._openUrl = false;

        this._isOpen = this.$noty.hasClass(this.options.classes.open);
      }
    }, {
      key: '_init',
      value: function _init() {

        if (this._isOpen) {

          this.___timer();
          this.___tap();
          this.___flick();
          this.___buttonTap();
          this.___hover();
          this.___persistent();
          this.___keydown();
          this.___breakpoint();
        } else if (this.options.autoplay) {

          this.open();
        }
      }

      /* PRIVATE */

    }, {
      key: '_getUrl',
      value: function _getUrl() {

        return window.location.href.split('#')[0];
      }

      /* TIMER */

    }, {
      key: '___timer',
      value: function ___timer() {

        if (this.options.type !== 'action' && _.isNumber(this.options.ttl) && !_.isNaN(this.options.ttl) && this.options.ttl !== Infinity) {

          if (!this.timer) {

            this.timer = new Timer(this.close.bind(this), this.options.ttl, true);
          } else {

            this.timer.reset();
          }

          openNotiesData[this.guid] = [this.timer, this.options.ttlMinimumRemaining];
        }
      }

      /* TAP */

    }, {
      key: '___tap',
      value: function ___tap() {

        if (this.options.type !== 'action') {

          this._on(Pointer.tap, this.__tap);
        }
      }
    }, {
      key: '__tap',
      value: function __tap(event) {

        event.preventDefault(); // Otherwise the click goes through the noty in Chrome for iOS

        this.close();
      }

      /* BUTTON TAP */

    }, {
      key: '___buttonTap',
      value: function ___buttonTap() {

        this._on(this.$buttons, Pointer.tap, this.__buttonTap);
      }
    }, {
      key: '__buttonTap',
      value: function __buttonTap(event, data) {

        var $button = $(event.target),
            index = this.$buttons.index($button),
            buttonObj = this.options.buttons[index];

        if (buttonObj.onClick) {

          if (buttonObj.onClick.apply($button[0], [event, data]) === false) return;
        }

        this.close();
      }

      /* HOVER */

    }, {
      key: '___hover',
      value: function ___hover() {

        this.$noty.hover(function () {

          _.forIn(openNotiesData, function (data) {
            return data[0].pause();
          });
        }, function () {

          _.forIn(openNotiesData, function (data) {
            return data[0].remaining(Math.max(data[1], data[0].remaining())).play();
          });
        });
      }

      /* FLICK */

    }, {
      key: '___flick',
      value: function ___flick() {

        if (this.options.type !== 'action') {

          this.$noty.flickable({
            callbacks: {
              flick: this.__flick.bind(this)
            }
          });
        }
      }
    }, {
      key: '__flick',
      value: function __flick(event, data) {

        if (data.orientation === 'horizontal') {

          this.close();
        }
      }

      /* PERSISTENT */

    }, {
      key: '___persistent',
      value: function ___persistent() {

        if (!this.options.persistent) {

          _get(Object.getPrototypeOf(Noty.prototype), '___route', this).call(this);
        }
      }
    }, {
      key: '__route',
      value: function __route() {

        var currentUrl = this._getUrl();

        if (this._openUrl && this._openUrl !== currentUrl) {

          this.close();
        }
      }

      /* RESET */

    }, {
      key: '_reset',
      value: function _reset() {

        /* TIMER */

        delete openNotiesData[this.guid];

        /* FLICK */

        this.$noty.flickable('destroy');

        /* SUPER */

        _get(Object.getPrototypeOf(Noty.prototype), '_reset', this).call(this);
      }

      /* API */

    }, {
      key: 'isOpen',
      value: function isOpen() {

        return this._isOpen;
      }
    }, {
      key: 'open',
      value: function open() {

        if (this._lock || this._isOpen) return;

        this._lock = true;
        this._isOpen = true;

        this._frame(function () {

          $(this.options.selectors.queues + '.' + this.options.anchor.y + ' ' + this.options.selectors.queue + '.' + this.options.anchor.x).append(this.$noty);

          this._frame(function () {

            this.$noty.addClass(this.options.classes.open);

            this._lock = false;

            this._trigger('open');
          });
        });

        this.___timer();
        this.___tap();
        this.___flick();
        this.___buttonTap();
        this.___hover();
        this.___persistent();
        this.___keydown();
        this.___breakpoint();

        this._defer(function () {

          this._openUrl = this._getUrl();
        });
      }
    }, {
      key: 'close',
      value: function close() {

        if (this._lock || !this._isOpen) return;

        this._lock = true;
        this._isOpen = false;
        this._openUrl = false;

        this._frame(function () {

          this.$noty.removeClass(this.options.classes.open);

          this._delay(function () {

            this.$noty.remove();

            this._lock = false;

            this._trigger('close');
          }, this.options.animations.close);
        });

        this._reset();
      }
    }], [{
      key: 'ready',

      /* SPECIAL */

      value: function ready() {

        $('.layout, body').first().append( //TODO: Use just `.layout`
        '<div class="noty-queues top">' + '<div class="noty-queue expanded"></div>' + '<div class="noty-queues-row">' + '<div class="noty-queue left"></div>' + '<div class="noty-queue center"></div>' + '<div class="noty-queue right"></div>' + '</div>' + '</div>' + '<div class="noty-queues bottom">' + '<div class="noty-queues-row">' + '<div class="noty-queue left"></div>' + '<div class="noty-queue center"></div>' + '<div class="noty-queue right"></div>' + '</div>' + '<div class="noty-queue expanded"></div>' + '</div>');
      }
    }]);

    return Noty;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Noty, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Timer, Svelto.Animations);

/* =========================================================================
 * Svelto - Regexes
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function ($, _, Svelto) {

  'use strict';

  /* REGEXES */

  var Regexes = {

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
})(Svelto.$, Svelto._, Svelto);

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

(function ($, _, Svelto, Regexes) {

  'use strict';

  /* VALIDATOR */

  var Validator = {

    /* TYPE */

    alpha: function alpha(value) {
      return !!value.match(Regexes.alpha);
    },
    alphanumeric: function alphanumeric(value) {
      return !!value.match(Regexes.alphanumeric);
    },
    hexadecimal: function hexadecimal(value) {
      return !!value.match(Regexes.hexadecimal);
    },
    number: function number(value) {
      return !!value.match(Regexes.integer) || !!value.match(Regexes.float);
    },
    integer: function integer(value) {
      return !!value.match(Regexes.integer);
    },
    float: function float(value) {
      return !!value.match(Regexes.float);
    },

    /* NUMBER */

    min: function min(value, _min) {
      return Number(value) >= Number(_min);
    },
    max: function max(value, _max) {
      return Number(value) <= Number(_max);
    },
    range: function range(value, min, max) {
      value = Number(value);
      return value >= Number(min) && value <= Number(max);
    },

    /* LENGTH */

    minLength: function minLength(value, _minLength) {
      return value.trim().length >= Number(_minLength);
    },
    maxLength: function maxLength(value, _maxLength) {
      return value.trim().length <= Number(_maxLength);
    },
    rangeLength: function rangeLength(value, minLength, maxLength) {
      value = value.trim();
      return value.length >= Number(minLength) && value.length <= Number(maxLength);
    },
    exactLength: function exactLength(value, length) {
      return value.trim().length === Number(length);
    },

    /* THINGS */

    email: function email(value) {
      return !!value.match(Regexes.email);
    },
    cc: function cc(value) {
      return !!value.match(Regexes.cc);
    },
    ssn: function ssn(value) {
      return !!value.match(Regexes.ssn);
    },
    ipv4: function ipv4(value) {
      return !!value.match(Regexes.ipv4);
    },
    url: function url(value) {
      return !!value.match(Regexes.url);
    },

    /* OTHERS */

    empty: function empty(value) {
      return _.isEmpty(value.trim());
    },
    included: function included(value, values) {
      value = value.toLowerCase();
      values = values.map(function (value) {
        return value.toLowerCase();
      });
      return _.includes(values, value);
    }
  };

  /* EXPORT */

  Svelto.Validator = Validator;
})(Svelto.$, Svelto._, Svelto, Svelto.Regexes);

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

(function ($, _, Svelto, Widgets, Factory, Validator) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'formValidate',
    plugin: true,
    selector: 'form.validate',
    templates: {
      message: '<p class="form-validate-message {%=o.validity%}">' + '{%=o.message%}' + '</p>',
      messages: '<ul class="form-validate-message {%=o.validity%}">' + '{% for ( var i = 0, l = o.messages.length; i < l; i++ ) { %}' + '<li>{%=o.messages[i]%}</li>' + '{% } %}' + '</ul>'
    },
    options: {
      validators: { // If not found here it will use `Validator`'s validators

        required: function required(value) {
          return !Validator.empty(value);
        },
        values: function values(value) {
          for (var _len5 = arguments.length, _values = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
            _values[_key5 - 1] = arguments[_key5];
          }

          return Validator.included(value, _values);
        },
        field: function field(value, fieldName) {
          var fieldValue = _.find(this.elements, { name: fieldName }).value;
          return value === fieldValue;
        },
        checked: function checked() {
          return this.element.$element.prop('checked');
        }
      },
      messages: {
        form: {
          invalid: 'The form contains some errors'
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

  var FormValidate = function (_Widgets$Widget18) {
    _inherits(FormValidate, _Widgets$Widget18);

    function FormValidate() {
      _classCallCheck(this, FormValidate);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(FormValidate).apply(this, arguments));
    }

    _createClass(FormValidate, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$form = this.$element;
        this.$elements = this.$form.find(this.options.selectors.element);
        this.$textfields = this.$elements.filter(this.options.selectors.textfield);

        this.___elements();
      }
    }, {
      key: '_events',
      value: function _events() {

        this.___change();
        this.___focus();
        this.___blur();
        this.___submit();
      }

      /* ELEMENTS */

    }, {
      key: '___elements',
      value: function ___elements() {

        this.elements = {};

        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
          for (var _iterator10 = this.$elements[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var element = _step10.value;

            var $element = $(element),
                $wrappers = $element.parents(this.options.selectors.wrapper),
                $wrapper = $wrappers.length ? $wrappers.first() : $element,
                id = $.guid++,
                validationsStr = $element.data(this.options.datas.validations),
                validations = false;

            if (validationsStr) {

              validations = {};

              var validationsArr = validationsStr.split(this.options.characters.separators.validations);

              var _iteratorNormalCompletion11 = true;
              var _didIteratorError11 = false;
              var _iteratorError11 = undefined;

              try {
                for (var _iterator11 = validationsArr[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                  var validationStr = _step11.value;

                  var matches = validationStr.match(this.options.regexes.validation);

                  if (!matches) continue;

                  var validationName = matches[1],
                      validationArgs = matches[2] ? matches[2].split(this.options.characters.separators.arguments) : [],
                      validator = this.options.validators[validationName] || Validator[validationName];

                  if (!validator) continue;

                  validations[validationName] = {
                    args: validationArgs,
                    validator: validator
                  };
                }
              } catch (err) {
                _didIteratorError11 = true;
                _iteratorError11 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion11 && _iterator11.return) {
                    _iterator11.return();
                  }
                } finally {
                  if (_didIteratorError11) {
                    throw _iteratorError11;
                  }
                }
              }

              if (_.isEmpty(validations)) {

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
              value: $element.val(),
              validations: validations,
              isDirty: false,
              isValid: undefined,
              messages: {
                invalid: $wrapper.data(this.options.datas.messages.invalid),
                valid: $wrapper.data(this.options.datas.messages.valid)
              }
            };
          }
        } catch (err) {
          _didIteratorError10 = true;
          _iteratorError10 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion10 && _iterator10.return) {
              _iterator10.return();
            }
          } finally {
            if (_didIteratorError10) {
              throw _iteratorError10;
            }
          }
        }
      }

      /* CHANGE */

    }, {
      key: '___change',
      value: function ___change() {

        this._on(true, this.$elements, 'change', this.__change);
      }
    }, {
      key: '__change',
      value: function __change(event) {

        /* FORM */

        this._isValid = undefined;

        /* ELEMENT */

        var elementObj = this.elements[event.currentTarget[this.options.datas.id]];

        elementObj.isDirty = true;
        elementObj.isValid = undefined;

        this._validateWorker(elementObj);

        /* OTHERS */

        for (var id in this.elements) {

          if (this.elements.hasOwnProperty(id)) {

            if (id === elementObj.id) continue;

            var otherElementObj = this.elements[id],
                isDepending = otherElementObj.validations && 'field' in otherElementObj.validations && otherElementObj.validations.field.args.indexOf(elementObj.name) !== -1,
                hasSameName = !_.isEmpty(elementObj.name) && otherElementObj.name === elementObj.name;

            if (isDepending || hasSameName) {

              otherElementObj.isValid = undefined;

              this._validateWorker(otherElementObj);
            }
          }
        }
      }

      /* FOCUS */

    }, {
      key: '___focus',
      value: function ___focus() {

        this._on(this.$textfields, 'focus', this.__focus);
      }
    }, {
      key: '__focus',
      value: function __focus(event) {

        var elementObj = this.elements[event.currentTarget[this.options.datas.id]];

        elementObj.isValid = undefined;

        this.__indeterminate(elementObj);
      }

      /* BLUR */

    }, {
      key: '___blur',
      value: function ___blur() {

        this._on(this.$textfields, 'blur', this.__blur);
      }
    }, {
      key: '__blur',
      value: function __blur(event) {

        var elementObj = this.elements[event.currentTarget[this.options.datas.id]];

        this._validateWorker(elementObj);
      }

      /* SUBMIT */

    }, {
      key: '___submit',
      value: function ___submit() {

        this._on(true, 'submit', this.__submit);
      }
    }, {
      key: '__submit',
      value: function __submit(event) {

        if (!this.isValid()) {

          event.preventDefault();
          event.stopImmediatePropagation();

          $.noty(this.options.messages.form.invalid);
        }
      }

      /* VALIDATION */

    }, {
      key: '_validateWorker',
      value: function _validateWorker(elementObj) {

        if (_.isUndefined(elementObj.isValid)) {

          var result = this._validate(elementObj),
              isValid = result === true;

          elementObj.isValid = isValid;

          if (isValid) {

            this.__valid(elementObj);
          } else {

            this.__invalid(elementObj, result);
          }
        }
      }
    }, {
      key: '_validate',
      value: function _validate(elementObj) {

        var errors = [],
            validations = elementObj.validations;

        if (elementObj.isDirty) {

          elementObj.value = elementObj.$element.val();

          elementObj.isDirty = false;
        }

        if (validations) {

          for (var name in validations) {

            if (validations.hasOwnProperty(name)) {

              var validation = validations[name],
                  isValid = validation.validator.apply({ elements: this.elements, element: elementObj }, [elementObj.value].concat(validation.args));

              if (!isValid) {

                var error = _.format.apply(_, [this.options.messages.validators.invalid[name] || this.options.messages.validators.invalid.general, elementObj.value].concat(_toConsumableArray(validation.args)));

                errors.push(error);
              }
            }
          }
        }

        return _.isEmpty(errors) ? true : errors;
      }

      /* STATE */

    }, {
      key: '__indeterminate',
      value: function __indeterminate(elementObj) {

        elementObj.$wrapper.removeClass(this.options.classes.invalid + ' ' + this.options.classes.valid);

        this._updateMessage(elementObj, false);
      }
    }, {
      key: '__valid',
      value: function __valid(elementObj) {

        elementObj.$wrapper.removeClass(this.options.classes.invalid).addClass(this.options.classes.valid);

        this._updateMessage(elementObj, elementObj.messages.valid);
      }
    }, {
      key: '__invalid',
      value: function __invalid(elementObj, errors) {

        elementObj.$wrapper.removeClass(this.options.classes.valid).addClass(this.options.classes.invalid);

        this._updateMessage(elementObj, elementObj.messages.invalid || errors);
      }

      /* ERRORS */

    }, {
      key: '_updateMessage',
      value: function _updateMessage(elementObj, message) {

        if (elementObj.$message) {

          elementObj.$message.remove();
        }

        if (message) {

          var validity = elementObj.isValid ? this.options.classes.valid : this.options.classes.invalid,
              msgHtml = _.isString(message) ? this._tmpl('message', { message: message, validity: validity }) : message.length === 1 ? this._tmpl('message', { message: message[0], validity: validity }) : this._tmpl('messages', { messages: message, validity: validity });

          elementObj.$message = $(msgHtml);

          elementObj.$wrapper.after(elementObj.$message);
        } else {

          elementObj.$message = false;
        }
      }

      /* API */

    }, {
      key: 'isValid',
      value: function isValid() {

        if (_.isUndefined(this._isValid)) {

          for (var id in this.elements) {

            if (this.elements.hasOwnProperty(id)) {

              var elementObj = this.elements[id];

              if (_.isUndefined(elementObj.isValid)) {

                this._validateWorker(elementObj);
              }

              if (!elementObj.isValid) {

                this._isValid = false;
              }
            }
          }

          if (_.isUndefined(this._isValid)) {

            this._isValid = true;
          }
        }

        return this._isValid;
      }
    }]);

    return FormValidate;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(FormValidate, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Validator);

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

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var FormAjax = function (_Widgets$Widget19) {
    _inherits(FormAjax, _Widgets$Widget19);

    function FormAjax() {
      _classCallCheck(this, FormAjax);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(FormAjax).apply(this, arguments));
    }

    _createClass(FormAjax, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.form = this.element;
        this.$form = this.$element;
      }
    }, {
      key: '_events',
      value: function _events() {

        this.___submit();
      }

      /* PRIVATE */

    }, {
      key: '___submit',
      value: function ___submit() {

        this._on(true, 'submit', this.__submit);
      }
    }, {
      key: '__submit',
      value: function __submit(event) {
        var _this36 = this;

        event.preventDefault();
        event.stopImmediatePropagation();

        $.ajax({

          cache: false,
          contentType: false,
          data: new FormData(this.form),
          processData: false,
          timeout: this.options.timeout,
          type: this.$form.attr('method') || 'POST',
          url: this.$form.attr('action'),

          beforeSend: function beforeSend() {

            if (_this36.options.spinnerOverlay) {

              _this36.$form.spinnerOverlay('open');
            }

            _this36._trigger('beforesend');
          },

          error: function error(res) {

            var resj = _.attempt(JSON.parse, res);

            if (!_.isError(resj)) {

              $.noty(resj.msg || _this36.options.messages.error);
            } else {

              $.noty(_this36.options.messages.error);
            }

            _this36._trigger('error');
          },

          success: function success(res) {

            var resj = _.attempt(JSON.parse, res);

            if (!_.isError(resj)) {

              if (resj.refresh || resj.url === window.location.href || _.trim(resj.url, '/') === _.trim(window.location.pathname, '/')) {

                $.noty(resj.msg || _this36.options.messages.refreshing);

                location.reload();
              } else if (resj.url) {

                // In order to redirect to another domain the protocol must be provided. For instance `http://www.domain.tld` will work while `www.domain.tld` won't

                $.noty(resj.msg || _this36.options.messages.redirecting);

                location.assign(resj.url);
              } else {

                $.noty(resj.msg || _this36.options.messages.success);
              }
            } else {

              $.noty(_this36.options.messages.success);
            }

            _this36._trigger('success');
          },

          complete: function complete() {

            if (_this36.options.spinnerOverlay) {

              _this36.$form.spinnerOverlay('close');
            }

            _this36._trigger('complete');
          }

        });
      }
    }]);

    return FormAjax;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(FormAjax, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Form Sync
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

//TODO: Maybe add the ability to trigger a sync when widgetizing a new form in the group, so that if we are appending a new one it gets synced (as a base or not, if not maybe we can get a data-target or the first of othe others in the group as a base)

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var FormSync = function (_Widgets$Widget20) {
    _inherits(FormSync, _Widgets$Widget20);

    function FormSync() {
      _classCallCheck(this, FormSync);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(FormSync).apply(this, arguments));
    }

    _createClass(FormSync, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$form = this.$element;
        this.$elements = this.$form.find(this.options.selectors.elements);

        this.group = this.$form.data(this.options.datas.group);
      }
    }, {
      key: '_events',
      value: function _events() {

        this.___change();
        this.___input();
      }

      /* CHANGE */

    }, {
      key: '___change',
      value: function ___change() {

        this._on(true, this.$elements, 'change', this._debounce(this.__sync, 100));
      }

      /* INPUT */

    }, {
      key: '___input',
      value: function ___input() {

        if (this.options.live) {

          var $textfields = this.$elements.filter(this.options.selectors.textfield);

          this._on(true, $textfields, 'input', this._debounce(this.__sync, 100));
        }
      }

      /* SYNC */

    }, {
      key: '__sync',
      value: function __sync(event, data) {

        if (data && data._formSynced === this.group) return;

        var $element = $(event.target),
            name = $element.attr(this.options.attributes.name),
            $otherElements = $(this.options.selectors.form + '[data-' + this.options.datas.group + '="' + this.group + '"]').not(this.$form).find('[' + this.options.attributes.name + '="' + name + '"]').not($element);

        if (!$otherElements.length) return;

        var value = $element.val(),
            checked = !!$element.prop('checked');

        var _iteratorNormalCompletion12 = true;
        var _didIteratorError12 = false;
        var _iteratorError12 = undefined;

        try {
          for (var _iterator12 = $otherElements[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
            var otherElement = _step12.value;

            var $otherElement = $(otherElement),
                otherValue = $otherElement.val(),
                otherChecked = !!$otherElement.prop('checked');

            if (value === otherValue && checked === otherChecked) continue;

            if ($element.is(this.options.selectors.radio) && (value !== otherValue || checked === otherChecked)) continue;

            if ($element.is(this.options.selectors.checkable)) {

              $otherElement.prop('checked', checked).trigger('change', { _formSynced: this.group });
            } else {

              $otherElement.val(value).trigger('change', { _formSynced: this.group });
            }
          }
        } catch (err) {
          _didIteratorError12 = true;
          _iteratorError12 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion12 && _iterator12.return) {
              _iterator12.return();
            }
          } finally {
            if (_didIteratorError12) {
              throw _iteratorError12;
            }
          }
        }
      }
    }]);

    return FormSync;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(FormSync, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

(function () {
  'use strict';

  var keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;

  var fn = function () {
    var val;
    var valLength;

    var fnMap = [['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'],
    // new WebKit
    ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'],
    // old WebKit (Safari 5.1)
    ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'], ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'], ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']];

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
  }();

  var screenfull = {
    request: function request(elem) {
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
    exit: function exit() {
      document[fn.exitFullscreen]();
    },
    toggle: function toggle(elem) {
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
      get: function get() {
        return !!document[fn.fullscreenElement];
      }
    },
    element: {
      enumerable: true,
      get: function get() {
        return document[fn.fullscreenElement];
      }
    },
    enabled: {
      enumerable: true,
      get: function get() {
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

(function ($, _, Svelto, Widgets, Factory, Widgetize, Pointer, Animations) {

  'use strict';

  /* SCROLL TO TOP */

  //TODO: Add a .scroll-to-target widget, with data-target and awareness of the attached stuff
  //FIXME: It doesn't work if the layout is body, it also need html in some browsers

  Widgetize.add('.scroll-to-top', function ($scroller) {

    var $layout = $scroller.parent().closest('.layout, body'); //TODO: Use just `.layout`

    $scroller.on(Pointer.tap, function () {

      $layout.animate({ scrollTop: 0 }, Animations.normal);
    });
  });

  /* FULLSCREEN */

  //TODO: Add the ability to trigger the fullscreen for a specific element
  //FIXME: It doesn't work in iOS's Safari and IE10
  //TODO: Rewrite a component for it

  Widgetize.add('.fullscreen-toggler', function ($toggler) {

    $toggler.on(Pointer.tap, screenfull.toggle);
  });
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Widgetize, Svelto.Pointer, Svelto.Animations);

/* =========================================================================
 * Svelto - Infobar
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var Infobar = function (_Widgets$Widget21) {
    _inherits(Infobar, _Widgets$Widget21);

    function Infobar() {
      _classCallCheck(this, Infobar);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Infobar).apply(this, arguments));
    }

    _createClass(Infobar, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$infobar = this.$element;
      }

      /* API */

    }, {
      key: 'close',
      value: function close() {

        this.$infobar.detach();

        this._trigger('close');
      }
    }]);

    return Infobar;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Infobar, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Infobar (Closer)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires infobar.js
 * @requires ../closer/closer.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'infobarCloser',
    plugin: true,
    selector: '.infobar-closer',
    options: {
      widget: Widgets.Infobar
    }
  };

  /* INFOBAR CLOSER */

  var InfobarCloser = function (_Widgets$Closer4) {
    _inherits(InfobarCloser, _Widgets$Closer4);

    function InfobarCloser() {
      _classCallCheck(this, InfobarCloser);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(InfobarCloser).apply(this, arguments));
    }

    return InfobarCloser;
  }(Widgets.Closer);

  /* FACTORY */

  Factory.init(InfobarCloser, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

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

(function ($, _, Svelto, Widgets, Factory, Pointer, Animations) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var Modal = function (_Widgets$Widget22) {
    _inherits(Modal, _Widgets$Widget22);

    function Modal() {
      _classCallCheck(this, Modal);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Modal).apply(this, arguments));
    }

    _createClass(Modal, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.modal = this.element;
        this.$modal = this.$element;

        this._isOpen = this.$modal.hasClass(this.options.classes.open);
      }
    }, {
      key: '_events',
      value: function _events() {

        if (this._isOpen) {

          this.___keydown();
          this.___tap();
          this.___route();
        }
      }

      /* TAP */

    }, {
      key: '___tap',
      value: function ___tap() {

        this._on(true, Pointer.tap, this.__tap);
      }
    }, {
      key: '__tap',
      value: function __tap(event) {

        if (event.target === this.modal) {

          this.close();
        }
      }

      /* ROUTE */

    }, {
      key: '__route',
      value: function __route() {

        if (this._isOpen && !$.contains(this.layout, this.$modal[0])) {

          this.close();
        }
      }

      /* API */

    }, {
      key: 'isOpen',
      value: function isOpen() {

        return this._isOpen;
      }
    }, {
      key: 'toggle',
      value: function toggle() {
        var force = arguments.length <= 0 || arguments[0] === undefined ? !this._isOpen : arguments[0];

        if (!!force !== this._isOpen) {

          this[force ? 'open' : 'close']();
        }
      }
    }, {
      key: 'open',
      value: function open() {

        if (this._lock || this._isOpen) return;

        this._lock = true;
        this._isOpen = true;

        this.$layout.disableScroll();

        this._frame(function () {

          this.$modal.addClass(this.options.classes.show);

          this._frame(function () {

            this.$modal.addClass(this.options.classes.open);

            this._lock = false;

            this._trigger('open');
          });
        });

        this.___keydown();
        this.___tap();
        this.___route();
      }
    }, {
      key: 'close',
      value: function close() {

        if (this.lock || !this._isOpen) return;

        this._lock = true;
        this._isOpen = false;

        this._frame(function () {

          this.$modal.removeClass(this.options.classes.open);

          this._delay(function () {

            this.$modal.removeClass(this.options.classes.show);

            this.$layout.enableScroll();

            this._lock = false;

            this._trigger('close');
          }, this.options.animations.close);
        });

        this._reset();
      }
    }]);

    return Modal;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Modal, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Animations);

/* =========================================================================
 * Svelto - Modal (Closer)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires modal.js
 * @requires ../closer/closer.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'modalCloser',
    plugin: true,
    selector: '.modal-closer',
    options: {
      widget: Widgets.Modal
    }
  };

  /* MODAL CLOSER */

  var ModalCloser = function (_Widgets$Closer5) {
    _inherits(ModalCloser, _Widgets$Closer5);

    function ModalCloser() {
      _classCallCheck(this, ModalCloser);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(ModalCloser).apply(this, arguments));
    }

    return ModalCloser;
  }(Widgets.Closer);

  /* FACTORY */

  Factory.init(ModalCloser, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Modal (Opener)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires modal.js
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'modalOpener',
    plugin: true,
    selector: '.modal-opener',
    options: {
      widget: Widgets.Modal
    }
  };

  /* MODAL OPENER */

  var ModalOpener = function (_Widgets$Opener4) {
    _inherits(ModalOpener, _Widgets$Opener4);

    function ModalOpener() {
      _classCallCheck(this, ModalOpener);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(ModalOpener).apply(this, arguments));
    }

    return ModalOpener;
  }(Widgets.Opener);

  /* FACTORY */

  Factory.init(ModalOpener, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Modal (Toggler)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires modal.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'modalToggler',
    plugin: true,
    selector: '.modal-toggler',
    options: {
      widget: Widgets.Modal
    }
  };

  /* MODAL TOGGLER */

  var ModalToggler = function (_Widgets$Toggler4) {
    _inherits(ModalToggler, _Widgets$Toggler4);

    function ModalToggler() {
      _classCallCheck(this, ModalToggler);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(ModalToggler).apply(this, arguments));
    }

    return ModalToggler;
  }(Widgets.Toggler);

  /* FACTORY */

  Factory.init(ModalToggler, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Mouse
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function ($, _, Svelto) {

  'use strict';

  /* MOUSE */

  var Mouse = {
    buttons: {
      LEFT: 0,
      MIDDLE: 1,
      RIGHT: 2
    }
  };

  /* EXPORT */

  Svelto.Mouse = Mouse;
})(Svelto.$, Svelto._, Svelto);

/* =========================================================================
 * Svelto - N Times Action (Group)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../cookie/cookie.js
 * ========================================================================= */

(function ($, _, Svelto, Cookie, NTA) {

  'use strict';

  /* UTILITIES */

  var getExpiry = function getExpiry(expiry) {

    if (expiry) {

      switch (expiry.constructor) {

        case Number:
          return expiry === Infinity ? false : _.nowSecs() + expiry;

        case String:
          return getExpiry(new Date(expiry));

        case Date:
          var timestamp = expiry.getTime();
          return _.isNaN(timestamp) ? false : Math.floor(timestamp / 1000);

      }
    }

    return false;
  };

  /* CONFIG */

  var config = {
    encoder: JSON.stringify,
    decoder: JSON.parse
  };

  /* GROUP */

  var Group = function () {
    function Group(options) {
      _classCallCheck(this, Group);

      this.name = options.name;
      this.cookie = options.cookie;

      this.actions = NTA.Group.config.decoder(Cookie.get(this.name) || '{}');
    }

    _createClass(Group, [{
      key: 'get',
      value: function get(action) {

        var actionj = this.actions[action];

        if (actionj) {

          if (actionj.x && actionj.x < _.nowSecs()) {

            this.remove(action);
          } else {

            return actionj.t;
          }
        }

        return 0;
      }
    }, {
      key: 'set',
      value: function set(action, times, expiry) {

        times = Number(times);

        if (_.isNaN(times)) return;

        if (action in this.actions) {

          if (times === 0 && !this.actions[action].x) {

            return this.remove(action);
          } else {

            this.actions[action].t = times;
          }
        } else {

          this.actions[action] = { t: times };

          expiry = getExpiry(expiry);

          if (expiry) {

            this.actions[action].x = expiry;
          }
        }

        this.update();
      }
    }, {
      key: 'update',
      value: function update() {

        Cookie.set(this.name, NTA.Group.config.encoder(this.actions), this.cookie.end, this.cookie.path, this.cookie.domain, this.cookie.secure);
      }
    }, {
      key: 'remove',
      value: function remove(action) {

        if (action) {

          if (_.size(this.actions) > 1) {

            delete this.actions[action];

            this.update();
          } else {

            this.remove();
          }
        } else {

          this.actions = {};

          Cookie.remove(this.name, this.cookie.path, this.cookie.domain);
        }
      }
    }]);

    return Group;
  }();

  /* BINDING */

  NTA.Group = Group;
  NTA.Group.config = config;
})(Svelto.$, Svelto._, Svelto, Svelto.Cookie, Svelto.NTA = {});

/* =========================================================================
 * Svelto - N Times Action (Action)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires NTA.Group.js
 * ========================================================================= */

(function ($, _, Svelto, NTA) {

  'use strict';

  /* ACTION */

  var Action = function () {
    function Action(options) {
      _classCallCheck(this, Action);

      this.group = new NTA.Group({ name: options.group, cookie: options.cookie });
      this.name = options.name;
      this.expiry = options.expiry;
    }

    _createClass(Action, [{
      key: 'get',
      value: function get() {

        return this.group.get(this.name);
      }
    }, {
      key: 'set',
      value: function set(times, expiry) {

        this.group.set(this.name, times, expiry || this.expiry);
      }
    }, {
      key: 'remove',
      value: function remove() {

        this.group.remove(this.name);
      }
    }]);

    return Action;
  }();

  /* BINDING */

  NTA.Action = Action;
})(Svelto.$, Svelto._, Svelto, Svelto.NTA);

/* =========================================================================
 * Svelto - N Times Action
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires NTA.Action.js
 * ========================================================================= */

(function ($, _, Svelto, NTA) {

  'use strict';

  /* DEFAULT OPTIONS */

  var defaults = {
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

  $.nTimesAction = function (options) {

    /* OPTIONS */

    options = _.merge({}, $.nTimesAction.defaults, options);

    /* N TIMES ACTION */

    if (options.action) {

      var action = new NTA.Action({ group: options.group, name: options.action, expiry: options.expiry, cookie: options.cookie }),
          actionTimes = action.get();

      /* EXECUTE */

      if (options.fn && actionTimes < options.times) {

        var returnValue = options.fn(options.group, options.action, actionTimes + 1);

        /* INCREMENT */

        if (returnValue !== false) {

          action.set(actionTimes + 1);
        }
      }

      return action;
    } else if (options.group) {

      return new NTA.Group({ name: options.group, cookie: options.cookie });
    }
  };

  /* BINDING */

  $.nTimesAction.defaults = defaults;
})(Svelto.$, Svelto._, Svelto, Svelto.NTA);

/* =========================================================================
 * Svelto - Notification
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../noty/noty.js
 * ========================================================================= */

// If the tab hasn't the focus and we can use the native notifications than we'll send a native notification, otherwise we will fallback to a noty

(function ($, _, Svelto, Widgets) {

  'use strict';

  /* DEFAULT OPTIONS */

  var defaults = {
    title: false,
    body: false,
    img: false,
    ttl: Widgets.Noty.config.options.ttl
  };

  /* NOTIFICATION */

  $.notification = function (options) {

    /* OPTIONS */

    options = _.extend({}, $.notification.defaults, options);

    /* NOTIFICATIONS */

    if (!document.hasFocus() && window.Notification && Notification.permission !== 'denied') {

      Notification.requestPermission(function (status) {

        if (status === 'granted') {
          (function () {

            var notification = new Notification(options.title, { body: options.body, icon: options.img });

            if (_.isNumber(options.ttl) && !_.isNaN(options.ttl) && options.ttl !== Infinity) {

              setTimeout(function () {

                notification.close();
              }, options.ttl);
            }
          })();
        } else {

          $.noty(options);
        }
      });
    } else {

      $.noty(options);
    }
  };

  /* BINDING */

  $.notification.defaults = defaults;
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets);

/* =========================================================================
 * Svelto - Noty (Helper)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires noty.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets) {

  'use strict';

  /* HELPER */

  $.noty = function () {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    /* OPTIONS */

    options = _.isString(options) ? { body: options } : options;

    /* TYPE */

    if (options.buttons) {

      options.type = 'action';
    }

    /* NOTY */

    return new Widgets.Noty(options);
  };
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets);

/* =========================================================================
 * Svelto - One Time Action
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../n_times_action/n_times_action.js
 * ========================================================================= */

(function ($, _, Svelto) {

  'use strict';

  /* ONE TIME ACTION */

  $.oneTimeAction = function (options) {

    return $.nTimesAction(_.extend({ group: 'ota' }, options, { times: 1 }));
  };
})(Svelto.$, Svelto._, Svelto);

/* =========================================================================
 * Svelto - Overlay (Closer)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires overlay.js
 * @requires ../closer/closer.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'overlayCloser',
    plugin: true,
    selector: '.overlay-closer',
    options: {
      widget: Widgets.Overlay
    }
  };

  /* OVERLAY CLOSER */

  var OverlayCloser = function (_Widgets$Closer6) {
    _inherits(OverlayCloser, _Widgets$Closer6);

    function OverlayCloser() {
      _classCallCheck(this, OverlayCloser);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(OverlayCloser).apply(this, arguments));
    }

    return OverlayCloser;
  }(Widgets.Closer);

  /* FACTORY */

  Factory.init(OverlayCloser, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Overlay (Opener)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires overlay.js
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'overlayOpener',
    plugin: true,
    selector: '.overlay-opener',
    options: {
      widget: Widgets.Overlay
    }
  };

  /* OVERLAY OPENER */

  var OverlayOpener = function (_Widgets$Opener5) {
    _inherits(OverlayOpener, _Widgets$Opener5);

    function OverlayOpener() {
      _classCallCheck(this, OverlayOpener);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(OverlayOpener).apply(this, arguments));
    }

    return OverlayOpener;
  }(Widgets.Opener);

  /* FACTORY */

  Factory.init(OverlayOpener, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Overlay (Toggler)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires overlay.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'overlayToggler',
    plugin: true,
    selector: '.overlay-toggler',
    options: {
      widget: Widgets.Overlay
    }
  };

  /* OVERLAY TOGGLER */

  var OverlayToggler = function (_Widgets$Toggler5) {
    _inherits(OverlayToggler, _Widgets$Toggler5);

    function OverlayToggler() {
      _classCallCheck(this, OverlayToggler);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(OverlayToggler).apply(this, arguments));
    }

    return OverlayToggler;
  }(Widgets.Toggler);

  /* FACTORY */

  Factory.init(OverlayToggler, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer);

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

(function ($, _, Svelto, Widgets, Factory, Pointer, Animations) {

  'use strict';

  /* CONFIG */

  var config = {
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
        close: Animations.normal
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

  var Panel = function (_Widgets$Widget23) {
    _inherits(Panel, _Widgets$Widget23);

    function Panel() {
      _classCallCheck(this, Panel);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Panel).apply(this, arguments));
    }

    _createClass(Panel, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {
        var _this48 = this;

        this.$panel = this.$element;
        this.panel = this.element;

        this.options.direction = _.getDirections().find(function (direction) {
          return _this48.$panel.hasClass(direction);
        }) || this.options.direction;
        this.options.flick.open = this.options.flick.open || this.$panel.hasClass(this.options.classes.flickable);

        if (this.options.pin) {

          _.merge(this.options.breakpoints, {
            up: _defineProperty({}, this.options.pin, '_autopin'),
            down: _defineProperty({}, this.options.pin, '_autounpin')
          });
        }

        this._isOpen = this.$panel.hasClass(this.options.classes.open);
        this._isPinned = this.$panel.hasClass(this.options.classes.pinned);
        this._isSlim = this.$panel.hasClass(this.options.classes.slim);

        this.layoutPinnedClass = Widgets.Panel.config.name + '-' + (this._isSlim ? this.options.classes.slim + '-' : '') + this.options.classes.pinned + '-' + this.options.direction;
      }
    }, {
      key: '_events',
      value: function _events() {

        if (this._isOpen) {

          this.___breakpoint();
          this.___tap();
          this.___keydown();
          this.___panelFlick();
          this.___route();
        } else {

          this.___layoutFlick();
          this.___panelFlick();
        }
      }

      /* TAP */

    }, {
      key: '___tap',
      value: function ___tap() {

        this._on(true, Pointer.tap, this.__tap);
      }
    }, {
      key: '__tap',
      value: function __tap(event) {

        if (event.target === this.panel && !this._isPinned) {

          this.close();
        }
      }

      /* ESC */

    }, {
      key: '___keydown',
      value: function ___keydown() {
        //TODO: Listen to `keydown` only within the layout, so maybe just if the layout is hovered or focused (right?)

        this._on(true, this.$document, 'keydown', this.__keydown);
      }
    }, {
      key: '__esc',
      value: function __esc() {

        if (!this._isPinned) {

          this.close();
        }
      }

      /* LAYOUT FLICK */

    }, {
      key: '___layoutFlick',
      value: function ___layoutFlick() {

        if (!this.options.flick.open) return;

        this.$layout.flickable();

        this._on(this.$layout, 'flickable:flick', this.__layoutFlick);
      }
    }, {
      key: '__layoutFlick',
      value: function __layoutFlick(event, data) {

        if (this._isOpen) return;

        if (data.direction !== _.getOppositeDirection(this.options.direction)) return;

        var layoutOffset = this.$layout.offset();

        switch (this.options.direction) {

          case 'left':
            if (data.startXY.X - layoutOffset.left > this.options.flick.treshold) return;
            break;

          case 'right':
            if (this.$layout.outerWidth() + layoutOffset.left - data.startXY.X > this.options.flick.treshold) return;
            break;

          case 'top':
            if (data.startXY.Y - layoutOffset.top > this.options.flick.treshold) return;
            break;

          case 'bottom':
            if (this.$layout.outerHeight() + layoutOffset.top - data.startXY.Y > this.options.flick.treshold) return;
            break;

        }

        event.preventDefault();
        event.stopImmediatePropagation();

        this.open();
      }

      /* PANEL FLICK */

    }, {
      key: '___panelFlick',
      value: function ___panelFlick() {

        if (!this.options.flick.close) return;

        this.$panel.flickable();

        this._on(true, 'flickable:flick', this.__panelFlick);
      }
    }, {
      key: '__panelFlick',
      value: function __panelFlick(event, data) {

        if (!this._isOpen) return;

        if (data.direction !== this.options.direction) return;

        event.preventDefault();
        event.stopImmediatePropagation();

        this.close();
      }

      /* ROUTE */

    }, {
      key: '__route',
      value: function __route() {

        if (this._isOpen && !$.contains(this.layout, this.$panel[0])) {

          this.$layout.enableScroll();
        }
      }

      /* AUTO PINNING */

    }, {
      key: '_autopin',
      value: function _autopin() {

        if (this._isPinned) return;

        this._wasAutoOpened = !this._isOpen;

        this.pin();
      }
    }, {
      key: '_autounpin',
      value: function _autounpin() {

        if (!this._isPinned) return;

        this[this._wasAutoOpened ? 'close' : 'unpin']();
      }

      /* API */

    }, {
      key: 'isOpen',
      value: function isOpen() {

        return this._isOpen;
      }
    }, {
      key: 'toggle',
      value: function toggle() {
        var force = arguments.length <= 0 || arguments[0] === undefined ? !this._isOpen : arguments[0];

        if (!!force !== this._isOpen) {

          this[force ? 'open' : 'close']();
        }
      }
    }, {
      key: 'open',
      value: function open() {

        if (this._lock || this._isOpen) return;

        this._lock = true;
        this._isOpen = true;

        if (!this._isPinned) {

          this.$layout.disableScroll();
        }

        this._frame(function () {

          this.$panel.addClass(this.options.classes.show);

          this._frame(function () {

            this.$panel.addClass(this.options.classes.open);

            this._lock = false;

            this._trigger('open');
          });
        });

        this._reset();

        this.___breakpoint();
        this.___tap();
        this.___keydown();
        this.___panelFlick();
        this.___route();
      }
    }, {
      key: 'close',
      value: function close() {

        if (this._lock || !this._isOpen) return;

        this.unpin(true);

        this._lock = true;
        this._isOpen = false;

        this._frame(function () {

          this.$panel.removeClass(this.options.classes.open);

          this._delay(function () {

            this.$panel.removeClass(this.options.classes.show);

            this.$layout.enableScroll();

            this._lock = false;

            this._trigger('close');
          }, this.options.animations.close);
        });

        this._reset();

        this.___breakpoint();
        this.___layoutFlick();
      }

      /* PINNING */

    }, {
      key: 'isPinned',
      value: function isPinned() {

        return this._isPinned;
      }
    }, {
      key: 'togglePin',
      value: function togglePin() {
        var force = arguments.length <= 0 || arguments[0] === undefined ? !this._isPinned : arguments[0];

        if (!!force !== this._isPinned) {

          this[force ? 'pin' : 'unpin']();
        }
      }
    }, {
      key: 'pin',
      value: function pin() {

        if (this._isPinned) return;

        this._isPinned = true;

        this.$panel.addClass(this.options.classes.pinned);

        this.$layout.addClass(this.layoutPinnedClass);

        if (this._isOpen) {

          this.$layout.enableScroll();
        } else {

          this.open();
        }
      }
    }, {
      key: 'unpin',
      value: function unpin(_closing) {

        if (!this._isOpen || !this._isPinned) return;

        this._isPinned = false;

        this.$layout.removeClass(this.layoutPinnedClass).disableScroll();

        this._delay(function () {

          this.$panel.removeClass(this.options.classes.pinned);
        }, _closing ? this.options.animations.close : 0);
      }
    }]);

    return Panel;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Panel, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Animations);

/* =========================================================================
 * Svelto - Panel (Closer)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires panel.js
 * @requires ../closer/closer.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'panelCloser',
    plugin: true,
    selector: '.panel-closer',
    options: {
      widget: Widgets.Panel
    }
  };

  /* PANEL CLOSER */

  var PanelCloser = function (_Widgets$Closer7) {
    _inherits(PanelCloser, _Widgets$Closer7);

    function PanelCloser() {
      _classCallCheck(this, PanelCloser);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(PanelCloser).apply(this, arguments));
    }

    return PanelCloser;
  }(Widgets.Closer);

  /* FACTORY */

  Factory.init(PanelCloser, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Panel (Opener)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires panel.js
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'panelOpener',
    plugin: true,
    selector: '.panel-opener',
    options: {
      widget: Widgets.Panel
    }
  };

  /* PANEL OPENER */

  var PanelOpener = function (_Widgets$Opener6) {
    _inherits(PanelOpener, _Widgets$Opener6);

    function PanelOpener() {
      _classCallCheck(this, PanelOpener);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(PanelOpener).apply(this, arguments));
    }

    return PanelOpener;
  }(Widgets.Opener);

  /* FACTORY */

  Factory.init(PanelOpener, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Panel (Toggler)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires panel.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'panelToggler',
    plugin: true,
    selector: '.panel-toggler',
    options: {
      widget: Widgets.Panel
    }
  };

  /* PANEL TOGGLER */

  var PanelToggler = function (_Widgets$Toggler6) {
    _inherits(PanelToggler, _Widgets$Toggler6);

    function PanelToggler() {
      _classCallCheck(this, PanelToggler);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(PanelToggler).apply(this, arguments));
    }

    return PanelToggler;
  }(Widgets.Toggler);

  /* FACTORY */

  Factory.init(PanelToggler, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript */
var _self = typeof window !== 'undefined' ? window // if in browser
: typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self // if in worker
: {} // if in node js
;

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

var Prism = function () {

  // Private helper vars
  var lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;

  var _ = _self.Prism = {
    util: {
      encode: function encode(tokens) {
        if (tokens instanceof Token) {
          return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
        } else if (_.util.type(tokens) === 'Array') {
          return tokens.map(_.util.encode);
        } else {
          return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
        }
      },

      type: function type(o) {
        return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
      },

      // Deep clone a language definition (e.g. to extend it)
      clone: function clone(o) {
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
            return o.map && o.map(function (v) {
              return _.util.clone(v);
            });
        }

        return o;
      }
    },

    languages: {
      extend: function extend(id, redef) {
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
      insertBefore: function insertBefore(inside, before, insert, root) {
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
        _.languages.DFS(_.languages, function (key, value) {
          if (value === root[inside] && key != inside) {
            this[key] = ret;
          }
        });

        return root[inside] = ret;
      },

      // Traverse a language definition with Depth First Search
      DFS: function DFS(o, callback, type) {
        for (var i in o) {
          if (o.hasOwnProperty(i)) {
            callback.call(o, i, o[i], type || i);

            if (_.util.type(o[i]) === 'Object') {
              _.languages.DFS(o[i], callback);
            } else if (_.util.type(o[i]) === 'Array') {
              _.languages.DFS(o[i], callback, i);
            }
          }
        }
      }
    },
    plugins: {},

    highlightAll: function highlightAll(async, callback) {
      var elements = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');

      for (var i = 0, element; element = elements[i++];) {
        _.highlightElement(element, async === true, callback);
      }
    },

    highlightElement: function highlightElement(element, async, callback) {
      // Find language
      var language,
          grammar,
          parent = element;

      while (parent && !lang.test(parent.className)) {
        parent = parent.parentNode;
      }

      if (parent) {
        language = (parent.className.match(lang) || [, ''])[1];
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

        worker.onmessage = function (evt) {
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
      } else {
        env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

        _.hooks.run('before-insert', env);

        env.element.innerHTML = env.highlightedCode;

        callback && callback.call(element);

        _.hooks.run('after-highlight', env);
        _.hooks.run('complete', env);
      }
    },

    highlight: function highlight(text, grammar, language) {
      var tokens = _.tokenize(text, grammar);
      return Token.stringify(_.util.encode(tokens), language);
    },

    tokenize: function tokenize(text, grammar, language) {
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
        if (!grammar.hasOwnProperty(token) || !grammar[token]) {
          continue;
        }

        var patterns = grammar[token];
        patterns = _.util.type(patterns) === "Array" ? patterns : [patterns];

        for (var j = 0; j < patterns.length; ++j) {
          var pattern = patterns[j],
              inside = pattern.inside,
              lookbehind = !!pattern.lookbehind,
              lookbehindLength = 0,
              alias = pattern.alias;

          pattern = pattern.pattern || pattern;

          for (var i = 0; i < strarr.length; i++) {
            // Don’t cache length as it changes during the loop

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
              if (lookbehind) {
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

              var wrapped = new Token(token, inside ? _.tokenize(match, inside) : match, alias);

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

      add: function add(name, callback) {
        var hooks = _.hooks.all;

        hooks[name] = hooks[name] || [];

        hooks[name].push(callback);
      },

      run: function run(name, env) {
        var callbacks = _.hooks.all[name];

        if (!callbacks || !callbacks.length) {
          return;
        }

        for (var i = 0, callback; callback = callbacks[i++];) {
          callback(env);
        }
      }
    }
  };

  var Token = _.Token = function (type, content, alias) {
    this.type = type;
    this.content = content;
    this.alias = alias;
  };

  Token.stringify = function (o, language, parent) {
    if (typeof o == 'string') {
      return o;
    }

    if (_.util.type(o) === 'Array') {
      return o.map(function (element) {
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
    _self.addEventListener('message', function (evt) {
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
}();

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
Prism.hooks.add('wrap', function (env) {

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
  'comment': [{
    pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
    lookbehind: true
  }, {
    pattern: /(^|[^\\:])\/\/.*/,
    lookbehind: true
  }],
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

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'progressbar',
    plugin: true,
    selector: '.progressbar',
    templates: {
      base: '<div class="progressbar {%=(o.striped ? "striped" : "")%} {%=(o.indeterminate ? "indeterminate" : "")%} {%=(o.labeled ? "labeled" : "")%} {%=o.colors.off%} {%=o.size%} {%=o.css%}">' + '<div class="progressbar-highlight {%=o.colors.on%}"></div>' + '</div>'
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

  /* PROGRESSBAR */

  var Progressbar = function (_Widgets$Widget24) {
    _inherits(Progressbar, _Widgets$Widget24);

    function Progressbar() {
      _classCallCheck(this, Progressbar);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Progressbar).apply(this, arguments));
    }

    _createClass(Progressbar, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$progressbar = this.$element;
        this.$highlight = this.$progressbar.find(this.options.selectors.highlight);
      }
    }, {
      key: '_init',
      value: function _init() {

        /* OPTIONS */

        this.options.value = this._sanitizeValue(this.$progressbar.data(this.options.datas.value) || this.options.value);
        this.options.decimals = Number(this.$progressbar.data(this.options.datas.decimals) || this.options.decimals);

        /* UPDATE */

        this._update();
      }

      /* VALUE */

    }, {
      key: '_sanitizeValue',
      value: function _sanitizeValue(value) {

        var nr = Number(value);

        return _.clamp(_.isNaN(nr) ? 0 : nr, 0, 100);
      }
    }, {
      key: '_roundValue',
      value: function _roundValue(value) {

        return Number(value.toFixed(this.options.decimals));
      }

      /* UPDATE */

    }, {
      key: '_updateWidth',
      value: function _updateWidth() {

        this.$highlight.css('min-width', this.options.value + '%');
      }
    }, {
      key: '_updateLabel',
      value: function _updateLabel() {

        this.$highlight.attr('data-' + this.options.datas.value, this._roundValue(this.options.value) + '%');
      }
    }, {
      key: '_update',
      value: function _update() {

        this._updateWidth();
        this._updateLabel();
      }

      /* API */

    }, {
      key: 'get',
      value: function get() {

        return this.options.value;
      }
    }, {
      key: 'set',
      value: function set(value) {

        value = this._sanitizeValue(value);

        if (value === this.options.value) return;

        this.options.value = value;

        this._update();

        this._trigger('change');

        if (this.options.value === 0) {

          this._trigger('empty');
        } else if (this.options.value === 100) {

          this._trigger('full');
        }
      }
    }]);

    return Progressbar;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Progressbar, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Progressbar (Helper)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires progressbar.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets) {

  'use strict';

  /* HELPER */

  $.progressbar = function (options) {

    options = _.isNumber(options) ? { value: options } : options;

    return new Widgets.Progressbar(options);
  };
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets);

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

(function ($, _, Svelto, Widgets, Factory, Pointer) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'rater',
    plugin: true,
    selector: '.rater',
    templates: {
      base: '<div class="rater">' + '{% include ( "rater.stars", o ); %}' + '</div>',
      stars: '{% for ( var i = 1; i <= o.amount; i++ ) { %}' + '<div class="rater-star {%=( o.value >= i ? "active" : ( o.value >= i - 0.5 ? "half-active" : "" ) )%}"></div>' + '{% } %}'
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
    }
  };

  /* SELECT */

  var Rater = function (_Widgets$Widget25) {
    _inherits(Rater, _Widgets$Widget25);

    function Rater() {
      _classCallCheck(this, Rater);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Rater).apply(this, arguments));
    }

    _createClass(Rater, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$rater = this.$element;

        this.doingAjax = false;
      }
    }, {
      key: '_init',
      value: function _init() {

        this.options.value = Number(this.$rater.data(this.options.datas.value)) || this.options.value;
        this.options.amount = Number(this.$rater.data(this.options.datas.amount)) || this.options.amount;
        this.options.url = Number(this.$rater.data(this.options.datas.url)) || this.options.url;
        this.options.rated = this.$rater.hasClass(this.options.classes.rated);
      }
    }, {
      key: '_events',
      value: function _events() {

        this.___tap();
      }

      /* TAP */

    }, {
      key: '___tap',
      value: function ___tap() {

        if (!this.options.rated) {

          /* TAP */

          this._on(Pointer.tap, this.options.selectors.star, this.__tap);
        }
      }
    }, {
      key: '__tap',
      value: function __tap(event) {
        var _this54 = this;

        if (!this.options.rated && !this.doingAjax && this.options.url) {

          var rating = this.$stars.index(event.currentTarget) + 1;

          $.ajax({

            data: { rating: rating },
            type: 'POST',
            url: this.options.url,

            beforeSend: function beforeSend() {

              _this54.doingAjax = true;
            },

            error: function error(res) {

              var resj = _.attempt(JSON.parse, res);

              $.noty(_.isError(resj) || !('msg' in resj) ? _this54.options.messages.error : resj.msg);
            },

            success: function success(res) {

              //FIXME: Handle the case where the server requests succeeded but the user already rated or for whatever reason this rating is not processed

              var resj = _.attempt(JSON.parse, res);

              if (!_.isError(resj)) {

                _.merge(_this54.options, resj);

                _this54.$rater.html(_this54._tmpl('stars', _this54.options));

                _this54.options.rated = true;

                _this54._trigger('change');
              }
            },

            complete: function complete() {

              _this54.doingAjax = false;
            }

          });
        }
      }

      /* API */

    }, {
      key: 'get',
      value: function get() {

        return {
          value: this.options.value,
          amount: this.options.amount
        };
      }
    }]);

    return Rater;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Rater, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer);

/* =========================================================================
 * Svelto - Remote
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

//TODO: Add locking capabilities

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'remote',
    options: {
      ajax: { // Options to pass to `$.ajax`
        cache: true, // If set to false, it will force the requested url not to be cached by the browser
        method: 'GET', // Method of the remote request
        timeout: 31000 // 1 second more than the default value of PHP's `max_execution_time` setting
      },
      callbacks: {
        beforesend: _.noop,
        complete: _.noop,
        error: _.noop,
        success: _.noop,
        abort: _.noop
      }
    }
  };

  /* REMOTE */

  var Remote = function (_Widgets$Widget26) {
    _inherits(Remote, _Widgets$Widget26);

    function Remote() {
      _classCallCheck(this, Remote);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Remote).apply(this, arguments));
    }

    _createClass(Remote, [{
      key: '_reset',

      /* SPECIAL */

      value: function _reset() {

        this.abort();

        _get(Object.getPrototypeOf(Remote.prototype), '_reset', this).call(this);
      }

      /* REQUEST HANDLERS */

    }, {
      key: '__beforesend',
      value: function __beforesend(res) {

        if (this.isAborted()) return;

        this._trigger('beforesend', res);
      }
    }, {
      key: '__complete',
      value: function __complete(res) {

        if (this.isAborted()) return;

        this._trigger('complete', res);
      }
    }, {
      key: '__error',
      value: function __error(res) {

        if (this.isAborted()) return;

        this._trigger('error', res);
      }
    }, {
      key: '__success',
      value: function __success(res) {

        if (this.isAborted()) return;

        this._trigger('success', res);
      }
    }, {
      key: '__abort',
      value: function __abort() {

        this._trigger('abort');
      }

      /* API */

    }, {
      key: 'isRequesting',
      value: function isRequesting() {

        return !!this.xhr && ![0, 4].includes(this.xhr.readyState); // 0: UNSENT, 4: DONE
      }
    }, {
      key: 'request',
      value: function request() {

        this._isAborted = false;

        this.xhr = $.ajax(_.extend({}, this.options.ajax, {
          beforeSend: this.__beforesend.bind(this),
          complete: this.__complete.bind(this),
          error: this.__error.bind(this),
          success: this.__success.bind(this)
        }));
      }
    }, {
      key: 'isAborted',
      value: function isAborted() {

        return !!this._isAborted;
      }
    }, {
      key: 'abort',
      value: function abort() {

        if (!this.xhr || !this.isRequesting()) return;

        this._isAborted = true;

        this.xhr.abort();

        this.__abort();
      }
    }]);

    return Remote;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Remote, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Remote - Action
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../remote.js
 * @requires ../../noty/noty.js
 * ========================================================================= */

//TODO: Add locking capabilities (Disable the ability to trigger the same action multiple times simultaneously)

//FIXME: Not well written
//FIXME: Clicking an error/success noty doesn't close it

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'remoteAction',
    options: {
      closingDelay: Widgets.Noty.config.options.ttl / 2,
      ajax: {
        cache: false,
        method: 'POST'
      },
      confirmation: { // Options to pass to a confirmation noty, if falsy or `buttons.length === 0` we won't ask for confirmation. If a button as `isConfirmative` it will be used for confirmation, otherwise the last one will be picked
        body: 'Execute action?',
        buttons: [{
          text: 'Cancel'
        }, {
          text: 'Execute',
          color: 'secondary',
          isConfirmative: true
        }]
      },
      messages: {
        error: 'An error occurred, please try again later',
        success: 'The action has been executed'
      },
      classes: {
        spinner: {
          color: 'white',
          size: 'small',
          css: ''
        }
      }
    }
  };

  /* REMOTE ACTION */

  var RemoteAction = function (_Widgets$Remote) {
    _inherits(RemoteAction, _Widgets$Remote);

    function RemoteAction() {
      _classCallCheck(this, RemoteAction);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(RemoteAction).apply(this, arguments));
    }

    _createClass(RemoteAction, [{
      key: '___confirmationNoty',

      /* NOTY */

      value: function ___confirmationNoty() {

        if (this.$noty) return;

        /* VARIABLES */

        var options = _.cloneDeep(this.options.confirmation),
            index = _.findIndex(options.buttons, 'isConfirmative'),
            button = index >= 0 ? options.buttons[index] : _.last(options.buttons);

        /* ON CLICK */

        button.onClick = function () {
          this.request(true);
          return false;
        }.bind(this);

        /* OPENING */

        this._replaceNoty(options);
      }
    }, {
      key: '___loadingNoty',
      value: function ___loadingNoty() {

        this._replaceNoty('<svg class="spinner ' + this.options.classes.spinner.color + ' ' + this.options.classes.spinner.size + ' ' + this.options.classes.spinner.css + '"><circle cx="1.625em" cy="1.625em" r="1.25em"></svg>');
      }
    }, {
      key: '_replaceNoty',
      value: function _replaceNoty(options) {

        var instance = $.noty(_.isString(options) ? { body: options, autoplay: false } : _.extend({}, options, { autoplay: false }));

        instance.close();

        var $noty = instance.$element;

        if (this.$noty) {

          this.$noty.html($noty.html()).widgetize();
        } else {

          this.$noty = $noty;

          this.$noty.noty('open');
        }
      }
    }, {
      key: '_destroyNoty',
      value: function _destroyNoty(delay) {

        if (!this.$noty) return;

        this._delay(function () {

          this.$noty.noty('close');

          this._delay(function () {

            this.$noty.remove();

            this.$noty = false;
          }, Widgets.Noty.config.options.animations.close);
        }, delay ? this.options.closingDelay : 0);
      }

      /* REQUEST HANDLERS */

    }, {
      key: '__beforesend',
      value: function __beforesend(res) {

        if (this.isAborted()) return;

        this.___loadingNoty();

        _get(Object.getPrototypeOf(RemoteAction.prototype), '__beforesend', this).call(this, res);
      }
    }, {
      key: '__error',
      value: function __error(res) {

        if (this.isAborted()) return;

        var resj = _.attempt(JSON.parse, res);

        this._replaceNoty(_.isError(resj) || !('msg' in resj) ? this.options.messages.error : resj.msg);

        this._destroyNoty(true);

        _get(Object.getPrototypeOf(RemoteAction.prototype), '__error', this).call(this, res);
      }
    }, {
      key: '__success',
      value: function __success(res) {

        if (this.isAborted()) return;

        var resj = _.attempt(JSON.parse, res);

        if (_.isError(resj)) {

          return this.__error(res);
        } else {

          this._replaceNoty('msg' in resj ? resj.msg : this.options.messages.success);
          this._destroyNoty(true);

          _get(Object.getPrototypeOf(RemoteAction.prototype), '__success', this).call(this, res);
        }
      }

      /* API OVERRIDES */

    }, {
      key: 'request',
      value: function request(_confirmation) {

        if (!_confirmation && this.options.confirmation && 'buttons' in this.options.confirmation && this.options.confirmation.buttons.length) {

          this.___confirmationNoty();
        } else {

          _get(Object.getPrototypeOf(RemoteAction.prototype), 'request', this).call(this);
        }
      }
    }, {
      key: 'abort',
      value: function abort() {

        this._destroyNoty();

        _get(Object.getPrototypeOf(RemoteAction.prototype), 'abort', this).call(this);
      }
    }]);

    return RemoteAction;
  }(Widgets.Remote);

  /* FACTORY */

  Factory.init(RemoteAction, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Remote - Action (Helper)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires action.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets) {

  'use strict';

  /* HELPER */

  $.remoteAction = function (ajax) {

    new Widgets.RemoteAction({ ajax: ajax }).request();
  };
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets);

/* =========================================================================
 * Svelto - Remote (Trigger)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory, Pointer) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'remoteTrigger',
    options: {
      widget: false, // The `Remote` widget class to call
      ajax: {}, // Using as `new widget ( ajax )`
      attributes: {
        href: 'href' // In order to better support `a` elements (the `method` data has higher priority)
      },
      datas: {
        url: 'url',
        data: 'data',
        method: 'method'
      }
    }
  };

  /* REMOTE TRIGGER */

  var RemoteTrigger = function (_Widgets$Widget27) {
    _inherits(RemoteTrigger, _Widgets$Widget27);

    function RemoteTrigger() {
      _classCallCheck(this, RemoteTrigger);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(RemoteTrigger).apply(this, arguments));
    }

    _createClass(RemoteTrigger, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$trigger = this.$element;

        /* OPTIONS */

        this.options.ajax.url = this.$trigger.data(this.options.datas.url) || this.$trigger.attr(this.options.attributes.href) || this.options.ajax.url;
        this.options.ajax.data = this.$trigger.data(this.options.datas.data) || this.options.ajax.data;
        this.options.ajax.method = this.$trigger.data(this.options.datas.method) || this.options.ajax.method;
      }
    }, {
      key: '_events',
      value: function _events() {

        this.___tap();
      }

      /* TAP */

    }, {
      key: '___tap',
      value: function ___tap() {

        this._on(Pointer.tap, this.trigger);
      }

      /* API */

    }, {
      key: 'trigger',
      value: function trigger() {

        new this.options.widget({ ajax: this.options.ajax }).request();
      }
    }]);

    return RemoteTrigger;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(RemoteTrigger, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer);

/* =========================================================================
 * Svelto - Remote - Action (Trigger)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../remote_trigger.js
 * @requires action.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'remoteActionTrigger',
    plugin: true,
    selector: '.remote-action-trigger',
    options: {
      widget: Widgets.RemoteAction
    }
  };

  /* REMOTE ACTION TRIGGER */

  var RemoteActionTrigger = function (_Widgets$RemoteTrigge) {
    _inherits(RemoteActionTrigger, _Widgets$RemoteTrigge);

    function RemoteActionTrigger() {
      _classCallCheck(this, RemoteActionTrigger);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(RemoteActionTrigger).apply(this, arguments));
    }

    return RemoteActionTrigger;
  }(Widgets.RemoteTrigger);

  /* FACTORY */

  Factory.init(RemoteActionTrigger, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Remote - Modal
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../remote.js
 * @requires ../../modal/modal.js
 * @requires ../../noty/noty.js
 * ========================================================================= */

//TODO: Add locking capabilities, both at class-level and global-level (should be layout-level but seems impossible to implement)

//FIXME: Not well written

(function ($, _, Svelto, Widgets, Factory, Animations) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'remoteModal',
    options: {
      ajax: {
        cache: false,
        method: 'POST'
      },
      messages: {
        error: 'An error occurred, please try again later'
      },
      classes: {
        placeholder: 'remote-modal-placeholder',
        loaded: 'remote-modal-loaded',
        animating: 'remote-modal-animating'
      },
      animations: {
        resize: Animations.normal
      }
    }
  };

  /* REMOTE MODAL */

  var RemoteModal = function (_Widgets$Remote2) {
    _inherits(RemoteModal, _Widgets$Remote2);

    function RemoteModal() {
      _classCallCheck(this, RemoteModal);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(RemoteModal).apply(this, arguments));
    }

    _createClass(RemoteModal, [{
      key: '___loadingModal',

      /* MODAL */

      value: function ___loadingModal() {

        /*
          <div class="modal ' + this.options.classes.placeholder + ' card">
            <div class="card-block">
              <svg class="spinner">
                <circle cx="1.625em" cy="1.625em" r="1.25em">
              </svg>
            </div>
          </div>
        */

        this.$modal = $('<div class="modal ' + this.options.classes.placeholder + ' card"><div class="card-block"><svg class="spinner"><circle cx="1.625em" cy="1.625em" r="1.25em"></svg></div></div>').appendTo(this.$layout);
      }
    }, {
      key: '_destroyModal',
      value: function _destroyModal() {

        if (!this.$modal) return;

        this.$modal.modal('close');

        this._delay(function () {

          this.$modal.remove();

          this.$modal = false;
        }, Widgets.Modal.config.options.animations.close);
      }

      /* ABORT */

    }, {
      key: '___abort',
      value: function ___abort() {

        this._on(true, this.$modal, 'modal:close', this.abort);
      }

      /* REQUEST HANDLERS */

    }, {
      key: '__beforesend',
      value: function __beforesend(res) {

        if (this.isAborted()) return;

        this.___loadingModal();
        this.___abort();

        this.$modal.modal('open');

        _get(Object.getPrototypeOf(RemoteModal.prototype), '__beforesend', this).call(this, res);
      }
    }, {
      key: '__error',
      value: function __error(res) {

        if (this.isAborted()) return;

        var resj = _.attempt(JSON.parse, res);

        $.noty(_.isError(resj) || !('msg' in resj) ? this.options.messages.error : resj.msg);

        this._destroyModal();

        _get(Object.getPrototypeOf(RemoteModal.prototype), '__error', this).call(this, res);
      }
    }, {
      key: '__success',
      value: function __success(res) {
        var _this60 = this;

        if (this.isAborted()) return;

        var resj = _.attempt(JSON.parse, res);

        if (_.isError(resj) || !('modal' in resj)) {

          return this.__error(res);
        } else {
          (function () {

            /* VARIABLES */

            var prevRect = _this60.$modal.getRect(),
                $remoteModal = $(resj.modal),
                attributes = Array.from($remoteModal.prop('attributes'));

            /* CLONING ATTRIBUTES */

            var _iteratorNormalCompletion13 = true;
            var _didIteratorError13 = false;
            var _iteratorError13 = undefined;

            try {
              for (var _iterator13 = attributes[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                var attribute = _step13.value;

                if (attribute.name !== 'class') {

                  _this60.$modal.attr(attribute.name, attribute.value);
                } else {

                  _this60.$modal.addClass(attribute.value);
                }
              }

              /* RESIZING */
            } catch (err) {
              _didIteratorError13 = true;
              _iteratorError13 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion13 && _iterator13.return) {
                  _iterator13.return();
                }
              } finally {
                if (_didIteratorError13) {
                  throw _iteratorError13;
                }
              }
            }

            _this60._frame(function () {

              this.$modal.addClass(this.options.classes.loaded).html($remoteModal.html()).widgetize();

              var newRect = this.$modal.getRect();

              this.$modal.css({
                width: prevRect.width,
                height: prevRect.height
              });

              this._frame(function () {

                this.$modal.addClass(this.options.classes.animating);

                this.$modal.animate({
                  width: newRect.width,
                  height: newRect.height
                }, this.options.animations.resize, function () {
                  this.$modal.css({
                    width: '',
                    height: ''
                  }).removeClass(this.options.classes.placeholder + ' ' + this.options.classes.loaded + ' ' + this.options.classes.animating);
                }.bind(this));
              });
            });

            _get(Object.getPrototypeOf(RemoteModal.prototype), '__success', _this60).call(_this60, res);
          })();
        }
      }

      /* API OVERRIDES */

    }, {
      key: 'abort',
      value: function abort() {

        this._destroyModal();

        _get(Object.getPrototypeOf(RemoteModal.prototype), 'abort', this).call(this);
      }
    }]);

    return RemoteModal;
  }(Widgets.Remote);

  /* FACTORY */

  Factory.init(RemoteModal, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Animations);

/* =========================================================================
 * Svelto - Remote - Modal (Helper)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires modal.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets) {

  'use strict';

  /* HELPER */

  $.remoteModal = function (ajax) {

    new Widgets.RemoteModal({ ajax: ajax }).request();
  };
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets);

/* =========================================================================
 * Svelto - Remote - Modal (Trigger)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../remote_trigger.js
 * @requires modal.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'remoteModalTrigger',
    plugin: true,
    selector: '.remote-modal-trigger',
    options: {
      widget: Widgets.RemoteModal
    }
  };

  /* REMOTE MODAL TRIGGER */

  var RemoteModalTrigger = function (_Widgets$RemoteTrigge2) {
    _inherits(RemoteModalTrigger, _Widgets$RemoteTrigge2);

    function RemoteModalTrigger() {
      _classCallCheck(this, RemoteModalTrigger);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(RemoteModalTrigger).apply(this, arguments));
    }

    return RemoteModalTrigger;
  }(Widgets.RemoteTrigger);

  /* FACTORY */

  Factory.init(RemoteModalTrigger, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

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

(function ($, _, Svelto, Widgets, Factory, Browser, Pointer, Mouse, Animations) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var Ripple = function (_Widgets$Widget28) {
    _inherits(Ripple, _Widgets$Widget28);

    function Ripple() {
      _classCallCheck(this, Ripple);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Ripple).apply(this, arguments));
    }

    _createClass(Ripple, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$ripple = this.$element;

        this.circles = [];
      }
    }, {
      key: '_events',
      value: function _events() {

        this.___downTap();
      }

      /* DOWN / TAP */

    }, {
      key: '___downTap',
      value: function ___downTap() {

        // Touch devices triggers a `Pointer.down` event, but maybe they will just scroll the page, more appropriate to bind on `Pointer.tap`

        this._on(Browser.is.touchDevice ? Pointer.tap : Pointer.down, this.__downTap);
      }
    }, {
      key: '__downTap',
      value: function __downTap(event) {

        if (!_.isUndefined(event.button) && event.button !== Mouse.buttons.LEFT) return;

        if (this.$ripple.hasClass(this.options.classes.centered)) {

          var offset = this.$ripple.offset();

          this._show({
            X: offset.left + this.$ripple.outerWidth() / 2,
            Y: offset.top + this.$ripple.outerHeight() / 2
          });
        } else {

          this._show($.eventXY(event));
        }

        this._one(true, this.$document, Pointer.up, this.__up);
      }

      /* UP */

    }, {
      key: '__up',
      value: function __up() {
        var _iteratorNormalCompletion14 = true;
        var _didIteratorError14 = false;
        var _iteratorError14 = undefined;

        try {

          for (var _iterator14 = this.circles[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
            var _step14$value = _slicedToArray(_step14.value, 2);

            var $circle = _step14$value[0];
            var timestamp = _step14$value[1];

            this._hide($circle, timestamp);
          }
        } catch (err) {
          _didIteratorError14 = true;
          _iteratorError14 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion14 && _iterator14.return) {
              _iterator14.return();
            }
          } finally {
            if (_didIteratorError14) {
              throw _iteratorError14;
            }
          }
        }

        this.circles = [];
      }

      /* SHOW */

    }, {
      key: '_show',
      value: function _show(point) {

        var $circle = $(this._tmpl('circle'));

        /* SIZE */

        var offset = this.$ripple.offset(),
            insetX = point.X - offset.left,
            insetY = point.Y - offset.top,
            sideX = Math.max(insetX, this.$ripple.outerWidth() - insetX),
            sideY = Math.max(insetY, this.$ripple.outerHeight() - insetY),
            radius = Math.sqrt(Math.pow(sideX, 2) + Math.pow(sideY, 2)),
            // Basically the max the distances from the point to the corners
        diameter = radius * 2;

        /* ADDING */

        this.circles.push([$circle, _.now()]);

        /* SHOW */

        this._frame(function () {

          /* PREPEND */

          $circle.css({
            width: diameter,
            height: diameter,
            top: insetY,
            left: insetX
          }).prependTo(this.$ripple);

          /* SHOW */

          this._frame(function () {

            $circle.addClass(this.options.classes.circle.show);

            this._trigger('show');
          });
        });
      }

      /* HIDE */

    }, {
      key: '_hide',
      value: function _hide($circle, timestamp) {

        var remaining = Math.max(0, this.options.animations.show - this.options.animations.overlap + timestamp - _.now());

        this._delay(function () {

          $circle.addClass(this.options.classes.circle.hide);

          this._delay(function () {

            $circle.remove();

            this._trigger('hide');
          }, this.options.animations.hide);
        }, remaining);
      }
    }]);

    return Ripple;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Ripple, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Browser, Svelto.Pointer, Svelto.Mouse, Svelto.Animations);

/* =========================================================================
 * Svelto - Route
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

/* PUSHSTATE */

(function ($, _, Svelto, history) {

  'use strict';

  $(function () {

    var $window = $(window),
        pushState = history.pushState;

    history.pushState = function (state) {

      if (_.isFunction(history.onpushstate)) {

        history.onpushstate({ state: state });
      }

      $window.trigger('pushstate');

      return pushState.apply(history, arguments);
    };
  });
})(Svelto.$, Svelto._, Svelto, window.history);

/* ROUTE */

(function ($, _, Svelto) {

  'use strict';

  $(function () {

    var $window = $(window),
        previous = window.location.href.split('#')[0];

    $window.on('popstate pushstate', function () {

      _.defer(function () {
        // We need the `window.location.href` to get updated before

        var current = window.location.href.split('#')[0];

        if (current !== previous) {

          previous = current;

          $window.trigger('route');
        }
      });
    });
  });
})(Svelto.$, Svelto._, Svelto);

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

(function ($, _, Svelto, Widgets, Factory, Browser, Pointer) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'selectToggler',
    plugin: true,
    selector: '.select-toggler',
    templates: {
      base: '<div class="dropdown select-dropdown card {%=o.size%} {%=o.color%} {%=o.css%} {%=o.guc%}">' + '<div class="card-block inherit">' + '{% for ( var i = 0, l = o.options.length; i < l; i++ ) { %}' + '{% include ( "selectToggler." + ( o.options[i].value ? "option" : "optgroup" ), { opt: o.options[i], color: o.color } ); %}' + '{% } %}' + '</div>' + '</div>',
      optgroup: '<div class="divider">' + '{%=o.opt.prop%}' + '</div>',
      option: '<div class="button {%=o.color%}" data-value="{%=o.opt.prop%}">' + '{%=o.opt.value%}' + '</div>'
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

  var SelectToggler = function (_Widgets$Widget29) {
    _inherits(SelectToggler, _Widgets$Widget29);

    function SelectToggler() {
      _classCallCheck(this, SelectToggler);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(SelectToggler).apply(this, arguments));
    }

    _createClass(SelectToggler, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$toggler = this.$element;
        this.$select = this.$toggler.find(this.options.selectors.select);
        this.$options = this.$select.find(this.options.selectors.option);
        this.$label = this.$toggler.find(this.options.selectors.label);
        this.$valueholder = this.$toggler.find(this.options.selectors.valueholder);

        if (!this.$valueholder.length) {

          this.$valueholder = this.$label;
        }

        this.selectOptions = [];

        this.$dropdown = false;
      }
    }, {
      key: '_init',
      value: function _init() {

        this._updateValueholder();

        if (!Browser.is.touchDevice) {

          this.$select.addClass(this.options.classes.hidden);

          this.___selectOptions();
          this.___dropdown();
        }
      }
    }, {
      key: '_events',
      value: function _events() {

        this.___change();
      }

      /* CHANGE */

    }, {
      key: '___change',
      value: function ___change() {

        this._on(true, this.$select, 'change', this.__change);
      }
    }, {
      key: '__change',
      value: function __change() {

        this._update();

        this._trigger('change');
      }

      /* BUTTON TAP */

    }, {
      key: '___buttonTap',
      value: function ___buttonTap() {

        if (!Browser.is.touchDevice) {

          /* BUTTON TAP */

          this._on(this.$dropdown, Pointer.tap, this.options.selectors.button, this.__buttonTap);
        }
      }
    }, {
      key: '__buttonTap',
      value: function __buttonTap(event) {

        this.$dropdown.dropdown('close');

        this.set($(event.currentTarget).data(this.options.datas.value));
      }

      /* OPTIONS */

    }, {
      key: '___selectOptions',
      value: function ___selectOptions() {
        //FIXME: Add support for arbitrary number of optgroups nesting levels

        var previousOptgroup = undefined;

        var _iteratorNormalCompletion15 = true;
        var _didIteratorError15 = false;
        var _iteratorError15 = undefined;

        try {
          for (var _iterator15 = this.$options[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
            var option = _step15.value;

            var $option = $(option),
                $parent = $option.parent();

            if ($parent.is('optgroup')) {

              var currentOptgroup = $parent.attr('label');

              if (currentOptgroup !== previousOptgroup) {

                previousOptgroup = currentOptgroup;

                this.selectOptions.push({
                  prop: currentOptgroup
                });
              }
            }

            this.selectOptions.push({
              value: $option.text(),
              prop: $option.attr('value')
            });
          }
        } catch (err) {
          _didIteratorError15 = true;
          _iteratorError15 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion15 && _iterator15.return) {
              _iterator15.return();
            }
          } finally {
            if (_didIteratorError15) {
              throw _iteratorError15;
            }
          }
        }
      }

      /* DROPDOWN */

    }, {
      key: '___dropdown',
      value: function ___dropdown() {

        var html = this._tmpl('base', _.extend({ guc: this.guc, options: this.selectOptions }, this.options.dropdown));

        this.$dropdown = $(html).appendTo(this.$layout);
        this.$buttons = this.$dropdown.find(this.options.selectors.button);

        this.$dropdown.dropdown({
          positionate: {
            axis: 'y',
            strict: true
          },
          callbacks: {
            beforeopen: this.__setDropdownWidth.bind(this),
            open: this.__dropdownOpen.bind(this),
            close: this.__dropdownClose.bind(this)
          }
        });

        this.$toggler.attr('data-' + Widgets.Targeter.config.options.datas.target, '.' + this.guc).dropdownToggler();

        this._updateDropdown();
      }
    }, {
      key: '__setDropdownWidth',
      value: function __setDropdownWidth() {

        if (this.$dropdown.is('.' + this.options.classes.attached)) {

          this.$dropdown.css('min-width', this.$toggler.outerWidth());
        }
      }
    }, {
      key: '__dropdownOpen',
      value: function __dropdownOpen() {

        this.___buttonTap();

        this._trigger('open');
      }
    }, {
      key: '__dropdownClose',
      value: function __dropdownClose() {

        this._reset();

        this.___change();

        this._trigger('close');
      }

      /* UPDATE */

    }, {
      key: '_updateValueholder',
      value: function _updateValueholder() {

        var $value = this.$select.val();

        if ($value.length) {

          var $selectedOption = this.$options.filter('[value="' + $value + '"]');

          this.$valueholder.text($selectedOption.text());
        }
      }
    }, {
      key: '_updateDropdown',
      value: function _updateDropdown() {

        this.$buttons.removeClass(this.options.classes.selected);

        this.$buttons.filter('[data-' + this.options.datas.value + '="' + this.$select.val() + '"]').addClass(this.options.classes.selected);
      }
    }, {
      key: '_update',
      value: function _update() {

        this._updateValueholder();

        if (!Browser.is.touchDevice) {

          this._updateDropdown();
        }
      }

      /* API */

    }, {
      key: 'get',
      value: function get() {

        return this.$select.val();
      }
    }, {
      key: 'set',
      value: function set(value) {

        var $button = this.$buttons.filter('[data-' + this.options.datas.value + '="' + value + '"]');

        if (!$button.length) return;

        this.$select.val(value).trigger('change');
      }
    }]);

    return SelectToggler;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(SelectToggler, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Browser, Svelto.Pointer);

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

(function ($, _, Svelto, Widgets, Factory, Pointer, Browser, Mouse) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var Selectable = function (_Widgets$Widget30) {
    _inherits(Selectable, _Widgets$Widget30);

    function Selectable() {
      _classCallCheck(this, Selectable);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Selectable).apply(this, arguments));
    }

    _createClass(Selectable, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$selectable = this.$element;
        this.$elements = this._getElements();
      }
    }, {
      key: '_events',
      value: function _events() {

        this.___change();
        this.___keydown();
        this.___downTap();
      }
    }, {
      key: '_destroy',
      value: function _destroy() {

        this.clear();
      }

      /* CHANGE */

    }, {
      key: '___change',
      value: function ___change() {

        this._on(true, 'change tablehelper:change sortable:sort', this.__change);
      }

      /* KEYDOWN */

    }, {
      key: '___keydown',
      value: function ___keydown() {

        if (!Browser.is.touchDevice) {

          this._onHover([this.$document, 'keydown', this.__keydown]);
        }
      }

      /* DOWN / TAP */

    }, {
      key: '___downTap',
      value: function ___downTap() {

        if (Browser.is.touchDevice) {

          this._on(Pointer.tap, this.options.selectors.element, this.__tapTouch);
        } else {

          this._on(Pointer.down, this.options.selectors.element, this.__down);
        }
      }

      /* TAP */ // Just for touch devices

    }, {
      key: '__tapTouch',
      value: function __tapTouch(event) {

        event.preventDefault();

        $(event.currentTarget).toggleClass(this.options.classes.selected);
      }

      /* CLICK / CTRL + CLICK / SHIFT + CLICK / CLICK -> DRAG */

    }, {
      key: '__down',
      value: function __down(event) {

        if (!_.isUndefined(event.button) && event.button !== Mouse.buttons.LEFT) return; // Only the left click is allowed

        event.preventDefault();

        this.startEvent = event;
        this.$startElement = $(event.currentTarget);

        this._on(true, this.$document, Pointer.move, this.__move);

        this._one(true, this.$document, Pointer.up, this.__up);

        this._one(true, this.$document, Pointer.cancel, this.__cancel);
      }
    }, {
      key: '__move',
      value: function __move(event) {

        event.preventDefault();

        var startXY = $.eventXY(this.startEvent),
            endXY = $.eventXY(event),
            deltaXY = {
          X: endXY.X - startXY.X,
          Y: endXY.Y - startXY.Y
        },
            absDeltaXY = {
          X: Math.abs(deltaXY.X),
          Y: Math.abs(deltaXY.Y)
        };

        if (absDeltaXY.X >= this.options.moveThreshold || absDeltaXY.Y >= this.options.moveThreshold) {

          this._off(this.$document, Pointer.move, this.__move);

          this._off(this.$document, Pointer.up, this.__up);

          this._off(this.$document, Pointer.cancel, this.__cancel);

          this._resetPrev();

          if (!$.hasCtrlOrCmd(event)) {

            this.$elements.removeClass(this.options.classes.selected);
          }

          this.$startElement.toggleClass(this.options.classes.selected);

          this._on(true, Pointer.enter, this.options.selectors.element, this.__dragEnter);

          this._one(true, this.$document, Pointer.up + ' ' + Pointer.cancel, this.__dragEnd);

          this._trigger('change');
        }
      }
    }, {
      key: '__dragEnter',
      value: function __dragEnter(event) {

        this._toggleGroup(this.$startElement, $(event.currentTarget));

        this._trigger('change');
      }
    }, {
      key: '__dragEnd',
      value: function __dragEnd() {

        this._off(Pointer.enter, this.__dragEnter);
      }
    }, {
      key: '__up',
      value: function __up(event) {

        this._off(this.$document, Pointer.move, this.__move);

        this._off(this.$document, Pointer.cancel, this.__cancel);

        if (event.shiftKey) {

          this._toggleGroup(this.$prevElement, this.$startElement);
        } else if ($.hasCtrlOrCmd(event)) {

          this.$startElement.toggleClass(this.options.classes.selected);

          this._resetPrev(this.$startElement);
        } else {

          var $selected = this.get(),
              $others = $selected.not(this.$startElement);

          if ($others.length) {

            $others.removeClass(this.options.classes.selected);

            this.$startElement.addClass(this.options.classes.selected);
          } else {

            this.$startElement.toggleClass(this.options.classes.selected);
          }

          this._resetPrev(this.$startElement);
        }

        this._trigger('change');
      }
    }, {
      key: '__cancel',
      value: function __cancel() {

        this._off(this.$document, Pointer.move, this.__move);

        this._off(this.$document, Pointer.up, this.__up);
      }

      /* OTHER EVENTS */

    }, {
      key: '__change',
      value: function __change() {

        this.$elements = this._getElements();

        this._resetPrev();
      }

      /* PRIVATE */

    }, {
      key: '_toggleGroup',
      value: function _toggleGroup($start, $end) {

        var startIndex = $start ? this.$elements.index($start) : 0,
            endIndex = this.$elements.index($end),
            minIndex = Math.min(startIndex, endIndex),
            maxIndex = Math.max(startIndex, endIndex);

        if (minIndex === startIndex) {
          // Direction: down

          minIndex += 1;
          maxIndex += 1;
        }

        var $newGroup = this.$elements.slice(minIndex, maxIndex);

        if (this.$prevGroup) {

          $newGroup.not(this.$prevGroup).toggleClass(this.options.classes.selected);

          this.$prevGroup.not($newGroup).toggleClass(this.options.classes.selected);
        } else {

          $newGroup.toggleClass(this.options.classes.selected);
        }

        this.$prevGroup = $newGroup;
      }
    }, {
      key: '_getElements',
      value: function _getElements() {

        return this.$element.find(this.options.selectors.element);
      }
    }, {
      key: '_resetPrev',
      value: function _resetPrev() {
        var $element = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
        var $group = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        this.$prevElement = $element;
        this.$prevGroup = $group;
      }

      /* API */

    }, {
      key: 'get',
      value: function get() {

        return this.$elements.filter('.' + this.options.classes.selected);
      }
    }, {
      key: 'all',
      value: function all() {

        this.$elements.addClass(this.options.classes.selected);

        this._resetPrev();

        this._trigger('change');
      }
    }, {
      key: 'clear',
      value: function clear() {

        this.$elements.removeClass(this.options.classes.selected);

        this._resetPrev();

        this._trigger('change');
      }
    }, {
      key: 'invert',
      value: function invert() {

        this.$elements.toggleClass(this.options.classes.selected);

        this._resetPrev();

        this._trigger('change');
      }
    }]);

    return Selectable;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Selectable, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Browser, Svelto.Mouse);

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

(function ($, _, Svelto, Widgets, Factory, Pointer) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var Slider = function (_Widgets$Widget31) {
    _inherits(Slider, _Widgets$Widget31);

    function Slider() {
      _classCallCheck(this, Slider);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Slider).apply(this, arguments));
    }

    _createClass(Slider, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$slider = this.$element;
        this.$input = this.$slider.find(this.options.selectors.input);
        this.$min = this.$slider.find(this.options.selectors.min);
        this.$max = this.$slider.find(this.options.selectors.max);
        this.$bar = this.$slider.find(this.options.selectors.bar);
        this.$unhighlight = this.$slider.find(this.options.selectors.unhighlight);
        this.$highlight = this.$slider.find(this.options.selectors.highlight);
        this.$handlerWrp = this.$slider.find(this.options.selectors.handlerWrp);
        this.$label = this.$slider.find(this.options.selectors.label);
      }
    }, {
      key: '_init',
      value: function _init() {

        /* VARIABLES */

        var value = this.$input.val();

        /* OPTIONS */

        this.options.min = Number(this.$min.data(this.options.datas.min) || this.options.min);
        this.options.max = Number(this.$max.data(this.options.datas.max) || this.options.max);
        this.options.value = this._sanitizeValue(value || this.options.value);
        this.options.step = Number(this.$slider.data(this.options.datas.step) || this.options.step);
        this.options.decimals = Number(this.$slider.data(this.options.datas.decimals) || this.options.decimals);

        /* STEPS NR */

        this.stepsNr = (this.options.max - this.options.min) / this.options.step;

        /* UPDATE */

        this._updateVariables();

        if (Number(value) !== this.options.value) {

          this._update();
        } else {

          this._updatePositions();
          this._updateLabel();
        }
      }
    }, {
      key: '_events',
      value: function _events() {

        this.___change();
        this.___resize();
        this.___keydown();
        this.___minTap();
        this.___maxTap();
        this.___drag();
      }

      /* PRIVATE */

    }, {
      key: '_sanitizeValue',
      value: function _sanitizeValue(value) {

        return _.clamp(Number(Number(value).toFixed(this.options.decimals)), this.options.min, this.options.max);
      }

      /* UPDATE */

    }, {
      key: '_updateVariables',
      value: function _updateVariables() {

        this.unhighlightWidth = this.$unhighlight.width();

        this.stepWidth = this.unhighlightWidth / this.stepsNr;
      }
    }, {
      key: '_updatePositions',
      value: function _updatePositions() {

        var percentage = (this.options.value - this.options.min) / this.options.step * 100 / this.stepsNr,
            translateX = this.unhighlightWidth / 100 * percentage;

        this.$handlerWrp.translateX(translateX);

        this.$highlight.translateX(translateX);
      }
    }, {
      key: '_updateLabel',
      value: function _updateLabel() {
        var value = arguments.length <= 0 || arguments[0] === undefined ? this.options.value : arguments[0];

        this.$label.text(value);
      }
    }, {
      key: '_updateInput',
      value: function _updateInput() {

        this.$input.val(this.options.value).trigger('change');
      }
    }, {
      key: '_update',
      value: function _update() {

        this._updatePositions();
        this._updateLabel();
        this._updateInput();
      }

      /* CHANGE */

    }, {
      key: '___change',
      value: function ___change() {

        this._on(true, this.$input, 'change', this.__change);
      }
    }, {
      key: '__change',
      value: function __change() {

        this.set(this.$input.val());
      }

      /* RESIZE */

    }, {
      key: '___resize',
      value: function ___resize() {

        this._on(true, this.$window, 'resize', this._debounce(this.__resize, 100)); //FIXME: It should handle a generic parent `resize`-like event, not just on `this.$window`
      }
    }, {
      key: '__resize',
      value: function __resize() {

        this._updateVariables();
        this._updatePositions();
      }

      /* KEYDOWN */

    }, {
      key: '___keydown',
      value: function ___keydown() {

        this._onHover([$document, 'keydown', this.__keydown]);
      }

      /* MIN TAP */

    }, {
      key: '___minTap',
      value: function ___minTap() {

        this._on(this.$min, Pointer.tap, this.decrease);
      }

      /* MAX TAP */

    }, {
      key: '___maxTap',
      value: function ___maxTap() {

        this._on(this.$max, Pointer.tap, this.increase);
      }

      /* DRAG */

    }, {
      key: '___drag',
      value: function ___drag() {

        this.$handlerWrp.draggable({
          draggable: this.isEnabled.bind(this),
          axis: 'x',
          proxy: {
            $element: this.$bar
          },
          constrainer: {
            $element: this.$bar,
            center: true
          },
          modifiers: {
            x: this._dragModifierX.bind(this)
          },
          callbacks: {
            move: this.__dragMove.bind(this),
            end: this.__dragEnd.bind(this)
          }
        });
      }
    }, {
      key: '_dragModifierX',
      value: function _dragModifierX(distance) {

        return _.roundCloser(distance, this.stepWidth);
      }
    }, {
      key: '__dragMove',
      value: function __dragMove(event, data) {

        if (this.options.live) {

          this.set(this.options.min + data.dragXY.X / this.stepWidth * this.options.step);
        } else {

          this.$highlight.translateX(data.dragXY.X);

          this._updateLabel(this._sanitizeValue(this.options.min + data.dragXY.X / this.stepWidth * this.options.step));
        }
      }
    }, {
      key: '__dragEnd',
      value: function __dragEnd(event, data) {

        this.set(this.options.min + data.dragXY.X / this.stepWidth * this.options.step);
      }

      /* API */

    }, {
      key: 'get',
      value: function get() {

        return this.options.value;
      }
    }, {
      key: 'set',
      value: function set(value) {

        value = this._sanitizeValue(value);

        if (_.isNaN(value) || value === this.options.value) return;

        this.options.value = value;

        this._update();

        this._trigger('change');
      }
    }, {
      key: 'increase',
      value: function increase() {

        this.set(this.options.value + this.options.step);
      }
    }, {
      key: 'decrease',
      value: function decrease() {

        this.set(this.options.value - this.options.step);
      }
    }]);

    return Slider;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Slider, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer);

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

(function ($, _, Svelto, Widgets, Factory, Pointer) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'sortable',
    plugin: true,
    selector: 'table.sortable',
    options: {
      sorters: {
        int: function int(a, b) {
          return parseInt(a, 10) - parseInt(b, 10);
        },
        float: function float(a, b) {
          return parseFloat(a) - parseFloat(b);
        },
        string: function string(a, b) {
          a = a.toLocaleLowerCase();
          b = b.toLocaleLowerCase();
          return a.localeCompare(b);
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

  var Sortable = function (_Widgets$Widget32) {
    _inherits(Sortable, _Widgets$Widget32);

    function Sortable() {
      _classCallCheck(this, Sortable);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Sortable).apply(this, arguments));
    }

    _createClass(Sortable, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$table = this.$element;
        this.$headers = this.$table.find(this.options.selectors.header);
        this.$sortables = this.$headers.filter(this.options.selectors.sortable);
        this.$tbody = this.$table.find(this.options.selectors.body);

        this.table = this.element;
        this.tbody = this.$tbody[0];

        this.sortData = {}; // Caching object for datas and references to rows
        this.isDirty = true;

        this.$currentSortable = false;
        this.currentIndex = false; // `$headers` index, not `$sortables` index
        this.currentDirection = false;
      }
    }, {
      key: '_init',
      value: function _init() {

        var $initial = this.$headers.filter('.' + this.options.classes.sort.asc + ', .' + this.options.classes.sort.desc).first();

        if ($initial.length === 1) {

          this.sort(this.$headers.index($initial), $initial.hasClass(this.options.classes.sort.asc) ? 'asc' : 'desc');
        }
      }
    }, {
      key: '_events',
      value: function _events() {

        this.___change();
        this.___tap();
      }

      /* CHANGE */

    }, {
      key: '___change',
      value: function ___change() {

        this._on(true, 'change tablehelper:change', this.__change);
      }
    }, {
      key: '__change',
      value: function __change() {

        if (this.currentIndex !== false) {

          this.sortData = {};
          this.isDirty = true;

          this.sort(this.currentIndex, this.currentDirection);
        }
      }

      /* TAP */

    }, {
      key: '___tap',
      value: function ___tap() {

        this._on(this.$sortables, Pointer.tap, this.__tap);
      }
    }, {
      key: '__tap',
      value: function __tap(event) {

        var newIndex = this.$headers.index(event.target),
            newDirection = this.currentIndex === newIndex ? this.currentDirection === 'asc' ? 'desc' : 'asc' : 'asc';

        this.sort(newIndex, newDirection);
      }

      /* SORT */

    }, {
      key: 'sort',
      value: function sort(index, direction) {

        /* VALIDATE */

        var $sortable = this.$headers.eq(index);

        if (!$sortable.length) return; // Bad index

        var sorterName = $sortable.data(this.options.datas.sorter);

        if (!sorterName) return; // Unsortable column

        var sorter = this.options.sorters[sorterName];

        if (!sorter) return; // Unsupported sorter

        direction = direction && direction.toLowerCase() === 'desc' ? 'desc' : 'asc';

        /* CHECKING CACHED DATAS */

        if (_.isUndefined(this.sortData[index]) || this.isDirty) {

          /* VARIABLES */

          var $trs = this.$tbody.find(this.options.selectors.notEmptyRow);

          this.sortData[index] = new Array($trs.length);

          /* POPULATE */

          for (var i = 0, l = $trs.length; i < l; i++) {

            var $td = $trs.eq(i).find(this.options.selectors.rowCell).eq(index),
                value = $td.data(this.options.datas.value) || $td.text();

            this.sortData[index][i] = [$trs[i], value];
          }
        }

        /* SORT */

        if (index !== this.currentIndex || this.isDirty) {

          this.sortData[index].sort(function (a, b) {

            return sorter(a[1], b[1]);
          });
        }

        /* REVERSING */

        var needReversing = false;

        if (!this.isDirty && index === this.currentIndex && this.currentDirection !== false) {

          needReversing = direction !== this.currentDirection;
        } else {

          needReversing = direction === 'desc';
        }

        if (needReversing) {

          this.sortData[index].reverse();
        }

        /* REORDER */

        if (index !== this.currentIndex || direction !== this.currentDirection || this.isDirty) {

          this.table.removeChild(this.tbody); // Detach

          for (var i = 0, l = this.sortData[index].length; i < l; i++) {

            this.tbody.appendChild(this.sortData[index][i][0]); // Reorder
          }

          this.table.appendChild(this.tbody); // Attach
        }

        /* STYLE */

        if (index !== this.currentIndex || direction !== this.currentDirection) {

          if (this.$currentSortable) {

            this.$currentSortable.removeClass(this.options.classes.sort[this.currentDirection]);
          }

          $sortable.addClass(this.options.classes.sort[direction]);
        }

        /* UPDATE */

        this.isDirty = false;

        this.$currentSortable = $sortable;
        this.currentIndex = index;
        this.currentDirection = direction;

        /* TRIGGER */

        this._trigger('sort', {
          index: this.currentIndex,
          direction: this.currentDirection
        });
      }
    }]);

    return Sortable;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Sortable, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer);

/* =========================================================================
 * Svelto - Stepper
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory, Pointer) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var Stepper = function (_Widgets$Widget33) {
    _inherits(Stepper, _Widgets$Widget33);

    function Stepper() {
      _classCallCheck(this, Stepper);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Stepper).apply(this, arguments));
    }

    _createClass(Stepper, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$stepper = this.$element;
        this.$input = this.$stepper.find(this.options.selectors.input);
        this.$decreaser = this.$stepper.find(this.options.selectors.decreaser);
        this.$increaser = this.$stepper.find(this.options.selectors.increaser);

        this._prevValue = false;
      }
    }, {
      key: '_init',
      value: function _init() {

        /* VARIABLES */

        var value = this.$input.val();

        /* OPTIONS */

        this.options.min = Number(this.$stepper.data(this.options.datas.min) || this.options.min);
        this.options.max = Number(this.$stepper.data(this.options.datas.max) || this.options.max);
        this.options.step = Number(this.$stepper.data(this.options.datas.step) || this.options.step);
        this.options.value = this._sanitizeValue(value || this.options.value);

        /* UPDATE */

        if (Number(value) !== this.options.value) {

          this._update();
        } else {

          this._updateButtons();
        }
      }
    }, {
      key: '_events',
      value: function _events() {

        this.___inputChange();

        this.___keydown();

        this.___increaser();
        this.___decreaser();
      }

      /* PRIVATE */

    }, {
      key: '_sanitizeValue',
      value: function _sanitizeValue(value) {

        value = Number(value);

        value = _.isNaN(value) ? 0 : _.roundCloser(value, this.options.step);

        return _.clamp(value, this.options.min, this.options.max);
      }

      /* INPUT / CHANGE */

    }, {
      key: '___inputChange',
      value: function ___inputChange() {

        this._on(true, this.$input, 'input change', this.__inputChange);
      }
    }, {
      key: '__inputChange',
      value: function __inputChange() {

        this.set(this.$input.val());
      }

      /* KEYDOWN */

    }, {
      key: '___keydown',
      value: function ___keydown() {

        this._onHover([this.$document, 'keydown', this.__keydown]);
      }

      /* INCREASER */

    }, {
      key: '___increaser',
      value: function ___increaser() {

        this._on(this.$decreaser, Pointer.tap, this.decrease);
      }

      /* DECREASER */

    }, {
      key: '___decreaser',
      value: function ___decreaser() {

        this._on(this.$increaser, Pointer.tap, this.increase);
      }

      /* UPDATE */

    }, {
      key: '_updateInput',
      value: function _updateInput() {

        this.$input.val(this.options.value).trigger('change');
      }
    }, {
      key: '_updateButtons',
      value: function _updateButtons() {

        var isMin = this.options.value === this.options.min,
            isMax = this.options.value === this.options.max;

        if (isMin || this._prevValue === this.options.min) {

          this.$decreaser.toggleClass(this.options.classes.disabled, isMin);
        } else if (isMax || this._prevValue === this.options.max) {

          this.$increaser.toggleClass(this.options.classes.disabled, isMax);
        }
      }
    }, {
      key: '_update',
      value: function _update() {

        this._updateInput();
        this._updateButtons();
      }

      /* API */

    }, {
      key: 'get',
      value: function get() {

        return this.options.value;
      }
    }, {
      key: 'set',
      value: function set(value) {

        value = Number(value);

        if (!_.isNaN(value)) {

          value = this._sanitizeValue(value);

          if (value !== this.options.value) {

            this._prevValue = this.options.value;

            this.options.value = value;

            this._update();

            this._trigger('change');

            return;
          }
        }

        /* RESETTING IF WE ALTERED THE INPUT VALUE */

        if (this.$input.val() !== String(this.options.value)) {

          this._updateInput();
        }
      }
    }, {
      key: 'increase',
      value: function increase() {

        this.set(this.options.value + this.options.step);
      }
    }, {
      key: 'decrease',
      value: function decrease() {

        this.set(this.options.value - this.options.step);
      }
    }]);

    return Stepper;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Stepper, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer);

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

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var Switch = function (_Widgets$Widget34) {
    _inherits(Switch, _Widgets$Widget34);

    function Switch() {
      _classCallCheck(this, Switch);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Switch).apply(this, arguments));
    }

    _createClass(Switch, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$switch = this.$element;
        this.$input = this.$switch.find(this.options.selectors.input);
        this.$bar = this.$switch.find(this.options.selectors.bar);
        this.$handler = this.$switch.find(this.options.selectors.handler);

        this.isChecked = false;

        this.switchWidth = this.$switch.width();
        this.handlerWidth = this.$handler.width();
      }
    }, {
      key: '_init',
      value: function _init() {

        /* OPTIONS */

        this.options.colors.on = this.$switch.data(this.options.datas.colors.on) || this.options.colors.on;
        this.options.colors.off = this.$switch.data(this.options.datas.colors.off) || this.options.colors.off;

        /* CHECKED */

        if (this.$input.prop('checked')) {

          this.check();
        }
      }
    }, {
      key: '_events',
      value: function _events() {

        this.___change();
        this.___keydown();
        this.___drag();
      }
    }, {
      key: '_destroy',
      value: function _destroy() {

        this.$handler.draggable('destroy');
      }

      /* CHANGE */

    }, {
      key: '___change',
      value: function ___change() {

        this._on(true, this.$input, 'change', this.__change);
      }
    }, {
      key: '__change',
      value: function __change() {

        this.toggle(this.$input.prop('checked'));
      }

      /* KEYDOWN */

    }, {
      key: '___keydown',
      value: function ___keydown() {

        this._onHover([this.$document, 'keydown', this.__keydown]);
      }

      /* DRAG */

    }, {
      key: '___drag',
      value: function ___drag() {

        this.$handler.draggable({
          draggable: this.isEnabled.bind(this),
          axis: 'x',
          proxy: {
            $element: this.$switch,
            noMotion: false
          },
          constrainer: {
            $element: this.$switch
          },
          callbacks: {
            end: this.__dragEnd.bind(this)
          }
        });
      }
    }, {
      key: '__dragEnd',
      value: function __dragEnd(event, data) {

        if (data.motion) {

          var isChecked = data.dragXY.X + this.handlerWidth / 2 >= this.switchWidth / 2;

          this.toggle(isChecked, true);
        } else {

          this.toggle();
        }
      }

      /* UPDATE */

    }, {
      key: '_updatePosition',
      value: function _updatePosition() {

        this.$handler.translateX(this.isChecked ? this.switchWidth - this.handlerWidth : 0);
      }
    }, {
      key: '_updateColors',
      value: function _updateColors() {

        this.$bar.toggleClass(this.options.colors.on, this.isChecked);
        this.$bar.toggleClass(this.options.colors.off, !this.isChecked);

        this.$handler.toggleClass(this.options.colors.on, this.isChecked);
        this.$handler.toggleClass(this.options.colors.off, !this.isChecked);
      }
    }, {
      key: '_updateInput',
      value: function _updateInput() {

        this.$input.prop('checked', this.isChecked).trigger('change');
      }
    }, {
      key: '_update',
      value: function _update() {

        this._updatePosition();
        this._updateColors();
        this._updateInput();
      }

      /* API */

    }, {
      key: 'get',
      value: function get() {

        return this.isChecked;
      }
    }, {
      key: 'toggle',
      value: function toggle(force, _reset) {

        if (!_.isBoolean(force)) {

          force = !this.isChecked;
        }

        if (force !== this.isChecked) {

          this.isChecked = force;

          this.$switch.toggleClass(this.options.classes.checked, this.isChecked);

          this._update();

          this._trigger('change');

          this._trigger(this.isChecked ? 'check' : 'uncheck');
        } else if (_reset) {

          this._updatePosition();
        }
      }
    }, {
      key: 'check',
      value: function check() {

        this.toggle(true);
      }
    }, {
      key: 'uncheck',
      value: function uncheck() {

        this.toggle(false);
      }
    }]);

    return Switch;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Switch, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Table Helper
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'tableHelper',
    plugin: true,
    selector: 'table.table',
    templates: {
      row: '<tr {%= ( o.id ? "class=" + o.id : "" ) %} >' + '{% for ( var i = 0, l = o.datas.length; i < l; i++ ) { %}' + '<td>' + '{%=o.datas[i]%}' + '</td>' + '{% } %}' + '{% for ( var i = 0, l = o.missing; i < l; i++ ) { %}' + '<td></td>' + '{% } %}' + '</tr>'
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
    }
  };

  /* TABLE HELPER */

  var TableHelper = function (_Widgets$Widget35) {
    _inherits(TableHelper, _Widgets$Widget35);

    function TableHelper() {
      _classCallCheck(this, TableHelper);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(TableHelper).apply(this, arguments));
    }

    _createClass(TableHelper, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$table = this.$element;
        this.$header = this.$table.find(this.options.selectors.header);
        this.$body = this.$table.find(this.options.selectors.body);
        this.$headerCells = this.$header.find(this.options.selectors.headerCell);
        this.$emptyRow = this.$body.find(this.options.selectors.emptyRow);

        this.columnsNr = this.$headerCells.length;
      }
    }, {
      key: '_init',
      value: function _init() {

        this._checkEmpty();
      }

      /* PRIVATE */

    }, {
      key: '_checkEmpty',
      value: function _checkEmpty() {

        var hasNonEmptyRows = !!this.$body.find(this.options.selectors.notEmptyRow).length;

        this.$emptyRow.toggleClass(this.options.classes.hidden, hasNonEmptyRows);
      }
    }, {
      key: '_getRowId',
      value: function _getRowId(id) {

        return this.options.rowIdPrefix + '_' + this.guid + '_' + id;
      }

      /* API */

    }, {
      key: 'add',
      value: function add(id) {

        var rowId = id ? this._getRowId(id) : false;

        for (var _len6 = arguments.length, datas = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          datas[_key6 - 1] = arguments[_key6];
        }

        if (datas.length) {

          if (rowId && $('.' + rowId).length === 1) return this;

          var chunks = _.chunk(datas, this.columnsNr),
              $rows = $();

          var _iteratorNormalCompletion16 = true;
          var _didIteratorError16 = false;
          var _iteratorError16 = undefined;

          try {
            for (var _iterator16 = chunks[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
              var chunk = _step16.value;

              var rowHtml = this._tmpl('row', { id: rowId, datas: chunk, missing: this.columnsNr - chunk.length });

              $rows = $rows.add(rowHtml);
            }
          } catch (err) {
            _didIteratorError16 = true;
            _iteratorError16 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion16 && _iterator16.return) {
                _iterator16.return();
              }
            } finally {
              if (_didIteratorError16) {
                throw _iteratorError16;
              }
            }
          }

          this.$body.append($rows);

          this._checkEmpty();

          this._trigger('change');

          this._trigger('add', {
            $rows: $rows
          });
        }
      }
    }, {
      key: 'update',
      value: function update(id) {

        var $row = $('.' + this._getRowId(id));

        for (var _len7 = arguments.length, datas = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
          datas[_key7 - 1] = arguments[_key7];
        }

        if (datas.length && $row.length === 1) {

          var $rowCells = $row.find(this.options.selectors.rowCell);

          for (var i = 0, l = datas.length; i < l; i++) {

            if (_.isString(datas[i])) {

              $rowCells.eq(i).html(datas[i]);
            }
          }

          this._trigger('change');

          this._trigger('update', {
            $row: $row
          });
        }
      }
    }, {
      key: 'remove',
      value: function remove(id) {

        var $row = $('.' + this._getRowId(id));

        if ($row.length === 1) {

          $row.remove();

          this._checkEmpty();

          this._trigger('change');

          this._trigger('remove', {
            $row: $row
          });
        }
      }
    }, {
      key: 'clear',
      value: function clear() {

        var $rows = this.$body.find(this.options.selectors.notEmptyRow);

        if ($rows.length) {

          $rows.remove();

          this._checkEmpty();

          this._trigger('change');

          this._trigger('clear', {
            $rows: $rows
          });
        }
      }
    }]);

    return TableHelper;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(TableHelper, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

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

(function ($, _, Svelto, Widgets, Factory, Pointer) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var Tabs = function (_Widgets$Widget36) {
    _inherits(Tabs, _Widgets$Widget36);

    function Tabs() {
      _classCallCheck(this, Tabs);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Tabs).apply(this, arguments));
    }

    _createClass(Tabs, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {
        var _this71 = this;

        this.$tabs = this.$element;
        this.$triggers = this.$tabs.find(this.options.selectors.triggers);
        this.$containers = this.$tabs.find(this.options.selectors.containers);

        this.options.direction = _.getDirections().find(function (direction) {
          return _this71.$tabs.hasClass(direction);
        }) || this.options.direction;

        this.index = false;
      }
    }, {
      key: '_init',
      value: function _init() {

        var $active = this.$triggers.filter('.' + this.options.classes.active.trigger).first(),
            index = this.$triggers.index($active);

        this.set(index);
      }
    }, {
      key: '_events',
      value: function _events() {

        this.___tap();
      }

      /* PRIVATE */

    }, {
      key: '_sanitizeIndex',
      value: function _sanitizeIndex(index) {

        return _.clamp(index, 0, this.$triggers.length);
      }

      /* TAP */

    }, {
      key: '___tap',
      value: function ___tap() {

        this._on(this.$triggers, Pointer.tap, this.__tap);
      }
    }, {
      key: '__tap',
      value: function __tap(event) {

        var index = this.$triggers.index($(event.currentTarget));

        this.set(index);
      }

      /* SELECTION */

    }, {
      key: '_toggleSelection',
      value: function _toggleSelection(index, force) {

        var $trigger = this.$triggers.eq(index),
            $container = this.$containers.eq(index);

        $trigger.toggleClass(this.options.classes.active.trigger, force);
        $container.toggleClass(this.options.classes.active.container, force);

        if (this.options.highlight) {

          $trigger.toggleClass('highlighted highlight-' + _.getOppositeDirection(this.options.direction), force);
        }
      }
    }, {
      key: '_select',
      value: function _select(index) {

        this._toggleSelection(index, true);
      }
    }, {
      key: '_unselect',
      value: function _unselect(index) {

        this._toggleSelection(index, false);
      }

      /* API */

    }, {
      key: 'get',
      value: function get() {

        return this.index;
      }
    }, {
      key: 'set',
      value: function set(index) {

        index = this._sanitizeIndex(index);

        if (index === this.index) return;

        /* PREVIOUS */

        if (_.isNumber(this.index)) {

          this._unselect(this.index);
        }

        /* NEW */

        this.index = index;

        this._select(this.index);

        /* CALLBACKS */

        this._trigger('change');
      }
    }]);

    return Tabs;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Tabs, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer);

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

(function ($, _, Svelto, Widgets, Factory, Pointer, Keyboard) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'tagbox',
    plugin: true,
    selector: '.tagbox',
    templates: {
      tag: '<div class="label tagbox-tag {%=o.color%} {%=o.size%} {%=o.css%}" data-tag-value="{%=o.value%}">' + '<span>' + '{%=o.value%}' + '</span>' + '<div class="button gray compact rounded xxsmall tagbox-tag-remover">' + '<i class="icon">close</i>' + '</div>' + '</div>'
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
        forbidden: ['<', '>', ';', '`'],
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

  var Tagbox = function (_Widgets$Widget37) {
    _inherits(Tagbox, _Widgets$Widget37);

    function Tagbox() {
      _classCallCheck(this, Tagbox);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Tagbox).apply(this, arguments));
    }

    _createClass(Tagbox, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$tagbox = this.$element;
        this.$tags = this.$tagbox.find(this.options.selectors.tags);
        this.$input = this.$tagbox.find(this.options.selectors.input);
        this.$partial = this.$tagbox.find(this.options.selectors.partial);
      }
    }, {
      key: '_init',
      value: function _init(suppressTriggers) {

        /* OPTIONS */

        this.options.init = this.$input.val() || this.options.init;

        /* POPULATING */

        this.add(this.options.init, suppressTriggers);
      }
    }, {
      key: '_events',
      value: function _events() {

        this.___partial();

        this.___tapOnEmpty();
        this.___tapOnTagRemover();
      }

      /* PRIVATE */

    }, {
      key: '_sanitizeTag',
      value: function _sanitizeTag(value) {

        value = _.trim(value);

        if (this.options.escape) {

          value = _.escape(value);
        }

        if (this.options.deburr) {

          value = _.deburr(value);
        }

        return value;
      }
    }, {
      key: '_getTagHtml',
      value: function _getTagHtml(value) {

        return this._tmpl('tag', _.extend({ value: value }, this.options.tag));
      }
    }, {
      key: '_clearPartial',
      value: function _clearPartial() {

        this.$partial.val('').trigger('change');
      }

      /* UPDATE */

    }, {
      key: '_updateInput',
      value: function _updateInput() {

        this.$input.val(this.options.tags.join(this.options.characters.separator)).trigger('change');
      }

      /* TAG */

    }, {
      key: '_add',
      value: function _add(value) {

        var valueTrimmed = _.trim(value);

        value = this._sanitizeTag(value);

        if (valueTrimmed.length < this.options.tag.minLength) {

          if (valueTrimmed.length) {
            // So it won't be triggered when the user presses enter and the $partial is empty

            $.noty(_.format(this.options.messages.tooShort, value, this.options.tag.minLength));
          }
        } else if (_.contains(this.options.tags, value)) {

          $.noty(_.format(this.options.messages.duplicate, value));
        } else {

          this.options.tags.push(value);

          if (this.options.sort) {

            this.options.tags.sort();
          }

          var tagHtml = this._getTagHtml(value);

          if (this.options.tags.length === 1) {

            this.$tags.prepend(tagHtml);
          } else if (!this.options.sort) {

            this.$tagbox.find(this.options.selectors.tag).last().after(tagHtml);
          } else {

            var index = this.options.tags.indexOf(value);

            if (index === 0) {

              this.$tagbox.find(this.options.selectors.tag).first().before(tagHtml);
            } else {

              this.$tagbox.find(this.options.selectors.tag).eq(index - 1).after(tagHtml);
            }
          }

          return true;
        }

        return false;
      }
    }, {
      key: '_remove',
      value: function _remove($tag, tag) {

        $tag.remove();

        _.pull(this.options.tags, tag);
      }

      /* PARTIAL */

    }, {
      key: '___partial',
      value: function ___partial() {

        this._on(this.$partial, 'keypress keydown', this.__keypressKeydown); // `keypress` is for printable characters, `keydown` for the others

        this._on(this.$partial, 'paste', this.__paste);
      }

      /* KEYPRESS / KEYDOWN */

    }, {
      key: '__keypressKeydown',
      value: function __keypressKeydown(event) {

        var value = this.$partial.val();

        if (_.contains(this.options.characters.inserters, event.keyCode) || event.keyCode === this.options.characters.separator.charCodeAt(0)) {

          var added = this.add(value);

          if (added) {

            this._clearPartial();
          }

          event.preventDefault();
          event.stopImmediatePropagation();
        } else if (event.keyCode === Keyboard.keys.BACKSPACE) {

          if (!value.length && this.options.tags.length) {

            var $tag = this.$tagbox.find(this.options.selectors.tag).last(),
                edit = !$.hasCtrlOrCmd(event);

            this.remove($tag, edit);

            event.preventDefault();
            event.stopImmediatePropagation();
          }
        } else if (this.options.characters.forbid && _.contains(this.options.characters.forbidden, String.fromCharCode(event.keyCode))) {

          $.noty(this.options.messages.forbidden);

          event.preventDefault();
          event.stopImmediatePropagation();
        }
      }

      /* PASTE */

    }, {
      key: '__paste',
      value: function __paste(event) {

        this.add(event.originalEvent.clipboardData.getData('text'));

        event.preventDefault();
        event.stopImmediatePropagation();
      }

      /* TAP ON TAG REMOVER */

    }, {
      key: '___tapOnTagRemover',
      value: function ___tapOnTagRemover() {

        this._on(Pointer.tap, this.options.selectors.tagRemover, this.__tapOnTagRemover);
      }
    }, {
      key: '__tapOnTagRemover',
      value: function __tapOnTagRemover(event) {

        var $tag = $(event.currentTarget).closest(this.options.selectors.tag);

        this.remove($tag);
      }

      /* TAP ON EMPTY */

    }, {
      key: '___tapOnEmpty',
      value: function ___tapOnEmpty() {

        this._on(Pointer.tap, this.__tapOnEmpty);
      }
    }, {
      key: '__tapOnEmpty',
      value: function __tapOnEmpty(event) {

        if (document.activeElement !== this.$partial[0] && !$(event.target).is(this.options.selectors.partial + ',' + this.options.selectors.tagLabel)) {

          this.$partial.focus();
        }
      }

      /* API */

    }, {
      key: 'get',
      value: function get() {

        return _.clone(this.options.tags);
      }
    }, {
      key: 'add',
      value: function add(tag, suppressTriggers) {
        // The tag can be a string containing a single tag, multiple tags separated by `this.options.characters.separator`, or it can be an array (nested or not) of those strings

        if (_.isArray(tag)) {

          tag = _.flatten(tag).join(this.options.characters.separator);
        }

        var tags = tag.split(this.options.characters.separator),
            adds = _.map(tags, this._add, this);

        var added = !!_.compact(adds).length;

        if (added) {

          this._updateInput();

          if (!suppressTriggers) {

            this._trigger('change');

            var addedTags = _.filter(tags, function (tag, index) {
              return adds[index];
            });

            this._trigger('add', addedTags);
          }
        }

        return added;
      }
    }, {
      key: 'remove',
      value: function remove(tag, edit, suppressTriggers) {
        // The tag can be a string containing a single tag, multiple tags separated by `this.options.characters.separator`, or it can be an array (nested or not) of those strings. In addition it can also be the jQuery object of that tag.

        var $tags = [],
            tags = [];

        if (tag instanceof $) {

          $tags = [tag];
          tags = [tag.data(this.options.datas.value)];
        } else {

          if (_.isArray(tag)) {

            tag = _.flatten(tag).join(this.options.characters.separator);
          }

          tag = tag.split(this.options.characters.separator);

          for (var i = 0, l = tag.length; i < l; i++) {

            var value = this._sanitizeTag(tag[i]),
                $tag = this.$tagbox.find(this.options.selectors.tag + '[data-' + this.options.datas.value + '="' + value.replace(/"/g, '\\"') + '"]');

            if ($tag.length === 1) {

              $tags.push($tag);
              tags.push(value);
            }
          }
        }

        if (tags.length) {

          for (var i = 0, l = tags.length; i < l; i++) {

            this._remove($tags[i], tags[i]);
          }

          this._updateInput();

          if (tags.length === 1 && edit === true) {

            this.$partial.val(tags[0]).trigger('change');
          }

          if (!suppressTriggers) {

            this._trigger('change');

            this._trigger('remove', tags);

            if (!this.options.tags.length) {

              this._trigger('empty');
            }
          }
        }
      }
    }, {
      key: 'clear',
      value: function clear(suppressTriggers) {

        if (this.options.tags.length) {

          var previous = this.options.tags;

          this.options.tags = [];

          this.$tagbox.find(this.options.selectors.tag).remove();

          this._clearPartial();

          this._updateInput();

          if (!suppressTriggers) {

            this._trigger('change');

            this._trigger('remove', previous);

            this._trigger('empty');
          }
        }
      }
    }, {
      key: 'reset',
      value: function reset() {

        var previous = this.options.tags;

        this.clear(true);

        this._init(true);

        if (!_.isEqual(previous, this.options.tags)) {

          this._trigger('change');

          var added = _.difference(this.options.tags, previous);

          if (added.length) {

            this._trigger('add', added);
          }

          var removed = _.difference(previous, this.options.tags);

          if (removed.length) {

            this._trigger('remove', removed);
          }

          if (!this.options.tags.length) {

            this._trigger('empty');
          }
        }
      }
    }]);

    return Tagbox;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Tagbox, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Keyboard);

/* =========================================================================
 * Svelto - Time Ago
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var TimeAgo = function (_Widgets$Widget38) {
    _inherits(TimeAgo, _Widgets$Widget38);

    function TimeAgo() {
      _classCallCheck(this, TimeAgo);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(TimeAgo).apply(this, arguments));
    }

    _createClass(TimeAgo, [{
      key: '_variables',

      /* SPECIAL */

      value: function _variables() {

        this.$timeAgoElement = this.$element;
      }
    }, {
      key: '_init',
      value: function _init() {

        if (!this.options.timestamp) {

          this.options.timestamp = this.$timeAgoElement.data(this.options.datas.timestamp);
        }

        if (this.isEnabled()) {

          this._loop();
        }
      }
    }, {
      key: '_destroy',
      value: function _destroy() {

        clearTimeout(this.loopId);
      }

      /* LOOP */

    }, {
      key: '_loop',
      value: function _loop() {
        var seconds = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

        this.loopId = this._delay(function () {

          this._loop(this._update().next);
        }, seconds * 1000);
      }

      /* UPDATE */

    }, {
      key: '_update',
      value: function _update() {

        var timeAgo = _.timeAgo(this.options.timestamp);

        if (this.options.title) {

          this.$timeAgoElement.attr('title', timeAgo.str);
        } else {

          this.$timeAgoElement.text(timeAgo.str);
        }

        this._trigger('change');

        return timeAgo;
      }

      /* API OVERRIDES */

    }, {
      key: 'enable',
      value: function enable() {

        _get(Object.getPrototypeOf(TimeAgo.prototype), 'enable', this).call(this);

        this._loop();
      }
    }, {
      key: 'disable',
      value: function disable() {

        _get(Object.getPrototypeOf(TimeAgo.prototype), 'disable', this).call(this);

        clearTimeout(this.loopId);
      }
    }]);

    return TimeAgo;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(TimeAgo, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Timer);

/* =========================================================================
 * Svelto - Tooltip
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../dropdown/dropdown.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'tooltip',
    selector: '.tooltip'
  };

  /* TOOLTIP */

  var Tooltip = function (_Widgets$Dropdown) {
    _inherits(Tooltip, _Widgets$Dropdown);

    function Tooltip() {
      _classCallCheck(this, Tooltip);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Tooltip).apply(this, arguments));
    }

    return Tooltip;
  }(Widgets.Dropdown);

  /* FACTORY */

  Factory.init(Tooltip, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Tooltip (Closer)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires tooltip.js
 * @requires ../closer/closer.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'tooltipCloser',
    plugin: true,
    selector: '.tooltip-closer',
    options: {
      widget: Widgets.Tooltip
    }
  };

  /* TOOLTIP CLOSER */

  var TooltipCloser = function (_Widgets$Closer8) {
    _inherits(TooltipCloser, _Widgets$Closer8);

    function TooltipCloser() {
      _classCallCheck(this, TooltipCloser);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(TooltipCloser).apply(this, arguments));
    }

    return TooltipCloser;
  }(Widgets.Closer);

  /* FACTORY */

  Factory.init(TooltipCloser, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Tooltip (Opener)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires tooltip.js
 * @requires ../opener/opener.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var TooltipOpener = function (_Widgets$Opener7) {
    _inherits(TooltipOpener, _Widgets$Opener7);

    function TooltipOpener() {
      _classCallCheck(this, TooltipOpener);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(TooltipOpener).apply(this, arguments));
    }

    return TooltipOpener;
  }(Widgets.Opener);

  /* FACTORY */

  Factory.init(TooltipOpener, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Tooltip (Toggler)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires tooltip.js
 * @requires ../toggler/toggler.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
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

  var TooltipToggler = function (_Widgets$Toggler7) {
    _inherits(TooltipToggler, _Widgets$Toggler7);

    function TooltipToggler() {
      _classCallCheck(this, TooltipToggler);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(TooltipToggler).apply(this, arguments));
    }

    return TooltipToggler;
  }(Widgets.Toggler);

  /* FACTORY */

  Factory.init(TooltipToggler, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);
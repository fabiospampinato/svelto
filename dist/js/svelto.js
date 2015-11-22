'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* =========================================================================
 * Svelto - Svelto
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

//TODO: Remove the _ dependency, after all we use it only for a few functions

(function (window, document, undefined) {
  'use strict'

  /* SVELTO */

  ;
  window.Svelto = {
    version: '0.2.0-beta.2',
    $: jQuery || Zepto || $ || false,
    _: lodash || underscore || _ || false
  };

  /* ERRORS */

  if (!Svelto.$) {

    throw 'Svelto depends upon jQuery, dependency unmet.';
  }

  if (!Svelto._) {

    throw 'Svelto depends upon lo-dash, dependency unmet.';
  }
})(window, document);

/* =========================================================================
 * Svelto - Lo-dash (Extras)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function (_, window, document, undefined) {
  'use strict'

  /* LODASH EXTRA */

  ;
  _.mixin({

    /**
     * Gets the number of seconds that have elapsed since the Unix epoch
     * (1 January 1970 00:00:00 UTC).
     *
     * _.defer(function(stamp) {
     *   console.log(_.nowSecs() - stamp);
     * }, _.nowSecs());
     * // => logs the number of seconds it took for the deferred function to be invoked
     */

    nowSecs: function nowSecs() {

      return _.floor(_.now() / 1000);
    },

    /**
     * Gets a string format of number of seconds elapsed.
     *
     * _.timeAgo ( _.nowSecs () )
     * // => Just now
     */

    timeAgo: function timeAgo(timestamp) {
      //INFO: Timestamp is required in seconds

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
              number = _.floor(elapsed / secs);

          if (number >= 1) {

            return {
              str: number + ' ' + name + (number > 1 ? 's' : '') + ' ago',
              next: secs - (elapsed - number * secs)
            };
          }
        }
      }
    },

    /**
     * Return a boolean if the string is fuzzy matched with the search string.
     *
     * _.fuzzyMatch ( 'something', 'smTng' );
     * // => true
     *
     * _.fuzzyMatch ( 'something', 'smTng', false );
     * // => false
     *
     * _.fuzzyMatch ( 'something', 'semthing' );
     * // => false
     */

    fuzzyMatch: function fuzzyMatch(str, search, isCaseSensitive) {

      if (isCaseSensitive !== false) {

        str = str.toLowerCase();
        search = search.toLowerCase();
      }

      var currentIndex = -1,
          str_l = str.length;

      for (var search_i = 0, search_l = search.length; search_i < search_l; search_i++) {

        for (var _str_i = currentIndex + 1; _str_i < str_l; _str_i++) {

          if (str[_str_i] === search[search_i]) {

            currentIndex = _str_i;
            _str_i = str_l + 1;
          }
        }

        if (str_i === str_l) {

          return false;
        }
      }

      return true;
    },

    /**
     * Returns a number clamped between a minimum and maximum value.
     * If the maximum isn't provided, only clamps from the bottom.
     *
     * @param {number} minimum The minimum value.
     * @param {number} value The value to clamp.
     * @param {number} maximum The maximum value.
     * @returns {number} A value between minimum and maximum.
     *
     * @example
     *
     * _.clamp(2, 4, 6); // => 4
     * _.clamp(3, 2, 5); // => 3
     * _.clamp(2, 7, 5); // => 5
     */

    clamp: function clamp(minimum, value, maximum) {

      if (!_.isUndefined(minimum)) {

        if (value < minimum) {

          value = minimum;
        }
      }

      if (!_.isUndefined(maximum)) {

        if (value > maximum) {

          value = maximum;
        }
      }

      return value;
    },

    /**
     * Performs a binary each of the array
     */

    btEach: function btEach(arr, callback, startIndex) {

      var start = 0,
          end = arr.length - 1,
          center = _.isNumber(startIndex) ? startIndex : _.ceil((start + end) / 2),
          direction = void 0;

      while (start <= end) {

        direction = callback.call(arr[center], center, arr[center]);

        if (direction < 0) {

          end = center - 1;
        } else if (direction > 0) {

          start = center + 1;
        } else {

          return center;
        }

        center = _.ceil((start + end) / 2);
      }

      return -1;
    },

    /**
     * Move the item at `from` index inside the array to the `to` index
     */

    move: function move(arr, from, to) {

      arr.splice(to, 0, arr.splice(from, 1)[0]);
    },

    /**
     * Shorten the numer using common K and M syntax
     */

    mkize: function mkize(number) {

      if (number >= 1000000) {

        return number / 1000000 + 'M';
      } else if (number >= 1000) {

        return number / 1000 + 'K';
      } else {

        return number;
      }
    },

    /**
     * Round `number` so that it becames the closer `step` multiple
     */

    roundCloser: function roundCloser(number, step) {

      if (_.isUndefined(step)) {

        step = 1;
      }

      var left = number % step,
          halfStep = step / 2;

      return number - left + (left >= halfStep ? step : 0);
    },

    /**
     * Returns true
     */

    true: _.constant(true),

    /**
     * Returns false
     */

    false: _.constant(false)

  });
})(Svelto._, window, document);

/* =========================================================================
 * Svelto - Browser
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

(function ($, _, window, document, undefined) {
  'use strict'

  /* VARIABLES */

  ;
  var userAgent = navigator.userAgent.toLowerCase(),
      vendor = navigator.vendor ? navigator.vendor.toLowerCase() : '',
      //INFO: Fixes an IE10 bug, `navigator.vendor` it's undefined there
  appVersion = navigator.appVersion.toLowerCase();

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

  $.browser = {
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
      touchDevice: 'ontouchstart' in window || 'DocumentTouch' in window && document instanceof DocumentTouch
    }
  };
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - jQuery (Extras)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../browser/browser.js
 * ========================================================================= */

(function ($, _, window, document, undefined) {
  'use strict'

  /* ITERATOR */

  ;
  $.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

  /* HELPERS */

  $.eventXY = function (event) {

    if ('originalEvent' in event) {

      return $.eventXY(event.originalEvent);
    } else if ('changedTouches' in event && event.changedTouches.length > 0) {

      return {
        X: event.changedTouches[0].pageX,
        Y: event.changedTouches[0].pageY
      };
    } else if ('touches' in event && event.touches.length > 0) {

      return {
        X: event.touches[0].pageX,
        Y: event.touches[0].pageY
      };
    } else if ('pageX' in event) {

      return {
        X: event.pageX,
        Y: event.pageY
      };
    } else {

      throw 'UngettableEventXY'; //FIXME: Maybe remove this if everything is working fine and cannot go wrong
    }
  };

  $.frame = function (callback) {

    return requestAnimationFrame(callback);
  };

  $.hasCtrlOrCmd = function (event) {

    return !$.browser.is.mac && event.ctrlKey || $.browser.is.mac && event.metaKey;
  };

  $.getRect = function (node) {

    return node.getBoundingClientRect();
  };

  $.fn.getRect = function () {

    return this.length > 0 ? this[0].getBoundingClientRect() : undefined;
  };

  $.getOverlappingArea = function (rect1, rect2) {

    var overlapX = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left)),
        overlapY = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));

    return overlapX * overlapY;
  };

  $.fn.hsl = function (h, s, l) {

    //INFO: It only works for setting
    //FIXME: I'm not sure if this plugin should exists

    return this.css('background-color', 'hsl(' + h + ',' + s + '%,' + l + '%)');
  };

  $.fn.onHover = function () {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    //FIXME: If we remove the target we are still attaching and removing thos events thoug (just performing the functions calls actually, probably)

    this.on(Pointer.enter, function () {
      return _this.on.apply(_this, args);
    });
    this.on(Pointer.leave, function () {
      return _this.off.apply(_this, args);
    });
  };

  /* COMMON OBJECTS */

  $(function () {

    window.$window = $(window);
    window.$document = $(document);
    window.$html = $(document.documentElement);
    window.$head = $(document.head);
    window.$body = $(document.body);
    window.$empty = $();
  });
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - UI
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

(function ($, _, window, document, undefined) {
  'use strict'

  /* UI */

  ;
  window.UI = {};

  /* KEY CODE */

  UI.keyCode = {
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

  UI.mouseButton = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
  };

  /* ANIMATION */

  UI.animation = {
    slow: 500,
    normal: 350,
    fast: 150
  };

  /* COLORS */

  UI.colors = {
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
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Core
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * @requires ../extras/lodash-extra.js
 * @requires ../extras/jQuery-extra.js
 * @requires ../ui/ui.js
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

(function ($, _, window, document, undefined) {
  'use strict'

  /* TMPL */

  ;
  var tmpl = function tmpl(str, data) {

    var f = !/[^\w\-\.:]/.test(str) ? tmpl.cache[str] = tmpl.cache[str] || tmpl(document.getElementById(str).innerHTML) : new Function(tmpl.arg + ',tmpl', "var _e=_.escape" + tmpl.helper + ",_s='" + str.replace(tmpl.regexp, tmpl.func) + "';return _s;");

    return data ? f(data, tmpl) : function (data) {
      return f(data, tmpl);
    };
  };

  tmpl.cache = {};

  tmpl.regexp = /([\s'\\])(?!(?:[^{]|\{(?!%))*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(\{%)|(%\})/g;

  tmpl.func = function (s, p1, p2, p3, p4, p5) {

    if (p1) {
      // whitespace, quote and backspace in HTML context

      return ({
        '\n': '\\n',
        '\r': '\\r',
        '\t': '\\t',
        ' ': ' '
      })[p1] || '\\' + p1;
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
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Widget
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../tmpl/tmpl.js
 * ========================================================================= */

//TODO: Add support for element-level options via `data-nameLowerCase-options`
//TODO: Add support for remove, right know it doesn't get triggered on `.remove ()` but only on `.trigger ( 'remove' )`

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'widget', //INFO: The name of widget, it will be used for the the jquery pluing `$.fn[name]` and for triggering widget events `name + ':' + event`
    disabled: false, //INFO: Determines if the widget is enabled or disabled
    templates: {
      base: false //INFO: It will be used as the constructor if no element is provided
    },
    options: {
      errors: { //INFO: It contains all the errors that a widget can trigger
        uninitializable: 'WidgetUninitializable' //INFO: Triggered when the widget is not initializable
      },
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

  var Widget = (function () {
    function Widget(options, element) {
      _classCallCheck(this, Widget);

      /* ATTACH CONFIG */

      _.extend(this, this._getConfig(options));

      /* CHECK IF INITIALIZABLE */

      if (!element && !this.templates.base) {

        throw this.errors.uninitializable;
      }

      /* INIT ELEMENT */

      this.$element = $(element || this._tmpl('base', this.options));
      this.element = this.$element[0];

      /* ATTACH INSTANCE */

      $.data(this.element, 'instance.' + this.name, this);

      /* SET GUID */

      this.guid = $.guid++;

      /* SET DISABLED */

      this.disabled = this.$element.hasClass(this.options.classes.disabled);

      /* CALLBACKS */

      this._variables();
      this._init();
      this._events();
    }

    _createClass(Widget, [{
      key: '_getConfig',
      value: function _getConfig(options) {

        /* VARIABLES */

        var configs = [],
            prototype = Object.getPrototypeOf(this);

        /* PROTOTYPE CHAIN */

        while (prototype) {

          if (prototype.constructor.config) {

            configs.push(prototype.constructor.config);
          }

          prototype = Object.getPrototypeOf(prototype);
        }

        /* CONFIG */

        configs.push({});

        configs.reverse();

        if (options) {

          configs.push({ options: options });
        }

        var createOptions = this._createOptions();

        if (createOptions) {

          configs.push({ options: createOptions });
        }

        return _.merge.apply(_, configs);
      }
    }, {
      key: 'destroy',
      value: function destroy() {

        this._destroy();

        $.removeData(this.element, 'instance.' + this.name);

        return this;
      }

      /* SPECIAL */

    }, {
      key: '_createOptions',
      value: function _createOptions() {} //INFO: Used to pass extra options

    }, {
      key: '_widgetize',
      value: function _widgetize() {} //INFO: Gets a parent node, from it find and initialize all the widgets

    }, {
      key: '_variables',
      value: function _variables() {} //INFO: Init your variables inside this function

    }, {
      key: '_init',
      value: function _init() {} //INFO: Perform the init stuff inside this function

    }, {
      key: '_events',
      value: function _events() {} //INFO: Bind the event handlers inside this function

    }, {
      key: '_destroy',
      value: function _destroy() {} //INFO: Clean the stuff, remove possible memory leaks

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

    }, {
      key: 'option',
      value: function option(key, value) {

        if (!key) {
          //INFO: Returns a clone of the options object

          return _.cloneDeep(this.options);
        }

        if (_.isString(key)) {
          //INFO: Handle nested keys, for example: 'foo.bar' => { foo: { bar: '' } }

          var options = {},
              parts = key.split('.');

          key = parts.shift();

          if (parts.length) {

            var currentOption = options[key] = _.extend({}, this.options[key]);

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var part = _step.value;

                currentOption[part] = currentOption[part] || {};
                currentOption = currentOption[part];
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

            key = parts.pop();

            if (arguments.length === 1) {

              return _.isUndefined(currentOption[key]) ? null : currentOption[key];
            }

            currentOption[key] = value;
          } else {
            //INFO: Handle single level property

            if (arguments.length === 1) {

              return _.isUndefined(this.options[key]) ? null : this.options[key];
            }

            options[key] = value;
          }
        } else if (_.isPlainObject(key)) {
          //INFO: Set multiple properties

          this._setOptions(key);
        }

        return this;
      }
    }, {
      key: '_setOptions',
      value: function _setOptions(options) {

        for (var key in options) {

          this._setOption(key, options[key]);
        }

        return this;
      }
    }, {
      key: '_setOption',
      value: function _setOption(key, value) {

        this.options[key] = value;

        return this;
      }

      /* ENABLED */

    }, {
      key: 'enable',
      value: function enable() {

        if (this.disabled) {

          this.disabled = false;

          this.$element.removeClass(this.options.classes.disabled);
        }

        return this;
      }
    }, {
      key: 'isEnabled',
      value: function isEnabled() {

        return !this.disabled;
      }

      /* DISABLED */

    }, {
      key: 'disable',
      value: function disable() {

        if (!this.disabled) {

          this.disabled = true;

          this.$element.addClass(this.options.classes.disabled);
        }

        return this;
      }
    }, {
      key: 'isDisabled',
      value: function isDisabled() {

        return this.disabled;
      }

      /* EVENTS */

    }, {
      key: '_on',
      value: function _on(suppressDisabledCheck, $element, events, selector, handler, onlyOne) {
        var _this2 = this;

        //TODO: Add support for custom data

        /* NORMALIZING PARAMETERS */

        if (!_.isBoolean(suppressDisabledCheck)) {

          onlyOne = handler;
          handler = selector;
          selector = events;
          events = $element;
          $element = suppressDisabledCheck;
          suppressDisabledCheck = false;
        }

        if (!($element instanceof $)) {

          onlyOne = handler;
          handler = selector;
          selector = events;
          events = $element;
          $element = this.$element;
        }

        if (!_.isString(selector)) {

          onlyOne = handler;
          handler = selector;
          selector = false;
        }

        /* PROXY */

        var handlerProxy = function handlerProxy() {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          if (!suppressDisabledCheck && _this2.disabled) return;

          return handler.apply(_this2, args);
        };

        /* PROXY GUID */

        handlerProxy.guid = handler.guid = handler.guid || $.guid++;

        /* TRIGGERING */

        $element[onlyOne ? 'one' : 'on'](events, selector, handlerProxy);

        return this;
      }
    }, {
      key: '_one',
      value: function _one() {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        //FIXME: Does it work?

        return this._on.apply(this, args.concat([true]));
      }
    }, {
      key: '_onHover',
      value: function _onHover($element, args) {
        var _this3 = this;

        //FIXME: If we remove the target we are still attaching and removing thos events thoug (just performing the functions calls actually, probably)

        if (!args) {

          args = $element;
          $element = this.$element;
        }

        this._on($element, Pointer.enter, function () {
          return _this3._on.apply(_this3, _toConsumableArray(args));
        });
        this._on($element, Pointer.leave, function () {
          return _this3._off.apply(_this3, _toConsumableArray(args));
        });

        return this;
      }
    }, {
      key: '_off',
      value: function _off($element, events, handler) {

        /* NORMALIZING PARAMETERS */

        if (!handler) {

          handler = events;
          events = $element;
          $element = this.$element;
        }

        /* REMOVING HANDLER */

        $element.off(events, handler);

        return this;
      }
    }, {
      key: '_trigger',
      value: function _trigger(events) {
        var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var name = this.name.toLowerCase();

        events = events.split(' ');

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = events[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var event = _step2.value;

            this.$element.trigger(name + ':' + event, data);

            this.options.callbacks[event].call(this.element, data);
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

        return this;
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

        return $.frame(function () {
          return fn();
        });
      }

      /* DEBOUNCING */

    }, {
      key: '_debounce',
      value: function _debounce(fn, wait, options) {
        //TODO: Test it, expecially regarding the `this` variable

        var debounced = _.debounce(fn, wait, options);

        debounced.guid = fn.guid = fn.guid || $.guid++;

        return debounced;
      }

      /* THROTTLING */

    }, {
      key: '_throttle',
      value: function _throttle(fn, wait, options) {
        //TODO: Test it, expecially regarding the `this` variable

        var throttled = _.throttle(fn, wait, options);

        throttled.guid = fn.guid = fn.guid || $.guid++;

        return throttled;
      }

      /* TEMPLATE */

    }, {
      key: '_tmpl',
      value: function _tmpl(name) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        return $.tmpl(this.name.toLowerCase() + '.' + name, options);
      }

      /* INSERTION */

    }, {
      key: 'insertBefore',
      value: function insertBefore(selector) {

        this.$element.insertBefore(selector);

        return this;
      }
    }, {
      key: 'insertAfter',
      value: function insertAfter(selector) {

        this.$element.insertAfter(selector);

        return this;
      }
    }, {
      key: 'prependTo',
      value: function prependTo(selector) {

        this.$element.prependTo(selector);

        return this;
      }
    }, {
      key: 'appendTo',
      value: function appendTo(selector) {

        this.$element.appendTo(selector);

        return this;
      }
    }]);

    return Widget;
  })();

  /* BINDING */

  Svelto.Widget = Widget;
  Svelto.Widget.config = config;
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Widgetize
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function ($, _, window, document, undefined) {
  'use strict'

  /* WIDGETIZE */

  ;
  window.Widgetize = new ((function () {
    function _class() {
      _classCallCheck(this, _class);

      this.widgetizers = [];
    }

    _createClass(_class, [{
      key: 'add',
      value: function add(widgetizer) {

        this.widgetizers.push(widgetizer);
      }
    }, {
      key: 'get',
      value: function get() {

        return this.widgetizers;
      }
    }, {
      key: 'remove',
      value: function remove(widgetizer) {

        _.pull(this.widgetizers, widgetizer);
      }
    }, {
      key: 'on',
      value: function on($root) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {

          for (var _iterator3 = this.widgetizers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var widgetizer = _step3.value;

            widgetizer($root);
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
    }]);

    return _class;
  })())();

  /* JQUERY PLUGIN */

  $.fn.widgetize = function () {

    Widgetize.on(this);

    return this;
  };

  /* READY */

  $(function () {

    $body.widgetize();
  });
})(Svelto.$, Svelto._, window, document);

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
//FIXME: Does it handle devices where you can use both a touch event or a mouse event such when using a mouse connected to an android device? (//TODO Test it!)
//FIXME: Flick not working on iPod Touch

//INFO: Proposed draft: http://www.w3.org/TR/pointerevents/

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
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
      flick: {
        duration: 150,
        threshold: 5
      }
    }
  };

  /* EVENTS */

  var events = {
    tap: Pointer.options.events.prefix + 'tap',
    dbltap: Pointer.options.events.prefix + 'dbltap',
    press: Pointer.options.events.prefix + 'press',
    flick: Pointer.options.events.prefix + 'flick',
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

  var _loop = function _loop(name) {

    Pointer[name] = events[name];

    $.fn[name] = function (fn) {

      return fn ? this.on(events[name], fn) : this.trigger(events[name]); //FIXME: Does it work? not sure about that `events[name]` inside the function
    };
  };

  for (var name in events) {
    _loop(name);
  }

  /* POINTER LOGIC */

  (function () {
    //TODO: Maybe remove this

    /* VARIABLES */

    var $document = $(document),
        target = void 0,
        $target = void 0,
        startEvent = void 0,
        startTimestamp = void 0,
        downTimestamp = void 0,
        prevTapTimestamp = 0,
        motion = void 0,
        moveEvent = void 0,
        pressTimeout = void 0;

    /* EVENT CREATOR */

    var createEvent = function createEvent(name, originalEvent) {

      var event = $.Event(name);

      event.originalEvent = originalEvent;

      return event;
    };

    /* HANDLERS */

    var downHandler = function downHandler(event) {

      target = event.target;
      $target = $(target);

      startEvent = event;
      startTimestamp = event.timeStamp || Date.now();

      motion = false;

      pressTimeout = setTimeout(pressHandler, Pointer.options.press.duration);

      $target.on(Pointer.move, moveHandler);
      $target.one(Pointer.up, upHandler);
      $target.one(Pointer.cancel, cancelHandler);
    };

    var pressHandler = function pressHandler() {

      $target.trigger(createEvent(Pointer.press, startEvent));

      pressTimeout = false;
    };

    var moveHandler = function moveHandler(event) {

      if (!motion) {

        if (pressTimeout) {

          clearTimeout(pressTimeout);
          pressTimeout = false;
        }

        motion = true;

        if (!$.browser.is.touchDevice) {

          $target.off(Pointer.move, moveHandler);
        }
      }

      moveEvent = event;
    };

    var upHandler = function upHandler(event) {

      if (pressTimeout) {

        clearTimeout(pressTimeout);
      }

      downTimestamp = event.timeStamp || Date.now();

      if (motion && downTimestamp - startTimestamp <= Pointer.options.flick.duration) {

        var startXY = $.eventXY(startEvent),
            endXY = $.eventXY($.browser.is.touchDevice ? moveEvent : event),
            deltaXY = {
          X: endXY.X - startXY.X,
          Y: endXY.Y - startXY.Y
        },
            absDeltaXY = {
          X: Math.abs(deltaXY.X),
          Y: Math.abs(deltaXY.Y)
        };

        if (absDeltaXY.X >= Pointer.options.flick.threshold || absDeltaXY.Y >= Pointer.options.flick.threshold) {

          var orientation = void 0,
              direction = void 0;

          if (absDeltaXY.X > absDeltaXY.Y) {

            orientation = 'horizontal', direction = deltaXY.X > 0 ? 1 : -1;
          } else {

            orientation = 'vertical', direction = deltaXY.Y > 0 ? 1 : -1;
          }

          $target.trigger(createEvent(Pointer.flick, event), {
            orientation: orientation,
            direction: direction,
            startXY: startXY,
            endXY: endXY
          });
        }
      }

      if (!$.browser.is.touchDevice || !motion) {

        $target.trigger(createEvent(Pointer.tap, event));

        if (downTimestamp - prevTapTimestamp <= Pointer.options.dbltap.interval) {

          $target.trigger(createEvent(Pointer.dbltap, event));
        }

        prevTapTimestamp = downTimestamp;
      }

      if (!motion || $.browser.is.touchDevice) {

        $target.off(Pointer.move, moveHandler);
      }

      $target.off(Pointer.cancel, cancelHandler);
    };

    var cancelHandler = function cancelHandler() {

      if (pressTimeout) {

        clearTimeout(pressTimeout);
      }

      if (!motion || $.browser.is.touchDevice) {

        $target.off(Pointer.move, moveHandler);
      }

      $target.off(Pointer.up, upHandler);
    };

    /* BIND */

    $document.on(Pointer.down, downHandler);
  })();
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Factory
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires Widget.js
 * @requires Widgetize.js
 * @requires ../tmpl/tmpl.js
 * @requires ../pointer/pointer.js
 *=========================================================================*/

(function ($, _, window, document, undefined) {
  'use strict'

  /* FACTORY */

  ;
  $.factory = function (Widget) {

    /* NAME */

    var name = Widget.config.name,
        nameLowerCase = name.toLowerCase();

    /* CACHE TEMPLATES */

    for (var tmplName in Widget.config.templates) {

      if (Widget.config.templates[tmplName]) {

        $.tmpl.cache[nameLowerCase + '.' + tmplName] = $.tmpl(Widget.config.templates[tmplName]);
      }
    }

    /* WIDGETIZE */

    Widgetize.add(Widget.prototype._widgetize);

    /* BRIDGE */

    $.factory.bridge(Widget);
  };

  /* FACTORY BRIDGE */

  $.factory.bridge = function (Widget) {

    /* NAME */

    var name = Widget.config.name;

    /* JQUERY PLUGIN */

    $.fn[name] = function (options) {
      //FIXME: We should be able to extend options, not the entire config

      var isMethodCall = _.isString(options),
          returnValue = this;

      if (isMethodCall) {

        if (options.charAt(0) !== '_') {
          for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
            args[_key4 - 1] = arguments[_key4];
          }

          //INFO: Not a private method or property

          /* METHOD CALL */

          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = this[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var element = _step4.value;

              /* VARIABLES */

              var instance = $.factory.instance(Widget, false, element);

              /* CHECKING VALID CALL */

              if (!_.isFunction(instance[options])) return; //INFO: Not a method

              /* CALLING */

              var methodValue = instance[options].apply(instance, args);

              if (!_.isUndefined(methodValue)) {

                returnValue = methodValue;

                break;
              }
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
        }
      } else {

        /* CLONED OPTIONS */ //INFO: So that the passed options array won't be modified

        var clonedOptions = _.merge(options, function (value) {
          return value instanceof $ ? value : undefined;
        });

        /* INSTANCE */

        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = this[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var element = _step5.value;

            $.factory.instance(Widget, clonedOptions, element);
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
      }

      return returnValue;
    };
  };

  /* FACTORY INSTANCE */

  $.factory.instance = function (Widget, options, element) {

    var name = Widget.config.name,
        instance = $.data(element, 'instance.' + name);

    if (!instance) {

      instance = new Widget(options, element);
    }

    return instance;
  };
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Expander
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'expander',
    options: {
      classes: {
        open: 'open'
      },
      selectors: {
        expander: '.expander',
        toggler: '.expander-toggler'
      },
      callbacks: {
        open: function open() {},
        close: function close() {}
      }
    }
  };

  /* EXPANDER */

  var Expander = (function (_Svelto$Widget) {
    _inherits(Expander, _Svelto$Widget);

    function Expander() {
      _classCallCheck(this, Expander);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Expander).apply(this, arguments));
    }

    _createClass(Expander, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.expander').expander();
        $root.filter('.expander').expander();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$expander = this.$element;
        this.$togglers = this.$expander.find(this.options.selectors.toggler);

        this._isOpen = this.$expander.hasClass(this.options.classes.open);
      }
    }, {
      key: '_events',
      value: function _events() {

        /* TOGGLER */

        this._on(this.$togglers, Pointer.tap, this.toggle);
      }

      /* API */

    }, {
      key: 'isOpen',
      value: function isOpen() {

        return this._isOpen;
      }
    }, {
      key: 'toggle',
      value: function toggle(force) {

        if (!_.isBoolean(force)) {

          force = !this._isOpen;
        }

        if (force !== this._isOpen) {

          this._isOpen = force;

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
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Expander = Expander;
  Svelto.Expander.config = config;

  /* FACTORY */

  $.factory(Svelto.Expander);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Accordion
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * @requires ../expander/expander.js
 * ========================================================================= */

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'accordion',
    options: {
      classes: {
        multiple: 'multiple-open'
      },
      selectors: {
        expander: '.expander'
      },
      callbacks: {
        open: function open() {},
        close: function close() {}
      }
    }
  };

  /* ACCORDION */

  var Accordion = (function (_Svelto$Widget2) {
    _inherits(Accordion, _Svelto$Widget2);

    function Accordion() {
      _classCallCheck(this, Accordion);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Accordion).apply(this, arguments));
    }

    _createClass(Accordion, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.accordion').accordion();
        $root.filter('.accordion').accordion();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$accordion = this.$element;
        this.$expanders = this.$accordion.children(this.options.selectors.expander);

        this.expandersInstances = this.$expanders.toArray().map(function (expander) {
          return $(expander).expander('instance');
        });

        this.isMultiple = this.$accordion.hasClass(this.options.classes.multiple);
      }
    }, {
      key: '_events',
      value: function _events() {

        if (!this.isMultiple) {

          /* EXPANDER OPEN */

          this._on(this.$expanders, 'expander:open', this.__closeOthers);
        }
      }

      /* EXPANDER OPEN */

    }, {
      key: '__closeOthers',
      value: function __closeOthers(event, data) {

        for (var i = 0, l = this.$expanders.length; i < l; i++) {

          if (this.$expanders[i] !== event.target) {

            this.expandersInstances[i].close();
          }
        }
      }

      /* PUBLIC */

    }, {
      key: 'areOpen',
      value: function areOpen() {

        return this.expandersInstances.map(function (instance) {
          return instance.isOpen();
        });
      }
    }, {
      key: 'toggle',
      value: function toggle(index, force) {

        var instance = this.expandersInstances[index],
            isOpen = instance.isOpen();

        if (!_.isBoolean(force)) {

          force = !isOpen;
        }

        if (force !== isOpen) {

          var action = force ? 'open' : 'close';

          instance[action]();

          this._trigger(action, {
            index: index
          });
        }
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
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Accordion = Accordion;
  Svelto.Accordion.config = config;

  /* FACTORY */

  $.factory(Svelto.Accordion);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Autogrow (Input)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//INFO: Only works with `box-sizing: border-box`
//FIXME: Does it work with `.large` inputs?
//FIXME: Add an extra pixel, or the text cursor won't be displayed

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'autogrowInput',
    options: {
      minWidth: 0,
      callbacks: {
        update: function update() {}
      }
    }
  };

  /* AUTOGROW INPUT */

  var AutogrowInput = (function (_Svelto$Widget3) {
    _inherits(AutogrowInput, _Svelto$Widget3);

    function AutogrowInput() {
      _classCallCheck(this, AutogrowInput);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(AutogrowInput).apply(this, arguments));
    }

    _createClass(AutogrowInput, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('input.autogrow').autogrowInput();
        $root.filter('input.autogrow').autogrowInput();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$input = this.$element;
      }
    }, {
      key: '_init',
      value: function _init() {

        this._update();
      }
    }, {
      key: '_events',
      value: function _events() {

        /* INPUT / CHANGE */

        this._on('input change', this._update);
      }

      /* PRIVATE */

    }, {
      key: '_getNeededWidth',
      value: function _getNeededWidth() {

        //FIXME: Isn't it better to just detach it, or to leave it in the DOM?

        var $span = $('<span>' + this.$input.val() + '</span>');

        $span.css({
          font: this.$input.css('font'),
          position: 'absolute',
          opacity: 0
        });

        $span.appendTo($body);

        var width = $span.width();

        $span.remove();

        return width;
      }
    }, {
      key: '_update',
      value: function _update() {

        var neededWidth = this._getNeededWidth(this.$input);

        this.$input.width(Math.max(neededWidth, this.options.minWidth));

        this._trigger('update');
      }
    }]);

    return AutogrowInput;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.AutogrowInput = AutogrowInput;
  Svelto.AutogrowInput.config = config;

  /* FACTORY */

  $.factory(Svelto.AutogrowInput);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Autogrow (Textarea)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//INFO: Only works with `box-sizing: border-box`
//FIXME: Does it work with `.large` textareas?
//TODO: Make it the same height as a normal input at minimum, for beautiness

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'autogrowTextarea',
    options: {
      minHeight: 0,
      callbacks: {
        update: function update() {}
      }
    }
  };

  /* AUTOGROW TEXTAREA */

  var AutogrowTextarea = (function (_Svelto$Widget4) {
    _inherits(AutogrowTextarea, _Svelto$Widget4);

    function AutogrowTextarea() {
      _classCallCheck(this, AutogrowTextarea);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(AutogrowTextarea).apply(this, arguments));
    }

    _createClass(AutogrowTextarea, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('textarea.autogrow, .textarea-wrp.autogrow textarea').autogrowTextarea();
        $root.filter('textarea.autogrow, .textarea-wrp.autogrow textarea').autogrowTextarea();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$textarea = this.$element;
      }
    }, {
      key: '_init',
      value: function _init() {

        this._update();
      }
    }, {
      key: '_events',
      value: function _events() {

        /* INPUT / CHANGE */

        this._on('input change', this._update);
      }

      /* PRIVATE */

    }, {
      key: '_update',
      value: function _update() {

        var neededHeight = this.$textarea.height(1)[0].scrollHeight - parseFloat(this.$textarea.css('padding-top')) - parseFloat(this.$textarea.css('padding-bottom'));

        this.$textarea.height(Math.max(neededHeight, this.options.minHeight));

        this._trigger('update');
      }
    }]);

    return AutogrowTextarea;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.AutogrowTextarea = AutogrowTextarea;
  Svelto.AutogrowTextarea.config = config;

  /* FACTORY */

  $.factory(Svelto.AutogrowTextarea);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Blurred
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

(function ($, _, window, document, undefined) {
  'use strict'

  /* BLURRED */

  ;
  $.fn.blurred = function (force) {

    return this.toggleClass('blurred', force);
  };
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Boilerplate
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'boilerplate',
    templates: {
      base: false
    },
    options: {
      characters: {},
      regexes: {},
      errors: {},
      attributes: {},
      datas: {},
      classes: {},
      selectors: {},
      animations: {},
      callbacks: {}
    }
  };

  /* BOILERPLATE */

  var Boilerplate = (function (_Svelto$Widget5) {
    _inherits(Boilerplate, _Svelto$Widget5);

    function Boilerplate() {
      _classCallCheck(this, Boilerplate);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Boilerplate).apply(this, arguments));
    }

    _createClass(Boilerplate, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {}
    }, {
      key: '_variables',
      value: function _variables() {}
    }, {
      key: '_events',
      value: function _events() {}
    }, {
      key: '_destroy',
      value: function _destroy() {}

      /* PRIVATE */

      /* API */

    }]);

    return Boilerplate;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Boilerplate = Boilerplate;
  Svelto.Boilerplate.config = config;

  /* FACTORY */

  $.factory(Svelto.Boilerplate);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - BT (BinaryTree) Each
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

(function ($, _, window, document, undefined) {
  'use strict'

  /* BINARY TREE .each () */

  ;
  $.fn.btEach = function (callback, startIndex) {

    return _.btEach(this, callback, startIndex);
  };
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Carousel
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Add drag support instead of flick

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'carousel',
    options: {
      startingIndex: 0,
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
        cycle: UI.animation.normal
      },
      callbacks: {
        change: function change() {}
      }
    }
  };

  /* CAROUSEL */

  var Carousel = (function (_Svelto$Widget6) {
    _inherits(Carousel, _Svelto$Widget6);

    function Carousel() {
      _classCallCheck(this, Carousel);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Carousel).apply(this, arguments));
    }

    _createClass(Carousel, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.carousel').carousel();
        $root.filter('.carousel').carousel();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$carousel = this.$element;
        this.$prev = this.$carousel.find(this.options.selectors.prev);
        this.$next = this.$carousel.find(this.options.selectors.next);
        this.$indicators = this.$carousel.find(this.options.selectors.indicator);
        this.$itemsWrp = this.$carousel.find(this.options.selectors.itemsWrp);
        this.$items = this.$itemsWrp.find(this.options.selectors.item);

        this.maxIndex = this.$items.length - 1;

        this._previous = false;
        this._current = false;

        if (this.options.cycle) {

          this.timer = new Timer(this.next.bind(this), this.options.interval, true);
        }
      }
    }, {
      key: '_init',
      value: function _init() {

        var $current = this.$items.filter('.' + this.options.classes.current).first();

        if ($current.length > 0) {

          this._current = this._getItemObj(this.$items.index($current));
        } else {

          this.set(this.options.startingIndex);
        }
      }
    }, {
      key: '_events',
      value: function _events() {

        /* PREV */

        this._on(this.$prev, Pointer.tap, this.previous);

        /* NEXT */

        this._on(this.$next, Pointer.tap, this.next);

        /* KEYDOWN */

        this._onHover([$document, 'keydown', this.__keydown]);

        /* INDICATOR TAP */

        this._on(this.$indicators, Pointer.tap, this.__indicatorTap);

        /* FLICK */

        this._on(Pointer.flick, this.__flick);

        /* CYCLE */

        if (this.options.cycle) {

          this._on(this.$itemsWrp, Pointer.enter, this.__cycleEnter);
          this._on(this.$itemsWrp, Pointer.leave, this.__cycleLeave);
        }
      }

      /* KEYDOWN */

    }, {
      key: '__keydown',
      value: function __keydown(event) {

        switch (event.keyCode) {

          case UI.keyCode.LEFT:
          case UI.keyCode.UP:
            this.previous();
            break;

          case UI.keyCode.RIGHT:
          case UI.keyCode.DOWN:
          case UI.keyCode.SPACE:
            this.next();
            break;

          default:
            return;

        }

        event.preventDefault();
        event.stopImmediatePropagation();
      }

      /* CYCLE */

    }, {
      key: '__cycleEnter',
      value: function __cycleEnter() {

        this.timer.pause();
      }
    }, {
      key: '__cycleLeave',
      value: function __cycleLeave() {

        this.timer.remaining(Math.max(this.options.intervalMinimumRemaining, this.timer.remaining() || 0));

        this.timer.play();
      }

      /* INDICATOR TAP */

    }, {
      key: '__indicatorTap',
      value: function __indicatorTap(event) {

        this.set(this.$indicators.index(event.currentTarget));
      }

      /* FLICK */

    }, {
      key: '__flick',
      value: function __flick(event, data) {

        if (data.orientation === 'horizontal') {

          event.preventDefault();
          event.stopImmediatePropagation();

          this[data.direction === -1 ? 'next' : 'previous']();
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

        return index > 0 ? index - 1 : this.maxIndex;
      }
    }, {
      key: '_getNextIndex',
      value: function _getNextIndex(index) {

        return index < this.maxIndex ? index + 1 : 0;
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

        index = Number(index);

        if (!this._setting && !_.isNaN(index) && index >= 0 && index <= this.maxIndex && (!this._current || index !== this._current.index)) {

          this._setting = true;

          if (this._current) {

            this._current.$item.removeClass(this.options.classes.current).addClass(this.options.classes.prev);
            this._current.$indicator.removeClass(this.options.classes.current);

            this._previous = this._current;
          }

          this._current = this._getItemObj(index);
          this._current.$item.addClass(this.options.classes.current);
          this._current.$indicator.addClass(this.options.classes.current);

          if (this.options.timer) {

            this.timer.stop();
          }

          this._delay(function () {

            this._setting = false;

            if (this._previous) {

              this._previous.$item.removeClass(this.options.classes.prev);
            }

            if (this.options.timer) {

              this.timer.play();
            }
          }, this.options.animations.cycle);

          this._trigger('change');
        }
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
    }]);

    return Carousel;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Carousel = Carousel;
  Svelto.Carousel.config = config;

  /* FACTORY */

  $.factory(Svelto.Carousel);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Checkbox
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'checkbox',
    options: {
      classes: {
        checked: 'checked'
      },
      selectors: {
        input: 'input'
      },
      callbacks: {
        change: function change() {},
        check: function check() {},
        uncheck: function uncheck() {}
      }
    }
  };

  /* CHECKBOX */

  var Checkbox = (function (_Svelto$Widget7) {
    _inherits(Checkbox, _Svelto$Widget7);

    function Checkbox() {
      _classCallCheck(this, Checkbox);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Checkbox).apply(this, arguments));
    }

    _createClass(Checkbox, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.checkbox').checkbox();
        $root.filter('.checkbox').checkbox();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$checkbox = this.$element;
        this.$input = this.$checkbox.find(this.options.selectors.input);
      }
    }, {
      key: '_init',
      value: function _init() {
        //FIXME: is it necessary to include it? Maybe we should fix mistakes with the markup...

        var isChecked = this.get(),
            hasClass = this.$checkbox.hasClass(this.options.classes.checked);

        if (isChecked !== hasClass) {

          this.$checkbox.toggleClass(this.options.classes.checked, isChecked);
        }
      }
    }, {
      key: '_events',
      value: function _events() {

        /* CHANGE */

        this._on(true, 'change', this.__change);

        /* TAP */

        this._on(Pointer.tap, _.wrap(undefined, this.toggle));
      }

      /* CHANGE */

    }, {
      key: '__change',
      value: function __change() {

        var isChecked = this.get();

        this.$checkbox.toggleClass(this.options.classes.checked, isChecked);

        this._trigger('change', { checked: isChecked });
        this._trigger(isChecked ? 'check' : 'uncheck');
      }

      /* PUBLIC */

    }, {
      key: 'get',
      value: function get() {
        //FIXME: maybe this should return the value, and a isChecked equivalent should do this job

        return this.$input.prop('checked');
      }
    }, {
      key: 'toggle',
      value: function toggle(force) {

        var isChecked = this.get();

        if (_.isUndefined(force)) {

          force = !isChecked;
        }

        if (force !== isChecked) {

          this.$input.prop('checked', force).trigger('change');

          this._trigger('change', { checked: force });
          this._trigger(force ? 'check' : 'uncheck'); //FIXME: is triggered twice per toggle
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

    return Checkbox;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Checkbox = Checkbox;
  Svelto.Checkbox.config = config;

  /* FACTORY */

  $.factory(Svelto.Checkbox);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Color Helper
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

(function (_, window, document, undefined) {
  'use strict'

  /* COLOR HELPER */

  ;
  window.ColorHelper = (function () {
    function _class2() {
      _classCallCheck(this, _class2);
    }

    _createClass(_class2, null, [{
      key: 'hex2rgb',

      /* COLOR SPACES CONVERTERS */

      value: function hex2rgb(hex) {

        return {
          r: ColorHelper.hex2dec(hex.r),
          g: ColorHelper.hex2dec(hex.g),
          b: ColorHelper.hex2dec(hex.b)
        };
      }
    }, {
      key: 'hex2hsv',
      value: function hex2hsv(hex) {

        return ColorHelper.rgb2hsv(ColorHelper.hex2rgb(hex));
      }
    }, {
      key: 'rgb2hex',
      value: function rgb2hex(rgb) {

        return {
          r: ColorHelper.dec2hex(rgb.r),
          g: ColorHelper.dec2hex(rgb.g),
          b: ColorHelper.dec2hex(rgb.b)
        };
      }
    }, {
      key: 'rgb2hsv',
      value: function rgb2hsv(rgb) {

        var r = rgb.r / 255,
            g = rgb.g / 255,
            b = rgb.b / 255,
            h = void 0,
            s = void 0,
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
          h: h * 360, //FIXME: removed Math.round, test if is ok
          s: s * 100, //FIXME: removed Math.round, test if is ok
          v: v * 100 //FIXME: removed Math.round, test if is ok
        };
      }
    }, {
      key: 'hsv2hex',
      value: function hsv2hex(hsv) {

        return ColorHelper.rgb2hex(ColorHelper.hsv2rgb(hsv));
      }
    }, {
      key: 'hsv2rgb',
      value: function hsv2rgb(hsv) {

        var r = void 0,
            g = void 0,
            b = void 0,
            h = hsv.h,
            s = hsv.s,
            v = hsv.v;

        s /= 100;
        v /= 100;

        if (s === 0) {

          r = g = b = v;
        } else {

          var i = void 0,
              f = void 0,
              p = void 0,
              q = void 0,
              t = void 0;

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
          s: tempS / (tempL <= 1 ? tempL : 2 - tempL) * 100,
          l: tempL / 2 * 100
        };
      }
    }, {
      key: 'hsl2hsv',
      value: function hsl2hsv(hsl) {

        var l = hsl.l / 100 * 2,
            s = hsl.s / 100 * (l <= 1 ? l : 2 - l);

        return {
          h: hsl.h,
          s: 2 * s / (l + s) * 100,
          v: (l + s) / 2 * 100
        };
      }

      /* SCALE CONVERTERS */

    }, {
      key: 'dec2hex',
      value: function dec2hex(dec) {

        return _.padLeft(dec.toString(16), 2, '0');
      }
    }, {
      key: 'hex2dec',
      value: function hex2dec(hex) {

        return parseInt(hex, 16);
      }
    }]);

    return _class2;
  })();
})(Svelto._, window, document);

/* =========================================================================
 * Svelto - Hex Color
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * @requires ../color_helper/color_helper.js
 * ========================================================================= */

//TODO: Add support for alpha

(function (_, window, document, undefined) {
  'use strict'

  /* HEX COLOR */

  ;
  window.HexColor = (function () {
    function _class3(color) {
      _classCallCheck(this, _class3);

      if (_.isString(color)) {

        color = color.replace('#', '');

        if (/^[0-9a-f]{6}$/i.test(color)) {
          //INFO: Full 6-chars color notation

          this.import6chars(color);
        } else if (/^[0-9a-f]{3}$/i.test(color)) {
          //INFO: Shorthand 3-chars color notation

          this.import3chars(color);
        }
      }
    }

    _createClass(_class3, [{
      key: 'import6chars',
      value: function import6chars(color) {

        this.hsv = ColorHelper.hex2hsv({
          r: color[0] + color[1],
          g: color[2] + color[3],
          b: color[4] + color[5]
        });
      }
    }, {
      key: 'import3chars',
      value: function import3chars(color) {

        this.hsv = ColorHelper.hex2hsv({
          r: color[0].repeat(2),
          g: color[1].repeat(2),
          b: color[2].repeat(2)
        });
      }
    }, {
      key: 'getHexStr',
      value: function getHexStr() {

        var hex = ColorHelper.hsv2hex(this.hsv);

        return '#' + hex.r + hex.g + hex.b;
      }
    }, {
      key: 'isValid',
      value: function isValid() {

        return !!this.hsv;
      }
    }]);

    return _class3;
  })();
})(Svelto._, window, document);

/* =========================================================================
 * Svelto - Colorpicker
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * @requires ../hex_color/hex_color.js
 * @requires ../color_helper/color_helper.js
 * ========================================================================= */

//TODO: Add support for alpha channel
//TODO: Add a $bgs variable where we update the background

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'colorpicker',
    options: {
      defaultColor: '#ff0000',
      live: false,
      selectors: {
        sb: {
          wrp: '.colorpicker-saturation-brightness-wrp',
          handler: '.colorpicker-handler'
        },
        hue: {
          wrp: '.colorpicker-hue-wrp',
          handler: '.colorpicker-handler'
        },
        input: 'input'
      },
      callbacks: {
        change: function change() {}
      }
    }
  };

  /* COLORPICKER */

  var Colorpicker = (function (_Svelto$Widget8) {
    _inherits(Colorpicker, _Svelto$Widget8);

    function Colorpicker() {
      _classCallCheck(this, Colorpicker);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Colorpicker).apply(this, arguments));
    }

    _createClass(Colorpicker, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.colorpicker').colorpicker();
        $root.filter('.colorpicker').colorpicker();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$colorpicker = this.$element;
        this.$sbWrp = this.$colorpicker.find(this.options.selectors.sb.wrp);
        this.$sbHandler = this.$sbWrp.find(this.options.selectors.sb.handler);
        this.$hueWrp = this.$colorpicker.find(this.options.selectors.hue.wrp);
        this.$hueHandler = this.$hueWrp.find(this.options.selectors.hue.handler);

        this.$input = this.$colorpicker.find(this.options.selectors.input);

        this.sbWrpSize = this.$sbWrp.width();

        this.hueWrpHeight = this.sbWrpSize;

        this.color = new HexColor();
        this.hex = '';
      }
    }, {
      key: '_init',
      value: function _init() {

        if (!this.set(this.$input.val())) {

          this.color = new HexColor(this.options.defaultColor);

          this._updateSb();
          this._updateHue();
        }
      }
    }, {
      key: '_events',
      value: function _events() {

        /* CHANGE */

        this._on(this.$input, 'change', this.__change);

        /* SB KEYDOWN */

        this._onHover(this.$sbWrp, [$document, 'keydown', this.__sbKeydown]);

        /* SB DRAG */

        this.$sbHandler.draggable({
          draggable: this.isEnabled.bind(this),
          $proxy: this.$sbWrp,
          constrainer: {
            $element: this.$sbWrp,
            constrainCenter: true
          },
          callbacks: {
            move: this.__sbDragMove.bind(this),
            end: this.__sbDragEnd.bind(this)
          }
        });

        /* HUE KEYDOWN */

        this._onHover(this.$hueWrp, [$document, 'keydown', this.__hueKeydown]);

        /* HUE DRAG */

        this.$hueHandler.draggable({
          draggable: this.isEnabled.bind(this),
          axis: 'y',
          $proxy: this.$hueWrp,
          constrainer: {
            $element: this.$hueWrp
          },
          callbacks: {
            move: this.__hueDragMove.bind(this),
            end: this.__hueDragEnd.bind(this)
          }
        });
      }

      /* CHANGE */

    }, {
      key: '__change',
      value: function __change() {

        this.set(this.$input.val());
      }

      /* SB ARROWS */

    }, {
      key: '__sbKeydown',
      value: function __sbKeydown(event) {

        switch (event.keyCode) {

          case UI.keyCode.UP:
            this.color.hsv.v = Math.min(100, this.color.hsv.v + 1);
            break;

          case UI.keyCode.RIGHT:
            this.color.hsv.s = Math.min(100, this.color.hsv.s + 1);
            break;

          case UI.keyCode.DOWN:
            this.color.hsv.v = Math.max(0, this.color.hsv.v - 1);
            break;

          case UI.keyCode.LEFT:
            this.color.hsv.s = Math.max(0, this.color.hsv.s - 1);
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
      key: '_sbDragSet',
      value: function _sbDragSet(XY, update) {

        this.color.hsv.s = _.clamp(0, XY.X, this.sbWrpSize) * 100 / this.sbWrpSize;
        this.color.hsv.v = 100 - _.clamp(0, XY.Y, this.sbWrpSize) * 100 / this.sbWrpSize;

        this._updateSb();

        if (update) {

          this._updateInput();
        }
      }
    }, {
      key: '__sbDragMove',
      value: function __sbDragMove(data) {

        this._sbDragSet(data.moveXY, this.options.live);
      }
    }, {
      key: '__sbDragEnd',
      value: function __sbDragEnd(data) {

        this._sbDragSet(data.endXY, true);
      }

      /* HUE ARROWS */

    }, {
      key: '__hueKeydown',
      value: function __hueKeydown(event) {

        switch (event.keyCode) {

          case UI.keyCode.UP:
            this.color.hsv.h = Math.min(359, this.color.hsv.h + 1);
            break;

          case UI.keyCode.DOWN:
            this.color.hsv.h = Math.max(0, this.color.hsv.h - 1);
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
      key: '_hueDragSet',
      value: function _hueDragSet(XY, update) {

        this.color.hsv.h = 359 - _.clamp(0, XY.Y, this.hueWrpHeight) * 359 / this.hueWrpHeight;

        this._updateHue();

        if (update) {

          this._updateInput();
        }
      }
    }, {
      key: '__hueDragMove',
      value: function __hueDragMove(data) {

        this._hueDragSet(data.moveXY, this.options.live);
      }
    }, {
      key: '__hueDragEnd',
      value: function __hueDragEnd(data) {

        this._hueDragSet(data.endXY, true);
      }

      /* UPDATE */

    }, {
      key: '_updateSb',
      value: function _updateSb() {

        var hsl = ColorHelper.hsv2hsl(this.color.hsv),
            translateX = this.sbWrpSize / 100 * this.color.hsv.s,
            translateY = this.sbWrpSize / 100 * (100 - this.color.hsv.v);

        this.$sbHandler.hsl(hsl.h, hsl.s, hsl.l).translate(translateX, translateY);
      }
    }, {
      key: '_updateHue',
      value: function _updateHue() {

        var hsl = ColorHelper.hsv2hsl(this.color.hsv),
            translateY = this.hueWrpHeight / 100 * (100 - this.color.hsv.h / 360 * 100);

        this.$hueHandler.hsl(this.color.hsv.h, 100, 50).translateY(translateY);
        this.$sbHandler.hsl(hsl.h, hsl.s, hsl.l);
        this.$sbWrp.hsl(this.color.hsv.h, 100, 50);
      }
    }, {
      key: '_updateInput',
      value: function _updateInput() {

        this.hex = this.color.getHexStr();

        this.$input.val(this.hex).trigger('change');

        this._trigger('change', { color: this.hex });
      }
    }, {
      key: '_update',
      value: function _update() {

        this._updateSb();
        this._updateHue();
        this._updateInput();
      }

      /* PUBLIC */

    }, {
      key: 'get',
      value: function get() {

        return this.color.getHexStr();
      }
    }, {
      key: 'set',
      value: function set(color) {

        var newColor = new HexColor(color);

        if (newColor.isValid() && !_.isEqual(newColor.hsv, this.color.hsv)) {

          this.color = newColor;

          this._update();
        }

        return newColor.isValid();
      }
    }]);

    return Colorpicker;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Colorpicker = Colorpicker;
  Svelto.Colorpicker.config = config;

  /* FACTORY */

  $.factory(Svelto.Colorpicker);
})(Svelto.$, Svelto._, window, document);

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

(function (_, window, document, undefined) {
  'use strict'

  /* UTILITIES */

  ;
  var encode = encodeURIComponent,
      decode = decodeURIComponent;

  /* COOKIE */

  $.cookie = {
    get: function get(key) {

      if (!key) return null;

      return decode(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encode(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
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

      document.cookie = encode(key) + '=' + encode(value) + expires + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '') + (secure ? '; secure' : '');

      return true;
    },
    remove: function remove(key, path, domain) {

      if (!this.has(key)) return false;

      document.cookie = encode(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '');

      return true;
    },
    has: function has(key) {

      if (!key) return false;

      return new RegExp('(?:^|;\\s*)' + encode(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=').test(document.cookie);
    },
    keys: function keys() {

      var keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);

      for (var i = 0, l = keys.length; i < l; i++) {

        keys[i] = decode(keys[i]);
      }

      return keys;
    }
  };
})(Svelto._, window, document);

/* =========================================================================
 * Svelto - Datepicker
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Deal with UTC time etc...
//TODO: Add support for min and max date delimiter
//FIXME: When using the arrows the prev day still remains hovered even if it's not below the cursor (chrome)
//TODO: Add support for setting first day of the week
//INFO: We use the format: YYYYMMDD

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'datepicker',
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
          prev: '.datepicker-navigation-prev',
          title: '.datepicker-navigation-title',
          next: '.datepicker-navigation-next'
        },
        day: {
          prev: '.datepicker-day-prev',
          current: '.datepicker-day',
          next: '.datepicker-day-next'
        },
        input: 'input'
      },
      callbacks: {
        change: function change() {},
        refresh: function refresh() {}
      }
    }
  };

  /* DATEPICKER */

  var Datepicker = (function (_Svelto$Widget9) {
    _inherits(Datepicker, _Svelto$Widget9);

    function Datepicker() {
      _classCallCheck(this, Datepicker);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Datepicker).apply(this, arguments));
    }

    _createClass(Datepicker, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.datepicker').datepicker();
        $root.filter('.datepicker').datepicker();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$datepicker = this.$element;
        this.$input = this.$datepicker.find(this.options.selectors.input);

        this.$navigationPrev = this.$datepicker.find(this.options.selectors.navigation.prev);
        this.$navigationTitle = this.$datepicker.find(this.options.selectors.navigation.title);
        this.$navigationNext = this.$datepicker.find(this.options.selectors.navigation.next);

        this.$daysPrev = this.$datepicker.find(this.options.selectors.day.prev);
        this.$daysCurrent = this.$datepicker.find(this.options.selectors.day.current);
        this.$daysNext = this.$datepicker.find(this.options.selectors.day.next);
        this.$daysAll = this.$daysPrev.add(this.$daysCurrent).add(this.$daysNext);

        if (!(this.options.date.today instanceof Date)) {

          this.options.date.today = new Date();
        }

        if (!(this.options.date.current instanceof Date)) {

          this.options.date.current = new Date();
        }

        this.$dayToday = false;
        this.$daySelected = false;
      }
    }, {
      key: '_init',
      value: function _init() {

        /* INITIAL VALUE */

        this.set(this.$input.val());

        if (this.options.date.selected instanceof Date) {

          this.options.date.current = new Date(this.options.date.selected.getFullYear(), this.options.date.selected.getMonth(), this.options.date.selected.getDate());
        }

        /* REFRESH */

        this._refresh();
      }
    }, {
      key: '_events',
      value: function _events() {

        /* CHANGE */

        this._on(this.$input, 'change', this.__change);

        /* KEYDOWN */

        this._onHover([$document, 'keydown', this.__keydown]);

        /* NAVIGATION PREV / NEXT */

        this._on(this.$navigationPrev, Pointer.tap, this.__prevTap);
        this._on(this.$navigationNext, Pointer.tap, this.__nextTap);

        /* DAY TAP */

        this._on(Pointer.tap, this.options.selectors.day.current, this.__dayTap);
      }

      /* CHANGE */

    }, {
      key: '__change',
      value: function __change() {

        this.set(this.$input.val());
      }

      /* KEYDOWN */

    }, {
      key: '__keydown',
      value: function __keydown(event) {

        switch (event.keyCode) {

          case UI.keyCode.UP:
          case UI.keyCode.LEFT:
            this.prevMonth();
            break;

          case UI.keyCode.RIGHT:
          case UI.keyCode.DOWN:
            this.nextMonth();
            break;

          default:
            return;

        }

        event.preventDefault();
        event.stopImmediatePropagation();
      }

      /* NAVIGATION */

    }, {
      key: '__prevTap',
      value: function __prevTap() {

        this.prevMonth();
      }
    }, {
      key: '__nextTap',
      value: function __nextTap() {

        this.nextMonth();
      }

      /* SELECTION */

    }, {
      key: '__dayTap',
      value: function __dayTap(event) {

        if (event.button && event.button !== UI.mouseButton.LEFT) return;

        var day = parseInt($(event.currentTarget).html(), 10);

        this._unhighlightSelected();

        this.options.date.selected = new Date(this.options.date.current.getFullYear(), this.options.date.current.getMonth(), day);

        this._highlightSelected();

        this._updateInput();
      }

      /* OTHERS */

    }, {
      key: '_buildCalendar',
      value: function _buildCalendar() {

        var prevMonthDays = new Date(this.options.date.current.getFullYear(), this.options.date.current.getMonth(), 0).getDate(),
            currentMonthDays = new Date(this.options.date.current.getFullYear(), this.options.date.current.getMonth() + 1, 0).getDate(),
            initialDayOfWeek = new Date(this.options.date.current.getFullYear(), this.options.date.current.getMonth(), 1).getDay();

        initialDayOfWeek = initialDayOfWeek === 0 ? 6 : initialDayOfWeek - 1; //INFO: We use `Monday` as the 0 index

        this.$daysAll.removeClass('hidden');

        /* PREV */

        var exceedingDays = 31 - prevMonthDays,
            neededDays = initialDayOfWeek,
            leftDays = 9 - exceedingDays - neededDays;

        this.$daysPrev.slice(leftDays + neededDays, this.$daysPrev.length).addClass('hidden');
        this.$daysPrev.slice(0, leftDays).addClass('hidden');

        /* CURRENT */

        this.$daysCurrent.slice(currentMonthDays, this.$daysCurrent.lenght).addClass('hidden');

        /* NEXT */

        leftDays = (currentMonthDays + initialDayOfWeek) % 7;

        this.$daysNext.slice(leftDays === 0 ? 0 : 7 - leftDays).addClass('hidden');
      }
    }, {
      key: '_highlightDay',
      value: function _highlightDay(day, cssClass) {

        if (day && day.getFullYear() === this.options.date.current.getFullYear()) {

          var deltaMonths = day.getMonth() - this.options.date.current.getMonth();

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

        if (this.$daySelected) {

          this.$daySelected.removeClass(this.options.classes.selected);
        }
      }
    }, {
      key: '_highlightSelected',
      value: function _highlightSelected() {

        this.$daySelected = this._highlightDay(this.options.date.selected, this.options.classes.selected);
      }
    }, {
      key: '_unhighlightToday',
      value: function _unhighlightToday() {

        if (this.$dayToday) {

          this.$dayToday.removeClass(this.options.classes.today);
        }
      }
    }, {
      key: '_highlightToday',
      value: function _highlightToday() {

        this.$dayToday = this._highlightDay(this.options.date.today, this.options.classes.today);
      }
    }, {
      key: '_updateTitle',
      value: function _updateTitle() {

        this.$navigationTitle.html(this.options.names.months[this.options.date.current.getMonth()] + ' ' + this.options.date.current.getFullYear());
      }
    }, {
      key: '_updateInput',
      value: function _updateInput() {

        if (this.options.date.selected) {

          this.$input.val(this._exportDate(this.options.date.selected)).change();
        }
      }
    }, {
      key: '_exportDate',
      value: function _exportDate(date) {

        switch (this.options.format.type) {

          case 'YYYYMMDD':
            return [date.getFullYear(), parseInt(date.getMonth(), 10) + 1, date.getDate()].join(this.options.format.separator);

          default:
            return date.toUTCString();

        }
      }
    }, {
      key: '_importDate',
      value: function _importDate(date) {

        if (_.isString(date)) {

          switch (this.options.format.type) {

            case 'YYYYMMDD':
              var segments = date.split(this.options.format.separator);
              return new Date(parseInt(segments[0], 10), parseInt(segments[1], 10) - 1, parseInt(segments[2]));

            default:
              return new Date(date);

          }
        } else {

          return new Date(date);
        }
      }
    }, {
      key: '_refresh',
      value: function _refresh() {

        this._unhighlightSelected();
        this._unhighlightToday();
        this._buildCalendar();
        this._highlightSelected();
        this._highlightToday();
        this._updateTitle();

        this._trigger('refresh', this.options.date);
      }

      /* API */

    }, {
      key: 'get',
      value: function get(formatted) {

        if (formatted && this.options.date.selected) {

          return this._exportDate(this.options.date.selected);
        } else {

          return this.options.date.selected;
        }
      }
    }, {
      key: 'set',
      value: function set(date) {

        date = this._importDate(date);

        if (!_.isNaN(date.valueOf())) {

          if (!this.options.date.selected || date.getTime() !== this.options.date.selected.getTime()) {

            this.options.date.selected = date;

            if (this.options.date.selected.getFullYear() === this.options.date.current.getFullYear() && this.options.date.selected.getMonth() === this.options.date.current.getMonth()) {

              this._unhighlightSelected();
              this._highlightSelected();
            } else {

              this.options.date.current.setFullYear(this.options.date.selected.getFullYear());
              this.options.date.current.setMonth(this.options.date.selected.getMonth());

              this._refresh();
            }

            this._updateInput();

            this._trigger('change', this.options.date);
          }
        }
      }
    }, {
      key: 'navigateMonth',
      value: function navigateMonth(modifier) {

        if (modifier) {

          this.options.date.current.setMonth(this.options.date.current.getMonth() + modifier);

          this._refresh();
        }
      }
    }, {
      key: 'prevMonth',
      value: function prevMonth() {

        this.navigateMonth(-1);
      }
    }, {
      key: 'nextMonth',
      value: function nextMonth() {

        this.navigateMonth(1);
      }
    }]);

    return Datepicker;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Datepicker = Datepicker;
  Svelto.Datepicker.config = config;

  /* FACTORY */

  $.factory(Svelto.Datepicker);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Draggable
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//FIXME: Don't trigger the move events if we are not duing it more than a threashold, but just on touch devices, there is very difficoult to do an extremelly precise tap without moving the finger

//TODO: Add page autoscroll capabilities
//TODO: [MAYBE] Add support for handlers outside of the draggable element itself
//TODO: Add unhandlers
//FIXME: Handler drag cancel, for example in firefox and IE dragging outside of the window
//FIXME: On iOS, if the draggable is to close to the left edge of the screen dragging it will cause a `scroll to go back` event/animation on safari

(function ($, _, window, document, undefined) {
  'use strict'

  /* VARIABLES */

  ;
  var isDragging = false;

  /* CONFIG */

  var config = {
    name: 'draggable',
    options: {
      draggable: _.true, //INFO: Checks if we can drag it or not
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
        x: _.true,
        y: _.true
      },
      classes: {
        dragging: 'dragging'
      },
      selectors: {
        handler: '.draggable-handler'
      },
      callbacks: {
        start: function start() {},
        move: function move() {},
        end: function end() {}
      }
    }
  };

  /* DRAGGABLE */

  var Draggable = (function (_Svelto$Widget10) {
    _inherits(Draggable, _Svelto$Widget10);

    function Draggable() {
      _classCallCheck(this, Draggable);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Draggable).apply(this, arguments));
    }

    _createClass(Draggable, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.draggable').draggable();
        $root.filter('.draggable').draggable();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.draggable = this.element;
        this.$draggable = this.$element;

        this.$handlers = this.options.onlyHandlers ? this.$draggable.find(this.options.selectors.handler) : this.$draggable;
      }
    }, {
      key: '_events',
      value: function _events() {

        /* DOWN */

        this._on(this.$handlers, Pointer.down, this.__down);

        /* PROXY */

        if (this.options.$proxy) {

          this._on(this.options.$proxy, Pointer.down, this.__down);
        }
      }

      /* ACTIONS */

    }, {
      key: '_centerToPoint',
      value: function _centerToPoint(point, suppressClasses) {

        var draggableOffset = this.$draggable.offset();

        var deltaXY = {
          X: point.X - (draggableOffset.left + this.$draggable.outerWidth() / 2),
          Y: point.Y - (draggableOffset.top + this.$draggable.outerHeight() / 2)
        };

        return this._actionMove(deltaXY, suppressClasses);
      }
    }, {
      key: '_actionMove',
      value: function _actionMove(deltaXY, suppressClasses) {

        var baseXY = {
          X: this.proxyXY ? this.proxyXY.X : this.initialXY.X,
          Y: this.proxyXY ? this.proxyXY.Y : this.initialXY.Y
        };

        if (this.motion === false) {

          this.motion = true;

          if (this.options.constrainer.$element) {

            var constrainerOffset = this.options.constrainer.$element.offset(),
                draggableOffset = this.$draggable.offset();

            if (this.options.axis !== 'y') {

              var halfWidth = this.options.constrainer.constrainCenter ? this.$draggable.outerWidth() / 2 : 0;

              this.translateX_min = constrainerOffset.left - (draggableOffset.left - baseXY.X) - halfWidth;
              this.translateX_max = constrainerOffset.left + this.options.constrainer.$element.outerWidth() - (draggableOffset.left - baseXY.X + this.$draggable.outerWidth()) + halfWidth;
            }

            if (this.options.axis !== 'x') {

              var halfHeight = this.options.constrainer.constrainCenter ? this.$draggable.outerHeight() / 2 : 0;

              this.translateY_min = constrainerOffset.top - (draggableOffset.top - baseXY.Y) - halfHeight;
              this.translateY_max = constrainerOffset.top + this.options.constrainer.$element.outerHeight() - (draggableOffset.top - baseXY.Y + this.$draggable.outerHeight()) + halfHeight;
            }
          }

          if (!suppressClasses) {

            $html.addClass(this.options.classes.dragging);
            this.$draggable.addClass(this.options.classes.dragging);
          }
        }

        var translateX = baseXY.X,
            translateY = baseXY.Y;

        if (this.options.axis !== 'y') {

          translateX += deltaXY.X;

          if (this.options.constrainer.$element) {

            translateX = _.clamp(this.translateX_min - this.options.constrainer.tollerance.x, translateX, this.translateX_max + this.options.constrainer.tollerance.x);
          }
        }

        if (this.options.axis !== 'x') {

          translateY += deltaXY.Y;

          if (this.options.constrainer.$element) {

            translateY = _.clamp(this.translateY_min - this.options.constrainer.tollerance.y, translateY, this.translateY_max + this.options.constrainer.tollerance.y);
          }
        }

        var modifiedXY = {
          X: this.options.modifiers.x(translateX),
          Y: this.options.modifiers.y(translateY)
        },
            endXY = {
          X: _.isBoolean(modifiedXY.X) ? modifiedXY.X ? translateX : baseXY.X : modifiedXY.X,
          Y: _.isBoolean(modifiedXY.Y) ? modifiedXY.Y ? translateY : baseXY.Y : modifiedXY.Y
        };

        this.$draggable.translate(endXY.X, endXY.Y);

        return endXY;
      }

      /* HANDLERS */

    }, {
      key: '__down',
      value: function __down(event) {

        if (!isDragging && this.options.draggable()) {

          event.preventDefault();

          isDragging = true;

          this.motion = false;

          this.startXY = $.eventXY(event);
          this.initialXY = this.$draggable.translate();

          this.isProxyed = this.options.$proxy && event.currentTarget === this.options.$proxy[0];
          this.proxyXY = false;

          this._trigger('start', { event: event, draggable: this.draggable, initialXY: this.initialXY });

          this._on($document, Pointer.move, this.__move);
          this._on($document, Pointer.up, this.__up);
          this._on($document, Pointer.cancel, this.__cancel);
        }
      }
    }, {
      key: '__move',
      value: function __move(event) {

        if (this.isProxyed && this.motion === false) {

          var _modifiedXY = this._centerToPoint(this.startXY);

          this.proxyXY = this.$draggable.translate();
        }

        var moveXY = $.eventXY(event),
            deltaXY = {
          X: moveXY.X - this.startXY.X,
          Y: moveXY.Y - this.startXY.Y
        };

        var modifiedXY = this._actionMove(deltaXY);

        this._trigger('move', { event: event, draggable: this.draggable, initialXY: this.initialXY, moveXY: modifiedXY });
      }
    }, {
      key: '__up',
      value: function __up(event) {

        var modifiedXY = this.initialXY;

        if (this.motion === true) {

          $html.removeClass(this.options.classes.dragging);
          this.$draggable.removeClass(this.options.classes.dragging);

          /* REVERTABLE */

          if (this.options.revertable) {

            this.$draggable.translate(this.initialXY.X, this.initialXY.Y); //TODO: Animate it
          } else {

              modifiedXY = this.$draggable.translate();
            }
        } else if (this.isProxyed) {

          if (this.options.proxyWithoutMotion && (!event.button || event.button === UI.mouseButton.LEFT)) {

            var endXY = $.eventXY(event);

            modifiedXY = this._centerToPoint(endXY, true);
          }
        }

        isDragging = false;

        this._off($document, Pointer.move, this.__move);
        this._off($document, Pointer.up, this.__up);
        this._off($document, Pointer.cancel, this.__cancel);

        this._trigger('end', { event: event, draggable: this.draggable, initialXY: this.initialXY, endXY: modifiedXY, motion: this.motion });
      }
    }, {
      key: '__cancel',
      value: function __cancel() {

        isDragging = false;

        this._off($document, Pointer.move, this.__move);
        this._off($document, Pointer.up, this.__up);
        this._off($document, Pointer.cancel, this.__cancel);
      }
    }]);

    return Draggable;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Draggable = Draggable;
  Svelto.Draggable.config = config;

  /* FACTORY */

  $.factory(Svelto.Draggable);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Transform (Utilties)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

/* TRANSFORM UTILITIES */

//FIXME: Do we need to support -webkit- prefixing?

(function ($, _, window, document, undefined) {
  'use strict'

  /* MATRIX */

  ;
  $.fn.matrix = function (values) {

    if (values) {

      this.css('transform', 'matrix(' + values.join(',') + ')');

      return this;
    } else {

      var transformStr = this.css('transform');

      return transformStr && transformStr !== 'none' ? transformStr.match(/[0-9., e-]+/)[0].split(', ').map(function (value) {
        return parseFloat(value);
      }) : [1, 0, 0, 1, 0, 0];
    }
  };

  /* TRANSFORMATIONS */

  var transformations = ['scaleX', 'skewY', 'skewX', 'scaleY', 'translateX', 'translateY']; //INFO: Their index is also the corresponsing index when applying `transform: matrix()`

  for (var i = 0, l = transformations.length; i < l; i++) {

    $.fn[transformations[i]] = (function (index) {

      return function (value) {

        var matrix = this.matrix();

        if (!_.isUndefined(value)) {

          matrix[index] = value;

          return this.matrix(matrix);
        } else {

          return matrix[index];
        }
      };
    })(i);
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
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Positionate
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../transform/transform.js
 * ========================================================================= */

//TODO: Add allignment, that is, if possibile don't center the dropdown but align it to one of the trigger edges
//FIXME: Big elements gets positionated badly, for example try some tooltips in a small viewport

(function ($, _, window, document, undefined) {
  'use strict'

  /* UTILITES */

  ;
  var isHorizontal = function isHorizontal(direction) {

    return direction === 'left' || direction === 'right';
  };

  var isVertical = function isVertical(direction) {

    return !isHorizontal(direction);
  };

  var getOpposite = function getOpposite(direction) {

    var opposites = {
      'top': 'bottom',
      'bottom': 'top',
      'left': 'right',
      'right': 'left'
    };

    return opposites[direction];
  };

  /* POSITIONATE */

  $.fn.positionate = function (options) {

    /* OPTIONS */

    options = _.merge({
      direction: false, //INFO: Set a preferred direction, it has greater priority over the axis
      axis: false, //INFO: Set a preferred axis
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
        change: _.noop
      }
    }, options);

    /* RESET */

    this.removeClass('positionate-top positionate-bottom positionate-left positionate-right');

    /* VARIABLES */

    var directions = _.unique(_.union(options.direction ? [options.direction] : [], options.axis ? options.ranks[options.axis] : [], options.ranks.all)),
        windowWidth = $window.width(),
        windowHeight = $window.height(),
        positionableRect = this.getRect(),
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

        var opposite = getOpposite(directions[index]),
            oppositeIndex = directions.indexOf(opposite);

        _.move(directions, oppositeIndex, 0);
        _.move(spaces, oppositeIndex, 0);
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
        coordinates = void 0;

    /* TOP / LEFT */

    switch (bestDirection) {

      case 'top':
      case 'bottom':
        coordinates = {
          top: bestDirection === 'top' ? anchorRect.top - positionableRect.height - options.spacing : anchorRect.bottom + options.spacing,
          left: anchorRect.left + anchorRect.width / 2 - positionableRect.width / 2
        };
        break;

      case 'left':
      case 'right':
        coordinates = {
          top: anchorRect.top + anchorRect.height / 2 - positionableRect.height / 2,
          left: bestDirection === 'left' ? anchorRect.left - positionableRect.width - options.spacing : anchorRect.right + options.spacing
        };

    }

    /* CONSTRAIN TO THE WINDOW */

    if (options.$anchor) {

      var oppositeSpace = spaces[bestIndex],
          isAnchorVisible = isVertical(bestDirection) ? oppositeSpace <= windowHeight : oppositeSpace <= windowWidth;

      if (isAnchorVisible) {

        coordinates.top = _.clamp(options.spacing, coordinates.top, windowHeight - positionableRect.height - options.spacing);
        coordinates.left = _.clamp(options.spacing, coordinates.left, windowWidth - positionableRect.width - options.spacing);
      }
    }

    /* DATAS */

    var datas = {
      coordinates: coordinates,
      direction: bestDirection,
      oppositeDirection: getOpposite(bestDirection)
    };

    /* POINTER TOP / LEFT */

    var $pointer = void 0,
        translateType = void 0,
        translateValue = void 0;

    if (options.$anchor && options.$pointer) {

      $pointer = _.isFunction(options.$pointer) ? options.$pointer(datas) : options.$pointer;

      if ($pointer instanceof $) {

        switch (bestDirection) {

          case 'top':
          case 'bottom':
            translateType = 'translateX', translateValue = anchorRect.left - coordinates.left + anchorRect.width / 2;
            break;

          case 'left':
          case 'right':
            translateType = 'translateY', translateValue = anchorRect.top - coordinates.top + anchorRect.height / 2;
            break;

        }
      }
    }

    /* SETTING */

    this.translate(coordinates.left, coordinates.top);

    this.addClass('positionate-' + bestDirection);

    if (options.$anchor && options.$pointer && $pointer instanceof $) {

      $pointer[translateType](translateValue);
    }

    /* CALLBACK */

    options.callbacks.change(datas);

    return this;
  };
})(Svelto.$, Svelto._, window, document);

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

(function ($, _, window, document, undefined) {
  'use strict'

  /* VARIABLES */

  ;
  var $stylesheet = void 0,
      tree = {};

  /* UTILITIES */

  var cssfy = function cssfy(tree) {

    var css = '';

    for (var selector in tree) {

      css += selector + '{';

      if (_.isString(tree[selector])) {

        css += tree[selector];
      } else {

        for (var property in tree[selector]) {

          css += property + ':' + tree[selector][property] + ';';
        }
      }

      css += '}';
    }

    return css;
  };

  var update = function update() {

    var css = cssfy(tree);

    $stylesheet.html(css);
  };

  /* PSEUDO CSS */

  $.pseudoCSS = function (selector, property, value) {

    if (_.isString(property)) {

      tree[selector] = property;
    } else {

      var rule = _.isUndefined(value) ? property : { property: value };

      tree[selector] = _.merge(_.isString(tree[selector]) ? {} : tree[selector] || {}, rule);
    }

    update();
  };

  /* READY */

  $(function () {

    $stylesheet = $('<style />').appendTo($head);
  });
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Dropdown
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * @requires ../positionate/positionate.js
 * @requires ../pseudo_css/pseudo_css.js
 * ========================================================================= */

//TODO: Add support for delegating the trigger click, so that we support the case when a trigger has been added to the DOM dynamically

//FIXME: Hover open, enter the dropdown and click it, it gets closed...

(function ($, _, window, document, undefined) {
  'use strict'

  /* VARIABLES */

  ;
  var assignments = {},
      openedNr = 0;

  /* CONFIG */

  var config = {
    name: 'dropdown',
    options: {
      hover: {
        triggerable: false,
        delays: {
          open: 750,
          close: 250
        }
      },
      spacing: {
        attached: 0,
        noTip: 7,
        normal: 14
      },
      datas: {
        element: 'dropdown'
      },
      classes: {
        noTip: 'no-tip',
        attached: 'attached',
        moving: 'moving',
        open: 'open'
      },
      selectors: {
        closer: '.dropdown-closer',
        trigger: '.dropdown-trigger'
      },
      callbacks: {
        beforeopen: function beforeopen() {},
        open: function open() {},
        close: function close() {}
      }
    }
  };

  /* DROPDOWN */

  var Dropdown = (function (_Svelto$Widget11) {
    _inherits(Dropdown, _Svelto$Widget11);

    function Dropdown() {
      _classCallCheck(this, Dropdown);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Dropdown).apply(this, arguments));
    }

    _createClass(Dropdown, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.dropdown').dropdown();
        $root.filter('.dropdown').dropdown();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$dropdown = this.$element;
        this.$closers = this.$dropdown.find(this.options.selectors.closer);

        this.id = this.$dropdown.attr('id');
        this.$triggers = $(this.options.selectors.trigger + '[data-' + this.options.datas.element + '="' + this.id + '"]');

        this.hasTip = !this.$dropdown.hasClass(this.options.classes.noTip);
        this.isAttached = this.$dropdown.hasClass(this.options.classes.attached);

        this._isOpen = false;
      }
    }, {
      key: '_events',
      value: function _events() {

        /* TRIGGER */

        this._on(this.$triggers, Pointer.tap, this.toggle);

        /* CLOSER */

        this._on(this.$closers, Pointer.tap, this.close);

        // this.$btn_parents.on ( 'scroll', this.update ); //FIXME: If we are doing it into a scrollable content it will be a problem if we don't handle it, the dropdown will not move

        /* HOVER */

        if (this.options.hover.triggerable) {

          this._on(this.$triggers, Pointer.enter, this.__hoverTriggerEnter);
        }
      }

      /* HOVER */

    }, {
      key: '__hoverTriggerEnter',
      value: function __hoverTriggerEnter(event) {

        if (!this._isOpen) {

          this._isHoverOpen = false;
          this._hoverTrigger = event.currentTarget;

          this._hoverOpenTimeout = this._delay(this.__hoverOpen, this.options.hover.delays.open);

          this._one($(event.currentTarget), Pointer.leave, this.__hoverTriggerLeave);
        }
      }
    }, {
      key: '__hoverOpen',
      value: function __hoverOpen() {

        if (!this._isOpen) {

          this.open(false, this._hoverTrigger);

          this._isHoverOpen = true;

          this._hoverOpenTimeout = false;
        }
      }
    }, {
      key: '__hoverTriggerLeave',
      value: function __hoverTriggerLeave(event) {

        if (this._hoverOpenTimeout) {

          clearTimeout(this._hoverOpenTimeout);

          this._hoverOpenTimeout = false;
        }

        if (this._isHoverOpen) {

          this._hoverCloseTimeout = this._delay(this.__hoverClose, this.options.hover.delays.close);

          this._on(Pointer.enter, this.__hoverDropdownEnter);
        }
      }
    }, {
      key: '__hoverClose',
      value: function __hoverClose() {

        if (this._isHoverOpen) {

          this.close();

          this._isHoverOpen = false;

          this._hoverCloseTimeout = false;
        }

        this._off(Pointer.enter, this.__hoverDropdownEnter);
      }
    }, {
      key: '__hoverDropdownEnter',
      value: function __hoverDropdownEnter() {

        if (this._hoverCloseTimeout) {

          clearTimeout(this._hoverCloseTimeout);

          this._hoverCloseTimeout = false;
        }

        if (this._isHoverOpen) {

          this._one(Pointer.leave, this.__hoverDropdownLeave);
        }
      }
    }, {
      key: '__hoverDropdownLeave',
      value: function __hoverDropdownLeave() {

        if (this._isHoverOpen) {

          this._hoverCloseTimeout = this._delay(this.__hoverClose, this.options.hover.delays.close);
        }
      }

      /* WINDOW RESIZE / SCROLL */

    }, {
      key: '_bindWindowResizeScroll',
      value: function _bindWindowResizeScroll() {

        this._on($window, 'resize scroll', this._update);
      }
    }, {
      key: '_unbindWindowResizeScroll',
      value: function _unbindWindowResizeScroll() {

        this._off($window, 'resize scroll', this._update);
      }

      /* WINDOW TAP */

    }, {
      key: '_bindWindowTap',
      value: function _bindWindowTap() {

        this._on($window, Pointer.tap, this.__windowTap);
      }
    }, {
      key: '_unbindWindowTap',
      value: function _unbindWindowTap() {

        this._off($window, Pointer.tap, this.__windowTap);
      }
    }, {
      key: '__windowTap',
      value: function __windowTap(event) {

        var eventXY = $.eventXY(event),
            rect = this.$dropdown.getRect();

        if (eventXY.X < rect.left || eventXY.X > rect.right || eventXY.Y < rect.top || eventXY.Y > rect.bottom) {

          this.close();
        }
      }

      /* POSITIONATE */

    }, {
      key: '_positionate',
      value: function _positionate() {

        /* VARIABLES */

        var $trigger = $(assignments[this.id]),
            $mockTip = $('<div>'),
            noTip = $trigger.hasClass(this.options.classes.noTip) || !this.hasTip || this.isAttached,
            self = this;

        /* POSITIONATE */

        this.$dropdown.positionate({
          $anchor: $trigger,
          $pointer: noTip ? false : $mockTip,
          spacing: this.isAttached ? this.options.spacing.attached : noTip ? this.options.spacing.noTip : this.options.spacing.normal,
          callbacks: {
            change: function change(data) {
              $trigger.addClass('dropdown-trigger-' + data.direction);
            }
          }
        });

        /* MOCK TIP */

        if (!noTip) {

          $.pseudoCSS('#' + this.id + ':before', $mockTip.attr('style').slice(0, -1) + ' rotate(45deg)'); //FIXME: A bit to hacky, expecially that `rotate(45deg)`
        }
      }

      /* PRIVATE */

    }, {
      key: '_update',
      value: function _update() {

        if (this._isOpen) {

          this._positionate();
        }
      }

      /* PUBLIC */

    }, {
      key: 'isOpen',
      value: function isOpen() {

        return this._isOpen;
      }
    }, {
      key: 'toggle',
      value: function toggle(event) {

        this[this._isOpen && assignments[this.id] === event.currentTarget ? 'close' : 'open'](event, event.currentTarget);
      }
    }, {
      key: 'open',
      value: function open(event, trigger) {

        if (!this._isOpen) {

          trigger = trigger || event.currentTarget;

          if (trigger) {

            $(assignments[this.id]).removeClass('dropdown-trigger-top dropdown-trigger-bottom dropdown-trigger-left dropdown-trigger-right ' + this.options.classes.open);

            if (this._isOpen && assignments[this.id] !== trigger) {

              this.$dropdown.addClass(this.options.classes.moving);
            }

            assignments[this.id] = trigger;

            $(trigger).addClass(this.options.classes.open);
          }

          this._trigger('beforeopen');

          this._positionate();

          this.$dropdown.addClass(this.options.classes.open);

          this._isOpen = true;

          openedNr += 1;

          this._delay(this._bindWindowTap); //FIXME: Why without the delay it doesn't work?
          this._bindWindowResizeScroll();

          this._trigger('open');
        }
      }
    }, {
      key: 'close',
      value: function close() {

        if (this._isOpen) {

          $(assignments[this.id]).removeClass('dropdown-trigger-top dropdown-trigger-bottom dropdown-trigger-left dropdown-trigger-right ' + this.options.classes.open);

          this.$dropdown.removeClass(this.options.classes.open + ' ' + this.options.classes.moving);

          this._isOpen = false;

          openedNr -= 1;

          if (openedNr === 0) {

            this._unbindWindowTap();
            this._unbindWindowResizeScroll();
          }

          this._trigger('close');
        }
      }
    }]);

    return Dropdown;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Dropdown = Dropdown;
  Svelto.Dropdown.config = config;

  /* FACTORY */

  $.factory(Svelto.Dropdown);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Droppable
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Add a anction on hovering

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'droppable',
    selector: '*',
    callbacks: {
      drop: function drop() {}
    }
  };

  /* DROPPABLE */

  var Droppable = (function (_Svelto$Widget12) {
    _inherits(Droppable, _Svelto$Widget12);

    function Droppable() {
      _classCallCheck(this, Droppable);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Droppable).apply(this, arguments));
    }

    _createClass(Droppable, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.droppable').droppable();
        $root.filter('.droppable').droppable();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$droppable = this.$element;
      }
    }, {
      key: '_events',
      value: function _events() {

        /* DRAG END */

        this._on($document, 'draggable:end', this.__dragEnd);
      }

      /* PRIVATE */

    }, {
      key: '__dragEnd',
      value: function __dragEnd(event, data) {

        var $draggable = $(data.draggable);

        if ($draggable.is(this.options.selector)) {

          var rect = this.$droppable.getRect(),
              eventXY = $.eventXY(data.event),
              pointXY = {
            X: eventXY.X - $window.scrollTop(),
            Y: eventXY.Y - $window.scrollLeft()
          };

          if (pointXY.X >= rect.left && pointXY.X <= rect.right && pointXY.Y >= rect.top && pointXY.Y <= rect.bottom) {

            this._trigger('drop', { draggable: data.draggable, droppable: this.element });
          }
        }
      }
    }]);

    return Droppable;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Droppable = Droppable;
  Svelto.Droppable.config = config;

  /* FACTORY */

  $.factory(Svelto.Droppable);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Flippable
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//FIXME: Right clicking on a `.flippable-trigger` flips it, it should just do nothing instead, probably a Pointer problem

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'flippable',
    options: {
      classes: {
        flip: 'flipped'
      },
      selectors: {
        front: '.flippable-front',
        back: '.flippable-back',
        flipper: '.flippable-trigger'
      },
      callbacks: {
        front: function front() {},
        back: function back() {}
      }
    }
  };

  /* FLIPPABLE */

  var Flippable = (function (_Svelto$Widget13) {
    _inherits(Flippable, _Svelto$Widget13);

    function Flippable() {
      _classCallCheck(this, Flippable);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Flippable).apply(this, arguments));
    }

    _createClass(Flippable, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.flippable').flippable();
        $root.filter('.flippable').flippable();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$flippable = this.$element;
        this.$front = this.$flippable.find(this.options.selectors.front);
        this.$back = this.$flippable.find(this.options.selectors.back);
        this.$flippers = this.$flippable.find(this.options.selectors.flipper);

        this.isFlipped = this.$flippable.hasClass(this.options.classes.flip);
      }
    }, {
      key: '_events',
      value: function _events() {

        /* FLIPPER */

        this._on(this.$flippers, Pointer.tap, this.flip);
      }

      /* PUBLIC */

    }, {
      key: 'flip',
      value: function flip(force) {

        if (!_.isBoolean(force)) {

          force = !this.isFlipped;
        }

        if (force !== this.isFlipped) {

          this.isFlipped = force;

          this.$flippable.toggleClass(this.options.classes.flip, this.isFlipped);

          this._trigger(this.isFlipped ? 'back' : 'front');
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
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Flippable = Flippable;
  Svelto.Flippable.config = config;

  /* FACTORY */

  $.factory(Svelto.Flippable);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Spinner Overlay
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'spinnerOverlay',
    templates: {
      overlay: '<div class="overlay spinner-overlay {%=(o.dimmer ? "dimmer" : "")%} {%=(o.blurrer ? "blurrer" : "")%}">' + '{% if ( o.labeled ) { %}' + '<div class="spinner-label {%=(o.multicolor ? "" : o.colors.labeled)%}">' + '{% } %}' + '<svg class="spinner {%=(o.multicolor ? "multicolor" : ( o.labeled ? "" : o.colors.unlabeled ))%}">' + '<circle cx="1.625em" cy="1.625em" r="1.25em" />' + '</svg>' + '{% if ( o.labeled ) { %}' + '</div>' + '{% } %}' + '</div>'
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

  var SpinnerOverlay = (function (_Svelto$Widget14) {
    _inherits(SpinnerOverlay, _Svelto$Widget14);

    function SpinnerOverlay() {
      _classCallCheck(this, SpinnerOverlay);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(SpinnerOverlay).apply(this, arguments));
    }

    _createClass(SpinnerOverlay, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.spinner-overlay').spinnerOverlay();
        $root.filter('.spinner-overlay').spinnerOverlay();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$overlayed = this.$element;
        this.$overlay = $(this._tmpl('overlay', this.options)).prependTo(this.$overlayed);

        this.overlay = this.$overlay.overlay('instance');
      }

      /* API */

    }, {
      key: 'isOpen',
      value: function isOpen() {

        return this.overlay.isOpen();
      }
    }, {
      key: 'toggle',
      value: function toggle(force) {

        this.overlay.toggle(force);
      }
    }, {
      key: 'open',
      value: function open() {

        this.overlay.open();
      }
    }, {
      key: 'close',
      value: function close() {

        this.overlay.close();
      }
    }]);

    return SpinnerOverlay;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.SpinnerOverlay = SpinnerOverlay;
  Svelto.SpinnerOverlay.config = config;

  /* FACTORY */

  $.factory(Svelto.SpinnerOverlay);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Noty
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Add better support for swipe to dismiss

(function ($, _, window, document, undefined) {
  'use strict'

  /* VARIABLES */

  ;
  var notiesTimers = [];

  /* CONFIG */

  var config = {
    name: 'noty',
    templates: {
      base: '<div class="noty {%=o.type%} {%=(o.type !== "action" ? "actionable" : "")%} {%=o.color%} {%=o.css%}">' + '<div class="infobar">' + '{% if ( o.img ) { %}' + '<img src="{%=o.img%}" class="noty-img infobar-left" />' + '{% } %}' + '{% if ( o.title || o.body ) { %}' + '<div class="infobar-center">' + '{% if ( o.title ) { %}' + '<p class="infobar-title">' + '{%#o.title%}' + '</p>' + '{% } %}' + '{% if ( o.body ) { %}' + '{%#o.body%}' + '{% } %}' + '</div>' + '{% } %}' + '{% if ( o.buttons.length === 1 ) { %}' + '<div class="infobar-right">' + '{% include ( "noty.button", o.buttons[0] ); %}' + '</div>' + '{% } %}' + '</div>' + '{% if ( o.buttons.length > 1 ) { %}' + '<div class="noty-buttons multiple centered">' + '{% for ( var i = 0; i < o.buttons.length; i++ ) { %}' + '{% include ( "noty.button", o.buttons[i] ); %}' + '{% } %}' + '</div>' + '{% } %}' + '</div>',
      button: '<div class="button {%=(o.color || "white")%} {%=(o.size || "small")%} {%=(o.css || "")%}">' + '{%#(o.text || "")%}' + '</div>'
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
                onClick: _.noop
             }],
      */
      type: 'alert',
      color: 'black',
      css: '',
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
        remove: UI.animation.normal
      },
      callbacks: {
        open: function open() {},
        close: function close() {}
      }
    }
  };

  /* HELPER */

  $.noty = function (options) {

    /* OPTIONS */

    options = _.isString(options) ? { body: options } : options || {};

    if (options.buttons) {

      options.type = 'action';
    }

    /* NOTY */

    return new Svelto.Noty(options);
  };

  /* NOTY */

  var Noty = (function (_Svelto$Widget15) {
    _inherits(Noty, _Svelto$Widget15);

    function Noty() {
      _classCallCheck(this, Noty);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Noty).apply(this, arguments));
    }

    _createClass(Noty, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.noty').noty();
        $root.filter('.noty').noty();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$noty = this.$element;
        this.$buttons = this.$noty.find(this.options.selectors.button);

        this.timer = false;
        this._isOpen = false;
        this.neverOpened = true;
      }
    }, {
      key: '_init',
      value: function _init() {

        if (this.options.autoplay) {

          this.open();
        }
      }

      /* PRIVATE */

    }, {
      key: '___tap',
      value: function ___tap() {

        if (this.options.type !== 'action') {

          //FIXME: If mouse only if left mouse button click

          this._on(Pointer.tap, this.close);
        }
      }
    }, {
      key: '___buttonTap',
      value: function ___buttonTap() {

        _.each(this.options.buttons, function (button, index) {

          this._on(this.$buttons.eq(index), Pointer.tap, function (event, data) {

            if (button.onClick) {

              if (button.onClick.apply(this.$buttons[index], [event, data]) === false) return;
            }

            this.close();
          });
        }, this);
      }
    }, {
      key: '___timer',
      value: function ___timer() {

        if (this.options.type !== 'action' && _.isNumber(this.options.ttl) && this.options.ttl !== Infinity) {

          this.timer = new Timer(this.close.bind(this), this.options.ttl, true);

          notiesTimers.push(this.timer);
        }
      }
    }, {
      key: '___hover',
      value: function ___hover() {

        var instance = this;

        this.$noty.hover(function () {

          notiesTimers.forEach(function (timer) {
            return timer.pause();
          });
        }, function () {

          notiesTimers.forEach(function (timer) {

            timer.remaining(Math.max(instance.options.timerMinimumRemaining, timer.remaining() || 0));

            timer.play();
          });
        });
      }
    }, {
      key: '___flick',
      value: function ___flick() {

        if (this.options.type !== 'action') {

          this._on(Pointer.flick, function (event, data) {

            if (data.orientation === 'horizontal') {

              this.close();
            }
          });
        }
      }
    }, {
      key: '__keydown',
      value: function __keydown(event) {

        if (event.keyCode === UI.keyCode.ESCAPE) {

          event.preventDefault();
          event.stopImmediatePropagation();

          this.close();
        }
      }

      /* PUBLIC */

    }, {
      key: 'isOpen',
      value: function isOpen() {

        return this._isOpen;
      }
    }, {
      key: 'open',
      value: function open() {
        var _this20 = this;

        if (!this._isOpen) {

          this._frame(function () {

            $('.noty-queues.' + _this20.options.anchor.y + ' .noty-queue.' + _this20.options.anchor.x).append(_this20.$noty);

            _this20._frame(function () {

              _this20.$noty.addClass(_this20.options.classes.open);
            });
          });

          if (this.neverOpened) {

            this.___tap();
            this.___flick();
            this.___buttonTap();
            this.___hover();

            this.neverOpened = false;
          }

          this.___timer();

          this._on($document, 'keydown', this.__keydown);

          this._isOpen = true;

          this._trigger('open');
        }
      }
    }, {
      key: 'close',
      value: function close() {

        if (this._isOpen) {

          this.$noty.removeClass(this.options.classes.open);

          this._delay(function () {

            this.$noty.detach();
          }, this.options.animations.remove);

          if (this.timer) {

            _.pull(notiesTimers, this.timer);

            this.timer.stop();
          }

          this._off($document, 'keydown', this.__keydown);

          this._isOpen = false;

          this._trigger('close');
        }
      }
    }]);

    return Noty;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Noty = Noty;
  Svelto.Noty.config = config;

  /* FACTORY */

  $.factory(Svelto.Noty);

  /* READY */

  $(function () {

    $body.append('<div class="noty-queues top">' + '<div class="noty-queue expanded"></div>' + '<div class="noty-queues-row">' + '<div class="noty-queue left"></div>' + '<div class="noty-queue center"></div>' + '<div class="noty-queue right"></div>' + '</div>' + '</div>' + '<div class="noty-queues bottom">' + '<div class="noty-queues-row">' + '<div class="noty-queue left"></div>' + '<div class="noty-queue center"></div>' + '<div class="noty-queue right"></div>' + '</div>' + '<div class="noty-queue expanded"></div>' + '</div>');
  });
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - formValidate
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * @requires ../noty/noty.js
 * ========================================================================= */

//TODO: Show error message
//TODO: Add meta validators that accepts other validators as arguments, for example not[email], oppure not[matches[1,2,3]] oppure oneOf[email,url,alphanumeric] etc... maybe write it this way: oneOf[matches(1-2-3)/matches(a-b-c)]

//TODO: Add support for validating checkboxes and radios

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'formValidate',
    options: {
      validators: {
        /* TYPE */

        alpha: function alpha(value) {
          var re = /^[a-zA-Z]+$/;
          return value.match(re) ? true : 'Only alphabetical characters are allowed';
        },
        alphanumeric: function alphanumeric(value) {
          var re = /^([a-zA-Z0-9]+)$/;
          return value.match(re) ? true : 'Only alphanumeric characters are allowed';
        },
        hexadecimal: function hexadecimal(value) {
          var re = /^[0-9a-fA-F]+$/;
          return value.match(re) ? true : 'Only hexadecimal characters are allowed';
        },
        number: function number(value) {
          var re = /^-?[0-9]+$/; //FIXME: It is supposed to match both integers and floats, but it doesn't
          return value.match(re) ? true : 'Only numbers are allowed';
        },
        integer: function integer(value) {
          var re = /^(?:-?(?:0|[1-9][0-9]*))$/;
          return value.match(re) ? true : 'Only integers numbers are allowed';
        },
        float: function float(value) {
          var re = /^(?:-?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/; //FIXME: We are also matching the scientific notation here, this might be unwanted, expecially if a language that doesn't support this notation has to take care of it
          return value.match(re) ? true : 'Only floating point numbers are allowed';
        },

        /* NUMBER */
        min: function min(value, _min) {
          return Number(value) >= Number(_min) ? true : 'The number must be at least ' + _min;
        },
        max: function max(value, _max) {
          return Number(value) <= Number(_max) ? true : 'The number must be at maximum ' + _max;
        },
        range: function range(value, min, max) {
          value = Number(value);
          return value >= Number(min) && value <= Number(max) ? true : 'The number must be between ' + min + ' and ' + max;
        },

        /* STRING */
        minLength: function minLength(value, _minLength) {
          return value.trim().length >= Number(_minLength) ? true : 'The lenght must be at least ' + _minLength;
        },
        maxLength: function maxLength(value, _maxLength) {
          return value.trim().length <= Number(_maxLength) ? true : 'The lenght must be at maximum ' + _maxLength;
        },
        rangeLength: function rangeLength(value, minLength, maxLength) {
          value = value.trim();
          return value.length >= Number(minLength) && value.length <= Number(maxLength) ? true : 'The length must be between ' + minLength + ' and ' + maxLength;
        },
        exactLength: function exactLength(value, length) {
          return value.trim().length === Number(length) ? true : 'The length must be exactly ' + length;
        },

        /* THINGS */
        email: function email(value) {
          var re = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
          return value.match(re) ? true : 'Enter a valid email address';
        },
        cc: function cc(value) {
          var re = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
          return value.match(re) ? true : 'Enter a valid credit card number';
        },
        ssn: function ssn(value) {
          var re = /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/;
          return value.match(re) ? true : 'Enter a valid Social Security Number';
        },
        ipv4: function ipv4(value) {
          var re = /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/;
          return value.match(re) ? true : 'Enter a valid IPv4 address';
        },
        url: function url(value) {
          var re = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i;
          return value.match(re) ? true : 'Enter a valid URL';
        },

        /* OTHERS */
        required: function required(value) {
          return value.trim().length > 0 ? true : 'This field is required';
        },
        matches: function matches(value) {
          var matches = _.slice(arguments, 1);
          return matches.indexOf(value.toLowerCase()) !== -1 ? true : 'This value is not allowed';
        },
        matchesField: function matchesField(value, fieldName) {
          var fieldValue = _.find(this, { name: fieldName }).value;
          return value === fieldValue ? true : 'The two fields don\'t match';
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
        validations: 'validations'
      },
      classes: {
        disabled: 'disabled',
        invalid: 'invalid',
        valid: 'valid'
      },
      selectors: {
        element: 'input, textarea, select',
        wrapper: '.button.checkbox, .button.radio, .select-btn, .slider, .switch, .datepicker, .colorpicker',
        submitter: 'input[type="submit"], button[type="submit"]'
      },
      callbacks: {
        //TODO: Add some callbacks
      }
    }
  };

  /* FORM VALIDATE */

  var FormValidate = (function (_Svelto$Widget16) {
    _inherits(FormValidate, _Svelto$Widget16);

    function FormValidate() {
      _classCallCheck(this, FormValidate);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(FormValidate).apply(this, arguments));
    }

    _createClass(FormValidate, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('[data-validations]').parents('form').formValidate();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$form = this.$element;
        this.$elements = this.$element.find(this.options.selectors.element);
        this.$submitters = this.$element.find(this.options.selectors.submitter);

        this._isValid = undefined;
        this.isDirty = true;

        this.___elements();
      }
    }, {
      key: '_events',
      value: function _events() {

        /* CHANGE */

        this._on(this.$elements, 'change', this.__change);

        /* FOCUS */

        this._on(this.$elements, 'focus', this.__focus);

        /* BLUR */

        this._on(this.$elements, 'blur', this.__blur);

        /* SUBMIT */

        this._on('submit', this.__submit);
      }

      /* ELEMENTS */

    }, {
      key: '___elements',
      value: function ___elements() {

        this.elements = {};

        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = this.$elements[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var element = _step6.value;

            var $element = $(element),
                name = element.name,
                validationsStr = $element.data(this.options.datas.validations),
                validations = false;

            if (validationsStr) {

              validations = {};

              var validationsArr = validationsStr.split(this.options.characters.separators.validations);

              var _iteratorNormalCompletion7 = true;
              var _didIteratorError7 = false;
              var _iteratorError7 = undefined;

              try {
                for (var _iterator7 = validationsArr[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                  var validationStr = _step7.value;

                  var matches = validationStr.match(this.options.regexes.validation);

                  if (!matches) continue;

                  var validationName = matches[1],
                      validationArgs = matches[2] ? matches[2].split(this.options.characters.separators.arguments) : [],
                      validator = this.options.validators[validationName];

                  if (!validator) continue;

                  validations[validationName] = {
                    args: validationArgs,
                    validator: validator
                  };
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

              if (_.size(validations) === 0) {

                validations = false;
              }
            }

            var $wrappers = $element.parents(this.options.selectors.wrapper);

            this.elements[name] = {
              $element: $element,
              $wrapper: $wrappers.length > 0 ? $wrappers.first() : $element,
              name: name,
              dirty: false,
              value: $element.val(),
              validations: validations,
              isValid: undefined
            };
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
      }

      /* CHANGE */

    }, {
      key: '__change',
      value: function __change(event) {

        this.isDirty = true;

        var elementObj = this.elements[event.currentTarget.name];

        elementObj.dirty = true;

        if (elementObj.isValid !== undefined) {

          elementObj.isValid = undefined;

          this.__indeterminate(elementObj);
        }

        for (var name in this.elements) {

          var relativeElementObj = this.elements[name];

          if (relativeElementObj.validations && relativeElementObj.validations['matchesField'] && relativeElementObj.validations['matchesField'].args.indexOf(elementObj.name) !== -1) {

            this.__indeterminate(relativeElementObj);
          }
        }

        if (document.activeElement !== elementObj.$element[0]) {

          this._validateWorker(elementObj);
        }
      }

      /* FOCUS */

    }, {
      key: '__focus',
      value: function __focus(event) {

        var elementObj = this.elements[event.currentTarget.name];

        elementObj.isValid = undefined;

        this.__indeterminate(elementObj);
      }

      /* BLUR */

    }, {
      key: '__blur',
      value: function __blur(event) {

        var elementObj = this.elements[event.currentTarget.name];

        this._validateWorker(elementObj);
      }

      /* SUBMIT */

    }, {
      key: '__submit',
      value: function __submit(event) {

        if (!this.isValid()) {

          event.preventDefault();
          event.stopImmediatePropagation();
        }
      }

      /* ELEMENT */

    }, {
      key: '_validateWorker',
      value: function _validateWorker(elementObj) {

        if (elementObj.isValid === undefined) {

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

        var errors = {},
            validations = elementObj.validations;

        if (elementObj.dirty) {

          elementObj.value = elementObj.$element.val();

          elementObj.dirty = false;
        }

        if (validations) {

          for (var name in validations) {

            var validation = validations[name],
                result = validation.validator.apply(this.elements, [elementObj.value].concat(validation.args));

            if (result !== true) {

              errors[name] = !_.isString(result) ? 'This value is not valid' : result;
            }
          }
        }

        var isValid = _.size(errors) === 0;

        return isValid ? true : errors;
      }
    }, {
      key: '__indeterminate',
      value: function __indeterminate(elementObj) {

        elementObj.$wrapper.removeClass(this.options.classes.invalid + ' ' + this.options.classes.valid);
      }
    }, {
      key: '__valid',
      value: function __valid(elementObj) {

        elementObj.$wrapper.removeClass(this.options.classes.invalid).addClass(this.options.classes.valid);
      }
    }, {
      key: '__invalid',
      value: function __invalid(elementObj, errors) {

        elementObj.$wrapper.removeClass(this.options.classes.valid).addClass(this.options.classes.invalid);
      }

      /* API */

    }, {
      key: 'isValid',
      value: function isValid() {

        if (this.isDirty) {

          for (var name in this.elements) {

            var elementObj = this.elements[name];

            if (elementObj.isValid === undefined) {

              this._validateWorker(elementObj);
            }
          }

          for (var name in this.elements) {

            var elementObj = this.elements[name];

            if (elementObj.isValid === false) {

              this._isValid = false;
              this.isDirty = false;
              return this._isValid;
            }
          }

          this._isValid = true;
          this.isDirty = false;
        }

        return this._isValid;
      }
    }]);

    return FormValidate;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.FormValidate = FormValidate;
  Svelto.FormValidate.config = config;

  /* FACTORY */

  $.factory(Svelto.FormValidate);
})(Svelto.$, Svelto._, window, document);

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

//TODO: Check if it works, also for upload

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'formAjax',
    options: {
      spinnerOverlay: true,
      callbacks: {
        beforesend: function beforesend() {},
        complete: function complete() {}
      }
    }
  };

  /* FORM AJAX */

  var FormAjax = (function (_Svelto$Widget17) {
    _inherits(FormAjax, _Svelto$Widget17);

    function FormAjax() {
      _classCallCheck(this, FormAjax);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(FormAjax).apply(this, arguments));
    }

    _createClass(FormAjax, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('form.ajax').formAjax();
        $root.filter('form.ajax').formAjax();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$form = this.$element;
        this.form = this.element;
      }
    }, {
      key: '_events',
      value: function _events() {

        /* SUBMIT */

        this._on(true, 'submit', this.__submit);
      }

      /* PRIVATE */

    }, {
      key: '__submit',
      value: function __submit(event) {
        var _this23 = this;

        event.preventDefault();
        event.stopImmediatePropagation();

        if (this.$form.formValidate('isValid')) {

          $.ajax({

            cache: false,
            contentType: false,
            data: new FormData(this.form),
            dataType: 'JSON',
            processData: false,
            type: this.$form.attr('method') || 'POST',
            url: this.$form.attr('action'),

            beforeSend: function beforeSend() {

              if (_this23.options.spinnerOverlay) {

                _this23.$form.spinnerOverlay('show');
              }

              _this23._trigger('beforesend');
            },

            error: function error(res) {

              $.noty('An error occurred, please try again later');
            },
            success: function success(res) {

              if (res.refresh || res.url === window.location.href || res.url === window.location.pathname) {

                $.noty('Done! Refreshing the page...');

                location.reload();
              } else if (res.url) {

                $.noty('Done! Redirecting...');

                location.assign(res.url);
              } else {

                $.noty(res.msg || 'Done! A page refresh may be needed');
              }
            },

            complete: function complete() {

              if (_this23.options.spinnerOverlay) {

                _this23.$form.spinnerOverlay('hide');
              }

              _this23._trigger('complete');
            }

          });
        } else {

          $.noty('The form has some errors, fix them before sending it');
        }
      }
    }]);

    return FormAjax;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.FormAjax = FormAjax;
  Svelto.FormAjax.config = config;

  /* FACTORY */

  $.factory(Svelto.FormAjax);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Form Sync
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

//TODO: Maybe sync at init time also

(function ($, _, window, document, undefined) {
  'use strict'

  /* VARIABLES */

  ;
  var groups = [];

  /* CONFIG */

  var config = {
    name: 'formSync',
    options: {
      attributes: {
        name: 'name'
      },
      datas: {
        group: 'sync-group'
      },
      selectors: {
        form: 'form',
        elements: 'input, textarea, select',
        checkable: '[type="radio"], [type="checkbox"]',
        radio: '[type="radio"]',
        checkbox: '[type="checkbox"]',
        textfield: 'input, textarea'
      }
    }
  };

  /* FORM SYNC */

  var FormSync = (function (_Svelto$Widget18) {
    _inherits(FormSync, _Svelto$Widget18);

    function FormSync() {
      _classCallCheck(this, FormSync);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(FormSync).apply(this, arguments));
    }

    _createClass(FormSync, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('form[data-sync-group]').formSync();
        $root.filter('form[data-sync-group]').formSync();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$form = this.$element;
        this.group = this.$form.data(this.options.datas.group);

        this.isNewGroup = groups.indexOf(this.group) === -1;
      }
    }, {
      key: '_init',
      value: function _init() {

        if (this.isNewGroup) {

          groups.push(this.group);

          this.___syncer();
        }
      }

      /* PRIVATE */

    }, {
      key: '___syncer',
      value: function ___syncer() {
        var _this25 = this;

        var $forms = $(this.options.selectors.form + '[data-' + this.options.datas.group + '="' + this.group + '"]'),
            $elements = $forms.find(this.options.selectors.elements);

        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          var _loop2 = function _loop2() {
            var element = _step8.value;

            var $element = $(element),
                name = $element.attr(_this25.options.attributes.name),
                isCheckable = $element.is(_this25.options.selectors.checkable),
                isRadio = isCheckable && $element.is(_this25.options.selectors.radio),
                isTextfield = $element.is(_this25.options.selectors.textfield),
                events = isTextfield ? 'input change' : 'change',
                $currentForm = $element.parents(_this25.options.selectors.form),
                $otherForms = $forms.not($currentForm),
                $otherElements = $otherForms.find('[' + _this25.options.attributes.name + '="' + name + '"]');

            $element.on(events, function () {

              var currentValue = $element.val(),
                  currentChecked = !!$element.prop('checked');

              var _iteratorNormalCompletion9 = true;
              var _didIteratorError9 = false;
              var _iteratorError9 = undefined;

              try {
                for (var _iterator9 = $otherElements[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                  var otherElement = _step9.value;

                  var $otherElement = $(otherElement),
                      otherValue = $otherElement.val(),
                      otherChecked = !!$otherElement.prop('checked');

                  if (isRadio) {

                    if (currentValue !== otherValue || currentChecked === otherChecked) return;
                  } else if (currentValue === otherValue && currentChecked === otherChecked) {

                    return;
                  }

                  if (isCheckable) {

                    $otherElement.prop('checked', currentChecked).trigger('change');
                  } else {

                    $otherElement.val(currentValue).trigger('change');
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
            });
          };

          for (var _iterator8 = $elements[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            _loop2();
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
      }
    }]);

    return FormSync;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.FormSync = FormSync;
  Svelto.FormSync.config = config;

  /* FACTORY */

  $.factory(Svelto.FormSync);
})(Svelto.$, Svelto._, window, document);

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
//FIXME: Does it handle devices where you can use both a touch event or a mouse event such when using a mouse connected to an android device? (//TODO Test it!)
//FIXME: Flick not working on iPod Touch

//INFO: Proposed draft: http://www.w3.org/TR/pointerevents/

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
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
      flick: {
        duration: 150,
        threshold: 5
      }
    }
  };

  /* EVENTS */

  var events = {
    tap: Pointer.options.events.prefix + 'tap',
    dbltap: Pointer.options.events.prefix + 'dbltap',
    press: Pointer.options.events.prefix + 'press',
    flick: Pointer.options.events.prefix + 'flick',
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

  var _loop3 = function _loop3(name) {

    Pointer[name] = events[name];

    $.fn[name] = function (fn) {

      return fn ? this.on(events[name], fn) : this.trigger(events[name]); //FIXME: Does it work? not sure about that `events[name]` inside the function
    };
  };

  for (var name in events) {
    _loop3(name);
  }

  /* POINTER LOGIC */

  (function () {
    //TODO: Maybe remove this

    /* VARIABLES */

    var $document = $(document),
        target = void 0,
        $target = void 0,
        startEvent = void 0,
        startTimestamp = void 0,
        downTimestamp = void 0,
        prevTapTimestamp = 0,
        motion = void 0,
        moveEvent = void 0,
        pressTimeout = void 0;

    /* EVENT CREATOR */

    var createEvent = function createEvent(name, originalEvent) {

      var event = $.Event(name);

      event.originalEvent = originalEvent;

      return event;
    };

    /* HANDLERS */

    var downHandler = function downHandler(event) {

      target = event.target;
      $target = $(target);

      startEvent = event;
      startTimestamp = event.timeStamp || Date.now();

      motion = false;

      pressTimeout = setTimeout(pressHandler, Pointer.options.press.duration);

      $target.on(Pointer.move, moveHandler);
      $target.one(Pointer.up, upHandler);
      $target.one(Pointer.cancel, cancelHandler);
    };

    var pressHandler = function pressHandler() {

      $target.trigger(createEvent(Pointer.press, startEvent));

      pressTimeout = false;
    };

    var moveHandler = function moveHandler(event) {

      if (!motion) {

        if (pressTimeout) {

          clearTimeout(pressTimeout);
          pressTimeout = false;
        }

        motion = true;

        if (!$.browser.is.touchDevice) {

          $target.off(Pointer.move, moveHandler);
        }
      }

      moveEvent = event;
    };

    var upHandler = function upHandler(event) {

      if (pressTimeout) {

        clearTimeout(pressTimeout);
      }

      downTimestamp = event.timeStamp || Date.now();

      if (motion && downTimestamp - startTimestamp <= Pointer.options.flick.duration) {

        var startXY = $.eventXY(startEvent),
            endXY = $.eventXY($.browser.is.touchDevice ? moveEvent : event),
            deltaXY = {
          X: endXY.X - startXY.X,
          Y: endXY.Y - startXY.Y
        },
            absDeltaXY = {
          X: Math.abs(deltaXY.X),
          Y: Math.abs(deltaXY.Y)
        };

        if (absDeltaXY.X >= Pointer.options.flick.threshold || absDeltaXY.Y >= Pointer.options.flick.threshold) {

          var orientation = void 0,
              direction = void 0;

          if (absDeltaXY.X > absDeltaXY.Y) {

            orientation = 'horizontal', direction = deltaXY.X > 0 ? 1 : -1;
          } else {

            orientation = 'vertical', direction = deltaXY.Y > 0 ? 1 : -1;
          }

          $target.trigger(createEvent(Pointer.flick, event), {
            orientation: orientation,
            direction: direction,
            startXY: startXY,
            endXY: endXY
          });
        }
      }

      if (!$.browser.is.touchDevice || !motion) {

        $target.trigger(createEvent(Pointer.tap, event));

        if (downTimestamp - prevTapTimestamp <= Pointer.options.dbltap.interval) {

          $target.trigger(createEvent(Pointer.dbltap, event));
        }

        prevTapTimestamp = downTimestamp;
      }

      if (!motion || $.browser.is.touchDevice) {

        $target.off(Pointer.move, moveHandler);
      }

      $target.off(Pointer.cancel, cancelHandler);
    };

    var cancelHandler = function cancelHandler() {

      if (pressTimeout) {

        clearTimeout(pressTimeout);
      }

      if (!motion || $.browser.is.touchDevice) {

        $target.off(Pointer.move, moveHandler);
      }

      $target.off(Pointer.up, upHandler);
    };

    /* BIND */

    $document.on(Pointer.down, downHandler);
  })();
})(Svelto.$, Svelto._, window, document);

(function () {
  'use strict';

  var keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;

  var fn = (function () {
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
  })();

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
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * @requires ../ui/ui.js
 * @requires ../pointer/Pointer.js
 * @requires vendor/screenfull.js
 * ========================================================================= */

(function ($, _, window, document, undefined) {
  'use strict'

  /* SCROLL TO TOP */

  ;
  $(function () {

    $('.scroll-to-top').on(Pointer.tap, function () {
      return $body.add($html).animate({ scrollTop: 0 }, UI.animation.normal);
    });
  });

  /* FULLSCREEN */

  //TODO: Move it to its own component, add the ability to trigger the fullscreen for a specific element
  //FIXME: It doesn't work in iOS's Safari and IE10
  //TODO: Add support

  $('.fullscreen-toggler').on(Pointer.tap, function () {

    screenfull.toggle();
  });
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Infobar
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Maybe add the ability to open it

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'infobar',
    options: {
      selectors: {
        closer: '.infobar-closer'
      },
      callbacks: {
        close: function close() {}
      }
    }
  };

  /* INFOBAR */

  var Infobar = (function (_Svelto$Widget19) {
    _inherits(Infobar, _Svelto$Widget19);

    function Infobar() {
      _classCallCheck(this, Infobar);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Infobar).apply(this, arguments));
    }

    _createClass(Infobar, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.infobar').infobar();
        $root.filter('.infobar').infobar();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$infobar = this.$element;
        this.$closers = this.$infobar.find(this.options.selectors.closer);
      }
    }, {
      key: '_events',
      value: function _events() {

        /* CLOSER */

        this._on(this.$closers, Pointer.tap, this.close);
      }

      /* API */

    }, {
      key: 'close',
      value: function close() {

        this.$infobar.remove();

        this._trigger('close');
      }
    }]);

    return Infobar;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Infobar = Infobar;
  Svelto.Infobar.config = config;

  /* FACTORY */

  $.factory(Svelto.Infobar);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Modal
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//INFO: Since we check the `event.target` in order to detect a click on the background it will fail when using a `.container` as a modal, so effectively we are shrinking the supported groups of element to `card` and `card`-like

//TODO: Disable scrolling while the modal is open

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'modal',
    options: {
      attributes: {
        id: 'id'
      },
      datas: {
        element: 'modal'
      },
      classes: {
        open: 'open'
      },
      selectors: {
        trigger: '.modal-trigger',
        closer: '.modal-closer'
      },
      animations: {
        open: UI.animation.normal,
        close: UI.animation.normal
      },
      callbacks: {
        open: function open() {},
        close: function close() {}
      }
    }
  };

  /* MODAL */

  var Modal = (function (_Svelto$Widget20) {
    _inherits(Modal, _Svelto$Widget20);

    function Modal() {
      _classCallCheck(this, Modal);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Modal).apply(this, arguments));
    }

    _createClass(Modal, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.modal').modal();
        $root.filter('.modal').modal();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.modal = this.element;
        this.$modal = this.$element;

        this.id = this.$modal.attr(this.options.attributes.id);

        this.$triggers = $(this.options.selectors.trigger + '[data-' + this.options.datas.element + '="' + this.id + '"]');
        this.$closers = this.$modal.find(this.options.selectors.closer);

        this._isOpen = this.$modal.hasClass(this.options.classes.open);
      }
    }, {
      key: '_events',
      value: function _events() {

        /* TAP */

        this._on(Pointer.tap, this.__tap);

        /* TRIGGER */

        this._on(this.$triggers, Pointer.tap, this.open);
        /* CLOSER */

        this._on(this.$closers, Pointer.tap, this.close);
      }

      /* PRIVATE */

    }, {
      key: '__tap',
      value: function __tap(event) {

        if (event.target === this.modal) {

          this.close();
        }
      }
    }, {
      key: '__keydown',
      value: function __keydown(event) {

        if (event.keyCode === UI.keyCode.ESCAPE) {

          event.preventDefault();
          event.stopImmediatePropagation();

          this.close();
        }
      }

      /* PUBLIC */

    }, {
      key: 'isOpen',
      value: function isOpen() {

        return this._isOpen;
      }
    }, {
      key: 'toggle',
      value: function toggle(force) {

        if (!_.isBoolean(force)) {

          force = !this._isOpen;
        }

        if (force !== this._isOpen) {

          this._isOpen = force;

          this.$modal.toggleClass(this.options.classes.open, this._isOpen);

          this[this._isOpen ? '_on' : '_off']($document, 'keydown', this.__keydown);

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

    return Modal;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Modal = Modal;
  Svelto.Modal.config = config;

  /* FACTORY */

  $.factory(Svelto.Modal);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - N Times Action (Group)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../cookie/cookie.js
 * ========================================================================= */

//TODO: Add support for cookie settable parameters

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    serializer: JSON.stringify,
    unserializer: JSON.parse
  };

  /* GROUP */

  var Group = (function () {
    function Group(name) {
      _classCallCheck(this, Group);

      this.name = name;
      this.actions = config.unserializer($.cookie.get(this.name) || '{}');
    }

    _createClass(Group, [{
      key: 'get',
      value: function get(action) {

        return this.actions[action] || 0;
      }
    }, {
      key: 'set',
      value: function set(action, times) {

        times = Number(times);

        if (!_.isNaN(times)) {

          if (times === 0) {

            this.reset(action);
          } else {

            this.actions[action] = times;

            this.update();
          }
        }
      }
    }, {
      key: 'update',
      value: function update() {

        $.cookie.set(this.name, config.serializer(this.actions), Infinity);
      }
    }, {
      key: 'reset',
      value: function reset(action) {

        if (action) {

          delete this.actions[action];

          this.update();
        } else {

          this.actions = {};

          $.cookie.remove(this.name);
        }
      }
    }]);

    return Group;
  })();

  /* BINDING */

  Svelto.NTA = {};
  Svelto.NTA.Group = Group;
  Svelto.NTA.Group.config = config;
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - N Times Action (Action)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires NTA.Group.js
 * ========================================================================= */

(function ($, _, window, document, undefined) {
  'use strict'

  /* ACTION */

  ;

  var Action = (function () {
    function Action(options) {
      _classCallCheck(this, Action);

      this.group = new Svelto.NTA.Group(options.group);
      this.name = options.name;
    }

    _createClass(Action, [{
      key: 'get',
      value: function get() {

        return this.group.get(this.name);
      }
    }, {
      key: 'set',
      value: function set(times) {

        this.group.set(this.name, times);
      }
    }, {
      key: 'reset',
      value: function reset() {

        this.group.reset(this.name);
      }
    }]);

    return Action;
  })();

  /* BINDING */

  Svelto.NTA.Action = Action;
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - N Times Action
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires NTA.Action.js
 * ========================================================================= */

//TODO: Add an action expiry parameter, so that we can run an action N times during a range of period, like once a week, once a month and so on

(function ($, _, window, document, undefined) {
  'use strict'

  /* N TIMES ACTION */

  ;
  $.nTimesAction = function (options) {

    /* OPTIONS */

    options = _.merge({
      group: 'nta', //INFO: The cookie name that holds the actions, a namespace for related actions basically
      action: false, //INFO: The action name
      times: Infinity, //INFO: The times an action can be executed
      fn: false //INFO: The function to execute
    }, options);

    /* NORMALIZING TIMES */

    options.times = Number(options.times);

    if (_.isNaN(options.times)) {

      options.times = 0;
    }

    /* N TIMES ACTION */

    if (options.action) {

      var action = new Svelto.NTA.Action({ group: options.group, name: options.action }),
          actionTimes = action.get();

      if (options.fn && actionTimes < options.times) {

        var value = options.fn(options.group, options.action, actionTimes + 1);

        if (value !== false) {

          action.set(actionTimes + 1);
        }
      }

      return action;
    } else if (options.group) {

      return new Svelto.NTA.Group(options.group);
    }
  };
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Navbar
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Replace flickable support with a smooth moving navbar, so operate on drag
//TODO: Disable scrolling while the navbar is open
//TODO: Close with a flick

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'navbar',
    options: {
      flickableRange: 20, //INFO: Amount of pixels close to the viewport border where the flick should be considered intentional //FIXME: Should be consistend within different DPIs
      attributes: {
        id: 'id'
      },
      datas: {
        direction: 'direction',
        element: 'navbar'
      },
      classes: {
        open: 'open',
        flickable: 'flickable'
      },
      selectors: {
        closer: '.navbar-closer',
        trigger: '.navbar-trigger'
      },
      callbacks: {
        open: function open() {},
        close: function close() {}
      }
    }
  };

  /* NAVBAR */

  var Navbar = (function (_Svelto$Widget21) {
    _inherits(Navbar, _Svelto$Widget21);

    function Navbar() {
      _classCallCheck(this, Navbar);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Navbar).apply(this, arguments));
    }

    _createClass(Navbar, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.navbar').navbar();
        $root.filter('.navbar').navbar();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$navbar = this.$element;
        this.navbar = this.element;

        this.id = this.$navbar.attr(this.options.attributes.id);

        this.$closers = this.$navbar.find(this.options.selectors.closer);
        this.$triggers = $(this.options.selectors.trigger + '[data-' + this.options.datas.element + '="' + this.id + '"]');

        this.direction = this.$navbar.data(this.options.datas.direction);
        this._isOpen = this.$navbar.hasClass(this.options.classes.open);
        this.isFlickable = this.$navbar.hasClass(this.options.classes.flickable);
      }
    }, {
      key: '_events',
      value: function _events() {

        /* TAP */

        this._on(Pointer.tap, this.__tap);

        /* TRIGGER */

        this._on(this.$triggers, Pointer.tap, this.open);

        /* CLOSER */

        this._on(this.$closers, Pointer.tap, this.close);

        /* KEYDOWN */

        this._onHover([$document, 'keydown', this.__keydown]);

        /* FLICK */

        if (this.isFlickable) {

          this._on($document, Pointer.flick, this.__flick);
        }
      }

      /* TAP */

    }, {
      key: '__tap',
      value: function __tap(event) {

        if (event.target === this.navbar) {

          this.close();
        }
      }

      /* KEYDOWN */

    }, {
      key: '__keydown',
      value: function __keydown(event) {

        switch (event.keyCode) {

          case UI.keyCode.ESCAPE:
            this.close();
            break;

          default:
            return;

        }

        event.preventDefault();
        event.stopImmediatePropagation();
      }

      /* FLICK */

    }, {
      key: '__flick',
      value: function __flick(event, data) {

        if (this._isOpen) return;

        switch (this.direction) {

          case 'left':
          case 'right':
            if (data.orientation === 'horizontal') {
              if (this.direction === 'left') {
                if (data.direction === 1) {
                  if (data.startXY.X <= this.options.flickableRange) {
                    this.open();
                  }
                }
              } else if (this.direction === 'right') {
                if (data.direction === -1) {
                  if ($window.width() - data.startXY.X <= this.options.flickableRange) {
                    this.open();
                  }
                }
              }
            }
            break;

          case 'top':
          case 'bottom':
            if (data.orientation === 'vertical') {
              if (this.direction === 'top') {
                if (data.direction === -1) {
                  if (data.startXY.Y <= this.options.flickableRange) {
                    this.open();
                  }
                }
              } else if (this.direction === 'bottom') {
                if (data.direction === 1) {
                  if ($window.height() - data.startXY.Y <= this.options.flickableRange) {
                    this.open();
                  }
                }
              }
            }
            break;

        }
      }

      /* PUBLIC */

    }, {
      key: 'isOpen',
      value: function isOpen() {

        return this._isOpen;
      }
    }, {
      key: 'toggle',
      value: function toggle(force) {

        if (_.isUndefined(force)) {

          force = !this._isOpen;
        }

        if (force !== this._isOpen) {

          this._isOpen = force;

          this.$navbar.toggleClass(this.options.classes.open, this._isOpen);

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

    return Navbar;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Navbar = Navbar;
  Svelto.Navbar.config = config;

  /* FACTORY */

  $.factory(Svelto.Navbar);
})(Svelto.$, Svelto._, window, document);

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

(function ($, _, window, document, undefined) {
  'use strict'

  /* NOTIFICATION */

  ;
  $.notification = function (options) {

    /* OPTIONS */

    options = _.merge({
      title: false,
      body: false,
      img: false
    }, options);

    /* NOTIFICATIONS */

    if (!document.hasFocus() && window.Notification && Notification.permission !== 'denied') {

      Notification.requestPermission(function (status) {

        if (status === 'granted') {

          var notification = new Notification(options.title, { body: options.body, icon: options.img });
        } else {

          $.noty(options);
        }
      });
    } else {

      $.noty(options);
    }
  };
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - One Time Action
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../n_times_action/n_times_action.js
 * ========================================================================= */

(function ($, _, window, document, undefined) {
  'use strict'

  /* ONE TIME ACTION */

  ;
  $.oneTimeAction = function (options) {

    return $.nTimesAction(_.merge({ group: 'ota' }, options, { times: 1 }));
  };
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Overlay
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'overlay',
    templates: {
      base: false
    },
    options: {
      hover: {
        triggerable: false,
        delays: {
          open: 750,
          close: 250
        }
      },
      classes: {
        open: 'open'
      },
      selectors: {
        trigger: '.overlay-trigger',
        closer: '.overlay-closer'
      },
      callbacks: {
        open: function open() {},
        close: function close() {}
      }
    }
  };

  /* OVERLAY */

  var Overlay = (function (_Svelto$Widget22) {
    _inherits(Overlay, _Svelto$Widget22);

    function Overlay() {
      _classCallCheck(this, Overlay);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Overlay).apply(this, arguments));
    }

    _createClass(Overlay, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.overlay').overlay();
        $root.filter('.overlay').overlay();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$overlay = this.$element;
        this.$overlayed = this.$overlay.parent();

        this.$triggers = this.$overlayed.find(this.options.selectors.trigger);
        this.$closers = this.$overlayed.find(this.options.selectors.closer);

        this._isOpen = this.$overlay.hasClass(this.options.classes.open);
      }
    }, {
      key: '_events',
      value: function _events() {

        /* TRIGGER */

        this._on(this.$triggers, Pointer.tap, this.open);

        /* CLOSER */

        this._on(this.$closers, Pointer.tap, this.close);

        /* HOVER */

        if (this.options.hover.triggerable) {

          this._on(this.$overlayed, Pointer.enter, this.__hoverEnter);
        }
      }

      /* HOVER */

    }, {
      key: '__hoverEnter',
      value: function __hoverEnter() {

        if (!this._isOpen) {

          this._isHoverOpen = false;

          this._hoverOpenTimeout = this._delay(this.__hoverOpen, this.options.hover.delays.open);

          this._one(this.$overlayed, Pointer.leave, this.__hoverLeave);
        }
      }
    }, {
      key: '__hoverOpen',
      value: function __hoverOpen() {

        if (!this._isOpen) {

          this.open();

          this._isHoverOpen = true;

          this._hoverOpenTimeout = false;
        }
      }
    }, {
      key: '__hoverLeave',
      value: function __hoverLeave() {

        if (this._hoverOpenTimeout) {

          clearTimeout(this._hoverOpenTimeout);

          this._hoverOpenTimeout = false;
        }

        if (this._isHoverOpen) {

          this._hoverCloseTimeout = this._delay(this.__hoverClose, this.options.hover.delays.close);
        }
      }
    }, {
      key: '__hoverClose',
      value: function __hoverClose() {

        if (this._isHoverOpen) {

          this.close();

          this._isHoverOpen = false;

          this._hoverCloseTimeout = false;
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
      value: function toggle(force) {
        var _this30 = this;

        if (!_.isBoolean(force)) {

          force = !this._isOpen;
        }

        if (force !== this._isOpen) {

          this._isOpen = force;

          this._frame(function () {

            _this30.$overlay.toggleClass(_this30.options.classes.open, _this30._isOpen);

            _this30._trigger(_this30._isOpen ? 'open' : 'close');
          });
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

    return Overlay;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Overlay = Overlay;
  Svelto.Overlay.config = config;

  /* FACTORY */

  $.factory(Svelto.Overlay);
})(Svelto.$, Svelto._, window, document);

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

var Prism = (function () {

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
* Copyright (c) 2015 Fabio Spampinato
* Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
* =========================================================================
* @requires ../widget/factory.js
* ========================================================================= */

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'progressbar',
    templates: {
      base: '<div class="progressbar {%=(o.striped ? "striped" : "")%} {%=(o.labeled ? "labeled" : "")%} {%=o.colors.off%} {%=o.size%} {%=o.css%}">' + '<div class="progressbar-highlight {%=o.colors.on%}"></div>' + '</div>'
    },
    options: {
      value: 0, // Percentage
      colors: { // Colors to use for the progressbar
        on: '', // Color of `.progressbar-highlight`
        off: '' // Color of `.progressbar`
      },
      striped: false, // Draw striped over it
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
        change: function change() {},
        empty: function empty() {},
        full: function full() {}
      }
    }
  };

  /* HELPER */

  $.progressbar = function (options) {

    options = _.isNumber(options) ? { value: options } : options;

    return new Svelto.Progressbar(options);
  };

  /* PROGRESSBAR */

  var Progressbar = (function (_Svelto$Widget23) {
    _inherits(Progressbar, _Svelto$Widget23);

    function Progressbar() {
      _classCallCheck(this, Progressbar);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Progressbar).apply(this, arguments));
    }

    _createClass(Progressbar, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.progressbar').each(function () {

          var $progressbar = $(this);

          $progressbar.progressbar({
            value: $progressbar.data('value'),
            decimals: $progressbar.data('decimals ')
          });
        });

        //TODO: Add support for $root.filter
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$progressbar = this.$element;
        this.$highlight = this.$progressbar.find(this.options.selectors.highlight);
      }
    }, {
      key: '_init',
      value: function _init() {

        this.options.value = this._sanitizeValue(this.options.value);

        this._updateWidth();
        this._updateLabel();
      }

      /* PRIVATE */

    }, {
      key: '_sanitizeValue',
      value: function _sanitizeValue(value) {

        var nr = Number(value);

        return _.clamp(0, _.isNaN(nr) ? 0 : nr, 100);
      }
    }, {
      key: '_roundValue',
      value: function _roundValue(value) {

        return value.toFixed(this.options.decimals);
      }
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

      /* PUBLIC */

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

            var data = {
              previous: this.options.value,
              value: value
            };

            this.options.value = value;

            this._update();

            this._trigger('change', data);

            if (this.options.value === 0) {

              this._trigger('empty', data);
            } else if (this.options.value === 100) {

              this._trigger('full', data);
            }
          }
        }
      }
    }]);

    return Progressbar;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Progressbar = Progressbar;
  Svelto.Progressbar.config = config;

  /* FACTORY */

  $.factory(Svelto.Progressbar);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Radio
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'radio',
    options: {
      attributes: {
        name: 'name'
      },
      classes: {
        checked: 'checked'
      },
      selectors: {
        input: 'input',
        form: 'form'
      },
      callbacks: {
        change: function change() {},
        check: function check() {},
        uncheck: function uncheck() {}
      }
    }
  };

  /* RADIO */

  var Radio = (function (_Svelto$Widget24) {
    _inherits(Radio, _Svelto$Widget24);

    function Radio() {
      _classCallCheck(this, Radio);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Radio).apply(this, arguments));
    }

    _createClass(Radio, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.radio').radio();
        $root.filter('.radio').radio();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$radio = this.$element;
        this.$input = this.$radio.find(this.options.selectors.input);

        this.name = this.$input.attr(this.options.attributes.name);

        this.isMultiple = this.name.endsWith(']');

        this.$container = this.$radio.parents(this.options.selectors.form).first();

        if (this.$container.length === 0) {

          this.$container = $document;
        }

        this.$otherRadios = this.$container.find(this.name ? 'input[type="radio"][name="' + this.name + '"]' : 'input[type="radio"]').parent('.radio').not(this.$radio);
      }
    }, {
      key: '_init',
      value: function _init() {
        //FIXME: is it necessary to include it? Maybe we should fix mistakes with the markup...

        var isChecked = this.get(),
            hasClass = this.$radio.hasClass(this.options.classes.checked);

        if (isChecked !== hasClass) {

          this.$radio.toggleClass(this.options.classes.checked, isChecked);
        }
      }
    }, {
      key: '_events',
      value: function _events() {

        /* CHANGE */

        this._on(true, this.$input, 'change', this.__change);

        /* TAP */

        this._on(Pointer.tap, this.check);
      }

      /* CHANGE */

    }, {
      key: '__change',
      value: function __change() {

        var isChecked = this.get();

        if (isChecked) {

          this.$otherRadios.removeClass(this.options.classes.checked);
        }

        this.$radio.toggleClass(this.options.classes.checked, isChecked);

        this._trigger('change', { checked: isChecked });
        this._trigger(isChecked ? 'check' : 'uncheck');
      }

      /* PUBLIC */

    }, {
      key: 'get',
      value: function get() {

        return this.$input.prop('checked');
      }
    }, {
      key: 'check',
      value: function check() {

        var isChecked = this.get();

        if (!isChecked) {

          this.$input.prop('checked', true).trigger('change');

          this._trigger('change', { checked: true });
          this._trigger('check');
        }
      }
    }]);

    return Radio;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Radio = Radio;
  Svelto.Radio.config = config;

  /* FACTORY */

  $.factory(Svelto.Radio);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Rater
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * @requires ../noty/noty.js
 * ========================================================================= */

//TODO: Support the use of the rater as an input, basically don't perform any ajax operation but instead update an input field

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'rater',
    templates: {
      base: '<div class="rater">' + '{% include ( "rater.stars", o ); %}' + '</div>',
      stars: '{% for ( var i = 1; i <= o.amount; i++ ) { %}' + '<div class="rater-star {%=( o.value >= i ? "active" : ( o.value >= i - 0.5 ? "half-active" : "" ) )%}"></div>' + '{% } %}'
    },
    options: {
      value: 0,
      amount: 5,
      url: false,
      selectors: {
        star: '.rater-star'
      },
      callbacks: {
        change: function change() {}
      }
    }
  };

  /* SELECT */

  var Rater = (function (_Svelto$Widget25) {
    _inherits(Rater, _Svelto$Widget25);

    function Rater() {
      _classCallCheck(this, Rater);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Rater).apply(this, arguments));
    }

    _createClass(Rater, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.rater').each(function () {

          var $rater = $(this);

          $rater.rater({
            value: Number($rater.data('value') || 0),
            amount: Number($rater.data('amount') || 5),
            url: Number($rater.data('url') || false)
          });
        });

        //TODO: Add support for rater
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$rater = this.$element;

        this.alreadyRated = false;
        this.doingAjax = false;
      }
    }, {
      key: '_events',
      value: function _events() {

        /* TAP */

        this._on(Pointer.tap, this.options.selectors.star, this.__tap);
      }

      /* TAP */

    }, {
      key: '__tap',
      value: function __tap(event) {
        var _this34 = this;

        if (!this.alreadyRated && !this.doingAjax && this.options.url) {

          var rating = this.$stars.index(event.currentTarget) + 1;

          $.ajax({

            data: { rating: rating },
            type: 'POST',
            url: this.options.url,

            beforeSend: function beforeSend() {

              self.doingAjax = true;
            },

            success: function success(res) {

              //FIXME: Handle the case where the server requests succeeded but the user already rated or for whatever reason this rating is not processed

              res = JSON.parse(res);

              _.merge(_this34.options, res);

              _this34.$rater.html(_this34._tmpl('stars', _this34.options));

              _this34.alreadyRated = true;

              _this34._trigger('change', {
                value: _this34.options.value,
                amount: _this34.options.amount
              });s;
            },

            error: function error(res) {

              $.noty('An error occurred, please try again later');
            },
            complete: function complete() {

              self.doingAjax = false;
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
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Rater = Rater;
  Svelto.Rater.config = config;

  /* FACTORY */

  $.factory(Svelto.Rater);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Remote Modal
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../modal/modal.js
 * @requires ../noty/noty.js
 * ========================================================================= */

(function ($, _, window, document, undefined) {
  'use strict'

  /* REMOTE MODAL */

  //TODO: Abort the request if the tempModal is closed before we get a result
  //TODO: Animate the dimensions of the temp modal transitioning to the new modal
  //TODO: Make it work with JSON responses instead of plain html

  ;
  $.remoteModal = function (url, data) {

    /* DATA */

    if (!data) {

      if (_.isPlainObject(url)) {

        data = url;
      } else {

        data = { url: url };
      }
    } else {

      data.url = url;
    }

    /* TEMPORARY MODAL */

    /*
      <div class="modal remote-modal-placeholder card">
        <div class="card-block">
          <svg class="spinner">
            <circle cx="1.625em" cy="1.625em" r="1.25em" />
          </svg>
        </div>
      </div>
    */

    var $tempModal = $('<div class="modal remote-modal-placeholder card"><div class="card-block"><svg class="spinner"><circle cx="1.625em" cy="1.625em" r="1.25em" /></svg></div></div>').appendTo($body).modal();

    /* AJAX */

    $.ajax({

      cache: false,
      data: data,
      processData: false,
      type: 'GET',
      url: data.url,

      beforeSend: function beforeSend() {
        //FIXME: Check it, expecially the `this` context

        $tempModal.modal('open');
      },
      error: function error(res) {

        $tempModal.modal('close');

        setTimeout(function () {

          $tempModal.remove();
        }, Svelto.Modal.config.options.animations.close);

        $.noty('An error occurred, please try again later');
      },
      success: function success(res) {

        res = JSON.parse(res);

        var $remoteModal = $(res.modal);

        $remoteModal.modal({
          callbacks: {
            close: function close() {
              setTimeout(function () {
                $tempModal.remove();
              }, Svelto.Modal.config.options.animations.close);
            }
          }
        });

        $remoteModal.modal('open');

        $tempModal.replaceWidth($remoteModal);
      }
    });
  };
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Ripple
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'ripple',
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
        show: function show() {},
        hide: function hide() {}
      }
    }
  };

  /* RIPPLE */

  var Ripple = (function (_Svelto$Widget26) {
    _inherits(Ripple, _Svelto$Widget26);

    function Ripple() {
      _classCallCheck(this, Ripple);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Ripple).apply(this, arguments));
    }

    _createClass(Ripple, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.ripple').ripple();
        $root.filter('.ripple').ripple();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$ripple = this.$element;

        this.circles = [];
      }
    }, {
      key: '_events',
      value: function _events() {

        /* DOWN */

        this._on(Pointer.down, this.__down);

        /* UP / CANCEL */

        this._on(Pointer.up + ' ' + Pointer.cancel, this.__upCancel);
      }

      /* DOWN */

    }, {
      key: '__down',
      value: function __down(event) {

        if (event.button && event.button !== UI.mouseButton.LEFT) return;

        this._show(event);
      }

      /* UP CANCEL */

    }, {
      key: '__upCancel',
      value: function __upCancel(event) {
        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {

          for (var _iterator10 = this.circles[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var _step10$value = _slicedToArray(_step10.value, 2);

            var $circle = _step10$value[0];
            var before = _step10$value[1];

            this._hide($circle, before);
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

        this.circles = [];
      }

      /* SHOW */

    }, {
      key: '_show',
      value: function _show(event) {

        var $circle = $(this._tmpl('circle')).prependTo(this.$ripple),
            offset = this.$ripple.offset(),
            eventXY = $.eventXY(event),
            now = _.now();

        $circle.css({
          top: eventXY.Y - offset.top,
          left: eventXY.X - offset.left
        }).addClass(this.options.classes.circle.show);

        this.circles.push([$circle, now]);

        this._trigger('show');
      }

      /* HIDE */

    }, {
      key: '_hide',
      value: function _hide($circle, before) {

        var delay = Math.max(0, this.options.animations.show + before - _.now());

        this._delay(function () {

          $circle.addClass(this.options.classes.circle.hide);

          this._delay(function () {

            $circle.remove();

            this._trigger('hide');
          }, this.options.animations.hide);
        }, delay);
      }
    }]);

    return Ripple;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Ripple = Ripple;
  Svelto.Ripple.config = config;

  /* FACTORY */

  $.factory(Svelto.Ripple);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Select
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Add support for selecting multiple options (with checkboxes maybe)
//FIXME: Doesn't work when the page is scrolled (check in the components/form)
//FIXME: It shouldn't select the first one if none of them is selected

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'select',
    templates: {
      base: '<div id="{%=o.id%}" class="dropdown select-dropdown attached card outlined">' + '<div class="card-block">' + '{% for ( var i = 0, l = o.options.length; i < l; i++ ) { %}' + '{% include ( "select." + ( o.options[i].value ? "option" : "optgroup" ), o.options[i] ); %}' + '{% } %}' + '</div>' + '</div>',
      optgroup: '<div class="divider">' + '{%=o.prop%}' + '</div>',
      option: '<div class="button" data-value="{%=o.prop%}">' + '{%=o.value%}' + '</div>'
    },
    options: {
      datas: {
        element: 'select'
      },
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
        open: function open() {},
        close: function close() {},
        change: function change() {}
      }
    }
  };

  /* SELECT */

  var Select = (function (_Svelto$Widget27) {
    _inherits(Select, _Svelto$Widget27);

    function Select() {
      _classCallCheck(this, Select);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Select).apply(this, arguments));
    }

    _createClass(Select, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.select-trigger').select();
        $root.filter('.select-trigger').select();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$trigger = this.$element;
        this.$select = this.$trigger.find(this.options.selectors.select);
        this.$options = this.$select.find(this.options.selectors.option);
        this.$label = this.$trigger.find(this.options.selectors.label);
        this.$valueholder = this.$trigger.find(this.options.selectors.valueholder);

        this.id = this.$trigger.data(this.options.datas.element);

        if (this.$valueholder.length === 0) {

          this.$valueholder = this.$label;
        }

        this.selectOptions = [];

        this.$dropdown = false;
        this.$buttons = false;
      }
    }, {
      key: '_init',
      value: function _init() {

        this._updateValueholder();

        if (!$.browser.is.touchDevice) {

          this.$select.addClass('hidden');

          this.___selectOptions();
          this.___dropdown();
        }
      }
    }, {
      key: '_events',
      value: function _events() {

        /* CHANGE */

        this._on(this.$select, 'change', this.__change);

        if (!$.browser.is.touchDevice) {

          /* BUTTON TAP */

          this._on(this.$buttons, Pointer.tap, this.__tap);
        }
      }

      /* CHANGE */

    }, {
      key: '__change',
      value: function __change() {

        this._update();

        this._trigger('change');
      }

      /* BUTTON TAP */

    }, {
      key: '__tap',
      value: function __tap(event) {

        this.$select.val($(event.currentTarget).data('value')).trigger('change');
      }

      /* PRIVATE */

    }, {
      key: '___selectOptions',
      value: function ___selectOptions() {
        //FIXME: Add support for arbitrary number of optgroups levels

        var previousOptgroup = void 0,
            currentOptgroup = void 0;

        var _iteratorNormalCompletion11 = true;
        var _didIteratorError11 = false;
        var _iteratorError11 = undefined;

        try {
          for (var _iterator11 = this.$options[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
            var option = _step11.value;

            var $option = $(option),
                $parent = $option.parent();

            if ($parent.is('optgroup')) {

              currentOptgroup = $parent.attr('label');

              if (currentOptgroup !== previousOptgroup) {

                previousOptgroup = currentOptgroup;

                this.selectOptions.push({
                  prop: currentOptgroup
                });
              }
            }

            this.selectOptions.push({
              value: $option.html(),
              prop: $option.attr('value')
            });
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
      }
    }, {
      key: '___dropdown',
      value: function ___dropdown() {

        var html = this._tmpl('base', { id: this.id, options: this.selectOptions });

        this.$dropdown = $(html).appendTo($body);
        this.$buttons = this.$dropdown.find(this.options.selectors.button);

        this.$trigger.addClass('dropdown-trigger').attr('data-dropdown', this.id);

        var self = this;

        this.$dropdown.dropdown({
          selectors: {
            closer: '.button'
          },
          callbacks: {
            beforeopen: function beforeopen() {
              self._setDropdownWidth();
            },
            open: function open() {
              self._trigger('open');
            },
            close: function close() {
              self._trigger('close');
            }
          }
        });

        this._updateDropdown();
      }
    }, {
      key: '_setDropdownWidth',
      value: function _setDropdownWidth() {

        this.$dropdown.css('min-width', this.$trigger.outerWidth());
      }

      /* UPDATE */

    }, {
      key: '_updateValueholder',
      value: function _updateValueholder() {

        var $value = this.$select.val();

        if ($value.length > 0) {

          var $selectedOption = this.$options.filter('[value="' + $value + '"]');

          this.$valueholder.html($selectedOption.html());
        }
      }
    }, {
      key: '_updateDropdown',
      value: function _updateDropdown() {

        this.$buttons.removeClass(this.options.classes.selected);

        this.$buttons.filter('[data-value="' + this.$select.val() + '"]').addClass(this.options.classes.selected);
      }
    }, {
      key: '_update',
      value: function _update() {

        this._updateValueholder();

        if (!$.browser.is.touchDevice) {

          this._updateDropdown();
        }
      }

      /* PUBLIC */

    }, {
      key: 'get',
      value: function get() {

        return this.$select.val();
      }
    }, {
      key: 'select',
      value: function select(value) {

        this.$buttons.filter('[data-value="' + value + '"]').tap();
      }
    }]);

    return Select;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Select = Select;
  Svelto.Select.config = config;

  /* FACTORY */

  $.factory(Svelto.Select);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Selectable
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Add dropdown for actions AND/OR right click for action
//FIXME: Add support tableHelper and sortable
//TODO: Make it work with checkboxes (basically use checkboxes instead of the entire row)

//FIXME: It doens't work without the cmd/ctrl key on desktop
//FIXME: It doesn't really work good on mobile

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'selectable',
    templates: {
      base: false
    },
    options: {
      classes: {
        selected: 'selected'
      },
      selectors: {
        element: 'tbody tr:not(.empty)'
      },
      callbacks: {
        change: _.noop
      }
    }
  };

  /* SELECTABLE */

  var Selectable = (function (_Svelto$Widget28) {
    _inherits(Selectable, _Svelto$Widget28);

    function Selectable() {
      _classCallCheck(this, Selectable);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Selectable).apply(this, arguments));
    }

    _createClass(Selectable, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('table.selectable').selectable();
        $root.filter('table.selectable').selectable();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$selectable = this.$element;
        this.$elements = this._getElements();

        this.$startElement = false;
        this.$endElement = false;
      }
    }, {
      key: '_events',
      value: function _events() {

        /* KEYDOWN */

        this._onHover([$document, 'keydown', this.__keydown]);

        /* POINTER */

        this._on(Pointer.down, this.options.selectors.element, this.__down);

        /* OTHERS */

        this._on('change sort', this.__change);
      }

      /* CTRL + A / CTRL + SHIFT + A / CTRL + I */

    }, {
      key: '__keydown',
      value: function __keydown(event) {

        if ($.hasCtrlOrCmd(event)) {

          if (event.keyCode === 65) {
            //INFO: A

            event.preventDefault();
            event.stopImmediatePropagation();

            this._resetPrev();

            this.$elements.toggleClass(this.options.classes.selected, !event.shiftKey); //INFO: SHIFT or not //FIXME: It only works if the last character pushed is the `A`, but is it an unwanted behaviour?

            this._trigger('change');
          } else if (event.keyCode === 73) {
            //INFO: I

            event.preventDefault();
            event.stopImmediatePropagation();

            this._resetPrev();

            this.$elements.toggleClass(this.options.classes.selected);

            this._trigger('change');
          }
        }
      }

      /* CLICK / CTRL + CLICK / SHIFT + CLICK / CLICK -> DRAG */

    }, {
      key: '__down',
      value: function __down(event) {

        if (event.button && event.button !== UI.mouseButton.LEFT) return; //INFO: Only the left click is allowed

        event.preventDefault();

        this.$startElement = $(event.currentTarget);

        if (!$.browser.is.touchDevice) {

          this._on($document, Pointer.move, this.__move);
        }

        this._on(Pointer.up, this.options.selectors.element, this.__up);
      }
    }, {
      key: '__move',
      value: function __move(event) {

        event.preventDefault();

        this._off($document, Pointer.move, this.__move);

        this._off(Pointer.up, this.__up);

        this._resetPrev();

        this.$prevElement = this.$startElement;

        this.$startElement.toggleClass(this.options.classes.selected);

        this._on(Pointer.enter, this.options.selectors.element, this.__dragEnter);

        this._on($document, Pointer.up, this.__dragMouseup);

        this._trigger('change');
      }
    }, {
      key: '__dragEnter',
      value: function __dragEnter(event) {

        //TODO: Remove previous

        this.$endElement = $(event.currentTarget);

        var startIndex = this.$elements.index(this.$startElement),
            endIndex = this.$elements.index(this.$endElement),
            minIndex = Math.min(startIndex, endIndex),
            maxIndex = Math.max(startIndex, endIndex);

        if (minIndex === startIndex) {
          //INFO: Direction: down

          minIndex += 1;
          maxIndex += 1;
        }

        var $newDragged = this.$elements.slice(minIndex, maxIndex);

        if (this.$prevDragged) {

          $newDragged.not(this.$prevDragged).toggleClass(this.options.classes.selected);

          this.$prevDragged.not($newDragged).toggleClass(this.options.classes.selected);
        } else {

          $newDragged.toggleClass(this.options.classes.selected);
        }

        this.$prevDragged = $newDragged;

        this._trigger('change');
      }
    }, {
      key: '__dragMouseup',
      value: function __dragMouseup() {

        this._off(Pointer.enter, this.__dragEnter);

        this._off($document, Pointer.up, this.__dragMouseup);

        this.$prevDragged = false;
      }
    }, {
      key: '__up',
      value: function __up(event) {

        this._off($document, Pointer.move, this.__move);

        this._off(Pointer.up, this.__up);

        if (event.shiftKey) {

          var startIndex = this.$elements.index(this.$prevElement),
              endIndex = this.$prevElement ? this.$elements.index(this.$startElement) : 0,
              minIndex = Math.min(startIndex, endIndex),
              maxIndex = Math.max(startIndex, endIndex);

          if (minIndex === startIndex) {
            //INFO: Direction: down

            minIndex += 1;
            maxIndex += 1;
          }

          var $newShifted = this.$elements.slice(minIndex, maxIndex);

          if (this.$prevShifted) {

            $newShifted.not(this.$prevShifted).toggleClass(this.options.classes.selected);

            this.$prevShifted.not($newShifted).toggleClass(this.options.classes.selected);
          } else {

            $newShifted.toggleClass(this.options.classes.selected);
          }

          this.$prevShifted = $newShifted;
        } else if ($.hasCtrlOrCmd(event) || $.browser.is.touchDevice) {
          //TODO: On mobile we behave like if the `ctrl` key is always pressed, so that we can support selecting multiple rows even there //FIXME: Is this the wanted behavious?

          this.$startElement.toggleClass(this.options.classes.selected);

          this._resetPrev();

          this.$prevElement = this.$startElement;
        } else {

          this.$elements.removeClass(this.options.classes.selected);

          this._resetPrev();
        }

        this._trigger('change');
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
      key: '_resetPrev',
      value: function _resetPrev() {

        this.$prevElement = false;
        this.$prevShifted = false;
        this.$prevDragged = false;
      }
    }, {
      key: '_getElements',
      value: function _getElements() {

        return this.$element.find(this.options.selectors.element);
      }

      /* API */

    }, {
      key: 'get',
      value: function get() {

        return this.$elements.filter('.' + this.options.selectors.selected);
      }
    }]);

    return Selectable;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Selectable = Selectable;
  Svelto.Selectable.config = config;

  /* FACTORY */

  $.factory(Svelto.Selectable);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Slider
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * @requires ../draggable/draggable.js
 * @requires ../transform/transform.js
 * ========================================================================= */

//TODO: Add vertical slider
//TODO: Make it work without the window resize bind, before we where transforming the transform to a left

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'slider',
    options: {
      min: 0,
      max: 100,
      value: 0,
      step: 1,
      decimals: 0,
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
        change: function change() {}
      }
    }
  };

  /* SLIDER */

  var Slider = (function (_Svelto$Widget29) {
    _inherits(Slider, _Svelto$Widget29);

    function Slider() {
      _classCallCheck(this, Slider);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Slider).apply(this, arguments));
    }

    _createClass(Slider, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.slider').each(function () {

          var $slider = $(this);

          $slider.slider({
            min: Number($slider.find('.slider-min').data('min') || 0),
            max: Number($slider.find('.slider-max').data('max') || 100),
            value: Number($slider.find('input').val() || 0),
            step: Number($slider.data('step') || 1),
            decimals: Number($slider.data('decimals') || 0)
          });
        });

        //TODO: Add support for widgetize
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$slider = this.$element;
        this.$input = this.$slider.find(this.options.selectors.input);
        this.$min = this.$slider.find(this.options.selectors.min);
        this.$max = this.$slider.find(this.options.selectors.max);
        this.$bar = this.$slider.find(this.options.selectors.bar);
        this.$unhighlight = this.$slider.find(this.options.selectors.unhighlight);
        this.$highlight = this.$slider.find(this.options.selectors.highlight);
        this.$handlerWrp = this.$slider.find(this.options.selectors.handlerWrp);
        this.$label = this.$handlerWrp.find(this.options.selectors.label);

        this.stepsNr = (this.options.max - this.options.min) / this.options.step;

        this._updateVariables();
      }
    }, {
      key: '_init',
      value: function _init() {

        this._updatePositions();
      }
    }, {
      key: '_events',
      value: function _events() {

        /* INPUT CHANGE */

        this._on(true, this.$input, 'change', this.__change);

        /* WINDOW RESIZE */

        this._on(true, $window, 'resize', this.__resize);

        /* KEYDOWN */

        this._onHover([$document, 'keydown', this.__keydown]);

        /* MIN / MAX BUTTONS */

        this._on(this.$min, Pointer.tap, this.decrease);
        this._on(this.$max, Pointer.tap, this.increase);

        /* DRAG */

        this.$handlerWrp.draggable({
          draggable: this.isEnabled.bind(this),
          axis: 'x',
          $proxy: this.$bar,
          constrainer: {
            $element: this.$bar,
            constrainCenter: true
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

      /* PRIVATE */

    }, {
      key: '_roundValue',
      value: function _roundValue(value) {

        return Number(Number(value).toFixed(this.options.decimals));
      }
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
      value: function _updateLabel(value) {

        this.$label.html(_.isUndefined(value) ? this.options.value : value);
      }
    }, {
      key: '_updateInput',
      value: function _updateInput() {

        this.$input.val(this.options.value).trigger('change');
      }

      /* CHANGE */

    }, {
      key: '__change',
      value: function __change() {

        this.set(this.$input.val());
      }

      /* RESIZE */

    }, {
      key: '__resize',
      value: function __resize() {

        this._updateVariables();
        this._updatePositions();
      }

      /* LEFT / RIGHT ARROWS */

    }, {
      key: '__keydown',
      value: function __keydown(event) {

        switch (event.keyCode) {

          case UI.keyCode.LEFT:
          case UI.keyCode.DOWN:
            this.decrease();
            break;

          case UI.keyCode.RIGHT:
          case UI.keyCode.UP:
            this.increase();
            break;

          default:
            return;

        }

        event.preventDefault();
        event.stopImmediatePropagation();
      }

      /* DRAG */

    }, {
      key: '_dragModifierX',
      value: function _dragModifierX(distance) {

        return _.roundCloser(distance, this.stepWidth);
      }
    }, {
      key: '__dragMove',
      value: function __dragMove(data) {

        this.$highlight.translateX(data.moveXY.X);

        this._updateLabel(this._roundValue(this.options.min + data.moveXY.X / this.stepWidth * this.options.step));
      }
    }, {
      key: '__dragEnd',
      value: function __dragEnd(data) {

        this.set(this.options.min + data.endXY.X / this.stepWidth * this.options.step);
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

        value = _.clamp(this.options.min, this._roundValue(value), this.options.max);

        if (value !== this.options.value) {

          var prevValue = this.options.value;

          this.options.value = value;

          this._updatePositions();
          this._updateLabel();
          this._updateInput();

          this._trigger('change', {
            previous: prevValue,
            value: this.options.value
          });
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

    return Slider;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Slider = Slider;
  Svelto.Slider.config = config;

  /* FACTORY */

  $.factory(Svelto.Slider);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Sortable
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Add support for tableHelper, just put the new addded row in the right position, good performance gain here!
//TODO: Add support for sorting other things other than tables
//TODO: If possible sort using flexbox's `order` property

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'sortable',
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
        sort: _.noop
      }
    }
  };

  /* SORTABLE */

  var Sortable = (function (_Svelto$Widget30) {
    _inherits(Sortable, _Svelto$Widget30);

    function Sortable() {
      _classCallCheck(this, Sortable);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Sortable).apply(this, arguments));
    }

    _createClass(Sortable, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('table.sortable').sortable();
        $root.filter('table.sortable').sortable();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$table = this.$element;
        this.$headers = this.$table.find(this.options.selectors.header);
        this.$sortables = this.$headers.filter(this.options.selectors.sortable);
        this.$tbody = this.$table.find(this.options.selectors.body);

        this.table = this.element;
        this.tbody = this.$tbody[0];

        this.sortData = {}; //INFO: Caching object for datas and references to rows
        this.updated = false;

        this.$currentSortable = false;
        this.currentIndex = false; //INFO: `$headers` index, not `$sortables` index
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

        /* CHANGE */

        this._on(true, 'change', this.__change); //TODO: Update to support tableHelper

        /* TAP */

        this._on(this.$sortables, Pointer.tap, this.__tap);
      }

      /* CHANGE */

    }, {
      key: '__change',
      value: function __change() {

        if (this.currentIndex !== false) {

          this.sortData = {};
          this.updated = false;

          this.sort(this.currentIndex, this.currentDirection);
        }
      }

      /* CLICK */

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

        if (!$sortable.length) return; //INFO: Bad index

        var sorterName = $sortable.data('sort');

        if (!sorterName) return; //INFO: Unsortable column

        var sorter = this.options.sorters[sorterName];

        if (!sorter) return; //INFO: Unsupported sorter

        direction = direction && direction.toLowerCase() === 'desc' ? 'desc' : 'asc';

        /* CHECKING CACHED DATAS */

        if (_.isUndefined(this.sortData[index]) || !this.updated) {

          /* VARIABLES */

          var $trs = this.$tbody.find(this.options.selectors.notEmptyRow);

          this.sortData[index] = Array($trs.length);

          /* POPULATE */

          for (var i = 0, l = $trs.length; i < l; i++) {

            var $td = $trs.eq(i).find(this.options.selectors.rowCell).eq(index),
                value = $td.data(this.options.sortValue) || $td.text();

            this.sortData[index][i] = [$trs[i], value];
          }
        }

        /* SORT */

        if (index !== this.currentIndex || !this.updated) {

          this.sortData[index].sort(function (a, b) {

            return sorter(a[1], b[1]);
          });
        }

        /* REVERSING */

        if (this.updated && index === this.currentIndex && this.currentDirection !== false) {

          var needReversing = direction !== this.currentDirection;
        } else {

          var needReversing = direction === 'desc';
        }

        if (needReversing) {

          this.sortData[index].reverse();
        }

        /* REORDER */

        if (index !== this.currentIndex || direction !== this.currentDirection || !this.updated) {

          this.table.removeChild(this.tbody); //INFO: Detach

          for (var i = 0, l = this.sortData[index].length; i < l; i++) {

            this.tbody.appendChild(this.sortData[index][i][0]); //INFO: Reorder
          }

          this.table.appendChild(this.tbody); //INFO: Attach
        }

        /* STYLE */

        if (index !== this.currentIndex || direction !== this.currentDirection) {

          if (this.$currentSortable) {

            this.$currentSortable.removeClass(this.options.classes.sort[this.currentDirection]);
          }

          $sortable.addClass(this.options.classes.sort[direction]);
        }

        /* UPDATE */

        this.updated = true;

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
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Sortable = Sortable;
  Svelto.Sortable.config = config;

  /* FACTORY */

  $.factory(Svelto.Sortable);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Stepper
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'stepper',
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
        change: _.noop,
        increase: _.noop,
        decrease: _.noop
      }
    }
  };

  /* STEPPER */

  var Stepper = (function (_Svelto$Widget31) {
    _inherits(Stepper, _Svelto$Widget31);

    function Stepper() {
      _classCallCheck(this, Stepper);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Stepper).apply(this, arguments));
    }

    _createClass(Stepper, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.stepper').each(function () {

          var $stepper = $(this);

          $stepper.stepper({
            min: Number($stepper.data('min') || 0),
            max: Number($stepper.data('max') || 100),
            value: Number($stepper.find('.stepper-input').val() || 0),
            step: Number($stepper.data('step') || 1)
          });
        });

        //TODO: Add support for $root.filter
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$stepper = this.$element;
        this.$decreaser = this.$stepper.find(this.options.selectors.decreaser);
        this.$input = this.$stepper.find(this.options.selectors.input);
        this.$increaser = this.$stepper.find(this.options.selectors.increaser);

        this.options.value = this._sanitizeValue(this.options.value);
      }
    }, {
      key: '_init',
      value: function _init() {

        this._updateButtons();
      }
    }, {
      key: '_events',
      value: function _events() {

        /* INPUT / CHANGE */

        this._on(true, this.$input, 'input change', this.__inputChange);

        /* KEYDOWN */

        this._onHover([$document, 'keydown', this.__keydown]);

        /* INCREASE */

        this._on(this.$decreaser, Pointer.tap, this.decrease);

        /* DECREASE */

        this._on(this.$increaser, Pointer.tap, this.increase);
      }

      /* PRIVATE */

    }, {
      key: '_sanitizeValue',
      value: function _sanitizeValue(value) {

        var nr = Number(value);

        value = _.isNaN(nr) ? 0 : nr;

        var remaining = value % this.options.step;

        value = value - remaining + (remaining >= this.options.step / 2 ? this.options.step : 0);

        return _.clamp(this.options.min, value, this.options.max);
      }

      /* UPDATE */

    }, {
      key: '_updateInput',
      value: function _updateInput() {

        this.$input.val(this.options.value).trigger('change');
      }
    }, {
      key: '_updateButtons',
      value: function _updateButtons(previous) {

        var isMin = this.options.value === this.options.min,
            isMax = this.options.value === this.options.max;

        if (previous === this.options.min || isMin) {

          this.$decreaser.toggleClass('disabled', isMin);
        } else if (previous === this.options.max || isMax) {

          this.$increaser.toggleClass('disabled', isMax);
        }
      }
    }, {
      key: '_update',
      value: function _update(previous) {

        this._updateInput();
        this._updateButtons(previous);
      }

      /* CHANGE */

    }, {
      key: '__inputChange',
      value: function __inputChange() {

        this.set(this.$input.val());
      }

      /* LEFT / RIGHT ARROWS */

    }, {
      key: '__keydown',
      value: function __keydown(event) {

        switch (event.keyCode) {

          case UI.keyCode.UP:
            this.increase();
            break;

          case UI.keyCode.DOWN:
            this.decrease();
            break;

          default:
            break;

        }

        event.preventDefault();
        event.stopImmediatePropagation();
      }

      /* PUBLIC */

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

            var data = {
              previous: this.options.value,
              value: value
            };

            this.options.value = value;

            this._update(data.previous);

            this._trigger('change', data);

            this._trigger(data.previous < data.value ? 'increase' : 'decrease', data);

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
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Stepper = Stepper;
  Svelto.Stepper.config = config;

  /* FACTORY */

  $.factory(Svelto.Stepper);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Switch
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * @requires ../draggable/draggable.js
 * @requires ../transform/transform.js
 * ========================================================================= */

;(function ($, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'switch',
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
        change: function change() {},
        check: function check() {},
        uncheck: function uncheck() {}
      }
    }
  };

  /* SWITCH */

  var Switch = (function (_Svelto$Widget32) {
    _inherits(Switch, _Svelto$Widget32);

    function Switch() {
      _classCallCheck(this, Switch);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Switch).apply(this, arguments));
    }

    _createClass(Switch, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.switch').each(function () {

          var $switch = $(this);

          $switch.switch({
            colors: {
              on: $switch.data('color-on') || 'secondary',
              off: $switch.data('color-off') || 'gray'
            }
          });
        });

        //TODO: add support for filter
      }
    }, {
      key: '_variables',
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

        if (this.$input.prop('checked')) {

          this.check();
        }
      }
    }, {
      key: '_events',
      value: function _events() {

        /* CHANGE */

        this._on(true, this.$input, 'change', this.__change);

        /* KEYDOWN */

        this._onHover([$document, 'keydown', this.__keydown]);

        /* DRAG */

        this.$handler.draggable({
          axis: 'x',
          $proxy: this.$switch,
          proxyWithoutMotion: false,
          constrainer: {
            $element: this.$switch
          },
          callbacks: {
            end: this.__dragEnd.bind(this)
          }
        });
      }

      /* CHANGE */

    }, {
      key: '__change',
      value: function __change() {

        this.toggle(this.$input.prop('checked'));
      }

      /* KEYS */

    }, {
      key: '__keydown',
      value: function __keydown(event) {

        switch (event.keyCode) {

          case UI.keyCode.LEFT:
            this.uncheck();
            break;

          case UI.keyCode.RIGHT:
            this.check();
            break;

          case UI.keyCode.SPACE:
            this.toggle();
            break;

          default:
            return;

        }

        event.preventDefault();
        event.stopImmediatePropagation();
      }

      /* DRAG */

    }, {
      key: '__dragEnd',
      value: function __dragEnd(data) {

        if (data.motion) {

          var isChecked = data.endXY.X + this.handlerWidth / 2 >= this.switchWidth / 2;

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

      /* API */

    }, {
      key: 'get',
      value: function get() {

        return this.isChecked;
      }
    }, {
      key: 'toggle',
      value: function toggle(force, reset) {

        if (!_.isBoolean(force)) {

          force = !this.isChecked;
        }

        if (force !== this.isChecked) {

          var prevChecked = this.isChecked;

          this.isChecked = force;

          this.$switch.toggleClass(this.options.classes.checked, this.isChecked);

          this._updatePosition();
          this._updateColors();
          this._updateInput();

          this._trigger('change', {
            previous: prevChecked,
            checked: this.isChecked
          });

          this._trigger(this.isChecked ? 'check' : 'uncheck');
        } else if (reset) {

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
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Switch = Switch;
  Svelto.Switch.config = config;

  /* FACTORY */

  $.factory(Svelto.Switch);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Table Helper
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'tableHelper',
    templates: {
      row: '<tr {%= ( o.id ? "class=" + o.id : "" ) %} >' + '{% for ( var i = 0, l = o.datas.length; i < l; i++ ) { %}' + '<td>' + '{%=o.datas[i]%}' + '</td>' + '{% } %}' + '{% for ( var i = 0, l = o.missing; i < l; i++ ) { %}' + '<td></td>' + '{% } %}' + '</tr>'
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
        add: function add() {},
        update: function update() {},
        remove: function remove() {},
        clear: function clear() {}
      }
    }
  };

  /* TABLE HELPER */

  var TableHelper = (function (_Svelto$Widget33) {
    _inherits(TableHelper, _Svelto$Widget33);

    function TableHelper() {
      _classCallCheck(this, TableHelper);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(TableHelper).apply(this, arguments));
    }

    _createClass(TableHelper, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('table.table').tableHelper();
        $root.filter('table.table').tableHelper();
      }
    }, {
      key: '_variables',
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

        var hasNonEmptyRows = this.$body.find(this.options.selectors.notEmptyRow).length > 0;

        this.$emptyRow.toggleClass('hidden', hasNonEmptyRows);
      }
    }, {
      key: '_getRowId',
      value: function _getRowId(id) {

        return this.options.rowIdPrefix + '_' + this.guid + '_' + id;
      }

      /* PUBLIC */

    }, {
      key: 'add',
      value: function add(id) {
        //INFO: id, datas...

        var datas = _.tail(arguments),
            rowId = id ? this._getRowId(id) : false;

        if (datas.length > 0) {

          if (rowId && $('.' + rowId).length === 1) return this;

          var chunks = _.chunk(datas, this.columnsNr),
              $rows = $empty;

          for (var ci = 0, cl = chunks.length; ci < cl; ci++) {

            var chunk = chunks[ci],
                rowHtml = this._tmpl('row', { id: rowId, datas: chunk, missing: this.columnsNr - chunk.length });

            $rows = $rows.add(rowHtml);
          }

          this.$body.append($rows);

          this._checkEmpty();

          this.$table.trigger('change');

          this._trigger('add', {
            $rows: $rows
          });
        }

        return this;
      }
    }, {
      key: 'update',
      value: function update(id) {
        //INFO: id, datas...

        var datas = _.tail(arguments),
            $row = $('.' + this._getRowId(id));

        if (datas.length > 0 && $row.length === 1) {

          var $rowCells = $row.find(this.options.selectors.rowCell);

          for (var i = 0, l = datas.length; i < l; i++) {

            if (_.isString(datas[i])) {

              $rowCells.eq(i).html(datas[i]);
            }
          }

          this.$table.trigger('change');

          this._trigger('update', {
            $row: $row
          });
        }

        return this;
      }
    }, {
      key: 'remove',
      value: function remove(id) {

        var $row = $('.' + this._getRowId(id));

        if ($row.length === 1) {

          $row.remove();

          this._checkEmpty();

          this.$table.trigger('change');

          this._trigger('remove', {
            $row: $row
          });
        }

        return this;
      }
    }, {
      key: 'clear',
      value: function clear() {

        var $rows = this.$body.find(this.options.selectors.notEmptyRow);

        if ($rows.length > 0) {

          $rows.remove();

          this._checkEmpty();

          this.$table.trigger('change');

          this._trigger('clear', {
            $rows: $rows
          });
        }

        return this;
      }
    }]);

    return TableHelper;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.TableHelper = TableHelper;
  Svelto.TableHelper.config = config;

  /* FACTORY */

  $.factory(Svelto.TableHelper);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Tabs
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Add again the indicator

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'tabs',
    options: {
      highlight: true,
      classes: {
        vertical: 'vertical',
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
        set: _.noop
      }
    }
  };

  /* TABS */

  var Tabs = (function (_Svelto$Widget34) {
    _inherits(Tabs, _Svelto$Widget34);

    function Tabs() {
      _classCallCheck(this, Tabs);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Tabs).apply(this, arguments));
    }

    _createClass(Tabs, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.tabs').tabs();
        $root.filter('.tabs').tabs();
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$tabs = this.$element;
        this.$triggers = this.$tabs.find(this.options.selectors.triggers);
        this.$containers = this.$tabs.find(this.options.selectors.containers);

        this.isVertical = this.$tabs.hasClass(this.options.classes.vertical);

        this.index = -1;
      }
    }, {
      key: '_init',
      value: function _init() {

        var $activeTrigger = this.$triggers.filter('.' + this.options.classes.active.trigger).first();

        $activeTrigger = $activeTrigger.length > 0 ? $activeTrigger : this.$triggers.first();

        var newIndex = this.$triggers.index($activeTrigger);

        this.set(newIndex);
      }
    }, {
      key: '_events',
      value: function _events() {

        /* TRIGGERS */

        this._on(this.$triggers, Pointer.tap, this.__tap);
      }

      /* PRIVATE */

    }, {
      key: '__tap',
      value: function __tap(event) {

        var newIndex = this.$triggers.index($(event.currentTarget));

        this.set(newIndex);
      }

      /* PUBLIC */

    }, {
      key: 'get',
      value: function get() {

        return this.index;
      }
    }, {
      key: 'set',
      value: function set(index) {

        if (this.index !== index) {

          /* PREVIOUS */

          var $prevTrigger = this.$triggers.eq(this.index),
              $prevContainer = this.$containers.eq(this.index);

          $prevTrigger.removeClass(this.options.classes.active.trigger);
          $prevContainer.removeClass(this.options.classes.active.container);

          if (this.options.highlight) {

            $prevTrigger.removeClass('highlight highlight-bottom highlight-right');
          }

          /* NEW */

          this.index = index;

          var $trigger = this.$triggers.eq(this.index),
              $container = this.$containers.eq(this.index);

          $trigger.addClass(this.options.classes.active.trigger);
          $container.addClass(this.options.classes.active.container);

          if (this.options.highlight) {

            $trigger.addClass('highlight' + (this.isVertical ? ' highlight-right' : ' highlight-bottom'));
          }

          /* CALLBACKS */

          this._trigger('set', {
            index: this.index
          });
        }
      }
    }]);

    return Tabs;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Tabs = Tabs;
  Svelto.Tabs.config = config;

  /* FACTORY */

  $.factory(Svelto.Tabs);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Tagbox
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * @requires ../noty/noty.js
 * ========================================================================= */

//FIXME: Do we handle the insertion of characters like `&` or `'` propertly?
//FIXME: Should we forbid characters or just escape them?
//FIXME: If we disable the escaping, does it break using characters like `"`? `It does, at leas when calling `remove`
//FIXME: Partial's text cursor is not visible whan it's empty
//FIXME: Auto focus on the partial input doesn't work good on mobile

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'tagbox',
    templates: {
      tag: '<div class="label-tag tagbox-tag" data-tag-value="{%=o.value%}">' + '<div class="label {%=o.color%} {%=o.size%} {%=o.css%}">' + '<span>' + '{%=o.value%}' + '</span>' + '<div class="button gray compact xxsmall tagbox-tag-remover">' + '<i class="icon">close</i>' + '</div>' + '</div>' + '</div>'
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
        forbidden: ['<', '>', ';', '`'],
        separator: ',', //INFO: It will also become kind of a forbidden character, used for insertion
        inserters: [UI.keyCode.ENTER, UI.keyCode.TAB] //INFO: They are keyCodes
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
        change: function change() {},
        add: function add() {},
        remove: function remove() {},
        empty: function empty() {}
      }
    }
  };

  /* TAGBOX */

  var Tagbox = (function (_Svelto$Widget35) {
    _inherits(Tagbox, _Svelto$Widget35);

    function Tagbox() {
      _classCallCheck(this, Tagbox);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Tagbox).apply(this, arguments));
    }

    _createClass(Tagbox, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.tagbox').each(function () {

          var $tagbox = $(this);

          $tagbox.tagbox({ init: $tagbox.find('input').val() });
        });

        //TODO: add support for liter
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$tagbox = this.$element;
        this.$tags = this.$tagbox.find(this.options.selectors.tags);
        this.$input = this.$tagbox.find(this.options.selectors.input);
        this.$partial = this.$tagbox.find(this.options.selectors.partial);
      }
    }, {
      key: '_init',
      value: function _init(suppressTriggers) {

        this.add(this.options.init, suppressTriggers);
      }
    }, {
      key: '_events',
      value: function _events() {

        /* PARTIAL */

        this._on(this.$partial, 'keypress keydown', this.__keypressKeydown); //INFO: `keypress` is for printable characters, `keydown` for the others

        this._on(this.$partial, 'paste', this.__paste);

        /* TAP ON EMPTY */

        this._on(Pointer.tap, this.__tapOnEmpty);

        /* TAP ON TAG REMOVER */

        this._on(Pointer.tap, this.options.selectors.tagRemover, this.__tapOnTagRemover);
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

        return this._tmpl('tag', _.merge({ value: value }, this.options.tag));
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

        var valueTrimmed = _.trim(value),
            value = this._sanitizeTag(value);

        if (valueTrimmed.length < this.options.tag.minLength) {

          if (valueTrimmed.length > 0) {
            //INFO: So it won't be triggered when the user presses enter and the $partial is empty

            $.noty('`' + value + '` is shorter than ' + this.options.tag.minLength + ' characters');
          }
        } else if (_.contains(this.options.tags, value)) {

          $.noty('`' + value + '` is a duplicate');
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
        } else if (event.keyCode === UI.keyCode.BACKSPACE) {

          if (value.length === 0 && this.options.tags.length > 0) {

            var $tag = this.$tagbox.find(this.options.selectors.tag).last(),
                edit = !$.hasCtrlOrCmd(event);

            this.remove($tag, edit);

            event.preventDefault();
            event.stopImmediatePropagation();
          }
        } else if (_.contains(this.options.characters.forbidden, String.fromCharCode(event.keyCode))) {

          $.noty('The character you entered is forbidden');

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
      }

      /* TAP ON CLOSE */

    }, {
      key: '__tapOnTagRemover',
      value: function __tapOnTagRemover(event) {

        var $tag = $(event.currentTarget).parents(this.options.selectors.tag);

        this.remove($tag);
      }

      /* TAP ON EMPTY */

    }, {
      key: '__tapOnEmpty',
      value: function __tapOnEmpty(event) {

        if (document.activeElement !== this.$partial[0] && !$(event.target).is('input, ' + this.options.selectors.tagLabel)) {

          this.$partial.focus();
        }
      }

      /* PUBLIC */

    }, {
      key: 'get',
      value: function get() {

        return _.clone(this.options.tags);
      }
    }, {
      key: 'add',
      value: function add(tag, suppressTriggers) {
        //INFO: The tag can be a string containing a single tag, multiple tags separated by `this.options.characters.separator`, or it can be an array (nested or not) of those strings

        if (_.isArray(tag)) {

          tag = _.flatten(tag).join(this.options.characters.separator);
        }

        var previous = _.clone(this.options.tag);

        var tags = tag.split(this.options.characters.separator),
            adds = _.map(tags, this._add, this);

        var added = _.compact(adds).length > 0;

        if (added) {

          this._updateInput();

          if (!suppressTriggers) {

            this._trigger('change', {
              previous: previous,
              tags: _.clone(this.options.tags)
            });

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
        //INFO: The tag can be a string containing a single tag, multiple tags separated by `this.options.characters.separator`, or it can be an array (nested or not) of those strings. In addition it can also be the jQuery object of that tag.

        if (tag instanceof $) {

          var $tags = [tag],
              tags = [tag.data('tag-value')];
        } else {

          var $tags = [],
              tags = [];

          if (_.isArray(tag)) {

            tag = _.flatten(tag).join(this.options.characters.separator);
          }

          tag = tag.split(this.options.characters.separator);

          for (var i = 0, l = tag.length; i < l; i++) {

            var value = this._sanitizeTag(tag[i]),
                $tag = this.$tagbox.find(this.options.selectors.tag + '[data-tag-value="' + value + '"]');

            if ($tag.length === 1) {

              $tags.push($tag);
              tags.push(value);
            }
          }
        }

        if (tags.length > 0) {

          var previous = _.clone(this.options.tags);

          for (var i = 0, l = tags.length; i < l; i++) {

            this._remove($tags[i], tags[i]);
          }

          this._updateInput();

          if (tags.length === 1 && edit === true) {

            this.$partial.val(tags[0]).trigger('change');
          }

          if (!suppressTriggers) {

            this._trigger('change', {
              previous: previous,
              tags: _.clone(this.options.tags)
            });

            this._trigger('remove', tags);

            if (this.options.tags.length === 0) {

              this._trigger('empty');
            }
          }
        }
      }
    }, {
      key: 'clear',
      value: function clear(suppressTriggers) {

        if (this.options.tags.length > 0) {

          var data = {
            previous: _.clone(this.options.tags),
            tags: []
          };

          this.options.tags = [];

          this.$tagbox.find(this.options.selectors.tag).remove();

          this._clearPartial();

          this._updateInput();

          if (!suppressTriggers) {

            this._trigger('change', data);

            if (data.previous.length > 0) {

              this._trigger('remove', data.previous);
            }

            this._trigger('empty');
          }
        }
      }
    }, {
      key: 'reset',
      value: function reset() {

        var previous = _.clone(this.options.tags);

        this.clear(true);

        this._init(true);

        if (!_.isEqual(previous, this.options.tags)) {

          this._trigger('change', {
            previous: previous,
            tags: _.clone(this.options.tags)
          });

          var added = _.difference(this.options.tags, previous);

          if (added.length > 0) {

            this._trigger('add', added);
          }

          var removed = _.difference(previous, this.options.tags);

          if (removed.length > 0) {

            this._trigger('remove', removed);
          }

          if (this.options.tags.length === 0) {

            this._trigger('empty');
          }
        }
      }
    }]);

    return Tagbox;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.Tagbox = Tagbox;
  Svelto.Tagbox.config = config;

  /* FACTORY */

  $.factory(Svelto.Tagbox);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Time Ago
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'timeAgo',
    options: {
      timestamp: false,
      title: false,
      callbacks: {
        change: function change() {}
      }
    }
  };

  /* TIME AGO */

  var TimeAgo = (function (_Svelto$Widget36) {
    _inherits(TimeAgo, _Svelto$Widget36);

    function TimeAgo() {
      _classCallCheck(this, TimeAgo);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(TimeAgo).apply(this, arguments));
    }

    _createClass(TimeAgo, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('[data-timestamp]').timeAgo();
        $root.filter('[data-timestamp]').timeAgo();

        $root.find('[data-timestamp-title]').timeAgo({ title: true });
        $root.filter('[data-timestamp-title]').timeAgo({ title: true });
      }
    }, {
      key: '_variables',
      value: function _variables() {

        this.$timeAgoElement = this.$element;

        if (!this.options.timestamp) {

          this.options.timestamp = this.$timeAgoElement.data(this.options.title ? 'timestamp-title' : 'timestamp');
        }
      }
    }, {
      key: '_init',
      value: function _init() {

        this._loop(0);
      }

      /* PRIVATE */

    }, {
      key: '_loop',
      value: function _loop(wait) {

        this._delay(function () {

          this._loop(this._update().next);
        }, wait * 1000);
      }
    }, {
      key: '_update',
      value: function _update() {

        var timeAgo = _.timeAgo(this.options.timestamp);

        if (this.options.title) {

          this.$timeAgoElement.attr('title', timeAgo.str);
        } else {

          this.$timeAgoElement.html(timeAgo.str);
        }

        this._trigger('change');

        return timeAgo;
      }
    }]);

    return TimeAgo;
  })(Svelto.Widget);

  /* BINDING */

  Svelto.TimeAgo = TimeAgo;
  Svelto.TimeAgo.config = config;

  /* FACTORY */

  $.factory(Svelto.TimeAgo);
})(Svelto.$, Svelto._, window, document);

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

(function (_, window, document, undefined) {
  'use strict'

  /* TIMER */

  ;
  window.Timer = (function () {
    function _class4() {
      _classCallCheck(this, _class4);

      this.set.apply(this, arguments);
    }

    _createClass(_class4, [{
      key: 'set',
      value: function set(fn, time, autostart) {

        this.init = true;
        this.action = fn;

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
        var _this46 = this;

        if (isNaN(time)) {

          time = 0;
        }

        setTimeout(function () {
          return _this46.action();
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
          this.remainingTime -= new Date() - this.last;
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
        var _this47 = this;

        if (isNaN(time)) {

          time = this.intervalTime;
        }

        this.remainingTime = time;
        this.last = new Date();
        this.clearTimer();

        this.timeoutObject = setTimeout(function () {
          return _this47.go();
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

    return _class4;
  })();
})(Svelto._, window, document);

/* =========================================================================
 * Svelto - Tooltip
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

(function ($, _, window, document, undefined) {
  'use strict'

  /* CONFIG */

  ;
  var config = {
    name: 'tooltip',
    options: {
      hover: {
        triggerable: true
      },
      datas: {
        element: 'tooltip'
      },
      selectors: {
        closer: '.button, .tooltip-closer',
        trigger: '.tooltip-trigger'
      }
    }
  };

  /* TOOLTIP */

  var Tooltip = (function (_Svelto$Dropdown) {
    _inherits(Tooltip, _Svelto$Dropdown);

    function Tooltip() {
      _classCallCheck(this, Tooltip);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Tooltip).apply(this, arguments));
    }

    _createClass(Tooltip, [{
      key: '_widgetize',

      /* SPECIAL */

      value: function _widgetize($root) {

        $root.find('.tooltip').tooltip();
        $root.filter('.tooltip').tooltip();
      }
    }]);

    return Tooltip;
  })(Svelto.Dropdown);

  /* BINDING */

  Svelto.Tooltip = Tooltip;
  Svelto.Tooltip.config = config;

  /* FACTORY */

  $.factory(Svelto.Tooltip);
})(Svelto.$, Svelto._, window, document);

/* =========================================================================
 * Svelto - Touching
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../bteach/bteach.js
 * ========================================================================= */

(function ($, _, window, document, undefined) {
  'use strict'

  /* TOUCHING */

  ;
  $.fn.touching = function (options) {

    /* OPTIONS */

    options = _.merge({
      startIndex: false, //INFO: Useful for speeding up the searching process if we may already guess the initial position...
      point: false, //INFO: Used for the punctual search
      //  {
      //    X: 0,
      //    Y: 0
      //  },
      binarySearch: true, //INFO: toggle the binary search when performing a punctual search
      $comparer: false, //INFO: Used for the overlapping search
      $not: false,
      onlyBest: false
    }, options);

    /* SEARCHABLE */

    var $searchable = options.$not ? this.not(options.$not) : this;

    /* COMPARER */

    if (options.$comparer) {

      var rect1 = options.$comparer.getRect(),
          nodes = [],
          areas = [];

      var result = false;

      var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = $searchable[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var searchable = _step12.value;

          var rect2 = $.getRect(searchable),
              area = $.getOverlappingArea(rect1, rect2);

          if (area > 0) {

            nodes.push(searchable);
            areas.push(area);
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

      return options.onlyBest ? $(nodes[areas.indexOf(_.max(areas))]) : $(nodes);
    }

    /* PUNCTUAL */

    if (options.point) {

      var $touched = void 0;

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

        return $touched || $empty;
      } else {
        var _iteratorNormalCompletion13 = true;
        var _didIteratorError13 = false;
        var _iteratorError13 = undefined;

        try {

          for (var _iterator13 = $searchable[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
            var searchable = _step13.value;

            var rect = $.getRect(searchable);

            if (options.point.Y >= rect.top && options.point.Y <= rect.bottom && options.point.X >= rect.left && options.point.X <= rect.right) {

              $touched = $(searchable);

              break;
            }
          }
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

        return $touched || $empty;
      }
    }
  };
})(Svelto.$, Svelto._, window, document);
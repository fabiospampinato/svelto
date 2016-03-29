'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* =========================================================================
 * Svelto - Core - jQuery (Init)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before ./vendor/jquery.js
 * ========================================================================= */

(function () {

  'use strict';

  /* JQUERY */

  var $ = jQuery || $;

  /* CHECKING */

  var version = $ ? $().jquery : false,
      parts = version ? version.split('-')[0].split('.') : false,
      nums = parts ? parts.map(Number) : false,
      supported = nums && nums[0] > 1 || nums[0] === 1 && (nums[1] > 11 || nums[1] === 11 && nums[2] >= 2);

  if (!$ || !supported) {

    throw new Error('Svelto depends upon jQuery v1.11.2 or higher, dependency not found');
  }

  /* EXPORT */

  window.jQuery = $;
})();

/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Clean data)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

// Monkey patching the internal `$.cleanData` method so that we can properly destroy widgets instances when their relative elements are removed
//SOURCE: jQuery UI's Widget

(function ($) {

  'use strict';

  /* CLEAN DATA */

  var _cleanData = $.cleanData;

  $.cleanData = function (eles) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {

      for (var _iterator = eles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var ele = _step.value;


        var events = $._data(ele, 'events');

        if (events && events.remove) {

          $(ele).triggerHandler('remove');
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

    _cleanData(eles);
  };
})(jQuery);

/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Event XY)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ($) {

  'use strict';

  /* EVENT XY */

  $.eventXY = function (event) {
    var X = arguments.length <= 1 || arguments[1] === undefined ? 'pageX' : arguments[1];
    var Y = arguments.length <= 2 || arguments[2] === undefined ? 'pageY' : arguments[2];


    if ('originalEvent' in event) {

      return $.eventXY(event.originalEvent);
    } else if ('changedTouches' in event && event.changedTouches.length) {

      return {
        x: event.changedTouches[0][X],
        y: event.changedTouches[0][Y]
      };
    } else if ('touches' in event && event.touches.length) {

      return {
        x: event.touches[0][X],
        y: event.touches[0][Y]
      };
    } else if (X in event) {

      return {
        x: event[X],
        y: event[Y]
      };
    }
  };
})(jQuery);

/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Frame)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ($) {

  'use strict';

  /* FRAME */

  $.frame = function (callback) {

    return requestAnimationFrame(callback);
  };
})(jQuery);

/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Get rect)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ($) {

  'use strict';

  /* RECT */

  $.getRect = function (node) {

    return node.getBoundingClientRect();
  };

  $.fn.getRect = function () {

    return this.length ? this[0].getBoundingClientRect() : undefined;
  };
})(jQuery);

/* =========================================================================
 * Svelto - Core - jQuery - Helpers (HSL)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

//FIXME: I'm not sure if this plugin should exists

// It only works for setting

(function ($) {

  'use strict';

  /* HSL */

  $.fn.hsl = function (h, s, l) {

    return this.css('background-color', 'hsl(' + h + ',' + s + '%,' + l + '%)');
  };
})(jQuery);

/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Is attached)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ($) {

  'use strict';

  /* IS ATTACHED */

  $.fn.isAttached = function () {

    return $.contains(document.documentElement, this[0]);
  };
})(jQuery);

/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Iterator)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ($) {

  'use strict';

  /* ITERATOR */

  $.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
})(jQuery);

/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Scroll)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * @require ./iterator.js
 * ========================================================================= */

(function ($) {

  'use strict';

  /* SCROLL */

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

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = this.parents()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var parent = _step2.value;


        var $parent = $(parent);

        if (excludeStaticParent && $parent.css('position') === 'static') continue;

        if (overflowRegex.test($parent.css('overflow') + $parent.css('overflow-y') + $parent.css('overflow-x'))) {

          return $parent;
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

    return $(document);
  };

  //TODO: Preserve the scrollbars if possible, when disabling

  $.fn.toggleScroll = function (force) {

    return this.toggleClass('overflow-hidden', !force);
  };

  $.fn.disableScroll = function () {

    return this.toggleScroll(false);
  };

  $.fn.enableScroll = function () {

    return this.toggleScroll(true);
  };
})(jQuery);

/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Selection)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

//SOURCE: jQuery UI

(function ($) {

  'use strict';

  /* SELECTION */

  $.fn.disableSelection = function () {

    var event = 'onselectstart' in document.createElement('div') ? 'selectstart' : 'mousedown';

    return function () {

      return this.on(event + '.svelto-disable-selection', function (event) {
        return event.preventDefault();
      });
    };
  }();

  $.fn.enableSelection = function () {

    return this.off('.svelto-disable-selection');
  };
})(jQuery);

/* =========================================================================
 * Svelto - Core - lodash (Init)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before ./vendor/lodash.js
 * ========================================================================= */

(function () {

  'use strict';

  /* LODASH */

  var _ = lodash || _;

  /* CHECKING */

  var version = _ ? _.VERSION : false,
      parts = version ? version.split('-')[0].split('.') : false,
      nums = parts ? parts.map(Number) : false,
      supported = nums && nums[0] > 4 || nums[0] === 4 && (nums[1] > 6 || nums[1] === 6 && nums[2] >= 1);

  if (!_ || !supported) {

    throw new Error('Svelto depends upon lodash v4.6.1 or higher, dependency not found');
  }

  /* EXPORT */

  window.lodash = _;
})();

/* =========================================================================
 * Svelto - Core - lodash - Helpers (Constants)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function (_) {

  'use strict';

  /* CONSTANTS */

  _.mixin({

    true: _.constant(true),

    false: _.constant(false)

  });
})(lodash);

/* =========================================================================
 * Svelto - Core - lodash - Helpers (Format)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function (_) {

  'use strict';

  /* FORMAT */

  _.mixin({
    format: function format(msg) {

      for (var i = 1, l = arguments.length - 1; i <= l; i++) {

        msg = msg.replace('$' + i, arguments.length <= i - 1 + 1 ? undefined : arguments[i - 1 + 1]);
      }

      return msg;
    }
  });
})(lodash);

/* =========================================================================
 * Svelto - Core - lodash - Helpers (MKize)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function (_) {

  'use strict';

  /* MKIZE */

  _.mixin({
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
    }
  });
})(lodash);

/* =========================================================================
 * Svelto - Core - lodash - Helpers (Move)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function (_) {

  'use strict';

  /* MOVE */

  _.mixin({
    move: function move(arr, from, to) {

      arr.splice(to, 0, arr.splice(from, 1)[0]);
    }
  });
})(lodash);

/* =========================================================================
 * Svelto - Core - lodash - Helpers (Now secs)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function (_) {

  'use strict';

  /* NOW SECS */

  _.mixin({
    nowSecs: function nowSecs() {

      return Math.floor(_.now() / 1000);
    }
  });
})(lodash);

/* =========================================================================
 * Svelto - Core - lodash - Helpers (Round closer)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function (_) {

  'use strict';

  /* DIRECTION */

  _.mixin({
    roundCloser: function roundCloser(number, step) {

      if (_.isUndefined(step)) {

        step = 1;
      }

      var left = number % step,
          halfStep = step / 2;

      return number - left + (left >= halfStep ? step : 0);
    }
  });
})(lodash);

/* =========================================================================
 * Svelto - Core - lodash - Helpers (Time ago)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * @require ./now_secs.js
 * ========================================================================= */

(function (_) {

  'use strict';

  /* TIME AGO */

  _.mixin({
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
    }
  });
})(lodash);

/* =========================================================================
 * Svelto - Core - lodash - Helpers
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./constants.js
 * @require ./format.js
 * @require ./mkize.js
 * @require ./move.js
 * @require ./now_secs.js
 * @require ./round_closer.js
 * @require ./time_ago.js
 * ========================================================================= */

/* =========================================================================
 * Svelto - Core - lodash
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./init.js
 * @require ./helpers/helpers.js
 * ========================================================================= */

/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Z Index)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * @require core/lodash/lodash.js
 * ========================================================================= */

//SOURCE: jQuery UI

(function ($, _) {

  'use strict';

  /* Z INDEX */

  $.fn.zIndex = function (val) {

    if (!_.isUndefined(val)) {

      return this.css('zIndex', val);
    }

    if (!this.length) return 0;

    var $elem = this.eq(0),
        position = void 0,
        value = void 0;

    while ($elem.length && $elem[0] !== document) {

      // Ignore z-index if position is set to a value where z-index is ignored by the browser
      // This makes behavior of this function consistent across browsers
      // WebKit always returns auto if the element is positioned

      position = $elem.css('position');

      if (_.includes(['absolute', 'relative', 'fixed'], position)) {

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
})(jQuery, lodash);

/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Top index)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * @require ./z_index.js
 * ========================================================================= */

//TODO: Use it
//TODO: Write it in a more dynamic way, detecting what the highest `z-index` actually is

(function ($) {

  'use strict';

  /* TOP INDEX */

  $.fn.topIndex = function () {

    var topIndex = 1000000000;

    return function () {

      return this.zIndex(++topIndex);
    };
  };
})(jQuery);

/* =========================================================================
 * Svelto - Core - jQuery - Helpers
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./clean_data.js
 * @require ./event_xy.js
 * @require ./frame.js
 * @require ./get_rect.js
 * @require ./hsl.js
 * @require ./is_attached.js
 * @require ./iterator.js
 * @require ./scroll.js
 * @require ./selection.js
 * @require ./top_index.js
 * @require ./z_index.js
 * ========================================================================= */

/* =========================================================================
 * Svelto - Core - jQuery
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./init.js
 * @require ./helpers/helpers.js
 * ========================================================================= */

/*!
 * modernizr v3.3.1
 * Build http://modernizr.com/download?-addtest-atrule-domprefixes-hasevent-mq-prefixed-prefixedcss-prefixedcssvalue-prefixes-setclasses-testallprops-testprop-teststyles-dontmin
 *
 * Copyright (c)
 *  Faruk Ates
 *  Paul Irish
 *  Alex Sexton
 *  Ryan Seddon
 *  Patrick Kettner
 *  Stu Cox
 *  Richard Herrera

 * MIT License
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in the
 * current UA and makes the results available to you in two ways: as properties on
 * a global `Modernizr` object, and as classes on the `<html>` element. This
 * information allows you to progressively enhance your pages with a granular level
 * of control over the experience.
*/

;(function (window, document, undefined) {
  var classes = [];

  var tests = [];

  /**
   *
   * ModernizrProto is the constructor for Modernizr
   *
   * @class
   * @access public
   */

  var ModernizrProto = {
    // The current version, dummy
    _version: '3.3.1',

    // Any settings that don't work as separate modules
    // can go in here as configuration.
    _config: {
      'classPrefix': '',
      'enableClasses': true,
      'enableJSClass': false,
      'usePrefixes': true
    },

    // Queue of tests
    _q: [],

    // Stub these for people who are listening
    on: function on(test, cb) {
      // I don't really think people should do this, but we can
      // safe guard it a bit.
      // -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
      // This is in case people listen to synchronous tests. I would leave it out,
      // but the code to *disallow* sync tests in the real version of this
      // function is actually larger than this.
      var self = this;
      setTimeout(function () {
        cb(self[test]);
      }, 0);
    },

    addTest: function addTest(name, fn, options) {
      tests.push({ name: name, fn: fn, options: options });
    },

    addAsyncTest: function addAsyncTest(fn) {
      tests.push({ name: null, fn: fn });
    }
  };

  // Fake some of Object.create so we can force non test results to be non "own" properties.
  var Modernizr = function Modernizr() {};
  Modernizr.prototype = ModernizrProto;

  // Leak modernizr globally when you `require` it rather than force it here.
  // Overwrite name so constructor name is nicer :D
  Modernizr = new Modernizr();

  /**
   * List of property values to set for css tests. See ticket #21
   * http://git.io/vUGl4
   *
   * @memberof Modernizr
   * @name Modernizr._prefixes
   * @optionName Modernizr._prefixes
   * @optionProp prefixes
   * @access public
   * @example
   *
   * Modernizr._prefixes is the internal list of prefixes that we test against
   * inside of things like [prefixed](#modernizr-prefixed) and [prefixedCSS](#-code-modernizr-prefixedcss). It is simply
   * an array of kebab-case vendor prefixes you can use within your code.
   *
   * Some common use cases include
   *
   * Generating all possible prefixed version of a CSS property
   * ```js
   * var rule = Modernizr._prefixes.join('transform: rotate(20deg); ');
   *
   * rule === 'transform: rotate(20deg); webkit-transform: rotate(20deg); moz-transform: rotate(20deg); o-transform: rotate(20deg); ms-transform: rotate(20deg);'
   * ```
   *
   * Generating all possible prefixed version of a CSS value
   * ```js
   * rule = 'display:' +  Modernizr._prefixes.join('flex; display:') + 'flex';
   *
   * rule === 'display:flex; display:-webkit-flex; display:-moz-flex; display:-o-flex; display:-ms-flex; display:flex'
   * ```
   */

  // we use ['',''] rather than an empty array in order to allow a pattern of .`join()`ing prefixes to test
  // values in feature detects to continue to work
  var prefixes = ModernizrProto._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : ['', ''];

  // expose these for the plugin API. Look in the source for how to join() them against your input
  ModernizrProto._prefixes = prefixes;

  /**
   * is returns a boolean if the typeof an obj is exactly type.
   *
   * @access private
   * @function is
   * @param {*} obj - A thing we want to check the type of
   * @param {string} type - A string to compare the typeof against
   * @returns {boolean}
   */

  function is(obj, type) {
    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === type;
  }
  ;

  /**
   * Run through all tests and detect their support in the current UA.
   *
   * @access private
   */

  function testRunner() {
    var featureNames;
    var feature;
    var aliasIdx;
    var result;
    var nameIdx;
    var featureName;
    var featureNameSplit;

    for (var featureIdx in tests) {
      if (tests.hasOwnProperty(featureIdx)) {
        featureNames = [];
        feature = tests[featureIdx];
        // run the test, throw the return value into the Modernizr,
        // then based on that boolean, define an appropriate className
        // and push it into an array of classes we'll join later.
        //
        // If there is no name, it's an 'async' test that is run,
        // but not directly added to the object. That should
        // be done with a post-run addTest call.
        if (feature.name) {
          featureNames.push(feature.name.toLowerCase());

          if (feature.options && feature.options.aliases && feature.options.aliases.length) {
            // Add all the aliases into the names list
            for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
              featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
            }
          }
        }

        // Run the test, or use the raw value if it's not a function
        result = is(feature.fn, 'function') ? feature.fn() : feature.fn;

        // Set each of the names on the Modernizr object
        for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
          featureName = featureNames[nameIdx];
          // Support dot properties as sub tests. We don't do checking to make sure
          // that the implied parent tests have been added. You must call them in
          // order (either in the test, or make the parent test a dependency).
          //
          // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
          // hashtag famous last words
          featureNameSplit = featureName.split('.');

          if (featureNameSplit.length === 1) {
            Modernizr[featureNameSplit[0]] = result;
          } else {
            // cast to a Boolean, if not one already
            /* jshint -W053 */
            if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
              Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
            }

            Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
          }

          classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
        }
      }
    }
  }
  ;

  /**
   * docElement is a convenience wrapper to grab the root element of the document
   *
   * @access private
   * @returns {HTMLElement|SVGElement} The root element of the document
   */

  var docElement = document.documentElement;

  /**
   * A convenience helper to check if the document we are running in is an SVG document
   *
   * @access private
   * @returns {boolean}
   */

  var isSVG = docElement.nodeName.toLowerCase() === 'svg';

  /**
   * setClasses takes an array of class names and adds them to the root element
   *
   * @access private
   * @function setClasses
   * @param {string[]} classes - Array of class names
   */

  // Pass in an and array of class names, e.g.:
  //  ['no-webp', 'borderradius', ...]
  function setClasses(classes) {
    var className = docElement.className;
    var classPrefix = Modernizr._config.classPrefix || '';

    if (isSVG) {
      className = className.baseVal;
    }

    // Change `no-js` to `js` (independently of the `enableClasses` option)
    // Handle classPrefix on this too
    if (Modernizr._config.enableJSClass) {
      var reJS = new RegExp('(^|\\s)' + classPrefix + 'no-js(\\s|$)');
      className = className.replace(reJS, '$1' + classPrefix + 'js$2');
    }

    if (Modernizr._config.enableClasses) {
      // Add the new classes
      className += ' ' + classPrefix + classes.join(' ' + classPrefix);
      isSVG ? docElement.className.baseVal = className : docElement.className = className;
    }
  }

  ;

  /**
   * If the browsers follow the spec, then they would expose vendor-specific style as:
   *   elem.style.WebkitBorderRadius
   * instead of something like the following, which would be technically incorrect:
   *   elem.style.webkitBorderRadius
    * Webkit ghosts their properties in lowercase but Opera & Moz do not.
   * Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
   *   erik.eae.net/archives/2008/03/10/21.48.10/
    * More here: github.com/Modernizr/Modernizr/issues/issue/21
   *
   * @access private
   * @returns {string} The string representing the vendor-specific style properties
   */

  var omPrefixes = 'Moz O ms Webkit';

  /**
   * List of JavaScript DOM values used for tests
   *
   * @memberof Modernizr
   * @name Modernizr._domPrefixes
   * @optionName Modernizr._domPrefixes
   * @optionProp domPrefixes
   * @access public
   * @example
   *
   * Modernizr._domPrefixes is exactly the same as [_prefixes](#modernizr-_prefixes), but rather
   * than kebab-case properties, all properties are their Capitalized variant
   *
   * ```js
   * Modernizr._domPrefixes === [ "Moz", "O", "ms", "Webkit" ];
   * ```
   */

  var domPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(' ') : [];
  ModernizrProto._domPrefixes = domPrefixes;

  /**
   * hasOwnProp is a shim for hasOwnProperty that is needed for Safari 2.0 support
   *
   * @author kangax
   * @access private
   * @function hasOwnProp
   * @param {object} object - The object to check for a property
   * @param {string} property - The property to check for
   * @returns {boolean}
   */

  // hasOwnProperty shim by kangax needed for Safari 2.0 support
  var hasOwnProp;

  (function () {
    var _hasOwnProperty = {}.hasOwnProperty;
    /* istanbul ignore else */
    /* we have no way of testing IE 5.5 or safari 2,
     * so just assume the else gets hit */
    if (!is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined')) {
      hasOwnProp = function hasOwnProp(object, property) {
        return _hasOwnProperty.call(object, property);
      };
    } else {
      hasOwnProp = function hasOwnProp(object, property) {
        /* yes, this can give false positives/negatives, but most of the time we don't care about those */
        return property in object && is(object.constructor.prototype[property], 'undefined');
      };
    }
  })();

  // _l tracks listeners for async tests, as well as tests that execute after the initial run
  ModernizrProto._l = {};

  /**
   * Modernizr.on is a way to listen for the completion of async tests. Being
   * asynchronous, they may not finish before your scripts run. As a result you
   * will get a possibly false negative `undefined` value.
   *
   * @memberof Modernizr
   * @name Modernizr.on
   * @access public
   * @function on
   * @param {string} feature - String name of the feature detect
   * @param {function} cb - Callback function returning a Boolean - true if feature is supported, false if not
   * @example
   *
   * ```js
   * Modernizr.on('flash', function( result ) {
   *   if (result) {
   *    // the browser has flash
   *   } else {
   *     // the browser does not have flash
   *   }
   * });
   * ```
   */

  ModernizrProto.on = function (feature, cb) {
    // Create the list of listeners if it doesn't exist
    if (!this._l[feature]) {
      this._l[feature] = [];
    }

    // Push this test on to the listener list
    this._l[feature].push(cb);

    // If it's already been resolved, trigger it on next tick
    if (Modernizr.hasOwnProperty(feature)) {
      // Next Tick
      setTimeout(function () {
        Modernizr._trigger(feature, Modernizr[feature]);
      }, 0);
    }
  };

  /**
   * _trigger is the private function used to signal test completion and run any
   * callbacks registered through [Modernizr.on](#modernizr-on)
   *
   * @memberof Modernizr
   * @name Modernizr._trigger
   * @access private
   * @function _trigger
   * @param {string} feature - string name of the feature detect
   * @param {function|boolean} [res] - A feature detection function, or the boolean =
   * result of a feature detection function
   */

  ModernizrProto._trigger = function (feature, res) {
    if (!this._l[feature]) {
      return;
    }

    var cbs = this._l[feature];

    // Force async
    setTimeout(function () {
      var i, cb;
      for (i = 0; i < cbs.length; i++) {
        cb = cbs[i];
        cb(res);
      }
    }, 0);

    // Don't trigger these again
    delete this._l[feature];
  };

  /**
   * addTest allows you to define your own feature detects that are not currently
   * included in Modernizr (under the covers it's the exact same code Modernizr
   * uses for its own [feature detections](https://github.com/Modernizr/Modernizr/tree/master/feature-detects)). Just like the offical detects, the result
   * will be added onto the Modernizr object, as well as an appropriate className set on
   * the html element when configured to do so
   *
   * @memberof Modernizr
   * @name Modernizr.addTest
   * @optionName Modernizr.addTest()
   * @optionProp addTest
   * @access public
   * @function addTest
   * @param {string|object} feature - The string name of the feature detect, or an
   * object of feature detect names and test
   * @param {function|boolean} test - Function returning true if feature is supported,
   * false if not. Otherwise a boolean representing the results of a feature detection
   * @example
   *
   * The most common way of creating your own feature detects is by calling
   * `Modernizr.addTest` with a string (preferably just lowercase, without any
   * punctuation), and a function you want executed that will return a boolean result
   *
   * ```js
   * Modernizr.addTest('itsTuesday', function() {
   *  var d = new Date();
   *  return d.getDay() === 2;
   * });
   * ```
   *
   * When the above is run, it will set Modernizr.itstuesday to `true` when it is tuesday,
   * and to `false` every other day of the week. One thing to notice is that the names of
   * feature detect functions are always lowercased when added to the Modernizr object. That
   * means that `Modernizr.itsTuesday` will not exist, but `Modernizr.itstuesday` will.
   *
   *
   *  Since we only look at the returned value from any feature detection function,
   *  you do not need to actually use a function. For simple detections, just passing
   *  in a statement that will return a boolean value works just fine.
   *
   * ```js
   * Modernizr.addTest('hasJquery', 'jQuery' in window);
   * ```
   *
   * Just like before, when the above runs `Modernizr.hasjquery` will be true if
   * jQuery has been included on the page. Not using a function saves a small amount
   * of overhead for the browser, as well as making your code much more readable.
   *
   * Finally, you also have the ability to pass in an object of feature names and
   * their tests. This is handy if you want to add multiple detections in one go.
   * The keys should always be a string, and the value can be either a boolean or
   * function that returns a boolean.
   *
   * ```js
   * var detects = {
   *  'hasjquery': 'jQuery' in window,
   *  'itstuesday': function() {
   *    var d = new Date();
   *    return d.getDay() === 2;
   *  }
   * }
   *
   * Modernizr.addTest(detects);
   * ```
   *
   * There is really no difference between the first methods and this one, it is
   * just a convenience to let you write more readable code.
   */

  function addTest(feature, test) {

    if ((typeof feature === 'undefined' ? 'undefined' : _typeof(feature)) == 'object') {
      for (var key in feature) {
        if (hasOwnProp(feature, key)) {
          addTest(key, feature[key]);
        }
      }
    } else {

      feature = feature.toLowerCase();
      var featureNameSplit = feature.split('.');
      var last = Modernizr[featureNameSplit[0]];

      // Again, we don't check for parent test existence. Get that right, though.
      if (featureNameSplit.length == 2) {
        last = last[featureNameSplit[1]];
      }

      if (typeof last != 'undefined') {
        // we're going to quit if you're trying to overwrite an existing test
        // if we were to allow it, we'd do this:
        //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
        //   docElement.className = docElement.className.replace( re, '' );
        // but, no rly, stuff 'em.
        return Modernizr;
      }

      test = typeof test == 'function' ? test() : test;

      // Set the value (this is the magic, right here).
      if (featureNameSplit.length == 1) {
        Modernizr[featureNameSplit[0]] = test;
      } else {
        // cast to a Boolean, if not one already
        /* jshint -W053 */
        if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
          Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
        }

        Modernizr[featureNameSplit[0]][featureNameSplit[1]] = test;
      }

      // Set a single class (either `feature` or `no-feature`)
      /* jshint -W041 */
      setClasses([(!!test && test != false ? '' : 'no-') + featureNameSplit.join('-')]);
      /* jshint +W041 */

      // Trigger the event
      Modernizr._trigger(feature, test);
    }

    return Modernizr; // allow chaining.
  }

  // After all the tests are run, add self to the Modernizr prototype
  Modernizr._q.push(function () {
    ModernizrProto.addTest = addTest;
  });

  var cssomPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.split(' ') : [];
  ModernizrProto._cssomPrefixes = cssomPrefixes;

  /**
   * atRule returns a given CSS property at-rule (eg @keyframes), possibly in
   * some prefixed form, or false, in the case of an unsupported rule
   *
   * @memberof Modernizr
   * @name Modernizr.atRule
   * @optionName Modernizr.atRule()
   * @optionProp atRule
   * @access public
   * @function atRule
   * @param {string} prop - String name of the @-rule to test for
   * @returns {string|boolean} The string representing the (possibly prefixed)
   * valid version of the @-rule, or `false` when it is unsupported.
   * @example
   * ```js
   *  var keyframes = Modernizr.atRule('@keyframes');
   *
   *  if (keyframes) {
   *    // keyframes are supported
   *    // could be `@-webkit-keyframes` or `@keyframes`
   *  } else {
   *    // keyframes === `false`
   *  }
   * ```
   *
   */

  var atRule = function atRule(prop) {
    var length = prefixes.length;
    var cssrule = window.CSSRule;
    var rule;

    if (typeof cssrule === 'undefined') {
      return undefined;
    }

    if (!prop) {
      return false;
    }

    // remove literal @ from beginning of provided property
    prop = prop.replace(/^@/, '');

    // CSSRules use underscores instead of dashes
    rule = prop.replace(/-/g, '_').toUpperCase() + '_RULE';

    if (rule in cssrule) {
      return '@' + prop;
    }

    for (var i = 0; i < length; i++) {
      // prefixes gives us something like -o-, and we want O_
      var prefix = prefixes[i];
      var thisRule = prefix.toUpperCase() + '_' + rule;

      if (thisRule in cssrule) {
        return '@-' + prefix.toLowerCase() + '-' + prop;
      }
    }

    return false;
  };

  ModernizrProto.atRule = atRule;

  /**
   * createElement is a convenience wrapper around document.createElement. Since we
   * use createElement all over the place, this allows for (slightly) smaller code
   * as well as abstracting away issues with creating elements in contexts other than
   * HTML documents (e.g. SVG documents).
   *
   * @access private
   * @function createElement
   * @returns {HTMLElement|SVGElement} An HTML or SVG element
   */

  function createElement() {
    if (typeof document.createElement !== 'function') {
      // This is the case in IE7, where the type of createElement is "object".
      // For this reason, we cannot call apply() as Object is not a Function.
      return document.createElement(arguments[0]);
    } else if (isSVG) {
      return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
    } else {
      return document.createElement.apply(document, arguments);
    }
  }

  ;

  /**
   * Modernizr.hasEvent() detects support for a given event
   *
   * @memberof Modernizr
   * @name Modernizr.hasEvent
   * @optionName Modernizr.hasEvent()
   * @optionProp hasEvent
   * @access public
   * @function hasEvent
   * @param  {string|*} eventName - the name of an event to test for (e.g. "resize")
   * @param  {Element|string} [element=HTMLDivElement] - is the element|document|window|tagName to test on
   * @returns {boolean}
   * @example
   *  `Modernizr.hasEvent` lets you determine if the browser supports a supplied event.
   *  By default, it does this detection on a div element
   *
   * ```js
   *  hasEvent('blur') // true;
   * ```
   *
   * However, you are able to give an object as a second argument to hasEvent to
   * detect an event on something other than a div.
   *
   * ```js
   *  hasEvent('devicelight', window) // true;
   * ```
   *
   */

  var hasEvent = function () {

    // Detect whether event support can be detected via `in`. Test on a DOM element
    // using the "blur" event b/c it should always exist. bit.ly/event-detection
    var needsFallback = !('onblur' in document.documentElement);

    function inner(eventName, element) {

      var isSupported;
      if (!eventName) {
        return false;
      }
      if (!element || typeof element === 'string') {
        element = createElement(element || 'div');
      }

      // Testing via the `in` operator is sufficient for modern browsers and IE.
      // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and
      // "resize", whereas `in` "catches" those.
      eventName = 'on' + eventName;
      isSupported = eventName in element;

      // Fallback technique for old Firefox - bit.ly/event-detection
      if (!isSupported && needsFallback) {
        if (!element.setAttribute) {
          // Switch to generic element if it lacks `setAttribute`.
          // It could be the `document`, `window`, or something else.
          element = createElement('div');
        }

        element.setAttribute(eventName, '');
        isSupported = typeof element[eventName] === 'function';

        if (element[eventName] !== undefined) {
          // If property was created, "remove it" by setting value to `undefined`.
          element[eventName] = undefined;
        }
        element.removeAttribute(eventName);
      }

      return isSupported;
    }
    return inner;
  }();

  ModernizrProto.hasEvent = hasEvent;

  /**
   * prefixedCSSValue is a way test for prefixed css properties (e.g. display: -webkit-flex)
   *
   * @memberof Modernizr
   * @name Modernizr.prefixedCSSValue
   * @optionName Modernizr.prefixedCSSValue()
   * @optionProp prefixedCSSValue
   * @access public
   * @function prefixedCSSValue
   * @param {string} prop - String name of the property to test for
   * @param {string} value - String value of the non prefixed version of the value you want to test for
   * @returns {string|false} The string representing the (possibly prefixed)
   * valid version of the property, or `false` when it is unsupported.
   * @example
   *
   * `Modernizr.prefixedCSSValue` is a way test for prefixed css properties (e.g. display: -webkit-flex)
   *
   * ```js
   * Modernizr.prefixedCSSValue('background', 'linear-gradient(left, red, red)')
   * ```
   *
   */

  var prefixedCSSValue = function prefixedCSSValue(prop, value) {
    var result = false;
    var elem = createElement('div');
    var style = elem.style;

    if (prop in style) {
      var i = domPrefixes.length;

      style[prop] = value;
      result = style[prop];

      while (i-- && !result) {
        style[prop] = '-' + domPrefixes[i] + '-' + value;
        result = style[prop];
      }
    }

    if (result === '') {
      result = false;
    }

    return result;
  };

  ModernizrProto.prefixedCSSValue = prefixedCSSValue;

  /**
   * cssToDOM takes a kebab-case string and converts it to camelCase
   * e.g. box-sizing -> boxSizing
   *
   * @access private
   * @function cssToDOM
   * @param {string} name - String name of kebab-case prop we want to convert
   * @returns {string} The camelCase version of the supplied name
   */

  function cssToDOM(name) {
    return name.replace(/([a-z])-([a-z])/g, function (str, m1, m2) {
      return m1 + m2.toUpperCase();
    }).replace(/^-/, '');
  }
  ;

  /**
   * domToCSS takes a camelCase string and converts it to kebab-case
   * e.g. boxSizing -> box-sizing
   *
   * @access private
   * @function domToCSS
   * @param {string} name - String name of camelCase prop we want to convert
   * @returns {string} The kebab-case version of the supplied name
   */

  function domToCSS(name) {
    return name.replace(/([A-Z])/g, function (str, m1) {
      return '-' + m1.toLowerCase();
    }).replace(/^ms-/, '-ms-');
  }
  ;

  /**
   * getBody returns the body of a document, or an element that can stand in for
   * the body if a real body does not exist
   *
   * @access private
   * @function getBody
   * @returns {HTMLElement|SVGElement} Returns the real body of a document, or an
   * artificially created element that stands in for the body
   */

  function getBody() {
    // After page load injecting a fake body doesn't work so check if body exists
    var body = document.body;

    if (!body) {
      // Can't use the real body create a fake one.
      body = createElement(isSVG ? 'svg' : 'body');
      body.fake = true;
    }

    return body;
  }

  ;

  /**
   * injectElementWithStyles injects an element with style element and some CSS rules
   *
   * @access private
   * @function injectElementWithStyles
   * @param {string} rule - String representing a css rule
   * @param {function} callback - A function that is used to test the injected element
   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
   * @returns {boolean}
   */

  function injectElementWithStyles(rule, callback, nodes, testnames) {
    var mod = 'modernizr';
    var style;
    var ret;
    var node;
    var docOverflow;
    var div = createElement('div');
    var body = getBody();

    if (parseInt(nodes, 10)) {
      // In order not to give false positives we create a node for each test
      // This also allows the method to scale for unspecified uses
      while (nodes--) {
        node = createElement('div');
        node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
        div.appendChild(node);
      }
    }

    style = createElement('style');
    style.type = 'text/css';
    style.id = 's' + mod;

    // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
    // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
    (!body.fake ? div : body).appendChild(style);
    body.appendChild(div);

    if (style.styleSheet) {
      style.styleSheet.cssText = rule;
    } else {
      style.appendChild(document.createTextNode(rule));
    }
    div.id = mod;

    if (body.fake) {
      //avoid crashing IE8, if background image is used
      body.style.background = '';
      //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
      body.style.overflow = 'hidden';
      docOverflow = docElement.style.overflow;
      docElement.style.overflow = 'hidden';
      docElement.appendChild(body);
    }

    ret = callback(div, rule);
    // If this is done after page load we don't want to remove the body so check if body exists
    if (body.fake) {
      body.parentNode.removeChild(body);
      docElement.style.overflow = docOverflow;
      // Trigger layout so kinetic scrolling isn't disabled in iOS6+
      docElement.offsetHeight;
    } else {
      div.parentNode.removeChild(div);
    }

    return !!ret;
  }

  ;

  /**
   * Modernizr.mq tests a given media query, live against the current state of the window
   * adapted from matchMedia polyfill by Scott Jehl and Paul Irish
   * gist.github.com/786768
   *
   * @memberof Modernizr
   * @name Modernizr.mq
   * @optionName Modernizr.mq()
   * @optionProp mq
   * @access public
   * @function mq
   * @param {string} mq - String of the media query we want to test
   * @returns {boolean}
   * @example
   * Modernizr.mq allows for you to programmatically check if the current browser
   * window state matches a media query.
   *
   * ```js
   *  var query = Modernizr.mq('(min-width: 900px)');
   *
   *  if (query) {
   *    // the browser window is larger than 900px
   *  }
   * ```
   *
   * Only valid media queries are supported, therefore you must always include values
   * with your media query
   *
   * ```js
   * // good
   *  Modernizr.mq('(min-width: 900px)');
   *
   * // bad
   *  Modernizr.mq('min-width');
   * ```
   *
   * If you would just like to test that media queries are supported in general, use
   *
   * ```js
   *  Modernizr.mq('only all'); // true if MQ are supported, false if not
   * ```
   *
   *
   * Note that if the browser does not support media queries (e.g. old IE) mq will
   * always return false.
   */

  var mq = function () {
    var matchMedia = window.matchMedia || window.msMatchMedia;
    if (matchMedia) {
      return function (mq) {
        var mql = matchMedia(mq);
        return mql && mql.matches || false;
      };
    }

    return function (mq) {
      var bool = false;

      injectElementWithStyles('@media ' + mq + ' { #modernizr { position: absolute; } }', function (node) {
        bool = (window.getComputedStyle ? window.getComputedStyle(node, null) : node.currentStyle).position == 'absolute';
      });

      return bool;
    };
  }();

  ModernizrProto.mq = mq;

  /**
   * testStyles injects an element with style element and some CSS rules
   *
   * @memberof Modernizr
   * @name Modernizr.testStyles
   * @optionName Modernizr.testStyles()
   * @optionProp testStyles
   * @access public
   * @function testStyles
   * @param {string} rule - String representing a css rule
   * @param {function} callback - A function that is used to test the injected element
   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
   * @returns {boolean}
   * @example
   *
   * `Modernizr.testStyles` takes a CSS rule and injects it onto the current page
   * along with (possibly multiple) DOM elements. This lets you check for features
   * that can not be detected by simply checking the [IDL](https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Interface_development_guide/IDL_interface_rules).
   *
   * ```js
   * Modernizr.testStyles('#modernizr { width: 9px; color: papayawhip; }', function(elem, rule) {
   *   // elem is the first DOM node in the page (by default #modernizr)
   *   // rule is the first argument you supplied - the CSS rule in string form
   *
   *   addTest('widthworks', elem.style.width === '9px')
   * });
   * ```
   *
   * If your test requires multiple nodes, you can include a third argument
   * indicating how many additional div elements to include on the page. The
   * additional nodes are injected as children of the `elem` that is returned as
   * the first argument to the callback.
   *
   * ```js
   * Modernizr.testStyles('#modernizr {width: 1px}; #modernizr2 {width: 2px}', function(elem) {
   *   document.getElementById('modernizr').style.width === '1px'; // true
   *   document.getElementById('modernizr2').style.width === '2px'; // true
   *   elem.firstChild === document.getElementById('modernizr2'); // true
   * }, 1);
   * ```
   *
   * By default, all of the additional elements have an ID of `modernizr[n]`, where
   * `n` is its index (e.g. the first additional, second overall is `#modernizr2`,
   * the second additional is `#modernizr3`, etc.).
   * If you want to have more meaningful IDs for your function, you can provide
   * them as the fourth argument, as an array of strings
   *
   * ```js
   * Modernizr.testStyles('#foo {width: 10px}; #bar {height: 20px}', function(elem) {
   *   elem.firstChild === document.getElementById('foo'); // true
   *   elem.lastChild === document.getElementById('bar'); // true
   * }, 2, ['foo', 'bar']);
   * ```
   *
   */

  var testStyles = ModernizrProto.testStyles = injectElementWithStyles;

  /**
   * contains checks to see if a string contains another string
   *
   * @access private
   * @function contains
   * @param {string} str - The string we want to check for substrings
   * @param {string} substr - The substring we want to search the first string for
   * @returns {boolean}
   */

  function contains(str, substr) {
    return !! ~('' + str).indexOf(substr);
  }

  ;

  /**
   * nativeTestProps allows for us to use native feature detection functionality if available.
   * some prefixed form, or false, in the case of an unsupported rule
   *
   * @access private
   * @function nativeTestProps
   * @param {array} props - An array of property names
   * @param {string} value - A string representing the value we want to check via @supports
   * @returns {boolean|undefined} A boolean when @supports exists, undefined otherwise
   */

  // Accepts a list of property names and a single value
  // Returns `undefined` if native detection not available
  function nativeTestProps(props, value) {
    var i = props.length;
    // Start with the JS API: http://www.w3.org/TR/css3-conditional/#the-css-interface
    if ('CSS' in window && 'supports' in window.CSS) {
      // Try every prefixed variant of the property
      while (i--) {
        if (window.CSS.supports(domToCSS(props[i]), value)) {
          return true;
        }
      }
      return false;
    }
    // Otherwise fall back to at-rule (for Opera 12.x)
    else if ('CSSSupportsRule' in window) {
        // Build a condition string for every prefixed variant
        var conditionText = [];
        while (i--) {
          conditionText.push('(' + domToCSS(props[i]) + ':' + value + ')');
        }
        conditionText = conditionText.join(' or ');
        return injectElementWithStyles('@supports (' + conditionText + ') { #modernizr { position: absolute; } }', function (node) {
          return getComputedStyle(node, null).position == 'absolute';
        });
      }
    return undefined;
  }
  ;

  /**
   * fnBind is a super small [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) polyfill.
   *
   * @access private
   * @function fnBind
   * @param {function} fn - a function you want to change `this` reference to
   * @param {object} that - the `this` you want to call the function with
   * @returns {function} The wrapped version of the supplied function
   */

  function fnBind(fn, that) {
    return function () {
      return fn.apply(that, arguments);
    };
  }

  ;

  /**
   * testDOMProps is a generic DOM property test; if a browser supports
   *   a certain property, it won't return undefined for it.
   *
   * @access private
   * @function testDOMProps
   * @param {array.<string>} props - An array of properties to test for
   * @param {object} obj - An object or Element you want to use to test the parameters again
   * @param {boolean|object} elem - An Element to bind the property lookup again. Use `false` to prevent the check
   */
  function testDOMProps(props, obj, elem) {
    var item;

    for (var i in props) {
      if (props[i] in obj) {

        // return the property name as a string
        if (elem === false) {
          return props[i];
        }

        item = obj[props[i]];

        // let's bind a function
        if (is(item, 'function')) {
          // bind to obj unless overriden
          return fnBind(item, elem || obj);
        }

        // return the unbound function or obj or value
        return item;
      }
    }
    return false;
  }

  ;

  /**
   * Create our "modernizr" element that we do most feature tests on.
   *
   * @access private
   */

  var modElem = {
    elem: createElement('modernizr')
  };

  // Clean up this element
  Modernizr._q.push(function () {
    delete modElem.elem;
  });

  var mStyle = {
    style: modElem.elem.style
  };

  // kill ref for gc, must happen before mod.elem is removed, so we unshift on to
  // the front of the queue.
  Modernizr._q.unshift(function () {
    delete mStyle.style;
  });

  // testProps is a generic CSS / DOM property test.

  // In testing support for a given CSS property, it's legit to test:
  //    `elem.style[styleName] !== undefined`
  // If the property is supported it will return an empty string,
  // if unsupported it will return undefined.

  // We'll take advantage of this quick test and skip setting a style
  // on our modernizr element, but instead just testing undefined vs
  // empty string.

  // Property names can be provided in either camelCase or kebab-case.

  function testProps(props, prefixed, value, skipValueTest) {
    skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest;

    // Try native detect first
    if (!is(value, 'undefined')) {
      var result = nativeTestProps(props, value);
      if (!is(result, 'undefined')) {
        return result;
      }
    }

    // Otherwise do it properly
    var afterInit, i, propsLength, prop, before;

    // If we don't have a style element, that means we're running async or after
    // the core tests, so we'll need to create our own elements to use

    // inside of an SVG element, in certain browsers, the `style` element is only
    // defined for valid tags. Therefore, if `modernizr` does not have one, we
    // fall back to a less used element and hope for the best.
    var elems = ['modernizr', 'tspan'];
    while (!mStyle.style) {
      afterInit = true;
      mStyle.modElem = createElement(elems.shift());
      mStyle.style = mStyle.modElem.style;
    }

    // Delete the objects if we created them.
    function cleanElems() {
      if (afterInit) {
        delete mStyle.style;
        delete mStyle.modElem;
      }
    }

    propsLength = props.length;
    for (i = 0; i < propsLength; i++) {
      prop = props[i];
      before = mStyle.style[prop];

      if (contains(prop, '-')) {
        prop = cssToDOM(prop);
      }

      if (mStyle.style[prop] !== undefined) {

        // If value to test has been passed in, do a set-and-check test.
        // 0 (integer) is a valid property value, so check that `value` isn't
        // undefined, rather than just checking it's truthy.
        if (!skipValueTest && !is(value, 'undefined')) {

          // Needs a try catch block because of old IE. This is slow, but will
          // be avoided in most cases because `skipValueTest` will be used.
          try {
            mStyle.style[prop] = value;
          } catch (e) {}

          // If the property value has changed, we assume the value used is
          // supported. If `value` is empty string, it'll fail here (because
          // it hasn't changed), which matches how browsers have implemented
          // CSS.supports()
          if (mStyle.style[prop] != before) {
            cleanElems();
            return prefixed == 'pfx' ? prop : true;
          }
        }
        // Otherwise just return true, or the property name if this is a
        // `prefixed()` call
        else {
            cleanElems();
            return prefixed == 'pfx' ? prop : true;
          }
      }
    }
    cleanElems();
    return false;
  }

  ;

  /**
   * testProp() investigates whether a given style property is recognized
   * Property names can be provided in either camelCase or kebab-case.
   *
   * @memberof Modernizr
   * @name Modernizr.testProp
   * @access public
   * @optionName Modernizr.testProp()
   * @optionProp testProp
   * @function testProp
   * @param {string} prop - Name of the CSS property to check
   * @param {string} [value] - Name of the CSS value to check
   * @param {boolean} [useValue] - Whether or not to check the value if @supports isn't supported
   * @returns {boolean}
   * @example
   *
   * Just like [testAllProps](#modernizr-testallprops), only it does not check any vendor prefixed
   * version of the string.
   *
   * Note that the property name must be provided in camelCase (e.g. boxSizing not box-sizing)
   *
   * ```js
   * Modernizr.testProp('pointerEvents')  // true
   * ```
   *
   * You can also provide a value as an optional second argument to check if a
   * specific value is supported
   *
   * ```js
   * Modernizr.testProp('pointerEvents', 'none') // true
   * Modernizr.testProp('pointerEvents', 'penguin') // false
   * ```
   */

  var testProp = ModernizrProto.testProp = function (prop, value, useValue) {
    return testProps([prop], undefined, value, useValue);
  };

  /**
   * testPropsAll tests a list of DOM properties we want to check against.
   * We specify literally ALL possible (known and/or likely) properties on
   * the element including the non-vendor prefixed one, for forward-
   * compatibility.
   *
   * @access private
   * @function testPropsAll
   * @param {string} prop - A string of the property to test for
   * @param {string|object} [prefixed] - An object to check the prefixed properties on. Use a string to skip
   * @param {HTMLElement|SVGElement} [elem] - An element used to test the property and value against
   * @param {string} [value] - A string of a css value
   * @param {boolean} [skipValueTest] - An boolean representing if you want to test if value sticks when set
   */
  function testPropsAll(prop, prefixed, elem, value, skipValueTest) {

    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
        props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

    // did they call .prefixed('boxSizing') or are we just testing a prop?
    if (is(prefixed, 'string') || is(prefixed, 'undefined')) {
      return testProps(props, prefixed, value, skipValueTest);

      // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
    } else {
        props = (prop + ' ' + domPrefixes.join(ucProp + ' ') + ucProp).split(' ');
        return testDOMProps(props, prefixed, elem);
      }
  }

  // Modernizr.testAllProps() investigates whether a given style property,
  // or any of its vendor-prefixed variants, is recognized
  //
  // Note that the property names must be provided in the camelCase variant.
  // Modernizr.testAllProps('boxSizing')
  ModernizrProto.testAllProps = testPropsAll;

  /**
   * prefixed returns the prefixed or nonprefixed property name variant of your input
   *
   * @memberof Modernizr
   * @name Modernizr.prefixed
   * @optionName Modernizr.prefixed()
   * @optionProp prefixed
   * @access public
   * @function prefixed
   * @param {string} prop - String name of the property to test for
   * @param {object} [obj] - An object to test for the prefixed properties on
   * @param {HTMLElement} [elem] - An element used to test specific properties against
   * @returns {string|false} The string representing the (possibly prefixed) valid
   * version of the property, or `false` when it is unsupported.
   * @example
   *
   * Modernizr.prefixed takes a string css value in the DOM style camelCase (as
   * opposed to the css style kebab-case) form and returns the (possibly prefixed)
   * version of that property that the browser actually supports.
   *
   * For example, in older Firefox...
   * ```js
   * prefixed('boxSizing')
   * ```
   * returns 'MozBoxSizing'
   *
   * In newer Firefox, as well as any other browser that support the unprefixed
   * version would simply return `boxSizing`. Any browser that does not support
   * the property at all, it will return `false`.
   *
   * By default, prefixed is checked against a DOM element. If you want to check
   * for a property on another object, just pass it as a second argument
   *
   * ```js
   * var rAF = prefixed('requestAnimationFrame', window);
   *
   * raf(function() {
   *  renderFunction();
   * })
   * ```
   *
   * Note that this will return _the actual function_ - not the name of the function.
   * If you need the actual name of the property, pass in `false` as a third argument
   *
   * ```js
   * var rAFProp = prefixed('requestAnimationFrame', window, false);
   *
   * rafProp === 'WebkitRequestAnimationFrame' // in older webkit
   * ```
   *
   * One common use case for prefixed is if you're trying to determine which transition
   * end event to bind to, you might do something like...
   * ```js
   * var transEndEventNames = {
   *     'WebkitTransition' : 'webkitTransitionEnd', * Saf 6, Android Browser
   *     'MozTransition'    : 'transitionend',       * only for FF < 15
   *     'transition'       : 'transitionend'        * IE10, Opera, Chrome, FF 15+, Saf 7+
   * };
   *
   * var transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];
   * ```
   *
   * If you want a similar lookup, but in kebab-case, you can use [prefixedCSS](#modernizr-prefixedcss).
   */

  var prefixed = ModernizrProto.prefixed = function (prop, obj, elem) {
    if (prop.indexOf('@') === 0) {
      return atRule(prop);
    }

    if (prop.indexOf('-') != -1) {
      // Convert kebab-case to camelCase
      prop = cssToDOM(prop);
    }
    if (!obj) {
      return testPropsAll(prop, 'pfx');
    } else {
      // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
      return testPropsAll(prop, obj, elem);
    }
  };

  /**
   * prefixedCSS is just like [prefixed](#modernizr-prefixed), but the returned values are in
   * kebab-case (e.g. `box-sizing`) rather than camelCase (boxSizing).
   *
   * @memberof Modernizr
   * @name Modernizr.prefixedCSS
   * @optionName Modernizr.prefixedCSS()
   * @optionProp prefixedCSS
   * @access public
   * @function prefixedCSS
   * @param {string} prop - String name of the property to test for
   * @returns {string|false} The string representing the (possibly prefixed)
   * valid version of the property, or `false` when it is unsupported.
   * @example
   *
   * `Modernizr.prefixedCSS` is like `Modernizr.prefixed`, but returns the result
   * in hyphenated form
   *
   * ```js
   * Modernizr.prefixedCSS('transition') // '-moz-transition' in old Firefox
   * ```
   *
   * Since it is only useful for CSS style properties, it can only be tested against
   * an HTMLElement.
   *
   * Properties can be passed as both the DOM style camelCase or CSS style kebab-case.
   */

  var prefixedCSS = ModernizrProto.prefixedCSS = function (prop) {
    var prefixedProp = prefixed(prop);
    return prefixedProp && domToCSS(prefixedProp);
  };

  /**
   * testAllProps determines whether a given CSS property is supported in the browser
   *
   * @memberof Modernizr
   * @name Modernizr.testAllProps
   * @optionName Modernizr.testAllProps()
   * @optionProp testAllProps
   * @access public
   * @function testAllProps
   * @param {string} prop - String naming the property to test (either camelCase or kebab-case)
   * @param {string} [value] - String of the value to test
   * @param {boolean} [skipValueTest=false] - Whether to skip testing that the value is supported when using non-native detection
   * @example
   *
   * testAllProps determines whether a given CSS property, in some prefixed form,
   * is supported by the browser.
   *
   * ```js
   * testAllProps('boxSizing')  // true
   * ```
   *
   * It can optionally be given a CSS value in string form to test if a property
   * value is valid
   *
   * ```js
   * testAllProps('display', 'block') // true
   * testAllProps('display', 'penguin') // false
   * ```
   *
   * A boolean can be passed as a third parameter to skip the value check when
   * native detection (@supports) isn't available.
   *
   * ```js
   * testAllProps('shapeOutside', 'content-box', true);
   * ```
   */

  function testAllProps(prop, value, skipValueTest) {
    return testPropsAll(prop, undefined, undefined, value, skipValueTest);
  }
  ModernizrProto.testAllProps = testAllProps;

  // Run each test
  testRunner();

  // Remove the "no-js" class if it exists
  setClasses(classes);

  delete ModernizrProto.addTest;
  delete ModernizrProto.addAsyncTest;

  // Run the things that are supposed to run after the tests
  for (var i = 0; i < Modernizr._q.length; i++) {
    Modernizr._q[i]();
  }

  // Leak Modernizr namespace
  window.Modernizr = Modernizr;

  ;
})(window, document);

/* =========================================================================
 * Svelto - Core - Modernizr (Init)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./vendor/modernizr.js
 * ========================================================================= */

(function (Modernizr) {

  'use strict';

  /* CHECKING */

  var version = Modernizr ? Modernizr._version : false,
      parts = version ? version.split('-')[0].split('.') : false,
      nums = parts ? parts.map(Number) : false,
      supported = nums && nums[0] > 3 || nums[0] === 3 && (nums[1] > 3 || nums[1] === 3 && nums[2] >= 1);

  if (!Modernizr || !supported) {

    throw new Error('Svelto depends upon Modernizr v3.3.1 or higher, dependency not found');
  }
})(window.Modernizr);

/* =========================================================================
 * Svelto - Core - Modernizr - Tests (Clip Path Polygon)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function (Modernizr) {

  'use strict';

  /* CLIP PATH POLYGON */

  Modernizr.addTest('clip-path-polygon', Modernizr.testAllProps('clip-path', 'polygon( 0 0 )'));
})(Modernizr);

/* =========================================================================
 * Svelto - Core - Modernizr - Tests (Clip Path Url)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * @require core/jquery/jquery.js
 * ========================================================================= */

(function (Modernizr, $) {

  'use strict';

  /* CLIP PATH URL */

  $(function () {

    /* SVG */

    var ns = 'http://www.w3.org/2000/svg',
        svg = document.createElementNS(ns, 'svg'),
        clip = document.createElementNS(ns, 'clipPath'),
        rect = document.createElementNS(ns, 'rect');

    clip.setAttribute('id', 'ModernizrClipPath');
    rect.setAttribute('width', '0');

    clip.appendChild(rect);
    svg.appendChild(clip);

    /* ELEMENT */

    var ele = document.createElement('div');

    ele.style.cssText = 'width:2px;height:2px;position:fixed;top:0;left:0;z-index:1000000000;opacity:0;';
    ele.style[Modernizr.prefixed('clip-path')] = 'url(#ModernizrClipPath)';

    /* APPENDING */

    document.body.appendChild(svg);
    document.body.appendChild(ele);

    /* CHECKING */

    var offset = ele.getBoundingClientRect(),
        supported = document.elementFromPoint(offset.left + 1, offset.top + 1) !== ele;

    /* CLEANING */

    document.body.removeChild(ele);
    document.body.removeChild(svg);

    /* EXPORTING */

    Modernizr.addTest('clip-path-url', supported);
  });
})(Modernizr, jQuery);

/* =========================================================================
 * Svelto - Core - Modernizr - Tests (Flexbox)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function (Modernizr) {

  'use strict';

  /* FLEXBOX */

  Modernizr.addTest('flexbox', Modernizr.testAllProps('flexBasis', '1px'));
})(Modernizr);

/* =========================================================================
 * Svelto - Core - Modernizr - Tests (Flexbox Legacy)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function (Modernizr) {

  'use strict';

  /* FLEXBOX LEGACY */

  Modernizr.addTest('flexbox-legacy', Modernizr.testAllProps('boxDirection', 'reverse'));
})(Modernizr);

/* =========================================================================
 * Svelto - Core - Modernizr - Tests (Flexbox Tweener)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function (Modernizr) {

  'use strict';

  /* FLEXBOX TWEENER */

  Modernizr.addTest('flexbox-tweener', Modernizr.testAllProps('flexAlign', 'end'));
})(Modernizr);

/* =========================================================================
 * Svelto - Core - Modernizr - Tests (Overlay Scrollbars)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function (Modernizr) {

  'use strict';

  /* OVERLAY SCROLLBARS */

  var overlay = Modernizr.testStyles('#modernizr {width:100px;height:100px;overflow:scroll}', function (ele) {
    return ele.offsetWidth === ele.clientWidth;
  });

  Modernizr.addTest('overlay-scrollbars', overlay);
})(Modernizr);

/* =========================================================================
 * Svelto - Core - Modernizr - Tests (Position Sticky)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function (Modernizr) {

  'use strict';

  /* POSITION STICKY */

  Modernizr.addTest('position-sticky', Modernizr.testAllProps('position', 'sticky'));
})(Modernizr);

/* =========================================================================
 * Svelto - Core - Modernizr - Tests (Scrollbar size)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function (Modernizr) {

  'use strict';

  /* SCROLLBAR SIZE */

  var size = void 0;

  Modernizr.testStyles('#modernizr {width:100px;height:100px;overflow:scroll}', function (ele) {
    return size = ele.offsetWidth - ele.clientWidth;
  });

  Modernizr.addTest('scrollbar-size-' + size, true);
})(Modernizr);

/* =========================================================================
 * Svelto - Core - Modernizr - Tests
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./clip_path_polygon.js
 * @require ./clip_path_url.js
 * @require ./flexbox.js
 * @require ./flexbox_legacy.js
 * @require ./flexbox_tweener.js
 * @require ./overlay_scrollbars.js
 * @require ./position_sticky.js
 * @require ./scrollbar_size.js
 * ========================================================================= */

/* =========================================================================
 * Svelto - Core - Modernizr
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./init.js
 * @require ./tests/tests.js
 * ========================================================================= */

/* =========================================================================
 * Svelto - Core - Svelto
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/jquery/jquery.js
 * @require core/lodash/lodash.js
 * @require core/modernizr/modernizr.js
 * ========================================================================= */

(function () {

  'use strict';

  /* SVELTO */

  var Svelto = {
    VERSION: '0.5.1',
    $: jQuery,
    _: lodash,
    Modernizr: Modernizr,
    Widgets: {}, // Widgets' classes namespace
    Templates: {} // Widgets' templates namespace
  };

  /* EXPORT */

  window.Svelto = Svelto;
})();

/* =========================================================================
 * Svelto - Core - Animations
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
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
 * Svelto - Core - Breakpoints
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ($, _, Svelto) {

  'use strict';

  /* BREAKPOINTS */

  var Breakpoints = {
    xsmall: 'xs',
    small: 'sm',
    medium: 'md',
    large: 'lg',
    xlarge: 'xl',
    widths: {
      xsmall: 0,
      small: 512,
      medium: 768,
      large: 1024,
      xlarge: 1216
    }
  };

  /* EXPORT */

  Svelto.Breakpoints = Breakpoints;
})(Svelto.$, Svelto._, Svelto);

/* =========================================================================
 * Svelto - Core - Breakpoint
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/breakpoints/breakpoints.js
 * @require core/svelto/svelto.js
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

      var widths = _.sortBy(_.values(Breakpoints.widths)),
          width = $window.width();

      var _loop = function _loop(i, l) {

        if (width >= widths[i] && (i === l - 1 || width < widths[i + 1])) {

          return {
            v: _.findKey(Breakpoints.widths, function (width) {
              return width === widths[i];
            })
          };
        }
      };

      for (var i = 0, l = widths.length; i < l; i++) {
        var _ret = _loop(i, l);

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
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
 * Svelto - Core - Browser
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ($, _, Svelto) {

  'use strict';

  /* VARIABLES */

  var userAgent = navigator.userAgent ? navigator.userAgent.toLowerCase() : '',
      vendor = navigator.vendor ? navigator.vendor.toLowerCase() : '',
      // Fixes an IE10 bug, `navigator.vendor` it's `undefined` there
  appVersion = navigator.appVersion ? navigator.appVersion.toLowerCase() : '';

  /* CHECKS */

  var isOpera = /^Opera\//i.test(userAgent) || /\x20OPR\//i.test(userAgent),
      /* Opera <= 12 || Opera >= 15 */
  isIpod = /ipod/i.test(userAgent),
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
      chrome: !isOpera && /chrome|chromium/i.test(userAgent) && /google inc/.test(vendor),
      firefox: /firefox/i.test(userAgent),
      edge: /(edge)\/((\d+)?[\w\.]+)/i.test(userAgent),
      ie: /msie/i.test(userAgent) || 'ActiveXObject' in window, /* IE || EDGE */
      opera: isOpera,
      safari: /safari/i.test(userAgent) && /apple computer/i.test(vendor),
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
 * Svelto - Core - Colors
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ($, _, Svelto) {

  'use strict';

  /* COLORS */

  var Colors = {
    primary: 'primary',
    secondary: 'secondary',
    tertiary: 'tertiary',
    quaternary: 'quaternary',

    black: 'black',
    blue: 'blue',
    brown: 'brown',
    gray: 'gray',
    green: 'green',
    olive: 'olive',
    orange: 'orange',
    pink: 'pink',
    purple: 'purple',
    red: 'red',
    teal: 'teal',
    violet: 'violet',
    white: 'white',
    yellow: 'yellow',

    error: 'error',
    success: 'success',
    warning: 'warning',

    base: 'base',
    inherit: 'inherit',
    transparent: 'transparent'
  };

  /* EXPORT */

  Svelto.Colors = Colors;
})(Svelto.$, Svelto._, Svelto);

/* =========================================================================
 * Svelto - Core - Cookie
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * Fork of https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie - Mozilla
 * =========================================================================
 * @require core/svelto/svelto.js
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
 * Svelto - Core - Keyboard
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/browser/browser.js
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ($, _, Svelto, Browser) {

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

        // It only supports ctrl/cmd/meta/alt/shift/char/Keyboard.keys[charName] //TODO: Improve it
        // ctrl/cmd/meta are treated as the same key, they are intended as `ctrl` if we are not using a Mac, or as `cmd` if we are instead using it

        var specialKeys = ['ctrl', 'cmd', 'meta', 'alt', 'shift'],
            keys = keystroke.split('+').map(function (key) {
          return key.trim().toLowerCase();
        });

        if ((_.includes(keys, 'ctrl') || _.includes(keys, 'cmd') || _.includes(keys, 'meta')) !== Keyboard.keystroke.hasCtrlOrCmd(event)) return false;
        if (_.includes(keys, 'alt') !== event.altKey) return false;
        if (_.includes(keys, 'shift') !== event.shiftKey) return false;

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = keys[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var key = _step3.value;


            if (!_.includes(specialKeys, key)) {

              if (!(event.keyCode === Keyboard.keys[key.toUpperCase()] || String.fromCharCode(event.keyCode).toLowerCase() === key)) return false;
            }
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

        return true;
      },
      hasCtrlOrCmd: function hasCtrlOrCmd(event) {

        return !Browser.is.mac && event.ctrlKey || Browser.is.mac && event.metaKey;
      }
    }

  };

  /* EXPORT */

  Svelto.Keyboard = Keyboard;
})(Svelto.$, Svelto._, Svelto, Svelto.Browser);

/* =========================================================================
 * Svelto - Core - Mouse
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ($, _, Svelto) {

  'use strict';

  /* MOUSE */

  var Mouse = {
    buttons: {
      LEFT: 0,
      MIDDLE: 1,
      RIGHT: 2
    },
    hasButton: function hasButton(event, button) {
      var orNone = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];


      if ('originalEvent' in event) {

        return Mouse.hasButton(event.originalEvent, button, orNone);
      }

      return orNone && !('button' in event) || event.button === button;
    }
  };

  /* EXPORT */

  Svelto.Mouse = Mouse;
})(Svelto.$, Svelto._, Svelto);

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

(function ($, _, Svelto, Browser, Mouse) {

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

  var _loop2 = function _loop2(name) {

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
    _loop2(name);
  }

  /* ----- POINTER LOGIC ----- */

  /* VARIABLES */

  var target = void 0,
      $target = void 0,
      prevTapTimestamp = 0,
      motion = void 0;

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

    if (Mouse.hasButton(event, Mouse.buttons.LEFT) && (!Browser.is.touchDevice || !motion)) {

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
})(Svelto.$, Svelto._, Svelto, Svelto.Browser, Svelto.Mouse);

/* =========================================================================
 * Svelto - Core - Push state
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

// Monkey patching `history.pushState` so that it will trigger an event that we can then use to properly trigger a `route` event

(function ($, _, Svelto, history) {

  'use strict';

  /* PUSH STATE */

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

/* =========================================================================
 * Svelto - Core - Route
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/push_state/push_state.js
 * @require core/svelto/svelto.js
 * ========================================================================= */

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
 * Svelto - Core - Sizes
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ($, _, Svelto) {

  'use strict';

  /* SIZES */

  var Sizes = {
    xxxxsmall: 'xxxxsmall',
    xxxsmall: 'xxxsmall',
    xxsmall: 'xxsmall',
    xsmall: 'xsmall',
    small: 'small',
    medium: 'medium',
    large: 'large',
    xlarge: 'xlarge',
    xxlarge: 'xxlarge',
    xxxlarge: 'xxxlarge',
    xxxxlarge: 'xxxxlarge'
  };

  /* EXPORT */

  Svelto.Sizes = Sizes;
})(Svelto.$, Svelto._, Svelto);

/* =========================================================================
 * Svelto - Core - Widgetize
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
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
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {

          for (var _iterator4 = $widgets[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var widget = _step4.value;
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {

              for (var _iterator5 = widgetizers[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var _step5$value = _slicedToArray(_step5.value, 2);

                var widgetizer = _step5$value[0];
                var data = _step5$value[1];


                widgetizer($(widget), data);
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
 * Svelto - Core - Factory
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * @require core/widgetize/widgetize.js
 *=========================================================================*/

(function ($, _, Svelto, Widgetize) {

  'use strict';

  /* FACTORY */

  var Factory = {

    /* VARIABLES */

    initializers: ['configure', 'namespace', 'ready', 'widgetize', 'plugin'], // `Factory` methods, in order, to call when initing a `Widget`

    /* METHODS */

    init: function init(Widget, config, namespace) {
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {

        for (var _iterator6 = this.initializers[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var initializer = _step6.value;


          this[initializer](Widget, config, namespace);
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
    },
    instance: function instance(Widget, options, element) {

      var name = Widget.config.name;

      return $.data(element, 'instance.' + name) || new Widget(options, element);
    },


    /* WORKERS */

    configure: function configure(Widget) {
      var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];


      Widget.config = config;
    },
    namespace: function namespace(Widget, config, _namespace) {

      if (_.isObject(_namespace)) {

        var name = _.upperFirst(Widget.config.name);

        _namespace[name] = Widget;
      }
    },
    ready: function ready(Widget) {

      $(Widget.ready);
    },
    widgetize: function widgetize(Widget) {

      if (Widget.config.plugin && _.isString(Widget.config.selector)) {

        Widgetize.add(Widget.config.selector, Widget.widgetize, Widget.config);
      }
    },
    plugin: function plugin(Widget) {

      if (!Widget.config.plugin) return;

      /* NAME */

      var name = Widget.config.name;

      /* JQUERY PLUGIN */

      $.fn[name] = function (options) {

        var isMethodCall = _.isString(options) && options.charAt(0) !== '_'; // Methods starting with '_' are private

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = this[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var element = _step7.value;


            var instance = Factory.instance(Widget, options, element);

            if (isMethodCall && _.isFunction(instance[options])) {

              var returnValue = instance[options].apply(instance, args);

              if (!_.isUndefined(returnValue)) {

                return returnValue;
              }
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

        return this;
      };
    }
  };

  /* EXPORT */

  Svelto.Factory = Factory;
})(Svelto.$, Svelto._, Svelto, Svelto.Widgetize);

/* =========================================================================
 * Svelto - Core - Widget
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/breakpoint/breakpoint.js
 * @require core/breakpoints/breakpoints.js
 * @require core/factory/factory.js
 * @require core/keyboard/keyboard.js
 * @require core/pointer/pointer.js
 * @require core/route/route.js
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Templates, Factory, Pointer, Keyboard, Breakpoints, Breakpoint) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'widget', // The name of widget, it will be used for the the jQuery pluing `$.fn[name]` and for triggering widget events `name + ':' + event`
    plugin: false, // A boolean that defines wheter the Widget is also a jQuery plugin or not
    selector: false, // The selector used to select the website in the DOM, used for `Svelto.Widgetize`
    templates: { // Object containing lodash template strings
      base: false // It will be used as the constructor if no element is provided
    },
    options: {
      characters: {}, // Used to store some characters needed by the widget
      regexes: {}, // Contains the used regexes
      errors: {}, // It contains all the errors that a widget can trigger
      messages: {}, // Messages that the widget somewhere outputs, maybe with a `$.toast`, maybe just logs it
      attributes: {}, // Attributes used by the widget
      datas: {}, // CSS data-* names
      classes: { // CSS classes to attach inside the widget
        disabled: 'disabled', // Attached to disabled widgets
        hidden: 'hidden' // Used to hide an element
      },
      selectors: { // Selectors to use inside the widget
        layout: '.layout, body' // `body` is used as a fallback
      },
      animations: {}, // Object storing all the milliseconds required for each animation to occur
      breakpoints: { // Actions to be executed at specifc breakpoints, every key/val pair should be in the form of `breakpoint-name`: `action`, where `breakpoint-name` is a key of `Breakpoints` and `action` in a defined method (e.g. `xsmall`: `close`). In addition to this every pair must be specified under one of the following keys: `up`, `down`, `only`, mimicking the respective SCSS mixins
        up: {},
        down: {},
        only: {}
      },
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

      this.templatesNamespace = _.upperFirst(this.name);

      if (!(this.templatesNamespace in Templates)) {

        Templates[this.templatesNamespace] = {};

        var _options = { //TODO: Maybe export them
          imports: {
            Templates: Templates,
            self: Templates[this.templatesNamespace]
          },
          variable: 'o'
        };

        for (var template in this.templates) {

          if (this.templates.hasOwnProperty(template) && this.templates[template]) {

            Templates[this.templatesNamespace][template] = _.template(this.templates[template], _options);
          }
        }
      }

      /* ELEMENT */

      this.$element = $(element || (this.templates.base ? this._template('base', this.options) : undefined));
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

      /* HTML */

      this.$html = $(document.documentElement);
      this.html = this.$html[0];

      /* BODY */

      this.$body = $(document.body);
      this.body = this.$body[0];

      /* BINDINGS */

      this.$bindings = $();

      /* ATTACH INSTANCE */

      if (this.element) {

        $.data(this.element, 'instance.' + this.name, this);
      }

      /* SET GUID / GUC */

      this.guid = $.guid++;
      this.guc = this.name + '-' + this.guid;

      /* EVENT NAMESPACE */

      this.eventNamespace = '.swns-' + this.guid;

      /* CALLBACKS */

      this._variables();
      this._init();
      this._events();

      /* BREAKPOINT */

      this.___breakpoint(); // It must be inited before calling `__breakpoint`, since that when `__breakpoint` gets called it may want to reset it (not inited yet) and init it again (with a result of double binding)
      this.__breakpoint();

      /* REMOVE */

      this.___remove();
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

      /* DESTROY */

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
      // Called when the DOM is `ready`, perhaps the widget needs to perform some operations, like `Toast` do for instance

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

      //TODO: Add support for custom data

    }, {
      key: '_on',
      value: function _on(suppressDisabledCheck, $element, events, selector, handler, _onlyOne) {
        var _this = this;

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
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          if (!suppressDisabledCheck && _this.$element.hasClass(_this.options.classes.disabled)) return;

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
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        return this._on.apply(this, args.concat([true]));
      }
    }, {
      key: '_onHover',
      value: function _onHover($element, args) {
        var _this2 = this;

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

      //TODO: Maybe add a _offHover, is it needed?

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

        this._on(true, this.$window, 'breakpoint:change', this.__breakpoint);
      }
    }, {
      key: '__breakpoint',
      value: function __breakpoint() {

        var width = Breakpoints.widths[Breakpoint.current];

        /* UP */

        for (var breakpoint in this.options.breakpoints.up) {

          if (this.options.breakpoints.up.hasOwnProperty(breakpoint)) {

            if (width >= Breakpoints.widths[breakpoint]) {

              this[this.options.breakpoints.up[breakpoint]]();
            }
          }
        }

        /* DOWN */

        for (var _breakpoint in this.options.breakpoints.down) {

          if (this.options.breakpoints.down.hasOwnProperty(_breakpoint)) {

            if (width <= Breakpoints.widths[_breakpoint]) {

              this[this.options.breakpoints.down[_breakpoint]]();
            }
          }
        }

        /* ONLY */

        for (var _breakpoint2 in this.options.breakpoints.only) {

          if (this.options.breakpoints.only.hasOwnProperty(_breakpoint2)) {

            if (width === Breakpoints.widths[_breakpoint2]) {

              this[this.options.breakpoints.only[_breakpoint2]]();
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
            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {

              for (var _iterator8 = keystrokes.split(',')[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                var keystroke = _step8.value;


                if (Keyboard.keystroke.match(event, keystroke)) {

                  this[this.options.keystrokes[keystrokes]]();

                  event.preventDefault();
                  event.stopImmediatePropagation();

                  return;
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
          }
        }
      }

      /* REMOVE */

    }, {
      key: '___remove',
      value: function ___remove() {

        if (this.element) {

          this._on(true, 'remove', this.__remove);
        }
      }
    }, {
      key: '__remove',
      value: function __remove(event) {

        if (!event || event.target === this.element) {

          this.destroy();
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
      key: '_template',
      value: function _template(name) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];


        return Templates[this.templatesNamespace][name](options);
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
      key: 'widgetize',
      value: function widgetize($ele, config) {
        // Called for widgetizing an element

        $ele[config.name]();
      }
    }, {
      key: 'ready',
      value: function ready() {}
    }]);

    return Widget;
  }();

  /* FACTORY */

  Factory.init(Widget, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Templates, Svelto.Factory, Svelto.Pointer, Svelto.Keyboard, Svelto.Breakpoints, Svelto.Breakpoint);

/* =========================================================================
 * Svelto - Widgets - Checkbox
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory, Pointer) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'checkbox',
    plugin: true,
    selector: '.checkbox',
    options: {
      selectors: {
        input: 'input[type="checkbox"]'
      }
    }
  };

  /* CHECKBOX */

  var Checkbox = function (_Widgets$Widget) {
    _inherits(Checkbox, _Widgets$Widget);

    function Checkbox() {
      _classCallCheck(this, Checkbox);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Checkbox).apply(this, arguments));
    }

    _createClass(Checkbox, [{
      key: '_variables',


      /* SPECIAL */

      value: function _variables() {

        this.$checkbox = this.$element;

        this.$input = this.$checkbox.find(this.options.selectors.input);
        this.input = this.$input[0];

        this.inputId = this.$input.attr('id');
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

        this._on(true, Pointer.tap, this.__tap);
      }
    }, {
      key: '__tap',
      value: function __tap(event) {

        if (event.target === this.input || $(event.target).is('label[for="' + this.inputId + '"]')) return;

        this.$input.prop('checked', !this.$input.prop('checked')).trigger('change');
      }
    }]);

    return Checkbox;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Checkbox, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer);

/* =========================================================================
 * Svelto - Widgets - Radio
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require widgets/checkbox/checkbox.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'radio',
    plugin: true,
    selector: '.radio',
    options: {
      selectors: {
        input: 'input[type="radio"]'
      }
    }
  };

  /* RADIO */

  var Radio = function (_Widgets$Checkbox) {
    _inherits(Radio, _Widgets$Checkbox);

    function Radio() {
      _classCallCheck(this, Radio);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Radio).apply(this, arguments));
    }

    _createClass(Radio, [{
      key: '__tap',


      /* TAP */

      value: function __tap(event) {

        if (event.target === this.input || $(event.target).is('label[for="' + this.inputId + '"]')) return;

        if (this.$input.prop('checked')) return;

        this.$input.prop('checked', true).trigger('change');
      }
    }]);

    return Radio;
  }(Widgets.Checkbox);

  /* FACTORY */

  Factory.init(Radio, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Widgets - ClassSwitch
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

//TODO: Maybe rename it

(function ($, _, Svelto, Widgets, Factory, Breakpoints, Breakpoint) {

  'use strict';

  /* VARIABLES */

  var names = _.filter(_.values(Breakpoints), _.isString),
      datas = [];

  var _iteratorNormalCompletion9 = true;
  var _didIteratorError9 = false;
  var _iteratorError9 = undefined;

  try {
    for (var _iterator9 = names[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
      var name = _step9.value;


      datas.push(name + '-up');
      datas.push(name + '-down');
      datas.push(name + '-only');
      datas.push(name);
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

  var selector = datas.map(function (name) {
    return '[data-' + name + ']';
  }).join(',');

  /* CONFIG */

  var config = {
    name: 'classSwitch',
    plugin: true,
    selector: selector,
    options: {
      switch: { // Classes to attach at specifc breakpoints, every key/val pair should be in the form of `breakpoint-name`: `class`, where `breakpoint-name` is a key of `Breakpoints` and `class` can be any class string. In addition to this every pair must be specified under one of the following keys: `up`, `down`, `only`, mimicking the respective SCSS mixins
        up: {},
        down: {},
        only: {}
      }
    }
  };

  /* CLASS SWITCH */

  var ClassSwitch = function (_Widgets$Widget2) {
    _inherits(ClassSwitch, _Widgets$Widget2);

    function ClassSwitch() {
      _classCallCheck(this, ClassSwitch);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(ClassSwitch).apply(this, arguments));
    }

    _createClass(ClassSwitch, [{
      key: '_init',


      /* SPECIAL */

      value: function _init() {

        this.status = { up: {}, down: {}, only: {} };

        this._populate();

        this.__classSwitch();
      }
    }, {
      key: '_events',
      value: function _events() {

        this.___classSwitch();
      }

      /* POPULATE */

    }, {
      key: '_populateBreakpoint',
      value: function _populateBreakpoint(breakpoint) {

        var name = Breakpoints[breakpoint];

        /* UP */

        var up = this.$element.data(name + '-up');

        if (_.isString(up)) {

          this.options.switch.up[breakpoint] = up;
        }

        /* DOWN */

        var down = this.$element.data(name + '-down');

        if (_.isString(down)) {

          this.options.switch.down[breakpoint] = down;
        }

        /* ONLY */

        var specific = this.$element.data(name + '-only'),
            general = this.$element.data(name),
            only = _.isString(specific) ? specific : _.isString(general) ? general : undefined;

        if (_.isString(only)) {

          this.options.switch.only[breakpoint] = only;
        }
      }
    }, {
      key: '_populate',
      value: function _populate() {

        for (var key in Breakpoints) {

          if (Breakpoints.hasOwnProperty(key)) {

            if (_.isString(Breakpoints[key])) {

              this._populateBreakpoint(key);
            }
          }
        }
      }

      /* STATUS */

    }, {
      key: '_getStatus',
      value: function _getStatus() {

        var status = { up: {}, down: {}, only: {} },
            width = Breakpoints.widths[Breakpoint.current];

        /* UP */

        for (var breakpoint in this.options.switch.up) {

          if (this.options.switch.up.hasOwnProperty(breakpoint)) {

            var active = width >= Breakpoints.widths[breakpoint];

            status.up[breakpoint] = active;
          }
        }

        /* DOWN */

        for (var _breakpoint3 in this.options.switch.down) {

          if (this.options.switch.down.hasOwnProperty(_breakpoint3)) {

            var _active = width <= Breakpoints.widths[_breakpoint3];

            status.down[_breakpoint3] = _active;
          }
        }

        /* ONLY */

        for (var _breakpoint4 in this.options.switch.only) {

          if (this.options.switch.only.hasOwnProperty(_breakpoint4)) {

            var _active2 = width === Breakpoints.widths[_breakpoint4];

            status.only[_breakpoint4] = _active2;
          }
        }

        return status;
      }
    }, {
      key: '_getDeltaStatus',
      value: function _getDeltaStatus(previous, current) {

        var delta = { up: {}, down: {}, only: {} };

        for (var type in current) {

          if (current.hasOwnProperty(type)) {

            for (var breakpoint in current[type]) {

              if (current[type].hasOwnProperty(breakpoint)) {

                if (!!previous[type][breakpoint] !== !!current[type][breakpoint]) {

                  delta[type][breakpoint] = !!current[type][breakpoint];
                }
              }
            }
          }
        }

        return delta;
      }

      /* CLASS SWITCH */

    }, {
      key: '___classSwitch',
      value: function ___classSwitch() {

        this._on(true, this.$window, 'breakpoint:change', this.__classSwitch);
      }
    }, {
      key: '__classSwitch',
      value: function __classSwitch() {

        var status = this._getStatus(),
            delta = this._getDeltaStatus(this.status, status);

        for (var type in delta) {

          if (delta.hasOwnProperty(type)) {

            for (var breakpoint in delta[type]) {

              if (delta[type].hasOwnProperty(breakpoint)) {

                this.$element.toggleClass(this.options.switch[type][breakpoint], delta[type][breakpoint]);
              }
            }
          }
        }

        this.status = status;
      }
    }]);

    return ClassSwitch;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(ClassSwitch, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Breakpoints, Svelto.Breakpoint);

/* =========================================================================
 * Svelto - Widgets - Datepicker
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

// When using using an incomplete-information format (those where not all the info are exported, like YYYYMMDD) the behaviour when used in combination with, for instance, `formSync` would be broken: at GTM+5 it may be the day 10, but at UTC may actually be day 9, and when syncing we won't get the right date synced between both datepickers
// Accordion to ISO-8601 the first day of the week is Monday

//FIXME: When using the arrows the prev day still remains hovered even if it's not below the cursor (chrome) //TODO: Make a SO question, maybe we can workaround it

(function ($, _, Svelto, Widgets, Factory, Pointer) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'datepicker',
    plugin: true,
    selector: '.datepicker',
    options: {
      exporters: {
        YYYYMMDD: function YYYYMMDD(date, data) {
          return [_.padStart(date.getUTCFullYear(), 4, 0), _.padStart(parseInt(date.getUTCMonth(), 10) + 1, 2, 0), _.padStart(date.getUTCDate(), 2, 0)].join(data.separator);
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

  var Datepicker = function (_Widgets$Widget3) {
    _inherits(Datepicker, _Widgets$Widget3);

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
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer);

/* =========================================================================
 * Svelto - Widgets - Draggable
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
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
      modifiers: { // It can modify the setted X and Y translation values
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
        reverting: 'draggable-reverting',
        layout: {
          dragging: 'draggable-layout-dragging'
        }
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

  var Draggable = function (_Widgets$Widget4) {
    _inherits(Draggable, _Widgets$Widget4);

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
      value: function _centerToPoint(XY, suppressClasses) {

        var movableOffset = this.$movable.offset(),
            deltaXY = {
          x: XY.x - (movableOffset.left + this.$movable.outerWidth() / 2),
          y: XY.y - (movableOffset.top + this.$movable.outerHeight() / 2)
        };

        return this._actionMove(deltaXY, suppressClasses);
      }
    }, {
      key: '_actionMove',
      value: function _actionMove(deltaXY, suppressClasses) {

        /* BASE */

        var baseXY = {
          x: this.proxyXY ? this.proxyXY.x : this.initialXY.x,
          y: this.proxyXY ? this.proxyXY.y : this.initialXY.y
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

              this.translateX_min = constrainerOffset.left - (movableOffset.left - baseXY.x) - halfWidth;
              this.translateX_max = constrainerOffset.left + this.options.constrainer.$element.outerWidth() - (movableOffset.left - baseXY.x + this.$movable.outerWidth()) + halfWidth;
            }

            if (this.options.axis !== 'x') {

              var halfHeight = this.options.constrainer.center ? this.$movable.outerHeight() / 2 : 0;

              this.translateY_min = constrainerOffset.top - (movableOffset.top - baseXY.y) - halfHeight;
              this.translateY_max = constrainerOffset.top + this.options.constrainer.$element.outerHeight() - (movableOffset.top - baseXY.y + this.$movable.outerHeight()) + halfHeight;
            }
          }

          /* CLASSES */

          if (!suppressClasses) {

            this._addClasses();
          }
        }

        /* CLAMPING */

        var translateX = baseXY.x,
            translateY = baseXY.y;

        if (this.options.axis !== 'y') {

          translateX += deltaXY.x;

          if (this.options.constrainer.$element) {

            translateX = _.clamp(translateX, this.translateX_min - this.options.constrainer.tolerance.x, this.translateX_max + this.options.constrainer.tolerance.x);
          }
        }

        if (this.options.axis !== 'x') {

          translateY += deltaXY.y;

          if (this.options.constrainer.$element) {

            translateY = _.clamp(translateY, this.translateY_min - this.options.constrainer.tolerance.y, this.translateY_max + this.options.constrainer.tolerance.y);
          }
        }

        /* MODIFYING */

        var modifiedXY = {
          x: this.options.axis !== 'y' ? this.options.modifiers.x(translateX) : false,
          y: this.options.axis !== 'x' ? this.options.modifiers.y(translateY) : false
        };

        /* ABORTION */

        if (modifiedXY.x === false && modifiedXY.y === false) return baseXY;

        /* SETTING */

        var endXY = {
          x: _.isBoolean(modifiedXY.x) ? modifiedXY.x ? translateX : baseXY.x : modifiedXY.x,
          y: _.isBoolean(modifiedXY.y) ? modifiedXY.y ? translateY : baseXY.y : modifiedXY.y
        };

        this.$movable.translate(endXY.x, endXY.y);

        /* MOTION */

        this.motion = true;

        /* RETURNING */

        return endXY;
      }
    }, {
      key: '_actionSet',
      value: function _actionSet(XY) {}

      /* CLASSES */

    }, {
      key: '_toggleClasses',
      value: function _toggleClasses(force) {

        this.$layout.toggleClass(this.options.classes.layout.dragging, force);
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

            if (pointXY.y - scrollTop <= this.options.scroll.sensitivity) {

              this.$document.scrollTop(scrollTop - this.options.scroll.speed);
            } else if (this.$window.height() - (pointXY.y - scrollTop) <= this.options.scroll.sensitivity) {

              this.$document.scrollTop(scrollTop + this.options.scroll.speed);
            }
          }

          if (this.options.axis !== 'y') {

            var scrollLeft = this.$document.scrollLeft();

            if (pointXY.x - scrollLeft <= this.options.scroll.sensitivity) {

              this.$document.scrollLeft(scrollLeft - this.options.scroll.speed);
            } else if (this.$window.width() - (pointXY.x - scrollLeft) <= this.options.scroll.sensitivity) {

              this.$document.scrollLeft(scrollLeft + this.options.scroll.speed);
            }
          }
        } else {

          var parentOffset = this.$scrollParent.offset();

          if (this.options.axis !== 'x') {

            if (parentOffset.top + this.scrollParent.offsetHeight - pointXY.y <= this.options.scroll.sensitivity) {

              this.scrollParent.scrollTop += this.options.scroll.speed;
            } else if (pointXY.y - parentOffset.top <= this.options.scroll.sensitivity) {

              this.scrollParent.scrollTop -= this.options.scroll.speed;
            }
          }

          if (this.options.axis !== 'y') {

            if (parentOffset.left + this.scrollParent.offsetWidth - pointXY.x <= this.options.scroll.sensitivity) {

              this.scrollParent.scrollLeft += this.options.scroll.speed;
            } else if (pointXY.x - parentOffset.left <= this.options.scroll.sensitivity) {

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

            this.$movable.translate(this.initialXY.x, this.initialXY.y);

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

        this._trigger('start', { draggable: this.draggable, helper: this.helper, isProxyed: this.isProxyed, initialXY: this.initialXY, startEvent: this.startEvent, startXY: this.startXY });

        this._on(true, this.$document, Pointer.move, this.__move);
        this._one(true, this.$document, Pointer.up, this.__up);
        this._one(true, this.$document, Pointer.cancel, this.__cancel);
      }
    }, {
      key: '__move',
      value: function __move(event) {

        var moveXY = $.eventXY(event),
            deltaXY = {
          x: moveXY.x - this.startXY.x,
          y: moveXY.y - this.startXY.y
        },
            absDeltaXY = {
          x: Math.abs(deltaXY.x),
          y: Math.abs(deltaXY.y)
        },
            dragXY = void 0;

        if (absDeltaXY.x < this.options.threshold && absDeltaXY.y < this.options.threshold) return;

        if (!this.inited && this.isProxyed) {

          dragXY = this._centerToPoint(moveXY);

          this.proxyXY = dragXY;
        } else {

          var _deltaXY = {
            x: moveXY.x - this.startXY.x,
            y: moveXY.y - this.startXY.y
          };

          dragXY = this._actionMove(_deltaXY);
        }

        this._autoscroll(moveXY);

        this._trigger('move', { draggable: this.draggable, helper: this.helper, isProxyed: this.isProxyed, initialXY: this.initialXY, startEvent: this.startEvent, startXY: this.startXY, moveEvent: event, moveXY: moveXY, dragXY: dragXY });
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

          if ((_.isFunction(this.options.proxy.noMotion) ? this.options.proxy.noMotion() : this.options.proxy.noMotion) && Mouse.hasButton(event, Mouse.buttons.LEFT)) {

            dragXY = this._centerToPoint(endXY, true);
          }
        }

        this._off(this.$document, Pointer.move, this.__move);
        this._off(this.$document, Pointer.cancel, this.__cancel);

        this._trigger('end', { draggable: this.draggable, helper: this.helper, isProxyed: this.isProxyed, initialXY: this.initialXY, startEvent: this.startEvent, startXY: this.startXY, endEvent: event, endXY: endXY, dragXY: dragXY, motion: this.motion });
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
 * Svelto - Widgets - Expander
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/animations/animations.js
 * @require core/widget/widget.js
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

  var Expander = function (_Widgets$Widget5) {
    _inherits(Expander, _Widgets$Widget5);

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
 * Svelto - Widgets - Accordion
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require widgets/expander/expander.js
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

  var Accordion = function (_Widgets$Widget6) {
    _inherits(Accordion, _Widgets$Widget6);

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

        _.invokeMap(this.instances, 'enable');
      }
    }, {
      key: 'disable',
      value: function disable() {

        _.invokeMap(this.instances, 'disable');
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
 * Svelto - Widgets - Flickable
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
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

  var Flickable = function (_Widgets$Widget7) {
    _inherits(Flickable, _Widgets$Widget7);

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
            x: endXY.x - this._startXY.x,
            y: endXY.y - this._startXY.y
          },
              absDeltaXY = {
            x: Math.abs(deltaXY.x),
            y: Math.abs(deltaXY.y)
          };

          if (absDeltaXY.x >= this.options.threshold || absDeltaXY.y >= this.options.threshold) {

            var orientation = void 0,
                direction = void 0;

            if (absDeltaXY.x > absDeltaXY.y) {

              orientation = 'horizontal';
              direction = deltaXY.x > 0 ? 'right' : 'left';
            } else {

              orientation = 'vertical';
              direction = deltaXY.y > 0 ? 'bottom' : 'top';
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
 * Svelto - Widgets - Flippable
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
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

  var Flippable = function (_Widgets$Widget8) {
    _inherits(Flippable, _Widgets$Widget8);

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
 * Svelto - Widgets - Form Sync
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
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

  var FormSync = function (_Widgets$Widget9) {
    _inherits(FormSync, _Widgets$Widget9);

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

        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
          for (var _iterator10 = $otherElements[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var otherElement = _step10.value;


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
    }]);

    return FormSync;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(FormSync, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Widgets - Infobar
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
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

  var Infobar = function (_Widgets$Widget10) {
    _inherits(Infobar, _Widgets$Widget10);

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
 * Svelto - Widgets - Input - Autogrow
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/browser/browser.js
 * @require core/widget/widget.js
 * ========================================================================= */

// It supports only `box-sizing: border-box` inputs

(function ($, _, Svelto, Widgets, Factory, Browser) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'inputAutogrow',
    plugin: true,
    selector: 'input.autogrow',
    options: {
      minWidth: 1, // So that the cursor will get displayed even when empty
      callbacks: {
        change: _.noop
      }
    }
  };

  /* INPUT AUTOGROW */

  var InputAutogrow = function (_Widgets$Widget11) {
    _inherits(InputAutogrow, _Widgets$Widget11);

    function InputAutogrow() {
      _classCallCheck(this, InputAutogrow);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(InputAutogrow).apply(this, arguments));
    }

    _createClass(InputAutogrow, [{
      key: '_variables',
      value: function _variables() {

        this.$input = this.$element;

        this.$tempInput = $('<input>').css({
          'position': 'fixed',
          'visibility': 'hidden',
          'padding': 0,
          'min-width': 0,
          'width': 0
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
      key: '_getNeededWidth',
      value: function _getNeededWidth() {

        this.$tempInput.css('font', this.$input.css('font')).val(this.$input.val()).appendTo(this.$layout);

        var width = this.$tempInput[0].scrollWidth;

        this.$tempInput.detach();

        return Math.max(this.options.minWidth, width);
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
    }], [{
      key: 'widgetize',


      /* SPECIAL */

      value: function widgetize($input) {

        /* SKIP IE/EDGE */

        //FIXME: input.scrollWidth is not supported by them, find another reliable way of implementing it

        if (Browser.is.ie || Browser.is.edge) return;

        /* WIDGETIZE */

        $input.inputAutogrow();
      }
    }]);

    return InputAutogrow;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(InputAutogrow, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Browser);

/* =========================================================================
 * Svelto - Widgets - Input - File - Names
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'inputFileNames',
    plugin: true,
    selector: '.input-file-names',
    options: {
      placeholder: 'Select a file...',
      callbacks: {
        change: _.noop
      }
    }
  };

  /* INPUT FILE NAMES */

  var InputFileNames = function (_Widgets$Widget12) {
    _inherits(InputFileNames, _Widgets$Widget12);

    function InputFileNames() {
      _classCallCheck(this, InputFileNames);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(InputFileNames).apply(this, arguments));
    }

    _createClass(InputFileNames, [{
      key: '_variables',


      /* SPECIAL */

      value: function _variables() {

        this.$names = this.$element;

        this.$input = this.$names.closest('label').find('input[type="file"]');
        this.input = this.$input[0];
      }
    }, {
      key: '_init',
      value: function _init() {

        this.options.placeholder = this.$names.text() || this.options.placeholder;

        this._update();
      }
    }, {
      key: '_events',
      value: function _events() {

        this.___change();
      }

      /* PRIVATE */

    }, {
      key: '_getNames',
      value: function _getNames() {

        var names = [];

        for (var i = 0, l = this.input.files.length; i < l; i++) {

          names.push(this.input.files[i].name);
        }

        return names;
      }
    }, {
      key: '_getText',
      value: function _getText() {

        var names = this._getNames();

        return names.length ? names.join(', ') : this.options.placeholder;
      }

      /* CHANGE */

    }, {
      key: '___change',
      value: function ___change() {

        this._on(true, this.$input, 'change', this._update);
      }

      /* UPDATE */

    }, {
      key: '_update',
      value: function _update() {

        var previous = this.$names.text(),
            current = this._getText();

        if (previous === current) return;

        this.$names.text(current);

        this._trigger('change');
      }
    }]);

    return InputFileNames;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(InputFileNames, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Widgets - Modal
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/animations/animations.js
 * @require core/widget/widget.js
 * ========================================================================= */

//FIXME: Multiple open modals (read it: multiple backdrops) are not well supported

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
        open: 'open',
        backdrop: {
          show: 'modal-backdrop obscured-show obscured',
          open: 'obscured-open'
        }
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

  var Modal = function (_Widgets$Widget13) {
    _inherits(Modal, _Widgets$Widget13);

    function Modal() {
      _classCallCheck(this, Modal);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Modal).apply(this, arguments));
    }

    _createClass(Modal, [{
      key: '_variables',


      /* SPECIAL */

      value: function _variables() {

        this.$modal = this.$element;
        this.modal = this.element;

        this.$backdrop = this.$html;

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
    }, {
      key: '_destroy',
      value: function _destroy() {

        this.close();
      }

      /* TAP */

    }, {
      key: '___tap',
      value: function ___tap() {

        this._on(true, this.$html, Pointer.tap, this.__tap);
      }
    }, {
      key: '__tap',
      value: function __tap(event) {

        if (this._lock || $(event.target).closest(this.$modal).length) return;

        this.close();
      }

      /* ROUTE */

    }, {
      key: '__route',
      value: function __route() {

        if (this._isOpen && !this.$modal.isAttached()) {

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
          this.$backdrop.addClass(this.options.classes.backdrop.show);

          this._frame(function () {

            this.$modal.addClass(this.options.classes.open);
            this.$backdrop.addClass(this.options.classes.backdrop.open);

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
          this.$backdrop.removeClass(this.options.classes.backdrop.open);

          this._delay(function () {

            this.$modal.removeClass(this.options.classes.show);
            this.$backdrop.removeClass(this.options.classes.backdrop.show);

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
 * Svelto - Widgets - Numbox
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory, Pointer) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'numbox',
    plugin: true,
    selector: '.numbox',
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
        decreaser: '.numbox-decreaser',
        increaser: '.numbox-increaser',
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

  /* NUMBOX */

  var Numbox = function (_Widgets$Widget14) {
    _inherits(Numbox, _Widgets$Widget14);

    function Numbox() {
      _classCallCheck(this, Numbox);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Numbox).apply(this, arguments));
    }

    _createClass(Numbox, [{
      key: '_variables',


      /* SPECIAL */

      value: function _variables() {

        this.$numbox = this.$element;
        this.$input = this.$numbox.find(this.options.selectors.input);
        this.$decreaser = this.$numbox.find(this.options.selectors.decreaser);
        this.$increaser = this.$numbox.find(this.options.selectors.increaser);

        this._prevValue = false;
      }
    }, {
      key: '_init',
      value: function _init() {

        /* VARIABLES */

        var value = this.$input.val();

        /* OPTIONS */

        this.options.min = Number(this.$numbox.data(this.options.datas.min) || this.options.min);
        this.options.max = Number(this.$numbox.data(this.options.datas.max) || this.options.max);
        this.options.step = Number(this.$numbox.data(this.options.datas.step) || this.options.step);
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

        this.$decreaser.toggleClass(this.options.classes.disabled, isMin);
        this.$increaser.toggleClass(this.options.classes.disabled, isMax);
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

    return Numbox;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Numbox, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer);

/* =========================================================================
 * Svelto - Widgets - Overlay
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/animations/animations.js
 * @require core/widget/widget.js
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
        open: 'open',
        parent: {
          show: 'overlay-parent-show',
          open: 'overlay-parent-open'
        }
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
    }, {
      key: '_destroy',
      value: function _destroy() {

        this.close();
      }

      /* PARENT */

    }, {
      key: '_getParent',
      value: function _getParent() {

        if (!this.$parent) {

          this.$parent = this.$overlay.parent();
        }

        return this.$parent;
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
          this._getParent().addClass(this.options.classes.parent.show);

          this._frame(function () {

            this.$overlay.addClass(this.options.classes.open);
            this._getParent().addClass(this.options.classes.parent.open);

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
          this._getParent().removeClass(this.options.classes.parent.open);

          this._delay(function () {

            this.$overlay.removeClass(this.options.classes.show);
            this._getParent().removeClass(this.options.classes.parent.show);

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
 * Svelto - Widgets - Spinner - Overlay
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/colors/colors.js
 * @require widgets/overlay/overlay.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory, Colors) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'spinnerOverlay',
    plugin: true,
    templates: {
      overlay: '<div class="overlay spinner-overlay <%= o.dimmer ? "dimmer" : "" %>">' + '<% if ( o.labeled ) { %>' + '<div class="spinner-label <%= o.colors.labeled %>">' + '<% } %>' + '<svg class="spinner <%= ( o.multicolor ? "multicolor" : ( o.labeled ? "" : o.unlabeled ) ) %>">' + '<circle cx="1.625em" cy="1.625em" r="1.25em">' + '</svg>' + '<% if ( o.labeled ) { %>' + '</div>' + '<% } %>' + '</div>'
    },
    options: {
      labeled: true,
      dimmer: true,
      multicolor: false,
      colors: {
        labeled: Colors.white,
        unlabeled: Colors.secondary
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
        this.$overlay = $(this._template('overlay', this.options));

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
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Colors);

/* =========================================================================
* Svelto - Widgets - Progressbar
* =========================================================================
* Copyright (c) 2015-2016 Fabio Spampinato
* Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
* =========================================================================
* @require core/widget/widget.js
* ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'progressbar',
    plugin: true,
    selector: '.progressbar',
    templates: {
      base: '<div class="progressbar <%= o.striped ? "striped" : "" %> <%= o.indeterminate ? "indeterminate" : "" %> <%= o.labeled ? "labeled" : "" %> <%= o.colors.off %> <%= o.size %> <%= o.css %>">' + '<div class="progressbar-highlight <%= o.colors.on %>"></div>' + '</div>'
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

  var Progressbar = function (_Widgets$Widget17) {
    _inherits(Progressbar, _Widgets$Widget17);

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
 * Svelto - Widgets - Progressbar (Helper)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./progressbar.js
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
 * Svelto - Widgets - Rails
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/animations/animations.js
 * @require core/widget/widget.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory, Animations, Pointer) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'rails',
    plugin: true,
    selector: '.rails',
    options: {
      scroll: {
        speed: 200 // The distance scrolled when calling `left` or `right`
      },
      selectors: {
        start: '.rails-start',
        left: '.rails-left',
        right: '.rails-right',
        end: '.rails-end',
        content: '.rails-content',
        active: '.rails-active'
      },
      animations: {
        scroll: Animations.fast
      },
      keystrokes: {
        'home, page_up': 'start',
        'left': 'left',
        'right': 'right',
        'end, page_down': 'end'
      }
    }
  };

  /* RAILS */

  var Rails = function (_Widgets$Widget18) {
    _inherits(Rails, _Widgets$Widget18);

    function Rails() {
      _classCallCheck(this, Rails);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Rails).apply(this, arguments));
    }

    _createClass(Rails, [{
      key: '_variables',


      /* SPECIAL */

      value: function _variables() {

        this.$rails = this.$element;

        this.$start = this.$rails.find(this.options.selectors.start);
        this.$left = this.$rails.find(this.options.selectors.left);
        this.$right = this.$rails.find(this.options.selectors.right);
        this.$end = this.$rails.find(this.options.selectors.end);
        this.$content = this.$rails.find(this.options.selectors.content);
        this.$active = this.$content.find(this.options.selectors.active);
      }
    }, {
      key: '_init',
      value: function _init() {

        this._scrollToElement(this.$active);
        this._updateButtons();
      }
    }, {
      key: '_events',
      value: function _events() {

        this.___keydown();
        this.___scroll();
        this.___startTap();
        this.___leftTap();
        this.___rightTap();
        this.___endTap();
      }

      /* KEYDOWN */

    }, {
      key: '___keydown',
      value: function ___keydown() {

        this._onHover([this.$document, 'keydown', this.__keydown]);
      }

      /* START TAP */

    }, {
      key: '___startTap',
      value: function ___startTap() {

        this._on(this.$start, Pointer.tap, this.start);
      }

      /* LEFT TAP */

    }, {
      key: '___leftTap',
      value: function ___leftTap() {

        this._on(this.$left, Pointer.tap, this.left);
      }

      /* RIGHT TAP */

    }, {
      key: '___rightTap',
      value: function ___rightTap() {

        this._on(this.$right, Pointer.tap, this.right);
      }

      /* END TAP */

    }, {
      key: '___endTap',
      value: function ___endTap() {

        this._on(this.$end, Pointer.tap, this.end);
      }

      /* UPDATE */

    }, {
      key: '_updateButtons',
      value: function _updateButtons() {

        var scrollLeft = void 0;

        if (this.$start.length || this.$left.length || this.$right.length || this.$end.length) {

          scrollLeft = this.$content.scrollLeft();
        }

        if (this.$start.length || this.$left.length) {

          var isStart = scrollLeft === 0;

          this.$start.add(this.$left).toggleClass(this.options.classes.disabled, isStart);
        }

        if (this.$end.length || this.$right.length) {

          var isEnd = this.$content[0].scrollWidth - scrollLeft - this.$content.outerWidth() <= 1;

          this.$end.add(this.$right).toggleClass(this.options.classes.disabled, isEnd);
        }
      }

      /* SCROLL */

    }, {
      key: '___scroll',
      value: function ___scroll() {

        this._on(true, this.$content, 'scroll', this._throttle(this._updateButtons, Math.max(this.options.animations.scroll || 100)));
      }
    }, {
      key: '_scroll',
      value: function _scroll(left) {

        this.$content.animate({ scrollLeft: left }, this.options.animations.scroll);
      }
    }, {
      key: '_deltaScroll',
      value: function _deltaScroll(delta) {

        this._scroll(this.$content.scrollLeft() + delta);
      }
    }, {
      key: '_scrollToElement',
      value: function _scrollToElement($element) {

        if (!$element.length) return;

        var left = $element.position().left + this.$content.scrollLeft() + $element.outerWidth() / 2 - this.$content.outerWidth() / 2;

        this._scroll(left);
      }

      /* API */

    }, {
      key: 'start',
      value: function start() {

        this._scroll(0);
      }
    }, {
      key: 'left',
      value: function left() {

        this._deltaScroll(-this.options.scroll.speed);
      }
    }, {
      key: 'right',
      value: function right() {

        this._deltaScroll(this.options.scroll.speed);
      }
    }, {
      key: 'end',
      value: function end() {

        this._scroll(this.$content[0].scrollWidth);
      }
    }]);

    return Rails;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Rails, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Animations, Svelto.Pointer);

/* =========================================================================
 * Svelto - Widgets - Remote
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
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

  var Remote = function (_Widgets$Widget19) {
    _inherits(Remote, _Widgets$Widget19);

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

        return !!this.xhr && !_.includes([0, 4], this.xhr.readyState); // 0: UNSENT, 4: DONE
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
 * Svelto - Widgets - Remote (Trigger)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
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

  var RemoteTrigger = function (_Widgets$Widget20) {
    _inherits(RemoteTrigger, _Widgets$Widget20);

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
 * Svelto - Widgets - Ripple
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/animations/animations.js
 * @require core/browser/browser.js
 * @require core/widget/widget.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory, Browser, Pointer, Animations) {

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
          show: 'show',
          hide: 'hide'
        },
        center: 'ripple-center'
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

  var Ripple = function (_Widgets$Widget21) {
    _inherits(Ripple, _Widgets$Widget21);

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

        if (this.$ripple.hasClass(this.options.classes.center)) {

          var offset = this.$ripple.offset();

          this._show({
            x: offset.left + this.$ripple.outerWidth() / 2,
            y: offset.top + this.$ripple.outerHeight() / 2
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
        var _iteratorNormalCompletion11 = true;
        var _didIteratorError11 = false;
        var _iteratorError11 = undefined;

        try {

          for (var _iterator11 = this.circles[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
            var _step11$value = _slicedToArray(_step11.value, 2);

            var $circle = _step11$value[0];
            var timestamp = _step11$value[1];


            this._hide($circle, timestamp);
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

        this.circles = [];
      }

      /* SHOW */

    }, {
      key: '_show',
      value: function _show(XY) {

        var $circle = $(this._template('circle'));

        /* SIZE */

        var offset = this.$ripple.offset(),
            insetX = XY.x - offset.left,
            insetY = XY.y - offset.top,
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
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Browser, Svelto.Pointer, Svelto.Animations);

/* =========================================================================
 * Svelto - Widgets - Selectable
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/browser/browser.js
 * @require core/widget/widget.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory, Pointer, Browser, Keyboard) {

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

  var Selectable = function (_Widgets$Widget22) {
    _inherits(Selectable, _Widgets$Widget22);

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
          x: endXY.x - startXY.x,
          y: endXY.y - startXY.y
        },
            absDeltaXY = {
          x: Math.abs(deltaXY.x),
          y: Math.abs(deltaXY.y)
        };

        if (absDeltaXY.x >= this.options.moveThreshold || absDeltaXY.y >= this.options.moveThreshold) {

          this._off(this.$document, Pointer.move, this.__move);

          this._off(this.$document, Pointer.up, this.__up);

          this._off(this.$document, Pointer.cancel, this.__cancel);

          this._resetPrev();

          if (!Keyboard.keystroke.hasCtrlOrCmd(event)) {

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
        } else if (Keyboard.keystroke.hasCtrlOrCmd(event)) {

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
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Browser, Svelto.Keyboard);

/* =========================================================================
 * Svelto - Widgets - Table - Sortable
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

//TODO: Better performance with tableHelper, just put the new addded row in the right position, performance boost

(function ($, _, Svelto, Widgets, Factory, Pointer) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'tableSortable',
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

  /* TABLE SORTABLE */

  var TableSortable = function (_Widgets$Widget23) {
    _inherits(TableSortable, _Widgets$Widget23);

    function TableSortable() {
      _classCallCheck(this, TableSortable);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(TableSortable).apply(this, arguments));
    }

    _createClass(TableSortable, [{
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

          for (var _i = 0, _l = this.sortData[index].length; _i < _l; _i++) {

            this.tbody.appendChild(this.sortData[index][_i][0]); // Reorder
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

    return TableSortable;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(TableSortable, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer);

/* =========================================================================
 * Svelto - Widgets - Table Helper
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'tableHelper',
    plugin: true,
    selector: 'table.table',
    templates: {
      row: '<tr <%= o.id ? "class=" + o.id : "" %> >' + '<% for ( var i = 0, l = o.datas.length; i < l; i++ ) { %>' + '<td>' + '<%= o.datas[i] %>' + '</td>' + '<% } %>' + '<% for ( var i = 0, l = o.missing; i < l; i++ ) { %>' + '<td></td>' + '<% } %>' + '</tr>'
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

  var TableHelper = function (_Widgets$Widget24) {
    _inherits(TableHelper, _Widgets$Widget24);

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

      /* PRIVATE */

    }, {
      key: '_getRowId',
      value: function _getRowId(id) {

        return this.options.rowIdPrefix + '-' + this.guid + '-' + id;
      }

      /* API */

    }, {
      key: 'add',
      value: function add(id) {

        var rowId = id ? this._getRowId(id) : false;

        for (var _len4 = arguments.length, datas = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          datas[_key4 - 1] = arguments[_key4];
        }

        if (datas.length) {

          if (rowId && $('.' + rowId).length === 1) return this;

          var chunks = _.chunk(datas, this.columnsNr),
              $rows = $();

          var _iteratorNormalCompletion12 = true;
          var _didIteratorError12 = false;
          var _iteratorError12 = undefined;

          try {
            for (var _iterator12 = chunks[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
              var chunk = _step12.value;


              var rowHtml = this._template('row', { id: rowId, datas: chunk, missing: this.columnsNr - chunk.length });

              $rows = $rows.add(rowHtml);
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

          this.$body.append($rows);

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

        for (var _len5 = arguments.length, datas = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
          datas[_key5 - 1] = arguments[_key5];
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
 * Svelto - Widgets - Targeter
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
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

  var Targeter = function (_Widgets$Widget25) {
    _inherits(Targeter, _Widgets$Widget25);

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
    }, {
      key: '_events',
      value: function _events() {

        this.___targetRemove();
      }

      /* TARGET REMOVE */

    }, {
      key: '___targetRemove',
      value: function ___targetRemove() {

        this._on(true, this.$target, 'remove', this.__targetRemove);
      }
    }, {
      key: '__targetRemove',
      value: function __targetRemove() {

        this.__remove();
      }
    }]);

    return Targeter;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Targeter, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Widgets - Targeter - Closer
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../targeter.js
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

        this.___targetRemove();
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
 * Svelto - Widgets - Expander - Targeters - Closer
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../expander.js
 * @require widgets/targeter/closer/closer.js
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

  var ExpanderCloser = function (_Widgets$Closer) {
    _inherits(ExpanderCloser, _Widgets$Closer);

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
 * Svelto - Widgets - Infobar - Targeters - Closer
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../infobar.js
 * @require widgets/targeter/closer/closer.js
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

  var InfobarCloser = function (_Widgets$Closer2) {
    _inherits(InfobarCloser, _Widgets$Closer2);

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
 * Svelto - Widgets - Modal - Targeters - Closer
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../modal.js
 * @require widgets/targeter/closer/closer.js
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

  var ModalCloser = function (_Widgets$Closer3) {
    _inherits(ModalCloser, _Widgets$Closer3);

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
 * Svelto - Widgets - Overlay - Targeters - Closer
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../overlay.js
 * @require widgets/targeter/closer/closer.js
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

  var OverlayCloser = function (_Widgets$Closer4) {
    _inherits(OverlayCloser, _Widgets$Closer4);

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
 * Svelto - Widgets - Targeter - Opener
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../closer/closer.js
 * @require core/browser/browser.js
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

  var Opener = function (_Widgets$Closer5) {
    _inherits(Opener, _Widgets$Closer5);

    function Opener() {
      _classCallCheck(this, Opener);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Opener).apply(this, arguments));
    }

    _createClass(Opener, [{
      key: '_events',


      /* SPECIAL */

      value: function _events() {

        this.___targetRemove();
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
 * Svelto - Widgets - Expander - Targeters - Opener
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../expander.js
 * @require widgets/targeter/opener/opener.js
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

  var ExpanderOpener = function (_Widgets$Opener) {
    _inherits(ExpanderOpener, _Widgets$Opener);

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
 * Svelto - Widgets - Modal - Targeters - Opener
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../modal.js
 * @require widgets/targeter/opener/opener.js
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

  var ModalOpener = function (_Widgets$Opener2) {
    _inherits(ModalOpener, _Widgets$Opener2);

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
 * Svelto - Widgets - Overlay - Targeters - Opener
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../overlay.js
 * @require widgets/targeter/opener/opener.js
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

  var OverlayOpener = function (_Widgets$Opener3) {
    _inherits(OverlayOpener, _Widgets$Opener3);

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
 * Svelto - Widgets - Targeter - Toggler
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../opener/opener.js
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

  var Toggler = function (_Widgets$Opener4) {
    _inherits(Toggler, _Widgets$Opener4);

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
 * Svelto - Widgets - Expander - Targeters - Toggler
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../expander.js
 * @require widgets/targeter/toggler/toggler.js
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

  var ExpanderToggler = function (_Widgets$Toggler) {
    _inherits(ExpanderToggler, _Widgets$Toggler);

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
 * Svelto - Widgets - Flippable - Targeters - Flipper
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../flippable.js
 * @require widgets/targeter/toggler/toggler.js
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

  var FlippableFlipper = function (_Widgets$Toggler2) {
    _inherits(FlippableFlipper, _Widgets$Toggler2);

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
 * Svelto - Widgets - Modal - Targeters - Toggler
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../modal.js
 * @require widgets/targeter/toggler/toggler.js
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

  var ModalToggler = function (_Widgets$Toggler3) {
    _inherits(ModalToggler, _Widgets$Toggler3);

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
 * Svelto - Widgets - Overlay - Targeters - Toggler
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../overlay.js
 * @require widgets/targeter/toggler/toggler.js
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

  var OverlayToggler = function (_Widgets$Toggler4) {
    _inherits(OverlayToggler, _Widgets$Toggler4);

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
 * Svelto - Widgets - Textarea - Autogrow
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

// It supports only `box-sizing: border-box` textareas

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'textareaAutogrow',
    plugin: true,
    selector: 'textarea.autogrow',
    options: {
      callbacks: {
        change: _.noop
      }
    }
  };

  /* AUTOGROW TEXTAREA */

  var AutogrowTextarea = function (_Widgets$Widget26) {
    _inherits(AutogrowTextarea, _Widgets$Widget26);

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

        this.$tempTextarea.css('font', this.$textarea.css('font')).val(this.$textarea.val() || ' ').appendTo(this.$layout); // Ensuring that there's at least a space character inside of it fixed a bug in IE/Edge where the textarea gets shrinked

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
 * Svelto - Widgets - Time Ago
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
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

  var TimeAgo = function (_Widgets$Widget27) {
    _inherits(TimeAgo, _Widgets$Widget27);

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
 * Svelto - Core - Z-Depths
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ($, _, Svelto) {

  'use strict';

  /* Z-DEPTHS */

  var ZDepths = {};

  for (var i = 0, l = 24; i <= l; i++) {

    ZDepths[i] = 'z-depth-' + i;
  }

  /* EXPORT */

  Svelto.ZDepths = ZDepths;
})(Svelto.$, Svelto._, Svelto);

/* =========================================================================
 * Svelto - Decorators - Blurred
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ($, _, Svelto) {

  'use strict';

  /* BLURRED */

  $.fn.blurred = function (force) {

    return this.toggleClass('blurred', force);
  };
})(Svelto.$, Svelto._, Svelto);

/* =========================================================================
 * Svelto - Decorators - Obscured
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ($, _, Svelto) {

  'use strict';

  /* OBSCURED */

  $.fn.obscured = function (force) {

    return this.toggleClass('obscured', force);
  };
})(Svelto.$, Svelto._, Svelto);

/* =========================================================================
 * Svelto - Lib - Color
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
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

        return _.padStart(parseInt(dec, 10).toString(16), 2, '0');
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
 * Svelto - Widgets - Colorpicker
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * @require lib/color/color.js
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

  var Colorpicker = function (_Widgets$Widget28) {
    _inherits(Colorpicker, _Widgets$Widget28);

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

        this.hsv.s = _.clamp(XY.x, 0, this.sbWrpSize) * 100 / this.sbWrpSize;
        this.hsv.v = 100 - _.clamp(XY.y, 0, this.sbWrpSize) * 100 / this.sbWrpSize;

        this._updateSb(false);

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

        this.hsv.h = 359 - _.clamp(XY.y, 0, this.hueWrpHeight) * 359 / this.hueWrpHeight;

        this._updateHue(false);

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
        var _translate = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

        /* HSL */

        var hsl = Color.hsv2hsl(this.hsv);

        this.$sbHandler.hsl(hsl.h, hsl.s, hsl.l);

        /* TRANSLATE */

        if (_translate) {

          var translateX = this.sbWrpSize / 100 * this.hsv.s,
              translateY = this.sbWrpSize / 100 * (100 - this.hsv.v);

          this.$sbHandler.translate(translateX, translateY);
        }
      }
    }, {
      key: '_updateHue',
      value: function _updateHue() {
        var _translate = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

        /* HSL */

        var hsl = Color.hsv2hsl(this.hsv);

        this.$hueHandler.hsl(this.hsv.h, 100, 50);
        this.$sbHandler.hsl(hsl.h, hsl.s, hsl.l);
        this.$sbWrp.hsl(this.hsv.h, 100, 50);

        /* TRANSLATE */

        if (_translate) {

          var translateY = this.hueWrpHeight / 100 * (100 - this.hsv.h / 360 * 100);

          this.$hueHandler.translateY(translateY);
        }
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
 * Svelto - Lib - Directions
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ($, _, Svelto) {

  'use strict';

  /* DIRECTIONS */

  var Directions = {
    get: function get() {

      return ['top', 'bottom', 'left', 'right'];
    },
    getOpposite: function getOpposite(direction) {

      return {
        'top': 'bottom',
        'bottom': 'top',
        'left': 'right',
        'right': 'left'
      }[direction];
    }
  };

  /* EXPORT */

  Svelto.Directions = Directions;
})(Svelto.$, Svelto._, Svelto);

/* =========================================================================
 * Svelto - Widgets - Panel
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/animations/animations.js
 * @require core/widget/widget.js
 * @require lib/directions/directions.js
 * ========================================================================= */

//FIXME: Multiple open panels (read it: multiple backdrops) are not well supported
//TODO: Replace flickable support with a smooth moving panel, so operate on drag

(function ($, _, Svelto, Widgets, Factory, Pointer, Animations, Directions) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'panel',
    plugin: true,
    selector: '.panel',
    options: {
      direction: 'left',
      type: 'default', // `default`, `slim` (officially supported) or any other implemented type
      pin: false, // If is a valid key of `Breakpoints` it will get auto pinned/unpinned when we are above or below that breakpoint
      flick: {
        open: false,
        close: true,
        treshold: 20 // Amount of pixels close to the window border where the opening flick gesture should be considered intentional
      },
      classes: {
        show: 'show',
        open: 'open',
        pinned: 'pinned',
        flickable: 'flickable', // As a side effect it will gain a `Svelto.Flickable` instance, therefor it will also trigger `flickable:flick` events, that are what we want
        backdrop: {
          show: 'panel-backdrop obscured-show obscured',
          open: 'obscured-open',
          pinned: 'panel-backdrop-pinned'
        },
        layout: {
          show: 'panel-layout'
        }
      },
      datas: {
        type: 'type'
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

  var Panel = function (_Widgets$Widget29) {
    _inherits(Panel, _Widgets$Widget29);

    function Panel() {
      _classCallCheck(this, Panel);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Panel).apply(this, arguments));
    }

    _createClass(Panel, [{
      key: '_variables',


      /* SPECIAL */

      value: function _variables() {
        var _this49 = this;

        this.$panel = this.$element;
        this.panel = this.element;

        this.$backdrop = this.$html;

        this.options.direction = Directions.get().find(function (direction) {
          return _this49.$panel.hasClass(direction);
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

        this.options.type = this.$panel.data(this.options.datas.type) || this.options.type;

        this.layoutPinnedClass = Widgets.Panel.config.name + '-' + this.options.type + '-' + this.options.classes.pinned + '-' + this.options.direction;
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
    }, {
      key: '_destroy',
      value: function _destroy() {

        this.close();
      }

      /* TAP */

    }, {
      key: '___tap',
      value: function ___tap() {

        this._on(true, this.$html, Pointer.tap, this.__tap);
      }
    }, {
      key: '__tap',
      value: function __tap(event) {

        if (this._lock || this._isPinned || $(event.target).closest(this.$panel).length) return;

        this.close();
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

        if (data.direction !== Directions.getOpposite(this.options.direction)) return;

        var layoutOffset = this.$layout.offset();

        switch (this.options.direction) {

          case 'left':
            if (data.startXY.x - layoutOffset.left > this.options.flick.treshold) return;
            break;

          case 'right':
            if (this.$layout.outerWidth() + layoutOffset.left - data.startXY.x > this.options.flick.treshold) return;
            break;

          case 'top':
            if (data.startXY.y - layoutOffset.top > this.options.flick.treshold) return;
            break;

          case 'bottom':
            if (this.$layout.outerHeight() + layoutOffset.top - data.startXY.y > this.options.flick.treshold) return;
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

        if (this._isOpen && !this.$panel.isAttached()) {

          this.close();
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
          this.$backdrop.addClass(this.options.classes.backdrop.show);
          this.$layout.addClass(this.options.classes.layout.show);

          this._frame(function () {

            this.$panel.addClass(this.options.classes.open);
            this.$backdrop.addClass(this.options.classes.backdrop.open);

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
          this.$backdrop.removeClass(this.options.classes.backdrop.open);

          this._delay(function () {

            this.$panel.removeClass(this.options.classes.show);
            this.$backdrop.removeClass(this.options.classes.backdrop.show);
            this.$layout.removeClass(this.options.classes.layout.show);

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

        this.$backdrop.addClass(this.options.classes.backdrop.pinned);

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

        this.$backdrop.removeClass(this.options.classes.backdrop.pinned);

        this._delay(function () {

          this.$panel.removeClass(this.options.classes.pinned);
        }, _closing ? this.options.animations.close : 0);
      }
    }]);

    return Panel;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Panel, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Animations, Svelto.Directions);

/* =========================================================================
 * Svelto - Widgets - Panel - Targeters - Closer
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../panel.js
 * @require widgets/targeter/closer/closer.js
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

  var PanelCloser = function (_Widgets$Closer6) {
    _inherits(PanelCloser, _Widgets$Closer6);

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
 * Svelto - Widgets - Panel - Targeters - Opener
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../panel.js
 * @require widgets/targeter/opener/opener.js
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

  var PanelOpener = function (_Widgets$Opener5) {
    _inherits(PanelOpener, _Widgets$Opener5);

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
 * Svelto - Widgets - Panel - Targeters - Toggler
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../panel.js
 * @require widgets/targeter/toggler/toggler.js
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

  var PanelToggler = function (_Widgets$Toggler5) {
    _inherits(PanelToggler, _Widgets$Toggler5);

    function PanelToggler() {
      _classCallCheck(this, PanelToggler);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(PanelToggler).apply(this, arguments));
    }

    return PanelToggler;
  }(Widgets.Toggler);

  /* FACTORY */

  Factory.init(PanelToggler, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Widgets - Tabs
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * @require lib/directions/directions.js
 * ========================================================================= */

//TODO: Add again the super cool moving indicator
//TODO: Not well written, make it better
//TODO: Doesn't handle properly a change of the direction

(function ($, _, Svelto, Widgets, Factory, Pointer, Directions) {

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

  var Tabs = function (_Widgets$Widget30) {
    _inherits(Tabs, _Widgets$Widget30);

    function Tabs() {
      _classCallCheck(this, Tabs);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Tabs).apply(this, arguments));
    }

    _createClass(Tabs, [{
      key: '_variables',


      /* SPECIAL */

      value: function _variables() {
        var _this54 = this;

        this.$tabs = this.$element;
        this.$triggers = this.$tabs.find(this.options.selectors.triggers);
        this.$containers = this.$tabs.find(this.options.selectors.containers);

        this.options.direction = Directions.get().find(function (direction) {
          return _this54.$tabs.hasClass(direction);
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

          var oppositeDirection = Directions.getOpposite(this.options.direction);

          $trigger.toggleClass('highlighted highlight-' + oppositeDirection, force);
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
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Directions);

/* =========================================================================
 * Svelto - Lib - Embedded CSS
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
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

            return this.set(selector, _defineProperty({}, property, value));
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
 * Svelto - Lib - Fuzzy
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ($, _, Svelto) {

  'use strict';

  /* FUZZY */

  var Fuzzy = {
    match: function match(str, search) {
      var isCaseSensitive = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];


      if (!isCaseSensitive) {

        str = str.toLowerCase();
        search = search.toLowerCase();
      }

      var currentIndex = -1,
          str_i = void 0,
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
    }
  };

  /* EXPORT */

  Svelto.Fuzzy = Fuzzy;
})(Svelto.$, Svelto._, Svelto);

/* =========================================================================
 * Svelto - Lib - N Times Action (Group)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/cookie/cookie.js
 * @require core/svelto/svelto.js
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
 * Svelto - Lib - N Times Action (Action)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./NTA.Group.js
 * @require core/svelto/svelto.js
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
 * Svelto - Lib - N Times Action
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./NTA.Action.js
 * @require ./NTA.Group.js
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ($, _, Svelto, NTA) {

  'use strict';

  /* DEFAULTS */

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
 * Svelto - Lib - One Time Action
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * @require lib/n_times_action/n_times_action.js
 * ========================================================================= */

(function ($, _, Svelto) {

  'use strict';

  /* ONE TIME ACTION */

  $.oneTimeAction = function (options) {

    return $.nTimesAction(_.extend({ group: 'ota' }, options, { times: 1 }));
  };
})(Svelto.$, Svelto._, Svelto);

/* =========================================================================
 * Svelto - Lib - Regexes
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ($, _, Svelto) {

  'use strict';

  /* REGEXES */

  var Regexes = {

    /* TYPE */

    alpha: /^[a-zA-Z]+$/,
    alphanumeric: /^[a-zA-Z0-9]+$/,
    hexadecimal: /^[a-fA-F0-9]+$/,
    integer: /^(?:-?(?:0|[1-9][0-9]*))$/, //FIXME: It breaks if multiple 0 are added at the beginning (should this case be supported?)
    float: /^-?(?:(?:\d+)(?:\.\d*)?|(?:\.\d+)+)$/,

    /* THINGS */

    email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
    creditCard: /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
    ssn: /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/,
    ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
    url: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i

  };

  /* EXPORT */

  Svelto.Regexes = Regexes;
})(Svelto.$, Svelto._, Svelto);

/* =========================================================================
 * Svelto - Lib - Timer
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * Fork of http://jchavannes.com/jquery-timer - Jason Chavannes
 * =========================================================================
 * @require core/svelto/svelto.js
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
        var _this55 = this;

        if (isNaN(time)) {

          time = 0;
        }

        setTimeout(function () {
          return _this55.action();
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
        var _this56 = this;

        if (isNaN(time)) {

          time = this.intervalTime;
        }

        this.remainingTime = time;
        this.last = Date.now();
        this.clearTimer();

        this.timeoutObject = setTimeout(function () {
          return _this56.go();
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
 * Svelto - Widgets - Carousel
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/animations/animations.js
 * @require core/widget/widget.js
 * @require lib/timer/timer.js
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

  var Carousel = function (_Widgets$Widget31) {
    _inherits(Carousel, _Widgets$Widget31);

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
 * Svelto - Widgets - Toast
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/animations/animations.js
 * @require core/colors/colors.js
 * @require core/sizes/sizes.js
 * @require core/widget/widget.js
 * @require lib/timer/timer.js
 * ========================================================================= */

//TODO: Add support for dismissing a toast that contains only one button
//TODO: Add better support for swipe to dismiss

(function ($, _, Svelto, Widgets, Factory, Pointer, Timer, Animations, Colors, Sizes) {

  'use strict';

  /* VARIABLES */

  var openNotiesData = {};

  /* CONFIG */

  var config = {
    name: 'toast',
    plugin: true,
    selector: '.toast',
    templates: {
      base: '<div class="toast <%= o.type %> <%= o.color %> <%= o.type !== "action" ? "actionable" : "" %> <%= o.css %>">' + ('<div class="infobar ' + Colors.transparent + '">') + '<% if ( o.img ) { %>' + '<img src="<%= o.img %>" class="toast-img infobar-left">' + '<% } %>' + '<% if ( o.icon ) { %>' + '<i class="icon <%= o.title && o.body ? "xlarge" : "" %> infobar-left"><%= o.icon %></i>' + '<% } %>' + '<% if ( o.title || o.body ) { %>' + '<div class="infobar-center">' + '<% if ( o.title ) { %>' + '<p class="infobar-title">' + '<%= o.title %>' + '</p>' + '<% } %>' + '<% if ( o.body ) { %>' + '<%= o.body %>' + '<% } %>' + '</div>' + '<% } %>' + '<% if ( o.buttons.length === 1 ) { %>' + '<div class="infobar-right">' + '<% print ( self.button ( o.buttons[0] ) ) %>' + '</div>' + '<% } %>' + '</div>' + '<% if ( o.buttons.length > 1 ) { %>' + '<div class="toast-buttons multiple center-x">' + '<% for ( var i = 0; i < o.buttons.length; i++ ) { %>' + '<% print ( self.button ( o.buttons[i] ) ) %>' + '<% } %>' + '</div>' + '<% } %>' + '</div>',
      button: '<div class="button <%= o.color || "' + Colors.white + '" %> <%= o.size || "' + Sizes.small + '" %> <%= o.css || "" %>">' + '<%= o.text || "" %>' + '</div>'
    },
    options: {
      anchor: { // Used for selecting the proper queue where this Toast should be attached
        x: 'left',
        y: 'bottom'
      },
      title: false,
      body: false,
      img: false,
      icon: false,
      buttons: [],
      /*
             : [{
                color: Colors.white,
                size: Sizes.small,
                css: '',
                text: '',
                onClick: _.noop // If it returns `false` the Toast won't be closed
             }],
      */
      type: 'alert',
      color: Colors.black,
      css: '',
      persistent: false, // Wether it should survive a change of page or not. Needed when used in frameworks like Meteor
      autoplay: true,
      ttl: 3500,
      ttlMinimumRemaining: 1000, // Auto-closing will be stopped on hover and started again on leave, with a remaining time of `Math.min ( what the remaining time was, this option )`;
      classes: {
        open: 'open'
      },
      selectors: {
        queues: '.toast-queues',
        queue: '.toast-queue',
        button: '.toast-buttons .button, .infobar-right .button'
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

  /* TOAST */

  var Toast = function (_Widgets$Widget32) {
    _inherits(Toast, _Widgets$Widget32);

    function Toast() {
      _classCallCheck(this, Toast);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Toast).apply(this, arguments));
    }

    _createClass(Toast, [{
      key: '_variables',
      value: function _variables() {

        this.$toast = this.$element;
        this.$buttons = this.$toast.find(this.options.selectors.button);

        this.timer = false;
        this._openUrl = false;

        this._isOpen = this.$toast.hasClass(this.options.classes.open);
      }
    }, {
      key: '_init',
      value: function _init() {

        this.$toast.widgetize();

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

        event.preventDefault(); // Otherwise the click goes through the toast in Chrome for iOS

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

        this.$toast.hover(function () {

          _.forOwn(openNotiesData, function (data) {
            return data[0].pause();
          });
        }, function () {

          _.forOwn(openNotiesData, function (data) {
            return data[0].remaining(Math.max(data[1], data[0].remaining())).play();
          });
        });
      }

      /* FLICK */

    }, {
      key: '___flick',
      value: function ___flick() {

        if (this.options.type !== 'action') {

          this.$toast.flickable({
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

          this.___route();
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

        this.$toast.flickable('destroy');

        /* SUPER */

        _get(Object.getPrototypeOf(Toast.prototype), '_reset', this).call(this);
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

          $(this.options.selectors.queues + '.' + this.options.anchor.y + ' ' + this.options.selectors.queue + '.' + this.options.anchor.x).append(this.$toast);

          this._frame(function () {

            this.$toast.addClass(this.options.classes.open);

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

          this.$toast.removeClass(this.options.classes.open);

          this._delay(function () {

            this.$toast.remove();

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

        $('.layout, body').first().append( // `body` is used as a fallback
        '<div class="toast-queues top">' + '<div class="toast-queue expanded"></div>' + '<div class="toast-queues-row">' + '<div class="toast-queue left"></div>' + '<div class="toast-queue center"></div>' + '<div class="toast-queue right"></div>' + '</div>' + '</div>' + '<div class="toast-queues bottom">' + '<div class="toast-queues-row">' + '<div class="toast-queue left"></div>' + '<div class="toast-queue center"></div>' + '<div class="toast-queue right"></div>' + '</div>' + '<div class="toast-queue expanded"></div>' + '</div>');
      }
    }]);

    return Toast;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Toast, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Timer, Svelto.Animations, Svelto.Colors, Svelto.Sizes);

/* =========================================================================
 * Svelto - Lib - Notification
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

// If the tab hasn't the focus and we can use the native notifications than we'll send a native notification, otherwise we will fallback to a toast

(function ($, _, Svelto, Widgets) {

  'use strict';

  /* DEFAULTS */

  var defaults = {
    title: false,
    body: false,
    img: false,
    ttl: Widgets.Toast.config.options.ttl
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

          $.toast(options);
        }
      });
    } else {

      $.toast(options);
    }
  };

  /* BINDING */

  $.notification.defaults = defaults;
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets);

/* =========================================================================
 * Svelto - Widgets - Rater
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require widgets/toast/toast.js
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
      base: '<div class="rater">' + '<% print ( self.stars ( o ) ) %>' + '</div>',
      stars: '<% for ( var i = 1; i <= o.amount; i++ ) { %>' + '<div class="rater-star <%= ( o.value >= i ? "active" : ( o.value >= i - 0.5 ? "half-active" : "" ) ) %>"></div>' + '<% } %>'
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

  var Rater = function (_Widgets$Widget33) {
    _inherits(Rater, _Widgets$Widget33);

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
        var _this60 = this;

        if (!this.options.rated && !this.doingAjax && this.options.url) {

          var rating = this.$stars.index(event.currentTarget) + 1;

          $.ajax({

            data: { rating: rating },
            type: 'POST',
            url: this.options.url,

            beforeSend: function beforeSend() {

              _this60.doingAjax = true;
            },

            error: function error(res) {

              var resj = _.attempt(JSON.parse, res);

              $.toast(_.isError(resj) || !('msg' in resj) ? _this60.options.messages.error : resj.msg);
            },

            success: function success(res) {

              //FIXME: Handle the case where the server requests succeeded but the user already rated or for whatever reason this rating is not processed

              var resj = _.attempt(JSON.parse, res);

              if (!_.isError(resj)) {

                _.merge(_this60.options, resj);

                _this60.$rater.html(_this60._template('stars', _this60.options));

                _this60.options.rated = true;

                _this60._trigger('change');
              }
            },

            complete: function complete() {

              _this60.doingAjax = false;
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
 * Svelto - Widgets - Remote - Action
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote.js
 * @require core/colors/colors.js
 * @require core/sizes/sizes.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

//TODO: Add locking capabilities (Disable the ability to trigger the same action multiple times simultaneously)

//FIXME: Not well written
//FIXME: Clicking an error/success toast doesn't close it

(function ($, _, Svelto, Widgets, Factory, Colors, Sizes) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'remoteAction',
    options: {
      closingDelay: Widgets.Toast.config.options.ttl / 2,
      ajax: {
        cache: false,
        method: 'POST'
      },
      confirmation: { // Options to pass to a confirmation toast, if falsy or `buttons.length === 0` we won't ask for confirmation. If a button as `isConfirmative` it will be used for confirmation, otherwise the last one will be picked
        body: 'Execute action?',
        buttons: [{
          text: 'Cancel'
        }, {
          text: 'Execute',
          color: Colors.secondary,
          isConfirmative: true
        }]
      },
      messages: {
        error: 'An error occurred, please try again later',
        success: 'The action has been executed'
      },
      classes: {
        spinner: {
          color: Colors.white,
          size: Sizes.small,
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
      key: '___confirmationToast',


      /* TOAST */

      value: function ___confirmationToast() {

        if (this.$toast) return;

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

        this._replaceToast(options);
      }
    }, {
      key: '___loadingToast',
      value: function ___loadingToast() {

        this._replaceToast('<svg class="spinner ' + this.options.classes.spinner.color + ' ' + this.options.classes.spinner.size + ' ' + this.options.classes.spinner.css + '"><circle cx="1.625em" cy="1.625em" r="1.25em"></svg>');
      }
    }, {
      key: '_replaceToast',
      value: function _replaceToast(options) {

        var instance = $.toast(_.isString(options) ? { body: options, autoplay: false } : _.extend({}, options, { autoplay: false }));

        instance.close();

        var $toast = instance.$element;

        if (this.$toast) {

          this.$toast.html($toast.html()).widgetize();
        } else {

          this.$toast = $toast;

          this.$toast.toast('open');
        }
      }
    }, {
      key: '_destroyToast',
      value: function _destroyToast(delay) {

        if (!this.$toast) return;

        this._delay(function () {

          this.$toast.toast('close');

          this._delay(function () {

            this.$toast.remove();

            this.$toast = false;
          }, Widgets.Toast.config.options.animations.close);
        }, delay ? this.options.closingDelay : 0);
      }

      /* REQUEST HANDLERS */

    }, {
      key: '__beforesend',
      value: function __beforesend(res) {

        if (this.isAborted()) return;

        this.___loadingToast();

        _get(Object.getPrototypeOf(RemoteAction.prototype), '__beforesend', this).call(this, res);
      }
    }, {
      key: '__error',
      value: function __error(res) {

        if (this.isAborted()) return;

        var resj = _.attempt(JSON.parse, res);

        this._replaceToast(_.isError(resj) || !('msg' in resj) ? this.options.messages.error : resj.msg);

        this._destroyToast(true);

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

          this._replaceToast('msg' in resj ? resj.msg : this.options.messages.success);
          this._destroyToast(true);

          _get(Object.getPrototypeOf(RemoteAction.prototype), '__success', this).call(this, res);
        }
      }

      /* API OVERRIDES */

    }, {
      key: 'request',
      value: function request(_confirmation) {

        if (!_confirmation && this.options.confirmation && 'buttons' in this.options.confirmation && this.options.confirmation.buttons.length) {

          this.___confirmationToast();
        } else {

          _get(Object.getPrototypeOf(RemoteAction.prototype), 'request', this).call(this);
        }
      }
    }, {
      key: 'abort',
      value: function abort() {

        this._destroyToast();

        _get(Object.getPrototypeOf(RemoteAction.prototype), 'abort', this).call(this);
      }
    }]);

    return RemoteAction;
  }(Widgets.Remote);

  /* FACTORY */

  Factory.init(RemoteAction, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Colors, Svelto.Sizes);

/* =========================================================================
 * Svelto - Widgets - Remote - Action (Helper)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./action.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets) {

  'use strict';

  /* HELPER */

  $.remoteAction = function (ajax) {

    new Widgets.RemoteAction({ ajax: ajax }).request();
  };
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets);

/* =========================================================================
 * Svelto - Widgets - Remote - Action (Trigger)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote_trigger.js
 * @require ./action.js
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
 * Svelto - Widgets - Remote - Modal
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote.js
 * @require widgets/modal/modal.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

//TODO: Add locking capabilities, both at class-level and global-level (should be layout-level but seems impossible to implement)
//FIXME: Not well written

(function ($, _, Svelto, Widgets, Factory, Animations) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'remoteModal',
    options: {
      persistent: false, // Wether it should survive a change of page or not. Needed when used in frameworks like Meteor
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
        resizing: 'remote-modal-resizing',
        showing: 'remote-modal-showing'
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
      key: '_getUrl',


      /* PRIVATE */

      value: function _getUrl() {

        return window.location.href.split('#')[0];
      }

      /* PERSISTENT */

    }, {
      key: '___persistent',
      value: function ___persistent() {

        if (!this.options.persistent) {

          this.___route();
        }
      }
    }, {
      key: '__route',
      value: function __route() {

        var currentUrl = this._getUrl();

        if (this._openUrl && this._openUrl !== currentUrl) {

          this.abort();
        }
      }

      /* MODAL */

    }, {
      key: '___loadingModal',
      value: function ___loadingModal() {

        /*
          <div class="modal ${this.options.classes.placeholder} card">
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

        this._defer(function () {

          this._openUrl = this._getUrl();
        });

        this.___persistent();
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

        $.toast(_.isError(resj) || !('msg' in resj) ? this.options.messages.error : resj.msg);

        this._destroyModal();

        _get(Object.getPrototypeOf(RemoteModal.prototype), '__error', this).call(this, res);
      }
    }, {
      key: '__success',
      value: function __success(res) {
        var _this64 = this;

        if (this.isAborted()) return;

        var resj = _.attempt(JSON.parse, res);

        if (_.isError(resj) || !('modal' in resj)) {

          return this.__error(res);
        } else {
          (function () {

            /* VARIABLES */

            var prevRect = _this64.$modal.getRect(),
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

                  _this64.$modal.attr(attribute.name, attribute.value);
                } else {

                  _this64.$modal.addClass(attribute.value);
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

            _this64._frame(function () {

              this.$modal.html($remoteModal.html()).widgetize();

              this.$modal.addClass(this.options.classes.loaded);

              var newRect = this.$modal.getRect();

              this.$modal.css({
                width: prevRect.width,
                height: prevRect.height
              });

              this.$modal.addClass(this.options.classes.resizing);

              this._frame(function () {
                var _this65 = this;

                this.$modal.addClass(this.options.classes.showing);

                this.$modal.animate({
                  width: newRect.width,
                  height: newRect.height
                }, this.options.animations.resize, function () {
                  _this65.$modal.css({
                    width: '',
                    height: ''
                  }).removeClass(_this65.options.classes.placeholder + ' ' + _this65.options.classes.loaded + ' ' + _this65.options.classes.resizing + ' ' + _this65.options.classes.showing);
                });
              });
            });

            _get(Object.getPrototypeOf(RemoteModal.prototype), '__success', _this64).call(_this64, res);
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
 * Svelto - Widgets - Remote - Modal (Helper)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./modal.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets) {

  'use strict';

  /* HELPER */

  $.remoteModal = function (ajax) {

    new Widgets.RemoteModal({ ajax: ajax }).request();
  };
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets);

/* =========================================================================
 * Svelto - Widgets - Remote - Modal (Trigger)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote_trigger.js
 * @require ./modal.js
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
 * Svelto - Widgets - Tagbox
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/keyboard/keyboard.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

//FIXME: Auto focus on the partial input doesn't work good on mobile, the keyboard keeps opening and closing

(function ($, _, Svelto, Widgets, Factory, Colors, Sizes, Pointer, Keyboard) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'tagbox',
    plugin: true,
    selector: '.tagbox',
    templates: {
      tag: '<div class="label tagbox-tag <%= o.color %> <%= o.size %> <%= o.css %>" data-tag-value="<%= o.value %>">' + '<span>' + '<%= o.value %>' + '</span>' + ('<i class="icon ' + Sizes.xsmall + ' actionable tagbox-tag-remover">close</i>') + '</div>'
    },
    options: {
      init: '', // Initial value
      tags: [],
      tag: {
        minLength: 3,
        color: Colors.gray,
        size: '',
        css: 'circular'
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

  var Tagbox = function (_Widgets$Widget34) {
    _inherits(Tagbox, _Widgets$Widget34);

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

        /* REMOVE PREVIOUS */

        this.$tagbox.find(this.options.selectors.tag).remove();

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

        return this._template('tag', _.extend({ value: value }, this.options.tag));
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

            $.toast(_.format(this.options.messages.tooShort, value, this.options.tag.minLength));
          }
        } else if (_.includes(this.options.tags, value)) {

          $.toast(_.format(this.options.messages.duplicate, value));
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

        if (_.includes(this.options.characters.inserters, event.keyCode) || event.keyCode === this.options.characters.separator.charCodeAt(0)) {

          var added = this.add(value);

          if (added) {

            this._clearPartial();
          }

          event.preventDefault();
          event.stopImmediatePropagation();
        } else if (event.keyCode === Keyboard.keys.BACKSPACE) {

          if (!value.length && this.options.tags.length) {

            var $tag = this.$tagbox.find(this.options.selectors.tag).last(),
                edit = !Keyboard.keystroke.hasCtrlOrCmd(event);

            this.remove($tag, edit);

            event.preventDefault();
            event.stopImmediatePropagation();
          }
        } else if (this.options.characters.forbid && _.includes(this.options.characters.forbidden, String.fromCharCode(event.keyCode))) {

          $.toast(this.options.messages.forbidden);

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
            adds = _.map(tags, this._add.bind(this));

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

          for (var _i2 = 0, _l2 = tags.length; _i2 < _l2; _i2++) {

            this._remove($tags[_i2], tags[_i2]);
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
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Colors, Svelto.Sizes, Svelto.Pointer, Svelto.Keyboard);

/* =========================================================================
 * Svelto - Widgets - Toast (Helper)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./toast.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets) {

  'use strict';

  /* HELPER */

  $.toast = function () {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


    /* OPTIONS */

    options = _.isPlainObject(options) ? options : { body: String(options) };

    /* TYPE */

    if (options.buttons) {

      options.type = 'action';
    }

    /* TOAST */

    return new Widgets.Toast(options);
  };
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets);

/* =========================================================================
 * Svelto - Lib - Touching
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ($, _, Svelto) {

  'use strict';

  /* UTILITIES */

  var getOverlappingArea = function getOverlappingArea(rect1, rect2) {

    var overlapX = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left)),
        overlapY = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));

    return overlapX * overlapY;
  };

  /* DEFAULTS */

  var defaults = {
    point: false, // Used for the punctual search
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

      var _iteratorNormalCompletion14 = true;
      var _didIteratorError14 = false;
      var _iteratorError14 = undefined;

      try {
        for (var _iterator14 = $searchable[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
          var searchable = _step14.value;


          var rect2 = $.getRect(searchable),
              area = getOverlappingArea(rect1, rect2);

          if (area > 0) {

            nodes.push(searchable);
            areas.push(area);
          }
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

      return nodes.length ? options.onlyBest ? $(nodes[areas.indexOf(_.max(areas))]) : $(nodes) : false;
    }

    /* PUNCTUAL */

    if (options.point) {
      var _iteratorNormalCompletion15 = true;
      var _didIteratorError15 = false;
      var _iteratorError15 = undefined;

      try {

        for (var _iterator15 = $searchable[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
          var _searchable = _step15.value;


          var rect = $.getRect(_searchable);

          if (options.point.y >= rect.top && options.point.y <= rect.bottom && options.point.x >= rect.left && options.point.x <= rect.right) {

            return $(_searchable);
          }
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

    /* DEFAULT */

    return false;
  };

  /* BINDING */

  $.fn.touching.defaults = defaults;
})(Svelto.$, Svelto._, Svelto);

/* =========================================================================
 * Svelto - Widgets - Droppable
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * @require lib/touching/touching.js
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

  var Droppable = function (_Widgets$Widget35) {
    _inherits(Droppable, _Widgets$Widget35);

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
 * Svelto - Lib - Transform
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

/* TRANSFORM UTILITIES */

(function ($, _, Modernizr, Svelto) {

  'use strict';

  /* MATRIX */

  var property = Modernizr.prefixedCSS('transform');

  $.fn.matrix = function (values) {

    if (values) {

      values = values.map(function (val) {
        return Number(val).toFixed(20);
      }).join(',');

      this.css(property, 'matrix(' + values + ')');

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
        x: matrix[4],
        y: matrix[5]
      };
    }
  };
})(Svelto.$, Svelto._, Svelto.Modernizr, Svelto);

/* =========================================================================
 * Svelto - Lib - Positionate
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * @require lib/directions/directions.js
 * @require lib/embedded_css/embedded_css.js
 * @require lib/transform/transform.js
 * ========================================================================= */

//FIXME: If the positionable element is let than half of the anchor, and it must be pointed than the pointer may be not well positionated (expecially if we are not aligning to the center)

(function ($, _, Svelto, Directions, EmbeddedCSS) {

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

  /* DEFAULTS */

  var defaults = {
    axis: false, // Set a preferred axis
    strict: false, // If enabled only use the setted axis/direction, even if it won't be the optimial choice
    $anchor: false, // Positionate next to an $anchor element
    point: false, // Positionate at coordinates, ex: { x: number, y: number }
    pointer: false, // The element pointing to the anchor, can be: false -> no pointer, 'auto' -> pointer using the `pointing` decorator, $element -> element used as pointer
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
        directions = _.uniq(_.union(options.direction ? [options.direction] : [], options.axis ? options.directions[options.axis] : [], !options.strict || !options.direction && !options.axis ? options.directions.all : [])),
        anchorRect = options.$anchor ? options.$anchor.getRect() : { top: options.point.y, bottom: options.point.y, left: options.point.x, right: options.point.x, width: 0, height: 0 };

    /* ID */

    positionable._positionateGuid = positionable._positionateGuid || $.guid++;
    positionable._positionateGuc = 'positionate-' + positionable._positionateGuid;

    $positionable.addClass(positionable._positionateGuc);

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

        var opposite = Directions.getOpposite(directions[index]),
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

    var prevDirection = positionable._positionatePrevDirection;

    positionable._positionatePrevDirection = bestDirection;

    if (prevDirection !== bestDirection) {

      $positionable.removeClass('position-' + prevDirection).addClass('position-' + bestDirection);
    }

    /* POINTER */

    var prevPointer = positionable._positionatePrevPointer;

    positionable._positionatePrevPointer = options.pointer;

    if (prevPointer === 'auto' && (options.pointer !== 'auto' || bestDirection !== prevDirection)) {

      var oppositeDirection = Directions.getOpposite(prevDirection);

      $positionable.removeClass('pointing-' + oppositeDirection);
    }

    if (options.pointer) {

      if (options.pointer === 'auto') {

        var _oppositeDirection = Directions.getOpposite(bestDirection);

        $positionable.addClass('pointing-' + _oppositeDirection);
      }

      /* MOVING */

      switch (bestDirection) {

        case 'top':
        case 'bottom':
          var deltaX = _.clamp(anchorRect.left - coordinates.left + anchorRect.width / 2, 0, positionableRect.width);
          if (options.pointer instanceof $) {
            options.pointer.translate(deltaX, 0);
          } else if (options.pointer === 'auto') {
            EmbeddedCSS.set('.' + positionable._positionateGuc + ':after', 'left:' + deltaX + 'px !important;'); //TODO: Maybe use `transform` instead, since it lead to improved performances
          }
          break;

        case 'left':
        case 'right':
          var deltaY = _.clamp(positionableRect.height, anchorRect.top - coordinates.top + anchorRect.height / 2, 0, positionableRect.height);
          if (options.pointer instanceof $) {
            options.pointer.translate(0, deltaY);
          } else if (options.pointer === 'auto') {
            EmbeddedCSS.set('.' + positionable._positionateGuc + ':after', 'top:' + deltaY + 'px !important;'); //TODO: Maybe use `transform` instead, since it lead to improved performances
          }
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
})(Svelto.$, Svelto._, Svelto, Svelto.Directions, Svelto.EmbeddedCSS);

/* =========================================================================
 * Svelto - Widgets - Popover
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * @require lib/embedded_css/embedded_css.js
 * @require lib/positionate/positionate.js
 * @require lib/touching/touching.js
 * ========================================================================= */

//FIXME: Close it if after a `route` event the trigger element is no longer visible

(function ($, _, Svelto, Widgets, Factory, Pointer, EmbeddedCSS, Animations) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'popover',
    plugin: true,
    selector: '.popover',
    options: {
      positionate: {}, // Extending `$.positionate` options
      spacing: {
        affixed: 0,
        noTip: 5,
        normal: 12
      },
      classes: {
        anchorDirection: 'popover-anchor-$1',
        noTip: 'no-tip',
        affixed: 'affixed',
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

  /* POPOVER */

  var Popover = function (_Widgets$Widget36) {
    _inherits(Popover, _Widgets$Widget36);

    function Popover() {
      _classCallCheck(this, Popover);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Popover).apply(this, arguments));
    }

    _createClass(Popover, [{
      key: '_variables',


      /* SPECIAL */

      value: function _variables() {

        this.$popover = this.$element;

        this.$popover.addClass(this.guc);

        this.hasTip = !this.$popover.hasClass(this.options.classes.noTip);
        this.isAffixed = this.$popover.hasClass(this.options.classes.affixed);

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

        var $parents = this.$popover.parents().add(this.$anchor ? this.$anchor.parents() : undefined).add(this.$window);

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

        if (event === this._openEvent || this.$popover.touching({ point: $.eventXY(event) }).length) return;

        this.close();
      }

      /* POSITIONATE */

    }, {
      key: '_positionate',
      value: function _positionate() {

        /* VARIABLES */

        var noTip = this.$anchor && this.$anchor.hasClass(this.options.classes.noTip) || !this.hasTip || this.isAffixed,
            spacing = this.isAffixed ? this.options.spacing.affixed : noTip ? this.options.spacing.noTip : this.options.spacing.normal;

        /* POSITIONATE */

        this.$popover.positionate(_.extend({
          $anchor: this.$anchor,
          pointer: noTip ? false : 'auto',
          spacing: spacing,
          callbacks: {
            change: this.__positionChange.bind(this)
          }
        }, this.options.positionate));
      }
    }, {
      key: '_toggleAnchorDirectionClass',
      value: function _toggleAnchorDirectionClass(direction, force) {

        if (!this.$anchor) return;

        this.$anchor.toggleClass(_.format(this.options.classes.anchorDirection, direction), force);
      }
    }, {
      key: '__positionChange',
      value: function __positionChange(data) {

        /* ANCHOR CLASS */

        if (this._prevDirection !== data.direction) {

          if (this._prevDirection) {

            this._toggleAnchorDirectionClass(this._prevDirection, false);
          }

          this._toggleAnchorDirectionClass(data.direction, true);

          this._prevDirection = data.direction;
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

          this._toggleAnchorDirectionClass(this._prevDirection, false);
          this._prevDirection = false;

          this.$prevAnchor = this.$anchor;

          if (this._isOpen) {

            this._wasMoving = true;

            this.$popover.addClass(this.options.classes.moving);
          }
        }

        /* ANCHOR */

        this.$anchor = anchor ? $(anchor) : false;

        /* BEFORE OPENING */

        this._trigger('beforeopen');

        /* OPENING */

        this._frame(function () {

          this.$popover.addClass('show');

          this._positionate();

          this._frame(function () {

            this.$popover.addClass(this.options.classes.open);

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

        this._toggleAnchorDirectionClass(this._prevDirection, false);
        this._prevDirection = false;

        this.$prevAnchor = this.$anchor;
        this.$anchor = false;

        /* CLOSING */

        this._frame(function () {

          this.$popover.removeClass(this.options.classes.open);

          if (this._wasMoving) {

            this.$popover.removeClass(this.options.classes.moving);
          }

          this._delay(function () {

            this.$popover.removeClass(this.options.classes.show);

            this._lock = false;

            this._trigger('close');
          }, this.options.animations.close);
        });

        /* RESETTING */

        this._reset();
      }
    }]);

    return Popover;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Popover, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.EmbeddedCSS, Svelto.Animations);

/* =========================================================================
 * Svelto - Widgets - Popover - Targeters - Closer
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../popover.js
 * @require widgets/targeter/closer/closer.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'popoverCloser',
    plugin: true,
    selector: '.popover-closer',
    options: {
      widget: Widgets.Popover
    }
  };

  /* POPOVER CLOSER */

  var PopoverCloser = function (_Widgets$Closer7) {
    _inherits(PopoverCloser, _Widgets$Closer7);

    function PopoverCloser() {
      _classCallCheck(this, PopoverCloser);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(PopoverCloser).apply(this, arguments));
    }

    return PopoverCloser;
  }(Widgets.Closer);

  /* FACTORY */

  Factory.init(PopoverCloser, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Widgets - Popover - Targeters - Opener
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../popover.js
 * @require widgets/targeter/opener/opener.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'popoverOpener',
    plugin: true,
    selector: '.popover-opener',
    options: {
      widget: Widgets.Popover
    }
  };

  /* POPOVER OPENER */

  var PopoverOpener = function (_Widgets$Opener6) {
    _inherits(PopoverOpener, _Widgets$Opener6);

    function PopoverOpener() {
      _classCallCheck(this, PopoverOpener);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(PopoverOpener).apply(this, arguments));
    }

    return PopoverOpener;
  }(Widgets.Opener);

  /* FACTORY */

  Factory.init(PopoverOpener, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Widgets - Popover - Targeters - Toggler
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../popover.js
 * @require widgets/targeter/toggler/toggler.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'popoverToggler',
    plugin: true,
    selector: '.popover-toggler',
    options: {
      widget: Widgets.Popover
    }
  };

  /* POPOVER TOGGLER */

  var PopoverToggler = function (_Widgets$Toggler6) {
    _inherits(PopoverToggler, _Widgets$Toggler6);

    function PopoverToggler() {
      _classCallCheck(this, PopoverToggler);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(PopoverToggler).apply(this, arguments));
    }

    return PopoverToggler;
  }(Widgets.Toggler);

  /* FACTORY */

  Factory.init(PopoverToggler, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Widgets - Select
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/browser/browser.js
 * @require widgets/popover/popover.js
 * ========================================================================= */

//TODO: Add support for selecting multiple options (with checkboxes maybe)
//TODO: Add an input field for searching through the options

(function ($, _, Svelto, Widgets, Factory, Browser, Pointer, Colors) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'select',
    plugin: true,
    selector: '.select',
    templates: {
      base: '<div class="popover select-popover card <%= o.size %> <%= o.color %> <%= o.css %> <%= o.guc %>">' + '<div class="card-block">' + '<% for ( var i = 0, l = o.options.length; i < l; i++ ) { %>' + '<% print ( self[ o.options[i].value ? "option" : "optgroup" ] ( { opt: o.options[i], color: o.color } ) ) %>' + '<% } %>' + '</div>' + '</div>',
      optgroup: '<div class="divider">' + '<%= o.opt.prop %>' + '</div>',
      option: '<div class="button <%= o.color %>" data-value="<%= o.opt.prop %>">' + '<%= o.opt.value %>' + '</div>'
    },
    options: {
      native: Browser.is.touchDevice, // Don't show the popover and use the native select, by default on touch devices
      popover: {
        size: '',
        color: Colors.white,
        css: Widgets.Popover.config.options.classes.affixed + ' bordered'
      },
      classes: {
        selected: 'active highlighted highlight-left',
        affixed: Widgets.Popover.config.options.classes.affixed
      },
      datas: {
        value: 'value'
      },
      selectors: {
        select: 'select',
        option: 'option',
        valueholder: '.select-value',
        button: '.button'
      },
      callbacks: {
        change: _.noop,
        open: _.noop,
        close: _.noop
      }
    }
  };

  /* SELECT */

  var Select = function (_Widgets$Widget37) {
    _inherits(Select, _Widgets$Widget37);

    function Select() {
      _classCallCheck(this, Select);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Select).apply(this, arguments));
    }

    _createClass(Select, [{
      key: '_variables',


      /* SPECIAL */

      value: function _variables() {

        this.$wrp = this.$element;
        this.$select = this.$wrp.find(this.options.selectors.select);
        this.$options = this.$select.find(this.options.selectors.option);
        this.$valueholder = this.$wrp.find(this.options.selectors.valueholder);

        this.selectOptions = [];

        this.$popover = false;
      }
    }, {
      key: '_init',
      value: function _init() {

        this._updateValueholder();

        if (!this.options.native) {

          this.$select.addClass(this.options.classes.hidden);

          this.___selectOptions();
          this.___popover();
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

          this._on(this.$popover, Pointer.tap, this.options.selectors.button, this.__buttonTap);
        }
      }
    }, {
      key: '__buttonTap',
      value: function __buttonTap(event) {

        this.$popover.popover('close');

        this.set($(event.currentTarget).data(this.options.datas.value));
      }

      /* OPTIONS */

    }, {
      key: '___selectOptions',
      value: function ___selectOptions() {
        //FIXME: Add support for arbitrary number of optgroups nesting levels

        var previousOptgroup = void 0;

        var _iteratorNormalCompletion16 = true;
        var _didIteratorError16 = false;
        var _iteratorError16 = undefined;

        try {
          for (var _iterator16 = this.$options[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
            var option = _step16.value;


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
      }

      /* POPOVER */

    }, {
      key: '___popover',
      value: function ___popover() {

        var html = this._template('base', _.extend({ guc: this.guc, options: this.selectOptions }, this.options.popover));

        this.$popover = $(html).appendTo(this.$layout);
        this.$buttons = this.$popover.find(this.options.selectors.button);

        this.$popover.popover({
          positionate: {
            axis: 'y',
            strict: true
          },
          callbacks: {
            beforeopen: this.__setPopoverWidth.bind(this),
            open: this.__popoverOpen.bind(this),
            close: this.__popoverClose.bind(this)
          }
        });

        this.$wrp.attr('data-' + Widgets.Targeter.config.options.datas.target, '.' + this.guc).popoverToggler();

        this._updatePopover();
      }
    }, {
      key: '__setPopoverWidth',
      value: function __setPopoverWidth() {

        if (this.$popover.is('.' + this.options.classes.affixed)) {

          this.$popover.css('min-width', this.$wrp.outerWidth());
        }
      }
    }, {
      key: '__popoverOpen',
      value: function __popoverOpen() {

        this.___buttonTap();

        this._trigger('open');
      }
    }, {
      key: '__popoverClose',
      value: function __popoverClose() {

        this._reset();

        this.___change();

        this._trigger('close');
      }

      /* UPDATE */

    }, {
      key: '_updateValueholder',
      value: function _updateValueholder() {

        var value = this.$select.val();

        if (_.isString(value) && value.length) {

          var $selectedOption = this.$options.filter('[value="' + value + '"]');

          this.$valueholder.text($selectedOption.text());
        }
      }
    }, {
      key: '_updatePopover',
      value: function _updatePopover() {

        this.$buttons.removeClass(this.options.classes.selected);

        this.$buttons.filter('[data-' + this.options.datas.value + '="' + this.$select.val() + '"]').addClass(this.options.classes.selected);
      }
    }, {
      key: '_update',
      value: function _update() {

        this._updateValueholder();

        if (!Browser.is.touchDevice) {

          this._updatePopover();
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

    return Select;
  }(Widgets.Widget);

  /* FACTORY */

  Factory.init(Select, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Browser, Svelto.Pointer, Svelto.Colors);

/* =========================================================================
 * Svelto - Widgets - Tooltip
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require widgets/popover/popover.js
 * ========================================================================= */

(function ($, _, Svelto, Widgets, Factory) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'tooltip',
    plugin: true,
    selector: '.tooltip'
  };

  /* TOOLTIP */

  var Tooltip = function (_Widgets$Popover) {
    _inherits(Tooltip, _Widgets$Popover);

    function Tooltip() {
      _classCallCheck(this, Tooltip);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Tooltip).apply(this, arguments));
    }

    return Tooltip;
  }(Widgets.Popover);

  /* FACTORY */

  Factory.init(Tooltip, config, Widgets);
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Widgets - Tooltip - Targeters - Closer
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../tooltip.js
 * @require widgets/targeter/closer/closer.js
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
 * Svelto - Widgets - Tooltip - Targeters - Opener
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../tooltip.js
 * @require widgets/targeter/opener/opener.js
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
 * Svelto - Widgets - Tooltip - Targeters - Toggler
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../tooltip.js
 * @require widgets/targeter/toggler/toggler.js
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

/* =========================================================================
 * Svelto - Widgets - Slider
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require lib/transform/transform.js
 * @require widgets/draggable/draggable.js
 * ========================================================================= */

//TODO: Add vertical slider

(function ($, _, Svelto, Widgets, Factory) {

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
        bar: '.slider-bar',
        highlight: '.slider-highlight',
        handler: '.slider-handler',
        label: '.slider-handler .slider-label'
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

  var Slider = function (_Widgets$Widget38) {
    _inherits(Slider, _Widgets$Widget38);

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
        this.$bar = this.$slider.find(this.options.selectors.bar);
        this.$highlight = this.$slider.find(this.options.selectors.highlight);
        this.$handler = this.$slider.find(this.options.selectors.handler);
        this.$label = this.$slider.find(this.options.selectors.label);
      }
    }, {
      key: '_init',
      value: function _init() {

        /* VARIABLES */

        var value = this.$input.val();

        /* OPTIONS */

        this.options.min = Number(this.$slider.data(this.options.datas.min) || this.options.min);
        this.options.max = Number(this.$slider.data(this.options.datas.max) || this.options.max);
        this.options.value = this._sanitizeValue(value || this.options.value);
        this.options.step = Number(this.$slider.data(this.options.datas.step) || this.options.step);
        this.options.decimals = Number(this.$slider.data(this.options.datas.decimals) || this.options.decimals);

        /* STEPS NR */

        this.stepsNr = (this.options.max - this.options.min) / this.options.step;

        /* UPDATE */

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
        this.___keydown();
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

        this.barWidth = this.$bar.width();

        this.stepWidth = this.barWidth / this.stepsNr;
      }
    }, {
      key: '_updatePositions',
      value: function _updatePositions() {
        var value = arguments.length <= 0 || arguments[0] === undefined ? this.options.value : arguments[0];


        var percentage = (value - this.options.min) / this.options.step * 100 / this.stepsNr;

        this.$handler.css('left', percentage + '%');
        this.$highlight.css('right', 100 - percentage + '%');
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
            $element: this.$slider,
            noMotion: this.__dragNoMotion.bind(this)
          },
          modifiers: {
            x: this.__dragModifierX.bind(this)
          },
          callbacks: {
            start: this.__dragStart.bind(this),
            move: this.__dragMove.bind(this),
            end: this.__dragEnd.bind(this)
          }
        });
      }
    }, {
      key: '__dragNoMotion',
      value: function __dragNoMotion() {

        return !this._dragDistance;
      }
    }, {
      key: '_dragValue',
      value: function _dragValue() {

        return this._sanitizeValue(this.options.value + this._dragDistance / this.stepWidth * this.options.step);
      }
    }, {
      key: '__dragModifierX',
      value: function __dragModifierX(distance) {

        this._dragDistance = this._dragProxyDistance + _.roundCloser(distance, this.stepWidth);

        if (this._dragIsProxyed && !this._dragProxyDistance) {

          this._dragProxyDistance = this._dragDistance;
        }

        return false;
      }
    }, {
      key: '__dragStart',
      value: function __dragStart(event, data) {

        this._dragIsProxyed = data.isProxyed;
        this._dragProxyDistance = 0;
        this._dragDistance = 0;

        this._updateVariables();
      }
    }, {
      key: '__dragMove',
      value: function __dragMove() {

        var value = this._dragValue();

        if (this.options.live) {

          this.set(value);
        } else {

          this._updateLabel(value);
          this._updatePositions(value);
        }
      }
    }, {
      key: '__dragEnd',
      value: function __dragEnd() {

        this.set(this._dragValue());
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
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory);

/* =========================================================================
 * Svelto - Widgets - Switch
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/colors/colors.js
 * @require lib/transform/transform.js
 * @require widgets/draggable/draggable.js
 * ========================================================================= */

//TODO: Add flick support

(function ($, _, Svelto, Widgets, Factory, Colors) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'switch',
    plugin: true,
    selector: '.switch',
    options: {
      colors: {
        on: Colors.secondary,
        off: Colors.gray
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

  var Switch = function (_Widgets$Widget39) {
    _inherits(Switch, _Widgets$Widget39);

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

        this.isChecked = this.$input.prop('checked');

        this.switchWidth = this.$switch.width();
        this.handlerWidth = this.$handler.width();
      }
    }, {
      key: '_init',
      value: function _init() {

        /* OPTIONS */

        this.options.colors.on = this.$switch.data(this.options.datas.colors.on) || this.options.colors.on;
        this.options.colors.off = this.$switch.data(this.options.datas.colors.off) || this.options.colors.off;

        /* INITIAL SETTING */

        this._updateColors();
        this._updatePosition();
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

          var isChecked = data.dragXY.x + this.handlerWidth / 2 >= this.switchWidth / 2;

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
})(Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Colors);

/* =========================================================================
 * Svelto - Lib - Validator
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * @require lib/regexes/regexes.js
 * ========================================================================= */

//TODO: Most of them will return false for empty strings, is this the wanted behaviour?

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
    creditCard: function creditCard(value) {
      return !!value.match(Regexes.creditCard);
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
 * Svelto - Widgets - Form Validate
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * @require lib/validator/validator.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

//TODO: Add support for multiple checkboxes validation
//TODO: Add meta validators that accepts other validators as arguments, for example not[email], oppure not[matches[1,2,3]] oppure or[email,url] etc... maybe write it this way: or[matches(1-2-3)/matches(a-b-c)], or just use a smarter regex

(function ($, _, Svelto, Widgets, Factory, Validator) {

  'use strict';

  /* CONFIG */

  var config = {
    name: 'formValidate',
    plugin: true,
    selector: 'form.validate',
    templates: {
      message: '<p class="form-validate-message <%= o.validity %>">' + '<%= o.message %>' + '</p>',
      messages: '<ul class="form-validate-message <%= o.validity %>">' + '<% for ( var i = 0, l = o.messages.length; i < l; i++ ) { %>' + '<li><%= o.messages[i] %></li>' + '<% } %>' + '</ul>'
    },
    options: {
      validators: { // If not found here it will use `Validator`'s validators

        required: function required(value) {
          return !Validator.empty(value);
        },
        values: function values(value) {
          for (var _len6 = arguments.length, _values = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
            _values[_key6 - 1] = arguments[_key6];
          }

          return Validator.included(value, _values);
        },
        field: function field(value, fieldName) {
          var fieldValue = _.find(this.elements, { name: fieldName }).value;
          return value === fieldValue;
        },
        checked: function checked() {
          return this.element.$element.prop('checked');
        },
        regex: function regex(value, _regex) {
          return !!value.match(new RegExp(_regex));
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
            minLength: 'The length must be at least $2',
            maxLength: 'The length must be at maximum $2',
            rangeLength: 'The length must be between $2 and $3',
            exactLength: 'The length must be exactly $2',
            email: 'Enter a valid email address',
            creditCard: 'Enter a valid credit card number',
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
        wrapper: '.checkbox, .colorpicker, .datepicker, .radio, .select, .slider, .switch'
      }
    }
  };

  /* FORM VALIDATE */

  var FormValidate = function (_Widgets$Widget40) {
    _inherits(FormValidate, _Widgets$Widget40);

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

        var _iteratorNormalCompletion17 = true;
        var _didIteratorError17 = false;
        var _iteratorError17 = undefined;

        try {
          for (var _iterator17 = this.$elements[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
            var element = _step17.value;


            var $element = $(element),
                $wrappers = $element.parents(this.options.selectors.wrapper),
                $wrapper = $wrappers.length ? $wrappers.first() : $element,
                id = $.guid++,
                validationsStr = $element.data(this.options.datas.validations),
                validations = false;

            if (validationsStr) {

              validations = {};

              var validationsArr = validationsStr.split(this.options.characters.separators.validations);

              var _iteratorNormalCompletion18 = true;
              var _didIteratorError18 = false;
              var _iteratorError18 = undefined;

              try {
                for (var _iterator18 = validationsArr[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                  var validationStr = _step18.value;


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
                _didIteratorError18 = true;
                _iteratorError18 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion18 && _iterator18.return) {
                    _iterator18.return();
                  }
                } finally {
                  if (_didIteratorError18) {
                    throw _iteratorError18;
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
          _didIteratorError17 = true;
          _iteratorError17 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion17 && _iterator17.return) {
              _iterator17.return();
            }
          } finally {
            if (_didIteratorError17) {
              throw _iteratorError17;
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

          $.toast(this.options.messages.form.invalid);
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
              msgHtml = _.isString(message) ? this._template('message', { message: message, validity: validity }) : message.length === 1 ? this._template('message', { message: message[0], validity: validity }) : this._template('messages', { messages: message, validity: validity });

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
 * Svelto - Widgets - Form Ajax
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before ../validate/validate.js
 * @require core/svelto/svelto.js
 * @require widgets/toast/toast.js
 * @require widgets/spinner/overlay/overlay.js
 * ========================================================================= */

//TODO: Add a way to abort it, maybe hovering the spinner a clickable X will be displayed and abort the request if tapped (or something more intuitive and easier to implement...)

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

  var FormAjax = function (_Widgets$Widget41) {
    _inherits(FormAjax, _Widgets$Widget41);

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
        var _this82 = this;

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

            if (_this82.options.spinnerOverlay) {

              _this82.$form.spinnerOverlay('open');
            }

            _this82._trigger('beforesend');
          },

          error: function error(res) {

            var resj = _.attempt(JSON.parse, res);

            if (!_.isError(resj)) {

              $.toast(resj.msg || _this82.options.messages.error);
            } else {

              $.toast(_this82.options.messages.error);
            }

            _this82._trigger('error');
          },

          success: function success(res) {

            var resj = _.attempt(JSON.parse, res);

            if (!_.isError(resj)) {

              if (resj.refresh || resj.url === window.location.href || _.trim(resj.url, '/') === _.trim(window.location.pathname, '/')) {

                $.toast(resj.msg || _this82.options.messages.refreshing);

                location.reload();
              } else if (resj.url) {

                // In order to redirect to another domain the protocol must be provided. For instance `http://www.domain.tld` will work while `www.domain.tld` won't

                $.toast(resj.msg || _this82.options.messages.redirecting);

                location.assign(resj.url);
              } else {

                $.toast(resj.msg || _this82.options.messages.success);
              }
            } else {

              $.toast(_this82.options.messages.success);
            }

            _this82._trigger('success');
          },

          complete: function complete() {

            if (_this82.options.spinnerOverlay) {

              _this82.$form.spinnerOverlay('close');
            }

            _this82._trigger('complete');
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
 * Svelto - Widgets - _ - Scroll
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/pointer/pointer.js
 * @require core/svelto/svelto.js
 * @require core/widgetize/widgetize.js
 * ========================================================================= */

//FIXME: It doesn't work if the layout is body, it also need html in some browsers (Which browsers?)
//TODO: Add a .scroll-to-target widget, with data-target and awareness of the attached stuff

(function ($, _, Svelto, Widgetize, Pointer, Animations) {

  'use strict';

  /* SCROLL TO TOP */

  Widgetize.add('.scroll-to-top', function ($scroller) {

    var $layout = $scroller.parent().closest('.layout, body'); // `body` is used as a fallback

    $scroller.on(Pointer.tap, function () {

      $layout.animate({ scrollTop: 0 }, Animations.normal);
    });
  });
})(Svelto.$, Svelto._, Svelto, Svelto.Widgetize, Svelto.Pointer, Svelto.Animations);

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
 * Svelto - Widgets - Fullscreen
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/pointer/pointer.js
 * @require core/svelto/svelto.js
 * @require core/widgetize/widgetize.js
 * @require ./vendor/screenfull.js
 * ========================================================================= */

//FIXME: It doesn't work in iOS's Safari and IE10
//TODO: Rewrite it
//TODO: Add the ability to trigger the fullscreen for a specific element

(function ($, _, Svelto, Widgetize, Pointer) {

  'use strict';

  /* FULLSCREEN */

  Widgetize.add('.fullscreen-toggler', function ($toggler) {

    $toggler.on(Pointer.tap, screenfull.toggle);
  });
})(Svelto.$, Svelto._, Svelto, Svelto.Widgetize, Svelto.Pointer);

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
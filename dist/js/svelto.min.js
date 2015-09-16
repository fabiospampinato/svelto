
/* =========================================================================
 * Svelto - Lo-dash (Extras) v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

;(function ( _, window, document, undefined ) {

  'use strict';

  /* LODASH EXTRA */

  _.mixin ({

    /**
     * Gets the number of seconds that have elapsed since the Unix epoch
     * (1 January 1970 00:00:00 UTC).
     *
     * _.defer(function(stamp) {
     *   console.log(_.nowSecs() - stamp);
     * }, _.nowSecs());
     * // => logs the number of seconds it took for the deferred function to be invoked
     */

    nowSecs: function () {

      return _.floor ( _.now () / 1000 );

    },

    /**
     * Gets a string format of number of seconds elapsed.
     *
     * _.timeAgo ( _.nowSecs () )
     * // => Just now
     */

    timeAgo: function ( timestamp ) { //INFO: Timestamp is required in seconds

      var elapsed = _.nowSecs () - timestamp,
          justNow = 5;

      var names = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second'],
          times = [31536000, 2592000, 604800, 86400, 3600, 60, 1];

      if ( elapsed < justNow ) {

        return {
          str: 'Just now',
          next: justNow - elapsed
        };

      } else {

        for ( var i = 0, l = times.length; i < l; i++ ) {

          var name = names[i],
              secs = times[i],
              number = _.floor ( elapsed / secs );

          if ( number >= 1 ) {

            return {
              str: number + ' ' + name + ( number > 1 ? 's' : '' ) + ' ago',
              next: secs - ( elapsed - ( number * secs ) )
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

    fuzzyMatch: function ( str, search, isCaseSensitive ) {

      if ( isCaseSensitive !== false ) {

        str = str.toLowerCase ();
        search = search.toLowerCase ();

      }

      var current_index = -1,
          str_l = str.length;

      for ( var search_i = 0, search_l = search.length; search_i < search_l; search_i++ ) {

        for ( var str_i = current_index + 1; str_i < str_l; str_i++ ) {

          if ( str[str_i] === search[search_i] ) {

            current_index = str_i;
            str_i = str_l + 1;

          }

        }

        if ( str_i === str_l ) {

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

    clamp: function ( minimum, value, maximum ) {

      if ( !_.isUndefined ( minimum ) ) {

        if ( value < minimum ) {

          value = minimum;

        }

      }

      if ( !_.isUndefined ( maximum ) ) {

        if ( value > maximum ) {

          value = maximum;

        }

      }

      return value;

    },

    /**
     * Performs a binary each of the array
     */

    btEach: function ( arr, callback, startIndex ) {

      var start = 0,
          end = arr.length - 1,
          center = _.isNumber ( startIndex ) ? startIndex : _.ceil ( ( start + end ) / 2 ),
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

        center = _.ceil ( ( start + end ) / 2 );

      }

      return -1;

    },

    /**
     * Returns true
     */

    true: _.constant ( true ),

    /**
     * Returns false
     */

    false: _.constant ( false )

  });

}( _, window, document ));


/* =========================================================================
 * Svelto - Browser v0.3.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  var userAgent = navigator.userAgent.toLowerCase (),
      vendor = navigator.vendor.toLowerCase (),
      appVersion = navigator.appVersion.toLowerCase ();

  /* CHECKS */

  var is_iphone = /iphone/i.test ( userAgent ),
      is_ipad = /ipad/i.test ( userAgent ),
      is_ipod = /ipod/i.test ( userAgent ),
      is_android = /android/i.test ( userAgent ),
      is_androidPhone = is_android && /mobile/i.test ( userAgent ),
      is_androidTablet = is_android && !is_androidPhone,
      is_blackberry = /blackberry/i.test ( userAgent ) || /BB10/i.test ( userAgent ),
      is_windows = /win/i.test ( appVersion ),
      is_windowsPhone = is_windows && /phone/i.test ( userAgent ),
      is_windowsTablet = is_windows && !is_windowsPhone && /touch/i.test ( userAgent ),
      is_mobile = is_iphone || is_ipod || is_androidPhone || is_blackberry || is_windowsPhone,
      is_tablet = is_ipad || is_androidTablet || is_windowsTablet;

  /* BROWSER */

  $.browser = {
    is: {
      chrome: /chrome|chromium/i.test ( userAgent ) && /google inc/.test ( vendor ),
      firefox: /firefox/i.test ( userAgent ),
      ie: /msie/i.test ( userAgent ) || 'ActiveXObject' in window, /* IE || EDGE */
      opera:  /^Opera\//.test ( userAgent ) || /\x20OPR\//.test ( userAgent ), /* Opera <= 12 || Opera >= 15 */
      safari: /safari/i.test ( userAgent ) && /apple computer/i.test ( vendor ),
      iphone: is_iphone,
      ipad: is_ipad,
      ipod: is_ipod,
      ios: is_iphone || is_ipad || is_ipod,
      android: is_android,
      androidPhone: is_androidPhone,
      androidTablet: is_androidTablet,
      blackberry: is_blackberry,
      linux: /linux/i.test ( appVersion ),
      mac: /mac/i.test ( appVersion ),
      windows: is_windows,
      windowsPhone: is_windowsPhone,
      windowsTablet: is_windowsTablet,
      mobile: is_mobile,
      tablet: is_tablet,
      desktop: !is_mobile && !is_tablet,
      online: function () {
        return navigator.onLine;
      },
      offline: function () {
        return !navigator.onLine;
      },
      touchDevice: 'ontouchstart' in window || ( 'DocumentTouch' in window && document instanceof DocumentTouch )
    }
  };

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - jQuery (Extras) v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../browser/browser.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* JQUERY EXTRA */

  $.reflow = function () {

    document.documentElement.offsetHeight; //INFO: Requesting the `offsetHeight` property triggers a reflow. Necessary, so that the deferred callback will be executed in another cycle

  };

  $.eventXY = function ( event ) {

    if ( event.isPointerEvent ) { //INFO: Has been created using the `Pointer` abstraction

      event = event.originalEvent;

    }

    if ( $.browser.is.touchDevice && event.originalEvent.touches ) {

      event = event.originalEvent.changedTouches ? event.originalEvent.changedTouches[0] : event.originalEvent.touches[0];

    }

    return {
      X: event.pageX,
      Y: event.pageY
    };

  };

  $.frame = function ( callback ) {

    return requestAnimationFrame ( callback );

  };

  $.hasCtrlOrCmd = function ( event ) {

    return ( !$.browser.is.mac && event.ctrlKey ) || ( $.browser.is.mac && event.metaKey );

  };

  /* COMMON OBJECTS */

  $(function () {

    window.$window = $(window);
    window.$document = $(document);
    window.$html = $(document.documentElement);
    window.$body = $(document.body);
    window.$empty = $();

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - UI v0.2.0
 * http://getsvelto.com/@FILE-NAME
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* UI */

  $.ui = {
    keyCode: {
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
    },
    mouseButton: {
      LEFT: 0,
      MIDDLE: 1,
      RIGHT: 2
    }
  };

  /* ANIMATION */

  $.ui.animation = {
    slow: 500,
    normal: 350,
    fast: 150
  };

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Core v0.1.0
 * http://getsvelto.com/@FILE-NAME
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../extras/lodash-extra.js
 * @requires ../extras/jQuery-extra.js
 * @requires ../ui/ui.js
 * ========================================================================= */


/* =========================================================================
 * Svelto - Tmpl v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

//SOURCE: - https://github.com/blueimp/JavaScript-Templates

/*
 ***************************
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
 ***************************
 */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* TMPL */

  var tmpl = function ( str, data ) {

    var f = !/[^\w\-\.:]/.test ( str )
              ? tmpl.cache[str] = tmpl.cache[str] || tmpl ( document.getElementById ( str ).innerHTML )
              : new Function ( tmpl.arg + ',tmpl', "var _e=_.escape" + tmpl.helper + ",_s='" + str.replace ( tmpl.regexp, tmpl.func ) + "';return _s;" );

    return data
             ? f ( data, tmpl )
             : function ( data ) { return f ( data, tmpl ); };

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

  /* HELPER */

  $.tmpl = tmpl;

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Widget v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../tmpl/tmpl.js
 * ========================================================================= */

//TODO: Add support for _trigger -> preventDefault //TODO: Check if it works right now

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* WIDGET */

  $.Widget = function () {};

  $.Widget._childConstructors = []; //TODO: Remove if not necessary

  /* PROTOTYPE */

  $.Widget.prototype = {

    /* NAMES */

    namespace: false,
    name: 'widget',
    fullName: 'widget', //INFO: `namespace.name`

    /* TEMPLATES */

    templates: {
      base: false //INFO: It will be used as the constructor if no element is provided
    },

    /* OPTIONS */

    options: {
      classes: {}, //INFO: CSS classes to attach inside the widget
      selectors: {}, //INFO: Selectors to use inside the widget
      animations: {}, //INFO: Object storing all the milliseconds required for each animation to occur
      callbacks: {}, //INFO: Callbacks to trigger on specific events
      disabled: false //INFO: Determines if the widget is enabled or disabled
    },

    /* WIDGET METHODS */

    _create: function ( options, element ) {

      // CHECK IF INITIALIZABLE

      if ( !element && !this.templates.base ) {

        throw 'WidgetUninitializable';

      }

      // MERGE OPTIONS

      this.options = _.merge ( {}, this.options, this._createOptions (), options );

      // INIT ELEMENT

      this.$element = $(element || this._tmpl ( 'base', this.options ));
      this.element = this.$element[0];

      // SET GUID

      this.guid = $.guid++;

      // SET DISABLED

      this.options.disabled = this.options.disabled || this.$element.hasClass ( this.name + '-disabled' );

      // SAVE WIDGET INSTANCE

      $.data ( this.element, this.fullName, this );

      // ON $ELEMENT REMOVE -> WIDGET DESTROY

      this._on ( true, 'remove', function ( event ) {

        if ( event.target === this.element ) {

          this.destroy ( event );

        }

      });

      // CALLBACKS

      this._variables ();

      this._init ();

      this._events ();

    },

    _createOptions: _.noop, //INFO: Returns an options object that will be used for the current widget instance, generated during widget instantiation

    _variables: _.noop, //INFO: Init your variables inside this function
    _init: _.noop, //INFO: Perform the init stuff inside this function
    _events: _.noop, //INFO: Bind the event handlers inside this function

    destroy: function () {

      this._destroy ();

      $.removeData ( this.element, this.fullName );

    },

    _destroy: _.noop,

    widget: function () {

      return this.$element;

    },

    /* OPTIONS METHODS */

    option: function ( key, value ) {

      if ( arguments.length === 0 ) { //INFO: Returns a clone of the options object

        return _.cloneDeep ( this.options );

      }

      if ( _.isString ( key ) ) { //INFO: Handle nested keys, for example: 'foo.bar' => { foo: { bar: '' } }

        var options = {},
            parts = key.split ( '.' );

        key = parts.shift ();

        if ( parts.length ) {

          var curOption = options[key] = _.extend ( {}, this.options[key] );

          for ( var i = 0; i < parts.length - 1; i++ ) {

            curOption[parts[i]] = curOption[parts[i]] || {};
            curOption = curOption[parts[i]];

          }

          key = parts.pop ();

          if ( arguments.length === 1 ) {

            return _.isUndefined ( curOption[key] ) ? null : curOption[key];

          }

          curOption[key] = value;

        } else { //INFO: Handle single level property

          if ( arguments.length === 1 ) {

            return _.isUndefined ( this.options[key] ) ? null : this.options[key];

          }

          options[key] = value;

        }

      } else if ( _.isPlainObject ( key ) ) { //INFO: Set multiple properties

        this._setOptions ( key );

      }

      return this;

    },

    _setOptions: function ( options ) {

      for ( var key in options ) {

        this._setOption ( key, options[key] );

      }

      return this;

    },

    _setOption: function ( key, value ) {

      this.options[key] = value;

      if ( key === 'disabled' ) {

        this.$element.toggleClass ( this.name + '-disabled', !!value );

      }

      return this;

    },

    /* ENABLING */

    enable: function () {

      return this._setOptions ({ disabled: false });

    },

    /* DISABLING */

    disable: function () {

      return this._setOptions ({ disabled: true });

    },

    /* EVENTS */

    _on: function ( suppressDisabledCheck, $element, events, selector, handler ) {

      //TODO: Add support for custom data

      // SAVE A REFERENCE TO THIS

      var instance = this;

      // NORMALIZING OPTIONS

      if ( !_.isBoolean ( suppressDisabledCheck ) ) {

        handler = selector;
        selector = events;
        events = $element;
        $element = suppressDisabledCheck;
        suppressDisabledCheck = false;

      }

      if ( !( $element instanceof $ ) ) {

        handler = selector;
        selector = events;
        events = $element;
        $element = this.$element;

      }

      if ( selector && !handler ) {

        handler = selector;
        selector = false;

      }

      // SUPPORT FOR STRING HANDLERS REFERRING TO A SELF METHOD

      handler = _.isString ( handler ) ? this[handler] : handler;

      // PROXY

      function handlerProxy () {

        if ( !suppressDisabledCheck && instance.options.disabled ) return;

        var args = _.slice ( arguments );

        args.push ( this );

        return handler.apply ( instance, args );

      }

      // PROXY GUID

      handlerProxy.guid = handler.guid = ( handler.guid || handlerProxy.guid || $.guid++ );

      // TRIGGERING

      if ( selector ) { // DELEGATED

        $element.on ( events, selector, handlerProxy );

      } else { // NORMAL

        $element.on ( events, handlerProxy );

      }

      return this;

    },

    _off: function ( $element, events, handler ) {

      // NORMALIZING OPTIONS

      if ( !handler ) {

        handler = events;
        events = $element;
        $element = this.$element;

      }

      // SUPPORT FOR STRING HANDLERS REFERRING TO A SELF METHOD

      handler = _.isString ( handler ) ? this[handler] : handler;

      // REMOVING HANDLER

      $element.off ( events, handler );

      return this;

    },

    _trigger: function ( events, data ) {

      data = data || {};

      events = events.split ( ' ' );

      for ( var ei = 0, el = events.length; ei < el; ei++ ) {

        this.$element.trigger ( this.name + ':' + events[ei], data );

        if ( _.isFunction ( this.options.callbacks[events[ei]] ) ) {

          this.options.callbacks[events[ei]].call ( this.element, data );

        }

      }

      return this;

    },

    /* DELAYING */

    _delay: function ( fn, delay ) {

      var instance = this;

      return setTimeout ( function () {

        fn.apply ( instance );

      }, delay || 0 );

    },

    /* DEFER */

    _defer: function ( fn ) {

      return this._delay ( fn );

    },

    /* FRAME */

    _frame: function ( fn ) {

      var instance = this;

      return $.frame ( function () {

        fn.apply ( instance );

      });

    },

    /* DEBOUNCING */

    _debounce: function ( fn, wait, options ) { //TODO: Test it, expecially regarding the `this` variable

      return _.debounce ( fn, wait, options );

    },

    /* THROTTLING */

    _throttle: function ( fn, wait, options ) { //TODO: Test it, expecially regarding the `this` variable

      return _.throttle ( fn, wait, options );

    },

    /* TEMPLATE */

    _tmpl: function ( name, options ) {

      return $.tmpl ( this.fullName + '.' + name, options || {} );

    },

    /* INSERTION */

    insertBefore: function ( selector ) {

      this.$element.insertBefore ( selector );

      return this;

    },

    insertAfter: function ( selector ) {

      this.$element.insertAfter ( selector );

      return this;

    },

    prependTo: function ( selector ) {

      this.$element.prependTo ( selector );

      return this;

    },

    appendTo: function ( selector ) {

      this.$element.appendTo ( selector );

      return this;

    }

  };

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Pointer v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../browser/browser.js
 * ========================================================================= */

//FIXME: Right now how can we bind an event handler on just tap? (when doubletap doesn't happen later)

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* POINTER */

  $.Pointer = {
    pressDuration: 300,
    doubleTapInterval: 300,
    flickDuration: 150,
    motionThreshold: 5
  };

  var events_names = ['tap', 'dbltap', 'press', 'dragstart', 'dragmove', 'dragend', 'flick'],
      events_prefix = 'pointer';

  _.each ( events_names, function ( event_name ) {

    var full_event = events_prefix + event_name;

    $.Pointer[event_name] = full_event;

    $.fn[event_name] = function ( fn ) {

      return fn ? this.on ( full_event, fn ) : this.trigger ( full_event );

    };

  });

  /* TRIGGERS */

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
      start_timestamp,
      end_timestamp,
      prev_tap_timestamp = 0,
      motion,
      orientation,
      direction,
      press_timeout;

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

    start_timestamp = event.timeStamp || _.now ();

    motion = false;

    press_timeout = setTimeout ( _.wrap ( event, pressHandler ), $.Pointer.pressDuration );

    $target.trigger ( createEvent ( $.Pointer.dragstart, event ), {
      startXY: startXY
    });

    $html.on ( moveEvents, moveHandler );
    $html.on ( endEvents, endHandler );

  };

  var pressHandler = function ( event ) { //FIXME: it doesn't get called if we do event.preventDefault () with dragstart

    $target.trigger ( createEvent ( $.Pointer.press, event ) );

  };

  var moveHandler = function ( event ) {

    clearTimeout ( press_timeout );

    moveXY = $.eventXY ( event );

    deltaXY = {
      X: moveXY.X - startXY.X,
      Y: moveXY.Y - startXY.Y
    };

    if ( Math.abs ( deltaXY.X ) > $.Pointer.motionThreshold || Math.abs ( deltaXY.Y ) > $.Pointer.motionThreshold ) {

      motion = true;

      $target.trigger ( createEvent ( $.Pointer.dragmove, event ), {
        startXY: startXY,
        moveXY: moveXY,
        deltaXY: deltaXY
      });

    }

  };

  var endHandler = function ( event ) {

    clearTimeout ( press_timeout );

    endXY = $.eventXY ( event );
    deltaXY = {
      X: endXY.X - startXY.X,
      Y: endXY.Y - startXY.Y
    };

    if ( target === event.target && ( event.type === 'touchend' || ( event.type === 'mouseup' && event.button === 0 ) ) ) {

      end_timestamp = event.timeStamp || _.now ();

      if ( !$.browser.is.touchDevice || !motion ) {

        $target.trigger ( createEvent ( $.Pointer.tap, event ) );

        if ( end_timestamp - prev_tap_timestamp <= $.Pointer.doubleTapInterval ) {

          $target.trigger ( createEvent ( $.Pointer.dbltap, event ) );

        }

        prev_tap_timestamp = end_timestamp;

      }

      if ( motion && ( end_timestamp - start_timestamp <= $.Pointer.flickDuration ) ) {

        if ( Math.abs ( deltaXY.X ) > Math.abs ( deltaXY.Y ) ) {

          orientation = 'horizontal';
          direction = ( deltaXY.X > 0 ) ? 1 : -1;

        } else {

          orientation = 'vertical';
          direction = ( deltaXY.Y > 0 ) ? 1 : -1;

        }

        $target.trigger ( createEvent ( $.Pointer.flick, event ), {
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

    $target.trigger ( createEvent ( $.Pointer.dragend, event ), {
      startXY: startXY,
      endXY: endXY,
      deltaXY: deltaXY
    });

  };

  $html.on ( startEvents, startHandler );

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Factory v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires Widget.js
 * @requires ../tmpl/tmpl.js
 * @requires ../pointer/Pointer.js
 *=========================================================================*/

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* FACTORY */

  $.factory = function ( originalName, base, prototype ) {

    // NAME

    var nameParts = originalName.split ( '.' ),
        namespace = nameParts.length > 1 ? nameParts[0] : false,
        name = nameParts.length > 1 ? nameParts[1] : nameParts[0],
        fullName = namespace ? namespace + '.' + name : name;

    // NO BASE -> DEFAULT WIDGET BASE

    if ( !prototype ) {

      prototype = base;
      base = $.Widget;

    }

    // INIT NAMESPACE

    if ( namespace ) {

      $[namespace] = $[namespace] || {};

    }

    // CONSTRUCTOR

    var existingConstructor = namespace ? $[namespace][name] : $[name];

    var constructor = function ( options, element ) {

      this._create ( options, element );

    };

    // SET CONSTRUCTOR

    if ( namespace ) {

      $[namespace][name] = constructor;

    } else {

      $[name] = constructor;

    }

    // EXTENDING CONSTRUCTOR IN ORDER TO CARRY OVER STATIC PROPERTIES

    _.extend ( constructor, existingConstructor, {
      _proto: _.extend ( {}, prototype ),
      _childConstructors: []
    });

    // BASE PROTOTYPE

    var basePrototype = new base ();

    basePrototype.options = _.extend ( {}, basePrototype.options ); //INFO: We need to make the options hash a property directly on the new instance otherwise we'll modify the options hash on the prototype that we're inheriting from

    // PROXIED PROTOTYPE

    var proxiedPrototype = {};

    for ( var prop in prototype ) {

      if ( !_.isFunction ( prototype[prop] ) ) {

        proxiedPrototype[prop] = prototype[prop];

      } else {

        proxiedPrototype[prop] = (function ( prop ) {

          var _super = function () {
              return base.prototype[prop].apply ( this, arguments );
            },
            _superApply = function ( args ) {
              return base.prototype[prop].apply ( this, args );
            };

          return function () {

            var __super = this._super,
                __superApply = this._superApply,
                returnValue;

            this._super = _super;
            this._superApply = _superApply;

            returnValue = prototype[prop].apply ( this, arguments );

            this._super = __super;
            this._superApply = __superApply;

            return returnValue;

          };

        })( prop );

      }

    }

    // CONSTRUCTOR PROTOTYPE

    constructor.prototype = _.extend ( basePrototype, proxiedPrototype, {
      constructor: constructor,
      namespace: namespace,
      name: name,
      fullName: fullName
    });

    // CACHE TEMPLATES

    for ( var tmpl_name in prototype.templates ) {

      if ( prototype.templates[tmpl_name] ) {

        $.tmpl.cache[fullName + '.' + tmpl_name] = $.tmpl ( prototype.templates[tmpl_name] );

      }

    }

    // UPDATE PROTOTYPE CHAIN

    if ( existingConstructor ) {

      for ( var i = 0, l = existingConstructor._childConstructors.length; i < l; i++ ) {

        var childPrototype = existingConstructor._childConstructors[i].prototype;

        $.factory ( ( childPrototype.namespace ? childPrototype.namespace + '.' + childPrototype.name : childPrototype.name ), constructor, existingConstructor._childConstructors[i]._proto );

      }

      delete existingConstructor._childConstructors;

    } else {

      base._childConstructors.push ( constructor );

    }

    // CONSTRUCT

    $.factory.bridge ( name, constructor );

    // RETURN

    return constructor;

  };

  /* FACTORY BRIDGE */

  $.factory.bridge = function ( name, object ) {

    // NAME

    var fullName = object.prototype.fullName;

    // PLUGIN

    $.fn[name] = function ( options ) {

      if ( this.length === 0 && !object.prototype.templates.base ) return; //INFO: Nothing to work on

      var isMethodCall = _.isString ( options ),
          args = _.tail ( arguments ),
          returnValue = this;

      if ( isMethodCall ) {

        // METHOD CALL

        this.each ( function () {

          // VARIABLES

          var methodValue,
              instance = $.data ( this, fullName );

          // GETTING INSTANCE

          if ( options === 'instance' ) {

            returnValue = instance;

            return false;

          }

          // CHECKING VALID CALL

          if ( !instance ) return; //INFO: No instance found

          if ( !_.isFunction ( instance[options] ) || options.charAt ( 0 ) === '_' ) return; //INFO: Private method or property

          // CALLING

          methodValue = instance[options].apply ( instance, args );

          if ( methodValue !== instance && !_.isUndefined ( methodValue ) ) {

            returnValue = methodValue;

            return false;

          }

        });

      } else {

        // SUPPORT FOR PASSING MULTIPLE OPTIONS OBJECTS

        if ( args.length ) {

          options = _.extend.apply ( null, [options].concat ( args ) );

        }

        this.each ( function () {

          // GET INSTANCE

          var instance = $.data ( this, fullName );

          if ( instance ) { // SET OPTIONS

            instance.option ( options || {} );

          } else { // INSTANCIATE

            $.data ( this, fullName, new object ( options, this ) );

          }

        });

      }

      return returnValue;

    };

  };

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Expander v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* EXPANDER */

  $.factory ( 'svelto.expander', {

    /* OPTIONS */

    options: {
      classes: {
        open: 'open'
      },
      selectors: {
        expander: '.expander',
        toggler: '.expander-toggler'
      },
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$expander = this.$element;
      this.$togglers = this.$expander.find ( this.options.selectors.toggler );

      this._isOpen = this.$expander.hasClass ( this.options.classes.open );

    },

    _events: function () {

      this._on ( this.$togglers, $.Pointer.tap, this.toggle );

    },

    /* PUBLIC */

    isOpen: function () {

      return this._isOpen;

    },

    toggle: function ( force ) {

      if ( !_.isBoolean ( force ) ) {

        force = !this._isOpen;

      }

      if ( force !== this._isOpen ) {

        this._isOpen = force;

        this.$expander.toggleClass ( this.options.classes.open, this._isOpen );

        this._trigger ( this._isOpen ? 'open' : 'close' );

      }

    },

    open: function () {

      this.toggle ( true );

    },

    close: function () {

      this.toggle ( false );

    }

  });

  /* READY */

  $(function () {

    $('.expander').expander ();

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Accordion v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * @requires ../expander/expander.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* ACCORDION */

  $.factory ( 'svelto.accordion', {

    /* OPTIONS */

    options: {
      classes: {
        multiple: 'multiple-open'
      },
      selectors: {
        expander: '.expander'
      },
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$accordion = this.$element;
      this.$expanders = this.$accordion.children ( this.options.selectors.expander );
      this.expandersNr = this.$expanders.length;

      this.expandersInstances = _.map ( this.$expanders, function ( expander ) {

        return $(expander).expander ( 'instance' );

      });

      this.isMultiple = this.$accordion.hasClass ( this.options.classes.multiple );

    },

    _events: function () {

      if ( !this.isMultiple ) {

        this._on ( this.$expanders, 'expander:open', this.__close_others );

      }

    },

    /* OPEN */

    __close_others: function ( event, data, node ) {

      for ( var i = 0; i < this.expandersNr; i++ ) {

        if ( this.$expanders[i] !== node ) {

          this.expandersInstances[i].close ();

        }

      }

    },

    /* PUBLIC */

    areOpen: function () {

      return _.map ( this.expandersInstances, function ( instance ) {

        return instance.isOpen ();

      });

    },

    toggle: function ( index, force ) {

      var instance = this.expandersInstances[index],
          isOpen = instance.isOpen ();

      if ( !_.isBoolean ( force ) ) {

        force = !isOpen;

      }

      if ( force !== isOpen ) {

        var action = force ? 'open' : 'close';

        instance[action]();

        this._trigger ( action, {
          index: index
        });

      }

    },

    open: function ( index ) {

      this.toggle ( index, true );

    },

    close: function ( index ) {

      this.toggle ( index, false );

    }

  });

  /* READY */

  $(function () {

    $('.accordion').accordion ();

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Autogrow (Input) v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//INFO: Only works with `box-sizing: border-box`
//FIXME: Does it work with `.large` inputs?
//FIXME: Add an extra pixel, or the text cursor won't be displayed

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* AUTOGROW INPUT */

  $.factory ( 'svelto.autogrowInput', {

    /* OPTIONS */

    options: {
      minWidth: 0,
      callbacks: {
        update: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$input = this.$element;

    },

    _init: function () {

      this.update ();

    },

    _events: function () {

      /* INPUT / CHANGE */

      this._on ( 'input change', this.update );

    },

    /* PRIVATE */

    _getNeededWidth: function () {

      //FIXME: Isn't it better to just detach it, or to leave it in the DOM?

      var $span = $( '<span>' + this.$input.val () + '</span>' );

      $span.css ({
        font: this.$input.css ( 'font' ),
        position: 'absolute',
        opacity: 0
      });

      $span.appendTo ( $body );

      var width = $span.width ();

      $span.remove ();

      return width;

    },

    /* PUBLIC */

    update: function () {

      var neededWidth = this._getNeededWidth ( this.$input );

      this.$input.width ( Math.max ( neededWidth, this.options.minWidth ) );

      this._trigger ( 'update' );

    }

  });

  /* READY */

  $(function () {

    $('input.autogrow, .input-wrp.autogrow input').autogrowInput ();

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Autogrow (Textarea) v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//INFO: Only works with `box-sizing: border-box`
//FIXME: Does it work with `.large` textareas?
//TODO: Make it the same height as a normal input at minimum, for beautiness

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* AUTOGROW */

  $.factory ( 'svelto.autogrowTextarea', {

    /* OPTIONS */

    options: {
      minHeight: 0,
      callbacks: {
        update: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$textarea = this.$element;

    },

    _init: function () {

      this.update ();

    },

    _events: function () {

      /* INPUT / CHANGE */

      this._on ( 'input change', this.update );

    },

    /* PUBLIC */

    update: function () {

      var neededHeight = this.$textarea.height ( 1 )[0].scrollHeight - parseFloat ( this.$textarea.css ( 'padding-top' ) ) - parseFloat ( this.$textarea.css ( 'padding-bottom' ) );

      this.$textarea.height ( Math.max ( neededHeight, this.options.minHeight ) );

      this._trigger ( 'update' );

    }

  });

  /* READY */

  $(function () {

    $('textarea.autogrow, .textarea-wrp.autogrow textarea').autogrowTextarea ();

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Blurred v0.1.1
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* BLURRED */

  $.fn.blurred = function ( force ) {

    return this.toggleClass ( 'blurred', force );

  };

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - BT Each v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* BINARY TREE .each () */

  $.fn.btEach = function ( callback, startIndex ) {

    return _.btEach ( this, callback, startIndex );

  };

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Checkbox v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CHECKBOX */

  $.factory ( 'svelto.checkbox', {

    /* OPTIONS */

    options: {
      callbacks: {
        checked: _.noop,
        unchecked: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$checkbox = this.$element;
      this.$input = this.$checkbox.find ( 'input' );

    },

    _init: function () { //FIXME: is it necessary to include it? Maybe we should fix mistakes with the markup...

      var hasClass = this.$checkbox.hasClass ( 'checked' );

      if ( this.get () ) {

        if ( !hasClass ) {

          this.$checkbox.addClass ( 'checked' );

        }

      } else if ( hasClass ) {

        this.$checkbox.removeClass ( 'checked' );

      }

    },

    _events: function () {

      this._on ( 'click', function () {

        this.toggle ();

      });

      this._on ( true, 'change', this._handler_change );

    },

    /* CHANGE */

    _handler_change: function () {

      var isChecked = this.get ();

      this.$checkbox.toggleClass ( 'checked', isChecked );

      this._trigger ( isChecked ? 'checked' : 'unchecked' );

    },

    /* PUBLIC */

    get: function () { //FIXME: maybe this should return the value, and a isChecked equivalent should do this job

      return this.$input.prop ( 'checked' );

    },

    toggle: function ( force ) {

      var isChecked = this.get ();

      if ( _.isUndefined ( force ) ) {

        force = !isChecked;

      }

      if ( force !== isChecked ) {

        this.$input.prop ( 'checked', force ).trigger ( 'change' );

        this._trigger ( force ? 'checked' : 'unchecked' ); //FIXME: is triggered twice per toggle

      }

    },

    check: function () {

      this.toggle ( true );

    },

    uncheck: function () {

      this.toggle ( false );

    }

  });

  /* READY */

  $(function () {

    $('.checkbox').checkbox ();

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Color Helper v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

;(function ( _, window, document, undefined ) {

  'use strict';

  /* COLOR HELPER */

  window.ColorHelper = {

    /* COLOR SPACES CONVERTERS */

    hex2rgb: function ( hex ) {

      return {
        r: this.hex2dec ( hex.r ),
        g: this.hex2dec ( hex.g ),
        b: this.hex2dec ( hex.b )
      };

    },

    hex2hsv: function ( hex ) {

      return this.rgb2hsv ( this.hex2rgb ( hex ) );

    },

    rgb2hex: function ( rgb ) {

      return {
        r: this.dec2hex ( rgb.r ),
        g: this.dec2hex ( rgb.g ),
        b: this.dec2hex ( rgb.b )
      };

    },

    rgb2hsv: function ( rgb ) {

      var r = rgb.r / 255,
        g = rgb.g / 255,
        b = rgb.b / 255,
        h, s,
        v = Math.max ( r, g, b ),
        diff = v - Math.min ( r, g, b ),
        diffc = function ( c ) {
          return ( v - c ) / 6 / diff + 1 / 2;
        };

      if ( diff === 0 ) {

        h = s = 0;

      } else {

        s = diff / v;

        var rr = diffc ( r ),
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
        h: h * 360, //FIXME: removed Math.round, test if is ok
        s: s * 100, //FIXME: removed Math.round, test if is ok
        v: v * 100 //FIXME: removed Math.round, test if is ok
      };

    },

    hsv2hex: function ( hsv ) {

      return this.rgb2hex ( this.hsv2rgb ( hsv ) );

    },

    hsv2rgb: function ( hsv ) {

      var r, g, b,
        h = hsv.h,
        s = hsv.s,
        v = hsv.v;

      s /= 100;
      v /= 100;

      if ( s === 0 ) {

        r = g = b = v;

      } else {

        var i, f, p, q, t;

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

    },

    hsv2hsl: function ( hsv ) {

      var s = hsv.s / 100,
        v = hsv.v / 100,
        tempL = ( 2 - s ) * v,
        tempS = s * v;

      return {
        h: hsv.h,
        s: ( tempS / ( ( tempL <= 1 ) ? tempL : 2 - tempL ) ) * 100,
        l: ( tempL / 2 ) * 100
      };

    },

    hsl2hsv: function ( hsl ) {

      var l = hsl.l / 100 * 2,
        s = ( hsl.s / 100 ) * ( l <= 1 ? l : 2 - l );

      return {
        h: hsl.h,
        s: ( 2 * s ) / ( l + s ) * 100,
        v: ( l + s ) / 2 * 100
      };

    },

    /* SCALE CONVERTERS */

    dec2hex: function ( dec ) {

      return _.padLeft ( dec.toString ( 16 ), 2, '0' );

    },

    hex2dec: function ( hex ) {

      return parseInt ( hex, 16 );

    }

  };

}( _, window, document ));


/* =========================================================================
 * Svelto - Hex Color v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../color_helper/colorHelper.js
 * ========================================================================= */

;(function ( _, window, document, undefined ) {

  'use strict';

  /* HEX COLOR */

  window.HexColor = function ( value ) {

    if ( _.isString ( value ) ) {

      value = value.replace ( '#', '' );

       if ( /^([0-9a-f]{3}){2}$/i.test ( value ) ) { //INFO: full 6-chars color

        this.hsv = ColorHelper.hex2hsv ({
          r: value[0] + value[1],
          g: value[2] + value[3],
          b: value[4] + value[5]
        });

      } else if ( /^[0-9a-f]{3}$/i.test ( value ) ) { //INFO: shorthand 3-chars color

        this.hsv = ColorHelper.hex2hsv ({
          r: value[0] + value[0],
          g: value[1] + value[1],
          b: value[2] + value[2]
        });

      } else {

        return this;

      }

      this.isValid = true;

    }

  };

  /* HEX COLOR PROTOTYPE */

  HexColor.prototype = {

    isValid: false,

    hsv: {
      h: 0,
      s: 0,
      v: 0
    },

    getHexStr: function () {

      var hex = ColorHelper.hsv2hex ( this.hsv );

      return '#' + hex.r + hex.g + hex.b;

    }

  };

}( _, window, document ));


/* =========================================================================
 * Svelto - Colorpicker v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * @requires ../hex_color/hexColor.js
 * @requires ../color_helper/colorHelper.js
 * ========================================================================= */

//TODO: add support for alpha channel
//TODO: add a $bgs variable where we update the background
//TODO: Add an input inside, so that it works also without an external input

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* COLORPICKER */

  $.factory ( 'svelto.colorpicker', {

    /* OPTIONS */

    options: {
      default_color: '#ff0000',
      live: true,
      callbacks: {
        change: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$colorpicker = this.$element;
      this.$sb_wrp = this.$colorpicker.find ( '.colorpicker-saturation-brightness-wrp' );
      this.$handler_sb = this.$sb_wrp.find ( '.colorpicker-handler' );
      this.$hue_wrp = this.$colorpicker.find ( '.colorpicker-hue-wrp' );
      this.$handler_hue = this.$hue_wrp.find ( '.colorpicker-handler' );

      this.id = this.$colorpicker.attr ( 'id' );
      this.$inputs = $('input[name="' + this.id + '"]');

      this.color = new HexColor ();
      this.hex = '';

      this._update_variables ();

      this.sb_wrp_size = this.$sb_wrp.width ();

      this.hue_wrp_height = this.sb_wrp_size;

    },

    _init: function () {

      if ( !this.set ( this.$inputs.val () ) ) {

        this.color = new HexColor ( this.options.default_color );

        this._update_sb ();
        this._update_hue ();

      }

    },

    _events: function () {

      /* WINDOW RESIZE */

      this._on ( $window, 'resize', this._handler_resize );

      /* INPUTS */

      this._on ( this.$inputs, 'keydown', this._handler_input_keydown );

      /* SB ARROWS */

      this._on ( this.$sb_wrp, 'mouseenter', this._handler_sb_wrp_arrows_in );
      this._on ( this.$sb_wrp, 'mouseleave', this._handler_sb_wrp_arrows_out );

      /* SB DRAG */

      this._on ( this.$sb_wrp, $.Pointer.dragmove, this._handler_sb_drag_move );
      this._on ( this.$sb_wrp, $.Pointer.dragend, this._handler_sb_drag_end );

      /* HUE ARROWS */

      this._on ( this.$hue_wrp, 'mouseenter', this._handler_hue_wrp_arrows_in );
      this._on ( this.$hue_wrp, 'mouseleave', this._handler_hue_wrp_arrows_out );

      /* HUE DRAG */

      this._on ( this.$hue_wrp, $.Pointer.dragmove, this._handler_hue_drag_move );
      this._on ( this.$hue_wrp, $.Pointer.dragend, this._handler_hue_drag_end );

    },

    /* PRIVATE */

    _update_variables: function () {

      this.sb_wrp_offset = this.$sb_wrp.offset ();
      this.hue_wrp_offset = this.$hue_wrp.offset ();

    },

    /* WINDOW RESIZE */

    _handler_resize: function () {

      this._update_variables ();

    },

    /* SB ARROWS */

    _handler_sb_wrp_arrows_in: function () {

      this._on ( $document, 'keydown', this._handler_sb_wrp_arrows_keydown );

    },

    _handler_sb_wrp_arrows_out: function () {

      this._off ( $document, 'keydown', this._handler_sb_wrp_arrows_keydown );

    },

    _handler_sb_wrp_arrows_keydown: function () {

      switch ( event.keyCode ) {

        case $.ui.keyCode.UP:
          this.color.hsv.v = Math.min ( 100, this.color.hsv.v + 1 );
          break;

        case $.ui.keyCode.RIGHT:
          this.color.hsv.s = Math.min ( 100, this.color.hsv.s + 1 );
          break;

        case $.ui.keyCode.DOWN:
          this.color.hsv.v = Math.max ( 0, this.color.hsv.v - 1 );
          break;

        case $.ui.keyCode.LEFT:
          this.color.hsv.s = Math.max ( 0, this.color.hsv.s - 1 );
          break;

        default:
          return;

      }

      this._update_sb ();
      this._update_input ();

    },

    /* SB DRAG */

    _sb_drag_set: function ( XY, update ) {

      this.color.hsv.s =  _.clamp ( 0, XY.X - this.sb_wrp_offset.left, this.sb_wrp_size ) * 100 / this.sb_wrp_size;
      this.color.hsv.v =  100 - ( _.clamp ( 0, XY.Y - this.sb_wrp_offset.top, this.sb_wrp_size ) * 100 / this.sb_wrp_size );

      this._update_sb ();

      if ( update ) {

        this._update_input ();

      }

    },

    _handler_sb_drag_move: function ( event, data ) {

      this._sb_drag_set ( data.moveXY, this.options.live );

    },

    _handler_sb_drag_end: function ( event, data ) {

      this._sb_drag_set ( data.endXY, true );

    },

    /* HUE ARROWS */

    _handler_hue_wrp_arrows_in: function () {

      this._on ( $document, 'keydown', this._handler_hue_wrp_arrows_keydown );

    },

    _handler_hue_wrp_arrows_out: function () {

      this._off ( $document, 'keydown', this._handler_hue_wrp_arrows_keydown );

    },

    _handler_hue_wrp_arrows_keydown: function () {

      switch ( event.keyCode ) {

        case $.ui.keyCode.UP:
          this.color.hsv.h = Math.min ( 359, this.color.hsv.h + 1 );
          break;

        case $.ui.keyCode.DOWN:
          this.color.hsv.h = Math.max ( 0, this.color.hsv.h - 1 );
          break;

        default:
          return;

      }

      this._update_hue ();
      this._update_input ();

    },

    /* HUE DRAG */

    _hue_drag_set: function ( XY, update ) {

      this.color.hsv.h = 359 - ( _.clamp ( 0, XY.Y - this.hue_wrp_offset.top, this.hue_wrp_height ) * 359 / this.hue_wrp_height );

      this._update_hue ();

      if ( update ) {

        this._update_input ();

      }

    },

    _handler_hue_drag_move: function ( event, data ) {

      this._hue_drag_set ( data.moveXY, this.options.live );

    },

    _handler_hue_drag_end: function ( event, data ) {

      this._hue_drag_set ( data.endXY, true );

    },

    /* INPUT */

    _handler_input_keydown: function ( event ) {

      if ( event.keyCode === $.ui.keyCode.ENTER ) {

        if ( !this.set ( this.$inputs.val () ) ) {

          this.$inputs.val ( this.hex );

        }

      }

    },

    /* OTHERS */

    _update_input: function () {

      this.hex = this.color.getHexStr ();

      this.$inputs.val ( this.hex ).css ( 'background-color', this.hex ).trigger ( 'change' );

      this._trigger ( 'change' );

    },

    _update_sb: function () {

      var hsl = ColorHelper.hsv2hsl ( this.color.hsv );

      this.$handler_sb.css ({
        'background-color': 'hsl(' + hsl.h + ',' + hsl.s + '%,' + hsl.l + '%)',
        transform: 'translate3d(' + ( this.sb_wrp_size / 100 * this.color.hsv.s ) + 'px,' + ( this.sb_wrp_size / 100 * ( 100 - this.color.hsv.v ) ) + 'px,0)'
      });

    },

    _update_hue: function () {

      var hsl = ColorHelper.hsv2hsl ( this.color.hsv );

      this.$handler_hue.css ({
        'background-color': 'hsl(' + this.color.hsv.h + ',100%,50%)',
        transform: 'translate3d(0,' + ( this.hue_wrp_height / 100 * ( 100 - ( this.color.hsv.h / 360 * 100 ) ) ) + 'px,0)'
      });

      this.$handler_sb.css ( 'background-color', 'hsl(' + hsl.h + ',' + hsl.s + '%,' + hsl.l + '%)' );

      this.$sb_wrp.css ( 'background-color', 'hsl(' + this.color.hsv.h + ',100%,50%)' );

    },

    _update: function () {

      this._update_sb ();
      this._update_hue ();
      this._update_input ();

    },

    /* PUBLIC */

    get: function () {

      return this.color.getHexStr ();

    },

    set: function ( value ) {

      var new_color = new HexColor ( value );

      if ( new_color.isValid && !_.isEqual ( new_color.hsv, this.color.hsv ) ) {

        this.color = new_color;

        this._update ();

      }

      return new_color.isValid;

    }

  });

  /* READY */

  $(function () {

    $('.colorpicker').colorpicker ();

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Cookie v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

//SORUCE: https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie

/* COOKIE */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* UTILITIES */

  var encode = encodeURIComponent,
      decode = decodeURIComponent;

  /* COOKIE */

  $.cookie = {

    get: function ( key ) {

      if ( !key ) return null;

      return decode ( document.cookie.replace ( new RegExp ( '(?:(?:^|.*;)\\s*' + encode ( key ).replace ( /[\-\.\+\*]/g, '\\$&' ) + '\\s*\\=\\s*([^;]*).*$)|^.*$' ), '$1' ) ) || null;

    },

    set: function ( key, value, end, path, domain, secure ) {

      if ( !key || /^(?:expires|max\-age|path|domain|secure)$/i.test ( key ) ) return false;

      var expires = '';

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

      document.cookie = encode ( key ) + '=' + encode ( value ) + expires + ( domain ? '; domain=' + domain : '' ) + ( path ? '; path=' + path : '' ) + ( secure ? '; secure' : '' );

      return true;

    },

    remove: function ( key, path, domain ) {

      if ( !this.has ( key ) ) return false;

      document.cookie = encode ( key ) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + ( domain ? '; domain=' + domain : '' ) + ( path ? '; path=' + path : '' );

      return true;

    },

    has: function ( key ) {

      if ( !key ) return false;

      return ( new RegExp ( '(?:^|;\\s*)' + encode ( key ).replace ( /[\-\.\+\*]/g, '\\$&' ) + '\\s*\\=' ) ).test ( document.cookie );

    },

    keys: function () {

      var keys = document.cookie.replace ( /((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '' ).split ( /\s*(?:\=[^;]*)?;\s*/ );

      for ( var i = 0, l = keys.length; i < l; i++ ) {

        keys[i] = decode ( keys[i] );

      }

      return keys;

    }

  };

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Datepicker v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: deal with UTC time etc...
//TODO: Add support for min and max date delimiter
//TODO: Add an input inside, so that it works also without an external input
//FIXME: When using the arrows the prev day still remains hovered even if it's not below the cursor

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* DATEPICKER */

  $.factory ( 'svelto.datepicker', {

    /* OPTIONS */

    options: {
      names: {
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      },
      date: {
        today: false,
        current: false,
        selected: null
      },
      callbacks: {
        change: _.noop,
        refresh: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$datepicker = this.$element;

      this.id = this.$datepicker.attr ( 'id' );
      this.$inputs = this.id ? $('input[name="' + this.id + '"]') : $empty;

      this.$navigation_prev = this.$datepicker.find ( '.datepicker-navigation-prev' );
      this.$navigation_title = this.$datepicker.find ( '.datepicker-navigation-title' );
      this.$navigation_next = this.$datepicker.find ( '.datepicker-navigation-next' );

      this.$days_prev = this.$datepicker.find ( '.datepicker-day-prev' );
      this.$days_current = this.$datepicker.find ( '.datepicker-day' );
      this.$days_next = this.$datepicker.find ( '.datepicker-day-next' );
      this.$days_all = this.$days_prev.add ( this.$days_current ).add ( this.$days_next );

      if ( this.options.date.today === false ) {

        this.options.date.today = new Date ();

      }

      if ( this.options.date.current === false ) {

        this.options.date.current = new Date ();

      }

      this.$day_today = false;
      this.$day_selected = false;

    },

    _init: function () {

      this._refresh ();

    },

    _events: function () {

      /* DATEPICKER */

      this._on ( 'mouseenter', this._handler_arrows_in );
      this._on ( 'mouseleave', this._handler_arrows_out );

      /* INPUTS */

      this._on ( this.$inputs, 'keydown', this._handler_input_keydown );

      /* NAVIGATION */

      this._on ( this.$navigation_prev, 'click', this._handler_prev_click );
      this._on ( this.$navigation_next, 'click', this._handler_next_click );

      /* SELECTION */

      this._on ( 'click', '.datepicker-day', this._handler_day_current_click );

    },

    /* DATEPIKER */

    _handler_arrows_in: function () {

      this._on ( $document, 'keydown', this._handler_arrows_keydown );

    },

    _handler_arrows_out: function () {

      this._off ( $document, 'keydown', this._handler_arrows_keydown );

    },

    _handler_arrows_keydown: function ( event ) {

      switch ( event.keyCode ) {

        case $.ui.keyCode.UP:
        case $.ui.keyCode.LEFT:
          this.navigate_month ( -1 );
          break;

        case $.ui.keyCode.RIGHT:
        case $.ui.keyCode.DOWN:
          this.navigate_month ( 1 );
          break;

      }

    },

    /* INPUT */

    _handler_input_keydown: function ( event ) {

      if ( event.keyCode === $.ui.keyCode.ENTER ) {

        this.set ( this.$inputs.val () );

      }

    },

    /* NAVIGATION */

    _handler_prev_click: function () {

      this.navigate_month ( -1 )

    },

    _handler_next_click: function () {

      this.navigate_month ( 1 );

    },

    /* SELECTION */

    _handler_day_current_click: function ( event, node ) {

      this._unhighlight_selected ();

      var day = parseInt ( $(node).html (), 10 );

      this.options.date.selected = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth (), day );

      this._highlight_selected ();

      this._update_input ();

    },

    /* OTHERS */

    _build_calendar: function () {

      var prev_month_days = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth (), 0 ).getDate (),
        current_month_days = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth () + 1, 0 ).getDate (),
        initial_day_of_week = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth (), 1 ).getDay ();

      initial_day_of_week = ( initial_day_of_week === 0 ) ? 6 : initial_day_of_week - 1; //INFO: We use `Monday` as the 0 index

      this.$days_all.removeClass ( 'hidden' );

      // PREV

      var exceeding_days = 31 - prev_month_days,
        needed_days = initial_day_of_week,
        left_days = 9 - exceeding_days - needed_days;

      this.$days_prev.slice ( left_days + needed_days, this.$days_prev.length ).addClass ( 'hidden' );
      this.$days_prev.slice ( 0, left_days ).addClass ( 'hidden' );

      // CURRENT

      this.$days_current.slice ( current_month_days, this.$days_current.lenght ).addClass ( 'hidden' );

      // NEXT

      var left_days = ( ( current_month_days + initial_day_of_week ) % 7 );

      this.$days_next.slice ( ( left_days === 0 ) ? 0 : 7 - left_days ).addClass ( 'hidden' );

    },

    _highlight_day: function ( day, css_class ) {

      if ( day && day.getFullYear () === this.options.date.current.getFullYear () ) {

        var delta_months = day.getMonth () - this.options.date.current.getMonth ();

        switch ( delta_months ) {

          case -1:
            return this.$days_prev.eq ( day.getDate () - 23 ).addClass ( css_class );

          case 0:
            return this.$days_current.eq ( day.getDate () - 1 ).addClass ( css_class );

          case 1:
            return this.$days_next.eq ( day.getDate () - 1 ).addClass ( css_class );

        }

      }

      return false;

    },

    _unhighlight_selected: function () {

      if ( this.$day_selected ) {

        this.$day_selected.removeClass ( 'datepicker-day-selected' );

      }

    },

    _highlight_selected: function () {

      this.$day_selected = this._highlight_day ( this.options.date.selected, 'datepicker-day-selected' );

    },

    _unhighlight_today: function () {

      if ( this.$day_today ) {

        this.$day_today.removeClass ( 'datepicker-day-today' );

      }

    },

    _highlight_today: function () {

      this.$day_today = this._highlight_day ( this.options.date.today, 'datepicker-day-today' );

    },

    _update_title: function () {

      this.$navigation_title.html ( this.options.names.months[this.options.date.current.getMonth ()] + ', ' + this.options.date.current.getFullYear () );

    },

    _update_input: function () {

      if ( this.options.date.selected ) {

        this.$inputs.val ( this.options.date.selected.getFullYear () + '-' + this.options.date.selected.getMonth () + '-' + this.options.date.selected.getDate () ).change ();

      }

    },

    _refresh: function () {

      this._unhighlight_selected ();
      this._unhighlight_today ();
      this._build_calendar ();
      this._highlight_selected ();
      this._highlight_today ();
      this._update_title ();

      this._trigger ( 'refresh' );

    },

    /* API */

    get: function ( formatted ) {

      if ( formatted && this.options.date.selected ) {

        return this.options.date.selected.getFullYear () + '-' + this.options.date.selected.getMonth () + '-' + this.options.date.selected.getDate ();

      } else {

        return this.options.date.selected;

      }

    },

    set: function ( date ) {

      if ( _.isString ( date ) ) {

        var segments = date.split ( '-' ),
          date = new Date ( segments[0], segments[1], segments[2] );

      } else {

        var date = new Date ( date );

      }

      if ( !_.isNaN ( date.valueOf () ) ) {

        this.options.date.selected = date;

        if ( this.options.date.selected.getFullYear () === this.options.date.current.getFullYear () && this.options.date.selected.getMonth () === this.options.date.current.getMonth () ) {

          this._unhighlight_selected ();
          this._highlight_selected ();

        } else {

          this.options.date.current.setFullYear ( this.options.date.selected.getFullYear () );
          this.options.date.current.setMonth ( this.options.date.selected.getMonth () );

          this._refresh ();

        }

        this._update_input ();

      }

    },

    navigate_month: function ( steps ) {

      if ( steps ) {

        this.options.date.current.setMonth ( this.options.date.current.getMonth () + steps );

        this._refresh ();

      }

    },

    prev_month: function () {

      this.navigate_month ( -1 );

    },

    next_month: function () {

      this.navigate_month ( 1 );

    }

  });

  /* READY */

  $(function () {

    $('.datepicker').datepicker ();

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Draggable v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* DRAGGABLE */

  $.factory ( 'svelto.draggable', {

    /* OPTIONS */

    options: {
      selectors: {
        handler: '.draggable-handler'
      },
      draggable: _.true, //INFO: checks if we can drag it or not
      only_handlers: false, //INFO: only an handler can drag it around
      revertable: false, //INFO: on dragend take it back to the starting position
      axis: false, //INFO: limit the movements to this axis
      constrainer: { //INFO: constrain the drag inside the $element or coordinates
        $element: false, //INFO: if we want to keep the draggable inside this $element
        coordinates: false, //INFO: if we want to keep the draggable inside the coordinates //TODO: implement
        // {
        //   x1: 0,
        //   x2: 0,
        //   y1: 0,
        //   y2: 0
        // }
        constrain_center: false, //INFO: set the constrain type, it will constrain the whole shape, or the center
        axis: false, //INFO: if we want to constrain the draggable only in a specific axis
        tollerance: { //INFO: the amount of pixel flexibility that a constrainer has
          x: 0,
          y: 0
        }
      },
      modifiers: { //INFO: it can modify the setted X and Y transforms values
        x: _.true,
        y: _.true
      },
      callbacks: {
        beforestart: _.noop,
        start: _.noop,
        move: _.noop,
        end: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.draggable = this.element;
      this.$draggable = this.$element;

      if ( this.options.only_handlers ) {

        this.$handlers = this.$draggable.find ( this.options.selectors.handler ); //FIXME: does it make sense to have handlers inside the $draggable?

      }

    },

    _events: function () {

      if ( this.options.only_handlers ) {

        this._on ( this.$handlers, $.Pointer.dragstart, this._start );
        this._on ( this.$handlers, $.Pointer.dragmove, this._move );
        this._on ( this.$handlers, $.Pointer.dragend, this._end );

      } else {

        this._on ( $.Pointer.dragstart, this._start );
        this._on ( $.Pointer.dragmove, this._move );
        this._on ( $.Pointer.dragend, this._end );

      }

    },

    /* PRIVATE */

    _start: function ( event, data ) {

      this.isDraggable = this.options.draggable ();

      if ( !this.isDraggable ) return;

      this._trigger ( 'beforestart' );

      this.motion = false;

      var transform_str = this.$draggable.css ( 'transform' ),
        matrix =  ( transform_str !== 'none' ) ? transform_str.match ( /[0-9., -]+/ )[0].split ( ', ' ) : [0, 0, 0, 0, 0, 0];

      this.initialXY = {
        X: parseInt ( matrix[4], 10 ),
        Y: parseInt ( matrix[5], 10 )
      };

      this._trigger ( 'start', _.merge ( data, { initialXY: this.initialXY, draggable: this.draggable, $draggable: this.$draggable } ) );

    },

    _move: function ( event, data ) { //TODO: make it more performant

      if ( !this.isDraggable ) return;

      if ( this.motion === false ) {

        this.motion = true;

        if ( this.options.constrainer.$element ) {

          var constrainer_offset = this.options.constrainer.$element.offset (),
            draggable_offset = this.$draggable.offset ();

          this.translateX_min = constrainer_offset.left - ( draggable_offset.left - this.initialXY.X ) + ( this.options.constrainer.constrain_center ? - this.$draggable.width () / 2 : 0 );
          this.translateX_max = constrainer_offset.left + this.options.constrainer.$element.width () - ( ( draggable_offset.left - this.initialXY.X ) + this.$draggable.width () ) + ( this.options.constrainer.constrain_center ? this.$draggable.width () / 2 : 0 );

          this.translateY_min = constrainer_offset.top - ( draggable_offset.top - this.initialXY.Y ) + ( this.options.constrainer.constrain_center ? - this.$draggable.height () / 2 : 0 );
          this.translateY_max = constrainer_offset.top + this.options.constrainer.$element.height () - ( ( draggable_offset.top - this.initialXY.Y ) + this.$draggable.height () ) + ( this.options.constrainer.constrain_center ? this.$draggable.height () / 2 : 0 );

        } else if ( this.options.constrainer.coordinates ) {

          var draggable_offset = this.$draggable.offset ();

          if ( !_.isUndefined ( this.options.constrainer.coordinates.x1 ) ) {

            this.translateX_min = this.options.constrainer.coordinates.x1 - ( draggable_offset.left - this.initialXY.X ) + ( this.options.constrainer.constrain_center ? - this.$draggable.width () / 2 : 0 );

          }

          if ( !_.isUndefined ( this.options.constrainer.coordinates.x2 ) ) {

            this.translateX_max = this.options.constrainer.coordinates.x2 - ( ( draggable_offset.left - this.initialXY.X ) + this.$draggable.width () ) + ( this.options.constrainer.constrain_center ? this.$draggable.width () / 2 : 0 );

          }

          if ( !_.isUndefined ( this.options.constrainer.coordinates.y1 ) ) {

            this.translateY_min = this.options.constrainer.coordinates.y1 - ( draggable_offset.top - this.initialXY.Y ) + ( this.options.constrainer.constrain_center ? - this.$draggable.height () / 2 : 0 );

          }

          if ( !_.isUndefined ( this.options.constrainer.coordinates.y2 ) ) {

            this.translateY_max = this.options.constrainer.coordinates.y2 - ( ( draggable_offset.top - this.initialXY.Y ) + this.$draggable.height () ) + ( this.options.constrainer.constrain_center ? - this.$draggable.height () / 2 : 0 );

          }

        }

        $html.addClass ( 'dragging' );
        this.$draggable.addClass ( 'dragging' );

      }

      var translateX = this.initialXY.X + ( ( this.options.axis === 'y' ) ? 0 : data.deltaXY.X ),
        translateY = this.initialXY.Y + ( ( this.options.axis === 'x' ) ? 0 : data.deltaXY.Y );

      if ( this.options.constrainer.$element || this.options.constrainer.coordinates ) {

        if ( this.options.constrainer.axis !== 'y' ) {

          translateX = _.clamp ( _.isUndefined ( this.translateX_min ) ? undefined : this.translateX_min - this.options.constrainer.tollerance.x, translateX, _.isUndefined ( this.translateX_max ) ? undefined : this.translateX_max + this.options.constrainer.tollerance.x );

        }

        if ( this.options.constrainer.axis !== 'x' ) {

          translateY = _.clamp ( _.isUndefined ( this.translateY_min ) ? undefined : this.translateY_min - this.options.constrainer.tollerance.y, translateY, _.isUndefined ( this.translateY_max ) ? undefined : this.translateY_max + this.options.constrainer.tollerance.y );

        }

      }

      var modifiedXY = {
        X: this.options.modifiers.x ( translateX ),
        Y: this.options.modifiers.y ( translateY )
      };

      this.$draggable.css ( 'transform', 'translate3d(' + ( _.isBoolean ( modifiedXY.X ) ? ( modifiedXY.X ? translateX : this.initialXY.X ) : modifiedXY.X ) + 'px,' + ( _.isBoolean ( modifiedXY.Y ) ? ( modifiedXY.Y ? translateY : this.initialXY.Y ) : modifiedXY.Y ) + 'px,0)' );

      this._trigger ( 'move', _.merge ( data, { initialXY: this.initialXY, modifiedXY: modifiedXY, draggable: this.draggable, $draggable: this.$draggable } ) );

    },

    _end: function ( event, data ) {

      if ( !this.isDraggable ) return;

      if ( this.motion === true ) {

        $html.removeClass ( 'dragging' );
        this.$draggable.removeClass ( 'dragging' );

        if ( this.options.revertable ) {

          this.$draggable.css ( 'transform', 'translate3d(' + this.initialXY.X + 'px,' + this.initialXY.Y + 'px,0)' ); //TODO: animate it

        }

      }

      this._trigger ( 'end', _.merge ( data, { initialXY: this.initialXY, draggable: this.draggable, $draggable: this.$draggable, dragged: this.motion } ) );

    }

  });

  /* READY */

  $(function () {

    $('.draggable').draggable ();

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Positionate v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

//FIXME: if the anchor is half overflowing the viewport at the left, but still if there's space at the bottom the positionable gets positionated at the bottom, instead of the right: maybe create a new normalized area map, that gives more importance to this thing
//TODO: add support for a $pointer ( that can also be a function )

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* POSITIONATE */

  $.fn.positionate = function ( custom_options ) {

    // OPTIONS

    var options = _.merge ({
      direction: false, //INFO: Set a preferred direction
      axis: false, //INFO: Set a preferred axis
      $anchor: false, //INFO: Positionate next to an $anchor element
      $pointer: false, //INFO: The element who is pointing to the anchor
      point: false, //INFO: Positioante at coordinates, ex: { x: number, y: number }
      ranks: { //INFO: How the directions should be prioritized when selecting the `x` axis, the `y` axis, or all of them
        x: ['right', 'left'],
        y: ['bottom', 'top'],
        all: ['bottom', 'right', 'left', 'top']
      },
      callbacks: {
        positionated: _.noop
      }
    }, custom_options );

    // RESETTING

    this.removeClass ( 'positionate-top positionate-bottom positionate-left positionate-right' );

    // VARIABLES

    var directions = _.unique ( _.union ( options.direction ? [options.direction] : [], options.axis ? options.ranks[options.axis] : [], options.ranks.all ) ),
      window_width = $window.width (),
      window_height = $window.height (),
      html_scrollTop = $html.scrollTop (),
      html_scrollLeft = $html.scrollLeft (),
      positionable_offset = this.offset (),
      positionable_width = this.outerWidth (),
      positionable_height = this.outerHeight (),
      anchor_offset = options.$anchor ? options.$anchor.offset () : { top: options.point.y, left: options.point.x },
      anchor_width = options.$anchor ? options.$anchor.outerWidth () : 0,
      anchor_height = options.$anchor ? options.$anchor.outerHeight () : 0;

    // SPACES

    var spaces = _.map ( directions, function ( direction ) {

      switch ( direction ) {

        case 'top':
          return anchor_offset.top - html_scrollTop;

        case 'bottom':
          return window_height - anchor_offset.top - anchor_height + html_scrollTop;

        case 'left':
          return anchor_offset.left - html_scrollLeft;

        case 'right':
          return window_width - anchor_offset.left - anchor_width + html_scrollLeft;

      }

    });

    // AREAS

    var areas = _.map ( directions, function ( direction, index ) {

      switch ( direction ) {

        case 'top':
        case 'bottom':
          return Math.min ( positionable_height, spaces[index] ) * Math.min ( window_width, positionable_width );

        case 'left':
        case 'right':
          return Math.min ( positionable_width, spaces[index] ) * Math.min ( window_height, positionable_height );

      }

    });

    // CHOOSING A DIRECTION

    var chosen_direction = directions[areas.indexOf ( _.max ( areas ) )];

    // GETTING TOP AND LEFT

    switch ( chosen_direction ) {

      case 'top':
      case 'bottom':
        var coordinates = {
          left: anchor_offset.left + ( anchor_width / 2 ) - ( positionable_width / 2 ),
          top: ( chosen_direction === 'top' ) ? anchor_offset.top - positionable_height : anchor_offset.top + anchor_height
        };
        break;

      case 'left':
      case 'right':
        var coordinates = {
          top: anchor_offset.top + ( anchor_height / 2 ) - ( positionable_height / 2 ),
          left: ( chosen_direction === 'left' ) ? anchor_offset.left - positionable_width : anchor_offset.left + anchor_width
        };

    }

    // CONSTRAIN TO THE WINDOW

    //TODO: add a viewport check here, we should positionate it to the viewport if the element is outside of it

    coordinates.top = _.clamp ( 0, coordinates.top, window_height - positionable_height );
    coordinates.left = _.clamp ( 0, coordinates.left, window_width - positionable_width );

    // DATAS

    var datas = {
      coordinates: coordinates,
      direction: chosen_direction
    };

    // SETTING TOP AND LEFT

    this.css ( 'transform', 'translate3d(' + coordinates.left + 'px,' + coordinates.top + 'px,0)' );

    this.addClass ( 'positionate-' + chosen_direction );

    // SETTING THE POINTER

    if ( options.$anchor && options.$pointer ) {

      var $pointer = _.isFunction ( options.$pointer ) ? options.$pointer ( datas ) : options.$pointer;

      if ( $pointer instanceof $ ) {

        var transform_str = $pointer.css ( 'transform' ),
          matrix =  ( transform_str !== 'none' ) ? transform_str.match ( /[0-9., -]+/ )[0].split ( ', ' ) : [0, 0, 0, 0, 0, 0],
          pointer_position = $pointer.position ();

        switch ( chosen_direction ) {

          case 'top':
          case 'bottom':
            var pointer_width = $pointer.width (),
              translateX = parseInt ( matrix[4], 10 ) + ( ( anchor_offset.left + ( anchor_width / 2 ) - html_scrollLeft ) - ( coordinates.left + pointer_position.left + ( pointer_width / 2 ) ) ),
              translateY = parseInt ( matrix[5], 10 );
            break;

          case 'left':
          case 'right':
            var pointer_height = $pointer.height (),
              translateX = parseInt ( matrix[4], 10 ),
              translateY = parseInt ( matrix[5], 10 ) + ( ( anchor_offset.top + ( anchor_height / 2 ) - html_scrollTop ) - ( coordinates.top + pointer_position.top + ( pointer_height / 2 ) ) );
            break;

        }

        $pointer.css ( 'transform', 'translate3d(' + translateX + 'px,' + translateY + 'px,0)' );

      }

    }

    // CALLBACK

    options.callbacks.positionated ( datas );

    return this;

  };

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Dropdown v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * @requires ../positionate/positionate.js
 * ========================================================================= */

//TODO: add support for delegating the trigger click, so that we support the case when a trigger has been added to the DOM dynamically
//TODO: add dropdown-closer

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  var assignments = {};

  /* DROPDOWN */

  $.factory ( 'svelto.dropdown', {

    /* OPTIONS */

    options: {
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$dropdown = this.$element;
      this.$tips = this.$dropdown.find ( '.dropdown-tip' );
      this.$top_tip = this.$tips.filter ( '.top' );
      this.$right_tip = this.$tips.filter ( '.right' );
      this.$bottom_tip = this.$tips.filter ( '.bottom' );
      this.$left_tip = this.$tips.filter ( '.left' );
      this.$actionables = this.$dropdown.find ( '.actionable' );

      this.id = this.$dropdown.attr ( 'id' );

      this.$triggers = $('.dropdown-trigger[data-dropdown="' + this.id + '"]');

      this.hasTips = !this.$dropdown.hasClass ( 'no-tip' );
      this.isAttached = this.$dropdown.hasClass ( 'attached' );

      this.opened = false;

    },

    _events: function () {

      this._on ( this.$triggers, 'click', this.toggle );

      this._on ( this.$actionables, 'click', this.close );

      // this.$btn_parents.on ( 'scroll', this.update ); //FIXME: If we are doing it into a scrollable content it will be a problem if we don't handle it, the dropdown will not move

    },

    /* WINDOW RESIZE / SCROLL */

    _bind_window_resize_scroll: function () {

      this._on ( $window, 'resize scroll', this._update );

    },

    _unbind_window_resize_scroll: function () {

      this._off ( $window, 'resize scroll', this._update );

    },

    /* WINDOW CLICK */

    _bind_window_click: function () {

      this._on ( $window, 'click', this._handler_window_click );

    },

    _unbind_window_click: function () {

      this._off ( $window, 'click', this._handler_window_click );

    },

    _handler_window_click: function ( event ) {

      var $parents = $(event.target).parents ();

      if ( $parents.index ( this.$dropdown ) === -1 ) { //INFO: Checking if we clicked inside the dropdown or another trigger for this dropdown

        for ( var i = 0, l = this.$triggers.length; i < l; i++ ) {

          if ( event.target === this.$triggers.get ( i ) || $parents.index ( this.$triggers.get ( i ) ) !== -1 ) {

            return;

          }

        }

        this.close ();

      }

    },

    /* POSITIONATE */

    _positionate: function () {

      // Variables

      var $trigger = $(assignments[this.id]),
        no_tip = $trigger.hasClass ( 'no-tip' ) || !this.hasTips || this.isAttached,
        instance = this;

      // Positionate

      this.$dropdown.positionate ({
        $anchor: $trigger,
        $pointer: function ( data ) {
          if ( !no_tip ) {
            return instance['$' + instance._get_opposite_direction ( data.direction ) + '_tip'];
          }
        },
        callbacks: {
          positionated: function ( data ) {
            $trigger.addClass ( 'dropdown-trigger-' + data.direction );
          }
        }
      });

    },

    /* PRIVATE */

    _get_opposite_direction: function ( direction ) {

      switch ( direction ) {

        case 'top':
          return 'bottom';

        case 'bottom':
          return 'top';

        case 'left':
          return 'right';

        case 'right':
          return 'left';

      }

    },

    _update: function () {

      if ( this.opened ) {

        this._positionate ();

      }

    },

    /* PUBLIC */

    toggle: function ( event, trigger ) {

      this[( this.opened && assignments[this.id] === trigger ) ? 'close' : 'open']( event, trigger );

    },

    open: function ( event, trigger ) {

      if ( trigger ) {

        $(assignments[this.id]).removeClass ( 'dropdown-trigger-top dropdown-trigger-bottom dropdown-trigger-left dropdown-trigger-right active' );

        if ( this.opened && assignments[this.id] !== trigger ) {

          this.$dropdown.addClass ( 'moving' );

        }

        assignments[this.id] = trigger;

        $(trigger).addClass ( 'active' );

      }

      this._positionate ();

      this.$dropdown.addClass ( 'active' );

      this.opened = true;

      this._delay ( this._bind_window_click ); //FIXME: Why without the delay it doesn't work?
      this._bind_window_resize_scroll ();

      this._trigger ( 'open' );

    },

    close: function () {

      $(assignments[this.id]).removeClass ( 'dropdown-trigger-top dropdown-trigger-bottom dropdown-trigger-left dropdown-trigger-right active' );

      this.$dropdown.removeClass ( 'active moving' );

      this.opened = false;

      this._unbind_window_click ();
      this._unbind_window_resize_scroll ();

      this._trigger ( 'close' );

    }

  });

  /* READY */

  $(function () {

    $('.dropdown').dropdown ();

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Flippable v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* FLIPPABLE */

  $.factory ( 'svelto.flippable', {

    /* OPTIONS */

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
        font: _.noop,
        back: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$flippable = this.$element;
      this.$front = this.$flippable.find ( this.options.selectors.front );
      this.$back = this.$flippable.find ( this.options.selectors.back );
      this.$flippers = this.$flippable.find ( this.options.selectors.flipper );

      this.isFlipped = this.$flippable.hasClass ( this.options.classes.flip );

    },

    _events: function () {

      this._on ( this.$flippers, $.Pointer.tap, this.flip );

    },

    /* PUBLIC */

    flip: function ( force ) {

      if ( !_.isBoolean ( force ) ) {

        force = !this.isFlipped;

      }

      if ( force !== this.isFlipped ) {

        this.isFlipped = force;

        this.$flippable.toggleClass ( this.options.classes.flip, this.isFlipped );

        this._trigger ( this.isFlipped ? 'back' : 'front' );

      }

    },

    front: function () {

      this.flip ( false );

    },

    back: function () {

      this.flip ( true );

    }

  });

  /* READY */

  $(function () {

    $('.flippable').flippable ();

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Form Sync v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

//TODO: maybe sync at the init time also

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  var synced_groups = [];

  /* FORM SYNC */

  $.fn.formSync = function () {

    this.each ( function () {

      var $form = $(this),
        sync_group = $form.data ( 'sync-group' );

      if ( synced_groups.indexOf ( sync_group ) !== -1 ) return;

      synced_groups.push ( sync_group );

      var $forms = $('form[data-sync-group="' + sync_group + '"]'),
        $eles = $forms.find ( 'input, textarea, select' );

      $eles.each ( function () {

        var $ele = $(this),
          name = $ele.attr ( 'name' ),
          is_checkable = $ele.is ( '[type="radio"], [type="checkbox"]' ),
          is_radio = is_checkable && $ele.is ( '[type="radio"]' ),
          is_textbox = $ele.is ( 'input, textarea' ),
          events = is_textbox ? 'input change' : 'change',
          $current_form = $ele.parent ( 'form' ),
          $other_forms = $forms.not ( $current_form ),
          $other_eles = $other_forms.find ( '[name="' + name + '"]' );

        $ele.on ( events, function () {

          var current_value = $ele.val (),
            current_checked = !!$ele.prop ( 'checked' );

          $other_eles.each ( function () {

            var $other_ele = $(this),
              other_value = $other_ele.val (),
              other_checked = !!$other_ele.prop ( 'checked' );

            if ( is_radio ) {

              if ( current_value !== other_value || current_checked === other_checked ) return;

            } else if ( current_value === other_value && current_checked === other_checked ) {

              return;

            }

            if ( is_checkable ) {

              $other_ele.prop ( 'checked', current_checked ).trigger ( 'change' );

            } else {

              $other_ele.val ( current_value ).trigger ( 'change' );

            }

          });

        });

      });

    });

  };

  /* READY */

  $(function () {

    $('form[data-sync-group]').formSync ();

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Loading v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* LOADING */

  $.fn.loading = function ( force, custom_options ) {

    // OPTIONS

    var options = _.merge ({
      color: {
        wrapper: 'inherit',
        spinner: 'secondary'
      }
    }, custom_options );

    // LOADING

    this.addClass ( 'spinner-overlay-activable' );

    if ( _.isUndefined ( force ) ) {

      force = !this.hasClass ( 'spinner-overlay-active' );

    }

    var $overlay = this.children ( '.spinner-overlay' );

    if ( $overlay.length === 0 ) {

      this.prepend (
        '<div class="spinner-overlay ' + options.color.wrapper + '">' +
          '<div class="spinner-wrp">' +
            '<div class="spinner ' + options.color.spinner + '">' +
              '<div class="circle-wrp left">' +
                '<div class="circle"></div>' +
              '</div>' +
              '<div class="circle-wrp right">' +
                '<div class="circle"></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>'
      );

    } else {

      if ( force ) {

        $overlay.attr ( 'class', 'spinner-overlay ' + options.color.wrapper );
        $overlay.find ( '.spinner' ).attr ( 'class', 'spinner ' + options.color.spinner );

      }

    }

    $.reflow (); //FIXME: is it needed?

    this.toggleClass ( 'spinner-overlay-active', force );

    return this;

  };

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Noty v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Add better support for swipe to dismiss

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  var notiesTimers = [];

  /* HELPER */

  $.noty = function ( options ) {

    /* OPTIONS */

    options = _.isString ( options ) ? { body: options } : ( options || {} );

    if ( options.buttons ) {

      options.type = 'action';

    }

    /* NOTY */

    return new $.svelto.noty ( options );

  };

  /* NOTY */

  $.factory ( 'svelto.noty', {

    /* TEMPLATES */

    templates: {
      base: '<div class="noty {%=(o.transparentize ? "transparentize" : "")%} {%=o.type%} {%=(o.type !== "action" ? "actionable" : "")%} {%=o.color%} {%=o.css%}">' +
              '<div class="infobar">' +
                '{% if ( o.img ) { %}' +
                  '<img src="{%=o.img%}" class="noty-img infobar-left" />' +
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
                    '{% include ( "svelto.noty.button", o.buttons[0] ); %}' +
                  '</div>' +
                '{% } %}' +
              '</div>' +
              '{% if ( o.buttons.length > 1 ) { %}' +
                '<div class="noty-buttons multiple centered">' +
                  '{% for ( var i = 0; i < o.buttons.length; i++ ) { %}' +
                    '{% include ( "svelto.noty.button", o.buttons[i] ); %}' +
                  '{% } %}' +
                '</div>' +
              '{% } %}' +
            '</div>',
      button: '<div class="button {%=(o.color || "white")%} {%=(o.size || "small")%} {%=(o.css || "")%}">' +
                '{%#(o.text || "")%}' +
              '</div>'
    },

    /* OPTIONS */

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
      transparentize: true,
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
        remove: $.ui.animation.normal
      },

      callbacks: {
        open: _.noop,
        close: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$noty = this.$element;
      this.$buttons = this.$noty.find ( this.options.selectors.button );

      this.timer = false;
      this._isOpen = false;
      this.neverOpened = true;

    },

    _init: function () {

      if ( this.options.autoplay ) {

        this.open ();

      }

    },

    /* PRIVATE */

    ___click: function () {

      if ( this.options.type !== 'action' ) {

        this._on ( $.Pointer.tap, this.close );

      }

    },

    ___buttonClick: function () {

      _.each ( this.options.buttons, function ( button, index ) {

        this._on ( this.$buttons.eq ( index ), $.Pointer.tap, function ( event, data ) {

          if ( button.onClick ) {

            if ( button.onClick.apply ( this.$buttons.get ( index ), [event, data] ) === false ) return;

          }

          this.close ();

        });

      }, this );

    },

    _init_timer: function () {

      if ( this.options.type !== 'action' && _.isNumber ( this.options.ttl ) && this.options.ttl !== Infinity ) {

        this.timer = $.timer ( this.close.bind ( this ), this.options.ttl, true );

        notiesTimers.push ( this.timer );

      }

    },

    ___hover: function () {

      var instance = this;

      this.$noty.hover ( function () {

        _.each ( notiesTimers, function ( timer ) {

          timer.pause ();

        });

      }, function () {

        _.each ( notiesTimers, function ( timer ) {

          timer.remaining ( Math.max ( instance.options.timerMinimumRemaining, timer.remaining () || 0 ) );

          timer.play ();

        });

      });

    },

    ___flick: function () {

      if ( this.options.type !== 'action' ) {

        this._on ( $.Pointer.flick, function ( event, data ) {

          if ( data.orientation === 'horizontal' ) {

            this.close ();

          }

        });

      }

    },

    __keydown: function ( event ) {

      if ( event.keyCode === $.ui.keyCode.ESCAPE ) {

        event.stopImmediatePropagation ();

        this.close ();

      }

    },

    /* PUBLIC */

    isOpen: function () {

      return this._isOpen;

    },

    open: function () {

      if ( !this._isOpen ) {

        this._frame ( function () {

            $('.noty-queues.' + this.options.anchor.y + ' .noty-queue.' + this.options.anchor.x).append ( this.$noty );

            this._frame ( function () {

              this.$noty.addClass ( this.options.classes.open );

            });

        });

        if ( this.neverOpened ) {

          this.___click ();
          this.___flick ();
          this.___buttonClick ();
          this.___hover ();

          this.neverOpened = false;

        }

        this._init_timer ();

        this._on ( $document, 'keydown', this.__keydown );

        this._isOpen = true;

        this._trigger ( 'open' );

      }

    },

    close: function () {

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

  });

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

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Form Ajax v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../loading/loading.js
 * @requires ../noty/noty.js
 * ========================================================================= */

//TODO: check if it works, also for upload

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* FORM AJAX */

  $.fn.formAjax = function () {

    this.on ( 'submit', function ( event ) {

      var $form = $(this);

      event.preventDefault (); //FIXME: Does it work?

      $.ajax ({

        cache: false,
        contentType: 'multipart/form-data',
        data: new FormData ( this ),
        processData: false,
        type: $form.attr ( 'method' ) || 'POST',
        url: $form.attr ( 'action' ),

        beforeSend: function () {

          $form.loading ( true );

        },

        error: function ( res ) {

          if ( _.isString ( res ) ) {

            if ( res[0] === '<' ) { //INFO: Is HTML

              $.noty ( 'There was an error, please try again or report the problem' );

              $body.append ( res );

            } else {

              $.noty ( res );

            }

          } else {

            $.noty ( 'There was an error, please try again or report the problem' );

          }

        },

        success: function ( res ) {

          if ( _.isString ( res ) ) {

            if ( res === 'refresh' ) {

              $.noty ( 'Done! Refreshing the page...' );

              location.reload ();

            } else if ( /^((\S*)?:\/\/)?\/?\S*$/.test ( res ) ) { //INFO: Is an url, either absolute or relative

              if ( res === window.location.href || res === window.location.pathname ) {

                $.noty ( 'Done! Refreshing the page...' );

                location.reload ();

              } else {

                $.noty ( 'Done! Redirecting...' );

                location.assign ( res );

              }

            } else if ( res[0] === '<' ) { //INFO: Is HTML

              $.noty ( 'Done! A page refresh may be needed to see the changes' );

              $body.append ( res );

            } else {

              $.noty ( res );

            }

          } else {

            $.noty ( 'Done! A page refresh may be needed to see the changes' );

          }

        },

        complete: function () {

          $form.loading ( false );

        }

      });

    });

  };

  /* READY */

  $(function () {

    $('form.ajax').formAjax ();

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Infobar v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Maybe add the ability to open it

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* INFOBAR */

  $.factory ( 'svelto.infobar', {

    /* OPTIONS */

    options: {
      selectors: {
        closer: '.infobar-closer'
      },
      callbacks: {
        close: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$infobar = this.$element;
      this.$closers = this.$infobar.find ( this.options.selectors.closer );

    },

    _events: function () {

      this._on ( this.$closers, $.Pointer.tap, this.close );

    },

    /* PUBLIC */

    close: function () {

      this.$infobar.remove ();

      this._trigger ( 'close' );

    }

  });

  /* READY */

  $(function () {

    $('.infobar').infobar ();

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Modal v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Disable scrolling while the modal is open

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* MODAL */

  $.factory ( 'svelto.modal', {

    /* OPTIONS */

    options: {
      classes: {
        open: 'open'
      },
      selectors: {
        trigger: '.modal-trigger',
        closer: '.modal-closer',
        background: '.modal-background'
      },
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$modal = this.$element;

      this.id = this.$modal.attr ( 'id' );

      this.$triggers = $(this.options.selectors.trigger + '[data-modal="' + this.id + '"]');
      this.$closers = this.$modal.find ( this.options.selectors.closer );
      this.$background = this.$modal.next ( this.options.selectors.background );

      this._isOpen = this.$modal.hasClass ( this.options.classes.open );

    },

    _events: function () {

      /* TRIGGER */

      this._on ( this.$triggers, $.Pointer.tap, this.open );

      /* CLOSER & BACKGROUND */

      this._on ( this.$closers.add ( this.$background ), $.Pointer.tap, this.close );

    },

    /* PRIVATE */

    __keydown: function ( event ) {

      if ( event.keyCode === $.ui.keyCode.ESCAPE ) {

        event.stopImmediatePropagation ();

        this.close ();

      }

    },

    /* PUBLIC */

    isOpen: function () {

      return this._isOpen;

    },

    toggle: function ( force ) {

      if ( !_.isBoolean ( force ) ) {

        force = !this._isOpen;

      }

      if ( force !== this._isOpen ) {

        this._isOpen = force;

        this.$modal.toggleClass ( this.options.classes.open, this._isOpen );

        this[this._isOpen ? '_on' : '_off']( $document, 'keydown', this.__keydown );

        this._trigger ( this._isOpen ? 'open' : 'close' );

      }

    },

    open: function () {

      this.toggle ( true );

    },

    close: function () {

      this.toggle ( false );

    }

  });

  /* READY */

  $(function () {

    $('.modal').modal ();

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Navbar v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Replace flickable support with a smooth moving navbar, so operate on drag
//TODO: Support esc key to close it

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* NAVBAR */

  $.factory ( 'svelto.navbar', {

    /* OPTIONS */

    options: {
      flickableArea: 20, //INFO: Amount of pixels close to the viewport border where the flick should be considered intentional //FIXME: Should be consistend within different DPIs
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$navbar = this.$element;

      this.id = this.$navbar.attr ( 'id' );

      this.$closers = this.$navbar.find ( '.navbar-closer, + .navbar-background' );
      this.$triggers = $('.navbar-trigger[data-navbar="' + this.id + '"]');

      this.direction = this.$navbar.data ( 'direction' );
      this.isFlickable = this.$navbar.hasClass ( 'flickable' );
      this.opened = this.$navbar.hasClass ( 'opened' );

    },

    _events: function () {

      /* CLOSER CLICK */

      this._on ( this.$closers, $.Pointer.tap, this.close );

      /* TRIGGER CLICK */

      this._on ( this.$triggers, $.Pointer.tap, this.open );

      /* FLICK */

      if ( this.isFlickable ) {

        this._on ( $document, $.Pointer.flick, this._handler_flick );

      }

    },

    /* PRIVATE */

    _handler_flick: function ( event, data ) {

      if ( this.opened ) return;

      switch ( this.direction ) {

        case 'left':
        case 'right':
          if ( data.orientation === 'horizontal' ) {
            if ( this.direction === 'left' ) {
              if ( data.direction === 1 ) {
                if ( data.startXY.X <= this.options.flickableArea ) {
                  this.open ();
                }
              }
            } else if ( this.direction === 'right' ) {
              if ( data.direction === -1 ) {
                if ( $window.width () - data.startXY.X <= this.options.flickableArea ) {
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
              if ( data.direction === -1 ) {
                if ( data.startXY.Y <= this.options.flickableArea ) {
                  this.open ();
                }
              }
            } else if ( this.direction === 'bottom' ) {
              if ( data.direction === 1 ) {
                if ( $window.height () - data.startXY.Y <= this.options.flickableArea ) {
                  this.open ();
                }
              }
            }
          }
          break;

      }

    },

    /* PUBLIC */

    toggle: function ( force ) {

      if ( _.isUndefined ( force ) ) {

        force = !this.opened;

      }

      if ( force !== this.opened ) {

        this.opened = force;

        this.$navbar.toggleClass ( 'opened', this.opened );

        this._trigger ( this.opened ? 'open' : 'close' );

      }

    },

    open: function () {

      this.toggle ( true );

    },

    close: function () {

      this.toggle ( false );

    }

  });

  /* READY */

  $(function () {

    $('.navbar').navbar ();

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Notification v0.1.1
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../noty/noty.js
 * ========================================================================= */

//INFO: If the tab hasn't the focus and we can use the native notifications than we'll send a native notification, otherwise we will fallback to a noty

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* NOTIFICATION */

  $.notification = function ( options ) {

    /* OPTIONS */

    options = _.merge ({
      title: false,
      body: false,
      img: false
    }, options );

    /* NOTIFICATIONS */

    if ( !document.hasFocus () && window.Notification && Notification.permission !== 'denied' ) {

      Notification.requestPermission ( function ( status ) {

        if ( status === 'granted' ) {

          var notification = new Notification ( options.title, { body: options.body, icon: options.img } );

        } else {

          $.noty ( options );

        }

      });

    } else {

      $.noty ( options );

    }

  };

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - One Time Action v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../cookie/cookie.js
 * ========================================================================= */

//INFO: the pipe character (|) is forbidden inside a name, cookie's ttl is 1 year

//TODO: add support for other cookie settable parameters

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* ONE TIME ACTION */

  $.oneTimeAction = function ( custom_options, action ) {

    // OPTIONS

    var options = {
      container: 'ota', //INFO: the cookie name that holds the actions, a namespace for related actions basically
      expiry: Infinity, //INFO: the expire time of the container
      name: false, //INFO: the action name
      action: false //INFO: the action to execute
    };

    if ( _.isString ( custom_options ) ) {

      options.name = custom_options;

      if ( _.isFunction ( action ) ) {

        options.action = action;

      }

    } else if ( _.isPlainObject ( custom_options ) ) {

      _.merge ( options, custom_options );

    }

    // ONE TIME ACTION

    if ( options.name ) {

      var action = new Action ( options.container, options.name );

      if ( options.action && !action.get () ) {

        options.action ();

        action.set ();

      }

      return action;

    } else if ( options.container ) {

      return new Container ( options.container, options.expiry );

    }

  };

  /* CONTAINER OBJ */

  var Container = function ( name, expiry ) {

    this.name = name;
    this.expiry = expiry;

    this.actionsStr = $.cookie.get ( this.name ) || '';
    this.actions = this.actionsStr.length > 0 ? this.actionsStr.split ( '|' ) : [];

  };

  Container.prototype = {

    get: function ( action ) {

      return _.contains ( this.actions, action );

    },

    set: function ( action ) {

      if ( !this.get ( action ) ) {

        this.actions.push ( action );

        this.update ();

      }

    },

    update: function () {

      this.actionsStr = this.actions.join ( '|' );

      $.cookie.set ( this.name, this.actionsStr, this.expiry );

    },

    reset: function ( action ) {

      if ( action ) {

        _.pull ( this.actions, action );

        this.update ();

      } else {

        $.cookie.remove ( this.name );

      }

    }

  };

  /* ACTION OBJ */

  var Action = function ( container, name, action ) {

    this.container = new Container ( container );
    this.name = name;

  };

  Action.prototype = {

    get: function () {

      return this.container.get ( this.name );

    },

    set: function () {

      this.container.set ( this.name );

    },

    reset: function () {

      this.container.reset ( this.name );

    }

  };

}( jQuery, _, window, document ));

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
* Svelto - Progressbar v0.2.0
* =========================================================================
* Copyright (c) 2015 Fabio Spampinato
* Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
* =========================================================================
* @requires ../widget/factory.js
* ========================================================================= */

;(function ( $, _, window, document, undefined ) {

'use strict';

/* HELPER */

$.progressbar = function ( options ) {

  options = _.isNumber ( options ) ? { value: options } : options;

  return new $.svelto.progressbar ( options );

};

/* PROGRESSBAR */

$.factory ( 'svelto.progressbar', {

  /* TEMPLATES */

  templates: {
    base: '<div class="progressbar {%=(o.striped ? "striped" : "")%} {%=o.colors.off%} {%=o.size%} {%=o.css%}">' +
            '<div class="progressbar-highlight {%=o.colors.on%}">' +
              '{% if ( o.labeled ) { %}' +
                '<div class="progressbar-label"></div>' +
              '{% } %}' +
            '</div>' +
          '</div>'
  },

  /* OPTIONS */

  options: {
    value: 0, // Percentage
    colors: { // Colors to use for the progressbar
      on: '', // Color of `.progressbar-highlight`
      off: '' // Color of `.progressbar`
    },
    striped: '', // Draw striped over it
    labeled: '', // Draw a label inside
    decimals: 0, // Amount of decimals to round the label value to
    size: '', // Size of the progressbar: '', 'compact', 'slim'
    css: '',
    selectors: {
      highlight: '.progressbar-highlight',
      label: '.progressbar-label'
    },
    callbacks: {
      change: _.noop,
      empty: _.noop,
      full: _.noop
    }
  },

  /* SPECIAL */

  _variables: function () {

    this.$progressbar = this.$element;
    this.$highlight = this.$progressbar.find ( this.options.selectors.highlight );
    this.$label = this.$progressbar.find ( this.options.selectors.label );

  },

  _init: function () {

    this.options.value = this._sanitizeValue ( this.options.value );

    this._updateWidth ();
    this._updateLabel ();

  },

  /* PRIVATE */

  _sanitizeValue: function ( value ) {

    var nr = Number ( value );

    return _.clamp ( 0, ( _.isNaN ( nr ) ? 0 : nr ), 100 );

  },

  _roundValue: function ( value ) {

    return value.toFixed ( this.options.decimals );

  },

  _updateWidth: function () {

    this.$highlight.css ( 'min-width', this.options.value + '%' );

  },

  _updateLabel: function () {

    this.$label.html ( this._roundValue ( this.options.value ) + '%' );

  },

  _update: function () {

    this._updateWidth ();
    this._updateLabel ();

  },

  /* PUBLIC */

  get: function () {

    return this.options.value;

  },

  set: function ( value ) {

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

        this._trigger  ( 'change', data );

        if ( this.options.value === 0 ) {

          this._trigger  ( 'empty', data );

        } else if ( this.options.value === 100 ) {

          this._trigger  ( 'full', data );

        }

      }

    }

  }

});

/* READY */

$(function () {

  $('.progressbar').each ( function () {

    var $progressbar = $(this);

    $progressbar.progressbar ({
      value: $progressbar.data ( 'value' ),
      decimals: $progressbar.data ( 'decimals ')
    });

  });

});

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Radio v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* RADIO */

  $.factory ( 'svelto.radio', {

    /* OPTIONS */

    options: {
      callbacks: {
        checked: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$radio = this.$element;
      this.$input = this.$radio.find ( 'input' );

      this.name = this.$input.attr ( 'name' );

      this.$container = this.$radio.parents ( 'form' ).first ();

      if ( this.$container.length === 0 ) {

        this.$container = $document;

      }

      this.$other_radios = this.$container.find ( 'input[name="' + this.name + '"]' ).parent ( '.radio' ).not ( this.$radio );

    },

    _init: function () { //FIXME: is it necessary to include it? Maybe we should fix mistakes with the markup...

      var hasClass = this.$radio.hasClass ( 'checked' );

      if ( this.get () ) {

        if ( !hasClass ) {

          this.$radio.addClass ( 'checked' );

        }

      } else if ( hasClass ) {

        this.$radio.removeClass ( 'checked' );

      }

    },

    _events: function () {

      this._on ( 'click', function () {

        this.check ();

      });

      this._on ( true, 'change', this._handler_change );

    },

    /* CHANGE */

    _handler_change: function () {

      var isChecked = this.get ();

      if ( isChecked ) {

        this.$other_radios.removeClass ( 'checked' );

      }

      this.$radio.toggleClass ( 'checked', isChecked );

      this._trigger ( isChecked ? 'checked' : 'unchecked' );

    },

    /* PUBLIC */

    get: function () {

      return this.$input.prop ( 'checked' );

    },

    check: function () {

      if ( !this.get () ) {

        this.$input.prop ( 'checked', true ).trigger ( 'change' );

        this._trigger ( 'checked' );

      }

    }

  });

  /* READY */

  $(function () {

    $('.radio').radio ();

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Ripple v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* RIPPLE */

  var Ripple = {

    delay: {
      show: 350,
      hide: 400
    },

    show: function ( event, $element ) {

      var $ripple = $( '<div class="ripple-circle"></div>' ).appendTo ( $element ),
        offset = $element.offset (),
        eventXY = $.eventXY ( event ),
        now = _.now ();

      $ripple.css ({
        top: eventXY.Y - offset.top,
        left: eventXY.X - offset.left
      }).addClass ( 'ripple-circle-show' );

      $element.on ( 'mouseup mouseleave', function () {

        Ripple.hide ( $ripple, now );

      });

    },

    hide: function ( $ripple, before ) {

      var delay = Math.max ( 0, Ripple.delay.show + before - _.now () );

      setTimeout ( function () {

        $ripple.addClass ( 'ripple-circle-hide' );

        setTimeout ( function () {

          $ripple.remove ();

        }, Ripple.delay.hide );

      }, delay );

    }
  };

  /* READY */

  $(function () {

    $body.on ( 'mousedown', '.ripple', function ( event ) {

      if ( event.button === $.ui.mouseButton.RIGHT ) return;

      Ripple.show ( event, $(this) );

    });

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Select v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Add support for selecting multiple options (with checkboxes maybe)
//FIXME: Doesn't work when the page is scrolled (check in the components/form)
//TODO: add select-closer

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* SELECT */

  $.factory ( 'svelto.select', {

    /* TEMPLATES */

    templates: {
      base: '<div id="dropdown-{%=o.id%}" class="dropdown select-dropdown attached">' +
            '<div class="container">' +
              '<div class="container-content">' +
                '<div class="multiple vertical stretched joined">' +
                    '{% for ( var i = 0, l = o.options.length; i < l; i++ ) { %}' +
                      '{% include ( "svelto.select." + ( o.options[i].value ? "option" : "optgroup" ), o.options[i] ); %}' +
                    '{% } %}' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>',
      optgroup: '<div class="divider-wrp block">' +
              '<div class="divider">' +
                '{%=o.prop%}' +
              '</div>' +
            '</div>',
      option: '<div class="label-wrp button-wrp" data-value="{%=o.prop%}">' +
            '<div class="label actionable sharp">' +
              '<div class="label-center">' +
                '{%=o.value%}' +
              '</div>' +
            '</div>' +
          '</div>'
     },

    /* OPTIONS */

    options: {
      callbacks: {
        open: _.noop,
        close: _.noop,
        change: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$trigger = this.$element;
      this.$select = this.$trigger.find ( 'select' );
      this.$options = this.$select.find ( 'option' );
      this.$select_label = this.$trigger.find ( '.select-label' );
      this.$valueholder = this.$trigger.find ( '.valueholder' );

      this.id = this.$trigger.data ( 'select' );

      if ( this.$valueholder.length === 0 ) {

        this.$valueholder = this.$select_label;

      }

      this.select_options = [];

      this.$dropdown = false;
      this.$dropdown_container = false;
      this.$buttons = false;

    },

    _init: function () {

      this._update_valueholder ();

      if ( !$.browser.is.touchDevice ) {

        this.$select.addClass ( 'hidden' );

        this._init_select_options ();
        this._init_dropdown ();

      }

    },

    _events: function () {

      this._on ( this.$select, 'change', function () {
        this.update ();
        this._trigger ( 'change' );
      });

      if ( !$.browser.is.touchDevice ) {

        this._on ( this.$buttons, 'click', this._handler_button_click );

      }

    },

    /* BUTTON CLICK */

    _handler_button_click: function ( event, button ) {

      this.$select.val ( $(button).data ( 'value' ) ).trigger ( 'change' );

    },

    /* PRIVATE */

    _init_select_options: function () { //FIXME: Add support for arbitrary number of optgroups levels

      var previous_optgroup,
        current_optgroup;

      for ( var i = 0, l = this.$options.length; i < l; i++ ) {

        var $option = this.$options.eq ( i ),
          $parent = $option.parent ();

        if ( $parent.is ( 'optgroup' ) ) {

          current_optgroup = $parent.attr ( 'label' );

          if ( current_optgroup !== previous_optgroup ) {

            previous_optgroup = current_optgroup;

            this.select_options.push ({
              prop: current_optgroup
            });

          }

        }

        this.select_options.push ({
          value: $option.html (),
          prop: $option.attr ( 'value' )
        });

      }

    },

    _init_dropdown: function () {

      var html = this._tmpl ( 'base', { id: this.id, options: this.select_options } );

      $body.append ( html );

      this.$dropdown = $('#dropdown-' + this.id);
      this.$dropdown_container = this.$dropdown.find ( '.container' );
      this.$buttons = this.$dropdown.find ( '.button-wrp' );

      this.$trigger.addClass ( 'dropdown-trigger' ).attr ( 'data-dropdown', 'dropdown-' + this.id );

      var instance = this;

      this.$dropdown.dropdown ({
        callbacks: {
          open: function () {
            instance._set_dropdown_width.bind ( instance )(); //FIXME: is the bind necessary?
            instance._trigger ( 'open' );
          },
          close: instance.options.callbacks.close
        }
      });

      this._update_dropdown ();

    },

    _update_valueholder: function () {

      var $selected_option = this.$options.filter ( '[value="' + this.$select.val () + '"]' );

      this.$valueholder.html ( $selected_option.html () );

    },

    _update_dropdown: function () {

      this.$buttons.removeClass ( 'active' );

      this.$buttons.filter ( '[data-value="' + this.$select.val () + '"]' ).addClass ( 'active' );

    },

    _set_dropdown_width: function () {

      this.$dropdown_container.css ( 'min-width', this.$trigger.width () );

    },

    /* PUBLIC */

    select: function ( value ) {

      this.$buttons.filter ( '[data-value="' + value + '"]' ).click ();

    },

    update: function () {

      if ( !$.browser.is.touchDevice ) {

        this._update_dropdown ();

      }

      this._update_valueholder ();

    }

  });

  /* READY */

  $(function () {

    $('.select-trigger').select ();

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Selectable v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: add dropdown for actions AND/OR right click for action
//FIXME: make it workable with sorting (update after sorting since we may)
//TODO: make it work with checkboxes
//FIXME: select multiple with shift, then just click inside the selection, the clicked element doesn't get selected

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* PRIVATE */

  var clear_selection = function () {

    if ( document.selection ) {

      document.selection.empty ();

    } else if ( window.getSelection ) {

      window.getSelection ().removeAllRanges ();

    }

  };

  /* SELECTABLE */

  $.factory ( 'svelto.selectable', {

    /* OPTIONS */

    options: {
      selector: 'tbody tr:not(.empty)',
      selected_class: 'selected',
      callbacks: {
        select: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$rows = this._get_rows ();

      this.$start_row = false;
      this.$end_row = false;

    },

    _init: function () {

      this._reset_prevs ();

    },

    _events: function () {

      /* KEYS */

      this._on ( 'mouseenter', this._handler_keys_in );

      this._on ( 'mouseleave', this._handler_keys_out );

      /* MOUSE */

      this._on ( 'mousedown', this.options.selector, this._handler_mousedown );

      /* OTHERS */

      //FIXME: add support tableHelper and sortable

      this._on ( 'change sort', this._handler_change );

      this._on ( 'mousedown mouseup', this._handler_clear_selection );

    },

    /* CTRL + A / CTRL + SHIFT + A / CTRL + I */

    _handler_keys_in: function () {

      this._on ( $document, 'keydown', this._handler_keys_keydown );

    },

    _handler_keys_out: function () {

      this._off ( $document, 'keydown', this._handler_keys_keydown );

    },

    _handler_keys_keydown: function ( event ) {

      if ( ( $.browser.is.mac && event.metaKey ) || ( !$.browser.is.mac && event.ctrlKey ) ) { //INFO: COMMAND or CTRL, is we are on Mac or not

        if ( event.keyCode === 65 ) { //INFO: A

          event.preventDefault ();

          this._reset_prevs ();

          this.$rows.toggleClass ( this.options.selected_class, !event.shiftKey ); //INFO: SHIFT or not //FIXME: only works if the last character pushed is the `A`, but is it an unwanted behaviour?

          this._trigger ( 'select' );

        } else if ( event.keyCode === 73 ) { //INFO: I

          event.preventDefault ();

          this._reset_prevs ();

          this.$rows.toggleClass ( this.options.selected_class );

          this._trigger ( 'select' );

        }

      }

    },

    /* CLICK / CTRL + CLICK / SHIFT + CLICK / CTRL + CLICK -> DRAG */

    _handler_mousedown: function ( event ) {

      if ( event.button !== 0 ) return; //INFO: Only the left click is enabled

      this.$start_row = $(event.currentTarget);

      this._on ( $document, 'mousemove', this._handler_mousemove );

      this._on ( 'mouseup', this.options.selector, this._handler_mouseup );

    },

    _handler_mousemove: function ( event ) { // DRAG

      if ( ( $.browser.is.mac && !event.metaKey ) || ( !$.browser.is.mac && !event.ctrlKey ) ) return;

      this._off ( $document, 'mousemove', this._handler_mousemove );

      this._off ( 'mouseup', this._handler_mouseup );

      this._reset_prevs ();

      this.$prev_row = this.$start_row;

      this.$start_row.toggleClass ( this.options.selected_class );

      $html.addClass ( 'dragging' );

      this._on ( 'mouseenter', this.options.selector, this._handler_drag_mouseenter );

      this._on ( $document, 'mouseup', this._handler_drag_mouseup );

      this._trigger ( 'select' );

    },

    _handler_drag_mouseenter: function ( event ) { // DRAG HOVER

      this.$end_row = $(event.currentTarget);

      var start_index = this.$rows.index ( this.$start_row ),
        end_index = this.$rows.index ( this.$end_row ),
        min_index = Math.min ( start_index, end_index ),
        max_index = Math.max ( start_index, end_index );

      if ( min_index === start_index ) { // down

        min_index += 1;
        max_index += 1;

      }

      var $new_dragged = this.$rows.slice ( min_index, max_index );

      if ( this.$prev_dragged ) {

        $new_dragged.not ( this.$prev_dragged ).toggleClass ( this.options.selected_class );

        this.$prev_dragged.not ( $new_dragged ).toggleClass ( this.options.selected_class );

      } else {

        $new_dragged.toggleClass ( this.options.selected_class );

      }

      this.$prev_dragged = $new_dragged;

      this._trigger ( 'select' );

    },

    _handler_drag_mouseup: function () { // DRAG END

      this._off ( 'mouseenter', this._handler_drag_mouseenter );

      this._off ( $document, 'mouseup', this._handler_drag_mouseup );

      this.$prev_dragged = false;

      $html.removeClass ( 'dragging' );

    },

    _handler_mouseup: function ( event ) { // CLICK

      this._off ( $document, 'mousemove', this._handler_mousemove );

      this._off ( 'mouseup', this._handler_mouseup );

      if ( event.shiftKey ) {

        var start_index = this.$rows.index ( this.$prev_row ),
          end_index = this.$prev_row ? this.$rows.index ( this.$start_row ) : 0,
          min_index = Math.min ( start_index, end_index ),
          max_index = Math.max ( start_index, end_index );

        if ( min_index === start_index ) { // down

          min_index += 1;
          max_index += 1;

        }

        var $new_shifted = this.$rows.slice ( min_index, max_index );

        if ( this.$prev_shifted ) {

          $new_shifted.not ( this.$prev_shifted ).toggleClass ( this.options.selected_class );

          this.$prev_shifted.not ( $new_shifted ).toggleClass ( this.options.selected_class );

        } else {

          $new_shifted.toggleClass ( this.options.selected_class );

        }

        this.$prev_shifted = $new_shifted;

      } else if ( ( $.browser.is.mac && event.metaKey ) || ( !$.browser.is.mac && event.ctrlKey ) || $.browser.is.touchDevice ) { //TODO: On mobile we behave like if the `ctrl` key is always pressed, so that we can support selecting multiple rows even there //FIXME: Is this the wanted behavious?

        this.$start_row.toggleClass ( this.options.selected_class );

        this._reset_prevs ();

        this.$prev_row = this.$start_row;

      } else {

        this.$rows.not ( this.$start_row ).removeClass ( this.options.selected_class );

        this.$start_row.toggleClass ( this.options.selected_class );

        this._reset_prevs ();

        this.$prev_row = this.$start_row;

      }

      this._trigger ( 'select' );

    },

    /* OTHER EVENTS */

    _handler_change: function () {

      this.$rows = this._get_rows ();

    },

    _handler_clear_selection: function () {

      $.reflow ();

      clear_selection ();

    },

    /* PRIVATE */

    _reset_prevs: function () {

      this.$prev_row = false;
      this.$prev_shifted = false;
      this.$prev_dragged = false;

    },

    _get_rows: function () {

      return this.$element.find ( this.options.selector );

    }

  });

  /* READY */

  $(function () {

    $('table.selectable').selectable ();

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Slider v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * @requires ../draggable/draggable.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* SLIDER */

  $.factory ( 'svelto.slider', {

    /* OPTIONS */

    options: {
      min: 0,
      max: 100,
      value: 0,
      step: 1,
      decimals: 0,
      callbacks: {
        increased: _.noop,
        decreased: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$slider = this.$element;
      this.$min = this.$slider.find ( '.slider-min' );
      this.$max = this.$slider.find ( '.slider-max' );
      this.$input = this.$slider.find ( 'input' );
      this.$bar_wrp = this.$slider.find ( '.slider-bar-wrp' );
      this.$unhighlighted = this.$slider.find ( '.slider-unhighlighted' );
      this.$highlighted = this.$slider.find ( '.slider-highlighted' );
      this.$handler_wrp = this.$slider.find ( '.slider-handler-wrp' );
      this.$label = this.$handler_wrp.find ( '.slider-label' );

      this.steps_nr = ( ( this.options.max - this.options.min ) / this.options.step );

      this._update_variables ();

    },

    _events: function () {

      /* INPUT CHANGE */

      this._on ( true, this.$input, 'change', this._handler_change );

      /* WINDOW RESIZE */

      this._on ( $window, 'resize', this._handler_resize );

      /* ARROWS */

      this._on ( this.$slider, 'mouseenter', this._handler_arrows_in );
      this._on ( this.$slider, 'mouseleave', this._handler_arrows_out );

      /* MIN / MAX BUTTONS */

      this._on ( this.$min, 'click', this.decrease );
      this._on ( this.$max, 'click', this.increase );

      /* DRAG */

      this.$handler_wrp.draggable ({
        draggable: this._draggable.bind ( this ),
        axis: 'x',
        constrainer: {
          $element: this.$bar_wrp,
          constrain_center: true,
          axis: 'x'
        },
        modifiers: {
          x: this.modifier_x.bind ( this )
        },
        callbacks: {
          beforestart: this._handler_drag_beforestart.bind ( this ),
          move: this._handler_drag_move.bind ( this ),
          end: this._handler_drag_end.bind ( this )
        }
      });

      /* CLICK */

      this._on ( this.$unhighlighted, 'click', this._handler_click );

    },

    /* PRIVATE */

    _round_value: function ( value ) {

      return Number(Number(value).toFixed ( this.options.decimals ));

    },

    _update_positions: function () {

      var percentage = ( ( this.options.value - this.options.min ) / this.options.step ) * 100 / this.steps_nr;

      this.$handler_wrp.css ({
        left: percentage + '%',
        transform: 'none'
      });

      this.$highlighted.css ({
        right: ( 100 - percentage ) + '%',
        transform: 'none'
      });

    },

    _update_label: function ( value ) {

      this.$label.html ( _.isUndefined ( value ) ? this.options.value : value );

    },

    _update_variables: function () {

      this.unhighlighted_width = this.$unhighlighted.width ();
      this.unhighlighted_offset = this.$unhighlighted.offset ();
      this.step_width = this.unhighlighted_width / this.steps_nr;

    },

    /* CHANGE */

    _handler_change: function () {

      this.set ( this.$input.val () );

    },

    /* RESIZE */

    _handler_resize: function () {

      this._update_variables ();

    },

    /* LEFT / RIGHT ARROWS */

    _handler_arrows_in: function () {

      this._on ( $document, 'keydown', this._handler_arrows_keydown );

    },

    _handler_arrows_out: function () {

      this._off ( $document, 'keydown', this._handler_arrows_keydown );

    },

    _handler_arrows_keydown: function ( event ) {

      if ( event.keyCode === $.ui.keyCode.LEFT || event.keyCode === $.ui.keyCode.DOWN ) {

        this.decrease ();

      } else if ( event.keyCode === $.ui.keyCode.RIGHT || event.keyCode === $.ui.keyCode.UP ) {

        this.increase ();

      }

    },

    /* DRAG */

    _draggable: function () {

      return !this.options.disabled;

    },

    modifier_x: function ( distance ) { //TODO: maybe we should export this function as a lodash mixin

      var left = distance % this.step_width;

      if ( left >= this.step_width / 2 ) {

        return distance - left + this.step_width;

      } else {

        return distance - left;

      }

    },

    _handler_drag_beforestart: function () {

      var translateX = parseFloat ( this.$handler_wrp.css ( 'left' ), 10 );

      this.$handler_wrp.css ({
        left: 0,
        transform: 'translate3d(' + translateX + 'px,0,0)'
      });

      this.$highlighted.css ({
        right: '100%',
        transform: 'translate3d(' + translateX + 'px,0,0)'
      });

    },

    _handler_drag_move: function ( data ) {

      this.$highlighted.css ( 'transform', 'translate3d(' + data.modifiedXY.X + 'px,0,0)' );

      this._update_label ( this._round_value ( this.options.min + ( data.modifiedXY.X / this.step_width * this.options.step ) ) );

    },

    _handler_drag_end: function ( data ) {

      var transform_str = this.$handler_wrp.css ( 'transform' ),
        matrix =  ( transform_str !== 'none' ) ? transform_str.match ( /[0-9., -]+/ )[0].split ( ', ' ) : [0, 0, 0, 0, 0, 0];

      var setted = this.set ( this.options.min + ( parseFloat ( matrix[4], 10 ) / this.step_width * this.options.step ) );

      if ( !setted ) {

        this._update_positions ();

      }

    },

    /* CLICK */

    _handler_click: function ( event ) {

      if ( event.target === this.$handler_wrp.get ( 0 ) ) return; //INFO: shouldn't work if we click on the handler //INFO: Maybe we are dragging, shouldn't be handled as a click on the unhighlited bar

      var click_pos = $.eventXY ( event ),
        distance = this.modifier_x ( click_pos.X - this.unhighlighted_offset.left );

      this.set ( this.options.min + ( distance / this.step_width * this.options.step ) );

    },

    /* PUBLIC */

    get: function () {

      return this.options.value;

    },

    set: function ( value ) {

      value = _.clamp ( this.options.min, this._round_value ( value ), this.options.max );

      if ( value !== this.options.value ) {

        var callback = ( value > this.options.value ) ? 'increased' : 'decreased';

        this.options.value = value;

        this._update_positions ();
        this._update_label ();

        this.$input.val ( value ).trigger ( 'change' );

        this._trigger ( callback );

        return true;

      } else {

        return false;

      }

    },

    increase: function () {

      return this.set ( this.options.value + this.options.step );

    },

    decrease: function () {

      return this.set ( this.options.value - this.options.step );

    }

  });

  /* READY */

  $(function () {

    $('.slider').each ( function () {

      var $slider = $(this),
        options = {
          min: Number($slider.find ( '.slider-min' ).data ( 'min' ) || 0),
          max: Number($slider.find ( '.slider-max' ).data ( 'max' ) || 100),
          value: Number($slider.find ( 'input' ).val () || 0),
          step: Number($slider.data ( 'step' ) || 1),
          decimals: Number($slider.data ( 'decimals' ) || 0)
        };

      $slider.slider ( options );

    });

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Sortable v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: add support for tableHelper, just put the new addded row in the right position, good performance gain here!
//TODO: cache the column datas, if possible
//TODO: add support for sorting other things other than tables
//TODO: if possible sort using flexbox's `order` property

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* SORTABLE */

  $.factory ( 'svelto.sortable', {

    /* OPTIONS */

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
      callbacks: {
        sort: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$table = this.$element;
      this.$headers = this.$table.find ( 'thead th' );
      this.$sortables = this.$headers.filter ( '[data-sort]' );
      this.$tbody = this.$table.find ( 'tbody' );

      this.table = this.element;
      this.tbody = this.$tbody.get ( 0 );

      this.sort_datas = {}; //INFO: Caching object for datas and references to rows

      this.current_index = false; //INFO: `$headers` index, not `$sortables` index
      this.current_direction = false;;

    },

    _init: function () {

      var $initial = this.$headers.filter ( '.asc, .desc' ).first ();

      if ( $initial.length ) {

        this.sort ( this.$headers.index ( $initial ), ( $initial.hasClass ( 'asc' ) ? 'asc' : 'desc' ) );

      }

    },

    _events: function () {

      this._on ( true, 'change', this._handler_change ); //TODO: update to support tableHelper

      this._on ( this.$sortables, 'click', this._handler_click );

    },

    /* CHANGE */

    _handler_change: function () {

      if ( this.current_index ) {

        this.sort_datas = {};

        this.sort ( this.current_index, this.current_direction );

      }

    },

    /* CLICK */

    _handler_click: function ( event ) {

      var new_index = this.$headers.index ( event.target ),
        new_direction = this.current_index === new_index
                  ? this.current_direction === 'asc'
                    ? 'desc'
                    : 'asc'
                  : 'asc';

      this.sort ( new_index, new_direction );

    },

    /* SORT */

    sort: function ( index, direction ) {

      // VALIDATE

      var $sortable = this.$headers.eq ( index );

      if ( !$sortable.length ) return; // bad index

      var sorter_name = $sortable.data ( 'sort' );

      if ( !sorter_name ) return; // unsortable column

      var sorter = this.options.sorters[sorter_name];

      if ( !sorter ) return; // unsupported sorter

      direction = ( direction && direction.toLowerCase () === 'desc' ) ? 'desc' : 'asc';

      // STYLE

      if ( this.current_index !== false ) {

        this.$sortables.eq ( this.current_index ).removeClass ( this.current_direction );

      }

      $sortable.addClass ( direction );

      // CHECKING CACHED DATAS

      if ( _.isUndefined ( this.sort_datas[index] ) ) {

        // VARIABLES

        var $trs = this.$tbody.find ( 'tr:not(.empty)' );

        this.sort_datas[index] = Array ( $trs.length );

        // POPULATE

        for ( var i = 0, l = $trs.length; i < l; i++ ) {

          var $td = $trs.eq ( i ) .find ( 'td' ).eq ( index ),
            value = $td.data ( 'sort-value' ) || $td.text ();

          this.sort_datas[index][i] = [$trs.get ( i ), value];

        }

      }

      // SORT

      this.sort_datas[index].sort ( function ( a, b ) {

        return sorter ( a[1], b[1] );

      });

      if ( direction === 'desc' ) this.sort_datas[index].reverse ();

      // APPEND

      this.table.removeChild ( this.tbody ); // detach

      for ( var i = 0, l = this.sort_datas[index].length; i < l; i++ ) {

        this.tbody.appendChild ( this.sort_datas[index][i][0] ); // reorder

      }

      this.table.appendChild ( this.tbody ); // attach

      // UPDATE

      this.current_index = index;
      this.current_direction = direction;

      // TRIGGER

      this._trigger ( 'sort', {
        index: this.current_index,
        direction: this.current_direction
      });

    }

  });

  /* READY */

  $(function () {

    $('table.sortable').sortable ();

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Stepper v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* STEPPER */

  $.factory ( 'svelto.stepper', {

    /* OPTIONS */

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
    },

    /* SPECIAL */

    _variables: function () {

      this.$stepper = this.$element;
      this.$decreaser = this.$stepper.find ( this.options.selectors.decreaser );
      this.$input = this.$stepper.find ( this.options.selectors.input );
      this.$increaser = this.$stepper.find ( this.options.selectors.increaser );

      this.options.value = this._sanitizeValue ( this.options.value );

    },

    _init: function () {

      this._updateButtons ();

    },

    _events: function () {

      /* INPUT / CHANGE */

      this._on ( true, this.$input, 'input change', this.__inputChange );

      /* ARROWS */

      this._on ( 'mouseenter', this.__arrowsIn );
      this._on ( 'mouseleave', this.__arrowsOut );

      /* INCREASE */

      this._on ( this.$decreaser, $.Pointer.tap, this.decrease );

      /* DECREASE */

      this._on ( this.$increaser, $.Pointer.tap, this.increase );

    },

    /* PRIVATE */

    _sanitizeValue: function ( value ) {

      var nr = Number ( value );

      value = ( _.isNaN ( nr ) ? 0 : nr );

      var remaining = ( value % this.options.step );

      value = value - remaining + ( remaining >= this.options.step / 2 ? this.options.step : 0 );

      return _.clamp ( this.options.min, value, this.options.max );

    },

    /* UPDATE */

    _updateInput: function () {

      this.$input.val ( this.options.value ).trigger ( 'change' );

    },

    _updateButtons: function ( previous ) {

      var isMin = ( this.options.value === this.options.min ),
          isMax = ( this.options.value === this.options.max );

      if ( previous === this.options.min || isMin ) {

        this.$decreaser.toggleClass ( 'disabled', isMin );

      } else if ( previous === this.options.max || isMax ) {

        this.$increaser.toggleClass ( 'disabled', isMax );

      }

    },

    _update: function ( previous ) {

      this._updateInput ();
      this._updateButtons ( previous );

    },

    /* CHANGE */

    __inputChange: function () {

      this.set ( this.$input.val () );

    },

    /* LEFT / RIGHT ARROWS */

    __arrowsIn: function ( event ) {

      this._on ( $document, 'keydown', this.__keydown );

    },

    __arrowsOut: function ( event ) {

      this._off ( $document, 'keydown', this.__keydown );

    },

    __keydown: function ( event ) {

      switch ( event.keyCode ) {

        case $.ui.keyCode.UP:
          this.increase ();
          break;

        case $.ui.keyCode.DOWN:
          this.decrease ();
          break;

      }

    },

    /* PUBLIC */

    get: function () {

      return this.options.value;

    },

    set: function ( value ) {

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

    },

    increase: function () {

      this.set ( this.options.value + this.options.step );

    },

    decrease: function () {

      this.set ( this.options.value - this.options.step );

    }

  });

  /* READY */

  $(function () {

    $('.stepper').each ( function () {

      var $stepper = $(this);

      $stepper.stepper ({
        min: Number($stepper.data ( 'min' ) || 0),
        max: Number($stepper.data ( 'max' ) || 100),
        value: Number($stepper.find ( '.stepper-input' ).val () || 0),
        step: Number($stepper.data ( 'step' ) || 1)
      });

    });

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Switch v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * @requires ../draggable/draggable.js
 * ========================================================================= */

;(function ( $, window, document, undefined ) {

  'use strict';

  /* SWITCH */

  $.factory ( 'svelto.switch', {

    /* OPTIONS */

    options: {
      colors: {
        on: 'secondary',
        off: 'gray'
      },
      callbacks: {
        checked: _.noop,
        unchecked: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$switch = this.$element;
      this.$input = this.$switch.find ( 'input' );
      this.$bar_wrp = this.$switch.find ( '.switch-bar-wrp' );
      this.$bar = this.$switch.find ( '.switch-bar' );
      this.$handler = this.$switch.find ( '.switch-handler' );
      this.$icon = this.$handler.find ( '.icon' );

      this.checked = this.$input.prop ( 'checked' );
      this.dragging = false;

    },

    _init: function () {

      this._set_check ( this.checked, true );

    },

    _events: function () {

      /* CHANGE */

      this._on ( true, this.$input, 'change', this._handler_change );

      /* KEYS */

      this._on ( 'mouseenter', this._handler_keys_in );
      this._on ( 'mouseleave', this._handler_keys_out );

      /* CLICK */

      this._on ( this.$bar, 'click', this._handler_click );

      /* DRAG */

      this.$handler.draggable ({
        axis: 'x',
        constrainer: {
          $element: this.$bar_wrp
        },
        callbacks: {
          end: this._handler_drag_end.bind ( this )
        }
      });

    },

    /* CHANGE */

    _handler_change: function () {

      var new_checked = this.$input.prop ( 'checked' );

      if ( this.checked !== new_checked ) {

        this.checked = new_checked;

        this._set_check ( this.checked, true );

      }

    },

    /* KEYS */

    _handler_keys_in: function () {

      this._on ( $document, 'keydown', this._handler_keys_keydown );

    },

    _handler_keys_out: function () {

      this._off ( $document, 'keydown', this._handler_keys_keydown );

    },

    _handler_keys_keydown: function ( event ) {

      if ( event.keyCode === $.ui.keyCode.LEFT ) {

        this.uncheck ();

      } else if ( event.keyCode === $.ui.keyCode.RIGHT ) {

        this.check ();

      } else if ( event.keyCode === $.ui.keyCode.SPACE ) {

        this.toggle ();

      }

    },

    /* CLICK */

    _handler_click: function () {

      if ( this.dragging ) {

        this.dragging = false;
        return;

      }

      this.toggle ();

    },

    /* DRAG */

    _handler_drag_end: function ( data ) {

      if ( data.dragged ) {

        this.dragging = true;

        var checked = ( this.$handler.offset ().left - this.$bar_wrp.offset ().left + ( this.$handler.width () / 2 ) ) >= ( this.$bar_wrp.width () / 2 );

        this.checked = ( checked ) ? true : false;

        this._set_check ( this.checked, true );

      }

    },

    _set_check: function ( checked, force ) {

      if ( checked !== this.$input.prop ( 'checked' ) || force ) {

        this.$switch.toggleClass ( 'checked', checked );

        this.$handler.css ( 'transform', 'translate3d(' + ( checked ? '1.73333em' : '0' ) + ',0,0)' );

        this.$bar.toggleClass ( this.options.colors.on, checked );
        this.$handler.toggleClass ( this.options.colors.on, checked );

        this.$bar.toggleClass ( this.options.colors.off, !checked );
        this.$handler.toggleClass ( this.options.colors.off, !checked );

        this.$input.prop ( 'checked', checked ).trigger ( 'change' );

        this._trigger ( checked ? 'checked' : 'unchecked' );

      }

    },

    /* PUBLIC */

    check: function () {

      this._set_check ( true );

    },

    uncheck: function () {

      this._set_check ( false );

    },

    toggle: function () {

      this.checked = !this.checked;
      this._set_check ( this.checked );

    }

  });

  /* READY */

  $(function () {

    $('.switch').each ( function () {

      var $switch = $(this),
        options = {
          colors: {
            on: $switch.data ( 'color-on' ) || 'secondary',
            off: $switch.data ( 'color-off' ) || 'gray'
          }
        };

      $switch.switch ( options );

    });

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Table Helper v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* TABLE HELPER */

  $.factory ( 'svelto.tableHelper', {

    /* OPTIONS */

    options: {
      callbacks: {
        add: _.noop,
        update: _.noop,
        remove: _.noop,
        clear: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$table = this.$element;
      this.$thead = this.$table.find ( 'thead' ),
      this.$tfoot = this.$table.find ( 'tfoot' ),
      this.$tbody = this.$table.find ( 'tbody' ),
      this.$headers = this.$thead.find ( 'th' ),
      this.$empty_row = this.$tbody.find ( 'tr.table-row-empty' ),
      this.columns_nr = this.$headers.length;

    },

    _init: function () {

      this._check_empty ();

    },

    /* PRIVATE */

    _check_empty: function () {

      this.$empty_row.toggleClass ( 'hidden', this.$tbody.find ( 'tr:not(.table-row-empty)' ).length > 0 );

    },

    _get_row_id: function ( id ) {

      return 'rid_' + this.uuid + '_' + id;

    },

    /* PUBLIC */

    add: function ( id ) { //INFO: id, datas...

      var datas = _.tail ( arguments );

      if ( datas.length ) {

        var $fillables = this.$tbody.find ( 'td.fillable' );

        if ( $fillables.length ) {

          var datas_fillable = _.slice ( datas, 0, $fillables.length );

          datas = _.slice ( datas, datas_fillable.length - 1, datas.length );

          for ( var i = 0, l = datas_fillable.length; i < l; i++ ) {

            $fillables.eq ( i ).html ( datas_fillable[i] ).removeClass ( 'fillable' );

          }

        }

        if ( id && $( '.' + this._get_row_id ( id ) ).length ) {

          $.noty ( 'A table cannot contain 2 rows with the same ID' );
          return this;

        };

        var chunks = _.chunk ( datas, this.columns_nr );

        for ( var ci = 0, cl = chunks.length; ci < cl; ci++ ) {

          var chunk = chunks[ci];

          var row_html = '<tr ' + ( id ? 'class="' + this._get_row_id ( id ) + '"' : '' ) + '>';

          for ( var i = 0, l = chunk.length; i < l; i++ ) {

            row_html += '<td>' + ( chunk[i] || '' ) + '</td>';

          }

          for ( var i = chunk.length, l = this.columns_nr; i < l; i++ ) {

            row_html += '<td class="fillable"></td>';

          }

          row_html += '</tr>';

          this.$tbody.append ( row_html );

        }

        this._check_empty ();

        this.$table.trigger ( 'change' );

        this._trigger ( 'add' );

      }

      return this;

    },

    update: function ( id ) { //INFO: id, datas...

      var datas = _.tail ( arguments ),
        $row = $( '.' + this._get_row_id ( id ) );

      if ( datas.length && $row.length ) {

        var $tds = $row.find ( 'td' );

        _.each ( datas, function ( data, index ) {

          if ( _.isString ( data ) ) {

            $tds.eq ( index ).html ( data );

          }

        });

        this.$table.trigger ( 'change' );

        this._trigger ( 'update' );

      }

      return this;

    },

    remove: function ( id ) {

      var $row = $( '.' + this._get_row_id ( id ) );

      if ( $row.length ) {

        $row.remove ();

        this._check_empty ();

        this.$table.trigger ( 'change' );

        this._trigger ( 'remove' );

      }

      return this;

    },

    clear: function () {

      var $rows = this.$tbody.find ( 'tr:not(.table-row-empty)' );

      if ( $rows.length ) {

        $rows.remove ();

        this._check_empty ();

        this.$table.trigger ( 'change' );

        this._trigger ( 'clear' );

      }

      return this;

    }

  });

  /* READY */

  $(function () {

    $('table').tableHelper ();

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Tabs v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Maybe switch from the indicator to .button.highlight
//FIXME: positionate_indicator is too hacky

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* TABS */

  $.factory ( 'svelto.tabs', {

    /* OPTIONS */

    options: {
      selectors: {
        buttons_wrp: '.tabs-buttons',
        buttons: '.button-wrp > .label',
        button_active_class: 'active',
        indicator: '.tabs-buttons-indicator',
        containers_wrp: '.tabs-containers',
        containers: '> .container',
        container_active_class: 'active'
      },
      indicator_delay: 40,
      callbacks: {
        select: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$tabs = this.$element;

      this.isVertical = this.$tabs.hasClass ( 'vertical' );

      this.$tabs_buttons = this.$tabs.find ( this.options.selectors.buttons_wrp );
      this.$buttons = this.$tabs_buttons.find ( this.options.selectors.buttons );
      this.$indicator = this.$tabs.find ( this.options.selectors.indicator );

      this.$tabs_containers = this.$tabs.find ( this.options.selectors.containers_wrp );
      this.$containers = this.$tabs_containers.find ( this.options.selectors.containers );

      var $current_button = this.$buttons.filter ( '.' + this.options.selectors.button_active_class ).first ();

      $current_button = ( $current_button.length > 0 ) ? $current_button : this.$buttons.first ();

      this.prev_index = 0;
      this.current_index = this.$buttons.index ( $current_button );

    },

    _init: function () {

      this.select ( this.current_index, true );

    },

    _events: function () {

      this._on ( this.$tabs_buttons, 'click', this.options.selectors.buttons, this._hander_button_click );

      this._on ( $window, 'resize', this._positionate_indicator ); //TODO: throttle or devounce it

    },

    /* PRIVATE */

    _hander_button_click: function ( event, node ) {

      var new_index = this.$buttons.index ( $(node) );

      this.select ( new_index );

    },

    _positionate_indicator: function () {

      var $active = this.$buttons.filter ( '.' + this.options.selectors.button_active_class ),
        position = $active.position ();

      if ( this.isVertical ) {

        var total_height = this.$tabs_buttons.height ();

        this._delay ( function () {

          var top = position.top + ( this.$buttons.index ( $active ) === 0 ? 1 : 0 ); //FIXME: it's hacky

          this.$indicator.css ( 'top', ( top * 100 / total_height ) + '%' );

        }, this.current_index > this.prev_index ? this.options.indicator_delay : 0 );

        this._delay ( function () {

          var bottom = total_height - position.top - $active.height () + ( this.$buttons.index ( $active ) === this.$buttons.length - 1 ? 1 : 0 ); //FIXME: it's hacky

          this.$indicator.css ( 'bottom', ( bottom * 100 / total_height ) + '%' );

        }, this.current_index > this.prev_index ? 0 : this.options.indicator_delay );

      } else {

        var total_width = this.$tabs_buttons.width ();

        this._delay ( function () {

          var left = position.left + ( this.$buttons.index ( $active ) === 0 ? 1 : 0 ); //FIXME: it's hacky

          this.$indicator.css ( 'left', ( left * 100 / total_width ) + '%' );

        }, this.current_index > this.prev_index ? this.options.indicator_delay : 0 );

        this._delay ( function () {

          var right = total_width - position.left - $active.width () + ( this.$buttons.index ( $active ) === this.$buttons.length - 1 ? 1 : 0 ); //FIXME: it's hacky

          this.$indicator.css ( 'right', ( right * 100 / total_width ) + '%' );

        }, this.current_index > this.prev_index ? 0 : this.options.indicator_delay );

      }

    },

    /* PUBLIC */

    select: function ( index, force ) {

      if ( this.current_index !== index || force ) {

        this.$buttons.eq ( this.current_index ).removeClass ( this.options.selectors.button_active_class );
        this.$buttons.eq ( index ).addClass ( this.options.selectors.button_active_class );

        this.$containers.eq ( this.current_index ).removeClass ( this.options.selectors.container_active_class );
        this.$containers.eq ( index ).addClass ( this.options.selectors.container_active_class );

        if ( this.current_index !== index ) {

          this.prev_index = this.current_index;
          this.current_index = index;

        }

        this._positionate_indicator ();

      }

    }

  });

  /* READY */

  $(function () {

    $('.tabs').tabs ();

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Tagbox v0.3.0
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

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* TAGBOX */

  $.factory ( 'svelto.tagbox', {

    /* TEMPLATES */

    templates: {
      tag: '<div class="label-tag tagbox-tag" data-tag-value="{%=o.value%}">' +
              '<div class="label {%=o.color%} {%=o.size%} {%=o.css%}">' +
                '<span>' +
                  '{%=o.value%}' +
                '</span>' +
                '<div class="sub right gray actionable tagbox-tag-remover">' +
                  '<i class="icon">close</i>' +
                '</div>' +
              '</div>' +
            '</div>'
    },

    /* OPTIONS */

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
        inserters: [$.ui.keyCode.ENTER, $.ui.keyCode.TAB] //INFO: They are keyCodes
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
        change: _.noop,
        add: _.noop,
        remove: _.noop,
        empty: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$tagbox = this.$element;
      this.$tags = this.$tagbox.find ( this.options.selectors.tags );
      this.$input = this.$tagbox.find ( this.options.selectors.input );
      this.$partial = this.$tagbox.find ( this.options.selectors.partial );

    },

    _init: function ( suppressTriggers ) {

      this.add ( this.options.init, suppressTriggers );

    },

    _events: function () {

      /* PARTIAL */

      this._on ( this.$partial, 'keypress keydown', this.__keypressKeydown ); //INFO: `keypress` is for printable characters, `keydown` for the others

      this._on ( this.$partial, 'paste', this.__paste );

      /* CLICK ON EMPTY */

      this._on ( $.Pointer.tap, this.__clickOnEmpty );

      /* CLICK ON TAG REMOVER */

      this._on ( $.Pointer.tap, this.options.selectors.tagRemover, this.__clickOnTagRemover );

    },

    /* PRIVATE */

    _sanitizeTag: function ( value ) {

      value = _.trim ( value );

      if ( this.options.escape ) {

        value = _.escape ( value );

      }

      if ( this.options.deburr ) {

        value = _.deburr ( value );

      }

      return value;

    },

    _getTagHtml: function ( value ) {

      return this._tmpl ( 'tag', _.merge ( { value: value }, this.options.tag ) );

    },

    _clearPartial: function () {

      this.$partial.val ( '' ).trigger ( 'change' );

    },

    /* UPDATE */

    _updateInput: function () {

      this.$input.val ( this.options.tags.join ( this.options.characters.separator ) ).trigger ( 'change' );

    },

    /* TAG */

    _add: function ( value ) {

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

    },

    _remove: function ( $tag, tag ) {

      $tag.remove ();

      _.pull ( this.options.tags, tag );

    },

    /* KEYPRESS / KEYDOWN */

    __keypressKeydown: function ( event ) {

      var value = this.$partial.val ();

      if ( _.contains ( this.options.characters.inserters, event.keyCode ) || event.keyCode === this.options.characters.separator.charCodeAt ( 0 ) ) {

        var added = this.add ( value );

        if ( added ) {

          this._clearPartial ();

        }

        event.preventDefault ();

      } else if ( event.keyCode === $.ui.keyCode.BACKSPACE ) {

        if ( value.length === 0 && this.options.tags.length > 0 ) {

          var $tag = this.$tagbox.find ( this.options.selectors.tag ).last (),
              edit = !$.hasCtrlOrCmd ( event );

          this.remove ( $tag, edit );

          event.preventDefault ();

        }

      } else if ( _.contains ( this.options.characters.forbidden, String.fromCharCode ( event.keyCode ) ) ) {

        $.noty ( 'The character you entered is forbidden' );

        event.preventDefault ();

      }

    },

    /* PASTE */

    __paste: function ( event ) {

        this.add ( event.originalEvent.clipboardData.getData ( 'text' ) );

        event.preventDefault ();

    },

    /* CLICK ON CLOSE */

    __clickOnTagRemover: function ( event, tagRemover ) {

      var $tag = $(tagRemover).parents ( this.options.selectors.tag );

      this.remove ( $tag );

    },

    /* CLICK ON EMPTY */

    __clickOnEmpty: function ( event ) {

      if ( document.activeElement !== this.$partial[0] && !$(event.target).is ( 'input, ' + this.options.selectors.tagLabel ) ) {

        this.$partial.focus ();

      }

    },

    /* PUBLIC */

    get: function () {

      return _.clone ( this.options.tags );

    },

    add: function ( tag, suppressTriggers ) { //INFO: The tag can be a string containing a single tag, multiple tags separated by `this.options.characters.separator`, or it can be an array (nested or not) of those strings

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

    },

    remove: function ( tag, edit, suppressTriggers ) { //INFO: The tag can be a string containing a single tag, multiple tags separated by `this.options.characters.separator`, or it can be an array (nested or not) of those strings. In addition it can also be the jQuery object of that tag.

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

    },

    clear: function ( suppressTriggers ) {

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

    },

    reset: function () {

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

  });

  /* READY */

  $(function () {

    $('.tagbox').each ( function () {

      var $tagbox = $(this);

      $tagbox.tagbox ({ init: $tagbox.find ( 'input' ).val () });

    });

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Time Ago v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* TIME AGO */

  $.factory ( 'svelto.timeAgo', {

    /* OPTIONS */

    options: {
      timestamp: false,
      title: false,
      callbacks: {
        update: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$timeAgo_wrp = this.$element;

      this.options.timestamp = this.$timeAgo_wrp.data ( this.options.title ? 'timestamp-title' : 'timestamp' );

    },

    _init: function () {

      this._update_loop ( 0 );

    },

    /* PRIVATE */

    _update_loop: function ( wait ) {

      this._delay ( function () {

        this._update_loop ( this.update ().next );

      }, wait * 1000 );

    },

    /* PUBLIC */

    update: function () {

      var timeAgo = _.timeAgo ( this.options.timestamp );

      if ( this.options.title ) {

        this.$timeAgo_wrp.attr ( 'title', timeAgo.str );

      } else {

        this.$timeAgo_wrp.html ( timeAgo.str );

      }

      this._trigger ( 'update' );

      return timeAgo;

    }

  });

  /* READY */

  $(function () {

    $('[data-timestamp]').timeAgo ();
    $('[data-timestamp-title]').timeAgo ({ title: true });

  });

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Timer v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

//SOURCE: http://jchavannes.com/jquery-timer

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* TIMER */

  $.timer = function ( func, time, autostart ) {

    return new Timer ( func, time, autostart );

  };

  /* TIMER OBJ */

  var Timer = function ( func, time, autostart ) {

    return this.set ( func, time, autostart );

  };

  Timer.prototype = {

    set: function ( func, time, autostart ) {

      this.init = true;
      this.action = func;

      if ( !isNaN ( time ) ) this.intervalTime = time;

      if ( autostart && !this.isActive ) {

        this.isActive = true;
        this.setTimer ();

      }

      return this;

    },

    once: function ( time ) {

      var timer = this;

      if ( isNaN ( time ) ) time = 0;

      setTimeout ( function () {

        timer.action ();

      }, time );

      return this;

    },

    play: function ( reset ) {

      if ( !this.isActive ) {

        if ( reset ) this.setTimer ();
        else this.setTimer ( this.remaining_time );

        this.isActive = true;

      }

      return this;

    },

    pause: function () {

      if ( this.isActive ) {

        this.isActive = false;
        this.remaining_time -= new Date() - this.last;
        this.clearTimer ();

      }

      return this;

    },

    stop: function () {

      this.isActive = false;
      this.remaining_time = this.intervalTime;
      this.clearTimer ();

      return this;

    },

    toggle: function ( reset ) {

      if ( this.isActive ) this.pause ();
      else if ( reset ) this.play ( true );
      else this.play ();

      return this;

    },

    reset: function () {

      this.isActive = false;
      this.play ( true );

      return this;

    },

    clearTimer: function () {

      clearTimeout ( this.timeoutObject );

    },

    setTimer: function ( time ) {

      var timer = this;

      if ( isNaN ( time ) ) time = this.intervalTime;

      this.remaining_time = time;
      this.last = new Date ();
      this.clearTimer ();

      this.timeoutObject = setTimeout ( function () {

        timer.go ()

      }, time );

    },

    go: function () {

      if ( this.isActive ) {

        this.action ();
        this.setTimer ();

      }

    },

    remaining: function ( value ) {

      if ( _.isUndefined ( value ) ) return this.remaining_time;

      this.remaining_time = value;

      return this;

    }

  };

}( jQuery, _, window, document ));


/* =========================================================================
 * Svelto - Touching v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../bteach/btEach.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* UTILITIES */

  var get_coordinates = function ( $ele ) {

    var offset = $ele.offset ();

    return {
      X1: offset.left,
      X2: offset.left + $ele.width (),
      Y1: offset.top,
      Y2: offset.top + $ele.height ()
    };

  };

  var get_overlapping_area = function ( c1, c2 ) {

    var x_overlap = Math.max ( 0, Math.min ( c1.X2, c2.X2 ) - Math.max ( c1.X1, c2.X1 ) ),
      y_overlap = Math.max ( 0, Math.min ( c1.Y2, c2.Y2 ) - Math.max ( c1.Y1, c2.Y1 ) );

    return x_overlap * y_overlap;

  };

  /* TOUCHING */

  $.fn.touching = function ( custom_options ) {

    /* OPTIONS */

    var options = _.merge ({
      startIndex : false, //INFO: Useful for speeding up the searching process if we may already guess the initial position...
      point: false, //INFO: Used for the punctual search
      binarySearch: true, //INFO: toggle the binary search when performing a punctual search
      //  {
      //    X: 0,
      //    Y: 0
      //  },
      $comparer: false, //INFO: Used for the overlapping search
      $not: false,
      select: 'all'
    }, custom_options );

    /* SEARCHABLE */

    var $searchable = options.$not ? this.not ( options.$not ) : this;

    /* COMPARER */

    if ( options.$comparer ) {

      var c1 = get_coordinates ( options.$comparer ),
        nodes = [],
        areas = [];

      var result = false;

      $searchable.each ( function () {

        var c2 = get_coordinates ( $(this) ),
          area = get_overlapping_area ( c1, c2 );

        if ( area > 0 ) {

          nodes.push ( this );
          areas.push ( area );

        }

      });

      switch ( options.select ) {

        case 'all':
          return $(nodes);

        case 'most':
          return $(nodes[ areas.indexOf ( _.max ( areas ) )]);

        default:
          return $empty;

      }

    }

    /* PUNCTUAL */

    if ( options.point ) {

      var $touched;

      if ( options.binarySearch ) {

        $searchable.btEach ( function () {

          var $node = $(this),
            c = get_coordinates ( $node );

          if ( options.point.Y >= c.Y1 ) {

            if ( options.point.Y <= c.Y2 ) {

              if ( options.point.X >= c.X1 ) {

                if ( options.point.X <= c.X2 ) {

                  $touched = $node;

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

        $searchable.each ( function () {

          var $node = $(this),
            c = get_coordinates ( $node );

          if ( options.point.Y >= c.Y1 && options.point.Y <= c.Y2 && options.point.X >= c.X1 && options.point.X <= c.X2 ) {

            $touched = $node;

            return false;

          }

        });

        return $touched || $empty;

      }

    }

  };

}( jQuery, _, window, document ));

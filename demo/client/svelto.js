
/* =========================================================================
 * Svelto - Core - jQuery (Init)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before ./vendor/jquery.js
 * ========================================================================= */

(function () {

  'use strict';

  /* JQUERY */

  window.__svelto_jquery = window.jQuery || window.$;

}());


/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Clean data)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

// Monkey patching the internal `$.cleanData` method so that we can properly destroy widgets instances when their relative elements are removed
//SOURCE: jQuery UI's Widget

(function ( $ ) {

  'use strict';

  /* CLEAN DATA */

  const _cleanData = $.cleanData;

  $.cleanData = function ( eles ) {

    for ( let i = 0, ele; ( ele = eles[i] ) !== undefined; i++ ) {

			let events = $._data ( ele, 'events' );

			if ( events && events.remove ) {

				$(ele).triggerHandler ( 'remove' );

			}

    }

    _cleanData ( eles );

	};

}( window.__svelto_jquery ));


/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Diff)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( $ ) {

  'use strict';

  /* VARIABLES */

  let NODE_INDEX    = '_diff_index',
      ELEMENT_TYPE  = window.Node.ELEMENT_NODE,
      DOCUMENT_TYPE = window.Node.DOCUMENT_NODE;

  /* DEFAULTS */

  let defaults = {
    attributes: {
      key: 'data-key',
      ignore: 'data-ignore',
      checksum: 'data-checksum'
    }
  };

  /* DIFF */

  $.diff = function ( prev, next, skipAttributes = false ) {

    if ( _.isString ( next ) ) next = $.parseHTML ( next )[0];

    if ( prev.nodeType === DOCUMENT_TYPE ) prev = prev.documentElement;

    $.diff.node ( prev, next, skipAttributes );

  };

  $.diff.node = function ( prev, next, skipAttributes = false ) {

    if ( prev.nodeType === next.nodeType ) {

      if ( prev.nodeType === ELEMENT_TYPE ) {

        if ( $.diff.utilities.getChecksum ( prev ) === $.diff.utilities.getChecksum ( next ) ) return;

        if ( $.diff.utilities.isIgnored ( prev ) && $.diff.utilities.isIgnored ( next ) ) return;

        let prevChildren = prev.childNodes,
            nextChildren = next.childNodes;

        if ( prevChildren.length !== 0 || nextChildren.length !== 0 ) {

          $.diff.children ( prev, prevChildren, nextChildren, skipAttributes );

        }

        if ( prev.nodeName === next.nodeName ) {

          if ( !skipAttributes ) {

            $.diff.attributes ( prev, prev.attributes, next.attributes );

          }

        } else {

          let replacement = next.cloneNode ();

          while ( prev.firstChild ) replacement.appendChild ( prev.firstChild );

          prev.parentNode.replaceChild ( replacement, prev );

        }

      } else {

        if ( prev.nodeValue !== next.nodeValue ) {

          prev.nodeValue = next.nodeValue;

        }

      }

    } else {

      prev.parentNode.replaceChild ( next, prev );

    }

  };

  $.diff.attributes = function ( parent, prev, next ) {

    /* NEW */

    for ( let i = next.length; i--; ) {

      let nextAttr = next[i],
          name = nextAttr.name,
          prevAttr = prev.getNamedItem ( name );

      if ( !prevAttr ) { // Create

        next.removeNamedItem ( name );
        prev.setNamedItem ( nextAttr );

      } else if ( prevAttr.value !== nextAttr.value ) { // Update

        prevAttr.value = nextAttr.value;

      }

    }

    /* OLD */

    if ( prev.length !== next.length ) {

      for ( let i = prev.length; i--; ) {

        let name = prev[i].name;

        if ( !next.getNamedItem ( name ) ) prev.removeNamedItem ( name );

      }

    }

  };

  $.diff.children = function ( parent, prevChildNodes, nextChildNodes, skipAttributes = false ) {

    let prev = $.diff.utilities.keyNodes ( prevChildNodes ),
        next = $.diff.utilities.keyNodes ( nextChildNodes );

    /* OLD */

    for ( let key in prev ) {

      if ( next[key] ) continue;

      parent.removeChild ( prev[key] );

    }

    /* NEW */

    for ( let key in next ) {

      let a = prev[key],
          b = next[key],
          newPosition = b[NODE_INDEX];

      if ( a ) { // Update

        $.diff.node ( a, b, skipAttributes );

        if ( a[NODE_INDEX] === newPosition ) continue;

        let nextEl = prevChildNodes[newPosition] || null; // TODO: figure out if || null is needed.

        if ( nextEl === a ) continue;

        parent.insertBefore ( a, nextEl );

      } else { // Insert

        let nextEl = prevChildNodes[newPosition] || null;

        parent.insertBefore ( b, nextEl );

      }

    }

  };

  $.diff.utilities = {
    keyNodes ( eles ) {
      let result = {};
      for ( let i = 0, l = eles.length; i < l; i++ ) {
        let ele = eles[i];
        ele[NODE_INDEX] = i;
        result[$.diff.utilities.getKey ( ele ) || i] = ele;
      }
      return result;
    },
    getKey ( ele ) {
      if ( ele.nodeType !== ELEMENT_TYPE ) return;
      return ele.getAttribute ( $.diff.defaults.attributes.key ) || ele.id || undefined;
    },
    getChecksum ( ele ) {
      return ele.getAttribute ( $.diff.defaults.attributes.checksum ) || NaN;
    },
    isIgnored ( ele ) {
      return ele.getAttribute ( $.diff.defaults.attributes.ignore ) !== null;
    }
  };

  /* BINDING */

  $.diff.defaults = defaults;

  /* PLUGIN */

  $.fn.diff = function ( next, skipAttributes = false ) {

    for ( let i = 0, l = this.length; i < l; i++ ) {

      $.diff ( this[i], next, skipAttributes );

    }

    return this;

  };

}( window.__svelto_jquery ));


/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Elements)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( $ ) {

  'use strict';

  /* ELEMENTS */

  $.$empty = $();

  $.$window = $(window);
  $.window = window;
  $.$document = $(document);
  $.document = document;
  $.$html = $(document.documentElement);
  $.html = document.documentElement;
  $.$head = $(document.head);
  $.head = document.head;
  $.$body = $(document.body);
  $.body = document.body;

}( window.__svelto_jquery ));


/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Event namespacer)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( $ ) {

  'use strict';

  /* EVENT NAMESPACER */

  $.eventNamespacer = function ( events, namespace ) {

    return events.split ( /\s+/ ).map ( event => event + namespace ).join ( ' ' );

  };

}( window.__svelto_jquery ));


/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Event XY)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( $ ) {

  'use strict';

  /* EVENT XY */

  $.eventXY = function ( event, X = 'pageX', Y = 'pageY' ) {

    if ( 'originalEvent' in event ) {

      return $.eventXY ( event.originalEvent, X, Y );

    } else if ( 'changedTouches' in event && event.changedTouches.length ) {

      return {
        x: event.changedTouches[0][X],
        y: event.changedTouches[0][Y]
      };

    } else if ( 'touches' in event && event.touches.length ) {

      return {
        x: event.touches[0][X],
        y: event.touches[0][Y]
      };

    } else if ( X in event ) {

      return {
        x: event[X],
        y: event[Y]
      };

    }

  };

}( window.__svelto_jquery ));


/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Get rect)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( $ ) {

  'use strict';

  /* RECT */

  $.getRect = function ( node ) {

    return node === window ? $.getWindowRect () : node.getBoundingClientRect ();

  };

  $.fn.getRect = function () {

    return this.length ? $.getRect ( this[0] ) : undefined;

  };

  /* WINDOW RECT */

  $.getWindowRect = function () {

    let rect = {};

    rect.left = 0;
    rect.top = 0;
    rect.width = window.innerWidth;
    rect.height = window.innerHeight;
    rect.right = rect.width;
    rect.bottom = rect.height;

    return rect;

  };

}( window.__svelto_jquery ));


/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Has attribute)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( $ ) {

  'use strict';

  /* HAS ATTRIBUTE */

  $.fn.hasAttribute = function ( attr ) {

    return this.length && this[0].hasAttribute ( attr );

  };

}( window.__svelto_jquery ));


/* =========================================================================
 * Svelto - Core - jQuery - Helpers (HSL)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

// It only currently works for setting

(function ( $ ) {

  'use strict';

  /* HSL */

  $.fn.hsl = function ( h, s, l ) {

    this[0].style.backgroundColor = `hsl(${h},${s}%,${l}%)`;

    return this;

  };

}( window.__svelto_jquery ));


/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Is attached)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( $ ) {

  'use strict';

  /* VARIABLES */

  let html = document.documentElement;

  /* IS ATTACHED */

  $.isAttached = function ( ele ) {

    return ele === html || $.contains ( html, ele );

  };

  $.fn.isAttached = function () {

    return $.isAttached ( this[0] );

  };

}( window.__svelto_jquery ));


/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Is focused)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( $ ) {

  'use strict';

  /* IS FOCUSED */

  $.isFocused = function ( ele ) {

    return ele === document.activeElement && ( !document.hasFocus || document.hasFocus () ) && !!( ele.type || ele.href || ~ele.tabIndex );

  };

  $.fn.isFocused = function () {

    return $.isFocused ( this[0] );

  };

}( window.__svelto_jquery ));


/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Is visible)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( $ ) {

  'use strict';

  /* IS VISIBLE */

  $.isVisible = function ( ele ) {

    return !!( ele.offsetWidth || ele.offsetHeight || ele.getClientRects ().length );

  };

  $.fn.isVisible = function () {

    return $.isVisible ( this[0] );

  };

}( window.__svelto_jquery ));


/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Iterator)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( $ ) {

  'use strict';

  /* ITERATOR */

  $.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

}( window.__svelto_jquery ));


/* =========================================================================
 * Svelto - Core - jQuery - Helpers (On Ready)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( $ ) {

  'use strict';

  /* ON READY */

  $.onReady = function ( callback ) { //TODO: Remove after migrating to cash or zepto
    if ( document.readyState !== 'loading' ) return callback ();
    return document.addEventListener ( 'DOMContentLoaded', callback );
  }

}( window.__svelto_jquery ));


/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Selection)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

//SOURCE: jQuery UI

(function ( $ ) {

  'use strict';

  /* SELECTION */

  $.fn.disableSelection = (function () {

    let event = ( 'onselectstart' in document.createElement ( 'div' ) ) ? 'selectstart' : 'mousedown';

    return function () {

      return this.on ( event + '.svelto-disable-selection', event => event.preventDefault () );

    };

  })();

  $.fn.enableSelection = function () {

    return this.off ( '.svelto-disable-selection' );

  };

}( window.__svelto_jquery ));


/* =========================================================================
 * Svelto - Core - lodash (Init)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before ./vendor/lodash.js
 * ========================================================================= */

(function () {

  'use strict';

  /* LODASH */

  window.__svelto_lodash = window.lodash || window._;

}());


/* =========================================================================
 * Svelto - Core - lodash - Helpers (Constants)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( _ ) {

  'use strict';

  /* CONSTANTS */

  _.mixin ({

    true: _.constant ( true ),

    false: _.constant ( false ),

    undefined: _.constant (),

    null: _.constant ( null )

  });

}( window.__svelto_lodash ));


/* =========================================================================
 * Svelto - Core - lodash - Helpers (Debugger)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( _ ) {

  'use strict';

  /* DEBUGGER */

  _.mixin ({

    debugger () {

      debugger;

    }

  });

}( window.__svelto_lodash ));


/* =========================================================================
 * Svelto - Core - lodash - Helpers (Find matches)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( _ ) {

  'use strict';

  /* FIND MATCHES */

  _.mixin ({

    findMatches ( str, regex ) {

      let matches = [],
          match;

      while ( match = regex.exec ( str ) ) {

        matches.push ( match );

      }

      return matches;

    }

  });

}( window.__svelto_lodash ));


/* =========================================================================
 * Svelto - Core - lodash - Helpers (Format)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( _ ) {

  'use strict';

  /* FORMAT */

  _.mixin ({

    format ( msg, ...args ) {

      for ( let i = 1, l = args.length; i <= l; i++ ) {

        msg = msg.replace ( `$${i}`, args[i - 1] );

      }

      return msg;

    }

  });

}( window.__svelto_lodash ));


/* =========================================================================
 * Svelto - Core - lodash - Helpers (MKize)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( _ ) {

  'use strict';

  /* MKIZE */

  _.mixin ({

     mkize ( number, decimals = 0 ) {

      let bases = [1000000000, 1000000, 1000],
          suffixes = ['B', 'M', 'K'];

      for ( let i = 0, l = bases.length; i < l; i++ ) {

        if ( number >= bases[i] ) {

          return Number ( ( number / bases[i] ).toFixed ( decimals ) ) + suffixes[i];

        }

      }

      return number;

    }

  });

}( window.__svelto_lodash ));


/* =========================================================================
 * Svelto - Core - lodash - Helpers (Move)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( _ ) {

  'use strict';

  /* MOVE */

  _.mixin ({

     move ( arr, from, to ) {

       arr.splice ( to, 0, arr.splice ( from, 1 )[0] );

     }

  });

}( window.__svelto_lodash ));


/* =========================================================================
 * Svelto - Core - lodash - Helpers (Now secs)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( _ ) {

  'use strict';

  /* NOW SECS */

  _.mixin ({

    nowSecs () {

      return Math.floor ( _.now () / 1000 );

    }

  });

}( window.__svelto_lodash ));


/* =========================================================================
 * Svelto - Core - lodash - Helpers (Replace all)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( _ ) {

  'use strict';

  /* REPLACE ALL */

  _.mixin ({

    replaceAll ( string, pattern, replacement ) {

      let escaped = pattern.replace ( /[.*+?^${}()|[\]\\]/g, '\\$&' );

      return string.replace ( new RegExp ( escaped, 'g' ), replacement );

    }

  });

}( window.__svelto_lodash ));


/* =========================================================================
 * Svelto - Core - lodash - Helpers (Round closer)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( _ ) {

  'use strict';

  /* DIRECTION */

  _.mixin ({

    roundCloser ( number, step ) {

      if ( _.isUndefined ( step ) ) {

        step = 1;

      }

      let left = ( number % step ),
          halfStep = step / 2;

      return number - left + ( left >= halfStep ? step : 0 );

    }

  });

}( window.__svelto_lodash ));


/* =========================================================================
 * Svelto - Core - lodash - Helpers (Time ago)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * @require ./now_secs.js
 * ========================================================================= */

(function ( _ ) {

  'use strict';

  /* TIME AGO */

  _.mixin ({

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

    }


  });

}( window.__svelto_lodash ));


/* =========================================================================
 * Svelto - Core - lodash - Helpers (Wait)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( _ ) {

  'use strict';

  /* WAIT */

  _.mixin ({

    wait ( ms ) {

      return new Promise ( resolve => setTimeout ( resolve, ms ) );

    }

  });

}( window.__svelto_lodash ));

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

;(function(window, document, undefined){
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
    on: function(test, cb) {
      // I don't really think people should do this, but we can
      // safe guard it a bit.
      // -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
      // This is in case people listen to synchronous tests. I would leave it out,
      // but the code to *disallow* sync tests in the real version of this
      // function is actually larger than this.
      var self = this;
      setTimeout(function() {
        cb(self[test]);
      }, 0);
    },

    addTest: function(name, fn, options) {
      tests.push({name: name, fn: fn, options: options});
    },

    addAsyncTest: function(fn) {
      tests.push({name: null, fn: fn});
    }
  };



  // Fake some of Object.create so we can force non test results to be non "own" properties.
  var Modernizr = function() {};
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
  var prefixes = (ModernizrProto._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : ['','']);

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
    return typeof obj === type;
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

  var domPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(' ') : []);
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

  (function() {
    var _hasOwnProperty = ({}).hasOwnProperty;
    /* istanbul ignore else */
    /* we have no way of testing IE 5.5 or safari 2,
     * so just assume the else gets hit */
    if (!is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined')) {
      hasOwnProp = function(object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function(object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
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

  ModernizrProto.on = function(feature, cb) {
    // Create the list of listeners if it doesn't exist
    if (!this._l[feature]) {
      this._l[feature] = [];
    }

    // Push this test on to the listener list
    this._l[feature].push(cb);

    // If it's already been resolved, trigger it on next tick
    if (Modernizr.hasOwnProperty(feature)) {
      // Next Tick
      setTimeout(function() {
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

  ModernizrProto._trigger = function(feature, res) {
    if (!this._l[feature]) {
      return;
    }

    var cbs = this._l[feature];

    // Force async
    setTimeout(function() {
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

    if (typeof feature == 'object') {
      for (var key in feature) {
        if (hasOwnProp(feature, key)) {
          addTest(key, feature[ key ]);
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
  Modernizr._q.push(function() {
    ModernizrProto.addTest = addTest;
  });




  var cssomPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.split(' ') : []);
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

  var atRule = function(prop) {
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

  var hasEvent = (function() {

    // Detect whether event support can be detected via `in`. Test on a DOM element
    // using the "blur" event b/c it should always exist. bit.ly/event-detection
    var needsFallback = !('onblur' in document.documentElement);

    function inner(eventName, element) {

      var isSupported;
      if (!eventName) { return false; }
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
  })();


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

  var prefixedCSSValue = function(prop, value) {
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
    return name.replace(/([a-z])-([a-z])/g, function(str, m1, m2) {
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
    return name.replace(/([A-Z])/g, function(str, m1) {
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

  var mq = (function() {
    var matchMedia = window.matchMedia || window.msMatchMedia;
    if (matchMedia) {
      return function(mq) {
        var mql = matchMedia(mq);
        return mql && mql.matches || false;
      };
    }

    return function(mq) {
      var bool = false;

      injectElementWithStyles('@media ' + mq + ' { #modernizr { position: absolute; } }', function(node) {
        bool = (window.getComputedStyle ?
                window.getComputedStyle(node, null) :
                node.currentStyle).position == 'absolute';
      });

      return bool;
    };
  })();


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
    return !!~('' + str).indexOf(substr);
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
      return injectElementWithStyles('@supports (' + conditionText + ') { #modernizr { position: absolute; } }', function(node) {
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
    return function() {
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
  Modernizr._q.push(function() {
    delete modElem.elem;
  });



  var mStyle = {
    style: modElem.elem.style
  };

  // kill ref for gc, must happen before mod.elem is removed, so we unshift on to
  // the front of the queue.
  Modernizr._q.unshift(function() {
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

  var testProp = ModernizrProto.testProp = function(prop, value, useValue) {
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
      props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
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

  var prefixed = ModernizrProto.prefixed = function(prop, obj, elem) {
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

  var prefixedCSS = ModernizrProto.prefixedCSS = function(prop) {
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
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before ./vendor/modernizr.js
 * ========================================================================= */

(function () {

  'use strict';

  /* MODERNIZR */

  window.__svelto_modernizr = window.Modernizr;

}());


/* =========================================================================
 * Svelto - Core - Modernizr - Tests (Clip Path Polygon)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( Modernizr ) {

  'use strict';

  /* CLIP PATH POLYGON */

  Modernizr.addTest ( 'clip-path-polygon', Modernizr.testAllProps ( 'clip-path', 'polygon( 0 0 )' ) );

}( window.__svelto_modernizr ));


/* =========================================================================
 * Svelto - Core - Modernizr - Tests (Flexbox)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( Modernizr ) {

  'use strict';

  /* FLEXBOX */

  Modernizr.addTest ( 'flexbox', Modernizr.testAllProps ( 'flexBasis', '1px' ) );

}( window.__svelto_modernizr ));


/* =========================================================================
 * Svelto - Core - Modernizr - Tests (Flexbox Legacy)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( Modernizr ) {

  'use strict';

  /* FLEXBOX LEGACY */

  Modernizr.addTest ( 'flexbox-legacy', Modernizr.testAllProps ( 'boxDirection', 'reverse' ) );

}( window.__svelto_modernizr ));


/* =========================================================================
 * Svelto - Core - Modernizr - Tests (Flexbox Tweener)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( Modernizr ) {

  'use strict';

  /* FLEXBOX TWEENER */

  Modernizr.addTest ( 'flexbox-tweener', Modernizr.testAllProps ( 'flexAlign', 'end' ) );

}( window.__svelto_modernizr ));


/* =========================================================================
 * Svelto - Core - Modernizr - Tests (Position Sticky)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( Modernizr ) {

  'use strict';

  /* POSITION STICKY */

  Modernizr.addTest ( 'position-sticky', Modernizr.testAllProps ( 'position', 'sticky' ) );

}( window.__svelto_modernizr ));


/* =========================================================================
 * Svelto - Core - Modernizr - Tests (Scrollbar)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( Modernizr ) {

  'use strict';

  /* SCROLLBAR */

  let size;

  Modernizr.testStyles ( '#modernizr {width:100px;height:100px;overflow:scroll;position:absolute;z-index:-1}', ele => size = ele.offsetWidth - ele.clientWidth ); // The absolute position ensures that the height is setted correctly (FF and IE bug)

  Modernizr.addTest ( 'overlay-scrollbars', !size );
  Modernizr.addTest ( 'scrollbar-size-' + size, true );

}( window.__svelto_modernizr ));


/* =========================================================================
 * Svelto - Core - Shims - Shims (requestAnimationFrame)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

(function () {

  'use strict';

  /* REQUEST ANIMATION FRAME */

  if ( window.requestAnimationFrame ) return;

  window.requestAnimationFrame = function ( callback ) {
    return setTimeout ( callback, 16 );
  };

  window.cancelAnimationFrame = function ( handle ) {
    return clearTimeout ( handle );
  };

}());


/* =========================================================================
 * Svelto - Core - lodash - Helpers (Frames)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * @require core/shims/shims/requestAnimationFrame.js
 * ========================================================================= */

(function ( _ ) {

  'use strict';

  /* FRAMES */

  _.mixin ({

    frames ( fn ) {

      let wait, args;

      function proxy () {
        wait = false;
        fn.apply ( undefined, args );
      }

      function framed () {
        if ( wait ) return;
        wait = true;
        args = arguments;
        requestAnimationFrame ( proxy );
      }

      return framed;

    }

  });

}( window.__svelto_lodash ));


/* =========================================================================
 * Svelto - Core - lodash - Helpers
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before ./constants.js
 * @before ./debugger.js
 * @before ./find_matches.js
 * @before ./format.js
 * @before ./frames.js
 * @before ./mkize.js
 * @before ./move.js
 * @before ./now_secs.js
 * @before ./replace_all.js
 * @before ./round_closer.js
 * @before ./time_ago.js
 * @before ./wait.js
 * ========================================================================= */


/* =========================================================================
 * Svelto - Core - lodash
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./init.js
 * @require ./helpers/helpers.js
 * ========================================================================= */


/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Animate)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * @require core/lodash/lodash.js
 * @require core/shims/shims/requestAnimationFrame.js
 * ========================================================================= */

// Pretty simple, lightweight, alternative of $.fn.animate implementing a subset of its functionalities
//FIXME: Doesn't work this css properties that don't accept pixel values

(function ( $, _ ) {

  'use strict';

  /* DEFAULTS */

  const defaults = {
    easing: 'easeOutQuad',
    duration: 350,
    internals: {
      getProp: ( ele, prop ) => parseFloat ( getComputedStyle ( ele )[prop] ), //TODO: Precompute getComputedStyle maybe
      setProp: ( ele, prop, value ) => ele.style[prop] = `${value}px`
    },
    callbacks: {
      start: _.noop,
      tick: _.noop,
      end: _.noop
    }
  };

  /* ANIMATE */

  function animate ( eles, props, options ) {

    eles = _.castArray ( eles );
    options = _.merge ( {}, $.animate.defaults, options );

    let easing = $.animate.easings[options.easing],
        propsKeys = Object.keys ( props ),
        startTime = Date.now (),
        isStart = true,
        endedNr = 0;

    eles.forEach ( ele => {

      let startProps = {},
          deltaProps = {};

      propsKeys.forEach ( prop => {
        startProps[prop] = options.internals.getProp ( ele, prop );
        deltaProps[prop] = props[prop] - startProps[prop];
      });

      function tick () {

        /* START */

        if ( isStart ) {

          options.callbacks.start ();

          isStart = false;

        }

        /* TICK */

        let currTime = Date.now (),
            currDuration = Math.min ( options.duration, currTime - startTime );

        propsKeys.forEach ( prop => {

          let value = easing ( null, currDuration, startProps[prop], deltaProps[prop], options.duration );

          options.internals.setProp ( ele, prop, value );

        });

        options.callbacks.tick ();

        /* END */

        let isEnd = ( currDuration >= options.duration );

        if ( isEnd ) {

          endedNr += 1;

          if ( endedNr === eles.length ) {

            options.callbacks.end ();

          }

        } else {

          requestAnimationFrame ( tick );

        }

      }

      tick ();

    });

  }

  /* EASINGS */

  const easings = { // Any of the easings provided by http://gsgd.co.uk/sandbox/jquery/easing can be used
    easeInQuad ( x, t, b, c, d ) {
      return c * ( t /= d ) * t + b;
    },
    easeOutQuad ( x, t, b, c, d ) {
      return - c * ( t /= d ) * ( t - 2 ) + b;
    },
    easeInOutQuad ( x, t, b, c, d ) {
      if ( ( t /= d / 2 ) < 1 ) return c / 2 * t * t + b;
      return - c / 2 * ( ( --t ) * ( t - 2 ) - 1 ) + b;
    }
  };

  /* EXPORT */

  $.animate = animate;
  $.animate.defaults = defaults;
  $.animate.easings = easings;

}( window.__svelto_jquery, window.__svelto_lodash ));


/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Animate Prop)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./animate.js
 * ========================================================================= */

// Alternative flavor of $.animate that by default animates props instead of css props

(function ( $, _ ) {

  'use strict';

  /* DEFAULTS */

  const defaults = {
    internals: {
      getProp: ( ele, prop ) => parseFloat ( ele[prop] ),
      setProp: ( ele, prop, value ) => ele[prop] = value
    }
  };

  /* ANIMATE PROP */

  function animateProp ( eles, props, options ) {

    options = _.merge ( {}, $.animateProp.defaults, options );

    return $.animate ( eles, props, options );

  }

  /* EXPORT */

  $.animateProp = animateProp;
  $.animateProp.defaults = defaults;

}( window.__svelto_jquery, window.__svelto_lodash ));


/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Scroll)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * @require ./animate_prop.js
 * @require ./elements.js
 * @require ./iterator.js
 * ========================================================================= */

(function ( $ ) {

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

  $.scrollTo = function ( target, ...args ) {

    let scrollTop = $(target).offset ().top,
        eles = [$.html, $.body];

    $.animateProp ( eles, { scrollTop }, ...args );

  };

  $.fn.scrollParent = function ( includeHidden ) { // Take from jQuery UI, optimized for performance

    let position = this.css ( 'position' );

    if ( position === 'fixed' ) return $.$document;

    let excludeStaticParent = ( position === 'absolute' ),
        overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;

    for ( let parent of this.parents () ) {

      let $parent = $(parent);

      if ( excludeStaticParent && $parent.css ( 'position' ) === 'static' ) continue;

      if ( overflowRegex.test ( $parent.css ( 'overflow' ) + $parent.css ( 'overflow-y' ) + $parent.css ( 'overflow-x' ) ) ) {

        return $parent;

      }

    }

    return $.$document;

  };

  $.hasScrollbars = function ( node, both = false ) {

    return both ? $.hasScrollbarY ( node ) && $.hasScrollbarX ( node ) : $.hasScrollbarY ( node ) || $.hasScrollbarX ( node );

  };

  $.fn.hasScrollbars = function () {

    return this.length && $.hasScrollbars ( this[0] );

  };

  $.hasScrollbarX = function ( node ) { //FIXME: Doesn't work on body

    let style = getComputedStyle ( node );

    if ( style.overflowX === 'scroll' ) return true;

    let isScrollable = node.scrollWidth > node.clientWidth;

    return isScrollable && style.overflowX === 'auto';

  };

  $.fn.hasScrollbarX = function () {

    return this.length && $.hasScrollbarX ( this[0] );

  };

  $.hasScrollbarY = function ( node ) {

    let style = getComputedStyle ( node );

    if ( style.overflowY === 'scroll' ) return true;

    let isScrollable = node.scrollHeight > node.clientHeight;

    return isScrollable && style.overflowY === 'auto';

  };

  $.fn.hasScrollbarY = function () {

    return this.length && $.hasScrollbarY ( this[0] );

  };

  $.fn.toggleScroll = function ( force = this.hasClass ( 'overflow-hidden' ), keepScrollbars ) {

    return force ? this.enableScroll () : this.disableScroll ( keepScrollbars );

  };

  $.fn.disableScroll = function ( keepScrollbars = true ) { //TODO: Implement keepScrollbars, we should prevent default scroll events behaviour

    return this.addClass ( 'overflow-hidden' );

  };

  $.fn.enableScroll = function () {

    return this.removeClass ( 'overflow-hidden' );

  };

}( window.__svelto_jquery ));


/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Z Index)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * @require core/lodash/lodash.js
 * ========================================================================= */

//SOURCE: jQuery UI

(function ( $, _ ) {

  'use strict';

  /* Z INDEX */

	$.fn.zIndex = function ( val ) {

    if ( !_.isUndefined ( val ) ) return this.css ( 'zIndex', val );

		if ( !this.length ) return 0;

		let $elem = this.eq ( 0 ),
        position,
        value;

		while ( $elem.length && $elem[0] !== document ) {

			// Ignore z-index if position is set to a value where z-index is ignored by the browser
			// This makes behavior of this function consistent across browsers
			// WebKit always returns auto if the element is positioned

      position = $elem.css ( 'position' );

      if ( _.includes ( ['absolute', 'relative', 'fixed'], position ) ) {

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

}( window.__svelto_jquery, window.__svelto_lodash ));


/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Top index)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * @require ./z_index.js
 * ========================================================================= */

//TODO: Use it
//TODO: Write it in a more dynamic way, detecting what the highest `z-index` actually is

(function ( $ ) {

  'use strict';

  /* TOP INDEX */

  $.fn.topIndex = function () {

    let topIndex = 1000000000;

    return function () {

      return this.zIndex ( ++topIndex );

    };

  };

}( window.__svelto_jquery ));


/* =========================================================================
 * Svelto - Core - jQuery - Helpers
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before ./animate.js
 * @before ./animate_prop.js
 * @before ./clean_data.js
 * @before ./diff.js
 * @before ./elements.js
 * @before ./event_namespacer.js
 * @before ./event_xy.js
 * @before ./get_rect.js
 * @before ./has_attribute.js
 * @before ./hsl.js
 * @before ./is_attached.js
 * @before ./is_focused.js
 * @before ./is_visible.js
 * @before ./iterator.js
 * @before ./on_ready.js
 * @before ./scroll.js
 * @before ./selection.js
 * @before ./top_index.js
 * @before ./z_index.js
 * ========================================================================= */


/* =========================================================================
 * Svelto - Core - jQuery
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./init.js
 * @require ./helpers/helpers.js
 * ========================================================================= */


/* =========================================================================
 * Svelto - Core - Modernizr - Tests (Clip Path Url)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * @require core/jquery/jquery.js
 * ========================================================================= */

(function ( Modernizr, $ ) {

  'use strict';

  /* CLIP PATH URL */

  $.onReady ( function () {

    /* SVG */

    let ns = 'http://www.w3.org/2000/svg',
        svg = document.createElementNS ( ns, 'svg' ),
        clip = document.createElementNS ( ns, 'clipPath' ),
        rect = document.createElementNS ( ns, 'rect' );

    clip.setAttribute ( 'id', 'ModernizrClipPath' );
    rect.setAttribute ( 'width', '0' );

    clip.appendChild ( rect );
    svg.appendChild ( clip );

    /* ELEMENT */

    let ele = document.createElement ( 'div' );

    ele.style.cssText = 'width:2px;height:2px;position:fixed;top:0;left:0;z-index:1000000000;opacity:0;';
    ele.style[Modernizr.prefixed ( 'clip-path' )] = 'url(#ModernizrClipPath)';

    /* APPENDING */

    document.body.appendChild ( svg );
    document.body.appendChild ( ele );

    /* CHECKING */

    let offset = ele.getBoundingClientRect (),
        supported = document.elementFromPoint ( offset.left + 1, offset.top + 1 ) !== ele;

    /* CLEANING */

    document.body.removeChild ( ele );
    document.body.removeChild ( svg );

    /* EXPORTING */

    Modernizr.addTest ( 'clip-path-url', supported );

  });

}( window.__svelto_modernizr, window.__svelto_jquery ));


/* =========================================================================
 * Svelto - Core - Modernizr - Tests
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before ./clip_path_polygon.js
 * @before ./clip_path_url.js
 * @before ./flexbox.js
 * @before ./flexbox_legacy.js
 * @before ./flexbox_tweener.js
 * @before ./position_sticky.js
 * @before ./scrollbar.js
 * ========================================================================= */


/* =========================================================================
 * Svelto - Core - Modernizr
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./init.js
 * @require ./tests/tests.js
 * ========================================================================= */


/* =========================================================================
 * Svelto - Core - Shims - Shims (localStorage)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/lodash/lodash.js
 * ========================================================================= */

(function () {

  'use strict';

  /* LOCAL STORAGE */

  if ( window.localStorage ) return;

  window.localStorage = {
    key: _.null,
    removeItem: _.undefined,
    clear: _.undefined,
    getItem: _.null,
    setItem: _.undefined
  };

}());


/* =========================================================================
 * Svelto - Core - Shims - Shims
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before ./localStorage.js
 * @before ./requestAnimationFrame.js
 * ========================================================================= */


/* =========================================================================
 * Svelto - Core - Shims
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./shims/shims.js
 * ========================================================================= */


/* =========================================================================
 * Svelto - Core - Svelto
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/shims/shims.js
 * @require core/lodash/lodash.js
 * @require core/jquery/jquery.js
 * @require core/modernizr/modernizr.js
 * ========================================================================= */

(function () {

  'use strict';

  /* SVELTO */

  let Svelto = {

    VERSION: '0.7.15',
    ENVIRONMENT: 'demo',
    DEVELOPMENT: true,

    /* DEPENDENCIES */

    _: window.__svelto_lodash,
    $: window.__svelto_jquery,
    Modernizr: window.__svelto_modernizr,

    /* NAMESPACES */

    Instances: {},
    Templates: {},
    Widgets: {}

  };

  /* EXPORT */

  window.Svelto = Svelto;

}());


/* =========================================================================
 * Svelto - Core - Browser
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* VARIABLES */

  let userAgent  = navigator.userAgent ? navigator.userAgent.toLowerCase () : '',
      vendor     = navigator.vendor ? navigator.vendor.toLowerCase () : '', // Fixes an IE10 bug, `navigator.vendor` it's `undefined` there
      appVersion = navigator.appVersion ? navigator.appVersion.toLowerCase () : '';

  /* CHECKS */

  let isOpera         = /^Opera\//i.test ( userAgent ) || /\x20OPR\//i.test ( userAgent ), /* Opera <= 12 || Opera >= 15 */
      isIpod          = /ipod/i.test ( userAgent ),
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
    support: {
      browsers: ['chrome', 'firefox', 'edge', 'ie', 'opera', 'safari', 'uc'],
      devices: ['desktop', 'mobile', 'tablet'],
      oss: ['ios', 'android', 'blackberry', 'linux', 'mac', 'windows']
    },
    is: {
      chrome: !isOpera && /chrome|chromium/i.test ( userAgent ) && /google inc/.test ( vendor ),
      firefox: /firefox/i.test ( userAgent ),
      edge: /(edge)\/((\d+)?[\w\.]+)/i.test ( userAgent ),
      ie: /msie/i.test ( userAgent ) || 'ActiveXObject' in window, /* IE || EDGE */
      opera: isOpera,
      safari: /safari/i.test ( userAgent ) && /apple computer/i.test ( vendor ),
      uc: /ucbrowser/i.test ( userAgent ),
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
 * Svelto - Core - Browser - Tests (Browsers)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../browser.js
 * ========================================================================= */

(function ( Modernizr, Browser ) {

  'use strict';

  /* BROWSERS */

  for ( let browser of Browser.support.browsers ) {

    Modernizr.addTest ( browser, Browser.is[browser] );

  }

}( Svelto.Modernizr, Svelto.Browser ));


/* =========================================================================
 * Svelto - Core - Browser - Tests (Devices)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../browser.js
 * ========================================================================= */

(function ( Modernizr, Browser ) {

  'use strict';

  /* DEVICES */

  for ( let device of Browser.support.devices ) {

    Modernizr.addTest ( device, Browser.is[device] );

  }

}( Svelto.Modernizr, Svelto.Browser ));


/* =========================================================================
 * Svelto - Core - Browser - Tests (OSs)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../browser.js
 * ========================================================================= */

(function ( Modernizr, Browser ) {

  'use strict';

  /* OSS */

  for ( let os of Browser.support.oss ) {

    Modernizr.addTest ( os, Browser.is[os] );

  }

}( Svelto.Modernizr, Svelto.Browser ));


/* =========================================================================
 * Svelto - Core - Browser - Tests
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @priority 900
 * @before ./browsers.js
 * @before ./devices.js
 * @before ./oss.js
 * ========================================================================= */


/* =========================================================================
 * Svelto - Core - Breakpoints
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* BREAKPOINTS */

  let Breakpoints = {
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

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Core - Keyboard
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/browser/browser.js
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto, Browser ) {

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

        // `ctmd` is treated as `cmd` on Mac, and as `ctrl` elsewhere

        let specialKeys = ['ctrl', 'cmd', 'ctmd', 'alt', 'shift'],
            keys = keystroke.split ( '+' ).map ( key => key.trim ().toLowerCase () );

        if ( _.includes ( keys, 'ctmd' ) ) {

          if ( !Keyboard.keystroke.hasCtrlOrCmd ( event ) ) return false;

        } else {

          if ( _.includes ( keys, 'ctrl' ) !== event.ctrlKey ) return false;
          if ( _.includes ( keys, 'cmd' ) !== event.metaKey ) return false;

        }

        if ( _.includes ( keys, 'alt' ) !== event.altKey ) return false;
        if ( _.includes ( keys, 'shift' ) !== event.shiftKey ) return false;

        for ( let key of keys ) {

          if ( !_.includes ( specialKeys, key ) ) {

            if ( !( event.keyCode === Keyboard.keys[key.toUpperCase ()] || String.fromCharCode ( event.keyCode ).toLowerCase () === key ) ) return false;

          }

        }

        return true;

      },

      hasCtrlOrCmd ( event ) {

        return ( !Browser.is.mac && event.ctrlKey ) || ( Browser.is.mac && event.metaKey );

      }

    }

  };

  /* EXPORT */

  Svelto.Keyboard = Keyboard;

}( Svelto.$, Svelto._, Svelto, Svelto.Browser ));


/* =========================================================================
 * Svelto - Core - Mouse
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* MOUSE */

  let Mouse = {
    buttons: {
      LEFT: 0,
      MIDDLE: 1,
      RIGHT: 2
    },
    hasButton ( event, button, orNone = false ) {

      if ( 'originalEvent' in event ) {

        return Mouse.hasButton ( event.originalEvent, button, orNone );

      }

      return ( orNone && !('button' in event) ) || event.button === button;

    }
  };

  /* EXPORT */

  Svelto.Mouse = Mouse;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Core - Pointer
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
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
        prefix,
        emulated: {
          tune: true, // Whether to fine-tune the timeout or not
          tuned: false, // Whether the timeout has been tuned or not
          timeout: 2500, // Milliseconds to wait for an emulated event
          min: 500, // Minimum fine-tuned timeout
          multiplier: 2.5 // The detected timeout will be multiplied by this
        }
      },
      tap: {
        threshold: 6 // Over this distance threshold the touch event won't be considered a tap
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

  let canTouch = Browser.is.touchDevice,
      isTouch,
      delta = 0,
      skipping,
      scrolled,
      timeoutId,
      downEvent,
      emulatedTimeoutTimestamp,
      prevTapTimestamp = 0,
      dbltapTriggerable = true;

  /* EVENT CREATOR */

  function createEvent ( name, originalEvent ) {

    let event = $.Event ( name );

    event.originalEvent = originalEvent;

    return event;

  }

  /* HANDLERS */

  function downHandler ( event ) {

    if ( canTouch ) {

      isTouch = Pointer.isTouchEvent ( event );

      if ( isTouch ) {

        if ( !emulatedTimeoutTimestamp && Pointer.options.events.emulated.tune ) emulatedTimeoutTimestamp = Date.now ();

        scrolled = false;

        window.onscroll = scrollHandler;

        delta++;

      } else if ( delta > 0 ) {

        if ( emulatedTimeoutTimestamp && !Pointer.options.events.emulated.tuned && Pointer.options.events.emulated.tune ) {

          Pointer.options.events.emulated.timeout = Math.ceil ( Math.max ( Pointer.options.events.emulated.min, ( Date.now () - emulatedTimeoutTimestamp ) * Pointer.options.events.emulated.multiplier ) );

          Pointer.options.events.emulated.tuned = true;

        }

        skipping = true;

        delta--;

        return;

      }

      skipping = false;

    }

    downEvent = event;

  }

  function upHandler ( event ) {

    if ( skipping ) return;
    if ( !downEvent ) return;

    reset ();

    if ( isTouch && scrolled ) return;
    if ( !isTouch && !Mouse.hasButton ( event, Mouse.buttons.LEFT, true ) ) return;
    if ( downEvent.target !== event.target ) return;

    if ( isTouch ) {

      let downXY = $.eventXY ( downEvent ),
          upXY = $.eventXY ( event ),
          threshold = Pointer.options.tap.threshold;

      if ( Math.abs ( downXY.x - upXY.x ) > threshold || Math.abs ( downXY.y - upXY.y ) > threshold ) return;

    }

    let tapTimestamp = event.timeStamp || Date.now (),
        $target = $(downEvent.target);

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

  function scrollHandler () {

    scrolled = true;

    window.onscroll = null;

  }

  /* RESET */

  function reset () {

    setTimeout ( resetEvents, 0 );

    if ( isTouch ) {

      if ( !scrolled ) window.onscroll = null;

      if ( timeoutId ) clearTimeout ( timeoutId );

      timeoutId = setTimeout ( resetDelta, Pointer.options.events.emulated.timeout );

    }

  }

  function resetEvents () {

    downEvent = undefined;

  }

  function resetDelta () {

    delta = 0;

    timeoutId = false;

  }

  /* INIT */

  $.$document.on ( Pointer.down, downHandler );
  $.$document.on ( Pointer.up, upHandler );
  $.$document.on ( Pointer.cancel, reset );

  /* EXPORT */

  Svelto.Pointer = Pointer;

}( Svelto.$, Svelto._, Svelto, Svelto.Browser, Svelto.Mouse ));


/* =========================================================================
 * Svelto - Core - Readify
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

//TODO: Maybe rename it, `Readify` doesn't sound right
//FIXME: We actually `require` Widget, but requiring it creates a circular dependency...

(function ( $, _, Svelto, Widgets ) {

  'use strict';

  /* READIFY */

  class Readify {

    constructor () {

      this.queue = [];
      this._isReady = !!window.__svelto_readify_ready;

    }

    /* METHODS */

    get () {

      return this.queue;

    }

    add ( fn ) {

      if ( this._isReady ) {

        this.worker ( fn );

      } else {

        this.queue.push ( fn );

      }

    }

    remove ( fn ) {

      _.pull ( this.queue, fn );

    }

    isReady () {

      return this._isReady;

    }

    ready () {

      if ( this._isReady ) return;

      this._isReady = true;

      this.queue.forEach ( this.worker.bind ( this ) );

      this.queue = [];

    }

    worker ( fn ) {

      if ( 'config' in fn ) { //FIXME: Not really future proof

        let Widget = fn,
            ready = Widget.ready || Widget.__proto__.ready || Widgets.Widget.ready, //IE10 support -- static property
            initReady = Widget._initReady || Widget.__proto__._initReady || Widgets.Widget._initReady, //IE10 support -- static property
            setReady = Widget._setReady || Widget.__proto__._setReady || Widgets.Widget._setReady; //IE10 support -- static property

        initReady.bind ( Widget )();

        ready.bind ( Widget )( setReady.bind ( Widget ) );

      } else {

        fn ();

      }

    }

  }

  /* EXPORT */

  Svelto.Readify = new Readify ();

  /* READY */

  if ( !Svelto.Readify.isReady () ) {

    $.onReady ( Svelto.Readify.ready.bind ( Svelto.Readify ) );

  }

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets ));


/* =========================================================================
 * Svelto - Core - Breakpoint
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/breakpoints/breakpoints.js
 * @require core/readify/readify.js
 * ========================================================================= */

(function ( $, _, Svelto, Breakpoints, Readify ) {

  'use strict';

  /* BREAKPOINT */

  let Breakpoint = {

    /* VARIABLES */

    previous: undefined, // Previous breakpoint
    current: undefined, // Current breakpoint

    /* RESIZE */

    __resize () {

      let current = this.get ();

      if ( current === this.current ) return;

      this.previous = this.current;
      this.current = current;

      $.$window.trigger ( 'breakpoint:change' );

    },

    /* API */

    get () {

      this._widths = this._widths || _.sortBy ( _.values ( Breakpoints.widths ) );
      this._width2breakpoint = this._width2breakpoint || _.invert ( Breakpoints.widths );

      let width = $.window.innerWidth;

      for ( let i = 0, l = this._widths.length; i < l; i++ ) {

        if ( width >= this._widths[i] && ( i === l - 1 || width < this._widths[i+1] ) ) {

          return this._width2breakpoint[this._widths[i]];

        }

      }

    }

  };

  /* READY */

  Readify.add ( function () {

    Breakpoint.current = Breakpoint.get ();

    $.$window.on ( 'resize', _.frames ( Breakpoint.__resize.bind ( Breakpoint ) ) );

  });

  /* EXPORT */

  Svelto.Breakpoint = Breakpoint;

}( Svelto.$, Svelto._, Svelto, Svelto.Breakpoints, Svelto.Readify ));


/* =========================================================================
 * Svelto - Core - Layout (Helpers)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/readify/readify.js
 * @require core/svelto/svelto.js
 * ========================================================================= */

// `body` is used as a fallback

(function ( $, _, Svelto, Readify ) {

  'use strict';

  /* LAYOUT */

  Readify.add ( function () {

    $.$layout = $('.layout, body').first ();

  });

  $.getLayoutOf = function ( ele ) {

    if ( ele ) {

      const $ele = $(ele),
            $layout = $ele[0] === $.body ? $.$body : $ele.parent ().closest ( '.layout, body' );

      if ( $layout.length ) return $layout;

    }

    return $.$layout;

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Readify ));


/* =========================================================================
 * Svelto - Core - Push state
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/readify/readify.js
 * ========================================================================= */

// Monkey patching `history.pushState` so that it will trigger an event that we can then use to properly trigger a `route` event

(function ( $, _, Svelto, Readify, history ) {

  'use strict';

  /* PUSH STATE */

  Readify.add ( function () {

    let pushState = history.pushState;

    history.pushState = function ( state ) {

      if ( _.isFunction ( history.onpushstate ) ) {

        history.onpushstate ({ state });

      }

      $.$window.trigger ( 'pushstate' );

      return pushState.apply ( history, arguments );

    };

  });

})( Svelto.$, Svelto._, Svelto, Svelto.Readify, window.history );


/* =========================================================================
 * Svelto - Core - Route
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/push_state/push_state.js
 * @require core/readify/readify.js
 * ========================================================================= */

/* ROUTE */

(function ( $, _, Svelto, Readify ) {

  'use strict';

  Readify.add ( function () {

    let previous = window.location.href.split ( '#' )[0];

    $.$window.on ( 'popstate pushstate', function () {

      _.defer ( function () { // We need the `window.location.href` to get updated before

        let current = window.location.href.split ( '#' )[0];

        if ( current !== previous ) {

          previous = current;

          $.$window.trigger ( 'route' );

        }

      });

    });

  });

})( Svelto.$, Svelto._, Svelto, Svelto.Readify );


/* =========================================================================
 * Svelto - Core - Widget (Helpers)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* WIDGET */

  let widget = {

    new ( Widget, element, options ) {

      return new Widget ( options, element );

    },

    is ( element, Widget, loose = false ) { // `loose` controls whether we strictly require an instance of it or just a selector match

      if ( loose && Widget.config.selector && $(element).is ( Widget.config.selector ) ) return true;

      return !!widget.get ( element, Widget, undefined, false );

    },

    get ( element, Widget, options, instanciate = true ) {

      return element[`_${Widget.config.name}`] || instanciate && widget.new ( Widget, element, options );

    },

    set ( element, instance ) {

      element[`_${instance.name}`] = instance;

    },

    remove ( element, instance ) { // Both widgets and instances can be passed

      let name = 'config' in instance ? instance.config.name : instance.name;

      delete element[`_${name}`];

    }

  }

  /* EXPORT */

  $.widget = widget;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Core - Plugin
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/helpers.js
 * ========================================================================= */

//TODO: Add support for plain functions

(function ( $, _, Svelto ) {

  'use strict';

  /* PLUGIN */

  let Plugin = {

    call ( Widget, $ele, args ) {

      let options = args[0],
          isMethodCall = ( _.isString ( options ) && options.charAt ( 0 ) !== '_' ); // Methods starting with '_' are private

      for ( let i = 0, l = $ele.length; i < l; i++ ) {

        let instance = $.widget.get ( $ele[i], Widget, options );

        if ( isMethodCall && _.isFunction ( instance[options] ) ) {

          let returnValue = args.length > 1 ? instance[options]( ...Array.prototype.slice.call ( args, 1 ) ) : instance[options]();

          if ( !_.isNil ( returnValue ) ) return returnValue;

        }

      }

      return $ele;

    },

    make ( Widget ) {

      if ( !Widget.config.plugin ) return;

      $.fn[Widget.config.name] = function () {
        return Plugin.call ( Widget, this, arguments );
      };

    },

    unmake ( Widget ) {

      if ( !Widget.config.plugin ) return;

      delete $.fn[Widget.config.name];

    }

  };

  /* EXPORT */

  Svelto.Plugin = Plugin;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Core - Widgetize
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/readify/readify.js
 * ========================================================================= */

//FIXME: We actually `require` Widget, but requiring it creates a circular dependency...

(function ( $, _, Svelto, Widgets, Readify ) {

  'use strict';

  /* WIDGETIZE */

  class Widgetize {

    constructor () {

      this.widgetizers = {};

    }

    /* UTILITIES */

    _getWidgets ( selector, $root, $parent ) {

      let isSimpleSelector = !/ |>/.test ( selector );

      if ( isSimpleSelector ) {

        let isSelf = $root.is ( selector ),
            $nested = $root.find ( selector );

        return isSelf
                 ? $nested.length
                   ? $nested.add ( $root )
                   : $root
                 : $nested;

      } else {

        $parent = $parent ? $parent : $root.parent ();

        let root = $root[0];

        return $parent.find ( selector ).filter ( ( index, ele ) => ele === root || $.contains ( root, ele ) );

      }

    }

    /* METHODS */

    get () {

      return this.widgetizers;

    }

    add ( selector, widgetizer, data ) {

      if ( _.isObject ( selector ) ) {

        let Widget = selector;

        if ( !Widget.config.plugin || !_.isString ( Widget.config.selector ) ) return;

        let widgetize = Widget.widgetize || Widget.__proto__.widgetize || Widgets.Widget.widgetize; //IE10 support -- static property

        return this.add ( Widget.config.selector, widgetize, Widget );

      }

      if ( !(selector in this.widgetizers) ) {

        this.widgetizers[selector] = [];

      }

      this.widgetizers[selector].push ( [widgetizer, data] );

      if ( Readify.isReady () ) {

        let $widgets = this._getWidgets ( selector, $.$body, $.$html );

        this.worker ( [[widgetizer, data]], $widgets );

      }

    }

    remove ( selector, widgetizer ) {

      if ( _.isObject ( selector ) ) {

        let Widget = selector;

        if ( !Widget.config.plugin || !_.isString ( Widget.config.selector ) ) return;

        let widgetize = Widget.widgetize || Widget.__proto__.widgetize || Widgets.Widget.widgetize; //IE10 support -- static property

        return this.remove ( Widget.config.selector, widgetize );

      }

      if ( selector in this.widgetizers ) {

        if ( widgetizer ) {

          for ( let i = 0, l = this.widgetizers[selector].length; i < l; i++ ) {

            if ( this.widgetizers[selector][i][0] === widgetizer ) {

              this.widgetizers[selector].splice ( i, 1 );

            }

          }

        }

        if ( !widgetizer || !this.widgetizers[selector].length ) {

          delete this.widgetizers[selector];

        }

      }

    }

    ready () {

      this.on ( $.$body );

    }

    on ( $root ) {

      let $parent = $root.parent ();

      for ( let selector in this.widgetizers ) {

        if ( !this.widgetizers.hasOwnProperty ( selector ) ) continue;

        let widgetizers = this.widgetizers[selector],
            $widgets = this._getWidgets ( selector, $root, $parent );

        this.worker ( widgetizers, $widgets );

      }

    }

    worker ( widgetizers, $widgets ) {

      for ( let ei = 0, el = $widgets.length; ei < el; ei++ ) {

        const widget = $widgets[ei];

        for ( let wi = 0, wl = widgetizers.length; wi < wl; wi++ ) {

          widgetizers[wi][0] ( widget, widgetizers[wi][1] );

        }

      }

    }

  }

  /* EXPORT */

  Svelto.Widgetize = new Widgetize ();

  /* PLUGIN */

  $.fn.widgetize = function () {

    Svelto.Widgetize.on ( this );

    return this;

  };

  /* READY */

  if ( !Readify.isReady () ) {

    Readify.add ( Svelto.Widgetize.ready.bind ( Svelto.Widgetize ) );

  }

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Readify ));


/* =========================================================================
 * Svelto - Core - Factory
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/plugin/plugin.js
 * @require core/readify/readify.js
 * @require core/widgetize/widgetize.js
 *=========================================================================*/

(function ( $, _, Svelto, Instances, Widgets, Plugin, Readify, Widgetize ) {

  'use strict';

  /* FACTORY */

  let Factory = {

    /* API */

    make ( Widget, config, namespace = Widgets, instances = Instances ) {

      for ( let i = 0, l = this.makers.order.length; i < l; i++ ) {

        this.makers[this.makers.order[i]]( Widget, config, namespace, instances );

      }

    },

    unmake ( Widget, namespace = Widgets, instances = Instances ) {

      for ( let i = 0, l = this.unmakers.order.length; i < l; i++ ) {

        this.unmakers[this.unmakers.order[i]]( Widget, namespace, instances );

      }

    },

    /* MAKERS */

    makers: {

      order: ['configure', 'namespace', 'instances', 'plugin', 'ready', 'widgetize'], // The order in which the makers will be called

      configure ( Widget, config = {} ) {

        config.Name = _.upperFirst ( config.name );

        Widget.config = config;

      },

      namespace ( Widget, config, namespace ) {

        if ( !_.isObject ( namespace ) ) return;

        namespace[Widget.config.Name] = Widget;

      },

      instances ( Widget, config, namespace, instances ) {

        if ( !_.isObject ( instances ) ) return;

        instances[Widget.config.Name] = [];

      },

      plugin ( Widget ) {

        Plugin.make ( Widget );

      },

      ready ( Widget ) {

        Readify.add ( Widget );

      },

      widgetize ( Widget ) {

        Widgetize.add ( Widget );

      }

    },

    /* UNMAKERS */

    unmakers: {

      order: ['widgetize', 'ready', 'plugin', 'instances', 'namespace', 'configure'], // The order in which the unmakers will be called

      configure ( Widget ) {

        delete Widget.config.Name;
        delete Widget.config;

      },

      namespace ( Widget, namespace ) {

        if ( !_.isObject ( namespace ) ) return;

        delete namespace[Widget.config.Name];

      },

      instances ( Widget, namespace, instances ) {

        if ( !_.isObject ( instances ) ) return;

        _.forEachRight ( instances[Widget.config.Name], instance => instance.destroy () );

        delete instances[Widget.config.Name];

      },

      plugin ( Widget ) {

        Plugin.unmake ( Widget );

      },

      ready ( Widget ) {

        Readify.remove ( Widget );

      },

      widgetize ( Widget ) {

        Widgetize.remove ( Widget );

      }

    }

  };

  /* EXPORT */

  Svelto.Factory = Factory;

}( Svelto.$, Svelto._, Svelto, Svelto.Instances, Svelto.Widgets, Svelto.Plugin, Svelto.Readify, Svelto.Widgetize ));


/* =========================================================================
 * Svelto - Core - Widget
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./helpers.js
 * @require core/breakpoint/breakpoint.js
 * @require core/breakpoints/breakpoints.js
 * @require core/factory/factory.js
 * @require core/keyboard/keyboard.js
 * @require core/layout/helpers.js
 * @require core/pointer/pointer.js
 * @require core/route/route.js
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto, Instances, Templates, Widgets, Factory, Pointer, Keyboard, Breakpoints, Breakpoint ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'widget', // The name of widget, it will be used for the the jQuery pluing `$.fn[name]` and for triggering widget events `name + ':' + event`
    plugin: false, // A boolean that defines wheter the Widget is also a jQuery plugin or not
    selector: false, // The selector used to select the website in the DOM, used for `Svelto.Widgetize`
    templates: { // Object containing lodash template strings
      base: false // It will be used as the constructor if no element is provided
    },
    options: {
      characters: {}, // Used to store some characters needed by the widget
      regexes: {}, // Contains the used regexes
      messages: { // Messages that the widget somewhere outputs, maybe with a `$.toast`, maybe just logs it
        error: 'An error occurred, please try again later'
      },
      attributes: {}, // Attributes used by the widget
      datas: {}, // CSS data-* names
      classes: { // CSS classes to attach inside the widget
        disabled: 'disabled', // Attached to disabled widgets
        hidden: 'hidden' // Used to hide an element
      },
      selectors: {}, // Selectors to use inside the widget
      animations: {}, // Object storing all the milliseconds required for each animation to occur
      breakpoints: { // Actions to be executed at specifc breakpoints, every key/val pair should be in the form of `breakpoint-name`: `action`, where `breakpoint-name` is a key of `Breakpoints` and `action` in a defined method (e.g. `xsmall`: `close`). In addition to this every pair must be specified under one of the following keys: `up`, `down`, `only`, mimicking the respective SCSS mixins
        up: false,
        down: false,
        only: false
      },
      keyboard: true, // Enable or disable the use of the keyboard, basically disables keystrokes and other keyboard-based interaction
      keystrokes: {}, // Easy way to automatically bind keystrokes to specific methods calls. For example: `{ 'ctrl + o': 'open', Keyaboard.keys.UP: 'up' }`. You can also pass variables to the method. For example: `{ 'ctrl + o': ['open', true], Keyaboard.keys.UP: ['open', array ( 1, 2 )] }`
      callbacks: {} // Callbacks to trigger on specific events
    }
  };

  /* WIDGET */

  class Widget {

    /* WIDGETIZE */

    static widgetize ( ele, Widget ) { // Called for widgetizing an element

      $.widget.get ( ele, Widget );

    }

    /* READY */

    static ready ( done ) { // Called when the DOM is `ready`

      done ();

    }

    static isReady () {

      return !!this._ready;

    }

    static whenReady ( callback ) {

      let isReady = this.isReady || this.__proto__.isReady || Widget.isReady; //IE10 support -- static property

      if ( isReady.bind ( this )() ) {

        callback ();

      } else {

        this._readyQueue.push ( callback );

      }

    }

    static _initReady () {

      this._ready = false;
      this._readyQueue = [];

    }

    static _setReady () {

      this._ready = true;

      for ( let callback of this._readyQueue ) {

        callback ();

      }

      this._readyQueue = [];

    }

    /* CONSTRUCTION */

    constructor ( options, element ) {

      /* ATTACH CONFIG */

      options = _.isObject ( options ) ? options : undefined;

      _.extend ( this, this._getConfig ( options, element ) );

      /* INSTANCES */

      Instances[this.Name].push ( this );

      /* CACHE TEMPLATES */

      if ( !( this.Name in Templates ) ) {

        Templates[this.Name] = {};

        let options = { //TODO: Maybe export them
          imports: {
            Svelto,
            Templates,
            self: Templates[this.Name]
          },
          variable: 'o'
        };

        for ( let template in this.templates ) {

          if ( !this.templates.hasOwnProperty ( template ) || !this.templates[template] ) continue;

          Templates[this.Name][template] = _.template ( this.templates[template], options );

        }

      }

      /* ELEMENT */

      this.$element = $( element ||  ( this.templates.base ? this._template ( 'base', this.options ) : undefined ) );
      this.element = this.$element[0];

      /* LAYOUT */

      this.$layout = $.getLayoutOf ( this.$element );
      this.layout = this.$layout[0];

      /* BINDINGS */

      this.$bindings = $.$empty;

      /* ATTACH INSTANCE */

      if ( this.element ) {

        $.widget.set ( this.element, this );

      }

      /* SET GUID / GUC */

      this.guid = $.guid++;
      this.guc = this.name + '-' + this.guid;

      /* EVENT NAMESPACE */

      this.eventNamespace = `.swns-${this.guid}`;

      /* LOCKS */

      this._locks = {};
      this._lockQueues = {};

      /* CALLBACKS */

      if ( this._make ()      === false ) return this.destroy ();
      if ( this._variables () === false ) return this.destroy ();
      if ( this._init ()      === false ) return this.destroy ();
      if ( this._events ()    === false ) return this.destroy ();

      /* BREAKPOINT */

      let {up, down, only} = this.options.breakpoints;

      if ( up || down || only ) {

        this.___breakpoint (); // It must be inited before calling `__breakpoint`, since that when `__breakpoint` gets called it may want to reset it (not inited yet) and init it again (with a result of double binding)
        this.__breakpoint ();

      }

      /* REMOVE */

      this.___remove ();

    }

    _getConfig ( options, element ) {

      /* VARIABLES */

      let config = this._getConfigInherited (),
          configs = [config];

      /* DATA OPTIONS */

      if ( element ) {

        let dataOptions = element.getAttribute ( 'data-options' );

        if ( dataOptions ) {

          configs.push ({ options: JSON.parse ( dataOptions ) });

        }

        let dataNameOptions = element.getAttribute ( `data-${config.name}-options` );

        if ( dataNameOptions ) {

          configs.push ({ options: JSON.parse ( dataNameOptions ) });

        }

      }

      /* OPTIONS */

      if ( options ) {

        configs.push ({ options });

      }

      /* CREATE OPTIONS */

      let createOptions = this._createOptions ();

      if ( createOptions ) {

        configs.push ({ options: createOptions });

      }

      /* RETURN */

      return configs.length > 1 ? _.merge ( {}, ...configs ) : _.cloneDeep ( config );

    }

    _getConfigInherited () {

      /* BASE */

      let prototype = Object.getPrototypeOf ( this ),
          constructor = prototype.constructor,
          config = constructor.config;

      if ( config._inherited ) return config;

      /* CONFIGS */

      let configs = [config];

      /* INHERITANCE CHAIN CHAIN */

      prototype = Object.getPrototypeOf ( prototype );

      while ( prototype ) {

        if ( !prototype.constructor.config ) break;

        configs.push ( prototype.constructor.config );

        prototype = Object.getPrototypeOf ( prototype );

      }

      configs.push ( {} ); // So that we merge them into a new object

      configs.reverse ();

      /* RETURN */

      config = _.merge ( ...configs );

      config._inherited = true;

      constructor.config = config;

      return config;

    }

    _createOptions () {} // Used to pass extra options

    /* DESTROY */

    destroy () {

      this._reset ();

      this._destroy ();

      _.pull ( Instances[this.Name], this );

      if ( this.element ) {

        $.widget.remove ( this.element, this );

      }

    }

    _destroy () {} // Clean the stuff, remove possible memory leaks

    /* SPECIAL */

    _make () {} // Creates the widget, if necessary
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

          if ( !key.hasOwnProperty ( prop ) ) continue;

          this._setOption ( key, value );

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

    /* LOCKING */

    lock ( namespace ) {

      this._locks[namespace] = true;

    }

    unlock ( namespace ) {

      delete this._locks[namespace];

      if ( this._lockQueues[namespace] ) {

        for ( let callback of this._lockQueues[namespace] ) {

          callback ();

        }

        delete this._lockQueues[namespace];

      }

    }

    isLocked ( namespace ) {

      return !!this._locks[namespace];

    }

    whenUnlocked ( namespace, callback ) {

      if ( !callback ) {

        callback = namespace;
        namespace = undefined;

      }

      if ( !this.isLocked ( namespace ) ) {

        callback ();

      } else {

        if ( !this._lockQueues[namespace] ) this._lockQueues[namespace] = [];

        this._lockQueues[namespace].push ( callback );

      }

    }

    /* EVENTS */

    //TODO: Add support for custom data

    _on ( suppressDisabledCheck, $element, events, selector, handler, _onlyOne ) {

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

        if ( !suppressDisabledCheck && this.$element.hasClass ( this.options.classes.disabled ) ) return;

        return handler.apply ( this, args );

      };

      /* PROXY GUID */

      handlerProxy.guid = handler.guid = ( handler.guid || $.guid++ );

      /* EVENTS NAMESPACING */

      events = $.eventNamespacer ( events, this.eventNamespace );

      /* TRIGGERING */

      $element[_onlyOne ? 'one' : 'on'] ( events, selector, handlerProxy );

    }

    _one ( ...args ) {

      return this._on ( ...args, true );

    }

    _onHover ( $element, args ) {

      /* NORMALIZATION */

      if ( !args ) {

        args = $element;
        $element = this.$element;

      }

      /* BINDING */

      this._on ( $element, Pointer.enter, () => this._on ( ...args ) );
      this._on ( $element, Pointer.leave, () => this._off ( ...args ) );

    }

    //TODO: Maybe add a _offHover, is it needed?

    _off ( $element, events, handler ) {

      /* NORMALIZATION */

      if ( !handler && !($element instanceof $) ) {

        handler = events;
        events = $element;
        $element = this.$element;

      }

      /* EVENTS NAMESPACING */

      events = $.eventNamespacer ( events, this.eventNamespace );

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

          if ( !originalEvent.hasOwnProperty ( prop ) ) continue;
          if ( prop in event ) continue;

          event[prop] = originalEvent[prop];

        }

      }

      /* TRIGGERING */

      this.$element.trigger ( event, data );

      return !( this.options.callbacks[type].apply ( this.element, [event].concat ( data ) ) === false || event.isDefaultPrevented () );

    }

    /* ROUTE */

    ___route () {

      this._on ( true, $.$window, 'route', this.__route );

    }

    /* BREAKPOINT */

    ___breakpoint () {

      this._on ( true, $.$window, 'breakpoint:change', this.__breakpoint );

    }

    __breakpoint () {

      let width = Breakpoints.widths[Breakpoint.current];

      /* UP */

      if ( this.options.breakpoints.up ) {

        for ( let breakpoint in this.options.breakpoints.up ) {

          if ( !this.options.breakpoints.up.hasOwnProperty ( breakpoint ) ) continue;

          if ( width >= Breakpoints.widths[breakpoint] ) {

            this[this.options.breakpoints.up[breakpoint]]();

          }

        }

      }

      /* DOWN */

      if ( this.options.breakpoints.down ) {

        for ( let breakpoint in this.options.breakpoints.down ) {

          if ( !this.options.breakpoints.down.hasOwnProperty ( breakpoint ) ) continue;

          if ( width <= Breakpoints.widths[breakpoint] ) {

            this[this.options.breakpoints.down[breakpoint]]();

          }

        }

      }

      /* ONLY */

      if ( this.options.breakpoints.only ) {

        for ( let breakpoint in this.options.breakpoints.only ) {

          if ( !this.options.breakpoints.only.hasOwnProperty ( breakpoint ) ) continue;

          if ( width === Breakpoints.widths[breakpoint] ) {

            this[this.options.breakpoints.only[breakpoint]]();

          }

        }

      }

    }

    /* KEYDOWN */

    ___keydown () {

      this._on ( $.$document, 'keydown', this.__keydown );

    }

    __keydown ( event ) {

      if ( !this.options.keyboard ) return;

      for ( let keystrokes in this.options.keystrokes ) {

        if ( !this.options.keystrokes.hasOwnProperty ( keystrokes ) ) continue;

        for ( let keystroke of keystrokes.split ( ',' ) ) {

          if ( !Keyboard.keystroke.match ( event, keystroke ) ) continue;

          let toCall = this.options.keystrokes[keystrokes],
              method = _.isArray ( toCall ) ? toCall[0] : toCall,
              args   = _.isArray ( toCall ) ? _.castArray ( toCall[1] ) : [];

          if ( this[method].apply ( this, args ) !== null ) {

            event.preventDefault ();
            event.stopImmediatePropagation ();

          }

          return;

        }

      }

    }

    /* REMOVE */

    ___remove () {

      if ( this.element ) {

        this._on ( true, 'remove', this.__remove );

      }

    }

    __remove ( event ) {

      if ( !event || event.target === this.element ) {

        this.destroy ();

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

    /* FRAMES */

    _frames ( fn ) {

      let framed = _.frames ( fn );

      framed.guid = fn.guid = ( fn.guid || $.guid++ );

      return framed;

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

    _template ( name, options = {} ) {

      return Templates[this.Name][name] ( options );

    }

    /* INSERTION */

    before ( ...content ) {

      this.$element.before ( ...content );

    }

    insertBefore ( target ) {

      this.$element.insertBefore ( target );

    }

    after ( ...content ) {

      this.$element.after ( ...content );

    }

    insertAfter ( target ) {

      this.$element.insertAfter ( target );

    }

    prependTo ( target ) {

      this.$element.prependTo ( target );

    }

    appendTo ( target ) {

      this.$element.appendTo ( target );

    }

  }

  /* FACTORY */

  Factory.make ( Widget, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Instances, Svelto.Templates, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Keyboard, Svelto.Breakpoints, Svelto.Breakpoint ));


/* =========================================================================
 * Svelto - Widgets - ClassSwitch
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @priority 800
 * @require core/widget/widget.js
 * ========================================================================= */

//TODO: Maybe rename it

(function ( $, _, Svelto, Widgets, Factory, Breakpoints, Breakpoint ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'classSwitch',
    plugin: true,
    selector: '.class-switch',
    options: {
      switch: { // Classes to attach at specifc breakpoints, every key/val pair should be in the form of `breakpoint-name`: `class`, where `breakpoint-name` is a key of `Breakpoints` and `class` can be any class string. In addition to this every pair must be specified under one of the following keys: `up`, `down`, `only`, mimicking the respective SCSS mixins
        up: {},
        down: {},
        only: {}
      }
    }
  };

  /* CLASS SWITCH */

  class ClassSwitch extends Widgets.Widget {

    /* SPECIAL */

    _init () {

      this.status = { up: {}, down: {}, only: {} };

      this._populate ();

      this.__classSwitch ();

    }

    _events () {

      this.___classSwitch ();

    }

    /* POPULATE */

    _populateBreakpoint ( breakpoint ) {

      let name = Breakpoints[breakpoint];

      /* UP */

      let up = this.$element.data ( `${name}-up` );

      if ( _.isString ( up ) ) {

        this.options.switch.up[breakpoint] = up;

      }

      /* DOWN */

      let down = this.$element.data ( `${name}-down` );

      if ( _.isString ( down ) ) {

        this.options.switch.down[breakpoint] = down;

      }

      /* ONLY */

      let specific = this.$element.data ( `${name}-only` ),
          general = this.$element.data ( name ),
          only = _.isString ( specific ) ? specific : ( _.isString ( general ) ? general : undefined );

      if ( _.isString ( only ) ) {

        this.options.switch.only[breakpoint] = only;

      }

    }

    _populate () {

      for ( let key in Breakpoints ) {

        if ( !Breakpoints.hasOwnProperty ( key ) ) continue;

        if ( !_.isString ( Breakpoints[key] ) ) continue;

        this._populateBreakpoint ( key );

      }

    }

    /* STATUS */

    _getStatus () {

      let status = { up: {}, down: {}, only: {} },
          width = Breakpoints.widths[Breakpoint.current];

      /* UP */

      for ( let breakpoint in this.options.switch.up ) {

        if ( !this.options.switch.up.hasOwnProperty ( breakpoint ) ) continue;

        let active = ( width >= Breakpoints.widths[breakpoint] );

        status.up[breakpoint] = active;

      }

      /* DOWN */

      for ( let breakpoint in this.options.switch.down ) {

        if ( !this.options.switch.down.hasOwnProperty ( breakpoint ) ) continue;

        let active = ( width <= Breakpoints.widths[breakpoint] );

        status.down[breakpoint] = active;

      }

      /* ONLY */

      for ( let breakpoint in this.options.switch.only ) {

        if ( !this.options.switch.only.hasOwnProperty ( breakpoint ) ) continue;

        let active = ( width === Breakpoints.widths[breakpoint] );

        status.only[breakpoint] = active;

      }

      return status;

    }

    _getDeltaStatus ( previous, current ) {

      let delta = { up: {}, down: {}, only: {} };

      for ( let type in current ) {

        if ( !current.hasOwnProperty ( type ) ) continue;

        for ( let breakpoint in current[type] ) {

          if ( !current[type].hasOwnProperty ( breakpoint ) ) continue;

          if ( !!previous[type][breakpoint] !== !!current[type][breakpoint] ) {

            delta[type][breakpoint] = !!current[type][breakpoint];

          }

        }

      }

      return delta;

    }

    /* CLASS SWITCH */

    ___classSwitch () {

      this._on ( true, $.$window, 'breakpoint:change', this.__classSwitch );

    }

    __classSwitch () {

      let status = this._getStatus (),
          delta = this._getDeltaStatus ( this.status, status );

      for ( let type in delta ) {

        if ( !delta.hasOwnProperty ( type ) ) continue;

        for ( let breakpoint in delta[type] ) {

          if ( !delta[type].hasOwnProperty ( breakpoint ) ) continue;

          this.$element.toggleClass ( this.options.switch[type][breakpoint], delta[type][breakpoint] );

        }

      }

      this.status = status;

    }

  }

  /* FACTORY */

  Factory.make ( ClassSwitch, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Breakpoints, Svelto.Breakpoint ));


/* =========================================================================
 * Svelto - Widgets - Justified Layout (Calculator)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

//TODO: normal image + ultra-wide image looks bad, we should add the ultra wide one to its own row, and move the other image to the next row ( http://localhost:8888/most/viewed/13)
//TODO: limit ultra portrait images height

(function ( $, _, Svelto ) {

  'use strict';

  /* DEFAULTS */

  let defaults = {
    container: {
      width: 1048,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    row: {
      height: 250, // Target row's height
      margin: 5, // Vertical margin between rows
      boxes: {
        min: 1, // Minimum number of boxes in the row
        max: Infinity, // Maximum number of boxes in the row
      },
      tolerance: {
        min: .85, // Tunes the minimum ratio
        max: 1.85 // Tunes the maximum ratio
      },
      widows: { // Row not completelly filled with boxes
        show: true, // Compute boxes for widows
        average: true, // Set the height to the average of the previous heights
        justify: false, // Set the height so that no space is left unfilled
        previous: false // Set the height to that of the previous row
      }
    },
    box: {
      margin: 5, // Horizontal margin between boxes
      ratio: undefined // Fixed ratio for all boxes
    }
  };

  /* CALCULATOR */

  function calculator ( ratios, options, _needsMerge = true ) {

    if ( !options || _needsMerge ) {

      options = options ? _.merge ( {}, calculator.defaults, options ) : calculator.defaults;

    }

    ratios = options.box.ratio ? _.fill ( Array ( ratios.length ), options.box.ratio ) : ratios;

    let boxes = _.isNumber ( ratios[0] ) ? ratios.map ( ratio => ({ratio}) ) : ratios;

    return makeLayout ( options, boxes );

  }

  /* ROW */

  const row = { //FIXME: It's global-ish, which it's bad, but it's fast

    init ( options, layout ) {

      this.options = options;
      this.layout = layout;
      this.width = this.options.container.width - this.options.container.padding.left - this.options.container.padding.right;
      this.height = 0;
      this.ratio = 0;
      this.left = this.options.container.padding.left;
      this.top = this.layout.height - this.options.container.padding.bottom;
      this.minRatio = this.width / this.options.row.height * this.options.row.tolerance.min;
      this.maxRatio = this.width / this.options.row.height * this.options.row.tolerance.max;
      this.boxesStartIndex = this.layout.boxesIndex;
      this.boxesNr = 0;

      this._complete = false;

    },

    forEachBox ( callback ) {

      let index = 0;

      for ( let i = this.boxesStartIndex, l = this.layout.boxesIndex; i < l; i++ ) {

        callback ( this.layout.boxes[i], index++ );

      }

    },

    _add ( box ) { // Actually add the box

      this.layout.boxes[this.layout.boxesIndex++] = box;

      this.boxesNr++;

      this.ratio += box.ratio;

    },

    add ( box ) {

      let newRatio = this.ratio + box.ratio,
          widthWithoutMargin = this.width - ( this.boxesNr * this.options.row.margin );

      if ( newRatio < this.minRatio || this.boxesNr < this.options.row.boxes.min ) { // There's enough space for this and probably another box

        this._add ( box );

        if ( this.boxesNr >= this.options.row.boxes.max || ( this.boxesNr > this.options.row.boxes.min && newRatio >= this.maxRatio ) ) {

          this.complete ( widthWithoutMargin / newRatio );

        }

        return true;

      } else if ( newRatio > this.maxRatio ) { // Maybe there's space for this

        if ( !this.boxesNr ) { // It's the only box, so it's added

          this._add ( box );

          this.complete ( widthWithoutMargin / newRatio );

          return true;

        }

        let prevWidthWithoutMargin = this.width - ( this.boxesNr - 1 ) * this.options.row.margin,
            prevTargetRatio = prevWidthWithoutMargin / this.options.row.height,
            newTargetRatio = widthWithoutMargin / this.options.row.height;

        if ( Math.abs ( newRatio - newTargetRatio ) > Math.abs ( this.ratio - prevTargetRatio ) ) { // The ratio is closer to the ranges without it

          this.complete ( prevWidthWithoutMargin / this.ratio );

          return false;

        } else { // The ratio is clsoer to the ranges with it

          this._add ( box );

          this.complete ( widthWithoutMargin / newRatio );

          return true;

        }

      } else { // Fills perfectly the space

        this._add ( box );

        this.complete ( widthWithoutMargin / newRatio );

        return true;

      }

    },

    isComplete () {

      return this._complete;

    },

    complete ( height = this.options.row.height, isWidows = false ) { // Set metadata on boxes

      this.height = height;

      if ( isWidows && !this.options.row.widows.justify ) { // Checking for sane height values

        let maxHeight;

        if ( this.options.container.width !== Infinity ) {

          let widthWithoutMargin = this.width - ( ( this.boxesNr - 1 ) * this.options.row.margin );

          maxHeight = widthWithoutMargin / this.ratio;

        } else {

          maxHeight = this.options.row.height;

        }

        this.height = _.isNaN ( this.height ) ? maxHeight : Math.min ( maxHeight, this.height );

      }

      let boxLeft = this.left;

      this.forEachBox ( box => {

        box.width = box.ratio * this.height;
        box.height = this.height;
        box.top = this.top;
        box.left = boxLeft;

        boxLeft += box.width + this.options.box.margin;

      });

      boxLeft -= ( this.options.box.margin + this.left );

      if ( isWidows && this.options.row.widows.justify ) {

        let errorWidthPerItem = ( this.width - boxLeft ) / this.boxesNr;

        if ( errorWidthPerItem ) {

          this.forEachBox ( ( box, i ) => {

            let currentWidth = ( i + 1 ) * errorWidthPerItem,
                previousWidth = i ? currentWidth - errorWidthPerItem : 0,
                deltaWidth = ( currentWidth - previousWidth ),
                deltaHeight = deltaWidth / box.ratio;

            box.left += previousWidth;
            box.width += deltaWidth;
            box.height += deltaHeight;

            if ( !i ) {
              this.height += deltaHeight;
            }

          });

        }

      }

      this._complete = true;

    }

  };

  /* HELPERS */

  function addRow ( options, layout ) {

    layout.heights[layout.heightsIndex++] = row.height;

    layout.height += row.height + options.row.margin;

  }

  function addRowWidows ( options, layout ) {

    layout.widows = row.boxesNr;

    if ( row.isComplete () || options.row.widows.show ) {

      if ( !row.isComplete () ) {

        let height = options.row.widows.justify
                       ? undefined
                       : !layout.heightsIndex
                         ? options.row.height
                         : options.row.widows.average
                           ? layout.height / layout.heightsIndex
                           : options.row.widows.previous
                             ? layout.heights[layout.heightsIndex - 1]
                             : undefined;

        row.complete ( height, true );

      }

      addRow ( options, layout );

    } else {

      layout.boxesIndex = row.boxesStartIndex;

    }

  }

  function addBox ( options, layout, box ) {

    let added = row.add ( box );

    if ( row.isComplete () ) {

      addRow ( options, layout );

      row.init ( options, layout );

      if ( !added ) addBox ( options, layout, box );

    }

  }

  function makeLayout ( options, boxes ) {

    let layout = {
      width: options.container.width,
      height: options.container.padding.top + options.container.padding.bottom,
      heights: Array ( boxes.length ),
      heightsIndex: 0,
      boxes: Array ( boxes.length ),
      boxesIndex: 0,
      widows: 0
    };

    row.init ( options, layout );

    boxes.forEach ( box => addBox ( options, layout, box ) );

    if ( row.boxesNr ) {
      addRowWidows ( options, layout );
    }

    if ( layout.heightsIndex !== boxes.length ) {
      layout.heights = layout.heights.slice ( 0, layout.heightsIndex );
    }

    if ( layout.boxesIndex !== boxes.length ) {
      layout.boxes = layout.boxes.slice ( 0, layout.boxesIndex );
    }

    if ( layout.heightsIndex ) {
      layout.height -= options.row.margin;
    }

    return layout;

  }

  /* BINDINGS */

  calculator.defaults = defaults;

  /* EXPORT */

  Svelto.justifiedLayoutCalculator = calculator;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Widgets - Justified Layout
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @priority 750
 * @require ./calculator.js
 * @require core/widget/widget.js
 * ========================================================================= */

//TODO: In case we have `normal image + very wide image` add an option for swapping them

(function ( $, _, Svelto, Widgets, Widgetize, Factory, calculator ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'justifiedLayout',
    plugin: true,
    selector: '.justified-layout',
    options: {
      calculatorOptions: {}, // Custom options to pass to `justifiedLayoutCalculator`
      oneRow: false, // Switch to `One Row` logic
      oneRowHeights: [110, calculator.defaults.row.height], // Min and Max height, adjusted according to the viewport size
      singleRowBelowWidth: 500, // Force 1 box per row below this width
      sizes: {
        set: true, // Set the `sizes` attribute of the found images
        threshold: 50 // It will be re-set if the previous differs by at least this amount of pixels
      },
      classes: {
        onerow: 'onerow',
        rendered: 'rendered'
      },
      selectors: {
        boxes: '> *'
      },
      callbacks: {
        firstrender: _.noop,
        render: _.noop
      }
    }
  };

  /* JUSTIFIED LAYOUT */

  class JustifiedLayout extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.justified = this.element;
      this.$justified = this.$element;

      this.$boxes = this.$justified.find ( this.options.selectors.boxes );
      this.options.oneRow = this.$justified.hasClass ( this.options.classes.onerow ) || this.options.oneRow;

    }

    _init () {

      this.render ();

    }

    _events () {

      this._on ( true, $.$window, 'resize', this._frames ( this.render.bind ( this ) ) );

    }

    /* PRIVATE */

    _getImages () {

      if ( this._images ) return this._images;

      this._images = this.$boxes.get ().map ( box => Widgetize._getWidgets ( 'img', $(box) ).get ()[0] ); //FIXME: Ugly, `Widgetize._getWidgets` should be an external utility

      return this._images;

    }

    async _box2ratio ( box ) {

      let ratio = box.getAttribute ( 'data-ratio' );

      if ( ratio ) return Number ( ratio );

      let img = $(box).find ( 'img' )[0];

      if ( !img ) return;

      let imgRatio = img.getAttribute ( 'width' ) / img.getAttribute ( 'height' );

      if ( imgRatio ) return imgRatio;

      return new Promise ( resolve => { //FIXME: Won't work that good if the image takes forever to load, or doesn't load at all
        img.onload = ({srcElement}) => resolve ( srcElement.width / srcElement.height );
      });

    }

    async _getCalculatorRatios () {

      if ( this._ratios ) return this._ratios;

      this._ratios = ( await Promise.all ( this.$boxes.get ().map ( this._box2ratio ) ) ).map ( ratio => ({ratio}) );

      return this._ratios;

    }

    _getCalculatorOptions () {

      if ( !this._options ) this._options = _.merge ( {}, calculator.defaults, this.options.calculatorOptions );

      if ( this.options.oneRow ) {

        this._options.container.width = Infinity;
        this._options.row.boxes.min = Infinity;

        if ( this.options.oneRowHeights ) {

          this._options.row.height = _.clamp ( ( 1 / 11 * this.justified.offsetWidth ) + 90, this.options.oneRowHeights[0], this.options.oneRowHeights[1] );

        }

      } else {

        this._options.container.width = this.justified.offsetWidth;
        this._options.row.boxes.max = this._options.container.width <= this.options.singleRowBelowWidth ? 1 : calculator.defaults.row.maxBoxesNr;

      }

      return this._options;

    }

    /* API */

    isRendered () {

      return !!this._rendered;

    }

    async render () {

      let ratios = await this._getCalculatorRatios (),
          images = this._getImages (),
          options = this._getCalculatorOptions (),
          layout = calculator ( ratios, options, false );

      this.$justified.height ( layout.height );

      layout.boxes.forEach ( ( layout, i ) => {
        let box = this.$boxes[i];
        box.style.width = `${layout.width}px`;
        box.style.height = `${layout.height}px`;
        if ( !this.options.oneRow ) {
          box.style.top = `${layout.top}px`;
          box.style.left = `${layout.left}px`;
        }
        let image = images[i];
        if ( this.options.sizes.set && image && ( !this.options.sizes.threshold || !image.__justified_layout_sizes || Math.abs ( image.__justified_layout_sizes - layout.width ) >= this.options.sizes.threshold ) ) {
          image.setAttribute ( 'sizes', `${layout.width}px` );
          image.__justified_layout_sizes = layout.width;
        }
      });

      if ( !this._rendered ) {

        this.$justified.addClass ( this.options.classes.rendered );

        this._rendered = true;

        this._trigger ( 'firstrender' );

      }

      this._trigger ( 'render' );

    }

  }

  /* FACTORY */

  Factory.make ( JustifiedLayout, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Widgetize, Svelto.Factory, Svelto.justifiedLayoutCalculator ));


/* =========================================================================
 * Svelto - Widgets - Lazy (Worker)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

//TODO: Add a good way of extending the default options

(function ( $, _, Svelto ) {

  'use strict';

  /* CONFIG */

  const defaults = {
    thresholds: {
      x: 200,
      y: 450
    },
    multipliers: {
      dynamic: {
        enabled: true,
        factor: 1,
        multiplier: 1.05
      },
      default: {
        x: 1,
        y: 1
      },
      scroll: {
        x: 1.25,
        y: 1.5
      },
      firstScroll: {
        x: 1.5,
        y: 2
      }
    }
  };

  /* LAZY WORKER */

  class LazyWorker {

    /* SPECIAL */

    constructor () {

      this.options = defaults;

      this.groups = {};

      this.__scroll = _.frames ( this.__scroll.bind ( this ) );
      this.__resize = _.frames ( this.__resize.bind ( this ) );

    }

    /* EVENTS */

    ___events () {

      if ( this._eventsOn ) return;

      this._eventsOn = true;

      $.$document.on ( 'scroll', this.__scroll );
      $.$window.on ( 'resize', this.__resize );

    }

    ___events_off () {

      if ( !this._eventsOn ) return;

      this._eventsOn = false;

      $.$document.off ( 'scroll', this.__scroll );
      $.$window.off ( 'resize', this.__resize );

    }

    /* SCROLL */

    __scroll ( event ) {

      this.process ( this._scrolled ? this.options.multipliers.scroll : this.options.multipliers.firstScroll );

      this._scrolled = true;

    }

    /* RESIZE */

    __resize () {

      this.process ();

    }

    /* UTILITIES */

    _shouldLoad ( $element, multipliers, _windowWidth, _windowHeight ) {

      let windowWidth = _windowWidth || $.window.innerWidth,
          windowHeight = _windowHeight || $.window.innerHeight,
          eRect = $element.getRect (),
          deltaX = this.options.thresholds.x * multipliers.x * this.options.multipliers.dynamic.factor,
          deltaY = this.options.thresholds.y * multipliers.y * this.options.multipliers.dynamic.factor;

      return eRect.top - windowHeight <= deltaY &&
             eRect.left - windowWidth <= deltaX &&
             $element.isVisible ();

    }

    /* API */

    add ( widget, $element, group ) { //TODO: Process only new elements

      if ( !this.groups[group] ) this.groups[group] = [];

      this.groups[group].push ([ widget, $element ]);

      if ( this._addId ) clearTimeout ( this._addId );

      this._addId = setTimeout ( () => {
        this._addId = false;
        this.process ();
      }, 10 );

    }

    process ( multipliers = this.options.multipliers.default, onlyGroup ) {

      let hadElements = false,
          hasLeftovers = false,
          hasLoaded = false,
          isOnlyGroup = !_.isUndefined ( onlyGroup ),
          windowWidth = $.window.innerWidth,
          windowHeight = $.window.innerHeight;

      onlyGroup = String ( onlyGroup );

      for ( let group in this.groups ) {

        if ( !this.groups.hasOwnProperty ( group ) ) continue;
        if ( isOnlyGroup && group !== onlyGroup ) continue;

        hadElements = true;

        let queue = this.groups[group],
            isGroup = group !== 'undefined',
            leftovers = isGroup ? undefined : [],
            leftoversIndex = -1;

        for ( let i = 0, l = queue.length; i < l; i++ ) {

          let item = queue[i],
              [widget, $element] = item;

          if ( this._shouldLoad ( $element, multipliers, windowWidth, windowHeight ) ) {

            hasLoaded = true;

            widget.load ();

          } else {

            if ( isGroup ) {

              leftoversIndex = i;

              break;

            } else {

              leftovers.push ( item );

            }

          }

        }

        if ( isGroup && leftoversIndex >= 0 ) leftovers = queue.slice (  leftoversIndex );

        if ( leftovers && leftovers.length ) {

          hasLeftovers = true;

          this.groups[group] = leftovers;

        } else {

          delete this.groups[group];

        }

      }

      if ( !hadElements ) return;

      if ( hasLoaded && this.options.multipliers.dynamic.enabled ) {

        this.options.multipliers.dynamic.factor *= this.options.multipliers.dynamic.multiplier;

      }

      if ( !isOnlyGroup ) {

        this[hasLeftovers ? '___events' : '___events_off']();

      }

      return !hasLeftovers; // Completed?

    }

  }

  /* EXPORT */

  Svelto.LazyWorker = new LazyWorker ();
  Svelto.LazyWorker.defaults = defaults;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Widgets - Lazy
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * @require ./worker.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, LazyWorker ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'lazy',
    options: {
      datas: {
        group: 'group'
      },
      callbacks: {
        load: _.noop
      }
    }
  };

  /* LAZY */

  class Lazy extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.group = this.$element.data ( this.options.datas.group );

    }

    _init () {

      LazyWorker.add ( this, this.$element, this.group );

    }

    /* API */

    load () {

      this._trigger ( 'load' );

      this.destroy ();

    }

  }

  /* FACTORY */

  Factory.make ( Lazy, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.LazyWorker ));


/* =========================================================================
 * Svelto - Widgets - Lazy - Image
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @priority 700
 * @require ../lazy.js
 * ========================================================================= */

//TODO: Add <picture/> support

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'lazyImage',
    plugin: true,
    selector: 'img.lazy',
    options: {
      datas: {
        src: 'src',
        srcset: 'srcset',
        sizes: 'sizes'
      }
    }
  };

  /* LAZY IMAGE */

  class LazyImage extends Widgets.Lazy {

    /* API */

    load () {

      let attrs = ['src', 'srcset', 'sizes'],
          datas = attrs.map ( attr => this.$element.data ( this.options.datas[attr] ) );

      datas.forEach ( ( data, index ) => data && this.$element.attr ( attrs[index], data ) );

      super.load ();

    }

  }

  /* FACTORY */

  Factory.make ( LazyImage, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Lazy - Group
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @priority 650
 * @require core/widget/widget.js
 * @require ../worker.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, LazyWorker ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'lazyGroup',
    plugin: true,
    selector: '.lazy-group',
    options: {
      datas: {
        group: 'group'
      }
    }
  };

  /* LAZY GROUP */

  class Lazy extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.group = this.$element.data ( this.options.datas.group );

      this.__scroll = _.frames ( this.process.bind ( this ) );

    }

    _events () {

      this._on ( true, 'scroll', this.__scroll );

    }

    /* API */

    process () {

      if ( !LazyWorker.process ( undefined, this.group ) ) return;

      this._reset ();

    }

  }

  /* FACTORY */

  Factory.make ( Lazy, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.LazyWorker ));


/* =========================================================================
 * Svelto - Core - Animations
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* ANIMATIONS */

  let Animations = {
    xslow: 900,
    slow: 500,
    normal: 350,
    fast: 150,
    xfast: 75
  };

  /* EXPORT */

  Svelto.Animations = Animations;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Core - Colors
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* COLORS */

  let Colors = {
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

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Core - Sizes
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* SIZES */

  let Sizes = {
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

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Lib - Autofocus
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/browser/browser.js
 * @require core/readify/readify.js
 * ========================================================================= */

(function ( $, _, Svelto, Browser, Readify ) {

  'use strict';

  /* VARIABLES */

  let $html = $('html');

  /* AUTOFOCUS */

  let Autofocus = {

    /* VARIABLES */

    enabled: Browser.is.desktop,
    history: [], // List of autofocused elements
    historySize: 3, // How many elements to keep in the history

    /* INIT */

    init () {

      Autofocus.focus ( $html );

    },

    /* API */

    set ( ele ) {

      if ( !Autofocus.enabled ) return;

      Autofocus.history.unshift ( ele );
      Autofocus.history = _.uniq ( Autofocus.history ).slice ( 0, Autofocus.historySize );

      ele.focus ();

      /* CARET TO THE END */

      if ( ele.setSelectionRange ) {

        let length = ele.value.length * 2; // Double the length because Opera is inconsistent about whether a carriage return is one character or two

        if ( !length ) return;

        setTimeout ( () => ele.setSelectionRange ( length, length ), 1 ); // Timeout seems to be required for Blink

        ele.scrollTop = 1000000; // In case it's a tall textarea

      }

    },

    find ( $parent = $html, focused ) {

      let $focusable = $parent.find ( '[autofocus], .autofocus' ).filter ( ( i, ele ) => $.isVisible ( ele ) );

      if ( _.isBoolean ( focused ) ) {

        $focusable = $focusable.filter ( ( index, ele ) => $.isFocused ( ele ) === focused );

      }

      return $focusable.length ? $focusable[0] : null;

    },

    focus ( $parent ) {

      if ( !Autofocus.enabled ) return;

      let focusable = Autofocus.find ( $parent );

      if ( !focusable || $.isFocused ( focusable ) ) return;

      Autofocus.set ( focusable );

    },

    blur ( $parent ) {

      if ( !Autofocus.enabled || !Autofocus.history[0] || !$.contains ( $parent[0], Autofocus.history[0] ) ) return;

      let previous = Autofocus.history.find ( $.isVisible ) || Autofocus.find ( $html );

      if ( previous ) Autofocus.set ( previous );

    }

  };

  /* EXPORT */

  Svelto.Autofocus = Autofocus;

  /* READY */

  Readify.add ( Autofocus.init.bind ( Autofocus ) );

}( Svelto.$, Svelto._, Svelto, Svelto.Browser, Svelto.Readify ));


/* =========================================================================
 * Svelto - Lib - Fetch
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

//URL: https://github.com/developit/unfetch

//TODO: Add a demo for it

(function ( $, _, Svelto ) {

  'use strict';

  /* DEFAULTS */

  let defaults = {
    // url: 'https://example.com',
    method: 'get',
    // body: {},
    cache: true,
    credentials: 'include', // Include cookies
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    timeout: 0,
    notOKisError: true,
    request: () => new XMLHttpRequest (),
    beforesend: _.noop,
    error: _.noop,
    success: _.noop,
    complete: _.noop
  };

  /* FETCH */

  function fetch ( url, options ) {

    if ( !options && _.isPlainObject ( url ) ) {
      options = url;
      url = options.url;
    }

    options = _.merge ( {}, fetch.defaults, options );

    let isMethodCacheable = _.includes ( ['get', 'head'], options.method );

    if ( options.cache && isMethodCacheable && fetch.cache[url] ) return fetch.cache[url];

    if ( options.batchUrl ) return fetch.batch ( url, options.batchUrl, options );

    let response = new Promise ( ( resolve, reject ) => {

      let request = options.request ();

      if ( !options.cache && isMethodCacheable ) {
        url += ( url.includes ( '?' ) ? '&' : '?' ) + `anticache=${new Date ().getTime ()}`;
      }

      request.open ( options.method, url, true );
      request.timeout = options.timeout;
      request.withCredentials = ( options.credentials === 'include' );

      if ( _.isPlainObject ( options.body ) ) {

        _.extend ( options.headers, {
          'Content-Type': 'application/json'
        });

        options.body = JSON.stringify ( options.body );

      }

      _.forOwn ( options.headers, ( val, key ) => {
        request.setRequestHeader ( key, val );
      });

      request.onload = () => {
        let response = fetch.request2response ( request );
        if ( options.notOKisError && !response.ok ) {
          options.error ( response );
        } else {
          options.success ( response );
        }
        options.complete ( response );
        resolve ( response );
      };

      request.onerror = () => {
        let response = fetch.request2response ( request );
        options.error ( response );
        options.complete ( response );
        reject ( response );
      };

      options.beforesend ( request );

      request.send ( options.body );

    });

    if ( options.cache && isMethodCacheable ) fetch.cache[url] = response;

    return response;

  }

  /* BATCH */

  async function batch ( url, batchUrl, options ) {

    options = _.omit ( options, ['url', 'batchUrl'] );

    const responses = await ( await fetch ( batchUrl, options ) ).json ();

    _.forOwn ( responses, ( response, url ) => {

      const responseText = _.isString ( response ) ? response : JSON.stringify ( response );
      const request = {
        __fake: true,
        getAllResponseHeaders: () => '',
        status: 200,
        statusText: 'OK',
        responseURL: url,
        response: responseText,
        responseText
      };

      fetch.cache[url] = Promise.resolve ( fetch.request2response ( request ) );

    });

    return fetch.cache[url] || fetch ( url, options );

  }

  /* REQUEST 2 RESPONSE */

  function request2response ( request ) {

    let headers = {},
        headersKeys = [],
        headersEntries = [];

    request.getAllResponseHeaders ().replace ( /^(.*?):\s*([\s\S]*?)$/gm, ( match, key, value ) => {
      key = key.toLowerCase ();
      headersKeys.push ( key );
      headersEntries.push ([ key, value ]);
      let prevValue = headers[key];
      headers[key] = prevValue ? `${prevValue},${value}` : value;
    });

    return {
      request,
      ok: ( request.status / 200 | 0 ) === 1, // 200-299
      status: request.status,
      statusText: request.statusText,
      url: request.responseURL,
      clone: () => fetch.request2response ( request ),
      text: () => Promise.resolve ( request.responseText ),
      json: () => Promise.resolve ( JSON.parse ( request.responseText ) ),
      blob: () => Promise.resolve ( new Blob ([ request.response ]) ),
      headers: {
        keys: () => headersKeys,
        entries: () => headersEntries,
        get: key => headers[key.toLowerCase ()],
        has: key => key.toLowerCase () in headers
      }
    };

  }

  /* BINDING */

  fetch.batch = batch;
  fetch.defaults = defaults;
  fetch.cache = {};
  fetch.request2response = request2response;

  /* EXPORT */

  Svelto.fetch = fetch;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Lib - Storage
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

// TTL is expressed in seconds

(function ( $, _, Svelto ) {

  'use strict';

  /* STORAGE */

  let Storage = {
    key: localStorage.key.bind ( localStorage ),
    remove: localStorage.removeItem.bind ( localStorage ),
    clear: localStorage.clear.bind ( localStorage ),
    get ( key ) {

      let val = localStorage.getItem ( key ),
          obj = _.attempt ( JSON.parse, val );

      if ( _.isPlainObject ( obj ) ) {

        if ( 'exp' in obj && obj.exp < _.nowSecs () ) {

          Storage.remove ( key );
          return null;

        }

        return 'val' in obj ? obj.val : obj;

      }

      return val;

    },
    set ( key, val, ttl ) {

      let obj = {val};

      if ( ttl ) obj.exp = _.nowSecs () + ttl;

      try {

        localStorage.setItem ( key, JSON.stringify ( obj ) );

      } catch ( e ) {}

    }
  };

  /* EXPORT */

  Svelto.Storage = Storage;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Lib - Timer
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * Fork of http://jchavannes.com/jquery-timer - Jason Chavannes
 * =========================================================================
 * @require core/svelto/svelto.js
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
 * Svelto - Widgets - Autofocusable
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @priority 400
 * @require core/widget/widget.js
 * @require lib/autofocus/autofocus.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Autofocus ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'autofocusable'
  };

  /* AUTOFOCUSABLE */

  class Autofocusable extends Widgets.Widget {

    /* API */

    autofocus ( $ele = this.$element ) {

      Autofocus.focus ( $ele );

    }

    autoblur ( $ele = this.$element ) {

      Autofocus.blur ( $ele );

    }

  }

  /* FACTORY */

  Factory.make ( Autofocusable, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Autofocus ));


/* =========================================================================
 * Svelto - Widgets - Storable
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * @require lib/storage/storage.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Storage ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'storable',
    selector: '.storable'
  };

  /* STORABLE */

  class Storable extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.storageNamespace = `swns.${this.name}`;

    }

    /* STORAGE */

    _storageGet ( key ) {

      return Storage.get ( `${this.storageNamespace}.${key}` );

    }

    _storageSet ( key, value, ttl ) {

      Storage.set ( `${this.storageNamespace}.${key}`, value, ttl );

    }

    _storageRemove ( key ) {

      Storage.remove ( `${this.storageNamespace}.${key}` );

    }

  }

  /* FACTORY */

  Factory.make ( Storable, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Storage ));


/* =========================================================================
 * Svelto - Widgets - Remote
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require lib/fetch/fetch.js
 * @require widgets/storable/storable.js
 * ========================================================================= */

//TODO: Add locking capabilities

(function ( $, _, Svelto, Widgets, Factory, fetch ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remote',
    options: {
      requests: {
        multiple: {
          parallel: false,
          sequential: true
        }
      },
      ajax: { // Options to pass to `fetch`
        cache: false,
        method: 'get',
        timeout: 31000 // 1 second more than the default value of PHP's `max_execution_time` setting
      },
      storage: {
        enabled: false
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

  class Remote extends Widgets.Storable {

    /* SPECIAL */

    _variables () {

      super._variables ();

      this._requestsNr = 0;

    }

    _reset () {

      this.abort ();

      super._reset ();

    }

    /* PRIVATE */

    _getAjax ( options ) {

      return _.extend ( {}, this.options.ajax, options, {
        beforesend: this.__beforesend.bind ( this ),
        complete: this.__complete.bind ( this ),
        error: this.__error.bind ( this ),
        success: this.__success.bind ( this )
      });

    }

    /* REQUEST HANDLERS */

    __beforesend ( req ) {

      if ( this.isAborted () ) return;

      this._trigger ( 'beforesend', req );

    }

    __error ( res ) {

      if ( this.isAborted () ) return;

      this._trigger ( 'error', res );

    }

    async __success ( res ) {

      if ( this.isAborted () ) return;

      let resj = await fetch.getValue ( res );

      if ( resj && resj.error ) return this.__error ( res );

      this._trigger ( 'success', res );

    }

    __complete ( res ) {

      if ( this.isAborted () ) return;

      this._trigger ( 'complete', res );

    }

    __abort () {

      this._trigger ( 'abort' );

    }

    /* API */

    isRequesting () {

      return !!this.req && !_.includes ( [0, 4], this.req.readyState ); // 0: UNSENT, 4: DONE

    }

    getRequestsNr () {

      return this._requestsNr;

    }

    canRequest () {

      if ( !this.options.requests.multiple.parallel && this.isRequesting () ) return false;

      if ( !this.options.requests.multiple.sequential && this._requestsNr ) return false;

      return true;

    }

    request ( options ) {

      if ( !this.canRequest () ) return;

      this._requestsNr++;
      this._isAborted = false;

      this.ajax = this._getAjax ( options );

      this.ajax.request = () => { // Saving the request object
        this.req = fetch.defaults.request ();
        return this.req;
      };

      fetch ( this.ajax );

    }

    isAborted () {

      return !!this._isAborted;

    }

    abort () {

      if ( !this.req || !this.isRequesting () ) return;

      this._isAborted = true;

      this.req.abort ();

      this.__abort ();

    }

  }

  /* FACTORY */

  Factory.make ( Remote, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.fetch ));


/* =========================================================================
 * Svelto - Widgets - Toasts
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

//TODO: Add a page to the demo

(function ( $, _, Svelto, Widgets ) {

  'use strict';

  /* TOASTS */

  class Toasts {

    constructor () {

      this.reset ();

      this.___visibility ();

    }

    /* GENERAL */

    get () {

      return this.toasts;

    }

    set ( toasts ) {

      this.toasts = toasts;

    }

    reset () {

      this.set ( [] );

    }

    add ( toast ) {

      this.toasts.push ( toast );

    }

    remove ( toast ) {

      _.pull ( this.toasts, toast );

    }

    /* HOVERING */

    isHovering () {

      return !!this.hovering;

    }

    setHovering ( hovering ) {

      this.hovering = hovering;

    }

    /* VISIBILITY */

    ___visibility () {

      $.$document.on ( 'visibilitychange', this.__visibility.bind ( this ) );

    }

    __visibility () {

      if ( this.isHovering () ) return;

      if ( document.hidden ) {

        this.pauseAll ();

      } else {

        this.resumeAll ();

      }

    }

    /* PAUSE */

    pause ( toast ) {

      toast.timer.pause ();

    }

    pauseAll () {

      this.toasts.forEach ( this.pause );

    }

    /* RESUME */

    resume ( toast ) {

      toast.timer.remaining ( Math.max ( toast.options.ttlMinimumRemaining, toast.timer.remaining () ) ).play ();

    }

    resumeAll () {

      this.toasts.forEach ( this.resume );

    }

  };

  /* EXPORT */

  Widgets.Toasts = new Toasts ();

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets ));


/* =========================================================================
 * Svelto - Widgets - Toast
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/animations/animations.js
 * @require core/colors/colors.js
 * @require core/sizes/sizes.js
 * @require lib/timer/timer.js
 * @require widgets/autofocusable/autofocusable.js
 * @require widgets/toasts/toasts.js
 * ========================================================================= */

//TODO: Add support for dismissing a toast that contains only one button
//TODO: Add better support for swipe to dismiss

(function ( $, _, Svelto, Toasts, Widgets, Factory, Pointer, Timer, Animations, Colors, Sizes ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'toast',
    plugin: true,
    selector: '.toast',
    templates: {
      queues: '<div class="toast-queues top">' +
                '<div class="toast-queue expanded"></div>' +
                '<div class="toast-queues-row">' +
                  '<div class="toast-queue left"></div>' +
                  '<div class="toast-queue center"></div>' +
                  '<div class="toast-queue right"></div>' +
                '</div>' +
              '</div>' +
              '<div class="toast-queues bottom">' +
                '<div class="toast-queues-row">' +
                  '<div class="toast-queue left"></div>' +
                  '<div class="toast-queue center"></div>' +
                  '<div class="toast-queue right"></div>' +
                '</div>' +
                '<div class="toast-queue expanded"></div>' +
              '</div>',
      base: '<div class="toast <%= o.type %> <%= o.color %> <%= o.type !== "action" ? "actionable" : "" %> <%= o.css %>">' +
              `<div class="infobar ${Colors.transparent}">` +
                '<% if ( o.img ) { %>' +
                  '<img src="<%= o.img %>" class="toast-img infobar-left">' +
                '<% } %>' +
                '<% if ( o.icon ) { %>' +
                  '<i class="icon <%= o.title && o.body ? "xlarge" : "" %> infobar-left"><%= o.icon %></i>' +
                '<% } %>' +
                '<% if ( o.title || o.body ) { %>' +
                  '<div class="infobar-center">' +
                    '<% if ( o.title ) { %>' +
                      '<p class="infobar-title">' +
                         '<%= o.title %>' +
                       '</p>' +
                    '<% } %>' +
                    '<% if ( o.body ) { %>' +
                      '<%= o.body %>' +
                    '<% } %>' +
                  '</div>' +
                '<% } %>' +
                '<% if ( o.buttons.length === 1 ) { %>' +
                  '<div class="infobar-right">' +
                    '<% print ( self.button ( o.buttons[0] ) ) %>' +
                  '</div>' +
                '<% } %>' +
              '</div>' +
              '<% if ( o.buttons.length > 1 ) { %>' +
                '<div class="toast-buttons multiple center-x">' +
                  '<% for ( var i = 0; i < o.buttons.length; i++ ) { %>' +
                    '<% print ( self.button ( o.buttons[i] ) ) %>' +
                  '<% } %>' +
                '</div>' +
              '<% } %>' +
            '</div>',
      button: `<div class="button <%= o.color || "${Colors.white}" %> <%= o.size || "${Sizes.small}" %> <%= o.css || "" %>">` +
                '<%= o.text || "" %>' +
              '</div>'
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
      persistent: false, // Whether it should survive a change of page or not. Needed when used in frameworks like Meteor
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

  class Toast extends Widgets.Autofocusable {

    /* READY */

    static ready ( done ) {

      _.delay ( function () { // In order to better support client size rendering

        let $layout = $('.layout, body').first (); // `body` is used as a fallback

        $layout.append ( Toast.config.templates.queues );

        done ();

      });

    }

    /* SPECIAL */

    _variables () {

      this.$toast = this.$element;
      this.$buttons = this.$toast.find ( this.options.selectors.button );

      this.timer = false;
      this._openUrl = false;

      this._isOpen = this.$toast.hasClass ( this.options.classes.open );

    }

    _init () {

      this.$toast.widgetize ();

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

        let whenReady = Toast.whenReady || Toast.__proto__.whenReady || Widgets.Widget.whenReady; //IE10 support -- static property

        whenReady.bind ( Toast )( this.open.bind ( this ) );

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

          this.timer = new Timer ( this.close.bind ( this ), this.options.ttl, !document.hidden );

        } else {

          this.timer.reset ();

        }

        Toasts.add ( this );

      }

    }

    /* TAP */

    ___tap () {

      if ( this.options.type !== 'action' ) {

        this._on ( Pointer.tap, this.__tap );

      }

    }

    __tap ( event ) {

      event.preventDefault (); // Otherwise the click goes through the toast in Chrome for iOS

      this.close ();

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

      this.$toast.hover ( function () {

        Toasts.setHovering ( true );
        Toasts.pauseAll ();

      }, function () {

        Toasts.setHovering ( false );

        if ( !document.hidden ) {

          Toasts.resumeAll ();

        }

      });

    }

    /* FLICK */

    ___flick () {

      if ( this.options.type !== 'action' ) {

        this.$toast.flickable ({
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

        this.___route ();

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

      /* TOASTS */

      Toasts.remove ( this );

      /* FLICK */

      this.$toast.flickable ( 'destroy' );

      /* SUPER */

      super._reset ();

    }

    /* API */

    isOpen () {

      return this._isOpen;

    }

    open () {

      if ( this.isLocked () || this._isOpen ) return;

      this.lock ();

      this._isOpen = true;

      this._frame ( function () {

        $(this.options.selectors.queues + '.' + this.options.anchor.y + ' ' + this.options.selectors.queue + '.' + this.options.anchor.x).append ( this.$toast );

        this._frame ( function () {

          this.$toast.addClass ( this.options.classes.open );

          this.autofocus ();

          this.unlock ();

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

      if ( this.isLocked () || !this._isOpen ) return;

      this.lock ();

      this._isOpen = false;
      this._openUrl = false;

      this._frame ( function () {

        this.$toast.removeClass ( this.options.classes.open );

        this.autoblur ();

        this._delay ( function () {

          this.$toast.remove ();

          this.unlock ();

          this._trigger ( 'close' );

        }, this.options.animations.close );

      });

      this._reset ();

    }

  }

  /* FACTORY */

  Factory.make ( Toast, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.Toasts, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Timer, Svelto.Animations, Svelto.Colors, Svelto.Sizes ));


/* =========================================================================
 * Svelto - Widgets - Remote - Loader
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @priority 600
 * @require ../remote.js
 * @require lib/autofocus/autofocus.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Autofocus, fetch ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remoteLoader',
    plugin: true,
    selector: '.remote-loader',
    options: {
      externalUpdateEvents: 'justifiedlayout:firstrender', // When one of these events happen, check again if the remote loader can load //FIXME: Ugly
      target: false, // Selector pointing to the element that cointains the content
      wrap: true, // Wrap the content into a `.remote-loaded` element
      autorequest: {
        threshold: 400
      },
      preloading: {
        enabled: false, // Preload the content
        wait: true // Wait for an explicit request or autorequesting before doing the actual work
      },
      requests: {
        multiple: {
          parallel: false,
          sequential: false
        }
      },
      attributes: {
        href: 'href' // In order to better support `a` elements (the data value has higher priority)
      },
      classes: {
        preload: 'preload',
        nowrap: 'no-wrap'
      },
      datas: {
        url: 'url',
        body: 'body',
        method: 'method',
        target: 'target'
      },
      callbacks: {
        loaded: _.noop
      }
    }
  };

  /* REMOTE LOADER */

  class RemoteLoader extends Widgets.Remote {

    /* SPECIAL */

    _variables () {

      super._variables ();

      this.$loader = this.$element;

    }

    _init () {

      this.options.preloading.enabled = this.$loader.hasClass ( this.options.classes.preload ) || this.options.preloading.enabled;
      this.options.ajax.url = this.$loader.data ( this.options.datas.url ) || this.$loader.attr ( this.options.attributes.href ) || this.options.ajax.url;
      this.options.ajax.body = this.$loader.data ( this.options.datas.body ) || this.options.ajax.body;
      this.options.ajax.method = this.$loader.data ( this.options.datas.method ) || this.options.ajax.method;
      this.options.target = this.$loader.data ( this.options.datas.target ) || this.options.target;
      this.options.wrap = this.$loader.hasClass ( this.options.classes.nowrap ) ? false : this.options.wrap;

      if ( this.options.target ) {

        this.$target = $(this.options.target);
        this.$target = this.$target.length ? this.$target : false;

      }

      if ( this.options.preloading.enabled ) this.preload ();

      this._defer ( () => !this.isRequesting () && this.disable () ); //TODO: Maybe define as an external function //TODO: Maybe add an option for this

    }

    _events () {

      this.___request ();
      this.___externalUpdate ();

    }

    /* UTILITIES */

    async _replace ( res, resj, isJSON ) {

      let content = isJSON ? resj.html : ( _.isString ( res ) ? res : await res.text () ),
          id = `remote-loaded-${$.guid++}`,
          contentWrapped = `<div id="${id}" class="remote-loaded">${content}</div>`,
          html = this.options.wrap ? contentWrapped : content,
          $loader = this.$loader.first (),
          $loaderWrp = $loader.parent ();

      $loader[0].outerHTML = html;

      let $container = this.options.wrap ? $(`#${id}`) : $loaderWrp;

      $container.widgetize ();

      Autofocus.focus ( $container );

      $loader.remove ();

      this._replaced = true;

    }

    /* EXTERNAL UPDATE */

    ___externalUpdate () {

      this._on ( true, $.$document, this.options.externalUpdateEvents, this.__request );

    }

    /* REQUEST */

    ___request () {

      this.__request ();

      let $scrollable = $.$window.add ( this.$loader.parents () ),
          handler = this._frames ( this.__request.bind ( this ) );

      this._on ( true, $.$window, 'resize', handler );
      this._on ( true, $scrollable, 'scroll', handler );

    }

    __request () {

      if ( !this.$loader.isVisible () || this.$loader.getRect ().top - $.window.innerHeight > this.options.autorequest.threshold ) return;

      this.request ();

    }

    /* REQUEST HANDLERS */

    async __error ( res ) {

      if ( this.isAborted () ) return;

      let message = await fetch.getValue ( res, 'message' ) || this.options.messages.error;

      $.toast ( message );

      super.__error ( res );

      this.$loader.remove ();

    }

    async __success ( res ) {

      if ( this.isAborted () ) return;

      let resj = await fetch.getValue ( res ),
          isJSON = !!resj;

      if ( isJSON && ( resj.error || !('html' in resj) ) ) return this.__error ( res );

      super.__success ( res );

      if ( this._preloading && this.options.preloading.wait && !this._requested ) {

        this.disable ();

        this._res = res;
        this._resj = resj;
        this._isJSON = isJSON;

      } else {

        await this._replace ( res, resj, isJSON );

      }

      this._trigger ( 'loaded' );

    }

    __complete ( res ) {

      this._preloading = false;

      super.__complete ( res );

    }

    /* API OVERRIDES */

    request ( preloading ) {

      if ( this._replaced ) return;

      if ( this.$target ) return this._replace ( this.$target.html (), null, false );

      if ( this._res ) return this._replace ( this._res, this._resj, this._isJSON );

      if ( !preloading ) this._requested = true;

      if ( !this.canRequest () ) return;

      this.enable ();

      return super.request ();

    }

    /* API */

    preload () {

      if ( this.$target ) return;

      this._preloading = true;

      this.request ( true );

    }

  }

  /* FACTORY */

  Factory.make ( RemoteLoader, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Autofocus, Svelto.fetch ));


/* =========================================================================
 * Svelto - Widgets - Ripple
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @priority 500
 * @require core/animations/animations.js
 * @require core/browser/browser.js
 * @require core/widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Browser, Pointer, Animations ) {

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

      this._on ( `${Pointer.tap} mousedown`, this.__downTap );

    }

    __downTap ( event ) {

      if ( this.isLocked () ) return;

      this.lock ();

      if ( this.$ripple.hasClass ( this.options.classes.center ) ) {

        let offset = this.$ripple.offset ();

        this._show ({
          x: offset.left + ( this.$ripple.outerWidth () / 2 ),
          y: offset.top + ( this.$ripple.outerHeight () / 2 )
        });

      } else {

        this._show ( $.eventXY ( event ) );

      }

      this._one ( true, $.$document, Pointer.up, this.__up );

    }

    /* UP */

    __up () {

      this._defer ( function () { // So that the `tap` event gets parsed before removing the lock

        this.unlock ();

        for ( let [$circle, timestamp] of this.circles ) {

          this._hide ( $circle, timestamp );

        }

        this.circles = [];

      });

    }

    /* SHOW */

    _show ( XY ) {

      let $circle = $(this._template ( 'circle' ));

      /* SIZE */

      let offset = this.$ripple.offset (),
          insetX = XY.x - offset.left,
          insetY = XY.y - offset.top,
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

  Factory.make ( Ripple, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Browser, Svelto.Pointer, Svelto.Animations ));


/* =========================================================================
 * Svelto - Lib - Emoji - Data
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before ./raw/raw.js
 * @require core/svelto/svelto.js
 * @require lib/fetch/fetch.js
 * ========================================================================= */

(function ( $, _, Svelto, EmojiDataRaw, fetch ) {

  'use strict';

  /* EMOJI DATA */

  let EmojiData = {

    /* VARIABLES */

    _raw: EmojiDataRaw,
    _rawUrl: `/json/emoji.json?v=${Svelto.VERSION}`,
    _data: undefined,

    /* UTILITIES */

    _parse ( data ) {

      // data = JSON.parse ( JSON.stringify ( data ) );

      data.alts = {};
      // data.chars = [];
      data.emojis = {};
      data.emoticons = {};

      for ( let category of data.categories ) {

        for ( let emoji of category.emojis ) {

          if ( emoji.alts ) {

            emoji.alts.forEach ( alt => data.alts[alt] = emoji );

          }

          // data.chars.push ([ emoji.char, emoji.id ]);

          data.emojis[emoji.id] = emoji;

          if ( emoji.emoticons ) {

            emoji.emoticons.forEach ( emoticon => {

              let prev = data.emoticons[emoticon];

              if ( _.isUndefined ( prev ) ) {

                data.emoticons[emoticon] = emoji;

              } else if ( _.isArray ( prev ) ) {

                data.emoticons[emoticon].push ( emoji );

              } else {

                data.emoticons[emoticon] = [prev, emoji];

              }

            });

          }

        }

      }

      // data.chars = data.chars.sort ( ( a, b ) => b[0].length - a[0].length );

      return data;

    },

    /* METHODS */

    async getRemoteRaw () {

      return ( await fetch ( EmojiData._rawUrl ) ).json ();

    },

    async getRaw () {

      if ( EmojiData._raw ) return EmojiData._raw;

      return EmojiData._raw = await EmojiData.getRemoteRaw ();

    },

    async get () {

      if ( EmojiData._data ) return EmojiData._data;

      let raw = await EmojiData.getRaw ();

      if ( EmojiData._data ) return EmojiData._data; // It may have been already parsed by another concurrent call

      return EmojiData._data = EmojiData._parse ( raw );

    }

  };

  /* EXPORT */

  Svelto.EmojiData = EmojiData;

}( Svelto.$, Svelto._, Svelto, Svelto.EmojiDataRaw, Svelto.fetch ));


/* =========================================================================
 * Svelto - Lib - Emoji - Test
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/modernizr/modernizr.js
 * ========================================================================= */

(function ( Modernizr ) {

  'use strict';

  /* EMOJI */

  function supportsEmoji () {

    let canvas = document.createElement ( 'canvas' );

    if ( !canvas.getContext ) return false;

    let ctx = canvas.getContext ( '2d' );

    if ( !ctx || typeof ctx.fillText !== 'function' ) return false;

    ctx.textBaseline = 'top';
    ctx.font = '32px Arial';
    ctx.fillText ( '\ud83d\ude03', 0, 0 );

    return ctx.getImageData ( 16, 16, 1, 1 ).data[0] !== 0;

  }

  Modernizr.addTest ( 'emoji', supportsEmoji () );

}( window.__svelto_modernizr ));


/* =========================================================================
 * Svelto - Lib - Emoji
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./data/data.js
 * @require ./test.js
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Modernizr, Svelto, EmojiData ) {

  'use strict';

  /* EMOJI */

  let Emoji = {

    /* OPTIONS */

    options: {
      tone: 1, // Default tone
      regexes: {
        encoded: /:([a-zA-Z0-9+_-]+):(:tone-([1-6]):)?/g,
        emoticon: /(:o\))|(=-?\))|(;-?[bpP)])|(:-?[bdDoOpP>|()\\\/*])|(8-?\))|([cCD()]:)|(<\/?3)|(>:-?\()|(:'\()/g,
      },
      make: {
        css: '', // Additional wrapper classes
        sprite: false // Whether we should a sprite instead of single images
      },
      native: {
        enabled: Modernizr.emoji, // If enabled the unicode character will be used
        wrap: true // If enabled the emoji will be wrapped by a `i.emoji` element
      },
      image: {
        path: '//cdn.jsdelivr.net/emojione/assets/png/$1.png'
      },
      sprite: {
        columns: 41 // Number of columns in the sprite
      }
    },

    /* METHODS */

    async getByName ( name ) {

      let data = await EmojiData.get ();

      return data.emojis[name] || data.alts[name];

    },

    async getByEmoticon ( emoticon, single = false ) {

      let data = await EmojiData.get (),
          found = data.emoticons[emoticon];

      return single && _.isArray ( found ) ? found[0] : found;

    },

    async getByUnicode ( unicode ) {}, //TODO

    async getTone ( nr ) {

      let data = await EmojiData.get ();

      return data.tones[nr];

    },

    async emoji2hex ( emoji, tone = Emoji.options.tone ) {

      let codes = _.range ( emoji.char.length )
                   .map ( nr => emoji.char.codePointAt ( nr ) )
                   .filter ( c => c !== 0x200d && c !== 0xfe0f && ( c < 0xd800 || c > 0xdfff ) );

      if ( tone > 1 ) {

        tone = await Emoji.getTone ( tone );

        codes.push ( tone.char.codePointAt ( 0 ) );

      }

      return codes.map ( c => _.padStart ( c.toString ( 16 ), 4, 0 ) ).join ( '-' );

    },

    async hex2emoji () {}, //TODO

    async emoji2unicode ( emoji, tone = Emoji.options.tone ) {

      emoji = _.isString ( emoji ) ? await Emoji.getByName ( emoji ) : emoji;

      if ( !emoji ) return '';

      if ( !emoji.tones || tone < 2 ) return emoji.char;

      tone = await Emoji.getTone ( tone );

      return `${emoji.char}${tone.char}`;

    },

    async unicode2emoji ( unicode ) {}, //TODO

    async getImageUrl ( emoji, tone = Emoji.options.tone ) {

      let hex = await Emoji.emoji2hex ( emoji, tone );

      return _.format ( Emoji.options.image.path, hex );

    },

    getSpriteXY ( emoji, tone = Emoji.options.tone ) {

      let position = emoji.x + tone - 1,
          x = Math.floor ( position / Emoji.options.sprite.columns ),
          y = position % Emoji.options.sprite.columns;

      return {x, y};

    },

    encode ( emoji, tone = Emoji.options.tone ) {

      let name = _.isString ( emoji ) ? emoji : emoji.id;

      return tone > 1 ? `:${name}::tone-${tone}:` : `:${name}:`;

    },

    async make ( emoji, tone = Emoji.options.tone, options = Emoji.options.make ) {

      emoji = _.isString ( emoji ) ? await Emoji.getByName ( emoji ) : emoji;

      if ( !emoji ) return '';

      tone = emoji.tones ? tone : 1;

      if ( Emoji.options.native.enabled ) {

        let unicode = await Emoji.emoji2unicode ( emoji, tone );

        if ( Emoji.options.native.wrap ) {

          return `<i class="emoji ${options.css}" data-id="${emoji.id}" data-tone="${tone}" data-tonable="${!!emoji.tones}" title="${emoji.name}">${unicode}</i>`;

        } else {

          return unicode;

        }

      } else {

        if ( options.sprite ) {

          let {x, y} = Emoji.getSpriteXY ( emoji, tone ),
              scale = 100 / ( Emoji.options.sprite.columns - 1 ),
              posX = x * scale,
              posY = y * scale;

          return `<i class="emoji ${options.css}" data-id="${emoji.id}" data-tone="${tone}" data-tonable="${!!emoji.tones}" title="${emoji.name}" style="background-position:${posX}% ${posY}%"></i>`;

        } else {

          let url = await Emoji.getImageUrl ( emoji, tone );

          return `<i class="emoji ${options.css}" data-id="${emoji.id}" data-tone="${tone}" data-tonable="${!!emoji.tones}" title="${emoji.name}" style="background-image:url(${url})"></i>`;

        }

      }

    }

  };

  /* EXPORT */

  Svelto.Emoji = Emoji;

}( Svelto.$, Svelto._, Svelto.Modernizr, Svelto, Svelto.EmojiData ));


/* =========================================================================
 * Svelto - Lib - Emojify
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @priority 300
 * @require core/widgetize/widgetize.js
 * @require lib/emoji/emoji.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgetize, EmojiData, Emoji ) {

  'use strict';

  /* EMOJIFY */

  let Emojify = {

    /* OPTIONS */

    options: {
      parse: {
        emoticon: true,
        encoded: true,
        unicode: false //FIXME: Doesn't work properly, and it's very slow
      }
    },

    /* UTILITIES */

    getEmoticons ( str ) {

      let matches = _.findMatches ( str, Emoji.options.regexes.emoticon ),
          sorted  = matches.sort ( ( a, b ) => b.index - a.index );

      return sorted.map ( match => ({
        emoticon: match[0],
        index: match.index
      }));

    },

    getEncoded ( str ) {

      let matches = _.findMatches ( str, Emoji.options.regexes.encoded ),
          uniq    = _.uniqBy ( matches, _.first ),
          sorted  = uniq.sort ( ( a, b ) => b[0].length - a[0].length );

      return sorted.map ( match => ({
        encoded: match[0],
        name: match[1],
        tone: match[3] || Emoji.options.tone
      }));

    },

    /* PARSE */

    async parseEmoticon ( str, options ) {

      if ( !Emojify.options.parse.emoticon ) return str;

      let matches = Emojify.getEmoticons ( str );

      for ( let match of matches ) {

        let {emoticon, index} = match;

        if ( ( index > 0 && !str[index - 1].match ( /\s/ ) ) || ( index + emoticon.length < str.length && !str[index + emoticon.length].match ( /\s/ ) ) ) continue;

        let emoji = await Emoji.getByEmoticon ( emoticon, true );

        if ( !emoji ) continue;

        let parsed = await Emoji.make ( emoji.id, Emoji.options.tone, options );

        str = str.substring ( 0, index ) + parsed + str.substring ( index + emoticon.length );

      }

      return str;

    },

    async parseEncoded ( str, options ) {

      if ( !Emojify.options.parse.encoded ) return str;

      let matches = Emojify.getEncoded ( str );

      for ( let match of matches ) {

        let {encoded, name, tone} = match,
            emoji = await Emoji.getByName ( name );

        if ( !emoji ) continue;

        let parsed = await Emoji.make ( emoji.id, tone, options );

        str = _.replaceAll ( str, encoded, parsed );

      }

      return str;

    },

    async parseUnicode ( str, options ) {

      if ( !Emojify.options.parse.unicode ) return str;

      let data = await EmojiData.get ();

      for ( let [char, name] of data.chars ) {

        let emoji = await Emoji.getByName ( name ),
            tones = emoji.tones ? 6 : 1;

        for ( let i = 6, l = 1; i >= l; i-- ) {

          let unicode = await Emoji.emoji2unicode ( emoji, i );

          if ( str.indexOf ( unicode ) === -1 ) continue;

          str = _.replaceAll ( str, unicode, await Emoji.make ( name, i, options ) );

        }

      }

      return str;

    },

    /* API */

    async emojify ( target, options ) {

      if ( target instanceof $ ) {

        return Promise.all ( target.get ().map ( node => Emojify.node ( node, options ) ) );

      } else if ( _.isElement ( target ) ) {

        return Emojify.node ( target, options );

      } else if ( _.isString ( target ) ) {

        return Emojify.string ( target, options );

      }

    },

    async string ( str, options ) {

      return Emojify.parseUnicode ( str, options )
                    .then ( str => Emojify.parseEncoded ( str, options ) )
                    .then ( str => Emojify.parseEmoticon ( str, options ) );

    },

    async node ( node, options ) {

      let type = node.nodeType;

      if ( type === 3 ) { // Text node

        let value = node.nodeValue,
            parsed = await Emojify.string ( value, options );

        if ( value !== parsed ) {

          if ( Emoji.options.native.enabled && !Emoji.options.native.wrap ) {

            node.nodeValue = parsed;

          } else {

            let parent = node.parentNode;

            if ( parent.childNodes.length === 1 ) {

              parent.innerHTML = parsed;

            } else {

              let replacement = $.parseHTML ( `<span>${parsed}</span>` )[0];

              node.parentNode.replaceChild ( replacement, node );

            }

          }

        }

      } else if ( type === 1 ) { // Element node

        return Promise.all ( Array.prototype.map.call ( node.childNodes, node => Emojify.node ( node, options ) ) );

      }

    }

  };

  /* PLUGIN */

  $.fn.emojify = function ( options ) {

    return Emojify.emojify ( this, options );

  };

  /* WIDGETIZE */

  Widgetize.add ( '.emojify', Emojify.emojify );

  /* EXPORT */

  Svelto.Emojify = Emojify;

}( Svelto.$, Svelto._, Svelto, Svelto.Widgetize, Svelto.EmojiData, Svelto.Emoji ));


/* =========================================================================
 * Svelto - Widgets - Remote - Reaction
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer, fetch ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remoteReaction',
    options: {
      state: undefined, // The state of the reaction
      stateDefault: null, // The default state
      stateUrl: false, // If provided, fetch the state from here
      stateBatchUrl: false, // If provided, fetch the state from here
      url: false, // Submit the reaction to this url
      ajax: {
        cache: false,
        method: 'post'
      },
      datas: {
        state: 'state',
        stateUrl: 'state-url',
        stateBatchUrl: 'state-batch-url',
        url: 'url'
      }
    }
  };

  /* REMOTE REACTION */

  class RemoteReaction extends Widgets.Remote {

    /* SPECIAL */

    _variables () {

      this.$reaction = this.$element;

    }

    _init () {

      this.options.state = this.$reaction.hasAttribute ( `data-${this.options.datas.state}` ) ? this.$reaction.data ( this.options.datas.state ) : this.options.state || this.options.stateDefault;
      this.options.stateUrl = this.$reaction.data ( this.options.datas.stateUrl ) || this.options.stateUrl;
      this.options.stateBatchUrl = this.$reaction.data ( this.options.datas.stateBatchUrl ) || this.options.stateBatchUrl;
      this.options.url = this.$reaction.data ( this.options.datas.url ) || this.options.url;

      this._update ();

      this.___remoteState ();

    }

    /* REMOTE STATE */

    async ___remoteState () {

      if ( !this.options.stateUrl ) return;

      let res = await fetch ({
        url: this.options.stateUrl,
        batchUrl: this.options.stateBatchUrl
      });

      this.__remoteState ( res );

    }

    async __remoteState ( res ) {

      let state = await fetch.getValue ( res, 'state' );

      if ( _.isNull ( state ) ) return;

      this._remoteState ( state );

    }

    _remoteState ( state ) {

      if ( state === this.options.state ) return;

      this.options.state = state;

      this._update ();

    }

    /* UPDATE */

    _update () {

      this.$reaction.attr ( `data-${this.options.datas.state}`, String ( this.options.state ) );

    }

    /* REQUEST HANDLERS */

    __beforesend ( req ) {

      this.disable ();

      return super.__beforesend ( req );

    }

    async __error ( res ) {

      if ( this.isAborted () ) return;

      let message = await fetch.getValue ( res, 'message' ) || this.options.messages.error;

      $.toast ( message );

      return super.__error ( res );

    }

    async __success ( res ) {

      if ( this.isAborted () ) return;

      let resj = await fetch.getValue ( res );

      if ( !resj || resj.error ) return this.__error ( res );

      this._success ( resj );

      if ( resj.message && !resj.noop ) $.toast ( resj.message );

      return super.__success ();

    }

    __complete ( res ) {

      this.enable ();

      return super.__complete ( res );

    }

    /* REQUEST CALLBACKS */

    _success ( resj ) {

      if ( !resj.hasOwnProperty ( 'state' ) ) return;

      this.options.state = resj.state;

      this._update ();

    }

    /* API */

    get () {

      return this.options.state;

    }

    set ( state ) {

      if ( state === this.options.state ) return;

      let current = this.get (),
          ajax = {
            url: this.options.url || this.options.ajax.url,
            body: {current, state},
          };

      return this.request ( ajax );

    }

    reset () {

      return this.set ( this.options.stateDefault );

    }

  }

  /* FACTORY */

  Factory.make ( RemoteReaction, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.fetch ));


/* =========================================================================
 * Svelto - Widgets - Liker
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @priority 200
 * @require widgets/remote/reaction/reaction.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'liker',
    plugin: true,
    selector: '.liker',
    options: {
      likes: 0,
      dislikes: 0,
      datas: {
        likes: 'likes',
        dislikes: 'dislikes'
      },
      selectors: {
        like: '.like',
        dislike: '.dislike'
      }
    }
  };

  /* LIKER */

  class Liker extends Widgets.RemoteReaction {

    /* SPECIAL */

    _variables () {

      super._variables ();

      this.$like = this.$reaction.find ( this.options.selectors.like );
      this.$dislike = this.$reaction.find ( this.options.selectors.dislike );

    }

    _init () {

      this.options.likes = Number ( this.$like.data ( this.options.datas.likes ) ) || this.options.likes;
      this.options.dislikes = Number ( this.$dislike.data ( this.options.datas.dislikes ) ) || this.options.dislikes;

      super._init ();

    }

    _events () {

      this.___like ();
      this.___dislike ();

    }

    /* UPDATE */

    _update () {

      super._update ();

      this.$like.attr ( `data-${this.options.datas.likes}`, this.options.likes );
      this.$dislike.attr ( `data-${this.options.datas.dislikes}`, this.options.dislikes );

    }

    /* LIKE */

    ___like () {

      this._on ( this.$like, Pointer.tap, this.__like );

    }

    __like () {

      let action = this.options.state ? 'reset' : 'like';

      this[action]();

    }

    /* DISLIKE */

    ___dislike () {

      this._on ( this.$dislike, Pointer.tap, this.__dislike );

    }

    __dislike () {

      let action = this.options.state === false ? 'reset' : 'dislike';

      this[action]();

    }

    /* REQUEST CALLBACKS */

    _success ( resj ) {

      this.options.likes = resj.likes;
      this.options.dislikes = resj.dislikes;

      super._success ( resj );

    }

    /* API */

    get () {

      return _.pick ( this.options, ['likes', 'dislikes', 'state'] );

    }

    toggle ( force = !this.options.state ) {

      if ( !!force !== this.options.state ) {

        this.set ( !!force );

      }

    }

    like () {

      return this.set ( true );

    }

    dislike () {

      return this.set ( false );

    }

  }

  /* FACTORY */

  Factory.make ( Liker, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Widgets - Subscriber
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @priority 100
 * @require widgets/remote/reaction/reaction.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'subscriber',
    plugin: true,
    selector: '.subscriber',
    options: {
      counter: 0,
      datas: {
        counter: 'counter'
      },
      selectors: {
        toggle: '.toggle',
        counter: '.counter'
      }
    }
  };

  /* SUBSCRIBER */

  class Subscriber extends Widgets.RemoteReaction {

    /* SPECIAL */

    _variables () {

      super._variables ();

      this.$toggle = this.$reaction.find ( this.options.selectors.toggle );
      this.$counter = this.$reaction.find ( this.options.selectors.counter );

    }

    _init () {

      this.options.counter = Number ( this.$counter.data ( this.options.datas.counter ) ) || this.options.counter;

      super._init ();

    }

    _events () {

      this.___toggle ();

    }

    /* UPDATE */

    _update () {

      super._update ();

      this.$counter.attr ( `data-${this.options.datas.counter}`, this.options.counter );

    }

    /* TOGGLE */

    ___toggle () {

      this._on ( this.$toggle, Pointer.tap, this.__toggle );

    }

    __toggle () {

      this.toggle ();

    }

    /* REQUEST CALLBACKS */

    _success ( resj ) {

      this.options.counter = resj.counter;

      super._success ( resj );

    }

    /* API */

    get () {

      return _.pick ( this.options, ['counter', 'state'] );

    }

    toggle ( force = !this.options.state ) {

      if ( !!force !== this.options.state ) {

        this.set ( !!force );

      }

    }

    subscribe () {

      return this.set ( true );

    }

    unsubscribe () {

      return this.set ( false );

    }

  }

  /* FACTORY */

  Factory.make ( Subscriber, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Core - Cookie
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * Fork of https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie - Mozilla
 * =========================================================================
 * @require core/svelto/svelto.js
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
            expires = ( end === Infinity ) ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : `; max-age=${end}`;
            break;

          case String:
            expires = `; expires=${end}`;
            break;

          case Date:
            expires = '; expires=' + end.toUTCString ();
            break;

        }

      }

      document.cookie = this.encoder ( key ) + '=' + this.encoder ( value ) + expires + ( domain ? `; domain=${domain}` : '' ) + ( path ? `; path=${path}` : '' ) + ( secure ? '; secure' : '' );

      return true;

    },

    remove ( key, path, domain ) {

      if ( !this.has ( key ) ) return false;

      document.cookie = this.encoder ( key ) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + ( domain ? `; domain=${domain}` : '' ) + ( path ? `; path=${path}` : '' );

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
 * Svelto - Core - Debug
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* DEBUG */

  if ( !Svelto.DEVELOPMENT ) return;

  window.log = console.log.bind ( console );

  const timeMarks = {};
  window.time = function ( mark = '?' ) {
    if ( !timeMarks[mark] ) {
      timeMarks[mark] = true;
      console.time ( mark );
    } else {
      console.timeEnd ( mark );
      delete timeMarks[mark];
    }
  }

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Core - Z-Depths
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* Z-DEPTHS */

  let ZDepths = {};

  for ( let i = 0, l = 24; i <= l; i++ ) {

    ZDepths[i] = `z-depth-${i}`;

  }

  /* EXPORT */

  Svelto.ZDepths = ZDepths;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Decorators - Blurred
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* BLURRED */

  $.fn.blurred = function ( force ) {

    return this.toggleClass ( 'blurred', force );

  };

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Decorators - Obscured
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* OBSCURED */

  $.fn.obscured = function ( force ) {

    return this.toggleClass ( 'obscured', force );

  };

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Lib - Color
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
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

      return _.padStart ( parseInt ( dec, 10 ).toString ( 16 ), 2, '0' );

    }

    static hex2dec ( hex ) {

      return parseInt ( hex, 16 );

    }

  };

  /* EXPORT */

  Svelto.Color = Color;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Lib - Directions
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* DIRECTIONS */

  let Directions = {

    get () {

      return ['top', 'bottom', 'left', 'right'];

    },

    getOpposite ( direction ) {

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

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Lib - Embedded CSS
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/readify/readify.js
 * ========================================================================= */

/* EMBEDDED CSS */

(function ( $, _, Svelto, Readify ) {

  'use strict';

  /* EMBEDDED CSS */

  class EmbeddedCSS {

    constructor () {

      this.$stylesheet = $(`<style class="svelto-embedded svelto-embedded-${$.guid++}">`);
      this.tree = {};

    }

    /* PRIVATE */

    _cssfy () {

      let css = '';

      for ( let selector in this.tree ) {

        if ( !this.tree.hasOwnProperty ( selector ) ) continue;

        css += selector + '{';

        if ( _.isPlainObject ( this.tree[selector] ) ) {

          for ( let property in this.tree[selector] ) {

            if ( !this.tree[selector].hasOwnProperty ( property ) ) continue;

            css += property + ':' + this.tree[selector][property] + ';';

          }

        } else if ( _.isString ( this.tree[selector] ) ) {

          css += this.tree[selector] + ';';

        }

        css += '}';

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

          return this.set ( selector, { [property]: value } );

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

      this.$stylesheet.appendTo ( $.$head );

    }

    detach () {

      this.$stylesheet.remove ();

    }

  }

  /* EXPORT */

  Svelto.EmbeddedCSS = new EmbeddedCSS ();

  /* READY */

  Readify.add ( Svelto.EmbeddedCSS.attach.bind ( Svelto.EmbeddedCSS ) );

}( Svelto.$, Svelto._, Svelto, Svelto.Readify ));


/* =========================================================================
 * Svelto - Lib - Fetch (Helpers)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./fetch.js
 * ========================================================================= */

(function ( $, _, Svelto, fetch ) {

  'use strict';

  /* HELPERS */

  fetch.getValue = async function ( res, key ) {

    if ( !res ) return;

    try {

      let json = await res.json ();

      return key ? json[key] : json;

    } catch ( e ) {}

  };

}( Svelto.$, Svelto._, Svelto, Svelto.fetch ));


/* =========================================================================
 * Svelto - Lib - Fullscreen
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* VARIABLES */

  let html = document.documentElement,
      keyboardAllowed = ( typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element ),
      apis = [
        ['requestFullscreen',       'exitFullscreen',       'fullscreenElement',       'fullscreenEnabled',       'fullscreenchange',       'fullscreenerror'],
        ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'],
        ['mozRequestFullScreen',    'mozCancelFullScreen',  'mozFullScreenElement',    'mozFullScreenEnabled',    'mozfullscreenchange',    'mozfullscreenerror'],
        ['msRequestFullscreen',     'msExitFullscreen',     'msFullscreenElement',     'msFullscreenEnabled',     'MSFullscreenChange',     'MSFullscreenError']
      ],
      api = apis.find ( methods => methods[1] in document ),
      raw = {};

  if ( api ) api.forEach ( ( method, index ) => raw[apis[0][index]] = method );

  /* FULLSCREEN */

  let Fullscreen = {
    request ( ele = html ) {
      if ( !raw.requestFullscreen ) return;
      ele[raw.requestFullscreen]( keyboardAllowed && Element.ALLOW_KEYBOARD_INPUT );
    },
    exit () {
      if ( !raw.exitFullscreen ) return;
      document[raw.exitFullscreen]();
    },
		toggle ( ele ) {
      Fullscreen.isFullscreen ? Fullscreen.exit () : Fullscreen.request ( ele );
		},
    get isFullscreen () {
      return !!Fullscreen.element;
    },
    get element () {
      return document[raw.fullscreenElement];
    },
    get enabled () {
      return !!document[raw.fullscreenEnabled];
    },
    raw
  };

  /* EXPORT */

  Svelto.Fullscreen = Fullscreen;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Lib - Fuzzy
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* FUZZY */

  let Fuzzy = {

    match ( str, search, isCaseSensitive = true ) {

      if ( !isCaseSensitive ) {

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

    }

  };

  /* EXPORT */

  Svelto.Fuzzy = Fuzzy;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Lib - Get Script
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* GET SCRIPT */

  function getScript ( url ) {

    return new Promise ( ( resolve, reject ) => {

      let script = document.createElement ( 'script' ),
          anchor = document.getElementsByTagName ( 'script' )[0];

      script.async = true;

      script.onload = resolve;
      script.onerror = reject;
      script.src = url;

      anchor.parentNode.insertBefore ( script, anchor );

    });

  }

  /* EXPORT */

  Svelto.getScript = getScript;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Lib - Markdown
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require lib/get_script/get_script.js
 * ========================================================================= */

(function ( $, _, Svelto, getScript ) {

  'use strict';

  /* MARKDOWN */

  const Markdown = {

    markedUrl: `template/dist/javascript/marked.js?v=${Svelto.VERSION}`,

    async parse ( str ) {

      if ( window.marked ) return marked ( str );

      try {

        await getScript ( Markdown.markedUrl );

        return marked ( str );

      } catch ( e ) {

        return str;

      }

    }

  };

  /* EXPORT */

  Svelto.Markdown = Markdown;

}( Svelto.$, Svelto._, Svelto, Svelto.getScript ));


/* =========================================================================
 * Svelto - Lib - N Times Action (Group)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/cookie/cookie.js
 * @require core/svelto/svelto.js
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

  let config = {
    encoder: JSON.stringify,
    decoder: JSON.parse
  };

  /* GROUP */

  class Group {

    constructor ( options ) {

      this.name = options.name;
      this.cookie = options.cookie;

      this.actions = NTA.Group.config.decoder ( Cookie.get ( this.name ) || '{}' );

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

      Cookie.set ( this.name, NTA.Group.config.encoder ( this.actions ), this.cookie.end, this.cookie.path, this.cookie.domain, this.cookie.secure );

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
  NTA.Group.config = config;

}( Svelto.$, Svelto._, Svelto, Svelto.Cookie, Svelto.NTA = {} ));


/* =========================================================================
 * Svelto - Lib - N Times Action (Action)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./NTA.Group.js
 * @require core/svelto/svelto.js
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
 * Svelto - Lib - N Times Action
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./NTA.Action.js
 * @require ./NTA.Group.js
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto, NTA ) {

  'use strict';

  /* DEFAULTS */

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
 * Svelto - Lib - Notification
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

// If the page isn't visible and we can use the native notifications than we'll send a native notification, otherwise we will fallback to a toast

(function ( $, _, Svelto, Toast ) {

  'use strict';

  /* DEFAULTS */

  let defaults = {
    title: '',
    body: '',
    img: '',
    ttl: Toast.config.options.ttl
  };

  /* NOTIFICATION */

  $.notification = function ( options ) {

    /* OPTIONS */

    options = _.isPlainObject ( options ) ? _.extend ( {}, $.notification.defaults, options ) : String ( options );

    /* NOTIFICATIONS */

    if ( document.hidden && window.Notification && Notification.permission !== 'denied' ) {

      Notification.requestPermission ( function ( status ) {

        if ( status === 'granted' ) {

          let notification = _.isString ( options ) ? new Notification ( options ) : new Notification ( options.title, { body: options.body, icon: options.img } );

          if ( _.isNumber ( options.ttl ) && !_.isNaN ( options.ttl ) && options.ttl !== Infinity ) {

            setTimeout ( notification.close.bind ( notification ), options.ttl );

          }

        } else {

          $.toast ( options );

        }

      });

    } else {

      $.toast ( options );

    }

  };

  /* BINDING */

  $.notification.defaults = defaults;

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.Toast ));


/* =========================================================================
 * Svelto - Lib - One Time Action
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * @require lib/n_times_action/n_times_action.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* ONE TIME ACTION */

  $.oneTimeAction = function ( options ) {

    return $.nTimesAction ( _.extend ( { group: 'ota' }, options, { times: 1 } ) );

  };

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Lib - Regexes
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* REGEXES */

  let Regexes = {

    /* TYPE */

    alpha: /^[a-zA-Z]+$/,
    alphanumeric: /^[a-zA-Z0-9]+$/,
    hexadecimal: /^[a-fA-F0-9]+$/,
    integer: /^(?:-?(?:[0-9]*))$/,
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

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Lib - Touching
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* UTILITIES */

  let getOverlappingArea = function ( rect1, rect2 ) {

    let overlapX = Math.max ( 0, Math.min ( rect1.right, rect2.right ) - Math.max ( rect1.left, rect2.left ) ),
        overlapY = Math.max ( 0, Math.min ( rect1.bottom, rect2.bottom ) - Math.max ( rect1.top, rect2.top ) );

    return overlapX * overlapY;

  };

  /* DEFAULTS */

  let defaults = {
    point: false, // Used for the punctual search
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

      return nodes.length
               ? options.onlyBest
                 ? $(nodes[ areas.indexOf ( _.max ( areas ) ) ])
                 : $(nodes)
               : false;

    }

    /* PUNCTUAL */

    if ( options.point ) {

      for ( let searchable of $searchable ) {

        let rect = $.getRect ( searchable );

        if ( options.point.y >= rect.top && options.point.y <= rect.bottom && options.point.x >= rect.left && options.point.x <= rect.right ) {

          return $(searchable);

        }

      }

    }

    /* DEFAULT */

    return false;

  };

  /* BINDING */

  $.fn.touching.defaults = defaults;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Lib - Transform
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

/* TRANSFORM UTILITIES */

(function ( $, _, Modernizr, Svelto ) {

  'use strict';

  /* MATRIX */

  let property = _.camelCase ( Modernizr.prefixedCSS ( 'transform' ) ),
      precision = 3; // Or sometimes we may get weird values like `2.4492935982947064e-16` on Safari

  $.fn.matrix = function ( values ) { //TODO: Add not jquery-wrapped version fo this maybe

    if ( values ) {

      values = values.map ( val => parseFloat ( parseFloat ( val ).toFixed ( precision ) ) ).join ( ',' );

      this[0].style[property] = `matrix(${values})`;

      return this;

    } else {

      let transformStr = getComputedStyle ( this[0], null )[property];

      return ( transformStr && transformStr !== 'none' ) ? transformStr.match ( /[0-9., e-]+/ )[0].split ( ', ' ).map ( value => parseFloat ( parseFloat ( value ).toFixed ( precision ) ) ) : [1, 0, 0, 1, 0, 0];

    }

  };

  /* TRANSFORMATIONS */

  let transformations = ['scaleX', 'skewY', 'skewX', 'scaleY', 'translateX', 'translateY']; // Their index is also the corresponsing index when applying `transform: matrix()`

  for ( let i = 0, l = transformations.length; i < l; i++ ) {

    $.fn[transformations[i]] = (function ( index ) { //TODO: Add not jquery-wrapped version fo this maybe

       return function ( value ) { //TODO: Maybe add an optional `_matrix` argument, so that we can batch reads and writes

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

  /* 2D TRANSFORMATIONS */

  let transformations2D = ['scale', 'skew', 'translate'],
      indexes2D = [[0, 3], [2, 1], [4, 5]];

  for ( let i = 0, l = transformations2D.length; i < l; i++ ) {

    $.fn[transformations2D[i]] = (function ( index ) { //TODO: Add not jquery-wrapped version fo this maybe

      return function ( X, Y = X, _matrix ) { //TODO: Maybe add an optional `_matrix` argument, so that we can batch reads and writes

        let matrix = _matrix || this.matrix (),
            indexes = indexes2D[index];

        if ( !_.isUndefined ( X ) && !_.isUndefined ( Y ) ) {

          matrix[indexes[0]] = X;
          matrix[indexes[1]] = Y;

          return this.matrix ( matrix );

        } else {

          return {
            x: matrix[indexes[0]],
            y: matrix[indexes[1]]
          };

        }

      }

    })( i );

  }

}( Svelto.$, Svelto._, Svelto.Modernizr, Svelto ));


/* =========================================================================
 * Svelto - Lib - Positionate
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * @require lib/directions/directions.js
 * @require lib/embedded_css/embedded_css.js
 * @require lib/transform/transform.js
 * ========================================================================= */

//FIXME: If the positionable element is less than half of the anchor, and it must be pointed, than the pointer may be not well positionated (expecially if we are not aligning to the center)

(function ( $, _, Svelto, Directions, EmbeddedCSS ) {

  'use strict';

  /* DEFAULTS */

  let defaults = {
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

  $.fn.positionate = function ( options ) {

    /* NO ELEMENTS */

    if ( !this.length ) return this;

    /* OPTIONS */

    options = _.merge ( {}, $.fn.positionate.defaults, options );

    /* VARIABLES */

    let positionable = this[0],
        $positionable = $(positionable),
        positionableRect = $positionable.getRect (),
        windowWidth = window.innerWidth,
        windowHeight = window.innerHeight,
        directions = _.uniq ( _.union ( options.direction ? [options.direction] : [], options.axis ? options.directions[options.axis] : [], !options.strict || !options.direction && !options.axis ? options.directions.all : [] ) ),
        anchorRect = options.$anchor ? options.$anchor.getRect () : { top: options.point.y - window.scrollY, bottom: options.point.y - window.scrollY, left: options.point.x - window.scrollX, right: options.point.x - window.scrollX, width: 0, height: 0 };

    /* ID */

    positionable._positionateGuid = positionable._positionateGuid || $.guid++;
    positionable._positionateGuc = `positionate-${positionable._positionateGuid}`;

    $positionable.addClass ( positionable._positionateGuc );

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

        let opposite = Directions.getOpposite ( directions[index] ),
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

    /* CONSTRAIN */

    if ( options.$anchor ) {

      let oppositeSpace = spaces[bestIndex],
          isExtendedX = anchorRect.top + anchorRect.height >= 0 && anchorRect.top <= windowHeight,
          isExtendedY = anchorRect.left + anchorRect.width >= 0 && anchorRect.left <= windowWidth;

      if ( isExtendedX ) coordinates.top = _.clamp ( coordinates.top, options.spacing, windowHeight - positionableRect.height - options.spacing );
      if ( isExtendedY ) coordinates.left = _.clamp ( coordinates.left, options.spacing, windowWidth - positionableRect.width - options.spacing );

    } else if ( options.constrainer.$element ) {

      let constrainerRect = options.constrainer.$element.getRect (),
          halfWidth = options.constrainer.center ? positionableRect.width / 2 : 0,
          halfHeight = options.constrainer.center ? positionableRect.height / 2 : 0;

      /* COORDINATES */

      coordinates.top = _.clamp ( coordinates.top, constrainerRect.top - halfHeight - options.constrainer.tolerance.y + options.spacing, constrainerRect.bottom - positionableRect.height + halfHeight + options.constrainer.tolerance.y - options.spacing );
      coordinates.left = _.clamp ( coordinates.left, constrainerRect.left - halfWidth - options.constrainer.tolerance.x + options.spacing, constrainerRect.right - positionableRect.width + halfWidth + options.constrainer.tolerance.x - options.spacing );

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

    let prevDirection = positionable._positionatePrevDirection;

    positionable._positionatePrevDirection = bestDirection;

    if ( prevDirection !== bestDirection ) {

      $positionable.removeClass ( `position-${prevDirection}` ).addClass ( `position-${bestDirection}` );

    }

    /* POINTER */

    let prevPointer = positionable._positionatePrevPointer;

    positionable._positionatePrevPointer = options.pointer;

    if ( prevPointer === 'auto' && ( options.pointer !== 'auto' || bestDirection !== prevDirection ) ) {

      let oppositeDirection = Directions.getOpposite ( prevDirection );

      $positionable.removeClass ( `pointing-${oppositeDirection}` );

    }

    if ( options.pointer ) {

      if ( options.pointer === 'auto' ) {

        let oppositeDirection = Directions.getOpposite ( bestDirection );

        $positionable.addClass ( `pointing-${oppositeDirection}` );

      }

      /* MOVING */

      switch ( bestDirection ) {

        case 'top':
        case 'bottom':
          let deltaX = _.clamp ( anchorRect.left - coordinates.left + ( anchorRect.width / 2 ), 0, positionableRect.width );
          if ( options.pointer instanceof $ ) {
            options.pointer.translate ( deltaX, 0 );
          } else if ( options.pointer === 'auto' ) {
            EmbeddedCSS.set ( `.${positionable._positionateGuc}:after`, `left:${deltaX}px !important;` ); //TODO: Maybe use `transform` instead, since it lead to improved performances
          }
          break;

        case 'left':
        case 'right':
          let deltaY = _.clamp ( positionableRect.height, anchorRect.top - coordinates.top + ( anchorRect.height / 2 ), 0, positionableRect.height );
          if ( options.pointer instanceof $ ) {
            options.pointer.translate ( 0, deltaY );
          } else if ( options.pointer === 'auto' ) {
            EmbeddedCSS.set ( `.${positionable._positionateGuc}:after`, `top:${deltaY}px !important;` ); //TODO: Maybe use `transform` instead, since it lead to improved performances
          }
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

}( Svelto.$, Svelto._, Svelto, Svelto.Directions, Svelto.EmbeddedCSS ));


/* =========================================================================
 * Svelto - Lib - URL
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* URL */

  let URL = {
    targetRe: /#(.*)$/,
    isEqual ( url1, url2, stripTarget = false ) {
      if ( !_.isString ( url1 ) || !_.isString ( url2 ) ) return _.isEqual ( url1, url2 );
      url1 = stripTarget ? url1.replace ( URL.targetRe, '' ) : url1;
      url2 = stripTarget ? url2.replace ( URL.targetRe, '' ) : url2;
      return _.trimEnd ( url1, '/' ) === _.trimEnd ( url2, '/' );
    }
  };

  /* EXPORT */

  Svelto.URL = URL;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Lib - Validator
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * @require lib/regexes/regexes.js
 * ========================================================================= */

//TODO: Most of them will return false for empty strings, is this the wanted behaviour?

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
    creditCard ( value ) {
      return !!value.match ( Regexes.creditCard );
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
 * Svelto - Widgets - Carousel
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/animations/animations.js
 * @require core/widget/widget.js
 * @require lib/timer/timer.js
 * ========================================================================= */

//TODO: Add slides drag support
//TODO: Maybe add `autofocus` capabilities

(function ( $, _, Svelto, Widgets, Factory, Pointer, Timer, Animations ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'carousel',
    plugin: true,
    selector: '.carousel',
    options: {
      startIndex: 0,
      wrap: true, // Whether we should connect the start with the end, so that when calling `previous` from the start we reach the end and vice versa
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

      this._onHover ( [$.$document, 'keydown', this.__keydown] );

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

      return ( index > 0 ) ? index - 1 : ( this.options.wrap ? this.maxIndex : 0 );

    }

    _getNextIndex ( index ) {

      return ( index < this.maxIndex ) ? index + 1 : ( this.options.wrap ? 0 : this.maxIndex );

    }

    /* UPDATE */

    _updatePreviousNext () {

      this.$previous.toggleClass ( this.options.classes.disabled, ( this._current.index === 0 && !this.options.wrap ) );
      this.$next.toggleClass ( this.options.classes.disabled, ( this._current.index === this.maxIndex && !this.options.wrap ) );

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

      if ( this.isLocked () || _.isNaN ( index ) || ( this._current && index === this._current.index ) ) return;

      this.lock ();

      if ( this._current ) {

        this._current.$item.removeClass ( this.options.classes.current ).addClass ( this.options.classes.previous );
        this._current.$indicator.removeClass ( this.options.classes.current );

        this._previous = this._current;

      }

      this._current = this._getItemObj ( index );
      this._current.$item.addClass ( this.options.classes.current );
      this._current.$indicator.addClass ( this.options.classes.current );

      this._updatePreviousNext ();

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

        this.unlock ();

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

  Factory.make ( Carousel, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Timer, Svelto.Animations ));


/* =========================================================================
 * Svelto - Widgets - Chart (Config)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before ./vendor/Chart.js
 * @require core/animations/animations.js
 * ========================================================================= */

/* CHART */

(function ( $, _, Svelto, Animations, ChartLib ) {

  'use strict';

  /* CHECK IF LOADED */

  if ( !ChartLib ) return;

  /* DEFAULTS */

  _.merge ( ChartLib.defaults.global, {
    maintainAspectRatio: false,
    hover: {
      animationDuration: Animations.normal
    },
    defaultColor: '#ffffff', // White background color
    defaultFontColor: '#3f3f3f', // White text color
    defaultFontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial, sans-serif", // Default font family
    defaultFontSize: 13.4544,
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 16,
        fontSize: 16,
        padding: 10
      }
    },
    tooltips: {
      backgroundColor: '#212121', // Black background color
      titleFontSize: 16,
      bodyFontSize: 16,
      footerFontSize: 16
    },
    animations: {
      duration: Animations.normal
    }
  });

}( Svelto.$, Svelto._, Svelto, Svelto.Animations, window.Chart ));


/* =========================================================================
 * Svelto - Widgets - Chart
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./config.js
 * @require core/widget/widget.js
 * ========================================================================= */

/* CHART */

(function ( $, _, Svelto, Widgets, Factory, ChartLib ) {

  'use strict';

  /* CHECK IF LOADED */

  if ( !ChartLib ) return;

  /* CONFIG */

  let config = {
    name: 'chart',
    plugin: true,
    selector: 'canvas.chart',
    options: {
      defaults: {
        type: 'line',
        colors: ['#1565c0'], // Primary color
        labels: ['Dataset'],
        datas: [[]]
      },
      datas: {
        type: 'type',
        colors: 'colors',
        labels: 'labels',
        datas: 'datas'
      }
    }
  };

  /* CHART */

  class Chart extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$chart = this.$element;
      this.chart = this.element;

      let properties = ['type', 'colors', 'labels', 'datas'];

      for ( let property of properties ) {

        this[property] = this.$chart.data ( this.options.datas[property] ) || this.options.defaults[property];

      }

      if ( !_.isArray ( this.datas[0] ) ) this.datas = [this.datas];

    }

    _init () {

      let settings = this._getSettings ();

      this.instance = new ChartLib ( this.chart, settings );

    }

    _destroy () {

      this.instance.destroy ();

    }

    /* PRIVATE */

    _getSettings () {

      return {
        type: this.type,
        data: {
          labels: this.datas[0].map ( ( point, index ) => index + 1 ),
          datasets: _.map ( this.labels, ( label, index ) => ({
            label,
            data: this.datas[index],
            backgroundColor: this.colors[index]
          }))
        }
      };

    }

  }

  /* FACTORY */

  Factory.make ( Chart, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, window.Chart ));


/* =========================================================================
 * Svelto - Widgets - Chat - Message - Replyable
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/colors/colors.js
 * @require core/widget/widget.js
 * @require widgets/remote/loader/loader.js
 * ========================================================================= */

//TODO: Add a demo for it

(function ( $, _, Svelto, Widgets, Factory, Colors ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'chatMessageReplyable',
    plugin: true,
    selector: '.chat-message.replyable',
    templates: {
      reply: '<div class="chat-message-reply no-tip <%= o.cls %>">' +
               '<%= o.img ? \'<div class="chat-message-img"></div>\' : "" %>' +
               '<div class="chat-message-content remote-loader no-wrap container bordered" data-url="<%= o.url %>">' +
                 '<svg class="spinner">' +
                   '<circle cx="1.625em" cy="1.625em" r="1.25em"></circle>' +
                 '</svg>' +
               '</div>' +
             '</div>'
    },
    options: {
      url: false, // Url for remote-loading the actual reply widget
      datas: {
        url: 'reply-url'
      },
      selectors: {
        reply: '+ .chat-message-reply'
      },
      callbacks: {
        reply: _.noop,
        unreply: _.noop
      }
    }
  };

  /* CHAT MESSAGE REPLY */

  class ChatMessageReplyable extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$replyable = this.$element;

      this.options.url = this.$replyable.data ( this.options.datas.url ) || this.options.url;

    }

    /* HELPERS */

    _getReply () {

      return this.$replyable.find ( this.options.selectors.reply );

    }

    /* API */

    reply () {

      let $reply = this._getReply ();

      if ( $reply.length ) return $reply.focus ();

      let cls = this.$replyable.attr ( 'class' ),
          img = !!this.$replyable.children ( '.chat-message-img' ).length,
          url = this.options.url,
          options = {cls, img, url};

      $reply = $(this._template ( 'reply', options ));

      this.$replyable.after ( $reply );

      $reply.focus ().widgetize ();

      this._trigger ( 'reply' );

    }

    unreply () {

      let $reply = this._getReply ();

      if ( !$reply.length ) return;

      $reply.trigger ( 'chatmessagereplyablereply:unreply' ).remove ();

      this._trigger ( 'unreply' );

    }

  }

  /* FACTORY */

  Factory.make ( ChatMessageReplyable, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Colors ));


/* =========================================================================
 * Svelto - Widgets - Checkbox
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
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

  class Checkbox extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$checkbox = this.$element;

      this.$input = this.$checkbox.find ( this.options.selectors.input );
      this.input = this.$input[0];

      this.inputId = this.$input.attr ( 'id' );

    }

    _events () {

      this.___tap ();

    }

    /* TAP */

    ___tap () {

      this._on ( true, Pointer.tap, this.__tap );

    }

    __tap ( event ) {

      if ( event.target === this.input || $(event.target).is ( `label[for="${this.inputId}"]` ) ) return;

      this.$input.prop ( 'checked', !this.$input.prop ( 'checked' ) ).trigger ( 'change' );

    }

  }

  /* FACTORY */

  Factory.make ( Checkbox, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Widgets - Datepicker
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

// When using using an incomplete-information format (those where not all the info are exported, like YYYYMMDD) the behaviour when used in combination with, for instance, `formSync` would be broken: at GTM+5 it may be the day 10, but at UTC may actually be day 9, and when syncing we won't get the right date synced between both datepickers
// Accordion to ISO-8601 the first day of the week is Monday

//FIXME: When using the arrows the prev day still remains hovered even if it's not below the cursor (chrome) //TODO: Make a SO question, maybe we can workaround it

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'datepicker',
    plugin: true,
    selector: '.datepicker',
    options: {
      exporters: {
        YYYYMMDD ( date, data ) {
          return [_.padStart ( date.getUTCFullYear (), 4, 0 ), _.padStart ( parseInt ( date.getUTCMonth (), 10 ) + 1, 2, 0 ), _.padStart ( date.getUTCDate (), 2, 0 )].join ( data.separator );
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

      this._onHover ( [$.$document, 'keydown', this.__keydown] );

    }

    /* NAVIGATION */

    ___navigation () {

      this._on ( this.$navigationPrev, Pointer.tap, _.wrap ( 'previousMonth', this.__navigation ) );
      this._on ( this.$navigationNext, Pointer.tap, _.wrap ( 'nextMonth', this.__navigation ) );
      this._on ( this.$navigationToday, Pointer.tap, _.wrap ( 'navigateToToday', this.__navigation ) );

    }

    __navigation ( method, event ) {

      event.preventDefault ();
      event.stopImmediatePropagation ();

      this[method]();

    }

    /* DAY TAP */

    ___dayTap () {

      this._on ( Pointer.tap, this.options.selectors.day.current, this.__dayTap );

    }

    __dayTap ( event ) {

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

  Factory.make ( Datepicker, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Widgets - Draggable
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

//FIXME: Reposition the draggable properly when autoscrolling inside a container (not document/html)
//FIXME: On iOS, if the draggable is too close to the left edge of the screen dragging it will cause a `scroll to go back` event/animation on safari

(function ( $, _, Svelto, Widgets, Factory, Animations, Browser, Pointer, Mouse ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'draggable',
    plugin: true,
    selector: '.draggable',
    options: {
      draggable: _.true, // Checks if we can drag it or not
      multitouch: { // Multitouch-related options
        enabled: false // Whether to abort on multitouch events or not
      },
      threshold: { // Minimum moving threshold for triggering a drag. They can also be functions that return the threshold
        touch () { // Enabled on touch events
          return this.options.axis ? 0 : 5; // If an axis is specified we disable the threshold, in order to enable scrolling
        },
        mouse: 0 // Enabled on mouse events
      },
      tolerance: { // If an axis is set, the draggable didn't move yet, and we drag by more than tolerance in the wrong axis we won't be able to drag it anymore. They can also be functions that return the tolerance
        touch: 0, // Enabled on touch events, it should be 0 since we want to black any scrolling from happeing
        mouse: 5 // Enabled on mouse events
      },
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

  class Draggable extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.draggable = this.element;
      this.$draggable = this.$element;

      this.$handlers = this.options.onlyHandlers ? this.$draggable.find ( this.options.selectors.handler ) : this.$draggable;

      this.__doMove = this._frames ( this.__doMove.bind ( this ) ); // For performance reasons

    }

    _events () {

      this.___down ();
      this.___proxy ();

    }

    /* UTILITIES */

    _getThreshold () {

      let threshold = this.isTouch ? this.options.threshold.touch : this.options.threshold.mouse;

      return _.isFunction ( threshold ) ? threshold.call ( this ) : threshold;

    }

    _getTolerance () {

      let tolerance = this.isTouch ? this.options.tolerance.touch : this.options.tolerance.mouse;

      return _.isFunction ( tolerance ) ? tolerance.call ( this ) : tolerance;

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

    _centerToPoint ( XY, suppressClasses ) {

      let offset = this.$movable.offset (),
          rect = this.$movable.getRect (),
          deltaXY = {
            x: XY.x - ( offset.left + ( rect.width / 2 ) ),
            y: XY.y - ( offset.top + ( rect.height / 2 ) )
          };

      return this._actionMove ( deltaXY, suppressClasses );

    }

    _actionMove ( deltaXY, suppressClasses ) {

      /* INITIAL */

      this.initialXY = this.initialXY || this.$movable.translate ();

      /* INIT */

      if ( !this.inited ) {

        this.inited = true;

        /* CLAMPING VALUES */

        if ( this.options.constrainer.$element ) {

          let constrainerRect = this.options.constrainer.$element.getRect (),
              movableRect = this.$movable.getRect ();

          if ( this.options.axis !== 'y' ) {

            let halfWidth = this.options.constrainer.center ? movableRect.width / 2 : 0;

            this.translateX_min = constrainerRect.left - ( movableRect.left - this.initialXY.x ) - halfWidth;
            this.translateX_max = constrainerRect.left + constrainerRect.width - ( ( movableRect.left - this.initialXY.x ) + movableRect.width ) + halfWidth;

          }

          if ( this.options.axis !== 'x' ) {

            let halfHeight = this.options.constrainer.center ? movableRect.height / 2 : 0;

            this.translateY_min = constrainerRect.top - ( movableRect.top - this.initialXY.y ) - halfHeight;
            this.translateY_max = constrainerRect.top + constrainerRect.height - ( ( movableRect.top - this.initialXY.y ) + movableRect.height ) + halfHeight;

          }

        }

        /* CLASSES */

        if ( !suppressClasses ) {

          this._addClasses ();

        }

      }

      /* CLAMPING */

      let translateX = this.initialXY.x,
          translateY = this.initialXY.y;

      if ( this.options.axis !== 'y' ) {

        translateX += deltaXY.x;

        if ( this.options.constrainer.$element ) {

          translateX = _.clamp ( translateX, this.translateX_min - this.options.constrainer.tolerance.x, this.translateX_max + this.options.constrainer.tolerance.x );

        }

      }

      if ( this.options.axis !== 'x' ) {

        translateY += deltaXY.y;

        if ( this.options.constrainer.$element ) {

          translateY = _.clamp ( translateY, this.translateY_min - this.options.constrainer.tolerance.y, this.translateY_max + this.options.constrainer.tolerance.y );

        }

      }

      /* MODIFYING */

      let modifiedXY = {
            x: this.options.axis !== 'y' ? this.options.modifiers.x ( translateX ) : false,
            y: this.options.axis !== 'x' ? this.options.modifiers.y ( translateY ) : false
          };

      /* ABORTION */

      if ( modifiedXY.x === false && modifiedXY.y === false ) return this.initialXY;

      /* SETTING */

      let endXY = {
        x: _.isBoolean ( modifiedXY.x ) ? ( modifiedXY.x ? translateX : this.initialXY.x ) : modifiedXY.x,
        y: _.isBoolean ( modifiedXY.y ) ? ( modifiedXY.y ? translateY : this.initialXY.y ) : modifiedXY.y
      };

      this.$movable.translate ( endXY.x, endXY.y );

      /* MOTION */

      this.motion = true;

      /* RETURNING */

      return endXY;

    }

    /* CLASSES */

    _toggleClasses ( force ) {

      this.$layout.toggleClass ( this.options.classes.layout.dragging, force );
      this.$movable.toggleClass ( this.options.classes.dragging, force );

    }

    _addClasses () {

      this._toggleClasses ( true );

    }

    _removeClasses () {

      this._toggleClasses ( false );

    }

    /* HELPER */

    _getHelper ( $draggable ) {

      return _.isFunction ( this.options.$helper )
               ? this.options.$helper ( $draggable )
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

          let scrollTop = $.document.scrollTop ();

  				if ( pointXY.y - scrollTop <= this.options.scroll.sensitivity ) {

          	$.document.scrollTop ( scrollTop - this.options.scroll.speed );

          } else if ( $.window.innerHeight - ( pointXY.y - scrollTop ) <= this.options.scroll.sensitivity ) {

          	$.document.scrollTop ( scrollTop + this.options.scroll.speed );

          }

  			}

  			if ( this.options.axis !== 'y' ) {

          let scrollLeft = $.document.scrollLeft ();

  				if ( pointXY.x - scrollLeft <= this.options.scroll.sensitivity ) {

          	$.document.scrollLeft ( scrollLeft - this.options.scroll.speed );

          } else if ( $.window.innerWidth - ( pointXY.x - scrollLeft ) <= this.options.scroll.sensitivity ) {

          	$.document.scrollLeft ( scrollLeft + this.options.scroll.speed );

          }

  			}

  		} else {

        let parentOffset = this.$scrollParent.offset ();

  			if ( this.options.axis !== 'x' ) {

  				if ( ( parentOffset.top + this.scrollParent.offsetHeight ) - pointXY.y <= this.options.scroll.sensitivity ) {

  					this.scrollParent.scrollTop += this.options.scroll.speed;

  				} else if ( pointXY.y - parentOffset.top <= this.options.scroll.sensitivity ) {

  					this.scrollParent.scrollTop -= this.options.scroll.speed;

  				}

  			}

  			if ( this.options.axis !== 'y' ) {

  				if ( ( parentOffset.left + this.scrollParent.offsetWidth ) - pointXY.x <= this.options.scroll.sensitivity ) {

  					this.scrollParent.scrollLeft += this.options.scroll.speed;

  				} else if ( pointXY.x - parentOffset.left <= this.options.scroll.sensitivity ) {

  					this.scrollParent.scrollLeft -= this.options.scroll.speed;

  				}

  			}

  		}

    }

    /* REVERT */

    _revert () {

      this.lock ();

      this._frame ( function () {

        this.$movable.addClass ( this.options.classes.reverting );

        this._frame ( function () {

          this.$movable.translate ( this.initialXY.x, this.initialXY.y );

          this._delay ( function () {

            this.$movable.removeClass ( this.options.classes.reverting );

            if ( this.$helper ) {

              this._destroyHelper ();

            }

            this.unlock ();

          }, this.options.animations.revert );

        });

      });

    }

    /* CLICK */

    __click ( event ) {

      if ( !this.motion ) return;

      event.preventDefault ();
      event.stopImmediatePropagation ();

    }

    /* DRAG START */

    __dragStart ( event ) { // We have to catch it or dragging `img`s on Firefox won't work reliably

      event.preventDefault ();
      event.stopImmediatePropagation ();

    }

    /* DRAG HANDLERS */

    __down ( event ) {

      if ( this.isLocked () || !this.options.draggable ( this ) || Mouse.hasButton ( event, Mouse.buttons.RIGHT ) ) return;

      if ( this.__isAbortable ( event ) ) return this.__abort ( event );

      event.stopImmediatePropagation ();

      this.inited = false;
      this.motion = false;
      this.skippable = true;
      this.scrollInited = false;
      this.ended = false;

      this.$helper = this._getHelper ( this.$draggable );
      this.helper = this.$helper ? this.$helper[0] : false;

      this.$movable = ( this.$helper || this.$draggable );

      this.startEvent = event;
      this.startXY = $.eventXY ( event );

      this.isProxyed = ( this.options.proxy.$element && event.currentTarget === this.options.proxy.$element[0] );

      this.initialXY = false;

      this._trigger ( 'start', { draggable: this.draggable, helper: this.helper, isProxyed: this.isProxyed, startEvent: this.startEvent, startXY: this.startXY } );

      this._on ( true, $.$document, Pointer.move, this.__move );
      this._one ( true, $.$document, Pointer.up, this.__up );
      this._one ( true, $.$document, Pointer.cancel, this.__cancel );
      this._one ( true, Pointer.click, this.__click );
      this._one ( true, $.$document, 'dragstart', this.__dragStart );

    }

    __move ( event ) {

      if ( this.__isAbortable ( event ) ) return this.__abort ( event );

      this.moveEvent = event;
      this.moveXY = $.eventXY ( event ),
      this.deltaXY = {
        x: this.moveXY.x - this.startXY.x,
        y: this.moveXY.y - this.startXY.y
      };

      if ( this.skippable ) {

        this.isTouch = Pointer.isTouchEvent ( event );

        let x = Math.abs ( this.deltaXY.x ),
            y = Math.abs ( this.deltaXY.y );

        /* TOLERANCE */

        if ( this.options.axis ) {

          let tolerance = this._getTolerance (),
              exceeded = ( this.options.axis === 'x' && y > tolerance && y > x ) || ( this.options.axis === 'y' && x > tolerance && x > y );

          if ( exceeded ) return this._off ( $.$document, Pointer.move, this.__move );

        }

        /* THRESHOLD */

        let threshold = this._getThreshold ();

        switch ( this.options.axis ) {
          case 'x':
            if ( x < threshold ) return;
            break;
          case 'y':
            if ( y < threshold ) return;
            break;
          default:
            if ( x < threshold && y < threshold ) return;
            break;
        }

        this.skippable = false;

      }

      event.preventDefault ();
      event.stopImmediatePropagation ();

      this.__doMove ();

    }

    __doMove () {

      if ( this.ended ) return;

      if ( !this.inited ) {

        if ( this.$helper ) {

          this._initHelper ();

        }

        if ( this.$helper || this.isProxyed ) {

          this.initialXY = this._centerToPoint ( this.startXY );

        }

      }

      let dragXY = this._actionMove ( this.deltaXY );

      this._autoscroll ( this.moveXY );

      this._trigger ( 'move', { draggable: this.draggable, helper: this.helper,isProxyed: this.isProxyed, initialXY: this.initialXY, startEvent: this.startEvent, startXY: this.startXY, moveEvent: this.moveEvent, moveXY: this.moveXY, dragXY: dragXY } );

    }

    __up ( event ) {

      event.preventDefault ();
      event.stopImmediatePropagation ();

      this.ended = true;

      let endXY = $.eventXY ( event ),
          dragXY = this.initialXY;

      if ( this.inited ) {

        this._removeClasses ();

      }

      if ( this.motion ) {

        if ( this.options.revert ) {

          this._revert ();

        } else if ( this.$helper ) {

          this._destroyHelper ();

        } else {

          dragXY = this.$movable.translate ();

        }

      } else if ( this.isProxyed && !this.$helper ) {

        if ( ( _.isFunction ( this.options.proxy.noMotion ) ? this.options.proxy.noMotion () : this.options.proxy.noMotion ) && Mouse.hasButton ( event, Mouse.buttons.LEFT, true ) ) {

          dragXY = this._centerToPoint ( endXY, true );

        }

      }

      this._off ( $.$document, Pointer.move, this.__move );
      this._off ( $.$document, Pointer.cancel, this.__cancel );
      this._off ( $.$document, 'dragstart', this.__dragStart );

      if ( this.startEvent.target !== event.target ) this._off ( Pointer.click, this.__click );

      this._trigger ( 'end', { draggable: this.draggable, helper: this.helper, isProxyed: this.isProxyed, initialXY: this.initialXY, startEvent: this.startEvent, startXY: this.startXY, endEvent: event, endXY: endXY, dragXY: dragXY, motion: this.motion } );

    }

    __cancel ( event ) {

      event.stopImmediatePropagation ();

      this.ended = true;

      let endXY = $.eventXY ( event ),
          dragXY = this.$movable.translate ();

      if ( this.inited ) {

        this._removeClasses ();

      }

      if ( this.motion ) {

        if ( this.options.revert ) {

          this._revert ();

          dragXY = this.initialXY;

        } else if ( this.$helper ) {

          this._destroyHelper ();

        }

      }

      this._off ( $.$document, Pointer.move, this.__move );
      this._off ( $.$document, Pointer.up, this.__up );
      this._off ( Pointer.click, this.__click );
      this._off ( $.$document, 'dragstart', this.__dragStart );

      this._trigger ( 'end', { draggable: this.draggable, helper: this.helper, initialXY: this.initialXY, startEvent: this.startEvent, startXY: this.startXY, endEvent: event, endXY: endXY, dragXY: dragXY, motion: this.motion, cancelled: true } );

    }

    __isAbortable ( event ) {

      if ( !this.options.multitouch.enabled ) {

        const {originalEvent} = event;

        if ( 'touches' in originalEvent && originalEvent.touches.length > 1 ) return true;

      }

      return false;

    }

    __abort ( event ) {

      this._off ( $.$document, Pointer.cancel, this.__cancel );

      this.__cancel ( event );

    }

  }

  /* FACTORY */

  Factory.make ( Draggable, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Animations, Svelto.Browser, Svelto.Pointer, Svelto.Mouse ));


/* =========================================================================
 * Svelto - Widgets - Colorpicker
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * @require lib/color/color.js
 * @require lib/transform/transform.js
 * @require widgets/draggable/draggable.js
 * ========================================================================= */

//FIXME: Add support of it working without a `startColor`
//TODO: Add support for not setting a starting color, in some cases it might be needed not to set a color by default
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
      live: false, // Whether it will update the input also on `Draggable.move` or just on `Draggable.end`
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

      this._onHover ( this.$sbWrp, [$.$document, 'keydown', this.__sbKeydown] );

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
          start: this.__sbDragStart.bind ( this ),
          move: this._frames ( this.__sbDragMove.bind ( this ) ),
          end: this.__sbDragEnd.bind ( this )
        }
      });

    }

    _sbDragSet ( XY, update ) {

      this.hsv.s =  _.clamp ( XY.x, 0, this.sbWrpSize ) * 100 / this.sbWrpSize;
      this.hsv.v =  100 - ( _.clamp ( XY.y, 0, this.sbWrpSize ) * 100 / this.sbWrpSize );

      this._updateSb ( false );

      if ( update ) {

        this._updateInput ();

      }

    }

    __sbDragStart () {

      this._sbDragging = true;

    }

    __sbDragMove ( event, data ) {

      if ( !this._sbDragging ) return;

      this._sbDragSet ( data.dragXY, this.options.live );

    }

    __sbDragEnd ( event, data ) {

      this._sbDragging = false;

      this._sbDragSet ( data.dragXY, true );

    }

    /* HUE ARROWS */

    ___hueKeydown () {

      this._onHover ( this.$hueWrp, [$.$document, 'keydown', this.__hueKeydown] );

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
          start: this.__hueDragStart.bind ( this ),
          move: this._frames ( this.__hueDragMove.bind ( this ) ),
          end: this.__hueDragEnd.bind ( this )
        }
      });

    }

    _hueDragSet ( XY, update ) {

      this.hsv.h = 359 - ( _.clamp ( XY.y, 0, this.hueWrpHeight ) * 359 / this.hueWrpHeight );

      this._updateHue ( false );

      if ( update ) {

        this._updateInput ();

      }

    }

    __hueDragStart () {

      this._hueDragging = true;

    }


    __hueDragMove ( event, data ) {

      if ( !this._hueDragging ) return;

      this._hueDragSet ( data.dragXY, this.options.live );

    }

    __hueDragEnd ( event, data ) {

      this._hueDragging = false;

      this._hueDragSet ( data.dragXY, true );

    }

    /* UPDATE */

    _updateSb ( _translate = true ) {

      /* HSL */

      let hsl = Color.hsv2hsl ( this.hsv );

      this.$sbHandler.hsl ( hsl.h, hsl.s, hsl.l );

      /* TRANSLATE */

      if ( _translate ) {

        let translateX = this.sbWrpSize / 100 * this.hsv.s,
            translateY = this.sbWrpSize / 100 * ( 100 - this.hsv.v );

        this.$sbHandler.translate ( translateX, translateY );

      }

    }

    _updateHue ( _translate = true ) {

      /* HSL */

      let hsl = Color.hsv2hsl ( this.hsv );

      this.$hueHandler.hsl ( this.hsv.h, 100, 50 );
      this.$sbHandler.hsl ( hsl.h, hsl.s, hsl.l );
      this.$sbWrp.hsl ( this.hsv.h, 100, 50 );

      /* TRANSLATE */

      if ( _translate ) {

        let translateY = this.hueWrpHeight / 100 * ( 100 - ( this.hsv.h / 360 * 100 ) );

        this.$hueHandler.translateY ( translateY );

      }

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

  Factory.make ( Colorpicker, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Color, Svelto.Keyboard ));


/* =========================================================================
 * Svelto - Widgets - Droppable
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * @require lib/touching/touching.js
 * @require widgets/draggable/draggable.js
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

    _isPointHovering ( pointXY, event  ) {

      let point = pointXY || $.eventXY ( event, 'clientX', 'clientY' );

      return !!this.$droppable.touching ({ point }).length;

    }

    /* DRAG */

    ___drag () {

      this.___dragMove ();
      this.___dragEnd ();

    }

    /* DRAG MOVE */

    ___dragMove () {

      this._on ( this.$layout, 'draggable:move', this._frames ( this.__dragMove.bind ( this ) ) );

    }

    __dragMove ( event, data ) {

      if ( !this._isCompatible ( data.draggable ) ) return;

      let isHovering = this._isPointHovering ( false, data.moveEvent );

      if ( isHovering !== this._wasHovering ) {

        this.$droppable.toggleClass ( this.options.classes.hover, isHovering );

        this._trigger ( isHovering ? 'enter' : 'leave', { draggable: data.draggable, helper: data.helper, droppable: this.droppable } );

      }

      this._wasHovering = isHovering;

    }

    /* DRAG END */

    ___dragEnd () {

      this._on ( this.$layout, 'draggable:end', this.__dragEnd );

    }

    __dragEnd ( event, data ) {

      if ( this._isCompatible ( data.draggable ) ) {

        this.$droppable.removeClass ( this.options.classes.target );

        if ( this._isPointHovering ( false, data.endEvent ) ) {

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

  Factory.make ( Droppable, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

;(function() {

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  table: noop,
  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
  text: /^[^\n]+/
};

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = replace(block.item, 'gm')
  (/bull/g, block.bullet)
  ();

block.list = replace(block.list)
  (/bull/g, block.bullet)
  ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
  ('def', '\\n+(?=' + block.def.source + ')')
  ();

block.blockquote = replace(block.blockquote)
  ('def', block.def)
  ();

block._tag = '(?!(?:'
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

block.html = replace(block.html)
  ('comment', /<!--[\s\S]*?-->/)
  ('closed', /<(tag)[\s\S]+?<\/\1>/)
  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
  (/tag/g, block._tag)
  ();

block.paragraph = replace(block.paragraph)
  ('hr', block.hr)
  ('heading', block.heading)
  ('lheading', block.lheading)
  ('blockquote', block.blockquote)
  ('tag', '<' + block._tag)
  ('def', block.def)
  ();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
  paragraph: /^/,
  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
});

block.gfm.paragraph = replace(block.paragraph)
  ('(?!', '(?!'
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  ();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = {};
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.gfm) {
    if (this.options.tables) {
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top, bq) {
  var src = src.replace(/^ +$/gm, '')
    , next
    , loose
    , cap
    , bull
    , b
    , item
    , space
    , i
    , l;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      this.tokens.push({
        type: 'code',
        text: !this.options.pedantic
          ? cap.replace(/\n+$/, '')
          : cap
      });
      continue;
    }

    // fences (gfm)
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2],
        text: cap[3] || ''
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (top && (cap = this.rules.nptable.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i].split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top, true);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];

      this.tokens.push({
        type: 'list_start',
        ordered: bull.length > 1
      });

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (this.options.smartLists && i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        this.tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start'
        });

        // Recurse.
        this.token(item, false, bq);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: !this.options.sanitizer
          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
        text: cap[0]
      });
      continue;
    }

    // def
    if ((!bq && top) && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.links[cap[1].toLowerCase()] = {
        href: cap[2],
        title: cap[3]
      };
      continue;
    }

    // table (gfm)
    if (top && (cap = this.rules.table.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i]
          .replace(/^ *\| *| *\| *$/g, '')
          .split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
};

inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

inline.link = replace(inline.link)
  ('inside', inline._inside)
  ('href', inline._href)
  ();

inline.reflink = replace(inline.reflink)
  ('inside', inline._inside)
  ();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: replace(inline.escape)('])', '~|])')(),
  url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
  del: /^~~(?=\S)([\s\S]*?\S)~~/,
  text: replace(inline.text)
    (']|', '~]|')
    ('|', '|https?://|')
    ()
});

/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: replace(inline.br)('{2,}', '*')(),
  text: replace(inline.gfm.text)('{2,}', '*')()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer;
  this.renderer.options = this.options;

  if (!this.links) {
    throw new
      Error('Tokens array requires a `links` property.');
  }

  if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  } else if (this.options.pedantic) {
    this.rules = inline.pedantic;
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = ''
    , link
    , text
    , href
    , cap;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = cap[1].charAt(6) === ':'
          ? this.mangle(cap[1].substring(7))
          : this.mangle(cap[1]);
        href = this.mangle('mailto:') + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      src = src.substring(cap[0].length);
      text = escape(cap[1]);
      href = text;
      out += this.renderer.link(href, null, text);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? this.options.sanitizer
          ? this.options.sanitizer(cap[0])
          : escape(cap[0])
        : cap[0]
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      out += this.outputLink(cap, {
        href: cap[2],
        title: cap[3]
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2], true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.text(escape(this.smartypants(cap[0])));
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = escape(link.href)
    , title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/---/g, '\u2014')
    // en-dashes
    .replace(/--/g, '\u2013')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  if (!this.options.mangle) return text;
  var out = ''
    , l = text.length
    , i = 0
    , ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || {};
}

Renderer.prototype.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw) {
  return '<h'
    + level
    + ' id="'
    + this.options.headerPrefix
    + raw.toLowerCase().replace(/[^\w]+/g, '-')
    + '">'
    + text
    + '</h'
    + level
    + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered) {
  var type = ordered ? 'ol' : 'ul';
  return '<' + type + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' style="text-align:' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
      return '';
    }
  }
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

Renderer.prototype.text = function(text) {
  return text;
};

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer;
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options, renderer) {
  var parser = new Parser(options, renderer);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options, this.renderer);
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        this.token.text);
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = ''
        , body = ''
        , i
        , row
        , cell
        , flags
        , j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        flags = { header: true, align: this.token.align[i] };
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      var body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      var body = ''
        , ordered = this.token.ordered;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered);
    }
    case 'list_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'loose_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'html': {
      var html = !this.token.pre && !this.options.pedantic
        ? this.inline.output(this.token.text)
        : this.token.text;
      return this.renderer.html(html);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
  }
};

/**
 * Helpers
 */

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescape(html) {
  return html.replace(/&([#\w]+);/g, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function replace(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return function self(name, val) {
    if (!name) return new RegExp(regex, opt);
    val = val.source || val;
    val = val.replace(/(^|[^\[])\^/g, '$1');
    regex = regex.replace(name, val);
    return self;
  };
}

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1
    , target
    , key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}


/**
 * Marked
 */

function marked(src, opt, callback) {
  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});

    var highlight = opt.highlight
      , tokens
      , pending
      , i = 0;

    try {
      tokens = Lexer.lex(src, opt)
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/chjj/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occured:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.defaults = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  sanitizer: null,
  mangle: true,
  smartLists: false,
  silent: false,
  highlight: null,
  langPrefix: 'lang-',
  smartypants: false,
  headerPrefix: '',
  renderer: new Renderer,
  xhtml: false
};

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.parse = marked;

this.marked = marked;

}).call(function() {
  return this || (typeof window !== 'undefined' ? window : global);
}());


/* =========================================================================
 * Svelto - Widgets - Expander
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/animations/animations.js
 * @require widgets/autofocusable/autofocusable.js
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

  class Expander extends Widgets.Autofocusable {

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

        this._isOpen ? this.autofocus () : this.autoblur ();

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

  Factory.make ( Expander, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Animations ));


/* =========================================================================
 * Svelto - Widgets - Accordion
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require widgets/expander/expander.js
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

      _.invokeMap ( this.instances, 'enable' );

    }

    disable () {

      _.invokeMap ( this.instances, 'disable' );

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

  Factory.make ( Accordion, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Flickable
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
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
      threshold: 5, // Minimum moving threshold of the flick gesture
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

      this._one ( true, $.$document, Pointer.move, this.__move );

    }

    __move () {

      this._motion = true;

    }

    /* UP */

    ___up () {

      this._one ( true, $.$document, Pointer.up, this.__up );

    }

    __up ( event ) {

      this._endTimestamp = event.timeStamp || Date.now ();

      if ( this._motion && ( this._endTimestamp - this._startTimestamp <= this.options.duration ) ) {

        let endXY = $.eventXY ( event ),
            deltaXY = {
              x: endXY.x - this._startXY.x,
              y: endXY.y - this._startXY.y
            },
            absDeltaXY = {
              x: Math.abs ( deltaXY.x ),
              y: Math.abs ( deltaXY.y )
            };

        if ( absDeltaXY.x >= this.options.threshold || absDeltaXY.y >= this.options.threshold ) {

          let orientation,
              direction;

          if ( absDeltaXY.x > absDeltaXY.y ) {

            orientation = 'horizontal';
            direction = ( deltaXY.x > 0 ) ? 'right' : 'left';

          } else {

            orientation = 'vertical';
            direction = ( deltaXY.y > 0 ) ? 'bottom' : 'top';

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

        this._off ( $.$document, Pointer.move, this.__move );

      }

      this._off ( $.$document, Pointer.cancel, this.__cancel );

    }

    /* CANCEL */

    ___cancel () {

      this._one ( true, $.$document, Pointer.cancel, this.__cancel );

    }

    __cancel () {

      if ( !this._motion ) {

        this._off ( $.$document, Pointer.move, this.__move );

      }

      this._off ( $.$document, Pointer.up, this.__up );

    }

  }

  /* FACTORY */

  Factory.make ( Flickable, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Widgets - Flippable
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require widgets/autofocusable/autofocusable.js
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
      selectors: {
        front: '.flippable-front',
        back: '.flippable-back'
      },
      callbacks: {
        front: _.noop,
        back: _.noop
      }
    }
  };

  /* FLIPPABLE */

  class Flippable extends Widgets.Autofocusable {

    /* SPECIAL */

    _variables () {

      this.$flippable = this.$element;
      this.$front = this.$flippable.find ( this.options.selectors.front );
      this.$back = this.$flippable.find ( this.options.selectors.back );

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

        this.autoblur ( this._isFlipped ? this.$front : this.$back );
        this.autofocus ( this._isFlipped ? this.$back : this.$front );

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

  Factory.make ( Flippable, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Form - Sync
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
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

  Factory.make ( FormSync, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Form - Validate
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * @require lib/validator/validator.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

//TODO: Add support for multiple checkboxes validation
//TODO: Add meta validators that accepts other validators as arguments, for example not[email], oppure not[matches[1,2,3]] oppure or[email,url] etc... maybe write it this way: or[matches(1-2-3)/matches(a-b-c)], or just use a smarter regex
//TODO: Maybe make it generic (so that it can be used in single elements) and just call it `validate`

(function ( $, _, Svelto, Widgets, Factory, Validator ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'formValidate',
    plugin: true,
    selector: 'form.validate',
    templates: {
      message: '<p class="form-validate-message <%= o.validity %>">' +
                 '<%= o.message %>' +
               '</p>',
      messages: '<ul class="form-validate-message <%= o.validity %>">' +
                  '<% for ( var i = 0, l = o.messages.length; i < l; i++ ) { %>' +
                    '<li><%= o.messages[i] %></li>' +
                  '<% } %>' +
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
        },
        regex ( value, regex ) {
          return !!value.match ( new RegExp ( regex ) );
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
        wrapper: '.checkbox, .colorpicker, .datepicker, .editor, .radio, .select, .slider, .switch'
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
            isWrapped = !!$wrappers.length,
            $wrapper = isWrapped ? $wrappers.first () : $element,
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
            invalid: isWrapped ? $element.data ( this.options.datas.messages.invalid ) || $wrapper.data ( this.options.datas.messages.invalid ) : $element.data ( this.options.datas.messages.invalid ),
            valid: isWrapped ? $element.data ( this.options.datas.messages.valid ) || $wrapper.data ( this.options.datas.messages.valid ) : $element.data ( this.options.datas.messages.valid )
          }
        };

      }

    }

    /* UPDATE */

    _updateElement ( elementObj ) {

      /* FORM */

      this._isValid = undefined;

      /* ELEMENT */

      elementObj.isDirty = true;
      elementObj.isValid = undefined;

      this._validateWorker ( elementObj );

      /* OTHERS */

      for ( let id in this.elements ) {

        if ( !this.elements.hasOwnProperty ( id ) ) continue;

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

    _updateElements () {

      for ( let id in this.elements ) {

        if ( !this.elements.hasOwnProperty ( id ) ) continue;

        this._updateElement ( this.elements[id] );

      }

    }

    /* CHANGE */

    ___change () {

      this._on ( true, this.$elements, 'change', this.__change );

    }

    __change ( event ) {

      this._updateElement ( this.elements[event.currentTarget[this.options.datas.id]] );

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

      this._updateElements ();

      if ( !this.isValid () ) {

        event.preventDefault ();
        event.stopImmediatePropagation ();

        $.toast ( this.options.messages.form.invalid );

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

          if ( !validations.hasOwnProperty ( name ) ) continue;

          let validation = validations[name],
              isValid = validation.validator.apply ( { elements: this.elements, element: elementObj }, [elementObj.value].concat ( validation.args ) );

          if ( !isValid ) {

            let error = _.format ( this.options.messages.validators.invalid[name] || this.options.messages.validators.invalid.general, elementObj.value, ...validation.args );

            errors.push ( error );

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
                        ? this._template ( 'message', { message: message, validity: validity } )
                        : message.length === 1
                          ? this._template ( 'message', { message: message[0], validity: validity } )
                          : this._template ( 'messages', { messages: message, validity: validity } );

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

          if ( !this.elements.hasOwnProperty ( id ) ) continue;

          let elementObj = this.elements[id];

          if ( _.isUndefined ( elementObj.isValid ) ) {

            this._validateWorker ( elementObj );

          }

          if ( !elementObj.isValid ) {

            this._isValid = false;

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

  Factory.make ( FormValidate, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Validator ));


/* =========================================================================
 * Svelto - Widgets - Fullscreenable
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * @require lib/fullscreen/fullscreen.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Fullscreen ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'fullscreenable',
    plugin: true,
    selector: '.fullscreenable'
  };

  /* FULLSCREENABLE */

  class Fullscreenable extends Widgets.Widget {

    /* API */

    isFullscreen () {

      return Fullscreen.isFullscreen;

    }

    toggle ( force = !Fullscreen.isFullscreen ) {

      if ( !!force !== Fullscreen.isFullscreen ) {

        force ? this.request () : this.exit ();

      }

    }

    request () {

      Fullscreen.request ( this.element );

    }

    exit () {

      Fullscreen.exit ();

    }

  }

  /* FACTORY */

  Factory.make ( Fullscreenable, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Fullscreen ));


/* =========================================================================
 * Svelto - Widgets - Icon
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* ICON */

  let Icons = { // Maps each icon to its ligature/html entity, required for a  custom icon font
    'car': 'directions_car',
    'chevron-left': 'chevron_left',
    'chevron-right': 'chevron_right',
    'clock': 'access_time',
    'close': 'close',
    'cutlery': 'restaurant',
    'dots-horizontal': 'more_horiz',
    'emoticon': 'insert_emoticon',
    'flag': 'flag',
    'gym': 'fitness_center',
    'heart': 'favorite',
    'objects': 'devices_other',
    'page-first': 'first_page',
    'page-last': 'last_page',
    'paw': 'pets',
    'search': 'search'
  };

  let Icon = name => Icons[name];

  /* EXPORT */

  Svelto.Icons = Icons;
  Svelto.Icon = Icon;

}( Svelto.$, Svelto._, Svelto ));


/* =========================================================================
 * Svelto - Widgets - Datatables (Config)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato - All rights reserved.
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before ./vendor/datatables.js
 * @require core/svelto/svelto.js
 * @require widgets/icon/icon.js
 * ========================================================================= */

/* DATATABLES */

(function ( $, _, Svelto, Icon, DataTable ) {

  'use strict';

  /* CHECK IF LOADED */

  if ( !DataTable ) return;

  /* DEFAULTS */

  _.extend ( DataTable.defaults, {
    dom: '<"card-header bordered"' +
           '<"multiple center" l <"spacer hidden-xs-down"> f>' +
         '>' +
         '<"card-block bordered table-wrapper" t>' +
         '<"card-footer bordered"' +
           '<"multiple center" i <"spacer hidden-xs-down"> p>' +
         '>',
    autoWidth: false,
    lengthMenu: [ [10, 25, 50, 100, 250], [10, 25, 50, 100, 250] ],
    pageLength: 10,
    pagingType: 'simple_numbers_no_ellipses',
    renderer: 'svelto',
    drawCallback: function () {
      $(this).widgetize ();
    },
    initComplete: function () {
      $(this).closest ( '.datatable-wrapper' ).widgetize ();
    }
  });

  _.extend ( DataTable.defaults.oLanguage, {
    sInfo: 'Entries _START_-_END_ of _TOTAL_',
    sInfoEmpty: 'No entries to show',
    sInfoFiltered: ' (_MAX_ total)',
    sLengthMenu: '_MENU_<label>Show <strong><span class="select-value">10</span></strong> entries</label>',
    sSearch: `<div class="multiple joined no-separators">_INPUT_<div class="label compact bordered"><i class="icon">${Icon ( 'search' )}</i></div></div>`,
    sSearchPlaceholder: 'Search...'
  });

  _.extend ( DataTable.defaults.oLanguage.oPaginate, {
    sFirst: `<i class="icon">${Icon ( 'page-first' )}</i>`,
    sPrevious: `<i class="icon">${Icon ( 'chevron-left' )}</i>`,
    sNext: `<i class="icon">${Icon ( 'chevron-right' )}</i>`,
    sLast: `<i class="icon">${Icon ( 'page-last' )}</i>`
  });

  _.extend ( DataTable.ext.classes, {
    sFilter: 'datatable-filter',
    sFilterInput: 'bordered',
    sInfo: 'datatable-info',
    sLength: 'datatable-length button bordered select',
    sLengthSelect: '',
    sPageButton: 'button bordered compact',
    sPageButtonActive: 'active highlighted',
    sPageButtonDisabled: 'disabled',
    sPaging: 'datatable-pagination pagination multiple joined ', // Not a type, `pagingType` will get attached after this
    sProcessing: 'datatable-processing',
    sRowEmpty: 'datatable-row-empty',
    sScrollBody: 'datatable-scroll-body',
    sScrollFoot: 'datatable-scroll-foot',
    sScrollFootInner: 'datatable-scroll-foot-inner',
    sScrollHead: 'datatable-scroll-head',
    sScrollHeadInner: 'datatable-scroll-head-inner',
    sScrollWrapper: 'datatable-scroll',
    sSortAsc: 'sortable sort-asc',
    sSortColumn: 'sort-',
    sSortDesc: 'sortable sort-desc',
    sSortable: 'sortable',
    sSortableAsc: 'sort-asc-disabled',
    sSortableDesc: 'sort-desc-disabled',
    sSortableNone: 'sort-disabled',
    sStripeEven: 'even',
    sStripeOdd: 'odd',
    sTable: 'datatable',
    sWrapper: 'datatable-wrapper card bordered limited centered'
  });

  /* PAGER */

  DataTable.ext.pager.numbers_length = 5;
  DataTable.ext.pager.simple_numbers_no_ellipses = function ( page, pages ) {

    let blocks = DataTable.ext.pager.numbers_length,
        halfBlocks = Math.floor ( blocks / 2 ),
        numbers;

    if ( pages <= blocks ) {

      numbers = _.range ( 0, pages );

    } else if ( page <= halfBlocks ) {

      numbers = _.range ( 0, blocks );

    } else if ( page >= pages - 1 - halfBlocks ) {

      numbers = _.range ( pages - blocks, pages );

    } else {

      numbers = _.range ( page - halfBlocks, page + halfBlocks + 1 );

    }

    numbers.DT_el = false;

    return ['previous', numbers, 'next'];

  };

  /* RENDERER */

  DataTable.ext.renderer.pageButton.svelto = function ( settings, previous, idx, buttons, page, pages ) {

    /* VARIABLES */

  	let api = new DataTable.Api ( settings ),
        classes = settings.oClasses,
  	    lang = settings.oLanguage.oPaginate,
  	    aria = settings.oLanguage.oAria.paginate || {},
        counter = 0;

    /* ATTACH */

  	let attach = function ( container, buttons ) {

      /* CLICK HANDLER */

  		let clickHandler = function ( event ) {

  			event.preventDefault ();

  			if ( $(event.currentTarget).hasClass ( classes.sPageButtonDisabled ) || api.page () === event.data.action ) return;

  			api.page ( event.data.action ).draw ( 'page' );

  		};

      /* CONTENT */

  		for ( let i = 0, l = buttons.length; i < l; i++ ) {

  			let button = buttons[i];

  			if ( $.isArray ( button ) ) {

          attach ( container, button );

          continue;

        }

				let btnText = '',
            btnClasses = button;

				switch ( button ) {

					case 'ellipsis':
						btnText = `<i class="icon">${Icon ( 'dots-horizontal' )}</i>`;
            break;

					case 'first':
            if ( page === 0 ) continue;
						btnText = lang.sFirst;
						break;

					case 'previous':
            if ( page === 0 ) continue;
						btnText = lang.sPrevious;
						break;

					case 'next':
            if ( pages === 0 || page === pages - 1 ) continue;
						btnText = lang.sNext;
						break;

					case 'last':
            if ( pages === 0 || page === pages - 1 ) continue;
						btnText = lang.sLast;
						break;

					default:
						btnText = button + 1;
						btnClasses += page === button ? ' ' + classes.sPageButtonActive : '';
						break;

				}

				let node = $('<div>', {
          'aria-controls': settings.sTableId,
          'aria-label': aria[button],
          'data-dt-idx': counter,
          'tabindex': settings.iTabIndex,
					'class': classes.sPageButton + ' ' + btnClasses,
					'id': idx === 0 && typeof button === 'string' ? settings.sTableId + '_' + button : null
				}).html ( btnText )
          .appendTo ( container );

        if ( button !== 'ellipsis' ) {

          settings.oApi._fnBindAction ( node, { action: button }, clickHandler );

        }

				counter++;

  		}

  	};

    /* FOCUS */

    let $previous = $(previous),
  	    activeIDX = $previous.find ( document.activeElement ).data ( 'dt-idx' );

  	attach ( $previous.empty (), buttons );

  	if ( activeIDX ) {

  		$previous.find ( '[data-dt-idx=' + activeIDX + ']' ).focus ();

  	}

  };

  /* EXPORT */

  Svelto.DataTable = DataTable;

}( Svelto.$, Svelto._, Svelto, Svelto.Icon, Svelto.$.fn.dataTable ));


/* =========================================================================
 * Svelto - Widgets - Datatables
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato - All rights reserved.
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./config.js
 * @require core/widget/widget.js
 * ========================================================================= */

//TODO: Add a spinnerOverlay when processing
//TODO: Proxy all `*.dt` events as `dt:*`
//TODO: Test in all browsers
//TODO: Maybe add `autofocus` capabilities
//FIXME: We actually `require` Selectable, but requiring it creates a circular dependency...

/* DATATABLES */

(function ( $, _, Svelto, Widgets, Factory, DataTable ) {

  'use strict';

  /* CHECK IF LOADED */

  if ( !DataTable ) return;

  /* CONFIG */

  let config = {
    name: 'dt',
    plugin: true,
    selector: 'table.datatable',
    options: {
      select: false, // Select rows, even after a draw occurs -- basically supporting deferred loading
      /*
              {
                column: 0, // Index of the column used for finding rows to select
                value: 'value', // Selecting rows with this value in the appropriate column
                values: [] // Selecting rows with one of this values in the appropriate column
              }
      */
      datas: {
        select: 'select'
      },
      selectors: {
        wrapper: '.datatable-wrapper',
        length: '.datatable-length select'
      },
      keystrokes: {
        'ctmd + shift + left': ['page', 'first'],
        'ctmd + left': ['page', 'previous'],
        'ctmd + right': ['page', 'next'],
        'ctmd + shift + right': ['page', 'last']
      }
    }
  };

  /* DATATABLE */

  class DT extends Widgets.Widget {

    /* WIDGETIZE */

    static widgetize ( ele ) {

      if ( !$.isVisible ( ele ) ) return;

      $(ele).dataTable ().dt ();

    }

    /* SPECIAL */

    _variables () {

      this.$table = this.$element;
      this.$wrapper = this.$table.closest ( this.options.selectors.wrapper );
      this.$length = this.$wrapper.find ( this.options.selectors.length );

      this._api = this.$table.DataTable ();

    }

    _init () {

      this.options.select = this.$table.data ( this.options.datas.select ) || this.options.select;

    }

    _events () {

      this.___keydown ();
      this.___select ();

    }

    _destroy () {

      this.$wrapper.remove ();

    }

    /* KEYDOWN */

    ___keydown () {

      this._onHover ( this.$wrapper, [$.$document, 'keydown', this.__keydown] );

    }

    /* SELECT */

    ___select () {

      if ( !_.isPlainObject ( this.options.select ) ) return;

      this._on ( true, 'draw.dt', this.__select );

    }

    __select ( event, data ) {

      this._defer ( function () { // So that Selectable's listeners get triggered first //FIXME: Ugly

        if ( this.$table.selectable ( 'get' ).length ) return;

        let column = this.options.select.column,
            values = this.options.select.values || [this.options.select.value],
            rows   = data.aoData.filter ( row => _.includes ( values, row._aData[column] ) );

        if ( !rows.length ) return;

        let trs = rows.map ( row => row.nTr );

        $(trs).addClass ( Widgets.Selectable.config.options.classes.selected );

        this.$table.trigger ( 'change' ); // In order to make other widgets (Selectable etc.) adjust for this

      });

    }

    /* API */

    api ( method, ...args ) {

      return this._api[method]( ...args );

    }

    page ( page, row ) { // `page` and `row` are 0-index numbers, `page` can optionally be a string supported by Datatables

      if ( !_.isString ( page ) ) {

        page = _.isNumber ( page ) && !_.isNaN ( page ) ? page : Math.floor ( row / this.$length.val () );

        if ( _.isNaN ( page ) ) return this.api ( 'page' );

        if ( page === this.api ( 'page' ) ) return;

      }

      this.api ( 'page', page );
      this.api ( 'draw', false );

    }

  }

  /* FACTORY */

  Factory.make ( DT, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.DataTable ));


/* =========================================================================
 * Svelto - Widgets - Emoji - Picker
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require lib/emojify/emojify.js
 * @require widgets/icon/icon.js
 * @require widgets/storable/storable.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Icon, Pointer, EmojiData, Emoji ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'emojipicker',
    plugin: true,
    selector: '.emojipicker',
    templates: {
      base: '<div class="tabs emojipicker card bordered">' +
              '<% print ( self.triggers ( o ) ) %>' +
              '<% print ( self.containers ( o ) ) %>' +
              '<% print ( self.footer ( o ) ) %>' +
            '</div>',
      triggers: '<div class="tabs-triggers emojipicker-triggers card-header bordered">' +
                  '<% print ( self.triggerMain ( o ) ) %>' +
                  '<% for ( var i = 0, l = o.data.categories.length; i < l; i++ ) { %>' +
                    '<% print ( self.trigger ({ options: o, category: o.data.categories[i] }) ) %>' +
                  '<% } %>' +
                '</div>',
      trigger: '<div class="button" title="<%= o.category.title %>">' +
                 '<i class="icon"><%= Svelto.Icon ( o.category.icon ) %></i>' +
               '</div>',
      triggerMain: '<div class="button" title="Search & Frequent">' +
                     `<i class="icon">${Icon ( 'clock' )}</i>` +
                   '</div>',
      containers: '<div class="tabs-containers emojipicker-containers card-block">' +
                    '<% print ( self.containerMain ( o ) ) %>' +
                    '<% for ( var i = 0, l = o.data.categories.length; i < l; i++ ) { %>' +
                      '<% print ( self.container ({ options: o, category: o.data.categories[i] }) ) %>' +
                    '<% } %>' +
                   '</div>',
      container: '<div class="container">' +
                   '<% print ( self.emojis ({ emojis: o.category.emojis, tone: o.options.tone }) ) %>' +
                 '</div>',
      containerMain: '<div class="container main">' +
                       '<input autofocus name="search" type="search" class="gray fluid" placeholder="Search emoji">' +
                       '<% print ( self.search ( o ) ) %>' +
                       '<% print ( self.frequent ( o ) ) %>' +
                     '</div>',
      search: '<div class="search-section section">' +
                '<% if ( !o.search.emojis.length ) { %>' +
                  '<div class="search-emojis emojis empty">No emoji found</div>' +
                '<% } else { %>' +
                  '<div class="search-emojis emojis">' +
                    '<% print ( self.emojis ({ emojis: o.search.emojis, tone: o.tone }) ) %>' +
                  '</div>' +
                '<% } %>' +
              '</div>',
      frequent: '<div class="frequent-section section">' +
                  '<% if ( !o.frequent.emojis.length ) { %>' +
                    '<div class="frequent-emojis emojis empty">No emoji used recently</div>' +
                  '<% } else { %>' +
                    '<div class="frequent-emojis emojis">' +
                      '<% print ( self.emojis ({ emojis: o.frequent.emojis, tones: o.frequent.tones }) ) %>' +
                    '</div>' +
                  '<% } %>' +
                '</div>',
      footer: '<div class="emojipicker-footer card-footer bordered">' +
                '<% print ( self.preview ({ emoji: o.data.emojis[o.preview.id], tone: o.preview.tone }) ) %>' +
                '<% print ( self.tones ( o ) ) %>' +
              '</div>',
      preview: '<div class="emojipicker-preview">' +
                 '<div class="multiple center-y no-wrap">' +
                   '<div class="enlarged">' +
                     '<% print ( Svelto.Emoji.encode ( o.emoji.id, o.tone ) ) %>' +
                   '</div>' +
                   '<div class="multiple vertical joined texts">' +
                     '<div class="title" title="<%= o.emoji.name %>"><%= o.emoji.name %></div>' +
                     '<div class="short-names"><%= [o.emoji.id].concat ( o.emoji.alts || [] ).map ( Svelto.Emoji.encode ).join ( " " ) %></div>' +
                   '</div>' +
                 '</div>' +
               '</div>',
      tones: '<div class="emojipicker-tones">' +
               '<div class="multiple center-x joined">' +
                 '<div class="emojipicker-tone"></div>' +
                 '<div class="emojipicker-tone"></div>' +
                 '<div class="emojipicker-tone"></div>' +
                 '<div class="emojipicker-tone"></div>' +
                 '<div class="emojipicker-tone"></div>' +
                 '<div class="emojipicker-tone"></div>' +
               '</div>' +
             '</div>',
      emojis: '<div class="multiple emojis">' +
                '<% print ( o.emojis.map ( function ( emoji, index ) { return Svelto.Emoji.encode ( emoji, o.tone || o.tones[index] ) } ).join ( " " ) ) %>' +
              '</div>'
    },
    options: {
      data: undefined,
      tone: Emoji.options.tone,
      make: { // Options passed to Emoji.make
        css: 'actionable',
        sprite: true
      },
      preview: {
        id: 'grinning',
        tone: Emoji.options.tone
      },
      frequent: {
        limit: 126,
        emojis: [],
        tones: [],
        rank: []
      },
      search: {
        limit: 126,
        emojis: [],
        query: undefined
      },
      classes: {
        searching: 'searching',
        previewing: 'previewing',
        toneActive: 'active',
        emojified: 'emojified'
      },
      selectors: {
        emoji: 'i.emoji',
        tonables: '.container:not(.main) i.emoji[data-tonable="true"]',
        input: 'input',
        preview: '.emojipicker-preview',
        enlarged: '.enlarged',
        tones: '.emojipicker-tone',
        search: '.search-section',
        frequent: '.frequent-section',
        containers: {
          wrapper: '.emojipicker-containers',
          all: '.emojipicker-containers > *'
        }
      },
      callbacks: {
        pick: _.noop
      }
    }
  };

  /* EMOJI PICKER */

  class Emojipicker extends Widgets.Storable {

    /* WIDGETIZE */

    static widgetize ( ele, Widget ) {

      EmojiData.get ().then ( data => {

        Widget.config.options.data = data;

        $.widget.get ( ele, Widget );

      });

    }

    /* SPECIAL */

    _make () {

      if ( !this.$element.is ( ':empty' ) ) return;

      let picker = this._template ( 'base', this.options );

      $(picker).replaceAll ( this.$element ).widgetize ();

      return false;

    }

    _variables () {

      super._variables ();

      this.$picker = this.$element;
      this.$input = this.$picker.find ( this.options.selectors.input );
      this.$preview = this.$picker.find ( this.options.selectors.preview );
      this.$tones = this.$picker.find ( this.options.selectors.tones );
      this.$containersWrapper = this.$picker.find ( this.options.selectors.containers.wrapper );
      this.$containers = this.$picker.find ( this.options.selectors.containers.all );
      this.$search = this.$picker.find ( this.options.selectors.search );
      this.$frequent = this.$picker.find ( this.options.selectors.frequent );

      this._tabsInstance = this.$picker.tabs ( 'instance' );
      this._lazilyEmojified = {};

    }

    _init () {

      this._updateToneIndicator ();
      this._frequentRestore ();

    }

    _events () {

      this.___lazyEmojify ();
      this.___emojiTap ();
      this.___toneTap ();
      this.___preview ();
      this.___search ();

    }

    /* LAZI EMOJIFY */

    ___lazyEmojify () {

      this._on ( true, 'tabs:change', this.__lazyEmojify );

    }

    __lazyEmojify () {

      let index = this._tabsInstance.get ();

      if ( !index || this._lazilyEmojified[index] ) return;

      let $container = this.$containers.eq ( index );

      $container.emojify ( this.options.make )
                .then ( () => $container.addClass ( this.options.classes.emojified ) );

      this._lazilyEmojified[index] = true;

    }

    /* EMOJI */

    ___emojiTap () {

      this._on ( Pointer.tap, this.options.selectors.emoji, this.__emojiTap );

    }

    __emojiTap ( event ) {

      let emoji = event.currentTarget.getAttribute ( 'data-id' ),
          tone = Number ( event.currentTarget.getAttribute ( 'data-tone' ) ),
          data = { emoji, tone };

      this._frequentUpdate ( emoji, tone );

      this._trigger ( 'pick', data );

    }

    /* TONE */

    ___toneTap () {

      this._on ( this.$tones, Pointer.tap, this.__toneTap );

    }

    __toneTap ( event ) {

      let tone = this.$tones.get ().indexOf ( event.target ) + 1;

      if ( tone === this.options.tone ) return;

      this._previousTone = this.options.tone;

      this.options.tone = tone;

      this._updateTone ();

    }

    _updateTone () {

      this._updateToneEmojis ();
      this._updateToneIndicator ();

    }

    _updateToneEmojis () {

      let $tonables = this.$picker.find ( this.options.selectors.tonables ),
          tone = this.options.tone;

      $tonables.get ().forEach ( emoji => {

        let id = emoji.getAttribute ( 'data-id' );

        Emoji.make ( id, tone, this.options.make ).then ( replacement => $(replacement).replaceAll ( emoji ) );

      });

    }

    _updateToneIndicator () {

      if ( this._previousTone ) {

        this.$tones.eq ( this._previousTone - 1 ).removeClass ( this.options.classes.toneActive );

      }

      this.$tones.eq ( this.options.tone - 1 ).addClass ( this.options.classes.toneActive );

    }

    /* PREVIEW */

    ___preview () {

      this._on ( Pointer.enter, this.options.selectors.emoji, this.__previewEnter );
      this._on ( true, this.$containersWrapper, Pointer.leave, this.__previewLeave );

    }

    __previewEnter ( event ) {

      let emoji = event.currentTarget;

      this.options.preview.id = emoji.getAttribute ( 'data-id' );
      this.options.preview.tone = emoji.getAttribute ( 'data-tone' );

      this._updatePreview ();

      this._togglePreview ( true );

    }

    __previewLeave ( event ) {

      this._togglePreview ( false );

    }

    _updatePreview () {

      let options = {
        emoji: this.options.data.emojis[this.options.preview.id],
        tone: this.options.preview.tone
      };

      let $preview = $(this._template ( 'preview', options )),
          $enlarged = $preview.find ( this.options.selectors.enlarged );

      $enlarged.emojify ( this.options.make ).then ( () => {

        this.$preview = $preview.replaceAll ( this.$preview );

      });

    }

    _togglePreview ( force = !this._previewing ) {

      if ( !!force !== this._previewing ) {

        this._previewing = !!force;

        this.$picker.toggleClass ( this.options.classes.previewing, this._previewing );

      }

    }

    /* SEARCH */

    ___search () {

      this._on ( this.$input, 'change cut paste keyup', this.__search );

    }

    __search () {

      let query = this.$input.val ();

      if ( query === this.options.search.query ) return;

      this.options.search.query = query;

      let emojis = [];

      this._toggleSearch ( !!query );

      if ( query ) {

        if ( query[0] === '-' ) {

          emojis = ['-1'];

        } else if ( query[0] === '+' ) {

          emojis = ['+1'];

        } else if ( query.match ( Emoji.options.regexes.emoticon ) ) {

          let found = this.options.data.emoticons[query];

          emojis = found ? _.castArray ( found ) : [];

        } else {

          let keywords = query.toLowerCase ().split ( /[\s,_-]+/ );

          for ( let id in this.options.data.emojis ) {

            let emoji = this.options.data.emojis[id],
                match = true;

            for ( let keyword of keywords ) {

              if ( emoji.tags.indexOf ( keyword ) === -1 ) {

                match = false;
                break;

              }

            }

            if ( match ) {

              emojis.push ( id );

              if ( emojis.length === this.options.search.limit ) break;

            }

          }

        }

      }

      this.options.search.emojis = emojis;

      let $search = $(this._template ( 'search', this.options ));

      $search.emojify ( this.options.make ).then ( () => {

        this.$search = $search.replaceAll ( this.$search );

      });

    }

    _toggleSearch ( force = !this._searching ) {

      if ( !!force !== this._searching ) {

        this._searching = !!force;

        this.$picker.toggleClass ( this.options.classes.searching, this._searching );

      }

    }

    /* FREQUENT */

    _frequentRefresh () {

      this.options.frequent.emojis = this.options.frequent.rank.map ( _.first );
      this.options.frequent.tones  = this.options.frequent.rank.map ( entry => entry[1] );

      let $frequent = $(this._template ( 'frequent', this.options ));

      $frequent.emojify ( this.options.make ).then ( () => {

        this.$frequent = $frequent.replaceAll ( this.$frequent );

      });

    }

    _frequentUpdate ( emoji, tone = this.options.tone ) {

      let rank = this.options.frequent.rank,
          entry = rank.find ( entry => entry[0] === emoji && entry[1] === tone );

      if ( entry ) {

        entry[2]++;

      } else {

        rank.push ([ emoji, tone, 1 ]);

      }

      rank = _.orderBy ( rank, [_.last, _.first, _.property ( 1 )], ['desc', 'asc', 'asc'] ).slice ( 0, this.options.frequent.limit );

      this.options.frequent.rank = rank;

      this._storageSet ( 'frequent', rank, 2592000 ); // 1 Month

      this._frequentRefresh ();

    }

    _frequentRestore () {

      let rank = this._storageGet ( 'frequent' );

      if ( !rank || _.isEqual ( this.options.frequent.rank, rank ) ) return;

      this.options.frequent.rank = rank;

      this._frequentRefresh ();

    }

  }

  /* FACTORY */

  Factory.make ( Emojipicker, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Icon, Svelto.Pointer, Svelto.EmojiData, Svelto.Emoji ));


/* =========================================================================
 * Svelto - Widgets - Emoji - Picker - Popover
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../picker.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, EmojiData ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'emojipickerPopover',
    templates: {
      base: '<div>'
    },
    options: {
      classes: {
        popover: 'popover'
      },
      callbacks: {
        beforeopen: _.noop,
        open: _.noop,
        beforeclose: _.noop,
        close: _.noop
      }
    }
  };

  /* EMOJIPICKER POPOVER */

  class EmojipickerPopover extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this._initiated = false;

    }

    /* CLOSE */

    ___close () {

      this._on ( true, 'popover:close', this.__close );

    }

    __close () {

      this.$element.detach ();

      this._reset ();

    }

    /* UTILITIES */

    _isEmpty () {

      return this.$element.is ( ':empty' );

    }

    /* API */

    toggle ( anchor ) {

      if ( this.isLocked () ) {

        if ( !this._isEmpty () ) {

          this.unlock ();

        } else {

          return this.open ( anchor ); //FIXME: What is this for???

        }

      } else {

        if ( this._isEmpty () ) {

          this.lock ();

          EmojiData.get ().then ( data => {

            Widgets.Emojipicker.config.options.data = data;

            this.$element = $.widget.new ( Widgets.Emojipicker ).$element.addClass ( this.options.classes.popover );

            this.toggle ( anchor );

          });

          return;

        }

      }

      if ( !this.$element.isAttached () ) {

        this.$layout.append ( this.$element );

      }

      if ( !this._initiated ) {

        this.$element.popover ({
          callbacks: {
            beforeopen: () => this._trigger ( 'beforeopen' ),
            open: () => this._trigger ( 'open' ),
            beforeclose: () => this._trigger ( 'beforeclose' ),
            close: () => this._trigger ( 'close' )
          }
        });

        this._initiated = true;

      }

      this.$element.popover ( 'toggle', undefined, anchor );

      this.___close ();

    }

  }

  /* FACTORY */

  Factory.make ( EmojipickerPopover, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.EmojiData ));


/* =========================================================================
 * Svelto - Widgets - Emoji - Picker - Popover (Helper)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./popover.js
 * ========================================================================= */

(function ( $, _, Svelto, EmojipickerPopover ) {

  'use strict';

  /* VARIABLES */

  let instance;

  /* HELPER */

  $.emojipickerPopover = function ( anchor ) {

    if ( !instance ) {

      instance = new EmojipickerPopover ();

    }

    instance.toggle ( anchor );

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.EmojipickerPopover ));


/* =========================================================================
 * Svelto - Widgets - Emoji - Picker - Popover (Trigger)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./popover_helper.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'emojipickerPopoverTrigger',
    plugin: true,
    selector: '.emojipicker-popover-trigger',
    options: {
      callbacks: {
        beforetrigger: _.noop,
        trigger: _.noop
      }
    }
  };

  /* EMOJIPICKER POPOVER TRIGGER */

  class EmojipickerPopoverTrigger extends Widgets.Widget {

    /* SPECIAL */

    _events () {

      this.___tap ();

    }

    /* TAP */

    ___tap () {

      this._on ( Pointer.tap, this.trigger );

    }

    /* API */

    trigger () {

      this._trigger ( 'beforetrigger' );

      $.emojipickerPopover ( this.element );

      this._trigger ( 'trigger' );

    }

  }

  /* FACTORY */

  Factory.make ( EmojipickerPopoverTrigger, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Widgets - Infobar
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

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

  Factory.make ( Infobar, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Input - Autogrow
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/browser/browser.js
 * @require core/widget/widget.js
 * ========================================================================= */

// It supports only `box-sizing: border-box` inputs

(function ( $, _, Svelto, Widgets, Factory, Browser ) {

  'use strict';

  /* CONFIG */

  let config = {
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

  class InputAutogrow extends Widgets.Widget {

    /* WIDGETIZE */

    static widgetize ( ele, Widget ) {

      /* SKIP IE/EDGE */

      //FIXME: input.scrollWidth is not supported by them, find another reliable way of implementing it

      if ( Browser.is.ie || Browser.is.edge ) return;

      /* WIDGETIZE */

      $.widget.get ( ele, Widget );

    }

    /* SPECIAL */

    _variables () {

      this.$input = this.$element;

      this.$tempInput = $('<input>').css ({
                          'position': 'fixed',
                          'visibility': 'hidden',
                          'padding': 0,
                          'min-width': 0,
                          'width': 0
                        });

    }

    _init () {

      this._update ();

    }

    _events () {

      this.___inputChange ();

    }

    /* PRIVATE */

    _getNeededWidth () {

      this.$tempInput.css ( 'font', this.$input.css ( 'font' ) ).val ( this.$input.val () ).appendTo ( this.$layout );

      let width = this.$tempInput[0].scrollWidth;

      this.$tempInput.detach ();

      return Math.max ( this.options.minWidth, width );

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

  Factory.make ( InputAutogrow, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Browser ));


/* =========================================================================
 * Svelto - Widgets - Input - File - Names
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
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

  class InputFileNames extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$names = this.$element;

      this.$input = this.$names.closest ( 'label' ).find ( 'input[type="file"]' );
      this.input = this.$input[0];

    }

    _init () {

      this.options.placeholder = this.$names.text () || this.options.placeholder;

      this._update ();

    }

    _events () {

      this.___change ();

    }

    /* PRIVATE */

    _getNames () {

      let names = [];

      for ( let i = 0, l = this.input.files.length; i < l; i++ ) {

        names.push ( this.input.files[i].name );

      }

      return names;

    }

    _getText () {

      let names = this._getNames ();

      return names.length ? names.join ( ', ' ) : this.options.placeholder;

    }

    /* CHANGE */

    ___change () {

      this._on ( true, this.$input, 'change', this._update );

    }

    /* UPDATE */

    _update () {

      let previous = this.$names.text (),
          current = this._getText ();

      if ( previous === current ) return;

      this.$names.text ( current );

      this._trigger ( 'change' );

    }

  }

  /* FACTORY */

  Factory.make ( InputFileNames, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Modal
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/animations/animations.js
 * @require widgets/autofocusable/autofocusable.js
 * ========================================================================= */

//FIXME: Multiple open modals (read it: multiple backdrops) are not well supported

(function ( $, _, Svelto, Widgets, Factory, Pointer, Animations ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'modal',
    plugin: true,
    selector: '.modal',
    options: {
      scroll: {
        disable: true // Disable scroll when the modal is open
      },
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
        beforeopen: _.noop,
        open: _.noop,
        beforeclose: _.noop,
        close: _.noop
      }
    }
  };

  /* MODAL */

  class Modal extends Widgets.Autofocusable {

    /* SPECIAL */

    _variables () {

      this.$modal = this.$element;
      this.modal = this.element;

      this.$backdrop = $.$html;

      this._isOpen = this.$modal.hasClass ( this.options.classes.open );

    }

    _events () {

      if ( this._isOpen ) {

        this.___keydown ();
        this.___tap ();
        this.___route ();

      }

    }

    _destroy () {

      this.close ();

    }

    /* TAP */

    ___tap () {

      this._on ( true, $.$html, Pointer.tap, this.__tap );

    }

    __tap ( event ) {

      if ( this.isLocked () || event.isDefaultPrevented () || event.isPropagationStopped () || !$.isAttached ( event.target ) || $(event.target).closest ( this.$modal ).length ) return;

      event.preventDefault ();
      event.stopImmediatePropagation ();

      this.close ();

    }

    /* ROUTE */

    __route () {

      if ( this._isOpen && !$.isAttached ( this.modal ) ) {

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

      if ( this.isLocked () || this._isOpen ) return;

      this.lock ();

      this._isOpen = true;

      this._trigger ( 'beforeopen' );

      if ( this.options.scroll.disable ) this.$layout.disableScroll ();

      this._frame ( function () {

        this.$modal.addClass ( this.options.classes.show );
        this.$backdrop.addClass ( this.options.classes.backdrop.show );

        this._frame ( function () {

          this.$modal.addClass ( this.options.classes.open );
          this.$backdrop.addClass ( this.options.classes.backdrop.open );

          this.autofocus ();

          this.unlock ();

          this._trigger ( 'open' );

        });

      });

      this.___keydown ();
      this.___tap ();
      this.___route ();

    }

    close () {

      if ( this.isLocked () || !this._isOpen ) return;

      this.lock ();

      this._isOpen = false;

      this._trigger ( 'beforeclose' );

      this._frame ( function () {

        this.$modal.removeClass ( this.options.classes.open );
        this.$backdrop.removeClass ( this.options.classes.backdrop.open );

        this._delay ( function () {

          this.$modal.removeClass ( this.options.classes.show );
          this.$backdrop.removeClass ( this.options.classes.backdrop.show );

          this.autoblur ();

          if ( this.options.scroll.disable ) this.$layout.enableScroll ();

          this.unlock ();

          this._trigger ( 'close' );

        }, this.options.animations.close );

      });

      this._reset ();

    }

  }

  /* FACTORY */

  Factory.make ( Modal, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Animations ));


/* =========================================================================
 * Svelto - Widgets - Numbox
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
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

  class Numbox extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$numbox = this.$element;
      this.$input = this.$numbox.find ( this.options.selectors.input );
      this.$decreaser = this.$numbox.find ( this.options.selectors.decreaser );
      this.$increaser = this.$numbox.find ( this.options.selectors.increaser );

      this._prevValue = false;

    }

    _init () {

      /* VARIABLES */

      let value = this.$input.val ();

      /* OPTIONS */

      this.options.min = Number ( this.$numbox.data ( this.options.datas.min ) || this.options.min );
      this.options.max = Number ( this.$numbox.data ( this.options.datas.max ) || this.options.max );
      this.options.step = Number ( this.$numbox.data ( this.options.datas.step ) || this.options.step );
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

      this._onHover ( [$.$document, 'keydown', this.__keydown] );

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

      this.$decreaser.toggleClass ( this.options.classes.disabled, isMin );
      this.$increaser.toggleClass ( this.options.classes.disabled, isMax );

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

  Factory.make ( Numbox, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Widgets - Overlay
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/animations/animations.js
 * @require widgets/autofocusable/autofocusable.js
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

  class Overlay extends Widgets.Autofocusable {

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

    _destroy () {

      this.close ();

    }

    /* PARENT */

    _getParent () {

      if ( !this.$parent ) {

        this.$parent = this.$overlay.parent ();

      }

      return this.$parent;

    }

    /* KEYDOWN */

    ___keydown () {

      this._onHover ( true, [$.$document, 'keydown', this.__keydown] ); //FIXME: Using _onHover in an undocumented way, the first value was supposed to be $element

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

      if ( this.isLocked () || this._isOpen ) return;

      this.lock ();

      this._isOpen = true;

      this._frame ( function () {

        this.$overlay.addClass ( this.options.classes.show );
        this._getParent ().addClass ( this.options.classes.parent.show );

        this._frame ( function () {

          this.$overlay.addClass ( this.options.classes.open );
          this._getParent ().addClass ( this.options.classes.parent.open );

          this.autofocus ();

          this.unlock ();

          this._trigger ( 'open' );

        });

      });

      this.___keydown ();

    }

    close () {

      if ( this.isLocked () || !this._isOpen ) return;

      this.lock ();

      this._isOpen = false;

      this._frame ( function () {

        this.$overlay.removeClass ( this.options.classes.open );
        this._getParent ().removeClass ( this.options.classes.parent.open );

        this._delay ( function () {

          this.$overlay.removeClass ( this.options.classes.show );
          this._getParent ().removeClass ( this.options.classes.parent.show );

          this.autoblur ();

          this.unlock ();

          this._trigger ( 'close' );

        }, this.options.animations.close );

      });

      this._reset ();

    }

  }

  /* FACTORY */

  Factory.make ( Overlay, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Animations ));


/* =========================================================================
 * Svelto - Widgets - Pager
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

//FIXME: Doesn't actually check if the scroll event happened along the same direction of the key that has been pressed
// It can detect scroll only on the document

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'pager',
    plugin: true,
    selector: '.pager',
    options: {
      selectors: {
        previous: '.previous',
        next: '.next'
      },
      keystrokes: {
        'left': 'previous',
        'right': 'next'
      }
    }
  };

  /* PAGER */

  class Pager extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$pager = this.$element;

    }

    _events () {

      this.___keydown ();

    }

    /* KEYDOWN */

    __keydown ( event ) {

      if ( this.isLocked () || $.isFocused ( document.activeElement ) ) return;

      this.lock ();

      this._scrolled = false;

      this.___scroll ();

      this._delay ( () => { // Waiting for the `scroll` event to fire and giving other event handlers precedence

        this.unlock ();

        if ( this._scrolled ) return;

        this.___scrollReset ();

        if ( event.isDefaultPrevented () || event.isPropagationStopped () ) return; // Probably another widget was listening for the same event, and it should take priority over this

        super.__keydown ( event );

      }, 50 ); //FIXME: Not exactly a solid implementation

    }

    /* SCROLL */

    ___scroll () {

      this._one ( true, $.$document, 'scroll', this.__scroll );

    }

    ___scrollReset () {

      this._off ( $.$document, 'scroll', this.__scroll );

    }

    __scroll () {

      this._scrolled = true;

    }

    /* API */

    previous () {

      let $previous = this.$pager.find ( this.options.selectors.previous );

      if ( !$previous.length ) return;

      $previous[0].click ();

    }

    next () {

      let $next = this.$pager.find ( this.options.selectors.next );

      if ( !$next.length ) return;

      $next[0].click ();

    }

  }

  /* FACTORY */

  Factory.make ( Pager, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Pagination
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require widgets/pager/pager.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'pagination',
    plugin: true,
    selector: '.pagination'
  };

  /* PAGINATION */

  class Pagination extends Widgets.Pager {}

  /* FACTORY */

  Factory.make ( Pagination, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Panel
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/animations/animations.js
 * @require lib/directions/directions.js
 * @require widgets/autofocusable/autofocusable.js
 * ========================================================================= */

//FIXME: Multiple open panels (read it: multiple backdrops) are not well supported
//TODO: Replace flickable support with a smooth moving panel, so operate on drag

(function ( $, _, Svelto, Widgets, Factory, Breakpoints, Breakpoint, Pointer, Animations, Directions ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'panel',
    plugin: true,
    selector: '.panel',
    options: {
      direction: 'left',
      type: 'default', // `default`, `slim`, `fullscreen` (officially supported) or any other implemented type
      pin: false, // If is a valid key of `Breakpoints` it will get auto pinned/unpinned when we are above or below that breakpoint
      flick: {
        open: false,
        close: true,
        threshold: 20 // Amount of pixels close to the window border where the opening flick gesture should be considered intentional
      },
      scroll: {
        disable: true // Disable scroll when the panel is open
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
        direction: 'direction',
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
        beforeopen: _.noop,
        open: _.noop,
        beforeclose: _.noop,
        close: _.noop
      }
    }
  };

  /* PANEL */

  class Panel extends Widgets.Autofocusable {

    /* SPECIAL */

    _variables () {

      this.$panel = this.$element;
      this.panel = this.element;

      this.$backdrop = $.$html;

      this.options.direction = Directions.get ().find ( direction => this.$panel.hasClass ( direction ) ) || this.options.direction;
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

      this.options.type = this.$panel.data ( this.options.datas.type ) || this.options.type;

      this.layoutPinnedClass = Widgets.Panel.config.name + '-' + this.options.type + '-' + this.options.classes.pinned + '-' + this.options.direction;

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

      this.__breakpoint ();

    }

    _destroy () {

      this.close ();

    }

    /* TAP */

    ___tap () {

      this._on ( true, $.$html, Pointer.tap, this.__tap );

    }

    __tap ( event ) {

      if ( this.isLocked () || this._isPinned || event.isDefaultPrevented () || event.isPropagationStopped () || !$.isAttached ( event.target ) || $(event.target).closest ( this.$panel ).length ) return;

      event.preventDefault ();
      event.stopImmediatePropagation ();

      this.close ();

    }

    /* ESC */

    ___keydown () { //TODO: Listen to `keydown` only within the layout, so maybe just if the layout is hovered or focused (right?)

      this._on ( true, $.$document, 'keydown', this.__keydown );

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

      if ( data.direction !== Directions.getOpposite ( this.options.direction ) ) return;

      let layoutOffset = this.$layout.offset ();

      switch ( this.options.direction ) {

        case 'left':
          if ( data.startXY.x - layoutOffset.left > this.options.flick.threshold ) return;
          break;

        case 'right':
          if ( this.$layout.outerWidth () + layoutOffset.left - data.startXY.x > this.options.flick.threshold ) return;
          break;

        case 'top':
          if ( data.startXY.y - layoutOffset.top > this.options.flick.threshold ) return;
          break;

        case 'bottom':
          if ( this.$layout.outerHeight () + layoutOffset.top - data.startXY.y > this.options.flick.threshold ) return;
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

      if ( this._isOpen && !$.isAttached ( this.panel ) ) {

        this.close ();

      }

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

      if ( this.isLocked () || this._isOpen ) return;

      this.lock ();

      this._isOpen = true;

      this._trigger ( 'beforeopen' );

      if ( !this._isPinned ) {

        if ( this.options.pin && Breakpoints.widths[Breakpoint.current] >= Breakpoints.widths[this.options.pin] ) {

          this.pin ();

        } else if ( this.options.scroll.disable ) {

          this.$layout.disableScroll ();

        }

      }

      this._frame ( function () {

        this.$panel.addClass ( this.options.classes.show );
        this.$backdrop.addClass ( this.options.classes.backdrop.show );
        this.$layout.addClass ( this.options.classes.layout.show );

        this._frame ( function () {

          this.$panel.addClass ( this.options.classes.open );
          this.$backdrop.addClass ( this.options.classes.backdrop.open );

          this.autofocus ();

          this.unlock ();

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

      if ( this.isLocked () || !this._isOpen ) return;

      this.unpin ();

      this.lock ();

      this._isOpen = false;

      this._trigger ( 'beforeclose' );

      this._frame ( function () {

        this.$panel.removeClass ( this.options.classes.open );
        this.$backdrop.removeClass ( this.options.classes.backdrop.open );

        this._delay ( function () {

          this.$panel.removeClass ( this.options.classes.show );
          this.$backdrop.removeClass ( this.options.classes.backdrop.show );
          this.$layout.removeClass ( this.options.classes.layout.show );

          this.autoblur ();

          if ( this.options.scroll.disable ) this.$layout.enableScroll ();

          this.unlock ();

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

      if ( this.isLocked () || this._isPinned ) return;

      this._isPinned = true;

      this.$panel.addClass ( this.options.classes.pinned );

      this.$layout.addClass ( this.layoutPinnedClass );

      this.$backdrop.addClass ( this.options.classes.backdrop.pinned );

      if ( this._isOpen ) {

        this.$layout.enableScroll ();

      } else {

        this.open ();

      }

    }

    unpin () {

      if ( this.isLocked () || !this._isOpen || !this._isPinned ) return;

      this._isPinned = false;

      this.$layout.removeClass ( this.layoutPinnedClass ).disableScroll ();

      this._delay ( function () {

        this.$backdrop.removeClass ( this.options.classes.backdrop.pinned );

        this.$panel.removeClass ( this.options.classes.pinned );

      }, this.options.animations.close );

    }

  }

  /* FACTORY */

  Factory.make ( Panel, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Breakpoints, Svelto.Breakpoint, Svelto.Pointer, Svelto.Animations, Svelto.Directions ));


/* =========================================================================
 * Svelto - Widgets - Popover
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require lib/embedded_css/embedded_css.js
 * @require lib/positionate/positionate.js
 * @require lib/touching/touching.js
 * @require widgets/autofocusable/autofocusable.js
 * ========================================================================= */

//FIXME: Close it if after a `route` event if the trigger element is no longer visible

(function ( $, _, Svelto, Widgets, Factory, Pointer, EmbeddedCSS, Animations ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'popover',
    plugin: true,
    selector: '.popover',
    options: {
      contentChangeEvents: 'change datepicker:change editor:fullscreen editor:unfullscreen editor:preview editor:unpreview inputautogrow:change tabs:change tablehelper:change tagbox:change textareaautogrow:change timeago:change', // When one of these events are triggered update the position because the content probably changed
      mustCloseEvents: 'modal:beforeopen modal:beforeclose panel:beforeopen panel:beforeclose', //FIXME: This way opening/closing a modal/panel from inside a popover while still keeping it open is not supported
      parentChangeEvents: 'popover:close modal:close panel:close editor:fullscreen editor:unfullscreen', // When one of these events happen, and the target is an anchestor of the anchor, we close the popover //FIXME: Ugly
      positionate: {}, // Extending `$.positionate` options
      spacing: {
        affixed: 0,
        fullscreen: 0,
        noTip: 5,
        normal: 12
      },
      classes: {
        anchorDirection: 'popover-anchor-$1',
        noTip: 'no-tip',
        affixed: 'affixed',
        fullscreen: 'fullscreen',
        fullscreenRequest: 'fullscreen-request',
        moving: 'moving',
        show: 'show',
        open: 'open'
      },
      animations: {
        open: Animations.fast,
        close: Animations.fast
      },
      keystrokes: {
        'esc': '__esc'
      },
      callbacks: {
        beforeopen: _.noop,
        open: _.noop,
        beforeclose: _.noop,
        close: _.noop
      }
    }
  };

  /* POPOVER */

  class Popover extends Widgets.Autofocusable {

    /* SPECIAL */

    _variables () {

      this.$popover = this.$element;
      this.popover = this.$popover[0];

      this.$popover.addClass ( this.guc );

      this.hasTip = !this.$popover.hasClass ( this.options.classes.noTip );
      this.isAffixed = this.$popover.hasClass ( this.options.classes.affixed );
      this.isFullscreen = this.$popover.hasClass ( this.options.classes.fullscreen );

      this._isOpen = this.$popover.hasClass ( this.options.classes.open );

    }

    _events () {

      if ( this._isOpen ) {

        this.___contentChange ();
        this.___mustClose ();
        this.___parentChange ();
        this.___resize ();
        this.___parentsScroll ();
        this.___layoutTap ();
        this.___keydown ();

      }

    }

    _destroy () {

      this.close ();

    }

    /* CONTENT CHANGE */

    ___contentChange () {

      this._on ( true, this.options.contentChangeEvents, this._positionate );

    }

    /* MUST CLOSE */

    ___mustClose () {

      this._on ( true, this.$layout, this.options.mustCloseEvents, this.close );

    }

    /* PARENT CHANGE */

    ___parentChange () {

      this._on ( true, $.$document, this.options.parentChangeEvents, this.__parentChange );

    }

    __parentChange ( event ) {

      if ( !this.$anchor || !$.contains ( event.target, this.$anchor[0] ) ) return;

      if ( this.$anchor.isVisible () ) {

        this._positionate ();

      } else {

        this.close ();

      }

    }

    /* RESIZE */

    ___resize () {

      this._on ( true, $.$window, 'resize', this._frames ( this._positionate.bind ( this ) ) ); //FIXME: It should handle a generic parent `resize`-like event, not just on `$.$window`

    }

    /* PARENTS SCROLL */

    ___parentsScroll () {

      let $parents = this.$popover.parents ().add ( this.$anchor ? this.$anchor.parents () : undefined ).add ( $.$window );

      this._on ( true, $parents, 'scroll', this._frames ( this._positionate.bind ( this ) ) );

    }

    /* LAYOUT TAP */

    ___layoutTap () {

      this._on ( true, this.$layout, Pointer.tap, this.__layoutTap );

    }

    __layoutTap ( event ) {

      if ( event.isDefaultPrevented () || event.isPropagationStopped () ) return;

      if ( event === this._openEvent || this.$popover.touching ({ point: $.eventXY ( event, 'clientX', 'clientY' )} ).length ) return event.stopImmediatePropagation ();

      this.close ();

    }

    /* ESC */

    ___keydown () { //TODO: Listen to `keydown` only within the layout, so maybe just if the layout is hovered or focused (right?)

      this._on ( true, $.$document, 'keydown', this.__keydown );

    }

    __esc () {

      this.close ();

    }

    /* POSITIONATE */

    _positionate () {

      /* VARIABLES */

      let isFullscreenRequested = this.$popover.hasClass ( this.options.classes.fullscreenRequest ),
          noTip = ( this.$anchor && this.$anchor.hasClass ( this.options.classes.noTip ) ) || !this.hasTip || this.isAffixed || this.isFullscreen || isFullscreenRequested,
          spacing = this.isAffixed
                      ? this.options.spacing.affixed
                      : this.isFullscreen || isFullscreenRequested
                        ? this.options.spacing.fullscreen
                        : noTip
                          ? this.options.spacing.noTip
                          : this.options.spacing.normal;

      /* POSITIONATE */

      this.$popover.positionate ( _.extend ({
        $anchor: this.$anchor,
        pointer: noTip ? false : 'auto',
        spacing: spacing,
        callbacks: {
          change: this.__positionChange.bind ( this )
        }
      }, this.options.positionate ));

    }

    _toggleAnchorDirectionClass ( direction, force ) {

      if ( !this.$anchor ) return;

      this.$anchor.toggleClass ( _.format ( this.options.classes.anchorDirection, direction ), force );

    }

    __positionChange ( data ) {

      /* ANCHOR CLASS */

      if ( this._prevDirection !== data.direction ) {

        if ( this._prevDirection ) {

          this._toggleAnchorDirectionClass ( this._prevDirection, false );

        }

        this._toggleAnchorDirectionClass ( data.direction, true );

        this._prevDirection = data.direction;

      }

    }

    /* API */

    isOpen () {

      return this._isOpen;

    }

    toggle ( force, anchor, event ) {

      if ( !_.isBoolean ( force ) ) {

        force = anchor && ( !this.$anchor || this.$anchor && this.$anchor[0] !== anchor ) ? true : ( this.$prevAnchor || this.$anchor || 'point' in this.options.positionate ? !this._isOpen : false );

      }

      this[force ? 'open' : 'close']( anchor, event );

    }

    open ( anchor, event ) {

      /* RESTORING ANCHOR */

      if ( !anchor && this.$prevAnchor && !('point' in this.options.positionate) && !('$anchor' in this.options.positionate) ) {

        anchor = this.$prevAnchor[0];

      }

      /* CHECKING */

      if ( this.isLocked () || ( ( !anchor || ( this._isOpen && this.$anchor && anchor === this.$anchor[0] ) ) && !('point' in this.options.positionate) && !('$anchor' in this.options.positionate) ) ) return;

      /* VARIABLES */

      this.lock ();

      this._isOpen = true;
      this._openEvent = event;
      this._wasMoving = false;

      /* PREVIOUS ANCHOR */

      if ( this.$anchor ) {

        this._toggleAnchorDirectionClass ( this._prevDirection, false );
        this._prevDirection = false;

        this.$prevAnchor = this.$anchor;

        if ( this._isOpen ) {

          this._wasMoving = true;

          this.$popover.addClass ( this.options.classes.moving );

        }

      }

      /* ANCHOR */

      this.$anchor = anchor ? $(anchor) : this.options.positionate.$anchor || false;

      /* BEFORE OPENING */

      this._trigger ( 'beforeopen' );

      /* OPENING */

      this._frame ( function () {

        this.$popover.addClass ( 'show' );

        this._positionate ();

        this._frame ( function () {

          this.$popover.addClass ( this.options.classes.open );

          this.autofocus ();

          this.unlock ();

          this._trigger ( 'open' );

        });

      });

      /* EVENTS */

      this._reset ();

      this.___layoutTap ();
      this.___keydown ();
      this.___contentChange ();
      this.___mustClose ();
      this.___parentChange ();
      this.___resize ();
      this.___parentsScroll ();

    }

    close () {

      if ( this.isLocked () || !this._isOpen ) return;

      /* VARIABLES */

      this.lock ();

      this._isOpen = false;

      /* ANCHOR */

      this._toggleAnchorDirectionClass ( this._prevDirection, false );
      this._prevDirection = false;

      this.$prevAnchor = this.$anchor;
      this.$anchor = false;

      /* CLOSING */

      this._trigger ( 'beforeclose' );

      this._frame ( function () {

        this.$popover.removeClass ( this.options.classes.open  );

        if ( this._wasMoving ) {

          this.$popover.removeClass ( this.options.classes.moving );

        }

        this._delay ( function () {

          this.$popover.removeClass ( this.options.classes.show );

          this.autoblur ();

          this.unlock ();

          this._trigger ( 'close' );

        }, this.options.animations.close );

      });

      /* RESETTING */

      this._reset ();

    }

  }

  /* FACTORY */

  Factory.make ( Popover, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.EmbeddedCSS, Svelto.Animations ));

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
* Svelto - Widgets - Progressbar
* =========================================================================
* Copyright (c) 2015-2017 Fabio Spampinato
* Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
* =========================================================================
* @require core/widget/widget.js
* ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'progressbar',
    plugin: true,
    selector: '.progressbar',
    templates: {
      base: '<div class="progressbar <%= o.striped ? "striped" : "" %> <%= o.indeterminate ? "indeterminate" : "" %> <%= o.labeled ? "labeled" : "" %> <%= o.colors.off %> <%= o.size %> <%= o.css %>">' +
              '<div class="progressbar-highlight <%= o.colors.on %>"></div>' +
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

      this.$highlight.attr ( `data-${this.options.datas.value}`, this._roundValue ( this.options.value ) + '%' );

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

  Factory.make ( Progressbar, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Progressbar (Helper)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./progressbar.js
 * ========================================================================= */

(function ( $, _, Svelto, Progressbar ) {

  'use strict';

  /* HELPER */

  $.progressbar = function ( options ) {

    options = _.isNumber ( options ) ? { value: options } : options;

    return new Progressbar ( options );

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.Progressbar ));


/* =========================================================================
 * Svelto - Widgets - Radio
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require widgets/checkbox/checkbox.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
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

  class Radio extends Widgets.Checkbox {

    /* TAP */

    __tap ( event ) {

      if ( event.target === this.input || $(event.target).is ( `label[for="${this.inputId}"]` ) ) return;

      if ( this.$input.prop ( 'checked' ) ) return;

      this.$input.prop ( 'checked', true ).trigger ( 'change' );

    }

  }

  /* FACTORY */

  Factory.make ( Radio, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Rails
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/animations/animations.js
 * @require core/widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Animations, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'rails',
    plugin: true,
    selector: '.rails',
    options: {
      navigation: {
        hidable: true // Controls whether the navigation should be hidden when all the buttons are disabled
      },
      scroll: {
        speed: 200 // The distance scrolled when calling `left` or `right`
      },
      selectors: {
        start: '.rails-start',
        left: '.rails-left',
        right: '.rails-right',
        end: '.rails-end',
        navigation: '.rails-navigation, .rails-start, .rails-left, .rails-right, .rails-end',
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

  class Rails extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$rails = this.$element;

      this.$start = this.$rails.find ( this.options.selectors.start );
      this.$left = this.$rails.find ( this.options.selectors.left );
      this.$right = this.$rails.find ( this.options.selectors.right );
      this.$end = this.$rails.find ( this.options.selectors.end );
      this.$navigation = this.$rails.find ( this.options.selectors.navigation );
      this.$content = this.$rails.find ( this.options.selectors.content );
      this.$active = this.$content.find ( this.options.selectors.active );

    }

    _init () {

      this._scrollToElement ( this.$active, false );
      this._updateNavigation ();

    }

    _events () {

      this.___keydown ();
      this.___resize ();
      this.___scroll ();
      this.___startTap ();
      this.___leftTap ();
      this.___rightTap ();
      this.___endTap ();

    }

    /* KEYDOWN */

    ___keydown () {

      this._onHover ( [$.$document, 'keydown', this.__keydown] );

    }

    /* START TAP */

    ___startTap () {

      this._on ( this.$start, Pointer.tap, this.start );

    }

    /* LEFT TAP */

    ___leftTap () {

      this._on ( this.$left, Pointer.tap, this.left );

    }

    /* RIGHT TAP */

    ___rightTap () {

      this._on ( this.$right, Pointer.tap, this.right );

    }

    /* END TAP */

    ___endTap () {

      this._on ( this.$end, Pointer.tap, this.end );

    }

    /* UPDATE */

    _updateNavigation () {

      if ( !this.$navigation.length ) return;

      let contentRect = this.$content.getRect (),
          scrollLeft = this.$content.scrollLeft (),
          isStart = ( scrollLeft === 0 ),
          isEnd = ( this.$content[0].scrollWidth - scrollLeft - contentRect.width <= 1 ); // If we use `0`, as we should it won't always trigger

      if ( this.$start.length || this.$left.length ) {

        this.$start.add ( this.$left ).toggleClass ( this.options.classes.disabled, isStart );

      }

      if ( this.$end.length || this.$right.length ) {

        this.$end.add ( this.$right ).toggleClass ( this.options.classes.disabled, isEnd );

      }

      if ( this.options.navigation.hidable ) {

        let hidable = ( isStart && isEnd );

        this.$navigation.toggleClass ( this.options.classes.hidden, hidable );

      }

    }

    /* RESIZE */

    ___resize () {

      this._on ( true, $.$window, 'resize', this._frames ( this._updateNavigation.bind ( this ) ) );

    }

    /* SCROLL */

    ___scroll () {

      this._on ( true, this.$content, 'scroll', this._frames ( this._updateNavigation.bind ( this ) ) );

    }

    _scroll ( left, animate = true ) {

      if ( animate ) {

        $.animateProp ( this.$content[0], { scrollLeft: left }, { duration: this.options.animations.scroll } );

      } else {

        this.$content.scrollLeft ( left );

      }

    }

    _deltaScroll ( delta )  {

      this._scroll ( this.$content.scrollLeft () + delta );

    }

    _scrollToElement ( $element, animate ) {

      if ( !$element.length ) return;

      let eleRect = $element.getRect (),
          contentRect = this.$content.getRect (),
          left = ( eleRect.left - contentRect.left ) + this.$content.scrollLeft () + ( eleRect.width / 2 ) - ( contentRect.width / 2 );

      this._scroll ( left, animate );

    }

    /* API */

    start () {

      this._scroll ( 0 );

    }

    left () {

      this._deltaScroll ( - this.options.scroll.speed );

    }

    right () {

      this._deltaScroll ( this.options.scroll.speed );

    }

    end () {

      this._scroll ( this.$content[0].scrollWidth );

    }

  }

  /* FACTORY */

  Factory.make ( Rails, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Animations, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Widgets - Rater
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require lib/fetch/fetch.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

//FIXME: Crappy, not working ATM, maybe should get removed
//TODO: Support the use of the rater as an input, basically don't perform any ajax operation but instead update an input field
//TODO: Rewrite as a RemoteReaction widget maybe

(function ( $, _, Svelto, Widgets, Factory, Pointer, fetch ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'rater',
    plugin: true,
    selector: '.rater',
    templates: {
      base: '<div class="rater">' +
              '<% print ( self.stars ( o ) ) %>' +
            '</div>',
      stars: '<% for ( var i = 1; i <= o.amount; i++ ) { %>' +
               '<div class="rater-star <%= ( o.value >= i ? "active" : ( o.value >= i - 0.5 ? "half-active" : "" ) ) %>"></div>' +
             '<% } %>'
    },
    options: {
      value: 0,
      amount: 5,
      url: false,
      rated: false,
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

  /* RATER */

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

        fetch ({
          url: this.options.url,
          method: 'post',
          body: {rating},
          beforesend: this.__beforesend.bind ( this ),
          error: this.__error.bind ( this ),
          success: this.__success.bind ( this ),
          complete: this.__complete.bind ( this )
        });

      }

    }

    /* REQUEST HANDLERS */

    __beforesend () {

      this.doingAjax = true;

    }

    async __error ( res ) {

      let message = await fetch.getValue ( res, 'message' ) || this.options.messages.error;

      $.toast ( message );

    }

    async __success ( res ) {

      //FIXME: Handle the case where the server requests succeeded but the user already rated or for whatever reason this rating is not processed
      //TODO: Make it work like formAjax's

      let resj = await fetch.getValue ( res );

      if ( !resj ) return;

      if ( resj.error ) return this.__error ( res );

      _.merge ( this.options, resj );

      this.$rater.html ( this._template ( 'stars', this.options ) );

      this.options.rated = true;

      this._trigger ( 'change' );

    }

    __complete () {

      this.doingAjax = false;

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

  Factory.make ( Rater, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.fetch ));


/* =========================================================================
 * Svelto - Widgets - Remote - Action
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote.js
 * @require core/colors/colors.js
 * @require core/sizes/sizes.js
 * @require lib/url/url.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

//TODO: Add locking capabilities (Disable the ability to trigger the same action multiple times simultaneously)
//TODO: Add support for customizable `confirmation` option //TODO: Update also `selectable actions`

//FIXME: Not well written, maybe try to extend RemoteWidget, even though it was ment for a different kind of widgets
//FIXME: Clicking an error/success toast doesn't close it

(function ( $, _, Svelto, Widgets, Factory, Colors, Sizes, fetch, URL ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remoteAction',
    options: {
      closingDelay: Widgets.Toast.config.options.ttl / 2,
      ajax: {
        cache: false,
        method: 'post'
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
        success: 'Done! A page refresh may be needed',
        refreshing: 'Done! Refreshing the page...',
        redirecting: 'Done! Redirecting...'
      },
      classes: {
        spinner: {
          color: Colors.white,
          size: Sizes.small,
          css: '',
        }
      }
    }
  };

  /* REMOTE ACTION */

  class RemoteAction extends Widgets.Remote {

    /* TOAST */

    ___confirmationToast () {

      if ( this.$toast ) return;

      /* VARIABLES */

      let options = _.cloneDeep ( this.options.confirmation ),
          index = _.findIndex ( options.buttons, 'isConfirmative' ),
          button = ( index >= 0 ) ? options.buttons[index] : _.last ( options.buttons );

      /* ON CLICK */

      let _prevOnClick = button.onClick,
          instance = this;

      button.onClick = function () {

        instance.request ( true );

        if ( _.isFunction ( _prevOnClick ) ) {

          _prevOnClick.apply ( this, arguments );

        }

        return false;

      };

      /* OPENING */

      this._replaceToast ( options );

    }

    ___loadingToast () {

      this._replaceToast ( `<svg class="spinner ${this.options.classes.spinner.color} ${this.options.classes.spinner.size} ${this.options.classes.spinner.css}"><circle cx="1.625em" cy="1.625em" r="1.25em"></svg>` );

    }

    _replaceToast ( options ) {

      let instance = $.toast ( _.isString ( options ) ? { body: options, autoplay: false } : _.extend ( {}, options, { autoplay: false } ) );

      instance.close ();

      let $toast = instance.$element;

      if ( this.$toast ) {

        this.$toast.html ( $toast.html () ).widgetize ();

      } else {

        this.$toast = $toast;

        this.$toast.toast ( 'open' );

      }

    }

    _destroyToast ( delay ) {

      if ( !this.$toast ) return;

      this._delay ( function () {

        this.$toast.toast ( 'close' );

        this._delay ( function () {

          this.$toast.remove ();

          this.$toast = false;

        }, Widgets.Toast.config.options.animations.close );

      }, delay ? this.options.closingDelay : 0 );

    }

    /* REQUEST HANDLERS */

    __beforesend ( req ) {

      if ( this.isAborted () ) return;

      this.___loadingToast ();

      super.__beforesend ( req );

    }

    async __error ( res ) {

      if ( this.isAborted () ) return;

      let message = await fetch.getValue ( res, 'message' ) || this.options.messages.error;

      this._replaceToast ( message );

      this._destroyToast ( true );

      super.__error ( res );

    }

    async __success ( res ) {

      if ( this.isAborted () ) return;

      let resj = await fetch.getValue ( res ),
          destroyDelay = true;

      if ( resj ) {

        if ( resj.error ) {

          return this.__error ( res );

        } else if ( resj.refresh || URL.isEqual ( resj.url, window.location.href ) ) {

          this._replaceToast ( resj.message || this.options.messages.refreshing );

          location.reload ();

        } else if ( resj.url ) {

          // In order to redirect to another domain the protocol must be provided. For instance `https://www.domain.tld` will work while `www.domain.tld` won't

          this._replaceToast ( resj.message || this.options.messages.redirecting );

          const needsReload = URL.isEqual ( resj.url, window.location.href, true ); // Supporting #target changes

          location.assign ( resj.url );

          if ( needsReload ) {

            location.reload ();

          }

        } else if ( resj.noop ) {

          destroyDelay = false;

        } else {

          this._replaceToast ( resj.message || this.options.messages.success );

        }

      } else {

        this._replaceToast ( this.options.messages.success );

      }

      this._destroyToast ( destroyDelay );

      super.__success ( res );

    }

    /* API OVERRIDES */

    request ( _confirmation ) {

      if ( !_confirmation && this.options.confirmation && 'buttons' in this.options.confirmation && this.options.confirmation.buttons.length ) {

        this.___confirmationToast ();

      } else {

        super.request ();

      }

    }

    abort () {

      this._destroyToast ();

      super.abort ();

    }

  }

  /* FACTORY */

  Factory.make ( RemoteAction, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Colors, Svelto.Sizes, Svelto.fetch, Svelto.URL ));


/* =========================================================================
 * Svelto - Widgets - Remote - Action (Helper)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./action.js
 * ========================================================================= */

(function ( $, _, Svelto, RemoteAction ) {

  'use strict';

  /* HELPER */

  $.remoteAction = function ( ajax ) {

    new RemoteAction ({ ajax }).request ();

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.RemoteAction ));


/* =========================================================================
 * Svelto - Widgets - Remote - Loader (Helper)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./loader.js
 * ========================================================================= */

//TODO: Maybe namespace ajax-related options into an `ajax` key -> easier to read, harder to use

(function ( $, _, Svelto, RemoteLoader ) {

  'use strict';

  /* DEFAULTS */

  let datas = RemoteLoader.config.options.datas;
  let defaults = {
    template: `<div class="remote-loader" data-${datas.method}="<%= o.method %>" data-${datas.data}='<%= JSON.stringify ( o.data ) %>' data-${datas.url}="<%= o.url %>">` +
                '<svg class="spinner">' +
                  '<circle cx="1.625em" cy="1.625em" r="1.25em"></circle>' +
                '</svg>' +
              '</div>',
    url: '',
    data: {
      text: "test"
    },
    method: ''
  };

  /* HELPER */

  $.remoteLoader = function ( options, $anchor, method = 'after' ) { // The method could me any valid jQuery method, like `before`, `prepend`, `append` or `after`

    /* OPTIONS */

    options = _.merge ( {}, $.remoteLoader.defaults, options );

    /* LOADER */

    let html = _.template ( options.template, { variable: 'o' } )( options ),
        $loader = $(html);

    $anchor[method]( $loader );

    $loader.widgetize ();

  };

  /* BINDING */

  $.remoteLoader.defaults = defaults;

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.RemoteLoader ));


/* =========================================================================
 * Svelto - Widgets - Remote (Trigger)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remoteTrigger',
    options: {
      widget: false, // The `Remote` widget class to call
      ajax: {}, // Using as `new widget ( ajax )`
      attributes: {
        href: 'href' // In order to better support `a` elements (the data value has higher priority)
      },
      datas: {
        url: 'url',
        body: 'body',
        method: 'method'
      },
      callbacks: {
        beforetrigger: _.noop,
        trigger: _.noop
      }
    }
  };

  /* REMOTE TRIGGER */

  class RemoteTrigger extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$trigger = this.$element;
      // this.trigger = this.element; //FIXME: It clashes with the `trigger` method

    }

    _init () {

      this.options.ajax.url = this.$trigger.data ( this.options.datas.url ) || this.$trigger.attr ( this.options.attributes.href ) || this.options.ajax.url;
      this.options.ajax.body = this.$trigger.data ( this.options.datas.body ) || this.options.ajax.data;
      this.options.ajax.method = this.$trigger.data ( this.options.datas.method ) || this.options.ajax.method;

    }

    _events () {

      this.___tap ();

    }

    /* OPTIONS */

    _getOptions () {

      return {
        ajax: this.options.ajax,
        storage: {
          enabled: _.get ( this.options.widget.config, 'storage.enabled' ) || _.get ( Widgets.RemoteWidget.config, 'storage.enabled' ) || $.widget.is ( this.element, Widgets.Storable, true ) //FIXME: We should merge the configs at factory time instead, but it's quite expensive
        }
      };

    }

    /* TAP */

    ___tap () {

      this._on ( Pointer.tap, this.trigger );

    }

    /* API */

    trigger () {

      this._trigger ( 'beforetrigger' );

      new this.options.widget ( this._getOptions () ).request ();

      this._trigger ( 'trigger' );

    }

  }

  /* FACTORY */

  Factory.make ( RemoteTrigger, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Widgets - Remote - Action (Trigger)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote_trigger.js
 * @require ./action.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remoteActionTrigger',
    plugin: true,
    selector: '.remote-action-trigger',
    options: {
      widget: Widgets.RemoteAction
    }
  };

  /* REMOTE ACTION TRIGGER */

  class RemoteActionTrigger extends Widgets.RemoteTrigger {}

  /* FACTORY */

  Factory.make ( RemoteActionTrigger, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Remote - Loader (Trigger)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote_trigger.js
 * @require ./loader.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remoteLoaderTrigger',
    plugin: true,
    selector: '.remote-loader-trigger',
    options: {
      widget: Widgets.RemoteLoader
    }
  };

  /* REMOTE LOADER TRIGGER */

  class RemoteLoaderTrigger extends Widgets.RemoteTrigger {

    /* OPTIONS */

    _getOptions () {

      return _.merge ( super._getOptions (), {
        callbacks: {
          beforesend: this.disable.bind ( this ) //TODO: Replace with a linear "spinner" overlay
        }
      });

    }

    /* API */

    trigger () {

      this._trigger ( 'beforetrigger' );

      this.$trigger[this.options.widget.config.name] ( this._getOptions () );

      this._trigger ( 'trigger' );

    }

  }

  /* FACTORY */

  Factory.make ( RemoteLoaderTrigger, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Remote - Widget
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote.js
 * @require lib/autofocus/autofocus.js
 * @require lib/fetch/fetch.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

//TODO: Add locking capabilities, both at class-level and global-level (should be layout-level but seems impossible to implement)

(function ( $, _, Svelto, Widgets, Factory, Animations, Autofocus, fetch ) {

  'use strict';

  /* VARIABLES */

  let cache = []; // Storing remote widgets here //TODO: Maybe make this variable accessible from the outside

  /* CONFIG */

  let config = {
    name: 'remoteWidget',
    templates: {
      placeholder: false
    },
    options: {
      persistent: false, // Whether it should survive a change of page or not. Needed when used in frameworks like Meteor
      resize: true, // Whether performing a resize transition between the loading widget and the remove widget or not
      $wrapper: false, // The loading widget will be appended to it, fallback to the $layout
      widget: false,
      waitPlaceholderAnimation: true, // Whether to wait at least `animations.placeholder` or not //FIXME: Ugly name
      methods: {
        open: 'open',
        close: 'close'
      },
      events: {
        beforeclose: 'beforeclose',
        close: 'close'
      },
      ajax: {
        cache: false,
        method: 'post'
      },
      cache: {
        enabled: false, // Whether remote widgets should be cached or not
        size: 50 // Maximum amount of cached widgets to store, shouldn't change from widget to widget
      },
      storage: {
        enabled: false, // Whether to preserve the content across refreshes/sessions
        ttl: 86400 // 1 day
      },
      attributes: {
        id: 'data-remote-widget-id'
      },
      classes: {
        placeholder: 'remote-widget-placeholder',
        placeholderExtra: '',
        loaded: 'remote-widget-loaded',
        resizing: 'remote-widget-resizing',
        showing: 'remote-widget-showing'
      },
      animations: {
        placeholder: 0,
        resize: Animations.normal
      }
    }
  };

  /* REMOTE WIDGET */

  class RemoteWidget extends Widgets.Remote {

    /* SPECIAL */

    _init () {

      this.options.$wrapper = this.options.$wrapper || this.$layout;

    }

    /* PRIVATE */

    _getUrl () {

      return window.location.href.split ( '#' )[0];

    }

    _getRequestId ( ajax ) {

      let {method, url, data} = ajax;

      if ( _.isPlainObject ( data ) ) data = JSON.stringify ( data );

      return btoa ( [method, url, data].join () ); // Using base64 as a fast hash function (we need to strip out apices for the selectors)

    }

    /* PERSISTENT */

    ___persistent () {

      if ( !this.options.persistent ) {

        this.___route ();

      }

    }

    __route () {

      let currentUrl = this._getUrl ();

      if ( this._openUrl && this._openUrl !== currentUrl ) {

        this.abort ();

      }

    }

    /* WIDGET */

    ___widget ( widget ) {

      if ( !widget ) {

        widget = $(this._template ( 'placeholder', this.options )).attr ( this.options.attributes.id, this.requestId );

      }

      this.$widget = $(widget).appendTo ( this.options.$wrapper );

    }

    _widgetInit () {

      this.$widget.widgetize ();

      Autofocus.focus ( this.$widget );

    }

    _widgetOpen () {

      this.$widget[this.options.widget.config.name]( this.options.methods.open );

    }

    _widgetReplaceWith ( $replacement ) {

      let instance = this.$widget[this.options.widget.config.name]( 'instance' );

      instance[this.options.methods.close] = _.noop;
      instance.destroy ();

      this.$widget.replaceWith ( $replacement );
      this.$widget = $replacement;

      this._widgetInit ();

    }

    _widgetResizing () {}

    _widgetResized () {

      this.$widget.css ({
        width: '',
        height: ''
      });

      this.$widget.removeClass ( this.options.classes.placeholder )
                  .removeClass ( this.options.classes.loaded )
                  .removeClass ( this.options.classes.resizing )
                  .removeClass ( this.options.classes.showing );

    }

    _widgetDestroy () {

      if ( !this.$widget ) return;

      let instance = this.$widget[this.options.widget.config.name]( 'instance' );

      instance.whenUnlocked ( () => {

        instance[this.options.methods.close]();

        this._delay ( function () {

          if ( !this.$widget ) return;

          this.$widget.remove ();

          this.$widget = false;

        }, instance.options.animations[this.options.methods.close] );

      });

    }

    /* CACHE */

    _cacheGet ( id ) {

      return cache.find ( obj => obj.id === id );

    }

    _cacheSet ( id, widget ) {

      cache.unshift ({ id, widget });

      if ( cache.length > this.options.cache.size ) {

        cache = cache.slice ( 0, this.options.cache.size );

      }

    }

    _cacheShow ( obj ) {

      let $widget = $(obj.widget).attr ( this.options.attributes.id, obj.id );

      this.___widget ( $widget );
      this._widgetInit ();
      this._widgetOpen ();
      this.___close ();

    }

    /* ABORT */

    ___abort () {

      this._on ( true, this.$widget, `${this.options.widget.config.name}:${this.options.events.beforeclose}`.toLowerCase (), this.abort );

    }

    /* CLOSE */

    ___close () {

      this._on ( true, this.$widget, `${this.options.widget.config.name}:${this.options.events.close}`.toLowerCase (), this._widgetDestroy );

    }

    /* REQUEST HANDLERS */

    __beforesend ( req ) {

      if ( this.isAborted () ) return;

      this.requestId = this._getRequestId ( this.ajax );
      this.requestTimestamp = Date.now ();

      /* CLOSING */

      let $widget = $(`[${this.options.attributes.id}="${this.requestId}"]`);

      if ( $widget.length ) {

        $widget[this.options.widget.config.name]( this.options.methods.close );

        return false;

      }

      /* CACHE */

      if ( this.options.cache.enabled ) {

        let cached = this._cacheGet ( this.requestId );

        if ( cached ) {

          this._cacheShow ( cached );

          return false;

        }

      }

      /* STORAGE */

      if ( this.options.storage.enabled ) {

        let stored = this._storageGet ( this.requestId );

        if ( stored ) {

          this._cacheShow ( stored );

          return false;

        }

      }

      /* REQUEST */

      this._defer ( function () {

        this._openUrl = this._getUrl ();

      });

      this.___persistent ();
      this.___widget ();
      this.___abort ();

      this._widgetInit ();
      this._widgetOpen ();

      super.__beforesend ( req );

    }

    async __error ( res ) {

      if ( this.isAborted () ) return;

      let message = await fetch.getValue ( res, 'message' ) || this.options.messages.error;

      $.toast ( message );

      this._widgetDestroy ();

      super.__error ( res );

    }

    async __success ( res ) {

      if ( this.isAborted () ) return;

      if ( !this.$widget ) return;

      let resj = await fetch.getValue ( res );

      if ( !resj || resj.error || !(this.options.widget.config.name in resj) ) return this.__error ( res );

      /* WAIT */

      if ( this.options.waitPlaceholderAnimation ) {

        let wait = this.options.animations.placeholder - ( Date.now () - this.requestTimestamp );

        if ( wait > 0 ) await _.wait ( wait );

      }

      /* VARIABLES */

      let remoteWidget = resj[this.options.widget.config.name],
          $remoteWidget = $(remoteWidget),
          prevRect;

      if ( this.options.resize ) prevRect = this.$widget.getRect ();

      $remoteWidget.addClass ( this.options.widget.config.options.classes.show ).addClass ( this.options.widget.config.options.classes[this.options.methods.open] );
      $remoteWidget.attr ( this.options.attributes.id, this.requestId );

      /* CACHE */

      if ( this.options.cache.enabled ) {

        this._cacheSet ( this.requestId, remoteWidget );

      }

      /* STORAGE */

      if ( this.options.storage.enabled ) {

        let storable = {
          id: this.requestId,
          widget: remoteWidget
        };

        this._storageSet ( this.requestId, storable, this.options.storage.ttl );

      }

      /* REPLACING */

      this._frame ( function () {

        this._widgetReplaceWith ( $remoteWidget );

        this.___close ();

        if ( this.options.resize ) {

          let newRect = this.$widget.getRect (),
              needsResize = ( prevRect.width !== newRect.width || prevRect.height !== newRect.height );

          if ( needsResize ) {

            this.$widget.css ({
              width: prevRect.width,
              height: prevRect.height
            });

            this.$widget.addClass ( this.options.classes.placeholder ).addClass ( this.options.classes.resizing );

            this._frame ( function () {

              this.$widget.addClass ( this.options.classes.showing );

              $.animate ( this.$widget[0], {
                width: newRect.width,
                height: newRect.height
              }, {
                duration: this.options.animations.resize,
                callbacks: {
                  tick: this._widgetResizing.bind ( this ),
                  end: this._widgetResized.bind ( this )
                }
              });

            });

          }

        }

      });

      super.__success ( res );

    }

    /* API OVERRIDES */

    abort () {

      this._widgetDestroy ();

      super.abort ();

    }

  }

  /* FACTORY */

  Factory.make ( RemoteWidget, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Animations, Svelto.Autofocus, Svelto.fetch ));


/* =========================================================================
 * Svelto - Widgets - Remote - Modal
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote.js
 * @require ../widget/widget.js
 * @require widgets/modal/modal.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Animations ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remoteModal',
    templates: {
      placeholder : '<div class="modal container <%= o.classes.placeholder %> <%= o.classes.placeholderExtra %>">' +
                      '<svg class="spinner">' +
                        '<circle cx="1.625em" cy="1.625em" r="1.25em">' +
                      '</svg>' +
                    '</div>'
    },
    options: {
      widget: Widgets.Modal,
      classes: {
        placeholder: 'remote-modal-placeholder',
        loaded: 'remote-modal-loaded',
        resizing: 'remote-modal-resizing',
        showing: 'remote-modal-showing'
      },
      animations: {
        placeholder: Animations.normal,
        resize: Animations.normal
      }
    }
  };

  /* REMOTE MODAL */

  class RemoteModal extends Widgets.RemoteWidget {}

  /* FACTORY */

  Factory.make ( RemoteModal, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Animations ));


/* =========================================================================
 * Svelto - Widgets - Remote - Modal (Helper)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./modal.js
 * ========================================================================= */

(function ( $, _, Svelto, RemoteModal ) {

  'use strict';

  /* HELPER */

  $.remoteModal = function ( ajax ) {

    new RemoteModal ({ ajax }).request ();

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.RemoteModal ));


/* =========================================================================
 * Svelto - Widgets - Remote - Modal (Trigger)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote_trigger.js
 * @require ./modal.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remoteModalTrigger',
    plugin: true,
    selector: '.remote-modal-trigger',
    options: {
      widget: Widgets.RemoteModal
    }
  };

  /* REMOTE MODAL TRIGGER */

  class RemoteModalTrigger extends Widgets.RemoteTrigger {}

  /* FACTORY */

  Factory.make ( RemoteModalTrigger, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Remote - Panel
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote.js
 * @require ../widget/widget.js
 * @require widgets/panel/panel.js
 * ========================================================================= */

//TODO: Add support for pinned panels

(function ( $, _, Svelto, Widgets, Factory, Animations ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remotePanel',
    templates: {
      placeholder : '<div class="panel container <%= o.direction %> <%= o.type %> <%= o.classes.placeholder %> <%= o.classes.placeholderExtra %>">' +
                      '<svg class="spinner">' +
                        '<circle cx="1.625em" cy="1.625em" r="1.25em">' +
                      '</svg>' +
                    '</div>'
    },
    options: {
      widget: Widgets.Panel,
      diretion: Widgets.Panel.config.options.diretion,
      type: Widgets.Panel.config.options.type,
      classes: {
        placeholder: 'remote-panel-placeholder',
        loaded: 'remote-panel-loaded',
        resizing: 'remote-panel-resizing',
        showing: 'remote-panel-showing'
      },
      animations: {
        placeholder: Animations.normal,
        resize: Animations.normal
      }
    }
  };

  /* REMOTE PANEL */

  class RemotePanel extends Widgets.RemoteWidget {}

  /* FACTORY */

  Factory.make ( RemotePanel, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Animations ));


/* =========================================================================
 * Svelto - Widgets - Remote - Panel (Helper)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./panel.js
 * ========================================================================= */

(function ( $, _, Svelto, RemotePanel ) {

  'use strict';

  /* HELPER */

  $.remotePanel = function ( ajax, direction, type ) {

    new RemotePanel ({ ajax, direction, type }).request ();

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.RemotePanel ));


/* =========================================================================
 * Svelto - Widgets - Remote - Panel (Trigger)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote_trigger.js
 * @require ./panel.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remotePanelTrigger',
    plugin: true,
    selector: '.remote-panel-trigger',
    options: {
      widget: Widgets.RemotePanel,
      direction: undefined,
      type: undefined
    }
  };

  /* REMOTE PANEL TRIGGER */

  class RemotePanelTrigger extends Widgets.RemoteTrigger {

    /* SPECIAL */

    _init () {

      super._init ();

      this.options.direction = this.$trigger.data ( Widgets.Panel.config.options.datas.direction ) || this.options.direction;
      this.options.type = this.$trigger.data ( Widgets.Panel.config.options.datas.type ) || this.options.type;

    }

    /* OPTIONS */

    _getOptions () {

      let {direction, type} = this.options;

      return _.merge ( super._getOptions (), { direction, type } );

    }

  }

  /* FACTORY */

  Factory.make ( RemotePanelTrigger, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Remote - Popover
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote.js
 * @require ../widget/widget.js
 * @require widgets/popover/popover.js
 * ========================================================================= */

//FIXME: The tip will disappear during a resize (not fixable without changing the markup of a popover just for this)

(function ( $, _, Svelto, Widgets, Factory, Animations ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remotePopover',
    templates: {
      placeholder: '<div class="popover container <%= o.classes.placeholder %> <%= o.classes.placeholderExtra %>">' +
                     '<svg class="spinner">' +
                       '<circle cx="1.625em" cy="1.625em" r="1.25em">' +
                     '</svg>' +
                   '</div>'
    },
    options: {
      widget: Widgets.Popover,
      positionate: {}, // Extending Widget.Popover.options.positionate
      cache: {
        enabled: true
      },
      classes: {
        placeholder: 'remote-popover-placeholder',
        loaded: 'remote-popover-loaded',
        resizing: 'remote-popover-resizing',
        showing: 'remote-popover-showing'
      },
      animations: {
        placeholder: Animations.fast,
        resize: Animations.fast
      }
    }
  };

  /* REMOTE POPOVER */

  class RemotePopover extends Widgets.RemoteWidget {

    /* PRIVATE */

    _positionate () {

      this.$widget.popover ( 'instance' )._positionate ();

    }

    /* WIDGET */

    _widgetInit () {

      this.$widget.popover ( 'option', 'positionate', this.options.positionate );

      super._widgetInit ();

    }

    _widgetReplaceWith ( $replacement ) {

      let {fullscreen, fullscreenRequest} = this.options.widget.config.options.classes,
          isFullscreen = $replacement.hasClass ( fullscreen ) || $replacement.hasClass ( fullscreenRequest ),
          matrix = this.$widget.matrix (),
          positionateGuid = this.$widget[0]._positionateGuid,
          {$anchor} = this.$widget.popover ( 'instance' );

      if ( !isFullscreen ) {

        let classList = this.$widget.attr ( 'class' ) || '',
            classes = classList.split ( ' ' ),
            positionateClass = classes.find ( cls => cls.startsWith ( 'positionate-' ) ),
            pointingClass = classes.find ( cls => cls.startsWith ( 'pointing-' ) );

        if ( positionateClass ) $replacement.addClass ( positionateClass );
        if ( pointingClass ) $replacement.addClass ( pointingClass );

      }

      super._widgetReplaceWith ( $replacement );

      this.$widget.popover ( 'instance' ).$anchor = $anchor;
      this.$widget.matrix ( matrix );
      this.$widget[0]._positionateGuid = positionateGuid;

      if ( !this.options.resize ) this._positionate ();

    }

    _widgetResizing () {

      this._positionate ();

    }

  }

  /* FACTORY */

  Factory.make ( RemotePopover, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Animations ));


/* =========================================================================
 * Svelto - Widgets - Remote - Popover (Helper)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./popover.js
 * ========================================================================= */

(function ( $, _, Svelto, RemotePopover ) {

  'use strict';

  /* HELPER */

  $.remotePopover = function ( ajax, target ) {

    let positionate = {};

    if ( target instanceof $ ) {

      positionate.$anchor = target;

    } else if ( 'x' in target && 'y' in target ) {

      positionate.point = target;

    }

    new RemotePopover ({ ajax, positionate }).request ();

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.RemotePopover ));


/* =========================================================================
 * Svelto - Widgets - Remote - Popover (Trigger)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote_trigger.js
 * @require ./popover.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remotePopoverTrigger',
    plugin: true,
    selector: '.remote-popover-trigger',
    options: {
      widget: Widgets.RemotePopover
    }
  };

  /* REMOTE POPOVER TRIGGER */

  class RemotePopoverTrigger extends Widgets.RemoteTrigger {

    /* OPTIONS */

    _getOptions () {

      return _.merge ( super._getOptions (), {
        positionate: {
          $anchor: this.$trigger
        }
      });

    }

  }

  /* FACTORY */

  Factory.make ( RemotePopoverTrigger, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Select
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/browser/browser.js
 * @require widgets/popover/popover.js
 * ========================================================================= */

//TODO: Add support for selecting multiple options (with checkboxes maybe)
//TODO: Add an input field for searching through the options

(function ( $, _, Svelto, Widgets, Factory, Browser, Pointer, Colors ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'select',
    plugin: true,
    selector: '.select',
    templates: {
      base: '<div class="popover select-popover card <%= o.size %> <%= o.color %> <%= o.css %> <%= o.guc %>">' +
              '<div class="card-block">' +
                '<% for ( var i = 0, l = o.options.length; i < l; i++ ) { %>' +
                  '<% print ( self[ o.options[i].value ? "option" : "optgroup" ] ( { opt: o.options[i], color: o.color } ) ) %>' +
                '<% } %>' +
              '</div>' +
            '</div>',
      optgroup: '<div class="divider">' +
                  '<%= o.opt.prop %>' +
                '</div>',
      option: '<div class="button <%= o.color %>" data-value="<%= o.opt.prop %>">' +
                '<%= o.opt.value %>' +
              '</div>'
    },
    options: {
      native: true, // Don't show the popover and use the native select, enabled by default
      popover: {
        size: '',
        color: Colors.white,
        css: Widgets.Popover.config.options.classes.affixed + ' bordered'
      },
      classes: {
        open: 'open active',
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
        valueholderFallback: 'label:not(.no-value)',
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

  class Select extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$wrp = this.$element;
      this.$select = this.$wrp.find ( this.options.selectors.select );
      this.$options = this.$select.find ( this.options.selectors.option );
      this.$valueholder = this.$wrp.find ( this.options.selectors.valueholder ).first ();

      if ( !this.$valueholder.length ) {

        this.$valueholder = this.$wrp.find ( this.options.selectors.valueholderFallback ).first ();

      }

      this.initialValueholder = this.$valueholder.text ();

      this.selectOptions = [];

      this.$popover = false;

    }

    _init () {

      this._updateValueholder ();

      if ( !this.options.native ) {

        this.$select.addClass ( this.options.classes.hidden );

        this.___selectOptions ();
        this.___popover ();

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

      if ( this.options.native ) return;

      /* BUTTON TAP */

      this._on ( this.$popover, Pointer.tap, this.options.selectors.button, this.__buttonTap );

    }

    __buttonTap ( event ) {

      event.stopImmediatePropagation ();

      this.$popover.popover ( 'close' );

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

        let value = $option.text ();

        if ( value ) {

          this.selectOptions.push ({
            value: $option.text (),
            prop: $option.attr ( 'value' )
          });

        }

      }

    }

    /* POPOVER */

    ___popover () {

      let html = this._template ( 'base', _.extend ( { guc: this.guc, options: this.selectOptions }, this.options.popover ) );

      this.$popover = $(html).appendTo ( this.$layout );
      this.$buttons = this.$popover.find ( this.options.selectors.button );

      this.$popover.popover ({
        positionate: {
          axis: 'y',
          strict: true
        },
        callbacks: {
          beforeopen: this.__setPopoverWidth.bind ( this ),
          open: this.__popoverOpen.bind ( this ),
          close: this.__popoverClose.bind ( this )
        }
      });

      this.$wrp.attr ( `data-${Widgets.Targeter.config.options.datas.target}`, '.' + this.guc ).popoverToggler ();

      this._updatePopover ();

    }

    __setPopoverWidth () {

      if ( this.$popover.is ( '.' + this.options.classes.affixed ) ) {

        this.$popover.css ( 'min-width', this.$wrp.outerWidth () );

      }

    }

    __popoverOpen () {

      this.___buttonTap ();

      this.$wrp.addClass ( this.options.classes.open );

      this._trigger ( 'open' );

    }

    __popoverClose () {

      this._reset ();

      this.___change ();

      this.$wrp.removeClass ( this.options.classes.open );

      this._trigger ( 'close' );

    }

    /* UPDATE */

    _updateValueholder () {

      let value = this.$select.val ();

      if ( _.isString ( value ) ) { //FIXME: Is it needed?

        if ( value.length ) {

          let $selectedOption = this.$options.filter ( `[value="${value}"]` ).last ();

          this.$valueholder.text ( $selectedOption.text () );

        } else {

          this.$valueholder.text ( this.initialValueholder );

        }

      }

    }

    _updatePopover () {

      this.$buttons.removeClass ( this.options.classes.selected );

      this.$buttons.filter ( '[data-' + this.options.datas.value + '="' + this.$select.val () + '"]' ).last ().addClass ( this.options.classes.selected );

    }

    _update () {

      this._updateValueholder ();

      if ( !this.options.native ) {

        this._updatePopover ();

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

  Factory.make ( Select, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Browser, Svelto.Pointer, Svelto.Colors ));


/* =========================================================================
 * Svelto - Widgets - Selectable
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before widgets/datatables/datatables.js
 * @require core/browser/browser.js
 * @require core/mouse/mouse.js
 * @require core/widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer, Browser, Keyboard, Mouse ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'selectable',
    plugin: true,
    selector: 'table.selectable',
    options: {
      moveThreshold: 5, // Threshold after with we start to consider the `Pointer.move` events (Dragging disabled on touch device)
      single: false, // Enforcing `select-single` even without the need to add the class
      classes: {
        selected: 'selected',
        single: 'select-single',
        datatable: 'datatable'
      },
      selectors: {
        element: 'tbody tr:not(.table-row-empty)', //FIXME: Add support for datatables' empty row
        selectionToggler: undefined // Selector having `element` as context. If falsy the entire `element` will be the selection toggler
      },
      keystrokes: {
        'ctmd + a': 'all',
        'ctmd + shift + a': 'clear',
        'ctmd + i': 'invert'
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

      this._isSingle = this.options.single || this.$selectable.hasClass ( this.options.classes.single );
      this._isDataTable = this.$selectable.hasClass ( this.options.classes.datatable );

      this._dtapi = this._isDataTable ? this.$selectable.DataTable () : false;

      this.$elements = this._getElements ();

      this._usingSelectionToggler = !!this.options.selectors.selectionToggler;
      this.options.selectors.selectionToggler = this._usingSelectionToggler ? this.options.selectors.element + ' ' + this.options.selectors.selectionToggler : this.options.selectors.element;

      this.__move = this._frames ( this.__move.bind ( this ) ); // For performance reasons

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

      this._on ( true, 'change tablehelper:change sortable:sort processing.dt sort.dt search.dt', this.__change );

    }

    __change () {

      this.$elements = this._getElements ();

      this._resetPrev ();

      this._trigger ( 'change' );

    }

    /* KEYDOWN */

    ___keydown () {

      this._onHover ( [$.$document, 'keydown', this.__keydown] );

    }

    /* DOWN / TAP */

    ___downTap () {

      if ( this._isSingle ) {

        this.___tap ();

      } else if ( Browser.is.touchDevice ) {

        this.___down ();
        this.___tap ();

      } else {

        this.___down ();

      }

    }

    ___down () {

      this._on ( Pointer.down, this.options.selectors.selectionToggler, this.__down );

    }

    ___tap () {

      this._tappable = true;

      this._on ( Pointer.tap, this.options.selectors.selectionToggler, this.__tapTouch );

    }

    /* TAP */ // Just for touch devices or single select

    __tapTouch ( event ) {

      if ( !this._tappable ) return;

      event.preventDefault ();

      let $target = this._getEventElement ( event );

      if ( this._isSingle ) {

        this.$elements.not ( $target ).removeClass ( this.options.classes.selected ); //FIXME: Quite performance intensive, most of it could be avoided

      }

      $target.toggleClass ( this.options.classes.selected );

      this._trigger ( 'change' );

    }

    /* CLICK / CTMD + CLICK / SHIFT + CLICK / CLICK -> DRAG */

    __down ( event ) {

      this._tappable = Pointer.isTouchEvent ( event );

      if ( this._tappable ) return;

      event.preventDefault ();

      this.startEvent = event;
      this.$startElement = this._getEventElement ( event );

      this._on ( true, $.$document, Pointer.move, this.__move );

      this._one ( true, $.$document, Pointer.up, this.__up );

      this._one ( true, $.$document, Pointer.cancel, this.__cancel );

    }

    __move ( event ) {

      event.preventDefault ();

      let startXY = $.eventXY ( this.startEvent ),
          endXY = $.eventXY ( event ),
          deltaXY = {
            x: endXY.x - startXY.x,
            y: endXY.y - startXY.y
          },
          absDeltaXY = {
            x: Math.abs ( deltaXY.x ),
            y: Math.abs ( deltaXY.y )
          };

      if ( absDeltaXY.x >= this.options.moveThreshold || absDeltaXY.y >= this.options.moveThreshold ) {

        this._off ( $.$document, Pointer.move, this.__move );

        this._off ( $.$document, Pointer.up, this.__up );

        this._off ( $.$document, Pointer.cancel, this.__cancel );

        this._resetPrev ();

        if ( !Keyboard.keystroke.hasCtrlOrCmd ( event ) ) {

          this.$elements.removeClass ( this.options.classes.selected );

        }

        this.$startElement.toggleClass ( this.options.classes.selected );

        this._on ( true, Pointer.enter, this.options.selectors.element, this.__dragEnter );

        this._one ( true, $.$document, Pointer.up + ' ' + Pointer.cancel, this.__dragEnd );

        this._trigger ( 'change' );

      }

    }

    __dragEnter ( event ) {

      this._toggleGroup ( this.$startElement, this._getEventElement ( event ) );

      this._trigger ( 'change' );

    }

    __dragEnd () {

      this._off ( Pointer.enter, this.__dragEnter );

    }

    __up ( event ) {

      this._off ( $.$document, Pointer.move, this.__move );

      this._off ( $.$document, Pointer.cancel, this.__cancel );

      let isRightButton = Mouse.hasButton ( event, Mouse.buttons.RIGHT ); // When right clicking we suppose that we also want to select that element (useful when used in conjuction with SelectableActionsPopover)

      if ( event.shiftKey ) {

        this._toggleGroup ( this.$prevElement, this.$startElement );

      } else if ( Keyboard.keystroke.hasCtrlOrCmd ( event ) ) {

        this.$startElement.toggleClass ( this.options.classes.selected, isRightButton ? true : undefined );

        this._resetPrev ( this.$startElement );

      } else {

        let $selected = this.get (),
            $others = $selected.not ( this.$startElement );

        if ( $others.length  ) {

          $others.removeClass ( this.options.classes.selected );

          this.$startElement.addClass ( this.options.classes.selected );

        } else {

          this.$startElement.toggleClass ( this.options.classes.selected, isRightButton ? true : undefined );

        }

        this._resetPrev ( this.$startElement );

      }

      this._trigger ( 'change' );

    }

    __cancel () {

      this._off ( $.$document, Pointer.move, this.__move );

      this._off ( $.$document, Pointer.up, this.__up );

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

      return this._dtapi ? $(this._dtapi.rows ().nodes ()) : this.$selectable.find ( this.options.selectors.element );

    }

    _getEventElement ( event ) {

      let $target = $(event.currentTarget);

      return this._usingSelectionToggler ? $target.closest ( this.options.selectors.element) : $target;

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

      if ( this._isSingle ) return;

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

      if ( this._isSingle ) return;

      this.$elements.toggleClass ( this.options.classes.selected );

      this._resetPrev ();

      this._trigger ( 'change' );

    }

  }

  /* FACTORY */

  Factory.make ( Selectable, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Browser, Svelto.Keyboard, Svelto.Mouse ));


/* =========================================================================
 * Svelto - Widgets - Slider
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require lib/transform/transform.js
 * @require widgets/draggable/draggable.js
 * ========================================================================= */

//TODO: Add vertical slider

(function ( $, _, Svelto, Widgets, Factory ) {

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
      live: false, // Whether it will update the input also on `Draggable.move` or just on `Draggable.end`
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

  class Slider extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$slider = this.$element;
      this.$input = this.$slider.find ( this.options.selectors.input );
      this.$bar = this.$slider.find ( this.options.selectors.bar );
      this.$highlight = this.$slider.find ( this.options.selectors.highlight );
      this.$handler = this.$slider.find ( this.options.selectors.handler );
      this.$label = this.$slider.find ( this.options.selectors.label );

    }

    _init () {

      /* VARIABLES */

      let value = this.$input.val ();

      /* OPTIONS */

      this.options.min = Number ( this.$slider.data ( this.options.datas.min ) || this.options.min );
      this.options.max = Number ( this.$slider.data ( this.options.datas.max ) || this.options.max );
      this.options.value = this._sanitizeValue ( value || this.options.value );
      this.options.step = Number ( this.$slider.data ( this.options.datas.step ) || this.options.step );
      this.options.decimals = Number ( this.$slider.data ( this.options.datas.decimals ) || this.options.decimals );

      /* STEPS NR */

      this.stepsNr = ( this.options.max - this.options.min ) / this.options.step;

      /* UPDATE */

      if ( Number ( value ) !== this.options.value ) {

        this._update ();

      } else {

        this._updatePositions ();
        this._updateLabel ();

      }

    }

    _events () {

      this.___change ();
      this.___keydown ();
      this.___drag ();

    }

    /* PRIVATE */

    _sanitizeValue ( value ) {

      return _.clamp ( Number ( Number ( value ).toFixed ( this.options.decimals ) ), this.options.min, this.options.max );

    }

    /* UPDATE */

    _updateVariables () {

      this.barWidth = this.$bar.width ();

      this.stepWidth = this.barWidth / this.stepsNr;

    }

    _updatePositions ( value = this.options.value ) {

      let percentage = ( value - this.options.min ) / this.options.step * 100 / this.stepsNr;

      this.$handler.css ( 'left', percentage + '%' );
      this.$highlight.css ( 'right', ( 100 - percentage ) + '%' );

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

    /* KEYDOWN */

    ___keydown () {

      this._onHover ( [$.$document, 'keydown', this.__keydown] );

    }

    /* DRAG */

    ___drag () {

      this.$handler.draggable ({
        draggable: this.isEnabled.bind ( this ),
        axis: 'x',
        proxy: {
          $element: this.$slider,
          noMotion: this.__dragNoMotion.bind ( this )
        },
        modifiers: {
          x: this.__dragModifierX.bind ( this )
        },
        callbacks: {
          start: this.__dragStart.bind ( this ),
          move: this.__dragMove.bind ( this ),
          end: this.__dragEnd.bind ( this )
        }
      });

    }

    __dragNoMotion () {

      return !this._dragDistance;

    }

    _dragValue () {

      return this._sanitizeValue ( this.options.value + ( this._dragDistance / this.stepWidth * this.options.step ) );

    }

    __dragModifierX ( distance ) {

      this._dragDistance = this._dragProxyDistance + _.roundCloser ( distance, this.stepWidth );

      if ( this._dragIsProxyed && !this._dragProxyDistance ) {

        this._dragProxyDistance = this._dragDistance;

      }

      return false;

    }

    __dragStart ( event, data ) {

      this._dragIsProxyed = data.isProxyed;
      this._dragProxyDistance = 0;
      this._dragDistance = 0;

      this._updateVariables ();

    }

    __dragMove () {

      let value = this._dragValue ();

      if ( this.options.live ) {

        this.set ( value );

      } else {

        this._updateLabel ( value );
        this._updatePositions ( value );

      }

    }

    __dragEnd () {

      this.set ( this._dragValue () );

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

  Factory.make ( Slider, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Spinner - Overlay
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/colors/colors.js
 * @require widgets/overlay/overlay.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Colors ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'spinnerOverlay',
    plugin: true,
    templates: {
      overlay: '<div class="overlay spinner-overlay <%= o.dimmer ? "dimmer" : "" %>">' +
                 '<% if ( o.labeled ) { %>' +
                   '<div class="spinner-label <%= o.colors.labeled %>">' +
                 '<% } %>' +
                   '<svg class="spinner <%= ( o.multicolor ? "multicolor" : ( o.labeled ? "" : o.unlabeled ) ) %>">' +
                     '<circle cx="1.625em" cy="1.625em" r="1.25em">' +
                   '</svg>' +
                 '<% if ( o.labeled ) { %>' +
                   '</div>' +
                 '<% } %>' +
               '</div>'
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

  class SpinnerOverlay extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$overlayed = this.$element;
      this.$overlay = $(this._template ( 'overlay', this.options ));

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

      if ( this.isLocked () || this.isOpen () ) return;

      this.$overlay.prependTo ( this.$overlayed );

      this.instance.open ();

      this._trigger ( 'open' );

    }

    close () {

      if ( this.isLocked () || !this.isOpen () ) return;

      this.lock ();

      this.instance.close ();

      this._delay ( function () {

        this.$overlay.detach ();

        this.unlock ();

        this._trigger ( 'close' );

      }, Widgets.Overlay.config.options.animations.close );

    }

  }

  /* FACTORY */

  Factory.make ( SpinnerOverlay, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Colors ));


/* =========================================================================
 * Svelto - Widgets - Form - Ajax
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before ../validate/validate.js
 * @require core/svelto/svelto.js
 * @require lib/fetch/fetch.js
 * @require lib/url/url.js
 * @require widgets/toast/toast.js
 * @require widgets/spinner/overlay/overlay.js
 * ========================================================================= */

//TODO: Add a way to abort it, maybe hovering the spinner a clickable X will be displayed and abort the request if tapped (or something more intuitive and easier to implement...)

(function ( $, _, Svelto, Widgets, Factory, fetch, URL ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'formAjax',
    plugin: true,
    selector: 'form.ajax',
    options: {
      spinnerOverlay: true, // Enable/disable the `spinnerOverlay`, if disabled one can use the triggered events in order to provide a different visual feedback to the user
      timeout: 31000, // 1 second more than the default value of PHP's `max_execution_time` setting
      autoclose: { // Close the form (or its container) on success
        enabled: true,
        selectors: ['.modal', '.panel', '.popover', '.overlay', '.expander'], // Possible selectors for the container that needs to be closed
        plugins: ['modal', 'panel', 'popover', 'overlay', 'expander'], // Maps each selector to its jQuery plugin name
        methods: 'close' // Maps each plugin with a method to call. Can also be a string if all the plugins have the same method name
      },
      messages: {
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

    /* AUTOCLOSE */

    _autoclose () {

      let {selectors, plugins, methods} = this.options.autoclose;

      for ( let i = 0, l = selectors.length; i < l; i++ ) {

        let $closable = this.$form.closest ( selectors[i] );

        if ( !$closable.length ) continue;

        let method = _.isArray ( methods ) ? methods[i] : methods;

        if ( this.options.spinnerOverlay ) {

          this._on ( 'spinneroverlay:close', () => $closable[plugins[i]]( method ) );

        } else {

          $closable[plugins[i]]( method );

        }

        break;

      }

    }

    /* SUBMIT */

    ___submit () {

      this._on ( true, 'submit', this.__submit );

    }

    __submit ( event ) {

      event.preventDefault ();
      event.stopImmediatePropagation ();

      fetch ({
        url: this.$form.attr ( 'action' ),
        method: this.$form.attr ( 'method' ) || 'post',
        body: new FormData ( this.form ),
        cache: false,
        timeout: this.options.timeout,
        beforesend: this.__beforesend.bind ( this ),
        error: this.__error.bind ( this ),
        success: this.__success.bind ( this ),
        complete: this.__complete.bind ( this )
      });

    }

    /* REQUEST HANDLERS */

    __beforesend ( req ) {

      if ( this.options.spinnerOverlay ) {

        this.$form.spinnerOverlay ( 'open' );

      }

      this._trigger ( 'beforesend', req );

    }

    async __error ( res ) {

      let message = await fetch.getValue ( res, 'message' ) || this.options.messages.error;

      $.toast ( message );

      this._trigger ( 'error', res );

    }

    async __success ( res ) {

      let resj = await fetch.getValue ( res );

      if ( resj ) {

        if ( resj.error ) {

          return this.__error ( res );

        } else if ( resj.refresh || URL.isEqual ( resj.url, window.location.href ) ) {

          $.toast ( resj.message || this.options.messages.refreshing );

          location.reload ();

        } else if ( resj.url ) {

          // In order to redirect to another domain the protocol must be provided. For instance `https://www.domain.tld` will work while `www.domain.tld` won't

          $.toast ( resj.message || this.options.messages.redirecting );

          const needsReload = URL.isEqual ( resj.url, window.location.href, true ); // Supporting #target changes

          location.assign ( resj.url );

          if ( needsReload ) {

            location.reload ();

          }

        } else if ( !resj.noop ) {

          $.toast ( resj.message || this.options.messages.success );

        }

        if ( this.options.autoclose.enabled ) this._autoclose ();

      } else {

        $.toast ( this.options.messages.success );

      }

      this._trigger ( 'success', res );

    }

    __complete ( res ) {

      if ( this.options.spinnerOverlay ) {

        this.$form.spinnerOverlay ( 'close' );

      }

      this._trigger ( 'complete', res );

    }

  }

  /* FACTORY */

  Factory.make ( FormAjax, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.fetch, Svelto.URL ));


/* =========================================================================
 * Svelto - Widgets - Editor
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before ./vendor/marked.js
 * @before lib/emojify/emojify.js
 * @before lib/markdown/markdown.js
 * @before widgets/emoji/picker/popover/popover_trigger.js
 * @before widgets/form/ajax/ajax.js
 * @require widgets/storable/storable.js
 * ========================================================================= */

//TODO: Add headings support (level 1/3/5, like github does)
//TODO: MAYBE make a simpler editor with some stuff unimplemented, then extend it with a `EditorMarkdown` etc...
//TODO: Switch to a `contenteditable` version where the preview and editor actual are the same thing

(function ( $, _, Svelto, Widgets, Factory, Pointer, Emoji, Emojify, EmojipickerPopover, EmojipickerPopoverTrigger, Markdown ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'editor',
    plugin: true,
    selector: '.editor',
    options: {
      parentUnfullscreenEvents: 'popover:close modal:close panel:close chatmessageeditable:unedit chatmessagereplyable:unreply chatmessagereplyablereply:unreply', //FIXME: Ugly
      parser: Markdown.parse,
      storage: {
        enabled: false, // Whether to preserve the content across refreshes/sessions
        ttl: 604800 // 1 week
      },
      actions: {
        bold () {
          this._action ( '**', '**', 'bold' );
        },
        italic () {
          this._action ( '_', '_', 'italic' );
        },
        strikethrough () {
          this._action ( '~~', '~~', 'removed' );
        },
        list_unordered () {
          this._action ( '\n- ', '\n', 'List element' );
        },
        list_ordered () {
          this._action ( '\n1. ', '\n', 'List element' );
        },
        link () {
          this._action ( '[', '](https://example.com)', 'Link' );
        },
        image () {
          this._action ( '![', '](https://example.com/image.jpg)', 'Image' );
        },
        code () {
          this._action ( '`', '`', 'code' );
        },
        quote () {
          this._action ( '\n> ', '\n', 'Quote' );
        },
        divider () {
          this._action ( '\n-----', '\n', '', false );
        },
        undo () {
          document.execCommand ( 'undo' );
        },
        redo () {
          document.execCommand ( 'redo' );
        },
        store () {
          this._storageSet ( this._storageKey, this.get (), this.options.storage.ttl );
        },
        unstore () {
          this._storageRemove ( this._storageKey );
        },
        restore () {
          this.set ( this._storageGet ( this._storageKey ) );
        },
        preview () {
          this.togglePreview ();
        },
        fullscreen () {
          this.toggleFullscreen ();
        }
      },
      datas: {
        action: 'action'
      },
      classes: {
        preview: 'preview',
        fullscreen: 'fullscreen',
        fullscreenable: {
          request: 'fullscreen-request'
        },
        trigger: {
          active: 'active text-secondary',
        }
      },
      selectors: {
        actions: '[data-action]',
        fullscreenable: '.card, .chat, .chat-message-content, .modal, .panel, .popover',
        preview: '.editor-preview',
        textarea: 'textarea',
        form: 'form',
        triggers: {
          all: '[data-action]',
          preview: '[data-action="preview"]',
          fullscreen: '[data-action="fullscreen"]'
        }
      },
      keystrokes: {
        'ctmd + b': ['action', 'bold'],
        'ctmd + i': ['action', 'italic'],
        'ctmd + s': ['action', 'strikethrough'],
        'ctmd + u': ['action', 'list_unordered'],
        'ctmd + o': ['action', 'list_ordered'],
        'ctmd + l': ['action', 'link'],
        'ctmd + g': ['action', 'image'],
        'ctmd + k': ['action', 'code'],
        'ctmd + m': ['action', 'quote'],
        'ctmd + d': ['action', 'divider'],
        'ctmd + p': ['action', 'preview'],
        'ctmd + f': ['action', 'fullscreen'],
        'esc': '__esc'
      },
      callbacks: {
        action: _.noop,
        preview: _.noop,
        unpreview: _.noop,
        fullscreen: _.noop,
        unfullscreen: _.noop
      }
    }
  };

  /* EDITOR */

  class Editor extends Widgets.Storable {

    /* SPECIAL */

    _variables () {

      super._variables ();

      this.$editor = this.$element;
      this.editor = this.$editor[0];

      this.$textarea = this.$editor.find ( this.options.selectors.textarea );
      this.textarea = this.$textarea[0];
      this.$preview = this.$editor.find ( this.options.selectors.preview );

      this.$triggers = this.$editor.find ( this.options.selectors.triggers.all );
      this.$triggerPreview = this.$triggers.filter ( this.options.selectors.triggers.preview );
      this.$triggerFullscreen = this.$triggers.filter ( this.options.selectors.triggers.fullscreen );

      this.$fullscreenable = this.$editor.parents ( this.options.selectors.fullscreenable );

      this.$emojipickerPopoverTrigger = EmojipickerPopoverTrigger ? this.$editor.find ( EmojipickerPopoverTrigger.config.selector ) : false;

      this.$form = this.$editor.closest ( this.options.selectors.form );

    }

    _init () {

      this._isPreview = this.$editor.hasClass ( this.options.classes.preview );
      this._isFullscreen = this.$editor.hasClass ( this.options.classes.fullscreen );

      /* STORAGE */

      this.options.storage.enabled = this.options.storage.enabled || $.widget.is ( this.editor, Widgets.Storable, true );

      if ( this.options.storage.enabled ) {

        this._storageInit ();

        if ( this._storageKey ) {

          let action = this.get () ? 'store' : 'restore';

          this.options.actions[action].apply ( this );

        }

      }

    }

    _events () {

      this.___keydown ();
      this.___triggers ();
      this.___parentUnfullscreen ();

      if ( this.options.storage.enabled && this._storageKey ) {

        this.___storage ();

        if ( this.$form.length ) this.___submit ();

      }

      if ( this.$emojipickerPopoverTrigger && this.$emojipickerPopoverTrigger.length ) this.___emojipicker ();

    }

    /* KEYDOWN */

    ___keydown () {

      this._onHover ( [$.$document, 'keydown', this.__keydown] );

    }

    /* ESC */

    __esc () {

      if ( !this.isFullscreen () ) return null;

      this.unfullscreen ();

    }

    /* TRIGGERS */

    ___triggers () {

      for ( let trigger of this.$triggers ) {

        let $trigger = $(trigger),
            action = $trigger.data ( this.options.datas.action );

        this._on ( $trigger, Pointer.tap, _.wrap ( action, this.action ) );

      }

    }

    /* PARENT UNFULLSCREEN */

    ___parentUnfullscreen () {

      this._on ( true, $.$document, this.options.parentUnfullscreenEvents, this.__parentUnfullscreen );

    }

    __parentUnfullscreen ( event ) {

      if ( !$.contains ( event.target, this.editor ) ) return;

      this.unfullscreen ();

    }

    /* STORAGE */

    ___storage () {

      this._on ( 'change cut paste keyup', this._throttle ( this.options.actions.store.bind ( this ), 1000 ) );

    }

    _storageInit () {

      this._storageKey = this.$editor.attr ( 'id' );

    }

    /* SUBMIT */

    ___submit () {

      let event = Widgets.FormAjax && $.widget.is ( this.$form[0], Widgets.FormAjax ) ? 'formajax:success' : 'submit';

      this._on ( this.$form, event, this.__submit );

    }

    __submit () {

      this.options.actions.unstore.apply ( this );

    }

    /* EMOJIPICKER */

    ___emojipicker () {

      this._on ( true, this.$emojipickerPopoverTrigger, 'emojipickerpopovertrigger:beforetrigger', this.___emojipickerOpen );

    }

    ___emojipickerOpen () {

      this._one ( true, $.$document, 'emojipickerpopover:open', this.__emojipickerOpen );

    }

    __emojipickerOpen () {

      this._one ( true, $.$document, 'emojipickerpopover:beforeclose', this.__emojipickerClose );
      this._on ( true, $.$document, 'emojipicker:pick', this.__emojipickerPick );

    }

    __emojipickerClose () {

      this._off ( $.$document, 'emojipicker:pick', this.__emojipickerPick );

    }

    __emojipickerPick ( event, data ) {

      let encoded = Emoji.encode ( data.emoji, data.tone );

      this._insertAtSelection ( encoded, true );

    }

    /* SELECTION */

    _getSelection () {

      let start = this.textarea.selectionStart,
          end   = this.textarea.selectionEnd,
          text  = this.$textarea.val ().substring ( start, end );

      return { start, end, text };

    }

    _getWordSelection () {

      let value     = this.$textarea.val (),
          selection = this._getSelection ();

      if ( selection.text.length || !value ) return selection;

      /* FINDING */

      let start = selection.start;

      while ( start >= 0 && start < value.length ) {

        if ( !value[start].match ( /[a-zA-Z0-9-]/ ) ) break;

        start -= 1;

      }

      start = Math.min ( selection.start, start + 1 );


      let end = selection.end + 1;

      while ( end < value.length ) {

        if ( !value[end].match ( /[a-zA-Z0-9-]/ ) ) break;

        end += 1;

      }

      if ( start === selection.start || end === selection.end ) return selection;

      this.textarea.setSelectionRange ( start, end );

      return this._getSelection ();

    }

    _insertAtSelection ( text, padding = false ) {

      let value     = this.$textarea.val (),
          selection = this._getSelection (),
          padLeft   = padding && selection.start && value[selection.start - 1] !== ' ' ? ' ' : '',
          padRight  = padding && selection.end < value.length && value[selection.end] !== ' ' ? ' ' : '',
          newValue  = value.substr ( 0, selection.start ) + padLeft + text + padRight + value.substr ( selection.end, value.length ),
          newRange  = selection.start + padLeft.length + text.length;

      this.$textarea.val ( newValue ).change ();

      this.textarea.setSelectionRange ( newRange, newRange );

    }

    _replaceSelection ( prefix, suffix, placeholder ) {

      let value     = this.$textarea.val (),
          selection = this._getSelection (),
          newValue  = value.substr ( 0, selection.start ) + prefix + placeholder + suffix + value.substr ( selection.end, value.length );

      this.$textarea.val ( newValue ).change ();

      this.textarea.setSelectionRange ( selection.start + prefix.length, selection.start + prefix.length + placeholder.length );

    }

    _isSelectionWrapped ( prefix, suffix ) {

      let value     = this.$textarea.val (),
          selection = this._getSelection ();

      return value.substr ( selection.start - prefix.length, prefix.length ) === prefix &&
             value.substr ( selection.end, suffix.length ) === suffix;

    }

    _toggleWrapSelection ( prefix, suffix, placeholder ) {

      if ( this._isSelectionWrapped ( prefix, suffix ) ) {

        this._unwrapSelection ( prefix, suffix, placeholder );

      } else {

        this._wrapSelection ( prefix, suffix );

      }

    }

    _wrapSelection ( prefix, suffix ) {

      let value     = this.$textarea.val (),
          selection = this._getSelection (),
          newValue  = value.substr ( 0, selection.start ) + prefix + selection.text + suffix + value.substr ( selection.end, value.length );

      this.$textarea.val ( newValue ).change ();

      this.textarea.setSelectionRange ( selection.start + prefix.length, selection.end + prefix.length );

    }

    _unwrapSelection ( prefix, suffix, placeholder ) {

      let value         = this.$textarea.val (),
          selection     = this._getSelection (),
          isPlaceholder = selection.text === placeholder,
          newValue      = value.substr ( 0, selection.start - prefix.length ) + ( isPlaceholder ? '' : selection.text ) + value.substr ( selection.end + suffix.length, value.length );

      this.$textarea.val ( newValue ).change ();

      this.textarea.setSelectionRange ( selection.start - prefix.length, selection.end - prefix.length - ( isPlaceholder ? selection.text.length : 0 ) );

    }

    /* ACTION */

    _action ( prefix, suffix, placeholder, needWord = true ) {

      let selection = needWord ? this._getWordSelection () : this._getSelection ();

      if ( selection.text.length ) {

        this._toggleWrapSelection ( prefix, suffix, placeholder );

      } else {

        this._replaceSelection ( prefix, suffix, placeholder );

      }

    }

    /* PARSE */

    _parse ( str = this.$textarea.val () ) {

      return this.options.parser ( str );

    }

    /* RENDER */

    async _render () {

      this.$preview.html ( await this._parse () );

      if ( Emojify ) this.$preview.emojify ();

    }

    /* API */

    get ( parsed ) {

      return parsed ? this._parse () : this.$textarea.val ();

    }

    set ( value ) {

      if ( !_.isString ( value ) || value === this.$textarea.val () ) return;

      this.$textarea.val ( value ).change ();

      if ( this._isPreview ) this._render ();

    }

    reset () {

      return this.set ( '' );

    }

    action ( action, event ) {

      if ( !action || !this.options.actions.hasOwnProperty ( action ) ) return;

      if ( event ) event.preventDefault ();

      this.options.actions[action].apply ( this );

      this.$textarea.focus ();

      this._trigger ( 'action', {action} );

    }

    /* PREVIEW */

    isPreview () {

      return this._isPreview;

    }

    togglePreview ( force = !this._isPreview ) {

      if ( !!force !== this._isPreview ) {

        this[force ? 'preview' : 'unpreview']();

      }

    }

    preview () {

      if ( this._isPreview ) return;

      this._isPreview = true;

      this._render ();

      this.$preview.outerHeight ( this.$textarea.outerHeight () );

      this.$editor.addClass ( this.options.classes.preview );

      this.$triggerPreview.addClass ( this.options.classes.trigger.active );

      this._trigger ( 'preview' );

    }

    unpreview () {

      if ( !this._isPreview ) return;

      this._isPreview = false;

      this.$editor.removeClass ( this.options.classes.preview );

      this.$triggerPreview.removeClass ( this.options.classes.trigger.active );

      this._trigger ( 'unpreview' );

    }

    /* FULLSCREEN */

    isFullscreen () {

      return this._isFullscreen;

    }

    toggleFullscreen ( force = !this._isFullscreen ) {

      if ( !!force !== this._isFullscreen ) {

        this[force ? 'fullscreen' : 'unfullscreen']();

      }

    }

    fullscreen () {

      if ( this._isFullscreen ) return;

      this._isFullscreen = true;

      this.$layout.disableScroll ();
      this.$fullscreenable.addClass ( this.options.classes.fullscreenable.request );
      this.$editor.addClass ( this.options.classes.fullscreen );

      this.$triggerFullscreen.addClass ( this.options.classes.trigger.active );

      this._trigger ( 'fullscreen' );

    }

    unfullscreen () {

      if ( !this._isFullscreen ) return;

      this._isFullscreen = false;

      this.$layout.enableScroll ();
      this.$fullscreenable.removeClass ( this.options.classes.fullscreenable.request );
      this.$editor.removeClass ( this.options.classes.fullscreen );

      this.$triggerFullscreen.removeClass ( this.options.classes.trigger.active );

      this._trigger ( 'unfullscreen' );

    }

  }

  /* FACTORY */

  Factory.make ( Editor, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Emoji, Svelto.Emojify, Svelto.Widgets.EmojipickerPopover, Svelto.Widgets.EmojipickerPopoverTrigger, Svelto.Markdown ));


/* =========================================================================
 * Svelto - Widgets - Chat - Message - Editable
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before lib/emojify/emojify.js
 * @before widgets/editor/editor.js
 * @require core/widget/widget.js
 * @require widgets/remote/loader/loader.js
 * ========================================================================= */

//FIXME: If the editor gets empty, and it's supposed to be required, we output an error message that messes up the chat message layout
//TODO: Add a demo for it

(function ( $, _, Svelto, Widgets, Factory, Emojify ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'chatMessageEditable',
    plugin: true,
    selector: '.chat-message.editable',
    options: {
      classes: {
        editing: 'editing'
      },
      selectors: {
        message: '.chat-message-content > *:only-child, .chat-message-content > .card-header:first-child + .card-block',
        blocks: {
          hide: '.editable-hide',
          show: '.editable-show'
        }
      },
      callbacks: {
        edit: _.noop,
        unedit: _.noop
      }
    }
  };

  /* CHAT MESSAGE EDITABLE */

  class ChatMessageEditable extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$editable = this.$element;
      this.$message = this.$editable.find ( this.options.selectors.message ).first ();

      this._isEditing = this.$editable.hasClass ( this.options.classes.editing );

    }

    _events () {

      this.___submit ();

    }

    /* SUBMIT */

    ___submit () {

      this._on ( true, 'submit formajax:success', this.__submit );

    }

    async __submit () {

      const content = this.$editable.find ( 'textarea' ).first ().val (),
            rendered = Widgets.Editor ? await Widgets.Editor.config.options.parser ( content ) : content;

      this.$message.html ( rendered );

      if ( Emojify ) this.$message.emojify ();

      this.unedit ();

    }

    /* HELPERS */

    _update () {

      let {hide, show} = this.options.selectors.blocks,
          blocks = this._isEditing ? show : hide;

      this.$editable.toggleClass ( this.options.classes.editing, this._isEditing )
                    .find ( blocks )
                    .filter ( ( i, ele ) => $.widget.is ( ele, Widgets.RemoteLoader ) )
                    .remoteLoader ( 'request' );

    }

    /* API */

    isEditing () {

      return this._isEditing;

    }

    toggle ( force = !this._isEditing ) {

      if ( !!force !== this._isEditing ) {

        this._isEditing = !!force;

        this._update ();

        this._trigger ( this._isEditing ? 'edit' : 'unedit' );

      }

    }

    edit () {

      this.toggle ( true );

    }

    unedit () {

      this.toggle ( false );

    }

  }

  /* FACTORY */

  Factory.make ( ChatMessageEditable, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Emojify ));


/* =========================================================================
 * Svelto - Widgets - Switch
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/colors/colors.js
 * @require lib/transform/transform.js
 * @require widgets/draggable/draggable.js
 * ========================================================================= */

//TODO: Add flick support

(function ( $, _, Svelto, Widgets, Factory, Colors ) {

  'use strict';

  /* CONFIG */

  let config = {
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

  class Switch extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$switch = this.$element;
      this.$input = this.$switch.find ( this.options.selectors.input );
      this.$bar = this.$switch.find ( this.options.selectors.bar );
      this.$handler = this.$switch.find ( this.options.selectors.handler );

      this.isChecked = this.$input.prop ( 'checked' );

      this.switchWidth = this.$switch.width ();
      this.handlerWidth = this.$handler.width ();

    }

    _init () {

      /* OPTIONS */

      this.options.colors.on = this.$switch.data ( this.options.datas.colors.on ) || this.options.colors.on;
      this.options.colors.off = this.$switch.data ( this.options.datas.colors.off ) || this.options.colors.off;

      /* INITIAL SETTING */

      this._updateColors ();
      this._updatePosition ();

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

      this._onHover ( [$.$document, 'keydown', this.__keydown] );

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

        let isChecked = ( data.dragXY.x + ( this.handlerWidth / 2 ) ) >= ( this.switchWidth / 2 );

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

  Factory.make ( Switch, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Colors ));


/* =========================================================================
 * Svelto - Widgets - Table - Sortable
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

//TODO: Better performance with tableHelper, just put the new addded row in the right position, performance boost

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tableSortable',
    plugin: true,
    selector: 'table.sortable:not(.datatable)',
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

  /* TABLE SORTABLE */

  class TableSortable extends Widgets.Widget {

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

      let $initial = this.$headers.filter ( `.${this.options.classes.sort.asc}, .${this.options.classes.sort.desc}` ).first ();

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

  Factory.make ( TableSortable, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Widgets - Table Helper
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tableHelper',
    plugin: true,
    selector: 'table.table',
    templates: {
      row: '<tr <%= o.id ? "class=" + o.id : "" %> >' +
             '<% for ( var i = 0, l = o.datas.length; i < l; i++ ) { %>' +
               '<td>' +
                 '<%= o.datas[i] %>' +
               '</td>' +
             '<% } %>' +
             '<% for ( var i = 0, l = o.missing; i < l; i++ ) { %>' +
               '<td></td>' +
             '<% } %>' +
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

    /* PRIVATE */

    _getRowId ( id ) {

      return this.options.rowIdPrefix + '-' + this.guid + '-' + id;

    }

    /* API */

    add ( id, ...datas ) {

      let rowId = id ? this._getRowId ( id ) : false;

      if ( datas.length ) {

        if ( rowId && $( '.' + rowId ).length === 1 ) return;

        let chunks = _.chunk ( datas, this.columnsNr ),
            $rows = $();

        for ( let chunk of chunks ) {

          let rowHtml = this._template ( 'row', { id: rowId, datas: chunk, missing: this.columnsNr - chunk.length } );

          $rows = $rows.add ( rowHtml );

        }

        this.$body.append ( $rows );

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

        this._trigger ( 'change' );

        this._trigger ( 'clear', {
          $rows: $rows
        });

      }

    }

  }

  /* FACTORY */

  Factory.make ( TableHelper, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Tabs
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require lib/directions/directions.js
 * @require widgets/autofocusable/autofocusable.js
 * ========================================================================= */

//TODO: Add again the super cool moving indicator
//TODO: Not well written, make it better
//TODO: Doesn't handle properly a change of the direction

(function ( $, _, Svelto, Widgets, Factory, Pointer, Directions ) {

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

  class Tabs extends Widgets.Autofocusable {

    /* SPECIAL */

    _variables () {

      this.$tabs = this.$element;
      this.$triggers = this.$tabs.find ( this.options.selectors.triggers );
      this.$containers = this.$tabs.find ( this.options.selectors.containers );

      this.options.direction = Directions.get ().find ( direction => this.$tabs.hasClass ( direction ) ) || this.options.direction;

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

      event.stopImmediatePropagation ();

      let index = this.$triggers.index ( $(event.currentTarget) );

      this.set ( index );

    }

    /* SELECTION */

    _toggleSelection ( index, force ) {

      let $trigger = this.$triggers.eq ( index ),
          $container = this.$containers.eq ( index );

      $trigger.toggleClass ( this.options.classes.active.trigger, force );
      $container.toggleClass ( this.options.classes.active.container, force );

      if ( !force ) {

        this.autoblur ( $container );

      } else {

        $container.widgetize ();

        this.autofocus ( $container );

      }

      if ( this.options.highlight ) {

        let oppositeDirection = Directions.getOpposite ( this.options.direction );

        $trigger.toggleClass ( `highlighted highlight-${oppositeDirection}`, force );

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

  Factory.make ( Tabs, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Directions ));


/* =========================================================================
 * Svelto - Widgets - Tagbox
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/keyboard/keyboard.js
 * @require widgets/icon/icon.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

//FIXME: Auto focus on the partial input doesn't work good on mobile, the keyboard keeps opening and closing

(function ( $, _, Svelto, Widgets, Factory, Colors, Icon, Sizes, Pointer, Keyboard ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tagbox',
    plugin: true,
    selector: '.tagbox',
    templates: {
      tag: '<div class="label tagbox-tag <%= o.color %> <%= o.size %> <%= o.css %>" data-tag-value="<%= o.value %>">' +
             '<span>' +
               '<%= o.value %>' +
             '</span>' +
             `<i class="icon ${Sizes.xsmall} actionable tagbox-tag-remover">${Icon ( 'close' )}</i>` +
           '</div>'
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
      this.partial = this.$partial[0];

    }

    _init ( suppressTriggers ) {

      /* REMOVE PREVIOUS */

      this.$tagbox.find ( this.options.selectors.tag ).remove ();

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

      return this._template ( 'tag', _.extend ( { value: value }, this.options.tag ) );

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

          $.toast ( _.format ( this.options.messages.tooShort, value, this.options.tag.minLength ) );

        }

      } else if ( _.includes ( this.options.tags, value ) ) {

        $.toast ( _.format ( this.options.messages.duplicate, value ) );

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

      this._on ( this.$partial, 'blur', this.___blur );

    }

    /* KEYPRESS / KEYDOWN */

    __keypressKeydown ( event ) {

      let value = this.$partial.val ();

      if ( _.includes ( this.options.characters.inserters, event.keyCode ) || event.keyCode === this.options.characters.separator.charCodeAt ( 0 ) ) {

        let added = this.add ( value );

        if ( added ) {

          this._clearPartial ();

        }

        event.preventDefault ();
        event.stopImmediatePropagation ();

      } else if ( event.keyCode === Keyboard.keys.BACKSPACE ) {

        if ( !value.length && this.options.tags.length ) {

          let $tag = this.$tagbox.find ( this.options.selectors.tag ).last (),
              edit = !Keyboard.keystroke.hasCtrlOrCmd ( event );

          this.remove ( $tag, edit );

          event.preventDefault ();
          event.stopImmediatePropagation ();

        }

      } else if ( this.options.characters.forbid && _.includes ( this.options.characters.forbidden, String.fromCharCode ( event.keyCode ) ) ) {

        $.toast ( this.options.messages.forbidden );

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

    /* BLUR */

    ___blur ( event ) {

      let value = this.$partial.val ();

      if ( !value ) return;

      let added = this.add ( value );

      if ( added ) this._clearPartial ();

    }

    /* TAP ON TAG REMOVER */

    ___tapOnTagRemover () {

      this._on ( Pointer.tap, this.options.selectors.tagRemover, this.__tapOnTagRemover );

    }

    __tapOnTagRemover ( event ) {

      event.stopImmediatePropagation ();

      let $tag = $(event.currentTarget).closest ( this.options.selectors.tag );

      this.remove ( $tag );

    }

    /* TAP ON EMPTY */

    ___tapOnEmpty () {

      this._on ( Pointer.tap, this.__tapOnEmpty );

    }

    __tapOnEmpty ( event ) {

      if ( !$.isFocused ( this.partial ) && !$(event.target).is ( this.options.selectors.partial + ',' + this.options.selectors.tagLabel ) ) { //TODO: Add an helper for checking if is focused

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
          adds = _.map ( tags, this._add.bind ( this ) );

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

  Factory.make ( Tagbox, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Colors, Svelto.Icon, Svelto.Sizes, Svelto.Pointer, Svelto.Keyboard ));


/* =========================================================================
 * Svelto - Widgets - Targeter
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'targeter',
    options: {
      widget: false, // The target's widget class
      target: false, // Selector used to select the target
      $fallback: false, // Fallback jQuery element
      datas: {
        target: 'target'
      }
    }
  };

  /* TARGETER */

  class Targeter extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this._targetSelector = this.options.target || ( this.options.widget ? this.$element.data ( `${this.options.widget.config.name.toLowerCase ()}-${this.options.datas.target}` ) : false ) || this.$element.data ( this.options.datas.target );

      this.$target = this._targetSelector
                       ? $(this._targetSelector)
                       : this.options.widget
                         ? this.$element.closest ( this.options.widget.config.selector )
                         : this.options.$fallback;

      if ( !this.$target.length ) return false;

      this.target = this.$target[0];

      if ( this.options.widget ) this._targetInstance = this.$target[this.options.widget.config.name]( 'instance' );

    }

    _events () {

      this.___targetRemove ();

    }

    /* TARGET REMOVE */

    ___targetRemove () {

      this._on ( true, this.$target, 'remove', this.__targetRemove );

    }

    __targetRemove () {

      this.__remove ();

    }

  }

  /* FACTORY */

  Factory.make ( Targeter, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Actions
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before widgets/remote/action/action_helper.js
 * @before widgets/remote/modal/modal_helper.js
 * @before widgets/remote/panel/panel_helper.js
 * @before widgets/remote/popover/popover_helper.js
 * @require widgets/targeter/targeter.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

//FIXME: Shouldn't extend `Targeter`, but `SelectableActions` needs that

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'actions',
    plugin: true,
    selector: '.actions',
    options: {
      $fallback: $.$html, //FIXME: Ugly, but needed in order to extend from `Targeter`
      ajax: {}, // Default values
      actions: {
        action: $.remoteAction,
        modal: $.remoteModal,
        panel: $.remotePanel,
        popover: $.remotePopover,
        page ( ajax ) {
          window.location.href = ajax.url;
        }
      },
      defaultAction: 'page',
      actionsArgs: {
        ajax ( $trigger ) {
          return this._getAjax ( $trigger );
        },
        panel ( $trigger ) {
          return [this._getAjax ( $trigger ), $trigger.data ( Widgets.Panel.config.options.datas.direction ), $trigger.data ( Widgets.Panel.config.options.datas.type )];
        },
        popover ( $trigger ) {
          return [this._getAjax ( $trigger ), $trigger];
        }
      },
      defaultActionArgs: 'ajax',
      characters: {
        separator: ','
      },
      attributes: {
        href: 'href' // In order to better support `a` elements (the data value has higher priority)
      },
      datas: {
        type: 'type',
        url: 'url',
        body: 'body',
        method: 'method'
      },
      selectors: {
        action: '.action'
      },
      callbacks: {
        action: _.noop
      }
    }
  };

  /* ACTIONS */

  class Actions extends Widgets.Targeter {

    /* SPECIAL */

    _variables () {

      super._variables ();

      this.$actions = this.$element.find ( this.options.selectors.action );

    }

    _events () {

      super._events ();

      this.___action ();

    }

    /* UTILITIES */

    _getAjax ( $trigger ) {

      let url = $trigger.data ( this.options.datas.url ) || $trigger.attr ( this.options.attributes.href ) || this.options.ajax.url,
          body = $trigger.data ( this.options.datas.body ) || this.options.ajax.body || {},
          method = $trigger.data ( this.options.datas.method ) || this.options.ajax.method;

      return _.extend ( {}, this.options.ajax, { url, body, method } );

    }

    _getArgs ( type, $trigger ) {

      let fn = this.options.actionsArgs[type] || this.options.actionsArgs[this.options.defaultActionArgs];

      if ( !fn ) return;

      let args = fn.call ( this, $trigger );

      return args ? _.castArray ( args ) : false;

    }

    /* ACTION */

    ___action () {

      this._on ( this.$actions, Pointer.tap, this.__action );

    }

    __action ( event ) {

      let $trigger = $(event.target),
          type = $trigger.data ( this.options.datas.type ) || this.options.defaultAction,
          action = this.options.actions[type];

      if ( !action ) return;

      let args = this._getArgs ( type, $trigger );

      if ( !args ) return;

      action ( ...args );

      this._trigger ( 'action', { type, args } );

    }

  }

  /* FACTORY */

  Factory.make ( Actions, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Widgets - Datatables - Pager
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../datatables.js
 * @require widgets/targeter/targeter.js
 * ========================================================================= */

//FIXME: Doesn't work with custom sorting

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'datatablesPager',
    plugin: true,
    selector: '.datatables-pager',
    options: {
      widget: Widgets.Dt,
      page: NaN, // The page to go to (higher priority than row number)
      row: NaN, // The row number to go to
      datas: {
        page: 'page',
        row: 'row'
      }
    }
  };

  /* DATATABLES PAGER */

  class DatatablesPager extends Widgets.Targeter {

    /* SPECIAL */

    _init () {

      let page = this.$element.data ( this.options.datas.page ),
          row = this.$element.data ( this.options.datas.row );

      this.options.page = _.isString ( page ) ? page : ( _.isNaN ( Number ( page ) ) ? this.options.page : Number ( page ) );
      this.options.row = _.isNaN ( Number ( row ) ) ? this.options.row : Number ( row );

    }

    _events () {

      super._events ();

      this.___tap ();

    }

    /* TAP */

    ___tap () {

      this._on ( Pointer.tap, this.__tap );

    }

    __tap () {

      this.go ();

    }

    /* API */

    go ( page = this.options.page, row = this.options.row ) {

      this._targetInstance.page ( page, row );

    }

  }

  /* FACTORY */

  Factory.make ( DatatablesPager, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Widgets - Selectable - Actions
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require widgets/actions/actions.js
 * @require ../selectable.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'selectableActions',
    plugin: true,
    selector: '.selectable-actions',
    options: {
      widget: Widgets.Selectable,
      placeholders: {
        id: '%ID%'
      },
      datas: {
        id: 'id'
      },
      selectors: {
        id: false // Selects the element containing the id (from its `tr` element), for instance it could be `> td:first-child`. If falsy, `datas.id` will be used
      }
    }
  };

  /* SELECTABLE ACTIONS */

  class SelectableActions extends Widgets.Actions {

    /* UTILITIES */

    _getIds () {

      let $rows = this._targetInstance.get (),
          ids = $rows.get ().map ( row => this.options.selectors.id ? $(row).find ( this.options.selectors.id ).text () : $(row).data ( this.options.datas.id ) );

      return _.compact ( ids );

    }

    _getAjax ( $trigger ) {

      let ajax = super._getAjax ( $trigger ),
          ids = this._getIds ();

      ajax.url = ajax.url.replace ( this.options.placeholders.id, ids.join ( this.options.characters.separator ) );
      ajax.data = _.extend ( ajax.data, {ids} );

      return ajax;

    }

  }

  /* FACTORY */

  Factory.make ( SelectableActions, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Widgets - Selectable - Actions - Container
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before widgets/datatables/datatables.js
 * @require ../actions.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'selectableActionsContainer',
    plugin: true,
    selector: '.selectable-actions:not(.popover)',
    options: {
      widget: Widgets.Selectable,
      classes: {
        datatable: 'datatable',
        open: 'open'
      },
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    }
  };

  /* SELECTABLE ACTIONS CONTAINER */

  class SelectableActionsContainer extends Widgets.Targeter {

    /* SPECIAL */

    _variables () {

      super._variables ();

      this.$container = this.$element;

      this._isOpen = this.$container.hasClass ( this.options.classes.open );
      this._isDataTable = this.$target.hasClass ( this.options.classes.datatable );

    }

    _init () {

      super._init ();

      this.___datatable ();
      this.__update ();

    }

    _events () {

      super._events ();

      this.___update ();

    }

    /* DATATABLE */

    ___datatable () {

      if ( !this._isDataTable ) return;

      this.$container.removeClass ( 'bordered limited centered' );
      this.$target.closest ( '.card-block' ).before ( this.$container );

    }

    /* UPDATE */

    ___update () {

      this._on ( true, this.$target, 'selectable:change', this.__update );

    }

    __update () {

      this.toggle ( !!this._targetInstance.get ().length );

    }

    /* API */

    isOpen () {

      return this._isOpen;

    }

    toggle ( force = !this._isOpen ) {

      if ( !!force !== this._isOpen ) {

        this._isOpen = !!force;

        this.$container.toggleClass ( this.options.classes.open, this._isOpen );

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

  Factory.make ( SelectableActionsContainer, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Selectable - Actions - Popover
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../actions.js
 * @require widgets/popover/popover.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'selectableActionsPopover',
    plugin: true,
    selector: '.selectable-actions.popover',
    options: {
      widget: Widgets.Selectable
    }
  };

  /* SELECTABLE ACTIONS POPOVER */

  class SelectableActionsPopover extends Widgets.Targeter {

    /* SPECIAL */

    _variables () {

      super._variables ();

      this.$popover = this.$element;

      this._popoverInstance = this.$popover.popover ( 'instance' );

    }

    _init () {

      super._init ();

      this._popoverInstance.option ( 'positionate.alignment.x', 'left' );
      this._popoverInstance.option ( 'positionate.constrainer.$element', $.$window );

    }

    _events () {

      super._events ();

      this.___context ();
      this.___action ();

    }

    /* CONTEXT */

    ___context () {

      this._on ( true, this.$target, 'contextmenu', this.__context );

    }

    __context ( event ) {

      event.preventDefault ();
      event.stopImmediatePropagation ();

      this._contextEvent = event;

      this._one ( true, $.$document, Pointer.up, this._toggle ); // Selectable listens on this event, also `contextmenu` gets fired before, so we wouldn't get the updated list of selected elements

    }

    /* ACTION */

    ___action () {

      this._on ( true, 'selectableactions:action', this._close );

    }

    /* PRIVATE API */

    _toggle () {

      this[this._targetInstance.get ().length ? '_open' : '_close']();

    }

    _open () {

      let point = $.eventXY ( this._contextEvent );

      this._popoverInstance.option ( 'positionate.point', point );
      this._popoverInstance.open ();

    }

    _close () {

      this._popoverInstance.close ();

    }

  }

  /* FACTORY */

  Factory.make ( SelectableActionsPopover, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Widgets - Targeter - Closer
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../targeter.js
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

      super._events ();

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

      this._targetInstance.whenUnlocked ( () => this._targetInstance[this.options.methods.close]( this.element, event ) );

    }

  }

  /* FACTORY */

  Factory.make ( Closer, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Widgets - Chat - Message - Replyable - Targeters - Unreply
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../replyable.js
 * @require widgets/targeter/closer/closer.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'chatMessageReplyableUnreply',
    plugin: true,
    selector: '.chat-message-replyable-unreply',
    options: {
      widget: Widgets.ChatMessageReplyable,
      methods: {
        close: 'unreply'
      }
    }
  };

  /* CHAT MESSAGE REPLYABLE UNREPLY */

  class ChatMessageReplyableUnreply extends Widgets.Closer {}

  /* FACTORY */

  Factory.make ( ChatMessageReplyableUnreply, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Expander - Targeters - Closer
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../expander.js
 * @require widgets/targeter/closer/closer.js
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

  Factory.make ( ExpanderCloser, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Fullscreenable - Targeters - Exiter
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../fullscreenable.js
 * @require widgets/targeter/closer/closer.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'fullscreenableExiter',
    plugin: true,
    selector: '.fullscreenable-exiter, .fullscreen-exiter',
    options: {
      widget: Widgets.Fullscreenable,
      $fallback: $.$html,
      methods: {
        isOpen: 'isFullscreen',
        close: 'exit'
      }
    }
  };

  /* FULLSCREENABLE EXITER */

  class FullscreenableExiter extends Widgets.Closer {}

  /* FACTORY */

  Factory.make ( FullscreenableExiter, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Infobar - Targeters - Closer
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../infobar.js
 * @require widgets/targeter/closer/closer.js
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

  Factory.make ( InfobarCloser, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Modal - Targeters - Closer
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../modal.js
 * @require widgets/targeter/closer/closer.js
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

  Factory.make ( ModalCloser, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Overlay - Targeters - Closer
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../overlay.js
 * @require widgets/targeter/closer/closer.js
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

  Factory.make ( OverlayCloser, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Panel - Targeters - Closer
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../panel.js
 * @require widgets/targeter/closer/closer.js
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

  Factory.make ( PanelCloser, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Popover - Targeters - Closer
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../popover.js
 * @require widgets/targeter/closer/closer.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'popoverCloser',
    plugin: true,
    selector: '.popover-closer',
    options: {
      widget: Widgets.Popover
    }
  };

  /* POPOVER CLOSER */

  class PopoverCloser extends Widgets.Closer {}

  /* FACTORY */

  Factory.make ( PopoverCloser, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Targeter - Opener
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../closer/closer.js
 * @require core/browser/browser.js
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

      super._events ();

      this.___hover ();

    }

    /* TAP */

    __tap ( event ) {

      this.open ( event );

    }

    /* HOVER */

    ___hover () {

      if ( this.options.hover.active ) {

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

      this._targetInstance.whenUnlocked ( () => this._targetInstance[this.options.methods.open]( this.element, event ) );

    }

  }

  /* FACTORY */

  Factory.make ( Opener, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Browser, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Widgets - Chat - Message - Replyable - Targeters - Reply
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../replyable.js
 * @require widgets/targeter/opener/opener.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'chatMessageReplyableReply',
    plugin: true,
    selector: '.chat-message-replyable-reply',
    options: {
      widget: Widgets.ChatMessageReplyable,
      methods: {
        open: 'reply'
      }
    }
  };

  /* CHAT MESSAGE REPLYABLE REPLY */

  class ChatMessageReplyableReply extends Widgets.Opener {}

  /* FACTORY */

  Factory.make ( ChatMessageReplyableReply, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Expander - Targeters - Opener
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../expander.js
 * @require widgets/targeter/opener/opener.js
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

  Factory.make ( ExpanderOpener, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Fullscreenable - Targeters - Requester
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../fullscreenable.js
 * @require widgets/targeter/opener/opener.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'fullscreenableRequester',
    plugin: true,
    selector: '.fullscreenable-requester, .fullscreen-requester',
    options: {
      widget: Widgets.Fullscreenable,
      $fallback: $.$html,
      methods: {
        open: 'request'
      }
    }
  };

  /* FULLSCREENABLE REQUESTER */

  class FullscreenableRequester extends Widgets.Opener {}

  /* FACTORY */

  Factory.make ( FullscreenableRequester, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Modal - Targeters - Opener
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../modal.js
 * @require widgets/targeter/opener/opener.js
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

  Factory.make ( ModalOpener, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Overlay - Targeters - Opener
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../overlay.js
 * @require widgets/targeter/opener/opener.js
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

  Factory.make ( OverlayOpener, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Panel - Targeters - Opener
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../panel.js
 * @require widgets/targeter/opener/opener.js
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

  Factory.make ( PanelOpener, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Popover - Targeters - Opener
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../popover.js
 * @require widgets/targeter/opener/opener.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'popoverOpener',
    plugin: true,
    selector: '.popover-opener',
    options: {
      widget: Widgets.Popover
    }
  };

  /* POPOVER OPENER */

  class PopoverOpener extends Widgets.Opener {}

  /* FACTORY */

  Factory.make ( PopoverOpener, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Scroller
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/animations/animations.js
 * @require core/pointer/pointer.js
 * @require widgets/targeter/opener/opener.js
 * ========================================================================= */

//TODO: Test with nested layouts
//TODO: Make it work with nested scrollable elements
// It only scrolls properly when the elements are not nested inside scrollable wrappers

(function ( $, _, Svelto, Widgets, Factory, Pointer, Animations ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'scroller',
    plugin: true,
    selector: '.scroller',
    options: {
      animations: {
        scroll: Animations.fast
      },
      callbacks: {
        scroll: _.noop
      }
    }
  };

  /* SCROLLER */

  class Scroller extends Widgets.Targeter {

    /* SPECIAL */

    _events () {

      super._events ();

      this.___tap ();

    }

    /* TAP */

    ___tap () {

      this._on ( Pointer.tap, this.__tap );

    }

    __tap ( event ) {

      this.scroll ();

    }

    /* API */

    scroll () {

      $.scrollTo ( this.target, { duration: this.options.animations.scroll } );

      this._trigger ( 'scroll' );

    }

  }

  /* FACTORY */

  Factory.make ( Scroller, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Animations ));


/* =========================================================================
 * Svelto - Widgets - Targeter - Toggler
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../opener/opener.js
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

  Factory.make ( Toggler, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Chat - Message - Editable - Targeters - Toggler
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../editable.js
 * @require widgets/targeter/toggler/toggler.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'chatMessageEditableToggler',
    plugin: true,
    selector: '.chat-message-editable-toggler',
    options: {
      widget: Widgets.ChatMessageEditable
    }
  };

  /* CHAT MESSAGE EDITABLE TOGGLER */

  class ChatMessageEditableToggler extends Widgets.Toggler {}

  /* FACTORY */

  Factory.make ( ChatMessageEditableToggler, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Expander - Targeters - Toggler
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../expander.js
 * @require widgets/targeter/toggler/toggler.js
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

  Factory.make ( ExpanderToggler, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Flippable - Targeters - Flipper
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../flippable.js
 * @require widgets/targeter/toggler/toggler.js
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

  Factory.make ( FlippableFlipper, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Fullscreenable - Targeters - Toggler
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../fullscreenable.js
 * @require widgets/targeter/toggler/toggler.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'fullscreenableToggler',
    plugin: true,
    selector: '.fullscreenable-toggler, .fullscreen-toggler',
    options: {
      widget: Widgets.Fullscreenable,
      $fallback: $.$html
    }
  };

  /* FULLSCREENABLE TOGGLER */

  class FullscreenableToggler extends Widgets.Toggler {}

  /* FACTORY */

  Factory.make ( FullscreenableToggler, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Modal - Targeters - Toggler
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../modal.js
 * @require widgets/targeter/toggler/toggler.js
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

  Factory.make ( ModalToggler, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Overlay - Targeters - Toggler
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../overlay.js
 * @require widgets/targeter/toggler/toggler.js
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

  Factory.make ( OverlayToggler, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));


/* =========================================================================
 * Svelto - Widgets - Panel - Targeters - Toggler
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../panel.js
 * @require widgets/targeter/toggler/toggler.js
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

  Factory.make ( PanelToggler, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Popover - Targeters - Toggler
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../popover.js
 * @require widgets/targeter/toggler/toggler.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'popoverToggler',
    plugin: true,
    selector: '.popover-toggler',
    options: {
      widget: Widgets.Popover
    }
  };

  /* POPOVER TOGGLER */

  class PopoverToggler extends Widgets.Toggler {}

  /* FACTORY */

  Factory.make ( PopoverToggler, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Textarea - Autogrow
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

// It supports only `box-sizing: border-box` textareas

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
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

      this.$tempTextarea.css ( 'font', this.$textarea.css ( 'font' ) ).val ( this.$textarea.val () || ' ' ).appendTo ( this.$layout ); // Ensuring that there's at least a space character inside of it fixed a bug in IE/Edge where the textarea gets shrinked

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

  Factory.make ( AutogrowTextarea, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Textarea - Sender
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'textareaSender',
    plugin: true,
    selector: 'form textarea',
    options: {
      selectors: {
        form: 'form'
      },
      keystrokes: {
        'ctmd + enter': 'send'
      }
    }
  };

  /* TEXTAREA SENDER */

  class TextareaSender extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$textarea = this.$element;
      this.textarea = this.element;

      this.$form = this.$textarea.closest ( this.options.selectors.form );

    }

    _events () {

      this.___keydown ();

    }

    /* SEND */

    send () {

      if ( !$.isFocused ( this.textarea ) ) return null;

      this.$form.submit ();

    }

  }

  /* FACTORY */

  Factory.make ( TextareaSender, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Time Ago
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
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
      abort: { // Abort the loop if it has to wait more than `threshold`
        enabled: true, // Whether the abort functionality should be enabled (recommended, at least to avoid overflowing the delay https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout)
        threshold: 604800, // 1 week
      },
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

      if ( this.options.abort.enabled && seconds > this.options.abort.threshold ) return;

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

  Factory.make ( TimeAgo, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Timer ));


/* =========================================================================
 * Svelto - Widgets - Toast (Helper)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./toast.js
 * ========================================================================= */

(function ( $, _, Svelto, Toast ) {

  'use strict';

  /* HELPER */

  $.toast = function ( options = {} ) {

    /* OPTIONS */

    options = _.isPlainObject ( options ) ? options : { body: String ( options ) };

    /* TYPE */

    if ( options.buttons ) {

      options.type = 'action';

    }

    /* TOAST */

    return new Toast ( options );

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.Toast ));


/* =========================================================================
 * Svelto - Widgets - Tooltip
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require widgets/popover/popover.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tooltip',
    plugin: true,
    selector: '.tooltip'
  };

  /* TOOLTIP */

  class Tooltip extends Widgets.Popover {}

  /* FACTORY */

  Factory.make ( Tooltip, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Tooltip - Targeters - Closer
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../tooltip.js
 * @require widgets/targeter/closer/closer.js
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

  Factory.make ( TooltipCloser, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Tooltip - Targeters - Opener
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../tooltip.js
 * @require widgets/targeter/opener/opener.js
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

  Factory.make ( TooltipOpener, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Tooltip - Targeters - Toggler
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../tooltip.js
 * @require widgets/targeter/toggler/toggler.js
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

  Factory.make ( TooltipToggler, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Zoomable
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/animations/animations.js
 * @require core/browser/browser.js
 * @require core/widget/widget.js
 * @require lib/fetch/fetch.js
 * ========================================================================= */

//TODO: Generalize it for other kind of elements other than `img`

(function ( $, _, Svelto, Widgets, Factory, Browser, Pointer, Keyboard, Animations, fetch ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'zoomable',
    plugin: Browser.is.desktop,
    selector: 'img.zoomable',
    options: {
      offset: 50, // Size of the offset between the zoomed element and the viewport edges
      src: false, // Source of the image
      original: {
        src: false, // Original source of the image
        substitute: true, // Once load, permanently substitute the thumnail with it
        width: false,
        height: false
      },
      magnification: {
        enabled: false, // Zoom in magnified mode, where the image is enlarged
        limited: true, // Controls magnification over the zoomable actual dimensions
        offset: 50, // A spacing used in order not to trigger hot corners while reaching the edge of the zoomable
        minSide: Math.min ( screen.width, screen.height ) * 2, // Minimum length of each side
        maxSide: Math.min ( screen.width, screen.height ) * 3 // Maximum length of each side
      },
      preloading: {
        enabled: false, // Preload the original image
        wait: true // Don't zoom until the original has been preloaded
      },
      classes: {
        magnified: 'magnified',
        preload: 'preload',
        show: 'show',
        zoom: 'zoom',
        zoomed: 'zoomed',
        backdrop: {
          show: 'zoomable-backdrop obscured-show obscured',
          zoom: 'obscured-open',
          zoomed: ''
        }
      },
      attributes: {
        src: 'src'
      },
      datas: {
        original: 'original',
        width: 'width',
        height: 'height'
      },
      animations: {
        zoom: Animations.normal,
        unzoom: Animations.normal
      },
      keystrokes: {
        'esc': '__esc'
      },
      callbacks: {
        loading: _.noop,
        zoom: _.noop,
        unzoom: _.noop
      }
    }
  };

  /* ZOOMABLE */

  class Zoomable extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$zoomable = this.$element;
      this.zoomable = this.element;

      this.$backdrop = $.$html;

      this._isZoomed = false;

    }

    _init () {

      this.options.src = this.$zoomable.attr ( this.options.attributes.src ) || this.options.src;
      this.options.original.src = this.$zoomable.data ( this.options.datas.original ) || this.options.original.src;
      this.options.original.width = this.$zoomable.data ( this.options.datas.width ) || this.options.original.width;
      this.options.original.height = this.$zoomable.data ( this.options.datas.height ) || this.options.original.height;
      this.options.magnification.enabled = this.$zoomable.hasClass ( this.options.classes.magnified ) || this.options.magnification.enabled;
      this.options.preloading.enabled = this.$zoomable.hasClass ( this.options.classes.preload ) || this.options.preloading.enabled;

      if ( this.options.original.src && ( !_.isNumber ( this.options.original.width ) || !_.isNumber ( this.options.original.height ) ) ) {

        console.error ( "Zoomable: wrong 'data-width' and/or 'data-height', they are required when using 'data-original'" );

        return false;

      }

      if ( this.options.preloading.enabled && this.options.original.src ) this.preload ();

      if ( this.$zoomable.hasClass ( this.options.classes.zoom ) ) this.zoom ();

    }

    _events () {

      this.___tap ();

      if ( !this._isZoomed ) return;

      this.___tapOutside ();
      this.___keydown ();
      this.___scroll ();
      this.___resize ();

      if ( this.options.magnification.enabled ) this.___move ();

    }

    _destroy () {

      this.unzoom ();

    }

    /* TAP */

    ___tap () {

      this._on ( Pointer.tap, this.__tap );

    }

    __tap ( event ) {

      event.preventDefault ();
      event.stopImmediatePropagation ();

      if ( Keyboard.keystroke.match ( event.originalEvent, 'ctmd' ) ) {

        window.open ( this.options.original.src || this.options.src, '_new' );

      } else {

        this.toggle ( undefined, event );

      }

    }

    ___tapOutside () {

      this._on ( true, $.$html, Pointer.tap, this.__tapOutside );

    }

    __tapOutside ( event ) {

      if ( this.isLocked () || event.isDefaultPrevented () || event.isPropagationStopped () || !$.isAttached ( event.target ) || $(event.target).closest ( this.$zoomable ).length ) return;

      event.preventDefault ();
      event.stopImmediatePropagation ();

      this.unzoom ();

    }

    /* ESC */

    ___keydown () { //TODO: Listen to `keydown` only within the layout, so maybe just if the layout is hovered or focused (right?)

      this._on ( true, $.$document, 'keydown', this.__keydown );

    }

    __esc () {

      this.unzoom ();

    }

    /* SCROLL */

    ___scroll () {

      if ( this.options.magnification.enabled ) return;

      this._on ( true, $.$window.add ( this.$zoomable.parents () ), 'scroll', this._frames ( this.__scroll.bind ( this ) ) );

    }

    __scroll () {

      this.unzoom ();

    }

    /* RESIZE */

    ___resize () {

      this._on ( true, $.$window, 'resize', this._frames ( this.__resize.bind ( this ) ) );

    }

    __resize () {

      this._positionate ();

    }

    /* MOVE */

    ___move () {

      this._on ( true, $.$document, Pointer.move, this._frames ( this.__move.bind ( this ) ) );

    }

    __move ( event ) {

      if ( !this._matrix ) return; // Not yet positionated

      let {x, y} = $.eventXY ( event, 'clientX', 'clientY' ),
          zOffset = this.options.offset,
          mOffset = this.options.magnification.offset,
          width = this._minWidth * this._scale,
          height = this._minHeight * this._scale,
          xClamped = _.clamp ( x - mOffset, 0, this._viewportWidth - mOffset ),
          yClamped = _.clamp ( y - mOffset, 0, this._viewportHeight - mOffset ),
          xPercentage = _.clamp ( xClamped / ( this._viewportWidth - ( mOffset * 2 ) ), 0, 1 ),
          yPercentage = _.clamp ( yClamped / ( this._viewportHeight - ( mOffset * 2 ) ), 0, 1 ),
          xExceeding = Math.max ( 0, width - this._viewportWidth + ( zOffset * 2 ) ),
          yExceeding = Math.max ( 0, height - this._viewportHeight + ( zOffset * 2 ) );

      /* SETTING */

      this._matrix[4] = this._translateX + ( xExceeding / 2 ) - ( xExceeding * xPercentage );
      this._matrix[5] = this._translateY + ( yExceeding / 2 ) - ( yExceeding * yPercentage );

      this.$zoomable.matrix ( this._matrix );

    }

    /* POSITIONING */

    _positionate ( initial ) {

      /* VARIABLES */

      if ( initial ) {

        this._initialMatrix = this.$zoomable.matrix ();
        this._translateX = 0;
        this._translateY = 0;

        this._minWidth = this.zoomable.width || this.$zoomable.outerWidth (); //FIXME: It may change on resize
        this._minHeight = this.zoomable.height || this.$zoomable.outerHeight (); //FIXME: It may change on resize

        this._maxWidth = this.options.original.src ? this.options.original.width : ( this.zoomable.naturalWidth ? this.zoomable.naturalWidth : this._minWidth );
        this._maxHeight = this.options.original.src ? this.options.original.height : ( this.zoomable.naturalHeight ? this.zoomable.naturalHeight : this._minHeight );
        this._aspectRatio = this._maxWidth / this._maxHeight;
        this._maxScale = this._maxWidth / this._minWidth;

      }

      this._viewportRect = $.$window.getRect ();
      this._viewportWidth = this._viewportRect.width;
      this._viewportHeight = this._viewportRect.height;
      this._viewportAspectRatio = this._viewportWidth / this._viewportHeight;

      let rect = this.$zoomable.getRect ();

      /* SCALE */

      if ( this._maxWidth <= this._viewportWidth - this.options.offset && this._maxHeight <= this._viewportHeight - this.options.offset ) {

        this._scale = this._maxScale;

      } else if ( this._aspectRatio < this._viewportAspectRatio ) {

        this._scale = ( ( this._viewportHeight - this.options.offset ) / this._maxHeight ) * this._maxScale;

      } else {

        this._scale = ( ( this._viewportWidth - this.options.offset ) / this._maxWidth ) * this._maxScale;

      }

      if ( this.options.magnification.enabled ) {

        if ( this._maxWidth <= this._maxHeight ) {

          this._scale += this.options.magnification.minSide / ( this._minWidth * this._scale );

          if ( this._minHeight * this._scale > this.options.magnification.maxSide ) {

            this._scale = this.options.magnification.maxSide * this._maxScale / this._maxHeight;

          }

        } else {

          this._scale += this.options.magnification.minSide / ( this._minHeight * this._scale );

          if ( this._minWidth * this._scale > this.options.magnification.maxSide ) {

            this._scale = this.options.magnification.maxSide * this._maxScale / this._maxWidth;

          }

        }

        if ( this.options.magnification.limited ) {

          this._scale = Math.min ( this._maxScale, this._scale );

        }

      }

      /* CENTER */

      this._translateX = this._translateX + ( initial ? this._initialMatrix[4] : 0 ) + ( this._viewportWidth / 2 ) - ( rect.left + ( rect.width / 2 ) );
      this._translateY = this._translateY + ( initial ? this._initialMatrix[5] : 0 ) + ( this._viewportHeight / 2 ) - ( rect.top + ( rect.height / 2 ) );

      /* SETTING */

      this._matrix = [this._scale, this._initialMatrix[1], this._initialMatrix[2], this._scale, this._translateX, this._translateY];

      this.$zoomable.matrix ( this._matrix );

    }

    _unpositionate () {

      this.$zoomable.matrix ( this._initialMatrix );

    }

    /* REQUEST HANDLERS */

    __request () {

      let request = fetch.defaults.request ();

      request.addEventListener ( 'progress', event => {

        if ( !event.lengthComputable ) return;

        this._trigger ( 'loading', {
          loaded: event.loaded,
          total: event.total,
          percentage: event.loaded / event.total * 100
        });

      }, false );

      return request;

    }

    __error () {

      console.error ( `Zoomable: failed to preload "${this.options.original.src}"` );

    }

    __success ( callback ) {

      this._isPreloaded = true;

      if ( this.options.original.substitute ) {

        this.$zoomable.attr ( 'src', this.options.original.src );

      }

      if ( callback ) callback ();

    }

    __complete () {

      this._isPreloading = false;

    }

    /* API */

    isPreloading () {

      return !!this._isPreloading;

    }

    isPreloaded () {

      return !!this._isPreloaded;

    }

    preload ( callback ) {

      if ( this._isPreloading || this._isPreloaded ) return;

      this._isPreloading = true;

      fetch ({
        url: this.options.original.src,
        request: this.__request.bind ( this ),
        error: this.__error.bind ( this ),
        success: () => this.__success ( callback ),
        complete: this.__complete.bind ( this )
      });

    }

    isZoomed () {

      return this._isZoomed;

    }

    toggle ( force = !this._isZoomed, event ) {

      if ( !!force !== this._isZoomed ) {

        this[force ? 'zoom' : 'unzoom']( event );

      }

    }

    zoom ( event ) {

      if ( this.isLocked () || this._isZoomed ) return;

      if ( this.options.original.src && this.options.preloading.wait && !this._isPreloaded ) return this.preload ( () => this.zoom ( event ) );

      this.lock ();

      this._isZoomed = true;

      if ( this.options.magnification.enabled ) this.$layout.disableScroll ();

      this._frame ( function () {

        this.$zoomable.addClass ( this.options.classes.show );
        this.$backdrop.addClass ( this.options.classes.backdrop.show );

        this._frame ( function () {

          this.$zoomable.addClass ( this.options.classes.zoom );
          this.$backdrop.addClass ( this.options.classes.backdrop.zoom );

          this._positionate ( true );

          if ( this.options.magnification.enabled && event ) this.__move ( event );

          this._delay ( function () {

            this.$zoomable.addClass ( this.options.classes.zoomed );
            this.$backdrop.addClass ( this.options.classes.backdrop.zoomed );

            if ( this.options.original.src ) this.$zoomable.attr ( 'src', this.options.original.src );

            this.unlock ();

            this._trigger ( 'zoom' );

          }, this.options.animations.zoom );

        });

      });

      this._reset ();

      this.___tap ();
      this.___tapOutside ();
      this.___keydown ();
      this.___scroll ();
      this.___resize ();

      if ( this.options.magnification.enabled ) this.___move ();

    }

    unzoom () {

      if ( this.isLocked () || !this._isZoomed ) return;

      this._isZoomed = false;

      this.lock ();

      this._frame ( function () {

        this.$zoomable.removeClass ( this.options.classes.zoomed );
        this.$backdrop.removeClass ( this.options.classes.backdrop.zoomed );

        this._frame ( function () {

          this._unpositionate ();

          this.$zoomable.removeClass ( this.options.classes.zoom );
          this.$backdrop.removeClass ( this.options.classes.backdrop.zoom );

          this._delay ( function () {

            if ( this.options.original.src && !this.options.original.substitute ) this.$zoomable.attr ( 'src', this.options.src );

            this.$zoomable.removeClass ( this.options.classes.show );
            this.$backdrop.removeClass ( this.options.classes.backdrop.show );

            if ( this.options.magnification.enabled ) this.$layout.enableScroll ();

            this.unlock ();

            this._trigger ( 'unzoom' );

          }, this.options.animations.unzoom );

        });

      });

      this._reset ();

      this.___tap ();

    }

  }

  /* FACTORY */

  Factory.make ( Zoomable, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Browser, Svelto.Pointer, Svelto.Keyboard, Svelto.Animations, Svelto.fetch ));


/* =========================================================================
 * Svelto - Widgets - Zoomable - Targeters - Closer
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../zoomable.js
 * @require widgets/targeter/closer/closer.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'zoomableCloser',
    plugin: true,
    selector: '.zoomable-closer',
    options: {
      widget: Widgets.Zoomable
    }
  };

  /* ZOOMABLE CLOSER */

  class ZoomableCloser extends Widgets.Closer {}

  /* FACTORY */

  Factory.make ( ZoomableCloser, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Zoomable - Targeters - Opener
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../zoomable.js
 * @require widgets/targeter/opener/opener.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'zoomableOpener',
    plugin: true,
    selector: '.zoomable-opener',
    options: {
      widget: Widgets.Zoomable
    }
  };

  /* ZOOMABLE OPENER */

  class ZoomableOpener extends Widgets.Opener {}

  /* FACTORY */

  Factory.make ( ZoomableOpener, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));


/* =========================================================================
 * Svelto - Widgets - Zoomable - Targeters - Toggler
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../zoomable.js
 * @require widgets/targeter/toggler/toggler.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'zoomableToggler',
    plugin: true,
    selector: '.zoomable-toggler',
    options: {
      widget: Widgets.Zoomable
    }
  };

  /* ZOOMABLE TOGGLER */

  class ZoomableToggler extends Widgets.Toggler {}

  /* FACTORY */

  Factory.make ( ZoomableToggler, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));

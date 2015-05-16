
/* lQuery - A lightweight replacement for jQuery */

//FIXME: weird results for self selector benchmarks, if we use `$()` instance od `lQuery()` it's much slower, but the first one should be replaced with the second before executing anyway...
//       magari debugga quello che sta effettivamente eseguendo

//INFO: Forbidden use of nodes functions when we are also talking with the `window`, or it will throw an error instead of failing gracefully

;(function ( window, document, undefined ) {

    'use strict';

    /* PRIVATE VARIABLES */

    var html = document.documentElement,
        body,
        browser_matches_fn = ( html.matches || html.matchesSelector || html.webkitMatchesSelector || html.mozMatchesSelector || html.msMatchesSelector || html.oMatchesSelector ),
        computeStyle = getComputedStyle,
        propFix = { //INFO: Properties that are mapped to a different name
            'cellpadding': 'cellPadding',
            'cellspacing': 'cellSpacing',
            'class': 'className',
            'colspan': 'colSpan',
            'contenteditable': 'contentEditable',
            'for': 'htmlFor',
            'frameborder': 'frameBorder',
            'maxlength': 'maxLength',
            'readonly': 'readOnly',
            'rowspan': 'rowSpan',
            'tabindex': 'tabIndex',
            'usemap': 'useMap'
        },
        cssNumber = ['column-count', 'columns', 'font-weight', 'line-height','opacity', 'z-index', 'zoom']; //INFO: CSS properties that require a plain number

    /* PRIVATE UTILITES */

    var node_position_comparator = function ( node_1, node_2 ) {

        return 3 - ( node_1.compareDocumentPosition ( node_2 ) & 6 );

    };

    var is_simple_selector = function ( selector, start_index ) {

        var char_code;

        for ( var i = start_index || 0, l = selector.length; i < l; i++ ) {

            char_code = selector.charCodeAt ( i ); //INFO: Refers to ASCII table

            if ( char_code <= 122 ) // z
                if ( char_code >= 48 ) // 0
                    if ( char_code >= 97 ) continue; // a
                    else if ( char_code <= 90 ) // Z
                        if ( char_code <= 57 ) continue; // 9
                        else if ( char_code >= 65 ) continue; // A
                    else if ( char_code === 95 ) continue; // _
                else if ( char_code === 45 ) continue; // -

            return false;

        }

        return true;

    };

    var dom_selector = function ( selector, context ) {

        var found;

        return selector[0] === '.'
                   ? is_simple_selector ( selector, 1 )
                       ? lQuery.makeArray ( context.getElementsByClassName ( selector.slice ( 1 ) ) )
                       : lQuery.makeArray ( context.querySelectorAll ( selector ) )
                   : selector[0] === '#'
                       ? is_simple_selector ( selector, 1 )
                           ? ( found = context.getElementById ( selector.slice ( 1 ) ) )
                               ? [found]
                               : []
                           : lQuery.makeArray ( context.querySelectorAll ( selector ) )
                       : is_simple_selector ( selector )
                           ? lQuery.makeArray ( context.getElementsByTagName ( selector ) )
                           : lQuery.makeArray ( context.querySelectorAll ( selector ) );

    };

    var build_fragment = function ( str ) {

        var fragment =  document.createDocumentFragment (),
            temp_div = fragment.appendChild ( document.createElement ( 'div' ) );

        temp_div.innerHTML = str;

        return temp_div;

    };

    var maybe_add_px = function ( prop, value ) {

        return ( !_.isNaN ( value ) && cssNumber.indexOf ( prop ) === -1 ) ? value + 'px' : value;

    };

    var deserializeValue = function ( value ) {

        try {

            return value
                       ? value == "true"
                           ? true
                           : value == "false"
                               ? false
                               : value == "null"
                                   ? null
                                   : +value + "" == value
                                       ? +value
                                       : /^[\[\{]/.test ( value )
                                           ? JSON.parse ( value )
                                           : value
                       : value;

        } catch ( e ) {

            return value;

        }

    };

    /* lQuery SELECTORS */

    var lQuery = function ( selector, context /* isUnique */ ) { //INFO: `isUnique`: if the loopable object doesn't contain duplicate nodes

        if ( _.isFunction ( selector ) ) return lQuery.ready ( selector );

        return new lQuery.fn.init ( selector, context );

    };

    var lQuery_node = function ( node ) { //INFO: It actually also works with the `window` object, even if it's not a node

        return new lQuery.fn.init_node ( node );

    };

    var lQuery_arr = function ( arr, isUnique ) { //INFO: `isUnique`: if the loopable object doesn't contain duplicate nodes

        return new lQuery.fn.init_arr ( arr, isUnique );

    };

    /* lQuery UTILTIES */

    lQuery.guid = function ( element ) {

        return element.guid || ( element.guid = _.uniqueId () );

    };

    lQuery.Event = function ( type, props ) {

        if ( !_.isString ( type ) )  {

            props = type;
            type = props.type;

        }

        var event = document.createEvent ( lQuery.event.specialEvents[type] || 'Events' ),
            bubbles = true;

        if ( props ) {

            for ( var prop in props ) {

                if ( prop === 'bubbles' ) {

                    bubbles = !!props[prop];

                } else {

                    event[prop] = props[prop];

                }

            }

        }

        event.initEvent ( type, bubbles, true );

        return lQuery.event.compatible ( event );

    };

    lQuery.event = {

        /* UTILITIES VARIABLES */

        focusinSupported: 'onfocusin' in window,

        focus: {
            focus: 'focusin',
            blur: 'focusout'
        },

        hover: {
            mouseenter: 'mouseover',
            mouseleave: 'mouseout'
        },

        ignoreProperties: /^([A-Z]|returnValue$|layer[XY]$)/,

        specialEvents: {
            click: 'MouseEvents',
            mousedown: 'MouseEvents',
            mouseup: 'MouseEvents',
            mousemove: 'MouseEvents'
        },

        eventMethods: {
            preventDefault: 'isDefaultPrevented',
            stopImmediatePropagation: 'isImmediatePropagationStopped',
            stopPropagation: 'isPropagationStopped'
        },

        /* UTILITIES */

        parse: function ( event ) {

            var parts = ( '' + event ).split ( '.' );

            return {
                event: parts[0],
                namespace: parts.slice ( 1 ).sort ().join ( ' ' )
            };

        },

        matcherFor: function ( namespace ) {

            return new RegExp ( '(?:^| )' + namespace.replace ( ' ', ' .* ?' ) + '(?: |$)' );

        },

        eventCapture: function ( handler, captureSetting ) {

            return handler.delegator &&
                   ( !this.focusinSupported && ( handler.event in this.focus ) ) ||
                   !!captureSetting;

        },

        realEvent: function ( type ) {

            return this.hover[type] || ( this.focusinSupported && this.focus[type] ) || type;

        },

        createProxy: function ( event ) {

            var key,
                proxy = { originalEvent: event };

            for ( key in event ) {

                if ( !this.ignoreProperties.test ( key ) && !_.isUndefined ( event[key] ) ) {

                    proxy[key] = event[key];

                }

            }

            return this.compatible ( proxy, event );

        },

        compatible: function ( event, source ) {

            if ( source || !event.isDefaultPrevented ) {

                if ( _.isUndefined ( source ) ) {

                    source = event;

                }

                for ( var method in this.eventMethods ) {

                    var sourceMethod = source[method];

                    event[method] = function () {

                        this[lQuery.event.eventMethods[method]] = lQuery.true;

                        return sourceMethod && sourceMethod.apply ( source, arguments );

                    };

                    event[this.eventMethods[method]] = lQuery.false;

                }

                if ( !_.isUndefined ( source.defaultPrevented )
                         ? source.defaultPrevented
                         : 'returnValue' in source
                             ? source.returnValue === false
                             : source.getPreventDefault && source.getPreventDefault () ) {

                    event.isDefaultPrevented = lQuery.true;

                }

            }

            return event;

        },

        /* API VARIABLES */

        handlers: {},

        /* API */

        findHandlers: function ( element, event, fn, selector ) {

            event = this.parse ( event );

            if ( event.namespace ) {

                var matcher = this.matcherFor ( event.namespace );

            }

            return ( this.handlers[lQuery.guid ( element )] || [] ).filter ( function ( handler ) {

                return handler
                    && ( !event.event     || handler.event == event.event )
                    && ( !event.namespace || matcher.test (  handler.namespace ) )
                    && ( !fn              || lQuery.guid ( handler.callback ) === lQuery.guid ( fn ) )
                    && ( !selector        || handler.selector === selector );

            });

        },

        add: function ( element, event, fn, data, selector, delegator, capture ) {

            var id = lQuery.guid ( element ),
                set = ( this.handlers[id] || ( this.handlers[id] = [] ) );

            if ( event === 'ready' ) { //INFO: support for `ready` event on every node //FIXME: is it needed?

                lQuery.ready ( fn );

            }
            var handler = this.parse ( event );

            handler.callback = fn;
            handler.selector = selector;

            //FIXME: emulate mouseenter, mouseleave when hover

            handler.delegator = delegator;

            var callback = delegator || fn;

            handler.proxy = function ( e ) {

                e = lQuery.event.compatible ( e );

                if ( e.isImmediatePropagationStopped () ) return;

                e.data = data;

                var result = callback.apply ( element, _.isUndefined ( e._args )? [e] : [e].concat ( e._args ) );

                if ( result === false ) {

                    e.preventDefault ();
                    e.stopPropagation ();

                }

                return result;

            }

            handler.id = set.length;

            set.push ( handler );

            element.addEventListener ( this.realEvent ( handler.event ), handler.proxy, this.eventCapture ( handler, capture ) );

        },

        remove: function ( element, event, fn, selector, capture ) {

            var id = lQuery.guid ( element ),
                handlers = this.findHandlers ( element, event, fn, selector );

            for ( var hi = 0, hl = handlers.length; hi < hl; hi++ ) {

                delete this.handlers[id][handlers[hi].id];

                element.removeEventListener ( this.realEvent ( handlers[hi].event ), handlers[hi].proxy, this.eventCapture ( handlers[hi], capture ) );

            }

        }

    };

    lQuery.ready = function ( handler ) {

        if ( document.readyState === 'complete' ) handler (); //INFO: Just check for `complete`, not also `interactive` since it may be fired earlier
        else document.addEventListener ( 'DOMContentLoaded', handler );

    };

    lQuery.noop = _.noop;

    lQuery.true = function () {

        return true;

    };

    lQuery.false = function () {

        return false;

    };

    lQuery.makeArray = _.toArray; //TODO: use it

    lQuery.unique = function ( arr, is_sorted ) {

        var sorted = is_sorted ? arr : arr.sort ( node_position_comparator ),
            prev;

        for ( var i = sorted.length - 1; i >= 0; i-- ) {

            if ( sorted[i] === prev ) sorted.splice ( i, 1 );
            else prev = sorted[i];

        }

        return sorted;

    };

    lQuery.camelCase = function ( str ) {

        return str.replace ( /(^-+|-+$)/g, '' ).replace ( /-+(.)?/g, function ( match, chr ) {

            return chr.toUpperCase ();

        });

    };

    lQuery.data = function ( node, key, value ) {

        if ( _.isUndefined ( node.lQuery_data ) ) node.lQuery_data = {};

        if ( !_.isUndefined ( value ) ) {

            node.lQuery_data[key] = value;

        } else {

            return node.lQuery_data[key];

        }

    };

    lQuery.extend = _.extend; //INFO: It's always deep by default

    lQuery.reflow = function () {

        html.offsetHeight; //INFO: Requesting the `offsetHeight` property triggers a reflow. Necessary, so that the deferred callback will be executed in another cycle

    };

    lQuery.ajax = function ( options ) {

        /*
            options = {
                type: '', // GET - POST - HEAD - DELETE - OPTION
                url: '',
                data: {}, // the data to be sent
                json: true || false, // parse the output as JSON or not
                success: function () {}, // callback on success
                error: function () {}, // callback on error
                before: function () {}, // callback before sending the request
                after: function () {} // callback after sending the request
            }
        */

        var request = new XMLHttpRequest ();

        request.open ( options.type, options.url, true );

        request.setRequestHeader ( 'X-Requested-With', 'XMLHttpRequest' );

        request.onload = function () {

            if ( request.status >= 200 && request.status < 400 ) {

                if ( options.success ) {

                    options.success ( options.json ? JSON.parse ( request.responseText ) : request.responseText );

                }

            } else {

                if ( options.error ) {

                    options.error ( options.json ? JSON.parse ( request.responseText ) : request.responseText );

                }

            }

        };

        if ( options.error ) {

            request.onerror = function () {

                options.error ( options.json ? JSON.parse ( request.responseText ) : request.responseText );

            };

        }

        if ( options.before ) {

            options.before ();

        }

        request.send ( options.data );

        if ( options.after ) {

            options.after ();

        }

    };

    lQuery.parseHTML = function ( str ) {

        var parsed = ( /^<(\w+)\s*\/?>(?:<\/\1>|)$/ ).exec ( str );

        if ( parsed ) {

            return [ document.createElement ( parsed[1] ) ];

        }

        parsed = build_fragment ( str );

        return lQuery.makeArray ( parsed.childNodes );

    };

    lQuery.eventXY = function ( event ) {

        var coordinates = {
            X : 0,
            Y : 0
        };

        if ( _.isUndefined ( event.originalEvent ) ) { //FIXME: doesn't make sense

            event = event.originalEvent;

        }

        if ( _.isUndefined ( event.touches ) && _.isUndefined ( event.touches[0] ) ) {

            coordinates.X = event.touches[0].pageX;
            coordinates.Y = event.touches[0].pageY;

        } else if ( _.isUndefined ( event.changedTouches ) && _.isUndefined ( event.changedTouches[0] ) ) {

            coordinates.X = event.changedTouches[0].pageX;
            coordinates.Y = event.changedTouches[0].pageY;

        } else if ( _.isUndefined ( event.pageX ) ) {

            coordinates.X = event.pageX;
            coordinates.Y = event.pageY;

        }

        return coordinates;

    };

    /* jQuery NODE UTILIES */

    lQuery.matches = function ( node, selector, index ) {

        //TODO: Maybe add support for NodeList, HTMLCollection, Array and other lQuery instances

        return typeof selector === 'string'
                   ? browser_matches_fn
                       ? browser_matches_fn.call ( node, selector )
                       : ( dom_selector ( selector, node.parentNode ).indexOf ( node ) !== -1 )
                   : selector instanceof Function
                       ? selector.call ( node, index, node )
                       : selector instanceof lQuery
                           ? selector.nodes[0] === node
                           : selector === node;

    };

    lQuery.offset = function ( node ) {

        var rect = node.getBoundingClientRect ();

        return {
            top: rect.top + window.pageYOffset - html.clientTop,
            left: rect.left + window.pageXOffset - html.clientLeft,
            width: rect.width,
            height: rect.height
        };

    };

    /* jQuery METHODS */

    lQuery.fn = lQuery.prototype = {

        // INIT

        init: function ( selector, context /* isUnique */ ) { //INFO: `isUnique`: if the loopable object doesn't contain duplicate nodes

            this.nodes = typeof selector === 'string'
                             ? ( selector[0] === '<' && selector[selector.length - 1] === '>' && selector.length >= 3 )
                                 ? lQuery.parseHTML ( selector )
                                 : dom_selector ( selector, ( context ? ( context instanceof lQuery ? lQuery.nodes[0] || document : document ) : document ) )
                             : selector instanceof lQuery
                                 ? selector.nodes
                                 : ( selector instanceof Node || selector instanceof Window )
                                     ? [selector]
                                     : ( selector instanceof NodeList || selector instanceof HTMLCollection )
                                         ? context // isUnique
                                             ? lQuery.makeArray ( selector )
                                             : lQuery.unique ( lQuery.makeArray ( selector ) )
                                         : selector instanceof Array
                                             ? context // isUnique
                                                 ? selector
                                                 : lQuery.unique ( selector )
                                             : [];

            this.length = this.nodes.length;

            return this;

        },

        init_node: function ( node ) { //INFO: It actually also works with the `window` object (and everything else since there are no checks), even if it's not a node

            this.nodes = [node];

            this.length = 1;

            return this;

        },

        init_arr: function ( arr, isUnique ) { //INFO: `isUnique`: if the loopable object doesn't contain duplicate nodes

            this.nodes = isUnique ? arr : lQuery.unique ( arr );

            this.length = this.nodes.length;

            return this;

        },

        // ATTRIBUTES

        attr: function ( name, value ) {

            if ( _.isPlainObject ( name ) ) {

                for ( var prop in name ) this.attr ( prop, name[prop] );

                return this;

            } else {

                if ( !_.isUndefined( value ) ) {

                    for ( var i = 0, l = this.length; i < l; i++ ) {

                        this.nodes[i].setAttribute ( name, value );

                    }

                    return this;

                } else {

                    return this.nodes[0] ? this.nodes[0].getAttribute ( name ) : undefined;

                }

            }

        },

        removeAttr: function ( name ) {

            for ( var i = 0, l = this.length; i < l; i++ ) {

                this.nodes[i].removeAttribute ( name );

            }

            return this;

        },

        data: function ( name, value ) {

            if ( !_.isUndefined( value ) ) {

                return this.attr ( 'data-' + name.toLowerCase (), value );

            } else {

                var data_value = this.attr ( 'data-' + name.toLowerCase () );

                return data_value ? deserializeValue ( data_value ) : undefined;

            }

        },

        removeData: function ( name ) {

            return this.removeAttr ( 'data-' + name.toLowerCase () );

        },

        prop: function ( name, value ) {

            if ( !_.isUndefined( value ) ) {

                for ( var i = 0, l = this.length; i < l; i++ ) {

                    this.nodes[i][name] = value;

                }

                return this;

            } else {

                return this.nodes[0] ? this.nodes[0][name] : undefined;

            }

        },

        removeProp: function ( name ) {

            name = propFix[name] || name;

            for ( var i = 0, l = this.length; i < l; i++ ) {

                delete this.nodes[i][name];

            }

            return this;

        },

        val: function ( value ) {

            if ( !_.isUndefined( value ) ) {

                for ( var i = 0, l = this.length; i < l; i++ ) {

                    this.nodes[i].value = value;

                }

                return this;

            } else {

                if ( !this.nodes[0] ) return;

                if ( this.nodes[0].multiple ) {

                    var values = [];

                    for ( var i = 0, l = this.options.length; i < l; i++ ) {

                        if ( this.options[i].selected ) values.push ( this.options[i].value );

                    }

                    return values;

                } else {

                    return this.nodes[0].value;

                }

            }

        },

        // CSS

        css: function ( name, value ) {

            if ( _.isPlainObject ( name ) ) {

                for ( var prop in name ) this.css ( prop, name[prop] );

                return this;

            } else {

                value = maybe_add_px ( name, value );
                name = lQuery.camelCase ( name );

                if ( !_.isUndefined( value ) ) {

                    for ( var i = 0, l = this.length; i < l; i++ ) {

                        this.nodes[i].style[name] = value;

                    }

                    return this;

                } else {

                    return this.nodes[0] ? computeStyle ( this.nodes[0] )[name] : undefined;

                }

            }

        },

        addClass: function ( classes ) {

            //TODO: merge with toggleClass

            classes = classes.split ( ' ' );

            var cl = classes.length;

            for ( var i = 0, l = this.length; i < l; i++ ) {

                for ( var ci = 0; ci < cl; ci++ ) {

                    this.nodes[i].classList.add ( classes[ci] );

                }

            }

            return this;

        },

        removeClass: function ( classes ) {

            //TODO: merge with toggleClass

            classes = classes.split ( ' ' );

            var cl = classes.length;

            for ( var i = 0, l = this.length; i < l; i++ ) {

                for ( var ci = 0; ci < cl; ci++ ) {

                    this.nodes[i].classList.remove ( classes[ci] );

                }

            }

            return this;

        },

        hasClass: function ( classes ) {

            classes = classes.split ( ' ' );

            var cl = classes.length;

            for ( var i = 0, l = this.length; i < l; i++ ) {

                for ( var ci = 0; ci < cl; ci++ ) {

                    if ( !this.nodes[i].classList.contains ( classes[ci] ) ) ci = 100;

                }

                if ( ci === cl ) return true;

            }

            return false;

        },

        toggleClass: function ( classes, state ) {

            if ( !_.isUndefined( state ) ) {

                return state ? this.addClass ( classes ) : this.removeClass ( classes );

            } else {

                classes = classes.split ( ' ' );

                var cl = classes.length;

                for ( var i = 0, l = this.length; i < l; i++ ) {

                    for ( var ci = 0; ci < cl; ci++ ) {

                        this.nodes[i].classList.toggle ( classes[ci] );

                    }

                }

                return this;

            }

        },

        // DIMENSIONS

        width: function ( value ) {

            if ( !_.isUndefined( value ) ) return this.css ( 'width', value );

            var node = this.nodes[0];

            return !node
                       ? null
                       : node === window
                           ? node['innerWidth']
                           : node === document
                               ? html['scrollWidth']
                               : lQuery.offset ( node ).width;

        },

        height: function ( value ) {

            if ( !_.isUndefined( value ) ) return this.css ( 'height', value );

            var node = this.nodes[0];

            return !node
                       ? null
                       : node === window
                           ? node['innerHeight']
                           : node === document
                               ? html['scrollHeight']
                               : lQuery.offset ( node ).height;

        },

        // EFFECTS

        show: function () { //INFO: if is hidden by another thing it will remain hidden

            return this.css ( 'display', '' );

        },

        hide: function () {

            return this.css ( 'display', 'none' );

        },

        toggle: function ( state ) { //INFO: if is hidden by another thing it will remain hidden

            var forced = _.isBoolean ( state ) ? ( state ? '' : 'none' ) : undefined;

            for ( var i = 0, l = this.length; i < l; i++ ) {

                this.nodes[i].style.display = !_.isUndefined( forced )
                                                  ? forced
                                                  : ( computeStyle ( this.nodes[i] )['display'] !== 'none' )
                                                      ? 'none'
                                                      : '';

            }

            return this;

        },

        slideDown: function () { //TODO: Implement

        },

        slideUp: function () { //TODO: Implement

        },

        slideToggle: function ( state ) { //TODO: Implement

        },

        // EVENTS

        on: function ( event, selector, data, callback, one ) { //FIXME: update documentation

            var autoRemove,
                delegator,
                $this = this;

            if ( _.isPlainObject ( event ) ) { //INFO: { event_name: callback, ... }

                for ( var event_name in event ) {

                    this.on ( event_name, selector, data, event[event_name], one );

                }

                return this;

            }

            if ( !_.isString ( selector ) && !_.isFunction ( callback ) && callback !== false ) { //INFO: no `selector`

                callback = data;
                data = selector;
                selector = undefined;

            }

            if ( _.isFunction ( data ) || data === false ) { //INFO: no `data`

                callback = data;
                data = undefined;

            }

            if ( callback === false ) { //INFO: support for `false` shorthand instead of the callback

                callback = lQuery.false;

            }

            var events = event.split ( ' ' );

            var el = events.length;

            for ( var i = 0, l = this.length; i < l; i++ ) {

                for ( var ei = 0; ei < el; ei++ ) {

                    if ( one ) {

                        var autoRemove = (function ( element ) {

                            return function ( e ) {

                                lQuery.event.remove ( element, e.type, callback );

                                return callback.apply ( element, arguments );

                            };

                        })( $this.nodes[i] );

                    }

                    if ( selector ) {

                        var delegator = (function ( element, autoRemove ) {

                            return function ( e ) {

                                var children = lQuery(element).find ( selector );

                                for ( var i = children.length - 1; i >= 0; i-- ) {

                                    if ( e.path.indexOf ( children.nodes[i] ) !== -1 ) {

                                        var evt = _.extend ( lQuery.event.createProxy ( e ), {
                                            currentTarget: e.target,
                                            liveFired: element
                                        });

                                        ( autoRemove || callback ).apply ( children.nodes[i], [evt].concat ( Array.prototype.slice.call ( arguments, 1 ) ) );

                                    }

                                }

                            };

                        })( $this.nodes[i], autoRemove );

                    }

                    lQuery.event.add ( this.nodes[i], events[ei], callback, data, selector, delegator || autoRemove );

                }

            }

            return this;

        },

        off: function ( event, selector, callback ) { //FIXME: update documentation

            if ( _.isPlainObject ( event ) ) { //INFO: { event_name: callback, ... }

                for ( var event_name in event ) {

                    this.off ( event_name, selector, event[event_name] );

                }

                return this;

            }

            if ( !_.isString ( selector ) && !_.isFunction ( callback ) && callback !== false ) { //INFO: no `selector`

                callback = selector;
                selector = undefined;

            }

            if ( callback === false ) { //INFO: support for `false` shorthand instead of the callback

                callback = lQuery.false;

            }

            var events = event.split ( ' ' );

            var el = events.length;

            for ( var i = 0, l = this.length; i < l; i++ ) {

                for ( var ei = 0; ei < el; ei++ ) {

                    lQuery.event.remove ( this.nodes[i], events[ei], callback, selector );

                }

            }

            return this;

        },

        one: function ( event, selector, data, callback ) {

            return this.on ( event, selector, data, callback, 1 );

        },

        trigger: function ( event, args ) { //FIXME: update documentation

            event = ( _.isString ( event ) || _.isPlainObject ( event ) ) ? lQuery.Event ( event ) : lQuery.event.compatible ( event );

            event._args = args;

            for ( var i = 0, l = this.length; i < l; i++ ) {

                if ( event.type in focus && _.isFunction ( this.nodes[i][event.type] ) ) { //INFO: handle focus(), blur() by calling them directly

                    this.nodes[i][event.type]();

                } else {

                    this.nodes[i].dispatchEvent ( event );

                }

            }

        },

        triggerHandler: function ( event, args ) { //FIXME: document

            for ( var i = 0, l = this.length; i < l; i++ ) {

                var e = lQuery.event.createProxy ( _.isString ( event ) ? lQuery.Event ( event ) : event );

                e._args = args;
                e.target = this.nodes[i];

                var handlers = lQuery.event.findHandlers ( this.nodes[i], event.type || event );

                for ( var hi = 0, hl = handlers.length; hi < hl; hi++ ) {

                    handlers[i].proxy ( e );

                    if ( e.isImmediatePropagationStopped () ) break;

                }

            }

            return this;

        },

        ready: function ( handler ) {

            lQuery.ready ( handler );

            return this;

        },

        hover: function ( handlerIn, handlerOut ) {

            return this.mouseenter ( handlerIn ).mouseleave ( handlerOut );

        },

        // FILTERING

        filter: function ( selector ) {

            var filtered = [];

            for ( var i = 0, l = this.length; i < l; i++ ) {

                if ( lQuery.matches ( this.nodes[i], selector, i ) ) filtered.push ( this.nodes[i] );

            }

            return lQuery_arr ( filtered, true );

        },

        is: function ( selector ) {

            for ( var i = 0, l = this.length; i < l; i++ ) {

                if ( lQuery.matches ( this.nodes[i], selector ) ) return true;

            }

            return false;

        },

        not: function ( selector ) {

            return this.filter ( function ( index ) {

                return !lQuery.matches ( this, selector, index );

            });

        },

        first: function () {

            var node = this.nodes[0];

            return lQuery_arr ( node ? [node] : [], true );

        },

        last: function () {

            var node = this.nodes [ this.length - 1 ];

            return lQuery_arr ( node ? [node] : [], true );

        },

        eq: function ( index ) {

            var node = this.get ( index );

            return lQuery_arr ( node ? [node] : [], true );

        },

        slice: function ( start, end ) {

            return lQuery_arr ( this.nodes.slice ( start, end ), true );

        },

        // FORM

        serializeArray: function () {

            var form = this.nodes[0],
                data = [];

            if ( !form || form.nodeName !== 'FORM' ) return; //INFO: The `nodeName` property is always uppercase

            for ( var i = 0, l = form.elements.length; i < l; i++ ) {

                var field = form.elements[i];

                if ( field.name && field.nodeName !== 'FIELDSET' && !field.disabled && field.type !== 'submit' && field.type !== 'reset' && field.type !== 'button' && field.type !== 'file' && ( ( field.type !== 'radio' && field.type !== 'checkbox'  ) || field.checked ) ) { //INFO: The `nodeName` property is always uppercase

                    data.push ({
                        name: field.name,
                        value: lQuery_node(field).val()
                    });

                }

            }

            return data;

        },

        serialize: function () {

            var data = this.serializeArray (),
                result = [];

            for ( var i = 0, l = data.length; i < l; i++ ) {

                result.push ( encodeURIComponent ( data[i].name ) + '=' + encodeURIComponent ( data[i].value ) );

            }

            return result.join ( '&' );

        },

        //TODO: form post thought ajax (maybe it requires too much effort right now...)

        // MANIPULATION

        before: function ( selector ) {

            var nodes = lQuery ( selector ).nodes;

            for ( var i = 0, l = this.length; i < l; i++ ) {

                for ( var ni = 0, nl = nodes.length; ni < nl; ni++ ) {

                    this.nodes[i].parentNode.insertBefore ( nodes[ni].cloneNode ( true ), this.nodes[i] );

                }

            }

            return this;

        },

        after: function ( selector ) {

            var nodes = lQuery ( selector ).nodes;

            for ( var i = 0, l = this.length; i < l; i++ ) {

                for ( var ni = 0, nl = nodes.length; ni < nl; ni++ ) {

                    this.nodes[i].parentNode.insertBefore ( ( nl > 1 ? nodes[ni].cloneNode ( true ) : nodes[ni] ), this.nodes[i].nextSibling );

                }

            }

            return this;

        },

        prepend: function ( selector ) {

            var nodes = lQuery ( selector ).nodes;

            for ( var i = 0, l = this.length; i < l; i++ ) {

                for ( var ni = 0, nl = nodes.length; ni < nl; ni++ ) {

                    this.nodes[i].insertBefore ( ( nl > 1 ? nodes[ni].cloneNode ( true ) : nodes[ni] ), this.nodes[i].firstChild );

                }

            }

            return this;

        },

        append: function ( selector ) {

            var nodes = lQuery ( selector ).nodes;

            for ( var i = 0, l = this.length; i < l; i++ ) {

                for ( var ni = 0, nl = nodes.length; ni < nl; ni++ ) {

                    this.nodes[i].insertBefore ( ( nl > 1 ? nodes[ni].cloneNode ( true ) : nodes[ni] ), null );

                }

            }

            return this;

        },

        insertBefore: function ( selector ) {

            lQuery ( selector ).before ( this );

            return this;

        },

        insertAfter: function ( selector ) {

            lQuery ( selector ).after ( this );

            return this;

        },

        prependTo: function ( selector ) {

            lQuery ( selector ).prepend ( this );

            return this;

        },

        appendTo: function ( selector ) {

            lQuery ( selector ).append ( this );

            return this;

        },

        text: function () {

            return this.prop ( 'textContent' );

        },

        html: function ( value ) {

            return this.prop ( 'innerHTML', value );

        },

        replaceWith: function ( value ) {

            return this.prop ( 'outerHTML', value );

        },

        empty: function () {

            for ( var i = 0, l = this.length; i < l; i++ ) {

                while ( this.nodes[i].hasChildNodes () ) {

                    this.nodes[i].removeChild ( this.nodes[i].lastChild );

                }

            }

            return this;

        },

        remove: function () {

            for ( var i = 0, l = this.length; i < l; i++ ) {

                if ( this.nodes[i].parentNode ) this.nodes[i].parentNode.removeChild ( this.nodes[i] );

            }

            return this;

        },

        detach: function () {

            return this.remove ();

        },

        clone: function () {

            var clones = new Array ( this.length );

            for ( var i = 0, l = this.length; i < l; i++ ) {

                clones[i] = this.nodes[i].cloneNode ( true );

            }

            return lQuery_arr ( clones, true );

        },

        // MISCELLANEOUS

        get: function ( index ) {

            return this.nodes [ index < 0 ? this.length + index : index ];

        },

        index: function ( selector ) {

            return this.nodes[0]
                       ? selector
                           ? this.nodes.indexOf ( lQuery ( selector ).get ( 0 ) ) // index relative to the collection
                           : lQuery.makeArray ( this.nodes[0].parentNode.childNodes ).indexOf ( this.nodes[0] ) // index relative to siblings
                       : -1;

        },

        size: function () {

            return this.length;

        },

        toArray: function () {

            return this.nodes.slice (); //INFO: By calling `Array.prototype.slice` we create a copy of the array, so if we modify it we won't modify the the original collection

        },

        // OFFSET

        offset: function () {

            return this.nodes[0] ? lQuery.offset ( this.nodes[0] ) : undefined;

        },

        offsetParent: function () {

            if ( !this.nodes[0] ) return this;

            var parent = this.nodes[0].offsetParent || html;

            while ( parent && parent !== html && computeStyle ( parent )['position'] === 'static' ) {

                parent = parent.offsetParent;

            }

            return lQuery_node ( parent || html );

        },

        position: function () {

            if ( !this.nodes[0] ) return undefined;

            var parentOffset = { top: 0, left: 0 };

            if ( this.nodes[0].position === 'fixed' ) {

                var offset = this.nodes[0].getBoundingClientRect ();

            } else {

                var $offsetParent = this.offsetParent (),
                    offset = this.offset ();

                if ( $offsetParent.get ( 0 ) !== html ) {

                    parentOffset = $offsetParent.offset ();

                }

                parentOffset.top += parseFloat ( computeStyle ( $offsetParent.get ( 0 ) )['borderTopWidth'] );
                parentOffset.left += parseFloat ( computeStyle ( $offsetParent.get ( 0 ) )['borderLeftWidth'] );

            }

            return {
                top: offset.top - parentOffset.top - parseFloat ( computeStyle ( this.nodes[0] )['marginTop'] ),
                left: offset.left - parentOffset.left - parseFloat ( computeStyle ( this.nodes[0] )['marginLeft'] )
            };

        },

        scrollTop: function ( value ) {

            return this.prop ( 'scrollTop', value );

        },

        scrollBottom: function ( value ) {

            if ( !_.isUndefined( value ) ) {

                for ( var i = 0, l = this.length; i < l; i++ ) {

                    this.nodes[i].scrollTop = this.nodes[i].scrollHeight - this.nodes[i].clientHeight - value;

                }

                return this;

            } else {

                return this.nodes[0] ? this.nodes[0].scrollHeight - this.nodes[0].scrollTop - this.nodes[0].clientHeight : undefined; //FIXME: Not sure at all of this

            }

        },

        scrollLeft: function ( value ) {

            return this.prop ( 'scrollLeft', value );

        },

        scrollRight: function ( value ) {

            if ( !_.isUndefined( value ) ) {

                for ( var i = 0, l = this.length; i < l; i++ ) {

                    this.nodes[i].scrollLeft = this.nodes[i].scrollWidth - this.nodes[i].clientWidth - value;

                }

                return this;

            } else {

                return this.nodes[0] ? this.nodes[0].scrollWidth - this.nodes[0].scrollLeft - this.nodes[0].clientWidth : undefined; //FIXME: Not sure at all of this

            }

        },

        // TRAVERSING

        add: function ( selector ) {

            var more_nodes = lQuery ( selector ).nodes;

            return lQuery_arr ( this.nodes.concat ( more_nodes ), ( this.length === 0 || more_nodes.length === 0 ) ); //INFO: the `concat` method returns a new array, doesn't touch the original one

        },

        parents: function ( selector, maxMatchesNr ) { //INFO: `maxMatchesNr`: limits the number of returned elements

            var parents = [];

            for ( var i = 0, l = this.length; i < l; i++ ) {

                var matches = 0,
                    parent = this.nodes[i].parentNode;

                while ( ( _.isUndefined ( maxMatchesNr ) || matches < maxMatchesNr ) && parent !== document ) {

                    if ( ( selector && lQuery.matches ( parent, selector ) ) || !selector ) {

                        parents.push ( parent );

                        matches++;

                    }

                    parent = parent.parentNode;

                }

            }

            return lQuery_arr ( parents, this.length < 2 );

        },

        parent: function ( selector ) {

            var $parents = this.parents ( undefined, 1 );

            return selector ? $parents.filter ( selector ) : $parents;

        },

        closest: function ( selector ) {

            return this.parents ( selector, 1 );

        },

        children: function ( selector, nodeTypeCheck ) {

            var children = [],
                partials_nr = 0;

            for ( var i = 0, l = this.length; i < l; i++ ) {

                var has_children = false,
                    child_nodes = this.nodes[i].childNodes;

                for ( var ci = 0, cl = child_nodes.length; ci < cl; ci++ ) {

                    if ( nodeTypeCheck === false || child_nodes[ci].nodeType === 1 ) {

                        children.push ( child_nodes[ci] );

                        has_children = true;

                    }

                }

                if ( has_children ) partials_nr++;

            }

            var $children = lQuery_arr ( children, partials_nr < 2 );

            return selector ? $children.filter ( selector ) : $children;

        },

        contents: function () {

            return this.children ( undefined, false );

        },

        siblings: function ( selector ) {

            var siblings = [],
                partials_nr = 0;

            for ( var i = 0, l = this.length; i < l; i++ ) {

                var has_siblings = false,
                    siblings_nodes = this.nodes[i].parentNode.childNodes;

                for ( var ci = 0, cl = siblings_nodes.length; ci < cl; ci++ ) {

                    if ( siblings_nodes[ci].nodeType === 1 && siblings_nodes[ci] !== this.nodes[i] ) {

                        siblings.push ( siblings_nodes[ci] );

                        has_siblings = true;

                    }

                }

                if ( has_siblings ) partials_nr++;

            }

            var $siblings = lQuery_arr ( siblings, partials_nr < 2 );

            return selector ? $siblings.filter ( selector ) : $siblings;

        },

        find: function ( selector ) {

            var found = [],
                partials_nr = 0;

            for ( var i = 0, l = this.length; i < l; i++ ) {

                var partials = dom_selector ( selector, this.nodes[i] );

                if ( partials.length > 0 ) {

                    found = found.concat ( partials );
                    partials_nr++;

                }

            }

            return lQuery_arr ( found, partials_nr < 2 );

        },

        prev: function ( selector ) {

            var prevs = [],
                node;

            for ( var i = 0, l = this.length; i < l; i++ ) {

                node = this.nodes[0].previousElementSibling;

                if ( node ) prevs.push ( node );

            }

            var $prevs = lQuery_arr ( prevs, true );

            return selector ? $prevs.filter ( selector ) : $prevs;

        },

        next: function ( selector ) {

            var nexts = [],
                node;

            for ( var i = 0, l = this.length; i < l; i++ ) {

                node = this.nodes[0].nextElementSibling;

                if ( node ) nexts.push ( node );

            }

            var $nexts = lQuery_arr ( nexts, true );

            return selector ? $nexts.filter ( selector ) : $nexts;

        },

        // UTILITIES

        each: function ( callback ) {

            for ( var i = 0, l = this.length; i < l; i++ ) {

                if ( callback.call ( this.nodes[i], i, this.nodes[i] ) === false ) break;

            }

            return this;

        },

        map: function ( callback ) {

            var results = [],
                result;

            for ( var i = 0, l = this.length; i < l; i++ ) {

                result = callback.call ( this.nodes[i], i, this.nodes[i] );

                if ( result ) {

                    if ( result instanceof Node || selector instanceof Window ) results.push ( result );
                    else if ( selector instanceof Array ) results = results.concat ( result );

                }

            }

            return lQuery_arr ( results, results.length < 2 );

        }

    };

    /* EVENTS SHORTHANDS */

    ['blur', 'change', 'click', 'contextmenu', 'dblclick', 'error', 'focus', 'focusin', 'focusout', 'keydown', 'keypress', 'keyup', 'load', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll', 'select', 'submit', 'unload'].forEach ( function ( event_name ) {

        lQuery.fn[event_name] = function ( callback ) {

            return callback ? this.on ( event_name, callback ) : this.trigger ( event_name );

        };

    });

    /* PROTOTYPES ASSIGNMENTS */

    lQuery.fn.init.prototype = lQuery.fn.init_node.prototype = lQuery.fn.init_arr.prototype = lQuery.fn;

    /* ALIASES */

    window.lQuery = lQuery;
    window.lQuery_node = lQuery_node;
    window.lQuery_arr = lQuery_arr;

    if ( _.isUndefined ( window.$ ) ) {

        window.$ = lQuery;
        window.$_node = lQuery_node;
        window.$_arr = lQuery_arr;

    }

    /* COMMON OBJECTS */

    lQuery.ready ( function () {

        body = document.body;

        window.$window = lQuery_node(window);
        window.$document = lQuery_node(document);
        window.$html = lQuery_node(document.documentElement);
        window.$body = lQuery_node(document.body);

    });

} ( window, document ));


/* lQuery */

var lQuery;

(function() {

    /* VARIABLES */

    var _matches_fn = ( document.documentElement.matches || document.documentElement.matchesSelector || document.documentElement.webkitMatchesSelector || document.documentElement.mozMatchesSelector || document.documentElement.msMatchesSelector || document.documentElement.oMatchesSelector );

    var rootNodeRE = /^(?:body|html)$/i;
    var readyRE = /complete|loaded|interactive/;
    var simpleSelectorRE = /^[\w-]*$/;

    /* EXTERNAL UTILITES */

    var camelize = function ( str ) {

        var camel_cased = str.replace ( /-+(.)?/g, function ( match, chr ) {

            return chr ? chr.toUpperCase () : '';

        });

        return camel_cased[0].toLowerCase () + camel_cased.slice ( 1 );

    };

    var deserialize_value = function ( value ) {

        var num;

        return value
                   ? value === "true" ||
                       ( value === "false"
                             ? false
                             : value === "null"
                                 ? null
                                 : !/^0/.test ( value ) && !isNaN ( num = Number ( value ) )
                                     ? num
                                     : /^[\[\{]/.test ( value )
                                         ? JSON.parse ( value )
                                         : value )
                   : value;

    };

    var nl2arr = function ( node_list ) {

        return Array.prototype.slice.call ( node_list );

    };

    var DOMPositionComparator = function ( a, b ) {

        return 3 - ( a.compareDocumentPosition ( b ) & 6 );

    };

    var arr_unique =  function ( arr, sorted ) {

        sorted = sorted ? arr : ( arr[0].compareDocumentPosition ? arr.sort ( DOMPositionComparator ) : arr.sort () );

        var prev;

        for ( var i = sorted.length - 1; i >= 0; i-- ) {

            if ( sorted[i] === prev ) sorted.splice ( i, 1 );
            else prev = sorted[i];

        }

        return sorted;

    };

    var is_loopable = function ( obj ) {

        return ( obj instanceof NodeList || obj instanceof Array || obj instanceof HTMLCollection );

    };

    var dom_selector = function ( parent, selector ) { // returns an array of dom elements

        var found,
            maybe_id = ( selector[0] === '#' ),
            maybe_class = ( !maybe_id && selector[0] === '.' ),
            name_only = ( ( maybe_id || maybe_class ) ? selector.slice ( 1 ) : selector ),
            is_simple = simpleSelectorRE.test ( name_only );

        return is_simple
                    ? maybe_id
                        ? ( found = parent.getElementById ( name_only ) )
                            ? [found]
                            : []
                        : maybe_class
                            ? nl2arr ( parent.getElementsByClassName ( name_only ) )
                            : nl2arr ( parent.getElementsByTagName ( selector ) )
                    : nl2arr ( parent.querySelectorAll ( selector ) );

    };

    /* MAIN */

    lQuery = function ( selector, unique ) {

        return new Library ( selector, unique );

    };

    var Library = function ( selector, unique ) {

        this.nodes = !selector
                        ? []
                        : typeof selector === 'string'
                            ? dom_selector ( document, selector )
                            : is_loopable ( selector )
                                ? unique
                                    ? selector
                                    : arr_unique ( selector )
                                : selector instanceof Library
                                    ? selector.nodes
                                    : typeof selector === 'object'
                                        ? [selector]
                                        : [];

        this.length = this.nodes.length;

        return this;

    };

    /* UTILITIES */

    lQuery.dom_ready = function ( callback ) {

        // need to check if document.body exists for IE as that browser reports
        // document ready when it hasn't yet created the body element

        if ( readyRE.test ( document.readyState ) && document.body ) callback ();
        else lQuery(document).on ( 'DOMContentLoaded', callback );

    };

    lQuery.defer = function ( callback, ms ) {

        $html.get ( 0 ).clientHeight; // necessary, so that the deferred callback will be executed in another cycle

        setTimeout ( callback, ms || 0 );

    };

    lQuery.ajax = function ( options ) {

        options.type = options.type ? options.type.toUpperCase () : 'GET';

        var request = new XMLHttpRequest ();
        request.open ( options.type, options.url, true );

        request.setRequestHeader ( 'X-Requested-With', 'XMLHttpRequest' );

        request.onload = function () {

            if ( request.status >= 200 && request.status < 400 ) {

                if ( options.success ) {

                    options.success ( ( options.json === true ) ? JSON.parse ( request.responseText ) : request.responseText );

                }

            } else {

                if ( options.error ) {

                    options.error ( ( options.json === true ) ? JSON.parse ( request.responseText ) : request.responseText );

                }

            }

        };

        if ( options.error ) {

            request.onerror = function () {

                options.error ( ( options.json === true ) ? JSON.parse ( request.responseText ) : request.responseText );

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

    lQuery.uuid = 0;

    lQuery.get_uuid = function () {

        return this.uuid += 1;

    };

    /* FUNCTIONS */

    lQuery.node_fn = {

        // SELECTORS

        is: function ( node, selector ) {

            if ( _matches_fn ) {

                return _matches_fn.call ( node, selector );

            } else {

                var siblings = dom_selector ( node.parentNode, selector );

                var found = false;

                for ( var i = 0; i < siblings.length; i++ ) {

                    if ( siblings[i] === node ) {

                        found = true;
                        break;

                    }

                }

                return found;

            }

        },

        // CSS

        addClass: function ( node, class_name ) {

            if ( node.classList ) node.classList.add ( class_name );
            else node.className += ' ' + class_name;

        },

        removeClass: function ( node, class_name ) {

            if ( node.classList ) node.classList.remove ( class_name );
            else node.className = node.className.replace ( new RegExp ( '(^|\\b)' + class_name + '(\\b|$)', 'gi' ), ' ' );

        },

        hasClass: function ( node, class_name ) {

            return !!( node.className && new RegExp ( '(\\s|^)' + class_name + '(\\s|$)' ).test ( node.className ) );

        },

        // INFOS

        offset: function ( node ) {

            var rect = node.getBoundingClientRect ();

            return {
                top: rect.top + document.body.scrollTop,
                left: rect.left + document.body.scrollLeft,
                width: rect.width, // should it be rounded instead???
                height: rect.height // should it be rounded instead???
            };

        }

    };

    lQuery.fn = Library.prototype = {

        // GETTING

        first: function () {

            return lQuery ( this.nodes[0] );

        },

        last: function () {

            return lQuery ( this.nodes[this.length-1] );

        },

        eq: function ( index ) {

            return lQuery ( this.get ( index ) );

        },

        get: function ( index ) {

            return this.nodes [ index >= 0 ? index : index + this.length ];

        },

        slice: function ( start, end ) {

            return lQuery ( this.nodes.slice ( start, end || this.length ), true );

        },

        toArray: function () {

            return this.nodes;

        },

        size: function () {

            return this.length;

        },

        index: function ( ele ) {

            if ( ele instanceof Library ) ele = ele.nodes[0];

            for ( var i = 0; i < this.length; i++ ) {

                if ( this.nodes[i] === ele ) return i;

            }

            return -1;

        },

        contains: function ( ele ) {

            return ( this.index ( ele ) !== -1 );

        },

        // SELECTORS

        add: function ( ele ) {

            var new_nodes = this.nodes.concat (
                ele instanceof Library
                    ? ele.nodes
                    : ele instanceof NodeList || ele instanceof HTMLCollection
                        ? nl2arr ( ele )
                        : ele instanceof Array
                            ? ele
                            : typeof ele === 'string'
                                ? dom_selector ( document, ele )
                                : typeof ele === 'object'
                                    ? [ele]
                                    : []
            );

            return lQuery ( new_nodes );

        },

        find: function ( selector ) {

            var found = [],
                partials_nr = 0;

            for ( var i = 0; i < this.length; i++ ) {

                var partials = dom_selector ( this.nodes[i], selector );

                if ( partials.length > 0 ) {

                    found = found.concat ( partials );
                    partials_nr += 1;

                }

            }

            return lQuery ( found, partials_nr < 2 );

        },

        filter: function ( selector ) {

            var filtered = [],
                type = typeof selector;

            for ( var i = 0; i < this.length; i++ ) {

                if ( type === 'string' && lQuery.node_fn.is ( this.nodes[i], selector ) ) filtered.push ( this.nodes[i] );
                else if ( type === 'function' && selector ( this.nodes[i] ) ) filtered.push ( this.nodes[i] );

            }

            return lQuery ( filtered, true );

        },

        is: function ( selector ) {

            for ( var i = 0; i < this.length; i++ ) {

                if ( !lQuery.node_fn.is ( this.nodes[i], selector ) ) return false;

            }

            return ( this.length > 0 );

        },

        not: function ( selector ) {

            return this.filter ( function ( node ) {

                if ( selector instanceof Library ) return !selector.contains ( node );
                else return !lQuery.node_fn.is ( node, selector );

            });

        },

        parents: function ( selector, max_matches ) {

            max_matches = max_matches || 1000000;

            var all_parents = [];

            for ( var i = 0; i < this.length; i++ ) {

                var parents = [],
                    parent = this.nodes[i].parentNode;

                while ( parents.length < max_matches && parent && parent !== document ) {

                    if ( selector ) {

                        if ( lQuery.node_fn.is ( parent, selector ) ) parents.push ( parent );

                    } else {

                        parents.push ( parent );

                    }

                    parent = parent.parentNode;

                }

                all_parents = all_parents.concat ( parents );

            }

            return lQuery ( all_parents, this.length < 2 );

        },

        parent: function ( selector ) {

            return this.parents ( selector, 1 );

        },

        closest: function ( selector ) {

            return this.parent ( selector );

        },

        children: function ( selector ) {

            var children = [],
                partials_nr = 0;

            for ( var i = 0; i < this.length; i++ ) {

                var partials = [],
                    child_nodes = this.nodes[i].childNodes;

                for ( var ci = 0; ci < child_nodes.length; ci++ ) {

                    if ( child_nodes[ci].nodeType === 1 ) {

                        partials.push ( child_nodes[ci] );

                    }

                }

                if ( partials.length > 0 ) {

                    children = children.concat ( partials );
                    partials_nr += 1;

                }

            }

            return ( typeof selector === 'string' ) ? lQuery ( children, partials_nr < 2 ).filter ( selector ) : lQuery ( children, partials_nr < 2 );

        },

        // UTILITIES

        each: function ( callback ) {

            for ( var i = 0; i < this.length; i++ ) {

                if ( callback.call ( this.nodes[i], this.nodes[i], i ) === false ) break; // break if the callback returns false

            }

            return this;

        },

        map: function ( callback ) {

            var results = [];

            for ( var i = 0; i < this.length; i++ ) {

                var value = callback.call ( this.nodes[i], this.nodes[i], i );

                if ( value !== null ) results.push ( value );

            }

            return results;

        },

        // ADDING / REMOVING

        insertHtml: function ( where, html ) {

            for ( var i = 0; i < this.length; i++ ) {

                this.nodes[i].insertAdjacentHTML ( where, html );

            }

            return this;

        },

        before: function ( html ) {

            return this.insertHtml ( 'beforebegin', html );

        },

        after: function ( html ) {

            return this.insertHtml ( 'afterend', html );

        },

        prepend: function ( html ) {

            return this.insertHtml ( 'afterbegin', html );

        },

        append: function ( html ) {

            return this.insertHtml ( 'beforeend', html );

        },

        remove: function () {

            for ( var i = 0; i < this.length; i++ ) {

                if ( this.nodes[i].parentNode ) this.nodes[i].parentNode.removeChild ( this.nodes[i] );

            }

            return this;

        },

        // EDIT

        attr: function ( name, value ) {

            if ( typeof value !== 'undefined' ) {

                for ( var i = 0; i < this.length; i++ ) {

                    this.nodes[i].setAttribute ( name, value );

                }

                return this;

            } else {

                return ( this.length > 0 ) ? this.nodes[0].getAttribute ( name ) : null;

            }

        },

        data: function ( name, value ) {

            var return_value = this.attr ( 'data-' + name, value );

            return ( typeof value !== 'undefined' ) ? return_value : deserialize_value ( return_value );

        },

        prop: function ( name, value ) {

            if ( typeof value !== 'undefined' ) {

                for ( var i = 0; i < this.length; i++ ) {

                    this.nodes[i][name] = value;

                }

                return this;

            } else {

                return ( this.length > 0 ) ? this.nodes[0][name] : null;

            }

        },

        checked: function ( value ) {

            return this.prop ( 'checked', value );

        },

        text: function ( text ) {

            return this.prop ( 'textContent', text );

        },

        html: function ( html ) {

            return this.prop ( 'innerHTML', html );

        },

        replaceWith: function ( html ) {

            return this.prop ( 'outerHTML', html );

        },

        empty: function () {

            for ( var i = 0; i < this.length; i++ ) {

                while ( this.nodes[i].hasChildNodes () ) {

                    this.nodes[i].removeChild ( this.nodes[i].lastChild );

                }

            }

            return this;

        },

        val: function ( value ) {

            if ( typeof value !== 'undefined' ) {

                for ( var i = 0; i < this.length; i++ ) {

                    this.nodes[i].value = value;

                }

                return this;

            } else {

                if ( this.length < 1 ) return null;
                else return ( this.nodes[0].tagName === 'select' ) ? this.nodes[0].options[this.nodes[0].selectedIndex].value : this.nodes[0].value;

            }

        },

        scrollTop: function ( pixels ) {

            return this.prop ( 'scrollTop', pixels );

        },

        scrollBottom: function ( pixels ) {

            for ( var i = 0; i < this.length; i++ ) {

                this.nodes[i].scrollTop = this.nodes[i].scrollHeight - this.nodes[i].clientHeight - ( pixels || 0 );

            }

            return this;

        },

        scrollLeft: function ( pixels ) {

            return this.prop ( 'scrollLeft', pixels );

        },

        // EVENTS

        on: function ( events, handler ) { //TODO: add support for selector

            events = events.split ( ' ' );

            for ( var i = 0; i < this.length; i++ ) {

                for ( var ei = 0; ei < events.length; ei++ ) {

                    if ( this.nodes[i].addEventListener ) {

                        this.nodes[i].addEventListener ( events[ei], handler );

                    } else {

                        this.nodes[i].attachEvent ( 'on' + events[ei], function () {

                            handler.call ( this.nodes[i] );

                        });

                    }

                }

            }

            return this;

        },

        off: function ( events, handler ) { //TODO: add support for selector

            events = events.split ( ' ' );

            for ( var i = 0; i < this.length; i++ ) {

                for ( var ei = 0; ei < events.length; ei++ ) {

                    if ( this.nodes[i].removeEventListener ) this.nodes[i].removeEventListener ( events[ei], handler );
                    else this.nodes[i].detachEvent ( 'on' + events[ei], handler );

                }

            }

            return this;

        },

        trigger: function ( events ) {

            events = events.split ( ' ' );

            for ( var ei = 0; ei < events.length; ei++ ) {

                var event_obj;

                if ( window.CustomEvent ) {

                    event_obj = new CustomEvent ( events[ei] );

                    event_obj.initCustomEvent ( events[ei], true, true, null );

                } else {

                    event_obj = document.createEvent ( events[ei] );

                    event_obj.initEvent ( events[ei], true, true );

                }

                for ( var i = 0; i < this.length; i++ ) {

                    this.nodes[i].dispatchEvent ( event_obj );

                }

            }

            return this;

        },

        one: function ( events, handler ) {

            return this.on ( events, function handler_wrp ( event ) {

                var node = this;

                $(node).off ( event.type, handler ); //FIXME: does it work?

                return handler.call ( node, event );

            });

        },

        // CSS

        css: function ( name, value ) {

            if ( typeof name === 'object' ) {

                for ( var key in name ) this.css ( key, name[key] );

                return this;

            } else {

                name = camelize ( name );

                if ( typeof value !== 'undefined' ) {

                    for ( var i = 0; i < this.length; i++ ) {

                        this.nodes[i].style[name] = value;

                    }

                    return this;

                } else {

                    return ( this.length > 0 ) ? getComputedStyle ( this.nodes[0] )[name] : null;

                }

            }

        },

        addClass: function ( classes ) {

            classes = classes.split ( ' ' );

            for ( var i = 0; i < this.length; i++ ) {

                for ( var ci = 0; ci < classes.length; ci++ ) {

                    lQuery.node_fn.addClass ( this.nodes[i], classes[ci] );

                }

            }

            return this;

        },

        removeClass: function ( classes ) {

            classes = classes.split ( ' ' );

            for ( var i = 0; i < this.length; i++ ) {

                for ( var ci = 0; ci < classes.length; ci++ ) {

                    lQuery.node_fn.removeClass ( this.nodes[i], classes[ci] );

                }

            }

            return this;

        },

        hasClass: function ( classes ) {

            classes = classes.split ( ' ' );

            for ( var i = 0; i < this.length; i++ ) {

                for ( var ci = 0; ci < classes.length; ci++ ) {

                    if ( !lQuery.node_fn.hasClass ( this.nodes[i], classes[ci] ) ) return false;

                }

            }

            return ( this.length > 0 );

        },

        toggleClass: function ( classes, force ) {

            if ( typeof force !== 'undefined' ) {

                return ( force ) ? this.addClass ( classes ) : this.removeClass ( classes );

            } else {

                classes = classes.split ( ' ' );

                for ( var i = 0; i < this.length; i++ ) {

                    for ( var ci = 0; ci < classes.length; ci++ ) {

                        ( lQuery.node_fn.hasClass ( this.nodes[i], classes[ci] ) ) ? lQuery.node_fn.removeClass ( this.nodes[i], classes[ci] ) : lQuery.node_fn.addClass ( this.nodes[i], classes[ci] );

                    }

                }

                return this;

            }

        },

        show: function () {

            return this.css ( 'display', 'block' );

        },

        hide: function () {

            return this.css ( 'display', 'none' );

        },

        toggle: function () { //FIXME: add the 'hidden' class instead

            for ( var i = 0; i < this.length; i++ ) {

                this.nodes[i].style.display = ( getComputedStyle ( this.nodes[i] ).display !== 'block' ) ? 'block' : 'none';

            }

            return this;

        },

        // INFOS

        offset: function () {

            if ( this.length < 1 ) return null;

            return lQuery.node_fn.offset ( this.nodes[0] );

        },

        offsetParent: function () {

            if ( this.length < 1 ) return null;

            var parent = this.nodes[0].offsetParent || document.body;

            while ( parent && !rootNodeRE.test ( parent.nodeName ) && getComputedStyle ( parent ).position === 'static' ) {

                parent = parent.offsetParent;

            }

            return parent;

        },

        position: function () {

            if ( this.length < 1 ) return null;

            var offsetParent = this.offsetParent (),
                offset = this.offset (),
                parentOffset = rootNodeRE.test ( offsetParent.nodeName ) ? { top: 0, left: 0 } : lQuery.node_fn.offset ( offsetParent );

            offset.top  -= parseFloat ( getComputedStyle ( this.nodes[0] )['margin-top'] ) || 0;
            offset.left -= parseFloat ( getComputedStyle ( this.nodes[0] )['margin-left'] ) || 0;

            parentOffset.top  += parseFloat ( getComputedStyle ( offsetParent )['border-top-width'] ) || 0;
            parentOffset.left += parseFloat ( getComputedStyle ( offsetParent )['border-left-width'] ) || 0;

            return {
                top:  offset.top  - parentOffset.top,
                left: offset.left - parentOffset.left
            };

        },

        width: function () {

            return this.prop ( 'clientWidth' );

        },

        height: function () {

            return this.prop ( 'clientHeight' );

        },

        outerWidth: function () {

            return this.prop ( 'offsetWidth' );

        },

        outerHeight: function () {

            return this.prop ( 'offsetHeight' );

        }

        // FORM

        //TODO: form methods (serialize)
        //TODO: form post thought ajax

    };

}());

/* Namespaces */

window.lQuery = lQuery;
if ( !window.$ ) window.$ = lQuery;
if ( !window.$$ ) window.$$ = lQuery;

/* Main objects */

lQuery.dom_ready ( function () {

    window.$window = $(window);
    window.$document = $(document);
    window.$html = $(document.documentElement);
    window.$body = $(document.body);

});

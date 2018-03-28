
// @require ../init.js

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

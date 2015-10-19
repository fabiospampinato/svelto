
/* =========================================================================
 * Svelto - Cookie
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * Fork of https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie - Mozilla
 * ========================================================================= */

/* COOKIE */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* UTILITIES */

  let encode = encodeURIComponent,
      decode = decodeURIComponent;

  /* COOKIE */

  $.cookie = {

    get ( key ) {

      if ( !key ) return null;

      return decode ( document.cookie.replace ( new RegExp ( '(?:(?:^|.*;)\\s*' + encode ( key ).replace ( /[\-\.\+\*]/g, '\\$&' ) + '\\s*\\=\\s*([^;]*).*$)|^.*$' ), '$1' ) ) || null;

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

      document.cookie = encode ( key ) + '=' + encode ( value ) + expires + ( domain ? '; domain=' + domain : '' ) + ( path ? '; path=' + path : '' ) + ( secure ? '; secure' : '' );

      return true;

    },

    remove ( key, path, domain ) {

      if ( !this.has ( key ) ) return false;

      document.cookie = encode ( key ) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + ( domain ? '; domain=' + domain : '' ) + ( path ? '; path=' + path : '' );

      return true;

    },

    has ( key ) {

      if ( !key ) return false;

      return ( new RegExp ( '(?:^|;\\s*)' + encode ( key ).replace ( /[\-\.\+\*]/g, '\\$&' ) + '\\s*\\=' ) ).test ( document.cookie );

    },

    keys () {

      let keys = document.cookie.replace ( /((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '' ).split ( /\s*(?:\=[^;]*)?;\s*/ );

      for ( let i = 0, l = keys.length; i < l; i++ ) {

        keys[i] = decode ( keys[i] );

      }

      return keys;

    }

  };

}( jQuery, _, window, document ));

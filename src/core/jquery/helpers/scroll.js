
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

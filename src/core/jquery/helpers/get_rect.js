
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


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

  Object.defineProperty ( $, 'body', { // Body not avaiable yet inside `head`
    enumerable: true,
    get () {
      return document.body;
    }
  });

  let $body;

  Object.defineProperty ( $, '$body', { // Body not avaiable yet inside `head`
    enumerable: true,
    get () {
      if ( $body ) return $body;
      let body = $.body;
      if ( body ) return $body = $(body);
      return $.$empty;
    }
  });

}( window.__svelto_jquery ));

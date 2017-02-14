
/* =========================================================================
 * Svelto - Core - Svelto
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/jquery/jquery.js
 * @require core/lodash/lodash.js
 * @require core/modernizr/modernizr.js
 * ========================================================================= */

(function () {

  'use strict';

  /* SVELTO */

  let Svelto = {

    VERSION: '0.7.12',

    /* DEPENDENCIES */

    $: jQuery,
    _: lodash,
    Modernizr: Modernizr,

    /* NAMESPACES */

    Widgets: {},
    Templates: {},

    /* ELEMENTS */

    $window: $(window),
    window,
    $document: $(document),
    document,
    $html: $(document.documentElement),
    html: document.documentElement,
    $head: $(document.head),
    head: document.head,
    $body: $(document.body),
    body: document.body

  };

  /* EXPORT */

  window.Svelto = Svelto;

}());


/* =========================================================================
 * Svelto - Core - Svelto
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
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
    VERSION: '0.5.6',
    $: jQuery,
    _: lodash,
    Modernizr: Modernizr,
    Widgets: {}, // Widgets' classes namespace
    Templates: {} // Widgets' templates namespace
  };

  /* EXPORT */

  window.Svelto = Svelto;

}());

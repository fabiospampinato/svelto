
/* =========================================================================
 * Svelto - Core - Svelto
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/lodash/lodash.js
 * @require core/jquery/jquery.js
 * @require core/modernizr/modernizr.js
 * ========================================================================= */

(function () {

  'use strict';

  /* SVELTO */

  let Svelto = {

    VERSION: '0.7.15',
    ENVIRONMENT: 'production',
    DEVELOPMENT: false,

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

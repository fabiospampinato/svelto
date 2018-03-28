
// @require core/shims/shims.js
// @require core/lodash/lodash.js
// @require core/jquery/jquery.js
// @require core/modernizr/modernizr.js

(function () {

  /* SVELTO */

  let Svelto = {

    VERSION: '[pacco.svelto.version]',
    ENVIRONMENT: '[pacco.environment]',
    DEVELOPMENT: '[pacco.environment]' === 'development',

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

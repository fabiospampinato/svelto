
/* =========================================================================
 * Svelto - Tasks - Config - Defaults
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* DEFAULTS */

// All the properties of the active environment will be merged with the basic object
// Setting `isDevelopment: true` will basically make the build process faster, some plugins will be skipped and javascript will get partial compilation so it's much faster to watch and rebuild on changes

const defaults = {

  /* GENERAL */

  components: require ( './defaults/components' ),
  paths: require ( './defaults/paths' ),
  plugins: require ( './defaults/plugins' ),
  isDevelopment: false,

  /* ENVIRONMENT */

  environments: {
    demo: {
      paths: require ( './defaults/demo/paths' ),
      plugins: require ( './defaults/demo/plugins' ),
      isDevelopment: true
    },
    production: {}
  },
  environment: 'demo'

};

/* EXPORT */

module.exports = defaults;

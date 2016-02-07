
/* =========================================================================
 * Svelto - Tasks - Config - Defaults
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* DEFAULTS */

// All the properties of the active environment will be merged with the basic object
// Setting `isDevelopment: true` will basically make the build process faster, some plugins will be skipped and javascript will get partial compilation so it's much faster to watch and rebuild on changes

var defaults = {

  /* GENERAL */

  paths: require ( './defaults/paths' ),
  components: require ( './defaults/components' ),
  plugins: require ( './defaults/plugins' ),
  isDevelopment: false,

  /* ENVIRONMENT */

  environments: {
    production: {},
    development: {
      isDevelopment: true
    }
  },
  environment: 'production'

};

/* EXPORT */

module.exports = defaults;


/* =========================================================================
 * Svelto - Tasks - Config - Defaults - Demo - Plugins
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* PLUGINS */

const plugins = {
  babel: {
    enabled: false
  },
  closure: {
    enabled: false
  },
  extend: {
    options: {
      log: true
    }
  },
  filter: {
    options: {
      log: true
    }
  },
  imagemin: {
    enabled: false
  },
  jsonminify: {
    enabled: false
  },
  override: {
    options: {
      log: true
    }
  },
  postcss: {
    enabled: false
  },
  uglify: {
    enabled: false
  }
};

/* EXPORT */

module.exports = plugins;

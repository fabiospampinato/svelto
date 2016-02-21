
/* =========================================================================
 * Svelto - Tasks - Config - Defaults - Development (Plugins)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* PLUGINS */

var plugins = {
  babel: {
    enabled: false
  },
  cssnano: {
    enabled: false
  },
  dependencies: {
    options: {
      log: true
    }
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
  }
};

/* EXPORT */

module.exports = plugins;

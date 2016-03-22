
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
      log: true //FIXME: Set it back to `false`, anzi rimuovi completamente visto che è false di default
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
  },
  override: {
    options: {
      log: true
    }
  },
};

/* EXPORT */

module.exports = plugins;

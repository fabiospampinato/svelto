
/* =========================================================================
 * Svelto - Tasks - Config - Defaults - Development - Paths
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* PATHS */

var paths = {
  input: {
    javascript: {
      temp: 'demo/svelto/client/lib/**/*.js'
    }
  },
  output: {
    images: 'demo/public',
    javascript: {
      temp: 'demo/svelto/client/lib'
    },
    css: {
      uncompressed: 'demo/svelto/client/stylesheet/svelto.css'
    }
  },
  clean: ['dist', '.temp', 'demo/svelto']
};

/* EXPORT */

module.exports = paths;

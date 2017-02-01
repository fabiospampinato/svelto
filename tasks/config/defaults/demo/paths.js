
/* =========================================================================
 * Svelto - Tasks - Config - Defaults - Demo - Paths
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* PATHS */

const paths = {
  input: {
    javascript: {
      temp: 'demo/svelto/client/lib/**/*.js'
    }
  },
  output: {
    fonts: 'demo/public/fonts',
    images: 'demo/public/images',
    javascript: {
      temp: 'demo/svelto/client/lib'
    },
    css: {
      uncompressed: 'demo/svelto/client/stylesheet/svelto.css'
    }
  },
  clean: ['dist', '.temp', 'demo/svelto', 'demo/public/fonts', 'demo/public/images']
};

/* EXPORT */

module.exports = paths;

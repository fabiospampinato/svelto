
/* =========================================================================
 * Svelto - Tasks - Config - Defaults (Plugins)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRES */

var pngquant = require ( 'imagemin-pngquant' ),
    svgo     = require ( 'imagemin-svgo' );

/* PLUGINS */

var plugins = {
  autoprefixer: {
    enabled: true,
    options: {
      browsers: ['ie >= 10', 'ie_mob >= 10', 'ff >= 30', 'chrome >= 34', 'safari >= 7', 'opera >= 23', 'ios >= 7', 'android >= 4.4', 'bb >= 10'],
      cascade: true,
    }
  },
  babel: {
    enabled: true,
    options: {
      presets: ['es2015'],
      babelrc: false,
      compact: false
    }
  },
  clean: { //TODO: Replace with `rimraf`
    options: {
      read: false,
      force: false
    }
  },
  cssnano: {
    enabled: true,
    options: {
      autoprefixer: false,
      zindex: false
    }
  },
  dependencies: {
    options: {
      pattern: /\* @requires [\s-]*(.*\..*)/g
    }
  },
  imagemin: {
    enabled: false, //TODO: Re-enable, but fix it before
    options: {
      interlaced: true, // Affects GIF images
      progressive: true, // Affects JPG images
      optimizationLevel: 7, // Affects PNG images
      multipass: true, // Affects SVG images
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant (), svgo ()]
    }
  },
  sass: {
    options: {
      outputStyle: 'expanded',
      precision: 10
    }
  },
  uglify: {
    enabled: true,
    options: {}
  }
};

/* EXPORT */

module.exports = plugins;


/* =========================================================================
 * Svelto - Tasks - Config - Defaults (Plugins)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var path = require ( 'path' );

/* PLUGINS */

var plugins = {
  autoprefixer: {
    enabled: true,
    options: {
      browsers: ['ie >= 10', 'ie_mob >= 10', 'edge >= 13', 'ff >= 30', 'chrome >= 34', 'safari >= 7', 'opera >= 23', 'ios >= 7', 'android >= 4.4', 'bb >= 10'],
      cascade: true,
    }
  },
  babel: {
    enabled: true,
    options: {
      presets: [path.join ( process.cwd (), './node_modules/babel-preset-es2015' )], // We are using relative paths because if we add an external path (ie. `../ext`) to `config.paths.input.roots` it won't find the presets
      babelrc: false,
      compact: false
    }
  },
  del: {
    options: {
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
    enabled: true,
    options: {
      before: /@before[\s]+([\S]+\.[\S]+)[\s]*/g,
      require: /@require[\s]+([\S]+\.[\S]+)[\s]*/g,
      log: false
    }
  },
  extend: {
    enabled: true,
    options: {
      log: false
    }
  },
  filter: {
    enabled: true,
    options: {
      log: false
    }
  },
  github: {
    enabled: false,
    auth: {
      type: 'oauth',
      token: false
    }
  },
  imagemin: {
    enabled: true,
    options: {
      interlaced: true, // GIF
      progressive: true, // JPG
      optimizationLevel: 7, // PNG
      multipass: true, // SVG
      svgoPlugins: [{
        cleanupIDs: false,
        removeViewBox: false
      }]
    }
  },
  override: {
    enabled: true,
    options: {
      log: false
    }
  },
  sass: {
    enabled: true,
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

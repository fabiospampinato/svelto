
/* =========================================================================
 * Svelto - Tasks - Config - Defaults (Plugins)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const _       = require ( 'lodash' ),
     path     = require ( 'path' ),
     cssnano  = require ( 'cssnano' ),
     imagemin = require ( 'gulp-imagemin' );

/* PLUGINS */

const plugins = {
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
      presets: ['babel-preset-es2015'].map ( require.resolve ),
      babelrc: false,
      compact: false
    }
  },
  closure: {
    enabled: false,
    options: {
      assumeFunctionWrapper: true,
      compilationLevel: 'SIMPLE',
      languageIn: 'ECMASCRIPT5_STRICT',
      languageOut: 'ECMASCRIPT5_STRICT',
      outputWrapper: '(function(){\n%output%\n}).call(this)',
      warningLevel: 'QUIET'
    }
  },
  del: {
    options: {
      force: false
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
    plugins: [
      imagemin.gifsicle ({
        interlaced: true,
        optimizationLevel: 3
      }),
      imagemin.jpegtran ({
        progressive: true
      }),
      imagemin.optipng ({
        optimizationLevel: 7
      }),
      imagemin.svgo ({
        multipass: true,
        plugins: [{
          cleanupIDs: false,
        }, {
          removeViewBox: false
        }]
      })
    ],
    options: {}
  },
  jsonminify: {
    enabled: true,
    options: {}
  },
  override: {
    enabled: true,
    options: {
      log: false
    }
  },
  postcss: {
    enabled: true,
    plugins: [
      cssnano ({
        autoprefixer: false,
        normalizeUrl: false,
        svgo: false,
        zindex: false
      })
    ],
    options: {}
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

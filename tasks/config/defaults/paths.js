
/* =========================================================================
 * Svelto - Tasks - Config - Defaults (Paths)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

// `<root>` will be replaced with values defined in `roots`
// In order to extend Svelto just add another source root
// Source roots may be either relative: `ext`, `../ext` or absolute `/Users/me/ext`

/* PATHS */

var paths = {
  input: {
    roots: ['src'],
    fonts: '<root>/**/*.{eot,ttf,woff,woff2}',
    images: '<root>/**/*.{bmp,gif,ico,jpg,jpeg,png,svg}',
    javascript: {
      all: '<root>/**/*.js',
      temp: '.temp/javascript/**/*.js'
    },
    scss: {
      all: '<root>/**/*.scss',
      variables: '<root>/**/variables.scss',
      functions: '<root>/**/functions.scss',
      mixins: '<root>/**/mixins.scss',
      keyframes: '<root>/**/keyframes.scss',
      style: '<root>/**/!(variables.scss|functions.scss|mixins.scss|keyframes.scss)*.scss',
      temp: '.temp/scss/**/*.scss'
    }
  },
  output: {
    fonts: 'dist/fonts',
    images: 'dist/images',
    javascript: {
      uncompressed: 'dist/javascript/svelto.js',
      compressed: 'dist/javascript/svelto.min.js',
      temp: '.temp/javascript'
    },
    scss: {
      all: 'dist/scss/svelto.scss',
      variables: 'dist/scss/svelto.variables.scss',
      functions: 'dist/scss/svelto.functions.scss',
      mixins: 'dist/scss/svelto.mixins.scss',
      keyframes: 'dist/scss/svelto.keyframes.scss',
      style: 'dist/scss/svelto.style.scss',
      temp: '.temp/scss'
    },
    css: {
      uncompressed: 'dist/css/svelto.css',
      compressed: 'dist/css/svelto.min.css'
    }
  },
  clean: ['dist', '.temp']
};

/* EXPORT */

module.exports = paths;

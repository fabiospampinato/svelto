
/* =========================================================================
 * Svelto - Tasks - Config - Defaults (Paths)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

//TODO: Make it easier to add a now folder as input (why not, even easier to output to different paths)

/* PATHS */

var paths = {
  input: {
    fonts: 'src/**/*.{eot,ttf,woff,woff2}',
    images: 'src/**/*.{bmp,gif,ico,jpg,jpeg,png,svg}',
    javascript: {
      all: 'src/**/*.js',
      temp: '.temp/javascript/**/*.js'
    },
    scss: {
      all: 'src/**/*.scss',
      variables: 'src/**/variables.scss',
      functions: 'src/**/functions.scss',
      mixins: 'src/**/mixins.scss',
      keyframes: 'src/**/keyframes.scss',
      style: ['src/**/*.scss', '!src/**/variables.scss', '!src/**/functions.scss', '!src/**/mixins.scss', '!src/**/keyframes.scss'],
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


/* =========================================================================
 * Svelto - Tasks - Config - Defaults (Paths)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* PATHS */

var paths = {
  input: {
    fonts: 'src/**/*.{eot,ttf,woff,woff2}',
    images: 'src/**/*.{bmp,gif,ico,jpg,jpeg,png,svg}',
    javascript: {
      all: 'src/**/*.js', //TODO: Maybe rename it
      temp: '.temp/js/**/*.js'
    },
    scss: {
      all: 'src/**/*.scss', //TODO: Maybe rename it
      variables: ['src/**/variables.scss', 'src/variables/**/*.scss'],
      mixins: ['src/**/mixins.scss', 'src/mixins/**/*.scss'],
      style: ['src/**/*.scss', '!src/**/variables.scss', '!src/variables/**/*.scss', '!src/**/mixins.scss', '!src/mixins/**/*.scss'],
      temp: '.temp/scss/**/*.scss'
    }
  },
  output: {
    fonts: 'dist/fonts',
    images: 'dist/images',
    javascript: {
      uncompressed: 'dist/js/svelto.js',
      compressed: 'dist/js/svelto.min.js',
      temp: '.temp/js'
    },
    scss: {
      all: 'dist/scss/svelto.scss', //TODO: Maybe rename it
      variables: 'dist/scss/svelto.variables.scss',
      mixins: 'dist/scss/svelto.mixins.scss',
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


/* =========================================================================
 * Svelto - Tasks - Config - Defaults (Paths)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

// `[token]` will be replaced with values defined in `tokens`
// In order to extend Svelto just add another source to `tokens.src`
// Sources may be either relative: `ext`, `../ext` or absolute `/Users/me/ext`

/* PATHS */

const paths = {
  tokens: {
    src: ['src'],
    dist: 'dist',
    temp: '.temp',
    bundle: 'svelto'
    //TODO: Add an `env`/`environment` token
  },
  input: {
    json: '[src]/**/*.json',
    fonts: '[src]/**/*.{eot,ttf,woff,woff2}',
    images: '[src]/**/*.{bmp,gif,ico,jpg,jpeg,png,svg}',
    javascript: {
      all: '[src]/**/*.js',
      temp: '[temp]/javascript/**/*.js'
    },
    scss: {
      all: '[src]/**/*.scss',
      variables: '[src]/**/variables*.scss',
      functions: '[src]/**/functions*.scss',
      mixins: '[src]/**/mixins*.scss',
      keyframes: '[src]/**/keyframes*.scss',
      style: ['[src]/**/*.scss', '![src]/**/variables*.scss', '![src]/**/functions*.scss', '![src]/**/mixins*.scss', '![src]/**/keyframes*.scss'],
      temp: '[temp]/scss/**/*.scss'
    }
  },
  output: {
    json: '[dist]/json',
    fonts: '[dist]/fonts',
    images: '[dist]/images',
    javascript: {
      uncompressed: '[dist]/javascript/[bundle].js',
      compressed: '[dist]/javascript/[bundle].min.js',
      temp: '[temp]/javascript'
    },
    scss: {
      all: '[dist]/scss/[bundle].scss',
      variables: '[dist]/scss/[bundle].variables.scss',
      functions: '[dist]/scss/[bundle].functions.scss',
      mixins: '[dist]/scss/[bundle].mixins.scss',
      keyframes: '[dist]/scss/[bundle].keyframes.scss',
      style: '[dist]/scss/[bundle].style.scss',
      temp: '[temp]/scss'
    },
    css: {
      uncompressed: '[dist]/css/[bundle].css',
      compressed: '[dist]/css/[bundle].min.css'
    }
  },
  clean: ['[dist]', '[temp]']
};

/* EXPORT */

module.exports = paths;

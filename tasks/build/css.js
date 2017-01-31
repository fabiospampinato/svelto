
/* =========================================================================
 * Svelto - Tasks - Build - CSS
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp         = require ( 'gulp' ),
      autoprefixer = require ( 'gulp-autoprefixer' ),
      gulpif       = require ( 'gulp-if' ),
      newer        = require ( 'gulp-newer' ),
      plumber      = require ( 'gulp-plumber' ),
      postcss      = require ( 'gulp-postcss' ),
      rename       = require ( 'gulp-rename' ),
      sass         = require ( 'gulp-sass' ),
      changed      = require ( '../utilities/changed' ),
      log          = require ( '../utilities/log' ),
      output       = require ( '../utilities/output' ),
      plugins      = require ( '../config/project' ).plugins;

/* TASK */

function task () {

  const needUpdate = changed.plugins ( 'sass', 'autoprefixer', 'postcss' );

  return gulp.src ( output.getPath ( 'scss.all' ) )
             .pipe ( plumber ( log.error ) )
             .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'css.uncompressed' ) ) ) )
             .pipe ( gulpif ( plugins.sass.enabled, sass ( plugins.sass.options ) ) )
             .pipe ( gulpif ( plugins.autoprefixer.enabled, autoprefixer ( plugins.autoprefixer.options ) ) )
             .pipe ( rename ( output.getName ( 'css.uncompressed' ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'css.uncompressed' ) ) )
             .pipe ( gulpif ( plugins.postcss.enabled, postcss ( plugins.postcss.plugins, plugins.postcss.options ) ) )
             .pipe ( rename ( output.getName ( 'css.compressed' ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'css.compressed' ) ) );

}

task.description = '[ALL] Build css';

/* GULP */

gulp.task ( 'build-css', task );

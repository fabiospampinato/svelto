
/* =========================================================================
 * Svelto - Tasks - Build - Images
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp     = require ( 'gulp' ),
      bytediff = require ( 'gulp-bytediff' ),
      flatten  = require ( 'gulp-flatten' ),
      gulpif   = require ( 'gulp-if' ),
      imagemin = require ( 'gulp-imagemin' ),
      newer    = require ( 'gulp-newer' ),
      plumber  = require ( 'gulp-plumber' ),
      touch    = require ( 'gulp-touch' ),
      changed  = require ( '../utilities/changed' ),
      log      = require ( '../utilities/log' ),
      input    = require ( '../utilities/input' ),
      output   = require ( '../utilities/output' ),
      filter   = require ( '../plugins/filter' ),
      override = require ( '../plugins/override' ),
      plugins  = require ( '../config/project' ).plugins;

/* TASK */

function task () {

  const needUpdate = changed.plugins ( 'override', 'imagemin' );

  return gulp.src ( input.getPath ( 'images' ) )
             .pipe ( plumber ( log.error ) )
             .pipe ( gulpif ( plugins.filter.enabled, filter ( plugins.filter.options ) ) )
             .pipe ( gulpif ( plugins.override.enabled, override ( plugins.override.options ) ) )
             .pipe ( flatten () )
             .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'images' ) ) ) )
             .pipe ( gulpif ( plugins.imagemin.enabled, bytediff.start () ) )
             .pipe ( gulpif ( plugins.imagemin.enabled, imagemin ( plugins.imagemin.plugins, plugins.imagemin.options ) ) )
             .pipe ( gulpif ( plugins.imagemin.enabled, bytediff.stop () ) )
             .pipe ( gulp.dest ( output.getPath ( 'images' ) ) )
             .pipe ( touch () );

}

task.description = '[ALL] Build images';

/* GULP */

gulp.task ( 'build-images', task );

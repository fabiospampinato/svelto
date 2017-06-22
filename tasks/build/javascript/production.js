
/* =========================================================================
 * Svelto - Tasks - Build - Javascript - Production
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp         = require ( 'gulp' ),
      babel        = require ( 'gulp-babel' ),
      closure      = require ( 'google-closure-compiler-js' ).gulp (),
      concat       = require ( 'gulp-concat' ),
      flatten      = require ( 'gulp-flatten' ),
      gulpif       = require ( 'gulp-if' ),
      newer        = require ( 'gulp-newer' ),
      plumber      = require ( 'gulp-plumber' ),
      rename       = require ( 'gulp-rename' ),
      touch        = require ( 'gulp-touch-cmd' ),
      uglify       = require ( 'gulp-uglify' ),
      changed      = require ( '../../utilities/changed' ),
      log          = require ( '../../utilities/log' ),
      input        = require ( '../../utilities/input' ),
      output       = require ( '../../utilities/output' ),
      dependencies = require ( '../../plugins/dependencies' ),
      extend       = require ( '../../plugins/extend' ),
      filter       = require ( '../../plugins/filter' ),
      override     = require ( '../../plugins/override' ),
      plugins      = require ( '../../config/project' ).plugins;

/* TASK */

function task () {

  const needUpdate = changed.project ( 'components' ) || changed.plugins ( 'filter', 'override', 'dependencies', 'extend', 'babel', 'uglify', 'closure' );

  return gulp.src ( input.getPath ( 'javascript.all' ) )
             .pipe ( plumber ( log.error ) )
             .pipe ( gulpif ( plugins.filter.enabled, filter ( plugins.filter.options ) ) )
             .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'javascript.uncompressed' ) ) ) )
             .pipe ( gulpif ( plugins.override.enabled, override ( plugins.override.options ) ) )
             .pipe ( gulpif ( plugins.dependencies.enabled, dependencies ( plugins.dependencies.options ) ) )
             .pipe ( gulpif ( plugins.extend.enabled, extend ( plugins.extend.options ) ) )
             .pipe ( flatten () )
             .pipe ( concat ( output.getName ( 'javascript.uncompressed' ) ) )
             .pipe ( gulpif ( plugins.babel.enabled, babel ( plugins.babel.options ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'javascript.uncompressed' ) ) )
             .pipe ( gulpif ( plugins.uglify.enabled, uglify ( plugins.uglify.options ) ) )
             .pipe ( gulpif ( plugins.closure.enabled, closure ( plugins.closure.options ) ) )
             .pipe ( rename ( output.getName ( 'javascript.compressed' ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'javascript.compressed' ) ) )
             .pipe ( touch () );

}

task.description = '[DEV] Build production javascript';

/* GULP */

gulp.task ( 'build-javascript-production', task );

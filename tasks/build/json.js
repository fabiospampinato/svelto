
/* =========================================================================
 * Svelto - Tasks - Build - JSON
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp       = require ( 'gulp' ),
      flatten    = require ( 'gulp-flatten' ),
      gulpif     = require ( 'gulp-if' ),
      jsonminify = require ( 'gulp-jsonminify' ),
      newer      = require ( 'gulp-newer' ),
      plumber    = require ( 'gulp-plumber' ),
      touch      = require ( 'gulp-touch' ),
      changed    = require ( '../utilities/changed' ),
      log        = require ( '../utilities/log' ),
      input      = require ( '../utilities/input' ),
      output     = require ( '../utilities/output' ),
      filter     = require ( '../plugins/filter' ),
      override   = require ( '../plugins/override' ),
      plugins    = require ( '../config/project' ).plugins;

/* TASK */

function task () {

  const needUpdate = changed.plugins ( 'override', 'jsonminify' );

  return gulp.src ( input.getPath ( 'json' ) )
             .pipe ( plumber ( log.error ) )
             .pipe ( gulpif ( plugins.filter.enabled, filter ( plugins.filter.options ) ) )
             .pipe ( gulpif ( plugins.override.enabled, override ( plugins.override.options ) ) )
             .pipe ( flatten () )
             .pipe ( gulpif ( !needUpdate, newer ( output.getDir ( 'json' ) ) ) )
             .pipe ( gulpif ( plugins.jsonminify.enabled, jsonminify ( plugins.jsonminify.options ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'json' ) ) )
             .pipe ( touch () );

}

task.description = '[ALL] Build json';

/* GULP */

gulp.task ( 'build-json', task );

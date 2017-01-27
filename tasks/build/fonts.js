
/* =========================================================================
 * Svelto - Tasks - Build - Fonts
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp     = require ( 'gulp' ),
      gulpif   = require ( 'gulp-if' ),
      flatten  = require ( 'gulp-flatten' ),
      newer    = require ( 'gulp-newer' ),
      changed  = require ( '../utilities/changed' ),
      input    = require ( '../utilities/input' ),
      output   = require ( '../utilities/output' ),
      plugins  = require ( '../config/project' ).plugins,
      filter   = require ( '../plugins/filter' ),
      override = require ( '../plugins/override' );

/* TASK */

function task () {

  const needUpdate = changed.plugin ( 'override' );

  return gulp.src ( input.getPath ( 'fonts' ) )
             .pipe ( gulpif ( plugins.filter.enabled, filter ( plugins.filter.options ) ) )
             .pipe ( gulpif ( plugins.override.enabled, override ( plugins.override.options ) ) )
             .pipe ( flatten () )
             .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'fonts' ) ) ) )
             .pipe ( gulp.dest ( output.getPath ( 'fonts' ) ) );

}

task.description = '[ALL] Build fonts';

/* GULP */

gulp.task ( 'build-fonts', task );

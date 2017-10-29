
/* =========================================================================
 * Svelto - Tasks - Watch - JSON
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp  = require ( 'gulp' ),
      input = require ( '../utilities/paths/input' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'json' ), gulp.task ( 'build-json' ) );

}

task.description = '[ALL] Watch json';

/* GULP */

gulp.task ( 'watch-json', task );

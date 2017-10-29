
/* =========================================================================
 * Svelto - Tasks - Watch - Javascript
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp  = require ( 'gulp' ),
      input = require ( '../utilities/paths/input' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'javascript.all' ), gulp.task ( 'build-javascript' ) );

}

task.description = '[ALL] Watch javascript';

/* GULP */

gulp.task ( 'watch-javascript', task );

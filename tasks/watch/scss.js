
/* =========================================================================
 * Svelto - Tasks - Watch - SCSS
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp  = require ( 'gulp' );
      input = require ( '../utilities/input' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'scss.all' ), gulp.task ( 'build-style' ) );

}

task.description = '[ALL] Watch scss';

/* GULP */

gulp.task ( 'watch-scss', task );

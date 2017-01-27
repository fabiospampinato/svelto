
/* =========================================================================
 * Svelto - Tasks - Watch - Fonts
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp  = require ( 'gulp' ),
      input = require ( '../utilities/input' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'fonts' ), gulp.task ( 'build-fonts' ) );

}

task.description = '[ALL] Watch fonts';

/* GULP */

gulp.task ( 'watch-fonts', task );

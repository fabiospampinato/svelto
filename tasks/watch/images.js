
/* =========================================================================
 * Svelto - Tasks - Watch - Images
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp  = require ( 'gulp' ),
      input = require ( '../utilities/input' );

/* TASK */

function task () {

  return gulp.watch ( input.getPath ( 'images' ), gulp.task ( 'build-images' ) );

}

task.description = '[ALL] Watch images';

/* GULP */

gulp.task ( 'watch-images', task );

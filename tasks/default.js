
/* =========================================================================
 * Svelto - Tasks - Default
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp = require ( 'gulp' );

/* TASK */

const task = gulp.series ( 'build', gulp.parallel ( 'watch', 'demo' ) );

task.description = 'Build, watch and serve the demo';

/* GULP */

gulp.task ( 'default', task );

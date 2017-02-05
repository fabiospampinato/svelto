
/* =========================================================================
 * Svelto - Tasks - Clean - Style
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp = require ( 'gulp' );

/* TASK */

let task = gulp.parallel ( 'clean-scss', 'clean-css' );

task.description = '[ALL] Clean generated style';

/* GULP */

gulp.task ( 'clean-style', task );

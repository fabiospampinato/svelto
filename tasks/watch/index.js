
/* =========================================================================
 * Svelto - Tasks - Watch
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp = require ( 'gulp' );

/* TASK */

const task = gulp.parallel ( 'watch-fonts', 'watch-images', 'watch-javascript', 'watch-scss' );

task.description = 'Watch for changes and auto build';

/* GULP */

gulp.task ( 'watch', task );

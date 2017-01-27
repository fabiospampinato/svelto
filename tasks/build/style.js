
/* =========================================================================
 * Svelto - Tasks - Build - Style
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp = require ( 'gulp' );

/* TASK */

const task = gulp.series ( 'build-scss-parts', 'build-scss', 'build-css' );

task.description = '[ALL] Build scss and css';

/* GULP */

gulp.task ( 'build-style', task );

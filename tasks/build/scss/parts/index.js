
/* =========================================================================
 * Svelto - Tasks - Build - SCSS - Parts
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp = require ( 'gulp' );

/* PARTS */

const parts = ['functions', 'mixins', 'variables', 'keyframes', 'style'].map ( part => `build-scss-${part}` );

/* TASK */

const task = gulp.series ( ...parts );

task.description = '[ALL] Build scss parts';

/* GULP */

gulp.task ( 'build-scss-parts', task );

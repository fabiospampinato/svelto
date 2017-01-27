
/* =========================================================================
 * Svelto - Tasks - Build - SCSS - Parts - Variables
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp    = require ( 'gulp' ),
      general = require ( './general' );

/* TASK */

const task = () => general ( 'variables', false );

task.description = '[DEV] Build scss variables';

/* GULP */

gulp.task ( 'build-scss-variables', task );

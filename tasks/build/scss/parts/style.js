
/* =========================================================================
 * Svelto - Tasks - Build - SCSS - Parts - Style
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp    = require ( 'gulp' ),
      general = require ( './general' );

/* TASK */

const task = () => general ( 'style', true );

task.description = '[DEV] Build scss style';

/* GULP */

gulp.task ( 'build-scss-style', task );

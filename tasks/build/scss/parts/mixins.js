
/* =========================================================================
 * Svelto - Tasks - Build - SCSS - Parts - Mixins
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp    = require ( 'gulp' ),
      general = require ( './general' );

/* TASK */

const task = () => general ( 'mixins', false );

task.description = '[DEV] Build scss mixins';

/* GULP */

gulp.task ( 'build-scss-mixins', task );

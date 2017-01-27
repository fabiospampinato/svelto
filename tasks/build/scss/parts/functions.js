
/* =========================================================================
 * Svelto - Tasks - Build - SCSS - Parts - Functions
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp    = require ( 'gulp' ),
      general = require ( './general' );

/* TASK */

const task = () => general ( 'functions', false );

task.description = '[DEV] Build scss functions';

/* GULP */

gulp.task ( 'build-scss-functions', task );

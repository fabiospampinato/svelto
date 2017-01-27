
/* =========================================================================
 * Svelto - Tasks - Admin - Publish
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp = require ( 'gulp' );

/* TASK */

const task = gulp.series ( 'publish-npm', 'publish-meteor' );

task.description = '[ADMIN] Publish Svelto';

/* GULP */

gulp.task ( 'publish', task );

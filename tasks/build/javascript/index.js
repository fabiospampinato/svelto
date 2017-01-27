
/* =========================================================================
 * Svelto - Tasks - Build - Javascript
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp    = require ( 'gulp' ),
      project = require ( '../../config/project' );

/* TASK */

const task = project.isDevelopment ? gulp.series ( 'build-javascript-temp', 'build-javascript-development' ) : gulp.task ( 'build-javascript-production' );

task.description = '[ALL] Build javascript';

/* GULP */

gulp.task ( 'build-javascript', task );

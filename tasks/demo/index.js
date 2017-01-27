
/* =========================================================================
 * Svelto - Tasks - Demo
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const gulp = require ( 'gulp' ),
      log  = require ( '../utilities/log' );

/* TASK */

const task = gulp.parallel ( 'demo-browser-sync', 'demo-meteor' );

task.description = 'Serve the demo ' + log.options ( ['port', 3333], ['bsport', 4444], ['uiport', 5555] );

/* GULP */

gulp.task ( 'demo', task );

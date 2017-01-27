
/* =========================================================================
 * Svelto - Tasks - Admin - Publish - NPM
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const spawn = require ( 'child_process' ).spawn,
      gulp  = require ( 'gulp' );

/* TASK */

function task () {

  return spawn ( 'npm', ['publish'] );

}

task.description = '[ADMIN] [ALL] Publish Svelto to npm';

/* GULP */

gulp.task ( 'publish-npm', task );


/* =========================================================================
 * Svelto - Tasks - Admin - Publish - Meteor
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const spawn = require ( 'child_process' ).spawn,
      gulp  = require ( 'gulp' );

/* TASK */

function task () {

  return spawn ( 'meteor', ['publish'] );

}

task.description = '[ADMIN] [ALL] Publish Svelto to Meteor';

/* GULP */

gulp.task ( 'publish-meteor', task );

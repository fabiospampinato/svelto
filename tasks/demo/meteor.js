
/* =========================================================================
 * Svelto - Tasks - Demo - Meteor
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const _     = require ( 'lodash' ),
      argv  = require ( 'yargs' ).argv,
      path  = require ( 'path' ),
      spawn = require ( 'child_process' ).spawn,
      gulp  = require ( 'gulp' ),
      log   = require ( '../utilities/log' );

/* TASK */

function task () {

  const demoPath = path.join ( process.cwd (), '/demo' ),
        port     = !_.isNaN ( Number ( argv.port ) ) ? Number ( argv.port ) : 3333;

  return spawn ( 'meteor', ['run', '--port', port], { cwd: demoPath, stdio: 'inherit' } );

}

task.description = '[ALL] Start Meteor ' + log.options ( ['port', 3333] );

/* GULP */

gulp.task ( 'demo-meteor', task );

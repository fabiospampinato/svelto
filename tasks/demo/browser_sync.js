
/* =========================================================================
 * Svelto - Tasks - Demo - Browser Sync
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
        port     = !_.isNaN ( Number ( argv.port ) )   ? Number ( argv.port )   : 3333,
        bsport   = !_.isNaN ( Number ( argv.bsport ) ) ? Number ( argv.bsport ) : 4444,
        uiport   = !_.isNaN ( Number ( argv.uiport ) ) ? Number ( argv.uiport ) : 5555;

  return spawn ( 'browser-sync', ['start', '--port', bsport, '--ui-port', uiport, '--proxy', `localhost:${port}`, '--no-open', '--files', '**/*.html, **/*.js, **/*.css'], { cwd: demoPath, stdio: 'inherit' } );

}

task.description = '[ALL] Start Browser Sync ' + log.options ( ['port', 3333], ['bsport', 4444], ['uiport', 5555] );

/* GULP */

gulp.task ( 'demo-browser-sync', task );


/* =========================================================================
 * Svelto - Tasks - Help
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

// Tasks containing `[DEV]` in the description will only be displayed on `--dev`
// Tasks containing `[ALL]` in the description will only be displayed on `--dev` or `--all`
// Tasks containing `[ADMIN]` in the description will only be displayed on `--dev`, `--admin` or if github is enabled

/* REQUIRE */

const _       = require ( 'lodash' ),
      argv    = require ( 'yargs' ).argv,
      spawn   = require ( 'child_process' ).spawn,
      gulp    = require ( 'gulp' ),
      log     = require ( './utilities/log' ),
      plugins = require ( './config/project' ).plugins;

/* TASK */

function task () {

  let command = 'gulp --tasks --depth 0 --color';

  command += argv.dev
               ? ' | sed "s/\\[DEV\\] //g"' // Strip out `[DEV] `
               : ' | grep "\\[DEV\\]" -v'; // Filter out tasks containing `[DEV]`

  command += argv.dev || argv.admin || plugins.github.enabled
               ? ' | sed "s/\\[ADMIN\\] //g"' // Strip out `[ADMIN] `
               : ' | grep "\\[ADMIN\\]" -v'; // Filter out tasks containing `[ADMIN]`

  command += argv.dev || argv.all
               ? ' | sed "s/\\[ALL\\] //g"' // Strip out `[ALL] `
               : ' | grep "\\[ALL\\]" -v'; // Filter out tasks containing `[ALL]`

  return spawn ( 'bash', ['-c', command], { stdio: 'inherit' } );

}

task.description = 'List available tasks ' + log.options ( ['all'], ['admin'], ['dev'] );

/* GULP */

gulp.task ( 'help', task );

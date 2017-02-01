
/* =========================================================================
 * Svelto - Tasks - Admin - Bump - NPM
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const argv  = require ( 'yargs' ).argv,
      gulp  = require ( 'gulp' ),
      bump  = require ( 'gulp-bump' ),
      touch = require ( 'gulp-touch' ),
      log   = require ( '../../utilities/log' );

/* TASK */

function task () {

  return gulp.src ( './package.json' )
             .pipe ( bump ({
               type:    argv.type,
               version: argv.version,
               preid:   argv.preid || 'beta'
             }))
             .pipe ( gulp.dest ( './' ) )
             .pipe ( touch () );

}

task.description = '[ADMIN] [ALL] Bump npm version ' + log.options ( ['type', ['major', 'minor', 'patch', 'prerelease']], ['version', 'mayout.minor.patch'], ['preid', 'beta'] );;

/* GULP */

gulp.task ( 'bump-npm', task );

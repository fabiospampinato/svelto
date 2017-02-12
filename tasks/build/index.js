
/* =========================================================================
 * Svelto - Tasks - Build
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const notifier = require ( 'node-notifier' ),
      path     = require ( 'path' ),
      gulp     = require ( 'gulp' ),
      project  = require ( '../config/project' ),
      log      = require ( '../utilities/log' );

/* NOTIFY */

function notify ( done ) {

  notifier.notify ({
    title: `Built [${project.environment}]`,
    message: 'Svelto is ready to be used',
    icon: path.join ( process.cwd (), 'logo.png' ),
    sound: 'Glass',
    wait: false
  }, done );

}

/* TASK */

const task = gulp.series ( gulp.parallel ( 'build-json', 'build-fonts', 'build-images', 'build-javascript', 'build-style' ), notify );

task.description = 'Build Svelto ' + log.options ( ['env', '*'], ['environment', '*'], ['fresh'] );

/* GULP */

gulp.task ( 'build', task );

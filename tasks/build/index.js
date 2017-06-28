
/* =========================================================================
 * Svelto - Tasks - Build
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const _            = require ( 'lodash' ),
      notifier     = require ( 'node-notifier' ),
      path         = require ( 'path' ),
      gulp         = require ( 'gulp' ),
      project      = require ( '../config/project' ),
      environments = require ( '../utilities/environments' );
      log          = require ( '../utilities/log' );

/* NOTIFY */

function notify ( done ) {

  const envsPretty = environments.pretty ( project.environment ),
        icon = path.join ( process.cwd (), 'logo.png' );

  notifier.notify ({
    title: `Built [${envsPretty}]`,
    message: 'Svelto is ready to be used',
    icon,
    sound: 'Glass',
    wait: false
  }, done );

}

/* TASK */

const task = gulp.series ( gulp.parallel ( 'build-json', 'build-fonts', 'build-images', 'build-javascript', 'build-style' ), notify );

task.description = 'Build Svelto ' + log.options ( ['env', '*'], ['envs', '*,*'], ['environment', '*'], ['environments', '*,*'], ['fresh'] );

/* GULP */

gulp.task ( 'build', task );

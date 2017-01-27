
/* =========================================================================
 * Svelto - Tasks - Version
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const _       = require ( 'lodash' ),
      gulp    = require ( 'gulp' ),
      release = require ( './config/release' );

/* TASK */

function task ( done ) {

  const name = _.upperFirst ( release.name ),
        version = release.version;

  console.log ( `${name} version: ${version}` );

  done ();

}

task.description = 'Display Svelto\'s version';

/* GULP */

gulp.task ( 'version', task );

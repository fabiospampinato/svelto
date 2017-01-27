
/* =========================================================================
 * Svelto - Tasks - Admin - Release
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const _       = require ( 'lodash' ),
      argv    = require ( 'yargs' ).argv,
      gulp    = require ( 'gulp' ),
      github  = require ( '../config/github' ),
      release = require ( '../config/release' );

/* TASK */

function task ( done ) {

  const name = `v${release.version}`;

  github.releases.createRelease ( _.extend ( {}, argv, {
    owner: 'svelto',
    repo: 'svelto',
    tag_name: name,
    name,
    prerelease: release.version.includes ( '-' )
  }), done );

}

task.description = '[ADMIN] Create a new Svelto release';

/* GULP */

gulp.task ( 'release', task );

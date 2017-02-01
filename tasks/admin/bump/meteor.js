
/* =========================================================================
 * Svelto - Tasks - Admin - Bump - Meteor
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const fs      = require ( 'fs' ),
      gulp    = require ( 'gulp' ),
      replace = require ( 'gulp-replace' ),
      touch   = require ( 'gulp-touch' );

/* TASK */

function task () {

  const version = JSON.parse ( fs.readFileSync ( './package.json', 'utf8' ) ).version; // We are not using `require` in order to avoid to get a cached value

  return gulp.src ( './package.js' )
             .pipe ( replace ( /version: '(.*)'/, `version: '${version}'` ) )
             .pipe ( gulp.dest ( './' ) )
             .pipe ( touch () );

}

task.description = '[ADMIN] [ALL] Bump Meteor version';

/* GULP */

gulp.task ( 'bump-meteor', task );

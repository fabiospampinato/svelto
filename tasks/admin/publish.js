
/* =========================================================================
 * Svelto - Tasks - Admin - Publish
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var spawn = require ( 'child_process' ).spawn,
    log   = require ( '../utilities/log' ),
    gulp  = require ( 'gulp-help' )( require ( 'gulp' ) );

/* PUBLISH */

gulp.task ( 'publish', 'Publish Svelto', function () {

  var npm = spawn ( 'npm', ['publish'] );

  npm.stdout.on ( 'data', log.buffer );
  npm.stderr.on ( 'data', log.buffer );

  var atmosphere = spawn ( 'meteor', ['publish'] );

  atmosphere.stdout.on ( 'data', log.buffer );
  atmosphere.stderr.on ( 'data', log.buffer );

});

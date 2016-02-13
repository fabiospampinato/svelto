
/* =========================================================================
 * Svelto - Tasks - Admin - Publish
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var spawn  = require ( 'child_process' ).spawn,
    buffer = require ( '../utilities/buffer' ),
    gulp   = require ( 'gulp-help' )( require ( 'gulp' ) );

/* PUBLISH */

gulp.task ( 'publish', 'Publish Svelto', function () {

  var npm = spawn ( 'npm', ['publish'] );

  npm.stdout.on ( 'data', buffer.log );
  npm.stderr.on ( 'data', buffer.log );

  var atmosphere = spawn ( 'meteor', ['publish'] );

  atmosphere.stdout.on ( 'data', buffer.log );
  atmosphere.stderr.on ( 'data', buffer.log );

});

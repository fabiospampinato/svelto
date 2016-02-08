
/* =========================================================================
 * Svelto - Tasks - Demo
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var path  = require ( 'path' ),
    spawn = require ( 'child_process' ).spawn,
    gulp  = require ( 'gulp-help' )( require ( 'gulp' ) );

/* UTILITIES */

var logBuffer = function ( buffer ) {

  console.log ( buffer.toString ( 'utf8' ) );

};

/* DEMO */

gulp.task ( 'demo', 'Serve the demos', function () {

  var meteor = spawn ( 'meteor', ['run', '--port', '3030'], { cwd: path.join ( process.cwd (), '/demo' ) } );

  meteor.stdout.on ( 'data', logBuffer );
  meteor.stderr.on ( 'data', logBuffer );

}, {

  aliases: ['serve-demo']

});

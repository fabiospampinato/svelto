
/* =========================================================================
 * Svelto - Tasks - Build
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var notifier = require ( 'node-notifier' ),
    path     = require ( 'path' ),
    project  = require ( './config/project' ),
    gulp     = require ( 'gulp-help' )( require ( 'gulp' ) );

/* BUILD */

gulp.task ( 'build', 'Build Svelto', ['build-fonts', 'build-images', 'build-javascript', 'build-css'], function () {

  return notifier.notify ({
           title: 'Built [' + project.environment + ']',
           message: 'Svelto is ready to be used',
           icon: path.join ( process.cwd (), 'logo.png' ),
           sound: 'Glass',
           wait: false
         });

});

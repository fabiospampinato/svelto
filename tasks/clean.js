
/* =========================================================================
 * Svelto - Tasks - Clean
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRES */

var project  = require ( './config/project' ),
    plugins  = project.plugins,
    gulp     = require ( 'gulp-help' )( require ( 'gulp' ) ),
    clean    = require ( 'gulp-clean' );

/* CLEAN */

gulp.task ( 'clean', 'Clean builded and temporary files', function () {

  return gulp.src ( project.paths.clean )
             .pipe ( clean ( plugins.clean.options ) );

});

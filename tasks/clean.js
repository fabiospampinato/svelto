
/* =========================================================================
 * Svelto - Tasks - Clean
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRES */

var del     = require ( 'del' ),
    project = require ( './config/project' ),
    plugins = project.plugins,
    gulp    = require ( 'gulp-help' )( require ( 'gulp' ) );

/* CLEAN */

gulp.task ( 'clean', 'Clean builded and temporary files', function () {

  return del ( project.paths.clean, plugins.del.options );

});

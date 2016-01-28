
/* =========================================================================
 * Svelto - Tasks - Build - CSS
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var env          = require ( '../../config/environment' ),
    plugins      = require ( '../../config/project' ).plugins,
    util         = require ( '../../others/utilities' ),
    gulp         = require ( 'gulp-help' )( require ( 'gulp' ) ),
    autoprefixer = require ( 'gulp-autoprefixer' ),
    cssnano      = require ( 'gulp-cssnano' ),
    gulpif       = require ( 'gulp-if' ),
    newer        = require ( 'gulp-newer' ),
    rename       = require ( 'gulp-rename' ),
    sass         = require ( 'gulp-sass' );

/* CSS */

gulp.task ( 'build-css', 'Build CSS', ['build-scss'], function () {

 return gulp.src ( util.output.getPath ( 'scss.full' ) )
            .pipe ( newer ( util.output.getPath ( 'css.uncompressed' ) ) )
            .pipe ( sass ( plugins.sass ).on ( 'error', sass.logError ) )
            .pipe ( gulpif ( plugins.autoprefixer.enabled, autoprefixer ( plugins.autoprefixer ) ) )
            .pipe ( rename ( util.output.getName ( 'css.uncompressed' ) ) )
            .pipe ( gulp.dest ( util.output.getDir ( 'css.uncompressed' ) ) )
            .pipe ( gulpif ( plugins.cssnano.enabled && !env.isDevelopment, cssnano ( plugins.cssnano ) ) )
            .pipe ( rename ( util.output.getName ( 'css.compressed' ) ) )
            .pipe ( gulp.dest ( util.output.getDir ( 'css.compressed' ) ) );

});

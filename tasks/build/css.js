
/* =========================================================================
 * Svelto - Tasks - Build - CSS
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var env          = require ( '../config/environment' ),
    output       = require ( '../utilities/output' ),
    plugins      = require ( '../config/project' ).plugins,
    gulp         = require ( 'gulp-help' )( require ( 'gulp' ) ),
    autoprefixer = require ( 'gulp-autoprefixer' ),
    cssnano      = require ( 'gulp-cssnano' ),
    gulpif       = require ( 'gulp-if' ),
    newer        = require ( 'gulp-newer' ),
    rename       = require ( 'gulp-rename' ),
    sass         = require ( 'gulp-sass' );

/* CSS */

gulp.task ( 'build-css', 'Build CSS', ['build-scss'], function () {

 return gulp.src ( output.getPath ( 'scss.all' ) )
            .pipe ( newer ( output.getPath ( 'css.uncompressed' ) ) )
            .pipe ( sass ( plugins.sass.options ).on ( 'error', sass.logError ) )
            .pipe ( gulpif ( plugins.autoprefixer.enabled, autoprefixer ( plugins.autoprefixer.options ) ) )
            .pipe ( rename ( output.getName ( 'css.uncompressed' ) ) )
            .pipe ( gulp.dest ( output.getDir ( 'css.uncompressed' ) ) )
            .pipe ( gulpif ( plugins.cssnano.enabled && !env.isDevelopment, cssnano ( plugins.cssnano.options ) ) )
            .pipe ( rename ( output.getName ( 'css.compressed' ) ) )
            .pipe ( gulp.dest ( output.getDir ( 'css.compressed' ) ) );

});

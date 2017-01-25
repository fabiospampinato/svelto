
/* =========================================================================
 * Svelto - Tasks - Build - CSS
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var changed      = require ( '../utilities/changed' ),
    log          = require ( '../utilities/log' ),
    output       = require ( '../utilities/output' ),
    plugins      = require ( '../config/project' ).plugins,
    gulp         = require ( 'gulp-help' )( require ( 'gulp' ) ),
    autoprefixer = require ( 'gulp-autoprefixer' ),
    cssnano      = require ( 'gulp-cssnano' ),
    gulpif       = require ( 'gulp-if' ),
    newer        = require ( 'gulp-newer' ),
    plumber      = require ( 'gulp-plumber' ),
    rename       = require ( 'gulp-rename' ),
    sass         = require ( 'gulp-sass' );

/* CSS */

gulp.task ( 'build-css', 'Build CSS', ['build-scss'], function () {

  var needUpdate = changed.plugins ( 'sass', 'autoprefixer', 'cssnano' );

  return gulp.src ( output.getPath ( 'scss.all' ) )
             .pipe ( plumber ( log.error ) )
             .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'css.uncompressed' ) ) ) )
             .pipe ( gulpif ( plugins.sass.enabled, ( sass ( plugins.sass.options ) ) ) )
             .pipe ( gulpif ( plugins.autoprefixer.enabled, autoprefixer ( plugins.autoprefixer.options ) ) )
             .pipe ( rename ( output.getName ( 'css.uncompressed' ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'css.uncompressed' ) ) )
             .pipe ( gulpif ( plugins.cssnano.enabled, cssnano ( plugins.cssnano.options ) ) )
             .pipe ( rename ( output.getName ( 'css.compressed' ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'css.compressed' ) ) );

});

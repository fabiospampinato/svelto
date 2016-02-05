
/* =========================================================================
 * Svelto - Tasks - Build - CSS
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var _            = require ( 'lodash' ),
    output       = require ( '../utilities/output' ),
    project      = require ( '../config/project' ),
    projectPrev  = require ( '../config/previous/project' ),
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

  var needUpdate = !_.isEqual ( _.get ( project, 'plugins.sass.options' ), _.get ( projectPrev, 'plugins.sass.options' ) ) ||
                   _.get ( project, 'plugins.autoprefixer.enabled' ) !== _.get ( projectPrev, 'plugins.autoprefixer.enabled' ) ||
                   !_.isEqual ( _.get ( project, 'plugins.autoprefixer.options' ), _.get ( projectPrev, 'plugins.autoprefixer.options' ) ) ||
                   ( _.get ( project, 'plugins.cssnano.enabled' ) && !project.isDevelopment ) !== ( _.get ( projectPrev, 'plugins.cssnano.enabled' ) && !projectPrev.isDevelopment ) ||
                   !_.isEqual ( _.get ( project, 'plugins.cssnano.options' ), _.get ( projectPrev, 'plugins.cssnano.options' ) );

  return gulp.src ( output.getPath ( 'scss.all' ) )
             .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'css.uncompressed' ) ) ) )
             .pipe ( sass ( plugins.sass.options ).on ( 'error', sass.logError ) )
             .pipe ( gulpif ( plugins.autoprefixer.enabled, autoprefixer ( plugins.autoprefixer.options ) ) )
             .pipe ( rename ( output.getName ( 'css.uncompressed' ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'css.uncompressed' ) ) )
             .pipe ( gulpif ( plugins.cssnano.enabled && !project.isDevelopment, cssnano ( plugins.cssnano.options ) ) )
             .pipe ( rename ( output.getName ( 'css.compressed' ) ) )
             .pipe ( gulp.dest ( output.getDir ( 'css.compressed' ) ) );

});

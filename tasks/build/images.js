
/* =========================================================================
 * Svelto - Tasks - Build - Images
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var _           = require ( 'lodash' ),
    env         = require ( '../config/environment' ),
    envPrev     = require ( '../config/previous/environment' ),
    input       = require ( '../utilities/input' ),
    output      = require ( '../utilities/output' ),
    project     = require ( '../config/project' ),
    projectPrev = require ( '../config/previous/project' ),
    plugins     = project.plugins,
    gulp        = require ( 'gulp-help' )( require ( 'gulp' ) ),
    bytediff    = require ( 'gulp-bytediff' ),
    flatten     = require ( 'gulp-flatten' ),
    gulpif      = require ( 'gulp-if' ),
    imagemin    = require ( 'gulp-imagemin' ),
    newer       = require ( 'gulp-newer' );

/* IMAGES */

gulp.task ( 'build-images', 'Build images', function () {

  var needUpdate = ( _.get ( project, 'plugins.imagemin.enabled' ) && !env.isDevelopment ) !== ( _.get ( projectPrev, 'plugins.imagemin.enabled' ) && !envPrev.isDevelopment ) ||
                   !_.isEqual ( _.get ( project, 'plugins.imagemin.options' ), _.get ( projectPrev, 'plugins.imagemin.options' ) );

  return gulp.src ( input.getPath ( 'images' ) )
             .pipe ( flatten () )
             .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'images' ) ) ) )
             .pipe ( gulpif ( plugins.imagemin.enabled && !env.isDevelopment, bytediff.start () ) )
             .pipe ( gulpif ( plugins.imagemin.enabled && !env.isDevelopment, imagemin ( plugins.imagemin.options ) ) )
             .pipe ( gulpif ( plugins.imagemin.enabled && !env.isDevelopment, bytediff.stop () ) )
             .pipe ( gulp.dest ( output.getPath ( 'images' ) ) );

});

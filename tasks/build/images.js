
/* =========================================================================
 * Svelto - Tasks - Build - Images
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var _           = require ( 'lodash' ),
    input       = require ( '../utilities/input' ),
    output      = require ( '../utilities/output' ),
    filter      = require ( '../plugins/filter' ),
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

  var needUpdate = _.get ( project, 'plugins.imagemin.enabled' ) !== _.get ( projectPrev, 'plugins.imagemin.enabled' ) ||
                   !_.isEqual ( _.get ( project, 'plugins.imagemin.options' ), _.get ( projectPrev, 'plugins.imagemin.options' ) );

  return gulp.src ( input.getPath ( 'images' ) )
             .pipe ( filter () )
             .pipe ( flatten () )
             .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'images' ) ) ) )
             .pipe ( gulpif ( plugins.imagemin.enabled, bytediff.start () ) )
             .pipe ( gulpif ( plugins.imagemin.enabled, imagemin ( plugins.imagemin.options ) ) )
             .pipe ( gulpif ( plugins.imagemin.enabled, bytediff.stop () ) )
             .pipe ( gulp.dest ( output.getPath ( 'images' ) ) );

});

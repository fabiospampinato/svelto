
/* =========================================================================
 * Svelto - Tasks - Build - Images
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var plugins  = require ( '../config/project' ).plugins,
    changed  = require ( '../utilities/changed' ),
    input    = require ( '../utilities/input' ),
    output   = require ( '../utilities/output' ),
    filter   = require ( '../plugins/filter' ),
    gulp     = require ( 'gulp-help' )( require ( 'gulp' ) ),
    bytediff = require ( 'gulp-bytediff' ),
    flatten  = require ( 'gulp-flatten' ),
    gulpif   = require ( 'gulp-if' ),
    imagemin = require ( 'gulp-imagemin' ),
    newer    = require ( 'gulp-newer' );

/* IMAGES */

gulp.task ( 'build-images', 'Build images', function () {

  var needUpdate = changed.plugin ( 'imagemin' );

  return gulp.src ( input.getPath ( 'images' ) )
             .pipe ( gulpif ( plugins.filter.enabled, filter ( plugins.filter.options ) ) )
             .pipe ( flatten () )
             .pipe ( gulpif ( !needUpdate, newer ( output.getPath ( 'images' ) ) ) )
             .pipe ( gulpif ( plugins.imagemin.enabled, bytediff.start () ) )
             .pipe ( gulpif ( plugins.imagemin.enabled, imagemin ( plugins.imagemin.options ) ) )
             .pipe ( gulpif ( plugins.imagemin.enabled, bytediff.stop () ) )
             .pipe ( gulp.dest ( output.getPath ( 'images' ) ) );

});
